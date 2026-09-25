import { GoogleGenerativeAI, SchemaType, type ObjectSchema } from "@google/generative-ai";
import { partialAnswer } from "./chat-stream";

export const EMBEDDING_MODEL = "gemini-embedding-001";
export const GENERATION_MODEL =
  process.env.GEMINI_GENERATION_MODEL || "gemini-3.8-flash";
export class AssistantUnavailableError extends Error {
  constructor(
    message: string,
    public readonly code = "UNAVAILABLE",
  ) {
    super(message);
  }
}

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new AssistantUnavailableError("Missing server API key");
  return new GoogleGenerativeAI(apiKey);
}

// Retry transient server errors once; never retry authentication or quota errors.
async function callProvider<T>(operation: () => Promise<T>): Promise<T> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      return await operation();
    } catch (error) {
      const status =
        typeof error === "object" && error !== null && "status" in error
          ? error.status
          : undefined;
      if (
        attempt === 0 &&
        (status === 500 || status === 502 || status === 503 || status === 504)
      ) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        continue;
      }
      throw new AssistantUnavailableError(
        "Gemini request failed",
        typeof status === "number" ? `HTTP_${status}` : "NETWORK_OR_TIMEOUT",
      );
    }
  }
  throw new AssistantUnavailableError("Gemini request failed");
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
  const model = getClient().getGenerativeModel(
    { model: EMBEDDING_MODEL },
    { timeout: 10000 },
  );
  const out: number[][] = [];
  for (const text of texts) {
    const result = await callProvider(() => model.embedContent(text));
    out.push(result.embedding.values);
  }
  return out;
}

export async function embedOne(text: string): Promise<number[]> {
  return (await embedTexts([text]))[0];
}

export type GroundedAnswer = {
  answer: string;
  refused: boolean;
  chunkIds: number[];
};

// The installed SDK predates the API's propertyOrdering field. Keep the typed
// schema and declare that supported field explicitly: drafts need the refusal
// decision before answer text, otherwise they remain hidden until the end.
const ANSWER_SCHEMA: ObjectSchema & { propertyOrdering: string[] } = {
  type: SchemaType.OBJECT,
  properties: {
    refused: { type: SchemaType.BOOLEAN },
    answer: { type: SchemaType.STRING },
    chunkIds: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.INTEGER },
    },
  },
  required: ["refused", "answer", "chunkIds"],
  propertyOrdering: ["refused", "answer", "chunkIds"],
};

export async function generateAnswer(
  systemPrompt: string,
  userPrompt: string,
  onDraft?: (text: string) => void,
): Promise<GroundedAnswer> {
  const model = getClient().getGenerativeModel(
    {
      model: GENERATION_MODEL,
      systemInstruction: systemPrompt,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: ANSWER_SCHEMA,
      },
    },
    { timeout: 20000 },
  );
  const output = await callProvider(async () => {
    if (!onDraft)
      return (await model.generateContent(userPrompt)).response.text();
    onDraft("");
    const result = await model.generateContentStream(userPrompt);
    let accumulated = "";
    let previousDraft = "";
    for await (const chunk of result.stream) {
      accumulated += chunk.text();
      const text = partialAnswer(accumulated);
      if (text !== undefined && text !== previousDraft) {
        onDraft(text);
        previousDraft = text;
      }
    }
    return (await result.response).text();
  });
  try {
    const value: unknown = JSON.parse(output);
    if (!value || typeof value !== "object") throw new Error("Invalid answer");
    const answer = value as Partial<GroundedAnswer>;
    if (
      typeof answer.answer !== "string" ||
      !answer.answer.trim() ||
      typeof answer.refused !== "boolean" ||
      !Array.isArray(answer.chunkIds) ||
      !answer.chunkIds.every((id) => Number.isInteger(id) && id > 0)
    ) {
      throw new Error("Invalid answer");
    }
    return {
      answer: answer.answer.trim(),
      refused: answer.refused,
      chunkIds: answer.chunkIds,
    };
  } catch {
    throw new AssistantUnavailableError(
      "Invalid Gemini response",
      "INVALID_RESPONSE",
    );
  }
}

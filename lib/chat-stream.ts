import type { Source } from "./chat";

export type ChatResult = {
  answer: string;
  refused: boolean;
  sources: Source[];
  kind?: "smalltalk";
  error?: string;
};

// Only expose the answer field after the model has marked it as a non-refusal.
// The UI labels these partial values as a draft until final validation succeeds.
export function partialAnswer(json: string): string | undefined {
  if (!/"refused"\s*:\s*false/.test(json)) return;
  const match = json.match(/"answer"\s*:\s*"((?:\\.|[^"\\])*)/);
  if (!match) return;
  for (let trim = 0; trim <= Math.min(6, match[1].length); trim++) {
    try {
      return JSON.parse(`"${match[1].slice(0, match[1].length - trim)}"`);
    } catch {
      /* Wait for a complete escape sequence. */
    }
  }
}

export async function readChatResponse(
  response: Response,
  onDraft: (text: string) => void,
): Promise<ChatResult> {
  if (!response.headers.get("content-type")?.includes("application/x-ndjson"))
    return response.json();
  const reader = response.body?.getReader();
  if (!reader) throw new Error("Missing response stream");
  const decoder = new TextDecoder();
  let buffer = "";
  let result: ChatResult | undefined;
  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.trim()) continue;
        const event = JSON.parse(line);
        if (event.type === "draft" && typeof event.text === "string")
          onDraft(event.text);
        else if (event.type === "result") result = event.data;
        else if (event.type === "error")
          throw new Error("The assistant could not finish. Please try again.");
      }
      if (done) break;
    }
    if (!result) throw new Error("Incomplete response stream");
    return result;
  } finally {
    reader.releaseLock();
  }
}

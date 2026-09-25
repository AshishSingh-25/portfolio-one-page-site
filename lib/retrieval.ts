import type { HistoryMessage } from "./chat";
import { smallTalkAnswer } from "./small-talk";
import { retrieveTopK, type IndexedChunk } from "./vectorstore";

const SIMILARITY_FLOOR = 0.55;
const MAX_CHUNKS = 12;
const MAX_CONTEXT_CHARS = 12000;
const STOP_WORDS = new Set(
  "a an and are as at be by can check did do does for from has have he her his how i in is it me my of on or other please she than that the their them these they this those to two was were what when where which who why with you your ashish singh cv resume document documents".split(" "),
);

function terms(text: string): Set<string> {
  return new Set(
    (text.toLowerCase().match(/[a-z][a-z0-9]+/g) ?? [])
      .filter((word) => !STOP_WORDS.has(word))
      .map((word) => word.length > 3 && word.endsWith("s") ? word.slice(0, -1) : word),
  );
}

export function retrievalQueries(question: string, history: HistoryMessage[]): string[] {
  // An earlier refusal is neither a search topic nor evidence. Keep visitor intent
  // in retrieval; generation still sees history to resolve conversational references.
  const previous = history.filter((message) =>
    message.role === "user" && !smallTalkAnswer(message.text),
  ).at(-1);
  return previous
    ? [question, `${previous.text}\nFollow-up: ${question}`]
    : [question];
}

export function selectContext(
  question: string,
  queries: string[],
  embeddings: number[][],
  store: IndexedChunk[],
): IndexedChunk[] {
  // Explicit document requests scope search; they do not paste entire documents.
  // In research questions, "CV data" can mean cross-validation, not a resume.
  const paperRequest = /\b(paper|manuscript)\b/i.test(question);
  const resumeRequest = /\b(cv|r[eé]sum[eé]|curriculum vitae)\b/i.test(question);
  const comparison = paperRequest && resumeRequest && !/\bcv\s+data\b/i.test(question);
  const source = comparison ? undefined : paperRequest ? "research-visionvoice" : resumeRequest ? "cv" : undefined;
  const searchStore = source ? store.filter((chunk) => chunk.source === source) : store;
  const seeds: IndexedChunk[] = [];
  const queryTerms = queries.map(terms);
  const chunkTerms = searchStore.map((chunk) => terms(chunk.text));

  // Sparse matching gives explicit names and section requests a route into context
  // even when a semantically similar contact/summary chunk ranks above them.
  for (const query of queryTerms) {
    const ranked = searchStore.map((chunk, index) => {
      const heading = terms(chunk.heading);
      let score = 0;
      for (const term of query) {
        if (!chunkTerms[index].has(term)) continue;
        const frequency = chunkTerms.filter((words) => words.has(term)).length;
        score += Math.log(1 + searchStore.length / frequency) * (heading.has(term) ? 3 : 1);
      }
      return { chunk, score };
    }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score);
    seeds.push(...ranked.slice(0, 2).map((item) => item.chunk));
  }
  for (const embedding of embeddings) {
    seeds.push(...retrieveTopK(embedding, searchStore, 4).filter((chunk) => chunk.score >= SIMILARITY_FLOOR));
  }

  const selected = new Map<string, IndexedChunk>();
  let characters = 0;
  function add(chunk: IndexedChunk) {
    if (selected.has(chunk.id) || selected.size >= MAX_CHUNKS || characters + chunk.text.length > MAX_CONTEXT_CHARS) return;
    selected.set(chunk.id, chunk);
    characters += chunk.text.length;
  }
  // A section may span several chunks. Preserve all its paragraphs so a list request
  // doesn't silently omit projects from the later paragraphs of Selected Projects.
  for (const seed of seeds) {
    add(seed);
    searchStore.filter((chunk) => chunk.source === seed.source && chunk.heading === seed.heading).forEach(add);
  }
  return [...selected.values()];
}

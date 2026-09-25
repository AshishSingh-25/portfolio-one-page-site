import fs from "fs";
import path from "path";

export type IndexedChunk = {
  id: string;
  source: string;
  title: string;
  heading: string;
  text: string;
  embedding: number[];
};

const VECTORSTORE_PATH = path.join(process.cwd(), "data", "vectorstore.json");

export function loadVectorStore(): IndexedChunk[] {
  if (!fs.existsSync(VECTORSTORE_PATH)) {
    throw new Error(
      "data/vectorstore.json not found. Run `npm run ingest` first (see README) — the API route reads that file, it does not embed the corpus itself.",
    );
  }
  const raw = fs.readFileSync(VECTORSTORE_PATH, "utf-8");
  return JSON.parse(raw);
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (
    !a.length ||
    a.length !== b.length ||
    !a.every(Number.isFinite) ||
    !b.every(Number.isFinite)
  ) {
    throw new Error("Invalid or incompatible embeddings. Rebuild the index.");
  }
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export type RetrievedChunk = IndexedChunk & { score: number };

export function retrieveTopK(
  queryEmbedding: number[],
  store: IndexedChunk[],
  k = 4,
): RetrievedChunk[] {
  return store
    .map((chunk) => ({
      ...chunk,
      score: cosineSimilarity(queryEmbedding, chunk.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { chunkMarkdown } from "../lib/chunk";
import { embedTexts } from "../lib/gemini";
import type { IndexedChunk } from "../lib/vectorstore";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local", quiet: true });

const CORPUS_DIR = path.join(process.cwd(), "data", "corpus");
const OUT_PATH = path.join(process.cwd(), "data", "vectorstore.json");

async function main() {
  if (!fs.existsSync(CORPUS_DIR)) {
    throw new Error(`No corpus directory at ${CORPUS_DIR}`);
  }

  const files = fs.readdirSync(CORPUS_DIR).filter((f) => f.endsWith(".md"));
  if (files.length === 0) {
    throw new Error(`No .md files found in ${CORPUS_DIR}`);
  }

  console.log(`Found ${files.length} corpus file(s): ${files.join(", ")}`);

  const allChunks: {
    source: string;
    title: string;
    heading: string;
    text: string;
  }[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CORPUS_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const source = data.source || path.basename(file, ".md");
    const title = data.title || source;
    const chunks = chunkMarkdown(source, title, content);
    console.log(`  ${file}: ${chunks.length} chunk(s)`);
    allChunks.push(...chunks);
  }

  if (allChunks.length === 0) {
    throw new Error(
      "No content found. Add text under the corpus document headings before ingestion.",
    );
  }

  console.log(
    `Embedding ${allChunks.length} chunks with Gemini (${allChunks.length} API calls)...`,
  );

  const texts = allChunks.map((c) => c.text);
  const embeddings = await embedTexts(texts);

  const indexed: IndexedChunk[] = allChunks.map((c, i) => ({
    id: `${c.source}-${i}`,
    source: c.source,
    title: c.title,
    heading: c.heading,
    text: c.text,
    embedding: embeddings[i],
  }));

  fs.writeFileSync(OUT_PATH, JSON.stringify(indexed, null, 2));
  console.log(
    `Wrote ${indexed.length} embedded chunks to ${path.relative(process.cwd(), OUT_PATH)}`,
  );
}

main().catch((err) => {
  console.error("Ingest failed:", err.message || err);
  process.exit(1);
});

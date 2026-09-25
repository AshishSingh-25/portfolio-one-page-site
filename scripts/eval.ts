import fs from "fs";
import path from "path";
import type { HistoryMessage, Source } from "../lib/chat";
import { loadVectorStore } from "../lib/vectorstore";

type EvalCase = {
  question: string;
  expectRefusal: boolean;
  expectContains: string[];
  expectSources?: string[];
  expectSmallTalk?: boolean;
  history?: HistoryMessage[];
};
const BASE_URL = process.env.EVAL_BASE_URL || "http://localhost:3000";

async function main() {
  const cases: EvalCase[] = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "data", "eval-questions.json"),
      "utf8",
    ),
  );
  if (!cases.length) throw new Error("No evaluation cases found");
  // Keep a large evaluation below the app's 20-requests/minute guard.
  // Mock-only tests can set zero; live runs should keep the default spacing.
  const interval = Number(process.env.EVAL_REQUEST_INTERVAL_MS ?? 3100);
  if (!Number.isFinite(interval) || interval < 0 || interval > 60000) {
    throw new Error("Invalid EVAL_REQUEST_INTERVAL_MS");
  }
  let previousStart = 0;
  let pass = 0;
  const store = loadVectorStore();
  for (const c of cases) {
    const wait = interval - (Date.now() - previousStart);
    if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
    previousStart = Date.now();
    try {
      const res = await fetch(`${BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: c.question, history: c.history }),
        signal: AbortSignal.timeout(75000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (
        typeof data.answer !== "string" ||
        !data.answer.trim() ||
        typeof data.refused !== "boolean"
      ) {
        throw new Error("Invalid response");
      }
      const refusalOk = data.refused === c.expectRefusal;
      const keywordsOk = c.expectContains.every((word) =>
        data.answer.toLowerCase().includes(word.toLowerCase()),
      );
      const sources: Source[] = Array.isArray(data.sources) ? data.sources : [];
      const kindOk = c.expectSmallTalk ? data.kind === "smalltalk" : data.kind !== "smalltalk";
      const evidenceOk = data.refused || c.expectSmallTalk
        ? sources.length === 0
        : sources.length > 0 &&
          sources.every(
            (s) =>
              Array.isArray(s.passages) &&
              s.passages.length > 0 &&
              s.passages.every((p) =>
                store.some(
                  (chunk) =>
                    chunk.id === p.id &&
                    chunk.source === s.source &&
                    chunk.text === p.text,
                ),
              ),
          );
      const sourcesOk =
        !c.expectSources ||
        sources.some((s) => c.expectSources!.includes(s.source));
      const ok = refusalOk && keywordsOk && evidenceOk && sourcesOk && kindOk;
      if (ok) pass++;
      console.log(`${ok ? "PASS" : "FAIL"}  ${c.question}`);
      if (!ok)
        console.log(
          `      -> refused=${data.refused}; evidence=${evidenceOk}; expectedSource=${sourcesOk}; answer: ${data.answer.slice(0, 240)}`,
        );
    } catch (error) {
      console.log(
        `FAIL  ${c.question}\n      -> ${error instanceof Error ? error.message : "Request failed"}`,
      );
    }
  }
  console.log(`\n${pass}/${cases.length} passed`);
  if (pass !== cases.length) process.exitCode = 1;
}

main().catch(() => {
  console.error("Could not load evaluation cases.");
  process.exitCode = 1;
});

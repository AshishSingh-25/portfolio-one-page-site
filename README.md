# Ashish Singh - RAG Portfolio

A one-page Next.js portfolio with a "Talk to Ashish" assistant grounded in a CV, two project write-ups, FAQ and VisionVoice research manuscript. Includes document citations, streamed answers and polite replies to greetings.

## Run locally

Requires Node.js 20.9+ and a Gemini API key with access to the configured models. Run these commands inside the project folder:

```powershell
npm ci
# First setup only; keep an existing configured .env.local:
Copy-Item .env.example .env.local
```

Set `GEMINI_API_KEY` in `.env.local`, then run:

```powershell
npm run dev
```

Open http://localhost:3000. On macOS/Linux, use `cp` instead of `Copy-Item`. Keep `.env.local` private; the key is used server-side.

## Design choices

- **Chunking:** split Markdown at H2 headings and pack paragraphs toward 900 characters, retaining headings to preserve context; long paragraphs can exceed the target.
- **Models:** `gemini-embedding-001` provides compatible document/query vectors; `gemini-3.8-flash` generates structured, streamed answers from retrieved passages.
- **Storage/retrieval:** JSON vectors and cosine similarity suit this small corpus without another service; keyword matches supplement retrieval, capped at 12 chunks / 12,000 characters.

Factual answers require supporting chunk citations; unsupported questions should be refused. Standalone greetings use local social replies without citations.

## Rebuild and check

An index is included. After adding, editing or removing Markdown in `data/corpus`, run `npm run ingest` to rebuild it. PDFs need reviewed Markdown conversion first. Rebuilding calls the embedding API for every chunk; redeploy the updated index for hosted use.

```powershell
npm run lint
npm test
npm run build
# With the app running in another terminal:
npm run eval
```

Latest local checks: 10 regression groups and 39 live evaluation cases passed, plus lint/build/TypeScript. Evaluation checks keywords, refusals and citations; it is not proof against hallucinations.

## Unfinished work and limitations

- Provider outages or quota limits can interrupt chat. Retry/error feedback and email contact are available; there is no second-provider failover. Rate limiting is per server process.
- Citation checks validate source passages, not every generated claim. Streaming drafts remain provisional until final validation.

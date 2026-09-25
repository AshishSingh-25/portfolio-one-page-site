export type RawChunk = {
  source: string; // e.g. "cv", "project-1-rainbow-advertising"
  title: string; // human-readable doc title, for citations
  heading: string; // the ## heading this chunk came from
  text: string; // the chunk text actually embedded/retrieved
};

const MAX_CHUNK_CHARS = 900; // small corpus, small chunks — keeps retrieval precise

/**
 * Splits a markdown document body into chunks along ## headings, then further
 * splits any single section that's still too long, on paragraph breaks.
 * HTML comments are excluded from the searchable content.
 */
export function chunkMarkdown(
  source: string,
  title: string,
  body: string,
): RawChunk[] {
  const withoutComments = body.replace(/<!--[\s\S]*?-->/g, "").trim();
  // Drop a leading "# Title" line (H1) — it carries no retrievable content of its
  // own and would otherwise become a near-empty first chunk.
  const cleaned = withoutComments.replace(/^#\s+.+\n?/, "").trim();

  // Split on lines starting with "## " (level-2 headings). Keep the heading text.
  const sections = cleaned
    .split(/\n(?=## )/g)
    .filter((s) => s.trim().length > 0);

  const chunks: RawChunk[] = [];

  for (const section of sections) {
    const headingMatch = section.match(/^##\s+(.+)/);
    const heading = headingMatch ? headingMatch[1].trim() : title;
    const content = section.replace(/^##\s+.+\n?/, "").trim();

    if (!content) continue;

    if (content.length <= MAX_CHUNK_CHARS) {
      chunks.push({ source, title, heading, text: `${heading}\n${content}` });
      continue;
    }

    // Section too long — split on blank-line paragraph breaks and pack into
    // chunks up to MAX_CHUNK_CHARS, so no chunk loses its heading context.
    const paragraphs = content.split(/\n\s*\n/);
    let buffer = "";
    for (const p of paragraphs) {
      if ((buffer + "\n\n" + p).length > MAX_CHUNK_CHARS && buffer) {
        chunks.push({
          source,
          title,
          heading,
          text: `${heading}\n${buffer.trim()}`,
        });
        buffer = p;
      } else {
        buffer = buffer ? `${buffer}\n\n${p}` : p;
      }
    }
    if (buffer.trim()) {
      chunks.push({
        source,
        title,
        heading,
        text: `${heading}\n${buffer.trim()}`,
      });
    }
  }

  return chunks;
}

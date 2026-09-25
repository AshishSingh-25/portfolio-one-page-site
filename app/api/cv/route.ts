import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const runtime = "nodejs";

export function GET() {
  const { content } = matter(
    fs.readFileSync(path.join(process.cwd(), "data/corpus/cv.md"), "utf8"),
  );
  return new Response(content.replace(/<!--[\s\S]*?-->/g, "").trim(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Ashish-Singh-CV.txt"',
      "X-Content-Type-Options": "nosniff",
    },
  });
}

import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

export function GET() {
  const content = fs.readFileSync(
    path.join(process.cwd(), "data/Ashish_Singh_LLM_AI_Agents_Resume.pdf"),
  );
  return new Response(new Uint8Array(content), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Ashish_Singh_LLM_AI_Agents_Resume.pdf"',
      "X-Content-Type-Options": "nosniff",
    },
  });
}

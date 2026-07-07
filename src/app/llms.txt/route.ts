import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "llms.txt");
  const body = await readFile(filePath, "utf8");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

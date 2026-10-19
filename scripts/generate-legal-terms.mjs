import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { build } from "esbuild";

// Compile Markdown during prebuild. Cloudflare Workers must never read local
// Markdown files or depend on a Node filesystem to render a legal page.
const bundle = await build({
  entryPoints: [path.resolve("src/lib/legal-markdown.ts")],
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
});
const { renderTermsMarkdown } = await import(
  `data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString("base64")}`
);
const documents = {};
for (const [locale, filename] of [["en", "terms-of-service.md"], ["es", "terms-of-service_es.md"]]) {
  documents[locale] = renderTermsMarkdown(await readFile(path.join("docs/legal", filename), "utf8"));
}
await writeFile("src/content/legal/terms.generated.json", `${JSON.stringify(documents, null, 2)}\n`);
console.log("Compiled English and Spanish legal Markdown for static rendering.");

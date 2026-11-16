import fs from "node:fs";
import path from "node:path";

/**
 * Fail if prerendered HTML still has render-blocking Next CSS <link> tags.
 * experimental.inlineCss should replace those with <style data-href=…> on
 * first HTML (see next.config.ts). Soft-nav may still use links — this check
 * only covers static HTML under .next/server.
 */
const root = path.join(process.cwd(), ".next", "server");
const stylesheetRe = /<link\b[^>]*\brel=["']stylesheet["'][^>]*>/gi;
const nextCssHrefRe = /\/_next\/static\/css\/[^"']+\.css/i;
const inlinedStyleRe = /<style\b[^>]*\bdata-href=["']\/_next\/static\/css\/[^"']+\.css["'][^>]*>/i;

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, out);
    else if (ent.name.endsWith(".html")) out.push(full);
  }
  return out;
}

if (!fs.existsSync(root)) {
  console.error(`[check-css-inlined] missing ${root} — run a Next build first`);
  process.exit(1);
}

const pages = walk(root);
if (!pages.length) {
  console.error("[check-css-inlined] no HTML pages found under .next/server");
  process.exit(1);
}

const blocking = [];
let inlined = 0;
for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  if (inlinedStyleRe.test(html)) inlined += 1;
  const links = html.match(stylesheetRe) ?? [];
  for (const tag of links) {
    if (nextCssHrefRe.test(tag)) {
      blocking.push({ file: path.relative(process.cwd(), file), tag: tag.slice(0, 180) });
    }
  }
}

if (blocking.length) {
  console.error("[check-css-inlined] render-blocking Next CSS <link> still present:");
  for (const { file, tag } of blocking.slice(0, 20)) {
    console.error(`  - ${file}: ${tag}`);
  }
  if (blocking.length > 20) console.error(`  …and ${blocking.length - 20} more`);
  process.exit(1);
}

if (inlined === 0) {
  console.error("[check-css-inlined] no inlined Next CSS <style data-href> found — is experimental.inlineCss enabled?");
  process.exit(1);
}

console.log(`[check-css-inlined] ok — ${inlined}/${pages.length} pages inlined Next CSS, 0 blocking stylesheet links`);

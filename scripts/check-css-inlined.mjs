import fs from "node:fs";
import path from "node:path";

/**
 * Ensure prerendered HTML links the shared Next stylesheet as a separate,
 * cacheable asset instead of duplicating it inline into every HTML response.
 */
const root = path.join(process.cwd(), ".next", "server");
const cssRoot = path.join(process.cwd(), ".next", "static", "css");
const stylesheetRe = /<link\b[^>]*\brel=["']stylesheet["'][^>]*>/gi;
const nextCssHrefRe = /\/_next\/static\/css\/[^"']+\.css/i;
const nextCssHrefCaptureRe = /\bhref=["'](\/_next\/static\/css\/[^"']+\.css)["']/i;
const inlinedStyleRe = /<style\b[^>]*\bdata-href=["']\/_next\/static\/css\/[^"']+\.css["'][^>]*>/i;
const config = fs.readFileSync(path.join(process.cwd(), "next.config.ts"), "utf8");
const immutableCssRule = /source:\s*"\/_next\/static\/css\/:path\*",\s*headers:\s*yearCache/s.test(config)
  && /\.\.\.\(!isDev\s*\?\s*\[[\s\S]*?source:\s*"\/_next\/static\/css\/:path\*"/s.test(config)
  && /key:\s*"Cache-Control",\s*value:\s*"public,\s*max-age=31536000,\s*immutable"/.test(config);
if (!immutableCssRule) {
  console.error("[check-css-inlined] Next CSS must retain a one-year immutable cache header");
  process.exit(1);
}
const cssExemptions = new Set([
  path.join(root, "app", "_global-error.html"),
  path.join(root, "app", "_not-found.html"),
  path.join(root, "pages", "404.html"),
  path.join(root, "pages", "500.html"),
]);
const htmlBudget = 600 * 1024;
const htmlBudgetRoutes = [
  path.join(root, "app", "index.html"),
  path.join(root, "app", "pricing.html"),
  path.join(root, "app", "industries", "plumbing.html"),
  path.join(root, "app", "case-studies", "a1-property-services.html"),
];

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

const missingStylesheet = [];
let linkedPages = 0;
let inlinedPages = 0;
const cssAssets = new Set();
for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  if (inlinedStyleRe.test(html)) inlinedPages += 1;
  const links = html.match(stylesheetRe) ?? [];
  const cssLinks = links.filter((tag) => nextCssHrefRe.test(tag));
  if (cssLinks.length) linkedPages += 1;
  else if (!cssExemptions.has(file)) missingStylesheet.push(path.relative(process.cwd(), file));
  for (const tag of cssLinks) {
    const href = tag.match(nextCssHrefCaptureRe)?.[1];
    if (!href || !/^\/_next\/static\/css\/[a-f\d]{16,}\.css$/i.test(href)) {
      missingStylesheet.push(`${path.relative(process.cwd(), file)} (stylesheet URL is not content-hashed)`);
      continue;
    }
    const asset = path.join(cssRoot, path.basename(href));
    if (!fs.existsSync(asset)) missingStylesheet.push(`${path.relative(process.cwd(), file)} (missing CSS asset ${href})`);
    else cssAssets.add(asset);
  }
}

if (missingStylesheet.length) {
  console.error("[check-css-inlined] prerendered HTML missing a Next CSS stylesheet link:");
  for (const file of missingStylesheet.slice(0, 20)) console.error(`  - ${file}`);
  if (missingStylesheet.length > 20) console.error(`  …and ${missingStylesheet.length - 20} more`);
  process.exit(1);
}

if (inlinedPages > 0) {
  console.error(`[check-css-inlined] ${inlinedPages} pages still inline the shared Next CSS`);
  process.exit(1);
}

const oversized = htmlBudgetRoutes
  .filter((file) => fs.existsSync(file))
  .map((file) => ({ file, bytes: fs.statSync(file).size }))
  .filter(({ bytes }) => bytes > htmlBudget);
const missingBudgetRoutes = htmlBudgetRoutes.filter((file) => !fs.existsSync(file));
if (missingBudgetRoutes.length) {
  console.error("[check-css-inlined] missing expected prerendered HTML for byte-budget routes:");
  for (const file of missingBudgetRoutes) console.error(`  - ${path.relative(process.cwd(), file)}`);
  process.exit(1);
}
if (oversized.length) {
  console.error(`[check-css-inlined] marketing HTML exceeds ${htmlBudget} bytes:`);
  for (const { file, bytes } of oversized) console.error(`  - ${path.relative(process.cwd(), file)} (${bytes} bytes)`);
  process.exit(1);
}

console.log(`[check-css-inlined] ok — ${linkedPages}/${pages.length} pages link ${cssAssets.size} content-hashed Next CSS asset(s) with immutable caching; 0 inline copies; ${htmlBudgetRoutes.length} core HTML routes under ${htmlBudget} bytes`);

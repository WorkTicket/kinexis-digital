/**
 * Full sitemap smoke (no browser). Usage:
 *   node scripts/smoke-routes.mjs [baseUrl]
 * Fetches /sitemap.xml and checks every URL returns 200 (or allowed redirect).
 * Falls back to a small path list if sitemap is empty/unavailable.
 */
const base = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");
const concurrency = 8;
const timeoutMs = 25_000;

const FALLBACK = [
  "/",
  "/pricing",
  "/portfolio",
  "/contact",
  "/pay",
  "/privacy",
  "/case-studies/preferred-plumbing",
  "/robots.txt",
  "/sitemap.xml",
];

async function fetchText(url) {
  const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(timeoutMs) });
  const text = await res.text();
  return { res, text };
}

function parseSitemapUrls(xml) {
  const urls = [];
  for (const match of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)) {
    urls.push(match[1].trim());
  }
  return [...new Set(urls)];
}

const sitemapUrl = `${base}/sitemap.xml`;
let targets = [];
let sitemapHostMismatch = false;

try {
  const { res, text } = await fetchText(sitemapUrl);
  if (!res.ok) throw new Error(`sitemap ${res.status}`);
  const locs = parseSitemapUrls(text);
  if (locs.length === 0) throw new Error("empty sitemap");
  const origin = new URL(base).origin;
  for (const loc of locs) {
    try {
      const u = new URL(loc);
      if (u.hostname !== new URL(base).hostname) sitemapHostMismatch = true;
      targets.push(u.toString());
    } catch {
      /* skip bad loc */
    }
  }
  console.log(`Sitemap: ${targets.length} unique URLs from ${sitemapUrl}`);
  if (sitemapHostMismatch) {
    console.log(`Note: sitemap host differs from probe base (${base}); requesting sitemap absolute URLs.`);
  }
  // Always include robots + sitemap itself.
  targets.push(`${origin}/robots.txt`, sitemapUrl);
  targets = [...new Set(targets)];
} catch (error) {
  console.log(`Sitemap unavailable (${error instanceof Error ? error.message : "error"}); using fallback paths.`);
  targets = FALLBACK.map((p) => `${base}${p}`);
}

let failed = 0;
let checked = 0;
const failures = [];

async function check(url) {
  try {
    const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(timeoutMs) });
    checked += 1;
    const ok = res.ok;
    if (!ok) {
      failed += 1;
      failures.push(`${res.status} ${url}`);
      console.log(`FAIL ${res.status} ${url}`);
      return;
    }
    if (checked % 25 === 0 || checked === targets.length) {
      console.log(`… ${checked}/${targets.length} OK so far`);
    }
  } catch (error) {
    checked += 1;
    failed += 1;
    const msg = error instanceof Error ? error.message : "error";
    failures.push(`000 ${url} (${msg})`);
    console.log(`FAIL 000 ${url} (${msg})`);
  }
}

for (let i = 0; i < targets.length; i += concurrency) {
  const batch = targets.slice(i, i + concurrency);
  await Promise.all(batch.map(check));
}

console.log(`\nChecked ${checked} URLs · failures ${failed}`);
if (failures.length) {
  console.log("Failures:");
  for (const line of failures) console.log(`  ${line}`);
}
process.exit(failed ? 1 : 0);

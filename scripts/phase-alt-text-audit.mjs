#!/usr/bin/env node
/**
 * Alt-text audit — flags img tags missing alt or with empty alt="" (Ahrefs "Missing alt text").
 *
 * Usage: node scripts/phase-alt-text-audit.mjs [baseUrl]
 * Output: docs/seo-remediation/phase-alt-text-validation.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const base = (process.argv[2] || "https://www.kinexisdigital.com").replace(/\/$/, "");
const USER_AGENT = "KinexisAltTextAudit/1.0";
const CONCURRENCY = 12;

function parseSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  return { status: res.status, html: await res.text() };
}

function auditHtml(html) {
  const missingAlt = (html.match(/<img(?![^>]*\balt=)[^>]*>/gi) || []).length;
  const emptyAlt = (html.match(/<img[^>]*\balt=""[^>]*>/gi) || []).length;
  const totalImgs = (html.match(/<img[\s>]/gi) || []).length;
  return { missingAlt, emptyAlt, totalImgs, issueCount: missingAlt + emptyAlt };
}

async function mapPool(items, limit, fn) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

const sitemapRes = await fetchText(`${base}/sitemap.xml`);
if (sitemapRes.status !== 200) {
  console.error(`Failed to fetch sitemap: HTTP ${sitemapRes.status}`);
  process.exit(1);
}

const urls = parseSitemapUrls(sitemapRes.html);
console.log(`Alt-text audit — ${urls.length} sitemap URLs\n`);

const rows = await mapPool(urls, CONCURRENCY, async (url) => {
  const { status, html } = await fetchText(url);
  if (status !== 200) {
    return { url, status, missingAlt: 0, emptyAlt: 0, totalImgs: 0, issueCount: 0, fetchError: true };
  }
  const audit = auditHtml(html);
  return { url, status, ...audit, fetchError: false };
});

const failing = rows.filter((r) => !r.fetchError && r.issueCount > 0);
const fetchErrors = rows.filter((r) => r.fetchError || r.status !== 200);

const summary = {
  timestamp: new Date().toISOString(),
  base,
  sitemap_url_count: urls.length,
  urls_with_alt_issues: failing.length,
  total_missing_alt: failing.reduce((s, r) => s + r.missingAlt, 0),
  total_empty_alt: failing.reduce((s, r) => s + r.emptyAlt, 0),
  fetch_errors: fetchErrors.length,
  pass: failing.length === 0 && fetchErrors.length === 0,
  sample_failures: failing.slice(0, 10),
};

const outDir = path.join(root, "docs", "seo-remediation");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "phase-alt-text-validation.json");
fs.writeFileSync(outPath, JSON.stringify({ summary, rows: failing }, null, 2));

console.log(JSON.stringify(summary, null, 2));
console.log(`\nValidation JSON: ${outPath}`);
process.exit(summary.pass ? 0 : 1);

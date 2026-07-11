#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const csvPath = path.join(__dirname, "..", "docs", "seo-remediation", "phase-01-audit.csv");
const lines = fs.readFileSync(csvPath, "utf8").trim().split("\n");
const headers = lines[0].split(",");

function parseCsvLine(line) {
  const out = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQ) {
      if (c === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (c === '"') inQ = false;
      else cur += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") {
      out.push(cur);
      cur = "";
    } else cur += c;
  }
  out.push(cur);
  return Object.fromEntries(headers.map((h, idx) => [h, out[idx] ?? ""]));
}

const rows = lines.slice(1).map(parseCsvLine);
const hreflangIssues = [];
const reciprocalIssues = [];
const tagMap = new Map();

for (const row of rows) {
  if (row.http_status !== "200" || !row.hreflang_set) continue;
  const tags = {};
  for (const part of row.hreflang_set.split(" | ")) {
    const i = part.indexOf(":");
    if (i < 0) continue;
    tags[part.slice(0, i)] = part.slice(i + 1);
  }
  tagMap.set(row.final_url, tags);

  const enCount = Object.keys(tags).filter((k) => k === "en").length;
  const esCount = Object.keys(tags).filter((k) => k.startsWith("es")).length;
  if (enCount > 1) hreflangIssues.push({ url: row.start_url, type: "duplicate-en-hreflang", tags });
  if (esCount > 1) hreflangIssues.push({ url: row.start_url, type: "duplicate-es-hreflang", tags });
  if (row.canonical.startsWith("http://")) {
    hreflangIssues.push({ url: row.start_url, type: "canonical-http", canonical: row.canonical });
  }
  for (const [lang, href] of Object.entries(tags)) {
    if (href.startsWith("http://")) {
      hreflangIssues.push({ url: row.start_url, type: "hreflang-target-http", lang, href });
    }
  }
}

for (const [url, tags] of tagMap.entries()) {
  for (const [lang, href] of Object.entries(tags)) {
    const targetTags = tagMap.get(href);
    if (!targetTags) {
      reciprocalIssues.push({ from: url, lang, href, issue: "target-not-in-crawl" });
      continue;
    }
    const back = Object.entries(targetTags).find(([, h]) => h === url);
    if (!back) {
      reciprocalIssues.push({ from: url, lang, href, issue: "missing-return-reference" });
    }
  }
}

const probes = [
  "http://www.kinexisdigital.com/en",
  "http://kinexisdigital.com/en",
  "https://kinexisdigital.com/en",
  "https://www.kinexisdigital.com/en",
  "http://www.kinexisdigital.com/sitemap.xml",
];

const probeResults = [];
for (const url of probes) {
  const res = await fetch(url, { redirect: "manual", headers: { "User-Agent": "KinexisPhase1Audit/1.0" } });
  probeResults.push({ url, status: res.status, location: res.headers.get("location") ?? "" });
}

const ahrefsBaseline = {
  "Hreflang annotation invalid": 380,
  "Hreflang to redirect or broken page": 380,
  "More than one page for same language in hreflang": 380,
  "Page referenced for more than one language in hreflang": 380,
  "HTML lang attribute invalid": 190,
  "Canonical from HTTP to HTTPS": 190,
  "Page in multiple sitemaps": 378,
  "3XX redirect": 200,
  "Meta description too short": 132,
  "Nofollow page": 3,
  "Noindex page": 3,
  "Noindex and nofollow page": 3,
};

const crawlFindings = {
  rows_total: rows.length,
  hreflang_pattern_issues: hreflangIssues.length,
  reciprocal_issues: reciprocalIssues.length,
  noindex_pages: rows.filter((r) => r.indexability === "noindex").length,
  redirect_urls: rows.filter((r) => Number(r.redirect_hops) > 0).length,
  redirect_chains_over_1: rows.filter((r) => Number(r.redirect_hops) > 1).length,
  canonical_http: rows.filter((r) => r.canonical.startsWith("http://")).length,
  html_lang_invalid: rows.filter(
    (r) => r.http_status === "200" && r.html_lang && !/^(en|es(-419)?)$/.test(r.html_lang),
  ).length,
  probe_results: probeResults,
  sample_hreflang_issues: hreflangIssues.slice(0, 5),
  sample_reciprocal_issues: reciprocalIssues.slice(0, 5),
};

const outPath = path.join(__dirname, "..", "docs", "seo-remediation", "phase-01-ahrefs-crossref.json");
fs.writeFileSync(
  outPath,
  JSON.stringify({ ahrefs_baseline: ahrefsBaseline, crawl_findings: crawlFindings }, null, 2),
  "utf8",
);

console.log(JSON.stringify(crawlFindings, null, 2));
console.log(`\nWrote ${outPath}`);

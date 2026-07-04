#!/usr/bin/env node
/**
 * Phase 3 — Canonical audit.
 * Crawls sitemap URLs + Ahrefs HTTP sample; validates canonical presence,
 * HTTPS scheme, self-reference, target 200, cross-locale mismatches, duplicates.
 *
 * Usage: node scripts/phase3-canonical-audit.mjs [baseUrl]
 * Output: docs/seo-remediation/phase-03-audit.csv
 *         docs/seo-remediation/phase-03-validation.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = (process.argv[2] || "https://www.kinexisdigital.com").replace(/\/$/, "");
const USER_AGENT = "KinexisPhase3Canonical/1.0";

const AHREFS_CSV = path.join(
  __dirname,
  "..",
  "docs",
  "seo-remediation",
  "ahrefs-export",
  "kinexisdigital_01-jul-2026_canonical-from-htt_2026-07-02_16-41-05.csv"
);

const HTTP_PROBE_SAMPLE_SIZE = 20;
const CONCURRENCY = 8;

function csvEscape(value) {
  const s = value == null ? "" : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function extractCanonicals(html) {
  const tags = [];
  const re =
    /<link[^>]+rel=["']canonical["'][^>]*>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const tag = m[0];
    const href =
      tag.match(/href=["']([^"']+)["']/i)?.[1] ??
      tag.match(/href=([^\s>]+)/i)?.[1]?.replace(/^["']|["']$/g, "") ??
      "";
    tags.push(href);
  }
  return tags;
}

function extractRobotsMeta(html) {
  const re = /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i;
  const alt = /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["']/i;
  return html.match(re)?.[1] ?? html.match(alt)?.[1] ?? "";
}

function normalizeUrl(url) {
  try {
    const u = new URL(url);
    u.hash = "";
    let p = u.pathname;
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    u.pathname = p;
    return u.href;
  } catch {
    return url;
  }
}

function localeFromPath(pathname) {
  const m = pathname.match(/^\/(en|es)(\/|$)/);
  return m?.[1] ?? "";
}

function expectedSelfCanonical(pageUrl) {
  return normalizeUrl(pageUrl);
}

function loadAhrefsHttpUrls() {
  if (!fs.existsSync(AHREFS_CSV)) return [];
  const text = fs.readFileSync(AHREFS_CSV, "utf8");
  const lines = text.trim().split(/\r?\n/);
  const urls = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",");
    if (cols.length < 2) continue;
    const url = cols[1]?.trim();
    if (url?.startsWith("http://")) urls.push(url);
  }
  return [...new Set(urls)];
}

async function fetchPage(url, redirect = "follow") {
  try {
    const res = await fetch(url, {
      redirect,
      headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
    });
    const html =
      res.headers.get("content-type")?.includes("text/html") ? await res.text() : "";
    return {
      url,
      finalUrl: res.url,
      status: res.status,
      html,
      location: res.headers.get("location") ?? "",
      error: null,
    };
  } catch (e) {
    return { url, finalUrl: url, status: 0, html: "", location: "", error: e.message };
  }
}

async function fetchSitemapUrls() {
  const res = await fetch(`${base}/sitemap.xml`, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`sitemap fetch failed: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => normalizeUrl(m[1]))
    .filter(Boolean);
}

async function checkCanonicalTarget(canonicalUrl) {
  if (!canonicalUrl) return { status: 0, error: "empty" };
  const res = await fetchPage(canonicalUrl, "manual");
  if (res.status >= 300 && res.status < 400 && res.location) {
    const final = await fetchPage(new URL(res.location, canonicalUrl).href, "manual");
    return { status: final.status, redirectFrom: canonicalUrl, redirectTo: final.finalUrl };
  }
  return { status: res.status };
}

async function mapPool(items, fn, limit) {
  const results = new Array(items.length);
  let idx = 0;
  async function worker() {
    while (idx < items.length) {
      const i = idx++;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function auditRow(pageUrl, fetchResult, canonicalTarget) {
  const canonicals = extractCanonicals(fetchResult.html);
  const robotsMeta = extractRobotsMeta(fetchResult.html);
  const pageLocale = localeFromPath(new URL(fetchResult.finalUrl).pathname);
  const expected = expectedSelfCanonical(fetchResult.finalUrl);

  const issues = [];
  if (fetchResult.status !== 200) issues.push(`page_status_${fetchResult.status}`);
  if (canonicals.length === 0 && fetchResult.status === 200) issues.push("missing_canonical");
  if (canonicals.length > 1) issues.push("multiple_canonicals");
  for (const c of canonicals) {
    if (c.startsWith("http://")) issues.push("canonical_http_scheme");
    if (!c.startsWith("https://www.kinexisdigital.com")) issues.push("canonical_wrong_host");
  }
  const primary = canonicals[0] ?? "";
  if (primary && normalizeUrl(primary) !== expected) {
    const canonLocale = localeFromPath(new URL(primary).pathname);
    if (pageLocale && canonLocale && pageLocale !== canonLocale) {
      issues.push("cross_locale_canonical");
    } else {
      issues.push("not_self_referencing");
    }
  }
  if (canonicalTarget?.status && canonicalTarget.status !== 200) {
    issues.push(`canonical_target_${canonicalTarget.status}`);
  }
  if (robotsMeta.toLowerCase().includes("noindex")) issues.push("noindex");

  return {
    url: pageUrl,
    final_url: fetchResult.finalUrl,
    http_status: fetchResult.status,
    canonical_count: canonicals.length,
    canonical_primary: primary,
    canonical_all: canonicals.join(" | "),
    expected_canonical: expected,
    self_referencing: primary ? normalizeUrl(primary) === expected : false,
    canonical_https: primary ? primary.startsWith("https://") : null,
    canonical_target_status: canonicalTarget?.status ?? "",
    page_locale: pageLocale,
    robots_meta: robotsMeta,
    issues: issues.join(";"),
    pass: issues.length === 0,
    error: fetchResult.error ?? "",
  };
}

async function probeHttpUrl(httpUrl) {
  const res = await fetchPage(httpUrl, "manual");
  const issues = [];
  if (res.status === 200) issues.push("http_serves_200");
  if (res.status < 300 || res.status >= 400) {
    if (res.status !== 301 && res.status !== 308) issues.push(`unexpected_status_${res.status}`);
  }
  const loc = res.location ? normalizeUrl(new URL(res.location, httpUrl).href) : "";
  if (loc && !loc.startsWith("https://")) issues.push("redirect_not_https");
  return {
    http_url: httpUrl,
    status: res.status,
    location: res.location,
    redirect_target: loc,
    issues: issues.join(";"),
    pass: issues.length === 0 && (res.status === 301 || res.status === 308),
  };
}

async function main() {
  const started = new Date().toISOString();
  console.log(`\nPhase 3 canonical audit — ${base}\n${"=".repeat(60)}\n`);

  const sitemapUrls = await fetchSitemapUrls();
  console.log(`Sitemap URLs: ${sitemapUrls.length}`);

  const rows = [];
  let done = 0;
  const sitemapResults = await mapPool(
    sitemapUrls,
    async (url) => {
      const fetchResult = await fetchPage(url);
      const canonicals = extractCanonicals(fetchResult.html);
      const target = canonicals[0] ? await checkCanonicalTarget(canonicals[0]) : null;
      const row = auditRow(url, fetchResult, target);
      done++;
      if (done % 50 === 0 || done === sitemapUrls.length) {
        process.stdout.write(`  Crawled ${done}/${sitemapUrls.length} sitemap URLs\r`);
      }
      return row;
    },
    CONCURRENCY
  );
  rows.push(...sitemapResults);
  console.log(`\n`);

  const ahrefsHttpUrls = loadAhrefsHttpUrls();
  const sample = ahrefsHttpUrls.slice(0, HTTP_PROBE_SAMPLE_SIZE);
  console.log(`Ahrefs HTTP-canonical rows in export: ${ahrefsHttpUrls.length}`);
  console.log(`Probing HTTP sample (${sample.length} URLs)...\n`);

  const httpProbes = [];
  for (const httpUrl of sample) {
    const probe = await probeHttpUrl(httpUrl);
    httpProbes.push(probe);
    console.log(
      `${probe.pass ? "PASS" : "FAIL"} HTTP ${httpUrl} → ${probe.status}${probe.location ? ` → ${probe.location}` : ""}`
    );
  }

  const rootHttpProbe = await probeHttpUrl("http://www.kinexisdigital.com/en");
  httpProbes.unshift(rootHttpProbe);
  console.log(
    `${rootHttpProbe.pass ? "PASS" : "FAIL"} HTTP http://www.kinexisdigital.com/en → ${rootHttpProbe.status}${rootHttpProbe.location ? ` → ${rootHttpProbe.location}` : ""}`
  );

  const issueCounts = {};
  for (const row of rows) {
    if (!row.issues) continue;
    for (const issue of row.issues.split(";").filter(Boolean)) {
      issueCounts[issue] = (issueCounts[issue] ?? 0) + 1;
    }
  }

  const summary = {
    timestamp: started,
    finished: new Date().toISOString(),
    base,
    sitemap_url_count: sitemapUrls.length,
    sitemap_crawled: rows.length,
    sitemap_pass: rows.filter((r) => r.pass).length,
    sitemap_fail: rows.filter((r) => !r.pass).length,
    missing_canonical: rows.filter((r) => r.issues.includes("missing_canonical")).length,
    multiple_canonicals: rows.filter((r) => r.issues.includes("multiple_canonicals")).length,
    canonical_http_scheme: rows.filter((r) => r.issues.includes("canonical_http_scheme")).length,
    cross_locale_canonical: rows.filter((r) => r.issues.includes("cross_locale_canonical")).length,
    not_self_referencing: rows.filter((r) => r.issues.includes("not_self_referencing")).length,
    canonical_target_non_200: rows.filter((r) =>
      r.issues.split(";").some((i) => i.startsWith("canonical_target_"))
    ).length,
    issue_breakdown: issueCounts,
    ahrefs_http_rows_in_export: ahrefsHttpUrls.length,
    http_probes_total: httpProbes.length,
    http_probes_pass: httpProbes.filter((p) => p.pass).length,
    http_probes_fail: httpProbes.filter((p) => !p.pass).length,
    phase3Pass:
      rows.every((r) => r.pass) &&
      httpProbes.every((p) => p.pass),
  };

  const outDir = path.join(__dirname, "..", "docs", "seo-remediation");
  fs.mkdirSync(outDir, { recursive: true });

  const csvHeaders = [
    "url",
    "final_url",
    "http_status",
    "canonical_count",
    "canonical_primary",
    "expected_canonical",
    "self_referencing",
    "canonical_https",
    "canonical_target_status",
    "page_locale",
    "robots_meta",
    "issues",
    "pass",
    "error",
  ];
  const csvPath = path.join(outDir, "phase-03-audit.csv");
  const csvLines = [csvHeaders.join(",")];
  for (const row of rows) {
    csvLines.push(csvHeaders.map((h) => csvEscape(row[h])).join(","));
  }
  fs.writeFileSync(csvPath, csvLines.join("\n"), "utf8");

  const validationPath = path.join(outDir, "phase-03-validation.json");
  fs.writeFileSync(
    validationPath,
    JSON.stringify({ summary, httpProbes, failures: rows.filter((r) => !r.pass) }, null, 2),
    "utf8"
  );

  console.log("\n--- Summary ---");
  console.log(JSON.stringify(summary, null, 2));
  console.log(`\nCSV: ${csvPath}`);
  console.log(`Validation JSON: ${validationPath}\n`);

  process.exit(summary.phase3Pass ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

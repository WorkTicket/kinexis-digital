#!/usr/bin/env node
/**
 * Phase 9 — Sitemap & discovery audit.
 * Validates canonical sitemap, host-variant redirects, robots.txt, duplicates,
 * and indexability sample. Compares Ahrefs multiple-sitemaps export.
 *
 * Usage: node scripts/phase9-sitemap-audit.mjs [baseUrl]
 * Output: docs/seo-remediation/phase-09-audit.csv
 *         docs/seo-remediation/phase-09-validation.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const base = (process.argv[2] || "https://www.kinexisdigital.com").replace(/\/$/, "");
const USER_AGENT = "KinexisPhase9Sitemap/1.0";
const CONCURRENCY = 8;
const CANONICAL_HOST = "www.kinexisdigital.com";
const EXPECTED_SITEMAP_COUNT = 378;

const AHREFS_EXPORT = path.join(
  root,
  "docs",
  "seo-remediation",
  "ahrefs-export",
  "kinexisdigital_01-jul-2026_page-in-multiple-s_2026-07-02_16-47-04.csv"
);

const BUILD_SITEMAP_BODY = path.join(root, ".next", "server", "app", "sitemap.xml.body");

const NON_CANONICAL_SITEMAP_URLS = [
  "http://kinexisdigital.com/sitemap.xml",
  "http://www.kinexisdigital.com/sitemap.xml",
  "https://kinexisdigital.com/sitemap.xml",
];

const NON_CANONICAL_ROBOTS_URLS = [
  "http://kinexisdigital.com/robots.txt",
  "http://www.kinexisdigital.com/robots.txt",
  "https://kinexisdigital.com/robots.txt",
];

function csvEscape(value) {
  const s = value == null ? "" : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
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

function loadAhrefsRowUrls(csvPath) {
  if (!fs.existsSync(csvPath)) return [];
  const text = fs.readFileSync(csvPath, "utf8");
  return [
    ...new Set(
      [...text.matchAll(/^\d+,(https?:\/\/[^,\r\n]+)/gm)].map((m) => normalizeUrl(m[1]))
    ),
  ];
}

/** Expected URLs from last `next build` sitemap artifact (registry-driven). */
function loadExpectedUrlsFromBuild() {
  if (!fs.existsSync(BUILD_SITEMAP_BODY)) return null;
  const xml = fs.readFileSync(BUILD_SITEMAP_BODY, "utf8");
  return [...new Set(parseSitemapLocs(xml))];
}

function diffUrlSets(expected, actual) {
  const expectedSet = new Set(expected.map(normalizeUrl));
  const actualSet = new Set(actual.map(normalizeUrl));
  const missingFromSitemap = [...expectedSet].filter((u) => !actualSet.has(u));
  const extraInSitemap = [...actualSet].filter((u) => !expectedSet.has(u));
  return { missingFromSitemap, extraInSitemap };
}

async function fetchWithRedirects(url, maxRedirects = 0) {
  try {
    const res = await fetch(url, {
      redirect: maxRedirects > 0 ? "follow" : "manual",
      headers: { "User-Agent": USER_AGENT },
    });
    const body =
      res.headers.get("content-type")?.includes("text") ||
      res.headers.get("content-type")?.includes("xml")
        ? await res.text()
        : "";
    return {
      url,
      status: res.status,
      finalUrl: res.url,
      location: res.headers.get("location") ?? "",
      body,
      error: null,
    };
  } catch (e) {
    return { url, status: 0, finalUrl: url, location: "", body: "", error: e.message };
  }
}

function parseSitemapLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => normalizeUrl(m[1].trim()));
}

function extractRobotsMeta(html) {
  const re = /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i;
  const alt = /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["']/i;
  return html.match(re)?.[1] ?? html.match(alt)?.[1] ?? "";
}

function extractCanonical(html) {
  const re = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i;
  const alt = /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i;
  return html.match(re)?.[1] ?? html.match(alt)?.[1] ?? "";
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

async function auditRedirectVariant(url, canonicalTarget) {
  const res = await fetchWithRedirects(url, 0);
  const issues = [];
  if (res.status >= 300 && res.status < 400) {
    const loc = res.location || res.finalUrl;
    if (!loc.includes(CANONICAL_HOST) || !loc.includes(canonicalTarget)) {
      issues.push("redirect_wrong_target");
    }
  } else if (res.status === 200) {
    issues.push("should_redirect_not_200");
  } else {
    issues.push(`unexpected_status_${res.status}`);
  }
  return {
    url,
    expected_target: `${base}${canonicalTarget}`,
    http_status: res.status,
    location: res.location,
    issues: issues.join(";"),
    pass: issues.length === 0,
  };
}

async function auditSitemapUrl(url) {
  const res = await fetchWithRedirects(url, 5);
  const issues = [];
  if (res.status !== 200) issues.push(`page_status_${res.status}`);
  const robots = res.status === 200 ? extractRobotsMeta(res.body) : "";
  if (robots.toLowerCase().includes("noindex")) issues.push("noindex_in_sitemap");
  const canonical = res.status === 200 ? extractCanonical(res.body) : "";
  if (canonical && normalizeUrl(canonical) !== normalizeUrl(url)) {
    issues.push("canonical_mismatch");
  }
  if (!url.includes(CANONICAL_HOST)) issues.push("non_canonical_host");
  return {
    url,
    http_status: res.status,
    robots_meta: robots,
    canonical,
    issues: issues.join(";"),
    pass: issues.length === 0,
  };
}

async function main() {
  const started = new Date().toISOString();
  console.log(`Phase 9 sitemap audit — ${base}\n`);

  const canonicalSitemap = await fetchWithRedirects(`${base}/sitemap.xml`, 5);
  const sitemapIssues = [];
  if (canonicalSitemap.status !== 200) sitemapIssues.push(`sitemap_status_${canonicalSitemap.status}`);

  const locs = canonicalSitemap.status === 200 ? parseSitemapLocs(canonicalSitemap.body) : [];
  const uniqueLocs = [...new Set(locs)];
  if (locs.length !== uniqueLocs.length) sitemapIssues.push("duplicate_loc_entries");
  if (locs.length !== EXPECTED_SITEMAP_COUNT) sitemapIssues.push(`url_count_${locs.length}_not_${EXPECTED_SITEMAP_COUNT}`);

  const nonWwwLocs = locs.filter((u) => !u.includes(CANONICAL_HOST));
  if (nonWwwLocs.length) sitemapIssues.push("non_www_loc_entries");

  const httpLocs = locs.filter((u) => u.startsWith("http://"));
  if (httpLocs.length) sitemapIssues.push("insecure_loc_entries");

  const robotsRes = await fetchWithRedirects(`${base}/robots.txt`, 5);
  const robotsIssues = [];
  if (robotsRes.status !== 200) robotsIssues.push(`robots_status_${robotsRes.status}`);
  const sitemapLine = robotsRes.body.match(/^Sitemap:\s*(.+)$/im)?.[1]?.trim() ?? "";
  if (sitemapLine !== `${base}/sitemap.xml`) robotsIssues.push("robots_sitemap_mismatch");

  console.log("Checking non-canonical host redirects...");
  const redirectChecks = [
    ...(await Promise.all(NON_CANONICAL_SITEMAP_URLS.map((u) => auditRedirectVariant(u, "/sitemap.xml")))),
    ...(await Promise.all(NON_CANONICAL_ROBOTS_URLS.map((u) => auditRedirectVariant(u, "/robots.txt")))),
  ];
  const redirectFails = redirectChecks.filter((r) => !r.pass);

  console.log(`Crawling ${locs.length} sitemap URLs for indexability...`);
  const pageRows = await mapPool(locs, (url) => auditSitemapUrl(url), CONCURRENCY);
  const pageFails = pageRows.filter((r) => !r.pass);

  const indexnowConfigPath = path.join(root, "indexnow.public.json");
  const indexnowConfig = fs.existsSync(indexnowConfigPath)
    ? JSON.parse(fs.readFileSync(indexnowConfigPath, "utf8"))
    : null;

  let indexnowKeyOk = null;
  if (indexnowConfig?.keyLocation) {
    const keyRes = await fetchWithRedirects(indexnowConfig.keyLocation, 5);
    indexnowKeyOk =
      keyRes.status === 200 && keyRes.body.trim() === indexnowConfig.key;
  }

  const ahrefsUrls = loadAhrefsRowUrls(AHREFS_EXPORT);

  const expectedFromBuild = loadExpectedUrlsFromBuild();
  let registryDiff = null;
  if (expectedFromBuild) {
    registryDiff = diffUrlSets(expectedFromBuild, locs);
    if (registryDiff.missingFromSitemap.length) {
      sitemapIssues.push(`missing_from_sitemap_${registryDiff.missingFromSitemap.length}`);
    }
    if (registryDiff.extraInSitemap.length) {
      sitemapIssues.push(`extra_in_sitemap_${registryDiff.extraInSitemap.length}`);
    }
    if (expectedFromBuild.length !== EXPECTED_SITEMAP_COUNT) {
      sitemapIssues.push(`registry_count_${expectedFromBuild.length}_not_${EXPECTED_SITEMAP_COUNT}`);
    }
  } else {
    console.warn(
      "WARN: .next/server/app/sitemap.xml.body not found — run `npm run build` for registry bidirectional diff.\n"
    );
  }

  const summary = {
    timestamp: started,
    finished: new Date().toISOString(),
    base,
    expected_sitemap_url_count: EXPECTED_SITEMAP_COUNT,
    sitemap_url_count: locs.length,
    sitemap_unique_count: uniqueLocs.length,
    sitemap_duplicate_locs: locs.length - uniqueLocs.length,
    sitemap_issues: sitemapIssues,
    robots_sitemap_directive: sitemapLine,
    robots_issues: robotsIssues,
    non_canonical_redirect_checks: redirectChecks.length,
    non_canonical_redirect_failures: redirectFails.length,
    indexable_page_failures: pageFails.length,
    indexnow_configured: Boolean(indexnowConfig?.key),
    indexnow_key_reachable: indexnowKeyOk,
    ahrefs_multiple_sitemaps_baseline: ahrefsUrls.length,
    registry_expected_count: expectedFromBuild?.length ?? null,
    registry_missing_from_sitemap: registryDiff?.missingFromSitemap.length ?? null,
    registry_extra_in_sitemap: registryDiff?.extraInSitemap.length ?? null,
    registry_diff_available: Boolean(expectedFromBuild),
    phase9Pass:
      sitemapIssues.length === 0 &&
      robotsIssues.length === 0 &&
      redirectFails.length === 0 &&
      pageFails.length === 0 &&
      locs.length === EXPECTED_SITEMAP_COUNT &&
      (expectedFromBuild === null ||
        (registryDiff.missingFromSitemap.length === 0 && registryDiff.extraInSitemap.length === 0)),
  };

  const outDir = path.join(root, "docs", "seo-remediation");
  fs.mkdirSync(outDir, { recursive: true });

  const csvHeaders = ["url", "http_status", "robots_meta", "canonical", "issues", "pass"];
  const csvPath = path.join(outDir, "phase-09-audit.csv");
  fs.writeFileSync(
    csvPath,
    [
      csvHeaders.join(","),
      ...pageRows.map((r) => csvHeaders.map((h) => csvEscape(r[h])).join(",")),
    ].join("\n"),
    "utf8"
  );

  const validationPath = path.join(outDir, "phase-09-validation.json");
  fs.writeFileSync(
    validationPath,
    JSON.stringify(
      {
        summary,
        redirectChecks,
        redirectFailures: redirectFails,
        pageFailures: pageFails.slice(0, 30),
        registryDiff: registryDiff
          ? {
              missingFromSitemap: registryDiff.missingFromSitemap.slice(0, 50),
              extraInSitemap: registryDiff.extraInSitemap.slice(0, 50),
            }
          : null,
        gsc_manual_checklist: {
          action: "Google Search Console → Sitemaps → submit https://www.kinexisdigital.com/sitemap.xml",
          owner: "human",
          confirm: "Status Success, discovered URLs ≈ 378",
        },
      },
      null,
      2
    ),
    "utf8"
  );

  console.log("\n--- Summary ---");
  console.log(JSON.stringify(summary, null, 2));
  console.log(`\nCSV: ${csvPath}`);
  console.log(`Validation JSON: ${validationPath}\n`);

  process.exit(summary.phase9Pass ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

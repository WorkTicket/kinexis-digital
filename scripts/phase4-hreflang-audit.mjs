#!/usr/bin/env node
/**
 * Phase 4 — Hreflang audit.
 * Crawls sitemap URLs; validates hreflang count, duplicates, reciprocity,
 * unprefixed/307 alternates, x-default validity, HTML lang, target 200.
 *
 * Usage: node scripts/phase4-hreflang-audit.mjs [baseUrl]
 * Output: docs/seo-remediation/phase-04-audit.csv
 *         docs/seo-remediation/phase-04-validation.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = (process.argv[2] || "https://www.kinexisdigital.com").replace(/\/$/, "");
const USER_AGENT = "KinexisPhase4Hreflang/1.0";
const CONCURRENCY = 8;

const AHREFS_HREFLANG_CSV = path.join(
  __dirname,
  "..",
  "docs",
  "seo-remediation",
  "ahrefs-export",
  "kinexisdigital_01-jul-2026_hreflang-annotatio_2026-07-02_16-43-19.csv"
);

const VALID_HTML_LANG = /^(en|es)$/;

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

function localeFromPath(pathname) {
  const m = pathname.match(/^\/(en|es)(\/|$)/);
  return m?.[1] ?? "";
}

function pathWithoutLocale(url) {
  try {
    const u = new URL(url);
    const m = u.pathname.match(/^\/(en|es)(\/.*|$)/);
    if (m) {
      const rest = m[2] || "/";
      return rest === "" ? "/" : rest;
    }
    return u.pathname || "/";
  } catch {
    return "/";
  }
}

function extractHtmlLang(html) {
  return html.match(/<html[^>]+lang=["']([^"']+)["']/i)?.[1] ?? "";
}

function extractRobotsMeta(html) {
  const re = /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i;
  const alt = /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["']/i;
  return html.match(re)?.[1] ?? html.match(alt)?.[1] ?? "";
}

function parseLinkHeader(value) {
  if (!value) return [];
  const tags = [];
  for (const part of value.split(",")) {
    const trimmed = part.trim();
    const urlMatch = trimmed.match(/^<([^>]+)>/);
    const hreflangMatch = trimmed.match(/hreflang="([^"]+)"/i);
    if (urlMatch && hreflangMatch) {
      tags.push({ hreflang: hreflangMatch[1], href: urlMatch[1] });
    }
  }
  return tags;
}

function extractHreflang(html) {
  const seen = new Set();
  const tags = [];
  const patterns = [
    /<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["'][^>]*>/gi,
    /<link[^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["'][^>]+rel=["']alternate["'][^>]*>/gi,
    /<link[^>]+href=["']([^"']+)["'][^>]+hreflang=["']([^"']+)["'][^>]+rel=["']alternate["'][^>]*>/gi,
    /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["'][^>]*>/gi,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(html)) !== null) {
      const a = m[1];
      const b = m[2];
      const tag = /^https?:\/\//.test(a)
        ? { hreflang: b, href: a }
        : { hreflang: a, href: b };
      const key = `${tag.hreflang}|${normalizeUrl(tag.href)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      tags.push(tag);
    }
  }
  return tags;
}

function loadAhrefsSampleUrls(csvPath, limit = 10) {
  if (!fs.existsSync(csvPath)) return [];
  const text = fs.readFileSync(csvPath, "utf8");
  const lines = text.trim().split(/\r?\n/);
  const urls = [];
  for (let i = 1; i < lines.length && urls.length < limit; i++) {
    const line = lines[i];
    const match = line.match(/https:\/\/www\.kinexisdigital\.com\/[^,"\s]+/);
    if (match) urls.push(normalizeUrl(match[0]));
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
      linkHeader: res.headers.get("link") ?? "",
      location: res.headers.get("location") ?? "",
      error: null,
    };
  } catch (e) {
    return {
      url,
      finalUrl: url,
      status: 0,
      html: "",
      linkHeader: "",
      location: "",
      error: e.message,
    };
  }
}

async function checkAlternateTarget(href) {
  const res = await fetchPage(href, "manual");
  if (res.status >= 300 && res.status < 400 && res.location) {
    const target = normalizeUrl(new URL(res.location, href).href);
    const final = await fetchPage(target, "manual");
    return {
      status: final.status,
      redirectStatus: res.status,
      redirectTo: target,
    };
  }
  return { status: res.status, redirectStatus: null, redirectTo: null };
}

async function fetchSitemapUrls() {
  const res = await fetch(`${base}/sitemap.xml`, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`sitemap fetch failed: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => normalizeUrl(m[1]))
    .filter(Boolean);
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

function analyzeHreflang(pageUrl, fetchResult, alternateTargets) {
  const htmlHreflangs = extractHreflang(fetchResult.html);
  const headerHreflangs = parseLinkHeader(fetchResult.linkHeader);
  const hreflangs = [...htmlHreflangs, ...headerHreflangs];
  const htmlLang = extractHtmlLang(fetchResult.html);
  const robotsMeta = extractRobotsMeta(fetchResult.html);
  const pageLocale = localeFromPath(new URL(fetchResult.finalUrl).pathname);
  const contentPath = pathWithoutLocale(fetchResult.finalUrl);

  const issues = [];
  if (fetchResult.status !== 200) issues.push(`page_status_${fetchResult.status}`);
  if (headerHreflangs.length > 0) issues.push("link_header_hreflang_present");

  const byLang = {};
  for (const tag of hreflangs) {
    byLang[tag.hreflang] = (byLang[tag.hreflang] ?? 0) + 1;
  }

  for (const [lang, count] of Object.entries(byLang)) {
    if (count > 1) issues.push(`duplicate_hreflang_${lang}`);
  }

  const unprefixed = hreflangs.filter((t) => {
    const loc = localeFromPath(new URL(t.href).pathname);
    return !loc && t.hreflang !== "x-default";
  });
  if (unprefixed.length) issues.push("unprefixed_alternate");

  const xDefault = hreflangs.find((t) => t.hreflang === "x-default");
  if (xDefault) {
    const xLoc = localeFromPath(new URL(xDefault.href).pathname);
    if (!xLoc) issues.push("x_default_unprefixed");
    const target = alternateTargets[normalizeUrl(xDefault.href)];
    if (target?.redirectStatus) issues.push("x_default_redirects");
    if (target?.status && target.status !== 200) issues.push(`x_default_target_${target.status}`);
  }

  for (const tag of hreflangs) {
    const target = alternateTargets[normalizeUrl(tag.href)];
    if (!target) continue;
    if (target.redirectStatus) issues.push(`alternate_redirects_${tag.hreflang}`);
    if (target.status && target.status !== 200) issues.push(`alternate_target_${tag.hreflang}_${target.status}`);
  }

  const expectedEn = normalizeUrl(`${base}/en${contentPath === "/" ? "" : contentPath}`);
  const expectedEs = normalizeUrl(`${base}/es${contentPath === "/" ? "" : contentPath}`);
  const hasEn = hreflangs.some((t) => t.hreflang === "en" && normalizeUrl(t.href) === expectedEn);
  const hasEs = hreflangs.some((t) => t.hreflang === "es" && normalizeUrl(t.href) === expectedEs);

  if (fetchResult.status === 200 && !robotsMeta.toLowerCase().includes("noindex")) {
    if (hreflangs.length === 0) issues.push("missing_hreflang");
    if (!hasEn) issues.push("missing_en_alternate");
    if (!hasEs) issues.push("missing_es_alternate");
  }

  if (htmlLang && !VALID_HTML_LANG.test(htmlLang)) issues.push("html_lang_invalid");
  if (pageLocale === "en" && htmlLang !== "en") issues.push("html_lang_mismatch_en");
  if (pageLocale === "es" && htmlLang !== "es") issues.push("html_lang_mismatch_es");

  const hreflangSet = hreflangs.map((t) => `${t.hreflang}:${t.href}`).join(" | ");

  return {
    url: pageUrl,
    final_url: fetchResult.finalUrl,
    http_status: fetchResult.status,
    page_locale: pageLocale,
    content_path: contentPath,
    html_lang: htmlLang,
    html_hreflang_count: htmlHreflangs.length,
    link_header_hreflang_count: headerHreflangs.length,
    hreflang_count: hreflangs.length,
    hreflang_unique_langs: Object.keys(byLang).length,
    hreflang_unique_urls: new Set(hreflangs.map((t) => normalizeUrl(t.href))).size,
    hreflang_set: hreflangSet,
    has_x_default: Boolean(xDefault),
    x_default_href: xDefault?.href ?? "",
    expected_en: expectedEn,
    expected_es: expectedEs,
    has_en_alternate: hasEn,
    has_es_alternate: hasEs,
    robots_meta: robotsMeta,
    issues: [...new Set(issues)].join(";"),
    pass: issues.length === 0,
    error: fetchResult.error ?? "",
  };
}

async function checkReciprocity(rows) {
  const byPath = new Map();
  for (const row of rows) {
    if (row.http_status !== 200) continue;
    const key = row.content_path;
    if (!byPath.has(key)) byPath.set(key, []);
    byPath.get(key).push(row);
  }

  const failures = [];
  for (const [contentPath, group] of byPath) {
    if (group.length < 2) continue;
    const enRow = group.find((r) => r.page_locale === "en");
    const esRow = group.find((r) => r.page_locale === "es");
    if (!enRow || !esRow) continue;

    const enTags = extractHreflangFromSet(enRow.hreflang_set);
    const esTags = extractHreflangFromSet(esRow.hreflang_set);

    const enListsEs = enTags.some(
      (t) => t.hreflang === "es" && normalizeUrl(t.href) === normalizeUrl(esRow.final_url)
    );
    const esListsEn = esTags.some(
      (t) => t.hreflang === "en" && normalizeUrl(t.href) === normalizeUrl(enRow.final_url)
    );

    if (!enListsEs || !esListsEn) {
      failures.push({
        content_path: contentPath,
        en_url: enRow.final_url,
        es_url: esRow.final_url,
        en_lists_es: enListsEs,
        es_lists_en: esListsEn,
      });
    }
  }
  return failures;
}

function extractHreflangFromSet(set) {
  if (!set) return [];
  return set.split(" | ").map((part) => {
    const idx = part.indexOf(":");
    return { hreflang: part.slice(0, idx), href: part.slice(idx + 1) };
  });
}

async function compareAhrefsSample(sampleUrls, liveRows) {
  const liveByUrl = new Map(liveRows.map((r) => [normalizeUrl(r.final_url), r]));
  const comparisons = [];

  for (const url of sampleUrls) {
    const live = liveByUrl.get(normalizeUrl(url));
    comparisons.push({
      ahrefs_url: url,
      live_found: Boolean(live),
      live_hreflang_count: live?.hreflang_count ?? null,
      live_issues: live?.issues ?? "",
      ahrefs_jul1_pattern: "5 tags (en×2, es×2, unprefixed 307)",
      live_clean: live ? live.pass : null,
    });
  }
  return comparisons;
}

async function main() {
  const started = new Date().toISOString();
  console.log(`\nPhase 4 hreflang audit — ${base}\n${"=".repeat(60)}\n`);

  const sitemapUrls = await fetchSitemapUrls();
  console.log(`Sitemap URLs: ${sitemapUrls.length}`);

  const extraUrls = [
    `${base}/en/lead-magnet`,
    `${base}/es/lead-magnet`,
  ].map(normalizeUrl);
  const allUrls = [...new Set([...sitemapUrls, ...extraUrls])];

  const rows = [];
  let done = 0;

  const crawlResults = await mapPool(
    allUrls,
    async (url) => {
      const fetchResult = await fetchPage(url);
      const hreflangs = extractHreflang(fetchResult.html);
      const uniqueHrefs = [...new Set(hreflangs.map((t) => normalizeUrl(t.href)))];
      const alternateTargets = {};
      for (const href of uniqueHrefs) {
        alternateTargets[href] = await checkAlternateTarget(href);
      }
      const row = analyzeHreflang(url, fetchResult, alternateTargets);
      done++;
      if (done % 50 === 0 || done === allUrls.length) {
        process.stdout.write(`  Crawled ${done}/${allUrls.length} URLs\r`);
      }
      return row;
    },
    CONCURRENCY
  );
  rows.push(...crawlResults);
  console.log("\n");

  const reciprocityFailures = await checkReciprocity(rows);
  const ahrefsSample = loadAhrefsSampleUrls(AHREFS_HREFLANG_CSV, 20);
  const ahrefsComparison = await compareAhrefsSample(ahrefsSample, rows);

  const issueCounts = {};
  for (const row of rows) {
    if (!row.issues) continue;
    for (const issue of row.issues.split(";").filter(Boolean)) {
      issueCounts[issue] = (issueCounts[issue] ?? 0) + 1;
    }
  }

  const sitemapRows = rows.filter((r) => sitemapUrls.includes(r.url));
  const leadMagnetRows = rows.filter((r) => r.url.includes("/lead-magnet"));

  const summary = {
    timestamp: started,
    finished: new Date().toISOString(),
    base,
    sitemap_url_count: sitemapUrls.length,
    urls_crawled: rows.length,
    sitemap_pass: sitemapRows.filter((r) => r.pass).length,
    sitemap_fail: sitemapRows.filter((r) => !r.pass).length,
    link_header_hreflang: rows.filter((r) => r.issues.includes("link_header_hreflang_present")).length,
    duplicate_hreflang: rows.filter((r) =>
      r.issues.split(";").some((i) => i.startsWith("duplicate_hreflang_"))
    ).length,
    duplicate_href_url_only: rows.filter((r) =>
      r.issues.split(";").some((i) => i.startsWith("duplicate_href_"))
    ).length,
    unprefixed_alternate: rows.filter((r) => r.issues.includes("unprefixed_alternate")).length,
    alternate_redirects: rows.filter((r) =>
      r.issues.split(";").some((i) => i.startsWith("alternate_redirects_"))
    ).length,
    alternate_non_200: rows.filter((r) =>
      r.issues.split(";").some((i) => i.startsWith("alternate_target_"))
    ).length,
    missing_hreflang: rows.filter((r) => r.issues.includes("missing_hreflang")).length,
    html_lang_invalid: rows.filter((r) => r.issues.includes("html_lang_invalid")).length,
    html_lang_mismatch: rows.filter((r) =>
      r.issues.split(";").some((i) => i.startsWith("html_lang_mismatch_"))
    ).length,
    reciprocity_failures: reciprocityFailures.length,
    lead_magnet_rows: leadMagnetRows.length,
    lead_magnet_pass: leadMagnetRows.filter((r) => r.pass).length,
    hreflang_count_distribution: {},
    issue_breakdown: issueCounts,
    ahrefs_jul1_export_stale_evidence: {
      sample_size: ahrefsComparison.length,
      live_clean_count: ahrefsComparison.filter((c) => c.live_clean).length,
      live_avg_hreflang_count:
        ahrefsComparison.filter((c) => c.live_hreflang_count != null).reduce((s, c) => s + c.live_hreflang_count, 0) /
        Math.max(1, ahrefsComparison.filter((c) => c.live_hreflang_count != null).length),
      jul1_expected_count: 5,
      live_expected_count: 3,
    },
    phase4Pass:
      sitemapRows.every((r) => r.pass) &&
      reciprocityFailures.length === 0 &&
      !issueCounts.unprefixed_alternate &&
      !issueCounts.link_header_hreflang_present &&
      !Object.keys(issueCounts).some((k) => k.startsWith("duplicate_hreflang_")),
  };

  for (const row of rows) {
    const k = String(row.hreflang_count);
    summary.hreflang_count_distribution[k] = (summary.hreflang_count_distribution[k] ?? 0) + 1;
  }

  const outDir = path.join(__dirname, "..", "docs", "seo-remediation");
  fs.mkdirSync(outDir, { recursive: true });

  const csvHeaders = [
    "url",
    "final_url",
    "http_status",
    "page_locale",
    "content_path",
    "html_lang",
    "hreflang_count",
    "hreflang_unique_langs",
    "hreflang_unique_urls",
    "has_x_default",
    "x_default_href",
    "has_en_alternate",
    "has_es_alternate",
    "robots_meta",
    "hreflang_set",
    "issues",
    "pass",
    "error",
  ];
  const csvPath = path.join(outDir, "phase-04-audit.csv");
  const csvLines = [csvHeaders.join(",")];
  for (const row of rows) {
    csvLines.push(csvHeaders.map((h) => csvEscape(row[h])).join(","));
  }
  fs.writeFileSync(csvPath, csvLines.join("\n"), "utf8");

  const validationPath = path.join(outDir, "phase-04-validation.json");
  fs.writeFileSync(
    validationPath,
    JSON.stringify(
      {
        summary,
        reciprocityFailures,
        ahrefsComparison,
        leadMagnetRows,
        failures: rows.filter((r) => !r.pass),
      },
      null,
      2
    ),
    "utf8"
  );

  console.log("--- Summary ---");
  console.log(JSON.stringify(summary, null, 2));
  console.log(`\nCSV: ${csvPath}`);
  console.log(`Validation JSON: ${validationPath}\n`);

  if (reciprocityFailures.length) {
    console.log(`Reciprocity failures: ${reciprocityFailures.length}`);
    console.log(JSON.stringify(reciprocityFailures.slice(0, 3), null, 2));
  }

  process.exit(summary.phase4Pass ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

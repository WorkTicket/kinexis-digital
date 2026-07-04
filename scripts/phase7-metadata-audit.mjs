#!/usr/bin/env node
/**
 * Phase 7 — Metadata & HTML audit.
 * Crawls sitemap URLs; extracts title, meta description length, H1 count,
 * html lang; detects duplicates; compares Ahrefs meta + html-lang exports.
 *
 * Usage: node scripts/phase7-metadata-audit.mjs [baseUrl]
 * Output: docs/seo-remediation/phase-07-audit.csv
 *         docs/seo-remediation/phase-07-validation.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = (process.argv[2] || "https://www.kinexisdigital.com").replace(/\/$/, "");
const USER_AGENT = "KinexisPhase7Metadata/1.0";
const CONCURRENCY = 8;
const META_DESCRIPTION_MIN = 120;
const META_DESCRIPTION_MAX = 155;
const VALID_HTML_LANG = new Set(["en", "es"]);
const INTENTIONAL_NOINDEX_PATHS = new Set(["/en/lead-magnet", "/es/lead-magnet"]);

const AHREFS_EXPORTS = {
  meta_too_short_indexable: path.join(
    __dirname,
    "..",
    "docs",
    "seo-remediation",
    "ahrefs-export",
    "kinexisdigital_01-jul-2026_meta-description-t_2026-07-02_16-43-12.csv"
  ),
  meta_too_short_not_indexable: path.join(
    __dirname,
    "..",
    "docs",
    "seo-remediation",
    "ahrefs-export",
    "kinexisdigital_01-jul-2026_meta-description-t_2026-07-02_16-43-03.csv"
  ),
  meta_too_short_http: path.join(
    __dirname,
    "..",
    "docs",
    "seo-remediation",
    "ahrefs-export",
    "kinexisdigital_01-jul-2026_meta-description-t_2026-07-02_16-42-54.csv"
  ),
  html_lang_invalid: path.join(
    __dirname,
    "..",
    "docs",
    "seo-remediation",
    "ahrefs-export",
    "kinexisdigital_01-jul-2026_html-lang-attribut_2026-07-02_16-43-55.csv"
  ),
};

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

function normalizePathname(url) {
  try {
    const u = new URL(url);
    let p = u.pathname;
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return p;
  } catch {
    return url;
  }
}

function decodeHtmlEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, " ")
    .trim();
}

function extractRobotsMeta(html) {
  const re = /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i;
  const alt = /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["']/i;
  return html.match(re)?.[1] ?? html.match(alt)?.[1] ?? "";
}

function extractTitle(html) {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  if (titleMatch) return decodeHtmlEntities(titleMatch[1]);
  const ogMatch = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
  if (ogMatch) return decodeHtmlEntities(ogMatch[1]);
  const ogAlt = html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i);
  return ogAlt ? decodeHtmlEntities(ogAlt[1]) : "";
}

function extractMetaDescription(html) {
  const re = /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i;
  const alt = /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i;
  const raw = html.match(re)?.[1] ?? html.match(alt)?.[1] ?? "";
  return decodeHtmlEntities(raw);
}

function extractHtmlLang(html) {
  const match = html.match(/<html[^>]+lang=["']([^"']+)["']/i);
  return match?.[1]?.trim() ?? "";
}

function countMetaDescriptions(html) {
  const re = /<meta[^>]+name=["']description["'][^>]*>/gi;
  return (html.match(re) ?? []).length;
}

function countH1(html) {
  const re = /<h1\b[^>]*>/gi;
  return (html.match(re) ?? []).length;
}

function extractH1Texts(html) {
  const re = /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi;
  const texts = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    texts.push(decodeHtmlEntities(m[1].replace(/<[^>]+>/g, "")));
  }
  return texts;
}

function isIndexable(status, robotsMeta) {
  if (status < 200 || status >= 300) return false;
  return !robotsMeta.toLowerCase().includes("noindex");
}

function isIntentionalNoindex(url) {
  return INTENTIONAL_NOINDEX_PATHS.has(normalizePathname(url));
}

function loadAhrefsRowUrls(csvPath) {
  if (!fs.existsSync(csvPath)) return [];
  const text = fs.readFileSync(csvPath, "utf8");
  return [
    ...new Set(
      [...text.matchAll(/^0,(https?:\/\/[^,]+)/gm)].map((m) => normalizeUrl(m[1]))
    ),
  ];
}

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
    });
    const html =
      res.headers.get("content-type")?.includes("text/html") ? await res.text() : "";
    return {
      url,
      finalUrl: res.url,
      status: res.status,
      html,
      error: null,
    };
  } catch (e) {
    return {
      url,
      finalUrl: url,
      status: 0,
      html: "",
      error: e.message,
    };
  }
}

function rewriteToAuditBase(url, auditBase) {
  try {
    const u = new URL(url);
    const b = new URL(auditBase);
    u.protocol = b.protocol;
    u.host = b.host;
    return normalizeUrl(u.href);
  } catch {
    return url;
  }
}

async function fetchSitemapUrls() {
  const res = await fetch(`${base}/sitemap.xml`, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`sitemap fetch failed: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => rewriteToAuditBase(normalizeUrl(m[1]), base))
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

function auditPage(fetchResult, inSitemap) {
  const robotsMeta = extractRobotsMeta(fetchResult.html);
  const indexable = isIndexable(fetchResult.status, robotsMeta);
  const intentional = isIntentionalNoindex(fetchResult.finalUrl);
  const title = fetchResult.status === 200 ? extractTitle(fetchResult.html) : "";
  const metaDescription = fetchResult.status === 200 ? extractMetaDescription(fetchResult.html) : "";
  const metaLength = metaDescription.length;
  const metaCount = fetchResult.status === 200 ? countMetaDescriptions(fetchResult.html) : 0;
  const htmlLang = fetchResult.status === 200 ? extractHtmlLang(fetchResult.html) : "";
  const h1Count = fetchResult.status === 200 ? countH1(fetchResult.html) : 0;
  const h1Texts = fetchResult.status === 200 ? extractH1Texts(fetchResult.html) : [];

  const issues = [];
  if (fetchResult.status !== 200) issues.push(`page_status_${fetchResult.status}`);
  if (metaCount === 0 && fetchResult.status === 200) issues.push("missing_meta_description");
  if (metaCount > 1) issues.push("multiple_meta_descriptions");
  if (!title && fetchResult.status === 200) issues.push("missing_title");
  if (htmlLang && !VALID_HTML_LANG.has(htmlLang)) issues.push("html_lang_invalid");
  if (!htmlLang && fetchResult.status === 200) issues.push("html_lang_missing");

  if (indexable && inSitemap && !intentional) {
    if (metaLength < META_DESCRIPTION_MIN) issues.push("meta_description_too_short");
    if (metaLength > META_DESCRIPTION_MAX) issues.push("meta_description_too_long");
    if (h1Count === 0) issues.push("missing_h1");
    if (h1Count > 1) issues.push("multiple_h1");
  }

  return {
    url: fetchResult.url,
    final_url: fetchResult.finalUrl,
    path: normalizePathname(fetchResult.finalUrl),
    http_status: fetchResult.status,
    in_sitemap: inSitemap ? "yes" : "no",
    indexable: indexable ? "yes" : "no",
    intentional_noindex: intentional ? "yes" : "no",
    robots_meta: robotsMeta,
    title,
    title_length: title.length,
    meta_description: metaDescription,
    meta_description_length: metaLength,
    meta_description_count: metaCount,
    html_lang: htmlLang,
    html_lang_valid: htmlLang ? VALID_HTML_LANG.has(htmlLang) : false,
    h1_count: h1Count,
    h1_text: h1Texts.join(" | "),
    issues: [...new Set(issues)].join(";"),
    pass: issues.length === 0 || (intentional && !issues.some((i) => i.startsWith("meta_") || i.includes("h1"))),
    error: fetchResult.error ?? "",
  };
}

function localeFromPath(pathname) {
  const match = pathname.match(/^\/(en|es)(\/|$)/);
  return match?.[1] ?? "";
}

function findDuplicates(rows, field, indexableOnly = true) {
  const map = new Map();
  for (const row of rows) {
    if (indexableOnly && row.indexable !== "yes") continue;
    if (row.intentional_noindex === "yes") continue;
    if (row.in_sitemap !== "yes") continue;
    const value = row[field]?.trim();
    if (!value) continue;
    const key = `${localeFromPath(row.path)}|${value}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(row.final_url);
  }
  return [...map.entries()]
    .filter(([, urls]) => urls.length > 1)
    .map(([key, urls]) => ({ locale: key.split("|")[0], value: key.slice(key.indexOf("|") + 1), urls, count: urls.length }));
}

function compareAhrefs(exportName, ahrefsUrls, liveByUrl, checkStillApplies) {
  return ahrefsUrls.map((ahrefsUrl) => {
    const live = liveByUrl.get(rewriteToAuditBase(normalizeUrl(ahrefsUrl), base));
    const isHttpDuplicate = ahrefsUrl.startsWith("http://");
    return {
      export: exportName,
      ahrefs_url: ahrefsUrl,
      is_http_duplicate: isHttpDuplicate,
      live_found: Boolean(live),
      live_meta_length: live?.meta_description_length ?? null,
      live_html_lang: live?.html_lang ?? "",
      live_html_lang_valid: live?.html_lang_valid ?? null,
      live_h1_count: live?.h1_count ?? null,
      ahrefs_still_applies: live ? checkStillApplies(live) : isHttpDuplicate ? null : false,
      live_issues: live?.issues ?? "",
    };
  });
}

async function main() {
  const started = new Date().toISOString();
  console.log(`Phase 7 metadata audit — ${base}\n`);

  const sitemapUrls = await fetchSitemapUrls();
  const sitemapSet = new Set(sitemapUrls.map(normalizeUrl));
  const crawlUrls = [...new Set([...sitemapUrls])];

  console.log(`Sitemap URLs: ${sitemapUrls.length}`);
  console.log(`Crawling ${crawlUrls.length} URLs...\n`);

  const fetchResults = await mapPool(crawlUrls, (url) => fetchPage(url), CONCURRENCY);
  const rows = fetchResults.map((r) => auditPage(r, sitemapSet.has(normalizeUrl(r.finalUrl))));

  const liveByUrl = new Map(rows.map((r) => [normalizeUrl(r.final_url), r]));
  const sitemapRows = rows.filter((r) => r.in_sitemap === "yes");
  const indexableSitemapRows = sitemapRows.filter(
    (r) => r.indexable === "yes" && r.intentional_noindex !== "yes"
  );

  const duplicateTitles = findDuplicates(sitemapRows, "title");
  const duplicateMeta = findDuplicates(sitemapRows, "meta_description");

  for (const row of sitemapRows) {
    const extra = [];
    if (duplicateTitles.some((d) => d.urls.includes(row.final_url))) {
      extra.push("duplicate_title");
    }
    if (duplicateMeta.some((d) => d.urls.includes(row.final_url))) {
      extra.push("duplicate_meta_description");
    }
    if (extra.length) {
      row.issues = [...new Set([...(row.issues ? row.issues.split(";") : []), ...extra])].join(";");
      row.pass = row.pass && extra.length === 0;
    }
  }

  const ahrefsUrlsByExport = {};
  for (const [name, csvPath] of Object.entries(AHREFS_EXPORTS)) {
    ahrefsUrlsByExport[name] = loadAhrefsRowUrls(csvPath);
  }

  const ahrefsComparison = [
    ...compareAhrefs(
      "meta_too_short_indexable",
      ahrefsUrlsByExport.meta_too_short_indexable,
      liveByUrl,
      (live) => live.meta_description_length < META_DESCRIPTION_MIN
    ),
    ...compareAhrefs(
      "meta_too_short_not_indexable",
      ahrefsUrlsByExport.meta_too_short_not_indexable,
      liveByUrl,
      (live) => live.meta_description_length < META_DESCRIPTION_MIN
    ),
    ...compareAhrefs(
      "html_lang_invalid",
      ahrefsUrlsByExport.html_lang_invalid,
      liveByUrl,
      (live) => !live.html_lang_valid
    ),
  ];

  const shortMeta = indexableSitemapRows.filter((r) =>
    r.issues.includes("meta_description_too_short")
  );
  const longMeta = indexableSitemapRows.filter((r) =>
    r.issues.includes("meta_description_too_long")
  );
  const invalidLang = sitemapRows.filter((r) => r.issues.includes("html_lang_invalid"));
  const missingH1 = indexableSitemapRows.filter((r) => r.issues.includes("missing_h1"));
  const multipleH1 = indexableSitemapRows.filter((r) => r.issues.includes("multiple_h1"));
  const dupTitleRows = indexableSitemapRows.filter((r) => r.issues.includes("duplicate_title"));
  const dupMetaRows = indexableSitemapRows.filter((r) => r.issues.includes("duplicate_meta_description"));

  const summary = {
    timestamp: started,
    finished: new Date().toISOString(),
    base,
    meta_description_min: META_DESCRIPTION_MIN,
    meta_description_max: META_DESCRIPTION_MAX,
    valid_html_lang: [...VALID_HTML_LANG],
    sitemap_url_count: sitemapUrls.length,
    urls_crawled: rows.length,
    sitemap_pass: sitemapRows.filter((r) => r.pass).length,
    sitemap_fail: sitemapRows.filter((r) => !r.pass).length,
    indexable_sitemap_count: indexableSitemapRows.length,
    meta_description_too_short: shortMeta.length,
    meta_description_too_short_urls: shortMeta.map((r) => r.final_url),
    meta_description_too_long: longMeta.length,
    html_lang_invalid: invalidLang.length,
    html_lang_invalid_urls: invalidLang.map((r) => r.final_url),
    missing_h1: missingH1.length,
    multiple_h1: multipleH1.length,
    duplicate_titles: duplicateTitles.length,
    duplicate_meta_descriptions: duplicateMeta.length,
    duplicate_title_pages: dupTitleRows.length,
    duplicate_meta_pages: dupMetaRows.length,
    ahrefs_still_applies: {
      meta_too_short_indexable: ahrefsComparison
        .filter((c) => c.export === "meta_too_short_indexable")
        .filter((c) => c.ahrefs_still_applies === true).length,
      html_lang_invalid: ahrefsComparison
        .filter((c) => c.export === "html_lang_invalid")
        .filter((c) => c.ahrefs_still_applies === true).length,
    },
    ahrefs_resolved: {
      meta_too_short_indexable: ahrefsComparison
        .filter((c) => c.export === "meta_too_short_indexable")
        .filter((c) => c.ahrefs_still_applies === false).length,
      html_lang_invalid: ahrefsComparison
        .filter((c) => c.export === "html_lang_invalid")
        .filter((c) => c.ahrefs_still_applies === false).length,
    },
    phase7Pass:
      shortMeta.length === 0 &&
      invalidLang.length === 0 &&
      missingH1.length === 0 &&
      multipleH1.length === 0 &&
      dupTitleRows.length === 0 &&
      dupMetaRows.length === 0 &&
      sitemapRows.filter((r) => !r.pass && r.intentional_noindex !== "yes").length === 0,
  };

  const outDir = path.join(__dirname, "..", "docs", "seo-remediation");
  fs.mkdirSync(outDir, { recursive: true });

  const csvHeaders = [
    "url",
    "final_url",
    "path",
    "http_status",
    "in_sitemap",
    "indexable",
    "intentional_noindex",
    "robots_meta",
    "title",
    "title_length",
    "meta_description",
    "meta_description_length",
    "meta_description_count",
    "html_lang",
    "html_lang_valid",
    "h1_count",
    "h1_text",
    "issues",
    "pass",
    "error",
  ];
  const csvPath = path.join(outDir, "phase-07-audit.csv");
  fs.writeFileSync(
    csvPath,
    [csvHeaders.join(","), ...rows.map((r) => csvHeaders.map((h) => csvEscape(r[h])).join(","))].join("\n"),
    "utf8"
  );

  const validationPath = path.join(outDir, "phase-07-validation.json");
  fs.writeFileSync(
    validationPath,
    JSON.stringify(
      {
        summary,
        duplicateTitles,
        duplicateMetaDescriptions: duplicateMeta,
        shortMeta: shortMeta.slice(0, 50),
        invalidLang: invalidLang.slice(0, 20),
        h1Issues: [...missingH1, ...multipleH1].slice(0, 20),
        ahrefsComparison,
        failures: sitemapRows.filter((r) => !r.pass && r.intentional_noindex !== "yes"),
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

  process.exit(summary.phase7Pass ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

#!/usr/bin/env node
/**
 * Phase 8 — Structured data audit.
 * Crawls sitemap URLs; extracts JSON-LD blocks; validates parse + image/logo URLs;
 * flags fabricated fields; groups by template; compares Ahrefs structured-data export.
 *
 * Usage: node scripts/phase8-structured-data-audit.mjs [baseUrl]
 * Output: docs/seo-remediation/phase-08-audit.csv
 *         docs/seo-remediation/phase-08-validation.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const staticIdx = args.indexOf("--static");
const staticAppDir =
  staticIdx >= 0 ? path.resolve(args[staticIdx + 1] || ".next/server/app") : null;
const baseArg = args.find((a) => /^https?:\/\//.test(a));
const base = (baseArg || "https://www.kinexisdigital.com").replace(/\/$/, "");
const USER_AGENT = "KinexisPhase8StructuredData/1.0";
const CONCURRENCY = 8;
const FABRICATED_PHONE = "+1-888-888-8888";
const INTENTIONAL_NOINDEX_PATHS = new Set(["/en/lead-magnet", "/es/lead-magnet"]);
const LOCAL_BUSINESS_TYPES = new Set(["LocalBusiness", "ProfessionalService"]);

/** Types not in the schema.org core vocabulary — Ahrefs schema.org validator flags these. */
const INVALID_SCHEMA_ORG_TYPES = new Set(["MarketingAgency"]);

const AHREFS_EXPORT = path.join(
  __dirname,
  "..",
  "docs",
  "seo-remediation",
  "ahrefs-export",
  "kinexisdigital_01-jul-2026_structured-data-ha_2026-07-02_16-47-20.csv"
);

const IMAGE_URL_FIELDS = ["logo", "image", "thumbnailUrl", "contentUrl"];

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

function extractRobotsMeta(html) {
  const re = /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i;
  const alt = /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["']/i;
  return html.match(re)?.[1] ?? html.match(alt)?.[1] ?? "";
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
      [...text.matchAll(/^\d+,(https?:\/\/[^,\r\n]+)/gm)].map((m) => normalizeUrl(m[1]))
    ),
  ];
}

function extractJsonLdBlocks(html) {
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const blocks = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    blocks.push(m[1].trim());
  }
  return blocks;
}

function collectNodes(node, out = []) {
  if (node == null) return out;
  if (Array.isArray(node)) {
    for (const item of node) collectNodes(item, out);
    return out;
  }
  if (typeof node === "object") {
    out.push(node);
    if (Array.isArray(node["@graph"])) {
      for (const item of node["@graph"]) collectNodes(item, out);
    }
    for (const value of Object.values(node)) {
      if (value && typeof value === "object") collectNodes(value, out);
    }
  }
  return out;
}

function getSchemaTypes(nodes) {
  const types = new Set();
  for (const node of nodes) {
    const t = node["@type"];
    if (typeof t === "string") types.add(t);
    else if (Array.isArray(t)) t.forEach((x) => types.add(x));
  }
  return [...types].sort();
}

function collectUrlFields(node, urls = new Set()) {
  if (node == null) return urls;
  if (Array.isArray(node)) {
    for (const item of node) collectUrlFields(item, urls);
    return urls;
  }
  if (typeof node !== "object") return urls;

  for (const [key, value] of Object.entries(node)) {
    if (typeof value === "string" && (IMAGE_URL_FIELDS.includes(key) || key === "url")) {
      if (value.startsWith("http")) urls.add(value);
    } else if (value && typeof value === "object") {
      collectUrlFields(value, urls);
    }
  }
  return urls;
}

function detectSchemaIssues(nodes) {
  const issues = [];

  if (nodes.length === 0) {
    issues.push("missing_json_ld");
    return issues;
  }

  for (const node of nodes) {
    const type = node["@type"];
    const types = typeof type === "string" ? [type] : Array.isArray(type) ? type : [];

    for (const t of types) {
      if (INVALID_SCHEMA_ORG_TYPES.has(t)) {
        issues.push(`invalid_schema_type_${t.toLowerCase()}`);
      }
    }

    if (
      (types.includes("Article") || types.includes("BlogPosting")) &&
      typeof node.datePublished === "string" &&
      !/^\d{4}-\d{2}-\d{2}/.test(node.datePublished)
    ) {
      issues.push("article_date_not_iso");
    }

    const isLocalBusinessType = types.some((t) => LOCAL_BUSINESS_TYPES.has(t));

    if (isLocalBusinessType) {
      if (!node.address) issues.push("localbusiness_missing_address");
      if (node.telephone === FABRICATED_PHONE) issues.push("fabricated_telephone");
      if (typeof node.image === "string" && node.image.includes("/logo.png")) {
        issues.push("invalid_logo_path");
      }
      if (typeof node.logo === "string" && node.logo.includes("/logo.png")) {
        issues.push("invalid_logo_path");
      }
      if (node.logo?.url && String(node.logo.url).includes("/logo.png")) {
        issues.push("invalid_logo_path");
      }
    }

    if (types.includes("Organization")) {
      if (typeof node.logo === "string" && node.logo.includes("/logo.png")) {
        issues.push("invalid_logo_path");
      }
      if (node.logo?.url && String(node.logo.url).includes("/logo.png")) {
        issues.push("invalid_logo_path");
      }
      if (node.contactPoint?.telephone === FABRICATED_PHONE) issues.push("fabricated_telephone");
    }

    if (node.telephone === FABRICATED_PHONE) issues.push("fabricated_telephone");
  }

  return [...new Set(issues)];
}

function inferTemplate(pathname) {
  if (/^\/(en|es)\/locations\/[^/]+\/[^/]+$/.test(pathname)) return "location_service";
  if (/^\/(en|es)\/locations\/[^/]+$/.test(pathname)) return "location_city";
  if (/^\/(en|es)\/services\/[^/]+$/.test(pathname)) return "service";
  if (/^\/(en|es)\/pricing\/[^/]+$/.test(pathname)) return "pricing";
  if (/^\/(en|es)\/blog\/[^/]+$/.test(pathname)) return "blog_post";
  if (/^\/(en|es)\/digital-marketing-agency$/.test(pathname)) return "agency_hub";
  if (/^\/(en|es)\/?$/.test(pathname)) return "homepage";
  if (/^\/(en|es)\/case-studies\/[^/]+$/.test(pathname)) return "case_study";
  if (/^\/(en|es)\/solutions\/[^/]+$/.test(pathname)) return "solution";
  return "other";
}

async function fetchPage(url) {
  if (staticAppDir) {
    return readStaticPage(url);
  }
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
    });
    const html =
      res.headers.get("content-type")?.includes("text/html") ? await res.text() : "";
    return { url, finalUrl: res.url, status: res.status, html, error: null };
  } catch (e) {
    return { url, finalUrl: url, status: 0, html: "", error: e.message };
  }
}

function readStaticPage(url) {
  try {
    const pathname = normalizePathname(url);
    const rel = pathname.replace(/^\//, "");
    const htmlPath = path.join(staticAppDir, `${rel}.html`);
    if (!fs.existsSync(htmlPath)) {
      return { url, finalUrl: url, status: 404, html: "", error: `missing static file: ${htmlPath}` };
    }
    const html = fs.readFileSync(htmlPath, "utf8");
    return { url, finalUrl: url, status: 200, html, error: null };
  } catch (e) {
    return { url, finalUrl: url, status: 0, html: "", error: e.message };
  }
}

async function checkUrlStatus(url) {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: { "User-Agent": USER_AGENT },
    });
    if (res.status === 405 || res.status === 501) {
      const getRes = await fetch(url, {
        method: "GET",
        redirect: "follow",
        headers: { "User-Agent": USER_AGENT },
      });
      return getRes.status;
    }
    return res.status;
  } catch {
    return 0;
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

async function auditPage(fetchResult, inSitemap, urlStatusCache) {
  const robotsMeta = extractRobotsMeta(fetchResult.html);
  const indexable = isIndexable(fetchResult.status, robotsMeta);
  const intentional = isIntentionalNoindex(fetchResult.finalUrl);
  const pathname = normalizePathname(fetchResult.finalUrl);
  const template = inferTemplate(pathname);

  const rawBlocks = fetchResult.status === 200 ? extractJsonLdBlocks(fetchResult.html) : [];
  const parsedBlocks = [];
  const parseErrors = [];

  for (let i = 0; i < rawBlocks.length; i++) {
    try {
      parsedBlocks.push(JSON.parse(rawBlocks[i]));
    } catch (e) {
      parseErrors.push(`block_${i + 1}_parse_error`);
    }
  }

  const nodes = parsedBlocks.flatMap((block) => collectNodes(block));
  const schemaTypes = getSchemaTypes(nodes);
  const schemaIssues = detectSchemaIssues(nodes);

  if (parseErrors.length) schemaIssues.push(...parseErrors);

  const urlsToCheck = new Set();
  for (const node of nodes) {
    for (const field of IMAGE_URL_FIELDS) {
      if (typeof node[field] === "string" && node[field].startsWith("http")) {
        urlsToCheck.add(node[field]);
      }
    }
  }

  const brokenImageUrls = [];

  for (const imageUrl of urlsToCheck) {
    if (staticAppDir) continue;
    const auditUrl = rewriteToAuditBase(imageUrl, base);
    if (!urlStatusCache.has(auditUrl)) {
      urlStatusCache.set(auditUrl, await checkUrlStatus(auditUrl));
    }
    const status = urlStatusCache.get(auditUrl);
    if (status < 200 || status >= 400) {
      brokenImageUrls.push(`${auditUrl}:${status}`);
    }
  }

  if (brokenImageUrls.length) schemaIssues.push("broken_schema_image_url");

  const issues = [];
  if (fetchResult.status !== 200) issues.push(`page_status_${fetchResult.status}`);
  if (indexable && inSitemap && !intentional) {
    issues.push(...schemaIssues);
  }

  const uniqueIssues = [...new Set(issues)];

  return {
    url: fetchResult.url,
    final_url: fetchResult.finalUrl,
    path: pathname,
    template,
    http_status: fetchResult.status,
    in_sitemap: inSitemap ? "yes" : "no",
    indexable: indexable ? "yes" : "no",
    intentional_noindex: intentional ? "yes" : "no",
    json_ld_block_count: rawBlocks.length,
    schema_types: schemaTypes.join(";"),
    schema_issue_count: uniqueIssues.filter((i) => !i.startsWith("page_status")).length,
    broken_image_urls: brokenImageUrls.join(";"),
    issues: uniqueIssues.join(";"),
    pass: uniqueIssues.length === 0 || (intentional && !uniqueIssues.some((i) => i.includes("json_ld") || i.includes("schema") || i.includes("localbusiness") || i.includes("fabricated") || i.includes("logo") || i.includes("image"))),
    error: fetchResult.error ?? "",
  };
}

function compareAhrefs(ahrefsUrls, liveByUrl) {
  return ahrefsUrls.map((ahrefsUrl) => {
    const live = liveByUrl.get(rewriteToAuditBase(normalizeUrl(ahrefsUrl), base));
    const isHttpDuplicate = ahrefsUrl.startsWith("http://");
    const stillHasIssues = live
      ? live.issues.split(";").filter(Boolean).some((i) =>
          [
            "localbusiness_missing_address",
            "fabricated_telephone",
            "invalid_logo_path",
            "broken_schema_image_url",
            "missing_json_ld",
          ].includes(i) || i.includes("parse_error")
        )
      : null;

    return {
      ahrefs_url: ahrefsUrl,
      is_http_duplicate: isHttpDuplicate,
      live_found: Boolean(live),
      live_schema_types: live?.schema_types ?? "",
      live_issues: live?.issues ?? "",
      ahrefs_still_applies: live ? stillHasIssues : isHttpDuplicate ? null : false,
    };
  });
}

async function main() {
  const started = new Date().toISOString();
  const modeLabel = staticAppDir ? `static build (${staticAppDir})` : base;
  console.log(`Phase 8 structured data audit — ${modeLabel}\n`);

  const sitemapUrls = await fetchSitemapUrls();
  const sitemapSet = new Set(sitemapUrls.map(normalizeUrl));
  const crawlUrls = [...new Set([...sitemapUrls])];

  console.log(`Sitemap URLs: ${sitemapUrls.length}`);
  console.log(`Crawling ${crawlUrls.length} URLs...\n`);

  const urlStatusCache = new Map();
  const fetchResults = await mapPool(crawlUrls, (url) => fetchPage(url), CONCURRENCY);
  const rows = [];
  for (const r of fetchResults) {
    rows.push(await auditPage(r, sitemapSet.has(normalizeUrl(r.finalUrl)), urlStatusCache));
  }

  const liveByUrl = new Map(rows.map((r) => [normalizeUrl(r.final_url), r]));
  const sitemapRows = rows.filter((r) => r.in_sitemap === "yes");
  const indexableSitemapRows = sitemapRows.filter(
    (r) => r.indexable === "yes" && r.intentional_noindex !== "yes"
  );

  const schemaIssueRows = indexableSitemapRows.filter((r) => {
    const issueList = r.issues ? r.issues.split(";") : [];
    return issueList.some(
      (i) =>
        i.includes("json_ld") ||
        i.includes("localbusiness") ||
        i.includes("fabricated") ||
        i.includes("logo") ||
        i.includes("image") ||
        i.includes("parse_error")
    );
  });

  const byTemplate = {};
  for (const row of indexableSitemapRows) {
    if (!byTemplate[row.template]) {
      byTemplate[row.template] = { total: 0, with_issues: 0, sample_url: row.final_url };
    }
    byTemplate[row.template].total++;
    if (row.issues) byTemplate[row.template].with_issues++;
  }

  const ahrefsUrls = loadAhrefsRowUrls(AHREFS_EXPORT);
  const ahrefsComparison = compareAhrefs(ahrefsUrls, liveByUrl);
  const ahrefsStillApplies = ahrefsComparison.filter((c) => c.ahrefs_still_applies === true).length;
  const ahrefsResolved = ahrefsComparison.filter((c) => c.ahrefs_still_applies === false).length;

  const localBusinessRows = indexableSitemapRows.filter((r) => {
    const types = r.schema_types.split(";").filter(Boolean);
    return types.some((t) => LOCAL_BUSINESS_TYPES.has(t));
  });
  const localBusinessIssueRows = localBusinessRows.filter((r) => r.issues);
  const fabricatedPhoneRows = indexableSitemapRows.filter((r) =>
    r.issues.includes("fabricated_telephone")
  );
  const invalidLogoRows = indexableSitemapRows.filter((r) =>
    r.issues.includes("invalid_logo_path")
  );
  const brokenImageRows = indexableSitemapRows.filter((r) =>
    r.issues.includes("broken_schema_image_url")
  );
  const parseErrorRows = indexableSitemapRows.filter((r) =>
    r.issues.includes("parse_error")
  );

  const summary = {
    timestamp: started,
    finished: new Date().toISOString(),
    base,
    audit_mode: staticAppDir ? "static_build" : "live_crawl",
    static_app_dir: staticAppDir ?? null,
    sitemap_url_count: sitemapUrls.length,
    urls_crawled: rows.length,
    indexable_sitemap_count: indexableSitemapRows.length,
    schema_issue_pages: schemaIssueRows.length,
    localbusiness_pages: localBusinessRows.length,
    localbusiness_issue_pages: localBusinessIssueRows.length,
    fabricated_telephone_pages: fabricatedPhoneRows.length,
    invalid_logo_path_pages: invalidLogoRows.length,
    broken_schema_image_pages: brokenImageRows.length,
    json_ld_parse_errors: parseErrorRows.length,
    ahrefs_baseline_rows: ahrefsUrls.length,
    ahrefs_still_applies: ahrefsStillApplies,
    ahrefs_resolved: ahrefsResolved,
    template_summary: byTemplate,
    phase8Pass:
      schemaIssueRows.length === 0 &&
      localBusinessIssueRows.length === 0 &&
      fabricatedPhoneRows.length === 0 &&
      invalidLogoRows.length === 0 &&
      parseErrorRows.length === 0 &&
      sitemapRows.filter((r) => !r.pass && r.intentional_noindex !== "yes").length === 0,
  };

  const outDir = path.join(__dirname, "..", "docs", "seo-remediation");
  fs.mkdirSync(outDir, { recursive: true });

  const csvHeaders = [
    "url",
    "final_url",
    "path",
    "template",
    "http_status",
    "in_sitemap",
    "indexable",
    "intentional_noindex",
    "json_ld_block_count",
    "schema_types",
    "schema_issue_count",
    "broken_image_urls",
    "issues",
    "pass",
    "error",
  ];
  const csvPath = path.join(outDir, "phase-08-audit.csv");
  fs.writeFileSync(
    csvPath,
    [csvHeaders.join(","), ...rows.map((r) => csvHeaders.map((h) => csvEscape(r[h])).join(","))].join("\n"),
    "utf8"
  );

  const validationBasename = staticAppDir
    ? "phase-08-validation-postfix.json"
    : base.includes("localhost")
      ? "phase-08-validation.json"
      : "phase-08-validation-production-predeploy.json";
  const validationPath = path.join(outDir, validationBasename);
  fs.writeFileSync(
    validationPath,
    JSON.stringify(
      {
        summary,
        schemaIssueRows: schemaIssueRows.slice(0, 50),
        localBusinessRows: localBusinessRows.slice(0, 20),
        templateSamples: Object.fromEntries(
          Object.entries(byTemplate).map(([k, v]) => [k, v.sample_url])
        ),
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

  process.exit(summary.phase8Pass ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

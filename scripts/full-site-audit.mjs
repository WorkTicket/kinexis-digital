#!/usr/bin/env node
/**
 * Comprehensive SEO/a11y audit: 4xx, titles, descriptions, alt tags, broken links.
 * Usage: node scripts/full-site-audit.mjs [baseUrl] [--max-urls N]
 */
const base = (process.argv[2] || "https://kinexisdigital.com").replace(/\/$/, "");
const maxUrlsArg = process.argv.indexOf("--max-urls");
const maxUrls = maxUrlsArg >= 0 ? parseInt(process.argv[maxUrlsArg + 1], 10) : 500;

const TITLE_MAX = 60;
const TITLE_WARN = 70;
const DESC_MIN = 50;
const DESC_MAX = 160;

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m?.[1]?.trim() ?? null;
}

function extractMeta(html, name) {
  const re = new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']*)["']`, "i");
  const alt = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${name}["']`, "i");
  return html.match(re)?.[1] ?? html.match(alt)?.[1] ?? null;
}

function extractLinks(html, pageUrl) {
  const links = new Set();
  const re = /href=["']([^"'#]+)/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const href = m[1];
    if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) continue;
    try {
      const u = new URL(href, pageUrl);
      if (u.origin === new URL(base).origin) links.add(u.pathname + u.search);
    } catch {
      /* skip */
    }
  }
  return [...links];
}

function auditHtml(html, path) {
  const issues = [];
  const title = extractTitle(html);
  const description = extractMeta(html, "description");

  if (!title) issues.push({ type: "missing-title", path, detail: "No <title> tag" });
  else if (title.length > TITLE_WARN) issues.push({ type: "long-title", path, detail: `${title.length} chars: "${title}"` });
  else if (title.length > TITLE_MAX) issues.push({ type: "title-warning", path, detail: `${title.length} chars: "${title}"` });

  if (!description) issues.push({ type: "missing-description", path, detail: "No meta description" });
  else if (description.length < DESC_MIN) issues.push({ type: "short-description", path, detail: `${description.length} chars: "${description.slice(0, 80)}..."` });
  else if (description.length > DESC_MAX) issues.push({ type: "long-description", path, detail: `${description.length} chars: "${description.slice(0, 80)}..."` });

  const imgsNoAlt = (html.match(/<img(?![^>]*\balt=)[^>]*>/gi) || []).length;
  if (imgsNoAlt > 0) issues.push({ type: "missing-alt", path, detail: `${imgsNoAlt} image(s) without alt attribute` });

  const emptyAltDecorative = (html.match(/<img[^>]+alt=""[^>]*>/gi) || []).length;

  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1Count === 0) issues.push({ type: "missing-h1", path, detail: "No H1" });
  else if (h1Count > 1) issues.push({ type: "multiple-h1", path, detail: `${h1Count} H1 tags` });

  if (!html.includes("rel=\"canonical\"") && !html.includes("rel='canonical'")) {
    issues.push({ type: "missing-canonical", path, detail: "No canonical link" });
  }

  return { issues, title, description, emptyAltDecorative, links: extractLinks(html, `${base}${path}`) };
}

async function fetchPath(path) {
  const url = `${base}${path}`;
  try {
    const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": "KinexisAudit/1.0" } });
    const html = await res.text();
    return { path, status: res.status, html, ok: res.ok };
  } catch (e) {
    return { path, status: 0, html: "", ok: false, error: e.message };
  }
}

console.log(`\nFull site audit — ${base}\n${"=".repeat(60)}\n`);

// Fetch sitemap
let sitemapPaths = [];
try {
  const res = await fetch(`${base}/sitemap.xml`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
    try {
      return new URL(m[1]).pathname;
    } catch {
      return null;
    }
  }).filter(Boolean);
  sitemapPaths = [...new Set(locs)];
  console.log(`Sitemap: ${sitemapPaths.length} URLs\n`);
} catch (e) {
  console.error(`Failed to fetch sitemap: ${e.message}`);
  process.exit(1);
}

const pathsToCheck = sitemapPaths.slice(0, maxUrls);
const allIssues = [];
const statusErrors = [];
const brokenLinks = new Map();
const checkedLinks = new Set();
const pageResults = [];

console.log(`Checking ${pathsToCheck.length} pages...\n`);

for (let i = 0; i < pathsToCheck.length; i++) {
  const path = pathsToCheck[i];
  const result = await fetchPath(path);
  pageResults.push(result);

  if (result.status >= 400 || result.status === 0) {
    statusErrors.push({ path, status: result.status, error: result.error });
    continue;
  }

  const audit = auditHtml(result.html, path);
  allIssues.push(...audit.issues);

  if ((i + 1) % 50 === 0) process.stdout.write(`  ${i + 1}/${pathsToCheck.length} pages checked\r`);
}

console.log(`\nDone checking pages.\n`);

// Sample internal link check (first 30 pages, up to 200 unique links)
const linkSamplePages = pathsToCheck.slice(0, 30);
const linksToVerify = new Set();
for (const path of linkSamplePages) {
  const r = pageResults.find((p) => p.path === path);
  if (r?.html) extractLinks(r.html, `${base}${path}`).forEach((l) => linksToVerify.add(l));
}
const linkList = [...linksToVerify].slice(0, 200);
console.log(`Checking ${linkList.length} internal links from sample pages...\n`);

for (const link of linkList) {
  if (checkedLinks.has(link)) continue;
  checkedLinks.add(link);
  const r = await fetchPath(link);
  if (r.status >= 400 || r.status === 0) {
    brokenLinks.set(link, r.status || r.error);
  }
}

// Summarize by issue type
const byType = {};
for (const issue of allIssues) {
  byType[issue.type] = byType[issue.type] || [];
  byType[issue.type].push(issue);
}

console.log("=".repeat(60));
console.log("SUMMARY");
console.log("=".repeat(60));
console.log(`Pages checked: ${pathsToCheck.length}`);
console.log(`HTTP 4xx/5xx/errors: ${statusErrors.length}`);
console.log(`Broken internal links (sample): ${brokenLinks.size}`);
console.log("");

for (const [type, items] of Object.entries(byType).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`\n--- ${type.toUpperCase()} (${items.length}) ---`);
  for (const item of items.slice(0, 15)) {
    console.log(`  ${item.path}`);
    console.log(`    ${item.detail}`);
  }
  if (items.length > 15) console.log(`  ... and ${items.length - 15} more`);
}

if (statusErrors.length) {
  console.log(`\n--- HTTP ERRORS (${statusErrors.length}) ---`);
  for (const e of statusErrors.slice(0, 20)) {
    console.log(`  ${e.path} → ${e.status}${e.error ? ` (${e.error})` : ""}`);
  }
  if (statusErrors.length > 20) console.log(`  ... and ${statusErrors.length - 20} more`);
}

if (brokenLinks.size) {
  console.log(`\n--- BROKEN INTERNAL LINKS (${brokenLinks.size}) ---`);
  for (const [link, status] of [...brokenLinks.entries()].slice(0, 20)) {
    console.log(`  ${link} → ${status}`);
  }
}

const report = {
  base,
  timestamp: new Date().toISOString(),
  pagesChecked: pathsToCheck.length,
  sitemapTotal: sitemapPaths.length,
  statusErrors,
  brokenLinks: Object.fromEntries(brokenLinks),
  issuesByType: Object.fromEntries(Object.entries(byType).map(([k, v]) => [k, v.length])),
  issues: allIssues,
};

const fs = await import("fs");
const outPath = new URL("../audit-report.json", import.meta.url);
fs.writeFileSync(outPath.pathname.replace(/^\/([A-Z]:)/, "$1"), JSON.stringify(report, null, 2));
console.log(`\nFull report saved to audit-report.json\n`);

process.exit(statusErrors.length + brokenLinks.size + allIssues.filter((i) => !i.type.includes("warning")).length > 0 ? 1 : 0);

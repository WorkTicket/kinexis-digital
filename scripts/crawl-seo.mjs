/**
 * Reproducible read-only SEO crawl.
 * Usage: node scripts/crawl-seo.mjs [base-url] [output-csv]
 */
import { writeFile } from "node:fs/promises";

const base = new URL(process.argv[2] || "https://www.kinexisdigital.com");
const output = process.argv[3] || "docs/quality-100/SEO-CRAWL.csv";
const origin = base.origin;
const sitemapUrl = new URL("/sitemap.xml", base);
const sitemapResponse = await fetch(sitemapUrl, { signal: AbortSignal.timeout(30_000) });
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
const sitemapXml = await sitemapResponse.text();
const publishedSitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const sitemapUrls = publishedSitemapUrls.map((value) => {
  const url = new URL(value);
  return url.origin === origin ? value : new URL(`${url.pathname}${url.search}`, origin).href;
});
const sitemapSet = new Set(sitemapUrls);
const alternates = new Map();
for (const match of sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const loc = match[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
  if (!loc) continue;
  const crawlLoc = origin === base.origin && new URL(loc).origin !== origin
    ? new URL(`${new URL(loc).pathname}${new URL(loc).search}`, origin).href
    : loc;
  alternates.set(crawlLoc, [...match[1].matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => `${m[1]}=${m[2]}`));
}

const decode = (value = "") => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const attr = (tag, name) => decode(tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"))?.[1] || "");
const clean = (s = "") => decode(s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
const originUrl = (value, from) => {
  try {
    const u = new URL(value, from);
    return u.origin === origin ? u.href : "";
  } catch { return ""; }
};
const queue = [...new Set(sitemapUrls)];
const queued = new Set(queue);
const results = [];
const images = new Set();
let cursor = 0;

async function worker() {
  while (cursor < queue.length && results.length < 600) {
    const url = queue[cursor++];
    let current = url;
    const chain = [];
    let initialStatus = "";
    let response;
    try {
      for (let hop = 0; hop < 8; hop++) {
        response = await fetch(current, { redirect: "manual", signal: AbortSignal.timeout(30_000), headers: { "user-agent": "KINEXIS-SEO-Audit/1.0 (read-only)" } });
        if (!initialStatus) initialStatus = response.status;
        chain.push(`${response.status}:${current}`);
        const location = response.headers.get("location");
        if (!location || response.status < 300 || response.status >= 400) break;
        current = new URL(location, current).href;
      }
      const html = await response.text();
      const title = clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
      const description = clean(html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)/i)?.[1] || html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i)?.[1] || "");
      const canonical = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]).find((tag) => /\brel=["']canonical["']/i.test(tag));
      const robots = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]).find((tag) => /\bname=["']robots["']/i.test(tag));
      const hrefs = [...html.matchAll(/<a\b[^>]*href=["']([^"'#]+)["'][^>]*>/gi)]
        .map((m) => originUrl(decode(m[1]), current)).filter(Boolean);
      for (const href of hrefs) {
        const u = new URL(href);
        if (!queued.has(u.href) && !/\.(?:pdf|png|jpe?g|webp|avif|svg|gif|zip|xml)$/i.test(u.pathname) && !u.pathname.startsWith("/api/")) {
          queued.add(u.href); queue.push(u.href);
        }
      }
      const imageRefs = [...html.matchAll(/<(?:img|source)\b[^>]*>/gi)].map((m) => attr(m[0], "src") || attr(m[0], "srcset").split(",")[0].trim().split(/\s+/)[0]).filter(Boolean);
      const imageUrls = imageRefs.map((ref) => originUrl(ref, current)).filter(Boolean);
      imageUrls.forEach((u) => images.add(u));
      const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => clean(m[1])).join(" | ");
      const schemaTypes = [...new Set([...html.matchAll(/"@type"\s*:\s*"([^"]+)"/g)].map((m) => m[1]))].join("|");
      const lang = attr(html.match(/<html\b[^>]*>/i)?.[0] || "", "lang");
      const hreflang = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]).filter((tag) => /\brel=["']alternate["']/i.test(tag) && /\bhreflang=/i.test(tag)).map((tag) => `${attr(tag, "hreflang")}=${attr(tag, "href")}`).join("|");
      const robotsText = attr(robots || "", "content") || response.headers.get("x-robots-tag") || "";
      const finalPath = new URL(current).pathname;
      results.push({
        requested_url: url, initial_status: initialStatus, final_status: response.status, redirect_chain: chain.join(" -> "),
        canonical: attr(canonical || "", "href"), robots: robotsText, hreflang, title, description, h1,
        structured_data_types: schemaTypes, internal_links: [...new Set(hrefs)].join("|"),
        sitemap_membership: sitemapSet.has(url) ? "yes" : "no",
        intended_language: url.includes("/es/") ? "es" : "en", html_language: lang,
        indexability: /noindex/i.test(robotsText) ? "noindex" : "indexable",
        broken_image_references: imageUrls.join("|"), _imageRefs: imageUrls,
        sitemap_hreflang: (alternates.get(url) || []).join("|"), _finalPath: finalPath,
      });
    } catch (error) {
      results.push({ requested_url: url, initial_status: initialStatus, final_status: "", redirect_chain: chain.join(" -> "), error: String(error) });
    }
  }
}
await Promise.all(Array.from({ length: 8 }, worker));

const imageStatus = new Map();
let imageCursor = 0;
const imageList = [...images];
await Promise.all(Array.from({ length: 12 }, async () => {
  while (imageCursor < imageList.length) {
    const url = imageList[imageCursor++];
    try {
      let r = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(20_000) });
      if (r.status === 405) r = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(20_000), headers: { range: "bytes=0-0" } });
      imageStatus.set(url, r.status);
    } catch { imageStatus.set(url, "error"); }
  }
}));

const cols = ["requested_url","initial_status","final_status","redirect_chain","canonical","robots","hreflang","sitemap_hreflang","title","description","h1","structured_data_types","internal_links","sitemap_membership","intended_language","html_language","indexability","broken_image_references","error"];
const quote = (v) => `"${String(v ?? "").replaceAll('"', '""')}"`;
const csv = [cols.map(quote).join(",")];
for (const row of results) {
  const broken = (row._imageRefs || []).filter((url) => Number(imageStatus.get(url)) >= 400 || imageStatus.get(url) === "error").map((url) => `${url} [${imageStatus.get(url)}]`);
  row.broken_image_references = broken.join("|");
  csv.push(cols.map((col) => quote(row[col])).join(","));
}
await writeFile(output, `${csv.join("\n")}\n`, "utf8");
const urls = new Set(results.map((r) => r.requested_url));
const duplicates = (key) => {
  const groups = new Map();
  for (const r of results) if (r[key]) groups.set(r[key], [...(groups.get(r[key]) || []), r.requested_url]);
  return [...groups.values()].filter((v) => v.length > 1).length;
};
console.log(JSON.stringify({
  output, urls_crawled: urls.size, sitemap_urls: sitemapSet.size, published_sitemap_urls: publishedSitemapUrls.length,
  discoverable_non_sitemap: results.filter((r) => r.sitemap_membership === "no").length,
  broken_image_references: results.reduce((n, r) => n + (r.broken_image_references ? r.broken_image_references.split("|").length : 0), 0),
  duplicate_titles: duplicates("title"), duplicate_descriptions: duplicates("description"),
  failed_urls: results.filter((r) => !/^2/.test(String(r.final_status))).length,
  crawl_queue_remaining: Math.max(0, queue.length - results.length),
}, null, 2));

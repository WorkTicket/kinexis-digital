#!/usr/bin/env node
const urls = [
  "http://www.kinexisdigital.com/en",
  "https://www.kinexisdigital.com/en",
  "http://www.kinexisdigital.com/es/services/seo",
  "https://www.kinexisdigital.com/es/services/seo",
];

async function snap(url) {
  const res = await fetch(url, { headers: { "User-Agent": "KinexisPhase1Audit/1.0" } });
  const html = await res.text();
  const canonical =
    html.match(/rel="canonical"[^>]+href="([^"]+)"/)?.[1] ??
    html.match(/href="([^"]+)"[^>]+rel="canonical"/)?.[1] ??
    "";
  const htmlLang = html.match(/<html[^>]+lang="([^"]+)"/)?.[1] ?? "";
  const hreflangs = [
    ...html.matchAll(/<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["'][^>]*>/gi),
    ...html.matchAll(/<link[^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["'][^>]+rel=["']alternate["'][^>]*>/gi),
  ].map((m) => `${m[1]}:${m[2]}`);
  return { url, status: res.status, htmlLang, canonical, hreflangCount: hreflangs.length, hreflangs };
}

for (const url of urls) {
  console.log(JSON.stringify(await snap(url), null, 2));
}

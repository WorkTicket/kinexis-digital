const base = "https://www.kinexisdigital.com";
const checks = [
  "/en/nonexistent-page",
  "/en/services/nonexistent",
  "/en",
  "/en/services/cro",
  "/robots.txt",
  "/sitemap.xml",
];

for (const p of checks) {
  const r = await fetch(`${base}${p}`, { redirect: "follow" });
  const html = await r.text();
  const title = html.match(/<title[^>]*>([^<]+)/i)?.[1];
  const canon =
    html.match(/rel="canonical"[^>]+href="([^"]+)"/i)?.[1] ??
    html.match(/href="([^"]+)"[^>]+rel="canonical"/i)?.[1];
  console.log(`${p} → ${r.status} | title: ${title?.slice(0, 55)} | canon: ${canon}`);
}

/**
 * Lightweight route smoke (no browser). Usage:
 *   node scripts/smoke-routes.mjs [baseUrl]
 */
const base = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");
const paths = [
  "/",
  "/pricing",
  "/portfolio",
  "/contact",
  "/pay",
  "/privacy",
  "/case-studies/preferred-plumbing",
  "/robots.txt",
  "/sitemap.xml",
];

let failed = false;
for (const path of paths) {
  const url = `${base}${path}`;
  try {
    const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20_000) });
    const ok = res.ok;
    if (!ok) failed = true;
    console.log(`${ok ? "OK" : "FAIL"} ${res.status} ${path}`);
  } catch (error) {
    failed = true;
    console.log(`FAIL 000 ${path} (${error instanceof Error ? error.message : "error"})`);
  }
}
process.exit(failed ? 1 : 0);

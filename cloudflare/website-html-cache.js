// Cache only the public, static English campaign document, before the wrapper
// adds country-specific consent scripts. Never share RSC or cookie-bearing HTML.
export function websiteCacheKey(request, buildId) {
  const url = new URL(request.url);
  if (request.method !== "GET" || url.protocol !== "https:" ||
      url.hostname !== "www.kinexisdigital.com" || url.pathname !== "/lp/get-a-website" ||
      !request.headers.get("accept")?.includes("text/html")) return null;
  for (const header of ["cookie", "authorization", "rsc", "next-router-state-tree", "next-router-prefetch", "next-action", "range"]) {
    if (request.headers.has(header)) return null;
  }
  for (const name of url.searchParams.keys()) {
    if (!/^utm_[a-z_]+$/.test(name) && !["gclid", "dclid", "gbraid", "wbraid", "fbclid", "msclkid"].includes(name)) return null;
  }
  url.pathname = `/__website-html-cache/${encodeURIComponent(buildId)}`;
  url.search = "";
  return new Request(url, { method: "GET" });
}

export async function fetchWebsiteDocument(request, { cache, buildId, fetchOrigin, waitUntil, isCrawler }) {
  const key = cache && websiteCacheKey(request, buildId);
  if (!key) {
    const response = await fetchOrigin();
    if (new URL(request.url).pathname !== "/lp/get-a-website") return response;
    const result = new Response(response.body, response);
    result.headers.set("x-website-cache", cache ? "BYPASS-REQUEST" : "BYPASS-UNAVAILABLE");
    return result;
  }
  let cached;
  try { cached = await cache.match(key); } catch { /* Cache failure must not break the page. */ }
  if (cached) {
    const headers = new Headers(cached.headers);
    // The wrapper adds visitor-specific consent next. Only our raw internal
    // copy may be shared; never let browsers/proxies cache the rewritten HTML.
    headers.set("cache-control", "private, no-store");
    // The middleware persists English on new campaign visits. These are the
    // only cookies allowed into this cache, and contain no visitor identity.
    if (!isCrawler && headers.has("x-website-locale-cookie")) headers.set("set-cookie", headers.get("x-website-locale-cookie"));
    headers.delete("x-website-locale-cookie");
    headers.set("x-website-cache", "HIT");
    return new Response(cached.body, { status: cached.status, headers });
  }
  const response = await fetchOrigin();
  const cookie = response.headers.get("set-cookie");
  const cookieWithoutExpiry = cookie?.replace(/;\s*Expires=[A-Za-z]{3},\s*\d{1,2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT/gi, "");
  if (response.status !== 200 || !response.headers.get("content-type")?.includes("text/html") ||
      (cookie && !/^NEXT_LOCALE=en;[^,]*$/i.test(cookieWithoutExpiry))) {
    const result = new Response(response.body, response);
    result.headers.set("x-website-cache", "BYPASS-RESPONSE");
    return result;
  }
  const stored = response.clone();
  const headers = new Headers(stored.headers);
  // Generate the same non-personal locale cookie on hits even when a crawler
  // (whose middleware emits no cookie) populated the cache first.
  headers.set("x-website-locale-cookie", cookie || "NEXT_LOCALE=en; Path=/; Max-Age=31536000; Secure; SameSite=Lax");
  headers.delete("set-cookie");
  headers.set("cache-control", "public, max-age=3600");
  waitUntil(cache.put(key, new Response(stored.body, { status: 200, headers })).catch(() => {}));
  const result = new Response(response.body, response);
  result.headers.set("cache-control", "private, no-store");
  result.headers.set("x-website-cache", "MISS");
  return result;
}

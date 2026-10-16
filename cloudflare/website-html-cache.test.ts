import { describe, expect, it, vi } from "vitest";
import { fetchWebsiteDocument, websiteCacheKey } from "./website-html-cache.js";

const base = "https://www.kinexisdigital.com/lp/get-a-website";
function request(path = base, headers = {}) {
  return new Request(path, { headers: { accept: "text/html", ...headers } });
}

describe("public campaign HTML cache", () => {
  it("shares marketing URLs within a deployment, without retaining click IDs", () => {
    const plain = websiteCacheKey(request(), "build-1")!;
    const ad = websiteCacheKey(request(`${base}?utm_source=facebook&fbclid=private-click`), "build-1")!;
    expect(ad.url).toBe(plain.url);
    expect(ad.url).not.toContain("private-click");
    expect(websiteCacheKey(request(), "build-2")!.url).not.toBe(plain.url);
  });

  it("bypasses personalized, alternate locale, action and navigation requests", () => {
    for (const headers of [
      { cookie: "NEXT_LOCALE=es-ES" }, { cookie: "session=private" },
      { authorization: "Bearer private" }, { rsc: "1" },
      { "next-router-state-tree": "state" }, { "next-router-prefetch": "1" },
      { "next-action": "action" }, { range: "bytes=0-100" }, { accept: "application/json" },
    ]) expect(websiteCacheKey(request(base, headers), "build")).toBeNull();
    for (const url of [base + "?preview=1", base + "?_rsc=123", base + "/", base.replace("/lp/", "/es-ES/lp/"), base.replace("www.", "")]) {
      expect(websiteCacheKey(request(url), "build")).toBeNull();
    }
    expect(websiteCacheKey(new Request(base, { method: "POST" }), "build")).toBeNull();
  });

  it("stores raw HTML and restores browser caching and locale behavior on hits", async () => {
    let stored: Response | undefined;
    const pending: Promise<unknown>[] = [];
    const fetchOrigin = vi.fn(async () => new Response("<html>public page</html>", {
      headers: { "content-type": "text/html", "cache-control": "private, no-store", "set-cookie": "NEXT_LOCALE=en; Path=/; Expires=Fri, 15 Oct 2027 18:34:53 GMT; Max-Age=31536000; Secure; SameSite=Lax" },
    }));
    const cache = {
      match: vi.fn(async () => stored?.clone()),
      put: vi.fn(async (_key: Request, response: Response) => { stored = response; }),
    };
    const options = { cache, buildId: "one", fetchOrigin, waitUntil: (promise: Promise<unknown>) => pending.push(promise), isCrawler: false };
    const miss = await fetchWebsiteDocument(request(), options);
    await Promise.all(pending);
    expect(miss.headers.get("x-website-cache")).toBe("MISS");
    expect(stored!.headers.has("set-cookie")).toBe(false);
    expect(stored!.headers.get("cache-control")).toBe("public, max-age=3600");
    const hit = await fetchWebsiteDocument(request(), options);
    expect(fetchOrigin).toHaveBeenCalledTimes(1);
    expect(await hit.text()).toBe("<html>public page</html>");
    expect(hit.headers.get("cache-control")).toBe("private, no-store");
    expect(hit.headers.get("set-cookie")).toContain("NEXT_LOCALE=en;");
    expect(hit.headers.has("x-website-locale-cookie")).toBe(false);
    expect(hit.headers.has("x-website-origin-cache-control")).toBe(false);
    const crawler = await fetchWebsiteDocument(request(), { ...options, isCrawler: true });
    expect(crawler.headers.has("set-cookie")).toBe(false);
  });

  it("does not cache errors, redirects, RSC, or identifying cookies", async () => {
    for (const response of [
      new Response("error", { status: 500 }),
      new Response(null, { status: 307, headers: { location: "/" } }),
      new Response("rsc", { headers: { "content-type": "text/x-component" } }),
      new Response("private", { headers: { "content-type": "text/html", "set-cookie": "session=private" } }),
      new Response("private", { headers: { "content-type": "text/html", "set-cookie": "NEXT_LOCALE=en; Path=/, session=private" } }),
    ]) {
      const cache = { match: async () => undefined, put: vi.fn() };
      await fetchWebsiteDocument(request(), { cache, buildId: "one", fetchOrigin: async () => response, waitUntil: vi.fn(), isCrawler: false });
      expect(cache.put).not.toHaveBeenCalled();
    }
  });

  it("does not inherit a crawler's public browser cache policy or missing locale cookie", async () => {
    const stored = new Response("<html>public page</html>", {
      headers: { "content-type": "text/html", "cache-control": "public, max-age=3600", "x-website-locale-cookie": "NEXT_LOCALE=en; Path=/; Secure; SameSite=Lax" },
    });
    const response = await fetchWebsiteDocument(request(), {
      cache: { match: async () => stored, put: vi.fn() }, buildId: "one",
      fetchOrigin: vi.fn(), waitUntil: vi.fn(), isCrawler: false,
    });
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(response.headers.get("set-cookie")).toContain("NEXT_LOCALE=en;");
  });

  it("still serves the origin when the edge cache is unavailable", async () => {
    const response = await fetchWebsiteDocument(request(), {
      cache: { match: async () => { throw Error("unavailable"); }, put: async () => { throw Error("unavailable"); } },
      buildId: "one", fetchOrigin: async () => new Response("ok", { headers: { "content-type": "text/html" } }),
      waitUntil: (promise: Promise<unknown>) => promise, isCrawler: false,
    });
    expect(await response.text()).toBe("ok");
  });
});

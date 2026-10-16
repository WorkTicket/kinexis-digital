import { describe, expect, it, vi } from "vitest";
import { fetchWebsiteDocument, websiteCacheKey } from "./website-html-cache.js";
import { CLICK_ID_STORAGE_KEY } from "../src/lib/analytics/click-ids";
import { CONSENT_STORAGE_KEY } from "../src/lib/analytics/consent";
import {
  MARK_META_FIRED_JS,
  META_FIRED_PREFIX,
  PENDING_CONVERSION_KEY,
} from "../src/lib/analytics/pending-conversion";

const campaignUrl = "https://www.kinexisdigital.com/lp/get-a-website";
const firedIdCookie = META_FIRED_PREFIX.slice(0, -1);

function request(headers: Record<string, string> = {}, suffix = "") {
  return new Request(campaignUrl + suffix, {
    headers: { accept: "text/html", ...headers },
  });
}

const key = (headers: Record<string, string> = {}) =>
  websiteCacheKey(request(headers), "build-a");

describe("public campaign cache keys", () => {
  it("derives the actual fired-ID cookie name without editing analytics constants", () => {
    expect(MARK_META_FIRED_JS).toContain(`${firedIdCookie}=`);
  });

  it("shares marketing URLs within a deployment, without retaining click IDs", () => {
    const plain = key()!;
    const ad = websiteCacheKey(
      request({}, "?utm_source=facebook&fbclid=private-click"),
      "build-a",
    )!;
    expect(ad.url).toBe(plain.url);
    expect(ad.url).not.toContain("private-click");
    expect(websiteCacheKey(request(), "build-b")!.url).not.toBe(plain.url);
  });

  it.each([
    "NEXT_LOCALE=en",
    "_fbp=fb.1.1.1",
    "_fbc=fb.1.1.click",
    "_ga=GA1.1",
    "_ga_ABC123=GS1.1",
    "_gid=id",
    "_gcl_au=au",
    "_gcl_aw=aw",
    "_gcl_gb=gb",
    `${CLICK_ID_STORAGE_KEY}=%7B%7D`,
    `${PENDING_CONVERSION_KEY}=%7B%7D`,
    `${firedIdCookie}=%5B%5D`,
    `${CONSENT_STORAGE_KEY}=accepted`,
    `${CONSENT_STORAGE_KEY}=rejected`,
    "_fbp=fb.1.1.1; NEXT_LOCALE=en; _ga_ABC=GS1.1",
  ])("allows the non-personal cookie %s", (cookie) => {
    expect(key({ cookie })?.url).toBe(key({})?.url);
  });

  it.each([
    "session=secret",
    "NEXT_LOCALE=es-419",
    "NEXT_LOCALE=es-ES",
    "NEXT_LOCALE=EN",
    "NEXT_LOCALE=en; NEXT_LOCALE=es-419",
    "_fbp=id; auth=secret",
    "NEXT_LOCALE_CHOICE=1",
    "malformed",
    "_ga_=id",
  ])("bypasses the identifying or alternate-locale cookie %s", (cookie) => {
    expect(key({ cookie })).toBeNull();
  });

  it.each([
    "rsc",
    "authorization",
    "next-router-state-tree",
    "next-router-prefetch",
    "next-action",
    "range",
  ])("keeps the %s header bypass", (header) => {
    expect(key({ [header]: "1" })).toBeNull();
  });

  it("strips only allowed advertising query parameters", () => {
    expect(
      websiteCacheKey(
        request({}, "?fbclid=test&utm_source=facebook&gclid=test&wbraid=test"),
        "build-a",
      )?.url,
    ).toBe(key()?.url);
    expect(websiteCacheKey(request({}, "?preview=true"), "build-a")).toBeNull();
    expect(websiteCacheKey(request({}, "?_rsc=123"), "build-a")).toBeNull();
  });

  it("keeps document eligibility restrictions", () => {
    for (const url of [
      campaignUrl.replace("https:", "http:"),
      campaignUrl.replace("/lp/get-a-website", "/contact"),
      campaignUrl.replace("www.kinexisdigital.com", "localhost"),
      campaignUrl.replace("/lp/", "/es-ES/lp/"),
      `${campaignUrl}/`,
    ]) {
      expect(
        websiteCacheKey(
          new Request(url, { headers: { accept: "text/html" } }),
          "build-a",
        ),
      ).toBeNull();
    }
    expect(websiteCacheKey(request({ accept: "application/json" }), "build-a")).toBeNull();
    expect(
      websiteCacheKey(
        new Request(campaignUrl, { method: "POST", headers: { accept: "text/html" } }),
        "build-a",
      ),
    ).toBeNull();
  });
});

describe("campaign HTML storage and responses", () => {
  function setup(
    response = () =>
      new Response("<html>public page</html>", {
        headers: {
          "content-type": "text/html",
          "cache-control": "private, no-store",
          "set-cookie":
            "NEXT_LOCALE=en; Path=/; Expires=Fri, 15 Oct 2027 18:34:53 GMT; Max-Age=31536000; Secure; SameSite=Lax",
        },
      }),
  ) {
    const stored = new Map<string, Response>();
    const pending: Promise<unknown>[] = [];
    const cache = {
      match: vi.fn(async (req: Request) => stored.get(req.url)?.clone()),
      put: vi.fn(async (req: Request, res: Response) => {
        stored.set(req.url, res.clone());
      }),
    };
    const fetchOrigin = vi.fn(async () => response());
    const options = {
      cache,
      buildId: "build-a",
      fetchOrigin,
      waitUntil: (promise: Promise<unknown>) => pending.push(promise),
      isCrawler: false,
    };
    return { cache, fetchOrigin, options, pending, stored };
  }

  it("returns MISS then HIT with a locale cookie and private browser responses", async () => {
    const state = setup();
    const req = request({ cookie: "_fbp=fb.1.1.1; NEXT_LOCALE=en" });
    const miss = await fetchWebsiteDocument(req, state.options);
    await Promise.all(state.pending);
    expect(miss.headers.get("x-website-cache")).toBe("MISS");
    expect(miss.headers.get("cache-control")).toBe("private, no-store");
    const stored = [...state.stored.values()][0];
    expect(stored.headers.get("cache-control")).toBe("public, max-age=86400");
    expect(stored.headers.has("set-cookie")).toBe(false);

    const hit = await fetchWebsiteDocument(req, state.options);
    expect(state.fetchOrigin).toHaveBeenCalledTimes(1);
    expect(hit.headers.get("x-website-cache")).toBe("HIT");
    expect(hit.headers.get("cache-control")).toBe("private, no-store");
    expect(hit.headers.get("set-cookie")).toContain("NEXT_LOCALE=en;");
    expect(hit.headers.has("x-website-locale-cookie")).toBe(false);
    expect(await hit.text()).toBe("<html>public page</html>");

    const crawler = await fetchWebsiteDocument(req, { ...state.options, isCrawler: true });
    expect(crawler.headers.has("set-cookie")).toBe(false);
  });

  it("does not cache errors, redirects, RSC, or identifying response cookies", async () => {
    for (const response of [
      new Response("error", { status: 500 }),
      new Response(null, { status: 307, headers: { location: "/" } }),
      new Response("rsc", { headers: { "content-type": "text/x-component" } }),
      new Response("private", {
        headers: { "content-type": "text/html", "set-cookie": "session=secret" },
      }),
      new Response("private", {
        headers: {
          "content-type": "text/html",
          "set-cookie": "NEXT_LOCALE=en; Path=/, session=private",
        },
      }),
    ]) {
      const cache = { match: vi.fn(async () => undefined), put: vi.fn() };
      const result = await fetchWebsiteDocument(request(), {
        cache,
        buildId: "build-a",
        fetchOrigin: async () => response,
        waitUntil: vi.fn(),
        isCrawler: false,
      });
      expect(cache.put).not.toHaveBeenCalled();
      expect(result.headers.get("x-website-cache")).toBe("BYPASS-RESPONSE");
    }
  });

  it("supplies an English cookie when a crawler populated the cache", async () => {
    const state = setup(
      () => new Response("public", { headers: { "content-type": "text/html" } }),
    );
    await fetchWebsiteDocument(request(), { ...state.options, isCrawler: true });
    await Promise.all(state.pending);
    expect(
      (await fetchWebsiteDocument(request(), state.options)).headers.get("set-cookie"),
    ).toContain("NEXT_LOCALE=en;");
    expect(
      (await fetchWebsiteDocument(request(), { ...state.options, isCrawler: true })).headers.has(
        "set-cookie",
      ),
    ).toBe(false);
  });

  it("does not inherit a crawler's public browser cache policy or missing locale cookie", async () => {
    const stored = new Response("<html>public page</html>", {
      headers: {
        "content-type": "text/html",
        "cache-control": "public, max-age=3600",
        "x-website-locale-cookie": "NEXT_LOCALE=en; Path=/; Secure; SameSite=Lax",
      },
    });
    const response = await fetchWebsiteDocument(request(), {
      cache: { match: async () => stored, put: vi.fn() },
      buildId: "build-a",
      fetchOrigin: vi.fn(),
      waitUntil: vi.fn(),
      isCrawler: false,
    });
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(response.headers.get("set-cookie")).toContain("NEXT_LOCALE=en;");
  });

  it("still serves the origin when the edge cache is unavailable", async () => {
    const response = await fetchWebsiteDocument(request(), {
      cache: {
        match: async () => {
          throw new Error("unavailable");
        },
        put: async () => {
          throw new Error("unavailable");
        },
      },
      buildId: "build-a",
      fetchOrigin: async () =>
        new Response("ok", { headers: { "content-type": "text/html" } }),
      waitUntil: (promise: Promise<unknown>) => promise,
      isCrawler: false,
    });
    expect(await response.text()).toBe("ok");
  });
});

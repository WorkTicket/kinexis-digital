import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  parseAttributionFromSearch,
  sanitizeAttributionFromBody,
  attributionTextLines,
  CLICK_ID_STORAGE_KEY,
  fbcCookieFromFbclid,
} from "@/lib/analytics/click-ids";

describe("parseAttributionFromSearch", () => {
  it("parses gclid and utm params from a query string", () => {
    const data = parseAttributionFromSearch(
      "gclid=Cj0TEST123&utm_source=google&utm_medium=cpc&utm_campaign=ads-mgmt",
    );
    expect(data.gclid).toBe("Cj0TEST123");
    expect(data.utm_source).toBe("google");
    expect(data.utm_medium).toBe("cpc");
    expect(data.utm_campaign).toBe("ads-mgmt");
  });

  it("parses gbraid and wbraid", () => {
    const data = parseAttributionFromSearch(
      new URLSearchParams({ gbraid: "gb1", wbraid: "wb1" }),
    );
    expect(data.gbraid).toBe("gb1");
    expect(data.wbraid).toBe("wb1");
  });

  it("parses fbclid from Meta ads", () => {
    const data = parseAttributionFromSearch("fbclid=IwAR0testClick&utm_source=facebook");
    expect(data.fbclid).toBe("IwAR0testClick");
    expect(data.utm_source).toBe("facebook");
  });

  it("ignores empty and oversized values", () => {
    const data = parseAttributionFromSearch(`gclid=${"x".repeat(300)}&utm_source=`);
    expect(data.gclid?.length).toBe(200);
    expect(data.utm_source).toBeUndefined();
  });

  it("returns empty object when no attribution params", () => {
    expect(parseAttributionFromSearch("foo=bar")).toEqual({});
  });
});

describe("sanitizeAttributionFromBody", () => {
  it("keeps known attribution fields and drops garbage", () => {
    const data = sanitizeAttributionFromBody({
      gclid: " abc ",
      utm_source: "google",
      evil: "nope",
      landing_page: "/en/lp/seo?gclid=abc",
      captured_at: "2026-07-24T12:00:00.000Z",
    });
    expect(data.gclid).toBe("abc");
    expect(data.utm_source).toBe("google");
    expect(data.landing_page).toBe("/en/lp/seo?gclid=abc");
    expect(data.captured_at).toBe("2026-07-24T12:00:00.000Z");
    expect((data as Record<string, unknown>).evil).toBeUndefined();
  });

  it("rejects non-ISO captured_at", () => {
    const data = sanitizeAttributionFromBody({ captured_at: "yesterday" });
    expect(data.captured_at).toBeUndefined();
  });
});

describe("attributionTextLines", () => {
  it("formats present fields only", () => {
    const lines = attributionTextLines({
      gclid: "g1",
      utm_source: "google",
    });
    expect(lines).toEqual(["GCLID: g1", "UTM Source: google"]);
  });
});

describe("CLICK_ID_STORAGE_KEY", () => {
  it("is stable for sessionStorage consumers", () => {
    expect(CLICK_ID_STORAGE_KEY).toBe("kinexis-ads-attribution");
  });
});

describe("captureClickIds (jsdom sessionStorage)", () => {
  beforeEach(() => {
    vi.stubGlobal("window", {
      location: {
        search: "?gclid=from-url&utm_source=google",
        pathname: "/en/lp/seo",
      },
      sessionStorage: (() => {
        const store = new Map<string, string>();
        return {
          getItem: (k: string) => store.get(k) ?? null,
          setItem: (k: string, v: string) => {
            store.set(k, v);
          },
          removeItem: (k: string) => {
            store.delete(k);
          },
        };
      })(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("persists click ids from the URL", async () => {
    const { captureClickIds, getAttributionPayload } = await import(
      "@/lib/analytics/click-ids"
    );
    const captured = captureClickIds();
    expect(captured.gclid).toBe("from-url");
    expect(getAttributionPayload().gclid).toBe("from-url");
  });

  it("returns landing_page even without click IDs", async () => {
    vi.stubGlobal("window", {
      location: {
        search: "",
        pathname: "/lp/seo",
      },
      sessionStorage: (() => {
        const store = new Map<string, string>();
        return {
          getItem: (k: string) => store.get(k) ?? null,
          setItem: (k: string, v: string) => {
            store.set(k, v);
          },
          removeItem: (k: string) => {
            store.delete(k);
          },
        };
      })(),
    });

    const { captureClickIds, getAttributionPayload } = await import(
      "@/lib/analytics/click-ids"
    );
    captureClickIds();
    expect(getAttributionPayload().landing_page).toContain("/lp/seo");
  });
});

describe("fbcCookieFromFbclid", () => {
  it("uses Meta's fb.{subdomainIndex}.{time}.{fbclid} format", () => {
    expect(fbcCookieFromFbclid("IwAR0test", "www.kinexisdigital.com", 1_700_000_000_000)).toBe(
      "fb.2.1700000000000.IwAR0test",
    );
    expect(fbcCookieFromFbclid("IwAR0test", "kinexisdigital.com", 1_700_000_000_000)).toBe(
      "fb.1.1700000000000.IwAR0test",
    );
  });
});

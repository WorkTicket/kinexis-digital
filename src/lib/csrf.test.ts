import { describe, it, expect, beforeEach, vi } from "vitest";
import { validateOrigin } from "@/lib/csrf";

describe("validateOrigin", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.kinexisdigital.com");
    vi.stubEnv("NODE_ENV", "test");
  });

  function makeRequest(headers: Record<string, string>): Request {
    return {
      headers: new Headers(headers),
    } as unknown as Request;
  }

  it("accepts same-origin request", () => {
    const req = makeRequest({
      origin: "https://www.kinexisdigital.com",
      referer: "https://www.kinexisdigital.com/contact",
    });
    expect(validateOrigin(req)).toBe(true);
  });

  it("rejects cross-origin request", () => {
    const req = makeRequest({
      origin: "https://evil.com",
    });
    expect(validateOrigin(req)).toBe(false);
  });

  it("rejects request with no origin or referer", () => {
    const req = makeRequest({});
    expect(validateOrigin(req)).toBe(false);
  });

  it("accepts referer-only request from same origin", () => {
    const req = makeRequest({
      referer: "https://www.kinexisdigital.com/services",
    });
    expect(validateOrigin(req)).toBe(true);
  });

  it("treats Origin: null as missing and falls back to referer (in-app browsers)", () => {
    const req = makeRequest({
      origin: "null",
      referer: "https://www.kinexisdigital.com/lp/facebook-web-design",
    });
    expect(validateOrigin(req)).toBe(true);
  });

  it("accepts Sec-Fetch-Site same-origin when Origin is missing", () => {
    const req = makeRequest({
      "sec-fetch-site": "same-origin",
    });
    expect(validateOrigin(req)).toBe(true);
  });

  it("still rejects a cross-origin Origin even with a same-site referer", () => {
    const req = makeRequest({
      origin: "https://evil.com",
      referer: "https://www.kinexisdigital.com/lp/facebook-web-design",
    });
    expect(validateOrigin(req)).toBe(false);
  });
});

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
      referer: "https://www.kinexisdigital.com/en/contact",
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
      referer: "https://www.kinexisdigital.com/en/services/seo",
    });
    expect(validateOrigin(req)).toBe(true);
  });
});

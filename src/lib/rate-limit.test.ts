import { describe, it, expect, beforeEach, vi } from "vitest";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";

function makeRequest(headers: Record<string, string>): Request {
  return {
    headers: new Headers(headers),
  } as unknown as Request;
}

describe("getClientIp", () => {
  it("returns cf-connecting-ip when present", () => {
    const req = makeRequest({ "cf-connecting-ip": "1.2.3.4" });
    expect(getClientIp(req)).toBe("1.2.3.4");
  });

  it("falls back to x-forwarded-for", () => {
    const req = makeRequest({ "x-forwarded-for": "5.6.7.8" });
    expect(getClientIp(req)).toBe("5.6.7.8");
  });

  it("returns first IP from comma-separated x-forwarded-for", () => {
    const req = makeRequest({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" });
    expect(getClientIp(req)).toBe("1.2.3.4");
  });

  it("returns 'unknown' when no IP headers present", () => {
    const req = makeRequest({});
    expect(getClientIp(req)).toBe("unknown");
  });
});

describe("isRateLimited (in-memory fallback)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("allows first request", async () => {
    const result = await isRateLimited("test:1.1.1.1");
    expect(result).toBe(false);
  });

  it("allows up to MAX_REQUESTS before blocking", async () => {
    const key = "test:2.2.2.2";
    for (let i = 0; i < 8; i++) {
      expect(await isRateLimited(key)).toBe(false);
    }
    expect(await isRateLimited(key)).toBe(true);
  });
});

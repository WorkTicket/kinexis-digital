import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/rate-limit", () => ({
  getClientIp: () => "127.0.0.1",
  isRateLimited: () => Promise.resolve(false),
}));

vi.mock("@/lib/csrf", () => ({
  validateOrigin: () => true,
}));

vi.mock("@/lib/honeypot", () => ({
  validateHoneypot: () => ({ blocked: false }),
}));

vi.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: vi.fn(async () => {
    throw new Error("no workers binding");
  }),
}));

describe("POST /api/checkout", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  async function postCheckout(body: Record<string, unknown>) {
    vi.resetModules();
    const { POST } = await import("@/app/api/checkout/route");
    return POST(
      new Request("https://www.kinexisdigital.com/api/checkout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          origin: "https://www.kinexisdigital.com",
        },
        body: JSON.stringify(body),
      }),
    );
  }

  const valid = {
    amount: "2500",
    description: "March website deposit",
    name: "Jordan Lee",
    email: "jordan@example.com",
    idempotencyKey: "11111111-1111-4111-8111-111111111111",
    _hp: "",
    _ts: Date.now() - 5000,
  };

  it("rejects an amount outside the allowed range", async () => {
    vi.stubEnv("PAYPAL_BUSINESS_EMAIL", "pay@kinexisdigital.com");
    const res = await postCheckout({ ...valid, amount: "0.25" });
    expect(res.status).toBe(400);
  });

  it("returns a PayPal checkout URL for a valid invoice", async () => {
    vi.stubEnv("PAYPAL_BUSINESS_EMAIL", "pay@kinexisdigital.com");
    const res = await postCheckout(valid);
    expect(res.status).toBe(200);
    const url = new URL((await res.json()).url);
    expect(url.hostname).toBe("www.paypal.com");
    expect(url.searchParams.get("amount")).toBe("2500.00");
    expect(url.searchParams.get("business")).toBe("pay@kinexisdigital.com");
    expect(url.searchParams.get("item_name")).toBe("March website deposit");
  });

  it("explains when PayPal is not configured", async () => {
    vi.stubEnv("PAYPAL_BUSINESS_EMAIL", "");
    const res = await postCheckout(valid);
    expect(res.status).toBe(503);
    expect((await res.json()).error).toContain("aren't");
  });
});

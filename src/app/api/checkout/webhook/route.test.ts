import { afterEach, describe, expect, it, vi } from "vitest";

const sendKinexisMail = vi.fn(async () => ({ ok: true, sent: true }));

vi.mock("@/lib/email", () => ({
  emailRow: (label: string, value: string) => `${label}:${value}`,
  sendKinexisMail: (...args: Parameters<typeof sendKinexisMail>) =>
    sendKinexisMail(...args),
}));

vi.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: vi.fn(async () => {
    throw new Error("no workers binding");
  }),
}));

describe("POST /api/checkout/webhook", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    sendKinexisMail.mockClear();
  });

  async function postIpn(body: string, paypalBody = "VERIFIED") {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(paypalBody)),
    );
    vi.resetModules();
    const { POST } = await import("@/app/api/checkout/webhook/route");
    return POST(
      new Request("https://www.kinexisdigital.com/api/checkout/webhook", {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body,
      }),
    );
  }

  const completed = new URLSearchParams({
    payment_status: "Completed",
    mc_gross: "2500.00",
    mc_currency: "USD",
    item_name: "March website deposit",
    payer_email: "jordan@example.com",
    custom: "Jordan Lee|jordan@example.com|",
    receiver_email: "pay@kinexisdigital.com",
    txn_id: "ABC123",
  }).toString();

  it("emails the team when PayPal verifies a completed payment", async () => {
    vi.stubEnv("PAYPAL_BUSINESS_EMAIL", "pay@kinexisdigital.com");
    const res = await postIpn(completed);
    expect(res.status).toBe(200);
    expect(sendKinexisMail).toHaveBeenCalledOnce();
  });

  it("rejects a notification PayPal does not verify", async () => {
    vi.stubEnv("PAYPAL_BUSINESS_EMAIL", "pay@kinexisdigital.com");
    const res = await postIpn(completed, "INVALID");
    expect(res.status).toBe(400);
    expect(sendKinexisMail).not.toHaveBeenCalled();
  });
});

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sendMock = vi.fn();

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
  getCloudflareContext: vi.fn(async () => ({
    env: {
      EMAIL: { send: sendMock },
      CONTACT_TO_EMAIL: "hello@kinexisdigital.com",
      CONTACT_FROM_EMAIL: "hello@kinexisdigital.com",
    },
  })),
}));

describe("POST /api/lead", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.stubEnv("NODE_ENV", "development");
  });

  afterEach(() => {
    sendMock.mockReset();
  });

  async function postLead(body: Record<string, unknown>) {
    vi.resetModules();
    const { POST } = await import("@/app/api/lead/route");
    const request = new Request("https://www.kinexisdigital.com/api/lead", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://www.kinexisdigital.com",
      },
      body: JSON.stringify(body),
    });
    return POST(request);
  }

  it("accepts an email copied with surrounding whitespace", async () => {
    sendMock.mockResolvedValue(undefined);
    const res = await postLead({ name: "John", email: " john@example.com " });
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalled();
  });

  it("returns 400 when name is missing", async () => {
    const res = await postLead({ email: "john@example.com" });
    expect(res.status).toBe(400);
  });

  it("sends email via Cloudflare Email binding", async () => {
    sendMock.mockResolvedValue(undefined);
    const res = await postLead({
      name: "John",
      email: "john@example.com",
      service: "SEO",
    });
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ success: true });
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "hello@kinexisdigital.com",
        replyTo: "john@example.com",
      }),
    );
  });

  it("rejects a site-review lead without a valid website", async () => {
    const res = await postLead({
      name: "John",
      email: "john@example.com",
      websiteRequired: true,
    });
    expect(res.status).toBe(400);
  });

  it("accepts a site-review lead with a hostname", async () => {
    sendMock.mockResolvedValue(undefined);
    const res = await postLead({
      name: "John",
      email: "john@example.com",
      website: "example.com",
      websiteRequired: true,
      source: "landing-page",
    });
    expect(res.status).toBe(200);
  });

  it("accepts a contractor audit qualification with business name, budget, and timeline", async () => {
    sendMock.mockResolvedValue(undefined);
    const res = await postLead({
      name: "Maria",
      businessName: "Oak Cliff Roofing",
      email: "maria@example.com",
      phone: "2145550100",
      website: "oakcliffroofing.com",
      budget: "3000-5000",
      timeline: "30-days",
      landingSlug: "get-a-website",
      source: "landing-page",
    });
    expect(res.status).toBe(200);
  });

  it("normalizes email and phone and allows empty optional contractor fields", async () => {
    sendMock.mockResolvedValue(undefined);
    const res = await postLead({ name: "Alex", email: " <Alex@EXAMPLE.COM>. ", phone: "(919) 555-1234 ext 123", businessName: "", website: "", websiteRequired: false, landingSlug: "get-a-website", role: "Owner", industry: "Roofing", budget: "$500–$1,999", timeline: "Next 30 days" });
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({ replyTo: "Alex@example.com" }));
    const message = JSON.stringify(sendMock.mock.calls);
    expect(message).toContain("+19195551234 ext 123");
    expect(message).toContain("Not provided");
  });

  it.each(["555-1234", "29195551234", "letters"])("returns a phone field error for %s", async phone => {
    const res = await postLead({ name: "Alex", email: "alex@example.com", phone });
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({ field: "phone" });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("keeps phone optional for existing callers", async () => {
    sendMock.mockResolvedValue(undefined);
    expect((await postLead({ name: "Alex", email: "alex@example.com", source: "lead-magnet", websiteRequired: true, website: "example.com" })).status).toBe(200);
  });

  it.each([
    { name: "", field: "name" }, { email: "bad", field: "email" },
    { website: "bad", field: "website" }, { businessName: "a".repeat(201), field: "businessName" },
    { budget: "a".repeat(51), field: "budget" }, { timeline: "a".repeat(81), field: "timeline" },
    { role: "a".repeat(81), field: "role" }, { industry: "a".repeat(81), field: "industry" },
    { websiteStatus: "a".repeat(81), field: "websiteStatus" },
  ])("includes field in validation errors: $field", async ({ field, ...values }) => {
    const res = await postLead({ name: "Alex", email: "alex@example.com", ...values });
    expect(res.status).toBe(400); expect(await res.json()).toMatchObject({ field });
  });
});

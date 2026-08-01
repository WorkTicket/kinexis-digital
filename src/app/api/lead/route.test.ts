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
});

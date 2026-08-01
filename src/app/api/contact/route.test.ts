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
      CONTACT_TO_EMAIL: "hello@kinexisdigital.com,coltondwehr@icloud.com",
      CONTACT_FROM_EMAIL: "hello@kinexisdigital.com",
    },
  })),
}));

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.stubEnv("NODE_ENV", "development");
  });

  afterEach(() => {
    sendMock.mockReset();
  });

  async function postContact(body: Record<string, unknown>) {
    vi.resetModules();
    const { POST } = await import("@/app/api/contact/route");
    const request = new Request("https://www.kinexisdigital.com/api/contact", {
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
    const res = await postContact({ email: "john@example.com" });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("Name");
  });

  it("returns 400 when email is missing", async () => {
    const res = await postContact({ name: "John" });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("email");
  });

  it("returns 400 for invalid email", async () => {
    const res = await postContact({ name: "John", email: "not-an-email" });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("Invalid email");
  });

  it("returns 400 when name is too long", async () => {
    const res = await postContact({
      name: "x".repeat(201),
      email: "john@example.com",
    });
    expect(res.status).toBe(400);
    expect((await res.json()).error).toContain("Name is too long");
  });

  it("sends email via Cloudflare Email binding", async () => {
    sendMock.mockResolvedValue(undefined);
    const res = await postContact({
      name: "John",
      email: "john@example.com",
      message: "Hello!",
    });
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ success: true });
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: ["hello@kinexisdigital.com", "coltondwehr@icloud.com"],
        replyTo: "john@example.com",
        subject: "New Inquiry from John",
      }),
    );
  });
});

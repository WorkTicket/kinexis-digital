import { describe, it, expect, beforeEach, vi } from "vitest";

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

vi.mock("nodemailer", () => ({
  default: {
    createTransport: () => ({
      sendMail: vi.fn().mockResolvedValue({ messageId: "test-id" }),
    }),
  },
}));

describe("POST /api/lead", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("CONTACT_TO_EMAIL", "team@kinexisdigital.com");
    vi.stubEnv("GMAIL_USER", "test@gmail.com");
    vi.stubEnv("GMAIL_APP_PASSWORD", "testpass");
  });

  async function postLead(body: Record<string, unknown>) {
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

  it("returns 400 when email is missing", async () => {
    const res = await postLead({ name: "John" });
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid email", async () => {
    const res = await postLead({ name: "John", email: "invalid" });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("Invalid email");
  });

  it("returns 400 for invalid score (non-integer)", async () => {
    const res = await postLead({
      name: "John",
      email: "john@example.com",
      score: "abc",
    });
    expect(res.status).toBe(400);
    expect((await res.json()).error).toContain("Invalid score");
  });

  it("returns 400 for invalid source", async () => {
    const res = await postLead({
      name: "John",
      email: "john@example.com",
      source: "invalid-source",
    });
    expect(res.status).toBe(400);
    expect((await res.json()).error).toContain("Invalid source");
  });

  it("returns 400 when name is too long", async () => {
    const res = await postLead({
      name: "x".repeat(201),
      email: "john@example.com",
    });
    expect(res.status).toBe(400);
    expect((await res.json()).error).toContain("Name is too long");
  });

  it("returns 200 for valid lead submission in dev mode", async () => {
    const res = await postLead({
      name: "John Doe",
      email: "john@example.com",
      service: "SEO",
      score: "85",
      source: "website",
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });
});

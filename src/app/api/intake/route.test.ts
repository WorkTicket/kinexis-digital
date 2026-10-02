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
      CONTACT_FROM_EMAIL: "forms@kinexisdigital.com",
    },
  })),
}));

describe("POST /api/intake", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.stubEnv("NODE_ENV", "development");
  });

  afterEach(() => {
    sendMock.mockReset();
  });

  async function postIntake(body: Record<string, unknown>) {
    vi.resetModules();
    const { POST } = await import("@/app/api/intake/route");
    const request = new Request("https://www.kinexisdigital.com/api/intake", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://www.kinexisdigital.com",
      },
      body: JSON.stringify(body),
    });
    return POST(request);
  }

  it("returns 400 when the signature is missing", async () => {
    const res = await postIntake({
      answers: {
        companyName: "Acme Plumbing",
        primaryContact: "Jane Roe",
        email: "jane@acme.test",
      },
    });
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/signature/i);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("emails the questionnaire to the team inbox", async () => {
    sendMock.mockResolvedValue({});
    const res = await postIntake({
      answers: {
        companyName: "Acme Plumbing",
        primaryContact: "Jane Roe",
        email: "jane@acme.test",
        signature: "Jane Roe",
        projectReasons: ["Rank higher on Google"],
      },
      _hp: "",
      _ts: Date.now() - 10_000,
    });
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledTimes(1);
    const message = sendMock.mock.calls[0][0];
    expect(message.subject).toContain("Acme Plumbing");
    expect(message.replyTo).toBe("jane@acme.test");
    expect(message.text).toContain("Rank higher on Google");
    expect(message.to).toContain("hello@kinexisdigital.com");
  });
});

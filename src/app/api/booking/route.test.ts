import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { bookingSlotToUtc } from "@/lib/booking";

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

describe("POST /api/booking", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.useRealTimers();
    vi.stubEnv("NODE_ENV", "development");
  });

  afterEach(() => {
    sendMock.mockReset();
  });

  async function loadPost() {
    vi.resetModules();
    const mod = await import("@/app/api/booking/route");
    return mod.POST;
  }

  async function postBooking(
    body: Record<string, unknown>,
    POST?: typeof import("@/app/api/booking/route").POST,
  ) {
    const handler = POST ?? (await loadPost());
    const request = new Request("https://www.kinexisdigital.com/api/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://www.kinexisdigital.com",
      },
      body: JSON.stringify(body),
    });
    return handler(request);
  }

  it("rejects bookings sooner than 24 hours", async () => {
    const now = bookingSlotToUtc("2026-08-04", "10:00");
    vi.setSystemTime(now);

    const res = await postBooking({
      name: "Alex",
      email: "alex@example.com",
      date: "2026-08-04",
      time: "15:00",
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/24 hours/i);
  });

  it("accepts a valid weekday slot 24h+ out and emails via Cloudflare", async () => {
    const now = bookingSlotToUtc("2026-08-04", "10:00");
    vi.setSystemTime(now);
    sendMock.mockResolvedValue(undefined);

    const res = await postBooking({
      name: "Alex",
      email: "alex@example.com",
      date: "2026-08-06",
      time: "14:00",
      notes: "Need help with Google Ads waste",
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.date).toBe("2026-08-06");
    expect(body.time).toBe("14:00");
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "hello@kinexisdigital.com",
        replyTo: "alex@example.com",
        subject: "New Inquiry from Alex — Strategy Call",
      }),
    );
  });

  it("rejects a second booking for the same slot", async () => {
    const now = bookingSlotToUtc("2026-08-04", "10:00");
    vi.setSystemTime(now);
    sendMock.mockResolvedValue(undefined);

    // Same module instance so the in-memory booking store is shared.
    const POST = await loadPost();

    const first = await postBooking(
      {
        name: "Alex",
        email: "alex@example.com",
        date: "2026-08-07",
        time: "11:00",
      },
      POST,
    );
    expect(first.status).toBe(200);

    const second = await postBooking(
      {
        name: "Sam",
        email: "sam@example.com",
        date: "2026-08-07",
        time: "11:00",
      },
      POST,
    );
    expect(second.status).toBe(409);
    const body = await second.json();
    expect(body.error).toMatch(/just booked|not available/i);
  });

  it("rejects weekend dates", async () => {
    const now = bookingSlotToUtc("2026-08-04", "10:00");
    vi.setSystemTime(now);

    const res = await postBooking({
      name: "Alex",
      email: "alex@example.com",
      date: "2026-08-08", // Saturday
      time: "14:00",
    });
    expect(res.status).toBe(400);
  });
});

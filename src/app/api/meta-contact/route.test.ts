import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  meta: vi.fn(),
  origin: vi.fn(),
  rateLimited: vi.fn(),
}));

vi.mock("@/lib/analytics/meta-capi", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@/lib/analytics/meta-capi")>();
  return { ...actual, sendMetaCapiEvent: mocks.meta };
});
vi.mock("@/lib/csrf", () => ({ validateOrigin: mocks.origin }));
vi.mock("@/lib/rate-limit", () => ({
  getClientIp: () => "203.0.113.10",
  isRateLimited: mocks.rateLimited,
}));

import { POST } from "./route";

function tap(body: Record<string, unknown>, cookie = "kinexis-cookie-consent=accepted") {
  return POST(
    new Request("https://www.kinexisdigital.com/api/meta-contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        cookie,
        "user-agent": "Test browser",
        origin: "https://www.kinexisdigital.com",
      },
      body: JSON.stringify(body),
    }),
  );
}

describe("POST /api/meta-contact", () => {
  it.each(["", "kinexis-cookie-consent=rejected"])("does not send website CAPI without acceptance (%s)", async cookie => {
    expect((await tap({ metaEventId: "Contact.abc-def-123456" }, cookie)).status).toBe(200);
    expect(mocks.meta).not.toHaveBeenCalled();
  });
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.origin.mockReturnValue(true);
    mocks.rateLimited.mockResolvedValue(false);
    mocks.meta.mockResolvedValue({ sent: true });
  });

  it("sends a deduplicated Contact with attribution", async () => {
    const res = await tap({
      metaEventId: "Contact.abc-def-123456",
      landing_page: "/en/lp/get-a-website?fbclid=click123",
      fbp: "fb.1.1710000000000.1234567890",
      fbclid: "click123",
    });
    expect(res.status).toBe(200);
    expect(mocks.meta).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        eventName: "Contact",
        eventId: "Contact.abc-def-123456",
        clientIp: "203.0.113.10",
        userAgent: "Test browser",
        eventSourceUrl: "/en/lp/get-a-website?fbclid=click123",
        fbp: "fb.1.1710000000000.1234567890",
        fbclid: "click123",
      }),
    );
  });

  it("rejects a non-Contact or malformed event id", async () => {
    expect((await tap({ metaEventId: "Lead.abc-def-123456" })).status).toBe(400);
    expect((await tap({ metaEventId: "nope" })).status).toBe(400);
    expect(mocks.meta).not.toHaveBeenCalled();
  });

  it("does not send when the origin is invalid or rate limited", async () => {
    mocks.origin.mockReturnValue(false);
    expect((await tap({ metaEventId: "Contact.abc-def-123456" })).status).toBe(
      403,
    );
    mocks.origin.mockReturnValue(true);
    mocks.rateLimited.mockResolvedValue(true);
    expect((await tap({ metaEventId: "Contact.abc-def-123456" })).status).toBe(
      429,
    );
    expect(mocks.meta).not.toHaveBeenCalled();
  });

  it("stays 200 when Meta cannot be reached", async () => {
    mocks.meta.mockResolvedValue({ sent: false, reason: "network" });
    expect((await tap({ metaEventId: "Contact.abc-def-123456" })).status).toBe(
      200,
    );
  });
});

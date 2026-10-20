import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  meta: vi.fn(),
  mail: vi.fn(),
  origin: vi.fn(),
  rateLimited: vi.fn(),
  honeypot: vi.fn(),
}));

vi.mock("@/lib/analytics/meta-capi", () => ({ sendMetaCapiEvent: mocks.meta }));
vi.mock("@/lib/email", () => ({
  sendKinexisMail: mocks.mail,
  emailRow: () => "",
  describeMailError: () => "error",
}));
vi.mock("@/lib/csrf", () => ({ validateOrigin: mocks.origin }));
vi.mock("@/lib/rate-limit", () => ({
  getClientIp: () => "203.0.113.10",
  isRateLimited: mocks.rateLimited,
}));
vi.mock("@/lib/honeypot", () => ({ validateHoneypot: mocks.honeypot }));

import { POST } from "./route";

const lead = {
  name: "Test Lead",
  email: "lead@example.com",
  phone: "+12145550100",
  source: "landing-page",
  landingSlug: "get-a-website",
  metaEventId: "Lead.test-event-123",
};

function submit(extra = {}) {
  return POST(new Request("https://www.kinexisdigital.com/api/lead", {
    method: "POST",
    headers: { "content-type": "application/json",
        cookie: "kinexis-cookie-consent=accepted", "user-agent": "Test browser" },
    body: JSON.stringify({ ...lead, ...extra }),
  }));
}

describe("website landing page server-side Lead", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.origin.mockReturnValue(true);
    mocks.rateLimited.mockResolvedValue(false);
    mocks.honeypot.mockReturnValue({ blocked: false });
    mocks.mail.mockResolvedValue({ ok: true, sent: true });
    mocks.meta.mockResolvedValue({ sent: true });
  });

  it("sends a confirmed Lead with browser deduplication and attribution", async () => {
    const response = await submit({
        landing_page: "/en/lp/get-a-website?fbclid=click123",
        fbp: "fb.1.1710000000000.1234567890",
        fbc: "fb.1.1710000000000.click123",
    });
    expect(response.status).toBe(200);
    expect(mocks.meta).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({
      eventName: "Lead", eventId: lead.metaEventId,
      email: lead.email, phone: lead.phone,
      contentName: "get-a-website", contentCategory: "landing-page",
      clientIp: "203.0.113.10", userAgent: "Test browser",
      eventSourceUrl: "/en/lp/get-a-website?fbclid=click123",
      fbp: "fb.1.1710000000000.1234567890",
      fbc: "fb.1.1710000000000.click123",
    }));
  });

  it("includes the landing URL when browser attribution is unavailable", async () => {
    expect((await submit()).status).toBe(200);
    expect(mocks.meta).toHaveBeenCalledWith(expect.objectContaining({
      eventSourceUrl: "/lp/get-a-website",
    }));
  });

  it.each(["origin", "rate", "spam", "email", "mail"])(
    "does not send an event for a rejected %s submission", async (reason) => {
      if (reason === "origin") mocks.origin.mockReturnValue(false);
      if (reason === "rate") mocks.rateLimited.mockResolvedValue(true);
      if (reason === "spam") mocks.honeypot.mockReturnValue({ blocked: true });
      if (reason === "mail") mocks.mail.mockResolvedValue({ ok: false });
      const response = await submit(reason === "email" ? { email: "invalid" } : {});
      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(mocks.meta).not.toHaveBeenCalled();
    },
  );

  it("keeps the lead successful when Meta is unavailable", async () => {
    mocks.meta.mockResolvedValue({ sent: false, reason: "network" });
    expect((await submit()).status).toBe(200);
  });

  it("sends a server-only QualifiedLead with distinct ID and identical match data", async () => {
    expect((await submit({ role: "Owner", budget: "$500–$1,999", timeline: "1–3 months" })).status).toBe(200);
    expect(mocks.meta).toHaveBeenCalledTimes(2);
    const [leadEvent, qualifiedEvent] = mocks.meta.mock.calls.map(([event]) => event);
    expect(leadEvent.eventId).toBe(lead.metaEventId);
    expect(qualifiedEvent).toEqual({ ...leadEvent, eventName: "QualifiedLead", eventId: expect.stringMatching(/^QualifiedLead\./) });
    expect(qualifiedEvent.firstName).toBe("Test");
    expect(qualifiedEvent.lastName).toBe("Lead");
  });

  it("includes all four UTMs in the lead notification", async () => {
    const utms = { utm_source: "facebook", utm_medium: "paid_social", utm_campaign: "raleigh", utm_content: "ad-2" };
    expect((await submit(utms)).status).toBe(200);
    const text = mocks.mail.mock.calls[0][0].text;
    for (const value of Object.values(utms)) expect(text).toContain(value);
  });
});

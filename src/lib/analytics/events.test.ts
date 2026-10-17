import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("analytics events", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("no-ops trackLead when Ads ID and label are unset", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", "");
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_LEAD", "");
    const gtag = vi.fn();
    vi.stubGlobal("window", { location: { pathname: "/thank-you" }, gtag });

    const { trackLead, getConversionSendTo } = await import(
      "@/lib/analytics/events"
    );

    expect(getConversionSendTo("lead")).toBeUndefined();
    expect(trackLead({ email: "a@b.com" })).toBe(false);
    // GA generate_lead may still fire when gtag exists
    expect(gtag).toHaveBeenCalledWith(
      "event",
      "generate_lead",
      expect.objectContaining({ form_type: "contact" }),
    );
    expect(
      gtag.mock.calls.some(
        (c) => c[0] === "event" && c[1] === "conversion",
      ),
    ).toBe(false);
  });

  it("uses the live Submit lead form send_to in production builds", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", undefined as unknown as string);
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_LEAD", undefined as unknown as string);

    const { getConversionSendTo } = await import("@/lib/analytics/events");
    expect(getConversionSendTo("lead")).toBe(
      "AW-18409243306/AtDSCIa1--ccEKqFm8pE",
    );
    expect(getConversionSendTo("audit")).toBe(
      "AW-18409243306/AtDSCIa1--ccEKqFm8pE",
    );
  });

  it("fires conversion with send_to when ID and label are set", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", "AW-123456789");
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_LEAD", "AbCdEfGh");
    const gtag = vi.fn();
    vi.stubGlobal("window", { location: { pathname: "/thank-you" }, gtag });

    const { trackLead, normalizeUserEmail, getConversionSendTo } = await import(
      "@/lib/analytics/events"
    );

    expect(getConversionSendTo("lead")).toBe(
      "AW-123456789/AbCdEfGh",
    );
    expect(normalizeUserEmail("  Foo@Bar.COM ")).toBe("foo@bar.com");

    const fired = trackLead({
      email: "  Foo@Bar.COM ",
      formType: "landing-page",
      serviceInterest: "SEO",
    });

    expect(fired).toBe(true);
    expect(gtag).toHaveBeenCalledWith("set", "user_data", {
      email: "foo@bar.com",
    });
    expect(gtag).toHaveBeenCalledWith("event", "conversion", {
      send_to: "AW-123456789/AbCdEfGh",
    });
  });

  it("sends EUR on conversions when the document language is Spain Spanish", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", "AW-123456789");
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_LEAD", "AbCdEfGh");
    const gtag = vi.fn();
    vi.stubGlobal("window", { location: { pathname: "/thank-you" }, gtag });
    vi.stubGlobal("document", { documentElement: { lang: "es-ES" } });

    const { trackLead } = await import("@/lib/analytics/events");
    expect(trackLead({ email: "a@b.com" })).toBe(true);
    expect(gtag).toHaveBeenCalledWith("event", "conversion", {
      send_to: "AW-123456789/AbCdEfGh",
      currency: "EUR",
    });
  });

  it("trackCallClick no-ops without call label", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", "AW-123456789");
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_CALL", "");
    const gtag = vi.fn();
    vi.stubGlobal("window", { location: { pathname: "/thank-you" }, gtag });

    const { trackCallClick } = await import("@/lib/analytics/events");
    expect(trackCallClick()).toBe(false);
    expect(gtag).toHaveBeenCalledWith("event", "click_to_call", {});
  });

  it("trackCallClick fires a browser + server Contact with a shared eventID", async () => {
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "2080705549212381");
    const gtag = vi.fn();
    const fbq = vi.fn();
    const store = new Map<string, string>();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    vi.stubGlobal("window", {
      location: { pathname: "/lp/get-a-website", search: "" },
      gtag,
      fbq,
      sessionStorage: {
        getItem: (k: string) => store.get(k) ?? null,
        setItem: (k: string, v: string) => {
          store.set(k, v);
        },
        removeItem: (k: string) => {
          store.delete(k);
        },
      },
    });

    const { trackCallClick } = await import("@/lib/analytics/events");
    trackCallClick();

    const call = fbq.mock.calls.find(
      ([kind, name]) => kind === "track" && name === "Contact",
    );
    expect(call).toBeDefined();
    const eventId = (call![3] as { eventID: string }).eventID;
    expect(eventId).toMatch(/^Contact\./);

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/meta-contact",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining(eventId),
      }),
    );
  });

  it("trackCallClick skips the server Contact off the funnel", async () => {
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "2080705549212381");
    const gtag = vi.fn();
    const fbq = vi.fn();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    vi.stubGlobal("window", {
      location: { pathname: "/about", search: "" },
      gtag,
      fbq,
    });

    const { trackCallClick } = await import("@/lib/analytics/events");
    trackCallClick();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(
      fbq.mock.calls.some(([kind, name]) => kind === "track" && name === "Contact"),
    ).toBe(false);
  });

  it("trackLead also fires a Meta Lead event when fbq is present", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", "AW-123456789");
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_LEAD", "AbCdEfGh");
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "2080705549212381");
    const gtag = vi.fn();
    const fbq = vi.fn();
    const clarity = vi.fn();
    vi.stubGlobal("window", { location: { pathname: "/thank-you" }, gtag, fbq, clarity });

    const { trackLead } = await import("@/lib/analytics/events");
    expect(trackLead({ email: "a@b.com", formType: "landing-page" })).toBe(true);
    expect(fbq).toHaveBeenCalledWith("init", "2080705549212381", {
      em: "a@b.com",
    });
    expect(fbq).toHaveBeenCalledWith("track", "Lead", {
      content_category: "landing-page",
      value: 0,
      currency: "USD",
    });
    expect(clarity).toHaveBeenCalledWith("event", "generate_lead");
  });

  it("tags audit leads with the landing slug for Ads, GA, Meta, and Clarity", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", "AW-123456789");
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_AUDIT", "AuditLabel");
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_LP_WEB_DESIGN", "WebDesignLabel");
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "2080705549212381");
    const gtag = vi.fn();
    const fbq = vi.fn();
    const clarity = vi.fn();
    vi.stubGlobal("window", { location: { pathname: "/thank-you" }, gtag, fbq, clarity });

    const { trackAuditLead } = await import("@/lib/analytics/events");
    expect(
      trackAuditLead({
        email: "a@b.com",
        serviceInterest: "Web design & development",
        landingSlug: "web-design",
      }),
    ).toBe(true);

    expect(gtag).toHaveBeenCalledWith("event", "conversion", {
      send_to: "AW-123456789/WebDesignLabel",
    });
    expect(gtag).toHaveBeenCalledWith(
      "event",
      "generate_lead",
      expect.objectContaining({
        form_type: "lead-magnet",
        service_interest: "Web design & development",
        landing_page: "web-design",
      }),
    );
    expect(fbq).toHaveBeenCalledWith("track", "Lead", {
      content_name: "web-design",
      content_category: "lead-magnet",
      value: 0,
      currency: "USD",
    });
    expect(clarity).toHaveBeenCalledWith("set", "landing_page", "web-design");
    expect(clarity).toHaveBeenCalledWith("event", "generate_lead");
  });

  it("returns false when gtag is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", "AW-123456789");
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_LEAD", "AbCdEfGh");
    vi.stubGlobal("window", { location: { pathname: "/thank-you" },});

    const { trackLead } = await import("@/lib/analytics/events");
    expect(trackLead({ email: "a@b.com" })).toBe(false);
  });

  it("ignores Ads IDs that do not start with AW-", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", "G-WRONG");
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_LEAD", "AbCdEfGh");
    const gtag = vi.fn();
    vi.stubGlobal("window", { location: { pathname: "/thank-you" }, gtag });

    const { trackLead, getConversionSendTo } = await import(
      "@/lib/analytics/events"
    );
    expect(getConversionSendTo("lead")).toBeUndefined();
    expect(trackLead({ email: "a@b.com" })).toBe(false);
  });

  it("trackBookingClick attaches Enhanced Conversions email", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", "AW-123456789");
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_BOOKING", "BookLabel");
    const gtag = vi.fn();
    vi.stubGlobal("window", { location: { pathname: "/thank-you" }, gtag });

    const { trackBookingClick } = await import("@/lib/analytics/events");
    expect(trackBookingClick({ email: "  Book@Example.COM " })).toBe(true);
    expect(gtag).toHaveBeenCalledWith("set", "user_data", {
      email: "book@example.com",
    });
    expect(gtag).toHaveBeenCalledWith("event", "conversion", {
      send_to: "AW-123456789/BookLabel",
    });
  });

  it("trackBookingClick fires a Meta Schedule event", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", "AW-123456789");
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_BOOKING", "BookLabel");
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "2080705549212381");
    const gtag = vi.fn();
    const fbq = vi.fn();
    vi.stubGlobal("window", { location: { pathname: "/thank-you" }, gtag, fbq });

    const { trackBookingClick } = await import("@/lib/analytics/events");
    expect(trackBookingClick({ email: "book@example.com" })).toBe(true);
    expect(fbq).toHaveBeenCalledWith("track", "Schedule", {
      content_category: "booking",
    });
  });

  it("trackPurchase fires Meta Purchase with USD", async () => {
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "2080705549212381");
    const fbq = vi.fn();
    const store = new Map<string, string>();
    vi.stubGlobal("window", { location: { pathname: "/thank-you" },
      fbq,
      sessionStorage: {
        getItem: (k: string) => store.get(k) ?? null,
        setItem: (k: string, v: string) => {
          store.set(k, v);
        },
        removeItem: (k: string) => {
          store.delete(k);
        },
      },
    });

    const { trackPurchase } = await import("@/lib/analytics/events");
    expect(trackPurchase({ value: 1500, email: "pay@example.com" })).toBe(true);
    expect(fbq).toHaveBeenCalledWith("init", "2080705549212381", {
      em: "pay@example.com",
    });
    expect(fbq).toHaveBeenCalledWith(
      "track",
      "Purchase",
      {
        value: 1500,
        currency: "USD",
      },
      expect.objectContaining({ eventID: expect.stringMatching(/^Purchase\./) }),
    );
  });
});

describe("pending conversion stash", () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    vi.stubGlobal("window", { location: { pathname: "/thank-you" },
      sessionStorage: {
        getItem: (k: string) => store.get(k) ?? null,
        setItem: (k: string, v: string) => {
          store.set(k, v);
        },
        removeItem: (k: string) => {
          store.delete(k);
        },
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("stores and consumes a pending lead conversion once", async () => {
    const { stashPendingConversion, consumePendingConversion } = await import(
      "@/lib/analytics/pending-conversion"
    );

    stashPendingConversion({
      type: "lead",
      email: "lead@example.com",
      phone: "+15551212",
      formType: "contact",
      serviceInterest: "SEO",
    });

    const first = consumePendingConversion("lead");
    expect(first?.email).toBe("lead@example.com");
    expect(first?.phone).toBe("+15551212");
    expect(consumePendingConversion("lead")).toBeNull();
  });

  it("rejects mismatched type", async () => {
    const { stashPendingConversion, consumePendingConversion } = await import(
      "@/lib/analytics/pending-conversion"
    );

    stashPendingConversion({
      type: "audit",
      email: "audit@example.com",
      formType: "lead-magnet",
    });

    expect(consumePendingConversion("lead")).toBeNull();
  });

  it("peeks without consuming and claims a Meta event id once", async () => {
    const {
      stashPendingConversion,
      peekPendingConversion,
      consumePendingConversion,
      claimMetaEventFire,
      createMetaEventId,
      resolveMetaConversionEvent,
    } = await import("@/lib/analytics/pending-conversion");

    const metaEventId = createMetaEventId("Schedule");
    stashPendingConversion({
      type: "booking",
      email: "book@example.com",
      metaEvent: "Schedule",
      metaEventId,
    });

    const peeked = peekPendingConversion();
    expect(peeked?.type).toBe("booking");
    expect(resolveMetaConversionEvent(peeked!)).toBe("Schedule");
    expect(peekPendingConversion()?.email).toBe("book@example.com");
    expect(consumePendingConversion("booking")?.metaEventId).toBe(metaEventId);

    expect(claimMetaEventFire(metaEventId)).toBe(true);
    expect(claimMetaEventFire(metaEventId)).toBe(false);
  });
});

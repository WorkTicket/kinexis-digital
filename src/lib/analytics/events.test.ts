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
    vi.stubGlobal("window", { gtag });

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

  it("fires conversion with send_to when ID and label are set", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", "AW-123456789");
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_LEAD", "AbCdEfGh");
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag });

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

  it("trackCallClick no-ops without call label", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", "AW-123456789");
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_CALL", "");
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag });

    const { trackCallClick } = await import("@/lib/analytics/events");
    expect(trackCallClick()).toBe(false);
    expect(gtag).toHaveBeenCalledWith("event", "click_to_call", {});
  });

  it("returns false when gtag is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", "AW-123456789");
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_LEAD", "AbCdEfGh");
    vi.stubGlobal("window", {});

    const { trackLead } = await import("@/lib/analytics/events");
    expect(trackLead({ email: "a@b.com" })).toBe(false);
  });
});

describe("pending conversion stash", () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    vi.stubGlobal("window", {
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
      formType: "contact",
      serviceInterest: "SEO",
    });

    const first = consumePendingConversion("lead");
    expect(first?.email).toBe("lead@example.com");
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
});

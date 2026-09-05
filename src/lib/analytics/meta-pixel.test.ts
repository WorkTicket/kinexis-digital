import { afterEach, describe, expect, it, vi } from "vitest";
import { PRODUCTION_META_PIXEL_ID } from "@/lib/analytics/ads-config";
import { PENDING_CONVERSION_KEY } from "@/lib/analytics/pending-conversion";
import {
  buildEarlyMetaPixelHtml,
  buildMetaConversionSnippet,
  buildMetaLeadSnippet,
  buildMetaPixelInitScript,
} from "@/lib/analytics/meta-pixel";

describe("buildMetaPixelInitScript", () => {
  it("emits the official fbevents stub, init, and PageView", () => {
    const snippet = buildMetaPixelInitScript(PRODUCTION_META_PIXEL_ID);
    expect(snippet).toContain("https://connect.facebook.net/en_US/fbevents.js");
    expect(snippet).toContain(`fbq('init','${PRODUCTION_META_PIXEL_ID}')`);
    expect(snippet).toContain("fbq('track','PageView')");
    expect(snippet).toContain("kinexis-cookie-consent");
    expect(snippet).toContain("fbq('consent','grant')");
  });

  it("starts revoked when defaultConsent is revoke (GDPR)", () => {
    const snippet = buildMetaPixelInitScript(PRODUCTION_META_PIXEL_ID, {
      defaultConsent: "revoke",
    });
    expect(snippet.indexOf("fbq('consent','revoke')")).toBeGreaterThanOrEqual(0);
    expect(snippet.indexOf("fbq('consent','revoke')")).toBeLessThan(
      snippet.indexOf("fbq('init'"),
    );
  });

  it("rejects malformed pixel IDs", () => {
    expect(buildMetaPixelInitScript("not-a-pixel")).toBe("");
    expect(buildMetaPixelInitScript("AW-123")).toBe("");
    expect(buildMetaPixelInitScript("")).toBe("");
  });
});

describe("buildEarlyMetaPixelHtml", () => {
  it("wraps init and the thank-you Lead snippet without element ids", () => {
    const html = buildEarlyMetaPixelHtml(PRODUCTION_META_PIXEL_ID);
    expect(html.startsWith("<script>")).toBe(true);
    expect(html).toContain("fbevents.js");
    expect(html).toContain("fbq('track','Lead')");
    expect(html).not.toContain('id="');
  });
});

describe("buildMetaConversionSnippet parse", () => {
  it("is valid JavaScript so thank-you Lead can actually run", () => {
    const snippet = buildMetaConversionSnippet(PRODUCTION_META_PIXEL_ID);
    expect(snippet.length).toBeGreaterThan(0);
    expect(() => new Function(snippet)).not.toThrow();
  });
});

describe("buildMetaLeadSnippet", () => {
  it("fires Lead only on thank-you when a pending conversion exists", () => {
    const snippet = buildMetaLeadSnippet(PRODUCTION_META_PIXEL_ID);
    expect(snippet).toContain("thank-you");
    expect(snippet).toContain(PENDING_CONVERSION_KEY);
    expect(snippet).toContain("if(!raw)return");
    expect(snippet).toContain("conversionAlreadyFired");
    expect(snippet).toContain("fbq('track','Lead')");
    expect(snippet).toContain("fbq('track','Schedule')");
    expect(snippet).toContain("fbq('track','Purchase'");
    expect(snippet).toContain("currency:p.purchaseCurrency||'USD'");
    expect(snippet).toContain(`fbq('init','${PRODUCTION_META_PIXEL_ID}',ud)`);
  });

  it("rejects malformed pixel IDs", () => {
    expect(buildMetaLeadSnippet("abc")).toBe("");
  });
});

describe("trackMetaLead", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("re-inits with Advanced Matching and fires Lead", async () => {
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "2080705549212381");
    const fbq = vi.fn();
    vi.stubGlobal("window", { fbq });

    const { trackMetaLead } = await import("@/lib/analytics/meta-pixel");
    expect(
      trackMetaLead({
        email: "  Lead@Example.COM ",
        phone: "(555) 123-4567",
        contentName: "Web design & development",
        contentCategory: "lead-magnet",
      }),
    ).toBe(true);

    expect(fbq).toHaveBeenCalledWith("init", "2080705549212381", {
      em: "lead@example.com",
      ph: "5551234567",
    });
    expect(fbq).toHaveBeenCalledWith("track", "Lead", {
      content_name: "Web design & development",
      content_category: "lead-magnet",
    });
  });

  it("no-ops when fbq is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "2080705549212381");
    vi.stubGlobal("window", {});
    const { trackMetaLead } = await import("@/lib/analytics/meta-pixel");
    expect(trackMetaLead({ email: "a@b.com" })).toBe(false);
  });
});

describe("trackMetaPurchase and eventId dedupe", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("fires Purchase with value and USD", async () => {
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "2080705549212381");
    const fbq = vi.fn();
    vi.stubGlobal("window", { fbq, sessionStorage: memorySession() });

    const { trackMetaPurchase } = await import("@/lib/analytics/meta-pixel");
    expect(trackMetaPurchase({ value: 1500, currency: "USD" })).toBe(true);
    expect(fbq).toHaveBeenCalledWith("track", "Purchase", {
      value: 1500,
      currency: "USD",
    });
  });

  it("rejects zero or invalid purchase values", async () => {
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "2080705549212381");
    const fbq = vi.fn();
    vi.stubGlobal("window", { fbq, sessionStorage: memorySession() });

    const { trackMetaPurchase } = await import("@/lib/analytics/meta-pixel");
    expect(trackMetaPurchase({ value: 0 })).toBe(false);
    expect(trackMetaPurchase({ value: -10 })).toBe(false);
    expect(fbq).not.toHaveBeenCalled();
  });

  it("does not fire the same eventId twice", async () => {
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "2080705549212381");
    const fbq = vi.fn();
    vi.stubGlobal("window", { fbq, sessionStorage: memorySession() });

    const { trackMetaLead } = await import("@/lib/analytics/meta-pixel");
    expect(trackMetaLead({ eventId: "lead-once" })).toBe(true);
    expect(trackMetaLead({ eventId: "lead-once" })).toBe(false);
    expect(fbq).toHaveBeenCalledTimes(1);
  });

  it("firePendingMetaConversion emits Schedule on thank-you and skips elsewhere", async () => {
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "2080705549212381");
    const fbq = vi.fn();
    vi.stubGlobal("window", {
      fbq,
      location: { pathname: "/thank-you" },
      sessionStorage: memorySession(),
    });

    const { firePendingMetaConversion } = await import(
      "@/lib/analytics/meta-pixel"
    );
    expect(
      firePendingMetaConversion({
        type: "booking",
        email: "book@example.com",
        metaEvent: "Schedule",
        storedAt: Date.now(),
      }),
    ).toBe(true);
    expect(fbq).toHaveBeenCalledWith("track", "Schedule");

    vi.stubGlobal("window", {
      fbq,
      location: { pathname: "/contact" },
      sessionStorage: memorySession(),
    });
    const retry = await import("@/lib/analytics/meta-pixel");
    expect(
      retry.firePendingMetaConversion({
        type: "lead",
        email: "a@b.com",
        metaEvent: "Lead",
        storedAt: Date.now(),
      }),
    ).toBe(false);
  });
});

function memorySession() {
  const store = new Map<string, string>();
  return {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => {
      store.set(k, v);
    },
    removeItem: (k: string) => {
      store.delete(k);
    },
  };
}

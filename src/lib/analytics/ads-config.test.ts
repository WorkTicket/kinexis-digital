import { afterEach, describe, expect, it, vi } from "vitest";

describe("ads-config", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("uses env when NEXT_PUBLIC_GOOGLE_ADS_ID is a valid AW- id", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", "AW-999");
    const { getGoogleAdsId } = await import("@/lib/analytics/ads-config");
    expect(getGoogleAdsId()).toBe("AW-999");
  });

  it("disables the tag when the env var is explicitly empty", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", "");
    const { getGoogleAdsId } = await import("@/lib/analytics/ads-config");
    expect(getGoogleAdsId()).toBeUndefined();
  });

  it("falls back to the production Google tag id in production builds", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", undefined as unknown as string);
    const { getGoogleAdsId, PRODUCTION_GOOGLE_ADS_ID } = await import(
      "@/lib/analytics/ads-config"
    );
    expect(getGoogleAdsId()).toBe(PRODUCTION_GOOGLE_ADS_ID);
  });

  it("falls back to the production lead label in production builds", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_LEAD", undefined as unknown as string);
    const { getLeadConversionLabel, PRODUCTION_GADS_LABEL_LEAD } = await import(
      "@/lib/analytics/ads-config"
    );
    expect(getLeadConversionLabel()).toBe(PRODUCTION_GADS_LABEL_LEAD);
  });

  it("builds the live Submit lead form send_to in production builds", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", undefined as unknown as string);
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_LEAD", undefined as unknown as string);
    const { getLeadConversionSendTo } = await import("@/lib/analytics/ads-config");
    expect(getLeadConversionSendTo()).toBe(
      "AW-18409243306/AtDSCIa1--ccEKqFm8pE",
    );
  });

  it("builds the classic conversion pixel for the live lead action", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", undefined as unknown as string);
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_LEAD", undefined as unknown as string);
    const { getLeadConversionPixelUrl } = await import(
      "@/lib/analytics/ads-config"
    );
    expect(getLeadConversionPixelUrl()).toBe(
      "https://www.googleadservices.com/pagead/conversion/18409243306/?label=AtDSCIa1--ccEKqFm8pE&guid=ON&script=0",
    );
  });

  it("falls audit conversions back to the lead label when AUDIT is unset", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", undefined as unknown as string);
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_LEAD", undefined as unknown as string);
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_AUDIT", undefined as unknown as string);
    const { getAuditConversionLabel, PRODUCTION_GADS_LABEL_LEAD } = await import(
      "@/lib/analytics/ads-config"
    );
    expect(getAuditConversionLabel()).toBe(PRODUCTION_GADS_LABEL_LEAD);
  });

  it("uses a dedicated audit label when set", async () => {
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_AUDIT", "AuditLabel99");
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_LEAD", "LeadLabel99");
    const { getAuditConversionLabel } = await import("@/lib/analytics/ads-config");
    expect(getAuditConversionLabel()).toBe("AuditLabel99");
  });

  it("disables the lead conversion when the label env is explicitly empty", async () => {
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_LEAD", "");
    const { getLeadConversionLabel } = await import(
      "@/lib/analytics/ads-config"
    );
    expect(getLeadConversionLabel()).toBeUndefined();
  });

  it("uses the production Meta Pixel id in production builds", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", undefined as unknown as string);
    const { getMetaPixelId, PRODUCTION_META_PIXEL_ID } = await import(
      "@/lib/analytics/ads-config"
    );
    expect(getMetaPixelId()).toBe(PRODUCTION_META_PIXEL_ID);
  });

  it("rejects non-numeric Meta Pixel ids", async () => {
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "AW-123");
    const { getMetaPixelId } = await import("@/lib/analytics/ads-config");
    expect(getMetaPixelId()).toBeUndefined();
  });

  it("uses a dedicated landing-page label when set", async () => {
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_AUDIT", "AuditLabel99");
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_LP_WEB_DESIGN", "WebDesignLabel");
    vi.stubEnv(
      "NEXT_PUBLIC_GADS_LABEL_LP_FACEBOOK_WEB_DESIGN",
      "FacebookWebDesignLabel",
    );
    const { getLandingPageConversionLabel } = await import(
      "@/lib/analytics/ads-config"
    );
    expect(getLandingPageConversionLabel("web-design")).toBe("WebDesignLabel");
    expect(getLandingPageConversionLabel("facebook-web-design")).toBe(
      "FacebookWebDesignLabel",
    );
    expect(getLandingPageConversionLabel("google-ads-management")).toBe(
      "AuditLabel99",
    );
  });

  it("falls landing-page labels back to the audit label when unset", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_LEAD", undefined as unknown as string);
    vi.stubEnv("NEXT_PUBLIC_GADS_LABEL_AUDIT", undefined as unknown as string);
    vi.stubEnv(
      "NEXT_PUBLIC_GADS_LABEL_LP_WEB_DESIGN",
      undefined as unknown as string,
    );
    const { getLandingPageConversionLabel, PRODUCTION_GADS_LABEL_LEAD } =
      await import("@/lib/analytics/ads-config");
    expect(getLandingPageConversionLabel("web-design")).toBe(
      PRODUCTION_GADS_LABEL_LEAD,
    );
  });
});

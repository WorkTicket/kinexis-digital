import { describe, expect, it } from "vitest";
import {
  getLandingChrome,
  isCookieBannerExemptPath,
  landingSlugFromPath,
} from "@/lib/landing-chrome";

describe("landing chrome", () => {
  it("reads the slug from locale-unprefixed and prefixed paths", () => {
    expect(landingSlugFromPath("/lp/web-design")).toBe("web-design");
    expect(landingSlugFromPath("/en/lp/facebook-web-design")).toBe(
      "facebook-web-design",
    );
    expect(landingSlugFromPath("/services/web-design")).toBeUndefined();
  });

  it("maps each lander to its own primary CTA, not the sitewide strategy call", () => {
    const google = getLandingChrome("/lp/web-design");
    const meta = getLandingChrome("/lp/facebook-web-design");
    const website = getLandingChrome("/lp/get-a-website");

    expect(google?.ctaLabel.toLowerCase()).toContain("notes");
    expect(meta?.ctaLabel.toLowerCase()).toContain("consult");
    expect(website?.ctaLabel.toLowerCase()).toContain("plan");
    expect(website?.headerCtaLabel.toLowerCase()).toMatch(/get my free website plan/);
    expect(website?.ctaLabel.toLowerCase()).toMatch(/website plan/);
    expect(google?.slim).toBe(false);
    expect(meta?.slim).toBe(false);
    expect(website?.slim).toBe(true);
    expect(google?.formHref).toBe("#lp-form");
    expect(website?.formHref).toBe("#lp-form");
    expect(meta?.ctaLabel).not.toBe(google?.ctaLabel);
    expect(getLandingChrome("/contact")).toBeNull();
  });

  it("hides the cookie banner on paid landers and thank-you", () => {
    expect(isCookieBannerExemptPath("/lp/get-a-website")).toBe(true);
    expect(isCookieBannerExemptPath("/en/lp/get-a-website")).toBe(true);
    expect(isCookieBannerExemptPath("/thank-you/audit")).toBe(true);
    expect(isCookieBannerExemptPath("/en/thank-you")).toBe(true);
    expect(isCookieBannerExemptPath("/contact")).toBe(false);
    expect(isCookieBannerExemptPath("/")).toBe(false);
  });
});

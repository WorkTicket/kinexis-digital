import { describe, expect, it } from "vitest";
import { getLandingChrome, landingSlugFromPath } from "@/lib/landing-chrome";

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

    expect(google?.ctaLabel.toLowerCase()).toContain("notes");
    expect(meta?.ctaLabel.toLowerCase()).toContain("consult");
    expect(google?.formHref).toBe("#lp-form");
    expect(meta?.ctaLabel).not.toBe(google?.ctaLabel);
    expect(getLandingChrome("/contact")).toBeNull();
  });
});

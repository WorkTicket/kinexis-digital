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
    expect(website?.headerCtaLabel.toLowerCase()).toMatch(/get my website plan/);
    expect(website?.ctaLabel.toLowerCase()).toMatch(/website plan/);
    expect(google?.slim).toBe(false);
    expect(meta?.slim).toBe(false);
    expect(website?.slim).toBe(true);
    expect(google?.formHref).toBe("#lp-form");
    expect(website?.formHref).toBe("#lp-form");
    expect(meta?.ctaLabel).not.toBe(google?.ctaLabel);
    expect(getLandingChrome("/contact")).toBeNull();
  });

  it("localizes get-a-website chrome for Spanish locales", () => {
    const latam = getLandingChrome("/lp/get-a-website", "es-419");
    expect(latam?.headerCtaLabel).toMatch(/plan de sitio web/i);
    expect(latam?.ctaLabel).toMatch(/plan gratis/i);
    expect(latam?.closingTitle).toMatch(/plan gratis/i);
    expect(latam?.headerCtaLabel).not.toMatch(/Get My Website Plan/i);

    const spain = getLandingChrome("/lp/get-a-website", "es-ES");
    expect(spain?.headerCtaLabel).toMatch(/plan de sitio web/i);
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

describe("get-a-website theme tokens", () => {
  it("does not force dark LP tokens when lp-chrome is present", async () => {
    const { readFileSync } = await import("node:fs");
    const { resolve } = await import("node:path");
    const css = readFileSync(
      resolve(process.cwd(), "src/styles/components/landing-agency.css"),
      "utf8",
    );
    // Dark .lp-web tokens must key off data-theme=dark only.
    expect(css).toMatch(/html\[data-theme=dark\]\s*\.lp-web\s*\{/);
    expect(css).not.toMatch(/html\.lp-chrome\s*\.lp-web\s*\{/);
    // Chrome shell follows theme background, not hardcoded black.
    expect(css).toMatch(
      /html\.lp-chrome\s*\{\s*background-color:\s*var\(--background\);/,
    );
    expect(css).toMatch(
      /html\.lp-chrome\s+body\s*\{\s*background-color:\s*var\(--background\);/,
    );
  });

  it("shares the sitewide theme storage key (no LP-only theme)", async () => {
    const { THEME_STORAGE_KEY, THEME_PREFLIGHT_SCRIPT } = await import(
      "@/lib/theme"
    );
    expect(THEME_STORAGE_KEY).toBe("kinexis-theme");
    expect(THEME_PREFLIGHT_SCRIPT).toContain("kinexis-theme");
    expect(THEME_PREFLIGHT_SCRIPT).toContain('setAttribute("data-theme"');
  });
});

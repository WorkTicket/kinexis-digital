import { describe, it, expect } from "vitest";
import {
  pricingSlugCanonical,
  serviceSlugCanonical,
  sitemapExcludedPricingSlugs,
  sitemapExcludedServiceSlugs,
  sitemapPricingSlugs,
  sitemapServiceSlugs,
} from "@/content/registry/site-routes";

describe("sitemap exclusions for legacy redirects", () => {
  const legacySlugs = ["google-ads", "paid-ads", "cro"] as const;

  it("excludes legacy service slugs from the sitemap", () => {
    for (const slug of legacySlugs) {
      expect(sitemapExcludedServiceSlugs).toContain(slug);
      expect(sitemapServiceSlugs).not.toContain(slug);
    }
  });

  it("excludes legacy pricing slugs from the sitemap", () => {
    for (const slug of legacySlugs) {
      expect(sitemapExcludedPricingSlugs).toContain(slug);
      expect(sitemapPricingSlugs).not.toContain(slug);
    }
  });

  it("maps legacy slugs to canonical targets", () => {
    expect(serviceSlugCanonical["google-ads"]).toBe("ppc-management");
    expect(serviceSlugCanonical["paid-ads"]).toBe("ppc-management");
    expect(serviceSlugCanonical.cro).toBe("funnels");

    expect(pricingSlugCanonical["google-ads"]).toBe("ppc-management");
    expect(pricingSlugCanonical["paid-ads"]).toBe("ppc-management");
    expect(pricingSlugCanonical.cro).toBe("funnels");
  });
});

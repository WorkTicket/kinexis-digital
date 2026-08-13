import { describe, it, expect } from "vitest";
import {
  serviceSlugCanonical,
  sitemapExcludedServiceSlugs,
  sitemapServiceSlugs,
} from "@/content/registry/site-routes";

describe("sitemap exclusions for legacy redirects", () => {
  const legacySlugs = ["google-ads", "paid-ads"] as const;

  it("excludes legacy service slugs from the sitemap", () => {
    for (const slug of legacySlugs) {
      expect(sitemapExcludedServiceSlugs).toContain(slug);
      expect(sitemapServiceSlugs).not.toContain(slug);
    }
  });

  it("includes cro as an active service slug", () => {
    expect(sitemapServiceSlugs).toContain("cro");
    expect(serviceSlugCanonical.cro).toBeUndefined();
  });

  it("maps legacy slugs to canonical targets", () => {
    expect(serviceSlugCanonical["google-ads"]).toBe("ppc-management");
    expect(serviceSlugCanonical["paid-ads"]).toBe("ppc-management");
  });
});

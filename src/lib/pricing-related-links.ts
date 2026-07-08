import { activePricingSlugs, pricingRoutes, serviceLabels, type PricingSlug } from "@/content/registry/site-routes";

export const pricingHubGroups = [
  { key: "searchAndOrganic", slugs: ["seo", "local-seo", "content-marketing"] as const satisfies readonly PricingSlug[] },
  { key: "paidMedia", slugs: ["ppc-management", "meta-ads"] as const satisfies readonly PricingSlug[] },
  { key: "webAndConversion", slugs: ["web-design", "funnels", "branding"] as const satisfies readonly PricingSlug[] },
  { key: "marketingChannels", slugs: ["email-marketing", "social-media", "video-marketing"] as const satisfies readonly PricingSlug[] },
  { key: "strategyAndAnalytics", slugs: ["analytics", "growth-consulting"] as const satisfies readonly PricingSlug[] },
] as const;

export type PricingHubGroupKey = (typeof pricingHubGroups)[number]["key"];

const pricingGroups: PricingSlug[][] = pricingHubGroups.map((group) => [...group.slugs]);

export function getPricingRelatedLinks(
  slug: PricingSlug,
  limit = 3,
): { href: string; label: string }[] {
  const group = pricingGroups.find((g) => g.includes(slug)) ?? [];
  return group
    .filter((s) => s !== slug && s in pricingRoutes)
    .slice(0, limit)
    .map((s) => ({
      href: pricingRoutes[s],
      label: `${serviceLabels[s].replace(/ Services$/, "").replace(/ Management$/, "")} Pricing`,
    }));
}

export function getAllPricingLinks(): { href: string; label: string }[] {
  return activePricingSlugs.map((slug) => ({
    href: pricingRoutes[slug],
    label: `${serviceLabels[slug].replace(/ Services$/, "").replace(/ Management$/, "")} Pricing`,
  }));
}

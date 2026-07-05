import { pricingRoutes, serviceLabels, type PricingSlug } from "@/content/registry/site-routes";

const pricingGroups: PricingSlug[][] = [
  ["seo", "local-seo", "content-marketing"],
  ["ppc-management", "meta-ads"],
  ["web-design", "funnels", "branding"],
  ["email-marketing", "social-media", "video-marketing"],
  ["analytics", "growth-consulting"],
];

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
  return (Object.keys(pricingRoutes) as PricingSlug[])
    .filter((slug) => slug !== "cro")
    .map((slug) => ({
      href: pricingRoutes[slug],
      label: `${serviceLabels[slug].replace(/ Services$/, "").replace(/ Management$/, "")} Pricing`,
    }));
}

import {
  locations,
  getLocationServiceLabel,
  locationServiceSlugs,
  type LocationServiceSlug,
} from "@/content/registry/locations";
import { pricingRoutes, type ServiceSlug } from "@/content/registry/site-routes";

const SERVICE_TO_LOCATION: Partial<Record<ServiceSlug, LocationServiceSlug>> = {
  seo: "seo",
  "local-seo": "seo",
  "google-ads": "google-ads",
  "ppc-management": "ppc-management",
  "web-design": "web-design",
};

export function getLocationCrossLinks(
  citySlug: string,
  serviceSlug: LocationServiceSlug,
  limit = 6,
): { href: string; label: string }[] {
  if (serviceSlug === "digital-marketing-agency") return [];

  return locations
    .filter((loc) => loc.slug !== citySlug)
    .slice(0, limit)
    .map((loc) => ({
      href: `/locations/${loc.slug}/${serviceSlug}`,
      label: getLocationServiceLabel(serviceSlug, loc.city),
    }));
}

export function getServiceLocationLinks(
  serviceSlug: ServiceSlug,
  limit = 8,
): { href: string; label: string }[] {
  const locationService = SERVICE_TO_LOCATION[serviceSlug];
  if (!locationService) return [];

  return locations.slice(0, limit).map((loc) => ({
    href: `/locations/${loc.slug}/${locationService}`,
    label: getLocationServiceLabel(locationService, loc.city),
  }));
}

export function getLocationHubLinks(
  citySlug: string,
  city: string,
): { href: string; label: string }[] {
  return [
    { href: `/locations/${citySlug}`, label: `${city} Marketing Hub` },
    { href: "/locations", label: "All Locations" },
  ];
}

const locationPricingLabels: Partial<Record<LocationServiceSlug, string>> = {
  seo: "SEO Pricing",
  "web-design": "Web Design Pricing",
  "google-ads": "Google Ads Pricing",
  "ppc-management": "PPC Management Pricing",
};

export function getLocationPricingLink(
  serviceSlug: LocationServiceSlug,
): { href: string; label: string } | null {
  if (serviceSlug === "digital-marketing-agency") return null;
  const pricingSlug = serviceSlug as ServiceSlug;
  const label = locationPricingLabels[serviceSlug];
  if (!label || !(pricingSlug in pricingRoutes)) return null;
  return { href: pricingRoutes[pricingSlug], label };
}

export const browseableLocationServices = locationServiceSlugs.filter(
  (s) => s !== "digital-marketing-agency",
);

const locationServiceTitles: Record<Exclude<LocationServiceSlug, "digital-marketing-agency">, string> = {
  seo: "SEO",
  "web-design": "Web Design",
  "google-ads": "Google Ads",
  "ppc-management": "PPC Management",
};

export function getLocationServiceTitle(slug: Exclude<LocationServiceSlug, "digital-marketing-agency">): string {
  return locationServiceTitles[slug];
}

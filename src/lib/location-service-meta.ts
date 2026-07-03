import type { LocationEntry, LocationServiceSlug } from "@/content/registry/locations";
import { getLocationDetail } from "@/content/locations/location-details";
import type { Locale } from "@/i18n/routing";

const SERVICE_META_EN: Record<Exclude<LocationServiceSlug, "digital-marketing-agency">, string> = {
  seo: "SEO",
  "web-design": "Web design",
  "google-ads": "Google Ads",
  "ppc-management": "PPC management",
};

const SERVICE_META_ES: Record<Exclude<LocationServiceSlug, "digital-marketing-agency">, string> = {
  seo: "SEO",
  "web-design": "Diseño web",
  "google-ads": "Google Ads",
  "ppc-management": "Gestión de PPC",
};

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/);
  if (match) return match[0].trim();
  return text.split(".").slice(0, 1).join(".").trim();
}

export function getLocationServiceMetaDescription(
  locale: Locale,
  location: LocationEntry,
  service: Exclude<LocationServiceSlug, "digital-marketing-agency">,
): string {
  const detail = getLocationDetail(location.slug);
  const hook = firstSentence(detail?.answerBlock ?? location.description);

  if (locale === "es") {
    const label = SERVICE_META_ES[service];
    return `${label} para empresas en ${location.city}, ${location.state}. ${hook} Estrategia local con resultados medibles de KINEXIS Digital.`;
  }

  const label = SERVICE_META_EN[service];
  return `${label} for ${location.city}, ${location.state} businesses in the ${location.region}. ${hook} Local strategy with measurable results from KINEXIS.`;
}

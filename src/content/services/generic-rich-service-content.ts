import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";
import { microsoftAdsContent } from "@/content/services/microsoft-ads";
import { websiteMaintenanceContent } from "@/content/services/website-maintenance";
import { websiteSpeedContent } from "@/content/services/website-speed";
import { marketingAuditsContent } from "@/content/services/marketing-audits";
import { marketingAutomationCrmContent } from "@/content/services/marketing-automation-crm";
import { fractionalCmoContent } from "@/content/services/fractional-cmo";
import { trainingWorkshopsContent } from "@/content/services/training-workshops";
import type { GenericRichServiceContent } from "@/content/services/generic-rich-service-types";

/** Generic Phase 3 slugs using shared rich content shape (excludes landing-pages, copywriting, youtube-ads). */
export const GENERIC_RICH_CONTENT_SLUGS = [
  "microsoft-ads",
  "website-maintenance",
  "website-speed",
  "marketing-audits",
  "marketing-automation-crm",
  "fractional-cmo",
  "training-workshops",
] as const satisfies readonly ServiceSeoSlug[];

export type GenericRichContentSlug = (typeof GENERIC_RICH_CONTENT_SLUGS)[number];

export const genericRichServiceContent: Record<
  GenericRichContentSlug,
  Record<Locale, GenericRichServiceContent>
> = {
  "microsoft-ads": microsoftAdsContent,
  "website-maintenance": websiteMaintenanceContent,
  "website-speed": websiteSpeedContent,
  "marketing-audits": marketingAuditsContent,
  "marketing-automation-crm": marketingAutomationCrmContent,
  "fractional-cmo": fractionalCmoContent,
  "training-workshops": trainingWorkshopsContent,
};

export function getGenericRichServiceContent(
  slug: ServiceSeoSlug,
  locale: Locale,
): GenericRichServiceContent | undefined {
  if (!(GENERIC_RICH_CONTENT_SLUGS as readonly ServiceSeoSlug[]).includes(slug)) return undefined;
  return genericRichServiceContent[slug as GenericRichContentSlug][locale];
}

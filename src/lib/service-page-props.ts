import type { ServiceSeoSlug } from "@/content/service-seo/types";
import { buildServicePageData } from "@/content/services/architecture/build-service-page-data";
import type { ServicePageData } from "@/content/services/architecture/build-service-page-data";
import { serviceLabels } from "@/content/registry/site-routes";
import type { Locale } from "@/i18n/routing";
import { getServiceRelatedLinks } from "@/lib/service-related-links";
import type { ServiceRelatedLinks } from "@/lib/service-related-links";
import type { BreadcrumbItem } from "@/lib/schema";

export type ServicePageServerProps = {
  slug: ServiceSeoSlug;
  locale: Locale;
  data: ServicePageData;
  breadcrumbs: BreadcrumbItem[];
  relatedLinks: ServiceRelatedLinks;
};

export function buildServicePageServerProps(
  slug: ServiceSeoSlug,
  locale: Locale
): ServicePageServerProps {
  return {
    slug,
    locale,
    data: buildServicePageData(slug, locale),
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: serviceLabels[slug] },
    ],
    relatedLinks: getServiceRelatedLinks(slug),
  };
}

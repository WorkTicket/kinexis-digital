"use client";

import { useLocale } from "next-intl";
import { getServiceSeoContent } from "@/content/service-seo";
import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";
import { serviceLabels, type ServiceSlug } from "@/content/registry/site-routes";
import type { BreadcrumbItem } from "@/lib/schema";

export function useServicePageSeo(slug: ServiceSeoSlug): {
  locale: Locale;
  seo: ReturnType<typeof getServiceSeoContent>;
  breadcrumbs: BreadcrumbItem[];
} {
  const locale = useLocale() as Locale;
  const seo = getServiceSeoContent(slug, locale);
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: serviceLabels[slug as ServiceSlug] ?? seo.hero.label },
  ];
  return { locale, seo, breadcrumbs };
}

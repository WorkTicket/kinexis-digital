import type { FAQItem } from "@/components/sections/FAQSection";
import type { Locale } from "@/i18n/routing";
import { serviceSeoEn } from "@/content/service-seo/en";
import { serviceSeoEs } from "@/content/service-seo/es";
import type { ServiceSeoContent, ServiceSeoSlug } from "@/content/service-seo/types";

const byLocale: Record<Locale, Record<ServiceSeoSlug, ServiceSeoContent>> = {
  en: serviceSeoEn,
  es: serviceSeoEs,
};

export function getServiceSeoContent(slug: ServiceSeoSlug, locale: Locale): ServiceSeoContent {
  return byLocale[locale][slug] ?? byLocale.en[slug];
}

export function mergeServiceFaqs(
  slug: ServiceSeoSlug,
  locale: Locale,
  existing: FAQItem[] = [],
): FAQItem[] {
  const extra = getServiceSeoContent(slug, locale).extraFaqs;
  const seen = new Set<string>();
  const merged: FAQItem[] = [];

  for (const item of [...existing, ...extra]) {
    const key = item.question.toLowerCase().trim();
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(item);
  }

  return merged;
}

export function getServiceSeoMetadata(slug: ServiceSeoSlug, locale: Locale) {
  const seo = getServiceSeoContent(slug, locale);
  return { title: seo.metaTitle, description: seo.metaDescription };
}

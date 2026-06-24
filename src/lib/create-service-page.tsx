import type { ComponentType } from "react";
import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import type { ServiceSlug } from "@/content/registry/site-routes";
import { serviceLabels, serviceRoutes } from "@/content/registry/site-routes";
import type { Locale } from "@/i18n/routing";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { buildAbsoluteUrl } from "@/lib/metadata";
import { getServicePageMetadata } from "@/lib/service-metadata";
import { mergeServiceFaqs } from "@/content/service-seo";
import type { FAQItem } from "@/components/sections/FAQSection";
import { breadcrumbSchema, faqSchema, organizationSchema, serviceSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: Locale }> };

type ServicePageClientProps<T> = { content: T };

type ContentWithFaqs = { faqs?: FAQItem[] };

export function createServicePage<T>(
  slug: ServiceSlug,
  content: Record<Locale, T>,
  importClient: () => Promise<{ default: ComponentType<ServicePageClientProps<T>> }>,
) {
  const Client = dynamic(importClient);

  return async function ServicePage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const localized = getLocalizedContent(content, locale);
    const path = serviceRoutes[slug];
    const name = serviceLabels[slug];
    const meta = getServicePageMetadata(slug, locale);
    const description =
      typeof meta.description === "string"
        ? meta.description
        : `Professional ${name.toLowerCase()} from KINEXIS Digital.`;
    const faqs = mergeServiceFaqs(slug, locale, (localized as ContentWithFaqs).faqs ?? []);

    return (
      <>
        <JsonLd
          data={[
            organizationSchema(),
            serviceSchema(name, description, buildAbsoluteUrl(locale, path)),
            faqSchema(faqs),
            breadcrumbSchema([
              { name: "Home", url: buildAbsoluteUrl(locale, "/") },
              { name: "Services", url: buildAbsoluteUrl(locale, "/services") },
              { name },
            ]),
          ]}
        />
        <Client content={localized} />
      </>
    );
  };
}

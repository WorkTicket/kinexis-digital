import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { paidAdsContent } from "@/content/services/paid-ads";
import { getPaidServiceFaqs } from "@/content/services/paid-service-pillar";
import { getServiceSeoMetadata, mergeServiceFaqs } from "@/content/service-seo";
import type { Locale } from "@/i18n/routing";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { buildPageMetadata, buildAbsoluteUrl } from "@/lib/metadata";
import { serviceLabels } from "@/content/registry/site-routes";
import { serviceSchema, faqSchema, breadcrumbSchema, organizationSchema } from "@/lib/schema";

const PaidServicePage = dynamic(() => import("@/components/services/PaidServicePage"));

type PaidSlug = "ppc-management" | "google-ads" | "meta-ads";

type Props = { params: Promise<{ locale: Locale }> };

export function createPaidServicePage(slug: PaidSlug) {
  return async function Page({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const path = `/services/${slug}`;
    const name = serviceLabels[slug];
    const variant = slug === "ppc-management" ? "ppc" : slug;
    const baseFaqs = getPaidServiceFaqs(variant, locale);
    const faqs = mergeServiceFaqs(slug, locale, baseFaqs);
    const { description } = getServiceSeoMetadata(slug, locale);
    const content = getLocalizedContent(paidAdsContent, locale);

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
              { name: name },
            ]),
          ]}
        />
        <PaidServicePage variant={variant} locale={locale} content={content} slug={slug} />
      </>
    );
  };
}

export function createPaidServiceMetadata(slug: PaidSlug) {
  return async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const seo = getServiceSeoMetadata(slug, locale);
    return buildPageMetadata({
      locale,
      path: `/services/${slug}`,
      title: seo.title,
      description: seo.description,
    });
  };
}

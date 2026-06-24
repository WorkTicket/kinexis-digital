import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import ComparisonPageClient from "@/components/pages/ComparisonPageClient";
import { comparisonContent } from "@/content/comparisons/comparison-pages";
import { comparisonRoutes, type ComparisonSlug } from "@/content/registry/site-routes";
import type { Locale } from "@/i18n/routing";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema, faqSchema, organizationSchema } from "@/lib/schema";

export function createComparisonPage(slug: ComparisonSlug) {
  return async function ComparisonPage({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const content = getLocalizedContent(comparisonContent[slug], locale);
    const path = comparisonRoutes[slug];

    return (
      <>
        <JsonLd
          data={[
            organizationSchema(),
            articleSchema({
              title: content.metaTitle,
              description: content.metaDescription,
              url: buildAbsoluteUrl(locale, path),
              datePublished: "2026-01-15",
              dateModified: "2026-06-01",
            }),
            faqSchema(content.faqs),
            breadcrumbSchema([
              { name: "Home", url: buildAbsoluteUrl(locale, "/") },
              { name: content.hero.label },
            ]),
          ]}
        />
        <ComparisonPageClient content={content} />
      </>
    );
  };
}

export function createComparisonMetadata(slug: ComparisonSlug) {
  return async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const content = getLocalizedContent(comparisonContent[slug], locale as Locale);
    return buildPageMetadata({
      locale: locale as Locale,
      path: comparisonRoutes[slug],
      title: content.metaTitle,
      description: content.metaDescription,
    });
  };
}

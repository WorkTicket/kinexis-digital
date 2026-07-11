import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import PricingPageClient from "@/components/pages/PricingPageClient";
import StaticHeroShell from "@/components/ui/StaticHeroShell";
import { getPricingPageContent } from "@/content/pricing/get-pricing-page-content";
import { pricingRoutes, serviceLabels, serviceRoutes, type PricingSlug } from "@/content/registry/site-routes";
import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, organizationSchema, serviceSchema } from "@/lib/schema";
import { getServiceHeroTheme } from "@/lib/service-hero";

export function createPricingPage(slug: PricingSlug) {
  return async function PricingPage({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const content = getPricingPageContent(slug, locale);
    const path = pricingRoutes[slug];
    const breadcrumbs = [
      { name: "Home", url: "/" },
      { name: "Pricing", url: "/pricing" },
      { name: content.hero.label },
    ];

    return (
      <>
        <JsonLd
          data={[
            organizationSchema(),
            serviceSchema(`${serviceLabels[slug]} Pricing`, content.metaDescription, buildAbsoluteUrl(locale, path)),
            faqSchema(content.faqs),
            breadcrumbSchema(
              breadcrumbs.map((crumb) => ({
                name: crumb.name,
                url: crumb.url ? buildAbsoluteUrl(locale, crumb.url) : undefined,
              })),
            ),
          ]}
        />
        <StaticHeroShell
          variant="showcase"
          theme={getServiceHeroTheme(slug as ServiceSeoSlug)}
          label={content.hero.label}
          line1={content.hero.line1}
          line2={content.hero.line2}
          subtitle={content.hero.subtitle}
          breadcrumbs={breadcrumbs}
          ctaLabel={content.ctaLabel}
          ctaHref="/contact"
          secondaryCtaLabel={serviceLabels[slug]}
          secondaryCtaHref={serviceRoutes[slug]}
        />
        <PricingPageClient
          slug={slug}
          locale={locale}
          content={content}
          serviceHref={serviceRoutes[slug]}
          serviceLabel={serviceLabels[slug]}
        />
      </>
    );
  };
}

export function createPricingMetadata(slug: PricingSlug) {
  return async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const content = getPricingPageContent(slug, locale as Locale);
    return buildPageMetadata({
      locale: locale as Locale,
      path: pricingRoutes[slug],
      title: content.metaTitle,
      description: content.metaDescription,
    });
  };
}

export { activePricingSlugs as pricingSlugs } from "@/content/registry/site-routes";

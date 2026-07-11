import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { pricingHubPageContent } from "@/content/pricing/pricing-hub-page";
import type { Locale } from "@/i18n/routing";
import { buildPricingHubSections } from "@/lib/pricing-hub-data";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

const PricingHubPageClient = dynamic(() => import("@/components/pages/PricingHubPageClient"));

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = getLocalizedContent(pricingHubPageContent, locale);
  return buildPageMetadata({
    locale,
    path: "/pricing",
    title: content.meta.title,
    description: content.meta.description,
  });
}

export default async function PricingHubPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = getLocalizedContent(pricingHubPageContent, locale);
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tServices = await getTranslations({ locale, namespace: "services" });
  const serviceLabels = Object.fromEntries(
    (
      [
        "seo",
        "localSeo",
        "ppcManagementPricing",
        "googleAds",
        "metaAdsPricing",
        "webDesignPricing",
        "cro",
        "emailMarketing",
        "contentMarketing",
        "socialMedia",
        "videoMarketing",
        "branding",
        "analytics",
        "growthConsulting",
        "funnels",
        "paidAds",
        "youtubeAds",
        "landingPages",
        "websiteMaintenance",
        "websiteSpeed",
      ] as const
    ).map((key) => [key, tServices(key)]),
  );
  const sections = buildPricingHubSections(locale, serviceLabels);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: tNav("home"), url: buildAbsoluteUrl(locale, "/") },
            { name: tNav("pricing"), url: buildAbsoluteUrl(locale, "/pricing") },
          ]),
        ]}
      />
      <PricingHubPageClient content={content} sections={sections} />
    </>
  );
}

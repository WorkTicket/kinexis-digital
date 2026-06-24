import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { agencyHubContent } from "@/content/agency-hub";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { organizationSchema, faqSchema, breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";

const AgencyHubPageClient = dynamic(() => import("@/components/pages/AgencyHubPageClient"));

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = agencyHubContent[locale];
  return buildPageMetadata({
    locale,
    path: "/digital-marketing-agency",
    title: c.meta.title,
    description: c.meta.description,
  });
}

export default async function DigitalMarketingAgencyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getLocalizedContent(agencyHubContent, locale);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          localBusinessSchema(),
          faqSchema(c.faqs),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "Digital Marketing Agency" },
          ]),
        ]}
      />
      <AgencyHubPageClient content={c} />
    </>
  );
}

import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import JsonLd from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/routing";
import { servicesPageContent } from "@/content/services-page";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { buildAbsoluteUrl } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

const ServicesHubClient = dynamic(() => import("@/components/services/clients/ServicesHubClient"));

type Props = { params: Promise<{ locale: Locale }> };

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = getLocalizedContent(servicesPageContent, locale);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "Services", url: buildAbsoluteUrl(locale, "/services") },
          ]),
        ]}
      />
      <ServicesHubClient content={content} />
    </>
  );
}

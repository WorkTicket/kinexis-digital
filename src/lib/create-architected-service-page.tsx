import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import ServicePage from "@/components/services/ServicePage";
import type { ServiceSeoSlug } from "@/content/service-seo/types";
import { serviceLabels, serviceRoutes } from "@/content/registry/site-routes";
import type { Locale } from "@/i18n/routing";
import { getServicePageMetadata } from "@/lib/service-metadata";
import { buildServicePageData } from "@/content/services/architecture/build-service-page-data";
import { breadcrumbSchema, faqSchema, organizationSchema, serviceSchema } from "@/lib/schema";
import { buildAbsoluteUrl } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export function createArchitectedServicePage(slug: ServiceSeoSlug) {
  return async function ArchitectedServicePage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const path = serviceRoutes[slug];
    const name = serviceLabels[slug];
    const meta = getServicePageMetadata(slug, locale);
    const description =
      typeof meta.description === "string"
        ? meta.description
        : `Professional ${name.toLowerCase()} from KINEXIS Digital.`;
    const data = buildServicePageData(slug, locale);

    return (
      <>
        <JsonLd
          data={[
            organizationSchema(),
            serviceSchema(name, description, buildAbsoluteUrl(locale, path)),
            faqSchema(data.faq),
            breadcrumbSchema([
              { name: "Home", url: buildAbsoluteUrl(locale, "/") },
              { name: "Services", url: buildAbsoluteUrl(locale, "/services") },
              { name },
            ]),
          ]}
        />
        <ServicePage slug={slug} />
      </>
    );
  };
}

export function createArchitectedServiceMetadata(slug: ServiceSeoSlug) {
  return async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    return getServicePageMetadata(slug, locale);
  };
}

export const createFlagshipServicePage = createArchitectedServicePage;
export const createFlagshipServiceMetadata = createArchitectedServiceMetadata;

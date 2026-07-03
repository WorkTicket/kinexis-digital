import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import LocationPageClient from "@/components/pages/LocationPageClient";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import {
  locations,
  getLocationBySlug,
  getLocationServiceLabel,
} from "@/content/registry/locations";
import { getLocationDetail } from "@/content/locations/location-details";
import { routing, type Locale } from "@/i18n/routing";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { getLocationCityFaqs } from "@/lib/location-faqs";
import { breadcrumbSchema, faqSchema, organizationSchema, serviceSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: Locale; city: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    locations.map((location) => ({ locale, city: location.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, city } = await params;
  const location = getLocationBySlug(city);
  if (!location) return {};
  const cityLabel = getLocationServiceLabel("digital-marketing-agency", location.city);
  const metaTitle = locale === "es"
    ? `Agencia de Marketing Digital en ${location.city} | KINEXIS`
    : `${cityLabel} | KINEXIS`;
  const metaDescription = locale === "es"
    ? `Agencia de marketing digital en ${location.city}, ${location.state}. SEO, Google Ads y diseño web para empresas que buscan resultados medibles.`
    : location.description;
  return buildPageMetadata({
    locale,
    path: `/locations/${city}`,
    title: metaTitle,
    description: metaDescription,
  });
}

export default async function LocationCityPage({ params }: Props) {
  const { locale, city } = await params;
  setRequestLocale(locale);

  const location = getLocationBySlug(city);
  if (!location) notFound();

  const pageTitle = getLocationServiceLabel("digital-marketing-agency", location.city);
  const detail = getLocationDetail(city);
  const pagePath = `/locations/${city}`;
  const pageUrl = buildAbsoluteUrl(locale, pagePath);
  const localFaqs = getLocationCityFaqs(location, detail);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          serviceSchema(pageTitle, location.description, pageUrl, {
            city: location.city,
            region: location.state,
          }),
          faqSchema(localFaqs),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "Locations", url: buildAbsoluteUrl(locale, "/locations") },
            { name: location.city },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Locations", url: "/locations" }, { name: location.city }]} />
      <LocationPageClient
        location={location}
        pageTitle={pageTitle}
        pageDescription={location.description}
        detail={detail}
        localFaqs={localFaqs}
      />
    </>
  );
}

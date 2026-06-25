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
  locationServiceSlugs,
  type LocationServiceSlug,
} from "@/content/registry/locations";
import { routing, type Locale } from "@/i18n/routing";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, localBusinessSchema, organizationSchema, serviceSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: Locale; city: string; service: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    locations.flatMap((location) =>
      locationServiceSlugs
        .filter((s) => s !== "digital-marketing-agency")
        .map((service) => ({ locale, city: location.slug, service }))
    )
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, city, service } = await params;
  const location = getLocationBySlug(city);
  if (!location || !locationServiceSlugs.includes(service as LocationServiceSlug)) return {};
  const title = getLocationServiceLabel(service as LocationServiceSlug, location.city);
  const description = `KINEXIS provides ${service.replace(/-/g, " ")} for ${location.city}, ${location.state}. Local strategy and measurable results.`;
  return buildPageMetadata({ locale, path: `/locations/${city}/${service}`, title: `${title} | KINEXIS`, description });
}

export default async function LocationServicePage({ params }: Props) {
  const { locale, city, service } = await params;
  setRequestLocale(locale);

  const location = getLocationBySlug(city);
  if (!location || !locationServiceSlugs.includes(service as LocationServiceSlug) || service === "digital-marketing-agency") {
    notFound();
  }

  const pageTitle = getLocationServiceLabel(service as LocationServiceSlug, location.city);
  const pageDescription = `KINEXIS provides ${service.replace(/-/g, " ")} for ${location.city}, ${location.state} businesses. Local campaigns built for the ${location.region}, not generic national playbooks.`;
  const path = `/locations/${city}/${service}`;

  const localFaqs = [
    { question: `Do you offer ${service.replace(/-/g, " ")} in ${location.city}?`, answer: `Yes. We build ${service.replace(/-/g, " ")} campaigns specifically for the ${location.region} market.` },
    { question: "How is local content different?", answer: "We include local market context, competition analysis, and geo-specific strategy. We never use duplicate templates." },
  ];

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          localBusinessSchema(location.city, location.state),
          serviceSchema(pageTitle, pageDescription, buildAbsoluteUrl(locale, path)),
          faqSchema(localFaqs),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "Locations", url: buildAbsoluteUrl(locale, "/locations") },
            { name: location.city, url: buildAbsoluteUrl(locale, `/locations/${city}`) },
            { name: pageTitle },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Locations", url: "/locations" },
          { name: location.city, url: `/locations/${city}` },
          { name: pageTitle },
        ]}
      />
      <LocationPageClient location={location} serviceSlug={service} pageTitle={pageTitle} pageDescription={pageDescription} />
    </>
  );
}

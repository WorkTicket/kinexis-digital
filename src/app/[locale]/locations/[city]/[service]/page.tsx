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
import { getLocationServiceMetaDescription } from "@/lib/location-service-meta";
import { getLocationServiceFaqs } from "@/lib/location-faqs";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, organizationSchema, serviceSchema } from "@/lib/schema";

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
  const label = getLocationServiceLabel(service as LocationServiceSlug, location.city);
  const serviceSlug = service as Exclude<LocationServiceSlug, "digital-marketing-agency">;
  const metaDescription = getLocationServiceMetaDescription(locale, location, serviceSlug);
  if (locale === "es") {
    const esLabels: Record<string, string> = { seo: "SEO", "web-design": "Diseño Web", "google-ads": "Google Ads", "ppc-management": "Gestión de PPC" };
    const esLabel = `${esLabels[service] || service.replace(/-/g, " ")} en ${location.city}`;
    return buildPageMetadata({ locale, path: `/locations/${city}/${service}`, title: `${esLabel} | KINEXIS`, description: metaDescription });
  }
  return buildPageMetadata({ locale, path: `/locations/${city}/${service}`, title: `${label} | KINEXIS`, description: metaDescription });
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
  const pageUrl = buildAbsoluteUrl(locale, path);
  const localFaqs = getLocationServiceFaqs(location, service);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          serviceSchema(pageTitle, pageDescription, pageUrl, {
            city: location.city,
            region: location.state,
          }),
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
      <LocationPageClient
        location={location}
        serviceSlug={service}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        localFaqs={localFaqs}
      />
    </>
  );
}

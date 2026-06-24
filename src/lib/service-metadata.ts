import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import { serviceRoutes, type ServiceSlug } from "@/content/registry/site-routes";
import { getServiceSeoMetadata } from "@/content/service-seo";

export function getServicePageMetadata(slug: ServiceSlug, locale: Locale): Metadata {
  const seo = getServiceSeoMetadata(slug, locale);
  return buildPageMetadata({
    locale,
    path: serviceRoutes[slug],
    title: seo.title,
    description: seo.description,
  });
}

export function createServiceLayoutMetadata(slug: ServiceSlug) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    return getServicePageMetadata(slug, locale as Locale);
  };
}

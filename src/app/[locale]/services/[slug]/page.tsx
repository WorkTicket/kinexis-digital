import type { Metadata } from "next";
import { redirect } from "@/i18n/navigation";
import { resolveLocale } from "@/i18n/locale";
import { serviceHubPath } from "@/lib/legacy-redirects.mjs";
import { buildPageMetadata } from "@/lib/metadata";
import { serviceSlugs } from "@/content/registry/site-routes";
import { getAllServiceSlugs, getServiceBySlug } from "@/content/services";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const slugs = new Set<string>([...serviceSlugs, ...getAllServiceSlugs()]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const redesigned = getServiceBySlug(slug);
  return buildPageMetadata({
    locale,
    path: "/services",
    title: redesigned?.metaTitle ?? "SEO, Ads, and Web Design Services",
    description:
      redesigned?.metaDescription ??
      "Web design, SEO, branding, paid ads, and content as one demand program. Built for home services and ecommerce brands that need booked work and orders.",
    noIndex: true,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  redirect({ href: serviceHubPath(slug), locale });
}

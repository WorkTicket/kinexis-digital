import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import {
  getLandingPage,
  landingPageSlugs,
} from "@/content/registry/landing-pages";
import LandingPageClient from "@/components/landing/LandingPageClient";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export function generateStaticParams() {
  return landingPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getLandingPage(slug);
  if (!page) {
    return buildPageMetadata({
      locale,
      path: `/lp/${slug}`,
      title: "Landing page",
      description: "KINEXIS Digital paid campaign landing page.",
      noIndex: true,
    });
  }

  return buildPageMetadata({
    locale,
    path: `/lp/${page.slug}`,
    title: page.metaTitle,
    description: page.metaDescription,
    noIndex: true,
  });
}

export default async function LandingPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const page = getLandingPage(slug);
  if (!page) notFound();

  return <LandingPageClient page={page} />;
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import Hero from "@/components/sections/Hero";

const RevenueEngine = dynamic(() => import("@/components/sections/RevenueEngine"));
const ServicesEcosystem = dynamic(() => import("@/components/sections/ServicesEcosystem"));
const MidPageCTA = dynamic(() => import("@/components/sections/MidPageCTA"));
const FeaturedResults = dynamic(() => import("@/components/sections/FeaturedResults"));
const Philosophy = dynamic(() => import("@/components/sections/Philosophy"));
const CTASection = dynamic(() => import("@/components/sections/CTASection"));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/",
    title: t("title"),
    description: t("description"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <RevenueEngine />
      <ServicesEcosystem />
      <MidPageCTA />
      <FeaturedResults />
      <Philosophy />
      <CTASection />
    </>
  );
}

import { setRequestLocale, getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { Metadata } from "next";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import HeroShell from "@/components/sections/HeroShell";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

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
      <JsonLd
        data={[
          organizationSchema(),
          localBusinessSchema(buildAbsoluteUrl(locale as Locale, "/")),
          websiteSchema(),
        ]}
      />
      <HeroShell />
      <Suspense>
        <RevenueEngine />
      </Suspense>
      <Suspense>
        <ServicesEcosystem />
      </Suspense>
      <Suspense>
        <MidPageCTA />
      </Suspense>
      <Suspense>
        <FeaturedResults />
      </Suspense>
      <Suspense>
        <Philosophy />
      </Suspense>
      <Suspense>
        <CTASection />
      </Suspense>
    </>
  );
}

import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import HeroShell from "@/components/sections/HeroShell";
import HeroAssetPreloads from "@/components/sections/HeroAssetPreloads";
import HomeDeferredSections from "@/components/sections/HomeDeferredSections";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

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
      <HeroAssetPreloads />
      <JsonLd
        data={[
          organizationSchema(),
          localBusinessSchema(buildAbsoluteUrl(locale as Locale, "/")),
          websiteSchema(),
        ]}
      />
      <HeroShell />
      <HomeDeferredSections />
    </>
  );
}

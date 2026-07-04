import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import JsonLd from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/routing";
import { aboutContent } from "@/content/about";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { buildAbsoluteUrl } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema, localBusinessSchema } from "@/lib/schema";

const AboutPageClient = dynamic(() => import("@/components/pages/AboutPageClient"));

type Props = { params: Promise<{ locale: Locale }> };

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = getLocalizedContent(aboutContent, locale);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          localBusinessSchema(buildAbsoluteUrl(locale, "/about")),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "About", url: buildAbsoluteUrl(locale, "/about") },
          ]),
        ]}
      />
      <AboutPageClient content={content} locale={locale} />
    </>
  );
}

import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/routing";
import { termsContent } from "@/content/legal/terms";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

const LegalPageClient = dynamic(() => import("@/components/pages/LegalPageClient"));

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const termsMeta: Record<Locale, { title: string; description: string }> = {
    en: {
      title: "Terms of Service | KINEXIS",
      description: "Terms governing your use of the KINEXIS Digital website and marketing services.",
    },
    es: {
      title: "Términos de Servicio | KINEXIS",
      description: "Términos que rigen el uso del sitio web y los servicios de marketing de KINEXIS Digital.",
    },
  };
  const meta = termsMeta[locale];
  return buildPageMetadata({
    locale,
    path: "/terms",
    title: meta.title,
    description: meta.description,
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getLocalizedContent(termsContent, locale);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "Terms of Service" },
          ]),
        ]}
      />
      <LegalPageClient content={content} />
    </>
  );
}

import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/routing";
import { privacyContent } from "@/content/legal/privacy";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

const LegalPageClient = dynamic(() => import("@/components/pages/LegalPageClient"));

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const privacyMeta: Record<Locale, { title: string; description: string }> = {
    en: {
      title: "Privacy Policy | KINEXIS",
      description: "How KINEXIS Digital collects, uses, and protects your personal information on our website and services.",
    },
    es: {
      title: "Política de Privacidad | KINEXIS",
      description: "Cómo KINEXIS Digital recopila, usa y protege tu información personal en nuestro sitio web y servicios.",
    },
  };
  const meta = privacyMeta[locale];
  return buildPageMetadata({
    locale,
    path: "/privacy",
    title: meta.title,
    description: meta.description,
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getLocalizedContent(privacyContent, locale);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "Privacy Policy" },
          ]),
        ]}
      />
      <LegalPageClient content={content} />
    </>
  );
}

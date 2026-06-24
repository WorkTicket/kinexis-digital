import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import type { Locale } from "@/i18n/routing";
import { privacyContent } from "@/content/legal/privacy";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { buildPageMetadata } from "@/lib/metadata";

const LegalPageClient = dynamic(() => import("@/components/pages/LegalPageClient"));

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = privacyContent[locale];
  return buildPageMetadata({
    locale,
    path: "/privacy",
    title: `${c.title} | KINEXIS Digital`,
    description: c.intro.slice(0, 155),
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getLocalizedContent(privacyContent, locale);

  return <LegalPageClient content={content} />;
}

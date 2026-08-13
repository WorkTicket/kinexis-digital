import type { Metadata } from "next";
import { LegalPage } from "@/components/page/LegalPage";
import { getPrivacyContent } from "@/content/legal/privacy";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { buildPageMetadata } from "@/lib/metadata";

type Props = { params: LocaleParams };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildPageMetadata({
    locale,
    path: "/privacy",
    title: "Privacy Policy",
    description:
      "How KINEXIS Digital collects, uses, stores, and protects your personal information on our website, forms, and marketing services.",
  });
}

export default async function PrivacyPage({ params }: Props) {
  const locale = await resolveLocale(params);
  return <LegalPage content={getPrivacyContent(locale)} />;
}

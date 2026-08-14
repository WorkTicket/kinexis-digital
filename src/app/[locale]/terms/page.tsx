import type { Metadata } from "next";
import { LegalPage } from "@/components/page/LegalPage";
import { getTermsContent } from "@/content/legal/terms";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { buildPageMetadata } from "@/lib/metadata";

type Props = { params: LocaleParams };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildPageMetadata({
    locale,
    path: "/terms",
    title: "Terms of Service",
    description:
      "Terms governing your use of the KINEXIS Digital website, marketing services, and client engagements. Covers data, billing, and intellectual property.",
  });
}

export default async function TermsPage({ params }: Props) {
  const locale = await resolveLocale(params);
  return <LegalPage content={getTermsContent(locale)} />;
}

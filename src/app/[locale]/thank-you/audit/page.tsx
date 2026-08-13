import type { Metadata } from "next";
import { ThankYouView } from "@/components/thank-you/ThankYouView";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";

type Props = { params: LocaleParams };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "pages.thankYouAudit" });
  return buildPageMetadata({
    locale,
    path: "/thank-you/audit",
    title: t("eyebrow"),
    description: t("copy"),
    noIndex: true,
    noFollow: true,
  });
}

export default async function ThankYouAuditPage({ params }: Props) {
  await resolveLocale(params);
  return <ThankYouView namespace="pages.thankYouAudit" />;
}

import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import ThankYouClient from "@/components/pages/ThankYouClient";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: "/thank-you/audit",
    title: "Audit request received",
    description:
      "Your free growth audit request was received. We'll review your properties and send a severity-ranked findings brief.",
    noIndex: true,
  });
}

export default async function ThankYouAuditPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ThankYouClient
      variant="audit"
      title="Audit request received."
      subtitle="We'll review the scope you selected against live signals from your site or ad accounts, then send a short findings brief within 48 hours."
      nextStepsTitle="What happens next"
      nextSteps={[
        "We confirm access and the audit scope you requested (SEO, paid media, or conversion path).",
        "We pull evidence: crawl/index signals, ad account structure, or on-page conversion friction.",
        "You receive a severity-ranked findings brief: Critical / High / Medium, with what to fix first.",
      ]}
      secondaryCtaLabel="Explore the full Marketing Audit"
      secondaryCtaHref="/services/marketing-audits"
    />
  );
}

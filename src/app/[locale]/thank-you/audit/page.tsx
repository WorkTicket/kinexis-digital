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
      "Your free growth audit request was received. We'll dig in and follow up with findings.",
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
      subtitle="We're digging into your request. Expect a practical readout — what's working, what's leaking, and where to focus first."
      nextStepsTitle="What happens next"
      nextSteps={[
        "We confirm the scope of the audit you requested.",
        "We review the available signals (site, ads, search presence).",
        "You get clear findings and recommended next moves — no fluff.",
      ]}
      secondaryCtaLabel="See how we work"
      secondaryCtaHref="/about"
    />
  );
}

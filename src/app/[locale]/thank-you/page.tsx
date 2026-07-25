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
    path: "/thank-you",
    title: "Thank you — we'll be in touch",
    description:
      "Your message was received. A KINEXIS strategist will follow up shortly.",
    noIndex: true,
  });
}

export default async function ThankYouPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ThankYouClient
      variant="lead"
      title="You're in good hands."
      subtitle="We got your message. A strategist will review it and follow up within one business day."
      nextStepsTitle="What happens next"
      nextSteps={[
        "We review your goals and current setup.",
        "You'll hear from us with clear next steps — not a generic pitch deck.",
        "If we're a fit, we schedule a working session to map the plan.",
      ]}
      secondaryCtaLabel="Browse case studies"
      secondaryCtaHref="/case-studies"
    />
  );
}

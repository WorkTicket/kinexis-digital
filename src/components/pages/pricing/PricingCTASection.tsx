"use client";

import { useLocale } from "next-intl";
import TwoLineText from "@/components/ui/TwoLineText";
import SiteCTA from "@/components/ui/SiteCTA";
import { uiChrome } from "@/content/ui-chrome";
import type { Locale } from "@/i18n/routing";

type Props = {
  headline: string;
  subtitle: string;
  ctaLabel: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  contractNote?: string;
};

export default function PricingCTASection({
  headline,
  subtitle,
  ctaLabel,
  secondaryCtaLabel,
  secondaryCtaHref,
  contractNote,
}: Props) {
  const locale = useLocale() as Locale;
  const copy = uiChrome[locale];

  return (
    <SiteCTA
      id="pricing-cta"
      headingId="pricing-cta-heading"
      tone="cta"
      badge={copy.pricingCta.badge}
      title={headline}
      subtitle={<TwoLineText text={subtitle} variant="body" />}
      primaryLabel={ctaLabel}
      secondaryLabel={secondaryCtaLabel}
      secondaryHref={secondaryCtaHref}
      contractNote={contractNote}
    />
  );
}

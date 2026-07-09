"use client";

import TwoLineText from "@/components/ui/TwoLineText";
import SiteCTA from "@/components/ui/SiteCTA";

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
  contractNote = "No long-term contracts. Month to month.",
}: Props) {
  return (
    <SiteCTA
      id="pricing-cta"
      headingId="pricing-cta-heading"
      tone="cta"
      badge="Ready to scope your plan?"
      title={headline}
      subtitle={<TwoLineText text={subtitle} variant="body" />}
      primaryLabel={ctaLabel}
      secondaryLabel={secondaryCtaLabel}
      secondaryHref={secondaryCtaHref}
      contractNote={contractNote}
    />
  );
}

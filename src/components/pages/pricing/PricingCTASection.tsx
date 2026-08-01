"use client";

import { useLocale, useTranslations } from "next-intl";
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
  const tCommon = useTranslations("common");
  const copy = uiChrome[locale];

  return (
    <SiteCTA
      id="pricing-cta"
      headingId="pricing-cta-heading"
      tone="cta"
      showGlow={false}
      badge={copy.pricingCta.badge}
      title={headline}
      subtitle={<TwoLineText text={subtitle} variant="body" />}
      primaryLabel={ctaLabel}
      secondaryLabel={secondaryCtaLabel ?? tCommon("getFreeAudit")}
      secondaryHref={secondaryCtaHref ?? "/lead-magnet"}
      contractNote={contractNote}
    />
  );
}

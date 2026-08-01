"use client";

import { useTranslations } from "next-intl";
import TwoLineText from "@/components/ui/TwoLineText";
import SiteCTA from "@/components/ui/SiteCTA";
import type { ServiceCTAData } from "@/content/services/architecture/types";
import type { ServiceSeoSlug } from "@/content/service-seo/types";
import { pricingRoutes } from "@/content/registry/site-routes";

type Props = {
  cta?: ServiceCTAData;
  slug: ServiceSeoSlug;
};

function looksLikePricingCta(label: string): boolean {
  return /pricing|precios/i.test(label);
}

/** Service page bottom CTA — book/pricing primary, free audit secondary. */
export default function ServiceCTA({ cta, slug }: Props) {
  const t = useTranslations("cta");
  const tCommon = useTranslations("common");
  const headline = cta?.headline ?? `${t("title")} ${t("titleHighlight")}`;
  const subtitle = cta?.subtitle ?? t("subtitle");
  const primaryLabel = cta?.label ?? tCommon("bookStrategyCall");
  const primaryHref =
    cta?.primaryHref ??
    (looksLikePricingCta(primaryLabel) ? pricingRoutes[slug] : "/contact");

  return (
    <SiteCTA
      id="cta"
      headingId="cta-heading"
      tone="cta"
      showGlow={false}
      badge={t("label")}
      title={<TwoLineText text={headline} variant="section" />}
      subtitle={<TwoLineText text={subtitle} variant="body" />}
      primaryLabel={primaryLabel}
      primaryHref={primaryHref}
      secondaryLabel={tCommon("getFreeAudit")}
      secondaryHref="/lead-magnet"
    />
  );
}

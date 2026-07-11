"use client";

import { useTranslations } from "next-intl";
import TwoLineText from "@/components/ui/TwoLineText";
import SiteCTA from "@/components/ui/SiteCTA";
import type { ServiceCTAData } from "@/content/services/architecture/types";

type Props = {
  cta?: ServiceCTAData;
};

/** Service page bottom CTA — service-specific copy when provided, site default otherwise. */
export default function ServiceCTA({ cta }: Props) {
  const t = useTranslations("cta");
  const tCommon = useTranslations("common");
  const headline = cta?.headline ?? `${t("title")} ${t("titleHighlight")}`;
  const subtitle = cta?.subtitle ?? t("subtitle");
  const primaryLabel = cta?.label ?? tCommon("bookStrategyCall");

  return (
    <SiteCTA
      id="cta"
      headingId="cta-heading"
      tone="cta"
      badge={t("label")}
      title={<TwoLineText text={headline} variant="section" />}
      subtitle={<TwoLineText text={subtitle} variant="body" />}
      primaryLabel={primaryLabel}
    />
  );
}

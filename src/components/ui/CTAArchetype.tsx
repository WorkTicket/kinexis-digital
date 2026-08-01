"use client";

import { useTranslations } from "next-intl";
import TwoLineText from "@/components/ui/TwoLineText";
import SiteCTA, { type SiteCTATone, type SiteCTALayout } from "@/components/ui/SiteCTA";

type Archetype = "default" | "tool" | "story" | "bold" | "inline";

type Props = {
  archetype?: Archetype;
  headline: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref?: string;
  /** Pass `null` to hide the secondary CTA. Omit to use the homepage default (Get Free Audit). */
  secondaryCtaLabel?: string | null;
  secondaryCtaHref?: string;
  className?: string;
};

const archetypeConfig: Record<
  Archetype,
  { tone: SiteCTATone; layout: SiteCTALayout; showGlow: boolean; badgeFromCta?: boolean }
> = {
  default: { tone: "cta", layout: "centered", showGlow: false, badgeFromCta: true },
  tool: { tone: "cta", layout: "centered", showGlow: false, badgeFromCta: true },
  story: { tone: "cta", layout: "centered", showGlow: false, badgeFromCta: true },
  bold: { tone: "cta", layout: "centered", showGlow: false, badgeFromCta: true },
  inline: { tone: "cta", layout: "inline", showGlow: false },
};

/**
 * Marketing CTA wrapper aligned to the homepage SiteCTA contract:
 * tone="cta", no glow, dual CTAs, localized contract note.
 */
export default function CTAArchetype({
  archetype = "default",
  headline,
  subtitle,
  ctaLabel,
  ctaHref = "/contact",
  secondaryCtaLabel,
  secondaryCtaHref,
  className,
}: Props) {
  const t = useTranslations("cta");
  const tCommon = useTranslations("common");
  const config = archetypeConfig[archetype];

  const resolvedSecondaryLabel =
    secondaryCtaLabel === null ? undefined : (secondaryCtaLabel ?? tCommon("getFreeAudit"));
  const resolvedSecondaryHref =
    secondaryCtaLabel === null ? undefined : (secondaryCtaHref ?? "/lead-magnet");

  return (
    <SiteCTA
      tone={config.tone}
      layout={config.layout}
      className={className}
      showGlow={config.showGlow}
      badge={config.badgeFromCta ? t("label") : undefined}
      title={<TwoLineText text={headline} variant={archetype === "inline" ? "subheader" : "section"} />}
      subtitle={subtitle ? <TwoLineText text={subtitle} variant="body" /> : undefined}
      primaryLabel={ctaLabel}
      primaryHref={ctaHref}
      secondaryLabel={resolvedSecondaryLabel}
      secondaryHref={resolvedSecondaryHref}
    />
  );
}

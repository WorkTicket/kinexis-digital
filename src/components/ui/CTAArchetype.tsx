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
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  className?: string;
};

const archetypeConfig: Record<
  Archetype,
  { tone: SiteCTATone; layout: SiteCTALayout; showGlow: boolean; badgeFromCta?: boolean }
> = {
  default: { tone: "glow", layout: "centered", showGlow: true, badgeFromCta: true },
  tool: { tone: "glow", layout: "centered", showGlow: true },
  story: { tone: "story", layout: "centered", showGlow: true, badgeFromCta: true },
  bold: { tone: "glow", layout: "centered", showGlow: false },
  inline: { tone: "glow", layout: "inline", showGlow: false },
};

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
  const config = archetypeConfig[archetype];

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
      secondaryLabel={secondaryCtaLabel}
      secondaryHref={secondaryCtaHref}
      contractNote={null}
    />
  );
}

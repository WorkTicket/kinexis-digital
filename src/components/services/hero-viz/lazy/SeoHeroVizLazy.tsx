"use client";

import SeoHeroViz from "@/components/services/hero-viz/SeoHeroViz";
import { seoContent } from "@/content/services/seo";
import type { Locale } from "@/i18n/routing";

const localSeoDiagramLabels = {
  technical: "Local Citations",
  ux: "Google Business Profile",
  content: "Location Pages",
  links: "Reviews",
  rankings: "Map Pack",
  revenue: "Booked Calls",
};

type Props = {
  locale: Locale;
  variant: "seo" | "local-seo";
};

export default function SeoHeroVizLazy({ locale, variant }: Props) {
  if (variant === "local-seo") {
    return <SeoHeroViz labels={localSeoDiagramLabels} />;
  }
  const labels = Object.fromEntries(seoContent[locale].diagramNodes.map((n) => [n.id, n.label]));
  return <SeoHeroViz labels={labels} />;
}

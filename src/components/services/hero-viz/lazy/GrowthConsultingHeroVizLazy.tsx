"use client";

import GrowthConsultingHeroViz from "@/components/services/hero-viz/GrowthConsultingHeroViz";
import { growthConsultingContent } from "@/content/services/growth-consulting";
import type { Locale } from "@/i18n/routing";

type Props = { locale: Locale };

export default function GrowthConsultingHeroVizLazy({ locale }: Props) {
  return (
    <GrowthConsultingHeroViz quarters={growthConsultingContent[locale].roadmapSection.quarters} />
  );
}

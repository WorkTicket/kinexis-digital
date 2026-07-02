"use client";

import FunnelsHeroViz from "@/components/services/hero-viz/FunnelsHeroViz";
import { funnelsContent } from "@/content/services/funnels";
import type { Locale } from "@/i18n/routing";

type Props = { locale: Locale };

export default function FunnelsHeroVizLazy({ locale }: Props) {
  return <FunnelsHeroViz stages={funnelsContent[locale].flowStages} />;
}

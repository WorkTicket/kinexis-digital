"use client";

import CroHeroViz from "@/components/services/hero-viz/CroHeroViz";
import { croContent } from "@/content/services/cro";
import type { Locale } from "@/i18n/routing";

type Props = { locale: Locale };

export default function CroHeroVizLazy({ locale }: Props) {
  return <CroHeroViz variantLabel={croContent[locale].hero.variantLabel} />;
}

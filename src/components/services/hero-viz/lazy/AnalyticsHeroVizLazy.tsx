"use client";

import AnalyticsHeroViz from "@/components/services/hero-viz/AnalyticsHeroViz";
import { analyticsContent } from "@/content/services/analytics";
import type { Locale } from "@/i18n/routing";

type Props = { locale: Locale };

export default function AnalyticsHeroVizLazy({ locale }: Props) {
  return <AnalyticsHeroViz metrics={analyticsContent[locale].metricsSection.metrics} />;
}

"use client";

import ContentMarketingHeroViz from "@/components/services/hero-viz/ContentMarketingHeroViz";
import { contentMarketingContent } from "@/content/services/content-marketing";
import type { Locale } from "@/i18n/routing";

type Props = { locale: Locale };

export default function ContentMarketingHeroVizLazy({ locale }: Props) {
  return (
    <ContentMarketingHeroViz
      labels={contentMarketingContent[locale].production.contentTypes.map((ct) => ({
        id: ct.id,
        vizLabel: ct.vizLabel,
      }))}
    />
  );
}

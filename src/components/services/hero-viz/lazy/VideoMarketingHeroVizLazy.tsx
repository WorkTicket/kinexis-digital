"use client";

import VideoMarketingHeroViz from "@/components/services/hero-viz/VideoMarketingHeroViz";
import { videoMarketingContent } from "@/content/services/video-marketing";
import type { Locale } from "@/i18n/routing";

type Props = { locale: Locale };

export default function VideoMarketingHeroVizLazy({ locale }: Props) {
  return <VideoMarketingHeroViz labels={videoMarketingContent[locale].heroVizLabels} />;
}

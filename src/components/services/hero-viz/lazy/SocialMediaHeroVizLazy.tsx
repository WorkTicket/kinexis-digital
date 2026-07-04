"use client";

import SocialMediaHeroViz from "@/components/services/hero-viz/SocialMediaHeroViz";
import { socialMediaContent } from "@/content/services/social-media";
import type { Locale } from "@/i18n/routing";

type Props = { locale: Locale };

export default function SocialMediaHeroVizLazy({ locale }: Props) {
  return <SocialMediaHeroViz platforms={socialMediaContent[locale].platformData} />;
}

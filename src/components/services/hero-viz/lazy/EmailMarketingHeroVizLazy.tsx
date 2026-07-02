"use client";

import EmailMarketingHeroViz from "@/components/services/hero-viz/EmailMarketingHeroViz";
import { emailMarketingContent } from "@/content/services/email-marketing";
import type { Locale } from "@/i18n/routing";

type Props = { locale: Locale };

export default function EmailMarketingHeroVizLazy({ locale }: Props) {
  return <EmailMarketingHeroViz sequence={emailMarketingContent[locale].sequenceMap} />;
}

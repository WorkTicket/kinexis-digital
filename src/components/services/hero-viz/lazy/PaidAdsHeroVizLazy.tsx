"use client";

import PaidAdsHeroViz from "@/components/services/hero-viz/PaidAdsHeroViz";
import { paidAdsContent } from "@/content/services/paid-ads";
import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";

type Props = {
  locale: Locale;
  slug: Extract<ServiceSeoSlug, "google-ads" | "meta-ads" | "ppc-management" | "paid-ads">;
};

export default function PaidAdsHeroVizLazy({ locale, slug }: Props) {
  switch (slug) {
    case "google-ads":
      return <PaidAdsHeroViz variant="google-ads" />;
    case "meta-ads":
      return <PaidAdsHeroViz variant="meta-ads" />;
    case "ppc-management":
      return <PaidAdsHeroViz variant="ppc" />;
    case "paid-ads":
      return <PaidAdsHeroViz variant="paid-ads" channelLabels={paidAdsContent[locale].channels} />;
  }
}

"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";

const SeoHeroVizLazy = dynamic(() => import("@/components/services/hero-viz/lazy/SeoHeroVizLazy"));
const PaidAdsHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/PaidAdsHeroVizLazy")
);
const WebDesignHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/WebDesignHeroVizLazy")
);
const CroHeroVizLazy = dynamic(() => import("@/components/services/hero-viz/lazy/CroHeroVizLazy"));
const EmailMarketingHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/EmailMarketingHeroVizLazy")
);
const ContentMarketingHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/ContentMarketingHeroVizLazy")
);
const SocialMediaHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/SocialMediaHeroVizLazy")
);
const VideoMarketingHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/VideoMarketingHeroVizLazy")
);
const BrandingHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/BrandingHeroVizLazy")
);
const AnalyticsHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/AnalyticsHeroVizLazy")
);
const GrowthConsultingHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/GrowthConsultingHeroVizLazy")
);
const FunnelsHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/FunnelsHeroVizLazy")
);

/** In-page section graphics — always render (hero deferral would show an empty shell on mobile). */
export function getServiceHeroVisualization(slug: ServiceSeoSlug, locale: Locale): ReactNode {
  switch (slug) {
    case "seo":
      return <SeoHeroVizLazy locale={locale} variant="seo" />;
    case "local-seo":
      return <SeoHeroVizLazy locale={locale} variant="local-seo" />;
    case "google-ads":
    case "meta-ads":
    case "ppc-management":
    case "paid-ads":
      return <PaidAdsHeroVizLazy locale={locale} slug={slug} />;
    case "web-design":
      return <WebDesignHeroVizLazy />;
    case "cro":
      return <CroHeroVizLazy locale={locale} />;
    case "email-marketing":
      return <EmailMarketingHeroVizLazy locale={locale} />;
    case "content-marketing":
      return <ContentMarketingHeroVizLazy locale={locale} />;
    case "social-media":
      return <SocialMediaHeroVizLazy locale={locale} />;
    case "video-marketing":
      return <VideoMarketingHeroVizLazy locale={locale} />;
    case "branding":
      return <BrandingHeroVizLazy />;
    case "analytics":
      return <AnalyticsHeroVizLazy locale={locale} />;
    case "growth-consulting":
      return <GrowthConsultingHeroVizLazy locale={locale} />;
    case "funnels":
      return <FunnelsHeroVizLazy locale={locale} />;
    default:
      return <WebDesignHeroVizLazy />;
  }
}

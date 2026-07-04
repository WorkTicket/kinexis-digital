"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import DeferredHeroViz from "@/components/services/DeferredHeroViz";
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

function wrapViz(node: ReactNode) {
  return <DeferredHeroViz>{node}</DeferredHeroViz>;
}

export function getServiceHeroVisualization(slug: ServiceSeoSlug, locale: Locale): ReactNode {
  switch (slug) {
    case "seo":
      return wrapViz(<SeoHeroVizLazy locale={locale} variant="seo" />);
    case "local-seo":
      return wrapViz(<SeoHeroVizLazy locale={locale} variant="local-seo" />);
    case "google-ads":
    case "meta-ads":
    case "ppc-management":
    case "paid-ads":
      return wrapViz(<PaidAdsHeroVizLazy locale={locale} slug={slug} />);
    case "web-design":
      return wrapViz(<WebDesignHeroVizLazy />);
    case "cro":
      return wrapViz(<CroHeroVizLazy locale={locale} />);
    case "email-marketing":
      return wrapViz(<EmailMarketingHeroVizLazy locale={locale} />);
    case "content-marketing":
      return wrapViz(<ContentMarketingHeroVizLazy locale={locale} />);
    case "social-media":
      return wrapViz(<SocialMediaHeroVizLazy locale={locale} />);
    case "video-marketing":
      return wrapViz(<VideoMarketingHeroVizLazy locale={locale} />);
    case "branding":
      return wrapViz(<BrandingHeroVizLazy />);
    case "analytics":
      return wrapViz(<AnalyticsHeroVizLazy locale={locale} />);
    case "growth-consulting":
      return wrapViz(<GrowthConsultingHeroVizLazy locale={locale} />);
    case "funnels":
      return wrapViz(<FunnelsHeroVizLazy locale={locale} />);
    default:
      return wrapViz(<WebDesignHeroVizLazy />);
  }
}

"use client";

import type { ReactNode } from "react";
import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";
import { seoContent } from "@/content/services/seo";
import { croContent } from "@/content/services/cro";
import { emailMarketingContent } from "@/content/services/email-marketing";
import { contentMarketingContent } from "@/content/services/content-marketing";
import { socialMediaContent } from "@/content/services/social-media";
import { videoMarketingContent } from "@/content/services/video-marketing";
import { analyticsContent } from "@/content/services/analytics";
import { growthConsultingContent } from "@/content/services/growth-consulting";
import { funnelsContent } from "@/content/services/funnels";
import { paidAdsContent } from "@/content/services/paid-ads";
import SeoHeroViz from "@/components/services/hero-viz/SeoHeroViz";
import PaidAdsHeroViz from "@/components/services/hero-viz/PaidAdsHeroViz";
import WebDesignHeroViz from "@/components/services/hero-viz/WebDesignHeroViz";
import CroHeroViz from "@/components/services/hero-viz/CroHeroViz";
import EmailMarketingHeroViz from "@/components/services/hero-viz/EmailMarketingHeroViz";
import ContentMarketingHeroViz from "@/components/services/hero-viz/ContentMarketingHeroViz";
import SocialMediaHeroViz from "@/components/services/hero-viz/SocialMediaHeroViz";
import VideoMarketingHeroViz from "@/components/services/hero-viz/VideoMarketingHeroViz";
import BrandingHeroViz from "@/components/services/hero-viz/BrandingHeroViz";
import AnalyticsHeroViz from "@/components/services/hero-viz/AnalyticsHeroViz";
import GrowthConsultingHeroViz from "@/components/services/hero-viz/GrowthConsultingHeroViz";
import FunnelsHeroViz from "@/components/services/hero-viz/FunnelsHeroViz";

const localSeoDiagramLabels = {
  technical: "Local Citations",
  ux: "Google Business Profile",
  content: "Location Pages",
  links: "Reviews",
  rankings: "Map Pack",
  revenue: "Booked Calls",
};

export function getServiceHeroVisualization(slug: ServiceSeoSlug, locale: Locale): ReactNode {
  switch (slug) {
    case "seo": {
      const labels = Object.fromEntries(seoContent[locale].diagramNodes.map((n) => [n.id, n.label]));
      return <SeoHeroViz labels={labels} />;
    }
    case "local-seo":
      return <SeoHeroViz labels={localSeoDiagramLabels} />;
    case "google-ads":
      return <PaidAdsHeroViz variant="google-ads" />;
    case "meta-ads":
      return <PaidAdsHeroViz variant="meta-ads" />;
    case "ppc-management":
      return <PaidAdsHeroViz variant="ppc" />;
    case "paid-ads":
      return <PaidAdsHeroViz variant="paid-ads" channelLabels={paidAdsContent[locale].channels} />;
    case "web-design":
      return <WebDesignHeroViz />;
    case "cro":
      return <CroHeroViz variantLabel={croContent[locale].hero.variantLabel} />;
    case "email-marketing":
      return <EmailMarketingHeroViz sequence={emailMarketingContent[locale].sequenceMap} />;
    case "content-marketing":
      return (
        <ContentMarketingHeroViz
          labels={contentMarketingContent[locale].production.contentTypes.map((ct) => ({
            id: ct.id,
            vizLabel: ct.vizLabel,
          }))}
        />
      );
    case "social-media":
      return <SocialMediaHeroViz platforms={socialMediaContent[locale].platformData} />;
    case "video-marketing":
      return <VideoMarketingHeroViz labels={videoMarketingContent[locale].heroVizLabels} />;
    case "branding":
      return <BrandingHeroViz />;
    case "analytics":
      return <AnalyticsHeroViz metrics={analyticsContent[locale].metricsSection.metrics} />;
    case "growth-consulting":
      return <GrowthConsultingHeroViz quarters={growthConsultingContent[locale].roadmapSection.quarters} />;
    case "funnels":
      return <FunnelsHeroViz stages={funnelsContent[locale].flowStages} />;
    default:
      return <WebDesignHeroViz />;
  }
}

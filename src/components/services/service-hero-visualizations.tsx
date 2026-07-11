import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";

const SeoHeroVizLazy = dynamic(() => import("@/components/services/hero-viz/lazy/SeoHeroVizLazy"));
const LocalSeoHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/LocalSeoHeroVizLazy")
);
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
const YouTubeAdsHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/YouTubeAdsHeroVizLazy")
);
const LandingPagesHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/LandingPagesHeroVizLazy")
);
const WebsiteMaintenanceHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/WebsiteMaintenanceHeroVizLazy")
);
const WebsiteSpeedHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/WebsiteSpeedHeroVizLazy")
);
const MicrosoftAdsHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/MicrosoftAdsHeroVizLazy")
);
const CopywritingHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/CopywritingHeroVizLazy")
);
const MarketingAuditsHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/MarketingAuditsHeroVizLazy")
);
const MarketingAutomationCrmHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/MarketingAutomationCrmHeroVizLazy")
);
const FractionalCmoHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/FractionalCmoHeroVizLazy")
);
const TrainingWorkshopsHeroVizLazy = dynamic(
  () => import("@/components/services/hero-viz/lazy/TrainingWorkshopsHeroVizLazy")
);

/** In-page section graphics — always render (hero deferral would show an empty shell on mobile). */
export function getServiceHeroVisualization(slug: ServiceSeoSlug, locale: Locale): ReactNode {
  switch (slug) {
    case "seo":
      return <SeoHeroVizLazy locale={locale} variant="seo" />;
    case "local-seo":
      return <LocalSeoHeroVizLazy />;
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
    case "youtube-ads":
      return <YouTubeAdsHeroVizLazy />;
    case "landing-pages":
      return <LandingPagesHeroVizLazy />;
    case "website-maintenance":
      return <WebsiteMaintenanceHeroVizLazy />;
    case "website-speed":
      return <WebsiteSpeedHeroVizLazy />;
    case "microsoft-ads":
      return <MicrosoftAdsHeroVizLazy />;
    case "copywriting":
      return <CopywritingHeroVizLazy />;
    case "marketing-audits":
      return <MarketingAuditsHeroVizLazy />;
    case "marketing-automation-crm":
      return <MarketingAutomationCrmHeroVizLazy />;
    case "fractional-cmo":
      return <FractionalCmoHeroVizLazy />;
    case "training-workshops":
      return <TrainingWorkshopsHeroVizLazy />;
    default:
      return <WebDesignHeroVizLazy />;
  }
}

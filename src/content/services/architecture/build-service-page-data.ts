import type { ServicePillarContent } from "@/components/sections/ServicePillarSections";
import type { ServicePhase } from "@/components/ui/ServicePhaseList";
import type { FAQItem } from "@/components/sections/FAQSection";
import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";
import { getServiceSeoContent } from "@/content/service-seo";
import { mergeServiceFaqs } from "@/content/service-seo";
import { seoContent } from "@/content/services/seo";
import { webDesignContent } from "@/content/services/web-design";
import { paidAdsContent } from "@/content/services/paid-ads";
import { localSeoContent } from "@/content/services/local-seo";
import { croContent } from "@/content/services/cro";
import { emailMarketingContent } from "@/content/services/email-marketing";
import { contentMarketingContent } from "@/content/services/content-marketing";
import { socialMediaContent } from "@/content/services/social-media";
import { videoMarketingContent } from "@/content/services/video-marketing";
import { brandingContent } from "@/content/services/branding";
import { analyticsContent } from "@/content/services/analytics";
import { growthConsultingContent } from "@/content/services/growth-consulting";
import { funnelsContent } from "@/content/services/funnels";
import {
  analyticsPillarContent,
  brandingPillarContent,
  contentMarketingPillarContent,
  croPillarContent,
  emailMarketingPillarContent,
  funnelsPillarContent,
  growthConsultingPillarContent,
  localSeoPillarContent,
  paidAdsPillarContent,
  seoPillarContent,
  socialMediaPillarContent,
  videoMarketingPillarContent,
  webDesignPillarContent,
} from "@/content/services/service-pillar-map";
import { googleAdsPillarContent, metaAdsPillarContent, getPaidServiceFaqs } from "@/content/services/paid-service-pillar";
import { serviceArchitectureConfig } from "./service-architecture-config";
import { buildServiceSections } from "./service-section-builders";
import type { ServicePageData } from "./types";

export const servicePillarBySlug: Record<ServiceSeoSlug, ServicePillarContent> = {
  seo: seoPillarContent,
  "local-seo": localSeoPillarContent,
  "google-ads": googleAdsPillarContent,
  "meta-ads": metaAdsPillarContent,
  "ppc-management": googleAdsPillarContent,
  "paid-ads": paidAdsPillarContent,
  "web-design": webDesignPillarContent,
  cro: croPillarContent,
  "email-marketing": emailMarketingPillarContent,
  "content-marketing": contentMarketingPillarContent,
  "social-media": socialMediaPillarContent,
  "video-marketing": videoMarketingPillarContent,
  branding: brandingPillarContent,
  analytics: analyticsPillarContent,
  "growth-consulting": growthConsultingPillarContent,
  funnels: funnelsPillarContent,
};

function timelineToPhases(pillar: ServicePillarContent): ServicePhase[] {
  return pillar.timeline.phases.map((p) => ({
    title: p.duration,
    desc: p.description,
    metric: p.phase,
  }));
}

function getProcess(slug: ServiceSeoSlug, locale: Locale, pillar: ServicePillarContent) {
  switch (slug) {
    case "seo":
      return { title: seoContent[locale].phasesTitle, subtitle: seoContent[locale].phasesSubtitle, steps: seoContent[locale].phases };
    case "web-design":
      return { title: webDesignContent[locale].buildProcessTitle, subtitle: webDesignContent[locale].buildProcessSubtitle, steps: webDesignContent[locale].phases };
    case "local-seo":
      return { title: localSeoContent[locale].phasesTitle, subtitle: localSeoContent[locale].phasesSubtitle, steps: localSeoContent[locale].phases };
    case "google-ads":
    case "meta-ads":
    case "ppc-management":
    case "paid-ads":
      return { title: paidAdsContent[locale].phases.title, subtitle: paidAdsContent[locale].phases.subtitle, steps: paidAdsContent[locale].phases.items };
    case "cro":
      return { title: croContent[locale].processSection.title, subtitle: croContent[locale].processSection.subtitle, steps: croContent[locale].phases };
    case "email-marketing":
      return { title: emailMarketingContent[locale].processSection.title, subtitle: emailMarketingContent[locale].processSection.subtitle, steps: emailMarketingContent[locale].phases };
    case "content-marketing":
      return { title: contentMarketingContent[locale].process.title, subtitle: contentMarketingContent[locale].process.subtitle, steps: contentMarketingContent[locale].process.phases };
    case "social-media":
      return { title: socialMediaContent[locale].processSection.title, subtitle: socialMediaContent[locale].processSection.subtitle, steps: socialMediaContent[locale].phases };
    case "video-marketing":
      return { title: videoMarketingContent[locale].processSection.title, subtitle: videoMarketingContent[locale].processSection.subtitle, steps: videoMarketingContent[locale].phases };
    case "branding":
      return { title: brandingContent[locale].process.title, subtitle: brandingContent[locale].process.subtitle, steps: brandingContent[locale].process.phases };
    case "analytics":
      return { title: analyticsContent[locale].processSection.title, subtitle: analyticsContent[locale].processSection.subtitle, steps: analyticsContent[locale].phases };
    case "growth-consulting":
      return { title: growthConsultingContent[locale].processSection.title, subtitle: growthConsultingContent[locale].processSection.subtitle, steps: growthConsultingContent[locale].phases };
    case "funnels":
      return { title: funnelsContent[locale].phases.title, subtitle: funnelsContent[locale].phases.subtitle, steps: funnelsContent[locale].phases.items };
    default:
      return { title: pillar.timeline.title, subtitle: pillar.timeline.subtitle, steps: timelineToPhases(pillar) };
  }
}

function getExtraFaqs(slug: ServiceSeoSlug, locale: Locale): FAQItem[] {
  if (slug === "google-ads" || slug === "meta-ads" || slug === "ppc-management") {
    const variant = slug === "ppc-management" ? "ppc" : slug;
    return getPaidServiceFaqs(variant, locale);
  }
  const faqSources: Partial<Record<ServiceSeoSlug, FAQItem[]>> = {
    seo: seoContent[locale].faqs,
    "web-design": webDesignContent[locale].faqs,
    "local-seo": localSeoContent[locale].faqs,
    cro: croContent[locale].faqs,
    "email-marketing": emailMarketingContent[locale].faqs,
    "content-marketing": contentMarketingContent[locale].faqs,
    "social-media": socialMediaContent[locale].faqs,
    "video-marketing": videoMarketingContent[locale].faqs,
    branding: brandingContent[locale].faqs,
    analytics: analyticsContent[locale].faqs,
    "growth-consulting": growthConsultingContent[locale].faqs,
    funnels: [...funnelsContent[locale].faqs, ...croContent[locale].faqs],
    "paid-ads": paidAdsContent[locale].faqs,
  };
  return faqSources[slug] ?? [];
}

function getHeroCta(slug: ServiceSeoSlug, locale: Locale, seo: ReturnType<typeof getServiceSeoContent>) {
  const fromContent: Partial<Record<ServiceSeoSlug, string>> = {
    seo: seoContent[locale].heroCtaLabel,
    "web-design": webDesignContent[locale].heroCtaLabel,
    "local-seo": localSeoContent[locale].ctaLabel,
    cro: croContent[locale].hero.ctaLabel,
    "email-marketing": emailMarketingContent[locale].hero.ctaLabel,
    "content-marketing": contentMarketingContent[locale].hero.ctaLabel,
    "social-media": socialMediaContent[locale].hero.ctaLabel,
    "video-marketing": videoMarketingContent[locale].hero.ctaLabel,
    branding: brandingContent[locale].hero.ctaLabel,
    analytics: analyticsContent[locale].hero.ctaLabel,
    "growth-consulting": growthConsultingContent[locale].hero.ctaLabel,
    funnels: funnelsContent[locale].hero.ctaLabel,
    "paid-ads": paidAdsContent[locale].hero.ctaLabel,
    "ppc-management": paidAdsContent[locale].hero.ctaLabel,
    "google-ads": paidAdsContent[locale].hero.ctaLabel,
    "meta-ads": paidAdsContent[locale].hero.ctaLabel,
  };
  return fromContent[slug] ?? seo.hero.label;
}

export function buildServicePageData(slug: ServiceSeoSlug, locale: Locale): Omit<ServicePageData, "hero"> & { hero: Omit<ServicePageData["hero"], "visualization"> } {
  const config = serviceArchitectureConfig[slug];
  const seo = getServiceSeoContent(slug, locale);
  const pillar = servicePillarBySlug[slug];
  const faqs = mergeServiceFaqs(slug, locale, getExtraFaqs(slug, locale));

  return {
    slug,
    locale,
    visualVariant: config.visualVariant,
    hero: {
      label: seo.hero.label,
      line1: seo.hero.line1,
      line2: seo.hero.line2,
      subtitle: seo.hero.subtitle,
      ctaLabel: getHeroCta(slug, locale, seo),
    },
    sectionOrder: config.sectionOrder,
    overview: {
      headline: seo.problem.title,
      problem: seo.problem.intro,
      solution: seo.solution.title,
      problemPoints: seo.problem.points,
      solutionPoints: seo.solution.points,
    },
    whyKinexus: config.whyKinexus[locale],
    proof: config.proof?.[locale],
    results: pillar.results,
    process: getProcess(slug, locale, pillar),
    deliverables: {
      title: seo.deliverables.title,
      subtitle: seo.deliverables.subtitle,
      items: seo.deliverables.items,
    },
    serviceSections: buildServiceSections(slug, locale, seo, config.visualVariant, config.serviceSectionKeys),
    faq: faqs,
    answerBlock: seo.answerBlock,
    comparison: seo.comparison,
  };
}

export function isArchitectedService(slug: string): slug is ServiceSeoSlug {
  return slug in serviceArchitectureConfig;
}

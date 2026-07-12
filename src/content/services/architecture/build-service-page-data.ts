import type { ServicePillarContent } from "@/components/sections/ServicePillarSections";
import type { ServicePhase } from "@/components/ui/ServicePhaseList";
import type { FAQItem } from "@/components/sections/FAQSection";
import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";
import { getServiceSeoContent } from "@/content/service-seo";
import { mergeServiceFaqs } from "@/content/service-seo";
import { seoContent } from "@/content/services/seo";
import { webDesignContent } from "@/content/services/web-design";
import { paidAdsContent, metaAdsPageContent } from "@/content/services/paid-ads";
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
import { landingPagesContent } from "@/content/services/landing-pages";
import { copywritingContent } from "@/content/services/copywriting";
import { youtubeAdsContent } from "@/content/services/youtube-ads";
import { getGenericRichServiceContent } from "@/content/services/generic-rich-service-content";
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
  youtubeAdsPillarContent,
  landingPagesPillarContent,
  websiteMaintenancePillarContent,
  websiteSpeedPillarContent,
  microsoftAdsPillarContent,
  copywritingPillarContent,
  marketingAuditsPillarContent,
  marketingAutomationCrmPillarContent,
  fractionalCmoPillarContent,
  trainingWorkshopsPillarContent,
} from "@/content/services/service-pillar-map";
import { googleAdsPillarContent, metaAdsPillarContent, ppcPillarContent, getPaidServiceFaqs } from "@/content/services/paid-service-pillar";
import { serviceArchitectureConfig } from "./service-architecture-config";
import { buildServiceSections } from "./service-section-builders";
import type { ServicePageData, ProofData } from "./types";

export const servicePillarBySlug: Record<ServiceSeoSlug, ServicePillarContent> = {
  seo: seoPillarContent,
  "local-seo": localSeoPillarContent,
  "google-ads": googleAdsPillarContent,
  "meta-ads": metaAdsPillarContent,
  "ppc-management": ppcPillarContent,
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
  "youtube-ads": youtubeAdsPillarContent,
  "microsoft-ads": microsoftAdsPillarContent,
  "landing-pages": landingPagesPillarContent,
  "website-maintenance": websiteMaintenancePillarContent,
  "website-speed": websiteSpeedPillarContent,
  copywriting: copywritingPillarContent,
  "marketing-audits": marketingAuditsPillarContent,
  "marketing-automation-crm": marketingAutomationCrmPillarContent,
  "fractional-cmo": fractionalCmoPillarContent,
  "training-workshops": trainingWorkshopsPillarContent,
};

function timelineToPhases(pillar: ServicePillarContent): ServicePhase[] {
  return pillar.timeline.phases.map((p) => ({
    title: p.duration,
    desc: p.description,
    metric: p.phase,
  }));
}

function isEnProcess(locale: Locale): boolean {
  return locale === "en";
}

function getProcess(slug: ServiceSeoSlug, locale: Locale, pillar: ServicePillarContent) {
  switch (slug) {
    case "seo": {
      const c = seoContent[locale];
      return {
        title: c.phasesTitle,
        subtitle: c.phasesSubtitle,
        intro: c.processIntro,
        steps: c.phases,
      };
    }
    case "web-design": {
      const c = webDesignContent[locale];
      return { title: c.buildProcessTitle, subtitle: c.buildProcessSubtitle, intro: c.processIntro, steps: c.phases };
    }
    case "local-seo": {
      const c = localSeoContent[locale];
      return { title: c.phasesTitle, subtitle: c.phasesSubtitle, intro: c.processIntro, steps: c.phases };
    }
    case "google-ads": {
      const c = paidAdsContent[locale];
      return {
        title: c.phases.title,
        subtitle: c.phases.subtitle,
        intro: c.processIntro,
        steps: c.phases.items,
      };
    }
    case "meta-ads": {
      const m = metaAdsPageContent[locale];
      return {
        title: isEnProcess(locale) ? "How we run Meta campaigns" : "Cómo ejecutamos campañas Meta",
        subtitle: isEnProcess(locale)
          ? "Biweekly creative sprints and clean audience separation on a fixed cadence."
          : "Sprints creativos quincenales y separación limpia de audiencias en cadencia fija.",
        intro: m.processIntro,
        steps: m.phases,
      };
    }
    case "ppc-management": {
      const c = paidAdsContent[locale];
      return { title: c.phases.title, subtitle: c.phases.subtitle, intro: c.processIntro, steps: c.phases.items };
    }
    case "paid-ads": {
      const c = paidAdsContent[locale];
      return { title: c.phases.title, subtitle: c.phases.subtitle, intro: c.processIntro, steps: c.phases.items };
    }
    case "cro": {
      const c = croContent[locale];
      return { title: c.processSection.title, subtitle: c.processSection.subtitle, intro: c.processIntro, steps: c.phases };
    }
    case "email-marketing":
      return {
        title: emailMarketingContent[locale].processSection.title,
        subtitle: emailMarketingContent[locale].processSection.subtitle,
        intro: emailMarketingContent[locale].processIntro,
        steps: emailMarketingContent[locale].phases,
      };
    case "content-marketing": {
      const c = contentMarketingContent[locale];
      return { title: c.process.title, subtitle: c.process.subtitle, intro: c.processIntro, steps: c.process.phases };
    }
    case "social-media": {
      const c = socialMediaContent[locale];
      return { title: c.processSection.title, subtitle: c.processSection.subtitle, intro: c.processIntro, steps: c.phases };
    }
    case "video-marketing": {
      const c = videoMarketingContent[locale];
      return { title: c.processSection.title, subtitle: c.processSection.subtitle, intro: c.processIntro, steps: c.phases };
    }
    case "branding": {
      const c = brandingContent[locale];
      return { title: c.process.title, subtitle: c.process.subtitle, intro: c.processIntro, steps: c.process.phases };
    }
    case "analytics": {
      const c = analyticsContent[locale];
      return { title: c.processSection.title, subtitle: c.processSection.subtitle, intro: c.processIntro, steps: c.phases };
    }
    case "growth-consulting": {
      const c = growthConsultingContent[locale];
      return { title: c.processSection.title, subtitle: c.processSection.subtitle, intro: c.processIntro, steps: c.phases };
    }
    case "funnels": {
      const c = funnelsContent[locale];
      return { title: c.phases.title, subtitle: c.phases.subtitle, intro: c.processIntro, steps: c.phases.items };
    }
    case "landing-pages": {
      const c = landingPagesContent[locale];
      return {
        title: c.processSection.title,
        subtitle: c.processSection.subtitle,
        intro: c.processIntro,
        steps: c.phases,
      };
    }
    case "copywriting": {
      const c = copywritingContent[locale];
      return {
        title: c.processSection.title,
        subtitle: c.processSection.subtitle,
        intro: c.processIntro,
        steps: c.phases,
      };
    }
    case "youtube-ads": {
      const c = youtubeAdsContent[locale];
      return {
        title: c.processSection.title,
        subtitle: c.processSection.subtitle,
        intro: c.processIntro,
        steps: c.phases,
      };
    }
    default: {
      const generic = getGenericRichServiceContent(slug, locale);
      if (generic) {
        return {
          title: generic.processSection.title,
          subtitle: generic.processSection.subtitle,
          intro: generic.processIntro,
          steps: generic.phases,
        };
      }
      return { title: pillar.timeline.title, subtitle: pillar.timeline.subtitle, steps: timelineToPhases(pillar) };
    }
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
    "local-seo": localSeoContent[locale].heroCtaLabel,
    cro: croContent[locale].hero.ctaLabel,
    "email-marketing": emailMarketingContent[locale].hero.ctaLabel,
    "content-marketing": contentMarketingContent[locale].hero.ctaLabel,
    "social-media": socialMediaContent[locale].hero.ctaLabel,
    "video-marketing": videoMarketingContent[locale].hero.ctaLabel,
    branding: brandingContent[locale].hero.ctaLabel,
    analytics: analyticsContent[locale].hero.ctaLabel,
    "growth-consulting": growthConsultingContent[locale].hero.ctaLabel,
    funnels: funnelsContent[locale].hero.ctaLabel,
    "landing-pages": landingPagesContent[locale].hero.ctaLabel,
    copywriting: copywritingContent[locale].hero.ctaLabel,
    "youtube-ads": youtubeAdsContent[locale].hero.ctaLabel,
    "microsoft-ads": getGenericRichServiceContent("microsoft-ads", locale)?.hero.ctaLabel,
    "website-maintenance": getGenericRichServiceContent("website-maintenance", locale)?.hero.ctaLabel,
    "website-speed": getGenericRichServiceContent("website-speed", locale)?.hero.ctaLabel,
    "marketing-audits": getGenericRichServiceContent("marketing-audits", locale)?.hero.ctaLabel,
    "marketing-automation-crm": getGenericRichServiceContent("marketing-automation-crm", locale)?.hero.ctaLabel,
    "fractional-cmo": getGenericRichServiceContent("fractional-cmo", locale)?.hero.ctaLabel,
    "training-workshops": getGenericRichServiceContent("training-workshops", locale)?.hero.ctaLabel,
    "paid-ads": paidAdsContent[locale].hero.ctaLabel,
    "ppc-management": paidAdsContent[locale].hero.ctaLabel,
    "google-ads": paidAdsContent[locale].hero.ctaLabel,
    "meta-ads": metaAdsPageContent[locale].heroCtaLabel,
  };
  return fromContent[slug] ?? seo.hero.label;
}

function buildEditorial(slug: ServiceSeoSlug, seo: ReturnType<typeof getServiceSeoContent>) {
  if (!seo.editorial?.bridgeParagraph) return undefined;

  const paragraphs = [seo.problem.intro, seo.editorial.bridgeParagraph, seo.solution.intro];

  return {
    headline: seo.problem.title,
    paragraphs,
    pullQuote: seo.editorial.pullQuote,
  };
}

function buildProof(_slug: ServiceSeoSlug, _locale: Locale, configProof?: ProofData): ProofData | undefined {
  return configProof;
}

function buildServiceCta(slug: ServiceSeoSlug, locale: Locale) {
  switch (slug) {
    case "seo": {
      const c = seoContent[locale];
      return {
        headline: c.ctaHeadline,
        subtitle: c.ctaSubtitle,
        label: c.ctaLabel,
        inlineLabel: c.inlineCtaLabel,
        inlineSubtitle: c.inlineCtaSubtitle,
      };
    }
    case "ppc-management": {
      const c = paidAdsContent[locale];
      return {
        headline: c.cta.headline,
        subtitle: c.cta.subtitle,
        label: c.cta.ctaLabel,
        inlineLabel: c.inlineCtaLabel,
        inlineSubtitle: c.inlineCtaSubtitle,
      };
    }
    case "google-ads": {
      const c = paidAdsContent[locale];
      return {
        headline: c.cta.headline,
        subtitle: c.cta.subtitle,
        label: c.cta.ctaLabel,
        inlineLabel: c.inlineCtaLabel,
        inlineSubtitle: c.inlineCtaSubtitle,
      };
    }
    case "paid-ads": {
      const c = paidAdsContent[locale];
      return {
        headline: c.cta.headline,
        subtitle: c.cta.subtitle,
        label: c.cta.ctaLabel,
        inlineLabel: c.inlineCtaLabel,
        inlineSubtitle: c.inlineCtaSubtitle,
      };
    }
    case "local-seo": {
      const c = localSeoContent[locale];
      return {
        headline: c.ctaHeadline,
        subtitle: c.ctaSubtitle,
        label: c.ctaLabel,
        inlineLabel: c.inlineCtaLabel,
        inlineSubtitle: c.inlineCtaSubtitle,
      };
    }
    case "meta-ads": {
      const m = metaAdsPageContent[locale];
      return {
        headline: m.cta.headline,
        subtitle: m.cta.subtitle,
        label: m.cta.ctaLabel,
        inlineLabel: m.inlineCtaLabel,
        inlineSubtitle: m.inlineCtaSubtitle,
      };
    }
    case "web-design": {
      const c = webDesignContent[locale];
      return {
        headline: c.ctaHeadline,
        subtitle: c.ctaSubtitle,
        label: c.ctaLabel,
        inlineLabel: c.inlineCtaLabel,
        inlineSubtitle: c.inlineCtaSubtitle,
      };
    }
    case "cro": {
      const c = croContent[locale];
      return {
        headline: c.cta.headline,
        subtitle: c.cta.subtitle,
        label: c.cta.ctaLabel,
        inlineLabel: c.inlineCtaLabel,
        inlineSubtitle: c.inlineCtaSubtitle,
      };
    }
    case "content-marketing": {
      const c = contentMarketingContent[locale];
      return { headline: c.cta.headline, subtitle: c.cta.subtitle, label: c.cta.ctaLabel, inlineLabel: c.inlineCtaLabel, inlineSubtitle: c.inlineCtaSubtitle };
    }
    case "social-media": {
      const c = socialMediaContent[locale];
      return { headline: c.cta.headline, subtitle: c.cta.subtitle, label: c.cta.ctaLabel, inlineLabel: c.inlineCtaLabel, inlineSubtitle: c.inlineCtaSubtitle };
    }
    case "video-marketing": {
      const c = videoMarketingContent[locale];
      return { headline: c.cta.headline, subtitle: c.cta.subtitle, label: c.cta.ctaLabel, inlineLabel: c.inlineCtaLabel, inlineSubtitle: c.inlineCtaSubtitle };
    }
    case "branding": {
      const c = brandingContent[locale];
      return { headline: c.cta.headline, subtitle: c.cta.subtitle, label: c.cta.ctaLabel, inlineLabel: c.inlineCtaLabel, inlineSubtitle: c.inlineCtaSubtitle };
    }
    case "analytics": {
      const c = analyticsContent[locale];
      return { headline: c.cta.headline, subtitle: c.cta.subtitle, label: c.cta.ctaLabel, inlineLabel: c.inlineCtaLabel, inlineSubtitle: c.inlineCtaSubtitle };
    }
    case "growth-consulting": {
      const c = growthConsultingContent[locale];
      return { headline: c.cta.headline, subtitle: c.cta.subtitle, label: c.cta.ctaLabel, inlineLabel: c.inlineCtaLabel, inlineSubtitle: c.inlineCtaSubtitle };
    }
    case "funnels": {
      const c = funnelsContent[locale];
      return { headline: c.cta.headline, subtitle: c.cta.subtitle, label: c.cta.ctaLabel, inlineLabel: c.inlineCtaLabel, inlineSubtitle: c.inlineCtaSubtitle };
    }
    case "email-marketing": {
      const c = emailMarketingContent[locale];
      return { headline: c.cta.headline, subtitle: c.cta.subtitle, label: c.cta.ctaLabel, inlineLabel: c.inlineCtaLabel, inlineSubtitle: c.inlineCtaSubtitle };
    }
    case "landing-pages": {
      const c = landingPagesContent[locale];
      return {
        headline: c.cta.headline,
        subtitle: c.cta.subtitle,
        label: c.cta.ctaLabel,
        inlineLabel: c.inlineCtaLabel,
        inlineSubtitle: c.inlineCtaSubtitle,
      };
    }
    case "copywriting": {
      const c = copywritingContent[locale];
      return {
        headline: c.cta.headline,
        subtitle: c.cta.subtitle,
        label: c.cta.ctaLabel,
        inlineLabel: c.inlineCtaLabel,
        inlineSubtitle: c.inlineCtaSubtitle,
      };
    }
    case "youtube-ads": {
      const c = youtubeAdsContent[locale];
      return {
        headline: c.cta.headline,
        subtitle: c.cta.subtitle,
        label: c.cta.ctaLabel,
        inlineLabel: c.inlineCtaLabel,
        inlineSubtitle: c.inlineCtaSubtitle,
      };
    }
    default: {
      const generic = getGenericRichServiceContent(slug, locale);
      if (!generic) return undefined;
      return {
        headline: generic.cta.headline,
        subtitle: generic.cta.subtitle,
        label: generic.cta.ctaLabel,
        inlineLabel: generic.inlineCtaLabel,
        inlineSubtitle: generic.inlineCtaSubtitle,
      };
    }
  }
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
    visualizationSection: config.visualizationSection,
    hero: {
      label: seo.hero.label,
      line1: seo.hero.line1,
      line2: seo.hero.line2,
      subtitle: seo.hero.subtitle,
      ctaLabel: getHeroCta(slug, locale, seo),
    },
    sectionOrder: config.sectionOrder,
    editorial: buildEditorial(slug, seo),
    overview: {
      headline: seo.problem.title,
      problem: seo.problem.intro,
      solution: seo.solution.title,
      problemPoints: seo.problem.points,
      solutionPoints: seo.solution.points,
    },
    whyKinexis: config.whyKinexis[locale],
    proof: buildProof(slug, locale, config.proof?.[locale]),
    cta: buildServiceCta(slug, locale),
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

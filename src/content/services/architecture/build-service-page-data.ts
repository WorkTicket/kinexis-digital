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
import { googleAdsPillarContent, metaAdsPillarContent, ppcPillarContent, getPaidServiceFaqs } from "@/content/services/paid-service-pillar";
import { serviceArchitectureConfig } from "./service-architecture-config";
import { buildServiceSections } from "./service-section-builders";
import type { ServicePageData } from "./types";

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
    case "seo":
      return { title: seoContent[locale].phasesTitle, subtitle: seoContent[locale].phasesSubtitle, steps: seoContent[locale].phases };
    case "web-design":
      return { title: webDesignContent[locale].buildProcessTitle, subtitle: webDesignContent[locale].buildProcessSubtitle, steps: webDesignContent[locale].phases };
    case "local-seo":
      return { title: localSeoContent[locale].phasesTitle, subtitle: localSeoContent[locale].phasesSubtitle, steps: localSeoContent[locale].phases };
    case "google-ads":
      return {
        title: paidAdsContent[locale].phases.title,
        subtitle: paidAdsContent[locale].phases.subtitle,
        steps: [
          { title: isEnProcess(locale) ? "Account Audit & Restructure" : "Auditoría y Reestructuración", desc: isEnProcess(locale) ? "Campaign, keyword, match type, and conversion action review with rebuild plan." : "Revisión de campañas, keywords y conversiones con plan de rebuild.", metric: isEnProcess(locale) ? "Full audit in week 1" : "Auditoría completa en semana 1" },
          { title: isEnProcess(locale) ? "Keyword & Negative Build" : "Keywords y Negativas", desc: isEnProcess(locale) ? "High-intent keyword targets plus negative lists to block irrelevant searches." : "Objetivos de alta intención y listas negativas.", metric: isEnProcess(locale) ? "240+ terms reviewed weekly" : "240+ términos revisados semanalmente" },
          { title: isEnProcess(locale) ? "Ad & Landing Alignment" : "Alineación Anuncio-Landing", desc: isEnProcess(locale) ? "Responsive search ads, extensions, and landing pages matched to search intent." : "Anuncios responsivos, extensiones y landing pages alineadas.", metric: isEnProcess(locale) ? "8.2 avg Quality Score" : "8.2 Quality Score prom." },
          { title: isEnProcess(locale) ? "Tracking & Launch" : "Tracking y Lanzamiento", desc: isEnProcess(locale) ? "GA4, enhanced conversions, call tracking, and CRM import verified before spend scales." : "GA4, conversiones mejoradas y tracking de llamadas verificados.", metric: isEnProcess(locale) ? "Live within 14 days" : "Activo en 14 días" },
          { title: isEnProcess(locale) ? "Weekly Optimization" : "Optimización Semanal", desc: isEnProcess(locale) ? "Search term mining, bid adjustments, and budget pacing tied to qualified leads." : "Minería de términos, pujas y pacing ligados a leads calificados.", metric: isEnProcess(locale) ? "ROAS reported weekly" : "ROAS reportado semanalmente" },
        ],
      };
    case "meta-ads":
      return {
        title: paidAdsContent[locale].phases.title,
        subtitle: paidAdsContent[locale].phases.subtitle,
        steps: [
          { title: isEnProcess(locale) ? "Pixel & CAPI Audit" : "Auditoría Pixel y CAPI", desc: isEnProcess(locale) ? "Business Manager review, event mapping, and attribution gaps fixed before spend." : "Revisión de Business Manager y mapeo de eventos.", metric: isEnProcess(locale) ? "Tracking fixed in week 1" : "Tracking corregido en semana 1" },
          { title: isEnProcess(locale) ? "Audience Architecture" : "Arquitectura de Audiencias", desc: isEnProcess(locale) ? "Prospecting, warm engagers, and retargeting pools built with clean exclusions." : "Prospección, engagers y retargeting con exclusiones limpias.", metric: isEnProcess(locale) ? "3 audience layers" : "3 capas de audiencia" },
          { title: isEnProcess(locale) ? "Creative Sprint Launch" : "Lanzamiento Sprint Creativo", desc: isEnProcess(locale) ? "3 to 5 ad variations per sprint across static, video, and carousel formats." : "3 a 5 variaciones por sprint en estático, video y carrusel.", metric: isEnProcess(locale) ? "New creative every 2 weeks" : "Creativo nuevo cada 2 semanas" },
          { title: isEnProcess(locale) ? "Funnel-Stage Budgeting" : "Presupuesto por Etapa", desc: isEnProcess(locale) ? "Prospecting and retargeting budgets shift based on blended ROAS, not gut feel." : "Presupuestos de prospección y retargeting por ROAS combinado.", metric: isEnProcess(locale) ? "Weekly budget reviews" : "Revisiones semanales" },
          { title: isEnProcess(locale) ? "Scale & Refresh" : "Escalar y Refrescar", desc: isEnProcess(locale) ? "Winning ads scaled, fatigued creative retired, and landing pages kept in sync." : "Anuncios ganadores escalados y creativos fatigados retirados.", metric: isEnProcess(locale) ? "CPM monitored biweekly" : "CPM monitoreado quincenalmente" },
        ],
      };
    case "ppc-management":
      return {
        title: paidAdsContent[locale].phases.title,
        subtitle: paidAdsContent[locale].phases.subtitle,
        steps: [
          { title: isEnProcess(locale) ? "Cross-Channel Audit" : "Auditoría Multicanal", desc: isEnProcess(locale) ? "Google, Meta, LinkedIn, and Microsoft accounts reviewed with unified KPI baseline." : "Cuentas de Google, Meta, LinkedIn y Microsoft con baseline unificado.", metric: isEnProcess(locale) ? "Unified audit in week 1" : "Auditoría unificada en semana 1" },
          { title: isEnProcess(locale) ? "Tracking & Attribution" : "Tracking y Atribución", desc: isEnProcess(locale) ? "One conversion framework across platforms with CRM-backed lead quality." : "Un marco de conversión con calidad de leads respaldada por CRM.", metric: isEnProcess(locale) ? "CRM sync live week 2" : "Sync CRM activo semana 2" },
          { title: isEnProcess(locale) ? "Budget Allocation Plan" : "Plan de Asignación", desc: isEnProcess(locale) ? "Channel mix and monthly budget split based on cost per qualified lead." : "Mix de canales y presupuesto por costo por lead calificado.", metric: isEnProcess(locale) ? "Weekly reallocation cadence" : "Reasignación semanal" },
          { title: isEnProcess(locale) ? "Creative Coordination" : "Coordinación Creativa", desc: isEnProcess(locale) ? "Messaging and landing pages stay consistent across search and social campaigns." : "Mensajes y landing pages consistentes entre search y social.", metric: isEnProcess(locale) ? "Biweekly creative tests" : "Tests creativos quincenales" },
          { title: isEnProcess(locale) ? "Optimize & Report" : "Optimizar e Informar", desc: isEnProcess(locale) ? "Cross-channel ROAS dashboard with weekly bid, budget, and audience adjustments." : "Dashboard ROAS multicanal con ajustes semanales.", metric: isEnProcess(locale) ? "One dashboard, all channels" : "Un dashboard, todos los canales" },
        ],
      };
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
    visualizationSection: config.visualizationSection,
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

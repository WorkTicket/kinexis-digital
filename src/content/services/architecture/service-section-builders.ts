import type { ServiceSeoContent } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";
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
import type { ServiceSectionData, ServiceSectionTableHeaders, VisualVariant } from "./types";
import type { ServiceSeoSlug } from "@/content/service-seo/types";

type Point = { title: string; description: string; metric?: string };

function section(
  id: string,
  headline: string,
  subheadline: string | undefined,
  visualVariant: VisualVariant,
  points: Point[],
  tableHeaders?: ServiceSectionTableHeaders,
): ServiceSectionData {
  return { id, headline, subheadline, visualVariant, points, tableHeaders };
}

function fromDeliverables(
  seo: ServiceSeoContent,
  keys: string[],
  visualVariant: VisualVariant,
  idPrefix: string,
): Record<string, ServiceSectionData> {
  const items = seo.deliverables.items;
  const chunk = Math.ceil(items.length / keys.length);
  return Object.fromEntries(
    keys.map((key, i) => {
      const slice = items.slice(i * chunk, (i + 1) * chunk);
      return [
        key,
        section(
          `${idPrefix}-${key.toLowerCase()}`,
          slice[0]?.title ?? key,
          slice.map((s) => s.description).join(" "),
          visualVariant,
          slice.map((s) => ({ title: s.title, description: s.description, metric: "Included" })),
        ),
      ];
    }),
  );
}

function buildFlagshipSections(slug: ServiceSeoSlug, locale: Locale, _variant: VisualVariant): Record<string, ServiceSectionData> {
  const isEn = locale === "en";

  if (slug === "seo") {
    return {
      SeoAudit: section(
        "seo-audit",
        isEn ? "Technical SEO Audit" : "Auditoría SEO Técnica",
        isEn ? "Find what's blocking your highest-value pages from ranking." : "Encuentra qué bloquea tus páginas de mayor valor.",
        "dashboard",
        [
          { title: "Crawl & Indexation", description: isEn ? "Orphan pages, redirect chains, index bloat" : "Páginas huérfanas, cadenas de redirección e inflación de índice", metric: "Week 1" },
          { title: "Core Web Vitals", description: isEn ? "LCP, CLS, mobile usability" : "LCP, CLS y usabilidad móvil", metric: "Week 1" },
          { title: "Schema & Structure", description: isEn ? "Structured data on revenue pages" : "Datos estructurados en páginas de ingresos", metric: "Week 1" },
        ],
      ),
      RankingStrategy: section(
        "ranking-strategy",
        isEn ? "Ranking Strategy" : "Estrategia de Posicionamiento",
        seoContent[locale].keywordMatrixSubtitle,
        "chart",
        seoContent[locale].keywordMatrix.slice(0, 4).map((k) => ({ title: k.keyword, description: k.desc, metric: k.type })),
      ),
      ContentStrategy: section(
        "content-strategy",
        isEn ? "Content Strategy" : "Estrategia de Contenido",
        seoContent[locale].ecosystemSubtitle,
        "split",
        seoContent[locale].ecosystemNodes.map((n) => ({ title: n.label, description: n.desc })),
      ),
      TechnicalSeo: section(
        "technical-seo",
        isEn ? "Technical SEO" : "SEO Técnico",
        seoContent[locale].serpSubtitle,
        "mockup",
        seoContent[locale].serpFeatures.map((f) => ({ title: f.label, description: f.desc, metric: f.share })),
      ),
    };
  }

  if (slug === "google-ads") {
    const c = paidAdsContent[locale];
    const channelHeaders = {
      col1: c.roasDashboard.headerChannel,
      col2: c.roasDashboard.headerStatus,
      col3: c.roasDashboard.headerRoas,
    };
    return {
      CampaignArchitecture: section("campaign-architecture", c.budget.title, c.budget.subtitle, "dashboard", c.budget.sources.map((s) => ({ title: s.source, description: isEn ? "Intent-segmented campaign" : "Campaña por intención", metric: "Active" })), {
        col1: isEn ? "Source" : "Fuente",
        col2: isEn ? "Approach" : "Enfoque",
        col3: isEn ? "Status" : "Estado",
      }),
      KeywordResearch: section("keyword-research", isEn ? "Keyword Research & Negatives" : "Palabras Clave y Negativas", isEn ? "High-intent targets with weekly reviews." : "Objetivos de alta intención.", "chart", [
        { title: "Brand Terms", description: isEn ? "Protect branded searches" : "Protege búsquedas de marca", metric: "4.2x" },
        { title: "Commercial Intent", description: isEn ? "Buyer-intent queries" : "Consultas comerciales", metric: "3.6x" },
        { title: "Negative Lists", description: isEn ? "Weekly irrelevant query blocking" : "Bloqueo semanal", metric: "-32%" },
        { title: isEn ? "Search Term Mining" : "Minería de términos", description: isEn ? "Winning queries promoted, wasted spend cut each week" : "Consultas ganadoras promovidas, gasto cortado cada semana", metric: isEn ? "240+ reviewed" : "240+ revisadas" },
      ]),
      LandingPages: section(
        "landing-pages",
        c.conversion.title,
        c.conversion.subtitle,
        "chart",
        c.conversion.cards.map((x) => ({ title: x.label, description: x.desc, metric: x.metric })),
        {
          col1: isEn ? "Conversion lever" : "Palanca de conversión",
          col2: isEn ? "Approach" : "Enfoque",
          col3: isEn ? "Result" : "Resultado",
        },
      ),
      ConversionTracking: section("conversion-tracking", c.roasDashboard.title, c.roasDashboard.subtitle, "dashboard", c.channels.map((x) => ({ title: x.channel, description: x.status, metric: x.status === "scaling" ? "4.2x ROAS" : x.status === "optimizing" ? "On target" : "Testing" })), channelHeaders),
    };
  }

  if (slug === "web-design") {
    const c = webDesignContent[locale];
    return {
      UxAudit: section("ux-audit", c.beforeAfterTitle, c.beforeAfterSubtitle, "comparison", c.beforeAfters.slice(0, 2).map((ba) => ({ title: ba.headline, description: ba.beforeDetails[0], metric: ba.afterDetails[0] }))),
      DeviceMockups: section("device-mockups", c.surfacesTitle, c.surfacesSubtitle, "mockup", c.devices.map((d) => ({ title: d.name, description: isEn ? "Responsive across breakpoints" : "Responsive en breakpoints" }))),
      ConversionOptimization: section("conversion-optimization", isEn ? "Conversion Optimization" : "Optimización de Conversión", isEn ? "Layout choices tied to one goal." : "Decisiones de diseño con un solo objetivo.", "comparison", [
        { title: isEn ? "Above-fold CTA" : "CTA above fold", description: isEn ? "Primary action without scroll" : "Acción sin scroll", metric: "+425%" },
        { title: isEn ? "Trust signals" : "Señales de confianza", description: isEn ? "Logos and testimonials first" : "Logos y testimonios primero", metric: "3.8x" },
      ]),
      Speed: section("speed", c.performanceTitle, c.performanceSubtitle, "chart", c.perfMetrics.map((m) => ({ title: m.label, description: m.sub, metric: "Pass" }))),
    };
  }

  if (slug === "meta-ads") {
    return {
      CreativeTesting: section("creative-testing", isEn ? "Creative Testing Program" : "Programa de Pruebas Creativas", isEn ? "New ads every two weeks. Fatigue is predictable. We stay ahead of it." : "Variaciones cada dos semanas.", "comparison", [
        { title: isEn ? "Static & Video" : "Estático y Video", description: isEn ? "UGC, carousel, short-form" : "UGC, carrusel, corto", metric: "3-5/2wk" },
        { title: isEn ? "Hook Testing" : "Prueba de Hooks", description: isEn ? "Headline splits with kill rules" : "Divisiones con reglas de corte", metric: "2-wk" },
      ]),
      AudienceTargeting: section("audience-targeting", isEn ? "Audience Targeting" : "Segmentación", isEn ? "Clean prospecting and retargeting." : "Prospección y retargeting limpios.", "dashboard", [
        { title: "Lookalikes", description: isEn ? "CRM purchaser seeds" : "Semillas de compradores CRM", metric: "2.1x" },
        { title: "Interest Stacks", description: isEn ? "Layered with exclusions" : "Capas con exclusiones", metric: "Active" },
      ]),
      LeadGenFunnel: section("lead-gen-funnel", isEn ? "Lead Gen Funnel" : "Embudo de Leads", isEn ? "Ad promise matches landing page and form." : "Promesa coincide con landing y formulario.", "chart", [
        { title: isEn ? "Hook rate" : "Tasa de hook", description: isEn ? "First 3 seconds stop the scroll" : "Primeros 3 segundos detienen el scroll", metric: "28%" },
        { title: isEn ? "Landing match" : "Coherencia landing", description: isEn ? "Headline and offer aligned to ad creative" : "Titular y oferta alineados al creativo", metric: "+34% CTR" },
        { title: isEn ? "Form completion" : "Completado formulario", description: isEn ? "Short forms on mobile-first layouts" : "Formularios cortos en layouts mobile-first", metric: "3.2x" },
        { title: isEn ? "CPL by audience" : "CPL por audiencia", description: isEn ? "Cold vs warm pools tracked separately" : "Pools fríos vs cálidos rastreados por separado", metric: "$47 avg." },
      ]),
      Retargeting: section("retargeting", isEn ? "Retargeting Sequences" : "Secuencias Retargeting", isEn ? "Stage-specific creative." : "Creativos por etapa.", "chart", [
        { title: isEn ? "Site Visitors" : "Visitantes", description: isEn ? "7-day and 30-day pools" : "Pools 7 y 30 días", metric: "4.5x" },
        { title: isEn ? "Engagers" : "Engagers", description: isEn ? "Video viewers and page engagers" : "Viewers de video e interacciones", metric: "3.2x" },
        { title: isEn ? "Cart Abandoners" : "Abandonos", description: isEn ? "Dynamic product ads" : "DPA dinámico", metric: "5.1x" },
        { title: isEn ? "Lead Form Starters" : "Inicios de Formulario", description: isEn ? "Reminder creative for partial submissions" : "Creativos recordatorio para envíos parciales", metric: "6.8x" },
      ]),
    };
  }

  return {};
}

function buildExtendedSections(slug: ServiceSeoSlug, locale: Locale, seo: ServiceSeoContent, variant: VisualVariant): Record<string, ServiceSectionData> {
  const isEn = locale === "en";
  const flagship = buildFlagshipSections(slug, locale, variant);
  if (Object.keys(flagship).length > 0) return flagship;

  switch (slug) {
    case "local-seo": {
      const c = localSeoContent[locale];
      return {
        LocalGbp: section("local-gbp", isEn ? "Google Business Profile" : "Perfil de Google Business", isEn ? "Map pack visibility starts here." : "La visibilidad en map pack empieza aquí.", "split", c.phases.slice(0, 2).map((p) => ({ title: p.title, description: p.desc, metric: p.metric }))),
        LocalCitations: section("local-citations", isEn ? "Citations & NAP" : "Citas y NAP", isEn ? "Consistent location signals." : "Señales de ubicación consistentes.", "chart", [{ title: isEn ? "Directory Audit" : "Auditoría directorios", description: isEn ? "45+ directories checked" : "45+ directorios", metric: isEn ? "Delivered by week 2" : "Entregado en semana 2" }, { title: isEn ? "NAP Cleanup" : "Limpieza NAP", description: isEn ? "Fix inconsistent data" : "Corregir inconsistencias", metric: isEn ? "All listings corrected" : "Todos los listados corregidos" }]),
        LocalPages: section(
          "local-pages",
          isEn ? "Location Pages" : "Páginas de Ubicación",
          isEn ? "Real market context, not templates." : "Contexto real, no plantillas.",
          "comparison",
          [
            {
              title: c.phases[2]?.title ?? (isEn ? "Citation and NAP Cleanup" : "Limpieza de Citas y NAP"),
              description: c.phases[2]?.desc ?? "",
              metric: isEn ? "45+ directories audited" : "45+ directorios auditados",
            },
            {
              title: c.phases[3]?.title ?? (isEn ? "Location Content and On-Page SEO" : "Contenido Local y SEO On-Page"),
              description: c.phases[3]?.desc ?? "",
              metric: isEn ? "Local-quality page builds" : "Páginas de calidad local",
            },
          ],
        ),
        LocalReviews: section("local-reviews", isEn ? "Review Strategy" : "Estrategia de Reseñas", isEn ? "Sustainable review generation." : "Generación sostenible de reseñas.", "dashboard", [{ title: isEn ? "Review velocity" : "Velocidad reseñas", description: isEn ? "Map pack ranking factor" : "Factor de ranking map pack", metric: "+280%" }, { title: isEn ? "Reporting" : "Informes", description: c.phases[4]?.desc ?? "", metric: c.phases[4]?.metric }]),
      };
    }
    case "ppc-management":
    case "paid-ads": {
      const c = paidAdsContent[locale];
      const channelHeaders = {
        col1: c.roasDashboard.headerChannel,
        col2: c.roasDashboard.headerStatus,
        col3: c.roasDashboard.headerRoas,
      };
      return {
        CampaignStructure: section("campaign-structure", isEn ? "Campaign Structure" : "Estructura de Campañas", c.budget.subtitle, "dashboard", c.budget.sources.map((s) => ({ title: s.source, description: isEn ? "Intent-segmented" : "Por intención", metric: "Active" })), {
          col1: isEn ? "Source" : "Fuente",
          col2: isEn ? "Approach" : "Enfoque",
          col3: isEn ? "Status" : "Estado",
        }),
        BudgetStrategy: section("budget-strategy", isEn ? "Budget Strategy" : "Estrategia de Presupuesto", c.budget.title, "chart", c.conversion.cards.map((x) => ({ title: x.label, description: x.desc, metric: x.metric }))),
        ChannelMix: section("channel-mix", isEn ? "Channel Mix" : "Mix de Canales", c.roasDashboard.subtitle, "dashboard", c.channels.map((x) => ({ title: x.channel, description: x.status, metric: "4.2x" })), channelHeaders),
        ChannelStrategy: section("channel-strategy", isEn ? "Channel Strategy" : "Estrategia de Canal", c.budget.title, "dashboard", c.channels.map((x) => ({ title: x.channel, description: x.status, metric: "4.2x" })), channelHeaders),
        CreativeTesting: section("creative-testing", isEn ? "Creative Testing" : "Pruebas Creativas", c.conversion.subtitle, "comparison", c.conversion.cards.slice(0, 2).map((x) => ({ title: x.label, description: x.desc, metric: x.metric }))),
        Attribution: section("attribution", isEn ? "Attribution & Tracking" : "Atribución y Tracking", c.roasDashboard.title, "chart", [{ title: "GA4 + GTM", description: isEn ? "Full conversion tracking" : "Tracking completo", metric: "Week 1" }, { title: "CRM Sync", description: isEn ? "Offline conversion import" : "Import offline", metric: "Live" }]),
        ConversionTracking: section("conversion-tracking", c.roasDashboard.title, c.roasDashboard.subtitle, "dashboard", c.channels.map((x) => ({ title: x.channel, description: x.status, metric: x.status === "scaling" ? "4.2x ROAS" : x.status === "optimizing" ? "On target" : "Testing" })), channelHeaders),
      };
    }
    case "cro": {
      const c = croContent[locale];
      return {
        AbTesting: section("ab-testing", c.testTrackerSection.title, c.testTrackerSection.subtitle, "comparison", c.testResults.slice(0, 4).map((t) => ({ title: t.test, description: t.winner, metric: t.lift }))),
        Heatmaps: section("heatmaps", c.metricsSection.title, c.metricsSection.subtitle, "chart", c.metricsSection.metrics.map((m) => ({ title: m.label, description: m.desc, metric: `${m.prefix ?? ""}${m.value}${m.suffix ?? ""}` }))),
        UXResearch: section("ux-research", c.methodSection.title, c.methodSection.subtitle, "split", c.methodSection.steps.map((s) => ({ title: s.title, description: s.desc }))),
      };
    }
    case "email-marketing": {
      const c = emailMarketingContent[locale];
      return {
        EmailSequences: section("email-sequences", c.sequenceSection.title, c.sequenceSection.subtitle, "dashboard", c.sequenceMap.slice(0, 4).map((r) => ({ title: r.action, description: r.day, metric: r.open })), {
          col1: c.sequenceSection.tableHeaders.email,
          col2: c.sequenceSection.tableHeaders.timing,
          col3: c.sequenceSection.tableHeaders.open,
        }),
        Automation: section("automation", c.automationSection.title, c.automationSection.subtitle, "chart", c.automationTypes.map((a) => ({ title: a.label, description: a.desc, metric: "Active" }))),
        ListGrowth: section("list-growth", c.metricsSection.title, c.metricsSection.subtitle, "comparison", c.metricsSection.metrics.map((m) => ({ title: m.label, description: m.desc, metric: `${m.value}${m.suffix ?? ""}` }))),
      };
    }
    case "content-marketing": {
      const c = contentMarketingContent[locale];
      return {
        ContentFunnel: section("content-funnel", c.funnel.title, c.funnel.subtitle, "chart", c.funnel.stages.map((s) => ({ title: s.stage, description: s.goal, metric: s.conversion }))),
        Production: section("production", c.production.title, c.production.subtitle, "split", c.production.contentTypes.map((t) => ({ title: t.label, description: t.impact, metric: t.output }))),
        Distribution: section("distribution", c.process.title, c.process.subtitle, "dashboard", c.process.phases.slice(3).map((p) => ({ title: p.title, description: p.desc, metric: p.metric }))),
      };
    }
    case "social-media": {
      const c = socialMediaContent[locale];
      return {
        PlatformStrategy: section("platform-strategy", c.platformSection.title, c.platformSection.subtitle, "dashboard", c.platformData.map((p) => ({ title: p.platform, description: p.format, metric: p.eng }))),
        ContentPillars: section("content-pillars", c.pillarSection.title, c.pillarSection.subtitle, "split", c.pillarContent.map((p) => ({ title: p.pillar, description: p.examples, metric: p.roi }))),
        Community: section("community", c.metricsSection.title, c.metricsSection.subtitle, "comparison", c.metricsSection.metrics.map((m) => ({ title: m.label, description: m.desc, metric: `${m.value}${m.suffix ?? ""}` }))),
      };
    }
    case "video-marketing": {
      const c = videoMarketingContent[locale];
      return {
        VideoProduction: section("video-production", c.productionSection.title, c.productionSection.subtitle, "mockup", c.productionPhases.map((t) => ({ title: t.phase, description: t.tasks, metric: t.duration }))),
        VideoDistribution: section("video-distribution", c.formatsSection.title, c.formatsSection.subtitle, "dashboard", c.videoTypes.map((t) => ({ title: t.type, description: t.platform, metric: t.length }))),
        VideoStrategy: section("video-strategy", c.processSection.title, c.processSection.subtitle, "split", c.phases.slice(0, 3).map((p) => ({ title: p.title, description: p.desc, metric: p.metric }))),
      };
    }
    case "branding": {
      const c = brandingContent[locale];
      return {
        BrandIdentity: section("brand-identity", c.evolution.title, c.evolution.subtitle, "comparison", c.evolution.phases.slice(0, 2).map((p) => ({ title: p.label, description: p.desc, metric: p.duration }))),
        VisualSystem: section("visual-system", c.identitySystem.title, c.identitySystem.subtitle, "mockup", c.identitySystem.layers.map((l) => ({ title: l.label, description: l.desc }))),
        BrandGuidelines: section("brand-guidelines", c.process.title, c.process.subtitle, "split", c.process.phases.slice(2).map((p) => ({ title: p.title, description: p.desc, metric: p.metric }))),
      };
    }
    case "analytics": {
      const c = analyticsContent[locale];
      return {
        DataStack: section("data-stack", c.stackSection.title, c.stackSection.subtitle, "dashboard", c.stackSection.items.map((i) => ({ title: i.title, description: i.desc, metric: "Live" }))),
        Dashboards: section("dashboards", c.dataWallSection.title, c.dataWallSection.subtitle, "chart", c.dataLayers.map((l) => ({ title: l.label, description: l.metric, metric: "Active" }))),
        Attribution: section("attribution", c.metricsSection.title, c.metricsSection.subtitle, "comparison", c.metricsSection.metrics.map((m) => ({ title: m.label, description: m.desc, metric: `${m.value}${m.suffix}` }))),
      };
    }
    case "growth-consulting": {
      const c = growthConsultingContent[locale];
      return {
        GrowthAudit: section("growth-audit", c.frameworkSection.title, c.frameworkSection.subtitle, "chart", c.frameworkSection.layers.map((d) => ({ title: d.layer, description: d.channels, metric: d.status }))),
        ChannelMix: section("channel-mix", c.metricsSection.title, c.metricsSection.subtitle, "dashboard", c.metricsSection.metrics.map((m) => ({ title: m.label, description: m.desc, metric: `${m.prefix ?? ""}${m.value}${m.suffix ?? ""}` }))),
        Roadmap: section("roadmap", c.roadmapSection.title, c.roadmapSection.subtitle, "split", c.roadmapSection.quarters.map((p) => ({ title: p.focus, description: p.actions, metric: p.quarter }))),
      };
    }
    case "funnels": {
      const c = funnelsContent[locale];
      const cro = croContent[locale];
      return {
        FunnelMapping: section("funnel-mapping", c.leadFlow.title, c.leadFlow.subtitle, "chart", c.flowStages.map((s) => ({ title: s.label, description: isEn ? "Mapped to your offer and sales cycle" : "Mapeado a tu oferta y ciclo de venta", metric: "Mapped" }))),
        Automation: section("automation", c.automation.title, c.automation.subtitle, "dashboard", c.automation.paths.map((p) => ({ title: p.trigger, description: p.actions, metric: p.delay }))),
        ConversionPaths: section("conversion-paths", c.components.title, c.components.subtitle, "split", c.components.items.map((i) => ({ title: i.label, description: i.desc, metric: "Active" }))),
        AbTesting: section("ab-testing", cro.testTrackerSection.title, cro.testTrackerSection.subtitle, "comparison", cro.testResults.slice(0, 4).map((t) => ({ title: t.test, description: t.winner, metric: t.lift }))),
        Heatmaps: section("heatmaps", cro.metricsSection.title, cro.metricsSection.subtitle, "chart", cro.metricsSection.metrics.map((m) => ({ title: m.label, description: m.desc, metric: `${m.prefix ?? ""}${m.value}${m.suffix ?? ""}` }))),
        UXResearch: section("ux-research", cro.methodSection.title, cro.methodSection.subtitle, "split", cro.methodSection.steps.map((s) => ({ title: s.title, description: s.desc }))),
      };
    }
    default:
      return fromDeliverables(seo, ["SectionOne", "SectionTwo", "SectionThree"], variant, slug);
  }
}

export function buildServiceSections(
  slug: ServiceSeoSlug,
  locale: Locale,
  seo: ServiceSeoContent,
  variant: VisualVariant,
  keys: string[],
): Record<string, ServiceSectionData> {
  const all = buildExtendedSections(slug, locale, seo, variant);
  return Object.fromEntries(keys.filter((k) => all[k]).map((k) => [k, all[k]]));
}

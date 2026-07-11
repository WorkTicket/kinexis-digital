import type { ServiceSeoContent } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";
import { getServiceSeoContent } from "@/content/service-seo";
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
import type { ServiceSectionData, ServiceSectionTableHeaders, VisualVariant } from "./types";
import type { ServiceSeoSlug } from "@/content/service-seo/types";
import { buildGenericRichSections } from "./generic-service-capabilities";
import { getGenericRichServiceContent } from "@/content/services/generic-rich-service-content";

type Point = { title: string; description: string; metric?: string };

function section(
  id: string,
  headline: string,
  subheadline: string | undefined,
  visualVariant: VisualVariant,
  points: Point[],
  tableHeaders?: ServiceSectionTableHeaders,
  body?: string,
  maxCards = 4,
): ServiceSectionData {
  return {
    id,
    headline,
    subheadline,
    visualVariant,
    points: points.slice(0, maxCards),
    tableHeaders,
    body,
    maxCards,
  };
}

function buildFlagshipSections(slug: ServiceSeoSlug, locale: Locale, _variant: VisualVariant): Record<string, ServiceSectionData> {
  const isEn = locale === "en";

  if (slug === "seo") {
    const c = seoContent[locale];
    return {
      SeoAudit: section(
        "seo-audit",
        isEn ? "Technical SEO Audit" : "Auditoría SEO Técnica",
        isEn ? "Find what's blocking your highest-value pages from ranking." : "Encuentra qué bloquea tus páginas de mayor valor.",
        "content",
        [
          { title: isEn ? "Crawl & Indexation" : "Rastreo e Indexación", description: isEn ? "Orphan pages, redirect chains, and index bloat fixed in priority order." : "Páginas huérfanas, cadenas de redirección e inflación de índice corregidas por prioridad." },
          { title: isEn ? "Core Web Vitals" : "Core Web Vitals", description: isEn ? "LCP, CLS, and mobile usability tied to the pages that sell." : "LCP, CLS y usabilidad móvil ligados a las páginas que venden." },
          { title: isEn ? "Schema & Structured Data" : "Schema y Datos Estructurados", description: isEn ? "Markup on priority pages so search engines understand your offers." : "Marcado en páginas prioritarias para que los buscadores entiendan tus ofertas." },
        ],
        undefined,
        c.capabilityBodies.seoAudit,
        4,
      ),
      RankingStrategy: section(
        "ranking-strategy",
        c.keywordMatrixTitle,
        c.keywordMatrixSubtitle,
        "dashboard",
        c.keywordMatrix.slice(0, 4).map((k) => ({ title: k.keyword, description: k.desc, metric: k.type })),
        {
          col1: c.keywordColKeyword,
          col2: c.keywordColType,
          col3: isEn ? "Intent signal" : "Señal de intención",
        },
        c.capabilityBodies.rankingStrategy,
        4,
      ),
      ContentStrategy: section(
        "content-strategy",
        isEn ? "Content & Technical SEO" : "Contenido y SEO Técnico",
        c.ecosystemSubtitle,
        "chart",
        c.ecosystemNodes.slice(0, 4).map((n) => ({ title: n.label, description: n.desc })),
        undefined,
        c.capabilityBodies.contentStrategy,
        4,
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
      CampaignArchitecture: section(
        "campaign-architecture",
        c.budget.title,
        c.budget.subtitle,
        "dashboard",
        c.budget.sources.slice(0, 4).map((s) => ({ title: s.source, description: isEn ? "Intent-segmented campaign" : "Campaña por intención" })),
        {
          col1: isEn ? "Source" : "Fuente",
          col2: isEn ? "Approach" : "Enfoque",
          col3: isEn ? "Status" : "Estado",
        },
        c.capabilityBodies.campaignArchitecture,
        4,
      ),
      KeywordResearch: section(
        "keyword-research",
        isEn ? "Keyword Research & Negatives" : "Palabras Clave y Negativas",
        isEn ? "High-intent targets with weekly search term discipline." : "Objetivos de alta intención con disciplina semanal.",
        "chart",
        [
          { title: isEn ? "Brand Terms" : "Términos de Marca", description: isEn ? "Protect branded searches" : "Protege búsquedas de marca" },
          { title: isEn ? "Commercial Intent" : "Intención Comercial", description: isEn ? "Buyer-intent queries only" : "Solo consultas con intención de compra" },
          { title: isEn ? "Negative Lists" : "Listas Negativas", description: isEn ? "Weekly irrelevant query blocking" : "Bloqueo semanal de consultas irrelevantes" },
        ],
        undefined,
        c.capabilityBodies.keywordResearch,
        4,
      ),
      ConversionTracking: section(
        "conversion-tracking",
        c.roasDashboard.title,
        c.roasDashboard.subtitle,
        "dashboard",
        c.channels.slice(0, 4).map((x) => ({ title: x.channel, description: x.status })),
        channelHeaders,
        c.capabilityBodies.conversionTracking,
        4,
      ),
    };
  }

  if (slug === "paid-ads") {
    const c = paidAdsContent[locale];
    const channelHeaders = {
      col1: c.roasDashboard.headerChannel,
      col2: c.roasDashboard.headerStatus,
      col3: c.roasDashboard.headerRoas,
    };
    return {
      ChannelStrategy: section(
        "channel-strategy",
        isEn ? "Channel Strategy & Selection" : "Estrategia y Selección de Canal",
        isEn ? "Platform picks based on buyer behavior, not hype." : "Elección de plataforma según comportamiento del comprador, no hype.",
        "dashboard",
        c.channels.slice(0, 4).map((x) => ({ title: x.channel, description: x.status })),
        channelHeaders,
        c.capabilityBodies.channelStrategy,
        4,
      ),
      CampaignStructure: section(
        "campaign-structure",
        c.budget.title,
        c.budget.subtitle,
        "chart",
        c.budget.sources.slice(0, 4).map((s) => ({ title: s.source, description: isEn ? "Intent-segmented build" : "Construcción por intención" })),
        undefined,
        c.capabilityBodies.campaignArchitecture,
        4,
      ),
      Attribution: section(
        "attribution",
        isEn ? "Attribution & CRM Alignment" : "Atribución y Alineación CRM",
        isEn ? "Dashboards and pipeline that tell the same story." : "Dashboards y pipeline que cuentan la misma historia.",
        "dashboard",
        c.conversion.cards.slice(0, 4).map((x) => ({ title: x.label, description: x.desc })),
        undefined,
        c.capabilityBodies.attribution,
        4,
      ),
    };
  }

  if (slug === "ppc-management") {
    const c = paidAdsContent[locale];
    const channelHeaders = {
      col1: c.roasDashboard.headerChannel,
      col2: c.roasDashboard.headerStatus,
      col3: c.roasDashboard.headerRoas,
    };
    return {
      CampaignArchitecture: section(
        "campaign-architecture",
        c.budget.title,
        c.budget.subtitle,
        "dashboard",
        c.budget.sources.slice(0, 4).map((s) => ({ title: s.source, description: isEn ? "Intent-segmented campaign" : "Campaña por intención" })),
        {
          col1: isEn ? "Source" : "Fuente",
          col2: isEn ? "Approach" : "Enfoque",
          col3: isEn ? "Status" : "Estado",
        },
        c.capabilityBodies.campaignArchitecture,
        4,
      ),
      KeywordResearch: section(
        "keyword-research",
        isEn ? "Keyword Research & Negatives" : "Palabras Clave y Negativas",
        isEn ? "High-intent targets with weekly search term discipline." : "Objetivos de alta intención con disciplina semanal.",
        "chart",
        [
          { title: isEn ? "Brand Terms" : "Términos de Marca", description: isEn ? "Protect branded searches" : "Protege búsquedas de marca" },
          { title: isEn ? "Commercial Intent" : "Intención Comercial", description: isEn ? "Buyer-intent queries only" : "Solo consultas con intención de compra" },
          { title: isEn ? "Negative Lists" : "Listas Negativas", description: isEn ? "Weekly irrelevant query blocking" : "Bloqueo semanal de consultas irrelevantes" },
        ],
        undefined,
        c.capabilityBodies.keywordResearch,
        4,
      ),
      ChannelMix: section(
        "channel-mix",
        isEn ? "Cross-Channel Budget Mix" : "Mix de Presupuesto Multicanal",
        c.roasDashboard.subtitle,
        "dashboard",
        c.channels.slice(0, 4).map((x) => ({ title: x.channel, description: x.status })),
        channelHeaders,
        c.capabilityBodies.channelMix,
        4,
      ),
    };
  }

  if (slug === "web-design") {
    const c = webDesignContent[locale];
    return {
      UxAudit: section(
        "ux-audit",
        c.beforeAfterTitle,
        c.beforeAfterSubtitle,
        "comparison",
        c.beforeAfters.slice(0, 4).map((ba) => ({ title: ba.headline, description: ba.beforeDetails[0] })),
        undefined,
        c.capabilityBodies.uxAudit,
        4,
      ),
      ConversionOptimization: section(
        "conversion-optimization",
        isEn ? "Conversion Optimization" : "Optimización de Conversión",
        isEn ? "Layout choices tied to one goal." : "Decisiones de diseño con un solo objetivo.",
        "comparison",
        [
          { title: isEn ? "Above-fold CTA" : "CTA above fold", description: isEn ? "Primary action without scroll" : "Acción sin scroll" },
          { title: isEn ? "Trust signals" : "Señales de confianza", description: isEn ? "Logos and testimonials first" : "Logos y testimonios primero" },
          { title: isEn ? "Form friction audit" : "Auditoría de fricción en formularios", description: isEn ? "Fields cut to what sales actually needs" : "Campos reducidos a lo que ventas necesita" },
          { title: isEn ? "Scroll-depth CTAs" : "CTAs por profundidad", description: isEn ? "Secondary actions placed where engaged visitors look next" : "Acciones secundarias donde los visitantes comprometidos miran después" },
        ],
        undefined,
        c.capabilityBodies.conversionOptimization,
        4,
      ),
    };
  }

  if (slug === "meta-ads") {
    const m = metaAdsPageContent[locale];
    return {
      CreativeTesting: section(
        "creative-testing",
        isEn ? "Creative Testing Program" : "Programa de Pruebas Creativas",
        isEn ? "New ads every two weeks. Fatigue is predictable. We stay ahead of it." : "Anuncios nuevos cada dos semanas.",
        "comparison",
        [
          { title: isEn ? "Static & Video" : "Estático y Video", description: isEn ? "UGC, carousel, short-form" : "UGC, carrusel, corto" },
          { title: isEn ? "Hook Testing" : "Prueba de Hooks", description: isEn ? "Headline splits with kill rules" : "Divisiones con reglas de corte" },
          { title: isEn ? "Fatigue cadence" : "Cadencia anti-fatiga", description: isEn ? "Fresh creative on a two-week rotation" : "Creativo nuevo cada dos semanas" },
          { title: isEn ? "Creative reporting" : "Informes de creativo", description: isEn ? "Winners, losers, and next tests on a fixed cadence" : "Ganadores, perdedores y próximos tests en cadencia fija" },
        ],
        undefined,
        m.capabilityBodies.creativeTesting,
        4,
      ),
      AudienceTargeting: section(
        "audience-targeting",
        isEn ? "Audience Targeting" : "Segmentación",
        isEn ? "Clean prospecting and retargeting." : "Prospección y retargeting limpios.",
        "dashboard",
        [
          { title: "Lookalikes", description: isEn ? "CRM purchaser seeds" : "Semillas de compradores CRM" },
          { title: "Interest Stacks", description: isEn ? "Layered with exclusions" : "Capas con exclusiones" },
          { title: isEn ? "Retargeting pools" : "Pools de retargeting", description: isEn ? "7-day and 30-day site visitors" : "Visitantes del sitio a 7 y 30 días" },
          { title: isEn ? "Exclusion lists" : "Listas de exclusión", description: isEn ? "Customers and converters kept out of prospecting" : "Clientes y convertidos fuera de prospección" },
        ],
        undefined,
        m.capabilityBodies.audienceTargeting,
        4,
      ),
      Retargeting: section(
        "retargeting",
        isEn ? "Retargeting Sequences" : "Secuencias Retargeting",
        isEn ? "Stage-specific creative." : "Creativos por etapa.",
        "chart",
        [
          { title: isEn ? "Site Visitors" : "Visitantes", description: isEn ? "7-day and 30-day pools" : "Pools 7 y 30 días" },
          { title: isEn ? "Engagers" : "Engagers", description: isEn ? "Video viewers and page engagers" : "Viewers de video e interacciones" },
          { title: isEn ? "Cart abandoners" : "Abandono de carrito", description: isEn ? "Offer-led creative by time since visit" : "Creativo por oferta según tiempo desde la visita" },
          { title: isEn ? "Post-purchase" : "Post-compra", description: isEn ? "Upsell and review asks timed to delivery" : "Upsell y reseñas programados al envío" },
        ],
        undefined,
        m.capabilityBodies.retargeting,
        4,
      ),
    };
  }

  if (slug === "email-marketing") {
    const c = emailMarketingContent[locale];
    return {
      EmailSequences: section(
        "email-sequences",
        c.sequenceSection.title,
        c.sequenceSection.subtitle,
        "dashboard",
        c.sequenceMap.slice(0, 4).map((r) => ({ title: r.action, description: r.day, metric: r.open })),
        {
          col1: c.sequenceSection.tableHeaders.email,
          col2: c.sequenceSection.tableHeaders.timing,
          col3: c.sequenceSection.tableHeaders.open,
        },
        c.capabilityBodies.emailSequences,
        4,
      ),
      Automation: section(
        "automation",
        c.automationSection.title,
        c.automationSection.subtitle,
        "chart",
        c.automationTypes.slice(0, 4).map((a) => ({ title: a.label, description: a.desc })),
        undefined,
        c.capabilityBodies.automation,
        4,
      ),
      ListGrowth: section(
        "list-growth",
        c.metricsSection.title,
        c.metricsSection.subtitle,
        "comparison",
        c.metricsSection.metrics.slice(0, 4).map((m) => ({ title: m.label, description: m.desc, metric: `${m.prefix ?? ""}${m.value}${m.suffix ?? ""}` })),
        undefined,
        c.capabilityBodies.listGrowth,
        4,
      ),
    };
  }

  if (slug === "content-marketing") {
    const c = contentMarketingContent[locale];
    return {
      ContentFunnel: section("content-funnel", c.funnel.title, c.funnel.subtitle, "chart", c.funnel.stages.slice(0, 4).map((s) => ({ title: s.stage, description: s.goal, metric: s.conversion })), undefined, c.capabilityBodies.contentFunnel, 4),
      Production: section("production", c.production.title, c.production.subtitle, "split", c.production.contentTypes.slice(0, 4).map((t) => ({ title: t.label, description: t.impact, metric: t.output })), undefined, c.capabilityBodies.production, 4),
      Distribution: section("distribution", isEn ? "Distribution & Amplification" : "Distribución y Amplificación", isEn ? "Every piece promoted beyond organic search." : "Cada pieza promovida más allá de búsqueda orgánica.", "dashboard", [{ title: isEn ? "Email promotion" : "Promoción email", description: isEn ? "Newsletter and nurture sends per piece" : "Envíos en newsletter y nurture por pieza" }, { title: isEn ? "Social syndication" : "Sindicación social", description: isEn ? "8–12 derivative assets per article" : "8–12 activos derivados por artículo" }, { title: isEn ? "Outreach & partnerships" : "Outreach y alianzas", description: isEn ? "Placements and mentions that extend reach beyond owned channels" : "Menciones y colocaciones que extienden el alcance más allá de canales propios" }, { title: isEn ? "Repurposing calendar" : "Calendario de repurposing", description: isEn ? "One article becomes clips, posts, and email angles on schedule" : "Un artículo se convierte en clips, posts y ángulos de email con calendario" }], undefined, c.capabilityBodies.distribution, 4),
    };
  }

  if (slug === "social-media") {
    const c = socialMediaContent[locale];
    return {
      PlatformStrategy: section("platform-strategy", c.platformSection.title, c.platformSection.subtitle, "dashboard", c.platformData.slice(0, 4).map((p) => ({ title: p.platform, description: p.format, metric: p.eng })), undefined, c.capabilityBodies.platformStrategy, 4),
      ContentPillars: section("content-pillars", c.pillarSection.title, c.pillarSection.subtitle, "split", c.pillarContent.slice(0, 4).map((p) => ({ title: p.pillar, description: p.examples, metric: p.roi })), undefined, c.capabilityBodies.contentPillars, 4),
      Community: section("community", c.metricsSection.title, c.metricsSection.subtitle, "comparison", c.metricsSection.metrics.slice(0, 4).map((m) => ({ title: m.label, description: m.desc, metric: `${m.prefix ?? ""}${m.value}${m.suffix ?? ""}` })), undefined, c.capabilityBodies.community, 4),
    };
  }

  if (slug === "video-marketing") {
    const c = videoMarketingContent[locale];
    return {
      VideoProduction: section("video-production", c.productionSection.title, c.productionSection.subtitle, "mockup", c.productionPhases.slice(0, 4).map((t) => ({ title: t.phase, description: t.tasks, metric: t.duration })), undefined, c.capabilityBodies.videoProduction, 4),
      VideoDistribution: section("video-distribution", c.formatsSection.title, c.formatsSection.subtitle, "dashboard", c.videoTypes.slice(0, 4).map((t) => ({ title: t.type, description: t.platform, metric: t.length })), undefined, c.capabilityBodies.videoDistribution, 4),
      VideoStrategy: section("video-strategy", c.processSection.title, c.processSection.subtitle, "split", c.metricsSection.metrics.slice(0, 4).map((m) => ({ title: m.label, description: m.desc, metric: `${m.prefix ?? ""}${m.value}${m.suffix ?? ""}` })), undefined, c.capabilityBodies.videoStrategy, 4),
    };
  }

  if (slug === "branding") {
    const c = brandingContent[locale];
    return {
      BrandIdentity: section("brand-identity", c.evolution.title, c.evolution.subtitle, "comparison", c.evolution.phases.slice(0, 4).map((p) => ({ title: p.label, description: p.desc, metric: p.duration })), undefined, c.capabilityBodies.brandIdentity, 4),
      VisualSystem: section("visual-system", c.identitySystem.title, c.identitySystem.subtitle, "mockup", c.identitySystem.layers.slice(0, 4).map((l) => ({ title: l.label, description: l.desc })), undefined, c.capabilityBodies.visualSystem, 4),
      BrandGuidelines: section("brand-guidelines", c.process.title, c.process.subtitle, "split", [{ title: isEn ? "Brand guidelines doc" : "Documento de guías", description: isEn ? "Usage rules your team references" : "Reglas de uso que tu equipo consulta" }, { title: isEn ? "Digital templates" : "Plantillas digitales", description: isEn ? "Web, email, and social assets" : "Activos web, email y social" }, { title: isEn ? "Rollout & training" : "Implementación y capacitación", description: isEn ? "Walkthrough so the team applies the brand consistently" : "Sesión para que el equipo aplique la marca con consistencia" }, { title: isEn ? "Asset library setup" : "Biblioteca de activos", description: isEn ? "Organized files your team can grab without asking design" : "Archivos organizados que tu equipo usa sin pedir a diseño" }], undefined, c.capabilityBodies.brandGuidelines, 4),
    };
  }

  if (slug === "analytics") {
    const c = analyticsContent[locale];
    return {
      DataStack: section("data-stack", c.stackSection.title, c.stackSection.subtitle, "dashboard", c.stackSection.items.map((i) => ({ title: i.title, description: i.desc })), undefined, c.capabilityBodies.dataStack, 4),
      Dashboards: section("dashboards", c.dataWallSection.title, c.dataWallSection.subtitle, "chart", c.dataLayers.slice(0, 4).map((l) => ({ title: l.label, description: l.metric })), undefined, c.capabilityBodies.dashboards, 4),
      Attribution: section("attribution", c.metricsSection.title, c.metricsSection.subtitle, "comparison", c.metricsSection.metrics.slice(0, 4).map((m) => ({ title: m.label, description: m.desc, metric: `${m.value}${m.suffix}` })), undefined, c.capabilityBodies.attribution, 4),
    };
  }

  if (slug === "growth-consulting") {
    const c = growthConsultingContent[locale];
    return {
      GrowthAudit: section("growth-audit", c.frameworkSection.title, c.frameworkSection.subtitle, "chart", c.frameworkSection.layers.slice(0, 4).map((d) => ({ title: d.layer, description: d.channels, metric: d.status })), undefined, c.capabilityBodies.growthAudit, 4),
      ChannelMix: section("channel-mix", c.metricsSection.title, c.metricsSection.subtitle, "dashboard", c.metricsSection.metrics.slice(0, 4).map((m) => ({ title: m.label, description: m.desc, metric: `${m.prefix ?? ""}${m.value}${m.suffix ?? ""}` })), undefined, c.capabilityBodies.channelMix, 4),
      Roadmap: section("roadmap", c.roadmapSection.title, c.roadmapSection.subtitle, "split", c.roadmapSection.quarters.slice(0, 4).map((p) => ({ title: p.focus, description: p.actions, metric: p.quarter })), undefined, c.capabilityBodies.roadmap, 4),
    };
  }

  if (slug === "funnels") {
    const c = funnelsContent[locale];
    return {
      FunnelMapping: section("funnel-mapping", c.leadFlow.title, c.leadFlow.subtitle, "chart", c.flowStages.slice(0, 4).map((s) => ({ title: s.label, description: isEn ? "Mapped to your offer" : "Mapeado a tu oferta" })), undefined, c.capabilityBodies.funnelMapping, 4),
      Automation: section("automation", c.automation.title, c.automation.subtitle, "dashboard", c.automation.paths.slice(0, 4).map((p) => ({ title: p.trigger, description: p.actions, metric: p.delay })), undefined, c.capabilityBodies.automation, 4),
      ConversionPaths: section("conversion-paths", c.components.title, c.components.subtitle, "split", c.components.items.slice(0, 4).map((i) => ({ title: i.label, description: i.desc })), undefined, c.capabilityBodies.conversionPaths, 4),
    };
  }

  if (slug === "landing-pages") {
    const c = landingPagesContent[locale];
    const items = getServiceSeoContent("landing-pages", locale).deliverables.items;
    return {
      StrategyDesign: section(
        "strategy-design",
        isEn ? "Strategy & Design" : "Estrategia y Diseño",
        isEn ? "Wireframes and visual hierarchy mapped to one conversion goal." : "Wireframes y jerarquía visual mapeados a un solo objetivo de conversión.",
        "comparison",
        items.slice(0, 4).map((item) => ({ title: item.title, description: item.description })),
        undefined,
        c.capabilityBodies.strategyDesign,
        4,
      ),
      BuildCopy: section(
        "build-copy",
        isEn ? "Build & Copy" : "Build y Copy",
        isEn ? "Fast development and conversion copy that qualifies before it sells." : "Desarrollo rápido y copy de conversión que califica antes de vender.",
        "mockup",
        items.slice(4, 8).map((item) => ({ title: item.title, description: item.description })),
        undefined,
        c.capabilityBodies.buildCopy,
        4,
      ),
      TrackingTesting: section(
        "tracking-testing",
        isEn ? "Tracking & Testing" : "Tracking y Pruebas",
        isEn ? "Every conversion captured, then tested with statistical discipline." : "Cada conversión capturada, luego probada con rigor estadístico.",
        "chart",
        items.slice(8, 12).map((item) => ({ title: item.title, description: item.description })),
        undefined,
        c.capabilityBodies.trackingTesting,
        4,
      ),
    };
  }

  if (slug === "copywriting") {
    const c = copywritingContent[locale];
    const items = getServiceSeoContent("copywriting", locale).deliverables.items;
    return {
      VoiceMessaging: section(
        "voice-messaging",
        isEn ? "Voice & Messaging" : "Voz y Mensajes",
        isEn ? "A usable guide so every piece sounds like the same company wrote it." : "Una guía usable para que cada pieza suene escrita por la misma empresa.",
        "content",
        items.slice(0, 4).map((item) => ({ title: item.title, description: item.description })),
        undefined,
        c.capabilityBodies.voiceMessaging,
        4,
      ),
      ConversionCopy: section(
        "conversion-copy",
        isEn ? "Conversion Copy" : "Copy de Conversión",
        isEn ? "Pages and emails written to qualify, answer objections, and ask once." : "Páginas y emails que califican, responden objeciones y piden una acción.",
        "split",
        items.slice(4, 8).map((item) => ({ title: item.title, description: item.description })),
        undefined,
        c.capabilityBodies.conversionCopy,
        4,
      ),
      ChannelCopy: section(
        "channel-copy",
        isEn ? "Ads, Sales & Optimization" : "Ads, Ventas y Optimización",
        isEn ? "Channel-native hooks plus rewrites that sharpen what already exists." : "Hooks nativos por canal más reescrituras que afilan lo que ya existe.",
        "chart",
        items.slice(8, 12).map((item) => ({ title: item.title, description: item.description })),
        undefined,
        c.capabilityBodies.channelCopy,
        4,
      ),
    };
  }

  if (slug === "youtube-ads") {
    const c = youtubeAdsContent[locale];
    const items = getServiceSeoContent("youtube-ads", locale).deliverables.items;
    return {
      CampaignStrategy: section(
        "campaign-strategy",
        isEn ? "Campaign & Targeting" : "Campaña y Segmentación",
        isEn ? "Placement architecture and audience pools built before spend scales." : "Arquitectura de placements y pools de audiencia antes de escalar el gasto.",
        "dashboard",
        items.slice(0, 4).map((item) => ({ title: item.title, description: item.description })),
        undefined,
        c.capabilityBodies.campaignStrategy,
        4,
      ),
      CreativeProduction: section(
        "creative-production",
        isEn ? "Creative & Landing Pages" : "Creativo y Landing Pages",
        isEn ? "Skip-proof hooks and post-click pages matched to the ad promise." : "Hooks a prueba de skip y páginas post-clic alineadas a la promesa del anuncio.",
        "comparison",
        items.slice(4, 8).map((item) => ({ title: item.title, description: item.description })),
        undefined,
        c.capabilityBodies.creativeProduction,
        4,
      ),
      TrackingOptimization: section(
        "tracking-optimization",
        isEn ? "Tracking & Optimization" : "Tracking y Optimización",
        isEn ? "Attribution you can trust and weekly improvements tied to CPA." : "Atribución confiable y mejoras semanales ligadas al CPA.",
        "chart",
        items.slice(8, 12).map((item) => ({ title: item.title, description: item.description })),
        undefined,
        c.capabilityBodies.trackingOptimization,
        4,
      ),
    };
  }

  const genericRich = getGenericRichServiceContent(slug, locale);
  if (genericRich) {
    return buildGenericRichSections(slug, locale, genericRich.capabilityBodies);
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
        LocalGbp: section(
          "local-gbp",
          isEn ? "Google Business Profile" : "Perfil de Google Business",
          isEn ? "Map pack visibility starts here." : "La visibilidad en map pack empieza aquí.",
          "content",
          [
            { title: isEn ? "Category & services" : "Categoría y servicios", description: isEn ? "Primary and secondary categories matched to how locals search." : "Categorías primarias y secundarias alineadas a búsquedas locales." },
            { title: isEn ? "Photos & posts" : "Fotos y publicaciones", description: isEn ? "Weekly updates that signal an active, trustworthy business." : "Actualizaciones semanales que señalan un negocio activo y confiable." },
            { title: isEn ? "Q&A & service areas" : "Preguntas y zonas de servicio", description: isEn ? "Profile fields optimized for the queries that drive map pack clicks." : "Campos del perfil optimizados para las consultas que generan clics en map pack." },
            { title: isEn ? "Booking & messaging" : "Reservas y mensajes", description: isEn ? "Appointment links and message flows that convert profile views." : "Enlaces de cita y mensajes que convierten vistas del perfil." },
          ],
          undefined,
          c.capabilityBodies.localGbp,
          3,
        ),
        LocalCitations: section(
          "local-citations",
          isEn ? "Citations, NAP & Location Pages" : "Citas, NAP y Páginas Locales",
          isEn ? "Consistent location signals and pages built for real markets." : "Señales de ubicación consistentes y páginas para mercados reales.",
          "split",
          [
            { title: isEn ? "Directory audit" : "Auditoría de directorios", description: isEn ? "45+ directories checked and prioritized for cleanup." : "45+ directorios revisados y priorizados para limpieza." },
            { title: isEn ? "NAP cleanup" : "Limpieza NAP", description: isEn ? "Name, address, and phone data corrected across listings." : "Nombre, dirección y teléfono corregidos en listados." },
            { title: isEn ? "Location pages" : "Páginas de ubicación", description: isEn ? "City and neighborhood pages with local content and schema." : "Páginas por ciudad y zona con contenido local y schema." },
            { title: isEn ? "Geo internal links" : "Enlaces internos locales", description: isEn ? "Service and area pages wired so authority flows to money pages." : "Páginas de servicio y zona conectadas para pasar autoridad." },
          ],
          undefined,
          c.capabilityBodies.localCitations,
          3,
        ),
        LocalReviews: section(
          "local-reviews",
          isEn ? "Reviews & Reporting" : "Reseñas e Informes",
          isEn ? "Review velocity tied to rankings you can report on." : "Velocidad de reseñas ligada a rankings que puedes reportar.",
          "chart",
          [
            { title: isEn ? "Review velocity" : "Velocidad de reseñas", description: isEn ? "Steady generation process tied to map pack movement." : "Proceso constante ligado a movimiento en map pack." },
            { title: isEn ? "Call tracking" : "Seguimiento de llamadas", description: isEn ? "Map pack rankings connected to booked jobs." : "Rankings en map pack conectados a trabajos reservados." },
            { title: isEn ? "Monthly local report" : "Informe local mensual", description: isEn ? "Rankings, calls, and review trends in one view." : "Rankings, llamadas y tendencias de reseñas en una sola vista." },
            { title: isEn ? "Review response playbook" : "Playbook de respuestas", description: isEn ? "Templates and timing so every review gets a professional reply." : "Plantillas y tiempos para responder cada reseña con profesionalismo." },
          ],
          undefined,
          c.capabilityBodies.localReviews,
          3,
        ),
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
        CreativeTesting: section("creative-testing", isEn ? "Creative Testing" : "Pruebas Creativas", c.conversion.subtitle, "comparison", c.conversion.cards.slice(0, 4).map((x) => ({ title: x.label, description: x.desc, metric: x.metric })), undefined, undefined, 4),
        Attribution: section("attribution", isEn ? "Attribution & Tracking" : "Atribución y Tracking", c.roasDashboard.title, "chart", [
          { title: "GA4 + GTM", description: isEn ? "Full conversion tracking" : "Tracking completo", metric: "Week 1" },
          { title: "CRM Sync", description: isEn ? "Offline conversion import" : "Import offline", metric: "Live" },
          { title: isEn ? "Call tracking" : "Seguimiento de llamadas", description: isEn ? "Source-tagged phone leads" : "Llamadas etiquetadas por fuente", metric: isEn ? "Week 2" : "Semana 2" },
          { title: isEn ? "Offline conversions" : "Conversiones offline", description: isEn ? "CRM pipeline stages imported for closed-loop reporting" : "Etapas del CRM importadas para informes cerrados", metric: isEn ? "Week 3" : "Semana 3" },
        ], undefined, undefined, 4),
        ConversionTracking: section("conversion-tracking", c.roasDashboard.title, c.roasDashboard.subtitle, "dashboard", c.channels.map((x) => ({ title: x.channel, description: x.status, metric: x.status === "scaling" ? "4.2x ROAS" : x.status === "optimizing" ? "On target" : "Testing" })), channelHeaders),
      };
    }
    case "cro": {
      const c = croContent[locale];
      return {
        AbTesting: section(
          "ab-testing",
          c.testTrackerSection.title,
          c.testTrackerSection.subtitle,
          "comparison",
          c.testResults.slice(0, 4).map((t) => ({ title: t.test, description: t.winner, metric: t.lift })),
          undefined,
          c.capabilityBodies.abTesting,
          3,
        ),
        Heatmaps: section(
          "heatmaps",
          c.metricsSection.title,
          c.metricsSection.subtitle,
          "chart",
          c.metricsSection.metrics.slice(0, 4).map((m) => ({ title: m.label, description: m.desc, metric: `${m.prefix ?? ""}${m.value}${m.suffix ?? ""}` })),
          undefined,
          c.capabilityBodies.heatmaps,
          3,
        ),
        UXResearch: section(
          "ux-research",
          c.methodSection.title,
          c.methodSection.subtitle,
          "split",
          c.methodSection.steps.slice(0, 4).map((s) => ({ title: s.title, description: s.desc })),
          undefined,
          c.capabilityBodies.uxResearch,
          4,
        ),
      };
    }
    default:
      return {};
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

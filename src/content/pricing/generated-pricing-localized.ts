import type { FAQItem } from "@/components/sections/FAQSection";
import type { PricingSlug } from "@/content/registry/site-routes";
import type { Locale } from "@/i18n/routing";
import type { PricingPageContent } from "@/content/pricing/pricing-pages";

type GeneratedOverride = Pick<
  PricingPageContent,
  "hero" | "answerBlock" | "metaTitle" | "metaDescription" | "ctaHeadline" | "ctaSubtitle" | "ctaLabel"
>;

const EN_OVERRIDES: Partial<Record<PricingSlug, GeneratedOverride>> = {
  "local-seo": {
    metaTitle: "Local SEO Pricing | Plans from $1,500/mo | KINEXIS",
    metaDescription:
      "Local SEO pricing for map pack visibility. GBP, citations, reviews, and location pages from $1,500/mo. Month to month, fixed scope at each tier.",
    hero: {
      label: "Local SEO Pricing",
      line1: "Map pack pricing",
      line2: "for businesses that win on proximity.",
      subtitle:
        "GBP, citations, reviews, and location pages at fixed scope per tier. Not a watered-down version of full SEO.",
    },
    answerBlock:
      "Local SEO plans start at $1,500 per month for single-location service businesses and scale to $5,000+ for multi-city or franchise operators. Every plan covers Google Business Profile optimization, citation cleanup, review strategy, and location page work. Full-site SEO with content and link building is a separate program — see SEO pricing. Most clients see map pack movement within 30 to 60 days. We work month to month.",
    ctaHeadline: "Want a quote for local SEO?",
    ctaSubtitle: "Tell us your service areas and competition.|We will recommend the right tier and map pack strategy.",
    ctaLabel: "Get Local SEO Pricing",
  },
  "content-marketing": {
    metaTitle: "Content Marketing Pricing | From $2,000/mo | KINEXIS",
    metaDescription:
      "Content marketing pricing for standalone production retainers. 4 to 20+ SEO-informed pieces per month. Fixed scope, no hidden fees, month to month.",
    hero: {
      label: "Content Marketing Pricing",
      line1: "Production pricing",
      line2: "when SEO is handled elsewhere.",
      subtitle:
        "Standalone article and landing page retainers for teams that need volume without a full SEO program. Fixed deliverables at each tier.",
    },
    answerBlock:
      "Content marketing retainers start at $2,000 per month for 4 to 6 SEO-informed pieces and scale to $8,000+ for 20+ pieces with editorial leadership. This is production and strategy — not a substitute for technical SEO or link building. Full SEO programs include content at every tier ($2,500/mo entry). Per-piece pricing available for project work. First pieces typically publish within 3 to 4 weeks.",
    ctaHeadline: "Want a content marketing quote?",
    ctaSubtitle: "Tell us your industry, volume needs, and goals.|We will scope the right retainer tier.",
    ctaLabel: "Get Content Marketing Pricing",
  },
  funnels: {
    metaTitle: "Funnels & CRO Pricing | Builds from $5,000 | KINEXIS",
    metaDescription:
      "Funnel and CRO pricing with one-time builds from $5,000 and optimization retainers from $6,500/mo. Landing pages, automation, and A/B testing at fixed scope.",
    hero: {
      label: "Funnels & CRO Pricing",
      line1: "Funnel builds and CRO",
      line2: "priced as one system.",
      subtitle:
        "Landing pages, nurture automation, and structured testing under fixed scope — not disconnected one-off projects.",
    },
    answerBlock:
      "Funnel and CRO programs start at $5,000 for a single build with landing page, five-email nurture sequence, and conversion tracking setup. Ongoing optimization retainers run $6,500 to $12,000+ per month depending on traffic volume and test scope. Starter is a one-time project fee; Growth and Scale are monthly retainers. Every plan covers funnel architecture, landing pages, automation, and A/B testing. Ad spend is separate. First meaningful test results typically show within 60 to 90 days. Retainers are month to month.",
    ctaHeadline: "Want a funnel and CRO quote?",
    ctaSubtitle: "Share your traffic, offer, and conversion goals.|We will recommend build vs retainer scope.",
    ctaLabel: "Get Funnels & CRO Pricing",
  },
  analytics: {
    metaTitle: "Marketing Analytics Pricing | Setup from $3,000 | KINEXIS",
    metaDescription:
      "Marketing analytics pricing: one-time GA4 and dashboard setup from $3,000, reporting retainers from $3,500/mo. Fixed scope, month to month on retainers.",
    hero: {
      label: "Marketing Analytics Pricing",
      line1: "Analytics setup that",
      line2: "ties spend to revenue.",
      subtitle:
        "GA4, GTM, conversion tracking, and dashboards with clean data you can act on. Fixed scope at each tier.",
    },
    answerBlock:
      "Marketing analytics setup starts at $3,000 as a one-time project for GA4, GTM, three conversion goals, and a Looker Studio dashboard. Ongoing reporting retainers run $3,500 to $6,500+ per month with multi-channel attribution and CRM integration. Starter is project-based; Growth and Scale are monthly. Dashboards are typically live within three to four weeks of kickoff. Retainers are month to month.",
    ctaHeadline: "Want an analytics quote?",
    ctaSubtitle: "Tell us your stack, channels, and reporting gaps.|We will scope setup vs ongoing reporting.",
    ctaLabel: "Get Analytics Pricing",
  },
  branding: {
    metaTitle: "Branding Pricing | Identity from $8,000 | KINEXIS",
    metaDescription:
      "Brand identity pricing with fixed project fees from $8,000. Logo system, visual identity, messaging, and guidelines. No hourly billing surprises.",
    hero: {
      label: "Branding Pricing",
      line1: "Brand identity pricing",
      line2: "for a system, not a logo file.",
      subtitle:
        "Positioning, visual identity, messaging, and guidelines at fixed project fees. No hourly billing surprises.",
    },
    answerBlock:
      "Brand identity projects start at $8,000 for logo system, color palette, typography, and brand guidelines. Full identity programs with messaging framework and collateral scale to $15,000+. All pricing is fixed-fee. Typical delivery runs eight to twelve weeks from discovery to final guidelines. Revision rounds are scoped upfront in your proposal.",
    ctaHeadline: "Want a branding quote?",
    ctaSubtitle: "Tell us where you are today and what deliverables you need.|We will scope a fixed-fee proposal.",
    ctaLabel: "Get Branding Pricing",
  },
  "email-marketing": {
    metaTitle: "Email Marketing Pricing | From $2,000/mo | KINEXIS",
    metaDescription:
      "Email marketing management from $2,000/mo. Automation, campaigns, and segmentation at fixed monthly scope. ESP platform fees separate.",
    hero: {
      label: "Email Marketing Pricing",
      line1: "Email programs priced",
      line2: "for revenue, not open rates.",
      subtitle:
        "Automation, campaigns, and list segmentation at fixed monthly scope. ESP platform fees are separate.",
    },
    answerBlock:
      "Email marketing management starts at $2,000 per month for campaigns and basic automation on lists up to 10,000 contacts and scales to $5,000+ for enterprise automation with behavioral triggers and CRM integration. Every plan covers strategy, copy, design, and deliverability monitoring. ESP subscription costs (Klaviyo, HubSpot, etc.) are separate from management fees. Core automations are usually live within three to four weeks. We work month to month.",
    ctaHeadline: "Want an email marketing quote?",
    ctaSubtitle: "Share your list size, platform, and automation goals.|We will recommend the right tier.",
    ctaLabel: "Get Email Marketing Pricing",
  },
  "social-media": {
    metaTitle: "Social Media Pricing | From $1,500/mo | KINEXIS",
    metaDescription:
      "Social media management pricing from $1,500/mo. Content, community, and reporting at fixed scope. Boost and ad spend separate from management fees.",
    hero: {
      label: "Social Media Pricing",
      line1: "Social management pricing",
      line2: "tied to pipeline, not likes.",
      subtitle:
        "Content, community, and paid amplification at fixed scope per tier. Boost and campaign ad spend is separate.",
    },
    answerBlock:
      "Social media management starts at $1,500 per month for two platforms and twelve posts with monthly reporting and scales to $5,500+ for multi-platform programs with video production and advanced analytics. Paid boost and campaign ad spend is separate from management fees. Content calendars go live within two weeks of kickoff. We work month to month.",
    ctaHeadline: "Want a social media quote?",
    ctaSubtitle: "Tell us your platforms, posting goals, and audience.|We will scope the right management tier.",
    ctaLabel: "Get Social Media Pricing",
  },
  "video-marketing": {
    metaTitle: "Video Marketing Pricing | Projects from $3,000 | KINEXIS",
    metaDescription:
      "Video production pricing from $3,000 per project. Strategy through post-production at fixed fees. Monthly retainers available for ongoing volume.",
    hero: {
      label: "Video Marketing Pricing",
      line1: "Video production pricing",
      line2: "built for performance placements.",
      subtitle:
        "Strategy through post-production at fixed project fees. Monthly retainers available for ongoing volume.",
    },
    answerBlock:
      "Video marketing projects start at $3,000 for a single 60 to 90 second asset and scale to $15,000+ for multi-asset production programs with distribution strategy. Starter and Growth tiers are fixed project fees; Scale covers ongoing production retainers. Typical single-asset delivery is four to six weeks from brief to final export. Music licensing and location fees quoted separately when needed.",
    ctaHeadline: "Want a video production quote?",
    ctaSubtitle: "Share your channels, formats, and timeline.|We will scope a fixed project fee or retainer.",
    ctaLabel: "Get Video Marketing Pricing",
  },
  "growth-consulting": {
    metaTitle: "Growth Consulting Pricing | From $3,000/mo | KINEXIS",
    metaDescription:
      "Growth consulting and fractional CMO pricing from $3,000/mo. Strategy, growth model, and roadmap advisory. Execution scoped separately. Month to month.",
    hero: {
      label: "Growth Consulting Pricing",
      line1: "Growth consulting",
      line2: "for when more channels stop working.",
      subtitle:
        "Fractional CMO advisory with business audit, growth model, and execution roadmap. Month to month after strategy delivery.",
    },
    answerBlock:
      "Growth consulting starts at $3,000 per month for early-stage businesses with growth model development and bi-weekly advisory calls and scales to $10,000+ for embedded fractional CMO engagements with board-level reporting. Execution services (SEO, paid ads, web) are scoped and priced separately. Initial strategy and 90-day roadmap are typically delivered within four to six weeks. We work month to month.",
    ctaHeadline: "Want a growth consulting quote?",
    ctaSubtitle: "Tell us your stage, channels, and bottlenecks.|We will scope advisory vs embedded engagement.",
    ctaLabel: "Get Growth Consulting Pricing",
  },
};

const ES_OVERRIDES: Partial<Record<PricingSlug, GeneratedOverride>> = {
  "local-seo": {
    metaTitle: "Precios SEO Local | Desde $1,500/mes | KINEXIS",
    metaDescription:
      "Precios SEO local para visibilidad en map pack. GBP, citaciones, reseñas y páginas de ubicación desde $1,500/mes. Mes a mes, alcance fijo por nivel.",
    hero: {
      label: "Precios SEO Local",
      line1: "Precios para map pack",
      line2: "cuando ganas por proximidad.",
      subtitle:
        "GBP, citaciones, reseñas y páginas de ubicación con alcance fijo por nivel. No es SEO completo reducido.",
    },
    answerBlock:
      "Los planes SEO local empiezan en $1,500 al mes para negocios de servicio de una ubicación y escalan a $5,000+ para operadores multi-ciudad o franquicias. Cada plan cubre optimización de Google Business Profile, limpieza de citaciones, estrategia de reseñas y trabajo en páginas de ubicación. SEO de sitio completo con contenido y links es un programa aparte — ver precios SEO. La mayoría ve movimiento en map pack en 30 a 60 días. Trabajamos mes a mes.",
    ctaHeadline: "¿Quieres cotización de SEO local?",
    ctaSubtitle: "Cuéntanos tus zonas de servicio y competencia.|Recomendaremos el nivel y estrategia de map pack.",
    ctaLabel: "Obtén Precios SEO Local",
  },
  "content-marketing": {
    metaTitle: "Precios Content Marketing | Desde $2,000/mes | KINEXIS",
    metaDescription:
      "Precios de content marketing para retainers de producción. 4 a 20+ piezas informadas por SEO al mes. Alcance fijo, sin cargos ocultos, mes a mes.",
    hero: {
      label: "Precios Content Marketing",
      line1: "Precios de producción",
      line2: "cuando el SEO lo manejas aparte.",
      subtitle:
        "Retainers de artículos y landing pages para equipos que necesitan volumen sin un programa SEO completo. Entregables fijos por nivel.",
    },
    answerBlock:
      "Los retainers de content marketing empiezan en $2,000 al mes por 4 a 6 piezas informadas por SEO y escalan a $8,000+ por 20+ piezas con liderazgo editorial. Es producción y estrategia — no sustituye SEO técnico ni link building. Los programas SEO completos incluyen contenido en cada nivel (entrada $2,500/mes). Precio por pieza disponible para proyectos. Las primeras piezas suelen publicarse en 3 a 4 semanas.",
    ctaHeadline: "¿Quieres cotización de content marketing?",
    ctaSubtitle: "Cuéntanos tu industria, volumen y objetivos.|Definiremos el retainer adecuado.",
    ctaLabel: "Obtén Precios Content Marketing",
  },
  funnels: {
    metaTitle: "Precios Funnels y CRO | Builds desde $5,000 | KINEXIS",
    metaDescription:
      "Precios de funnels y CRO: builds únicos desde $5,000 y retainers de optimización desde $6,500/mes. Landing pages, automatización y A/B testing.",
    hero: {
      label: "Precios Funnels y CRO",
      line1: "Builds de funnel y CRO",
      line2: "con precio como un solo sistema.",
      subtitle:
        "Landing pages, automatización de nurture y testing estructurado bajo alcance fijo — no proyectos sueltos desconectados.",
    },
    answerBlock:
      "Los programas de funnel y CRO empiezan en $5,000 por un build con landing page, secuencia de cinco emails y configuración de tracking de conversiones. Los retainers de optimización corren de $6,500 a $12,000+ al mes según volumen de tráfico y alcance de tests. Starter es tarifa única de proyecto; Growth y Scale son retainers mensuales. Cada plan cubre arquitectura de funnel, landing pages, automatización y A/B testing. El gasto en ads es aparte. Resultados de tests suelen verse en 60 a 90 días. Retainers mes a mes.",
    ctaHeadline: "¿Quieres cotización de funnels y CRO?",
    ctaSubtitle: "Comparte tráfico, oferta y metas de conversión.|Recomendaremos build vs retainer.",
    ctaLabel: "Obtén Precios Funnels y CRO",
  },
  analytics: {
    metaTitle: "Precios Analytics Marketing | Setup desde $3,000 | KINEXIS",
    metaDescription:
      "Precios analytics: setup único GA4 y dashboards desde $3,000, retainers de reportes desde $3,500/mes. Alcance fijo, mes a mes en retainers.",
    hero: {
      label: "Precios Analytics Marketing",
      line1: "Setup de analytics que",
      line2: "conecta gasto con ingresos.",
      subtitle:
        "GA4, GTM, tracking de conversiones y dashboards con datos limpios sobre los que puedes actuar. Alcance fijo por nivel.",
    },
    answerBlock:
      "El setup de analytics marketing empieza en $3,000 como proyecto único para GA4, GTM, tres metas de conversión y un dashboard Looker Studio. Los retainers de reportes corren de $3,500 a $6,500+ al mes con atribución multicanal e integración CRM. Starter es por proyecto; Growth y Scale son mensuales. Los dashboards suelen estar live en tres a cuatro semanas desde kickoff. Retainers mes a mes.",
    ctaHeadline: "¿Quieres cotización de analytics?",
    ctaSubtitle: "Cuéntanos tu stack, canales y brechas de reportes.|Definiremos setup vs reporting continuo.",
    ctaLabel: "Obtén Precios Analytics",
  },
  branding: {
    metaTitle: "Precios Branding | Identidad desde $8,000 | KINEXIS",
    metaDescription:
      "Precios de identidad de marca con tarifas fijas desde $8,000. Sistema de logo, identidad visual, messaging y guías. Sin sorpresas por horas.",
    hero: {
      label: "Precios Branding",
      line1: "Precios de identidad",
      line2: "para un sistema, no un archivo de logo.",
      subtitle:
        "Posicionamiento, identidad visual, messaging y guías con tarifas fijas de proyecto. Sin facturación por horas sorpresa.",
    },
    answerBlock:
      "Los proyectos de identidad empiezan en $8,000 por sistema de logo, paleta de color, tipografía y guías de marca. Programas completos con framework de messaging y collateral escalan a $15,000+. Todo el pricing es tarifa fija. Entrega típica de ocho a doce semanas desde discovery hasta guías finales. Rondas de revisión definidas en tu propuesta.",
    ctaHeadline: "¿Quieres cotización de branding?",
    ctaSubtitle: "Cuéntanos dónde estás y qué entregables necesitas.|Preparamos propuesta de tarifa fija.",
    ctaLabel: "Obtén Precios Branding",
  },
  "email-marketing": {
    metaTitle: "Precios Email Marketing | Desde $2,000/mes | KINEXIS",
    metaDescription:
      "Gestión email marketing desde $2,000/mes. Automatización, campañas y segmentación con alcance mensual fijo. Tarifas ESP aparte.",
    hero: {
      label: "Precios Email Marketing",
      line1: "Programas de email",
      line2: "con precio por ingresos, no open rate.",
      subtitle:
        "Automatización, campañas y segmentación con alcance mensual fijo. Tarifas de plataforma ESP son aparte.",
    },
    answerBlock:
      "La gestión de email marketing empieza en $2,000 al mes por campañas y automatización básica en listas hasta 10,000 contactos y escala a $5,000+ por automatización enterprise con triggers conductuales e integración CRM. Cada plan cubre estrategia, copy, diseño y monitoreo de deliverability. Suscripciones ESP (Klaviyo, HubSpot, etc.) son aparte de las tarifas de gestión. Automatizaciones core suelen estar live en tres a cuatro semanas. Trabajamos mes a mes.",
    ctaHeadline: "¿Quieres cotización de email marketing?",
    ctaSubtitle: "Comparte tamaño de lista, plataforma y metas de automatización.|Recomendaremos el nivel.",
    ctaLabel: "Obtén Precios Email Marketing",
  },
  "social-media": {
    metaTitle: "Precios Redes Sociales | Desde $1,500/mes | KINEXIS",
    metaDescription:
      "Precios gestión redes sociales desde $1,500/mes. Contenido, comunidad e informes con alcance fijo. Boost y gasto en ads aparte.",
    hero: {
      label: "Precios Redes Sociales",
      line1: "Precios de gestión social",
      line2: "ligados a pipeline, no likes.",
      subtitle:
        "Contenido, comunidad y amplificación pagada con alcance fijo por nivel. Boost y gasto en campañas es aparte.",
    },
    answerBlock:
      "La gestión de redes sociales empieza en $1,500 al mes por dos plataformas y doce publicaciones con informe mensual y escala a $5,500+ por programas multi-plataforma con producción de video y analytics avanzados. Boost pagado y gasto en campañas es aparte de las tarifas de gestión. Calendarios de contenido quedan live en dos semanas desde kickoff. Trabajamos mes a mes.",
    ctaHeadline: "¿Quieres cotización de redes sociales?",
    ctaSubtitle: "Cuéntanos plataformas, metas de publicación y audiencia.|Definiremos el nivel de gestión.",
    ctaLabel: "Obtén Precios Redes Sociales",
  },
  "video-marketing": {
    metaTitle: "Precios Video Marketing | Proyectos desde $3,000 | KINEXIS",
    metaDescription:
      "Precios producción de video desde $3,000 por proyecto. Estrategia hasta post-producción con tarifas fijas. Retainers mensuales disponibles.",
    hero: {
      label: "Precios Video Marketing",
      line1: "Precios de producción",
      line2: "hechos para placements de performance.",
      subtitle:
        "Estrategia hasta post-producción con tarifas fijas de proyecto. Retainers mensuales para volumen continuo.",
    },
    answerBlock:
      "Proyectos de video marketing empiezan en $3,000 por un asset de 60 a 90 segundos y escalan a $15,000+ por programas multi-asset con estrategia de distribución. Starter y Growth son tarifas fijas de proyecto; Scale cubre retainers de producción continua. Entrega típica de un asset en cuatro a seis semanas desde brief hasta export final. Licencias de música y tarifas de locación se cotizan aparte cuando aplica.",
    ctaHeadline: "¿Quieres cotización de video?",
    ctaSubtitle: "Comparte canales, formatos y timeline.|Definiremos proyecto fijo o retainer.",
    ctaLabel: "Obtén Precios Video Marketing",
  },
  "growth-consulting": {
    metaTitle: "Precios Growth Consulting | Desde $3,000/mes | KINEXIS",
    metaDescription:
      "Precios growth consulting y CMO fractional desde $3,000/mes. Estrategia, modelo de crecimiento y roadmap. Ejecución aparte. Mes a mes.",
    hero: {
      label: "Precios Growth Consulting",
      line1: "Consultoría de crecimiento",
      line2: "cuando más canales dejan de funcionar.",
      subtitle:
        "Asesoría CMO fractional con auditoría, modelo de crecimiento y roadmap de ejecución. Mes a mes tras entrega de estrategia.",
    },
    answerBlock:
      "Growth consulting empieza en $3,000 al mes para negocios early-stage con desarrollo de modelo de crecimiento y llamadas quincenales y escala a $10,000+ por engagements CMO fractional embebidos con reportes a nivel board. Servicios de ejecución (SEO, paid ads, web) se definen y cotizan aparte. Estrategia inicial y roadmap 90 días suelen entregarse en cuatro a seis semanas. Trabajamos mes a mes.",
    ctaHeadline: "¿Quieres cotización de growth consulting?",
    ctaSubtitle: "Cuéntanos tu etapa, canales y cuellos de botella.|Definiremos advisory vs engagement embebido.",
    ctaLabel: "Obtén Precios Growth Consulting",
  },
};

export const generatedPricingOverrides: Record<Locale, Partial<Record<PricingSlug, GeneratedOverride>>> = {
  en: EN_OVERRIDES,
  es: ES_OVERRIDES,
};

const SETUP_FEE_ANSWERS: Record<Locale, Partial<Record<PricingSlug, string>>> = {
  en: {
    funnels:
      "Starter is a one-time funnel build fee quoted upfront. Growth and Scale are monthly retainers — onboarding is included in month one, not billed separately.",
    analytics:
      "Starter is a one-time analytics setup project. Growth and Scale are monthly reporting retainers with no separate onboarding charge beyond what we quote in your proposal.",
    branding:
      "Brand projects are fixed-fee. Discovery, design rounds, and deliverables are scoped in your proposal before work starts — no hourly surprises.",
    "web-design":
      "Web projects are fixed-fee by scope. A 50/50 payment split at kickoff and launch is standard. Hosting and third-party licenses are quoted separately.",
    "video-marketing":
      "Project fees cover production quoted in your brief. Music licensing, talent, and location fees are called out separately when they apply.",
  },
  es: {
    funnels:
      "Starter es tarifa única de build de funnel cotizada al inicio. Growth y Scale son retainers mensuales — el onboarding va incluido en el mes uno, sin cargo aparte.",
    analytics:
      "Starter es proyecto único de setup de analytics. Growth y Scale son retainers mensuales de reportes sin cargo de onboarding aparte del cotizado en tu propuesta.",
    branding:
      "Proyectos de marca son tarifa fija. Discovery, rondas de diseño y entregables se definen en tu propuesta antes de empezar — sin sorpresas por horas.",
    "web-design":
      "Proyectos web son tarifa fija por alcance. División 50/50 al kickoff y lanzamiento es estándar. Hosting y licencias de terceros se cotizan aparte.",
    "video-marketing":
      "Las tarifas de proyecto cubren producción cotizada en tu brief. Licencias de música, talento y locaciones se detallan aparte cuando aplica.",
  },
};

const UPGRADE_ANSWERS: Record<Locale, Partial<Record<PricingSlug, string>>> = {
  en: {
    funnels:
      "Yes. Many clients start with a Starter build, then move to a Growth retainer once traffic supports ongoing tests. We plan the handoff so tracking and pages carry over.",
    analytics:
      "Yes. Starter setup clients often upgrade to Growth once dashboards are live and they want monthly attribution reporting. Your tracking foundation stays in place.",
    branding:
      "Yes. Some clients start with a Starter identity refresh and expand to Growth for messaging and collateral. We scope add-ons without restarting discovery from zero.",
  },
  es: {
    funnels:
      "Sí. Muchos clientes empiezan con un build Starter y pasan a retainer Growth cuando el tráfico soporta tests continuos. Planificamos la transición para que tracking y páginas se mantengan.",
    analytics:
      "Sí. Clientes de setup Starter suelen subir a Growth cuando los dashboards están live y quieren reportes mensuales de atribución. Tu base de tracking se mantiene.",
    branding:
      "Sí. Algunos empiezan con refresh Starter y expanden a Growth para messaging y collateral. Definimos add-ons sin reiniciar discovery desde cero.",
  },
};

const GENERIC_FAQ_DEFAULTS: Record<
  Locale,
  { setupFee: string; contract: string; priceFactors: string; upgrade: string }
> = {
  en: {
    setupFee:
      "Most engagements include onboarding and strategy in month one. We quote it upfront. No surprise charges on the first invoice.",
    contract: "No. Month to month. Results should earn your business, not a contract clause.",
    priceFactors:
      "Scope, competition, where you are starting from, and how much production your market needs. We scope this on a strategy call, not a generic quote form.",
    upgrade:
      "Yes. Many clients start on Starter and move up once momentum builds. We plan the upgrade path so you are not rebuilding from scratch.",
  },
  es: {
    setupFee:
      "La mayoría de proyectos incluyen onboarding y estrategia en el mes uno. Lo cotizamos al inicio. Sin cargos sorpresa en la primera factura.",
    contract: "No. Mes a mes. Los resultados deben ganarse tu negocio, no una cláusula contractual.",
    priceFactors:
      "Alcance, competencia, punto de partida y cuánta producción requiere tu mercado. Lo definimos en una llamada estratégica, no con un formulario genérico.",
    upgrade:
      "Sí. Muchos clientes empiezan en Starter y suben cuando el momentum crece. Planificamos la ruta de upgrade para no reconstruir desde cero.",
  },
};

export function buildGenericPricingFaqs(slug: PricingSlug, locale: Locale, note?: string): FAQItem[] {
  const defaults = GENERIC_FAQ_DEFAULTS[locale];
  const setup = SETUP_FEE_ANSWERS[locale][slug] ?? defaults.setupFee;
  const upgrade = UPGRADE_ANSWERS[locale][slug] ?? defaults.upgrade;

  const questions =
    locale === "es"
      ? {
          setup: "¿Hay tarifa de configuración?",
          contract: "¿Requieren contrato a largo plazo?",
          price: "¿Qué afecta mi precio?",
          upgrade: "¿Puedo empezar con un plan menor y subir?",
        }
      : {
          setup: "Is there a setup fee?",
          contract: "Do you require a long-term contract?",
          price: "What affects my price?",
          upgrade: "Can I start with a smaller plan and upgrade?",
        };

  return [
    { question: questions.setup, answer: setup },
    { question: questions.contract, answer: defaults.contract },
    { question: questions.price, answer: note ?? defaults.priceFactors },
    { question: questions.upgrade, answer: upgrade },
  ];
}

export const tierProofTierLabels: Record<Locale, Record<string, string>> = {
  en: {
    Growth: "Growth",
    "Business Site": "Business Site",
  },
  es: {
    Growth: "Growth",
    "Business Site": "Sitio Empresarial",
  },
};

export const trustStripContent: Record<Locale, { value: string; label: string }[]> = {
  en: [
    { value: "Month to month", label: "No long-term lock-in" },
    { value: "8–10 clients", label: "Focused roster, not a factory" },
    { value: "Fixed scope", label: "Quoted before you sign" },
  ],
  es: [
    { value: "Mes a mes", label: "Sin permanencia a largo plazo" },
    { value: "8–10 clientes", label: "Cartera enfocada, no fábrica" },
    { value: "Alcance fijo", label: "Cotizado antes de firmar" },
  ],
};

export const tierProofSectionLabel: Record<Locale, string> = {
  en: "tier in practice",
  es: "nivel en la práctica",
};

import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";
import type { ProofData, VisualVariant, WhyKinexusData } from "./types";
import { genericCapabilityKeys } from "./generic-service-capabilities";

/** Industry-standard section flow shared across all service pages. */
export const STANDARD_SERVICE_TAIL = [
  "Process",
  "Deliverables",
  "Proof",
  "Results",
  "PricingTeaser",
] as const;

export function standardServiceOrder(capabilityKeys: string[]): string[] {
  return ["ServiceOverview", "WhyKinexus", ...capabilityKeys, ...STANDARD_SERVICE_TAIL];
}

/** Content-rich flow, prose-first architecture for flagship service pages. */
export const CONTENT_RICH_SERVICE_TAIL = [
  "Process",
  "Deliverables",
  "Proof",
  "ServiceInlineCTA",
  "PricingTeaser",
] as const;

export function contentRichServiceOrder(capabilityKeys: string[]): string[] {
  return [
    "AnswerBlock",
    "EditorialOverview",
    ...capabilityKeys.slice(0, 3),
    ...CONTENT_RICH_SERVICE_TAIL,
  ];
}

/** Web design keeps DeviceMockups between capability sections. */
export function contentRichWebDesignOrder(): string[] {
  return [
    "AnswerBlock",
    "EditorialOverview",
    "UxAudit",
    "DeviceMockups",
    "ConversionOptimization",
    ...CONTENT_RICH_SERVICE_TAIL,
  ];
}

/** Slugs using the content-rich page template (Phase 0–1). */
export const CONTENT_RICH_SERVICE_SLUGS = [
  "seo",
  "ppc-management",
  "web-design",
  "local-seo",
  "meta-ads",
  "cro",
  "email-marketing",
  "content-marketing",
  "social-media",
  "video-marketing",
  "branding",
  "analytics",
  "growth-consulting",
  "funnels",
  "landing-pages",
  "copywriting",
  "youtube-ads",
  "microsoft-ads",
  "website-maintenance",
  "website-speed",
  "marketing-audits",
  "marketing-automation-crm",
  "fractional-cmo",
  "training-workshops",
] as const;

export type ServiceArchitectureConfig = {
  visualVariant: VisualVariant;
  /** Section id (from sectionOrder) where the page graphic belongs */
  visualizationSection: string;
  sectionOrder: string[];
  whyKinexus: Record<Locale, WhyKinexusData>;
  proof?: Record<Locale, ProofData>;
  /** Keys into serviceSections built by service-section-builders */
  serviceSectionKeys: string[];
};

const why = (
  en: WhyKinexusData,
  es: WhyKinexusData,
): Record<Locale, WhyKinexusData> => ({ en, es });

export const serviceArchitectureConfig: Record<ServiceSeoSlug, ServiceArchitectureConfig> = {
  seo: {
    visualVariant: "chart",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(["SeoAudit", "RankingStrategy", "ContentStrategy"]),
    serviceSectionKeys: ["SeoAudit", "RankingStrategy", "ContentStrategy"],
    whyKinexus: why(
      {
        headline: "Why Most SEO Campaigns|Fail",
        subtitle: "Wrong keywords, unprioritized technical fixes, and reports that celebrate traffic your sales team never sees.",
        points: [
          { title: "Wrong keywords win", description: "Your agency celebrates traffic from searches nobody in your sales pipeline ever typed." },
          { title: "Technical work without priority", description: "Hundreds of crawl fixes sit in a spreadsheet while the pages that actually sell stay broken." },
          { title: "Content without a next step", description: "Blog posts rank. Visitors read. Then they leave because nothing on the page asks them to act." },
          { title: "Reports that miss the point", description: "Position 4 for a term you never wanted. Zero booked calls. The dashboard still looks green." },
        ],
      },
      {
        headline: "Por Qué Fallan|la Mayoría de las Campañas SEO",
        subtitle: "Palabras clave equivocadas, arreglos técnicos sin prioridad e informes que celebran tráfico que ventas nunca ve.",
        points: [
          { title: "Palabras clave equivocadas", description: "Las agencias persiguen volumen mientras tus compradores buscan términos que nunca convierten." },
          { title: "Trabajo técnico sin prioridad", description: "Los arreglos se acumulan sin conexión con las URLs que venden." },
          { title: "Contenido sin rutas de conversión", description: "Los artículos posicionan pero no dirigen a llamadas reservadas." },
          { title: "Informes que ocultan la verdad", description: "Las posiciones suben mientras los leads se mantienen planos." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "Landscaping Company",
          challenge:
            "Five years of generic SEO. Rankings on paper, empty calendar in practice. Most traffic came from DIY gardeners searching how-to content, not homeowners ready to hire a crew.",
          approach:
            "We mapped revenue to specific service pages, rebuilt the keyword strategy around commercial-intent terms, fixed technical blockers on pages that sell, and built content that moved visitors toward a booked estimate.",
          outcome:
            "Qualified leads grew 4.8× in 10 months. Organic traffic up 1,290%. Rankings improved across 340+ commercial-intent keywords tied to booked jobs.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Jardinería",
          challenge:
            "Cinco años de SEO genérico. Rankings en papel, calendario vacío en la práctica. La mayoría del tráfico venía de jardineros DIY, no de propietarios listos para contratar.",
          approach:
            "Mapeamos ingresos a páginas de servicio específicas, reconstruimos la estrategia de keywords en torno a términos comerciales, corregimos bloqueos técnicos en páginas que venden y creamos contenido que movía visitantes hacia una cotización reservada.",
          outcome:
            "Leads calificados 4.8× en 10 meses. Tráfico orgánico +1,290%. Mejora en 340+ keywords comerciales ligadas a trabajos reservados.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
    },
  },

  "local-seo": {
    visualVariant: "chart",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(["LocalGbp", "LocalCitations", "LocalReviews"]),
    serviceSectionKeys: ["LocalGbp", "LocalCitations", "LocalReviews"],
    whyKinexus: why(
      {
        headline: "Why Local SEO Fails|to Fill Your Calendar",
        subtitle: "Incomplete profiles, messy citations, and map pack rankings that never connect to a booked job.",
        points: [
          { title: "Incomplete GBP profiles", description: "Wrong categories, missing services, bad photos. Competitors with half your experience show up above you in the map pack." },
          { title: "Citation chaos", description: "Your address shows up three different ways across directories. Google stops trusting your location data." },
          { title: "City-name page spam", description: "Template pages for every suburb you serve. Google flags them as low quality and they never rank." },
          { title: "No call tracking", description: "You see map views go up but cannot tie a single ranking to a booked job. Optimization becomes guesswork." },
        ],
      },
      {
        headline: "Por Qué el SEO Local|No Llena Tu Calendario",
        subtitle: "Perfiles incompletos, citas inconsistentes y rankings en el map pack que no se traducen en trabajos reservados.",
        points: [
          { title: "Perfiles GBP incompletos", description: "Categorías y fotos faltantes entregan trabajos al map pack de competidores." },
          { title: "Caos de citas", description: "Datos NAP inconsistentes erosionan la confianza de Google." },
          { title: "Páginas plantilla", description: "Páginas de ciudad genéricas no pasan controles de calidad local." },
          { title: "Sin seguimiento de llamadas", description: "No puedes optimizar lo que no puedes vincular a trabajos reservados." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "Plumbing Company",
          challenge:
            "Map pack was invisible for emergency plumbing searches. A competitor with a newer GBP and active review profile dominated the local 3-pack across all service areas.",
          approach:
            "We rebuilt the Google Business Profile with correct categories and service areas, cleaned citation inconsistencies across 45+ directories, launched a review generation workflow, and built location pages for each emergency service zone.",
          outcome:
            "Emergency calls up 327% in eight months. GBP interactions grew 2,371%. The business ranked in the top 3 map pack for 48 of 60 priority local keywords.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Plomería",
          challenge:
            "El map pack era invisible para búsquedas de plomería de emergencia. Un competidor con un GBP más nuevo y perfil de reseñas activo dominaba el 3-pack local en todas las zonas de servicio.",
          approach:
            "Reconstruimos el Perfil de Google Business con categorías y zonas de servicio correctas, limpiamos inconsistencias de citas en más de 45 directorios, lanzamos un flujo de generación de reseñas y construimos páginas locales para cada zona de servicio de emergencia.",
          outcome:
            "+327% llamadas de emergencia en 8 meses. Interacciones en GBP +2,371%. Top 3 en map pack para 48 de 60 keywords locales prioritarias.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
    },
  },

  "google-ads": {
    visualVariant: "dashboard",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(["CampaignArchitecture", "KeywordResearch", "ConversionTracking"]),
    serviceSectionKeys: ["CampaignArchitecture", "KeywordResearch", "ConversionTracking"],
    whyKinexus: why(
      {
        headline: "The Kinexus|Campaign Framework",
        subtitle: "Intent-first structure, weekly search term discipline, and bid optimization tied to leads your sales team closes.",
        points: [
          { title: "Intent-first architecture", description: "Brand, competitor, and high-intent searches each get their own campaign. No more one bucket for everything." },
          { title: "Weekly search term discipline", description: "We pull the search terms report every week. Irrelevant queries get blocked before they eat another dollar." },
          { title: "Quality Score as a lever", description: "When the ad and landing page say the same thing, Google charges you less per click and more people convert." },
          { title: "CRM-backed optimization", description: "We bid toward leads your sales team actually closes, not form fills from people who were never going to buy." },
        ],
      },
      {
        headline: "El Marco de|Campañas Kinexus",
        subtitle: "Estructura por intención, disciplina semanal de términos de búsqueda y pujas ligadas a leads que ventas cierra.",
        points: [
          { title: "Arquitectura por intención", description: "Marca, competencia y términos genéricos en campañas separadas." },
          { title: "Disciplina semanal", description: "Palabras negativas y revisiones de consultas cada semana." },
          { title: "Quality Score como palanca", description: "Alineación de anuncios y landing pages reduce CPC." },
          { title: "Optimización respaldada por CRM", description: "Las pujas optimizan hacia leads calificados confirmados." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "Plumbing Company",
          challenge:
            "The previous agency counted form submissions as conversions while ignoring phone calls. The primary conversion channel for emergency services. Brand, competitor, and generic terms sat in one campaign with no way to see which searches booked jobs.",
          approach:
            "We rebuilt conversion tracking around call conversions and CRM-confirmed leads, restructured Search campaigns by intent, built dedicated landing pages for emergency services, and tightened weekly search term reviews before scaling budget.",
          outcome: "Emergency calls up 327%. CPL down 65% after tracking and campaign structure aligned with how the sales team actually closes.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Plomería",
          challenge:
            "La agencia anterior contaba envíos de formulario como conversiones e ignoraba las llamadas. El canal principal para servicios de emergencia. Marca, competencia y términos genéricos vivían en una sola campaña.",
          approach:
            "Reconstruimos el tracking alrededor de llamadas y leads confirmados en CRM, reestructuramos campañas Search por intención, construimos landing pages dedicadas para emergencias y endurecimos la revisión semanal de términos de búsqueda antes de escalar presupuesto.",
          outcome: "+327% llamadas de emergencia con 65% reducción de CPL tras alinear tracking y estructura con cómo ventas realmente cierra.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
    },
  },

  "ppc-management": {
    visualVariant: "dashboard",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(["CampaignArchitecture", "KeywordResearch", "ChannelMix"]),
    serviceSectionKeys: ["CampaignArchitecture", "KeywordResearch", "ChannelMix"],
    whyKinexus: why(
      {
        headline: "The Kinexus PPC|& Google Ads System",
        subtitle: "Google Search depth, weekly search term discipline, and cross-channel budget allocation tied to leads your sales team closes.",
        points: [
          { title: "Intent-first Google architecture", description: "Brand, competitor, and high-intent searches each get their own campaign. No more one bucket for everything." },
          { title: "Weekly search term discipline", description: "We pull the search terms report every week. Irrelevant queries get blocked before they eat another dollar." },
          { title: "Cross-channel budget by ROAS", description: "When you run Meta or LinkedIn too, spend moves to channels that produce qualified leads at the lowest cost." },
          { title: "CRM-backed optimization", description: "We bid toward leads your sales team actually closes, not form fills from people who were never going to buy." },
        ],
      },
      {
        headline: "El Sistema PPC|y Google Ads Kinexus",
        subtitle: "Profundidad en Search, disciplina semanal de términos y asignación multicanal ligada a leads que ventas cierra.",
        points: [
          { title: "Arquitectura Google por intención", description: "Marca, competencia y términos genéricos en campañas separadas." },
          { title: "Disciplina semanal", description: "Palabras negativas y revisiones de consultas cada semana." },
          { title: "Presupuesto multicanal por ROAS", description: "El gasto sigue al costo por lead calificado en cada plataforma activa." },
          { title: "Optimización respaldada por CRM", description: "Las pujas optimizan hacia leads calificados confirmados." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "Plumbing Company",
          challenge:
            "Google and Meta ran as separate programs with different conversion definitions. Budget stayed split evenly even though Meta CPL was three times Google's for the same emergency service calls.",
          approach:
            "We unified conversion tracking across Google Search and Meta, restructured campaigns by search intent, built dedicated landing pages for emergency services, and reallocated budget weekly toward the lowest cost per qualified call.",
          outcome:
            "Emergency calls up 327% in eight months. CPL down 65% after cross-channel budget moved toward Search and weekly optimization ran across both platforms.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Plomería",
          challenge:
            "Google y Meta operaban en silos con definiciones de conversión distintas. El presupuesto se repartía a partes iguales aunque el CPL en Meta era el triple del de Google para las mismas llamadas de emergencia.",
          approach:
            "Unificamos el tracking de conversiones en Google Search y Meta, reestructuramos campañas por intención de búsqueda, construimos landing pages dedicadas para servicios de emergencia y reasignamos presupuesto semanalmente hacia el menor costo por llamada calificada.",
          outcome:
            "+327% llamadas de emergencia en 8 meses. CPL -65% tras mover presupuesto multicanal hacia Search con optimización semanal en ambas plataformas.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
    },
  },

  "meta-ads": {
    visualVariant: "comparison",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(["CreativeTesting", "AudienceTargeting", "Retargeting"]),
    serviceSectionKeys: ["CreativeTesting", "AudienceTargeting", "Retargeting"],
    whyKinexus: why(
      {
        headline: "The Kinexus Creative|Testing System",
        subtitle: "Biweekly creative sprints, clean audience separation, and attribution built for iOS-era ad accounts.",
        points: [
          { title: "Biweekly creative sprints", description: "Three to five new ad variations every two weeks. Fatigue kills accounts. We stay ahead of it." },
          { title: "Clean audience separation", description: "Cold prospecting, warm engagers, and hot retargeting pools never overlap. Overlap is how CPM gets expensive for no reason." },
          { title: "CAPI-first attribution", description: "Pixel plus Conversions API so iOS privacy changes do not leave you optimizing blind." },
          { title: "Funnel-stage budget rules", description: "Prospecting and retargeting budgets shift based on blended ROAS, not gut feel." },
        ],
      },
      {
        headline: "El Sistema de Pruebas|Creativas Kinexus",
        subtitle: "Sprints creativos quincenales, audiencias separadas y atribución CAPI para cuentas post-iOS.",
        points: [
          { title: "Sprints creativos quincenales", description: "3–5 variaciones nuevas cada dos semanas." },
          { title: "Separación limpia de audiencias", description: "Prospección y retargeting nunca se superponen." },
          { title: "Atribución CAPI-first", description: "Pixel y CAPI alimentan eventos precisos a Meta." },
          { title: "Reglas de presupuesto por etapa", description: "Presupuestos ajustados por ROAS combinado." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "SaaS Platform",
          challenge:
            "Meta prospecting CPL doubled after week three because the same three ad creatives kept running with no refresh schedule. Prospecting and retargeting audiences overlapped, inflating CPM.",
          approach:
            "We separated cold, warm, and hot audience pools with clean exclusions, launched biweekly creative sprints with three to five new variations, and rebuilt CAPI-first tracking so the algorithm optimized toward demo bookings instead of page views.",
          outcome:
            "3.8x ROAS after biweekly creative sprints, clean audience separation, and accurate conversion data restored to the ad account within six weeks.",
          href: "/case-studies/saas-platform-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Plataforma SaaS",
          challenge:
            "El CPL en prospección de Meta se duplicó tras la semana tres porque los mismos tres creativos seguían corriendo sin calendario de refresco. Las audiencias de prospección y retargeting se superponían, inflando el CPM.",
          approach:
            "Separamos pools de audiencia fríos, tibios y calientes con exclusiones limpias, lanzamos sprints creativos quincenales con tres a cinco variaciones nuevas y reconstruimos tracking CAPI-first para que el algoritmo optimizara hacia reservas de demo en lugar de vistas de página.",
          outcome:
            "3.8x ROAS tras sprints creativos quincenales, separación limpia de audiencias y datos de conversión precisos restaurados en la cuenta en seis semanas.",
          href: "/case-studies/saas-platform-growth",
        },
      },
    },
  },

  "paid-ads": {
    visualVariant: "dashboard",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(["ChannelStrategy", "CampaignStructure", "Attribution"]),
    serviceSectionKeys: ["ChannelStrategy", "CampaignStructure", "Attribution"],
    whyKinexus: why(
      {
        headline: "Why Most Ad Accounts|Bleed Budget",
        subtitle: "Channel hype, flat campaign structures, and attribution dashboards that disagree with your CRM.",
        points: [
          { title: "Platform selection by hype", description: "Budget lands on the channel that looked good in a pitch deck, not where your buyers actually convert." },
          { title: "Flat campaign structures", description: "Brand, competitor, and high-intent terms mixed together. You cannot tell which searches are profitable." },
          { title: "Creative without a testing cadence", description: "Ads launch once, run for months, fatigue, and nobody notices until CPL doubles." },
          { title: "Attribution theater", description: "The ad dashboard shows great ROAS. Your CRM tells a different story. Both cannot be right." },
        ],
      },
      {
        headline: "Por Qué las Cuentas de Anuncios|Desperdician Presupuesto",
        subtitle: "Hype de canal, estructuras planas y dashboards de atribución que no coinciden con tu CRM.",
        points: [
          { title: "Selección por hype", description: "Presupuesto a canales que lucen bien, no donde convierten compradores." },
          { title: "Estructuras planas", description: "Marca, competencia e intención mezclados inflan CPL." },
          { title: "Creativos sin cadencia", description: "Anuncios se lanzan una vez y fatigan en semanas." },
          { title: "Atribución teatral", description: "Dashboards muestran ROAS mientras CRM cuenta otra historia." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "Plumbing Company",
          challenge:
            "First paid media push sent Google traffic to the homepage with no call tracking. The previous setup counted form submissions while ignoring phone calls, the primary conversion for emergency plumbing.",
          approach:
            "We mapped channel fit for emergency services, launched Google Search with dedicated landing pages and call tracking, added Meta retargeting for site visitors, and aligned weekly optimization to cost per qualified call from CRM data.",
          outcome: "Emergency calls up 327% and CPL down 65% after channel selection, dedicated landing pages, and conversion tracking rebuilt around qualified calls.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Plomería",
          challenge:
            "El primer push de paid enviaba tráfico a la homepage sin tracking de llamadas. El setup anterior contaba formularios e ignoraba llamadas, la conversión principal en plomería de emergencia.",
          approach:
            "Mapeamos el canal adecuado para servicios de emergencia, lanzamos Google Search con landing pages dedicadas y tracking de llamadas, añadimos retargeting en Meta para visitantes del sitio y alineamos la optimización semanal al costo por llamada calificada desde el CRM.",
          outcome: "+327% llamadas de emergencia y 65% reducción de CPL tras selección de canal, landing pages dedicadas y tracking reconstruido alrededor de llamadas calificadas.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
    },
  },

  "web-design": {
    visualVariant: "mockup",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichWebDesignOrder(),
    serviceSectionKeys: ["UxAudit", "ConversionOptimization"],
    whyKinexus: why(
      {
        headline: "What Makes a Kinexus Build|Different",
        subtitle: "Conversion paths sketched first, performance benchmarks enforced, and a handoff your marketing team can run without us.",
        points: [
          { title: "Conversion before aesthetics", description: "We sketch the CTA path first. Pretty comes second. Awards do not pay your payroll." },
          { title: "Performance is non-negotiable", description: "Lighthouse 90 or higher. Core Web Vitals green. Your site loads before people lose patience." },
          { title: "Mobile-first, not mobile-adapted", description: "Wireframes start on a phone screen because that is where most of your traffic lives." },
          { title: "Handoff your team can run", description: "CMS training, component docs, and a site your marketing team can update without calling us every week." },
        ],
      },
      {
        headline: "Qué Hace Diferente|un Build de Kinexus",
        subtitle: "Rutas de conversión primero, benchmarks de rendimiento exigidos y entrega que tu equipo puede operar solo.",
        points: [
          { title: "Conversión antes que estética", description: "Cada decisión de diseño mapea a una acción del usuario." },
          { title: "Rendimiento no negociable", description: "Lighthouse 90+, Core Web Vitals en verde." },
          { title: "Mobile-first", description: "Wireframes empiezan en móvil." },
          { title: "Entrega operable", description: "Capacitación CMS y documentación incluida." },
        ],
      },
    ),
    proof: {
      en: {
        beforeAfter: { beforeLabel: "Before", afterLabel: "After", beforeValue: "1.8%", afterValue: "8.4%", metric: "Conversion Rate" },
        caseStudy: {
          client: "Landscaping Company",
          challenge:
            "Template site with 45% bounce rate and no clear CTA above the fold. Most traffic arrived on mobile where the layout broke and the contact form buried below seven fields.",
          approach:
            "We mapped the buyer journey from service search to booked estimate, redesigned key pages mobile-first with the CTA in the first viewport, cut the form to four fields, and rebuilt the site for Lighthouse 94 with Core Web Vitals in the green.",
          outcome:
            "4.8× lead growth after custom rebuild. Conversion rate went from 1.8% to 8.4%. Qualified leads grew from 10 to 48 per month within 10 months.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
      es: {
        beforeAfter: { beforeLabel: "Antes", afterLabel: "Después", beforeValue: "1.8%", afterValue: "8.4%", metric: "Tasa de Conversión" },
        caseStudy: {
          client: "Empresa de Jardinería",
          challenge:
            "Sitio plantilla con 45% de rebote y sin CTA claro above the fold. La mayoría del tráfico llegaba en móvil donde el layout se rompía y el formulario de contacto tenía siete campos enterrados.",
          approach:
            "Mapeamos el recorrido del comprador desde la búsqueda de servicio hasta la cotización reservada, rediseñamos páginas clave mobile-first con el CTA en el primer viewport, redujimos el formulario a cuatro campos y reconstruimos el sitio para Lighthouse 94 con Core Web Vitals en verde.",
          outcome:
            "Crecimiento de leads 4.8× tras rebuild personalizado. Conversión del 1.8% al 8.4%. Leads calificados de 10 a 48 por mes en 10 meses.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
    },
  },

  cro: {
    visualVariant: "comparison",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(["AbTesting", "Heatmaps", "UXResearch"]),
    serviceSectionKeys: ["AbTesting", "Heatmaps", "UXResearch"],
    whyKinexus: why(
      {
        headline: "Why CRO Projects Fail|to Move Revenue",
        subtitle: "Hypothesis-free tests, vanity metrics, and one-and-done projects that never touch pipeline.",
        points: [
          { title: "Tests without hypotheses", description: "Button color tests do not compound. We test assumptions about why people do not buy." },
          { title: "Vanity metrics", description: "Click-through goes up. Revenue stays flat. We optimize for pipeline, not dashboard green." },
          { title: "No statistical rigor", description: "Calling a winner after four days invalidates the test. We wait for significance or we do not ship." },
          { title: "One-and-done mentality", description: "CRO is a system that runs every month. Not a project you finish and forget." },
        ],
      },
      {
        headline: "Por Qué los Proyectos CRO|No Mueven Ingresos",
        subtitle: "Tests sin hipótesis, métricas vanidad y proyectos únicos que nunca tocan el pipeline.",
        points: [
          { title: "Tests sin hipótesis", description: "Cambios aleatorios no se acumulan." },
          { title: "Métricas vanidad", description: "CTR sube, ingresos planos." },
          { title: "Sin rigor estadístico", description: "Mirar resultados temprano invalida tests." },
          { title: "Mentalidad única", description: "CRO es un sistema continuo, no un proyecto." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "Landscaping Company",
          challenge:
            "Service pages converted at 1.8% with the CTA buried below the fold, a seven-field contact form, and a mobile layout that broke on the pages where most traffic arrived.",
          approach:
            "We ran structured A/B tests on form length, CTA placement, and mobile UX on the highest-traffic service pages, starting with session recordings that showed 68% of mobile visitors never scrolled past the hero.",
          outcome:
            "Conversion rate went from 1.8% to 8.4% after winning variations rolled out site-wide. Qualified leads grew 4.8× in 10 months on the same traffic volume.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Jardinería",
          challenge:
            "Las páginas de servicio convertían al 1.8% con el CTA enterrado, un formulario de siete campos y un layout móvil que se rompía en las páginas donde llegaba la mayoría del tráfico.",
          approach:
            "Ejecutamos tests A/B estructurados en longitud de formulario, ubicación del CTA y UX móvil en las páginas de servicio de mayor tráfico, empezando con grabaciones de sesión que mostraron que el 68% de visitantes móviles nunca pasaban del hero.",
          outcome:
            "La tasa de conversión pasó del 1.8% al 8.4% tras desplegar las variaciones ganadoras en todo el sitio. Los leads calificados crecieron 4.8× en 10 meses con el mismo volumen de tráfico.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
    },
  },

  "email-marketing": {
    visualVariant: "dashboard",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(["EmailSequences", "Automation", "ListGrowth"]),
    serviceSectionKeys: ["EmailSequences", "Automation", "ListGrowth"],
    whyKinexus: why(
      {
        headline: "The Kinexus Email|Revenue System",
        subtitle: "Behavioral sequences, deliverability discipline, and every flow tied to pipeline, not open-rate bragging.",
        points: [
          { title: "Revenue infrastructure, not newsletters", description: "Sequences built to move leads through decision stages toward booked calls. Not monthly blasts nobody reads." },
          { title: "Segmentation by behavior", description: "What someone clicked, opened, or ignored determines what they get next. Not what list they landed on two years ago." },
          { title: "Deliverability first", description: "List hygiene, SPF/DKIM, and sender reputation before we crank up volume. Inboxes matter more than open rate bragging." },
          { title: "Revenue attribution", description: "Every sequence tied to pipeline contribution. Open rates are context, not the scoreboard." },
        ],
      },
      {
        headline: "El Sistema de Email|Revenue Kinexus",
        subtitle: "Secuencias comportamentales, entregabilidad primero y cada flujo ligado al pipeline, no a tasas de apertura.",
        points: [
          { title: "Infraestructura de ingresos", description: "Secuencias que mueven leads hacia llamadas reservadas." },
          { title: "Segmentación por comportamiento", description: "El mensaje correcto según señales de engagement." },
          { title: "Entregabilidad primero", description: "Higiene de lista y reputación antes de volumen." },
          { title: "Atribución de ingresos", description: "Cada secuencia ligada a pipeline, no solo opens." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "SaaS Platform",
          challenge:
            "12,000 subscribers but only a single welcome email automated. Monthly newsletters averaged 22% opens with zero demo bookings attributed to email touchpoints.",
          approach:
            "We mapped the full subscriber lifecycle from opt-in to demo booking, built a 7-email nurture sequence triggered by content engagement and page visits, segmented inactive contacts for re-engagement, and tied every send to demo booking events in the CRM.",
          outcome:
            "42% average open rate on behavioral nurture sequences and demo booking rate up 180% after trigger-based flows tied to content engagement.",
          href: "/case-studies/saas-platform-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Plataforma SaaS",
          challenge:
            "12.000 suscriptores con solo un email de bienvenida automatizado. Los newsletters mensuales promediaban 22% de apertura con cero reservas de demo atribuidas a email.",
          approach:
            "Mapeamos el ciclo de vida completo del suscriptor desde el opt-in hasta la reserva de demo, construimos una secuencia de nurture de 7 emails disparada por engagement con contenido y visitas a páginas, segmentamos contactos inactivos para re-engagement y vinculamos cada envío a eventos de reserva de demo en el CRM.",
          outcome:
            "42% de apertura promedio en secuencias de nurture conductual y +180% en reservas de demo tras flujos basados en disparadores ligados al engagement con contenido.",
          href: "/case-studies/saas-platform-growth",
        },
      },
    },
  },

  "content-marketing": {
    visualVariant: "split",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(["ContentFunnel", "Production", "Distribution"]),
    serviceSectionKeys: ["ContentFunnel", "Production", "Distribution"],
    whyKinexus: why(
      {
        headline: "Why Content Marketing|Doesn't Convert",
        subtitle: "Articles with no intent target, no lead capture path, and traffic that never raises a hand.",
        points: [
          { title: "Content without intent mapping", description: "Articles go live with no keyword target and no funnel stage. They rank for nothing and convert less." },
          { title: "No lead capture path", description: "Traffic arrives, reads, leaves. No gated asset, no nurture sequence, no reason to raise a hand." },
          { title: "Publish and pray", description: "One blog post, zero distribution, zero repurposing. Reach dies the day it publishes." },
          { title: "Vanity traffic metrics", description: "Pageviews climb. Pipeline stays flat. We tie every piece to qualified leads or we kill it." },
        ],
      },
      {
        headline: "Por Qué el Content Marketing|No Convierte",
        subtitle: "Artículos sin objetivo de intención, sin ruta de captura y tráfico que nunca levanta la mano.",
        points: [
          { title: "Contenido sin mapa de intención", description: "Artículos sin alineación de keyword o etapa de embudo." },
          { title: "Sin ruta de captura", description: "Tráfico sin activo gated o secuencia de nurture." },
          { title: "Publicar y rezar", description: "Sin repurposing ni sistema de distribución." },
          { title: "Métricas vanidad", description: "Pageviews suben, pipeline plano." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "SaaS Platform",
          challenge:
            "Blog published twice a month on topics picked in meetings, not from keyword research. Traffic grew 40% year over year but demo requests stayed flat because no piece linked to a lead magnet or service page.",
          approach:
            "We built topic clusters around commercial-intent keywords, wrote bottom-of-funnel guides with gated assets, wired internal links to demo and pricing pages, and connected content analytics to CRM demo attribution.",
          outcome:
            "5.9× demo growth and 62% of demos attributed to the content engine after topic clusters, bottom-of-funnel guides, and internal linking to conversion pages.",
          href: "/case-studies/saas-platform-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Plataforma SaaS",
          challenge:
            "Blog con temas elegidos en reuniones, no por keywords. El tráfico creció pero las demos se mantuvieron planas porque ninguna pieza enlazaba a un lead magnet o página de servicio.",
          approach:
            "Construimos clusters de temas en torno a keywords comerciales, escribimos guías de fondo de embudo con activos gated, enlazamos internamente a páginas de demo y precios, y conectamos analítica de contenido a atribución de demos en el CRM.",
          outcome:
            "5.9× crecimiento en demos y 62% de demos atribuidas al motor de contenido tras clusters, guías de fondo de embudo y enlaces internos a páginas de conversión.",
          href: "/case-studies/saas-platform-growth",
        },
      },
    },
  },

  "social-media": {
    visualVariant: "dashboard",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(["PlatformStrategy", "ContentPillars", "Community"]),
    serviceSectionKeys: ["PlatformStrategy", "ContentPillars", "Community"],
    whyKinexus: why(
      {
        headline: "The Kinexus Social|Growth Framework",
        subtitle: "Platform fit over checklist presence, content pillars with ROI, and social wired into retargeting and pipeline.",
        points: [
          { title: "Platform fit over presence", description: "We pick the two networks where your buyers actually show up. Not all six because a checklist said to." },
          { title: "Content pillars with ROI", description: "Every post category maps to a funnel stage and a number we can report on." },
          { title: "Paid + organic integration", description: "Organic posts feed retargeting pools and ad creative tests. Social is not a standalone island." },
          { title: "Community as pipeline", description: "Comments and DMs trigger sales follow-up. Likes alone do not pay rent." },
        ],
      },
      {
        headline: "El Marco de Crecimiento|Social Kinexus",
        subtitle: "Ajuste de plataforma, pilares con ROI y social integrado con retargeting y pipeline.",
        points: [
          { title: "Ajuste de plataforma", description: "Enfocamos donde tus compradores realmente interactúan." },
          { title: "Pilares con ROI", description: "Cada categoría de contenido mapea a una etapa de embudo." },
          { title: "Paid + orgánico integrado", description: "Contenido social alimenta retargeting y pruebas creativas." },
          { title: "Comunidad como pipeline", description: "Señales de engagement activan conversaciones de ventas." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "SaaS Platform",
          challenge:
            "LinkedIn posts went out twice a month with no content pillars. Follower count grew but website clicks and demo pipeline stayed flat because nothing connected social to offers.",
          approach:
            "We built four content pillars aligned to SEO topic clusters, standardized posting cadence on LinkedIn, added a clear demo path to every post, and wired social traffic into retargeting pools for warm follow-up.",
          outcome:
            "2.1x inbound leads from social traffic after content pillar strategy aligned posts to SEO topics and every post included a clear path to demo booking.",
          href: "/case-studies/saas-platform-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Plataforma SaaS",
          challenge:
            "Publicaciones en LinkedIn salían dos veces al mes sin pilares de contenido. Los seguidores crecieron pero los clics al sitio y el pipeline de demos se mantuvieron planos porque nada conectaba social con ofertas.",
          approach:
            "Construimos cuatro pilares de contenido alineados a clusters SEO, estandarizamos la cadencia en LinkedIn, añadimos una ruta clara a demo en cada publicación y conectamos el tráfico social a pools de retargeting.",
          outcome:
            "2.1x leads entrantes desde tráfico social tras estrategia de pilares alineada a temas SEO y cada publicación con ruta clara a reserva de demo.",
          href: "/case-studies/saas-platform-growth",
        },
      },
    },
  },

  "video-marketing": {
    visualVariant: "mockup",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(["VideoProduction", "VideoDistribution", "VideoStrategy"]),
    serviceSectionKeys: ["VideoProduction", "VideoDistribution", "VideoStrategy"],
    whyKinexus: why(
      {
        headline: "What Makes Kinexus Video|Different",
        subtitle: "Scripts mapped to funnel stages, repurposing built into every shoot, and performance tracked to booked calls.",
        points: [
          { title: "Conversion-first scripts", description: "Every video maps to a funnel stage and a CTA. Brand montages are fine for the about page, not for paid spend." },
          { title: "Repurposing built in", description: "One shoot produces ad cuts, social clips, email embeds, and landing page assets. Production cost spreads across channels." },
          { title: "Platform-native formats", description: "Vertical for Reels, square for feed, long-form for YouTube. Same message, right dimensions per channel." },
          { title: "Performance tracking", description: "View-through, engagement, and pipeline attribution on every asset. We know which video booked the call." },
        ],
      },
      {
        headline: "Qué Hace Diferente|el Video de Kinexus",
        subtitle: "Scripts por etapa de embudo, repurposing en cada producción y rendimiento rastreado hasta llamadas reservadas.",
        points: [
          { title: "Scripts orientados a conversión", description: "Cada video mapea a etapa de embudo y CTA." },
          { title: "Repurposing integrado", description: "Una producción genera ads, clips sociales y embeds." },
          { title: "Formatos nativos", description: "Vertical, cuadrado y largo optimizados por canal." },
          { title: "Tracking de rendimiento", description: "Atribución de view-through y pipeline en cada activo." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "SaaS Platform",
          challenge:
            "One three-minute brand video sat on the homepage. No ad cuts, no vertical formats, no refresh cycle. Meta campaigns stalled because new creative took six weeks and $8,000 per round.",
          approach:
            "We built a monthly production workflow with scripts mapped to funnel stages, delivered 4 to 6 platform-native cuts per shoot, and set a refresh cadence so Meta always had new creative to test.",
          outcome:
            "65% average video completion on ad cuts and CPM dropped 38% after a monthly production workflow delivered 4 to 6 platform-native assets per shoot.",
          href: "/case-studies/saas-platform-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Plataforma SaaS",
          challenge:
            "Un solo video de marca de tres minutos en la homepage. Sin cortes para ads, sin formatos verticales, sin ciclo de refresco. Las campañas en Meta se estancaron porque el creativo nuevo tardaba seis semanas y $8,000 por ronda.",
          approach:
            "Construimos un flujo de producción mensual con guiones mapeados a etapas de embudo, entregamos 4 a 6 cortes nativos por plataforma por rodaje y fijamos una cadencia de refresco para que Meta siempre tuviera creativo nuevo para probar.",
          outcome:
            "65% de finalización en cortes de ads y CPM -38% tras un flujo mensual que entregó 4 a 6 activos nativos por plataforma por rodaje.",
          href: "/case-studies/saas-platform-growth",
        },
      },
    },
  },

  branding: {
    visualVariant: "mockup",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(["BrandIdentity", "VisualSystem", "BrandGuidelines"]),
    serviceSectionKeys: ["BrandIdentity", "VisualSystem", "BrandGuidelines"],
    whyKinexus: why(
      {
        headline: "Why Brand Projects|Fall Flat",
        subtitle: "Pretty logos without positioning, guidelines nobody uses, and launches that never reach your site or ad account.",
        points: [
          { title: "Aesthetics without positioning", description: "Beautiful logo on a business that cannot explain why someone should pick them over the next tab." },
          { title: "Guidelines nobody uses", description: "100-page PDF that collects dust. We build systems your team applies in web, ads, and email." },
          { title: "No digital application", description: "Rebrand launches on stationery while the website and ad account still look like 2019." },
          { title: "Launch without alignment", description: "New visual identity, same confused messaging. Sales and marketing still tell different stories." },
        ],
      },
      {
        headline: "Por Qué los Proyectos de Marca|Fracasan",
        subtitle: "Logos bonitos sin posicionamiento, guías que nadie usa y lanzamientos que no llegan a web ni ads.",
        points: [
          { title: "Estética sin posicionamiento", description: "Logos bonitos en negocios sin propuesta clara." },
          { title: "Guías que nadie usa", description: "PDFs de 100 páginas que acumulan polvo." },
          { title: "Sin aplicación digital", description: "Identidad que no traduce a web, ads y email." },
          { title: "Lanzamiento sin alineación", description: "Nueva marca, mismo mensaje confuso." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "Landscaping Company",
          challenge:
            "Website, Google Ads, and proposal templates used three different taglines and color palettes. Prospects in discovery calls said the company felt like three separate businesses.",
          approach:
            "We ran positioning workshops, unified messaging and visual identity, then rolled out the new brand across the website, ad account, and sales collateral in one coordinated launch.",
          outcome:
            "2.1x conversion lift after unified positioning, visual identity, and messaging applied across site, ads, and sales collateral in one rollout.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Jardinería",
          challenge:
            "Web, Google Ads y plantillas de propuesta usaban tres taglines y paletas de color distintas. Los prospectos en llamadas de descubrimiento decían que la empresa parecía tres negocios separados.",
          approach:
            "Ejecutamos talleres de posicionamiento, unificamos mensajería e identidad visual, y desplegamos la nueva marca en sitio web, cuenta de anuncios y material de ventas en un lanzamiento coordinado.",
          outcome:
            "2.1x mejora en conversión tras posicionamiento, identidad visual y mensajería unificados en sitio, ads y material de ventas en un solo rollout.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
    },
  },

  analytics: {
    visualVariant: "dashboard",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(["DataStack", "Dashboards", "Attribution"]),
    serviceSectionKeys: ["DataStack", "Dashboards", "Attribution"],
    whyKinexus: why(
      {
        headline: "Why Most Analytics Setups|Lie",
        subtitle: "Tracking installed but disconnected from booked calls, last-click attribution, and dashboards nobody acts on.",
        points: [
          { title: "Tracking without strategy", description: "GA4 is installed but events do not map to booked calls, purchases, or pipeline stages." },
          { title: "Last-click delusion", description: "Single-touch attribution gives all credit to the last ad someone clicked. The channels that started the journey stay invisible." },
          { title: "Dashboards nobody reads", description: "Data dumps with 47 charts. We build views that answer one question: what should we do next week?" },
          { title: "No CRM connection", description: "Marketing reports leads. Sales reports revenue. Nobody connects the two without a spreadsheet marathon." },
        ],
      },
      {
        headline: "Por Qué la Mayoría de Analytics|Miente",
        subtitle: "Tracking instalado pero desconectado de llamadas reservadas, atribución last-click y dashboards que nadie usa.",
        points: [
          { title: "Tracking sin estrategia", description: "GA4 instalado pero eventos no mapean a resultados." },
          { title: "Delirio last-click", description: "Atribución de un toque oculta canales que inician journeys." },
          { title: "Dashboards que nadie lee", description: "Volcados de datos en vez de KPIs accionables." },
          { title: "Sin conexión CRM", description: "Métricas de marketing desconectadas de ingresos cerrados." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "Plumbing Company",
          challenge:
            "Marketing reported 180 monthly leads from Google Ads but the CRM showed only 38 qualified. Page views were counted as conversions and phone calls were not tracked at all.",
          approach:
            "We audited every conversion event, rebuilt GA4 and call tracking around qualified leads, integrated CRM offline conversion import, and built dashboards that tied spend to closed jobs.",
          outcome:
            "40% reduction in wasted ad spend after GA4, call tracking, and CRM integration connected every lead to its source campaign and sales outcome.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Plomería",
          challenge:
            "Marketing reportaba 180 leads mensuales de Google Ads pero el CRM mostraba solo 38 calificados. Las vistas de página contaban como conversiones y las llamadas no se rastreaban.",
          approach:
            "Auditamos cada evento de conversión, reconstruimos GA4 y tracking de llamadas en torno a leads calificados, integramos importación offline al CRM y construimos dashboards que vinculaban gasto a trabajos cerrados.",
          outcome:
            "40% reducción de gasto desperdiciado tras integración de GA4, llamadas y CRM que conectó cada lead a su campaña y resultado de ventas.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
    },
  },

  "growth-consulting": {
    visualVariant: "split",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(["GrowthAudit", "ChannelMix", "Roadmap"]),
    serviceSectionKeys: ["GrowthAudit", "ChannelMix", "Roadmap"],
    whyKinexus: why(
      {
        headline: "The Kinexus Growth|Audit Framework",
        subtitle: "Full revenue-system diagnosis before anyone recommends a channel, with margin-aware recommendations and execution included.",
        points: [
          { title: "Diagnosis before prescription", description: "We audit your full revenue system before recommending channels. No cookie-cutter channel mix." },
          { title: "Channel interdependencies", description: "SEO, paid, email, and CRO work as one engine. Fixing one leak while ignoring three others wastes money." },
          { title: "Margin-aware growth", description: "Recommendations account for CAC, LTV, and payback period. Growth that destroys margin is not growth." },
          { title: "Execution included", description: "Strategy without implementation is a deck. We can run what we recommend if you want one team accountable." },
        ],
      },
      {
        headline: "El Marco de Auditoría|de Crecimiento Kinexus",
        subtitle: "Diagnóstico completo del sistema de ingresos antes de recomendar canales, con recomendaciones conscientes del margen.",
        points: [
          { title: "Diagnóstico antes de prescripción", description: "Auditamos tu sistema de ingresos completo antes de recomendar canales." },
          { title: "Interdependencias de canal", description: "SEO, paid, email y CRO como un motor." },
          { title: "Crecimiento con margen", description: "Recomendaciones consideran CAC, LTV y payback." },
          { title: "Ejecución incluida", description: "Estrategia sin implementación es un deck." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "SaaS Platform",
          challenge:
            "$18,000 per month spread across an SEO freelancer, Meta ads, and a content writer with no shared strategy, attribution model, or quarterly plan tying spend to MRR.",
          approach:
            "We audited every active channel, mapped interdependencies between SEO, paid, and content, reallocated budget toward content-led SEO, cut underperforming Meta prospecting, and delivered a 90-day execution roadmap with KPI targets.",
          outcome:
            "45% blended CPL reduction after a channel audit reallocated budget toward content-led SEO, cut underperforming Meta prospecting, and delivered a 90-day execution roadmap.",
          href: "/case-studies/saas-platform-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Plataforma SaaS",
          challenge:
            "$18,000 al mes repartidos entre un freelancer SEO, Meta ads y un redactor sin estrategia compartida, modelo de atribución ni plan trimestral que ligara gasto a MRR.",
          approach:
            "Auditamos cada canal activo, mapeamos interdependencias entre SEO, paid y contenido, reasignamos presupuesto hacia SEO liderado por contenido, cortamos prospección Meta de bajo rendimiento y entregamos un roadmap de ejecución de 90 días con KPIs.",
          outcome:
            "45% reducción de CPL combinado tras auditoría de canales, reasignación hacia SEO por contenido, corte de prospección Meta y roadmap de 90 días.",
          href: "/case-studies/saas-platform-growth",
        },
      },
    },
  },

  funnels: {
    visualVariant: "chart",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(["FunnelMapping", "Automation", "ConversionPaths"]),
    serviceSectionKeys: ["FunnelMapping", "Automation", "ConversionPaths"],
    whyKinexus: why(
      {
        headline: "Why Conversion Systems|Leak Revenue",
        subtitle: "Stage gaps between traffic and sales, pages built on gut feel, and funnels left alone after launch day.",
        points: [
          { title: "Gaps between funnel stages", description: "Traffic arrives but nurture stops at the form fill. Nobody tracks where leads drop between stages." },
          { title: "Pages built without data", description: "Landing pages launch on gut feel. No heatmaps, no session recordings, no tests to validate the layout." },
          { title: "Manual handoffs and blind spots", description: "Sales gets cold leads because automation ends at submit. Marketing never sees what happens after handoff." },
          { title: "One-and-done mentality", description: "Funnels get built once and left alone. CRO treated as a project instead of a monthly discipline." },
        ],
      },
      {
        headline: "Por Qué los Sistemas de Conversión|Pierden Ingresos",
        subtitle: "Brechas entre tráfico y ventas, páginas por intuición y embudos abandonados después del lanzamiento.",
        points: [
          { title: "Brechas entre etapas", description: "El tráfico llega pero no hay nurture ni pruebas que identifiquen dónde se pierden los leads." },
          { title: "Páginas sin datos", description: "Landing pages se lanzan con suposiciones en lugar de heatmaps, grabaciones y tests A/B." },
          { title: "Handoffs manuales", description: "Ventas recibe leads fríos porque la automatización para en el formulario y no hay tracking por etapa." },
          { title: "Mentalidad única", description: "Los embudos se construyen una vez y no se optimizan. CRO se trata como proyecto, no como sistema." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "SaaS Platform",
          challenge:
            "Paid traffic landed on the homepage. Leads got one welcome email then went cold. Demo booking rate was 2.1% with no nurture sequence, retargeting, or A/B testing on the booking flow.",
          approach:
            "We rebuilt the funnel with dedicated landing pages, a 7-email nurture sequence triggered by content engagement, retargeting pools for warm visitors, and structured A/B tests on pricing and demo booking pages.",
          outcome:
            "5.9× demo growth after funnel rebuild with dedicated landing pages, a 7-email nurture sequence, retargeting pools, and structured tests on pricing and demo booking pages.",
          href: "/case-studies/saas-platform-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Plataforma SaaS",
          challenge:
            "El tráfico pagado llegaba a la homepage. Los leads recibían un email de bienvenida y se enfriaban. La tasa de demo era del 2.1% sin secuencia de nurture, retargeting ni tests A/B en el flujo de reserva.",
          approach:
            "Reconstruimos el embudo con landing pages dedicadas, secuencia de nurture de 7 emails disparada por engagement con contenido, pools de retargeting para visitantes tibios y tests A/B estructurados en páginas de precios y demo.",
          outcome:
            "5.9× crecimiento en demos tras rebuild con landing pages dedicadas, nurture de 7 emails, retargeting y tests en páginas de precios y demo.",
          href: "/case-studies/saas-platform-growth",
        },
      },
    },
  },

  "youtube-ads": {
    visualVariant: "dashboard",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(genericCapabilityKeys("youtube-ads")),
    serviceSectionKeys: genericCapabilityKeys("youtube-ads"),
    whyKinexus: why(
      {
        headline: "Why YouTube Campaigns|Get Skipped",
        subtitle: "Repurposed TV spots, no skip-proof hook, and view counts that never connect to a booked call.",
        points: [
          { title: "The first five seconds waste", description: "The ad opens with a logo and a slow build. By the time the pitch arrives, the viewer already hit skip." },
          { title: "One campaign for everyone", description: "Cold prospects, warm visitors, and past customers all see the same video. None of them get the right message." },
          { title: "Targeting on autopilot", description: "Broad audiences and content exclusions left at default burn budget on views that were never going to convert." },
          { title: "Views counted as results", description: "The dashboard celebrates impressions and watch time while the CRM shows nothing tied back to the spend." },
        ],
      },
      {
        headline: "Por Qué las Campañas de YouTube|se Saltan",
        subtitle: "Spots de TV reciclados, sin hook a prueba de skip y vistas que nunca se conectan a una llamada reservada.",
        points: [
          { title: "Los primeros cinco segundos", description: "El anuncio abre con un logo lento. Para cuando llega la propuesta, el espectador ya saltó." },
          { title: "Una campaña para todos", description: "Prospectos fríos y clientes previos ven el mismo video. Ninguno recibe el mensaje correcto." },
          { title: "Segmentación en automático", description: "Audiencias amplias y exclusiones por defecto queman presupuesto en vistas que no convierten." },
          { title: "Vistas como resultado", description: "El dashboard celebra impresiones mientras el CRM no muestra nada ligado al gasto." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "SaaS Platform",
          challenge:
            "A single three-minute explainer ran as a YouTube in-stream campaign to a broad audience with no retargeting layer and no view-through tracking. Spend looked wasted on paper because demo bookings never tied back to the channel.",
          approach:
            "We split campaigns by intent across in-stream and Shorts, built custom audiences from search keywords and site visitors, tested three hook openings in the first five seconds, and rebuilt view-through tracking so demo bookings attributed to YouTube within the sales cycle.",
          outcome:
            "CPA dropped 31% after intent-based audiences, hook testing, and a retargeting layer tied view-through conversions back to demo bookings.",
          href: "/case-studies/saas-platform-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Plataforma SaaS",
          challenge:
            "Un solo explainer de tres minutos corría como campaña in-stream a una audiencia amplia sin capa de retargeting ni tracking view-through. El gasto parecía desperdiciado porque las reservas de demo nunca se ligaban al canal.",
          approach:
            "Separamos campañas por intención en in-stream y Shorts, construimos audiencias personalizadas desde keywords de búsqueda y visitantes del sitio, probamos tres aperturas de hook en los primeros cinco segundos y reconstruimos el tracking view-through para atribuir reservas de demo a YouTube dentro del ciclo de ventas.",
          outcome:
            "CPA -31% tras audiencias por intención, pruebas de hook y una capa de retargeting que ligó conversiones view-through a reservas de demo.",
          href: "/case-studies/saas-platform-growth",
        },
      },
    },
  },

  "landing-pages": {
    visualVariant: "comparison",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(genericCapabilityKeys("landing-pages")),
    serviceSectionKeys: genericCapabilityKeys("landing-pages"),
    whyKinexus: why(
      {
        headline: "Why Campaign Traffic Dies|on the Homepage",
        subtitle: "One page answering ten questions, no message match, and forms that ask for everything up front.",
        points: [
          { title: "Homepage as catch-all", description: "A homepage serves ten visitor types at once. The person who clicked your ad has to hunt for the one thing they came for." },
          { title: "Ad and page disconnect", description: "The ad promises one thing, the page says another. The visitor second-guesses the click and bounces." },
          { title: "Forms built for you, not them", description: "Seven fields and a vague CTA. Every extra field is another reason to leave without converting." },
          { title: "Launched and never tested", description: "The page ships once and never changes, so the easy wins hiding in the headline and layout stay on the table." },
        ],
      },
      {
        headline: "Por Qué el Tráfico de Campaña|Muere en la Homepage",
        subtitle: "Una página respondiendo diez preguntas, sin coherencia con el anuncio y formularios que piden todo de entrada.",
        points: [
          { title: "Homepage como cajón de sastre", description: "Sirve a diez tipos de visitante a la vez. Quien hizo clic tiene que buscar lo que vino a encontrar." },
          { title: "Anuncio y página desconectados", description: "El anuncio promete una cosa y la página dice otra. El visitante duda y se va." },
          { title: "Formularios para ti, no para ellos", description: "Siete campos y un CTA vago. Cada campo extra es otra razón para irse." },
          { title: "Lanzada y nunca probada", description: "La página se publica una vez y no cambia, dejando las mejoras fáciles sobre la mesa." },
        ],
      },
    ),
    proof: {
      en: {
        beforeAfter: { beforeLabel: "Before", afterLabel: "After", beforeValue: "1.8%", afterValue: "8.4%", metric: "Conversion Rate" },
        caseStudy: {
          client: "Landscaping Company",
          challenge:
            "Paid clicks landed on a homepage with the CTA below the fold, a seven-field form, and a mobile layout that broke where most traffic arrived.",
          approach:
            "We wireframed a dedicated service page with message match to the Google ad, moved the CTA and phone number into the first mobile viewport, cut the form from seven fields to four, and set up call tracking before launch.",
          outcome:
            "Conversion rate went from 1.8% to 8.4% after a dedicated landing page with message match, a short form, and A/B tests on the headline and layout.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
      es: {
        beforeAfter: { beforeLabel: "Antes", afterLabel: "Después", beforeValue: "1.8%", afterValue: "8.4%", metric: "Tasa de Conversión" },
        caseStudy: {
          client: "Empresa de Jardinería",
          challenge:
            "Los clics pagados llegaban a una homepage con el CTA enterrado, un formulario de siete campos y un layout móvil que se rompía donde llegaba la mayoría del tráfico.",
          approach:
            "Wireframeamos una página de servicio dedicada con coherencia de mensaje al anuncio de Google, movimos el CTA y el teléfono al primer viewport móvil, redujimos el formulario de siete a cuatro campos y configuramos tracking de llamadas antes del lanzamiento.",
          outcome:
            "Conversión del 1.8% al 8.4% tras una landing page dedicada con coherencia de mensaje, formulario corto y tests A/B en titular y layout.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
    },
  },

  "website-maintenance": {
    visualVariant: "dashboard",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(genericCapabilityKeys("website-maintenance")),
    serviceSectionKeys: genericCapabilityKeys("website-maintenance"),
    whyKinexus: why(
      {
        headline: "Why Neglected Sites Break|at the Worst Time",
        subtitle: "Auto-updates that crash pages, no tested backups, and problems nobody catches until a customer does.",
        points: [
          { title: "Auto-updates with no safety net", description: "A plugin updates itself, a page breaks, and nobody notices until a lead tries to submit a form and can't." },
          { title: "Backups nobody has tested", description: "There is a backup somewhere, but no one has ever restored it. You find out it was incomplete during an outage." },
          { title: "Security left to chance", description: "Outdated plugins are the front door for malware. An infected site gets blocklisted and traffic disappears." },
          { title: "No one to call", description: "A small edit becomes a week-long wait because there is no developer on hand and no support arrangement in place." },
        ],
      },
      {
        headline: "Por Qué los Sitios Descuidados|Fallan en el Peor Momento",
        subtitle: "Auto-actualizaciones que rompen páginas, respaldos sin probar y problemas que nadie detecta hasta que un cliente lo hace.",
        points: [
          { title: "Auto-updates sin red de seguridad", description: "Un plugin se actualiza, una página se rompe, y nadie lo nota hasta que un lead no puede enviar un formulario." },
          { title: "Respaldos que nadie probó", description: "Hay un respaldo, pero nunca se restauró. Descubres que estaba incompleto durante una caída." },
          { title: "Seguridad al azar", description: "Plugins desactualizados son la puerta al malware. Un sitio infectado entra en listas negras y el tráfico desaparece." },
          { title: "Nadie a quién llamar", description: "Una edición pequeña se vuelve una espera de una semana porque no hay desarrollador ni soporte disponible." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "Landscaping Company",
          challenge:
            "Plugin auto-updates broke the contact form during peak season. Nobody noticed until booked jobs dropped and the backup had never been tested.",
          approach:
            "We set up staging-tested updates, daily off-site backups with quarterly restore tests, uptime monitoring with alerts, and a monthly developer support block so edits never waited on a freelancer hunt.",
          outcome:
            "Proactive maintenance, staging-tested updates, and monitored backups kept the site stable through the next peak. Lead flow recovered within two weeks.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Jardinería",
          challenge:
            "Las auto-actualizaciones de plugins rompieron el formulario de contacto en temporada alta. Nadie lo notó hasta que cayeron los trabajos reservados.",
          approach:
            "Configuramos updates probados en staging, respaldos diarios externos con pruebas trimestrales de restauración, monitoreo de uptime con alertas y un bloque mensual de soporte de desarrollador.",
          outcome:
            "Mantenimiento proactivo, updates probados en staging y respaldos monitoreados mantuvieron el sitio estable. El flujo de leads se recuperó en dos semanas.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
    },
  },

  "website-speed": {
    visualVariant: "chart",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(genericCapabilityKeys("website-speed")),
    serviceSectionKeys: genericCapabilityKeys("website-speed"),
    whyKinexus: why(
      {
        headline: "Why Slow Sites|Lose Traffic Twice",
        subtitle: "Unoptimized images, render-blocking scripts, no caching, and a slow server that costs rankings and conversions.",
        points: [
          { title: "Page weight nobody manages", description: "Full-resolution images and every plugin's scripts load on every page. The homepage weighs more than it needs to by megabytes." },
          { title: "Render-blocking everything", description: "CSS and JavaScript block the first paint, so visitors stare at a blank screen while the browser works through the queue." },
          { title: "Core Web Vitals ignored", description: "LCP, CLS, and INP fail on mobile. Google factors that into rankings, so you lose the click before the page even loads." },
          { title: "Fixes without proof", description: "Someone installs a caching plugin and calls it done, with no before-and-after data to show anything actually improved." },
        ],
      },
      {
        headline: "Por Qué los Sitios Lentos|Pierden Tráfico Dos Veces",
        subtitle: "Imágenes sin optimizar, scripts que bloquean el render, sin caché y un servidor lento que cuesta rankings y conversiones.",
        points: [
          { title: "Peso de página sin gestionar", description: "Imágenes a resolución completa y scripts de cada plugin cargan en cada página. Pesa megabytes de más." },
          { title: "Todo bloquea el render", description: "CSS y JavaScript bloquean el primer pintado, y el visitante mira una pantalla en blanco." },
          { title: "Core Web Vitals ignorados", description: "LCP, CLS e INP fallan en móvil. Google lo pondera en rankings y pierdes el clic antes de cargar." },
          { title: "Arreglos sin prueba", description: "Alguien instala un plugin de caché y lo da por hecho, sin datos de antes y después." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "Landscaping Company",
          challenge:
            "The site scored in the 40s on mobile Lighthouse with a 6-second load, unoptimized hero images, and render-blocking scripts on every page.",
          approach:
            "We audited field and lab Core Web Vitals data, compressed and resized hero images, deferred render-blocking scripts, configured caching and a CDN, and re-measured after each phase.",
          outcome:
            "Lighthouse hit 94 and median load time dropped 58% after image optimization, script cleanup, caching, and server tuning brought Core Web Vitals into the green.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Jardinería",
          challenge:
            "El sitio puntuaba en los 40 en Lighthouse móvil con carga de 6 segundos e imágenes sin optimizar.",
          approach:
            "Auditamos datos de laboratorio y campo de Core Web Vitals, comprimimos imágenes hero, diferimos scripts que bloqueaban render, configuramos caché y CDN, y re-medimos tras cada fase.",
          outcome:
            "Lighthouse llegó a 94 y el tiempo de carga bajó 58% tras optimización de imágenes, limpieza de scripts y caché.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
    },
  },

  "microsoft-ads": {
    visualVariant: "dashboard",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(genericCapabilityKeys("microsoft-ads")),
    serviceSectionKeys: genericCapabilityKeys("microsoft-ads"),
    whyKinexus: why(
      {
        headline: "Why Advertisers Miss|Microsoft Ads",
        subtitle: "Imported campaigns, ignored settings, and a cheaper audience nobody bothers to reach.",
        points: [
          { title: "Straight Google import", description: "Campaigns get copied over untouched, so bids and structure built for Google's auction underperform on Bing." },
          { title: "Cheaper clicks ignored", description: "Lower competition means lower CPCs, but only if someone actually manages the account instead of letting it idle." },
          { title: "LinkedIn targeting unused", description: "Only Microsoft lets you target by company, industry, and job function, and almost no one turns it on." },
          { title: "No separate tracking", description: "Without its own conversion tracking, Microsoft spend looks invisible next to Google and gets cut by default." },
        ],
      },
      {
        headline: "Por Qué la Mayoría|Ignora Microsoft Ads",
        subtitle: "Campañas importadas, ajustes ignorados y una audiencia más barata que nadie aprovecha.",
        points: [
          { title: "Importación directa de Google", description: "Las campañas se copian sin ajustar, y la estructura de Google rinde mal en la subasta de Bing." },
          { title: "Clics más baratos ignorados", description: "Menos competencia significa menor CPC, pero solo si alguien gestiona la cuenta de verdad." },
          { title: "Targeting de LinkedIn sin usar", description: "Solo Microsoft permite segmentar por empresa, industria y puesto, y casi nadie lo activa." },
          { title: "Sin tracking propio", description: "Sin conversiones propias, el gasto en Microsoft se vuelve invisible frente a Google y se recorta." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "Plumbing Company",
          challenge:
            "Paid budget went entirely to Google Search, where CPCs kept climbing and the account had no room left to scale profitably.",
          approach:
            "We rebuilt the Microsoft account for Bing intent instead of a straight Google import, activated LinkedIn-profile targeting for emergency service decision-makers, and set up dedicated UET conversion tracking tied to qualified calls.",
          outcome:
            "Adding a managed Microsoft Ads program captured qualified calls at a 28% lower cost per lead, expanding reach without raising the blended CPL.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Plomería",
          challenge:
            "Todo el presupuesto iba a Google Search, donde el CPC seguía subiendo sin margen para escalar de forma rentable.",
          approach:
            "Reconstruimos la cuenta Microsoft para intención Bing en vez de una importación directa de Google, activamos targeting por perfil LinkedIn para quienes deciden servicios de emergencia y configuramos tracking UET dedicado ligado a llamadas calificadas.",
          outcome:
            "Sumar un programa gestionado de Microsoft Ads capturó llamadas calificadas con un CPL 28% menor, ampliando el alcance sin subir el CPL combinado.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
    },
  },

  copywriting: {
    visualVariant: "split",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(genericCapabilityKeys("copywriting")),
    serviceSectionKeys: genericCapabilityKeys("copywriting"),
    whyKinexus: why(
      {
        headline: "Why Most Business Copy|Falls Flat",
        subtitle: "Feature lists, borrowed clichés, and a message the reader has to decode.",
        points: [
          { title: "Written about you, not them", description: "Copy that lists what you do instead of naming the problem the reader came in with loses them fast." },
          { title: "Interchangeable claims", description: "\"Trusted, innovative, results-driven.\" Any competitor could paste it. None of it makes anyone act." },
          { title: "No single next step", description: "A page that offers five things asks for none. Without one clear action, the reader just leaves." },
          { title: "Off-brand and inconsistent", description: "Every freelancer sounds different, so the brand voice drifts and trust erodes across channels." },
        ],
      },
      {
        headline: "Por Qué la Mayoría del Copy|Empresarial Falla",
        subtitle: "Listas de características, clichés prestados y un mensaje que el lector tiene que descifrar.",
        points: [
          { title: "Escrito sobre ti, no sobre ellos", description: "El copy que enumera lo que haces en vez de nombrar el problema del lector lo pierde rápido." },
          { title: "Afirmaciones intercambiables", description: "\"Confiable, innovador, orientado a resultados.\" Cualquier competidor lo copiaría. Nadie actúa." },
          { title: "Sin un solo siguiente paso", description: "Una página que ofrece cinco cosas no pide ninguna. Sin una acción clara, el lector se va." },
          { title: "Fuera de marca e inconsistente", description: "Cada freelancer suena distinto, la voz se dispersa y la confianza se erosiona entre canales." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "SaaS Platform",
          challenge:
            "Pages and emails were written by whoever had time, so the message shifted constantly. The site described features instead of outcomes, nurture emails repeated the same pitch, and demo booking rate stayed flat despite rising traffic.",
          approach:
            "We interviewed recent demo bookers and lost deals, built a messaging framework from their language, rewrote the homepage and nurture sequence around a single demo CTA, and ran an editorial pass so sales collateral matched the site.",
          outcome:
            "Demo requests grew from 32 to 189 per month. A 5.9× lift, after a defined voice and conversion-focused rewrites across the site and nurture emails kept the message consistent end to end.",
          href: "/case-studies/saas-platform-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Plataforma SaaS",
          challenge:
            "Las páginas y emails los escribía quien tuviera tiempo, el mensaje cambiaba constantemente. El sitio describía características en vez de resultados, los emails de nurture repetían el mismo pitch y la tasa de reserva de demos se mantuvo plana pese al tráfico creciente.",
          approach:
            "Entrevistamos a quienes reservaron demo y deals perdidos, construimos un marco de mensajería con su lenguaje, reescribimos homepage y secuencia de nurture en torno a un solo CTA de demo, y pasamos material de ventas para alinearlo al sitio.",
          outcome:
            "Las solicitudes de demo crecieron de 32 a 189 al mes, un aumento de 5.9×, tras una voz definida y reescrituras enfocadas en conversión en sitio y emails de nurture que mantuvieron el mensaje consistente de punta a punta.",
          href: "/case-studies/saas-platform-growth",
        },
      },
    },
  },

  "marketing-audits": {
    visualVariant: "chart",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(genericCapabilityKeys("marketing-audits")),
    serviceSectionKeys: genericCapabilityKeys("marketing-audits"),
    whyKinexus: why(
      {
        headline: "Why Stalled Marketing|Fails Where You Think",
        subtitle: "Broken tracking, hidden funnel leaks, and budget defended by assumption instead of data.",
        points: [
          { title: "You can't trust the numbers", description: "When tracking is broken, every decision after it is a guess dressed up as a data point." },
          { title: "The leak is invisible", description: "Traffic is fine, spend is fine, but leads drop somewhere nobody is looking, so nobody fixes it." },
          { title: "Budget on autopilot", description: "Spend keeps flowing to channels because it always has, not because anyone proved they still work." },
          { title: "Symptoms, not causes", description: "Teams add more spend or another channel to cover a problem instead of finding what's actually broken." },
        ],
      },
      {
        headline: "Por Qué el Marketing Estancado|Rara Vez Falla Donde Crees",
        subtitle: "Tracking roto, fugas ocultas en el embudo y presupuesto defendido por suposición, no por datos.",
        points: [
          { title: "No puedes confiar en los números", description: "Con el tracking roto, cada decisión posterior es una suposición disfrazada de dato." },
          { title: "La fuga es invisible", description: "El tráfico está bien y el gasto también, pero los leads caen donde nadie mira, y nadie lo arregla." },
          { title: "Presupuesto en automático", description: "El gasto sigue fluyendo a canales por inercia, no porque alguien probó que siguen funcionando." },
          { title: "Síntomas, no causas", description: "Los equipos suman gasto o canales para tapar el problema en vez de encontrar qué está roto." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "Plumbing Company",
          challenge:
            "Marketing reported 180 monthly leads while the CRM showed only 38 qualified, because page views were counted as conversions and calls went untracked.",
          approach:
            "We validated every conversion event, traced the full funnel from ad click to booked job, ranked channel spend by cost per qualified lead, and delivered a prioritized fix list starting with tracking before budget changes.",
          outcome:
            "An audit surfaced the tracking gaps and wasted spend, and fixing them cut 40% of wasted budget by tying every lead to its real source.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Plomería",
          challenge:
            "Marketing reportaba 180 leads mensuales mientras el CRM mostraba solo 38 calificados, porque las vistas contaban como conversiones y las llamadas no se rastreaban.",
          approach:
            "Validamos cada evento de conversión, trazamos el embudo completo del clic al trabajo reservado, ordenamos el gasto por canal según costo por lead calificado y entregamos una lista priorizada de arreglos empezando por tracking.",
          outcome:
            "Una auditoría reveló las brechas de tracking y el gasto desperdiciado, y corregirlas eliminó 40% de presupuesto perdido al vincular cada lead a su fuente real.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
    },
  },

  "marketing-automation-crm": {
    visualVariant: "dashboard",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(genericCapabilityKeys("marketing-automation-crm")),
    serviceSectionKeys: genericCapabilityKeys("marketing-automation-crm"),
    whyKinexus: why(
      {
        headline: "Why Your Automation Stack|Fights You",
        subtitle: "Half-built workflows, disconnected tools, and leads that fall through the cracks between them.",
        points: [
          { title: "Tools that don't talk", description: "Leads live in one platform, deals in another, and connecting them means another manual export every week." },
          { title: "Workflows left half-done", description: "Someone started automating, hit a snag, and moved on. Now no one trusts what fires and what doesn't." },
          { title: "No handoff rules", description: "Marketing passes leads with no definition of sales-ready, so good leads go cold and sales chases junk." },
          { title: "Revenue you can't trace", description: "Nobody can say which campaign produced the last ten customers, so budget decisions stay blind." },
        ],
      },
      {
        headline: "Por Qué Tu Stack de Automatización|Te Estorba",
        subtitle: "Workflows a medias, herramientas desconectadas y leads que se pierden entre ellas.",
        points: [
          { title: "Herramientas que no se hablan", description: "Los leads viven en una plataforma y los deals en otra, y conectarlos exige otra exportación manual cada semana." },
          { title: "Workflows a medio hacer", description: "Alguien empezó a automatizar, se topó con un problema y siguió. Nadie confía en qué se dispara." },
          { title: "Sin reglas de handoff", description: "Marketing pasa leads sin definir qué es sales-ready, los buenos se enfrían y ventas persigue basura." },
          { title: "Ingresos que no puedes rastrear", description: "Nadie sabe qué campaña generó los últimos diez clientes, y el presupuesto se decide a ciegas." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "SaaS Platform",
          challenge:
            "12,000 contacts sat in the system with a single welcome email automated and no connection between marketing activity and closed deals.",
          approach:
            "We connected forms and ad platforms to the CRM, built behavioral nurture workflows triggered by page visits and content engagement, set lead scoring and sales routing rules, and wired pipeline reporting to demo booking events.",
          outcome:
            "Behavioral automation and clean CRM handoffs lifted demo booking rate 180% once leads were scored, routed, and nurtured automatically.",
          href: "/case-studies/saas-platform-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Plataforma SaaS",
          challenge:
            "12,000 contactos en el sistema con un solo email de bienvenida automatizado y sin conexión entre la actividad de marketing y los deals cerrados.",
          approach:
            "Conectamos formularios y plataformas de anuncios al CRM, construimos workflows de nurture conductual disparados por visitas y engagement con contenido, definimos scoring y reglas de enrutamiento a ventas, y vinculamos informes de pipeline a eventos de reserva de demo.",
          outcome:
            "La automatización conductual y handoffs limpios al CRM subieron la reserva de demos 180% al puntuar, enrutar y nutrir los leads automáticamente.",
          href: "/case-studies/saas-platform-growth",
        },
      },
    },
  },

  "fractional-cmo": {
    visualVariant: "split",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(genericCapabilityKeys("fractional-cmo")),
    serviceSectionKeys: genericCapabilityKeys("fractional-cmo"),
    whyKinexus: why(
      {
        headline: "Why Growing Companies|Get Stuck Without Leadership",
        subtitle: "Junior managers stretched thin, founders running marketing on the side, and no one owning the plan.",
        points: [
          { title: "Strategy by default", description: "Without a leader, marketing becomes a to-do list of tactics with no plan tying spend to revenue." },
          { title: "No one manages the vendors", description: "Agencies and freelancers run unchecked because nobody senior is holding them to outcomes." },
          { title: "Budget spent on feel", description: "With no owner, spend follows habit and opinion instead of the numbers that actually perform." },
          { title: "Too soon for a full-time CMO", description: "A $250K executive is out of reach, so the seat stays empty and the business plateaus." },
        ],
      },
      {
        headline: "Por Qué las Empresas en Crecimiento|se Estancan sin Liderazgo",
        subtitle: "Gerentes junior saturados, fundadores llevando el marketing de lado y nadie dueño del plan.",
        points: [
          { title: "Estrategia por defecto", description: "Sin un líder, el marketing se vuelve una lista de tácticas sin un plan que ligue gasto e ingresos." },
          { title: "Nadie gestiona los proveedores", description: "Agencias y freelancers operan sin control porque nadie senior los responsabiliza por resultados." },
          { title: "Presupuesto por intuición", description: "Sin dueño, el gasto sigue la costumbre y la opinión en vez de los números que rinden." },
          { title: "Muy pronto para un CMO full-time", description: "Un ejecutivo de $250K está fuera de alcance, el puesto queda vacío y el negocio se estanca." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "SaaS Platform",
          challenge:
            "$18,000 a month was split across an SEO freelancer, Meta ads, and a writer with no shared strategy, no attribution, and no one accountable for the whole.",
          approach:
            "We audited every active channel, delivered a quarterly plan tied to MRR targets, reallocated budget toward content-led SEO, cut underperforming Meta prospecting, and held each vendor to weekly KPI reporting.",
          outcome:
            "Embedded marketing leadership reallocated budget, cut underperformers, and drove a 45% lower blended CPL against a single quarterly plan.",
          href: "/case-studies/saas-platform-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Plataforma SaaS",
          challenge:
            "$18,000 al mes repartidos entre un freelancer SEO, Meta ads y un redactor sin estrategia compartida, sin atribución y sin nadie responsable del conjunto.",
          approach:
            "Auditamos cada canal activo, entregamos un plan trimestral ligado a objetivos de MRR, reasignamos presupuesto hacia SEO por contenido, cortamos prospección Meta de bajo rendimiento y responsabilizamos a cada proveedor con KPIs semanales.",
          outcome:
            "Un liderazgo de marketing embebido reasignó el presupuesto, cortó lo que no rendía y logró un CPL combinado 45% menor bajo un plan trimestral único.",
          href: "/case-studies/saas-platform-growth",
        },
      },
    },
  },

  "training-workshops": {
    visualVariant: "mockup",
    visualizationSection: "EditorialOverview",
    sectionOrder: contentRichServiceOrder(genericCapabilityKeys("training-workshops")),
    serviceSectionKeys: genericCapabilityKeys("training-workshops"),
    whyKinexus: why(
      {
        headline: "Why Generic Marketing Courses|Don't Stick",
        subtitle: "Recorded lectures, hypothetical examples, and no bridge from watching to doing.",
        points: [
          { title: "Not about your business", description: "A course on someone else's account teaches the theory but never how it applies to your market and tools." },
          { title: "Watching isn't doing", description: "Passive video builds a false sense of competence that evaporates the moment real work appears." },
          { title: "Knowledge walks out", description: "One person takes the course, learns a little, and none of it becomes a repeatable team process." },
          { title: "No follow-through", description: "The session ends, questions pile up, and without support the new skill quietly fades." },
        ],
      },
      {
        headline: "Por Qué los Cursos Genéricos|de Marketing No se Fijan",
        subtitle: "Clases grabadas, ejemplos hipotéticos y ningún puente entre mirar y hacer.",
        points: [
          { title: "No es sobre tu negocio", description: "Un curso sobre la cuenta de otro enseña la teoría pero nunca cómo aplica a tu mercado y herramientas." },
          { title: "Mirar no es hacer", description: "El video pasivo crea una falsa sensación de dominio que se evapora al aparecer el trabajo real." },
          { title: "El conocimiento se va", description: "Una persona toma el curso, aprende algo, y nada se convierte en un proceso repetible del equipo." },
          { title: "Sin seguimiento", description: "La sesión termina, las dudas se acumulan y sin soporte la nueva habilidad se apaga." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "Professional Services Firm",
          challenge:
            "The team wanted to run more marketing in-house but had no framework, no shared process, and no confidence using their own analytics.",
          approach:
            "We assessed skill gaps against their active Google Ads and GA4 accounts, ran hands-on sessions building campaigns and reading reports on live data, and delivered SOPs and templates the team adopted after training.",
          outcome:
            "Hands-on training on their own accounts left the team running campaigns and reading reports without outside help, with templates they kept using.",
          href: "/case-studies/saas-platform-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Servicios Profesionales",
          challenge:
            "El equipo quería llevar más marketing internamente pero no tenía marco, proceso compartido ni confianza para usar sus propias analíticas.",
          approach:
            "Evaluamos brechas de habilidades contra sus cuentas activas de Google Ads y GA4, ejecutamos sesiones prácticas construyendo campañas y leyendo informes con datos en vivo, y entregamos SOPs y plantillas que el equipo adoptó tras la capacitación.",
          outcome:
            "La capacitación práctica sobre sus propias cuentas dejó al equipo lanzando campañas y leyendo informes sin ayuda externa, con plantillas que siguieron usando.",
          href: "/case-studies/saas-platform-growth",
        },
      },
    },
  },
};

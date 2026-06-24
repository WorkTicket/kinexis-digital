import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";
import type { ProofData, VisualVariant, WhyKinexusData } from "./types";

export type ServiceArchitectureConfig = {
  visualVariant: VisualVariant;
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
    sectionOrder: [
      "ServiceOverview", "Proof", "WhyKinexus",
      "SeoAudit", "RankingStrategy", "ContentStrategy", "TechnicalSeo",
      "Process", "Deliverables", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["SeoAudit", "RankingStrategy", "ContentStrategy", "TechnicalSeo"],
    whyKinexus: why(
      {
        headline: "Why Most SEO Campaigns Fail",
        points: [
          { title: "Wrong keywords win", description: "Your agency celebrates traffic from searches nobody in your sales pipeline ever typed." },
          { title: "Technical work without priority", description: "Hundreds of crawl fixes sit in a spreadsheet while the pages that actually sell stay broken." },
          { title: "Content without a next step", description: "Blog posts rank. Visitors read. Then they leave because nothing on the page asks them to act." },
          { title: "Reports that miss the point", description: "Position 4 for a term you never wanted. Zero booked calls. The dashboard still looks green." },
        ],
      },
      {
        headline: "Por Qué Fallan la Mayoría de las Campañas SEO",
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
          challenge: "Five years of generic SEO. Rankings on paper, empty calendar in practice. Most traffic came from DIY gardeners, not homeowners ready to hire.",
          outcome: "Organic traffic up 340%. Lead conversion went from 1.2% to 8.4% in nine months after we rebuilt around buyer-intent keywords.",
          href: "/case-studies/landscaping-company-growth",
        },
        testimonial: {
          quote: "For the first time we could see which keywords turned into booked jobs. That changed how we thought about the whole program.",
          name: "Operations Director",
          title: "Professional Services Firm",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Jardinería",
          challenge: "El tráfico orgánico estaba plano a pesar de años de SEO genérico.",
          outcome: "+340% tráfico orgánico y conversión de leads de 1.2% a 8.4% en 9 meses.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
    },
  },

  "local-seo": {
    visualVariant: "chart",
    sectionOrder: [
      "ServiceOverview", "Proof", "WhyKinexus",
      "LocalGbp", "LocalCitations", "LocalPages", "LocalReviews",
      "Process", "Deliverables", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["LocalGbp", "LocalCitations", "LocalPages", "LocalReviews"],
    whyKinexus: why(
      {
        headline: "Why Most Local SEO Fails to Fill Your Calendar",
        points: [
          { title: "Incomplete GBP profiles", description: "Wrong categories, missing services, bad photos. Competitors with half your experience show up above you in the map pack." },
          { title: "Citation chaos", description: "Your address shows up three different ways across directories. Google stops trusting your location data." },
          { title: "City-name page spam", description: "Template pages for every suburb you serve. Google flags them as low quality and they never rank." },
          { title: "No call tracking", description: "You see map views go up but cannot tie a single ranking to a booked job. Optimization becomes guesswork." },
        ],
      },
      {
        headline: "Por Qué el SEO Local No Llena Tu Calendario",
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
          client: "Dental Practice",
          challenge: "Map pack visibility swung week to week. A competitor with fewer reviews and worse photos kept outranking them in two of three locations.",
          outcome: "New patient bookings up 340% in six months after GBP overhaul, citation cleanup, and review velocity work.",
          href: "/case-studies/dental-practice-local-seo",
        },
      },
      es: {
        caseStudy: {
          client: "Clínica Dental",
          challenge: "La visibilidad en el map pack era inconsistente.",
          outcome: "+340% reservas de pacientes nuevos en 6 meses.",
          href: "/case-studies/dental-practice-local-seo",
        },
      },
    },
  },

  "google-ads": {
    visualVariant: "dashboard",
    sectionOrder: [
      "ServiceOverview", "WhyKinexus",
      "CampaignArchitecture", "KeywordResearch", "LandingPages", "ConversionTracking",
      "Process", "Deliverables", "Proof", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["CampaignArchitecture", "KeywordResearch", "LandingPages", "ConversionTracking"],
    whyKinexus: why(
      {
        headline: "The Kinexus Campaign Framework",
        points: [
          { title: "Intent-first architecture", description: "Brand, competitor, and high-intent searches each get their own campaign. No more one bucket for everything." },
          { title: "Weekly search term discipline", description: "We pull the search terms report every week. Irrelevant queries get blocked before they eat another dollar." },
          { title: "Quality Score as a lever", description: "When the ad and landing page say the same thing, Google charges you less per click and more people convert." },
          { title: "CRM-backed optimization", description: "We bid toward leads your sales team actually closes, not form fills from people who were never going to buy." },
        ],
      },
      {
        headline: "El Marco de Campañas Kinexus",
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
          client: "Dental Practice",
          challenge: "The last agency counted page views as conversions. Cost per lead kept climbing while the front desk stayed quiet.",
          outcome: "New patient bookings up 340%. CPL down 45% in six months after we rebuilt tracking and campaign structure.",
          href: "/case-studies/dental-practice-local-seo",
        },
      },
      es: {
        caseStudy: {
          client: "Clínica Dental",
          challenge: "La agencia anterior contaba vistas de página como conversiones.",
          outcome: "+340% pacientes nuevos con 45% reducción de CPL.",
          href: "/case-studies/dental-practice-local-seo",
        },
      },
    },
  },

  "ppc-management": {
    visualVariant: "dashboard",
    sectionOrder: [
      "ServiceOverview", "WhyKinexus",
      "CampaignStructure", "BudgetStrategy", "ChannelMix", "ConversionTracking",
      "Process", "Deliverables", "Proof", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["CampaignStructure", "BudgetStrategy", "ChannelMix", "ConversionTracking"],
    whyKinexus: why(
      {
        headline: "The Kinexus PPC Management System",
        points: [
          { title: "Cross-channel discipline", description: "Google, Meta, LinkedIn, and Microsoft run as one revenue program. One dashboard. One owner. No siloed freelancers arguing over whose platform wins." },
          { title: "Budget allocation by ROAS", description: "Spend moves to channels that produce qualified leads at the lowest cost. Not to whichever platform had the best sales pitch." },
          { title: "Tracking before scaling", description: "We validate conversion infrastructure before budget increases. Scaling blind is how accounts blow up." },
          { title: "Weekly optimization cadence", description: "Bid adjustments, negatives, and creative tests happen on schedule. Not when someone remembers to log in." },
        ],
      },
      {
        headline: "El Sistema de Gestión PPC Kinexus",
        points: [
          { title: "Disciplina multicanal", description: "Google, Meta, LinkedIn y Microsoft como un programa de ingresos." },
          { title: "Presupuesto por ROAS", description: "El gasto sigue datos de rendimiento, no hype de plataforma." },
          { title: "Tracking antes de escalar", description: "Infraestructura de conversión validada antes de aumentar presupuesto." },
          { title: "Optimización semanal", description: "Pujas, negativas y pruebas creativas en calendario fijo." },
        ],
      },
    ),
    proof: {
      en: {
        caseStudy: {
          client: "Premium E-Commerce Brand",
          challenge: "Multi-channel spend with no unified attribution. ROAS looked good on Meta, bad on Google.",
          outcome: "3.8× revenue after account restructure and cross-channel budget reallocation.",
          href: "/case-studies/premium-ecommerce-brand",
        },
      },
      es: {
        caseStudy: {
          client: "Marca E-Commerce Premium",
          challenge: "Gasto multicanal sin atribución unificada.",
          outcome: "3.8× ingresos tras reestructuración de cuentas.",
          href: "/case-studies/premium-ecommerce-brand",
        },
      },
    },
  },

  "meta-ads": {
    visualVariant: "comparison",
    sectionOrder: [
      "Results", "ServiceOverview", "WhyKinexus",
      "CreativeTesting", "AudienceTargeting", "LeadGenFunnel", "Retargeting",
      "Process", "Deliverables", "Proof", "PricingTeaser",
    ],
    serviceSectionKeys: ["CreativeTesting", "AudienceTargeting", "LeadGenFunnel", "Retargeting"],
    whyKinexus: why(
      {
        headline: "The Kinexus Creative Testing System",
        points: [
          { title: "Biweekly creative sprints", description: "Three to five new ad variations every two weeks. Fatigue kills accounts. We stay ahead of it." },
          { title: "Clean audience separation", description: "Cold prospecting, warm engagers, and hot retargeting pools never overlap. Overlap is how CPM gets expensive for no reason." },
          { title: "CAPI-first attribution", description: "Pixel plus Conversions API so iOS privacy changes do not leave you optimizing blind." },
          { title: "Funnel-stage budget rules", description: "Prospecting and retargeting budgets shift based on blended ROAS, not gut feel." },
        ],
      },
      {
        headline: "El Sistema de Pruebas Creativas Kinexus",
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
          client: "Premium E-Commerce Brand",
          challenge: "Creative fatigue after launch week. CPM climbed while ROAS dropped.",
          outcome: "3.8× revenue with structured creative testing and clean audience separation.",
          href: "/case-studies/premium-ecommerce-brand",
        },
      },
      es: {
        caseStudy: {
          client: "Marca E-Commerce Premium",
          challenge: "Fatiga creativa tras la semana de lanzamiento.",
          outcome: "3.8× ingresos con pruebas creativas estructuradas.",
          href: "/case-studies/premium-ecommerce-brand",
        },
      },
    },
  },

  "paid-ads": {
    visualVariant: "dashboard",
    sectionOrder: [
      "ServiceOverview", "WhyKinexus",
      "ChannelStrategy", "CampaignStructure", "CreativeTesting", "Attribution",
      "Process", "Deliverables", "Proof", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["ChannelStrategy", "CampaignStructure", "CreativeTesting", "Attribution"],
    whyKinexus: why(
      {
        headline: "Why Most Ad Accounts Bleed Budget",
        points: [
          { title: "Platform selection by hype", description: "Budget lands on the channel that looked good in a pitch deck, not where your buyers actually convert." },
          { title: "Flat campaign structures", description: "Brand, competitor, and high-intent terms mixed together. You cannot tell which searches are profitable." },
          { title: "Creative without a testing cadence", description: "Ads launch once, run for months, fatigue, and nobody notices until CPL doubles." },
          { title: "Attribution theater", description: "The ad dashboard shows great ROAS. Your CRM tells a different story. Both cannot be right." },
        ],
      },
      {
        headline: "Por Qué las Cuentas de Anuncios Desperdician Presupuesto",
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
          client: "Premium E-Commerce Brand",
          challenge: "Multi-platform spend with misaligned landing pages and no unified tracking.",
          outcome: "3.8× revenue after channel restructure and conversion tracking overhaul.",
          href: "/case-studies/premium-ecommerce-brand",
        },
      },
      es: {
        caseStudy: {
          client: "Marca E-Commerce Premium",
          challenge: "Gasto multiplataforma con landing pages desalineadas.",
          outcome: "3.8× ingresos tras reestructuración de canales.",
          href: "/case-studies/premium-ecommerce-brand",
        },
      },
    },
  },

  "web-design": {
    visualVariant: "mockup",
    sectionOrder: [
      "UxAudit", "DeviceMockups", "ConversionOptimization", "Speed",
      "ServiceOverview", "WhyKinexus", "Process", "Deliverables", "Proof", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["UxAudit", "DeviceMockups", "ConversionOptimization", "Speed"],
    whyKinexus: why(
      {
        headline: "What Makes a Kinexus Build Different",
        points: [
          { title: "Conversion before aesthetics", description: "We sketch the CTA path first. Pretty comes second. Awards do not pay your payroll." },
          { title: "Performance is non-negotiable", description: "Lighthouse 90 or higher. Core Web Vitals green. Your site loads before people lose patience." },
          { title: "Mobile-first, not mobile-adapted", description: "Wireframes start on a phone screen because that is where most of your traffic lives." },
          { title: "Handoff your team can run", description: "CMS training, component docs, and a site your marketing team can update without calling us every week." },
        ],
      },
      {
        headline: "Qué Hace Diferente un Build de Kinexus",
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
        beforeAfter: { beforeLabel: "Before", afterLabel: "After", beforeValue: "1.2%", afterValue: "6.3%", metric: "Conversion Rate" },
        caseStudy: {
          client: "Landscaping Company",
          challenge: "Template site with 45% bounce rate and no clear CTA above the fold.",
          outcome: "5× revenue growth after custom rebuild with Lighthouse 94 score.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
      es: {
        beforeAfter: { beforeLabel: "Antes", afterLabel: "Después", beforeValue: "1.2%", afterValue: "6.3%", metric: "Tasa de Conversión" },
        caseStudy: {
          client: "Empresa de Jardinería",
          challenge: "Sitio plantilla con 45% de rebote.",
          outcome: "5× crecimiento de ingresos tras rebuild personalizado.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
    },
  },

  cro: {
    visualVariant: "comparison",
    sectionOrder: [
      "Results", "ServiceOverview", "WhyKinexus",
      "AbTesting", "Heatmaps", "UXResearch",
      "Process", "Deliverables", "Proof", "PricingTeaser",
    ],
    serviceSectionKeys: ["AbTesting", "Heatmaps", "UXResearch"],
    whyKinexus: why(
      {
        headline: "Why CRO Projects Fail to Move Revenue",
        points: [
          { title: "Tests without hypotheses", description: "Button color tests do not compound. We test assumptions about why people do not buy." },
          { title: "Vanity metrics", description: "Click-through goes up. Revenue stays flat. We optimize for pipeline, not dashboard green." },
          { title: "No statistical rigor", description: "Calling a winner after four days invalidates the test. We wait for significance or we do not ship." },
          { title: "One-and-done mentality", description: "CRO is a system that runs every month. Not a project you finish and forget." },
        ],
      },
      {
        headline: "Por Qué los Proyectos CRO No Mueven Ingresos",
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
          client: "Premium E-Commerce Brand",
          challenge: "High traffic, low conversion. Previous tests changed colors without moving revenue.",
          outcome: "4× revenue after structured A/B testing on checkout and product pages.",
          href: "/case-studies/premium-ecommerce-brand",
        },
      },
      es: {
        caseStudy: {
          client: "Marca E-Commerce Premium",
          challenge: "Alto tráfico, baja conversión.",
          outcome: "4× ingresos tras A/B testing estructurado.",
          href: "/case-studies/premium-ecommerce-brand",
        },
      },
    },
  },

  "email-marketing": {
    visualVariant: "dashboard",
    sectionOrder: [
      "ServiceOverview", "WhyKinexus",
      "EmailSequences", "Automation", "ListGrowth",
      "Process", "Deliverables", "Proof", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["EmailSequences", "Automation", "ListGrowth"],
    whyKinexus: why(
      {
        headline: "The Kinexus Email Revenue System",
        points: [
          { title: "Revenue infrastructure, not newsletters", description: "Sequences built to move leads through decision stages toward booked calls. Not monthly blasts nobody reads." },
          { title: "Segmentation by behavior", description: "What someone clicked, opened, or ignored determines what they get next. Not what list they landed on two years ago." },
          { title: "Deliverability first", description: "List hygiene, SPF/DKIM, and sender reputation before we crank up volume. Inboxes matter more than open rate bragging." },
          { title: "Revenue attribution", description: "Every sequence tied to pipeline contribution. Open rates are context, not the scoreboard." },
        ],
      },
      {
        headline: "El Sistema de Email Revenue Kinexus",
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
          client: "SaaS Analytics Platform",
          challenge: "Trial signups weren't converting to paid. Nurture was generic and untracked.",
          outcome: "4× MRR after behavioral trigger sequences and onboarding automation.",
          href: "/case-studies/saas-analytics-platform",
        },
      },
      es: {
        caseStudy: {
          client: "Plataforma SaaS Analytics",
          challenge: "Trials no convertían a pagado.",
          outcome: "4× MRR tras secuencias de triggers comportamentales.",
          href: "/case-studies/saas-analytics-platform",
        },
      },
    },
  },

  "content-marketing": {
    visualVariant: "split",
    sectionOrder: [
      "ServiceOverview", "Proof", "WhyKinexus",
      "ContentFunnel", "Production", "Distribution",
      "Process", "Deliverables", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["ContentFunnel", "Production", "Distribution"],
    whyKinexus: why(
      {
        headline: "Why Content Marketing Doesn't Convert",
        points: [
          { title: "Content without intent mapping", description: "Articles go live with no keyword target and no funnel stage. They rank for nothing and convert less." },
          { title: "No lead capture path", description: "Traffic arrives, reads, leaves. No gated asset, no nurture sequence, no reason to raise a hand." },
          { title: "Publish and pray", description: "One blog post, zero distribution, zero repurposing. Reach dies the day it publishes." },
          { title: "Vanity traffic metrics", description: "Pageviews climb. Pipeline stays flat. We tie every piece to qualified leads or we kill it." },
        ],
      },
      {
        headline: "Por Qué el Content Marketing No Convierte",
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
          client: "B2B Consulting Firm",
          challenge: "Thought leadership content generated traffic but zero qualified pipeline.",
          outcome: "Pipeline growth after content funnel mapping and lead magnet integration.",
          href: "/case-studies/b2b-consulting-firm",
        },
      },
      es: {
        caseStudy: {
          client: "Firma de Consultoría B2B",
          challenge: "Contenido generaba tráfico pero cero pipeline calificado.",
          outcome: "Crecimiento de pipeline tras mapeo de embudo de contenido.",
          href: "/case-studies/b2b-consulting-firm",
        },
      },
    },
  },

  "social-media": {
    visualVariant: "dashboard",
    sectionOrder: [
      "Results", "ServiceOverview", "WhyKinexus",
      "PlatformStrategy", "ContentPillars", "Community",
      "Process", "Deliverables", "Proof", "PricingTeaser",
    ],
    serviceSectionKeys: ["PlatformStrategy", "ContentPillars", "Community"],
    whyKinexus: why(
      {
        headline: "The Kinexus Social Growth Framework",
        points: [
          { title: "Platform fit over presence", description: "We pick the two networks where your buyers actually show up. Not all six because a checklist said to." },
          { title: "Content pillars with ROI", description: "Every post category maps to a funnel stage and a number we can report on." },
          { title: "Paid + organic integration", description: "Organic posts feed retargeting pools and ad creative tests. Social is not a standalone island." },
          { title: "Community as pipeline", description: "Comments and DMs trigger sales follow-up. Likes alone do not pay rent." },
        ],
      },
      {
        headline: "El Marco de Crecimiento Social Kinexus",
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
          client: "Fintech App Startup",
          challenge: "Social following grew but trial signups stayed flat.",
          outcome: "210% trial lift after content pillar strategy and paid retargeting integration.",
          href: "/case-studies/fintech-app-startup",
        },
      },
      es: {
        caseStudy: {
          client: "Startup Fintech",
          challenge: "Seguidores crecían pero trials se mantenían planos.",
          outcome: "210% lift en trials tras estrategia de pilares y retargeting.",
          href: "/case-studies/fintech-app-startup",
        },
      },
    },
  },

  "video-marketing": {
    visualVariant: "mockup",
    sectionOrder: [
      "VideoProduction", "VideoDistribution", "VideoStrategy",
      "ServiceOverview", "WhyKinexus", "Process", "Deliverables", "Proof", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["VideoProduction", "VideoDistribution", "VideoStrategy"],
    whyKinexus: why(
      {
        headline: "What Makes Kinexus Video Different",
        points: [
          { title: "Conversion-first scripts", description: "Every video maps to a funnel stage and a CTA. Brand montages are fine for the about page, not for paid spend." },
          { title: "Repurposing built in", description: "One shoot produces ad cuts, social clips, email embeds, and landing page assets. Production cost spreads across channels." },
          { title: "Platform-native formats", description: "Vertical for Reels, square for feed, long-form for YouTube. Same message, right dimensions per channel." },
          { title: "Performance tracking", description: "View-through, engagement, and pipeline attribution on every asset. We know which video booked the call." },
        ],
      },
      {
        headline: "Qué Hace Diferente el Video de Kinexus",
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
          client: "Premium E-Commerce Brand",
          challenge: "Product videos looked polished but didn't drive add-to-cart or ROAS.",
          outcome: "4× revenue after UGC-style video ads integrated with Meta retargeting.",
          href: "/case-studies/premium-ecommerce-brand",
        },
      },
      es: {
        caseStudy: {
          client: "Marca E-Commerce Premium",
          challenge: "Videos de producto no impulsaban add-to-cart ni ROAS.",
          outcome: "4× ingresos tras videos UGC integrados con retargeting Meta.",
          href: "/case-studies/premium-ecommerce-brand",
        },
      },
    },
  },

  branding: {
    visualVariant: "mockup",
    sectionOrder: [
      "BrandIdentity", "VisualSystem", "BrandGuidelines",
      "ServiceOverview", "WhyKinexus", "Process", "Deliverables", "Proof", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["BrandIdentity", "VisualSystem", "BrandGuidelines"],
    whyKinexus: why(
      {
        headline: "Why Brand Projects Fall Flat",
        points: [
          { title: "Aesthetics without positioning", description: "Beautiful logo on a business that cannot explain why someone should pick them over the next tab." },
          { title: "Guidelines nobody uses", description: "100-page PDF that collects dust. We build systems your team applies in web, ads, and email." },
          { title: "No digital application", description: "Rebrand launches on stationery while the website and ad account still look like 2019." },
          { title: "Launch without alignment", description: "New visual identity, same confused messaging. Sales and marketing still tell different stories." },
        ],
      },
      {
        headline: "Por Qué los Proyectos de Marca Fracasan",
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
          client: "Premium E-Commerce Brand",
          challenge: "Rebrand looked premium but conversion rate dropped after launch.",
          outcome: "4× revenue after brand system applied to site, ads, and email simultaneously.",
          href: "/case-studies/premium-ecommerce-brand",
        },
      },
      es: {
        caseStudy: {
          client: "Marca E-Commerce Premium",
          challenge: "Rebrand se veía premium pero conversión bajó tras lanzamiento.",
          outcome: "4× ingresos tras aplicar sistema de marca en web, ads y email.",
          href: "/case-studies/premium-ecommerce-brand",
        },
      },
    },
  },

  analytics: {
    visualVariant: "dashboard",
    sectionOrder: [
      "Results", "ServiceOverview", "WhyKinexus",
      "DataStack", "Dashboards", "Attribution",
      "Process", "Deliverables", "Proof", "PricingTeaser",
    ],
    serviceSectionKeys: ["DataStack", "Dashboards", "Attribution"],
    whyKinexus: why(
      {
        headline: "Why Most Analytics Setups Lie",
        points: [
          { title: "Tracking without strategy", description: "GA4 is installed but events do not map to booked calls, purchases, or pipeline stages." },
          { title: "Last-click delusion", description: "Single-touch attribution gives all credit to the last ad someone clicked. The channels that started the journey stay invisible." },
          { title: "Dashboards nobody reads", description: "Data dumps with 47 charts. We build views that answer one question: what should we do next week?" },
          { title: "No CRM connection", description: "Marketing reports leads. Sales reports revenue. Nobody connects the two without a spreadsheet marathon." },
        ],
      },
      {
        headline: "Por Qué la Mayoría de Analytics Miente",
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
          client: "SaaS Analytics Platform",
          challenge: "Marketing team couldn't prove which channels drove MRR growth.",
          outcome: "4× MRR visibility after multi-touch attribution and CRM integration.",
          href: "/case-studies/saas-analytics-platform",
        },
      },
      es: {
        caseStudy: {
          client: "Plataforma SaaS Analytics",
          challenge: "Marketing no podía probar qué canales impulsaban MRR.",
          outcome: "4× visibilidad MRR tras atribución multitoque e integración CRM.",
          href: "/case-studies/saas-analytics-platform",
        },
      },
    },
  },

  "growth-consulting": {
    visualVariant: "split",
    sectionOrder: [
      "ServiceOverview", "WhyKinexus",
      "GrowthAudit", "ChannelMix", "Roadmap",
      "Process", "Deliverables", "Proof", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["GrowthAudit", "ChannelMix", "Roadmap"],
    whyKinexus: why(
      {
        headline: "The Kinexus Growth Audit Framework",
        points: [
          { title: "Diagnosis before prescription", description: "We audit your full revenue system before recommending channels. No cookie-cutter channel mix." },
          { title: "Channel interdependencies", description: "SEO, paid, email, and CRO work as one engine. Fixing one leak while ignoring three others wastes money." },
          { title: "Margin-aware growth", description: "Recommendations account for CAC, LTV, and payback period. Growth that destroys margin is not growth." },
          { title: "Execution included", description: "Strategy without implementation is a deck. We can run what we recommend if you want one team accountable." },
        ],
      },
      {
        headline: "El Marco de Auditoría de Crecimiento Kinexus",
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
          client: "B2B Consulting Firm",
          challenge: "Scattered marketing spend with no clear growth lever identified.",
          outcome: "Pipeline growth after channel audit and 90-day execution roadmap.",
          href: "/case-studies/b2b-consulting-firm",
        },
      },
      es: {
        caseStudy: {
          client: "Firma de Consultoría B2B",
          challenge: "Gasto de marketing disperso sin palanca de crecimiento clara.",
          outcome: "Crecimiento de pipeline tras auditoría y roadmap de 90 días.",
          href: "/case-studies/b2b-consulting-firm",
        },
      },
    },
  },

  funnels: {
    visualVariant: "chart",
    sectionOrder: [
      "ServiceOverview", "Proof", "WhyKinexus",
      "FunnelMapping", "Automation", "ConversionPaths",
      "AbTesting", "Heatmaps", "UXResearch",
      "Process", "Deliverables", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["FunnelMapping", "Automation", "ConversionPaths", "AbTesting", "Heatmaps", "UXResearch"],
    whyKinexus: why(
      {
        headline: "Why Most Conversion Systems Leak Revenue",
        points: [
          { title: "Gaps between funnel stages", description: "Traffic arrives but nurture stops at the form fill. Nobody tracks where leads drop between stages." },
          { title: "Pages built without data", description: "Landing pages launch on gut feel. No heatmaps, no session recordings, no tests to validate the layout." },
          { title: "Manual handoffs and blind spots", description: "Sales gets cold leads because automation ends at submit. Marketing never sees what happens after handoff." },
          { title: "One-and-done mentality", description: "Funnels get built once and left alone. CRO treated as a project instead of a monthly discipline." },
        ],
      },
      {
        headline: "Por Qué la Mayoría de Sistemas de Conversión Pierden Ingresos",
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
          client: "Premium E-Commerce Brand",
          challenge: "High traffic and a leaky funnel. Previous tests changed colors without moving revenue or booking rates.",
          outcome: "4× revenue after funnel rebuild and structured A/B testing on checkout and nurture flows.",
          href: "/case-studies/premium-ecommerce-brand",
        },
      },
      es: {
        caseStudy: {
          client: "Marca E-Commerce Premium",
          challenge: "Alto tráfico y embudo con fugas. Tests anteriores no movieron ingresos ni reservas.",
          outcome: "4× ingresos tras rebuild de embudo y A/B testing estructurado.",
          href: "/case-studies/premium-ecommerce-brand",
        },
      },
    },
  },
};

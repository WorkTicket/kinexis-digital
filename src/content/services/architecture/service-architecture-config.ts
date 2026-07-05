import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";
import type { ProofData, VisualVariant, WhyKinexusData } from "./types";

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
    visualizationSection: "WhyKinexus",
    sectionOrder: [
      "ServiceOverview", "Proof", "WhyKinexus",
      "SeoAudit", "RankingStrategy", "ContentStrategy", "TechnicalSeo",
      "Process", "Deliverables", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["SeoAudit", "RankingStrategy", "ContentStrategy", "TechnicalSeo"],
    whyKinexus: why(
      {
        headline: "Why Most SEO Campaigns Fail",
        subtitle: "Wrong keywords, unprioritized technical fixes, and reports that celebrate traffic your sales team never sees.",
        points: [
          { title: "Wrong keywords win", description: "Your agency celebrates traffic from searches nobody in your sales pipeline ever typed." },
          { title: "Technical work without priority", description: "Hundreds of crawl fixes sit in a spreadsheet while the pages that actually sell stay broken." },
          { title: "Content without a next step", description: "Blog posts rank. Visitors read. Then they leave because nothing on the page asks them to act." },
          { title: "Reports that miss the point", description: "Position 4 for a term you never wanted. Zero booked calls. The dashboard still looks green." },
        ],
      },
      {
        headline: "Por Qué Fallan la Mayoría de las Campañas SEO",
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
          challenge: "Five years of generic SEO. Rankings on paper, empty calendar in practice. Most traffic came from DIY gardeners, not homeowners ready to hire.",
          outcome: "Qualified leads grew 4.8× in 10 months. Organic traffic up 1,290%. Rankings improved across 340+ commercial-intent keywords.",
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
          challenge: "Cinco años de SEO genérico. Rankings en papel, calendario vacío en la práctica.",
          outcome: "Leads calificados 4.8× en 10 meses. Tráfico orgánico +1,290%. Mejora en 340+ keywords comerciales.",
          href: "/case-studies/landscaping-company-growth",
        },
        testimonial: {
          quote: "Por primera vez pudimos ver qué keywords se convertían en trabajos reservados. Eso cambió cómo pensamos todo el programa.",
          name: "Director de Operaciones",
          title: "Empresa de Servicios Profesionales",
        },
      },
    },
  },

  "local-seo": {
    visualVariant: "chart",
    visualizationSection: "WhyKinexus",
    sectionOrder: [
      "ServiceOverview", "Proof", "WhyKinexus",
      "LocalGbp", "LocalCitations", "LocalPages", "LocalReviews",
      "Process", "Deliverables", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["LocalGbp", "LocalCitations", "LocalPages", "LocalReviews"],
    whyKinexus: why(
      {
        headline: "Why Most Local SEO Fails to Fill Your Calendar",
        subtitle: "Incomplete profiles, messy citations, and map pack rankings that never connect to a booked job.",
        points: [
          { title: "Incomplete GBP profiles", description: "Wrong categories, missing services, bad photos. Competitors with half your experience show up above you in the map pack." },
          { title: "Citation chaos", description: "Your address shows up three different ways across directories. Google stops trusting your location data." },
          { title: "City-name page spam", description: "Template pages for every suburb you serve. Google flags them as low quality and they never rank." },
          { title: "No call tracking", description: "You see map views go up but cannot tie a single ranking to a booked job. Optimization becomes guesswork." },
        ],
      },
      {
        headline: "Por Qué el SEO Local No Llena Tu Calendario",
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
          challenge: "Map pack was invisible for emergency plumbing searches. A competitor with a newer GBP and active review profile dominated the local 3-pack across all service areas.",
          outcome: "Emergency calls up 327% in eight months after GBP overhaul, citation cleanup, and review velocity work.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Plomería",
          challenge: "El map pack era invisible para búsquedas de plomería de emergencia.",
          outcome: "+327% llamadas de emergencia en 8 meses.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
    },
  },

  "google-ads": {
    visualVariant: "dashboard",
    visualizationSection: "WhyKinexus",
    sectionOrder: [
      "ServiceOverview", "WhyKinexus",
      "CampaignArchitecture", "KeywordResearch", "LandingPages", "ConversionTracking",
      "Process", "Deliverables", "Proof", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["CampaignArchitecture", "KeywordResearch", "LandingPages", "ConversionTracking"],
    whyKinexus: why(
      {
        headline: "The Kinexus Campaign Framework",
        subtitle: "Intent-first structure, weekly search term discipline, and bid optimization tied to leads your sales team closes.",
        points: [
          { title: "Intent-first architecture", description: "Brand, competitor, and high-intent searches each get their own campaign. No more one bucket for everything." },
          { title: "Weekly search term discipline", description: "We pull the search terms report every week. Irrelevant queries get blocked before they eat another dollar." },
          { title: "Quality Score as a lever", description: "When the ad and landing page say the same thing, Google charges you less per click and more people convert." },
          { title: "CRM-backed optimization", description: "We bid toward leads your sales team actually closes, not form fills from people who were never going to buy." },
        ],
      },
      {
        headline: "El Marco de Campañas Kinexus",
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
          challenge: "The previous agency counted form submissions as conversions while ignoring phone calls — the primary conversion channel for emergency services.",
          outcome: "Emergency calls up 327%. CPL down 65% after we rebuilt tracking and campaign structure around call conversions.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Plomería",
          challenge: "La agencia anterior ignoraba las llamadas como conversiones.",
          outcome: "+327% llamadas de emergencia con 65% reducción de CPL.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
    },
  },

  "ppc-management": {
    visualVariant: "dashboard",
    visualizationSection: "WhyKinexus",
    sectionOrder: [
      "ServiceOverview", "WhyKinexus",
      "CampaignStructure", "BudgetStrategy", "ChannelMix", "ConversionTracking",
      "Process", "Deliverables", "Proof", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["CampaignStructure", "BudgetStrategy", "ChannelMix", "ConversionTracking"],
    whyKinexus: why(
      {
        headline: "The Kinexus PPC Management System",
        subtitle: "One team, one dashboard, and budget allocation driven by ROAS — not whichever platform had the best sales pitch.",
        points: [
          { title: "Cross-channel discipline", description: "Google, Meta, LinkedIn, and Microsoft run as one revenue program. One dashboard. One owner. No siloed freelancers arguing over whose platform wins." },
          { title: "Budget allocation by ROAS", description: "Spend moves to channels that produce qualified leads at the lowest cost. Not to whichever platform had the best sales pitch." },
          { title: "Tracking before scaling", description: "We validate conversion infrastructure before budget increases. Scaling blind is how accounts blow up." },
          { title: "Weekly optimization cadence", description: "Bid adjustments, negatives, and creative tests happen on schedule. Not when someone remembers to log in." },
        ],
      },
      {
        headline: "El Sistema de Gestión PPC Kinexus",
        subtitle: "Un equipo, un dashboard y asignación de presupuesto por ROAS — no por hype de plataforma.",
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
          client: "Plumbing Company",
          challenge: "Google and Meta ran as separate programs with different conversion definitions. Budget stayed split evenly even though Meta CPL was three times Google's for the same emergency service calls.",
          outcome: "Emergency calls up 327% in eight months after unified tracking, cross-channel budget reallocation toward Search, and weekly optimization across both platforms.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Plomería",
          challenge: "Google y Meta operaban en silos con definiciones de conversión distintas.",
          outcome: "+327% llamadas de emergencia tras tracking unificado y reasignación de presupuesto.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
    },
  },

  "meta-ads": {
    visualVariant: "comparison",
    visualizationSection: "WhyKinexus",
    sectionOrder: [
      "Results", "ServiceOverview", "WhyKinexus",
      "CreativeTesting", "AudienceTargeting", "LeadGenFunnel", "Retargeting",
      "Process", "Deliverables", "Proof", "PricingTeaser",
    ],
    serviceSectionKeys: ["CreativeTesting", "AudienceTargeting", "LeadGenFunnel", "Retargeting"],
    whyKinexus: why(
      {
        headline: "The Kinexus Creative Testing System",
        subtitle: "Biweekly creative sprints, clean audience separation, and attribution built for iOS-era ad accounts.",
        points: [
          { title: "Biweekly creative sprints", description: "Three to five new ad variations every two weeks. Fatigue kills accounts. We stay ahead of it." },
          { title: "Clean audience separation", description: "Cold prospecting, warm engagers, and hot retargeting pools never overlap. Overlap is how CPM gets expensive for no reason." },
          { title: "CAPI-first attribution", description: "Pixel plus Conversions API so iOS privacy changes do not leave you optimizing blind." },
          { title: "Funnel-stage budget rules", description: "Prospecting and retargeting budgets shift based on blended ROAS, not gut feel." },
        ],
      },
      {
        headline: "El Sistema de Pruebas Creativas Kinexus",
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
          challenge: "Meta prospecting CPL doubled after week three because the same three ad creatives kept running with no refresh schedule. Prospecting and retargeting audiences overlapped, inflating CPM.",
          outcome: "3.8x ROAS after biweekly creative sprints, clean audience separation, and CAPI-first tracking restored accurate conversion data to the algorithm.",
          href: "/case-studies/saas-platform-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Plataforma SaaS",
          challenge: "El CPL en Meta se duplicó tras la semana tres por fatiga creativa y audiencias superpuestas.",
          outcome: "3.8x ROAS tras sprints creativos quincenales y separación limpia de audiencias.",
          href: "/case-studies/saas-platform-growth",
        },
      },
    },
  },

  "paid-ads": {
    visualVariant: "dashboard",
    visualizationSection: "WhyKinexus",
    sectionOrder: [
      "ServiceOverview", "WhyKinexus",
      "ChannelStrategy", "CampaignStructure", "CreativeTesting", "Attribution",
      "Process", "Deliverables", "Proof", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["ChannelStrategy", "CampaignStructure", "CreativeTesting", "Attribution"],
    whyKinexus: why(
      {
        headline: "Why Most Ad Accounts Bleed Budget",
        subtitle: "Channel hype, flat campaign structures, and attribution dashboards that disagree with your CRM.",
        points: [
          { title: "Platform selection by hype", description: "Budget lands on the channel that looked good in a pitch deck, not where your buyers actually convert." },
          { title: "Flat campaign structures", description: "Brand, competitor, and high-intent terms mixed together. You cannot tell which searches are profitable." },
          { title: "Creative without a testing cadence", description: "Ads launch once, run for months, fatigue, and nobody notices until CPL doubles." },
          { title: "Attribution theater", description: "The ad dashboard shows great ROAS. Your CRM tells a different story. Both cannot be right." },
        ],
      },
      {
        headline: "Por Qué las Cuentas de Anuncios Desperdician Presupuesto",
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
          challenge: "First paid media push sent Google traffic to the homepage with no call tracking. The previous setup counted form submissions while ignoring phone calls, the primary conversion for emergency plumbing.",
          outcome: "Emergency calls up 327% and CPL down 65% after channel selection, dedicated landing pages, and conversion tracking rebuilt around qualified calls.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Plomería",
          challenge: "El primer push de paid enviaba tráfico a la homepage sin tracking de llamadas.",
          outcome: "+327% llamadas de emergencia y 65% reducción de CPL tras rebuild de tracking.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
    },
  },

  "web-design": {
    visualVariant: "mockup",
    visualizationSection: "WhyKinexus",
    sectionOrder: [
      "ServiceOverview", "WhyKinexus",
      "UxAudit", "DeviceMockups", "ConversionOptimization", "Speed",
      "Process", "Deliverables", "Proof", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["UxAudit", "DeviceMockups", "ConversionOptimization", "Speed"],
    whyKinexus: why(
      {
        headline: "What Makes a Kinexus Build Different",
        subtitle: "Conversion paths sketched first, performance benchmarks enforced, and a handoff your marketing team can run without us.",
        points: [
          { title: "Conversion before aesthetics", description: "We sketch the CTA path first. Pretty comes second. Awards do not pay your payroll." },
          { title: "Performance is non-negotiable", description: "Lighthouse 90 or higher. Core Web Vitals green. Your site loads before people lose patience." },
          { title: "Mobile-first, not mobile-adapted", description: "Wireframes start on a phone screen because that is where most of your traffic lives." },
          { title: "Handoff your team can run", description: "CMS training, component docs, and a site your marketing team can update without calling us every week." },
        ],
      },
      {
        headline: "Qué Hace Diferente un Build de Kinexus",
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
          challenge: "Template site with 45% bounce rate and no clear CTA above the fold.",
          outcome: "4.8× lead growth after custom rebuild. Conversion rate went from 1.8% to 8.4% with Lighthouse 94 score.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
      es: {
        beforeAfter: { beforeLabel: "Antes", afterLabel: "Después", beforeValue: "1.8%", afterValue: "8.4%", metric: "Tasa de Conversión" },
        caseStudy: {
          client: "Empresa de Jardinería",
          challenge: "Sitio plantilla con 45% de rebote.",
          outcome: "Crecimiento de leads 4.8× tras rebuild. Conversión del 1.8% al 8.4%.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
    },
  },

  cro: {
    visualVariant: "comparison",
    visualizationSection: "WhyKinexus",
    sectionOrder: [
      "Results", "ServiceOverview", "WhyKinexus",
      "AbTesting", "Heatmaps", "UXResearch",
      "Process", "Deliverables", "Proof", "PricingTeaser",
    ],
    serviceSectionKeys: ["AbTesting", "Heatmaps", "UXResearch"],
    whyKinexus: why(
      {
        headline: "Why CRO Projects Fail to Move Revenue",
        subtitle: "Hypothesis-free tests, vanity metrics, and one-and-done projects that never touch pipeline.",
        points: [
          { title: "Tests without hypotheses", description: "Button color tests do not compound. We test assumptions about why people do not buy." },
          { title: "Vanity metrics", description: "Click-through goes up. Revenue stays flat. We optimize for pipeline, not dashboard green." },
          { title: "No statistical rigor", description: "Calling a winner after four days invalidates the test. We wait for significance or we do not ship." },
          { title: "One-and-done mentality", description: "CRO is a system that runs every month. Not a project you finish and forget." },
        ],
      },
      {
        headline: "Por Qué los Proyectos CRO No Mueven Ingresos",
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
          challenge: "Service pages converted at 1.8% with the CTA buried below the fold, a seven-field contact form, and a mobile layout that broke on the pages where most traffic arrived.",
          outcome: "Conversion rate went from 1.8% to 8.4% after structured A/B tests on form length, CTA placement, and mobile UX on the highest-traffic service pages.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Jardinería",
          challenge: "Las páginas de servicio convertían al 1.8% con el CTA enterrado y formularios largos en móvil.",
          outcome: "Conversión del 1.8% al 8.4% tras tests A/B en formularios, CTAs y UX móvil.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
    },
  },

  "email-marketing": {
    visualVariant: "dashboard",
    visualizationSection: "WhyKinexus",
    sectionOrder: [
      "ServiceOverview", "WhyKinexus",
      "EmailSequences", "Automation", "ListGrowth",
      "Process", "Deliverables", "Proof", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["EmailSequences", "Automation", "ListGrowth"],
    whyKinexus: why(
      {
        headline: "The Kinexus Email Revenue System",
        subtitle: "Behavioral sequences, deliverability discipline, and every flow tied to pipeline — not open-rate bragging.",
        points: [
          { title: "Revenue infrastructure, not newsletters", description: "Sequences built to move leads through decision stages toward booked calls. Not monthly blasts nobody reads." },
          { title: "Segmentation by behavior", description: "What someone clicked, opened, or ignored determines what they get next. Not what list they landed on two years ago." },
          { title: "Deliverability first", description: "List hygiene, SPF/DKIM, and sender reputation before we crank up volume. Inboxes matter more than open rate bragging." },
          { title: "Revenue attribution", description: "Every sequence tied to pipeline contribution. Open rates are context, not the scoreboard." },
        ],
      },
      {
        headline: "El Sistema de Email Revenue Kinexus",
        subtitle: "Secuencias comportamentales, entregabilidad primero y cada flujo ligado al pipeline — no a tasas de apertura.",
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
          challenge: "12,000 subscribers but only a single welcome email automated. Monthly newsletters averaged 22% opens with zero demo bookings attributed to email touchpoints.",
          outcome: "42% average open rate on behavioral nurture sequences and demo booking rate up 180% after trigger-based flows tied to content engagement.",
          href: "/case-studies/saas-platform-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Plataforma SaaS",
          challenge: "12,000 suscriptores con solo un email de bienvenida automatizado y cero demos atribuidas a email.",
          outcome: "42% apertura promedio en secuencias de nurture y +180% en reservas de demo.",
          href: "/case-studies/saas-platform-growth",
        },
      },
    },
  },

  "content-marketing": {
    visualVariant: "split",
    visualizationSection: "WhyKinexus",
    sectionOrder: [
      "ServiceOverview", "Proof", "WhyKinexus",
      "ContentFunnel", "Production", "Distribution",
      "Process", "Deliverables", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["ContentFunnel", "Production", "Distribution"],
    whyKinexus: why(
      {
        headline: "Why Content Marketing Doesn't Convert",
        subtitle: "Articles with no intent target, no lead capture path, and traffic that never raises a hand.",
        points: [
          { title: "Content without intent mapping", description: "Articles go live with no keyword target and no funnel stage. They rank for nothing and convert less." },
          { title: "No lead capture path", description: "Traffic arrives, reads, leaves. No gated asset, no nurture sequence, no reason to raise a hand." },
          { title: "Publish and pray", description: "One blog post, zero distribution, zero repurposing. Reach dies the day it publishes." },
          { title: "Vanity traffic metrics", description: "Pageviews climb. Pipeline stays flat. We tie every piece to qualified leads or we kill it." },
        ],
      },
      {
        headline: "Por Qué el Content Marketing No Convierte",
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
          challenge: "Blog published twice a month on topics picked in meetings, not from keyword research. Traffic grew 40% year over year but demo requests stayed flat because no piece linked to a lead magnet or service page.",
          outcome: "5.9× demo growth and 62% of demos attributed to the content engine after topic clusters, bottom-of-funnel guides, and internal linking to conversion pages.",
          href: "/case-studies/saas-platform-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Plataforma SaaS",
          challenge: "Blog con temas elegidos en reuniones, no por keywords. Tráfico creció pero las demos se mantuvieron planas.",
          outcome: "5.9× crecimiento en demos y 62% de demos atribuidas al motor de contenido.",
          href: "/case-studies/saas-platform-growth",
        },
      },
    },
  },

  "social-media": {
    visualVariant: "dashboard",
    visualizationSection: "WhyKinexus",
    sectionOrder: [
      "Results", "ServiceOverview", "WhyKinexus",
      "PlatformStrategy", "ContentPillars", "Community",
      "Process", "Deliverables", "Proof", "PricingTeaser",
    ],
    serviceSectionKeys: ["PlatformStrategy", "ContentPillars", "Community"],
    whyKinexus: why(
      {
        headline: "The Kinexus Social Growth Framework",
        subtitle: "Platform fit over checklist presence, content pillars with ROI, and social wired into retargeting and pipeline.",
        points: [
          { title: "Platform fit over presence", description: "We pick the two networks where your buyers actually show up. Not all six because a checklist said to." },
          { title: "Content pillars with ROI", description: "Every post category maps to a funnel stage and a number we can report on." },
          { title: "Paid + organic integration", description: "Organic posts feed retargeting pools and ad creative tests. Social is not a standalone island." },
          { title: "Community as pipeline", description: "Comments and DMs trigger sales follow-up. Likes alone do not pay rent." },
        ],
      },
      {
        headline: "El Marco de Crecimiento Social Kinexus",
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
          challenge: "LinkedIn posts went out twice a month with no content pillars. Follower count grew but website clicks and demo pipeline stayed flat because nothing connected social to offers.",
          outcome: "2.1x inbound leads from social traffic after content pillar strategy aligned posts to SEO topics and every post included a clear path to demo booking.",
          href: "/case-studies/saas-platform-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Plataforma SaaS",
          challenge: "Publicaciones esporádicas en LinkedIn sin pilares de contenido ni ruta a demos.",
          outcome: "2.1x leads entrantes desde tráfico social tras estrategia de pilares alineada a SEO.",
          href: "/case-studies/saas-platform-growth",
        },
      },
    },
  },

  "video-marketing": {
    visualVariant: "mockup",
    visualizationSection: "WhyKinexus",
    sectionOrder: [
      "ServiceOverview", "WhyKinexus",
      "VideoProduction", "VideoDistribution", "VideoStrategy",
      "Process", "Deliverables", "Proof", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["VideoProduction", "VideoDistribution", "VideoStrategy"],
    whyKinexus: why(
      {
        headline: "What Makes Kinexus Video Different",
        subtitle: "Scripts mapped to funnel stages, repurposing built into every shoot, and performance tracked to booked calls.",
        points: [
          { title: "Conversion-first scripts", description: "Every video maps to a funnel stage and a CTA. Brand montages are fine for the about page, not for paid spend." },
          { title: "Repurposing built in", description: "One shoot produces ad cuts, social clips, email embeds, and landing page assets. Production cost spreads across channels." },
          { title: "Platform-native formats", description: "Vertical for Reels, square for feed, long-form for YouTube. Same message, right dimensions per channel." },
          { title: "Performance tracking", description: "View-through, engagement, and pipeline attribution on every asset. We know which video booked the call." },
        ],
      },
      {
        headline: "Qué Hace Diferente el Video de Kinexus",
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
          challenge: "One three-minute brand video sat on the homepage. No ad cuts, no vertical formats, no refresh cycle. Meta campaigns stalled because new creative took six weeks and $8,000 per round.",
          outcome: "65% average video completion on ad cuts and CPM dropped 38% after a monthly production workflow delivered 4 to 6 platform-native assets per shoot.",
          href: "/case-studies/saas-platform-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Plataforma SaaS",
          challenge: "Un solo video de marca sin cortes para ads ni formatos verticales. Las campañas en Meta se estancaron por falta de creativos.",
          outcome: "65% de finalización en cortes de ads y -38% CPM tras flujo mensual de producción multi-formato.",
          href: "/case-studies/saas-platform-growth",
        },
      },
    },
  },

  branding: {
    visualVariant: "mockup",
    visualizationSection: "WhyKinexus",
    sectionOrder: [
      "ServiceOverview", "WhyKinexus",
      "BrandIdentity", "VisualSystem", "BrandGuidelines",
      "Process", "Deliverables", "Proof", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["BrandIdentity", "VisualSystem", "BrandGuidelines"],
    whyKinexus: why(
      {
        headline: "Why Brand Projects Fall Flat",
        subtitle: "Pretty logos without positioning, guidelines nobody uses, and launches that never reach your site or ad account.",
        points: [
          { title: "Aesthetics without positioning", description: "Beautiful logo on a business that cannot explain why someone should pick them over the next tab." },
          { title: "Guidelines nobody uses", description: "100-page PDF that collects dust. We build systems your team applies in web, ads, and email." },
          { title: "No digital application", description: "Rebrand launches on stationery while the website and ad account still look like 2019." },
          { title: "Launch without alignment", description: "New visual identity, same confused messaging. Sales and marketing still tell different stories." },
        ],
      },
      {
        headline: "Por Qué los Proyectos de Marca Fracasan",
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
          challenge: "Website, Google Ads, and proposal templates used three different taglines and color palettes. Prospects in discovery calls said the company felt like three separate businesses.",
          outcome: "2.1x conversion lift after unified positioning, visual identity, and messaging applied across site, ads, and sales collateral in one rollout.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Jardinería",
          challenge: "Web, ads y propuestas usaban mensajes y colores distintos. Los prospectos percibían tres marcas diferentes.",
          outcome: "2.1x mejora en conversión tras posicionamiento y mensajería unificados en todos los canales.",
          href: "/case-studies/landscaping-company-growth",
        },
      },
    },
  },

  analytics: {
    visualVariant: "dashboard",
    visualizationSection: "WhyKinexus",
    sectionOrder: [
      "Results", "ServiceOverview", "WhyKinexus",
      "DataStack", "Dashboards", "Attribution",
      "Process", "Deliverables", "Proof", "PricingTeaser",
    ],
    serviceSectionKeys: ["DataStack", "Dashboards", "Attribution"],
    whyKinexus: why(
      {
        headline: "Why Most Analytics Setups Lie",
        subtitle: "Tracking installed but disconnected from booked calls, last-click attribution, and dashboards nobody acts on.",
        points: [
          { title: "Tracking without strategy", description: "GA4 is installed but events do not map to booked calls, purchases, or pipeline stages." },
          { title: "Last-click delusion", description: "Single-touch attribution gives all credit to the last ad someone clicked. The channels that started the journey stay invisible." },
          { title: "Dashboards nobody reads", description: "Data dumps with 47 charts. We build views that answer one question: what should we do next week?" },
          { title: "No CRM connection", description: "Marketing reports leads. Sales reports revenue. Nobody connects the two without a spreadsheet marathon." },
        ],
      },
      {
        headline: "Por Qué la Mayoría de Analytics Miente",
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
          challenge: "Marketing reported 180 monthly leads from Google Ads but the CRM showed only 38 qualified. Page views were counted as conversions and phone calls were not tracked at all.",
          outcome: "40% reduction in wasted ad spend after GA4, call tracking, and CRM integration connected every lead to its source campaign and sales outcome.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Empresa de Plomería",
          challenge: "Marketing reportaba 180 leads mensuales pero el CRM mostraba solo 38 calificados. Las llamadas no se rastreaban.",
          outcome: "40% reducción de gasto desperdiciado tras integración de GA4, llamadas y CRM.",
          href: "/case-studies/plumbing-company-growth",
        },
      },
    },
  },

  "growth-consulting": {
    visualVariant: "split",
    visualizationSection: "WhyKinexus",
    sectionOrder: [
      "ServiceOverview", "WhyKinexus",
      "GrowthAudit", "ChannelMix", "Roadmap",
      "Process", "Deliverables", "Proof", "Results", "PricingTeaser",
    ],
    serviceSectionKeys: ["GrowthAudit", "ChannelMix", "Roadmap"],
    whyKinexus: why(
      {
        headline: "The Kinexus Growth Audit Framework",
        subtitle: "Full revenue-system diagnosis before anyone recommends a channel, with margin-aware recommendations and execution included.",
        points: [
          { title: "Diagnosis before prescription", description: "We audit your full revenue system before recommending channels. No cookie-cutter channel mix." },
          { title: "Channel interdependencies", description: "SEO, paid, email, and CRO work as one engine. Fixing one leak while ignoring three others wastes money." },
          { title: "Margin-aware growth", description: "Recommendations account for CAC, LTV, and payback period. Growth that destroys margin is not growth." },
          { title: "Execution included", description: "Strategy without implementation is a deck. We can run what we recommend if you want one team accountable." },
        ],
      },
      {
        headline: "El Marco de Auditoría de Crecimiento Kinexus",
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
          challenge: "$18,000 per month spread across an SEO freelancer, Meta ads, and a content writer with no shared strategy, attribution model, or quarterly plan tying spend to MRR.",
          outcome: "45% blended CPL reduction after a channel audit reallocated budget toward content-led SEO, cut underperforming Meta prospecting, and delivered a 90-day execution roadmap.",
          href: "/case-studies/saas-platform-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Plataforma SaaS",
          challenge: "$18K/mes repartidos entre SEO, Meta y contenido sin estrategia compartida ni atribución a MRR.",
          outcome: "45% reducción de CPL combinado tras auditoría de canales y roadmap de 90 días.",
          href: "/case-studies/saas-platform-growth",
        },
      },
    },
  },

  funnels: {
    visualVariant: "chart",
    visualizationSection: "WhyKinexus",
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
        subtitle: "Stage gaps between traffic and sales, pages built on gut feel, and funnels left alone after launch day.",
        points: [
          { title: "Gaps between funnel stages", description: "Traffic arrives but nurture stops at the form fill. Nobody tracks where leads drop between stages." },
          { title: "Pages built without data", description: "Landing pages launch on gut feel. No heatmaps, no session recordings, no tests to validate the layout." },
          { title: "Manual handoffs and blind spots", description: "Sales gets cold leads because automation ends at submit. Marketing never sees what happens after handoff." },
          { title: "One-and-done mentality", description: "Funnels get built once and left alone. CRO treated as a project instead of a monthly discipline." },
        ],
      },
      {
        headline: "Por Qué la Mayoría de Sistemas de Conversión Pierden Ingresos",
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
          challenge: "Paid traffic landed on the homepage. Leads got one welcome email then went cold. Demo booking rate was 2.1% with no nurture sequence, retargeting, or A/B testing on the booking flow.",
          outcome: "5.9× demo growth after funnel rebuild with dedicated landing pages, a 7-email nurture sequence, retargeting pools, and structured tests on pricing and demo booking pages.",
          href: "/case-studies/saas-platform-growth",
        },
      },
      es: {
        caseStudy: {
          client: "Plataforma SaaS",
          challenge: "Tráfico pagado a la homepage, un email de bienvenida y tasa de demo del 2.1% sin nurture ni retargeting.",
          outcome: "5.9× crecimiento en demos tras rebuild de embudo con landing pages, nurture y tests A/B.",
          href: "/case-studies/saas-platform-growth",
        },
      },
    },
  },
};

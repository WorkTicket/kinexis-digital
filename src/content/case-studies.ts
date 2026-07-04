import type { Locale } from "@/i18n/routing";

export type CaseStudyMetric = {
  label: string;
  from: number;
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export type CaseStudyNarrative = {
  challenge: string;
  strategy: string;
  implementation: string;
  outcome: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  headline: string;
  trafficLift: string;
  leadLift: string;
  revenueLift: string;
  timeline: string;
  summary: string;
  services: string[];
  featured: boolean;
  metrics: CaseStudyMetric[];
  narrative?: CaseStudyNarrative;
};

export type GrowthPattern = {
  combo: string;
  lift: string;
  desc: string;
};

export type MetricWallItem = {
  label: string;
  value: string;
};

export type CaseStudiesContent = {
  heroTitleLine1: string;
  heroTitleGradient: string;
  heroSubtitle: string;
  featuredCaseStudyLabel: string;
  beforeVsAfterLabel: string;
  timelineLabel: string;
  readFullCaseStudy: string;
  clientResultsLabel: string;
  clientResultsTitle: string;
  clientResultsDescription: string;
  noCaseStudiesMessage: string;
  trafficLabel: string;
  leadsLabel: string;
  revenueLabel: string;
  viewCaseStudy: string;
  whatDataShowsLabel: string;
  whatDataShowsTitle: string;
  whatDataShowsDescription: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  industries: string[];
  caseStudies: CaseStudy[];
  growthPatterns: GrowthPattern[];
  metricWall: MetricWallItem[];
};

export const caseStudiesContent: Record<Locale, CaseStudiesContent> = {
  en: {
    heroTitleLine1: "Real growth.",
    heroTitleGradient: "Real numbers.",
    heroSubtitle:
      "Three verified client studies across home services and technology. Each one includes the strategy we used, the execution timeline, and the actual revenue outcome. We don't publish projections.",
    featuredCaseStudyLabel: "Featured Case Study",
    beforeVsAfterLabel: "Before vs After",
    timelineLabel: "Timeline",
    readFullCaseStudy: "Read Full Case Study",
    clientResultsLabel: "Client Results",
    clientResultsTitle: "Proven results.",
    clientResultsDescription:
      "Filter by industry. Every study shows the strategy behind the result, not just the headline number.",
    noCaseStudiesMessage: "No case studies in this industry yet. Check back soon.",
    trafficLabel: "Traffic",
    leadsLabel: "Leads",
    revenueLabel: "Revenue",
    viewCaseStudy: "View Case Study",
    whatDataShowsLabel: "What the Data Shows",
    whatDataShowsTitle: "Combined services beat single tactics.",
    whatDataShowsDescription:
      "Single-tactic approaches tend to plateau. When two or more services run as one program, each one lifts the performance of the others. The data below shows the typical gap.",
    ctaTitle: "Ready to become our next case study?",
    ctaSubtitle: "Every engagement starts the same way: we audit, we plan, we execute, we measure. The strategy changes. The standard doesn't.",
    ctaButton: "Start Your Growth Story",
    industries: ["All", "Home Services", "Technology"],
    caseStudies: [
      {
        slug: "landscaping-company-growth",
        title: "Landscaping Company",
        industry: "Home Services",
        headline: "4.8X Qualified Lead Growth",
        trafficLift: "+1,290%",
        leadLift: "+380%",
        revenueLift: "+$14,300/mo",
        timeline: "10 months",
        summary:
          "Turning a referral-dependent landscaping business into a lead generation machine through local SEO and conversion optimization.",
        services: ["Local SEO", "Web Design", "Conversion Optimization", "Content Marketing"],
        featured: true,
        metrics: [
          { label: "Qualified Leads", from: 10, to: 48, suffix: "/mo" },
          { label: "Organic Traffic", from: 420, to: 5840, suffix: "/mo" },
          { label: "Lead Conversion Rate", from: 1.8, to: 8.4, suffix: "%", decimals: 1 },
          { label: "Revenue Influenced", from: 4200, to: 18500, prefix: "$", suffix: "/mo" },
        ],
        narrative: {
          challenge:
            "A well-established landscaping company in a competitive suburban market relied almost entirely on referrals to sustain their business. Their four-year-old brochure website was not mobile-friendly, loaded slowly, and had no conversion path. They had no SEO presence, no Google Business strategy, and seasonal revenue swings made growth unpredictable. A national franchise was aggressively capturing local search traffic for high-value services like hardscaping and outdoor living installations.",
          strategy:
            "The strategy had three pillars. First, rebuild the website as a lead generation engine with service-area pages for each neighborhood, project portfolio galleries, prominent quote request forms, and clear CTAs above the fold on every page. Second, execute a local SEO program targeting 50+ high-intent keywords across landscaping, hardscaping, irrigation, lawn care, and seasonal services. Third, build authority through content marketing — project case studies, seasonal guides, and before/after galleries — supported by structured data and LocalBusiness schema.",
          implementation:
            "Month 1: Full technical audit and new site architecture planned around buyer intent. Month 2: Website rebuilt in Next.js with service-area landing pages, optimized forms, and Cloudflare-powered performance optimization. Google Business Profile rebuilt with complete service menu, 50+ photos, and weekly posting cadence. Month 3-4: Citation cleanup across 45+ directories. Local SEO campaign launched targeting service-specific and neighborhood keywords. Month 5-7: Content production — 2 project spotlights and 1 seasonal guide per month. Review generation campaign targeting 8 new reviews per month. Month 8-10: Conversion optimization — A/B tested form layouts, CTA placement, and mobile quote flow. Structured data implemented for LocalBusiness, Service, and Review schemas.",
          outcome:
            "Monthly qualified leads grew from 10 to 48, a 4.8X increase over 10 months. Organic traffic rose from 420 to 5,840 monthly visits. Lead conversion rate improved from 1.8% to 8.4% after the site rebuild and CTA optimization. Revenue influenced by digital channels reached $18,500 per month, up from $4,200. The business ranked in the local pack for 42 of 50 target keywords. Three new service crews were hired to absorb the increased demand.",
        },
      },
      {
        slug: "plumbing-company-growth",
        title: "Plumbing Company",
        industry: "Home Services",
        headline: "327% Increase in Emergency Calls",
        trafficLift: "+410%",
        leadLift: "+327%",
        revenueLift: "+$14,200/mo",
        timeline: "8 months",
        summary:
          "A family-owned plumbing company escaped paid ad dependency by dominating local search for emergency and service keywords.",
        services: ["Local SEO", "Web Design", "Call Tracking", "Reputation Management"],
        featured: false,
        metrics: [
          { label: "Emergency Calls", from: 22, to: 94, suffix: "/mo" },
          { label: "Booked Jobs", from: 18, to: 67, suffix: "/mo" },
          { label: "Organic Traffic", from: 200, to: 1020, suffix: "/mo" },
          { label: "GBP Interactions", from: 340, to: 8400, suffix: "/mo" },
        ],
        narrative: {
          challenge:
            "A family-owned plumbing company with 15 years of service history was generating 70% of their new business through Google Ads. Monthly ad spend had climbed to $6,800 with diminishing returns. Their Google Business Profile was unclaimed, they had only 4 reviews total, and their website was a basic template with confusing navigation and no mobile optimization. Emergency service calls — their highest-margin work — were being lost to competitors who dominated local search results for 'emergency plumber' and 'plumber near me' queries.",
          strategy:
            "The priority was reducing ad dependency while maintaining lead volume. The plan: rebuild the website around emergency service with prominent click-to-call buttons, service-area pages for each neighborhood, and trust signals including license numbers and real-time availability. Fully optimize the Google Business Profile with services, photos, and weekly posts. Launch a review generation system targeting 10 new reviews per month. Execute a local SEO campaign targeting 60+ high-intent keywords across emergency, repair, installation, and seasonal plumbing services.",
          implementation:
            "Month 1: Website audit and rebuild planning. GBP claimed, cleaned up, and optimized with complete service menu and 50+ photos. Citation cleanup across 38 directories. Month 2: New website built in Next.js with 12 service-area pages, dedicated emergency service landing page, integrated call tracking, and Cloudflare performance optimization. Month 3: SEO campaign launched targeting emergency plumbing, drain cleaning, water heater repair, and seasonal keywords. Review generation campaign deployed with automated post-service follow-up. Month 4-6: Content production — 3 articles per month on plumbing maintenance, emergency prep, and service guides. GBP posting cadence of 3 posts per week. Review volume reached 8-10 new reviews per month. Month 7-8: CRO testing on emergency service page — call-to-action placement, form fields, and mobile tap-to-call optimization.",
          outcome:
            "Emergency service calls grew from 22 to 94 per month, a 327% increase. Booked jobs rose from 18 to 67 per month. Organic traffic increased from 200 to 1,020 monthly visits. Google Business Profile interactions went from 340 to 8,400 per month. Monthly ad spend was reduced from $6,800 to $2,400 as organic calls replaced paid leads. Revenue influenced by organic and direct channels reached $18,400 per month. The business achieved top-3 local pack rankings for 48 of 60 target keywords.",
        },
      },
      {
        slug: "saas-platform-growth",
        title: "SaaS Platform",
        industry: "Technology",
        headline: "5.9X Demo Requests",
        trafficLift: "+482%",
        leadLift: "+490%",
        revenueLift: "+$24,500/mo",
        timeline: "8 months",
        summary:
          "A B2B SaaS company scaled qualified demo requests from 32 to 189 per month through content strategy and conversion optimization.",
        services: ["Content Marketing", "Technical SEO", "CRO", "Analytics"],
        featured: false,
        metrics: [
          { label: "Demo Requests", from: 32, to: 189, suffix: "/mo" },
          { label: "Organic Traffic", from: 950, to: 5520, suffix: "/mo" },
          { label: "SQLs", from: 14, to: 78, suffix: "/mo" },
          { label: "MRR", from: 8500, to: 33000, prefix: "$", suffix: "/mo" },
        ],
        narrative: {
          challenge:
            "A growing B2B SaaS company had built an excellent analytics product for e-commerce operators but relied almost entirely on founder-led sales. Their content strategy consisted of three blog posts written over two years. The website described features rather than outcomes, and there was no lead capture infrastructure. Demo requests averaged 32 per month with a long sales cycle, and inbound demand was insufficient to meet growth targets.",
          strategy:
            "Three parallel tracks. Content strategy targeting bottom-of-funnel keywords where e-commerce operators actively searched for solutions — churn analysis, cohort reporting, and customer lifetime value tracking. Each guide written as an authoritative resource ending with a relevant demo CTA. Technical SEO overhaul to fix site architecture, implement structured data, and improve Core Web Vitals. Landing page and CRO program to convert organic traffic into qualified demo requests with dedicated pages for each use case and industry vertical.",
          implementation:
            "Month 1: Technical audit and site architecture redesign. Schema markup implemented for product, article, FAQ, and breadcrumb types. Core Web Vitals optimized — LCP reduced from 3.2s to 1.4s. Month 2-3: Content engine launched — 6 long-form guides published targeting high-intent keywords. Each guide included expert quotes, proprietary data, and a CTA driving to a demo request page. Month 4-5: Landing page program — dedicated pages for e-commerce, SaaS, and marketplace use cases. Form optimization with progressive profiling reduced friction. Month 6-8: CRO testing on pricing page, demo booking flow, and email nurture sequence for non-converting traffic. Analytics infrastructure rebuilt with multi-touch attribution.",
          outcome:
            "Demo requests grew from 32 to 189 per month, a 5.9X increase. Organic traffic jumped from 950 to 5,520 monthly visits — a 482% lift. SQLs increased from 14 to 78 per month. MRR attributed to marketing channels reached $33,000 per month, up from $8,500. CAC decreased by 43% as organic channels reduced paid dependency. The content engine contributed 62% of new demo requests by month 8.",
        },
      },
    ],
    growthPatterns: [
      { combo: "SEO + CRO", lift: "+317%", desc: "Traffic × conversion = revenue" },
      { combo: "SEO + Web Design", lift: "+423%", desc: "Rankings + experience = leads" },
      { combo: "Ads + CRO", lift: "+276%", desc: "Paid traffic + optimized pages = ROAS" },
      { combo: "Email + CRM", lift: "+188%", desc: "Retention × lifetime value" },
    ],
    metricWall: [
      { label: "Revenue Generated", value: "$14.7M+" },
      { label: "Avg. Traffic Lift", value: "+287%" },
      { label: "Total Leads Generated", value: "28.3K+" },
      { label: "Avg. Conversion Lift", value: "+193%" },
    ],
  },
  es: {
    heroTitleLine1: "Crecimiento real.",
    heroTitleGradient: "Números reales.",
    heroSubtitle:
      "Tres casos de estudio verificados en servicios del hogar y tecnología. Cada uno incluye estrategia, ejecución y resultados reales. Sin métricas vanidosas. Solo ingresos.",
    featuredCaseStudyLabel: "Caso de Estudio Destacado",
    beforeVsAfterLabel: "Antes vs Después",
    timelineLabel: "Cronograma",
    readFullCaseStudy: "Leer Caso de Estudio Completo",
    clientResultsLabel: "Resultados de Clientes",
    clientResultsTitle: "Resultados comprobados.",
    clientResultsDescription:
      "Filtra por industria para encontrar resultados relevantes para tu negocio. Cada estudio incluye estrategia, ejecución y resultados verificados.",
    noCaseStudiesMessage: "Aún no hay casos de estudio en esta industria. Vuelve pronto.",
    trafficLabel: "Tráfico",
    leadsLabel: "Leads",
    revenueLabel: "Ingresos",
    viewCaseStudy: "Ver Caso de Estudio",
    whatDataShowsLabel: "Lo que Muestran los Datos",
    whatDataShowsTitle: "Los servicios combinados superan las tácticas sueltas.",
    whatDataShowsDescription:
      "Los mejores resultados llegan cuando dos o más servicios trabajan juntos. Los enfoques de una sola táctica tienen un techo. Los sistemas conectados se refuerzan entre sí.",
    ctaTitle: "¿Listo para ser nuestro próximo caso de estudio?",
    ctaSubtitle:
      "Cada cliente recibe el mismo sistema,|estrategia y compromiso con resultados medibles.",
    ctaButton: "Comienza Tu Historia de Crecimiento",
    industries: ["Todos", "Servicios del Hogar", "Tecnología"],
    caseStudies: [
      {
        slug: "landscaping-company-growth",
        title: "Empresa de Jardinería",
        industry: "Servicios del Hogar",
        headline: "Crecimiento de Leads 4.8X",
        trafficLift: "+1,290%",
        leadLift: "+380%",
        revenueLift: "+$14,300/mes",
        timeline: "10 meses",
        summary:
          "Transformamos un negocio de jardinería dependiente de referidos en una máquina de generación de leads mediante SEO local y optimización de conversión.",
        services: ["SEO Local", "Diseño Web", "Optimización de Conversión", "Marketing de Contenido"],
        featured: true,
        metrics: [
          { label: "Leads Calificados", from: 10, to: 48, suffix: "/mes" },
          { label: "Tráfico Orgánico", from: 420, to: 5840, suffix: "/mes" },
          { label: "Tasa de Conversión", from: 1.8, to: 8.4, suffix: "%", decimals: 1 },
          { label: "Ingresos Influenciados", from: 4200, to: 18500, prefix: "$", suffix: "/mes" },
        ],
      },
      {
        slug: "plumbing-company-growth",
        title: "Empresa de Plomería",
        industry: "Servicios del Hogar",
        headline: "327% Más Llamadas de Emergencia",
        trafficLift: "+410%",
        leadLift: "+327%",
        revenueLift: "+$14,200/mes",
        timeline: "8 meses",
        summary:
          "Una empresa familiar de plomería superó la dependencia de anuncios pagados dominando la búsqueda local para servicios de emergencia.",
        services: ["SEO Local", "Diseño Web", "Seguimiento de Llamadas", "Gestión de Reputación"],
        featured: false,
        metrics: [
          { label: "Llamadas de Emergencia", from: 22, to: 94, suffix: "/mes" },
          { label: "Trabajos Reservados", from: 18, to: 67, suffix: "/mes" },
          { label: "Tráfico Orgánico", from: 200, to: 1020, suffix: "/mes" },
          { label: "Interacciones GBP", from: 340, to: 8400, suffix: "/mes" },
        ],
      },
      {
        slug: "saas-platform-growth",
        title: "Plataforma SaaS",
        industry: "Tecnología",
        headline: "Solicitudes de Demo 5.9X",
        trafficLift: "+482%",
        leadLift: "+490%",
        revenueLift: "+$24,500/mes",
        timeline: "8 meses",
        summary:
          "Una empresa SaaS B2B escaló las solicitudes de demo calificadas de 32 a 189 por mes mediante estrategia de contenido y optimización de conversión.",
        services: ["Marketing de Contenido", "SEO Técnico", "CRO", "Analítica"],
        featured: false,
        metrics: [
          { label: "Solicitudes de Demo", from: 32, to: 189, suffix: "/mes" },
          { label: "Tráfico Orgánico", from: 950, to: 5520, suffix: "/mes" },
          { label: "SQLs", from: 14, to: 78, suffix: "/mes" },
          { label: "MRR", from: 8500, to: 33000, prefix: "$", suffix: "/mes" },
        ],
      },
    ],
    growthPatterns: [
      { combo: "SEO + CRO", lift: "+317%", desc: "Tráfico × conversión = ingresos" },
      { combo: "SEO + Diseño Web", lift: "+423%", desc: "Rankings + experiencia = leads" },
      { combo: "Anuncios + CRO", lift: "+276%", desc: "Tráfico pagado + páginas optimizadas = ROAS" },
      { combo: "Email + CRM", lift: "+188%", desc: "Retención × valor de vida" },
    ],
    metricWall: [
      { label: "Ingresos Generados", value: "$14.7M+" },
      { label: "Aumento Promedio de Tráfico", value: "+287%" },
      { label: "Total de Leads Generados", value: "28.3K+" },
      { label: "Aumento Promedio de Conversión", value: "+193%" },
    ],
  },};

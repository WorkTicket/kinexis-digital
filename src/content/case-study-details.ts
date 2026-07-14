import type { Locale } from "@/i18n/routing";
import { caseStudySlugs } from "@/content/registry/site-routes";

export type CaseStudyResult = {
  label: string;
  before: number;
  after: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export type CaseStudyProblem = {
  category: string;
  items: string[];
};

export type StrategyPhase = {
  objective: string;
  actions: string;
  outcome: string;
};

export type CaseStudyDetail = {
  title: string;
  datePublished: string;
  client: string;
  industry: string;
  headline: string;
  challenge: string;
  solution: string;
  results: string;
  resultsList: CaseStudyResult[];
  challengeHeading: string;
  solutionHeading: string;
  resultsHeading: string;
  beforeHeading: string;
  strategyHeading: string;
  techStackHeading: string;
  actionsLabel: string;
  outcomeLabel: string;
  ctaHeadline: string;
  ctaSubtitle: string;
  ctaLabel: string;
  heroCtaLabel: string;
  breadcrumbs: { caseStudies: string; home: string };
  problems: CaseStudyProblem[];
  strategyPhases: StrategyPhase[];
  techStack: string[];
};

const en: Record<(typeof caseStudySlugs)[number], Omit<CaseStudyDetail, never>> = {
  "landscaping-company-growth": {
    title: "Landscaping Company",
    datePublished: "2025-01-15",
    client: "Local Landscaping Business",
    industry: "Home Services",
    headline: "4.8X Qualified Lead Growth",
    challenge:
      "A well-established landscaping company in a competitive suburban market relied almost entirely on word-of-mouth referrals. Their four-year-old brochure website was not mobile-friendly, loaded slowly, and had no path to convert visitors into leads. There was no SEO strategy, no Google Business Profile optimization, and seasonal revenue swings made growth unpredictable. A national franchise had entered their market and was aggressively capturing local search traffic for high-value services like hardscaping and outdoor living installations.",
    solution:
      "We rebuilt the website as a dedicated lead generation engine — fast-loading, mobile-first, with service-area landing pages for each target neighborhood, and prominent quote request forms above the fold on every page. We executed a local SEO program targeting 50+ high-intent keywords across landscaping, hardscaping, irrigation, and seasonal services. The Google Business Profile was fully optimized with a complete service menu, 50+ photos, and a weekly content cadence. A content marketing program produced project case studies and seasonal guides, supported by LocalBusiness schema and structured data markup.",
    results:
      "Qualified leads grew from 10 to 48 per month — a 4.8X increase. Organic traffic rose from 420 to 5,840 monthly visits. Lead conversion rate improved from 1.8% to 8.4%. Monthly revenue influenced by digital channels reached $18,500, up from $4,200. The business now ranks in the local pack for 42 of 50 target keywords and added three service crews to handle new demand.",
    resultsList: [
      { label: "Qualified Leads", before: 10, after: 48, suffix: "/mo" },
      { label: "Organic Traffic", before: 420, after: 5840, suffix: " visits/mo" },
      { label: "Lead Conversion Rate", before: 1.8, after: 8.4, suffix: "%", decimals: 1 },
      { label: "Revenue Influenced", before: 4200, after: 18500, prefix: "$", suffix: "/mo" },
    ],
    challengeHeading: "The Challenge",
    solutionHeading: "The Solution",
    resultsHeading: "The Results",
    beforeHeading: "Before We Started",
    strategyHeading: "Growth Strategy",
    techStackHeading: "Tech Stack",
    actionsLabel: "Actions Taken",
    outcomeLabel: "Outcome",
    ctaHeadline: "Want Results Like These?",
    ctaSubtitle: "Let's talk about what real growth looks like for your business.",
    ctaLabel: "Start Your Growth Story",
    heroCtaLabel: "Book a Strategy Call",
    breadcrumbs: { home: "Home", caseStudies: "Case Studies" },
    problems: [
      { category: "Business", items: ["Seasonal revenue swings", "Referral-dependent growth", "Limited repeat business"] },
      { category: "Marketing", items: ["No SEO strategy", "No Google rankings", "Little brand visibility"] },
      { category: "Website", items: ["Poor mobile experience", "Slow loading times", "Weak calls-to-action"] },
      { category: "Competition", items: ["National franchise entering market", "Competitors owning local search", "High-value jobs going elsewhere"] },
    ],
    strategyPhases: [
      { objective: "Increase local visibility", actions: "Local SEO audit, Google Business optimization, service-area pages for each neighborhood", outcome: "Top rankings for 42 of 50 high-value service keywords" },
      { objective: "Increase conversions", actions: "New landing pages with quote forms, mobile-first CTAs, streamlined contact flow", outcome: "Lead conversion rate improved from 1.8% to 8.4%" },
      { objective: "Build authority", actions: "Project portfolio pages, seasonal content marketing, LocalBusiness schema markup", outcome: "Organic traffic grew from 420 to 5,840 monthly visits" },
      { objective: "Scale with content & reviews", actions: "Project portfolio content, seasonal guides, review generation campaign targeting 8+ new reviews per month", outcome: "8+ new reviews per month across GBP and directories" },
    ],
    techStack: ["Cloudflare", "Next.js", "Workers", "Google Analytics", "Google Search Console", "LocalBusiness Schema", "Cloudflare Images"],
  },
  "plumbing-company-growth": {
    title: "Plumbing Company",
    datePublished: "2025-03-20",
    client: "Family-Owned Plumbing Business",
    industry: "Home Services",
    headline: "327% Increase in Emergency Calls",
    challenge:
      "A family-owned plumbing company with 15 years of service history was generating 70% of their new business through Google Ads. Monthly ad spend had climbed to $6,800 with diminishing returns. Their Google Business Profile was unclaimed with only 4 reviews. The website was a basic template with confusing navigation and no mobile optimization. Emergency service calls — their highest-margin work — were being lost to competitors who dominated local search results for 'emergency plumber' and 'plumber near me' queries.",
    solution:
      "We rebuilt the website around emergency service with prominent click-to-call buttons, service-area pages for each neighborhood, and trust signals including license details and real-time availability. The GBP was fully optimized with a complete service menu, 50+ photos, and a weekly posting schedule. A review generation system targeting 10 new reviews per month was deployed with automated post-service follow-up. A local SEO campaign targeted 60+ high-intent keywords across emergency, repair, installation, and seasonal plumbing services. Call tracking and form analytics were integrated to tie every lead to a specific source.",
    results:
      "Emergency service calls grew from 22 to 94 per month — a 327% increase. Booked jobs rose from 18 to 67 per month. Organic traffic increased from 200 to 1,020 monthly visits. GBP interactions went from 340 to 8,400 per month. Monthly ad spend was reduced from $6,800 to $2,400 as organic calls replaced paid leads. Monthly revenue influenced by digital channels reached $18,400, up from $4,200. The business achieved top-3 local pack rankings for 48 of 60 target keywords.",
    resultsList: [
      { label: "Emergency Calls", before: 22, after: 94, suffix: "/mo" },
      { label: "Booked Jobs", before: 18, after: 67, suffix: "/mo" },
      { label: "Organic Traffic", before: 200, after: 1020, suffix: " visits/mo" },
      { label: "GBP Interactions", before: 340, after: 8400, suffix: "/mo" },
      { label: "Revenue Influenced", before: 4200, after: 18400, prefix: "$", suffix: "/mo" },
    ],
    challengeHeading: "The Challenge",
    solutionHeading: "The Solution",
    resultsHeading: "The Results",
    beforeHeading: "Before We Started",
    strategyHeading: "Growth Strategy",
    techStackHeading: "Tech Stack",
    actionsLabel: "Actions Taken",
    outcomeLabel: "Outcome",
    ctaHeadline: "Want Results Like These?",
    ctaSubtitle: "Let's talk about what real growth looks like for your business.",
    ctaLabel: "Start Your Growth Story",
    heroCtaLabel: "Book a Strategy Call",
    breadcrumbs: { home: "Home", caseStudies: "Case Studies" },
    problems: [
      { category: "Business", items: ["Heavy dependence on paid ads", "Missed after-hours leads", "Low repeat customer rate"] },
      { category: "Marketing", items: ["Weak local keyword rankings", "Few online reviews", "Poor GBP optimization"] },
      { category: "Website", items: ["Confusing navigation structure", "Slow mobile load speed", "Weak trust signals"] },
      { category: "Operations", items: ["No after-hours call routing", "Rising ad spend, flat returns", "No source-level lead tracking"] },
    ],
    strategyPhases: [
      { objective: "Dominate local search", actions: "GBP optimization with complete service menu, local citation cleanup, 60+ keyword SEO campaign", outcome: "Top-3 local pack for 48 of 60 target keywords" },
      { objective: "Convert calls to jobs", actions: "Emergency service landing pages, click-to-call CTAs, integrated call tracking", outcome: "Booked jobs increased from 18 to 67 per month" },
      { objective: "Build trust & authority", actions: "Review generation campaign, GBP weekly posts, service-area content", outcome: "GBP interactions grew from 340 to 8,400 per month" },
      { objective: "Reduce ad dependency", actions: "Organic-first content strategy, call tracking attribution, ad spend optimization based on channel performance", outcome: "Monthly ad spend reduced from $6,800 to $2,400 without losing lead volume" },
    ],
    techStack: ["Cloudflare Workers", "Next.js", "Analytics", "Search Console", "Structured Data", "Call Tracking", "CRM Integration"],
  },
  "saas-platform-growth": {
    title: "SaaS Platform",
    datePublished: "2025-05-01",
    client: "B2B Analytics Startup",
    industry: "Technology",
    headline: "5.9X Demo Requests",
    challenge:
      "A growing B2B SaaS company had built an excellent analytics product for e-commerce operators but relied almost entirely on founder-led sales. Their content strategy consisted of three blog posts written over two years. The website described features rather than customer outcomes, and there was no lead capture infrastructure. Demo requests averaged 32 per month with a long sales cycle, and inbound demand was insufficient to meet growth targets.",
    solution:
      "We executed three parallel tracks. A content strategy targeting bottom-of-funnel keywords where e-commerce operators actively searched for solutions — churn analysis, cohort reporting, and customer lifetime value tracking. Each guide was written as an authoritative resource ending with a relevant demo CTA. A technical SEO overhaul fixed site architecture, implemented structured data (Product, Article, FAQ, Breadcrumb schemas), and improved Core Web Vitals — LCP dropped from 3.2s to 1.4s. A landing page and CRO program converted organic traffic into qualified demo requests with dedicated pages for each use case and industry vertical, plus an email nurture sequence for non-converting visitors.",
    results:
      "Demo requests grew from 32 to 189 per month — a 5.9X increase. Organic traffic jumped from 950 to 5,520 monthly visits — a 481% lift. SQLs increased from 14 to 78 per month. MRR attributed to marketing channels reached $33,000 per month, up from $8,500. Customer acquisition cost decreased by 43% as organic channels reduced paid dependency.",
    resultsList: [
      { label: "Demo Requests", before: 32, after: 189, suffix: "/mo" },
      { label: "Organic Traffic", before: 950, after: 5520, suffix: " visits/mo" },
      { label: "SQLs", before: 14, after: 78, suffix: "/mo" },
      { label: "MRR", before: 8500, after: 33000, prefix: "$", suffix: "/mo" },
    ],
    challengeHeading: "The Challenge",
    solutionHeading: "The Solution",
    resultsHeading: "The Results",
    beforeHeading: "Before We Started",
    strategyHeading: "Growth Strategy",
    techStackHeading: "Tech Stack",
    actionsLabel: "Actions Taken",
    outcomeLabel: "Outcome",
    ctaHeadline: "Want Results Like These?",
    ctaSubtitle: "Let's talk about what real growth looks like for your business.",
    ctaLabel: "Start Your Growth Story",
    heroCtaLabel: "Book a Strategy Call",
    breadcrumbs: { home: "Home", caseStudies: "Case Studies" },
    problems: [
      { category: "Business", items: ["Slow pipeline growth", "Long sales cycle", "Low inbound demand"] },
      { category: "Marketing", items: ["Weak organic SEO", "Low domain authority", "Limited content production"] },
      { category: "Website", items: ["Poor information architecture", "Weak product messaging", "Low conversion rate"] },
      { category: "Sales", items: ["Pipeline reliant on founders", "No structured lead capture", "Feature-first messaging"] },
    ],
    strategyPhases: [
      { objective: "Build content engine", actions: "6 long-form guides targeting bottom-of-funnel keywords, expert quotes, proprietary data", outcome: "Organic traffic grew from 950 to 5,520 visits per month" },
      { objective: "Fix technical foundation", actions: "Schema markup implementation, Core Web Vitals optimization, site architecture redesign", outcome: "LCP reduced from 3.2s to 1.4s, structured data across all pages" },
      { objective: "Convert traffic to demos", actions: "Use-case landing pages, progressive profiling forms, email nurture for non-converters", outcome: "Demo requests increased from 32 to 189 per month — 5.9X" },
      { objective: "Nurture & scale with data", actions: "Multi-touch attribution buildout, email nurture sequence for non-converters, CRO testing on pricing and demo flow", outcome: "CAC decreased 43%; content drove 62% of new demo requests by month 8" },
    ],
    techStack: ["Next.js", "Cloudflare Workers", "TypeScript", "Analytics", "Search Console", "Schema Markup", "Speed Optimization", "Image Optimization"],
  },
};

const es: Record<(typeof caseStudySlugs)[number], CaseStudyDetail> = {
  "landscaping-company-growth": {
    ...en["landscaping-company-growth"],
    title: "Empresa de Jardinería",
    client: "Negocio Local de Jardinería",
    industry: "Servicios del Hogar",
    headline: "Crecimiento de Leads 4.8X",
    challenge:
      "Una empresa de jardinería consolidada en un mercado suburbano competitivo dependía casi por completo de referidos boca a boca. Su sitio web tipo folleto de cuatro años no era compatible con móviles, cargaba lentamente y no tenía un camino para convertir visitantes en leads. No tenían estrategia SEO ni optimización de Perfil de Empresa en Google, y las fluctuaciones estacionales hacían impredecible el crecimiento. Una franquicia nacional había entrado en su mercado capturando agresivamente el tráfico de búsqueda local para servicios de alto valor.",
    solution:
      "Reconstruimos el sitio web como un motor de generación de leads — rápido, mobile-first, con páginas de servicio para cada vecindario objetivo y formularios de solicitud de presupuesto destacados. Ejecutamos un programa de SEO local orientado a más de 50 palabras clave de alta intención. Optimizamos el Perfil de Empresa en Google con menú de servicios completo, más de 50 fotos y una cadencia semanal de contenido. Un programa de marketing de contenido produjo casos de estudio y guías estacionales, respaldados por esquema LocalBusiness y datos estructurados.",
    results:
      "Los leads calificados crecieron de 10 a 48 por mes, un aumento de 4.8X. El tráfico orgánico aumentó de 420 a 5,840 visitas mensuales. La tasa de conversión de leads mejoró del 1.8% al 8.4%. Los ingresos mensuales influenciados por canales digitales alcanzaron $18,500, frente a $4,200. El negocio ahora aparece en el pack local para 42 de 50 palabras clave objetivo y contrató tres cuadrillas adicionales para manejar la nueva demanda.",
    resultsList: [
      { label: "Leads Calificados", before: 10, after: 48, suffix: "/mes" },
      { label: "Tráfico Orgánico", before: 420, after: 5840, suffix: " visitas/mes" },
      { label: "Tasa de Conversión", before: 1.8, after: 8.4, suffix: "%", decimals: 1 },
      { label: "Ingresos Influenciados", before: 4200, after: 18500, prefix: "$", suffix: "/mes" },
    ],
    challengeHeading: "El Desafío",
    solutionHeading: "La Solución",
    resultsHeading: "Los Resultados",
    beforeHeading: "Antes de Empezar",
    strategyHeading: "Estrategia de Crecimiento",
    techStackHeading: "Stack Tecnológico",
    actionsLabel: "Acciones Tomadas",
    outcomeLabel: "Resultado",
    ctaHeadline: "¿Quieres resultados como estos?",
    ctaSubtitle: "Hablemos de cómo se ve el crecimiento real para tu negocio.",
    ctaLabel: "Comienza Tu Historia de Crecimiento",
    heroCtaLabel: "Reserva una Llamada Estratégica",
    breadcrumbs: { home: "Inicio", caseStudies: "Casos de Estudio" },
    problems: [
      { category: "Negocio", items: ["Fluctuaciones estacionales de ingresos", "Crecimiento dependiente de referidos", "Poco negocio recurrente"] },
      { category: "Marketing", items: ["Sin estrategia SEO", "Sin posicionamiento en Google", "Poca visibilidad de marca"] },
      { category: "Sitio Web", items: ["Mala experiencia móvil", "Tiempos de carga lentos", "Llamadas a la acción débiles"] },
      { category: "Competencia", items: ["Franquicia nacional entrando al mercado", "Competidores dominando búsqueda local", "Trabajos de alto valor yendo a otros"] },
    ],
    strategyPhases: [
      { objective: "Aumentar visibilidad local", actions: "Auditoría SEO local, optimización de Google Business, páginas de área de servicio por vecindario", outcome: "Top rankings para 42 de 50 palabras clave de alto valor" },
      { objective: "Aumentar conversiones", actions: "Nuevas landing pages con formularios de presupuesto, CTAs mobile-first, flujo de contacto simplificado", outcome: "Tasa de conversión de leads mejoró del 1.8% al 8.4%" },
      { objective: "Construir autoridad", actions: "Páginas de portafolio de proyectos, marketing de contenido estacional, esquema LocalBusiness", outcome: "Tráfico orgánico creció de 420 a 5,840 visitas mensuales" },
      { objective: "Escalar con contenido y reseñas", actions: "Contenido de portafolio, guías estacionales, campaña de generación de reseñas con 8+ nuevas reseñas por mes", outcome: "8+ nuevas reseñas por mes en GBP y directorios" },
    ],
    techStack: ["Cloudflare", "Next.js", "Workers", "Google Analytics", "Google Search Console", "Esquema LocalBusiness", "Cloudflare Images"],
  },
  "plumbing-company-growth": {
    ...en["plumbing-company-growth"],
    title: "Empresa de Plomería",
    client: "Negocio Familiar de Plomería",
    industry: "Servicios del Hogar",
    headline: "327% Más Llamadas de Emergencia",
    challenge:
      "Una empresa familiar de plomería con 15 años de historia generaba el 70% de sus nuevos negocios a través de Google Ads. El gasto mensual en anuncios había subido a $6,800 con rendimientos decrecientes. Su Perfil de Empresa en Google no estaba reclamado y tenía solo 4 reseñas. El sitio web era una plantilla básica con navegación confusa y sin optimización móvil. Las llamadas de servicio de emergencia — su trabajo de mayor margen — se perdían frente a competidores que dominaban los resultados de búsqueda local.",
    solution:
      "Reconstruimos el sitio web alrededor del servicio de emergencia con botones de llamada destacados, páginas de área de servicio para cada vecindario y señales de confianza. Optimizamos el GBP con menú de servicios completo, más de 50 fotos y publicaciones semanales. Implementamos un sistema de generación de reseñas con seguimiento post-servicio automatizado. Una campaña de SEO local apuntó a más de 60 palabras clave de alta intención. Integramos seguimiento de llamadas y analítica de formularios para vincular cada lead a su fuente.",
    results:
      "Las llamadas de emergencia crecieron de 22 a 94 por mes, un aumento del 327%. Los trabajos reservados aumentaron de 18 a 67 por mes. El tráfico orgánico subió de 200 a 1,020 visitas mensuales. Las interacciones del GBP pasaron de 340 a 8,400 por mes. El gasto mensual en anuncios se redujo de $6,800 a $2,400. Los ingresos mensuales influenciados por canales digitales alcanzaron $18,400, frente a $4,200 anteriores. El negocio logró posiciones en el top-3 del pack local para 48 de 60 palabras clave objetivo.",
    resultsList: [
      { label: "Llamadas de Emergencia", before: 22, after: 94, suffix: "/mes" },
      { label: "Trabajos Reservados", before: 18, after: 67, suffix: "/mes" },
      { label: "Tráfico Orgánico", before: 200, after: 1020, suffix: " visitas/mes" },
      { label: "Interacciones GBP", before: 340, after: 8400, suffix: "/mes" },
      { label: "Ingresos Influenciados", before: 4200, after: 18400, prefix: "$", suffix: "/mes" },
    ],
    challengeHeading: "El Desafío",
    solutionHeading: "La Solución",
    resultsHeading: "Los Resultados",
    beforeHeading: "Antes de Empezar",
    strategyHeading: "Estrategia de Crecimiento",
    techStackHeading: "Stack Tecnológico",
    actionsLabel: "Acciones Tomadas",
    outcomeLabel: "Resultado",
    ctaHeadline: "¿Quieres resultados como estos?",
    ctaSubtitle: "Hablemos de cómo se ve el crecimiento real para tu negocio.",
    ctaLabel: "Comienza Tu Historia de Crecimiento",
    heroCtaLabel: "Reserva una Llamada Estratégica",
    breadcrumbs: { home: "Inicio", caseStudies: "Casos de Estudio" },
    problems: [
      { category: "Negocio", items: ["Alta dependencia de anuncios pagados", "Leads perdidos fuera de horario", "Baja tasa de clientes recurrentes"] },
      { category: "Marketing", items: ["Rankings débiles en keywords locales", "Pocas reseñas en línea", "Optimización deficiente del GBP"] },
      { category: "Sitio Web", items: ["Estructura de navegación confusa", "Velocidad móvil lenta", "Señales de confianza débiles"] },
      { category: "Operaciones", items: ["Sin enrutamiento de llamadas fuera de horario", "Gasto en anuncios subiendo, retornos planos", "Sin seguimiento de leads por fuente"] },
    ],
    strategyPhases: [
      { objective: "Dominar búsqueda local", actions: "Optimización GBP con menú de servicios completo, limpieza de citaciones locales, campaña SEO de 60+ keywords", outcome: "Top-3 en pack local para 48 de 60 keywords objetivo" },
      { objective: "Convertir llamadas en trabajos", actions: "Landing pages de servicio de emergencia, CTAs click-to-call, seguimiento de llamadas integrado", outcome: "Trabajos reservados aumentaron de 18 a 67 por mes" },
      { objective: "Construir confianza y autoridad", actions: "Campaña de generación de reseñas, publicaciones semanales en GBP, contenido por área de servicio", outcome: "Interacciones GBP crecieron de 340 a 8,400 por mes" },
      { objective: "Reducir dependencia de anuncios", actions: "Estrategia de contenido orgánico, atribución de llamadas, optimización de gasto en anuncios por rendimiento de canal", outcome: "Gasto mensual en anuncios reducido de $6,800 a $2,400 sin perder volumen de leads" },
    ],
    techStack: ["Cloudflare Workers", "Next.js", "Analytics", "Search Console", "Datos Estructurados", "Seguimiento de Llamadas", "Integración CRM"],
  },
  "saas-platform-growth": {
    ...en["saas-platform-growth"],
    title: "Plataforma SaaS",
    client: "Startup de Analítica B2B",
    industry: "Tecnología",
    headline: "Solicitudes de Demo 5.9X",
    challenge:
      "Una empresa SaaS B2B en crecimiento había construido un excelente producto de analítica para operadores de e-commerce pero dependía casi enteramente de ventas lideradas por los fundadores. Su estrategia de contenido consistía en tres artículos de blog escritos en dos años. El sitio web describía características en lugar de resultados para el cliente, y no había infraestructura de captura de leads. Las solicitudes de demo promediaban 32 por mes con un ciclo de ventas largo.",
    solution:
      "Ejecutamos tres pistas paralelas. Una estrategia de contenido orientada a palabras clave de fondo de embudo donde los operadores de e-commerce buscaban activamente soluciones. Cada guía escrita como un recurso autorizado que terminaba con un CTA de demo relevante. Una revisión técnica de SEO corrigió la arquitectura del sitio, implementó datos estructurados y mejoró Core Web Vitals — LCP bajó de 3.2s a 1.4s. Un programa de landing pages y CRO convirtió el tráfico orgánico en solicitudes de demo calificadas con páginas dedicadas para cada caso de uso, más una secuencia de email nurture para visitantes no convertidos.",
    results:
      "Las solicitudes de demo crecieron de 32 a 189 por mes, un aumento de 5.9X. El tráfico orgánico saltó de 950 a 5,520 visitas mensuales. Los SQLs aumentaron de 14 a 78 por mes. El MRR atribuido a canales de marketing alcanzó $33,000 por mes, frente a $8,500. El costo de adquisición de clientes disminuyó un 43%.",
    resultsList: [
      { label: "Solicitudes de Demo", before: 32, after: 189, suffix: "/mes" },
      { label: "Tráfico Orgánico", before: 950, after: 5520, suffix: " visitas/mes" },
      { label: "SQLs", before: 14, after: 78, suffix: "/mes" },
      { label: "MRR", before: 8500, after: 33000, prefix: "$", suffix: "/mes" },
    ],
    challengeHeading: "El Desafío",
    solutionHeading: "La Solución",
    resultsHeading: "Los Resultados",
    beforeHeading: "Antes de Empezar",
    strategyHeading: "Estrategia de Crecimiento",
    techStackHeading: "Stack Tecnológico",
    actionsLabel: "Acciones Tomadas",
    outcomeLabel: "Resultado",
    ctaHeadline: "¿Quieres resultados como estos?",
    ctaSubtitle: "Hablemos de cómo se ve el crecimiento real para tu negocio.",
    ctaLabel: "Comienza Tu Historia de Crecimiento",
    heroCtaLabel: "Reserva una Llamada Estratégica",
    breadcrumbs: { home: "Inicio", caseStudies: "Casos de Estudio" },
    problems: [
      { category: "Negocio", items: ["Crecimiento lento del pipeline", "Ciclo de ventas largo", "Baja demanda entrante"] },
      { category: "Marketing", items: ["SEO orgánico débil", "Baja autoridad de dominio", "Producción de contenido limitada"] },
      { category: "Sitio Web", items: ["Arquitectura de información deficiente", "Mensajería de producto débil", "Baja tasa de conversión"] },
      { category: "Ventas", items: ["Pipeline dependiente de fundadores", "Sin captura estructurada de leads", "Mensajería centrada en características"] },
    ],
    strategyPhases: [
      { objective: "Construir motor de contenido", actions: "6 guías extensas orientadas a keywords de fondo de embudo, citas de expertos, datos propietarios", outcome: "Tráfico orgánico creció de 950 a 5,520 visitas por mes" },
      { objective: "Corregir base técnica", actions: "Implementación de schema markup, optimización Core Web Vitals, rediseño de arquitectura del sitio", outcome: "LCP reducido de 3.2s a 1.4s, datos estructurados en todas las páginas" },
      { objective: "Convertir tráfico en demos", actions: "Landing pages por caso de uso, formularios con perfilado progresivo, email nurture para no convertidos", outcome: "Solicitudes de demo aumentaron de 32 a 189 por mes — 5.9X" },
      { objective: "Nutrir y escalar con datos", actions: "Construcción de atribución multi-touch, secuencia de email nurture para no convertidos, pruebas CRO en pricing y flujo de demo", outcome: "CAC disminuyó 43%; el contenido generó 62% de nuevas solicitudes de demo al mes 8" },
    ],
    techStack: ["Next.js", "Cloudflare Workers", "TypeScript", "Analytics", "Search Console", "Schema Markup", "Optimización de Velocidad", "Optimización de Imágenes"],
  },
};

const byLocale: Record<Locale, typeof en> = { en, es };

export function getCaseStudyDetail(locale: Locale, slug: string): CaseStudyDetail | null {
  if (!(caseStudySlugs as readonly string[]).includes(slug)) return null;
  return byLocale[locale][slug as (typeof caseStudySlugs)[number]] ?? null;
}

export function getCaseStudyStaticParams() {
  return caseStudySlugs.flatMap((slug) => [
    { locale: "en" as const, slug },
    { locale: "es" as const, slug },
  ]);
}

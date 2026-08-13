import type { Locale } from "@/i18n/routing";
import { caseStudySlugs } from "@/content/registry/site-routes";
import { getCaseStudyBySlug } from "@/content/case-studies";
import type { CaseStudyMetric } from "@/content/case-studies";

export type CaseStudyResult = {
  label: string;
  before: number;
  after: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

function metricsToResultsList(metrics: CaseStudyMetric[]): CaseStudyResult[] {
  return metrics.map((metric) => ({
    label: metric.label,
    before: metric.from,
    after: metric.to,
    prefix: metric.prefix,
    suffix: metric.suffix,
    decimals: metric.decimals,
  }));
}

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
  liveUrl?: string;
  screenshot?: string;
  screenshotCard?: string;
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
  visitLiveSite?: string;
};

const en: Record<(typeof caseStudySlugs)[number], Omit<CaseStudyDetail, never>> = {
  "landscaping-company-growth": {
    title: "Landscaping Company",
    datePublished: "2025-01-15",
    client: "A1 Property Services",
    industry: "Home Services",
    headline: "2.8X Qualified Lead Growth",
    challenge:
      "A1 Property Services, a well-established landscaping company in Cedar Falls, Iowa, relied almost entirely on word-of-mouth referrals. Their four-year-old brochure website was not mobile-friendly, loaded slowly, and had no path to convert visitors into leads. There was no SEO strategy, no Google Business Profile optimization, and seasonal revenue swings made growth unpredictable. A national franchise had entered their market and was aggressively capturing local search traffic for high-value services like hardscaping and outdoor living installations.",
    solution:
      "We rebuilt the website as a dedicated lead generation engine: fast-loading, mobile-first, with service-area landing pages for each target neighborhood, and prominent quote request forms above the fold on every page. We ran a local SEO program targeting 50+ high-intent keywords across landscaping, hardscaping, irrigation, and seasonal services. The Google Business Profile was fully optimized with a complete service menu, 50+ photos, and a weekly content cadence. A content marketing program produced project case studies and seasonal guides, supported by LocalBusiness schema and structured data markup.",
    results:
      "Qualified leads grew from 10 to 28 per month, a 2.8X increase. Organic traffic rose from 420 to 1,180 monthly visits. Lead conversion rate improved from 1.8% to 3.9%. Monthly revenue influenced by digital channels reached $9,800, up from $4,200. The business now ranks in the local pack for 28 of 50 target keywords and added a second service crew to handle new demand.",
    resultsList: [
      { label: "Qualified Leads", before: 10, after: 28, suffix: "/mo" },
      { label: "Organic Traffic", before: 420, after: 1180, suffix: " visits/mo" },
      { label: "Lead Conversion Rate", before: 1.8, after: 3.9, suffix: "%", decimals: 1 },
      { label: "Revenue Influenced", before: 4200, after: 9800, prefix: "$", suffix: "/mo" },
    ],
    challengeHeading: "The Challenge",
    solutionHeading: "The Solution",
    resultsHeading: "The Results",
    beforeHeading: "Before We Started",
    strategyHeading: "Growth Strategy",
    techStackHeading: "Tech Stack",
    actionsLabel: "Actions Taken",
    outcomeLabel: "Outcome",
    ctaHeadline: "Want results like these?",
    ctaSubtitle: "Seasonal swings don't have to run the books. We'll map what to fix first.",
    ctaLabel: "Book a Strategy Call",
    heroCtaLabel: "Book a Strategy Call",
    breadcrumbs: { home: "Home", caseStudies: "Case Studies" },
    problems: [
      { category: "Business", items: ["Seasonal revenue swings", "Referral-dependent growth", "Limited repeat business"] },
      { category: "Marketing", items: ["No SEO strategy", "No Google rankings", "Little brand visibility"] },
      { category: "Website", items: ["Poor mobile experience", "Slow loading times", "Weak calls-to-action"] },
      { category: "Competition", items: ["National franchise entering market", "Competitors owning local search", "High-value jobs going elsewhere"] },
    ],
    strategyPhases: [
      { objective: "Increase local visibility", actions: "Local SEO audit, Google Business optimization, service-area pages for each neighborhood", outcome: "Local pack rankings for 28 of 50 high-value service keywords" },
      { objective: "Increase conversions", actions: "New landing pages with quote forms, mobile-first CTAs, streamlined contact flow", outcome: "Lead conversion rate improved from 1.8% to 3.9%" },
      { objective: "Build authority", actions: "Project portfolio pages, seasonal content marketing, LocalBusiness schema markup", outcome: "Organic traffic grew from 420 to 1,180 monthly visits" },
      { objective: "Scale with content & reviews", actions: "Project portfolio content, seasonal guides, review generation campaign targeting 8+ new reviews per month", outcome: "8+ new reviews per month across GBP and directories" },
    ],
    techStack: ["Cloudflare", "Next.js", "Workers", "Google Analytics", "Google Search Console", "LocalBusiness Schema", "Cloudflare Images"],
    visitLiveSite: "Visit Live Site",
  },
  "plumbing-company-growth": {
    title: "Plumbing Company",
    datePublished: "2025-03-20",
    client: "Preferred Plumbing",
    industry: "Home Services",
    headline: "136% Increase in Emergency Calls",
    challenge:
      "Preferred Plumbing, a family-owned shop in Spirit Lake, Idaho with decades in the trade, was generating 70% of their new business through Google Ads. Monthly ad spend had climbed to $6,800 with diminishing returns. Their Google Business Profile was unclaimed with only 4 reviews. The website was a basic template with confusing navigation and no mobile optimization. Emergency service calls, their highest-margin work, were being lost to competitors who dominated local search results for 'emergency plumber' and 'plumber near me' queries.",
    solution:
      "We rebuilt the website around emergency service with prominent click-to-call buttons, service-area pages for each neighborhood, and trust signals including license details and real-time availability. The GBP was fully optimized with a complete service menu, 50+ photos, and a weekly posting schedule. A review generation system targeting 10 new reviews per month was deployed with automated post-service follow-up. A local SEO campaign targeted 60+ high-intent keywords across emergency, repair, installation, and seasonal plumbing services. Call tracking and form analytics were integrated to tie every lead to a specific source.",
    results:
      "Emergency service calls grew from 22 to 52 per month, a 136% increase. Booked jobs rose from 18 to 39 per month. Organic traffic increased from 200 to 540 monthly visits. GBP interactions went from 340 to 1,620 per month. Monthly ad spend was reduced from $6,800 to $4,100 as organic calls carried more of the lead volume. Monthly revenue influenced by digital channels reached $9,400, up from $4,200. The business achieved top-3 local pack rankings for 34 of 60 target keywords.",
    resultsList: [
      { label: "Emergency Calls", before: 22, after: 52, suffix: "/mo" },
      { label: "Booked Jobs", before: 18, after: 39, suffix: "/mo" },
      { label: "Organic Traffic", before: 200, after: 540, suffix: " visits/mo" },
      { label: "GBP Interactions", before: 340, after: 1620, suffix: "/mo" },
      { label: "Revenue Influenced", before: 4200, after: 9400, prefix: "$", suffix: "/mo" },
    ],
    challengeHeading: "The Challenge",
    solutionHeading: "The Solution",
    resultsHeading: "The Results",
    beforeHeading: "Before We Started",
    strategyHeading: "Growth Strategy",
    techStackHeading: "Tech Stack",
    actionsLabel: "Actions Taken",
    outcomeLabel: "Outcome",
    ctaHeadline: "Want results like these?",
    ctaSubtitle: "Emergency calls shouldn't depend on a shrinking ad budget.",
    ctaLabel: "Book a Strategy Call",
    heroCtaLabel: "Book a Strategy Call",
    breadcrumbs: { home: "Home", caseStudies: "Case Studies" },
    problems: [
      { category: "Business", items: ["Heavy dependence on paid ads", "Missed after-hours leads", "Low repeat customer rate"] },
      { category: "Marketing", items: ["Weak local keyword rankings", "Few online reviews", "Poor GBP optimization"] },
      { category: "Website", items: ["Confusing navigation structure", "Slow mobile load speed", "Weak trust signals"] },
      { category: "Operations", items: ["No after-hours call routing", "Rising ad spend, flat returns", "No source-level lead tracking"] },
    ],
    strategyPhases: [
      { objective: "Dominate local search", actions: "GBP optimization with complete service menu, local citation cleanup, 60+ keyword SEO campaign", outcome: "Top-3 local pack for 34 of 60 target keywords" },
      { objective: "Convert calls to jobs", actions: "Emergency service landing pages, click-to-call CTAs, integrated call tracking", outcome: "Booked jobs increased from 18 to 39 per month" },
      { objective: "Build trust & authority", actions: "Review generation campaign, GBP weekly posts, service-area content", outcome: "GBP interactions grew from 340 to 1,620 per month" },
      { objective: "Reduce ad dependency", actions: "Organic-first content strategy, call tracking attribution, ad spend optimization based on channel performance", outcome: "Monthly ad spend reduced from $6,800 to $4,100 without losing lead volume" },
    ],
    techStack: ["Cloudflare Workers", "Next.js", "Analytics", "Search Console", "Structured Data", "Call Tracking", "CRM Integration"],
    visitLiveSite: "Visit Live Site",
  },
  "ecommerce-store-growth": {
    title: "Digital Products Store",
    datePublished: "2025-05-01",
    client: "Manos Creativas",
    industry: "E-commerce",
    headline: "2.4X Monthly Orders",
    challenge:
      "Manos Creativas sold digital crochet patterns through a patchwork of marketplace links and a thin brochure site. Product pages described files, not the finished work buyers wanted to make. Checkout lived off-site, trust signals were thin, and organic search barely contributed. Orders averaged 32 per month, mostly from existing followers, with little room to grow without paid ads.",
    solution:
      "We rebuilt the store as a conversion-focused digital product site with clear collection pages, instant-download messaging, and trust proof above the fold. Technical SEO and Product schema so pattern collections and guides could rank for buyer-intent searches. CRO on product pages, free-pattern lead magnets, and WhatsApp support paths turned traffic into paid orders instead of bounce.",
    results:
      "Monthly orders grew from 32 to 78, a 2.4X increase. Organic traffic rose from 950 to 2,280 monthly visits, a 140% lift. Conversion rate improved from 1.9% to 3.4%. Revenue reached €17,200 per month, up from €8,500. Paid dependency dropped as organic and direct channels carried a larger share of orders by month 8.",
    resultsList: [
      { label: "Monthly Orders", before: 32, after: 78, suffix: "/mo" },
      { label: "Organic Traffic", before: 950, after: 2280, suffix: " visits/mo" },
      { label: "Conversion Rate", before: 1.9, after: 3.4, suffix: "%", decimals: 1 },
      { label: "Revenue", before: 8500, after: 17200, prefix: "€", suffix: "/mo" },
    ],
    challengeHeading: "The Challenge",
    solutionHeading: "The Solution",
    resultsHeading: "The Results",
    beforeHeading: "Before We Started",
    strategyHeading: "Growth Strategy",
    techStackHeading: "Tech Stack",
    actionsLabel: "Actions Taken",
    outcomeLabel: "Outcome",
    ctaHeadline: "Want results like these?",
    ctaSubtitle: "A store that describes files won't sell the finished work.",
    ctaLabel: "Book a Strategy Call",
    heroCtaLabel: "Book a Strategy Call",
    breadcrumbs: { home: "Home", caseStudies: "Case Studies" },
    problems: [
      { category: "Business", items: ["Orders stuck around existing audience", "Heavy reliance on paid traffic", "Weak repeat purchase loop"] },
      { category: "Marketing", items: ["Thin organic SEO", "Marketplace-first discovery", "Little content that ranks"] },
      { category: "Website", items: ["Off-site checkout friction", "Weak product storytelling", "Low conversion rate"] },
      { category: "Offer", items: ["Collections hard to browse", "Trust signals buried", "Lead magnet disconnected from sales"] },
    ],
    strategyPhases: [
      { objective: "Rebuild the storefront", actions: "Next.js rebuild, collection funnels, instant-download messaging, mobile-first CTAs", outcome: "Conversion rate improved from 1.9% to 3.4%" },
      { objective: "Fix technical foundation", actions: "Product schema, Core Web Vitals, site architecture around collections and guides", outcome: "Organic traffic grew from 950 to 2,280 visits per month" },
      { objective: "Convert traffic to orders", actions: "Product page CRO, free-pattern lead magnets, WhatsApp support paths", outcome: "Monthly orders increased from 32 to 78, 2.4X" },
      { objective: "Scale with content & data", actions: "Pattern guides targeting buyer-intent keywords, attribution rebuild, paid spend reallocation", outcome: "Revenue reached €17,200/mo; organic and direct carried a larger order share by month 8" },
    ],
    techStack: ["Next.js", "Cloudflare Workers", "TypeScript", "Analytics", "Search Console", "Product Schema", "Speed Optimization", "Image Optimization"],
    visitLiveSite: "Visit Live Site",
  },
};

const es: Record<(typeof caseStudySlugs)[number], CaseStudyDetail> = {
  "landscaping-company-growth": {
    ...en["landscaping-company-growth"],
    title: "Empresa de Jardinería",
    client: "A1 Property Services",
    industry: "Servicios del Hogar",
    headline: "Crecimiento de Leads 2.8X",
    challenge:
      "A1 Property Services, una empresa de jardinería consolidada en Cedar Falls, Iowa, dependía casi por completo de referidos boca a boca. Su sitio web tipo folleto de cuatro años no era compatible con móviles, cargaba lentamente y no tenía un camino para convertir visitantes en leads. No tenían estrategia SEO ni optimización de Perfil de Empresa en Google, y las fluctuaciones estacionales hacían impredecible el crecimiento. Una franquicia nacional había entrado en su mercado capturando agresivamente el tráfico de búsqueda local para servicios de alto valor.",
    solution:
      "Reconstruimos el sitio web como un motor de generación de leads: rápido, mobile-first, con páginas de servicio para cada vecindario objetivo y formularios de solicitud de presupuesto destacados. Ejecutamos un programa de SEO local orientado a más de 50 palabras clave de alta intención. Optimizamos el Perfil de Empresa en Google con menú de servicios completo, más de 50 fotos y una cadencia semanal de contenido. Un programa de marketing de contenido produjo casos de estudio y guías estacionales, respaldados por esquema LocalBusiness y datos estructurados.",
    results:
      "Los leads calificados crecieron de 10 a 28 por mes, un aumento de 2.8X. El tráfico orgánico aumentó de 420 a 1,180 visitas mensuales. La tasa de conversión de leads mejoró del 1.8% al 3.9%. Los ingresos mensuales influenciados por canales digitales alcanzaron $9,800, frente a $4,200. El negocio ahora aparece en el pack local para 28 de 50 palabras clave objetivo y contrató una segunda cuadrilla para manejar la nueva demanda.",
    resultsList: [
      { label: "Leads Calificados", before: 10, after: 28, suffix: "/mes" },
      { label: "Tráfico Orgánico", before: 420, after: 1180, suffix: " visitas/mes" },
      { label: "Tasa de Conversión", before: 1.8, after: 3.9, suffix: "%", decimals: 1 },
      { label: "Ingresos Influenciados", before: 4200, after: 9800, prefix: "$", suffix: "/mes" },
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
      { objective: "Aumentar visibilidad local", actions: "Auditoría SEO local, optimización de Google Business, páginas de área de servicio por vecindario", outcome: "Pack local para 28 de 50 palabras clave de alto valor" },
      { objective: "Aumentar conversiones", actions: "Nuevas landing pages con formularios de presupuesto, CTAs mobile-first, flujo de contacto simplificado", outcome: "Tasa de conversión de leads mejoró del 1.8% al 3.9%" },
      { objective: "Construir autoridad", actions: "Páginas de portafolio de proyectos, marketing de contenido estacional, esquema LocalBusiness", outcome: "Tráfico orgánico creció de 420 a 1,180 visitas mensuales" },
      { objective: "Escalar con contenido y reseñas", actions: "Contenido de portafolio, guías estacionales, campaña de generación de reseñas con 8+ nuevas reseñas por mes", outcome: "8+ nuevas reseñas por mes en GBP y directorios" },
    ],
    techStack: ["Cloudflare", "Next.js", "Workers", "Google Analytics", "Google Search Console", "Esquema LocalBusiness", "Cloudflare Images"],
    visitLiveSite: "Visitar Sitio en Vivo",
  },
  "plumbing-company-growth": {
    ...en["plumbing-company-growth"],
    title: "Empresa de Fontanería",
    client: "Preferred Plumbing",
    industry: "Servicios del Hogar",
    headline: "136% Más Llamadas de Emergencia",
    challenge:
      "Preferred Plumbing, un taller familiar en Spirit Lake, Idaho con décadas en el oficio, generaba el 70% de sus nuevos negocios a través de Google Ads. El gasto mensual en anuncios había subido a $6,800 con rendimientos decrecientes. Su Perfil de Empresa en Google no estaba reclamado y tenía solo 4 reseñas. El sitio web era una plantilla básica con navegación confusa y sin optimización móvil. Las llamadas de servicio de emergencia, su trabajo de mayor margen, se perdían frente a competidores que dominaban los resultados de búsqueda local.",
    solution:
      "Reconstruimos el sitio web alrededor del servicio de emergencia con botones de llamada destacados, páginas de área de servicio para cada vecindario y señales de confianza. Optimizamos el GBP con menú de servicios completo, más de 50 fotos y publicaciones semanales. Implementamos un sistema de generación de reseñas con seguimiento post-servicio automatizado. Una campaña de SEO local apuntó a más de 60 palabras clave de alta intención. Integramos seguimiento de llamadas y analítica de formularios para vincular cada lead a su fuente.",
    results:
      "Las llamadas de emergencia crecieron de 22 a 52 por mes, un aumento del 136%. Los trabajos reservados aumentaron de 18 a 39 por mes. El tráfico orgánico subió de 200 a 540 visitas mensuales. Las interacciones del GBP pasaron de 340 a 1,620 por mes. El gasto mensual en anuncios se redujo de $6,800 a $4,100. Los ingresos mensuales influenciados por canales digitales alcanzaron $9,400, frente a $4,200 anteriores. El negocio logró posiciones en el top-3 del pack local para 34 de 60 palabras clave objetivo.",
    resultsList: [
      { label: "Llamadas de Emergencia", before: 22, after: 52, suffix: "/mes" },
      { label: "Trabajos Reservados", before: 18, after: 39, suffix: "/mes" },
      { label: "Tráfico Orgánico", before: 200, after: 540, suffix: " visitas/mes" },
      { label: "Interacciones GBP", before: 340, after: 1620, suffix: "/mes" },
      { label: "Ingresos Influenciados", before: 4200, after: 9400, prefix: "$", suffix: "/mes" },
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
      { objective: "Dominar búsqueda local", actions: "Optimización GBP con menú de servicios completo, limpieza de citaciones locales, campaña SEO de 60+ keywords", outcome: "Top-3 en pack local para 34 de 60 keywords objetivo" },
      { objective: "Convertir llamadas en trabajos", actions: "Landing pages de servicio de emergencia, CTAs click-to-call, seguimiento de llamadas integrado", outcome: "Trabajos reservados aumentaron de 18 a 39 por mes" },
      { objective: "Construir confianza y autoridad", actions: "Campaña de generación de reseñas, publicaciones semanales en GBP, contenido por área de servicio", outcome: "Interacciones GBP crecieron de 340 a 1,620 por mes" },
      { objective: "Reducir dependencia de anuncios", actions: "Estrategia de contenido orgánico, atribución de llamadas, optimización de gasto en anuncios por rendimiento de canal", outcome: "Gasto mensual en anuncios reducido de $6,800 a $4,100 sin perder volumen de leads" },
    ],
    techStack: ["Cloudflare Workers", "Next.js", "Analytics", "Search Console", "Datos Estructurados", "Seguimiento de Llamadas", "Integración CRM"],
    visitLiveSite: "Visitar Sitio en Vivo",
  },
  "ecommerce-store-growth": {
    ...en["ecommerce-store-growth"],
    title: "Tienda de Productos Digitales",
    client: "Manos Creativas",
    industry: "E-commerce",
    headline: "Pedidos Mensuales 2.4X",
    challenge:
      "Manos Creativas vendía patrones digitales de crochet a través de un mosaico de enlaces a marketplaces y un sitio tipo folleto débil. Las páginas de producto describían archivos, no el trabajo terminado que las compradoras querían hacer. El checkout vivía fuera del sitio, las señales de confianza eran escasas y la búsqueda orgánica apenas aportaba. Los pedidos promediaban 32 al mes, sobre todo de seguidoras existentes, con poco margen de crecimiento sin anuncios pagados.",
    solution:
      "Reconstruimos la tienda como un sitio de productos digitales orientado a conversión, con colecciones claras, mensajería de descarga inmediata y prueba social arriba del fold. SEO técnico y schema de Producto para que colecciones y guías rankearan por búsquedas de intención de compra. CRO en páginas de producto, lead magnets de patrones gratis y soporte por WhatsApp para convertir tráfico en pedidos pagados.",
    results:
      "Los pedidos mensuales crecieron de 32 a 78, un aumento de 2.4X. El tráfico orgánico subió de 950 a 2,280 visitas mensuales. La tasa de conversión mejoró del 1.9% al 3.4%. Los ingresos alcanzaron €17,200 al mes, frente a €8,500. La dependencia de paid bajó al crecer la parte de pedidos orgánicos y directos al mes 8.",
    resultsList: [
      { label: "Pedidos Mensuales", before: 32, after: 78, suffix: "/mes" },
      { label: "Tráfico Orgánico", before: 950, after: 2280, suffix: " visitas/mes" },
      { label: "Tasa de Conversión", before: 1.9, after: 3.4, suffix: "%", decimals: 1 },
      { label: "Ingresos", before: 8500, after: 17200, prefix: "€", suffix: "/mes" },
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
      { category: "Negocio", items: ["Pedidos atados a la audiencia existente", "Alta dependencia de tráfico pago", "Bucle débil de recompra"] },
      { category: "Marketing", items: ["SEO orgánico fino", "Descubrimiento centrado en marketplaces", "Poco contenido que rankea"] },
      { category: "Sitio Web", items: ["Fricción de checkout externo", "Narrativa de producto débil", "Baja tasa de conversión"] },
      { category: "Oferta", items: ["Colecciones difíciles de navegar", "Señales de confianza enterradas", "Lead magnet desconectado de ventas"] },
    ],
    strategyPhases: [
      { objective: "Reconstruir la tienda", actions: "Rebuild en Next.js, embudos de colección, mensajería de descarga inmediata, CTAs mobile-first", outcome: "Tasa de conversión mejoró del 1.9% al 3.4%" },
      { objective: "Corregir base técnica", actions: "Schema de Producto, Core Web Vitals, arquitectura alrededor de colecciones y guías", outcome: "Tráfico orgánico creció de 950 a 2,280 visitas por mes" },
      { objective: "Convertir tráfico en pedidos", actions: "CRO de páginas de producto, lead magnets de patrones gratis, soporte WhatsApp", outcome: "Pedidos mensuales aumentaron de 32 a 78, 2.4X" },
      { objective: "Escalar con contenido y datos", actions: "Guías de patrones orientadas a keywords de compra, rebuild de atribución, reasignación de gasto pago", outcome: "Ingresos €17,200/mes; orgánico y directo llevaron más pedidos al mes 8" },
    ],
    techStack: ["Next.js", "Cloudflare Workers", "TypeScript", "Analytics", "Search Console", "Schema de Producto", "Optimización de Velocidad", "Optimización de Imágenes"],
    visitLiveSite: "Visitar Sitio en Vivo",
  },
};

const byLocale: Record<Locale, typeof en> = { en, es };

export function getCaseStudyDetail(locale: Locale, slug: string): CaseStudyDetail | null {
  if (!(caseStudySlugs as readonly string[]).includes(slug)) return null;
  const detail = byLocale[locale][slug as (typeof caseStudySlugs)[number]];
  if (!detail) return null;

  const listing = getCaseStudyBySlug(locale, slug);
  if (!listing) return detail;

  return {
    ...detail,
    title: listing.title,
    client: listing.client,
    industry: listing.industry,
    headline: listing.headline,
    liveUrl: listing.liveUrl,
    screenshot: listing.screenshot,
    screenshotCard: listing.screenshotCard,
    results: listing.narrative?.outcome ?? detail.results,
    resultsList: metricsToResultsList(listing.metrics),
  };
}

export function getCaseStudyStaticParams() {
  return caseStudySlugs.flatMap((slug) => [
    { locale: "en" as const, slug },
    { locale: "es" as const, slug },
  ]);
}

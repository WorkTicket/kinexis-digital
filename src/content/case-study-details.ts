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
  ctaHeadline: string;
  ctaSubtitle: string;
  ctaLabel: string;
  heroCtaLabel: string;
  breadcrumbs: { caseStudies: string; home: string };
};

const en: Record<(typeof caseStudySlugs)[number], Omit<CaseStudyDetail, never>> = {
  "landscaping-company-growth": {
    title: "Landscaping Company",
    datePublished: "2024-06-15",
    client: "Local Landscaping Business",
    industry: "Home Services",
    headline: "5.9X Revenue Growth",
    challenge:
      "A well-established landscaping company relied almost entirely on word-of-mouth referrals. Their outdated website was not generating leads, they had no Google Business Profile strategy, and competitors were capturing the growing demand for landscape design services. Monthly revenue had plateaued at around $2,000.",
    solution:
      "We rebuilt the website from scratch with fast load times, clear service pages, and prominent contact forms. We launched a local SEO campaign targeting landscaping keywords in their city, optimized their Google Business Profile with service categories and 50+ photos, and built citations across 45+ directories. A monthly content strategy covered seasonal landscaping topics to capture search demand throughout the year.",
    results:
      "Revenue grew from $2,000 to $11,730 per month. Lead conversion rate jumped from 1.2% to 7.9%. Organic traffic increased from 320 to 4,380 monthly visits. The business hired three additional crews to keep up with new demand.",
    resultsList: [
      { label: "Monthly Revenue", before: 2000, after: 11730, prefix: "$", suffix: "/mo" },
      { label: "Lead Conversion Rate", before: 1.2, after: 7.9, suffix: "%", decimals: 1 },
      { label: "Monthly Organic Traffic", before: 320, after: 4380, suffix: " visits" },
      { label: "GBP Impressions/Month", before: 1200, after: 26400, suffix: "" },
    ],
    challengeHeading: "The Challenge",
    solutionHeading: "The Solution",
    resultsHeading: "The Results",
    ctaHeadline: "Want Results Like These?",
    ctaSubtitle: "Let's talk about what real growth looks like for your business.",
    ctaLabel: "Start Your Growth Story",
    heroCtaLabel: "Book a Strategy Call",
    breadcrumbs: { home: "Home", caseStudies: "Case Studies" },
  },
  "dental-practice-local-seo": {
    title: "Dental Practice",
    datePublished: "2024-03-20",
    client: "Multi-Location Dental Group",
    industry: "Healthcare",
    headline: "311% More Patients",
    challenge:
      "A dental group with three locations was struggling to attract new patients despite having excellent reviews. Their location pages were thin, GBP listings were inconsistent, and they were losing new patient bookings to competitors who dominated the local 3-pack.",
    solution:
      "We created a location-specific strategy for each of the three offices. Each location received an optimized GBP listing, a dedicated landing page with original content, and a local citation cleanup across all directories. We implemented a post-appointment review text campaign that tripled review volume in 90 days and added Google Ads for high-intent treatment searches.",
    results:
      "New patient bookings grew from 47 to 193 per month. All three locations now rank in the local 3-pack. Review volume increased from 9 to 33 per month. Phone call leads rose from 24 to 82 per month. Cost per acquisition dropped by more than half.",
    resultsList: [
      { label: "New Patient Bookings", before: 47, after: 193, suffix: "/mo" },
      { label: "Local 3-Pack Rankings", before: 1, after: 3, suffix: " locations" },
      { label: "Review Volume", before: 9, after: 33, suffix: "/mo" },
      { label: "Phone Call Leads", before: 24, after: 82, suffix: "/mo" },
    ],
    challengeHeading: "The Challenge",
    solutionHeading: "The Solution",
    resultsHeading: "The Results",
    ctaHeadline: "Want Results Like These?",
    ctaSubtitle: "Let's talk about what real growth looks like for your business.",
    ctaLabel: "Start Your Growth Story",
    heroCtaLabel: "Book a Strategy Call",
    breadcrumbs: { home: "Home", caseStudies: "Case Studies" },
  },
  "premium-ecommerce-brand": {
    title: "Premium E-Commerce Brand",
    datePublished: "2024-09-10",
    client: "Direct-to-Consumer Home Goods Brand",
    industry: "Retail",
    headline: "3.6X Monthly Revenue",
    challenge:
      "A premium home goods brand had strong product quality but a generic website and a brand identity that failed to communicate its premium positioning. Conversion rate was 1.2%, AOV was $85, and cart abandonment was 78%.",
    solution:
      "Complete visual and strategic repositioning. We redesigned the identity system and rebuilt the website with high-resolution product imagery, lifestyle photography, detailed product storytelling, and a simpler checkout flow that reduced steps from 5 to 2. The new brand identity made the premium positioning obvious from the first click.",
    results:
      "Average order value climbed from $85 to $223. Conversion rate rose from 1.8% to 5.9%. Cart abandonment dropped from 78% to 54%. Monthly revenue grew from $12,000 to $43,600.",
    resultsList: [
      { label: "Average Order Value", before: 85, after: 223, prefix: "$" },
      { label: "Conversion Rate", before: 1.8, after: 5.9, suffix: "%", decimals: 1 },
      { label: "Cart Abandonment", before: 78, after: 54, suffix: "%" },
      { label: "Monthly Revenue", before: 12000, after: 43600, prefix: "$", suffix: "/mo" },
    ],
    challengeHeading: "The Challenge",
    solutionHeading: "The Solution",
    resultsHeading: "The Results",
    ctaHeadline: "Want Results Like These?",
    ctaSubtitle: "Let's talk about what real growth looks like for your business.",
    ctaLabel: "Start Your Growth Story",
    heroCtaLabel: "Book a Strategy Call",
    breadcrumbs: { home: "Home", caseStudies: "Case Studies" },
  },
  "saas-analytics-platform": {
    title: "SaaS Analytics Platform",
    datePublished: "2024-11-01",
    client: "B2B Analytics Startup",
    industry: "Tech / SaaS",
    headline: "3.8X MRR Growth",
    challenge:
      "A seed-stage B2B analytics platform had a solid product but virtually no organic presence. Their website was a basic landing page with no lead generation infrastructure. Monthly recurring revenue had stagnated at $15K with growth relying entirely on founder-led sales.",
    solution:
      "We ran three channels at once. Content marketing targeted decision-stage keywords. Paid search captured high-intent comparison terms. We rebuilt the funnel with a self-serve trial flow and automated email nurture sequences. The website was rebuilt around product-led growth with dedicated use-case pages and a resource center publishing weekly.",
    results:
      "MRR grew from $15,000 to $57,200 per month. Trial signups increased from 80 to 396 per month. Organic traffic jumped from 1,200 to 16,800 monthly visits. Trial-to-paid rate improved from 8% to 21%.",
    resultsList: [
      { label: "MRR", before: 15000, after: 57200, prefix: "$", suffix: "/mo" },
      { label: "Trial Signups", before: 80, after: 396, suffix: "/mo" },
      { label: "Organic Traffic", before: 1200, after: 16800, suffix: " visits/mo" },
      { label: "Trial-to-Paid Rate", before: 8, after: 21, suffix: "%" },
    ],
    challengeHeading: "The Challenge",
    solutionHeading: "The Solution",
    resultsHeading: "The Results",
    ctaHeadline: "Want Results Like These?",
    ctaSubtitle: "Let's talk about what real growth looks like for your business.",
    ctaLabel: "Start Your Growth Story",
    heroCtaLabel: "Book a Strategy Call",
    breadcrumbs: { home: "Home", caseStudies: "Case Studies" },
  },
  "fintech-app-startup": {
    title: "Fintech Startup",
    datePublished: "2025-02-15",
    client: "Personal Finance App",
    industry: "Tech / Fintech",
    headline: "195% Trial Conversion Lift",
    challenge:
      "A personal finance app with strong user engagement metrics was struggling to convert free users to premium subscriptions. The trial-to-paid conversion rate sat at 4%, well below the industry benchmark of 15-20%. Users liked the product but did not see enough value to upgrade.",
    solution:
      "We restructured the trial flow to give premium access to key features immediately. Behavioral email triggers were set up based on feature usage. An in-app upgrade wall was optimized for moments of peak value. The landing page was redesigned to clearly communicate premium ROI.",
    results:
      "Trial-to-paid rate increased from 4% to 11.8%. Premium subscribers grew from 220 to 913 per month. Cost per trial dropped from $18.50 to $7.60. Trial start rate improved from 2.1% to 4.5%.",
    resultsList: [
      { label: "Trial-to-Paid Rate", before: 4, after: 11.8, suffix: "%", decimals: 1 },
      { label: "Premium Subscribers", before: 220, after: 913, suffix: "/mo" },
      { label: "Cost per Trial", before: 18.5, after: 7.6, prefix: "$", decimals: 2 },
      { label: "Trial Start Rate", before: 2.1, after: 4.5, suffix: "%", decimals: 1 },
    ],
    challengeHeading: "The Challenge",
    solutionHeading: "The Solution",
    resultsHeading: "The Results",
    ctaHeadline: "Want Results Like These?",
    ctaSubtitle: "Let's talk about what real growth looks like for your business.",
    ctaLabel: "Start Your Growth Story",
    heroCtaLabel: "Book a Strategy Call",
    breadcrumbs: { home: "Home", caseStudies: "Case Studies" },
  },
  "b2b-consulting-firm": {
    title: "B2B Consulting Firm",
    datePublished: "2025-05-01",
    client: "Management Consulting Practice",
    industry: "Professional Services",
    headline: "$2.28M Pipeline Built",
    challenge:
      "A boutique management consulting firm had world-class expertise but virtually no digital presence. They relied entirely on partner networks for new business, creating revenue concentration risk. Inbound inquiries averaged 2-3 per month with no predictable pipeline.",
    solution:
      "We focused on building authority online. A thought leadership content strategy centered on the firm's own methodology. LinkedIn presence for the founding partners with a ghostwritten posting framework. A redesigned website with in-depth case studies, methodology pages, and a gated research report. A monthly newsletter and automated follow-up sequence nurtured leads through a 60-day sales cycle.",
    results:
      "Pipeline value grew from $350,000 to $2.28 million. Monthly inbound inquiries increased from 3 to 26. Deal close rate improved from 20% to 32%. LinkedIn audience grew from 1,200 to 17,800 followers.",
    resultsList: [
      { label: "Pipeline Value", before: 350000, after: 2280000, prefix: "$", suffix: "" },
      { label: "Monthly Inbound Inquiries", before: 3, after: 26, suffix: "/mo" },
      { label: "Deal Close Rate", before: 20, after: 32, suffix: "%" },
      { label: "LinkedIn Audience", before: 1200, after: 17800, suffix: " followers" },
    ],
    challengeHeading: "The Challenge",
    solutionHeading: "The Solution",
    resultsHeading: "The Results",
    ctaHeadline: "Want Results Like These?",
    ctaSubtitle: "Let's talk about what real growth looks like for your business.",
    ctaLabel: "Start Your Growth Story",
    heroCtaLabel: "Book a Strategy Call",
    breadcrumbs: { home: "Home", caseStudies: "Case Studies" },
  },
};

const es: Record<(typeof caseStudySlugs)[number], CaseStudyDetail> = {
  "landscaping-company-growth": {
    ...en["landscaping-company-growth"],
    title: "Empresa de Jardinería",
    client: "Negocio Local de Jardinería",
    industry: "Servicios del Hogar",
    headline: "Crecimiento de Ingresos 5.9X",
    challenge:
      "Una empresa de jardinería consolidada dependía casi por completo de referidos boca a boca. Su sitio web desactualizado no generaba leads, no tenían estrategia de Perfil de Empresa en Google y los competidores capturaban la demanda creciente de diseño de paisajes. Los ingresos mensuales se habían estancado en alrededor de $2,000.",
    solution:
      "Reconstruimos el sitio web desde cero con tiempos de carga rápidos, páginas de servicio claras y formularios de contacto visibles. Lanzamos una campaña de SEO local orientada a palabras clave de jardinería en su ciudad, optimizamos su Perfil de Empresa en Google con categorías de servicio y más de 50 fotos, y construimos citas en más de 45 directorios. Una estrategia de contenido mensual cubrió temas estacionales para capturar demanda de búsqueda durante todo el año.",
    results:
      "Los ingresos crecieron de $2,000 a $11,730 por mes. La tasa de conversión de leads saltó del 1.2% al 7.9%. El tráfico orgánico aumentó de 320 a 4,380 visitas mensuales. El negocio contrató tres equipos adicionales para atender la nueva demanda.",
    resultsList: [
      { label: "Ingresos Mensuales", before: 2000, after: 11730, prefix: "$", suffix: "/mes" },
      { label: "Tasa de Conversión", before: 1.2, after: 7.9, suffix: "%", decimals: 1 },
      { label: "Tráfico Orgánico Mensual", before: 320, after: 4380, suffix: " visitas" },
      { label: "Impresiones GBP/Mes", before: 1200, after: 26400, suffix: "" },
    ],
    challengeHeading: "El Desafío",
    solutionHeading: "La Solución",
    resultsHeading: "Los Resultados",
    ctaHeadline: "¿Quieres resultados como estos?",
    ctaSubtitle: "Hablemos de cómo se ve el crecimiento real para tu negocio.",
    ctaLabel: "Comienza Tu Historia de Crecimiento",
    heroCtaLabel: "Reserva una Llamada Estratégica",
    breadcrumbs: { home: "Inicio", caseStudies: "Casos de Estudio" },
  },
  "dental-practice-local-seo": {
    ...en["dental-practice-local-seo"],
    title: "Clínica Dental",
    client: "Grupo Dental Multi-Sede",
    industry: "Salud",
    headline: "311% Más Pacientes",
    challenge:
      "Un grupo dental con tres ubicaciones tenía dificultades para atraer nuevos pacientes a pesar de excelentes reseñas. Sus páginas de ubicación eran escasas, los listados de GBP eran inconsistentes y perdían reservas ante competidores que dominaban el paquete local de 3.",
    solution:
      "Creamos una estrategia específica por ubicación para cada una de las tres oficinas. Cada sede recibió un listado GBP optimizado, una landing page dedicada con contenido original y limpieza de citas locales en todos los directorios. Implementamos una campaña de reseñas post-cita que triplicó el volumen de reseñas en 90 días y añadimos Google Ads para búsquedas de tratamientos de alta intención.",
    results:
      "Las reservas de nuevos pacientes crecieron de 47 a 193 por mes. Las tres ubicaciones ahora aparecen en el paquete local de 3. El volumen de reseñas aumentó de 9 a 33 por mes. Los leads telefónicos subieron de 24 a 82 por mes. El costo por adquisición se redujo a la mitad.",
    resultsList: [
      { label: "Reservas de Nuevos Pacientes", before: 47, after: 193, suffix: "/mes" },
      { label: "Rankings Paquete Local 3", before: 1, after: 3, suffix: " ubicaciones" },
      { label: "Volumen de Reseñas", before: 9, after: 33, suffix: "/mes" },
      { label: "Leads Telefónicos", before: 24, after: 82, suffix: "/mes" },
    ],
    challengeHeading: "El Desafío",
    solutionHeading: "La Solución",
    resultsHeading: "Los Resultados",
    ctaHeadline: "¿Quieres resultados como estos?",
    ctaSubtitle: "Hablemos de cómo se ve el crecimiento real para tu negocio.",
    ctaLabel: "Comienza Tu Historia de Crecimiento",
    heroCtaLabel: "Reserva una Llamada Estratégica",
    breadcrumbs: { home: "Inicio", caseStudies: "Casos de Estudio" },
  },
  "premium-ecommerce-brand": {
    ...en["premium-ecommerce-brand"],
    title: "Marca Premium de E-Commerce",
    client: "Marca D2C de Artículos para el Hogar",
    industry: "Retail",
    headline: "Ingresos Mensuales 3.6X",
    challenge:
      "Una marca premium de artículos para el hogar tenía productos de alta calidad pero un sitio genérico y una identidad de marca que no comunicaba su posicionamiento premium. La tasa de conversión era del 1.2%, el AOV era $85 y el abandono de carrito era del 78%.",
    solution:
      "Reposicionamiento visual y estratégico completo. Rediseñamos el sistema de identidad y reconstruimos el sitio con imágenes de producto de alta resolución, fotografía lifestyle, storytelling detallado y un checkout más simple que redujo los pasos de 5 a 2. La nueva identidad hizo obvio el posicionamiento premium desde el primer clic.",
    results:
      "El valor promedio de pedido subió de $85 a $223. La tasa de conversión aumentó del 1.8% al 5.9%. El abandono de carrito bajó del 78% al 54%. Los ingresos mensuales crecieron de $12,000 a $43,600.",
    resultsList: [
      { label: "Valor Promedio de Pedido", before: 85, after: 223, prefix: "$" },
      { label: "Tasa de Conversión", before: 1.8, after: 5.9, suffix: "%", decimals: 1 },
      { label: "Abandono de Carrito", before: 78, after: 54, suffix: "%" },
      { label: "Ingresos Mensuales", before: 12000, after: 43600, prefix: "$", suffix: "/mes" },
    ],
    challengeHeading: "El Desafío",
    solutionHeading: "La Solución",
    resultsHeading: "Los Resultados",
    ctaHeadline: "¿Quieres resultados como estos?",
    ctaSubtitle: "Hablemos de cómo se ve el crecimiento real para tu negocio.",
    ctaLabel: "Comienza Tu Historia de Crecimiento",
    heroCtaLabel: "Reserva una Llamada Estratégica",
    breadcrumbs: { home: "Inicio", caseStudies: "Casos de Estudio" },
  },
  "saas-analytics-platform": {
    ...en["saas-analytics-platform"],
    title: "Plataforma de Analítica SaaS",
    client: "Startup de Analítica B2B",
    industry: "Tecnología / SaaS",
    headline: "Crecimiento de MRR 3.8X",
    challenge:
      "Una plataforma de analítica B2B en etapa semilla tenía un producto sólido pero casi ninguna presencia orgánica. Su sitio era una landing básica sin infraestructura de generación de leads. El MRR se había estancado en $15K con crecimiento dependiente únicamente de ventas lideradas por los fundadores.",
    solution:
      "Ejecutamos tres canales en paralelo. Marketing de contenido orientado a palabras clave de etapa de decisión. Búsqueda pagada para términos de comparación de alta intención. Reconstruimos el embudo con flujo de prueba self-serve y secuencias de email automatizadas. El sitio se reconstruyó alrededor de product-led growth con páginas de casos de uso y un centro de recursos con publicación semanal.",
    results:
      "El MRR creció de $15,000 a $57,200 por mes. Los registros de prueba aumentaron de 80 a 396 por mes. El tráfico orgánico saltó de 1,200 a 16,800 visitas mensuales. La tasa de prueba a pago mejoró del 8% al 21%.",
    resultsList: [
      { label: "MRR", before: 15000, after: 57200, prefix: "$", suffix: "/mes" },
      { label: "Registros de Prueba", before: 80, after: 396, suffix: "/mes" },
      { label: "Tráfico Orgánico", before: 1200, after: 16800, suffix: " visitas/mes" },
      { label: "Tasa Prueba a Pago", before: 8, after: 21, suffix: "%" },
    ],
    challengeHeading: "El Desafío",
    solutionHeading: "La Solución",
    resultsHeading: "Los Resultados",
    ctaHeadline: "¿Quieres resultados como estos?",
    ctaSubtitle: "Hablemos de cómo se ve el crecimiento real para tu negocio.",
    ctaLabel: "Comienza Tu Historia de Crecimiento",
    heroCtaLabel: "Reserva una Llamada Estratégica",
    breadcrumbs: { home: "Inicio", caseStudies: "Casos de Estudio" },
  },
  "fintech-app-startup": {
    ...en["fintech-app-startup"],
    title: "Startup Fintech",
    client: "App de Finanzas Personales",
    industry: "Tecnología / Fintech",
    headline: "195% Más Conversiones de Prueba",
    challenge:
      "Una app de finanzas personales con fuerte engagement tenía dificultades para convertir usuarios gratuitos a suscripciones premium. La tasa de conversión de prueba a pago estaba en 4%, muy por debajo del benchmark de la industria de 15-20%. A los usuarios les gustaba el producto pero no veían suficiente valor para actualizar.",
    solution:
      "Reestructuramos el flujo de prueba para dar acceso premium a funciones clave de inmediato. Configuramos triggers de email basados en uso de funciones. Optimizamos el muro de upgrade in-app para momentos de máximo valor. Rediseñamos la landing page para comunicar claramente el ROI premium.",
    results:
      "La tasa de prueba a pago aumentó del 4% al 11.8%. Los suscriptores premium crecieron de 220 a 913 por mes. El costo por prueba bajó de $18.50 a $7.60. La tasa de inicio de prueba mejoró del 2.1% al 4.5%.",
    resultsList: [
      { label: "Tasa Prueba a Pago", before: 4, after: 11.8, suffix: "%", decimals: 1 },
      { label: "Suscriptores Premium", before: 220, after: 913, suffix: "/mes" },
      { label: "Costo por Prueba", before: 18.5, after: 7.6, prefix: "$", decimals: 2 },
      { label: "Tasa de Inicio de Prueba", before: 2.1, after: 4.5, suffix: "%", decimals: 1 },
    ],
    challengeHeading: "El Desafío",
    solutionHeading: "La Solución",
    resultsHeading: "Los Resultados",
    ctaHeadline: "¿Quieres resultados como estos?",
    ctaSubtitle: "Hablemos de cómo se ve el crecimiento real para tu negocio.",
    ctaLabel: "Comienza Tu Historia de Crecimiento",
    heroCtaLabel: "Reserva una Llamada Estratégica",
    breadcrumbs: { home: "Inicio", caseStudies: "Casos de Estudio" },
  },
  "b2b-consulting-firm": {
    ...en["b2b-consulting-firm"],
    title: "Firma de Consultoría B2B",
    client: "Práctica de Consultoría de Gestión",
    industry: "Servicios Profesionales",
    headline: "Pipeline de $2.28M Construido",
    challenge:
      "Una firma boutique de consultoría de gestión tenía experiencia de primer nivel pero casi ninguna presencia digital. Dependían enteramente de redes de socios para nuevos negocios, creando riesgo de concentración de ingresos. Las consultas entrantes promediaban 2-3 por mes sin pipeline predecible.",
    solution:
      "Nos enfocamos en construir autoridad online. Una estrategia de contenido de liderazgo de pensamiento centrada en la metodología propia de la firma. Presencia en LinkedIn para los socios fundadores con un marco de publicaciones. Sitio web rediseñado con casos de estudio profundos, páginas de metodología y un informe de investigación con acceso restringido. Newsletter mensual y secuencia automatizada nutrieron leads a través de un ciclo de ventas de 60 días.",
    results:
      "El valor del pipeline creció de $350,000 a $2.28 millones. Las consultas entrantes mensuales aumentaron de 3 a 26. La tasa de cierre mejoró del 20% al 32%. La audiencia en LinkedIn creció de 1,200 a 17,800 seguidores.",
    resultsList: [
      { label: "Valor del Pipeline", before: 350000, after: 2280000, prefix: "$", suffix: "" },
      { label: "Consultas Entrantes Mensuales", before: 3, after: 26, suffix: "/mes" },
      { label: "Tasa de Cierre", before: 20, after: 32, suffix: "%" },
      { label: "Audiencia en LinkedIn", before: 1200, after: 17800, suffix: " seguidores" },
    ],
    challengeHeading: "El Desafío",
    solutionHeading: "La Solución",
    resultsHeading: "Los Resultados",
    ctaHeadline: "¿Quieres resultados como estos?",
    ctaSubtitle: "Hablemos de cómo se ve el crecimiento real para tu negocio.",
    ctaLabel: "Comienza Tu Historia de Crecimiento",
    heroCtaLabel: "Reserva una Llamada Estratégica",
    breadcrumbs: { home: "Inicio", caseStudies: "Casos de Estudio" },
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

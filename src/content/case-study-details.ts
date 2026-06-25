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
    client: "Local Landscaping Business",
    industry: "Home Services",
    headline: "5X Revenue Growth",
    challenge:
      "A well-established landscaping company relied almost entirely on word-of-mouth referrals. Their outdated website was not generating leads, they had no Google Business Profile strategy, and competitors were capturing the growing demand for landscape design services. Monthly revenue had plateaued at around $2,000.",
    solution:
      "We rebuilt the website from scratch with fast load times, clear service pages, and prominent contact forms. We launched a local SEO campaign targeting landscaping keywords in their city, optimized their Google Business Profile with service categories and 50+ photos, and built citations across 45+ directories. A monthly content strategy covered seasonal landscaping topics to capture search demand throughout the year.",
    results:
      "Revenue grew from $2,000 to $11,500 per month. Lead conversion rate jumped from 1.2% to 8.4%. Organic traffic increased from 320 to 4,700 monthly visits. The business hired three additional crews to keep up with new demand.",
    resultsList: [
      { label: "Monthly Revenue", before: 2000, after: 11500, prefix: "$", suffix: "/mo" },
      { label: "Lead Conversion Rate", before: 1.2, after: 8.4, suffix: "%", decimals: 1 },
      { label: "Monthly Organic Traffic", before: 320, after: 4700, suffix: " visits" },
      { label: "GBP Impressions/Month", before: 1200, after: 28000, suffix: "" },
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
    client: "Multi-Location Dental Group",
    industry: "Healthcare",
    headline: "340% More Patients",
    challenge:
      "A dental group with three locations was struggling to attract new patients despite having excellent reviews. Their location pages were thin, GBP listings were inconsistent, and they were losing new patient bookings to competitors who dominated the local 3-pack.",
    solution:
      "We created a location-specific strategy for each of the three offices. Each location received an optimized GBP listing, a dedicated landing page with original content, and a local citation cleanup across all directories. We implemented a post-appointment review text campaign that tripled review volume in 90 days and added Google Ads for high-intent treatment searches.",
    results:
      "New patient bookings grew from 45 to 198 per month. All three locations now rank in the local 3-pack. Review volume increased from 8 to 34 per month. Phone call leads rose from 22 to 89 per month. Cost per acquisition dropped by more than half.",
    resultsList: [
      { label: "New Patient Bookings", before: 45, after: 198, suffix: "/mo" },
      { label: "Local 3-Pack Rankings", before: 1, after: 3, suffix: " locations" },
      { label: "Review Volume", before: 8, after: 34, suffix: "/mo" },
      { label: "Phone Call Leads", before: 22, after: 89, suffix: "/mo" },
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
    client: "Direct-to-Consumer Home Goods Brand",
    industry: "Retail",
    headline: "4X Monthly Revenue",
    challenge:
      "A premium home goods brand had strong product quality but a generic website and a brand identity that failed to communicate its premium positioning. Conversion rate was 1.2%, AOV was $85, and cart abandonment was 78%.",
    solution:
      "Complete visual and strategic repositioning. We redesigned the identity system and rebuilt the website with high-resolution product imagery, lifestyle photography, detailed product storytelling, and a simpler checkout flow that reduced steps from 5 to 2. The new brand identity made the premium positioning obvious from the first click.",
    results:
      "Average order value climbed from $85 to $238. Conversion rate rose from 1.8% to 6.3%. Cart abandonment dropped from 78% to 52%. Monthly revenue grew from $12,000 to $45,000.",
    resultsList: [
      { label: "Average Order Value", before: 85, after: 238, prefix: "$" },
      { label: "Conversion Rate", before: 1.8, after: 6.3, suffix: "%", decimals: 1 },
      { label: "Cart Abandonment", before: 78, after: 52, suffix: "%" },
      { label: "Monthly Revenue", before: 12000, after: 45000, prefix: "$", suffix: "/mo" },
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
    client: "B2B Analytics Startup",
    industry: "Tech / SaaS",
    headline: "4X MRR Growth",
    challenge:
      "A seed-stage B2B analytics platform had a solid product but virtually no organic presence. Their website was a basic landing page with no lead generation infrastructure. Monthly recurring revenue had stagnated at $15K with growth relying entirely on founder-led sales.",
    solution:
      "We ran three channels at once. Content marketing targeted decision-stage keywords. Paid search captured high-intent comparison terms. We rebuilt the funnel with a self-serve trial flow and automated email nurture sequences. The website was rebuilt around product-led growth with dedicated use-case pages and a resource center publishing weekly.",
    results:
      "MRR grew from $15,000 to $60,000 per month. Trial signups increased from 80 to 420 per month. Organic traffic jumped from 1,200 to 18,500 monthly visits. Trial-to-paid rate improved from 8% to 22%.",
    resultsList: [
      { label: "MRR", before: 15000, after: 60000, prefix: "$", suffix: "/mo" },
      { label: "Trial Signups", before: 80, after: 420, suffix: "/mo" },
      { label: "Organic Traffic", before: 1200, after: 18500, suffix: " visits/mo" },
      { label: "Trial-to-Paid Rate", before: 8, after: 22, suffix: "%" },
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
    client: "Personal Finance App",
    industry: "Tech / Fintech",
    headline: "210% Trial Conversion Lift",
    challenge:
      "A personal finance app with strong user engagement metrics was struggling to convert free users to premium subscriptions. The trial-to-paid conversion rate sat at 4%, well below the industry benchmark of 15-20%. Users liked the product but did not see enough value to upgrade.",
    solution:
      "We restructured the trial flow to give premium access to key features immediately. Behavioral email triggers were set up based on feature usage. An in-app upgrade wall was optimized for moments of peak value. The landing page was redesigned to clearly communicate premium ROI.",
    results:
      "Trial-to-paid rate increased from 4% to 12.4%. Premium subscribers grew from 220 to 980 per month. Cost per trial dropped from $18.50 to $7.10. Trial start rate improved from 2.1% to 4.8%.",
    resultsList: [
      { label: "Trial-to-Paid Rate", before: 4, after: 12.4, suffix: "%", decimals: 1 },
      { label: "Premium Subscribers", before: 220, after: 980, suffix: "/mo" },
      { label: "Cost per Trial", before: 18.5, after: 7.1, prefix: "$", decimals: 2 },
      { label: "Trial Start Rate", before: 2.1, after: 4.8, suffix: "%", decimals: 1 },
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
    client: "Management Consulting Practice",
    industry: "Professional Services",
    headline: "$2.4M Pipeline Built",
    challenge:
      "A boutique management consulting firm had world-class expertise but virtually no digital presence. They relied entirely on partner networks for new business, creating revenue concentration risk. Inbound inquiries averaged 2-3 per month with no predictable pipeline.",
    solution:
      "We focused on building authority online. A thought leadership content strategy centered on the firm's own methodology. LinkedIn presence for the founding partners with a ghostwritten posting framework. A redesigned website with in-depth case studies, methodology pages, and a gated research report. A monthly newsletter and automated follow-up sequence nurtured leads through a 60-day sales cycle.",
    results:
      "Pipeline value grew from $350,000 to $2.4 million. Monthly inbound inquiries increased from 3 to 28. Deal close rate improved from 20% to 34%. LinkedIn audience grew from 1,200 to 18,500 followers.",
    resultsList: [
      { label: "Pipeline Value", before: 350000, after: 2400000, prefix: "$", suffix: "" },
      { label: "Monthly Inbound Inquiries", before: 3, after: 28, suffix: "/mo" },
      { label: "Deal Close Rate", before: 20, after: 34, suffix: "%" },
      { label: "LinkedIn Audience", before: 1200, after: 18500, suffix: " followers" },
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
    headline: "Crecimiento de Ingresos 5X",
    challenge:
      "Una empresa de jardinería consolidada dependía casi por completo de referidos boca a boca. Su sitio web desactualizado no generaba leads, no tenían estrategia de Perfil de Empresa en Google y los competidores capturaban la demanda creciente de diseño de paisajes. Los ingresos mensuales se habían estancado en alrededor de $2,000.",
    solution:
      "Reconstruimos el sitio web desde cero con tiempos de carga rápidos, páginas de servicio claras y formularios de contacto visibles. Lanzamos una campaña de SEO local orientada a palabras clave de jardinería en su ciudad, optimizamos su Perfil de Empresa en Google con categorías de servicio y más de 50 fotos, y construimos citas en más de 45 directorios. Una estrategia de contenido mensual cubrió temas estacionales para capturar demanda de búsqueda durante todo el año.",
    results:
      "Los ingresos crecieron de $2,000 a $11,500 por mes. La tasa de conversión de leads saltó del 1.2% al 8.4%. El tráfico orgánico aumentó de 320 a 4,700 visitas mensuales. El negocio contrató tres equipos adicionales para atender la nueva demanda.",
    resultsList: [
      { label: "Ingresos Mensuales", before: 2000, after: 11500, prefix: "$", suffix: "/mes" },
      { label: "Tasa de Conversión", before: 1.2, after: 8.4, suffix: "%", decimals: 1 },
      { label: "Tráfico Orgánico Mensual", before: 320, after: 4700, suffix: " visitas" },
      { label: "Impresiones GBP/Mes", before: 1200, after: 28000, suffix: "" },
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
    headline: "340% Más Pacientes",
    challenge:
      "Un grupo dental con tres ubicaciones tenía dificultades para atraer nuevos pacientes a pesar de excelentes reseñas. Sus páginas de ubicación eran escasas, los listados de GBP eran inconsistentes y perdían reservas ante competidores que dominaban el paquete local de 3.",
    solution:
      "Creamos una estrategia específica por ubicación para cada una de las tres oficinas. Cada sede recibió un listado GBP optimizado, una landing page dedicada con contenido original y limpieza de citas locales en todos los directorios. Implementamos una campaña de reseñas post-cita que triplicó el volumen de reseñas en 90 días y añadimos Google Ads para búsquedas de tratamientos de alta intención.",
    results:
      "Las reservas de nuevos pacientes crecieron de 45 a 198 por mes. Las tres ubicaciones ahora aparecen en el paquete local de 3. El volumen de reseñas aumentó de 8 a 34 por mes. Los leads telefónicos subieron de 22 a 89 por mes. El costo por adquisición se redujo a la mitad.",
    resultsList: [
      { label: "Reservas de Nuevos Pacientes", before: 45, after: 198, suffix: "/mes" },
      { label: "Rankings Paquete Local 3", before: 1, after: 3, suffix: " ubicaciones" },
      { label: "Volumen de Reseñas", before: 8, after: 34, suffix: "/mes" },
      { label: "Leads Telefónicos", before: 22, after: 89, suffix: "/mes" },
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
    headline: "Ingresos Mensuales 4X",
    challenge:
      "Una marca premium de artículos para el hogar tenía productos de alta calidad pero un sitio genérico y una identidad de marca que no comunicaba su posicionamiento premium. La tasa de conversión era del 1.2%, el AOV era $85 y el abandono de carrito era del 78%.",
    solution:
      "Reposicionamiento visual y estratégico completo. Rediseñamos el sistema de identidad y reconstruimos el sitio con imágenes de producto de alta resolución, fotografía lifestyle, storytelling detallado y un checkout más simple que redujo los pasos de 5 a 2. La nueva identidad hizo obvio el posicionamiento premium desde el primer clic.",
    results:
      "El valor promedio de pedido subió de $85 a $238. La tasa de conversión aumentó del 1.8% al 6.3%. El abandono de carrito bajó del 78% al 52%. Los ingresos mensuales crecieron de $12,000 a $45,000.",
    resultsList: [
      { label: "Valor Promedio de Pedido", before: 85, after: 238, prefix: "$" },
      { label: "Tasa de Conversión", before: 1.8, after: 6.3, suffix: "%", decimals: 1 },
      { label: "Abandono de Carrito", before: 78, after: 52, suffix: "%" },
      { label: "Ingresos Mensuales", before: 12000, after: 45000, prefix: "$", suffix: "/mes" },
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
    headline: "Crecimiento de MRR 4X",
    challenge:
      "Una plataforma de analítica B2B en etapa semilla tenía un producto sólido pero casi ninguna presencia orgánica. Su sitio era una landing básica sin infraestructura de generación de leads. El MRR se había estancado en $15K con crecimiento dependiente únicamente de ventas lideradas por los fundadores.",
    solution:
      "Ejecutamos tres canales en paralelo. Marketing de contenido orientado a palabras clave de etapa de decisión. Búsqueda pagada para términos de comparación de alta intención. Reconstruimos el embudo con flujo de prueba self-serve y secuencias de email automatizadas. El sitio se reconstruyó alrededor de product-led growth con páginas de casos de uso y un centro de recursos con publicación semanal.",
    results:
      "El MRR creció de $15,000 a $60,000 por mes. Los registros de prueba aumentaron de 80 a 420 por mes. El tráfico orgánico saltó de 1,200 a 18,500 visitas mensuales. La tasa de prueba a pago mejoró del 8% al 22%.",
    resultsList: [
      { label: "MRR", before: 15000, after: 60000, prefix: "$", suffix: "/mes" },
      { label: "Registros de Prueba", before: 80, after: 420, suffix: "/mes" },
      { label: "Tráfico Orgánico", before: 1200, after: 18500, suffix: " visitas/mes" },
      { label: "Tasa Prueba a Pago", before: 8, after: 22, suffix: "%" },
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
    headline: "210% Más Conversiones de Prueba",
    challenge:
      "Una app de finanzas personales con fuerte engagement tenía dificultades para convertir usuarios gratuitos a suscripciones premium. La tasa de conversión de prueba a pago estaba en 4%, muy por debajo del benchmark de la industria de 15-20%. A los usuarios les gustaba el producto pero no veían suficiente valor para actualizar.",
    solution:
      "Reestructuramos el flujo de prueba para dar acceso premium a funciones clave de inmediato. Configuramos triggers de email basados en uso de funciones. Optimizamos el muro de upgrade in-app para momentos de máximo valor. Rediseñamos la landing page para comunicar claramente el ROI premium.",
    results:
      "La tasa de prueba a pago aumentó del 4% al 12.4%. Los suscriptores premium crecieron de 220 a 980 por mes. El costo por prueba bajó de $18.50 a $7.10. La tasa de inicio de prueba mejoró del 2.1% al 4.8%.",
    resultsList: [
      { label: "Tasa Prueba a Pago", before: 4, after: 12.4, suffix: "%", decimals: 1 },
      { label: "Suscriptores Premium", before: 220, after: 980, suffix: "/mes" },
      { label: "Costo por Prueba", before: 18.5, after: 7.1, prefix: "$", decimals: 2 },
      { label: "Tasa de Inicio de Prueba", before: 2.1, after: 4.8, suffix: "%", decimals: 1 },
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
    headline: "Pipeline de $2.4M Construido",
    challenge:
      "Una firma boutique de consultoría de gestión tenía experiencia de primer nivel pero casi ninguna presencia digital. Dependían enteramente de redes de socios para nuevos negocios, creando riesgo de concentración de ingresos. Las consultas entrantes promediaban 2-3 por mes sin pipeline predecible.",
    solution:
      "Nos enfocamos en construir autoridad online. Una estrategia de contenido de liderazgo de pensamiento centrada en la metodología propia de la firma. Presencia en LinkedIn para los socios fundadores con un marco de publicaciones. Sitio web rediseñado con casos de estudio profundos, páginas de metodología y un informe de investigación con acceso restringido. Newsletter mensual y secuencia automatizada nutrieron leads a través de un ciclo de ventas de 60 días.",
    results:
      "El valor del pipeline creció de $350,000 a $2.4 millones. Las consultas entrantes mensuales aumentaron de 3 a 28. La tasa de cierre mejoró del 20% al 34%. La audiencia en LinkedIn creció de 1,200 a 18,500 seguidores.",
    resultsList: [
      { label: "Valor del Pipeline", before: 350000, after: 2400000, prefix: "$", suffix: "" },
      { label: "Consultas Entrantes Mensuales", before: 3, after: 28, suffix: "/mes" },
      { label: "Tasa de Cierre", before: 20, after: 34, suffix: "%" },
      { label: "Audiencia en LinkedIn", before: 1200, after: 18500, suffix: " seguidores" },
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

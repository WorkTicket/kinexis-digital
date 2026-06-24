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
      "Every case study is a verified before-and-after story.|Strategy, execution, and real numbers. No vanity metrics. Just revenue.",
    featuredCaseStudyLabel: "Featured Case Study",
    beforeVsAfterLabel: "Before vs After",
    timelineLabel: "Timeline",
    readFullCaseStudy: "Read Full Case Study",
    clientResultsLabel: "Client Results",
    clientResultsTitle: "Proven results.",
    clientResultsDescription:
      "Filter by industry to find results relevant to your business. Every study includes strategy, execution, and verified outcomes.",
    noCaseStudiesMessage: "No case studies in this industry yet. Check back soon.",
    trafficLabel: "Traffic",
    leadsLabel: "Leads",
    revenueLabel: "Revenue",
    viewCaseStudy: "View Case Study",
    whatDataShowsLabel: "What the Data Shows",
    whatDataShowsTitle: "Combined services beat single tactics.",
    whatDataShowsDescription:
      "The best results come when two or more services work together. Single-tactic approaches hit a ceiling. Connected systems keep building on each other.",
    ctaTitle: "Ready to become our next case study?",
    ctaSubtitle: "Every client gets the same system, strategy,|and commitment to measurable results.",
    ctaButton: "Start Your Growth Story",
    industries: ["All", "Home Services", "Healthcare", "Retail", "SaaS", "B2B"],
    caseStudies: [
      {
        slug: "landscaping-company-growth",
        title: "Landscaping Company",
        industry: "Home Services",
        headline: "5X Revenue Growth",
        trafficLift: "+340%",
        leadLift: "+475%",
        revenueLift: "+$9,500/mo",
        timeline: "8 months",
        summary:
          "From $2,000/mo to $11,500/mo through a strategic website rebuild and local SEO campaign.",
        services: ["Local SEO", "Web Design", "Google Business"],
        featured: true,
        metrics: [
          { label: "Monthly Revenue", from: 2000, to: 11500, prefix: "$", suffix: "/mo" },
          { label: "Lead Conversion", from: 1.2, to: 8.4, suffix: "%", decimals: 1 },
          { label: "Organic Traffic", from: 320, to: 4700, suffix: "/mo" },
        ],
        narrative: {
          challenge:
            "A family-run landscaping business in Iowa was generating $2,000/month entirely from word-of-mouth referrals. Their website hadn't been updated in four years, was not mobile-optimized, and ranked for zero commercial keywords. A national franchise moved into their market and began capturing the organic search demand the local business had no visibility for.",
          strategy:
            "The priority was local search dominance before the franchise established authority. We identified 47 high-intent local keywords across lawn care, landscaping design, and seasonal services. The plan: rebuild the site around those keywords, fully optimize the Google Business Profile, and build local citations to establish NAP consistency across the web.",
          implementation:
            "Week 1–3: Full technical audit and new site architecture. Week 4–6: New site built in Next.js with service-area landing pages for each target neighborhood. Google Business Profile optimized with 35 new photos, full service descriptions, and weekly posts. Citation cleanup across 42 directories. Months 3–8: Content production (2 posts/month), review generation campaign targeting 5 new reviews/month, and a local link-building outreach targeting home improvement publications.",
          outcome:
            "By month 8, the business ranked in the local pack for 38 of 47 target keywords. Monthly organic sessions grew from 320 to 4,700. Lead conversion rate improved from 1.2% to 8.4% after the site rebuild. Monthly revenue reached $11,500 — a 475% increase from the $2,000 baseline. The national franchise captured the paid search space; KINEXIS captured the organic one.",
        },
      },
      {
        slug: "dental-practice-local-seo",
        title: "Dental Practice",
        industry: "Healthcare",
        headline: "340% More Patients",
        trafficLift: "+280%",
        leadLift: "+340%",
        revenueLift: "+$8,200/mo",
        timeline: "6 months",
        summary:
          "Multi-location practice increased new patient bookings by 340% through local SEO and Google Ads.",
        services: ["Local SEO", "Paid Ads", "Reputation"],
        featured: false,
        metrics: [
          { label: "New Patients", from: 45, to: 198, suffix: "/mo" },
          { label: "Phone Leads", from: 22, to: 89, suffix: "/mo" },
          { label: "Review Volume", from: 8, to: 34, suffix: "/mo" },
        ],
        narrative: {
          challenge:
            "A 3-location dental group was spending $4,500/month on Google Ads with no conversion tracking in place. They could not determine which campaigns were generating booked appointments versus phone calls that went nowhere. New patient volume had plateaued at 45/month despite growing ad spend. Their Google Business Profiles for two of the three locations were unclaimed and had fewer than 10 reviews combined.",
          strategy:
            "Before touching ad spend, we needed to know what was actually converting. The 30-day pre-engagement audit revealed that 68% of their budget was going to broad match terms that generated calls from existing patients rescheduling, not new patient inquiries. The strategy: conversion tracking first, then restructure campaigns around high-intent new-patient keywords, and run local SEO in parallel to capture organic demand.",
          implementation:
            "Month 1: Google Tag Manager setup with call tracking, form tracking, and distinct conversion events for new-patient versus existing-patient actions. Ad account restructure: eliminated broad match, built tightly-themed ad groups around services (Invisalign, implants, emergency dental). Claimed and fully optimized all 3 GBPs. Month 2–3: Review generation campaign — automated follow-up sequence to patients post-appointment requesting reviews. Month 4–6: Added local SEO content targeting each location's service area, and expanded the Google Ads structure to include PMax campaigns for remarketing.",
          outcome:
            "New patient volume grew from 45 to 198/month over 6 months. Phone leads attributable to new patient intent reached 89/month. The review generation campaign added 26 new Google reviews across the 3 locations. Average cost per new-patient acquisition dropped from an estimated $100 (untracked) to a confirmed $22.60 per booked appointment. Monthly revenue increased by approximately $8,200 net of management fees.",
        },
      },
      {
        slug: "premium-ecommerce-brand",
        title: "Premium E-Commerce Brand",
        industry: "Retail",
        headline: "4X Monthly Revenue",
        trafficLift: "+180%",
        leadLift: "+65%",
        revenueLift: "+$45,000/mo",
        timeline: "9 months",
        summary:
          "Complete brand repositioning yielding 180% higher AOV and 65% higher conversion rate.",
        services: ["Branding", "Web Design", "CRO"],
        featured: false,
        metrics: [
          { label: "Avg. Order Value", from: 85, to: 238, prefix: "$" },
          { label: "Conversion Rate", from: 1.8, to: 6.3, suffix: "%", decimals: 1 },
          { label: "Revenue", from: 12000, to: 45000, prefix: "$", suffix: "/mo" },
        ],
        narrative: {
          challenge:
            "A direct-to-consumer home goods brand was generating $12,000/month on Shopify but had hit a ceiling. Their average order value was $85 — commodity pricing for products that deserved premium positioning. The brand identity was inconsistent across product pages, social, and packaging. The site converted at 1.8%, below the 3-4% industry benchmark for a store at their traffic volume.",
          strategy:
            "The core problem was brand perception, not traffic volume. The products were genuinely high quality but priced and presented like mid-market alternatives. The strategy: reposition the brand at the premium tier through visual identity work, new site architecture built around storytelling over catalog browsing, and a pricing structure that reflected the product's actual quality.",
          implementation:
            "Month 1–3: Brand audit and identity work — new typography system, photography direction, and visual language guide. Product photography restyled with lifestyle imagery instead of white-background catalog shots. Month 4–6: New Shopify site built around the updated identity. Product page redesign with expanded copy, ingredients/materials provenance story, and social proof integration. AOV optimization: product bundling structure, complementary add-ons, and a gift-with-purchase threshold. Month 7–9: CRO testing sprint — 6 A/B tests across hero image, product page headline, and checkout flow. Email sequence rebuilt for post-purchase LTV.",
          outcome:
            "Average order value grew from $85 to $238 as customers engaged with bundles and the positioning justified premium pricing. Conversion rate improved from 1.8% to 6.3% — a 250% improvement on the same traffic. Monthly revenue reached $45,000 without a significant increase in ad spend. The brand repositioning also improved paid social ROAS from 1.4× to 3.2× as creative finally matched the new identity.",
        },
      },
      {
        slug: "saas-analytics-platform",
        title: "SaaS Analytics Platform",
        industry: "SaaS",
        headline: "4X MRR Growth",
        trafficLift: "+420%",
        leadLift: "+300%",
        revenueLift: "+$24,000/mo",
        timeline: "6 months",
        summary:
          "B2B analytics startup grew MRR 4x through content marketing, paid ads, and CRO.",
        services: ["Content Marketing", "Paid Ads", "Funnel Optimization"],
        featured: false,
        metrics: [
          { label: "MRR", from: 15000, to: 60000, prefix: "$", suffix: "/mo" },
          { label: "Trial Signups", from: 80, to: 420, suffix: "/mo" },
          { label: "Trial-to-Paid", from: 8, to: 22, suffix: "%" },
        ],
        narrative: {
          challenge:
            "A B2B analytics SaaS at $15K MRR was generating 80 trial signups/month through word-of-mouth and a small Google Ads budget. Trial-to-paid conversion was 8% — well below the 15-20% SaaS benchmark. The product solved a real problem for e-commerce operators but the website described features, not outcomes. The content strategy was nonexistent.",
          strategy:
            "Two parallel tracks. Track 1: Fix trial conversion by rebuilding the onboarding email sequence and the in-trial activation flow — the product was good but new users weren't reaching the 'aha moment' before the trial expired. Track 2: Build a content engine targeting bottom-of-funnel keywords where the ICP was searching for solutions, not awareness content.",
          implementation:
            "Month 1–2: Onboarding email sequence rebuilt with behavior-triggered emails based on in-product actions. Trial activation checklist added to the dashboard. Google Ads restructured around high-intent competitor comparison and feature-specific keywords. Month 3–4: Content sprint — 8 long-form articles targeting 'best [tool] for [use case]' keywords with 2,000+ word treatment. Each article ended with a structured comparison table showing the product's advantages on the specific use case. Month 5–6: Landing page CRO testing — 3 A/B tests on the homepage headline, pricing page, and trial CTA copy.",
          outcome:
            "Trial signups grew from 80 to 420/month as organic and paid traffic scaled. Trial-to-paid conversion improved from 8% to 22% following the onboarding rebuild. MRR reached $60,000 — 4× the starting point — within 6 months. The content engine contributed 58% of new trial signups by month 6, reducing paid acquisition dependency.",
        },
      },
      {
        slug: "fintech-app-startup",
        title: "Fintech Startup",
        industry: "SaaS",
        headline: "210% Trial Conversions",
        trafficLift: "+210%",
        leadLift: "+180%",
        revenueLift: "+$15,000/mo",
        timeline: "7 months",
        summary:
          "Personal finance app increased premium trial conversions by 210% through full funnel rebuild.",
        services: ["Paid Ads", "CRO", "Email Marketing"],
        featured: false,
        metrics: [
          { label: "Trial Conversions", from: 120, to: 372, suffix: "/mo" },
          { label: "CAC", from: 48, to: 22, prefix: "$" },
          { label: "MRR", from: 8000, to: 23000, prefix: "$", suffix: "/mo" },
        ],
        narrative: {
          challenge:
            "A personal finance app was acquiring users at $48 CAC through Meta Ads and generating 120 premium trial starts/month. MRR was $8,000 and growing slowly. The core problem: the funnel had a 90-day free tier that was delaying revenue recognition and creating a large cohort of users who never converted. The paid acquisition was driving sign-ups, not revenue.",
          strategy:
            "Reduce the free tier from 90 days to 14 days and shift the conversion pressure earlier in the user lifecycle. Support the shorter trial with a nurture email sequence that demonstrated value in the first 72 hours. Restructure the Meta Ads creative to target users who had already expressed intent to pay for financial tools, not general financial wellness audiences.",
          implementation:
            "Month 1–2: Trial length reduced to 14 days with a 7-day email nurture sequence built around specific financial wins users could achieve using the product. Feature gate restructured so the most compelling features required the paid plan. Month 3–4: Meta Ads creative audit — killed 6 underperforming ad sets, rebuilt 4 new creative concepts targeting financial anxiety triggers. Retargeting campaign for trial users who reached day 10 without upgrading. Month 5–7: CRO testing on the paywall screen — 3 test variants focusing on pricing frame, social proof, and urgency cues.",
          outcome:
            "Premium trial conversions grew from 120 to 372/month. CAC dropped from $48 to $22 as audience quality improved and creative performance increased. MRR reached $23,000 by month 7. The shorter trial cycle and improved nurture sequence increased the 14-day paid conversion rate from an estimated 4% to 11%.",
        },
      },
      {
        slug: "b2b-consulting-firm",
        title: "B2B Consulting Firm",
        industry: "B2B",
        headline: "$2.4M Pipeline",
        trafficLift: "+310%",
        leadLift: "+260%",
        revenueLift: "+$2.4M pipeline",
        timeline: "9 months",
        summary:
          "Management consulting firm built a $2.4M pipeline through authority branding and LinkedIn content.",
        services: ["Branding", "Content Marketing", "LinkedIn Ads"],
        featured: false,
        metrics: [
          { label: "Pipeline Value", from: 400000, to: 2400000, prefix: "$" },
          { label: "Qualified Leads", from: 4, to: 12, suffix: "/mo" },
          { label: "Close Rate", from: 18, to: 34, suffix: "%" },
        ],
        narrative: {
          challenge:
            "A 12-person management consulting firm serving mid-market operations clients had $400K in active pipeline generated almost entirely through partner referrals. The founding partners were recognised experts in their field but had no digital presence. The website had not been updated in 3 years and ranked for zero commercial terms. Referral velocity was slowing as the partner network matured.",
          strategy:
            "B2B consulting buyers research extensively before reaching out. The strategy: build an authority content engine on LinkedIn — the platform where their target buyers (VP Operations, COO, CFO) spent professional time — and support it with a website that converted that earned attention into pipeline. LinkedIn Ads would amplify the best-performing organic content to defined company size and title targeting.",
          implementation:
            "Month 1–2: Website rebuild with a case-study-forward architecture. Each case study structured as a specific problem solved with quantified outcomes. LinkedIn profiles for the two founding partners rebuilt from scratch — headline, about section, and featured content all optimised for buyer search intent. Month 3–5: Content engine launched — 3 posts/week per founder covering operations insight, decision frameworks, and case study breakdowns. No sales content in the first 8 weeks. Month 6–9: LinkedIn Ads launched targeting VP/C-suite at 200-2000 employee companies in the firm's sector verticals. Campaign focused on long-form content clicks, not lead gen forms. CRM integration to track which content influenced deals.",
          outcome:
            "Pipeline grew from $400K to $2.4M over 9 months. Qualified inbound leads increased from 4 to 12/month. Close rate improved from 18% to 34% — a direct result of prospects arriving pre-educated on the firm's approach. The LinkedIn content engine generated 310% more profile views and 40+ direct inquiries in the first 6 months. Two of the largest deals closed in month 9 cited LinkedIn content as the primary reason they reached out.",
        },
      },
    ],
    growthPatterns: [
      { combo: "SEO + CRO", lift: "+320%", desc: "Traffic × conversion = revenue" },
      { combo: "SEO + Web Design", lift: "+415%", desc: "Rankings + experience = leads" },
      { combo: "Ads + CRO", lift: "+280%", desc: "Paid traffic + optimized pages = ROAS" },
      { combo: "Email + CRM", lift: "+195%", desc: "Retention × lifetime value" },
    ],
    metricWall: [
      { label: "Revenue Generated", value: "$12M+" },
      { label: "Avg. Traffic Lift", value: "+310%" },
      { label: "Total Leads Generated", value: "24K+" },
      { label: "Avg. Conversion Lift", value: "+210%" },
    ],
  },
  es: {
    heroTitleLine1: "Crecimiento real.",
    heroTitleGradient: "Números reales.",
    heroSubtitle:
      "Cada caso de estudio es una historia verificada de antes y después.|Estrategia, ejecución y números reales. Sin métricas vanidosas. Solo ingresos.",
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
    industries: ["Todos", "Servicios del Hogar", "Salud", "Retail", "SaaS", "B2B"],
    caseStudies: [
      {
        slug: "landscaping-company-growth",
        title: "Empresa de Jardinería",
        industry: "Servicios del Hogar",
        headline: "Crecimiento de Ingresos 5X",
        trafficLift: "+340%",
        leadLift: "+475%",
        revenueLift: "+$9,500/mes",
        timeline: "8 meses",
        summary:
          "De $2,000/mes a $11,500/mes mediante una reconstrucción estratégica del sitio web y campaña de SEO local.",
        services: ["SEO Local", "Diseño Web", "Google Business"],
        featured: true,
        metrics: [
          { label: "Ingresos Mensuales", from: 2000, to: 11500, prefix: "$", suffix: "/mes" },
          { label: "Conversión de Leads", from: 1.2, to: 8.4, suffix: "%", decimals: 1 },
          { label: "Tráfico Orgánico", from: 320, to: 4700, suffix: "/mes" },
        ],
      },
      {
        slug: "dental-practice-local-seo",
        title: "Clínica Dental",
        industry: "Salud",
        headline: "340% Más Pacientes",
        trafficLift: "+280%",
        leadLift: "+340%",
        revenueLift: "+$8,200/mes",
        timeline: "6 meses",
        summary:
          "Práctica multi-sede aumentó las reservas de nuevos pacientes un 340% mediante SEO local y Google Ads.",
        services: ["SEO Local", "Anuncios Pagados", "Reputación"],
        featured: false,
        metrics: [
          { label: "Nuevos Pacientes", from: 45, to: 198, suffix: "/mes" },
          { label: "Leads Telefónicos", from: 22, to: 89, suffix: "/mes" },
          { label: "Volumen de Reseñas", from: 8, to: 34, suffix: "/mes" },
        ],
      },
      {
        slug: "premium-ecommerce-brand",
        title: "Marca Premium de E-Commerce",
        industry: "Retail",
        headline: "Ingresos Mensuales 4X",
        trafficLift: "+180%",
        leadLift: "+65%",
        revenueLift: "+$45,000/mes",
        timeline: "9 meses",
        summary:
          "Reposicionamiento completo de marca con 180% más de valor promedio de pedido y 65% más de tasa de conversión.",
        services: ["Branding", "Diseño Web", "CRO"],
        featured: false,
        metrics: [
          { label: "Valor Promedio de Pedido", from: 85, to: 238, prefix: "$" },
          { label: "Tasa de Conversión", from: 1.8, to: 6.3, suffix: "%", decimals: 1 },
          { label: "Ingresos", from: 12000, to: 45000, prefix: "$", suffix: "/mes" },
        ],
      },
      {
        slug: "saas-analytics-platform",
        title: "Plataforma de Analítica SaaS",
        industry: "SaaS",
        headline: "Crecimiento de MRR 4X",
        trafficLift: "+420%",
        leadLift: "+300%",
        revenueLift: "+$24,000/mes",
        timeline: "6 meses",
        summary:
          "Startup de analítica B2B creció su MRR 4x mediante marketing de contenido, anuncios pagados y CRO.",
        services: ["Marketing de Contenido", "Anuncios Pagados", "Optimización de Embudo"],
        featured: false,
        metrics: [
          { label: "MRR", from: 15000, to: 60000, prefix: "$", suffix: "/mes" },
          { label: "Registros de Prueba", from: 80, to: 420, suffix: "/mes" },
          { label: "Prueba a Pago", from: 8, to: 22, suffix: "%" },
        ],
      },
      {
        slug: "fintech-app-startup",
        title: "Startup Fintech",
        industry: "SaaS",
        headline: "210% Conversiones de Prueba",
        trafficLift: "+210%",
        leadLift: "+180%",
        revenueLift: "+$15,000/mes",
        timeline: "7 meses",
        summary:
          "App de finanzas personales aumentó las conversiones de prueba premium un 210% mediante reconstrucción completa del embudo.",
        services: ["Anuncios Pagados", "CRO", "Email Marketing"],
        featured: false,
        metrics: [
          { label: "Conversiones de Prueba", from: 120, to: 372, suffix: "/mes" },
          { label: "CAC", from: 48, to: 22, prefix: "$" },
          { label: "MRR", from: 8000, to: 23000, prefix: "$", suffix: "/mes" },
        ],
      },
      {
        slug: "b2b-consulting-firm",
        title: "Firma de Consultoría B2B",
        industry: "B2B",
        headline: "Pipeline de $2.4M",
        trafficLift: "+310%",
        leadLift: "+260%",
        revenueLift: "+$2.4M pipeline",
        timeline: "9 meses",
        summary:
          "Firma de consultoría de gestión construyó un pipeline de $2.4M mediante branding de autoridad y contenido en LinkedIn.",
        services: ["Branding", "Marketing de Contenido", "Anuncios en LinkedIn"],
        featured: false,
        metrics: [
          { label: "Valor del Pipeline", from: 400000, to: 2400000, prefix: "$" },
          { label: "Leads Calificados", from: 4, to: 12, suffix: "/mes" },
          { label: "Tasa de Cierre", from: 18, to: 34, suffix: "%" },
        ],
      },
    ],
    growthPatterns: [
      { combo: "SEO + CRO", lift: "+320%", desc: "Tráfico × conversión = ingresos" },
      { combo: "SEO + Diseño Web", lift: "+415%", desc: "Rankings + experiencia = leads" },
      { combo: "Anuncios + CRO", lift: "+280%", desc: "Tráfico pagado + páginas optimizadas = ROAS" },
      { combo: "Email + CRM", lift: "+195%", desc: "Retención × valor de vida" },
    ],
    metricWall: [
      { label: "Ingresos Generados", value: "$12M+" },
      { label: "Aumento Promedio de Tráfico", value: "+310%" },
      { label: "Total de Leads Generados", value: "24K+" },
      { label: "Aumento Promedio de Conversión", value: "+210%" },
    ],
  },};

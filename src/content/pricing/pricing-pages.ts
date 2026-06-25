import type { Locale } from "@/i18n/routing";
import type { FAQItem } from "@/components/sections/FAQSection";
import type { ComparisonColumn, ComparisonLayout, ComparisonRow } from "@/content/service-seo/types";

export type FlagshipPricingSlug = "seo" | "google-ads" | "web-design" | "meta-ads";

export type PricingIncludedItem = {
  title: string;
  description: string;
};

export type PricingPageContent = {
  metaTitle: string;
  metaDescription: string;
  hero: { label: string; line1: string; line2: string; subtitle: string };
  answerBlock: string;
  tiers: { name: string; range: string; description: string; bestFor: string }[];
  tiersSection?: { title: string; subtitle: string; note?: string };
  included: string[];
  includedSection?: { title: string; subtitle: string; items: PricingIncludedItem[] };
  comparison: {
    title: string;
    subtitle: string;
    layout?: ComparisonLayout;
    columns: ComparisonColumn[];
    rows: ComparisonRow[];
  };
  faqs: FAQItem[];
  ctaHeadline: string;
  ctaSubtitle: string;
  ctaLabel: string;
};

export const pricingContent: Record<FlagshipPricingSlug, Record<Locale, PricingPageContent>> = {
  seo: {
    en: {
      metaTitle: "SEO Pricing | Plans from $2,500/mo | KINEXIS Digital",
      metaDescription:
        "Transparent SEO pricing for businesses that need leads. Starter, growth, and scale plans with clear deliverables. Most clients see ranking movement in 60 to 90 days.",
      hero: {
        label: "SEO Pricing",
        line1: "SEO pricing that",
        line2: "matches your market.",
        subtitle: "No hidden fees. No vague retainers. You see what is included at each tier before you sign anything.",
      },
      answerBlock:
        "KINEXIS SEO plans start at $2,500 per month for single-location businesses and scale to $8,000+ for competitive markets or multi-location brands. Every plan includes technical SEO, keyword strategy, on-page work, content, and link building. Ad spend is not part of SEO pricing. Most clients need four to six months before lead volume clearly improves.",
      tiers: [
        { name: "Starter", range: "$2,500/mo", description: "One location or niche market with moderate competition.", bestFor: "Local service businesses getting started with SEO" },
        { name: "Growth", range: "$5,000/mo", description: "Multi-service sites, content production, and active link building.", bestFor: "Growing brands ready to invest in content and authority" },
        { name: "Scale", range: "$8,000+/mo", description: "Competitive markets, multiple locations, or aggressive growth targets.", bestFor: "Multi-location or high-competition industries" },
      ],
      included: [
        "Monthly technical SEO monitoring and fixes",
        "Keyword research and content calendar",
        "On-page optimization on priority revenue pages",
        "Content production (volume scales by tier)",
        "Link building and digital PR outreach",
        "Lead and ranking reporting tied to business outcomes",
      ],
      comparison: {
        title: "What's included at each SEO tier",
        subtitle: "All plans include core SEO work. Higher tiers add content volume, link velocity, and strategy depth.",
        layout: "progression",
        columns: [{ header: "Starter" }, { header: "Growth", highlight: true }, { header: "Scale" }],
        rows: [
          { label: "Technical SEO audit and fixes", values: ["Yes", "Yes", "Yes"] },
          { label: "Keyword research and mapping", values: ["Yes", "Yes", "Yes"] },
          { label: "Content pieces per month", values: ["2", "4", "8+"] },
          { label: "Link building outreach", values: ["Basic", "Active", "Aggressive"] },
          { label: "Multi-location support", values: ["1 location", "Up to 3", "Unlimited"] },
          { label: "Strategy call frequency", values: ["Monthly", "Bi-weekly", "Weekly"] },
          {
            label: "Best for",
            values: [
              "Local service businesses getting started with SEO",
              "Growing brands ready to invest in content and authority",
              "Multi-location or high-competition industries",
            ],
          },
          { label: "Starting investment", values: ["$2,500/mo", "$5,000/mo", "$8,000+/mo"] },
        ],
      },
      faqs: [
        { question: "Is there a setup fee for SEO?", answer: "Most engagements include a one-time audit and strategy phase in month one. We quote this clearly before you start. There are no surprise onboarding charges." },
        { question: "Do you require a 12-month contract?", answer: "No. We work month to month because results should earn your business, not a contract clause." },
        { question: "What affects my SEO price?", answer: "Competition level, number of locations, current site condition, and how much content and link building your market requires. We scope this in a strategy call, not a generic quote form." },
        { question: "Can I start with a smaller plan and upgrade?", answer: "Yes. Many clients start on Starter and move to Growth once rankings and content momentum build. We plan the upgrade path upfront so you are not rebuilding from scratch." },
        { question: "How long before we see results?", answer: "Meaningful ranking movement typically starts within 60 to 90 days. Lead volume changes usually show in months 4 to 6 as traffic compounds. We track leading indicators from day one so you can see progress before conversions peak." },
        { question: "What do I need to have ready before we start?", answer: "Access to your Google Search Console, Google Analytics, and Google Business Profile if you have them. We handle everything else including the technical audit, keyword mapping, and content strategy. If you do not have these set up yet, we configure them in week one." },
        { question: "Do you work with businesses in regulated industries?", answer: "Yes. We have run SEO for healthcare, legal, and financial services businesses. We understand compliance constraints around medical and legal claims and build content strategies that rank without creating liability." },
        { question: "How do you report results?", answer: "Weekly rank tracking reports covering your target keywords and local pack positions. Monthly dashboards covering organic traffic, leads by source, conversion rate, and ranking trends. You see the same numbers we see, tied to outcomes that matter to your business." },
      ],
      ctaHeadline: "Want a quote for your market?",
      ctaSubtitle: "Tell us your location, services, and goals.|We will recommend the right tier and show you what the first 90 days look like.",
      ctaLabel: "Get a Custom SEO Quote",
    },
    es: {
      metaTitle: "Precios SEO | Planes desde $2,500/mes | KINEXIS Digital",
      metaDescription: "Precios SEO transparentes para negocios que necesitan leads. Planes claros con entregables definidos.",
      hero: { label: "Precios SEO", line1: "Precios SEO que", line2: "Encajan con Tu Mercado.", subtitle: "Sin cargos ocultos. Ves exactamente qué incluye cada nivel antes de firmar." },
      answerBlock: "Los planes SEO de KINEXIS empiezan en $2,500 al mes para negocios de una ubicación y escalan a $8,000+ para mercados competitivos. Cada plan incluye SEO técnico, estrategia de palabras clave, contenido y link building.",
      tiers: [
        { name: "Starter", range: "$2,500/mes", description: "Una ubicación o mercado nicho con competencia moderada.", bestFor: "Negocios locales que empiezan con SEO" },
        { name: "Growth", range: "$5,000/mes", description: "Sitios multi-servicio, producción de contenido y link building activo.", bestFor: "Marcas en crecimiento" },
        { name: "Scale", range: "$8,000+/mes", description: "Mercados competitivos o múltiples ubicaciones.", bestFor: "Multi-ubicación o industrias competitivas" },
      ],
      included: ["Monitoreo SEO técnico mensual", "Investigación de palabras clave", "Optimización on-page", "Producción de contenido", "Link building", "Informes de leads y rankings"],
      comparison: {
        title: "Qué incluye cada nivel SEO",
        subtitle: "Todos los planes incluyen trabajo SEO core. Los niveles superiores agregan volumen de contenido y links.",
        columns: [{ header: "Starter" }, { header: "Growth" }, { header: "Scale", highlight: true }],
        rows: [
          { label: "Auditoría y correcciones técnicas", values: ["Sí", "Sí", "Sí"] },
          { label: "Piezas de contenido al mes", values: ["2", "4", "8+"] },
          { label: "Soporte multi-ubicación", values: ["1 ubicación", "Hasta 3", "Ilimitado"] },
        ],
      },
      faqs: [
        { question: "¿Hay tarifa de configuración?", answer: "La mayoría de proyectos incluyen auditoría y estrategia en el mes uno. Lo cotizamos claramente antes de empezar. No hay cargos sorpresa de incorporación." },
        { question: "¿Requieren contrato anual?", answer: "No. Trabajamos mes a mes porque los resultados deben ganarse tu negocio, no una cláusula contractual." },
        { question: "¿Cuánto tiempo para ver resultados?", answer: "El movimiento de rankings significativo suele comenzar entre 60 y 90 días. El volumen de leads cambia típicamente en los meses 4 a 6 a medida que el tráfico se acumula." },
        { question: "¿Con qué negocios trabajan?", answer: "Trabajamos con negocios locales, marcas SaaS, e-commerce, y empresas de servicios profesionales. Si tienes una audiencia que busca lo que vendes en Google, podemos ayudarte a capturarla." },
        { question: "¿Cómo reportan los resultados?", answer: "Seguimiento semanal de rankings y dashboards mensuales que cubren tráfico orgánico, leads por fuente y tendencias de posicionamiento." },
        { question: "¿Puedo empezar pequeño y crecer?", answer: "Sí. Muchos clientes comienzan en el plan Starter y pasan a Growth una vez que el momentum de rankings y contenido se establece." },
      ],
      ctaHeadline: "¿Quieres una cotización para tu mercado?",
      ctaSubtitle: "Cuéntanos tu ubicación y objetivos.",
      ctaLabel: "Obtén Cotización SEO",
    },
  },
  "google-ads": {
    en: {
      metaTitle: "Google Ads Pricing | Management from $2,500/mo | KINEXIS",
      metaDescription: "Google Ads management pricing with transparent tiers. Management fees separate from ad spend. Search, Shopping, and PMax campaigns.",
      hero: { label: "Google Ads Pricing", line1: "Google Ads pricing", line2: "without the guesswork.", subtitle: "Management fees are separate from ad spend. You always know what you pay us and what goes to Google." },
      answerBlock: "Google Ads management at KINEXIS starts at $2,500 per month for single-channel Search campaigns with up to $5,000 in ad spend. Growth plans at $5,000 per month cover multi-campaign accounts up to $25,000 in spend. You pay Google directly for clicks. Most accounts need two to four weeks of data before optimization shows clear ROAS improvement.",
      tiers: [
        { name: "Starter", range: "$2,500/mo mgmt", description: "Google Search for one service area, up to $5K ad spend.", bestFor: "Local businesses testing paid search" },
        { name: "Growth", range: "$5,000/mo mgmt", description: "Search + Shopping or PMax, up to $25K ad spend.", bestFor: "Brands scaling proven campaigns" },
        { name: "Scale", range: "$8,000+/mo mgmt", description: "Multi-location, advanced attribution, $25K+ spend.", bestFor: "High-spend accounts needing daily optimization" },
      ],
      included: ["Account audit and restructure", "Conversion tracking setup", "Weekly bid and keyword optimization", "Search term and negative keyword management", "Landing page recommendations", "Monthly ROAS and CPL reporting"],
      comparison: {
        title: "Google Ads management vs. in-house",
        subtitle: "What you get when you hire a dedicated Google Ads team.",
        columns: [{ header: "In-House Hire" }, { header: "KINEXIS", highlight: true }],
        rows: [
          { label: "Monthly cost", values: ["$6,000+ salary + benefits", "$2,500 to $8,000 mgmt fee"] },
          { label: "Time to launch", values: ["60 to 90 days hiring", "2 to 3 weeks"] },
          { label: "Conversion tracking setup", values: ["Often delayed", "Week 1 priority"] },
          { label: "Cross-channel experience", values: ["Google only", "Google + Meta + analytics"] },
          { label: "Reporting on revenue", values: ["Varies", "Standard on all plans"] },
        ],
      },
      faqs: [
        { question: "Is ad spend included in the management fee?", answer: "No. You pay Google directly for clicks. Our fee covers strategy, setup, optimization, and reporting." },
        { question: "What minimum ad spend do you recommend?", answer: "We generally recommend at least $3,000 per month in ad spend to gather enough data for smart optimization. Lower budgets can work for very targeted local campaigns." },
        { question: "How fast will I see results from Google Ads?", answer: "You get traffic within days of launch. Meaningful ROAS improvement usually shows by weeks 3 to 6 as we refine keywords, bids, and landing pages." },
        { question: "Do you require a long-term contract?", answer: "No. We work month to month. We do ask for at least 60 days on new campaigns because meaningful optimization data takes time to accumulate, but there is no locked-in contract." },
        { question: "What conversion tracking do you set up?", answer: "Phone calls, form submissions, and purchase events at minimum. We configure Google Tag Manager and connect the data to your CRM if applicable. Knowing which keywords drive closed deals is what separates a profitable account from a money pit." },
        { question: "Can you take over an existing Google Ads account?", answer: "Yes. Most of our engagements start with an account audit and restructure. We document what we change and why. If the account has historical data worth preserving, we keep it accessible while we build the new structure alongside it." },
        { question: "Do you manage Meta Ads as well?", answer: "Yes. Many clients run Google and Meta together for full-funnel coverage. Google captures intent, Meta builds awareness and retargeting. We manage both on Growth and Scale plans." },
        { question: "How do you report on Google Ads performance?", answer: "Weekly summaries covering spend, impressions, clicks, cost per lead, and ROAS. Monthly deep-dives with keyword-level data, search term analysis, and optimization notes for the coming month." },
      ],
      ctaHeadline: "Need a Google Ads quote?",
      ctaSubtitle: "Share your market, services, and current spend.|We will map a realistic budget and management tier.",
      ctaLabel: "Get Google Ads Pricing",
    },
    es: {
      metaTitle: "Precios Google Ads | Gestión desde $2,500/mes | KINEXIS",
      metaDescription: "Precios transparentes de gestión Google Ads. Tarifas separadas del gasto publicitario.",
      hero: { label: "Precios Google Ads", line1: "Precios Google Ads", line2: "Sin Sorpresas.", subtitle: "Las tarifas de gestión son separadas del gasto en anuncios." },
      answerBlock: "La gestión de Google Ads en KINEXIS empieza en $2,500 al mes para campañas Search con hasta $5,000 de gasto publicitario.",
      tiers: [
        { name: "Starter", range: "$2,500/mes", description: "Google Search, hasta $5K de gasto.", bestFor: "Negocios locales" },
        { name: "Growth", range: "$5,000/mes", description: "Multi-campaña, hasta $25K.", bestFor: "Marcas en escala" },
        { name: "Scale", range: "$8,000+/mes", description: "Multi-ubicación, $25K+.", bestFor: "Cuentas de alto gasto" },
      ],
      included: ["Auditoría de cuenta", "Seguimiento de conversiones", "Optimización semanal", "Informes ROAS"],
      comparison: { title: "Gestión vs. contratar in-house", subtitle: "Comparación de costos y capacidades.", columns: [{ header: "In-House" }, { header: "KINEXIS", highlight: true }], rows: [{ label: "Costo mensual", values: ["$6,000+ salario", "$2,500 a $8,000"] }] },
      faqs: [
        { question: "¿El gasto en anuncios está incluido?", answer: "No. Pagas a Google directamente por los clics. Nuestra tarifa cubre estrategia, configuración, optimización e informes." },
        { question: "¿Requieren contrato a largo plazo?", answer: "No. Trabajamos mes a mes. Pedimos al menos 60 días en campañas nuevas para acumular datos de optimización." },
        { question: "¿Qué seguimiento de conversiones configuran?", answer: "Llamadas telefónicas, envíos de formularios y eventos de compra como mínimo. Conectamos los datos a tu CRM si aplica." },
        { question: "¿Cuánto tiempo para ver resultados?", answer: "Obtienes tráfico a los pocos días del lanzamiento. La mejora de ROAS significativa suele aparecer en las semanas 3 a 6." },
        { question: "¿Gestionan también Meta Ads?", answer: "Sí. Muchos clientes combinan Google y Meta para cobertura de embudo completo. Gestionamos ambos en planes Growth y Scale." },
      ],
      ctaHeadline: "¿Necesitas una cotización?",
      ctaSubtitle: "Comparte tu mercado y objetivos.",
      ctaLabel: "Obtén Precios Google Ads",
    },
  },
  "web-design": {
    en: {
      metaTitle: "Web Design Pricing | Sites from $8,000 | KINEXIS Digital",
      metaDescription: "Web design pricing for conversion-focused business websites. Project-based and retainer options with clear deliverables.",
      hero: { label: "Web Design Pricing", line1: "Website pricing", line2: "built for conversions.", subtitle: "Quotes based on scope, not page count alone. Every build includes mobile optimization and analytics setup." },
      answerBlock: "Business websites at KINEXIS typically range from $8,000 to $35,000 for a full custom build depending on pages, integrations, and e-commerce needs. Smaller landing page projects start around $3,500. Timeline is usually 6 to 10 weeks from kickoff to launch. Ongoing maintenance and CRO retainers are available separately.",
      tiers: [
        { name: "Landing Page", range: "From $3,500", description: "Single high-converting page for campaigns or lead gen.", bestFor: "Paid traffic destinations" },
        { name: "Business Site", range: "$8K to $18K", description: "5 to 15 pages, CMS, forms, and core integrations.", bestFor: "Service businesses replacing an outdated site" },
        { name: "Custom Build", range: "$18K to $35K+", description: "E-commerce, portals, or complex functionality.", bestFor: "Brands needing custom features or large catalogs" },
      ],
      included: ["Mobile-first responsive design", "Core Web Vitals optimization", "CMS setup and training", "Form and CRM integration", "Analytics and conversion tracking", "30-day post-launch support"],
      comparison: {
        title: "Custom build vs. template DIY",
        subtitle: "Why businesses outgrow cheap templates.",
        columns: [{ header: "Template / DIY" }, { header: "KINEXIS Build", highlight: true }],
        rows: [
          { label: "Upfront cost", values: ["$500 to $2,000", "$8,000 to $35,000"] },
          { label: "Conversion optimization", values: ["Generic layout", "Built around your sales process"] },
          { label: "Page speed", values: ["Often poor", "Core Web Vitals target"] },
          { label: "SEO foundation", values: ["Basic", "Technical SEO built in"] },
          { label: "CRM integration", values: ["Manual or plugin", "Custom wired to your stack"] },
        ],
      },
      faqs: [
        { question: "Do you offer payment plans?", answer: "Yes. Most projects split 50% at kickoff and 50% at launch. Larger builds can be phased by milestone." },
        { question: "Which platforms do you build on?", answer: "We work primarily in Next.js and Webflow depending on your needs. We recommend the stack that fits your team, budget, and growth plans." },
        { question: "Is hosting included?", answer: "Hosting is separate. We help you choose and configure the right setup, usually Vercel, Netlify, or Webflow hosting." },
        { question: "How long does a typical project take?", answer: "A standard Business Site build takes 6 to 10 weeks from kickoff to launch. Landing page projects run 2 to 3 weeks. Custom builds with e-commerce or complex integrations run 10 to 16 weeks depending on scope." },
        { question: "Will my site be optimized for SEO?", answer: "Yes. Every build includes a technical SEO foundation: semantic HTML structure, correct heading hierarchy, meta tags, schema markup, sitemap, and Core Web Vitals optimization. This is not an add-on. It is part of every project." },
        { question: "What do I need to provide for the project to start?", answer: "Your existing brand assets (logo, fonts, color palette if you have them), access to your current hosting and domain, example sites you like, and a brief describing your core services and target customers. We handle the rest including copy guidance, photography direction, and technical setup." },
        { question: "Can you redesign an existing site without starting over?", answer: "Sometimes. If the technical foundation is sound, a redesign is faster and cheaper than a full rebuild. We audit your current site in week one and give you a clear recommendation. We will not push a full rebuild if a focused redesign achieves your goals." },
        { question: "Do you provide post-launch support?", answer: "All projects include 30 days of post-launch support covering bug fixes and minor adjustments. Ongoing maintenance retainers and CRO testing sprints are available separately for clients who want continuous improvement." },
      ],
      ctaHeadline: "Need a website quote?",
      ctaSubtitle: "Tell us what you sell and what your current site is missing.|We will send a scoped proposal within a few business days.",
      ctaLabel: "Get a Web Design Quote",
    },
    es: {
      metaTitle: "Precios Diseño Web | Sitios desde $8,000 | KINEXIS",
      metaDescription: "Precios de diseño web enfocados en conversión. Cotizaciones claras por alcance.",
      hero: { label: "Precios Web", line1: "Precios de Sitio Web", line2: "Hechos para Convertir.", subtitle: "Cotizaciones basadas en alcance, no solo en número de páginas." },
      answerBlock: "Los sitios web empresariales en KINEXIS suelen costar entre $8,000 y $35,000 según páginas, integraciones y e-commerce.",
      tiers: [
        { name: "Landing Page", range: "Desde $3,500", description: "Una página de alta conversión.", bestFor: "Campañas pagadas" },
        { name: "Sitio Empresarial", range: "$8K a $18K", description: "5 a 15 páginas con CMS.", bestFor: "Negocios de servicios" },
        { name: "Build Custom", range: "$18K a $35K+", description: "E-commerce o funcionalidad compleja.", bestFor: "Marcas con necesidades custom" },
      ],
      included: ["Diseño responsive mobile-first", "Optimización Core Web Vitals", "CMS e integraciones", "Analytics"],
      comparison: { title: "Build custom vs. plantilla", subtitle: "Por qué los negocios superan las plantillas baratas.", columns: [{ header: "Plantilla" }, { header: "KINEXIS", highlight: true }], rows: [{ label: "Optimización conversión", values: ["Genérica", "Según tu proceso de ventas"] }] },
      faqs: [
        { question: "¿Ofrecen planes de pago?", answer: "Sí. La mayoría de proyectos se divide en 50% al inicio y 50% al lanzamiento. Builds más grandes pueden facturarse por etapas." },
        { question: "¿Cuánto tarda un proyecto típico?", answer: "Un sitio empresarial estándar toma 6 a 10 semanas de kickoff a lanzamiento. Landing pages 2 a 3 semanas. Builds custom con e-commerce 10 a 16 semanas." },
        { question: "¿El sitio estará optimizado para SEO?", answer: "Sí. Todo build incluye base técnica SEO: estructura HTML semántica, jerarquía de encabezados, meta etiquetas, schema markup, sitemap y optimización Core Web Vitals." },
        { question: "¿Qué necesito tener listo para empezar?", answer: "Tus activos de marca existentes (logo, fuentes, paleta de colores), acceso a tu hosting y dominio actual, y ejemplos de sitios que te gusten." },
        { question: "¿Incluyen soporte post-lanzamiento?", answer: "Todos los proyectos incluyen 30 días de soporte post-lanzamiento para corrección de bugs y ajustes menores." },
        { question: "¿Pueden rediseñar un sitio existente sin empezar desde cero?", answer: "A veces. Auditamos tu sitio actual en la semana uno y te damos una recomendación clara. No presionaremos un rebuild completo si un rediseño enfocado logra tus objetivos." },
      ],
      ctaHeadline: "¿Necesitas cotización?",
      ctaSubtitle: "Cuéntanos qué vendes y qué falta en tu sitio actual.",
      ctaLabel: "Obtén Cotización Web",
    },
  },
  "meta-ads": {
    en: {
      metaTitle: "Meta Ads Pricing | Management from $1,500/mo | KINEXIS",
      metaDescription:
        "Meta Ads management pricing for Facebook and Instagram. Creative testing, audience segmentation, and ROAS reporting. Management separate from ad spend.",
      hero: {
        label: "Meta Ads Pricing",
        line1: "Meta Ads pricing",
        line2: "tied to performance.",
        subtitle: "Management fees are separate from ad spend. You see what we charge and what goes to Meta before anything launches.",
      },
      answerBlock:
        "Meta Ads management at KINEXIS starts at $1,500 per month for single-account Facebook and Instagram campaigns. Growth plans at $3,000 per month cover multi-audience accounts with active creative testing. You pay Meta directly for impressions and clicks. Most accounts need $3,000 to $15,000 in monthly ad spend and two to four weeks of creative testing before ROAS stabilizes.",
      tiers: [
        { name: "Starter", range: "$1,500/mo mgmt", description: "Single Meta account, prospecting plus retargeting, up to $5K ad spend.", bestFor: "Local businesses testing paid social" },
        { name: "Growth", range: "$3,000/mo mgmt", description: "Creative testing program, catalog ads, up to $15K ad spend.", bestFor: "E-commerce and DTC brands scaling Meta" },
        { name: "Scale", range: "$5,000+/mo mgmt", description: "Multi-account, UGC creative pipeline, $15K+ ad spend.", bestFor: "High-spend brands needing weekly creative refresh" },
      ],
      included: [
        "Account and pixel audit with CAPI setup",
        "Audience architecture (prospecting, retargeting, lookalikes)",
        "Biweekly creative testing sprints",
        "Campaign structure and budget allocation",
        "Landing page alignment recommendations",
        "Weekly CPL and ROAS reporting",
      ],
      comparison: {
        title: "Boost post vs. managed Meta campaigns",
        subtitle: "What changes when someone actually runs your account.",
        layout: "impact",
        columns: [{ header: "Boost Post / DIY" }, { header: "KINEXIS Meta Ads", highlight: true }],
        rows: [
          { label: "Targeting", values: ["Broad interests only", "Custom audiences, lookalikes, exclusions"] },
          { label: "Creative testing", values: ["One ad, set and forget", "Three to five new variants every two weeks"] },
          { label: "Retargeting", values: ["Basic site visitors", "Multi-stage warm and hot pools"] },
          { label: "Tracking", values: ["Pixel only", "Pixel plus Conversions API"] },
          { label: "Typical CPL", values: ["Often 2 to 3x higher", "20 to 35% lower after optimization"] },
        ],
      },
      faqs: [
        { question: "Is ad spend included in the management fee?", answer: "No. You pay Meta directly. Our fee covers strategy, creative testing, optimization, and reporting." },
        { question: "What minimum ad spend do you recommend?", answer: "We generally recommend at least $3,000 per month in ad spend so the algorithm has enough data to optimize. Lower budgets can work for very targeted local campaigns." },
        { question: "Do you create ad creative?", answer: "Yes. Ad copy and creative direction are part of management. Full video production is available through our video marketing service if you need it." },
        { question: "How long until Meta Ads become profitable?", answer: "Expect two to four weeks of creative testing before you find winning ad-audience combinations. Stable ROAS usually arrives between weeks four and eight depending on your offer and spend level." },
        { question: "How is Meta Ads management different from PPC management?", answer: "PPC management covers Google, Meta, LinkedIn, and Microsoft as one program. Meta Ads management is Facebook and Instagram only, with deeper creative testing and audience work." },
        { question: "Will I own my Meta ad account?", answer: "Always. We work inside your Business Manager with admin access. If you leave, you keep every campaign, audience, and creative asset we built." },
        { question: "Do you manage Google Ads too?", answer: "Yes. Many clients run Google and Meta together. Google captures intent. Meta builds demand and retargeting. We manage both on Growth and Scale plans." },
        { question: "How do you report on Meta performance?", answer: "Weekly summaries covering spend, CPM, CTR, CPL, ROAS, and creative-level breakdowns. Monthly deep-dives with audience performance and next-month testing plans." },
      ],
      ctaHeadline: "Need a Meta Ads quote?",
      ctaSubtitle: "Share your offer, audience, and current spend.|We will map a realistic budget and management tier.",
      ctaLabel: "Get Meta Ads Pricing",
    },
    es: {
      metaTitle: "Precios Meta Ads | Gestión desde $1,500/mes | KINEXIS",
      metaDescription: "Precios transparentes de gestión Meta Ads. Tarifas separadas del gasto publicitario.",
      hero: { label: "Precios Meta Ads", line1: "Precios Meta Ads", line2: "Ligados al Rendimiento.", subtitle: "Las tarifas de gestión son separadas del gasto en anuncios." },
      answerBlock: "La gestión de Meta Ads en KINEXIS empieza en $1,500 al mes para campañas en Facebook e Instagram.",
      tiers: [
        { name: "Starter", range: "$1,500/mes", description: "Una cuenta Meta, hasta $5K de gasto.", bestFor: "Negocios locales" },
        { name: "Growth", range: "$3,000/mes", description: "Programa de pruebas creativas, hasta $15K.", bestFor: "E-commerce en escala" },
        { name: "Scale", range: "$5,000+/mes", description: "Multi-cuenta, $15K+.", bestFor: "Marcas de alto gasto" },
      ],
      included: ["Auditoría de cuenta y pixel", "Arquitectura de audiencias", "Sprints creativos quincenales", "Informes CPL y ROAS"],
      comparison: { title: "Boost vs. gestión profesional", subtitle: "Qué cambia con gestión dedicada.", columns: [{ header: "Boost / DIY" }, { header: "KINEXIS", highlight: true }], rows: [{ label: "Creativos", values: ["Un anuncio", "3-5 variantes cada 2 semanas"] }] },
      faqs: [
        { question: "¿El gasto en anuncios está incluido?", answer: "No. Pagas a Meta directamente. Nuestra tarifa cubre estrategia, pruebas creativas y optimización." },
        { question: "¿Cuánto tiempo para ver resultados?", answer: "Espera dos a cuatro semanas de pruebas creativas antes de encontrar combinaciones ganadoras." },
        { question: "¿Gestionan también Google Ads?", answer: "Sí. Muchos clientes combinan Google y Meta para cobertura de embudo completo." },
      ],
      ctaHeadline: "¿Necesitas una cotización?",
      ctaSubtitle: "Comparte tu oferta y objetivos.",
      ctaLabel: "Obtén Precios Meta Ads",
    },
  },
};

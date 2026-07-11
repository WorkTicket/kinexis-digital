import type { FAQItem } from "@/components/sections/FAQSection";
import type { PricingSlug } from "@/content/registry/site-routes";
import type { Locale } from "@/i18n/routing";
import type { PricingPageContent } from "@/content/pricing/pricing-pages";

type GeneratedOverride = Pick<
  PricingPageContent,
  "hero" | "answerBlock" | "metaTitle" | "metaDescription" | "ctaHeadline" | "ctaSubtitle" | "ctaLabel"
>;

const EN_OVERRIDES: Partial<Record<PricingSlug, GeneratedOverride>> = {
  "local-seo": {
    metaTitle: "Local SEO Pricing | Plans from $1,500/mo | KINEXIS",
    metaDescription:
      "Local SEO pricing for map pack visibility. GBP, citations, reviews, and location pages from $1,500/mo. Month to month, fixed scope at each tier.",
    hero: {
      label: "Local SEO Pricing",
      line1: "Map pack pricing",
      line2: "for businesses that win on proximity.",
      subtitle:
        "GBP, citations, reviews, and location pages at fixed scope per tier. Not a watered-down version of full SEO.",
    },
    answerBlock:
      "Local SEO plans start at $1,500 per month for single-location service businesses and scale to $5,000+ for multi-city or franchise operators. Every plan covers Google Business Profile optimization, citation cleanup, review strategy, and location page work. Full-site SEO with content and link building is a separate program — see SEO pricing. Most clients see map pack movement within 30 to 60 days. We work month to month.",
    ctaHeadline: "Want a quote for local SEO?",
    ctaSubtitle: "Tell us your service areas and competition.|We will recommend the right tier and map pack strategy.",
    ctaLabel: "Get Local SEO Pricing",
  },
  "content-marketing": {
    metaTitle: "Content Marketing Pricing | From $2,000/mo | KINEXIS",
    metaDescription:
      "Content marketing pricing for standalone production retainers. 4 to 20+ SEO-informed pieces per month. Fixed scope, no hidden fees, month to month.",
    hero: {
      label: "Content Marketing Pricing",
      line1: "Production pricing",
      line2: "when SEO is handled elsewhere.",
      subtitle:
        "Standalone article and landing page retainers for teams that need volume without a full SEO program. Fixed deliverables at each tier.",
    },
    answerBlock:
      "Content marketing retainers start at $2,000 per month for 4 to 6 SEO-informed pieces and scale to $8,000+ for 20+ pieces with editorial leadership. This is production and strategy — not a substitute for technical SEO or link building. Full SEO programs include content at every tier ($2,500/mo entry). Per-piece pricing available for project work. First pieces typically publish within 3 to 4 weeks.",
    ctaHeadline: "Want a content marketing quote?",
    ctaSubtitle: "Tell us your industry, volume needs, and goals.|We will scope the right retainer tier.",
    ctaLabel: "Get Content Marketing Pricing",
  },
  funnels: {
    metaTitle: "Funnels & CRO Pricing | Builds from $5,000 | KINEXIS",
    metaDescription:
      "Funnel and CRO pricing with one-time builds from $5,000 and optimization retainers from $6,500/mo. Landing pages, automation, and A/B testing at fixed scope.",
    hero: {
      label: "Funnels & CRO Pricing",
      line1: "Funnel builds and CRO",
      line2: "priced as one system.",
      subtitle:
        "Landing pages, nurture automation, and structured testing under fixed scope — not disconnected one-off projects.",
    },
    answerBlock:
      "Funnel and CRO programs start at $5,000 for a single build with landing page, five-email nurture sequence, and conversion tracking setup. Ongoing optimization retainers run $6,500 to $12,000+ per month depending on traffic volume and test scope. Starter is a one-time project fee; Growth and Scale are monthly retainers. Every plan covers funnel architecture, landing pages, automation, and A/B testing. Ad spend is separate. First meaningful test results typically show within 60 to 90 days. Retainers are month to month.",
    ctaHeadline: "Want a funnel and CRO quote?",
    ctaSubtitle: "Share your traffic, offer, and conversion goals.|We will recommend build vs retainer scope.",
    ctaLabel: "Get Funnels & CRO Pricing",
  },
  analytics: {
    metaTitle: "Marketing Analytics Pricing | Setup from $3,000 | KINEXIS",
    metaDescription:
      "Marketing analytics pricing: one-time GA4 and dashboard setup from $3,000, reporting retainers from $3,500/mo. Fixed scope, month to month on retainers.",
    hero: {
      label: "Marketing Analytics Pricing",
      line1: "Analytics setup that",
      line2: "ties spend to revenue.",
      subtitle:
        "GA4, GTM, conversion tracking, and dashboards with clean data you can act on. Fixed scope at each tier.",
    },
    answerBlock:
      "Marketing analytics setup starts at $3,000 as a one-time project for GA4, GTM, three conversion goals, and a Looker Studio dashboard. Ongoing reporting retainers run $3,500 to $6,500+ per month with multi-channel attribution and CRM integration. Starter is project-based; Growth and Scale are monthly. Dashboards are typically live within three to four weeks of kickoff. Retainers are month to month.",
    ctaHeadline: "Want an analytics quote?",
    ctaSubtitle: "Tell us your stack, channels, and reporting gaps.|We will scope setup vs ongoing reporting.",
    ctaLabel: "Get Analytics Pricing",
  },
  branding: {
    metaTitle: "Branding Pricing | Identity from $8,000 | KINEXIS",
    metaDescription:
      "Brand identity pricing with fixed project fees from $8,000. Logo system, visual identity, messaging, and guidelines. No hourly billing surprises.",
    hero: {
      label: "Branding Pricing",
      line1: "Brand identity pricing",
      line2: "for a system, not a logo file.",
      subtitle:
        "Positioning, visual identity, messaging, and guidelines at fixed project fees. No hourly billing surprises.",
    },
    answerBlock:
      "Brand identity projects start at $8,000 for logo system, color palette, typography, and brand guidelines. Full identity programs with messaging framework and collateral scale to $15,000+. All pricing is fixed-fee. Typical delivery runs eight to twelve weeks from discovery to final guidelines. Revision rounds are scoped upfront in your proposal.",
    ctaHeadline: "Want a branding quote?",
    ctaSubtitle: "Tell us where you are today and what deliverables you need.|We will scope a fixed-fee proposal.",
    ctaLabel: "Get Branding Pricing",
  },
  "email-marketing": {
    metaTitle: "Email Marketing Pricing | From $2,000/mo | KINEXIS",
    metaDescription:
      "Email marketing management from $2,000/mo. Automation, campaigns, and segmentation at fixed monthly scope. ESP platform fees separate.",
    hero: {
      label: "Email Marketing Pricing",
      line1: "Email programs priced",
      line2: "for revenue, not open rates.",
      subtitle:
        "Automation, campaigns, and list segmentation at fixed monthly scope. ESP platform fees are separate.",
    },
    answerBlock:
      "Email marketing management starts at $2,000 per month for campaigns and basic automation on lists up to 10,000 contacts and scales to $5,000+ for enterprise automation with behavioral triggers and CRM integration. Every plan covers strategy, copy, design, and deliverability monitoring. ESP subscription costs (Klaviyo, HubSpot, etc.) are separate from management fees. Core automations are usually live within three to four weeks. We work month to month.",
    ctaHeadline: "Want an email marketing quote?",
    ctaSubtitle: "Share your list size, platform, and automation goals.|We will recommend the right tier.",
    ctaLabel: "Get Email Marketing Pricing",
  },
  "social-media": {
    metaTitle: "Social Media Pricing | From $1,500/mo | KINEXIS",
    metaDescription:
      "Social media management pricing from $1,500/mo. Content, community, and reporting at fixed scope. Boost and ad spend separate from management fees.",
    hero: {
      label: "Social Media Pricing",
      line1: "Social management pricing",
      line2: "tied to pipeline, not likes.",
      subtitle:
        "Content, community, and paid amplification at fixed scope per tier. Boost and campaign ad spend is separate.",
    },
    answerBlock:
      "Social media management starts at $1,500 per month for two platforms and twelve posts with monthly reporting and scales to $5,500+ for multi-platform programs with video production and advanced analytics. Paid boost and campaign ad spend is separate from management fees. Content calendars go live within two weeks of kickoff. We work month to month.",
    ctaHeadline: "Want a social media quote?",
    ctaSubtitle: "Tell us your platforms, posting goals, and audience.|We will scope the right management tier.",
    ctaLabel: "Get Social Media Pricing",
  },
  "video-marketing": {
    metaTitle: "Video Marketing Pricing | Projects from $3,000 | KINEXIS",
    metaDescription:
      "Video production pricing from $3,000 per project. Strategy through post-production at fixed fees. Monthly retainers available for ongoing volume.",
    hero: {
      label: "Video Marketing Pricing",
      line1: "Video production pricing",
      line2: "built for performance placements.",
      subtitle:
        "Strategy through post-production at fixed project fees. Monthly retainers available for ongoing volume.",
    },
    answerBlock:
      "Video marketing projects start at $3,000 for a single 60 to 90 second asset and scale to $15,000+ for multi-asset production programs with distribution strategy. Starter and Growth tiers are fixed project fees; Scale covers ongoing production retainers. Typical single-asset delivery is four to six weeks from brief to final export. Music licensing and location fees quoted separately when needed.",
    ctaHeadline: "Want a video production quote?",
    ctaSubtitle: "Share your channels, formats, and timeline.|We will scope a fixed project fee or retainer.",
    ctaLabel: "Get Video Marketing Pricing",
  },
  "growth-consulting": {
    metaTitle: "Growth Consulting Pricing | From $3,000/mo | KINEXIS",
    metaDescription:
      "Growth consulting and fractional CMO pricing from $3,000/mo. Strategy, growth model, and roadmap advisory. Execution scoped separately. Month to month.",
    hero: {
      label: "Growth Consulting Pricing",
      line1: "Growth consulting",
      line2: "for when more channels stop working.",
      subtitle:
        "Fractional CMO advisory with business audit, growth model, and execution roadmap. Month to month after strategy delivery.",
    },
    answerBlock:
      "Growth consulting starts at $3,000 per month for early-stage businesses with growth model development and bi-weekly advisory calls and scales to $10,000+ for embedded fractional CMO engagements with board-level reporting. Execution services (SEO, paid ads, web) are scoped and priced separately. Initial strategy and 90-day roadmap are typically delivered within four to six weeks. We work month to month.",
    ctaHeadline: "Want a growth consulting quote?",
    ctaSubtitle: "Tell us your stage, channels, and bottlenecks.|We will scope advisory vs embedded engagement.",
    ctaLabel: "Get Growth Consulting Pricing",
  },
  "youtube-ads": {
    metaTitle: "YouTube Ads Pricing | From $2,000/mo | KINEXIS",
    metaDescription:
      "YouTube ads management pricing from $2,000/mo. Targeting, creative direction, and tracking at fixed scope. Ad spend separate. Month to month.",
    hero: {
      label: "YouTube Ads Pricing",
      line1: "YouTube ad pricing",
      line2: "tied to conversions, not views.",
      subtitle:
        "Targeting, hook testing, and conversion tracking at fixed monthly scope. Management fees are separate from your ad spend.",
    },
    answerBlock:
      "YouTube ads management starts at $2,000 per month for single-market campaigns with up to $5K in ad spend and scales to $6,000+ for full video programs with multi-market targeting and advanced attribution. Every plan covers campaign strategy, targeting, creative direction, and tracking tied to leads. Ad spend bills directly to Google and is separate from management. Video production is quoted separately. We work month to month.",
    ctaHeadline: "Want a YouTube ads quote?",
    ctaSubtitle: "Tell us your goals, market, and monthly budget.|We will recommend the right tier and channel mix.",
    ctaLabel: "Get YouTube Ads Pricing",
  },
  "landing-pages": {
    metaTitle: "Landing Page Design Pricing | Pages from $2,500 | KINEXIS",
    metaDescription:
      "Landing page design and optimization pricing. Single pages from $2,500, campaign sets from $6,000, testing retainers from $3,000/mo. Fixed scope, tracking included.",
    hero: {
      label: "Landing Page Pricing",
      line1: "Landing page pricing",
      line2: "built for pages that convert.",
      subtitle:
        "Design, build, and testing at fixed scope. One page, a campaign set, or an ongoing testing retainer, priced clearly.",
    },
    answerBlock:
      "Landing page design starts at $2,500 for a single conversion-focused page with copy, design, build, and tracking. A campaign set of three to five pages runs about $6,000. Ongoing design and A/B testing retainers start at $3,000 per month. Single pages and sets are fixed project fees; the retainer is monthly. Most pages launch in two to three weeks. Ad spend and platform fees are separate.",
    ctaHeadline: "Want a landing page quote?",
    ctaSubtitle: "Tell us your campaign, offer, and audiences.|We will scope a single page, a set, or a retainer.",
    ctaLabel: "Get Landing Page Pricing",
  },
  "website-maintenance": {
    metaTitle: "Website Maintenance Pricing | Plans from $250/mo | KINEXIS",
    metaDescription:
      "Website maintenance and support pricing from $250/mo. Updates, daily backups, security, uptime monitoring, and support at fixed monthly scope. Month to month.",
    hero: {
      label: "Website Maintenance Pricing",
      line1: "Care plan pricing",
      line2: "instead of surprise invoices.",
      subtitle:
        "Updates, backups, security, monitoring, and support time at a predictable monthly rate. Hosting and licenses are separate.",
    },
    answerBlock:
      "Website maintenance plans start at $250 per month for updates, daily backups, and security and uptime monitoring on a standard business site. Growth plans at $600 per month add staging, priority support, and a monthly block of edit time. Priority plans at $1,200+ cover larger or e-commerce sites with faster response times. Hosting and third-party licenses are billed separately. Plans are month to month.",
    ctaHeadline: "Want a maintenance quote?",
    ctaSubtitle: "Tell us your platform, site size, and support needs.|We will recommend the right care plan.",
    ctaLabel: "Get Maintenance Pricing",
  },
  "website-speed": {
    metaTitle: "Website Speed Optimization Pricing | From $1,500 | KINEXIS",
    metaDescription:
      "Website speed and Core Web Vitals optimization pricing. Audit from $1,500, full overhaul from $3,500, monitoring from $1,000/mo. Before-and-after results included.",
    hero: {
      label: "Website Speed Pricing",
      line1: "Speed optimization pricing",
      line2: "with results you can measure.",
      subtitle:
        "Audit, full overhaul, or ongoing monitoring at fixed scope. Every engagement documents before-and-after Core Web Vitals.",
    },
    answerBlock:
      "Website speed optimization starts at $1,500 for a standalone audit with a prioritized fix plan and quick wins. A full Core Web Vitals overhaul across images, code, caching, and server runs $3,500. Ongoing monitoring and tuning is $1,000 per month. Audit and overhaul are fixed project fees; monitoring is a monthly retainer. Most projects wrap in three to four weeks with documented results. Hosting upgrades, if needed, are quoted separately.",
    ctaHeadline: "Want a speed optimization quote?",
    ctaSubtitle: "Share your platform and current scores.|We will scope an audit, a full overhaul, or monitoring.",
    ctaLabel: "Get Speed Optimization Pricing",
  },
  cro: {
    metaTitle: "CRO Pricing | Optimization Retainers from $2,500/mo | KINEXIS",
    metaDescription:
      "Conversion rate optimization pricing with audit-driven test programs. Retainers from $2,500/mo for A/B testing, UX analysis, and conversion lift reporting. Month to month.",
    hero: {
      label: "CRO Pricing",
      line1: "CRO pricing for",
      line2: "more leads from the same traffic.",
      subtitle:
        "Conversion audits, hypothesis-driven testing, and UX fixes at fixed monthly scope. Every test result is measured and documented.",
    },
    answerBlock:
      "CRO retainers start at $2,500 per month for audit-driven testing on high-traffic pages and scale to $5,000+ for multi-page programs with heatmap analysis, session recordings, and multivariate testing. Every retainer covers audit, hypothesis development, A/B testing, UX fixes, and monthly lift reporting. Most tests reach statistical significance within two to four weeks. Single-page optimization projects are available at fixed project fees. We work month to month.",
    ctaHeadline: "Want a CRO quote?",
    ctaSubtitle: "Share your traffic, pages, and conversion goals.|We will scope the right testing program.",
    ctaLabel: "Get CRO Pricing",
  },
  copywriting: {
    metaTitle: "Copywriting Pricing | Retainers from $400/mo | KINEXIS",
    metaDescription:
      "Conversion copywriting pricing from $400/mo for single-channel retainers. Website, email, ad, and sales copy at fixed monthly scope. Month to month, no long-term contracts.",
    hero: {
      label: "Copywriting Pricing",
      line1: "Copywriting retainers",
      line2: "for a voice that stays consistent.",
      subtitle:
        "Website, email, ad, and sales copy at fixed monthly output. One writer who learns your brand instead of restarting every project.",
    },
    answerBlock:
      "Copywriting retainers start at $400 per month for single-channel writing such as blog posts, email sequences, or ongoing web updates and scale to $2,000+ for multi-channel programs with dedicated editorial support across web, ads, email, and sales content. Every retainer includes a voice and messaging guide and predictable monthly output. Per-project pricing is available for one-off pieces like a full site rewrite. First deliverables land within one to two weeks. We work month to month.",
    ctaHeadline: "Want a copywriting quote?",
    ctaSubtitle: "Tell us your channels, volume needs, and voice goals.|We will scope the right retainer tier.",
    ctaLabel: "Get Copywriting Pricing",
  },
  "microsoft-ads": {
    metaTitle: "Microsoft Ads Pricing | Management from $500/mo | KINEXIS",
    metaDescription:
      "Microsoft Ads (Bing Ads) management pricing from $500/mo. Search and audience campaigns with LinkedIn targeting at fixed scope. Management separate from ad spend. Month to month.",
    hero: {
      label: "Microsoft Ads Pricing",
      line1: "Microsoft Ads pricing",
      line2: "for the audience Google misses.",
      subtitle:
        "Bing Search and Microsoft audience campaigns at fixed monthly scope. Lower CPCs and LinkedIn-based targeting built into every tier.",
    },
    answerBlock:
      "Microsoft Ads management starts at $500 per month for single-market Bing Search campaigns with up to $3,000 in ad spend and scales to $2,500+ for full Microsoft network programs with LinkedIn audience targeting and advanced attribution. Every plan covers campaign strategy, keyword research, ad copy, bid management, and conversion tracking. Ad spend bills directly to Microsoft and is separate from management fees. Most accounts see a 20 to 35% lower CPC compared to Google. We work month to month.",
    ctaHeadline: "Want a Microsoft Ads quote?",
    ctaSubtitle: "Tell us your market, goals, and monthly ad budget.|We will recommend the right tier and targeting mix.",
    ctaLabel: "Get Microsoft Ads Pricing",
  },
  "marketing-audits": {
    metaTitle: "Marketing Audit Pricing | From $500 | KINEXIS",
    metaDescription:
      "Marketing audit pricing from $500. Channel, tracking, funnel, and spend review with prioritized fix list. Fixed project fees. Audit credit applied to ongoing engagements.",
    hero: {
      label: "Marketing Audit Pricing",
      line1: "Audit pricing for",
      line2: "a clear picture of what's working.",
      subtitle:
        "Fixed-fee diagnostic across tracking, channels, funnel, and spend. You get a prioritized fix list backed by your own data, not a 60-page PDF.",
    },
    answerBlock:
      "Marketing audits start at $500 for a focused single-channel or tracking review with prioritized findings and quick wins. A full multi-channel audit with funnel analysis and competitor benchmarking runs $1,000. Deep operational reviews across every channel, with detailed execution roadmaps, are $2,500+. All audits are fixed-fee projects. The audit fee is credited toward your first month if you move into an ongoing engagement. Typical delivery is one to three weeks from access to walkthrough.",
    ctaHeadline: "Want a marketing audit quote?",
    ctaSubtitle: "Tell us what channels or gaps you want us to review.|We will scope the right audit level.",
    ctaLabel: "Get Audit Pricing",
  },
  "marketing-automation-crm": {
    metaTitle: "Marketing Automation & CRM Pricing | From $1,000 | KINEXIS",
    metaDescription:
      "Marketing automation and CRM setup pricing from $1,000. HubSpot, Salesforce, GoHighLevel and more. Workflow builds, lead scoring, and integrations at fixed project fees.",
    hero: {
      label: "Marketing Automation & CRM Pricing",
      line1: "Automation and CRM pricing",
      line2: "for tools that actually talk to each other.",
      subtitle:
        "Platform setup, workflow builds, lead scoring, and integrations at fixed project fees. Your stack connected so nothing slips through.",
    },
    answerBlock:
      "Marketing automation and CRM projects start at $1,000 for a focused build such as a single workflow, lead scoring setup, or two-tool integration. Full platform setups with multiple workflows and CRM configuration run $2,500. Complex multi-tool systems with advanced automation, custom objects, and reporting are $5,000+. All projects are fixed-fee. Typical delivery runs two to six weeks depending on scope. Platform subscription fees are separate.",
    ctaHeadline: "Want an automation and CRM quote?",
    ctaSubtitle: "Tell us your current stack, tools, and what is breaking.|We will scope the right project level.",
    ctaLabel: "Get Automation & CRM Pricing",
  },
  "fractional-cmo": {
    metaTitle: "Fractional CMO Pricing | From $3,000/mo | KINEXIS",
    metaDescription:
      "Fractional CMO pricing from $3,000/mo. Senior marketing leadership part-time for strategy, budget, vendor management, and board reporting. Month to month.",
    hero: {
      label: "Fractional CMO Pricing",
      line1: "Fractional CMO pricing",
      line2: "for leadership without a full hire.",
      subtitle:
        "Senior marketing leadership part-time. Strategy, budget, vendor accountability, and board-ready reporting at fixed monthly scope.",
    },
    answerBlock:
      "Fractional CMO engagements start at $3,000 per month for advisory with bi-weekly strategy calls, budget oversight, and quarterly board updates and scale to $10,000+ for embedded leadership with weekly team management, vendor accountability, and monthly board reporting. Every engagement includes a growth model, marketing strategy, and 90-day roadmap delivered in the first four to six weeks. Execution services such as SEO, paid ads, and web are scoped and priced separately. We work month to month.",
    ctaHeadline: "Want a fractional CMO quote?",
    ctaSubtitle: "Tell us your team size, stage, and what marketing leadership you are missing.|We will scope an advisory or embedded role.",
    ctaLabel: "Get Fractional CMO Pricing",
  },
  "training-workshops": {
    metaTitle: "Training & Workshop Pricing | From $500 | KINEXIS",
    metaDescription:
      "Training and workshop pricing from $500 per session. Hands-on SEO, ads, analytics, and strategy training on your own accounts. Custom curriculum, reusable templates included.",
    hero: {
      label: "Training & Workshop Pricing",
      line1: "Training pricing",
      line2: "for skills your team keeps using.",
      subtitle:
        "Hands-on sessions on your own accounts with reusable templates and follow-up support. Not a recorded course. Real work on real tools.",
    },
    answerBlock:
      "Training and workshops start at $500 for a focused single-topic session and scale to $1,500 for a full-day workshop with hands-on work on your accounts. Multi-day programs and ongoing team training are quoted custom based on team size, topics, and format. Every session includes a custom curriculum built around your tools and goals, reusable templates and playbooks, recorded sessions, and follow-up support. Topics include SEO, Google and Meta ads, analytics and GA4, content, email marketing, and strategy. Sessions run remotely by default. On-site workshops available for larger groups.",
    ctaHeadline: "Want a training quote?",
    ctaSubtitle: "Tell us your team size, topics, and goals.|We will build a custom curriculum and quote.",
    ctaLabel: "Get Training Pricing",
  },
};

const ES_OVERRIDES: Partial<Record<PricingSlug, GeneratedOverride>> = {
  "local-seo": {
    metaTitle: "Precios SEO Local | Desde $1,500/mes | KINEXIS",
    metaDescription:
      "Precios SEO local para visibilidad en map pack. GBP, citaciones, reseñas y páginas de ubicación desde $1,500/mes. Mes a mes, alcance fijo por nivel.",
    hero: {
      label: "Precios SEO Local",
      line1: "Precios para map pack",
      line2: "cuando ganas por proximidad.",
      subtitle:
        "GBP, citaciones, reseñas y páginas de ubicación con alcance fijo por nivel. No es SEO completo reducido.",
    },
    answerBlock:
      "Los planes SEO local empiezan en $1,500 al mes para negocios de servicio de una ubicación y escalan a $5,000+ para operadores multi-ciudad o franquicias. Cada plan cubre optimización de Google Business Profile, limpieza de citaciones, estrategia de reseñas y trabajo en páginas de ubicación. SEO de sitio completo con contenido y links es un programa aparte — ver precios SEO. La mayoría ve movimiento en map pack en 30 a 60 días. Trabajamos mes a mes.",
    ctaHeadline: "¿Quieres cotización de SEO local?",
    ctaSubtitle: "Cuéntanos tus zonas de servicio y competencia.|Recomendaremos el nivel y estrategia de map pack.",
    ctaLabel: "Obtén Precios SEO Local",
  },
  "content-marketing": {
    metaTitle: "Precios Content Marketing | Desde $2,000/mes | KINEXIS",
    metaDescription:
      "Precios de content marketing para retainers de producción. 4 a 20+ piezas informadas por SEO al mes. Alcance fijo, sin cargos ocultos, mes a mes.",
    hero: {
      label: "Precios Content Marketing",
      line1: "Precios de producción",
      line2: "cuando el SEO lo manejas aparte.",
      subtitle:
        "Retainers de artículos y landing pages para equipos que necesitan volumen sin un programa SEO completo. Entregables fijos por nivel.",
    },
    answerBlock:
      "Los retainers de content marketing empiezan en $2,000 al mes por 4 a 6 piezas informadas por SEO y escalan a $8,000+ por 20+ piezas con liderazgo editorial. Es producción y estrategia — no sustituye SEO técnico ni link building. Los programas SEO completos incluyen contenido en cada nivel (entrada $2,500/mes). Precio por pieza disponible para proyectos. Las primeras piezas suelen publicarse en 3 a 4 semanas.",
    ctaHeadline: "¿Quieres cotización de content marketing?",
    ctaSubtitle: "Cuéntanos tu industria, volumen y objetivos.|Definiremos el retainer adecuado.",
    ctaLabel: "Obtén Precios Content Marketing",
  },
  funnels: {
    metaTitle: "Precios Funnels y CRO | Builds desde $5,000 | KINEXIS",
    metaDescription:
      "Precios de funnels y CRO: builds únicos desde $5,000 y retainers de optimización desde $6,500/mes. Landing pages, automatización y A/B testing.",
    hero: {
      label: "Precios Funnels y CRO",
      line1: "Builds de funnel y CRO",
      line2: "con precio como un solo sistema.",
      subtitle:
        "Landing pages, automatización de nurture y testing estructurado bajo alcance fijo — no proyectos sueltos desconectados.",
    },
    answerBlock:
      "Los programas de funnel y CRO empiezan en $5,000 por un build con landing page, secuencia de cinco emails y configuración de tracking de conversiones. Los retainers de optimización corren de $6,500 a $12,000+ al mes según volumen de tráfico y alcance de tests. Starter es tarifa única de proyecto; Growth y Scale son retainers mensuales. Cada plan cubre arquitectura de funnel, landing pages, automatización y A/B testing. El gasto en ads es aparte. Resultados de tests suelen verse en 60 a 90 días. Retainers mes a mes.",
    ctaHeadline: "¿Quieres cotización de funnels y CRO?",
    ctaSubtitle: "Comparte tráfico, oferta y metas de conversión.|Recomendaremos build vs retainer.",
    ctaLabel: "Obtén Precios Funnels y CRO",
  },
  analytics: {
    metaTitle: "Precios Analytics Marketing | Setup desde $3,000 | KINEXIS",
    metaDescription:
      "Precios analytics: setup único GA4 y dashboards desde $3,000, retainers de reportes desde $3,500/mes. Alcance fijo, mes a mes en retainers.",
    hero: {
      label: "Precios Analytics Marketing",
      line1: "Setup de analytics que",
      line2: "conecta gasto con ingresos.",
      subtitle:
        "GA4, GTM, tracking de conversiones y dashboards con datos limpios sobre los que puedes actuar. Alcance fijo por nivel.",
    },
    answerBlock:
      "El setup de analytics marketing empieza en $3,000 como proyecto único para GA4, GTM, tres metas de conversión y un dashboard Looker Studio. Los retainers de reportes corren de $3,500 a $6,500+ al mes con atribución multicanal e integración CRM. Starter es por proyecto; Growth y Scale son mensuales. Los dashboards suelen estar live en tres a cuatro semanas desde kickoff. Retainers mes a mes.",
    ctaHeadline: "¿Quieres cotización de analytics?",
    ctaSubtitle: "Cuéntanos tu stack, canales y brechas de reportes.|Definiremos setup vs reporting continuo.",
    ctaLabel: "Obtén Precios Analytics",
  },
  branding: {
    metaTitle: "Precios Branding | Identidad desde $8,000 | KINEXIS",
    metaDescription:
      "Precios de identidad de marca con tarifas fijas desde $8,000. Sistema de logo, identidad visual, messaging y guías. Sin sorpresas por horas.",
    hero: {
      label: "Precios Branding",
      line1: "Precios de identidad",
      line2: "para un sistema, no un archivo de logo.",
      subtitle:
        "Posicionamiento, identidad visual, messaging y guías con tarifas fijas de proyecto. Sin facturación por horas sorpresa.",
    },
    answerBlock:
      "Los proyectos de identidad empiezan en $8,000 por sistema de logo, paleta de color, tipografía y guías de marca. Programas completos con framework de messaging y collateral escalan a $15,000+. Todo el pricing es tarifa fija. Entrega típica de ocho a doce semanas desde discovery hasta guías finales. Rondas de revisión definidas en tu propuesta.",
    ctaHeadline: "¿Quieres cotización de branding?",
    ctaSubtitle: "Cuéntanos dónde estás y qué entregables necesitas.|Preparamos propuesta de tarifa fija.",
    ctaLabel: "Obtén Precios Branding",
  },
  "email-marketing": {
    metaTitle: "Precios Email Marketing | Desde $2,000/mes | KINEXIS",
    metaDescription:
      "Gestión email marketing desde $2,000/mes. Automatización, campañas y segmentación con alcance mensual fijo. Tarifas ESP aparte.",
    hero: {
      label: "Precios Email Marketing",
      line1: "Programas de email",
      line2: "con precio por ingresos, no open rate.",
      subtitle:
        "Automatización, campañas y segmentación con alcance mensual fijo. Tarifas de plataforma ESP son aparte.",
    },
    answerBlock:
      "La gestión de email marketing empieza en $2,000 al mes por campañas y automatización básica en listas hasta 10,000 contactos y escala a $5,000+ por automatización enterprise con triggers conductuales e integración CRM. Cada plan cubre estrategia, copy, diseño y monitoreo de deliverability. Suscripciones ESP (Klaviyo, HubSpot, etc.) son aparte de las tarifas de gestión. Automatizaciones core suelen estar live en tres a cuatro semanas. Trabajamos mes a mes.",
    ctaHeadline: "¿Quieres cotización de email marketing?",
    ctaSubtitle: "Comparte tamaño de lista, plataforma y metas de automatización.|Recomendaremos el nivel.",
    ctaLabel: "Obtén Precios Email Marketing",
  },
  "social-media": {
    metaTitle: "Precios Redes Sociales | Desde $1,500/mes | KINEXIS",
    metaDescription:
      "Precios gestión redes sociales desde $1,500/mes. Contenido, comunidad e informes con alcance fijo. Boost y gasto en ads aparte.",
    hero: {
      label: "Precios Redes Sociales",
      line1: "Precios de gestión social",
      line2: "ligados a pipeline, no likes.",
      subtitle:
        "Contenido, comunidad y amplificación pagada con alcance fijo por nivel. Boost y gasto en campañas es aparte.",
    },
    answerBlock:
      "La gestión de redes sociales empieza en $1,500 al mes por dos plataformas y doce publicaciones con informe mensual y escala a $5,500+ por programas multi-plataforma con producción de video y analytics avanzados. Boost pagado y gasto en campañas es aparte de las tarifas de gestión. Calendarios de contenido quedan live en dos semanas desde kickoff. Trabajamos mes a mes.",
    ctaHeadline: "¿Quieres cotización de redes sociales?",
    ctaSubtitle: "Cuéntanos plataformas, metas de publicación y audiencia.|Definiremos el nivel de gestión.",
    ctaLabel: "Obtén Precios Redes Sociales",
  },
  "video-marketing": {
    metaTitle: "Precios Video Marketing | Proyectos desde $3,000 | KINEXIS",
    metaDescription:
      "Precios producción de video desde $3,000 por proyecto. Estrategia hasta post-producción con tarifas fijas. Retainers mensuales disponibles.",
    hero: {
      label: "Precios Video Marketing",
      line1: "Precios de producción",
      line2: "hechos para placements de performance.",
      subtitle:
        "Estrategia hasta post-producción con tarifas fijas de proyecto. Retainers mensuales para volumen continuo.",
    },
    answerBlock:
      "Proyectos de video marketing empiezan en $3,000 por un asset de 60 a 90 segundos y escalan a $15,000+ por programas multi-asset con estrategia de distribución. Starter y Growth son tarifas fijas de proyecto; Scale cubre retainers de producción continua. Entrega típica de un asset en cuatro a seis semanas desde brief hasta export final. Licencias de música y tarifas de locación se cotizan aparte cuando aplica.",
    ctaHeadline: "¿Quieres cotización de video?",
    ctaSubtitle: "Comparte canales, formatos y timeline.|Definiremos proyecto fijo o retainer.",
    ctaLabel: "Obtén Precios Video Marketing",
  },
  "growth-consulting": {
    metaTitle: "Precios Growth Consulting | Desde $3,000/mes | KINEXIS",
    metaDescription:
      "Precios growth consulting y CMO fractional desde $3,000/mes. Estrategia, modelo de crecimiento y roadmap. Ejecución aparte. Mes a mes.",
    hero: {
      label: "Precios Growth Consulting",
      line1: "Consultoría de crecimiento",
      line2: "cuando más canales dejan de funcionar.",
      subtitle:
        "Asesoría CMO fractional con auditoría, modelo de crecimiento y roadmap de ejecución. Mes a mes tras entrega de estrategia.",
    },
    answerBlock:
      "Growth consulting empieza en $3,000 al mes para negocios early-stage con desarrollo de modelo de crecimiento y llamadas quincenales y escala a $10,000+ por engagements CMO fractional embebidos con reportes a nivel board. Servicios de ejecución (SEO, paid ads, web) se definen y cotizan aparte. Estrategia inicial y roadmap 90 días suelen entregarse en cuatro a seis semanas. Trabajamos mes a mes.",
    ctaHeadline: "¿Quieres cotización de growth consulting?",
    ctaSubtitle: "Cuéntanos tu etapa, canales y cuellos de botella.|Definiremos advisory vs engagement embebido.",
    ctaLabel: "Obtén Precios Growth Consulting",
  },
  "youtube-ads": {
    metaTitle: "Precios YouTube Ads | Desde $2,000/mes | KINEXIS",
    metaDescription:
      "Precios de gestión de YouTube Ads desde $2,000/mes. Segmentación, dirección creativa y tracking con alcance fijo. Gasto en ads aparte. Mes a mes.",
    hero: {
      label: "Precios YouTube Ads",
      line1: "Precios de YouTube",
      line2: "ligados a conversiones, no a vistas.",
      subtitle:
        "Segmentación, pruebas de hook y tracking de conversiones con alcance mensual fijo. Las tarifas de gestión son aparte del gasto en ads.",
    },
    answerBlock:
      "La gestión de YouTube Ads empieza en $2,000 al mes para campañas de un mercado con hasta $5K de gasto y escala a $6,000+ por programas de video con segmentación multi-mercado y atribución avanzada. Cada plan cubre estrategia, segmentación, dirección creativa y tracking ligado a leads. El gasto en ads va directo a Google y es aparte de la gestión. La producción de video se cotiza aparte. Trabajamos mes a mes.",
    ctaHeadline: "¿Quieres cotización de YouTube Ads?",
    ctaSubtitle: "Cuéntanos tus metas, mercado y presupuesto mensual.|Recomendaremos el nivel y la mezcla de canales.",
    ctaLabel: "Obtén Precios YouTube Ads",
  },
  "landing-pages": {
    metaTitle: "Precios Landing Pages | Páginas desde $2,500 | KINEXIS",
    metaDescription:
      "Precios de diseño y optimización de landing pages. Páginas individuales desde $2,500, sets desde $6,000, retainers de testing desde $3,000/mes. Tracking incluido.",
    hero: {
      label: "Precios Landing Pages",
      line1: "Precios de landing pages",
      line2: "hechas para convertir.",
      subtitle:
        "Diseño, build y testing con alcance fijo. Una página, un set de campaña o un retainer de testing continuo, con precio claro.",
    },
    answerBlock:
      "El diseño de landing pages empieza en $2,500 por una página enfocada en conversión con copy, diseño, build y tracking. Un set de tres a cinco páginas ronda los $6,000. Los retainers de diseño y A/B testing continuo empiezan en $3,000 al mes. Las páginas y sets son tarifas fijas de proyecto; el retainer es mensual. La mayoría lanza en dos a tres semanas. El gasto en ads y las tarifas de plataforma son aparte.",
    ctaHeadline: "¿Quieres cotización de landing pages?",
    ctaSubtitle: "Cuéntanos tu campaña, oferta y audiencias.|Definiremos una página, un set o un retainer.",
    ctaLabel: "Obtén Precios Landing Pages",
  },
  "website-maintenance": {
    metaTitle: "Precios Mantenimiento Web | Planes desde $250/mes | KINEXIS",
    metaDescription:
      "Precios de mantenimiento y soporte web desde $250/mes. Actualizaciones, respaldos diarios, seguridad, monitoreo de uptime y soporte con alcance fijo. Mes a mes.",
    hero: {
      label: "Precios Mantenimiento Web",
      line1: "Precios de plan de cuidado",
      line2: "en vez de facturas sorpresa.",
      subtitle:
        "Actualizaciones, respaldos, seguridad, monitoreo y tiempo de soporte a una tarifa mensual predecible. Hosting y licencias aparte.",
    },
    answerBlock:
      "Los planes de mantenimiento web empiezan en $250 al mes por actualizaciones, respaldos diarios y monitoreo de seguridad y uptime en un sitio de negocio estándar. Los planes Growth a $600 al mes agregan staging, soporte prioritario y un bloque mensual de tiempo de edición. Los planes Priority a $1,200+ cubren sitios más grandes o e-commerce con respuesta más rápida. Hosting y licencias de terceros se facturan aparte. Los planes son mes a mes.",
    ctaHeadline: "¿Quieres cotización de mantenimiento?",
    ctaSubtitle: "Cuéntanos tu plataforma, tamaño y necesidades de soporte.|Recomendaremos el plan de cuidado correcto.",
    ctaLabel: "Obtén Precios Mantenimiento",
  },
  "website-speed": {
    metaTitle: "Precios Optimización de Velocidad Web | Desde $1,500 | KINEXIS",
    metaDescription:
      "Precios de optimización de velocidad y Core Web Vitals. Auditoría desde $1,500, revisión completa desde $3,500, monitoreo desde $1,000/mes. Resultados de antes y después.",
    hero: {
      label: "Precios Velocidad Web",
      line1: "Precios de optimización",
      line2: "con resultados que puedes medir.",
      subtitle:
        "Auditoría, revisión completa o monitoreo continuo con alcance fijo. Cada proyecto documenta los Core Web Vitals de antes y después.",
    },
    answerBlock:
      "La optimización de velocidad web empieza en $1,500 por una auditoría independiente con plan de fixes priorizado y quick wins. Una revisión completa de Core Web Vitals en imágenes, código, caché y servidor corre $3,500. El monitoreo y tuning continuo es $1,000 al mes. Auditoría y revisión son tarifas fijas de proyecto; el monitoreo es retainer mensual. La mayoría de proyectos cierran en tres a cuatro semanas con resultados documentados. Mejoras de hosting, si se necesitan, se cotizan aparte.",
    ctaHeadline: "¿Quieres cotización de velocidad web?",
    ctaSubtitle: "Comparte tu plataforma y puntajes actuales.|Definiremos auditoría, revisión completa o monitoreo.",
    ctaLabel: "Obtén Precios Velocidad Web",
  },
  cro: {
    metaTitle: "Precios CRO | Retainers de Optimización desde $2,500/mes | KINEXIS",
    metaDescription:
      "Precios de conversion rate optimization con programas de testing basados en auditoría. Retainers desde $2,500/mes con A/B testing, análisis UX y reportes de mejora. Mes a mes.",
    hero: {
      label: "Precios CRO",
      line1: "Precios CRO para",
      line2: "más leads del mismo tráfico.",
      subtitle:
        "Auditorías de conversión, testing basado en hipótesis y arreglos UX con alcance mensual fijo. Cada resultado de test se mide y documenta.",
    },
    answerBlock:
      "Los retainers de CRO empiezan en $2,500 al mes para testing guiado por auditoría en páginas de alto tráfico y escalan a $5,000+ para programas multi-página con análisis de heatmaps, grabaciones de sesión y testing multivariante. Cada retainer cubre auditoría, desarrollo de hipótesis, A/B testing, arreglos UX y reportes mensuales de mejora. La mayoría de tests alcanzan significancia estadística en dos a cuatro semanas. Proyectos de optimización de una sola página están disponibles con tarifa fija. Trabajamos mes a mes.",
    ctaHeadline: "¿Quieres cotización de CRO?",
    ctaSubtitle: "Comparte tu tráfico, páginas y metas de conversión.|Definiremos el programa de testing adecuado.",
    ctaLabel: "Obtén Precios CRO",
  },
  copywriting: {
    metaTitle: "Precios Copywriting | Retainers desde $400/mes | KINEXIS",
    metaDescription:
      "Precios de copywriting de conversión desde $400/mes para retainers de un canal. Copy para web, email, anuncios y ventas con alcance mensual fijo. Mes a mes, sin contratos largos.",
    hero: {
      label: "Precios Copywriting",
      line1: "Retainers de copywriting",
      line2: "para una voz que se mantiene consistente.",
      subtitle:
        "Copy para web, email, anuncios y ventas con salida mensual fija. Un redactor que aprende tu marca en vez de reiniciar cada proyecto.",
    },
    answerBlock:
      "Los retainers de copywriting empiezan en $400 al mes para redacción de un solo canal como blog, secuencias de email o actualizaciones web y escalan a $2,000+ para programas multicanal con soporte editorial dedicado en web, anuncios, email y contenido de ventas. Cada retainer incluye una guía de voz y mensajes y salida mensual predecible. Precio por proyecto disponible para piezas únicas como reescritura completa de sitio. Las primeras entregas llegan en una a dos semanas. Trabajamos mes a mes.",
    ctaHeadline: "¿Quieres cotización de copywriting?",
    ctaSubtitle: "Cuéntanos tus canales, volumen y metas de voz.|Definiremos el nivel de retainer adecuado.",
    ctaLabel: "Obtén Precios Copywriting",
  },
  "microsoft-ads": {
    metaTitle: "Precios Microsoft Ads | Gestión desde $500/mes | KINEXIS",
    metaDescription:
      "Precios de gestión Microsoft Ads (Bing Ads) desde $500/mes. Campañas Search y de audiencia con segmentación LinkedIn. Gestión separada del gasto en ads. Mes a mes.",
    hero: {
      label: "Precios Microsoft Ads",
      line1: "Precios Microsoft Ads",
      line2: "para la audiencia que Google no ve.",
      subtitle:
        "Campañas Bing Search y de audiencia Microsoft con alcance mensual fijo. CPCs más bajos y segmentación basada en LinkedIn en cada nivel.",
    },
    answerBlock:
      "La gestión de Microsoft Ads empieza en $500 al mes para campañas Bing Search de un mercado con hasta $3,000 de gasto en ads y escala a $2,500+ para programas completos en la red Microsoft con segmentación de audiencia LinkedIn y atribución avanzada. Cada plan cubre estrategia de campaña, investigación de keywords, copy de anuncios, gestión de pujas y tracking de conversiones. El gasto en ads va directo a Microsoft y es aparte de las tarifas de gestión. La mayoría de cuentas ven un CPC 20 a 35% menor comparado con Google. Trabajamos mes a mes.",
    ctaHeadline: "¿Quieres cotización de Microsoft Ads?",
    ctaSubtitle: "Cuéntanos tu mercado, metas y presupuesto mensual.|Recomendaremos el nivel y la mezcla de segmentación.",
    ctaLabel: "Obtén Precios Microsoft Ads",
  },
  "marketing-audits": {
    metaTitle: "Precios Auditoría de Marketing | Desde $500 | KINEXIS",
    metaDescription:
      "Precios de auditoría de marketing desde $500. Revisión de canales, tracking, funnel y gasto con plan de acción priorizado. Tarifas fijas de proyecto. Crédito aplicable a engagements continuos.",
    hero: {
      label: "Precios Auditoría de Marketing",
      line1: "Precios de auditoría para",
      line2: "saber exactamente qué funciona.",
      subtitle:
        "Diagnóstico a tarifa fija de tracking, canales, funnel y gasto. Recibes una lista priorizada respaldada por tus propios datos, no un PDF de 60 páginas.",
    },
    answerBlock:
      "Las auditorías de marketing empiezan en $500 por una revisión enfocada en un solo canal o tracking con hallazgos priorizados y quick wins. Una auditoría multicanal completa con análisis de funnel y benchmarking competitivo corre $1,000. Revisiones operativas profundas en cada canal, con roadmap detallado de ejecución, son $2,500+. Todas las auditorías son proyectos a tarifa fija. La tarifa de auditoría se acredita a tu primer mes si avanzas a un engagement continuo. Entrega típica de una a tres semanas desde acceso hasta sesión de revisión.",
    ctaHeadline: "¿Quieres cotización de auditoría?",
    ctaSubtitle: "Cuéntanos qué canales o brechas quieres que revisemos.|Definiremos el nivel de auditoría.",
    ctaLabel: "Obtén Precios de Auditoría",
  },
  "marketing-automation-crm": {
    metaTitle: "Precios Automatización de Marketing y CRM | Desde $1,000 | KINEXIS",
    metaDescription:
      "Precios de setup de automatización de marketing y CRM desde $1,000. HubSpot, Salesforce, GoHighLevel y más. Workflows, lead scoring e integraciones a tarifa fija.",
    hero: {
      label: "Precios Automatización y CRM",
      line1: "Precios de automatización y CRM",
      line2: "para herramientas que se hablan de verdad.",
      subtitle:
        "Setup de plataforma, construcción de workflows, lead scoring e integraciones a tarifa fija. Tu stack conectado para que nada se escape.",
    },
    answerBlock:
      "Los proyectos de automatización de marketing y CRM empiezan en $1,000 por un build enfocado como un solo workflow, setup de lead scoring o integración de dos herramientas. Setups completos de plataforma con múltiples workflows y configuración de CRM corren $2,500. Sistemas complejos multi-herramienta con automatización avanzada, objetos custom y reportes son $5,000+. Todos los proyectos son tarifa fija. Entrega típica de dos a seis semanas según alcance. Las suscripciones de plataforma son aparte.",
    ctaHeadline: "¿Quieres cotización de automatización y CRM?",
    ctaSubtitle: "Cuéntanos tu stack actual, herramientas y qué está fallando.|Definiremos el nivel de proyecto.",
    ctaLabel: "Obtén Precios Automatización y CRM",
  },
  "fractional-cmo": {
    metaTitle: "Precios CMO Fractional | Desde $3,000/mes | KINEXIS",
    metaDescription:
      "Precios de CMO fractional desde $3,000/mes. Liderazgo senior de marketing a tiempo parcial para estrategia, presupuesto, gestión de proveedores y reportes para el board. Mes a mes.",
    hero: {
      label: "Precios CMO Fractional",
      line1: "Precios CMO fractional para",
      line2: "liderazgo sin una contratación completa.",
      subtitle:
        "Liderazgo senior de marketing a tiempo parcial. Estrategia, presupuesto, accountability de proveedores y reportes listos para el board con alcance mensual fijo.",
    },
    answerBlock:
      "Los engagements de CMO fractional empiezan en $3,000 al mes para advisory con llamadas estratégicas quincenales, supervisión de presupuesto y actualizaciones trimestrales para el board y escalan a $10,000+ para liderazgo embebido con gestión semanal de equipo, accountability de proveedores y reportes mensuales para el board. Cada engagement incluye un modelo de crecimiento, estrategia de marketing y roadmap de 90 días entregado en las primeras cuatro a seis semanas. Servicios de ejecución como SEO, paid ads y web se definen y cotizan aparte. Trabajamos mes a mes.",
    ctaHeadline: "¿Quieres cotización de CMO fractional?",
    ctaSubtitle: "Cuéntanos el tamaño de tu equipo, etapa y qué liderazgo de marketing te falta.|Definiremos un rol advisory o embebido.",
    ctaLabel: "Obtén Precios CMO Fractional",
  },
  "training-workshops": {
    metaTitle: "Precios Capacitación y Workshops | Desde $500 | KINEXIS",
    metaDescription:
      "Precios de capacitación y workshops desde $500 por sesión. Entrenamiento práctico en SEO, ads, analytics y estrategia sobre tus propias cuentas. Currículo custom, plantillas reutilizables incluidas.",
    hero: {
      label: "Precios Capacitación y Workshops",
      line1: "Precios de capacitación",
      line2: "para habilidades que tu equipo sigue usando.",
      subtitle:
        "Sesiones prácticas sobre tus propias cuentas con plantillas reutilizables y soporte de seguimiento. No es un curso grabado. Trabajo real con herramientas reales.",
    },
    answerBlock:
      "Las capacitaciones y workshops empiezan en $500 por una sesión enfocada en un solo tema y escalan a $1,500 por un taller de día completo con trabajo práctico sobre tus cuentas. Programas de varios días y capacitación continua de equipos se cotizan a medida según tamaño del equipo, temas y formato. Cada sesión incluye un currículo custom construido alrededor de tus herramientas y objetivos, plantillas y playbooks reutilizables, sesiones grabadas y soporte de seguimiento. Los temas incluyen SEO, Google y Meta ads, analytics y GA4, contenido, email marketing y estrategia. Las sesiones corren de forma remota por defecto. Workshops presenciales disponibles para grupos más grandes.",
    ctaHeadline: "¿Quieres cotización de capacitación?",
    ctaSubtitle: "Cuéntanos el tamaño de tu equipo, temas y objetivos.|Construiremos un currículo custom y cotización.",
    ctaLabel: "Obtén Precios de Capacitación",
  },
};

export const generatedPricingOverrides: Record<Locale, Partial<Record<PricingSlug, GeneratedOverride>>> = {
  en: EN_OVERRIDES,
  es: ES_OVERRIDES,
};

const SETUP_FEE_ANSWERS: Record<Locale, Partial<Record<PricingSlug, string>>> = {
  en: {
    funnels:
      "Starter is a one-time funnel build fee quoted upfront. Growth and Scale are monthly retainers — onboarding is included in month one, not billed separately.",
    analytics:
      "Starter is a one-time analytics setup project. Growth and Scale are monthly reporting retainers with no separate onboarding charge beyond what we quote in your proposal.",
    branding:
      "Brand projects are fixed-fee. Discovery, design rounds, and deliverables are scoped in your proposal before work starts — no hourly surprises.",
    "web-design":
      "Web projects are fixed-fee by scope. A 50/50 payment split at kickoff and launch is standard. Hosting and third-party licenses are quoted separately.",
    "video-marketing":
      "Project fees cover production quoted in your brief. Music licensing, talent, and location fees are called out separately when they apply.",
  },
  es: {
    funnels:
      "Starter es tarifa única de build de funnel cotizada al inicio. Growth y Scale son retainers mensuales — el onboarding va incluido en el mes uno, sin cargo aparte.",
    analytics:
      "Starter es proyecto único de setup de analytics. Growth y Scale son retainers mensuales de reportes sin cargo de onboarding aparte del cotizado en tu propuesta.",
    branding:
      "Proyectos de marca son tarifa fija. Discovery, rondas de diseño y entregables se definen en tu propuesta antes de empezar — sin sorpresas por horas.",
    "web-design":
      "Proyectos web son tarifa fija por alcance. División 50/50 al kickoff y lanzamiento es estándar. Hosting y licencias de terceros se cotizan aparte.",
    "video-marketing":
      "Las tarifas de proyecto cubren producción cotizada en tu brief. Licencias de música, talento y locaciones se detallan aparte cuando aplica.",
  },
};

const UPGRADE_ANSWERS: Record<Locale, Partial<Record<PricingSlug, string>>> = {
  en: {
    funnels:
      "Yes. Many clients start with a Starter build, then move to a Growth retainer once traffic supports ongoing tests. We plan the handoff so tracking and pages carry over.",
    analytics:
      "Yes. Starter setup clients often upgrade to Growth once dashboards are live and they want monthly attribution reporting. Your tracking foundation stays in place.",
    branding:
      "Yes. Some clients start with a Starter identity refresh and expand to Growth for messaging and collateral. We scope add-ons without restarting discovery from zero.",
  },
  es: {
    funnels:
      "Sí. Muchos clientes empiezan con un build Starter y pasan a retainer Growth cuando el tráfico soporta tests continuos. Planificamos la transición para que tracking y páginas se mantengan.",
    analytics:
      "Sí. Clientes de setup Starter suelen subir a Growth cuando los dashboards están live y quieren reportes mensuales de atribución. Tu base de tracking se mantiene.",
    branding:
      "Sí. Algunos empiezan con refresh Starter y expanden a Growth para messaging y collateral. Definimos add-ons sin reiniciar discovery desde cero.",
  },
};

const GENERIC_FAQ_DEFAULTS: Record<
  Locale,
  { setupFee: string; contract: string; priceFactors: string; upgrade: string }
> = {
  en: {
    setupFee:
      "Most engagements include onboarding and strategy in month one. We quote it upfront. No surprise charges on the first invoice.",
    contract: "No. Month to month. Results should earn your business, not a contract clause.",
    priceFactors:
      "Scope, competition, where you are starting from, and how much production your market needs. We scope this on a strategy call, not a generic quote form.",
    upgrade:
      "Yes. Many clients start on Starter and move up once momentum builds. We plan the upgrade path so you are not rebuilding from scratch.",
  },
  es: {
    setupFee:
      "La mayoría de proyectos incluyen onboarding y estrategia en el mes uno. Lo cotizamos al inicio. Sin cargos sorpresa en la primera factura.",
    contract: "No. Mes a mes. Los resultados deben ganarse tu negocio, no una cláusula contractual.",
    priceFactors:
      "Alcance, competencia, punto de partida y cuánta producción requiere tu mercado. Lo definimos en una llamada estratégica, no con un formulario genérico.",
    upgrade:
      "Sí. Muchos clientes empiezan en Starter y suben cuando el momentum crece. Planificamos la ruta de upgrade para no reconstruir desde cero.",
  },
};

export function buildGenericPricingFaqs(slug: PricingSlug, locale: Locale, note?: string): FAQItem[] {
  const defaults = GENERIC_FAQ_DEFAULTS[locale];
  const setup = SETUP_FEE_ANSWERS[locale][slug] ?? defaults.setupFee;
  const upgrade = UPGRADE_ANSWERS[locale][slug] ?? defaults.upgrade;

  const questions =
    locale === "es"
      ? {
          setup: "¿Hay tarifa de configuración?",
          contract: "¿Requieren contrato a largo plazo?",
          price: "¿Qué afecta mi precio?",
          upgrade: "¿Puedo empezar con un plan menor y subir?",
        }
      : {
          setup: "Is there a setup fee?",
          contract: "Do you require a long-term contract?",
          price: "What affects my price?",
          upgrade: "Can I start with a smaller plan and upgrade?",
        };

  return [
    { question: questions.setup, answer: setup },
    { question: questions.contract, answer: defaults.contract },
    { question: questions.price, answer: note ?? defaults.priceFactors },
    { question: questions.upgrade, answer: upgrade },
  ];
}

export const tierProofTierLabels: Record<Locale, Record<string, string>> = {
  en: {
    Growth: "Growth",
    "Business Site": "Business Site",
  },
  es: {
    Growth: "Growth",
    "Business Site": "Sitio Empresarial",
  },
};

export const trustStripContent: Record<Locale, { value: string; label: string }[]> = {
  en: [
    { value: "Month to month", label: "No long-term lock-in" },
    { value: "8–10 clients", label: "Focused roster, not a factory" },
    { value: "Fixed scope", label: "Quoted before you sign" },
  ],
  es: [
    { value: "Mes a mes", label: "Sin permanencia a largo plazo" },
    { value: "8–10 clientes", label: "Cartera enfocada, no fábrica" },
    { value: "Alcance fijo", label: "Cotizado antes de firmar" },
  ],
};

export const tierProofSectionLabel: Record<Locale, string> = {
  en: "tier in practice",
  es: "nivel en la práctica",
};

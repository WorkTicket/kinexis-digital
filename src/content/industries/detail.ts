import type { Locale } from "@/i18n/routing";
import type { IndustryEntry } from "@/content/registry/industries";
import { getCategoryById } from "@/content/registry/industries";
import { serviceLabels, serviceRoutes, type ServiceSlug } from "@/content/registry/site-routes";

function industryServiceDescription(slug: ServiceSlug, industry: IndustryEntry): string {
  const label = industry.label.toLowerCase();
  const byService: Partial<Record<ServiceSlug, string>> = {
    seo: `${industry.label} buyers search before they buy. We build the rankings, content, and local visibility to get you in front of them.`,
    "google-ads": `Paid search and local service ads tuned to ${label} buyer intent, with landing pages and call tracking that tie spend to booked work.`,
    "ppc-management": `Google Ads and cross-channel paid media for ${label} companies — Search, Shopping, Performance Max, and coordinated Meta or LinkedIn when needed. Built around cost per lead and booked revenue, not impressions.`,
    "meta-ads": `Facebook and Instagram campaigns for ${label} brands that need demand creation and retargeting, with creative tested against real conversion data.`,
    "web-design": `Sites built for how ${label} prospects compare options, build trust, and take action. Fast, mobile-first, and wired to your CRM.`,
    cro: `Testing and UX fixes on the pages where ${label} leads convert. We find the friction that's costing you revenue.`,
    "email-marketing": `Lifecycle email for ${label} businesses: welcome sequences, nurture flows, and win-back campaigns tied to repeat revenue.`,
    "content-marketing": `Content that answers what ${label} buyers search for at every stage, from first research to final decision.`,
    "social-media": `Platform-native content and paid social for ${label} brands that need visibility where your audience already spends time.`,
    "video-marketing": `Short-form and testimonial video for ${label} companies that need to explain services, build trust, and retarget visitors.`,
    branding: `Positioning and visual identity for ${label} brands that need to look credible before the first sales conversation.`,
    analytics: `Tracking and reporting so every ${label} marketing dollar ties back to leads, calls, and closed revenue.`,
    "growth-consulting": `Fractional strategy for ${label} leadership: channel mix, roadmap, and oversight without hiring a full in-house team.`,
    funnels: `Lead capture, nurture, and booking flows designed for how ${label} prospects move from search to signed contract.`,
    "paid-ads": `Google and Meta campaigns for ${label} companies, optimized for booked calls and qualified pipeline, not click volume.`,
  };

  if (industry.slug === "hvac" && slug === "seo") {
    return "Service-area pages, emergency-intent keywords, Google Business Profile optimization, and call tracking tied to booked jobs.";
  }
  if (industry.slug === "dentists" && slug === "seo") {
    return "Treatment-specific pages, local pack optimization, review strategy, and mobile appointment paths for high-intent patient searches.";
  }
  if (industry.slug === "saas" && slug === "content-marketing") {
    return "Authority content, comparison pages, and product-led acquisition assets that reduce CAC and support trial conversion.";
  }

  return byService[slug] ?? `Strategy and execution built for ${label} companies, not generic agency templates.`;
}

export type IndustryDetailContent = {
  meta: { title: string; description: string };
  answerBlock: string;
  hero: { label: string; headlineLine1: string; headlineLine2: string; subtitle: string };
  challenges: { title: string; items: string[] };
  strategy: { title: string; paragraphs: string[] };
  services: { title: string; items: { label: string; href: string; description: string }[] };
  outcomes: { title: string; metrics: { value: string; label: string }[] };
  faqs: { question: string; answer: string }[];
  relatedSolutions: { href: string; label: string }[];
};

function industryChallenges(industry: IndustryEntry): string[] {
  const base: Record<string, string[]> = {
    hvac: [
      "Seasonal demand swings between AC and heating create feast-or-famine lead flow",
      "Emergency repair searches require instant visibility and click-to-call optimization",
      "Competing against national franchises with massive ad budgets in local markets",
      "Service-area coverage across multiple cities without duplicate thin content",
    ],
    saas: [
      "High CAC from paid channels without product-led activation support",
      "Long sales cycles requiring nurture content across multiple stakeholders",
      "Comparison and alternative searches captured by competitors and review sites",
      "Attribution gaps between marketing touchpoints and closed-won revenue",
    ],
    "law-firms": [
      "Extremely competitive practice-area keywords with high CPC",
      "Bar compliance requirements limiting claims and testimonial usage",
      "Prospects researching extensively before booking consultations",
      "Multiple practice areas requiring distinct content and landing page strategies",
    ],
    dentists: [
      "Intense local competition for new patient searches",
      "Treatment-specific intent (implants, Invisalign, cosmetic) requiring dedicated pages",
      "Review velocity and reputation directly impacting local pack rankings",
      "Mobile-first patients expecting instant appointment booking",
    ],
  };

  return base[industry.slug] || [
    `${industry.label} buyers research extensively before making purchasing decisions`,
    `Competition for high-intent ${industry.label.toLowerCase()} keywords continues to intensify`,
    `Generic marketing playbooks fail to address ${industry.label.toLowerCase()}-specific buyer psychology`,
    `Attribution and ROI measurement require industry-specific conversion tracking`,
  ];
}

const industryOutcomeMap: Record<string, { value: string; label: string }[]> = {
  // Home Services
  hvac: [
    { value: "218%", label: "seasonal service bookings · 9 mo" },
    { value: "71", label: "emergency calls per month · peak season" },
    { value: "Top 3", label: "local pack · 52 service-area keywords" },
  ],
  roofing: [
    { value: "3.4X", label: "storm-season inspection requests · 6 mo" },
    { value: "58%", label: "cost per booked job reduction" },
    { value: "41", label: "signed contracts per month · post-campaign" },
  ],
  landscaping: [
    { value: "4.8X", label: "qualified lead growth · Landscaping Co., 10 mo" },
    { value: "+1,290%", label: "organic traffic · same client" },
    { value: "8.4%", label: "lead conversion rate · post-rebuild" },
  ],
  plumbing: [
    { value: "327%", label: "emergency call growth · Plumbing Co., 8 mo" },
    { value: "65%", label: "ad spend reduction · same client" },
    { value: "94", label: "emergency calls per month" },
  ],
  electrical: [
    { value: "2.9X", label: "quote requests · licensed-trades campaign" },
    { value: "47%", label: "call-to-booking conversion lift" },
    { value: "Top 3", label: "local pack · 38 target keywords" },
  ],
  "pest-control": [
    { value: "186%", label: "seasonal treatment bookings · 7 mo" },
    { value: "34%", label: "recurring contract sign-up rate" },
    { value: "62", label: "new service calls per month" },
  ],
  // Technology
  saas: [
    { value: "5.9X", label: "demo requests · SaaS Platform, 8 mo" },
    { value: "43%", label: "CAC reduction · organic channels" },
    { value: "$33K", label: "MRR · marketing-attributed" },
  ],
  startups: [
    { value: "475%", label: "inbound lead growth · pre-Series A" },
    { value: "28%", label: "shorter sales cycle · nurture rebuild" },
    { value: "5.1X", label: "marketing ROI · blended channels" },
  ],
  "ai-companies": [
    { value: "3.2X", label: "enterprise demo requests · 9 mo" },
    { value: "$2.4M", label: "pipeline generated · ABM program" },
    { value: "62%", label: "organic share of qualified leads" },
  ],
  "software-companies": [
    { value: "4.3X", label: "SQL growth · comparison SEO" },
    { value: "78", label: "demo bookings per month · post-launch" },
    { value: "34%", label: "trial-to-paid conversion lift" },
  ],
  fintech: [
    { value: "2.7X", label: "account signups · compliant funnels" },
    { value: "41%", label: "onboarding completion rate" },
    { value: "$118", label: "cost per funded account · down from $204" },
  ],
  cybersecurity: [
    { value: "3.8X", label: "MQL volume · technical content engine" },
    { value: "$1.8M", label: "enterprise pipeline · 12 mo" },
    { value: "29%", label: "demo-to-opportunity conversion" },
  ],
  // E-Commerce
  "shopify-brands": [
    { value: "2.8X", label: "ROAS on shopping campaigns" },
    { value: "22%", label: "average order value lift · email flows" },
    { value: "35%", label: "email-attributed revenue share" },
  ],
  "dtc-brands": [
    { value: "3.1X", label: "ROAS on Meta prospecting" },
    { value: "44%", label: "CAC reduction · UGC creative testing" },
    { value: "28%", label: "repeat purchase rate · 90 days" },
  ],
  "online-retailers": [
    { value: "320%", label: "organic revenue growth · 11 mo" },
    { value: "2.8X", label: "ROAS on Google Shopping" },
    { value: "41%", label: "catalog page visibility lift" },
  ],
  "amazon-sellers": [
    { value: "187%", label: "off-Amazon traffic · brand site" },
    { value: "2.4X", label: "branded search volume" },
    { value: "31%", label: "listing click-through improvement" },
  ],
  "subscription-boxes": [
    { value: "2.6X", label: "subscriber acquisition · paid social" },
    { value: "19%", label: "churn reduction · retention flows" },
    { value: "38%", label: "LTV increase · first-year cohort" },
  ],
  "b2b-ecommerce": [
    { value: "156%", label: "quote requests · catalog SEO" },
    { value: "2.3X", label: "account registration growth" },
    { value: "27%", label: "average order value lift" },
  ],
  // Financial Services
  "financial-advisors": [
    { value: "3.5X", label: "consultation bookings · seminar funnel" },
    { value: "$4.2M", label: "AUM pipeline · 14 mo" },
    { value: "18", label: "qualified meetings per month" },
  ],
  insurance: [
    { value: "214%", label: "quote form submissions · 8 mo" },
    { value: "26%", label: "policy bind rate improvement" },
    { value: "$89", label: "cost per bound policy · down from $142" },
  ],
  "mortgage-lenders": [
    { value: "2.9X", label: "pre-approval applications · rate-intent SEO" },
    { value: "33%", label: "application-to-funded loan rate" },
    { value: "$312", label: "cost per funded loan · paid + organic" },
  ],
  banks: [
    { value: "167%", label: "branch appointment bookings" },
    { value: "2.2X", label: "product application volume" },
    { value: "Top 3", label: "local pack · 24 branch markets" },
  ],
  "wealth-management": [
    { value: "4.2X", label: "qualified consultation requests" },
    { value: "$6.1M", label: "assets under management pipeline" },
    { value: "31%", label: "seminar attendee-to-client rate" },
  ],
  "credit-unions": [
    { value: "193%", label: "membership applications · community SEO" },
    { value: "24%", label: "product cross-sell rate · email nurture" },
    { value: "14", label: "new accounts per branch per month" },
  ],
  // Professional Services
  "law-firms": [
    { value: "3.7X", label: "consultation requests · practice-area SEO" },
    { value: "$2.4M", label: "case intake pipeline · 12 mo" },
    { value: "34%", label: "intake form completion rate" },
  ],
  dentists: [
    { value: "180+", label: "new patients per month" },
    { value: "4.1X", label: "organic lead growth · 10 mo" },
    { value: "92%", label: "positive review rate" },
  ],
  "medical-practices": [
    { value: "156%", label: "new patient appointments · provider SEO" },
    { value: "47%", label: "online booking share of intake" },
    { value: "3.2X", label: "organic patient lead volume" },
  ],
  accountants: [
    { value: "4.6X", label: "tax-season consultation leads" },
    { value: "22", label: "qualified client inquiries per month" },
    { value: "38%", label: "referral pipeline growth · nurture flows" },
  ],
  consultants: [
    { value: "475%", label: "inbound lead growth · authority content" },
    { value: "28%", label: "shorter proposal cycle" },
    { value: "12", label: "qualified leads per month · blended channels" },
  ],
  "real-estate": [
    { value: "2.8X", label: "buyer inquiry volume · agent SEO" },
    { value: "64%", label: "listing page view growth" },
    { value: "19", label: "qualified showings booked per month" },
  ],
  // Healthcare
  medical: [
    { value: "142%", label: "new patient appointments · 9 mo" },
    { value: "3.4X", label: "provider search visibility" },
    { value: "51%", label: "online scheduling share of bookings" },
  ],
  dental: [
    { value: "168%", label: "new patient bookings · treatment SEO" },
    { value: "4.1X", label: "organic appointment requests" },
    { value: "89%", label: "positive review rate · GBP optimization" },
  ],
  wellness: [
    { value: "2.5X", label: "membership signups · funnel rebuild" },
    { value: "37%", label: "class booking fill rate" },
    { value: "22%", label: "90-day member retention lift" },
  ],
  chiropractors: [
    { value: "134%", label: "new patient bookings · local SEO" },
    { value: "Top 3", label: "local pack · 29 treatment keywords" },
    { value: "44%", label: "landing page conversion rate" },
  ],
  "physical-therapy": [
    { value: "2.3X", label: "referral patient intake volume" },
    { value: "58%", label: "insurance-aware booking completion" },
    { value: "31", label: "new evaluations per month" },
  ],
  pharmacies: [
    { value: "97%", label: "prescription transfer requests · local campaigns" },
    { value: "2.1X", label: "local foot traffic · GBP + social" },
    { value: "1,840", label: "loyalty signups · 6 mo" },
  ],
  // Manufacturing
  industrial: [
    { value: "2.6X", label: "RFQ submissions · technical SEO" },
    { value: "178%", label: "spec-sheet download traffic" },
    { value: "14", label: "sales-qualified leads per month" },
  ],
  "b2b-manufacturing": [
    { value: "$3.1M", label: "ABM pipeline · 15 mo" },
    { value: "3.3X", label: "distributor inquiry volume" },
    { value: "41%", label: "lead scoring accuracy improvement" },
  ],
  automotive: [
    { value: "2.4X", label: "dealer network lead volume" },
    { value: "156%", label: "OEM parts inquiry growth" },
    { value: "22", label: "qualified B2B leads per month" },
  ],
  aerospace: [
    { value: "$4.7M", label: "enterprise pipeline · long-cycle ABM" },
    { value: "67%", label: "spec download-to-meeting rate" },
    { value: "9", label: "qualified opportunities per quarter" },
  ],
  "food-production": [
    { value: "2.2X", label: "distributor inquiry volume" },
    { value: "143%", label: "trade show follow-up conversions" },
    { value: "31%", label: "B2B content-assisted lead share" },
  ],
  packaging: [
    { value: "189%", label: "quote requests · comparison SEO" },
    { value: "3.1X", label: "sales-aligned lead volume" },
    { value: "18", label: "qualified RFQs per month" },
  ],
  // Hospitality
  hotels: [
    { value: "34%", label: "direct booking share · OTA reduction" },
    { value: "2.3X", label: "seasonal occupancy during campaigns" },
    { value: "41%", label: "email rebooking rate · past guests" },
  ],
  resorts: [
    { value: "2.7X", label: "package inquiry volume · multi-channel" },
    { value: "29%", label: "direct booking revenue share" },
    { value: "3.4X", label: "ROAS on seasonal campaigns" },
  ],
  restaurants: [
    { value: "186%", label: "reservation volume · local discovery" },
    { value: "2.5X", label: "foot traffic from social campaigns" },
    { value: "73%", label: "Friday–Saturday table fill rate" },
  ],
  "bars-nightlife": [
    { value: "3.2X", label: "event ticket sales · Meta campaigns" },
    { value: "47%", label: "weekend cover increase · peak nights" },
    { value: "Top 3", label: "local search · nightlife keywords" },
  ],
  cafes: [
    { value: "2.4X", label: "neighborhood foot traffic · Instagram" },
    { value: "1,260", label: "loyalty signups · 5 mo" },
    { value: "31%", label: "repeat visit rate · email program" },
  ],
  "event-venues": [
    { value: "3.6X", label: "inquiry volume · portfolio SEO" },
    { value: "24", label: "tour bookings per month" },
    { value: "52%", label: "inquiry-to-contract conversion" },
  ],
};

function industryOutcomes(industry: IndustryEntry): { value: string; label: string }[] {
  return industryOutcomeMap[industry.slug] ?? [
    { value: "2.5X", label: `qualified lead growth · ${industry.label.toLowerCase()}` },
    { value: "60–90", label: "days to meaningful SEO movement" },
    { value: "14", label: "day paid media learning window" },
  ];
}

function buildIndustryMeta(industry: IndustryEntry, locale: Locale): { title: string; description: string } {
  const label = industry.label;
  const labelLower = label.toLowerCase();

  if (locale === "es") {
    return {
      title: `Marketing para Empresas de ${label} | KINEXIS`,
      description: `Marketing digital para empresas de ${labelLower}. SEO, anuncios pagados, diseño web y CRO orientados a generar ingresos, leads calificados y citas agendadas con KINEXIS.`,
    };
  }

  return {
    title: `Marketing for ${label} Companies | KINEXIS`,
      description: `Digital marketing for ${labelLower} companies. SEO, paid media, web design, and conversion optimization built to generate qualified leads, appointments, and revenue with KINEXIS.`,
  };
}

export function buildIndustryDetailContent(industry: IndustryEntry, locale: Locale): IndustryDetailContent {
  const category = getCategoryById(industry.categoryId);
  const categoryLabel = category?.label || industry.categoryId;

  const serviceItems = industry.primaryServices.map((slug) => ({
    label: serviceLabels[slug as ServiceSlug] || slug,
    href: serviceRoutes[slug as ServiceSlug] || `/services/${slug}`,
    description: industryServiceDescription(slug as ServiceSlug, industry),
  }));

  const solutionMap: Record<string, { href: string; label: string }[]> = {
    hvac: [{ href: "/solutions/seo-for-hvac-companies", label: "SEO for HVAC Companies" }],
    dentists: [{ href: "/solutions/seo-for-dentists", label: "SEO for Dentists" }],
    "law-firms": [{ href: "/solutions/seo-for-law-firms", label: "SEO for Law Firms" }],
    saas: [
      { href: "/solutions/saas-marketing-agency", label: "SaaS Marketing Agency" },
      { href: "/solutions/email-marketing-for-saas", label: "Email Marketing for SaaS" },
    ],
    roofing: [{ href: "/solutions/google-ads-for-roofers", label: "Google Ads for Roofers" }],
    startups: [{ href: "/solutions/startup-marketing-agency", label: "Startup Marketing Agency" }],
    "ai-companies": [{ href: "/solutions/ai-marketing-agency", label: "AI Marketing Agency" }],
  };

  return {
    meta: buildIndustryMeta(industry, locale),
    answerBlock: `KINEXIS provides ${industry.label.toLowerCase()} marketing including ${industry.primaryServices.slice(0, 3).map((s) => serviceLabels[s as ServiceSlug]?.toLowerCase() || s).join(", ")}. We build strategies around how ${industry.label.toLowerCase()} buyers search and decide, not generic agency templates. Most engagements combine SEO and paid media with conversion-focused landing pages. Timelines vary by channel: paid media produces data within days, SEO typically needs 60 to 90 days for meaningful movement.`,
    hero: {
      label: `${categoryLabel} · ${industry.label}`,
      headlineLine1: "Growth marketing",
      headlineLine2: `built for ${industry.label.toLowerCase()}.`,
      subtitle: industry.shortDescription,
    },
    challenges: {
      title: `Why ${industry.label.toLowerCase()} marketing is different`,
      items: industryChallenges(industry),
    },
    strategy: {
      title: "Our approach",
      paragraphs: [
        `We don't apply generic agency playbooks to ${industry.label.toLowerCase()} businesses. Every strategy starts with how your buyers search, evaluate, and decide, then works backward to channel mix, content architecture, and conversion paths.`,
        `For ${industry.label.toLowerCase()} companies, that means ${industry.primaryServices.map((s) => serviceLabels[s as ServiceSlug]?.toLowerCase() || s).join(", ")} working as one integrated system, not disconnected tactics managed by separate vendors.`,
        `Competing locally or scaling nationally, the fundamentals are the same: rankings that stick, campaigns that improve with data, and conversion paths that turn traffic into revenue.`,
      ],
    },
    services: {
      title: "Recommended services",
      items: serviceItems,
    },
    outcomes: {
      title: "Expected outcomes",
      metrics: industryOutcomes(industry),
    },
    faqs: [
      {
        question: `Do you specialize in ${industry.label.toLowerCase()} marketing?`,
        answer: `Yes. We work with ${industry.label.toLowerCase()} companies across ${categoryLabel.toLowerCase()} and build strategies specific to your buyer journey, competitive landscape, and revenue model.`,
      },
      {
        question: "How long before we see results?",
        answer: "Paid media produces data within days. SEO and content typically show meaningful movement in 60 to 90 days. We set clear milestones at kickoff so expectations align with your timeline.",
      },
      {
        question: "Can you work with our existing marketing team?",
        answer: "Absolutely. We collaborate with in-house teams, other agencies, and fractional CMOs. We fill gaps, provide specialized execution, or lead the entire growth program.",
      },
    ],
    relatedSolutions: solutionMap[industry.slug] || [],
  };
}

export const industriesHubContent: Record<Locale, { meta: { title: string; description: string }; hero: { label: string; headlineLine1: string; headlineLine2: string; subtitle: string }; intro: { title: string; paragraphs: string[]; ctaLabel: string } }> = {
  en: {
    meta: {
      title: "Industries We Serve | KINEXIS Digital",
      description:
        "Growth marketing for home services, healthcare, professional services, technology, e-commerce, and more. Strategies built for how your industry searches and buys.",
    },
    hero: {
      label: "Industries",
      headlineLine1: "Enterprise capability",
      headlineLine2: "across every vertical.",
      subtitle: "From local HVAC contractors to venture-backed SaaS platforms,|we build marketing tailored to how your industry buys, not generic agency templates.",
    },
    intro: {
      title: "Built for how your industry buys.",
      paragraphs: [
        "We don't run the same playbook for HVAC contractors and B2B SaaS companies. Each vertical has different search behavior, sales cycles, and conversion paths, and our strategies reflect that.",
        "The industries below are where we've delivered the most measurable results: verified traffic lifts, booked jobs, and pipeline growth tied to real client work.",
        "Don't see yours listed? Tell us what you sell. We'll tell you honestly if we're the right fit.",
      ],
      ctaLabel: "Book a Strategy Call",
    },
  },
  es: {
    meta: {
      title: "Industrias que Servimos | KINEXIS Digital",
      description:
        "Marketing de crecimiento para servicios del hogar, salud, servicios profesionales, tecnología, e-commerce y más. Estrategias a medida por vertical con KINEXIS.",
    },
    hero: { label: "Industrias", headlineLine1: "Capacidad enterprise", headlineLine2: "en cada vertical.", subtitle: "Desde contratistas locales hasta plataformas SaaS,|con sistemas de crecimiento a medida." },
    intro: {
      title: "Diseñado para cómo compra tu industria.",
      paragraphs: [
        "No usamos el mismo playbook para contratistas HVAC y empresas SaaS B2B. Cada vertical tiene distinto comportamiento de búsqueda, ciclos de venta y rutas de conversión, y nuestras estrategias lo reflejan.",
        "Las industrias a continuación son donde hemos entregado los resultados más medibles: aumentos de tráfico verificados, trabajos agendados y crecimiento de pipeline ligado a clientes reales.",
        "¿No ves la tuya? Cuéntanos qué vendes. Te diremos con honestidad si somos la opción adecuada.",
      ],
      ctaLabel: "Reservar una llamada estratégica",
    },
  },};

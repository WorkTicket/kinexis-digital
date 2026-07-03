import type { Locale } from "@/i18n/routing";
import type { IndustryEntry } from "@/content/registry/industries";
import { getCategoryById } from "@/content/registry/industries";
import { serviceLabels, serviceRoutes, type ServiceSlug } from "@/content/registry/site-routes";

function industryServiceDescription(slug: ServiceSlug, industry: IndustryEntry): string {
  const label = industry.label.toLowerCase();
  const byService: Partial<Record<ServiceSlug, string>> = {
    seo: `${industry.label} buyers search before they buy. We build the rankings, content, and local visibility to get you in front of them.`,
    "google-ads": `Paid search and local service ads tuned to ${label} buyer intent, with landing pages and call tracking that tie spend to booked work.`,
    "ppc-management": `Cross-channel paid media for ${label} companies, structured around cost per lead and revenue, not impressions.`,
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

function industryOutcomes(industry: IndustryEntry): { value: string; label: string }[] {
  const map: Record<string, { value: string; label: string }[]> = {
    saas: [
      { value: "65%", label: "trial conversion lift" },
      { value: "40%", label: "CAC reduction" },
      { value: "2.5x", label: "pipeline growth" },
    ],
    hvac: [
      { value: "250+", label: "service calls per month" },
      { value: "3.2x", label: "ROAS on local ads" },
      { value: "Top 3", label: "local pack rankings" },
    ],
    dentists: [
      { value: "180+", label: "new patients per month" },
      { value: "4.1x", label: "organic lead growth" },
      { value: "92%", label: "positive review rate" },
    ],
  };
  return map[industry.slug] || [
    { value: "+340%", label: "traffic · Landscaping Co., 8 mo" },
    { value: "4X", label: "revenue · E-Commerce client, 9 mo" },
    { value: "+340%", label: "patients · Dental Practice, 6 mo" },
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

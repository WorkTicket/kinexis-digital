import type { ServicePhase } from "@/components/ui/ServicePhaseList";
import type { Locale } from "@/i18n/routing";
import type { FAQItem } from "@/components/sections/FAQSection";

export type ChannelContent = {
  channel: string;
  shortLabel: string;
  status: string;
};

export type BudgetSourceContent = {
  source: string;
};

export type ConversionCardContent = {
  label: string;
  desc: string;
  metric: string;
};

export type DataStoryContent = {
  label: string;
  headline: string;
  description: string;
  metric: string;
};

export type PaidAdsContent = {
  hero: {
    label: string;
    headlineLine1: string;
    headlineLine2: string;
    subtitle: string;
    ctaLabel: string;
  };
  channels: ChannelContent[];
  roasDashboard: {
    title: string;
    subtitle: string;
    headerChannel: string;
    headerSpend: string;
    headerRoas: string;
    headerStatus: string;
  };
  budget: {
    title: string;
    subtitle: string;
    sources: BudgetSourceContent[];
  };
  conversion: {
    title: string;
    subtitle: string;
    cards: ConversionCardContent[];
  };
  phases: {
    title: string;
    subtitle: string;
    items: ServicePhase[];
  };
  results: {
    title: string;
    subtitle: string;
    panels: DataStoryContent[];
  };
  cta: {
    headline: string;
    subtitle: string;
    ctaLabel: string;
  };
  faqs: FAQItem[];
};

export const paidAdsContent: Record<Locale, PaidAdsContent> = {
  en: {
    hero: {
      label: "Performance",
      headlineLine1: "Ad spend is an investment.",
      headlineLine2: "Not an expense.",
      subtitle:
        "We build Google and Meta campaigns for ROAS.|Every dollar is optimized toward one metric: booked calls with qualified buyers.",
      ctaLabel: "Audit Your Ad Account",
    },
    channels: [
      { channel: "Google Search", shortLabel: "Google", status: "scaling" },
      { channel: "Google PMax", shortLabel: "Google", status: "optimizing" },
      { channel: "Meta Ads", shortLabel: "Meta", status: "scaling" },
      { channel: "LinkedIn", shortLabel: "LinkedIn", status: "testing" },
    ],
    roasDashboard: {
      title: "ROAS Dashboard",
      subtitle: "Real-time performance metrics across every channel.|Every number is live and actionable.",
      headerChannel: "Channel",
      headerSpend: "Spend %",
      headerRoas: "ROAS",
      headerStatus: "Status",
    },
    budget: {
      title: "Budget follows performance.|Not habit.",
      subtitle:
        "We allocate budget based on channel performance, not convention.|High-ROAS channels get more fuel. Underperformers get fixed or cut.",
      sources: [
        { source: "Search (High Intent)" },
        { source: "Shopping (Product)" },
        { source: "Retargeting" },
        { source: "Display (Awareness)" },
      ],
    },
    conversion: {
      title: "Ads and landing pages that match.",
      subtitle:
        "When the ad promise carries through to the thank-you page,|more people book and fewer leads drop off.",
      cards: [
        {
          label: "Audience targeting",
          desc: "First-party data and lookalikes reach people already searching for what you sell.",
          metric: "94% audience match",
        },
        {
          label: "Message match",
          desc: "Landing pages echo the ad headline so Quality Score and conversion rate both improve.",
          metric: "8.2 avg Quality Score",
        },
        {
          label: "Bid rules that protect margin",
          desc: "Automated rules cut wasted spend before it compounds.",
          metric: "32% less wasted spend",
        },
        {
          label: "Scale with guardrails",
          desc: "Budget grows only when ROAS holds at your target.",
          metric: "4.5x avg ROAS",
        },
      ],
    },
    phases: {
      title: "The 5-phase ad system.",
      subtitle:
        "We don't launch and hope.|Every campaign follows a proven optimization cycle that improves results over time.",
      items: [
        {
          title: "Audit & Structure",
          desc: "Full account review. Campaigns organized by business goal, margin, and intent.",
          metric: "Complete account audit in week 1",
        },
        {
          title: "Audience & Keyword Build",
          desc: "High-intent keywords + precise audience segments + ad copy that speaks directly to need.",
          metric: "Avg. 240 high-intent keywords per campaign",
        },
        {
          title: "Landing Page Alignment",
          desc: "Ad-matched landing pages. Quality Score optimization. Conversion tracking verified.",
          metric: "8.2 avg. Quality Score",
        },
        {
          title: "Launch & Bid Setup",
          desc: "Smart bidding, audience signals, extensions, negative keywords. Right setup from day one.",
          metric: "Campaigns live within 14 days",
        },
        {
          title: "Optimize & Scale",
          desc: "Weekly bid adjustments. Search term mining. A/B testing. Quarterly performance reviews.",
          metric: "ROAS tracked and reported weekly",
        },
      ],
    },
    results: {
      title: "What happens when ads are done right.",
      subtitle: "Predictable, scalable revenue from paid channels,|not clicks and traffic for their own sake.",
      panels: [
        {
          label: "New Patient Growth",
          headline: "Ads tied to booked appointments",
          description:
            "Dental Practice case study: new patient bookings grew from 45 to 198 per month after local SEO and ad restructure.",
          metric: "+340% patients",
        },
        {
          label: "Cost Per Lead",
          headline: "Efficiency at scale",
          description: "Smarter targeting and negative keyword mining drive CPL down as campaigns mature.",
          metric: "-45% CPL",
        },
        {
          label: "Conversion Rate",
          headline: "Clicks that close",
          description:
            "Ad-to-landing-page alignment and conversion tracking optimization lift conversion rates above industry averages.",
          metric: "+120% conv. lift",
        },
      ],
    },
    cta: {
      headline: "Ready to make every click count?",
      subtitle:
        "Get a full ad account audit.|We'll identify wasted spend, high-ROAS opportunities, and a clear path to predictable revenue.",
      ctaLabel: "Audit My Account",
    },
    faqs: [
      { question: "What ad platforms do you manage?", answer: "We manage Google Search, Shopping, Performance Max, Meta (Facebook and Instagram), LinkedIn Ads, and Microsoft Ads. We recommend the right channel mix based on where your buyers are and what your revenue model supports." },
      { question: "What budget do I need to get started?", answer: "Management starts at $2,500/month, separate from your ad spend. The right ad spend depends on your industry, goals, and how quickly you want to scale. We give you a clear recommendation after reviewing your business on a strategy call." },
      { question: "How long until I see results?", answer: "Paid media produces data within days. Meaningful optimization happens in 2–4 weeks. By month 2–3, most clients see ROAS improving significantly as we refine targeting, creative, and landing page alignment." },
      { question: "Do you require a long-term contract?", answer: "No. We work month-to-month. We believe retention should be earned by results, not locked in by contract terms. Most clients stay long-term because the numbers keep improving, and that is their choice to make every month." },
      { question: "How do you report on ad performance?", answer: "Weekly optimization notes covering key changes and their rationale, plus monthly dashboards with spend, ROAS, CPL, conversion rate, and revenue attribution. You always know exactly where your money is going and what it's returning." },
    ],
  },
  es: {
    hero: {
      label: "Rendimiento",
      headlineLine1: "El gasto publicitario",
      headlineLine2: "es una inversión.",
      subtitle:
        "Diseñamos campañas en Google y Meta orientadas al ROAS.|Cada dólar se optimiza hacia una métrica: llamadas agendadas con compradores calificados.",
      ctaLabel: "Auditar Tu Cuenta de Anuncios",
    },
    channels: [
      { channel: "Google Search", shortLabel: "Google", status: "escalando" },
      { channel: "Google PMax", shortLabel: "Google", status: "optimizando" },
      { channel: "Meta Ads", shortLabel: "Meta", status: "escalando" },
      { channel: "LinkedIn", shortLabel: "LinkedIn", status: "probando" },
    ],
    roasDashboard: {
      title: "Panel de ROAS",
      subtitle:
        "Métricas de rendimiento en tiempo real en cada canal.|Cada número es en vivo y accionable.",
      headerChannel: "Canal",
      headerSpend: "Gasto %",
      headerRoas: "ROAS",
      headerStatus: "Estado",
    },
    budget: {
      title: "La asignación de presupuesto es una estrategia. No un detalle menor.",
      subtitle:
        "Asignamos presupuesto según el rendimiento del canal, no por convención.|Los canales con alto ROAS reciben más combustible. Los que rinden menos se corrigen o se eliminan.",
      sources: [
        { source: "Búsqueda (Alta Intención)" },
        { source: "Shopping (Producto)" },
        { source: "Retargeting" },
        { source: "Display (Awareness)" },
      ],
    },
    conversion: {
      title: "Anuncios y landing pages que coinciden.",
      subtitle:
        "Cuando la promesa del anuncio llega hasta la página de agradecimiento,|más personas reservan y menos leads se pierden.",
      cards: [
        {
          label: "Segmentación de audiencia",
          desc: "Datos de primera parte y lookalikes llegan a personas que ya buscan lo que vendes.",
          metric: "94% coincidencia",
        },
        {
          label: "Coherencia de mensaje",
          desc: "Las landing pages repiten el titular del anuncio para mejorar Quality Score y conversión.",
          metric: "8.2 Quality Score prom.",
        },
        {
          label: "Reglas de puja que protegen margen",
          desc: "Reglas automatizadas cortan el gasto desperdiciado antes de que se acumule.",
          metric: "32% menos gasto perdido",
        },
        {
          label: "Escala con límites",
          desc: "El presupuesto crece solo cuando el ROAS se mantiene en tu objetivo.",
          metric: "4.5x ROAS prom.",
        },
      ],
    },
    phases: {
      title: "El sistema de anuncios en 5 fases.",
      subtitle:
        "No lanzamos y rezamos.|Cada campaña sigue un ciclo de optimización probado que acumula resultados con el tiempo.",
      items: [
        {
          title: "Auditoría y Estructura",
          desc: "Revisión completa de la cuenta. Campañas organizadas por objetivo de negocio, margen e intención.",
          metric: "Auditoría completa de cuenta en la semana 1",
        },
        {
          title: "Construcción de Audiencia y Keywords",
          desc: "Keywords de alta intención + segmentos de audiencia precisos + copy que habla directamente a la necesidad.",
          metric: "Prom. 240 keywords de alta intención por campaña",
        },
        {
          title: "Alineación de Landing Page",
          desc: "Landing pages alineadas al anuncio. Optimización de Quality Score. Seguimiento de conversiones verificado.",
          metric: "8.2 Quality Score prom.",
        },
        {
          title: "Lanzamiento y Configuración de Pujas",
          desc: "Pujas inteligentes, señales de audiencia, extensiones, keywords negativas. Configuración correcta desde el día uno.",
          metric: "Campañas activas en 14 días",
        },
        {
          title: "Optimizar y Escalar",
          desc: "Ajustes semanales de pujas. Minería de términos de búsqueda. Pruebas A/B. Revisiones trimestrales de rendimiento.",
          metric: "4.5x ROAS prom.",
        },
      ],
    },
    results: {
      title: "Lo que pasa cuando los anuncios se hacen bien.",
      subtitle: "No solo clics. No solo tráfico.|Ingresos predecibles y escalables desde canales pagados.",
      panels: [
        {
          label: "Retorno de Inversión Publicitaria",
          headline: "Cada dólar trabajando más",
          description:
            "Estructura de campaña, precisión de audiencia y alineación de landing page se combinan en un ROAS que escala.",
          metric: "4.5x ROAS prom.",
        },
        {
          label: "Costo por Lead",
          headline: "Eficiencia a escala",
          description:
            "Segmentación más inteligente y minería de keywords negativas reducen el CPL a medida que las campañas maduran.",
          metric: "-45% CPL",
        },
        {
          label: "Tasa de Conversión",
          headline: "Clics que cierran",
          description:
            "Alineación anuncio-landing page y optimización del seguimiento de conversiones elevan las tasas por encima del promedio del sector.",
          metric: "+120% aumento conv.",
        },
      ],
    },
    cta: {
      headline: "¿Listo para que cada clic cuente?",
      subtitle:
        "Obtén una auditoría completa de tu cuenta de anuncios.|Identificaremos gasto desperdiciado, oportunidades de alto ROAS y un camino claro hacia ingresos predecibles.",
      ctaLabel: "Auditar Mi Cuenta",
    },
    faqs: [
      { question: "¿Qué plataformas publicitarias gestionan?", answer: "Gestionamos Google Search, Shopping, Performance Max, Meta (Facebook e Instagram), LinkedIn Ads y Microsoft Ads. Recomendamos la mezcla de canales adecuada según dónde están tus compradores y qué soporta tu modelo de ingresos." },
      { question: "¿Qué presupuesto necesito para empezar?", answer: "La gestión comienza en $2.500/mes, separado de tu inversión publicitaria. La inversión publicitaria adecuada depende de tu sector, objetivos y la velocidad de escala que buscas. Te damos una recomendación clara tras revisar tu negocio en una llamada de estrategia." },
      { question: "¿Cuándo veré resultados?", answer: "Los medios de pago generan datos en días. La optimización significativa ocurre en 2-4 semanas. En el mes 2-3, la mayoría de clientes ven el ROAS mejorar significativamente a medida que refinamos targeting, creatividades y alineación de landing page." },
      { question: "¿Requieren contratos a largo plazo?", answer: "No. Trabajamos mes a mes. Creemos que la retención debe ganarse con resultados, no estar bloqueada por términos de contrato. La mayoría de clientes permanecen a largo plazo porque los números siguen mejorando, pero es su elección cada mes." },
      { question: "¿Cómo informan sobre el rendimiento de los anuncios?", answer: "Notas de optimización semanales con los cambios clave y su justificación, más paneles mensuales con gasto, ROAS, CPL, tasa de conversión y atribución de ingresos. Siempre sabes exactamente a dónde va tu dinero y qué está devolviendo." },
    ],
  },};

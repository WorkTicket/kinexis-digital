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
  capabilityBodies: {
    campaignArchitecture: string;
    keywordResearch: string;
    channelMix: string;
    conversionTracking: string;
    channelStrategy: string;
    attribution: string;
  };
  processIntro: string;
  inlineCtaLabel: string;
  inlineCtaSubtitle: string;
  faqs: FAQItem[];
};

export type MetaAdsPageContent = {
  heroCtaLabel: string;
  capabilityBodies: {
    creativeTesting: string;
    audienceTargeting: string;
    retargeting: string;
  };
  processIntro: string;
  phases: ServicePhase[];
  cta: {
    headline: string;
    subtitle: string;
    ctaLabel: string;
  };
  inlineCtaLabel: string;
  inlineCtaSubtitle: string;
};

export const paidAdsContent: Record<Locale, PaidAdsContent> = {
  en: {
    hero: {
      label: "Performance",
      headlineLine1: "Ad spend is an investment.",
      headlineLine2: "Not an expense.",
      subtitle:
        "We build Google and Meta campaigns for ROAS.|Every dollar is optimized toward one metric: booked calls with qualified buyers.",
      ctaLabel: "Get Your PPC Audit",
    },
    channels: [
      { channel: "Google Search", shortLabel: "Google", status: "scaling" },
      { channel: "Google PMax", shortLabel: "Google", status: "optimizing" },
      { channel: "Meta Ads", shortLabel: "Meta", status: "scaling" },
      { channel: "LinkedIn", shortLabel: "LinkedIn", status: "testing" },
    ],
    roasDashboard: {
      title: "ROAS Dashboard",
      subtitle: "A live view of performance across every channel: spend, ROAS, and conversion rate, all updated in real time so decisions get made on current data, not last week's report.",
      headerChannel: "Channel",
      headerSpend: "Spend %",
      headerRoas: "ROAS",
      headerStatus: "Status",
    },
    budget: {
      title: "Budget follows performance.|Not habit.",
      subtitle:
        "We allocate spend based on what each channel is actually returning, not what felt right last quarter. High-ROAS channels get more fuel, underperformers get restructured or cut, and every reallocation is documented with a clear rationale.",
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
          desc: "First-party data and lookalikes reach buyers with demonstrated intent for your offer.",
          metric: "Lookalike + CRM seeds",
        },
        {
          label: "Message match",
          desc: "Landing pages echo the ad headline so conversion rate improves on both Search and social.",
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
      title: "The PPC optimization cycle.",
      subtitle: "Four phases tied to qualified lead cost, not platform vanity metrics.",
      items: [
        {
          title: "Audit & Structure",
          desc: "Full account review. Campaigns organized by intent, margin, and the conversion actions your sales team actually closes.",
          metric: "",
        },
        {
          title: "Keyword & Audience Build",
          desc: "High-intent keywords, negative lists, and audience segments built from CRM data and search term history.",
          metric: "",
        },
        {
          title: "Landing Page Alignment",
          desc: "Ad-matched landing pages, Quality Score optimization, and conversion tracking verified before spend scales.",
          metric: "",
        },
        {
          title: "Optimize & Scale",
          desc: "Weekly search term mining, bid adjustments, and cross-channel budget moves tied to cost per qualified lead.",
          metric: "",
        },
      ],
    },
    results: {
      title: "What happens when ads are done right.",
      subtitle: "Predictable, scalable revenue from paid channels,|not clicks and traffic for their own sake.",
      panels: [
        {
          label: "Emergency Call Growth",
          headline: "Paid traffic tied to booked jobs",
          description:
            "Plumbing Company case study: emergency calls grew from 22 to 94 per month after Google Search restructure, dedicated landing pages, and call tracking rebuilt.",
          metric: "+327% calls",
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
      ctaLabel: "See PPC Pricing",
    },
    capabilityBodies: {
      campaignArchitecture:
        "Most agencies build campaigns around Google's auto-recommendations. We segment by intent, brand, competitor, high-intent generic, so you know exactly which searches produce qualified leads. Every campaign maps to a conversion action your sales team closes, not form fills from tire-kickers.",
      keywordResearch:
        "Search term reports show where money leaks. We pull them every week, promote winning queries, and block irrelevant traffic before it compounds. Negative lists are not a one-time setup. They are a weekly discipline tied to cost per qualified lead.",
      channelMix:
        "When you run Google with Meta or Microsoft, spend should follow cost per qualified lead across platforms, not habit. We compare true CPL from CRM data, reallocate budget toward channels that book revenue, and keep tracking consistent so dashboards and pipeline tell the same story.",
      conversionTracking:
        "Platform dashboards count every form submit. Your sales team counts something else. We wire GA4, enhanced conversions, call tracking, and CRM import so Google optimizes toward leads that close, not page views that never pick up the phone.",
      channelStrategy:
        "Budget lands on the channel that looked good in a pitch deck more often than where your buyers actually convert. We map your offer, sales cycle, and buyer behavior first. Then recommend Google Search, Meta, LinkedIn, or a mix with budget splits tied to testable CPL targets.",
      attribution:
        "The ad dashboard and your CRM should tell the same story. They rarely do on day one. We align pixels, GA4 events, and offline conversion import so every platform optimizes toward qualified leads, and your monthly review matches what sales actually booked.",
    },
    processIntro:
      "Paid media is not a set-and-forget channel. Our cycle runs weekly: restructure by intent, tighten keywords, align landing pages, then scale what produces qualified leads at the lowest cost.",
    inlineCtaLabel: "Review My Ad Account",
    inlineCtaSubtitle:
      "We will audit your Google and cross-channel setup, flag wasted spend, and outline the highest-impact fixes for qualified lead cost.",
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
      ctaLabel: "Obtén Tu Auditoría PPC",
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
        "Una vista en tiempo real del rendimiento en cada canal: gasto, ROAS y tasa de conversión, actualizados al instante para que las decisiones se tomen con datos de hoy, no del informe de la semana pasada.",
      headerChannel: "Canal",
      headerSpend: "Gasto %",
      headerRoas: "ROAS",
      headerStatus: "Estado",
    },
    budget: {
      title: "La asignación de presupuesto es una estrategia. No un detalle menor.",
      subtitle:
        "Asignamos gasto según lo que cada canal está devolviendo realmente, no según lo que funcionó el trimestre pasado. Los canales con alto ROAS reciben más presupuesto, los de bajo rendimiento se reestructuran o se eliminan, y cada reasignación se documenta con una justificación clara.",
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
          desc: "Datos de primera parte y lookalikes llegan a compradores con intención demostrada.",
          metric: "Lookalikes + CRM",
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
      title: "El ciclo de optimización PPC.",
      subtitle: "Cuatro fases ligadas al costo por lead calificado, no a métricas vanidad de plataforma.",
      items: [
        {
          title: "Auditoría y Estructura",
          desc: "Revisión completa de la cuenta. Campañas organizadas por intención, margen y las acciones de conversión que ventas realmente cierra.",
          metric: "",
        },
        {
          title: "Keywords y Audiencias",
          desc: "Keywords de alta intención, listas negativas y segmentos de audiencia construidos desde datos de CRM e historial de términos de búsqueda.",
          metric: "",
        },
        {
          title: "Alineación de Landing Page",
          desc: "Landing pages alineadas al anuncio, optimización de Quality Score y tracking de conversiones verificado antes de escalar el gasto.",
          metric: "",
        },
        {
          title: "Optimizar y Escalar",
          desc: "Minería semanal de términos de búsqueda, ajustes de pujas y movimientos de presupuesto multicanal ligados al costo por lead calificado.",
          metric: "",
        },
      ],
    },
    results: {
      title: "Lo que pasa cuando los anuncios se hacen bien.",
      subtitle: "No solo clics. No solo tráfico.|Ingresos predecibles y escalables desde canales pagados.",
      panels: [
        {
          label: "Crecimiento de Llamadas",
          headline: "Tráfico pagado ligado a trabajos reservados",
          description:
            "Empresa de Plomería: llamadas de emergencia de 22 a 94 por mes tras reestructuración de Google Search, landing pages dedicadas y tracking de llamadas.",
          metric: "+327% llamadas",
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
      ctaLabel: "Ver Precios PPC",
    },
    capabilityBodies: {
      campaignArchitecture:
        "La mayoría de agencias construye campañas alrededor de las auto-recomendaciones de Google. Nosotros segmentamos por intención, marca, competencia, genérico de alta intención, para que sepas exactamente qué búsquedas producen leads calificados. Cada campaña mapea a una acción de conversión que ventas cierra, no formularios de curiosos.",
      keywordResearch:
        "Los informes de términos de búsqueda muestran dónde se pierde dinero. Los revisamos cada semana, promovemos consultas ganadoras y bloqueamos tráfico irrelevante antes de que se acumule. Las listas negativas no son configuración única. Son disciplina semanal ligada al costo por lead calificado.",
      channelMix:
        "Cuando corres Google con Meta o Microsoft, el gasto debe seguir el costo por lead calificado en cada plataforma, no la costumbre. Comparamos CPL real desde datos de CRM, reasignamos presupuesto hacia canales que reservan ingresos y mantenemos tracking consistente para que dashboards y pipeline cuenten la misma historia.",
      conversionTracking:
        "Los dashboards de plataforma cuentan cada envío de formulario. Tu equipo de ventas cuenta otra cosa. Conectamos GA4, conversiones mejoradas, tracking de llamadas e importación CRM para que Google optimice hacia leads que cierran, no vistas de página que nunca levantan el teléfono.",
      channelStrategy:
        "El presupuesto cae en el canal que lució bien en un pitch más a menudo que donde tus compradores realmente convierten. Mapeamos tu oferta, ciclo de venta y comportamiento del comprador primero, luego recomendamos Google Search, Meta, LinkedIn o una mezcla con reparto de presupuesto ligado a objetivos de CPL comprobables.",
      attribution:
        "El dashboard de anuncios y tu CRM deberían contar la misma historia. Rara vez lo hacen el día uno. Alineamos píxeles, eventos GA4 e importación de conversiones offline para que cada plataforma optimice hacia leads calificados, y tu revisión mensual coincida con lo que ventas realmente reservó.",
    },
    processIntro:
      "Los medios pagados no son un canal de configurar y olvidar. Nuestro ciclo corre semanalmente: reestructurar por intención, ajustar keywords, alinear landing pages y escalar lo que produce leads calificados al menor costo.",
    inlineCtaLabel: "Revisar Mi Cuenta de Anuncios",
    inlineCtaSubtitle:
      "Auditaremos tu configuración en Google y multicanal, señalaremos gasto desperdiciado y delinearemos las correcciones de mayor impacto para el costo por lead calificado.",
    faqs: [
      { question: "¿Qué plataformas publicitarias gestionan?", answer: "Gestionamos Google Search, Shopping, Performance Max, Meta (Facebook e Instagram), LinkedIn Ads y Microsoft Ads. Recomendamos la mezcla de canales adecuada según dónde están tus compradores y qué soporta tu modelo de ingresos." },
      { question: "¿Qué presupuesto necesito para empezar?", answer: "La gestión comienza en $2.500/mes, separado de tu inversión publicitaria. La inversión publicitaria adecuada depende de tu sector, objetivos y la velocidad de escala que buscas. Te damos una recomendación clara tras revisar tu negocio en una llamada de estrategia." },
      { question: "¿Cuándo veré resultados?", answer: "Los medios de pago generan datos en días. La optimización significativa ocurre en 2-4 semanas. En el mes 2-3, la mayoría de clientes ven el ROAS mejorar significativamente a medida que refinamos targeting, creatividades y alineación de landing page." },
      { question: "¿Requieren contratos a largo plazo?", answer: "No. Trabajamos mes a mes. Creemos que la retención debe ganarse con resultados, no estar bloqueada por términos de contrato. La mayoría de clientes permanecen a largo plazo porque los números siguen mejorando, pero es su elección cada mes." },
      { question: "¿Cómo informan sobre el rendimiento de los anuncios?", answer: "Notas de optimización semanales con los cambios clave y su justificación, más paneles mensuales con gasto, ROAS, CPL, tasa de conversión y atribución de ingresos. Siempre sabes exactamente a dónde va tu dinero y qué está devolviendo." },
    ],
  },
};

export const metaAdsPageContent: Record<Locale, MetaAdsPageContent> = {
  en: {
    heroCtaLabel: "Get Your Meta Ads Audit",
    capabilityBodies: {
      creativeTesting:
        "Meta rewards fresh creative. Most accounts launch three ads and let them run until CPM doubles. We run biweekly sprints with three to five new variations across static, video, and carousel. Each with clear kill and scale rules so fatigue never stalls the account.",
      audienceTargeting:
        "Overlapping prospecting and retargeting pools inflate costs for no reason. We build clean audience layers: cold prospecting from lookalikes and interest stacks, warm engagers from site and video viewers, and hot retargeting with strict exclusions so each pool gets the right message.",
      retargeting:
        "Retargeting is where margin lives, but only when stages are separated. Site visitors, engagers, and cart abandoners each get dedicated creative and budget rules. We shift spend based on blended ROAS, not gut feel, and keep landing pages synced to the ad promise.",
    },
    processIntro:
      "Meta campaigns need a testing rhythm, not a launch-day mindset. Our cycle refreshes creative every two weeks, audits audience overlap monthly, and ties every budget move to cost per qualified lead.",
    phases: [
      {
        title: "Pixel & CAPI Audit",
        desc: "Business Manager review, event mapping, and attribution gaps fixed before spend scales.",
        metric: "",
      },
      {
        title: "Audience Architecture",
        desc: "Prospecting, warm engagers, and retargeting pools built with clean exclusions and CRM seeds.",
        metric: "",
      },
      {
        title: "Creative Sprint Launch",
        desc: "Three to five ad variations per sprint across static, video, and carousel formats.",
        metric: "",
      },
      {
        title: "Scale & Refresh",
        desc: "Winning ads scaled, fatigued creative retired, and budgets shifted by blended ROAS weekly.",
        metric: "",
      },
    ],
    cta: {
      headline: "Ready to fix your Meta account?",
      subtitle:
        "Get a creative and audience audit.|We will show you where fatigue, overlap, and tracking gaps are costing you ROAS.",
      ctaLabel: "See Meta Ads Pricing",
    },
    inlineCtaLabel: "Get a Free Meta Ads Audit",
    inlineCtaSubtitle:
      "We will review your pixel health, audience structure, and creative refresh schedule. Then outline the fastest path to stable ROAS.",
  },
  es: {
    heroCtaLabel: "Obtén Tu Auditoría Meta Ads",
    capabilityBodies: {
      creativeTesting:
        "Meta premia creativos frescos. La mayoría de cuentas lanza tres anuncios y los deja correr hasta que el CPM se duplica. Corremos sprints quincenales con tres a cinco variaciones nuevas en estático, video y carrusel, cada una con reglas claras de corte y escala para que la fatiga no estanque la cuenta.",
      audienceTargeting:
        "Pools superpuestos de prospección y retargeting inflan costos sin razón. Construimos capas limpias de audiencia: prospección fría desde lookalikes y stacks de interés, engagers tibios desde visitantes del sitio y video, y retargeting caliente con exclusiones estrictas para que cada pool reciba el mensaje correcto.",
      retargeting:
        "El retargeting es donde vive el margen, pero solo cuando las etapas están separadas. Visitantes del sitio, engagers y abandonos de carrito reciben creativos y reglas de presupuesto dedicados. Movemos gasto según ROAS combinado, no intuición, y mantenemos landing pages sincronizadas con la promesa del anuncio.",
    },
    processIntro:
      "Las campañas en Meta necesitan ritmo de pruebas, no mentalidad de día de lanzamiento. Nuestro ciclo refresca creativos cada dos semanas, audita superposición de audiencias mensualmente y liga cada movimiento de presupuesto al costo por lead calificado.",
    phases: [
      {
        title: "Auditoría Pixel y CAPI",
        desc: "Revisión de Business Manager, mapeo de eventos y brechas de atribución corregidas antes de escalar gasto.",
        metric: "",
      },
      {
        title: "Arquitectura de Audiencias",
        desc: "Pools de prospección, engagers tibios y retargeting construidos con exclusiones limpias y semillas de CRM.",
        metric: "",
      },
      {
        title: "Lanzamiento Sprint Creativo",
        desc: "Tres a cinco variaciones de anuncio por sprint en formatos estático, video y carrusel.",
        metric: "",
      },
      {
        title: "Escalar y Refrescar",
        desc: "Anuncios ganadores escalados, creativos fatigados retirados y presupuestos ajustados por ROAS combinado semanalmente.",
        metric: "",
      },
    ],
    cta: {
      headline: "¿Listo para arreglar tu cuenta de Meta?",
      subtitle:
        "Obtén una auditoría de creativos y audiencias.|Te mostraremos dónde la fatiga, superposición y brechas de tracking te cuestan ROAS.",
      ctaLabel: "Ver Precios Meta Ads",
    },
    inlineCtaLabel: "Obtén una Auditoría Meta Ads Gratis",
    inlineCtaSubtitle:
      "Revisaremos la salud de tu pixel, estructura de audiencias y calendario de refresco creativo, luego delinearemos el camino más rápido hacia ROAS estable.",
  },
};

import type { Locale } from "@/i18n/routing";
import type { GenericRichServiceContent } from "./generic-rich-service-types";

export const microsoftAdsContent: Record<Locale, GenericRichServiceContent> = {
  en: {
    hero: { ctaLabel: "Start Microsoft Ads" },
    processSection: {
      title: "Engagement timeline",
      subtitle: "From account rebuild to a channel that reports its own leads.",
    },
    processIntro:
      "Microsoft Advertising needs its own structure, not a Google import on autopilot. Our cycle runs from account audit and rebuild through LinkedIn-profile targeting, ad copy testing, dedicated tracking, and monthly optimization. Each phase with a deliverable before spend scales.",
    phases: [
      { title: "Audit & Structure", desc: "Import review, campaign rebuild for Bing intent, and negative keyword foundation.", metric: "" },
      { title: "Targeting & Copy", desc: "LinkedIn-profile layers, audience segments, and ad extensions written for the Microsoft audience.", metric: "" },
      { title: "Tracking & Launch", desc: "UET tags, call tracking, and goals live so every lead ties to the right campaign.", metric: "" },
      { title: "Optimize Monthly", desc: "Bid, budget, and creative adjustments with reporting on CPL and qualified leads.", metric: "" },
    ],
    capabilityBodies: {
      accountSetup:
        "We import your Google account as a starting point, then rebuild what underperforms. Campaign structure, match types, and bids tuned for Microsoft's auction behave differently than Google's, copying them untouched leaves cheaper clicks on the table. Ad schedules, device modifiers, and location targeting get adjusted for an audience that skews older and higher-income. The account stands on its own reporting, not buried inside a Google-only dashboard.",
      audienceTargeting:
        "Microsoft is the only major ad network with LinkedIn-profile targeting built in, company, industry, job function, and almost no advertiser turns it on. We layer professional targeting on top of search intent so B2B campaigns reach decision-makers, not just keyword browsers. Custom segments from customer lists and site retargeting get clean exclusions so prospecting and warm pools never overlap. Negative keyword lists protect budget from irrelevant queries weekly.",
      optimizationReporting:
        "Without dedicated conversion tracking, Microsoft spend looks invisible next to Google and gets cut by default. We set up UET tags, call tracking, and offline import so qualified leads attribute to the campaigns that produced them. Monthly optimization runs on search term reports, bid adjustments, and ad copy tests, reporting CPL and lead volume, not click volume. When the channel performs, budget grows from data, not guesswork.",
    },
    cta: {
      headline: "Ready to reach buyers Google misses at a lower CPC?",
      subtitle: "Let's build a Microsoft Ads program with its own structure,|LinkedIn targeting, and tracking that proves the channel works.",
      ctaLabel: "See Microsoft Ads Pricing",
    },
    inlineCtaLabel: "Review My Microsoft Account",
    inlineCtaSubtitle:
      "We will review your current Microsoft Ads setup, import quality, targeting gaps, tracking, and wasted spend. Then outline the highest-impact fixes.",
  },
  es: {
    hero: { ctaLabel: "Inicia Microsoft Ads" },
    processSection: {
      title: "Cronograma del proyecto",
      subtitle: "Del rebuild de cuenta a un canal que reporta sus propios leads.",
    },
    processIntro:
      "Microsoft Advertising necesita su propia estructura, no una importación de Google en automático. Nuestro ciclo va de auditoría y rebuild de cuenta a targeting con perfiles LinkedIn, pruebas de copy, tracking dedicado y optimización mensual, cada fase con un entregable antes de escalar el gasto.",
    phases: [
      { title: "Auditoría y Estructura", desc: "Revisión de importación, rebuild de campañas para intención Bing y base de keywords negativas.", metric: "" },
      { title: "Targeting y Copy", desc: "Capas de perfiles LinkedIn, segmentos de audiencia y extensiones escritas para la audiencia Microsoft.", metric: "" },
      { title: "Tracking y Lanzamiento", desc: "Etiquetas UET, tracking de llamadas y objetivos en vivo para ligar cada lead a la campaña correcta.", metric: "" },
      { title: "Optimizar Mensualmente", desc: "Ajustes de pujas, presupuesto y creativos con informes de CPL y leads calificados.", metric: "" },
    ],
    capabilityBodies: {
      accountSetup:
        "Importamos tu cuenta de Google como punto de partida y reconstruimos lo que rinde bajo. La estructura de campañas, tipos de concordancia y pujas ajustadas a la subasta de Microsoft se comportan distinto a las de Google, copiarlas sin tocar deja clics más baratos sobre la mesa. Horarios, modificadores de dispositivo y targeting geográfico se ajustan para una audiencia con mayor edad e ingreso. La cuenta tiene su propio reporting, no enterrada en un dashboard solo de Google.",
      audienceTargeting:
        "Microsoft es la única red principal con targeting por perfil LinkedIn integrado, empresa, industria, puesto, y casi ningún anunciante lo activa. Superponemos targeting profesional sobre intención de búsqueda para que campañas B2B lleguen a quien decide, no solo a quien navega keywords. Segmentos personalizados desde listas de clientes y retargeting del sitio con exclusiones limpias para que prospección y pools tibios no se superpongan. Listas negativas protegen el presupuesto de consultas irrelevantes cada semana.",
      optimizationReporting:
        "Sin tracking de conversiones dedicado, el gasto en Microsoft parece invisible frente a Google y se recorta por defecto. Configuramos etiquetas UET, tracking de llamadas e importación offline para que leads calificados se atribuyan a las campañas que los produjeron. La optimización mensual corre sobre informes de términos de búsqueda, ajustes de pujas y tests de copy, reportando CPL y volumen de leads, no de clics. Cuando el canal rinde, el presupuesto crece con datos, no con suposiciones.",
    },
    cta: {
      headline: "¿Listo para alcanzar compradores que Google no llega a menor CPC?",
      subtitle: "Construyamos un programa de Microsoft Ads con estructura propia,|targeting LinkedIn y tracking que demuestre que el canal funciona.",
      ctaLabel: "Ver Precios de Microsoft Ads",
    },
    inlineCtaLabel: "Revisar Mi Cuenta Microsoft",
    inlineCtaSubtitle:
      "Revisaremos tu setup actual de Microsoft Ads, calidad de importación, brechas de targeting, tracking y gasto desperdiciado, y delinearemos las correcciones de mayor impacto.",
  },
};

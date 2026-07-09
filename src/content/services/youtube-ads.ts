import type { Locale } from "@/i18n/routing";
import type { ServicePhase } from "@/components/ui/ServicePhaseList";

export type YoutubeAdsContent = {
  hero: {
    ctaLabel: string;
  };
  processSection: {
    title: string;
    subtitle: string;
  };
  processIntro: string;
  phases: ServicePhase[];
  capabilityBodies: {
    campaignStrategy: string;
    creativeProduction: string;
    trackingOptimization: string;
  };
  cta: {
    headline: string;
    subtitle: string;
    ctaLabel: string;
  };
  inlineCtaLabel: string;
  inlineCtaSubtitle: string;
};

export const youtubeAdsContent: Record<Locale, YoutubeAdsContent> = {
  en: {
    hero: {
      ctaLabel: "Start Your YouTube Campaign",
    },
    processSection: {
      title: "Engagement timeline",
      subtitle: "From audience build to a video channel that reports on leads.",
    },
    processIntro:
      "YouTube campaigns need structure before spend scales. Our cycle runs from placement strategy and audience build through creative direction, landing page alignment, tracking setup, and weekly optimization. Each phase with a deliverable you can review before the next dollar goes live.",
    phases: [
      {
        title: "Strategy & Audiences",
        desc: "Placement map across in-stream, in-feed, and Shorts, plus custom segments from customer lists, search intent, and site visitors.",
        metric: "",
      },
      {
        title: "Creative & Hooks",
        desc: "Scripts and edits built around the first five seconds, with two to four hook variations ready to test against the skip button.",
        metric: "",
      },
      {
        title: "Launch & Tracking",
        desc: "Campaigns live with GA4, enhanced conversions, and view-through attribution tied to demo bookings or qualified calls.",
        metric: "",
      },
      {
        title: "Optimize Weekly",
        desc: "Bid, audience, and creative adjustments each week with reporting on view rate, CPA, and conversions, not vanity watch time.",
        metric: "",
      },
    ],
    capabilityBodies: {
      campaignStrategy:
        "We map placements to funnel stage before anyone uploads a video. In-stream catches high-intent viewers mid-research, in-feed reaches people browsing recommendations, and Shorts handles discovery at lower CPM. Each format gets its own campaign with separate budgets so a cold prospect never sees the same message as someone who watched 75% of your last ad. Audience pools pull from customer lists, search intent keywords, competitor channel viewers, and site retargeting, with exclusions clean enough that prospecting and retargeting never overlap.",
      creativeProduction:
        "The first five seconds decide whether YouTube charges you for a view or a skip. We script hooks that name the problem immediately, test two to four openings against each other, and pair every ad with a landing page that repeats the same promise in the headline. Repurposed brand montages do not belong in a performance account. We either cut existing footage into platform-native lengths or brief new shoots with a shot list mapped to the hook test, vertical for Shorts, 15-second cuts for in-stream, longer proof for warm retargeting.",
      trackingOptimization:
        "View-through conversions matter on YouTube. Without them, the channel looks like a branding expense and gets cut when budgets tighten. We set up GA4, enhanced conversions, and view-through windows that match your sales cycle, then report CPA and demo bookings weekly, not completion rate in isolation. Optimization runs on audience performance, placement exclusions, and creative fatigue. When hook CTR drops, new variations ship before CPL climbs.",
    },
    cta: {
      headline: "Ready to turn YouTube into a channel you can measure?",
      subtitle:
        "Let's build intent-based audiences, skip-proof hooks, and tracking|that ties video spend to booked calls, not just watch time.",
      ctaLabel: "See YouTube Ads Pricing",
    },
    inlineCtaLabel: "Review My YouTube Account",
    inlineCtaSubtitle:
      "We will review your current campaigns, audience structure, hook performance, placement waste, and tracking gaps. Then outline the highest-impact fixes before you scale spend.",
  },
  es: {
    hero: {
      ctaLabel: "Inicia Tu Campaña de YouTube",
    },
    processSection: {
      title: "Cronograma del proyecto",
      subtitle: "De la construcción de audiencias a un canal de video que reporta leads.",
    },
    processIntro:
      "Las campañas de YouTube necesitan estructura antes de escalar el gasto. Nuestro ciclo va de la estrategia de placements y construcción de audiencias a dirección creativa, alineación de landing page, setup de tracking y optimización semanal, cada fase con un entregable que revisas antes de que el siguiente dólar salga en vivo.",
    phases: [
      {
        title: "Estrategia y Audiencias",
        desc: "Mapa de placements en in-stream, in-feed y Shorts, más segmentos personalizados desde listas de clientes, intención de búsqueda y visitantes del sitio.",
        metric: "",
      },
      {
        title: "Creativo y Hooks",
        desc: "Guiones y ediciones construidos alrededor de los primeros cinco segundos, con dos a cuatro variaciones de hook listas para probar contra el botón de skip.",
        metric: "",
      },
      {
        title: "Lanzamiento y Tracking",
        desc: "Campañas en vivo con GA4, conversiones mejoradas y atribución view-through ligada a reservas de demo o llamadas calificadas.",
        metric: "",
      },
      {
        title: "Optimizar Semanalmente",
        desc: "Ajustes semanales de pujas, audiencias y creativos con informes de view rate, CPA y conversiones, no tiempo de reproducción vanidad.",
        metric: "",
      },
    ],
    capabilityBodies: {
      campaignStrategy:
        "Mapeamos placements a etapa de embudo antes de que alguien suba un video. In-stream captura viewers de alta intención en plena investigación, in-feed llega a quien navega recomendaciones y Shorts maneja descubrimiento a menor CPM. Cada formato tiene su propia campaña con presupuestos separados para que un prospecto frío nunca vea el mismo mensaje que alguien que vio el 75% de tu último anuncio. Los pools de audiencia se alimentan de listas de clientes, keywords de intención, viewers de canales competidores y retargeting del sitio, con exclusiones lo bastante limpias para que prospección y retargeting nunca se superpongan.",
      creativeProduction:
        "Los primeros cinco segundos deciden si YouTube te cobra una vista o un skip. Escribimos hooks que nombran el problema de inmediato, probamos dos a cuatro aperturas entre sí y emparejamos cada anuncio con una landing page que repite la misma promesa en el titular. Los montajes de marca reciclados no pertenecen a una cuenta de performance. O recortamos material existente a longitudes nativas de plataforma o briefeamos nuevas grabaciones con un shot list mapeado al test de hook, vertical para Shorts, cortes de 15 segundos para in-stream, prueba social más larga para retargeting tibio.",
      trackingOptimization:
        "Las conversiones view-through importan en YouTube. Sin ellas, el canal parece un gasto de branding y se recorta cuando los presupuestos se aprietan. Configuramos GA4, conversiones mejoradas y ventanas view-through que coinciden con tu ciclo de ventas, luego reportamos CPA y reservas de demo semanalmente, no tasa de finalización aislada. La optimización corre sobre rendimiento de audiencia, exclusiones de placement y fatiga creativa. Cuando el CTR del hook cae, nuevas variaciones salen antes de que el CPL suba.",
    },
    cta: {
      headline: "¿Listo para convertir YouTube en un canal que puedas medir?",
      subtitle:
        "Construyamos audiencias por intención, hooks a prueba de skip y tracking|que ligue el gasto en video a llamadas reservadas, no solo tiempo de reproducción.",
      ctaLabel: "Ver Precios de YouTube Ads",
    },
    inlineCtaLabel: "Revisar Mi Cuenta de YouTube",
    inlineCtaSubtitle:
      "Revisaremos tus campañas actuales, estructura de audiencias, rendimiento de hooks, desperdicio en placements y brechas de tracking, y delinearemos las correcciones de mayor impacto antes de escalar el gasto.",
  },
};

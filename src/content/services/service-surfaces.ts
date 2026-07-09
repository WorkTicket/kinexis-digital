import type { SurfaceVariant } from "@/components/services/hero-viz/ServiceSurfacesViz";
import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";

export type ServiceSurface = {
  variant: SurfaceVariant;
  name: string;
  description: string;
};

export type ServiceSurfacesContent = {
  title: string;
  subtitle: string;
  surfaces: ServiceSurface[];
};

/**
 * Per-service "where the work shows up" showcase, three tailored surfaces each,
 * mirroring the web-design device section. Slugs left out (web-design, google-ads)
 * either own a bespoke section or redirect elsewhere.
 */
export const serviceSurfacesContent: Partial<
  Record<ServiceSeoSlug, Record<Locale, ServiceSurfacesContent>>
> = {
  seo: {
    en: {
      title: "Where your rankings|actually live",
      subtitle:
        "Ranking is not a single number on a dashboard. It plays out across the places buyers search, read, and decide.",
      surfaces: [
        { variant: "serp", name: "Search Results", description: "Ranked for the terms your buyers actually type" },
        { variant: "doc", name: "Content Hubs", description: "Topic clusters that earn real authority" },
        { variant: "chart", name: "Rank Tracking", description: "Weekly movement tied to booked calls" },
      ],
    },
    es: {
      title: "Dónde viven realmente|tus posiciones",
      subtitle:
        "Posicionar no es un número en un panel. Ocurre en los lugares donde tus compradores buscan, leen y deciden.",
      surfaces: [
        { variant: "serp", name: "Resultados de Búsqueda", description: "Posicionado para los términos que tus compradores escriben" },
        { variant: "doc", name: "Hubs de Contenido", description: "Clusters temáticos que ganan autoridad real" },
        { variant: "chart", name: "Seguimiento de Rankings", description: "Movimiento semanal ligado a llamadas reservadas" },
      ],
    },
  },

  "local-seo": {
    en: {
      title: "How local customers find you",
      subtitle:
        "Most local demand never scrolls past the map. We make sure you own the spots that turn searches into phone calls.",
      surfaces: [
        { variant: "map", name: "Map Pack", description: "Top three in local results" },
        { variant: "stars", name: "Reviews", description: "A steady stream of real ratings" },
        { variant: "mobile", name: "Near-Me Search", description: "Found the moment someone needs you" },
      ],
    },
    es: {
      title: "Cómo te encuentran los clientes locales",
      subtitle:
        "La mayor parte de la demanda local nunca pasa del mapa. Nos aseguramos de que domines los lugares que convierten búsquedas en llamadas.",
      surfaces: [
        { variant: "map", name: "Map Pack", description: "Top tres en resultados locales" },
        { variant: "stars", name: "Reseñas", description: "Un flujo constante de calificaciones reales" },
        { variant: "mobile", name: "Búsqueda Cercana", description: "Encontrado justo cuando te necesitan" },
      ],
    },
  },

  "ppc-management": {
    en: {
      title: "Every place your|budget works",
      subtitle:
        "A managed account is not one campaign. It is spend distributed across channels and watched against the leads your team closes.",
      surfaces: [
        { variant: "adslot", name: "Search Ads", description: "Top of Google for high intent" },
        { variant: "cart", name: "Shopping", description: "Products in front of ready buyers" },
        { variant: "chart", name: "ROAS Tracking", description: "Budget follows what actually closes" },
      ],
    },
    es: {
      title: "Cada lugar donde|trabaja tu presupuesto",
      subtitle:
        "Una cuenta gestionada no es una sola campaña. Es inversión distribuida entre canales y vigilada contra los leads que tu equipo cierra.",
      surfaces: [
        { variant: "adslot", name: "Anuncios de Búsqueda", description: "Tope de Google para alta intención" },
        { variant: "cart", name: "Shopping", description: "Productos frente a compradores listos" },
        { variant: "chart", name: "Seguimiento de ROAS", description: "El presupuesto sigue lo que cierra" },
      ],
    },
  },

  "meta-ads": {
    en: {
      title: "Where the scroll stops",
      subtitle:
        "Facebook and Instagram reward native creative. We build for each placement instead of forcing one ad everywhere.",
      surfaces: [
        { variant: "social", name: "Feed Ads", description: "Native inside the scroll" },
        { variant: "video", name: "Reels & Stories", description: "Short-form that stops thumbs" },
        { variant: "funnel", name: "Retargeting", description: "Warm audiences down the funnel" },
      ],
    },
    es: {
      title: "Donde se detiene el scroll",
      subtitle:
        "Facebook e Instagram premian el creativo nativo. Construimos para cada ubicación en lugar de forzar un solo anuncio en todas partes.",
      surfaces: [
        { variant: "social", name: "Anuncios en Feed", description: "Nativo dentro del scroll" },
        { variant: "video", name: "Reels e Historias", description: "Formato corto que detiene el dedo" },
        { variant: "funnel", name: "Retargeting", description: "Audiencias cálidas por el embudo" },
      ],
    },
  },

  "paid-ads": {
    en: {
      title: "One budget, every|channel that pays",
      subtitle:
        "Paid growth rarely comes from a single platform. We place spend where the returns are and cut what leaks.",
      surfaces: [
        { variant: "adslot", name: "Search", description: "Intent-driven clicks from Google" },
        { variant: "social", name: "Social", description: "Demand where attention already lives" },
        { variant: "bars", name: "Budget Split", description: "Weighted to the channels with real ROAS" },
      ],
    },
    es: {
      title: "Un presupuesto, cada canal que rinde",
      subtitle:
        "El crecimiento pagado rara vez viene de una sola plataforma. Colocamos la inversión donde están los retornos y cortamos lo que se fuga.",
      surfaces: [
        { variant: "adslot", name: "Búsqueda", description: "Clics por intención desde Google" },
        { variant: "social", name: "Social", description: "Demanda donde ya está la atención" },
        { variant: "bars", name: "Distribución", description: "Ponderada hacia los canales con ROAS real" },
      ],
    },
  },

  "youtube-ads": {
    en: {
      title: "How your video earns attention",
      subtitle:
        "YouTube is a buying signal, not just reach. We run formats that hold viewers and measure watch time instead of guessing.",
      surfaces: [
        { variant: "video", name: "In-Stream", description: "Skippable and bumper placements" },
        { variant: "mobile", name: "Mobile Views", description: "Where most watch time happens" },
        { variant: "chart", name: "View-Through", description: "Attention measured, not assumed" },
      ],
    },
    es: {
      title: "Cómo tu video gana atención",
      subtitle:
        "YouTube es una señal de compra, no solo alcance. Usamos formatos que retienen espectadores y medimos el tiempo de visualización.",
      surfaces: [
        { variant: "video", name: "In-Stream", description: "Ubicaciones saltables y bumper" },
        { variant: "mobile", name: "Vistas Móviles", description: "Donde ocurre la mayor parte del tiempo de visualización" },
        { variant: "chart", name: "View-Through", description: "Atención medida, no supuesta" },
      ],
    },
  },

  "microsoft-ads": {
    en: {
      title: "Reach the search|Google can't sell you",
      subtitle:
        "Microsoft's network carries an older, higher-income audience with far less competition. Same intent, cheaper clicks.",
      surfaces: [
        { variant: "adslot", name: "Bing Search", description: "Ads most competitors ignore" },
        { variant: "browser", name: "Edge & Partners", description: "Reach beyond the Google box" },
        { variant: "bars", name: "Lower CPC", description: "Cheaper clicks, the same buyer intent" },
      ],
    },
    es: {
      title: "Alcanza la búsqueda que Google no te vende",
      subtitle:
        "La red de Microsoft lleva una audiencia mayor y de mayores ingresos con mucha menos competencia. Misma intención, clics más baratos.",
      surfaces: [
        { variant: "adslot", name: "Búsqueda Bing", description: "Anuncios que la mayoría ignora" },
        { variant: "browser", name: "Edge y Socios", description: "Alcance más allá de Google" },
        { variant: "bars", name: "CPC más Bajo", description: "Clics más baratos, la misma intención" },
      ],
    },
  },

  cro: {
    en: {
      title: "Where conversions are|won or lost",
      subtitle:
        "Small changes to the right pages move revenue. We test the moments where visitors decide to act or leave.",
      surfaces: [
        { variant: "browser", name: "Landing Pages", description: "Tested layouts, not opinions" },
        { variant: "funnel", name: "Checkout Flow", description: "Fewer steps, more finishes" },
        { variant: "bars", name: "Test Results", description: "Winners shipped, losers cut" },
      ],
    },
    es: {
      title: "Donde se ganan o pierden las conversiones",
      subtitle:
        "Cambios pequeños en las páginas correctas mueven ingresos. Probamos los momentos donde el visitante decide actuar o irse.",
      surfaces: [
        { variant: "browser", name: "Landing Pages", description: "Diseños probados, no opiniones" },
        { variant: "funnel", name: "Flujo de Checkout", description: "Menos pasos, más finalizaciones" },
        { variant: "bars", name: "Resultados de Pruebas", description: "Ganadores lanzados, perdedores cortados" },
      ],
    },
  },

  "email-marketing": {
    en: {
      title: "Every place your email lands",
      subtitle:
        "A good email adapts to the inbox and the moment. We design for how people actually read, mostly on a phone, mostly fast.",
      surfaces: [
        { variant: "email", name: "The Inbox", description: "Built to get opened, not ignored" },
        { variant: "flow", name: "Automations", description: "Sequences that run without you" },
        { variant: "mobile", name: "Mobile Read", description: "Where most opens really happen" },
      ],
    },
    es: {
      title: "Cada lugar donde aterriza tu email",
      subtitle:
        "Un buen email se adapta al inbox y al momento. Diseñamos para cómo la gente realmente lee: casi siempre en el móvil y rápido.",
      surfaces: [
        { variant: "email", name: "El Inbox", description: "Hecho para abrirse, no ignorarse" },
        { variant: "flow", name: "Automatizaciones", description: "Secuencias que corren solas" },
        { variant: "mobile", name: "Lectura Móvil", description: "Donde ocurren la mayoría de las aperturas" },
      ],
    },
  },

  "content-marketing": {
    en: {
      title: "One idea, every format it deserves",
      subtitle:
        "Good content is not one blog post. We turn a single idea into the formats and channels your audience already uses.",
      surfaces: [
        { variant: "doc", name: "Articles", description: "Written to rank and to convert" },
        { variant: "video", name: "Video & Media", description: "Repurposed across channels" },
        { variant: "chart", name: "Distribution", description: "Reach measured back to pipeline" },
      ],
    },
    es: {
      title: "Una idea, cada formato que merece",
      subtitle:
        "El buen contenido no es un solo artículo. Convertimos una idea en los formatos y canales que tu audiencia ya usa.",
      surfaces: [
        { variant: "doc", name: "Artículos", description: "Escritos para posicionar y convertir" },
        { variant: "video", name: "Video y Medios", description: "Reutilizado entre canales" },
        { variant: "chart", name: "Distribución", description: "Alcance medido de vuelta al pipeline" },
      ],
    },
  },

  copywriting: {
    en: {
      title: "Words carry the sale everywhere",
      subtitle:
        "The same message has to work in a headline, a subject line, and an ad. We write for each so the argument never drops.",
      surfaces: [
        { variant: "doc", name: "Web Copy", description: "Pages that make the case" },
        { variant: "email", name: "Emails", description: "Subject lines people open" },
        { variant: "adslot", name: "Ad Copy", description: "Hooks that earn the click" },
      ],
    },
    es: {
      title: "Las palabras cargan la venta|en todas partes",
      subtitle:
        "El mismo mensaje debe funcionar en un titular, un asunto y un anuncio. Escribimos para cada uno para que el argumento nunca caiga.",
      surfaces: [
        { variant: "doc", name: "Copy Web", description: "Páginas que argumentan la venta" },
        { variant: "email", name: "Emails", description: "Asuntos que la gente abre" },
        { variant: "adslot", name: "Copy de Anuncios", description: "Hooks que ganan el clic" },
      ],
    },
  },

  "social-media": {
    en: {
      title: "Built for the way|each platform works",
      subtitle:
        "A post that lands on Instagram flops on LinkedIn. We plan and produce for each feed instead of cross-posting the same thing.",
      surfaces: [
        { variant: "social", name: "The Feed", description: "Posts built per platform" },
        { variant: "video", name: "Reels", description: "Short-form made to travel" },
        { variant: "calendar", name: "Content Calendar", description: "Consistent, planned, on-brand" },
      ],
    },
    es: {
      title: "Hecho para cómo funciona|cada plataforma",
      subtitle:
        "Un post que funciona en Instagram fracasa en LinkedIn. Planeamos y producimos para cada feed en vez de repetir lo mismo.",
      surfaces: [
        { variant: "social", name: "El Feed", description: "Posts hechos por plataforma" },
        { variant: "video", name: "Reels", description: "Formato corto hecho para viajar" },
        { variant: "calendar", name: "Calendario de Contenido", description: "Constante, planeado, en marca" },
      ],
    },
  },

  "video-marketing": {
    en: {
      title: "One story, cut for every screen",
      subtitle:
        "The same shoot should feed YouTube, your site, and social. We plan for the long cut and the vertical clip from the start.",
      surfaces: [
        { variant: "video", name: "Long-Form", description: "YouTube and on-site features" },
        { variant: "mobile", name: "Short-Form", description: "Vertical clips for social" },
        { variant: "chart", name: "Performance", description: "Watch time tied to goals" },
      ],
    },
    es: {
      title: "Una historia, editada para cada pantalla",
      subtitle:
        "La misma grabación debe alimentar YouTube, tu sitio y social. Planeamos el corte largo y el clip vertical desde el inicio.",
      surfaces: [
        { variant: "video", name: "Formato Largo", description: "YouTube y features en el sitio" },
        { variant: "mobile", name: "Formato Corto", description: "Clips verticales para social" },
        { variant: "chart", name: "Rendimiento", description: "Tiempo de visualización ligado a metas" },
      ],
    },
  },

  branding: {
    en: {
      title: "One brand, consistent everywhere",
      subtitle:
        "A brand is not a logo file. It is the same feeling across your site, your ads, and every profile someone lands on.",
      surfaces: [
        { variant: "palette", name: "Visual Identity", description: "Color, type, and logo system" },
        { variant: "browser", name: "Website", description: "The brand carried across the site" },
        { variant: "social", name: "Social Presence", description: "Consistent everywhere you post" },
      ],
    },
    es: {
      title: "Una marca, consistente en todas partes",
      subtitle:
        "Una marca no es un archivo de logo. Es la misma sensación en tu sitio, tus anuncios y cada perfil donde alguien aterriza.",
      surfaces: [
        { variant: "palette", name: "Identidad Visual", description: "Sistema de color, tipografía y logo" },
        { variant: "browser", name: "Sitio Web", description: "La marca llevada por todo el sitio" },
        { variant: "social", name: "Presencia Social", description: "Consistente donde publiques" },
      ],
    },
  },

  analytics: {
    en: {
      title: "From raw clicks to|clear decisions",
      subtitle:
        "Numbers only help when they connect. We build tracking that follows a visitor from first click to closed revenue.",
      surfaces: [
        { variant: "chart", name: "Dashboards", description: "The numbers that matter, live" },
        { variant: "bars", name: "Attribution", description: "Which channels actually pay" },
        { variant: "flow", name: "Tracking Setup", description: "Clean data from click to close" },
      ],
    },
    es: {
      title: "De clics crudos a decisiones claras",
      subtitle:
        "Los números solo ayudan cuando conectan. Construimos tracking que sigue al visitante del primer clic al ingreso cerrado.",
      surfaces: [
        { variant: "chart", name: "Dashboards", description: "Los números que importan, en vivo" },
        { variant: "bars", name: "Atribución", description: "Qué canales realmente pagan" },
        { variant: "flow", name: "Configuración de Tracking", description: "Datos limpios del clic al cierre" },
      ],
    },
  },

  "growth-consulting": {
    en: {
      title: "Where growth decisions|get made",
      subtitle:
        "Growth is a set of priorities, not a pile of tactics. We find the constraint, sequence the work, and aim budget at what scales.",
      surfaces: [
        { variant: "bars", name: "Growth Audit", description: "Where the real leaks are" },
        { variant: "chart", name: "Roadmap", description: "Quarter-by-quarter priorities" },
        { variant: "flow", name: "Channel Mix", description: "Budget aimed at what scales" },
      ],
    },
    es: {
      title: "Donde se toman las decisiones|de crecimiento",
      subtitle:
        "El crecimiento es un conjunto de prioridades, no un montón de tácticas. Encontramos la restricción y dirigimos el presupuesto a lo que escala.",
      surfaces: [
        { variant: "bars", name: "Auditoría de Crecimiento", description: "Dónde están las fugas reales" },
        { variant: "chart", name: "Roadmap", description: "Prioridades trimestre a trimestre" },
        { variant: "flow", name: "Mix de Canales", description: "Presupuesto dirigido a lo que escala" },
      ],
    },
  },

  funnels: {
    en: {
      title: "Every step from click|to customer",
      subtitle:
        "A funnel is only as strong as its weakest step. We map the whole path and plug the leaks between traffic and revenue.",
      surfaces: [
        { variant: "funnel", name: "Funnel Map", description: "Every step to the sale" },
        { variant: "flow", name: "Automation", description: "Follow-up that never sleeps" },
        { variant: "browser", name: "Landing Pages", description: "Built to move visitors forward" },
      ],
    },
    es: {
      title: "Cada paso del clic al cliente",
      subtitle:
        "Un embudo es tan fuerte como su paso más débil. Mapeamos todo el recorrido y tapamos las fugas entre tráfico e ingresos.",
      surfaces: [
        { variant: "funnel", name: "Mapa del Embudo", description: "Cada paso hacia la venta" },
        { variant: "flow", name: "Automatización", description: "Seguimiento que nunca duerme" },
        { variant: "browser", name: "Landing Pages", description: "Hechas para hacer avanzar al visitante" },
      ],
    },
  },

  "landing-pages": {
    en: {
      title: "One page, one job",
      subtitle:
        "A landing page is not a homepage. Every element points at a single action, and everything that distracts gets cut.",
      surfaces: [
        { variant: "browser", name: "Above the Fold", description: "One goal, no distractions" },
        { variant: "mobile", name: "Mobile", description: "Fast, thumb-friendly, focused" },
        { variant: "cursor", name: "The CTA", description: "One clear action to take" },
      ],
    },
    es: {
      title: "Una página, un trabajo",
      subtitle:
        "Una landing no es una homepage. Cada elemento apunta a una sola acción, y todo lo que distrae se elimina.",
      surfaces: [
        { variant: "browser", name: "Above the Fold", description: "Un objetivo, sin distracciones" },
        { variant: "mobile", name: "Móvil", description: "Rápida, cómoda al pulgar, enfocada" },
        { variant: "cursor", name: "El CTA", description: "Una acción clara para tomar" },
      ],
    },
  },

  "website-maintenance": {
    en: {
      title: "What we watch so|you don't have to",
      subtitle:
        "Neglected sites break at the worst time. We keep the plumbing patched, backed up, and monitored around the clock.",
      surfaces: [
        { variant: "shield", name: "Security", description: "Patched, scanned, protected" },
        { variant: "gauge", name: "Uptime", description: "Monitored around the clock" },
        { variant: "browser", name: "Content Updates", description: "Changes handled fast" },
      ],
    },
    es: {
      title: "Lo que vigilamos para que|tú no tengas que hacerlo",
      subtitle:
        "Los sitios descuidados fallan en el peor momento. Mantenemos la infraestructura parchada, respaldada y monitoreada las 24 horas.",
      surfaces: [
        { variant: "shield", name: "Seguridad", description: "Parchado, escaneado, protegido" },
        { variant: "gauge", name: "Uptime", description: "Monitoreado las 24 horas" },
        { variant: "browser", name: "Actualizaciones", description: "Cambios resueltos rápido" },
      ],
    },
  },

  "website-speed": {
    en: {
      title: "Where every second is measured",
      subtitle:
        "Speed is not one score. It is a set of thresholds Google checks, and the places a slow load costs you the most.",
      surfaces: [
        { variant: "gauge", name: "Core Web Vitals", description: "Green scores that hold" },
        { variant: "mobile", name: "Mobile Speed", description: "Where slow hurts most" },
        { variant: "chart", name: "Load Time", description: "Seconds shaved, bounce cut" },
      ],
    },
    es: {
      title: "Donde cada segundo se mide",
      subtitle:
        "La velocidad no es un solo puntaje. Es un conjunto de umbrales que Google revisa y los lugares donde una carga lenta cuesta más.",
      surfaces: [
        { variant: "gauge", name: "Core Web Vitals", description: "Puntajes verdes que se sostienen" },
        { variant: "mobile", name: "Velocidad Móvil", description: "Donde lo lento más duele" },
        { variant: "chart", name: "Tiempo de Carga", description: "Segundos recortados, rebote reducido" },
      ],
    },
  },

  "marketing-audits": {
    en: {
      title: "What a real audit looks at",
      subtitle:
        "An audit is not a data dump. We grade each channel, then hand you a short list ranked by what will move the needle.",
      surfaces: [
        { variant: "bars", name: "Scorecard", description: "Every channel graded" },
        { variant: "doc", name: "Findings", description: "Prioritized, not a data dump" },
        { variant: "chart", name: "Opportunities", description: "Ranked by likely impact" },
      ],
    },
    es: {
      title: "Lo que revisa una auditoría real",
      subtitle:
        "Una auditoría no es un volcado de datos. Calificamos cada canal y te entregamos una lista corta ordenada por lo que moverá la aguja.",
      surfaces: [
        { variant: "bars", name: "Scorecard", description: "Cada canal calificado" },
        { variant: "doc", name: "Hallazgos", description: "Priorizados, no un volcado de datos" },
        { variant: "chart", name: "Oportunidades", description: "Ordenadas por impacto probable" },
      ],
    },
  },

  "marketing-automation-crm": {
    en: {
      title: "Where your leads actually move",
      subtitle:
        "A CRM should route work, not create it. We wire the triggers, nurtures, and handoffs so nothing slips between marketing and sales.",
      surfaces: [
        { variant: "flow", name: "Workflows", description: "Triggers that route every lead" },
        { variant: "email", name: "Nurture", description: "Right message at the right moment" },
        { variant: "funnel", name: "Pipeline", description: "CRM synced to real revenue" },
      ],
    },
    es: {
      title: "Donde tus leads realmente se mueven",
      subtitle:
        "Un CRM debe distribuir trabajo, no crearlo. Conectamos los triggers, nurtures y handoffs para que nada se escape entre marketing y ventas.",
      surfaces: [
        { variant: "flow", name: "Workflows", description: "Triggers que enrutan cada lead" },
        { variant: "email", name: "Nurture", description: "El mensaje correcto en el momento correcto" },
        { variant: "funnel", name: "Pipeline", description: "CRM sincronizado con ingresos reales" },
      ],
    },
  },

  "fractional-cmo": {
    en: {
      title: "Leadership across the whole team",
      subtitle:
        "A CMO does not run one channel. The job is one plan, clear numbers, and direction for everyone actually doing the work.",
      surfaces: [
        { variant: "bars", name: "Strategy", description: "One plan across every channel" },
        { variant: "chart", name: "KPIs", description: "Numbers leadership can trust" },
        { variant: "flow", name: "Team & Vendors", description: "Direction for everyone executing" },
      ],
    },
    es: {
      title: "Liderazgo en todo el equipo",
      subtitle:
        "Un CMO no maneja un solo canal. El trabajo es un plan, números claros y dirección para todos los que realmente ejecutan.",
      surfaces: [
        { variant: "bars", name: "Estrategia", description: "Un plan en cada canal" },
        { variant: "chart", name: "KPIs", description: "Números en los que confiar" },
        { variant: "flow", name: "Equipo y Proveedores", description: "Dirección para todos los que ejecutan" },
      ],
    },
  },

  "training-workshops": {
    en: {
      title: "Skills your team keeps",
      subtitle:
        "Generic courses fade in a week. We teach against your actual stack, hands on, so the knowledge sticks after we leave.",
      surfaces: [
        { variant: "doc", name: "Curriculum", description: "Built around your real stack" },
        { variant: "browser", name: "Live Workshops", description: "Hands-on, not theory" },
        { variant: "chart", name: "Progress", description: "Skills that stick after" },
      ],
    },
    es: {
      title: "Habilidades que tu equipo conserva",
      subtitle:
        "Los cursos genéricos se olvidan en una semana. Enseñamos sobre tu stack real, con práctica, para que el conocimiento perdure.",
      surfaces: [
        { variant: "doc", name: "Currículum", description: "Construido sobre tu stack real" },
        { variant: "browser", name: "Talleres en Vivo", description: "Práctica, no teoría" },
        { variant: "chart", name: "Progreso", description: "Habilidades que perduran" },
      ],
    },
  },
};

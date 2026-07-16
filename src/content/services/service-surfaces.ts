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

const serviceSurfaceVariants: Record<string, SurfaceVariant[]> = {
  seo: ["serp", "doc", "chart", "flow"],
  "local-seo": ["map", "stars", "mobile", "stars"],
  "ppc-management": ["adslot", "cart", "chart", "funnel"],
  "meta-ads": ["social", "video", "funnel", "chart"],
  "paid-ads": ["adslot", "social", "bars", "cursor"],
  "youtube-ads": ["video", "mobile", "chart", "shield"],
  "microsoft-ads": ["adslot", "browser", "bars", "flow"],
  cro: ["browser", "funnel", "bars", "social"],
  "email-marketing": ["email", "flow", "mobile", "email"],
  "content-marketing": ["doc", "video", "chart", "palette"],
  copywriting: ["doc", "email", "adslot", "browser"],
  "social-media": ["social", "video", "calendar", "chart"],
  "video-marketing": ["video", "mobile", "chart", "calendar"],
  branding: ["palette", "browser", "social", "social"],
  analytics: ["chart", "bars", "flow", "doc"],
  "growth-consulting": ["bars", "chart", "flow", "doc"],
  funnels: ["funnel", "flow", "browser", "funnel"],
  "landing-pages": ["browser", "mobile", "cursor", "bars"],
  "website-maintenance": ["shield", "gauge", "browser", "gauge"],
  "website-speed": ["gauge", "mobile", "chart", "shield"],
  "marketing-audits": ["bars", "doc", "chart", "flow"],
  "marketing-automation-crm": ["flow", "email", "funnel", "email"],
  "fractional-cmo": ["bars", "chart", "flow", "bars"],
  "training-workshops": ["doc", "browser", "chart", "doc"],
};

type ServiceContentLocale = {
  title: string;
  subtitle: string;
  surfaces: { name: string; description: string }[];
};

const serviceSurfacesLocaleContent: Record<string, Record<Locale, ServiceContentLocale>> = {
  seo: {
    en: {
      title: "Where your rankings|actually live",
      subtitle:
        "Ranking is not a single number on a dashboard. It plays out across the places buyers search, read, and decide.",
      surfaces: [
        { name: "Search Results", description: "Ranked for the terms your buyers actually type" },
        { name: "Content Hubs", description: "Topic clusters that earn real authority" },
        { name: "Rank Tracking", description: "Weekly movement tied to booked calls" },
        { name: "Internal Links", description: "Authority routed to pages that convert" },
      ],
    },
    es: {
      title: "Dónde viven realmente|tus posiciones",
      subtitle:
        "Posicionar no es un número en un panel. Ocurre en los lugares donde tus compradores buscan, leen y deciden.",
      surfaces: [
        { name: "Resultados de Búsqueda", description: "Posicionado para los términos que tus compradores escriben" },
        { name: "Hubs de Contenido", description: "Clusters temáticos que ganan autoridad real" },
        { name: "Seguimiento de Rankings", description: "Movimiento semanal ligado a llamadas reservadas" },
        { name: "Enlaces Internos", description: "Autoridad dirigida a páginas que convierten" },
      ],
    },
  },
  "local-seo": {
    en: {
      title: "How local customers find you",
      subtitle:
        "Most local demand never scrolls past the map. We make sure you own the spots that turn searches into phone calls.",
      surfaces: [
        { name: "Map Pack", description: "Top three in local results" },
        { name: "Reviews", description: "A steady stream of real ratings" },
        { name: "Near-Me Search", description: "Found the moment someone needs you" },
        { name: "GBP Posts", description: "Weekly updates that keep the profile active" },
      ],
    },
    es: {
      title: "Cómo te encuentran los clientes locales",
      subtitle:
        "La mayor parte de la demanda local nunca pasa del mapa. Nos aseguramos de que domines los lugares que convierten búsquedas en llamadas.",
      surfaces: [
        { name: "Map Pack", description: "Top tres en resultados locales" },
        { name: "Reseñas", description: "Un flujo constante de calificaciones reales" },
        { name: "Búsqueda Cercana", description: "Encontrado justo cuando te necesitan" },
        { name: "Publicaciones GBP", description: "Actualizaciones semanales que mantienen el perfil activo" },
      ],
    },
  },
  "ppc-management": {
    en: {
      title: "Every place your|budget works",
      subtitle:
        "A managed account is not one campaign. It is spend distributed across channels and watched against the leads your team closes.",
      surfaces: [
        { name: "Search Ads", description: "Top of Google for high intent" },
        { name: "Shopping", description: "Products in front of ready buyers" },
        { name: "ROAS Tracking", description: "Budget follows what actually closes" },
        { name: "Remarketing", description: "Warm traffic brought back to convert" },
      ],
    },
    es: {
      title: "Cada lugar donde|trabaja tu presupuesto",
      subtitle:
        "Una cuenta gestionada no es una sola campaña. Es inversión distribuida entre canales y vigilada contra los leads que tu equipo cierra.",
      surfaces: [
        { name: "Anuncios de Búsqueda", description: "Tope de Google para alta intención" },
        { name: "Shopping", description: "Productos frente a compradores listos" },
        { name: "Seguimiento de ROAS", description: "El presupuesto sigue lo que cierra" },
        { name: "Remarketing", description: "Tráfico cálido traído de vuelta para convertir" },
      ],
    },
  },
  "meta-ads": {
    en: {
      title: "Where the scroll stops",
      subtitle:
        "Facebook and Instagram reward native creative. We build for each placement instead of forcing one ad everywhere.",
      surfaces: [
        { name: "Feed Ads", description: "Native inside the scroll" },
        { name: "Reels & Stories", description: "Short-form that stops thumbs" },
        { name: "Retargeting", description: "Warm audiences down the funnel" },
        { name: "Channel ROAS", description: "Spend weighted to what closes" },
      ],
    },
    es: {
      title: "Donde se detiene el scroll",
      subtitle:
        "Facebook e Instagram premian el creativo nativo. Construimos para cada ubicación en lugar de forzar un solo anuncio en todas partes.",
      surfaces: [
        { name: "Anuncios en Feed", description: "Nativo dentro del scroll" },
        { name: "Reels e Historias", description: "Formato corto que detiene el dedo" },
        { name: "Retargeting", description: "Audiencias cálidas por el embudo" },
        { name: "ROAS por Canal", description: "Inversión ponderada a lo que cierra" },
      ],
    },
  },
  "paid-ads": {
    en: {
      title: "One budget, every|channel that pays",
      subtitle:
        "Paid growth rarely comes from a single platform. We place spend where the returns are and cut what leaks.",
      surfaces: [
        { name: "Search", description: "Intent-driven clicks from Google" },
        { name: "Social", description: "Demand where attention already lives" },
        { name: "Budget Split", description: "Weighted to the channels with real ROAS" },
        { name: "Landing Match", description: "Post-click pages built for the ad" },
      ],
    },
    es: {
      title: "Un presupuesto, cada canal que rinde",
      subtitle:
        "El crecimiento pagado rara vez viene de una sola plataforma. Colocamos la inversión donde están los retornos y cortamos lo que se fuga.",
      surfaces: [
        { name: "Búsqueda", description: "Clics por intención desde Google" },
        { name: "Social", description: "Demanda donde ya está la atención" },
        { name: "Distribución", description: "Ponderada hacia los canales con ROAS real" },
        { name: "Match de Landing", description: "Páginas post-clic hechas para el anuncio" },
      ],
    },
  },
  "youtube-ads": {
    en: {
      title: "How your video earns attention",
      subtitle:
        "YouTube is a buying signal, not just reach. We run formats that hold viewers and measure watch time instead of guessing.",
      surfaces: [
        { name: "In-Stream", description: "Skippable and bumper placements" },
        { name: "Mobile Views", description: "Where most watch time happens" },
        { name: "View-Through", description: "Attention measured, not assumed" },
        { name: "Brand Safety", description: "Placements and exclusions managed" },
      ],
    },
    es: {
      title: "Cómo tu video gana atención",
      subtitle:
        "YouTube es una señal de compra, no solo alcance. Usamos formatos que retienen espectadores y medimos el tiempo de visualización.",
      surfaces: [
        { name: "In-Stream", description: "Ubicaciones saltables y bumper" },
        { name: "Vistas Móviles", description: "Donde ocurre la mayor parte del tiempo de visualización" },
        { name: "View-Through", description: "Atención medida, no supuesta" },
        { name: "Seguridad de Marca", description: "Ubicaciones y exclusiones gestionadas" },
      ],
    },
  },
  "microsoft-ads": {
    en: {
      title: "Reach the search|Google can't sell you",
      subtitle:
        "Microsoft's network carries an older, higher-income audience with far less competition. Same intent, cheaper clicks.",
      surfaces: [
        { name: "Bing Search", description: "Ads most competitors ignore" },
        { name: "Edge & Partners", description: "Reach beyond the Google box" },
        { name: "Lower CPC", description: "Cheaper clicks, the same buyer intent" },
        { name: "Conversion Tracking", description: "Leads attributed to this channel" },
      ],
    },
    es: {
      title: "Alcanza la búsqueda que Google no te vende",
      subtitle:
        "La red de Microsoft lleva una audiencia mayor y de mayores ingresos con mucha menos competencia. Misma intención, clics más baratos.",
      surfaces: [
        { name: "Búsqueda Bing", description: "Anuncios que la mayoría ignora" },
        { name: "Edge y Socios", description: "Alcance más allá de Google" },
        { name: "CPC más Bajo", description: "Clics más baratos, la misma intención" },
        { name: "Seguimiento de Conversiones", description: "Leads atribuidos a este canal" },
      ],
    },
  },
  cro: {
    en: {
      title: "Where conversions are|won or lost",
      subtitle:
        "Small changes to the right pages move revenue. We test the moments where visitors decide to act or leave.",
      surfaces: [
        { name: "Landing Pages", description: "Tested layouts, not opinions" },
        { name: "Checkout Flow", description: "Fewer steps, more finishes" },
        { name: "Test Results", description: "Winners shipped, losers cut" },
        { name: "Social Proof", description: "Reviews and mentions surfaced on-site" },
      ],
    },
    es: {
      title: "Donde se ganan o pierden las conversiones",
      subtitle:
        "Cambios pequeños en las páginas correctas mueven ingresos. Probamos los momentos donde el visitante decide actuar o irse.",
      surfaces: [
        { name: "Landing Pages", description: "Diseños probados, no opiniones" },
        { name: "Flujo de Checkout", description: "Menos pasos, más finalizaciones" },
        { name: "Resultados de Pruebas", description: "Ganadores lanzados, perdedores cortados" },
        { name: "Prueba Social", description: "Reseñas y menciones en el sitio" },
      ],
    },
  },
  "email-marketing": {
    en: {
      title: "Every place your email lands",
      subtitle:
        "A good email adapts to the inbox and the moment. We design for how people actually read, mostly on a phone, mostly fast.",
      surfaces: [
        { name: "The Inbox", description: "Built to get opened, not ignored" },
        { name: "Automations", description: "Sequences that run without you" },
        { name: "Mobile Read", description: "Where most opens really happen" },
        { name: "Lifecycle Email", description: "Nurture that follows the click" },
      ],
    },
    es: {
      title: "Cada lugar donde aterriza tu email",
      subtitle:
        "Un buen email se adapta al inbox y al momento. Diseñamos para cómo la gente realmente lee: casi siempre en el móvil y rápido.",
      surfaces: [
        { name: "El Inbox", description: "Hecho para abrirse, no ignorarse" },
        { name: "Automatizaciones", description: "Secuencias que corren solas" },
        { name: "Lectura Móvil", description: "Donde ocurren la mayoría de las aperturas" },
        { name: "Email de Ciclo", description: "Nurture que sigue al clic" },
      ],
    },
  },
  "content-marketing": {
    en: {
      title: "One idea, every format it deserves",
      subtitle:
        "Good content is not one blog post. We turn a single idea into the formats and channels your audience already uses.",
      surfaces: [
        { name: "Articles", description: "Written to rank and to convert" },
        { name: "Video & Media", description: "Repurposed across channels" },
        { name: "Distribution", description: "Reach measured back to pipeline" },
        { name: "Brand Assets", description: "Templates your team can reuse" },
      ],
    },
    es: {
      title: "Una idea, cada formato que merece",
      subtitle:
        "El buen contenido no es un solo artículo. Convertimos una idea en los formatos y canales que tu audiencia ya usa.",
      surfaces: [
        { name: "Artículos", description: "Escritos para posicionar y convertir" },
        { name: "Video y Medios", description: "Reutilizado entre canales" },
        { name: "Distribución", description: "Alcance medido de vuelta al pipeline" },
        { name: "Activos de Marca", description: "Plantillas que tu equipo reutiliza" },
      ],
    },
  },
  copywriting: {
    en: {
      title: "Words carry the sale everywhere",
      subtitle:
        "The same message has to work in a headline, a subject line, and an ad. We write for each so the argument never drops.",
      surfaces: [
        { name: "Web Copy", description: "Pages that make the case" },
        { name: "Emails", description: "Subject lines people open" },
        { name: "Ad Copy", description: "Hooks that earn the click" },
        { name: "Service Pages", description: "Pages built for local intent" },
      ],
    },
    es: {
      title: "Las palabras cargan la venta|en todas partes",
      subtitle:
        "El mismo mensaje debe funcionar en un titular, un asunto y un anuncio. Escribimos para cada uno para que el argumento nunca caiga.",
      surfaces: [
        { name: "Copy Web", description: "Páginas que argumentan la venta" },
        { name: "Emails", description: "Asuntos que la gente abre" },
        { name: "Copy de Anuncios", description: "Hooks que ganan el clic" },
        { name: "Páginas de Servicio", description: "Páginas hechas para intención local" },
      ],
    },
  },
  "social-media": {
    en: {
      title: "Built for the way|each platform works",
      subtitle:
        "A post that lands on Instagram flops on LinkedIn. We plan and produce for each feed instead of cross-posting the same thing.",
      surfaces: [
        { name: "The Feed", description: "Posts built per platform" },
        { name: "Reels", description: "Short-form made to travel" },
        { name: "Content Calendar", description: "Consistent, planned, on-brand" },
        { name: "Engagement", description: "Comments, shares, and saves that compound" },
      ],
    },
    es: {
      title: "Hecho para cómo funciona|cada plataforma",
      subtitle:
        "Un post que funciona en Instagram fracasa en LinkedIn. Planeamos y producimos para cada feed en vez de repetir lo mismo.",
      surfaces: [
        { name: "El Feed", description: "Posts hechos por plataforma" },
        { name: "Reels", description: "Formato corto hecho para viajar" },
        { name: "Calendario de Contenido", description: "Constante, planeado, en marca" },
        { name: "Engagement", description: "Comentarios, shares y saves que se acumulan" },
      ],
    },
  },
  "video-marketing": {
    en: {
      title: "One story, cut for every screen",
      subtitle:
        "The same shoot should feed YouTube, your site, and social. We plan for the long cut and the vertical clip from the start.",
      surfaces: [
        { name: "Long-Form", description: "YouTube and on-site features" },
        { name: "Short-Form", description: "Vertical clips for social" },
        { name: "Performance", description: "Watch time tied to goals" },
        { name: "Editorial Calendar", description: "Publishing tied to pipeline goals" },
      ],
    },
    es: {
      title: "Una historia, editada para cada pantalla",
      subtitle:
        "La misma grabación debe alimentar YouTube, tu sitio y social. Planeamos el corte largo y el clip vertical desde el inicio.",
      surfaces: [
        { name: "Formato Largo", description: "YouTube y features en el sitio" },
        { name: "Formato Corto", description: "Clips verticales para social" },
        { name: "Rendimiento", description: "Tiempo de visualización ligado a metas" },
        { name: "Calendario Editorial", description: "Publicación ligada a metas de pipeline" },
      ],
    },
  },
  branding: {
    en: {
      title: "One brand, consistent everywhere",
      subtitle:
        "A brand is not a logo file. It is the same feeling across your site, your ads, and every profile someone lands on.",
      surfaces: [
        { name: "Visual Identity", description: "Color, type, and logo system" },
        { name: "Website", description: "The brand carried across the site" },
        { name: "Social Presence", description: "Consistent everywhere you post" },
        { name: "Social Proof", description: "Reviews and mentions surfaced on-site" },
      ],
    },
    es: {
      title: "Una marca, consistente en todas partes",
      subtitle:
        "Una marca no es un archivo de logo. Es la misma sensación en tu sitio, tus anuncios y cada perfil donde alguien aterriza.",
      surfaces: [
        { name: "Identidad Visual", description: "Sistema de color, tipografía y logo" },
        { name: "Sitio Web", description: "La marca llevada por todo el sitio" },
        { name: "Presencia Social", description: "Consistente donde publiques" },
        { name: "Prueba Social", description: "Reseñas y menciones en el sitio" },
      ],
    },
  },
  analytics: {
    en: {
      title: "From raw clicks to|clear decisions",
      subtitle:
        "Numbers only help when they connect. We build tracking that follows a visitor from first click to closed revenue.",
      surfaces: [
        { name: "Dashboards", description: "The numbers that matter, live" },
        { name: "Attribution", description: "Which channels actually pay" },
        { name: "Tracking Setup", description: "Clean data from click to close" },
        { name: "Reports", description: "Clear summaries leadership can act on" },
      ],
    },
    es: {
      title: "De clics crudos a decisiones claras",
      subtitle:
        "Los números solo ayudan cuando conectan. Construimos tracking que sigue al visitante del primer clic al ingreso cerrado.",
      surfaces: [
        { name: "Dashboards", description: "Los números que importan, en vivo" },
        { name: "Atribución", description: "Qué canales realmente pagan" },
        { name: "Configuración de Tracking", description: "Datos limpios del clic al cierre" },
        { name: "Reportes", description: "Resúmenes claros para tomar decisiones" },
      ],
    },
  },
  "growth-consulting": {
    en: {
      title: "Where growth decisions|get made",
      subtitle:
        "Growth is a set of priorities, not a pile of tactics. We find the constraint, sequence the work, and aim budget at what scales.",
      surfaces: [
        { name: "Growth Audit", description: "Where the real leaks are" },
        { name: "Roadmap", description: "Quarter-by-quarter priorities" },
        { name: "Channel Mix", description: "Budget aimed at what scales" },
        { name: "Prioritized Plan", description: "What to do next, in order" },
      ],
    },
    es: {
      title: "Donde se toman las decisiones|de crecimiento",
      subtitle:
        "El crecimiento es un conjunto de prioridades, no un montón de tácticas. Encontramos la restricción y dirigimos el presupuesto a lo que escala.",
      surfaces: [
        { name: "Auditoría de Crecimiento", description: "Dónde están las fugas reales" },
        { name: "Roadmap", description: "Prioridades trimestre a trimestre" },
        { name: "Mix de Canales", description: "Presupuesto dirigido a lo que escala" },
        { name: "Plan Priorizado", description: "Qué hacer después, en orden" },
      ],
    },
  },
  funnels: {
    en: {
      title: "Every step from click|to customer",
      subtitle:
        "A funnel is only as strong as its weakest step. We map the whole path and plug the leaks between traffic and revenue.",
      surfaces: [
        { name: "Funnel Map", description: "Every step to the sale" },
        { name: "Automation", description: "Follow-up that never sleeps" },
        { name: "Landing Pages", description: "Built to move visitors forward" },
        { name: "Remarketing", description: "Warm traffic brought back to convert" },
      ],
    },
    es: {
      title: "Cada paso del clic al cliente",
      subtitle:
        "Un embudo es tan fuerte como su paso más débil. Mapeamos todo el recorrido y tapamos las fugas entre tráfico e ingresos.",
      surfaces: [
        { name: "Mapa del Embudo", description: "Cada paso hacia la venta" },
        { name: "Automatización", description: "Seguimiento que nunca duerme" },
        { name: "Landing Pages", description: "Hechas para hacer avanzar al visitante" },
        { name: "Remarketing", description: "Tráfico cálido traído de vuelta para convertir" },
      ],
    },
  },
  "landing-pages": {
    en: {
      title: "One page, one job",
      subtitle:
        "A landing page is not a homepage. Every element points at a single action, and everything that distracts gets cut.",
      surfaces: [
        { name: "Above the Fold", description: "One goal, no distractions" },
        { name: "Mobile", description: "Fast, thumb-friendly, focused" },
        { name: "The CTA", description: "One clear action to take" },
        { name: "A/B Tests", description: "Headline and CTA winners shipped" },
      ],
    },
    es: {
      title: "Una página, un trabajo",
      subtitle:
        "Una landing no es una homepage. Cada elemento apunta a una sola acción, y todo lo que distrae se elimina.",
      surfaces: [
        { name: "Above the Fold", description: "Un objetivo, sin distracciones" },
        { name: "Móvil", description: "Rápida, cómoda al pulgar, enfocada" },
        { name: "El CTA", description: "Una acción clara para tomar" },
        { name: "Pruebas A/B", description: "Ganadores de titular y CTA lanzados" },
      ],
    },
  },
  "website-maintenance": {
    en: {
      title: "What we watch so|you don't have to",
      subtitle:
        "Neglected sites break at the worst time. We keep the plumbing patched, backed up, and monitored around the clock.",
      surfaces: [
        { name: "Security", description: "Patched, scanned, protected" },
        { name: "Uptime", description: "Monitored around the clock" },
        { name: "Content Updates", description: "Changes handled fast" },
        { name: "Backups", description: "Restorable points if something breaks" },
      ],
    },
    es: {
      title: "Lo que vigilamos para que|tú no tengas que hacerlo",
      subtitle:
        "Los sitios descuidados fallan en el peor momento. Mantenemos la infraestructura parchada, respaldada y monitoreada las 24 horas.",
      surfaces: [
        { name: "Seguridad", description: "Parchado, escaneado, protegido" },
        { name: "Uptime", description: "Monitoreado las 24 horas" },
        { name: "Actualizaciones", description: "Cambios resueltos rápido" },
        { name: "Backups", description: "Puntos de restauración si algo falla" },
      ],
    },
  },
  "website-speed": {
    en: {
      title: "Where every second is measured",
      subtitle:
        "Speed is not one score. It is a set of thresholds Google checks, and the places a slow load costs you the most.",
      surfaces: [
        { name: "Core Web Vitals", description: "Green scores that hold" },
        { name: "Mobile Speed", description: "Where slow hurts most" },
        { name: "Load Time", description: "Seconds shaved, bounce cut" },
        { name: "Caching & CDN", description: "Delivery tuned for real visitors" },
      ],
    },
    es: {
      title: "Donde cada segundo se mide",
      subtitle:
        "La velocidad no es un solo puntaje. Es un conjunto de umbrales que Google revisa y los lugares donde una carga lenta cuesta más.",
      surfaces: [
        { name: "Core Web Vitals", description: "Puntajes verdes que se sostienen" },
        { name: "Velocidad Móvil", description: "Donde lo lento más duele" },
        { name: "Tiempo de Carga", description: "Segundos recortados, rebote reducido" },
        { name: "Caché y CDN", description: "Entrega afinada para visitantes reales" },
      ],
    },
  },
  "marketing-audits": {
    en: {
      title: "What a real audit looks at",
      subtitle:
        "An audit is not a data dump. We grade each channel, then hand you a short list ranked by what will move the needle.",
      surfaces: [
        { name: "Scorecard", description: "Every channel graded" },
        { name: "Findings", description: "Prioritized, not a data dump" },
        { name: "Opportunities", description: "Ranked by likely impact" },
        { name: "Action Plan", description: "What to fix first, with owners" },
      ],
    },
    es: {
      title: "Lo que revisa una auditoría real",
      subtitle:
        "Una auditoría no es un volcado de datos. Calificamos cada canal y te entregamos una lista corta ordenada por lo que moverá la aguja.",
      surfaces: [
        { name: "Scorecard", description: "Cada canal calificado" },
        { name: "Hallazgos", description: "Priorizados, no un volcado de datos" },
        { name: "Oportunidades", description: "Ordenadas por impacto probable" },
        { name: "Plan de Acción", description: "Qué arreglar primero, con responsables" },
      ],
    },
  },
  "marketing-automation-crm": {
    en: {
      title: "Where your leads actually move",
      subtitle:
        "A CRM should route work, not create it. We wire the triggers, nurtures, and handoffs so nothing slips between marketing and sales.",
      surfaces: [
        { name: "Workflows", description: "Triggers that route every lead" },
        { name: "Nurture", description: "Right message at the right moment" },
        { name: "Pipeline", description: "CRM synced to real revenue" },
        { name: "Lifecycle Email", description: "Nurture that follows the click" },
      ],
    },
    es: {
      title: "Donde tus leads realmente se mueven",
      subtitle:
        "Un CRM debe distribuir trabajo, no crearlo. Conectamos los triggers, nurtures y handoffs para que nada se escape entre marketing y ventas.",
      surfaces: [
        { name: "Workflows", description: "Triggers que enrutan cada lead" },
        { name: "Nurture", description: "El mensaje correcto en el momento correcto" },
        { name: "Pipeline", description: "CRM sincronizado con ingresos reales" },
        { name: "Email de Ciclo", description: "Nurture que sigue al clic" },
      ],
    },
  },
  "fractional-cmo": {
    en: {
      title: "Leadership across the whole team",
      subtitle:
        "A CMO does not run one channel. The job is one plan, clear numbers, and direction for everyone actually doing the work.",
      surfaces: [
        { name: "Strategy", description: "One plan across every channel" },
        { name: "KPIs", description: "Numbers leadership can trust" },
        { name: "Team & Vendors", description: "Direction for everyone executing" },
        { name: "Budget Mix", description: "Channels ranked by closed revenue" },
      ],
    },
    es: {
      title: "Liderazgo en todo el equipo",
      subtitle:
        "Un CMO no maneja un solo canal. El trabajo es un plan, números claros y dirección para todos los que realmente ejecutan.",
      surfaces: [
        { name: "Estrategia", description: "Un plan en cada canal" },
        { name: "KPIs", description: "Números en los que confiar" },
        { name: "Equipo y Proveedores", description: "Dirección para todos los que ejecutan" },
        { name: "Mix de Presupuesto", description: "Canales ordenados por ingreso cerrado" },
      ],
    },
  },
  "training-workshops": {
    en: {
      title: "Skills your team keeps",
      subtitle:
        "Generic courses fade in a week. We teach against your actual stack, hands on, so the knowledge sticks after we leave.",
      surfaces: [
        { name: "Curriculum", description: "Built around your real stack" },
        { name: "Live Workshops", description: "Hands-on, not theory" },
        { name: "Progress", description: "Skills that stick after" },
        { name: "Playbooks", description: "Take-home docs your team keeps using" },
      ],
    },
    es: {
      title: "Habilidades que tu equipo conserva",
      subtitle:
        "Los cursos genéricos se olvidan en una semana. Enseñamos sobre tu stack real, con práctica, para que el conocimiento perdure.",
      surfaces: [
        { name: "Currículum", description: "Construido sobre tu stack real" },
        { name: "Talleres en Vivo", description: "Práctica, no teoría" },
        { name: "Progreso", description: "Habilidades que perduran" },
        { name: "Playbooks", description: "Documentos que tu equipo sigue usando" },
      ],
    },
  },
};

export const serviceSurfacesContent: Partial<
  Record<ServiceSeoSlug, Record<Locale, ServiceSurfacesContent>>
> = Object.fromEntries(
  Object.entries(serviceSurfaceVariants).map(([slug, variants]) => {
    const localeContent = serviceSurfacesLocaleContent[slug];
    return [
      slug,
      {
        en: {
          title: localeContent.en.title,
          subtitle: localeContent.en.subtitle,
          surfaces: variants.map((variant, i) => ({
            variant,
            name: localeContent.en.surfaces[i].name,
            description: localeContent.en.surfaces[i].description,
          })),
        },
        es: {
          title: localeContent.es.title,
          subtitle: localeContent.es.subtitle,
          surfaces: variants.map((variant, i) => ({
            variant,
            name: localeContent.es.surfaces[i].name,
            description: localeContent.es.surfaces[i].description,
          })),
        },
      },
    ];
  }),
) as Partial<Record<ServiceSeoSlug, Record<Locale, ServiceSurfacesContent>>>;

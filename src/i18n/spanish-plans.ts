import { PLANS } from "@/lib/content";

export function spanishHomeFaqs(tx: (s: string) => string) {
  return [
    { q: tx("¿Esto sirve para mi tipo de negocio?"), a: tx("Trabajamos con oficios y negocios de servicios en Estados Unidos, como plomería, HVAC, electricidad, jardinería, techos y remodelación. Si la gente busca tu servicio y llama cuando necesita ayuda, estos planes están pensados para ese tipo de negocio.") },
    { q: tx("¿Cuánto cuesta?"), a: tx("Hay cuatro opciones: Website a $97 al mes, Lead System a $197, Plus a $297, u Own It por un solo pago de $1,497. Puedes ver una página de inicio gratis antes de elegir, sin tarjeta y sin obligación.") },
    { q: tx("¿Cómo se cobra?"), a: tx("Los planes mensuales tienen $0 de enganche y son mes a mes desde el lanzamiento, con el precio fijo durante 24 meses. Cancela cuando quieras por texto, correo o Messenger, sin cargo por cancelar. Own It es un solo pago, sin plan mensual.") },
    { q: tx("¿Qué pasa si cancelo?"), a: tx("Cancela cuando quieras por texto, correo o Messenger—no hay cargo por cancelar. Tu sitio sigue en línea hasta el final del período que ya pagaste. Cuando ese período termina, el hosting y la administración se detienen y el sitio sale de línea. Si quieres quedarte con el sitio, pide una compra (un pago único por escrito de los archivos para hospedarlos tú) o pasa a Own It antes de que termine el período pagado.") },
    { q: tx("¿Quién es dueño del sitio?"), a: tx("Con Own It, los archivos son tuyos desde el día del lanzamiento. En los planes mensuales, Kinexis hospeda y administra el sitio mientras el plan esté activo. Una compra es un pago único por escrito de esos archivos para mover el sitio a tu hosting. Pide las condiciones por escrito antes de cancelar si quieres quedarte con el sitio.") },
    { q: tx("¿Qué cubre la garantía de 60 días?"), a: tx("Lead System y Plus incluyen la garantía de 60 días. Si recibes cero leads rastreados durante los primeros 60 días en vivo, condonamos el tercer y cuarto cargo. Se limita a una garantía por negocio y Own It no está incluido.") },
    { q: tx("¿Qué cubre la garantía de devolución en 30 días?"), a: tx("Todos los planes incluyen una garantía de devolución de 30 días. Si no quedas satisfecho con tu sitio en los primeros 30 días desde el lanzamiento, te devolvemos tu pago más reciente completo. Debes pedirlo por escrito. No cubre costos de terceros que ya hayamos pagado.") },
    { q: tx("¿Cuándo estará en línea mi sitio?"), a: tx("Empezamos con la vista previa gratis. Cuando la apruebas y recibimos el contenido necesario, confirmamos por escrito la fecha de lanzamiento. El texto opcional si no contestas empieza tras la aprobación del operador, que suele tardar de 10 a 15 días.") },
    { q: tx("¿Google podrá encontrar mi sitio?"), a: tx("Cada sitio tiene una estructura limpia, páginas rápidas y la configuración básica que Google necesita para leerlo. El SEO continuo no está incluido en los cuatro planes, pero podemos cotizarlo aparte.") },
    { q: tx("¿Qué pasa con las fotos y el video?"), a: tx("Podemos trabajar con tus propias fotos o cotizar fotografía y video por separado. No mostramos trabajos ajenos de una biblioteca de imágenes como si fueran tuyos.") },
    { q: tx("¿Quién escribe el texto?"), a: tx("Podemos usar el texto que ya tienes o cotizar la redacción aparte. Para la vista previa usamos un texto realista de tu oficio, así puedes evaluar el diseño antes de decidir.") },
  ];
}

export function spanishPlans(tx: (s: string) => string) {
  const names: Record<string, string> = {
    website: "Sitio web",
    "lead-system": "Sistema de clientes",
    plus: "Plus (Bilingüe)",
    "own-it": "Hazlo tuyo",
  };
  const copy: Record<string, { tagline: string; kicker: string; note: string; features: [string, string][] }> = {
    website: { tagline: tx("Una casa profesional para tu negocio."), kicker: tx("$0 de enganche, luego"), note: tx("Mes a mes · cancela cuando quieras"), features: [[tx("Sitio para celular"), tx("Hasta 5 páginas")], [tx("Hosting + SSL"), tx("Seguridad y respaldos")], [tx("Cambios chicos*"), tx("Hasta 2 al mes, en 2 días hábiles")], [tx("Leads de formulario"), tx("Sabes cuándo llega una cotización")], [tx("Páginas nuevas"), tx("$99 cada una")]] },
    "lead-system": { tagline: tx("Tu sitio y las herramientas que traen llamadas."), kicker: tx("$0 de enganche, luego"), note: tx("Mes a mes · cancela cuando quieras"), features: [[tx("Sitio para celular"), tx("Hasta 10 páginas, hosting y respaldos")], [tx("Texto si no contestas**"), tx("Extra opcional · requiere línea dedicada")], [tx("Reseñas de Google"), tx("Después de cada trabajo")], [tx("Ajuste del perfil"), tx("En el lanzamiento")], [tx("Llamadas y reporte"), tx("Un reporte al mes")], [tx("Cambios chicos sin tope*"), tx("En 1 día hábil")], [tx("Páginas nuevas"), tx("1 al mes incluida")]] },
    plus: { tagline: tx("Llega a clientes en inglés y en español."), kicker: tx("$0 de enganche, luego"), note: tx("Mes a mes · cancela cuando quieras"), features: [[tx("Sitio bilingüe"), tx("Hasta 20 páginas, inglés y español")], [tx("Texto si no contestas**"), tx("Extra opcional · inglés y español")], [tx("Reseñas de Google"), tx("Inglés y español")], [tx("Ajuste del perfil"), tx("+ 2 publicaciones al mes")], [tx("Llamadas y reporte"), tx("Un reporte al mes")], [tx("Cambios chicos sin tope*"), tx("El mismo día hábil si pides antes del mediodía CT")], [tx("Páginas nuevas"), tx("2 al mes incluidas")]] },
    "own-it": { tagline: tx("Un pago. Un sitio que es tuyo."), kicker: tx("Un pago"), note: tx("Se paga al aprobar la vista previa · sin plan mensual · sin garantía de leads"), features: [[tx("Sitio para celular"), tx("Hasta 10 páginas")], [tx("Archivos tuyos"), tx("Desde el lanzamiento")], [tx("Hosting + SSL"), tx("12 meses incluidos")], [tx("Cambios chicos*"), tx("12 meses, hasta 30 min al mes")], [tx("Dominio"), tx("El primer año incluido")], [tx("Un pago"), tx("Sin plan mensual")]] },
  };
  return PLANS.map((plan) => ({
    ...plan,
    ...copy[plan.slug],
    name: names[plan.slug],
    cta: names[plan.slug],
    suffix: plan.suffix === "/mo" ? tx("/mes") : plan.suffix === "one-time" ? tx("una vez") : plan.suffix,
  }));
}

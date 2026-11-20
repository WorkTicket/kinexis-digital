/**
 * One-off generator for src/i18n/es-cost-bodies.ts and es-pages-bodies.ts
 * Run: node scripts/generate-es-trade-bodies.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

const COST_SLUG_BY_INDUSTRY = {
  plumbing: "plumber-website-cost",
  hvac: "hvac-website-cost",
  electrical: "electrician-website-cost",
  roofing: "roofing-website-cost",
  "garage-doors": "garage-door-website-cost",
  painting: "painting-website-cost",
  remodeling: "remodeling-website-cost",
  landscaping: "landscaping-website-cost",
  "pool-care": "pool-service-website-cost",
  "pressure-washing": "pressure-washing-website-cost",
  "window-cleaning": "window-cleaning-website-cost",
  "yard-care": "lawn-care-website-cost",
  "junk-removal": "junk-removal-website-cost",
  "tree-care": "tree-service-website-cost",
};

const PAGES_SLUG_BY_INDUSTRY = {
  plumbing: "plumbing-website-pages",
  hvac: "hvac-website-pages",
  electrical: "electrician-website-pages",
  roofing: "roofing-website-pages",
  "garage-doors": "garage-door-website-pages",
  painting: "painting-website-pages",
  remodeling: "remodeling-website-pages",
  landscaping: "landscaping-website-pages",
  "pool-care": "pool-service-website-pages",
  "pressure-washing": "pressure-washing-website-pages",
  "window-cleaning": "window-cleaning-website-pages",
  "yard-care": "lawn-care-website-pages",
  "junk-removal": "junk-removal-website-pages",
  "tree-care": "tree-service-website-pages",
};

const PLAN_TABLE = `<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href="/pricing">/pricing</a> y la <a href="/blog/monthly-website-vs-own-it">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>`;

const TWENTY_FOUR_MONTH = `<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>`;

const COMPARE_QUOTES = `<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href="/blog/wix-vs-squarespace-vs-managed-website-contractors">Wix, Squarespace o un sitio administrado</a>.</p>`;

const PREVIEW_PROCESS = `<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>`;

const HIDDEN = `<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href="/blog/missed-call-text-delayed-10dlc">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href="/pricing">los términos de cada plan</a> antes de decidir.</p>`;

function industryPath(slug) {
  return `/industries/${slug}`;
}

function pagesBlogPath(industrySlug) {
  return `/blog/${PAGES_SLUG_BY_INDUSTRY[industrySlug]}`;
}

function costBlogPath(industrySlug) {
  return `/blog/${COST_SLUG_BY_INDUSTRY[industrySlug]}`;
}

/** @type {import('../src/i18n/posts-es.ts').EsPost[]} meta only */
const ES_COST_META = [
  {
    slug: "plumber-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de plomería en 2026?",
    seoTitle: "Costo de un sitio web de plomería | Kinexis Digital",
    excerpt:
      "Precios reales de Kinexis para un sitio de plomería: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
  },
  {
    slug: "hvac-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de HVAC en 2026?",
    seoTitle: "Costo de un sitio web de HVAC | Kinexis Digital",
    excerpt:
      "Precios reales de Kinexis para un sitio de HVAC: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
  },
  {
    slug: "electrician-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de electricidad en 2026?",
    seoTitle: "Costo de un sitio web de electricidad | Kinexis Digital",
    excerpt:
      "Precios reales de Kinexis para un sitio de electricidad: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
  },
  {
    slug: "roofing-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de techos en 2026?",
    seoTitle: "Costo de un sitio web de techos | Kinexis Digital",
    excerpt:
      "Precios reales de Kinexis para un sitio de techos: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
  },
  {
    slug: "garage-door-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de puertas de garaje en 2026?",
    seoTitle: "Costo de un sitio web de puertas de garaje | Kinexis Digital",
    excerpt:
      "Precios reales de Kinexis para un sitio de puertas de garaje: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
  },
  {
    slug: "painting-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de pintura en 2026?",
    seoTitle: "Costo de un sitio web de pintura | Kinexis Digital",
    excerpt:
      "Precios reales de Kinexis para un sitio de pintura: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
  },
  {
    slug: "remodeling-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de remodelación en 2026?",
    seoTitle: "Costo de un sitio web de remodelación | Kinexis Digital",
    excerpt:
      "Precios reales de Kinexis para un sitio de remodelación: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
  },
  {
    slug: "landscaping-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de paisajismo en 2026?",
    seoTitle: "Costo de un sitio web de paisajismo | Kinexis Digital",
    excerpt:
      "Precios reales de Kinexis para un sitio de paisajismo: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
  },
  {
    slug: "pool-service-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de albercas en 2026?",
    seoTitle: "Costo de un sitio web de albercas | Kinexis Digital",
    excerpt:
      "Precios reales de Kinexis para un sitio de albercas: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
  },
  {
    slug: "pressure-washing-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de lavado a presión en 2026?",
    seoTitle: "Costo de un sitio web de lavado a presión | Kinexis Digital",
    excerpt:
      "Precios reales de Kinexis para un sitio de lavado a presión: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
  },
  {
    slug: "window-cleaning-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de limpieza de vidrios en 2026?",
    seoTitle: "Costo de un sitio web de limpieza de vidrios | Kinexis Digital",
    excerpt:
      "Precios reales de Kinexis para un sitio de limpieza de vidrios: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
  },
  {
    slug: "lawn-care-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de césped en 2026?",
    seoTitle: "Costo de un sitio web de césped | Kinexis Digital",
    excerpt:
      "Precios reales de Kinexis para un sitio de césped: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
  },
  {
    slug: "junk-removal-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de retiro de chatarra en 2026?",
    seoTitle: "Costo de un sitio web de retiro de chatarra | Kinexis Digital",
    excerpt: "Precios reales para un sitio de retiro de chatarra: planes desde $97/mes o Own It por $1,497. Vista previa gratis, sin tarjeta.",
  },
  {
    slug: "tree-service-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de servicio de árboles en 2026?",
    seoTitle: "Costo de un sitio web de servicio de árboles | Kinexis Digital",
    excerpt: "Precios reales para un sitio de servicio de árboles: planes desde $97/mes o Own It por $1,497. Vista previa gratis, sin tarjeta.",
  },
];

const COST_TRADES = [
  {
    slug: "plumbing",
    faqNoun: "un sitio de plomería",
    siteLabel: "plomería",
    designAnchor: "diseño web de plomería",
    sceneLead:
      "Imagina un dueño en el garaje con el piso mojado: no quiere leer tu historia de empresa; quiere saber si atiendes fugas en su ciudad y cómo te marca.",
    drivesCostHtml: `<p>Un sitio de plomería puede necesitar páginas separadas para fugas, drenajes y calentadores. Las fotos de trabajos terminados y un horario claro ayudan a que cada cliente sepa qué esperar.</p><p>El precio depende del número de páginas y del plan que elijas, no de un recargo por ser plomero.</p>`,
    payingForHtml:
      "<p>Pagas por páginas que suenan a plomería de verdad: fugas, drenajes y calentadores — no una plantilla genérica con tu nombre encima.</p>",
  },
  {
    slug: "hvac",
    faqNoun: "un sitio de HVAC",
    siteLabel: "HVAC",
    designAnchor: "diseño web de HVAC",
    sceneLead:
      "En agosto, quien busca no quiere un folleto de “soluciones de confort”: quiere saber si mandas técnico sin aire y cuánto tarda en contestar.",
    drivesCostHtml: `<p>El costo en HVAC aparece en las bifurcaciones: reparación sin aire vs cambio de equipo vs mantenimiento. En temporada baja necesitas páginas de mantenimiento visibles cuando baja la urgencia. Líneas de financiamiento solo si de verdad financias. En pleno calor, el seguimiento de llamada perdida suele pagarse solo más rápido que otra foto de stock de familia sonriente.</p>`,
    payingForHtml:
      "<p>Pagas por caminos claros para reparación, cambio y mantenimiento — no una plantilla genérica con tu nombre encima.</p>",
  },
  {
    slug: "electrical",
    faqNoun: "un sitio de electricidad",
    siteLabel: "electricidad",
    designAnchor: "diseño web para electricistas",
    sceneLead:
      "Quien huele a quemado o tiene el breaker que no reinicia no va a leer cinco párrafos de marketing: necesita licencia cerca del teléfono y un siguiente paso obvio.",
    drivesCostHtml: `<p>Los sitios de electricidad gastan presupuesto en confianza y alcance. Señales de licencia junto al teléfono, páginas aparte para tableros, cargadores EV y diagnóstico, y suficiente claridad para que quien compara presupuestos sepa qué está pidiendo. Animaciones vacías no mueven esa decisión.</p>`,
    payingForHtml:
      "<p>Pagas por páginas armadas alrededor de tableros, cargadores EV y diagnóstico — no una plantilla genérica con tu nombre encima.</p>",
  },
  {
    slug: "roofing",
    faqNoun: "un sitio de techos",
    siteLabel: "techos",
    designAnchor: "diseño web de techos",
    sceneLead:
      "Después del granizo, alguien en el celular con dedos mojados quiere ventana de inspección, no un ensayo de marcas de teja.",
    drivesCostHtml: `<p>Las cotizaciones de techos se encarecen en tiempo cuando documentación de tormenta, lenguaje de seguros y galerías antes/después se hacen bien. Reparación y cambio completo no deben compartir una página vaga. Tras el granizo, el formulario de inspección tiene que servir en el teléfono con campos cortos.</p>`,
    payingForHtml:
      "<p>Pagas por páginas de reparaciones, cambios e inspecciones — no una plantilla genérica con tu nombre encima.</p>",
  },
  {
    slug: "garage-doors",
    faqNoun: "un sitio de puertas de garaje",
    siteLabel: "puertas de garaje",
    designAnchor: "diseño web de puertas de garaje",
    sceneLead:
      "A las 7 a.m., con la puerta atascada abierta, el comprador no es el mismo que cotiza un doble nuevo para la remodelación del garaje.",
    drivesCostHtml: `<p>Los sitios de puertas de garaje necesitan separar reparación de resortes, problemas de motor y puertas nuevas. Quien llama el mismo día y quien compra reemplazo no deben aterrizar en el mismo cajón de servicios.</p>`,
    payingForHtml:
      "<p>Pagas por páginas de resortes, motores y puertas nuevas — no una plantilla genérica con tu nombre encima.</p>",
  },
  {
    slug: "painting",
    faqNoun: "un sitio de pintura",
    siteLabel: "pintura",
    designAnchor: "diseño web para pintores",
    sceneLead:
      "Interior, exterior y gabinetes no se venden igual: quien pinta la fachada quiere prueba de trabajos terminados; quien pide gabinetes quiere fotos de cajones, no un formulario eterno.",
    drivesCostHtml: `<p>Los sitios de pintura invierten tiempo en rutas interior vs exterior, expectativas de preparación y galerías de proyectos. Formularios que capturan habitaciones y superficies reducen visitas de estimado vacías.</p>`,
    payingForHtml:
      "<p>Pagas por páginas de pintura interior y exterior — no una plantilla genérica con tu nombre encima.</p>",
  },
  {
    slug: "remodeling",
    faqNoun: "un sitio de remodelación",
    siteLabel: "remodelación",
    designAnchor: "diseño web para remodelación",
    sceneLead:
      "Una cocina o un baño rara vez son llamada de la misma hora: el sitio debe vender consulta y prueba de cuartos terminados, no solo un botón de emergencia copiado de plomería.",
      drivesCostHtml: `<p>En remodelación, las páginas de cocinas y baños pueden mostrar proyectos terminados y explicar cómo empieza una consulta. Separa las reparaciones pequeñas de los proyectos completos para que cada cliente encuentre el servicio adecuado.</p>`,
    payingForHtml:
      "<p>Pagas por páginas de las remodelaciones que sí vendes — no una plantilla genérica con tu nombre encima.</p>",
  },
  {
    slug: "landscaping",
    faqNoun: "un sitio de paisajismo",
    siteLabel: "paisajismo",
    designAnchor: "diseño web de paisajismo",
    sceneLead:
      "Quien quiere corte semanal no debe toparse con un formulario de patio de $40k; quien quiere hardscape necesita fotos de proyectos, no solo “únete a nuestra ruta”.",
    drivesCostHtml: `<p>En paisajismo pesan rutas de mantenimiento vs instalaciones, paquetes estacionales y fotos de jardines reales. Clientes recurrentes de corte y compradores de patio necesitan siguientes pasos distintos.</p>`,
    payingForHtml:
      "<p>Pagas por páginas de mantenimiento y proyectos — no una plantilla genérica con tu nombre encima.</p>",
  },
  {
    slug: "pool-care",
    faqNoun: "un sitio de albercas",
    siteLabel: "albercas",
    designAnchor: "diseño web de servicio de albercas",
    sceneLead:
      "Quien tiene una alberca verde necesita encontrar rápido cómo pedir una reparación. Mantén esa opción separada de la información sobre el servicio semanal.",
    drivesCostHtml: `<p>Los sitios de albercas necesitan claridad ruta vs reparación, páginas de química/planes y ofertas de apertura/cierre. Los dueños quieren una forma simple de empezar servicio sin folleto largo.</p>`,
    payingForHtml:
      "<p>Pagas por páginas de rutas y reparaciones de alberca — no una plantilla genérica con tu nombre encima.</p>",
  },
  {
    slug: "pressure-washing",
    faqNoun: "un sitio de lavado a presión",
    siteLabel: "lavado a presión",
    designAnchor: "diseño web de lavado a presión",
    sceneLead:
      "Casa, concreto y techo son tres conversaciones distintas — a veces tres métodos. Si mezclas todo, el cliente manda un texto vago y tú pierdes tiempo aclarando.",
    drivesCostHtml: `<p>Los sitios de lavado a presión necesitan cotizaciones cortas para casas, concreto y techos, más notas de lavado suave cuando el método cambia. Antes/después y listas claras de superficies reducen mensajes de ida y vuelta.</p>`,
    payingForHtml:
      "<p>Pagas por páginas de casas, concreto y techos — no una plantilla genérica con tu nombre encima.</p>",
  },
  {
    slug: "window-cleaning",
    faqNoun: "un sitio de limpieza de vidrios",
    siteLabel: "limpieza de vidrios",
    designAnchor: "diseño web de limpieza de vidrios",
    sceneLead:
      "Una casa con vidrios altos y un aparador comercial no reservan igual: uno quiere ruta recurrente, el otro horario que no bloquee la puerta a la apertura.",
    drivesCostHtml: `<p>Los sitios de limpieza de vidrios cuestan más cuando residencial, aparadores y rutas recurrentes tienen páginas honestas. Campos de paneles y frecuencia en el formulario evitan adivinar por teléfono.</p>`,
    payingForHtml:
      "<p>Pagas por páginas de casas y aparadores — no una plantilla genérica con tu nombre encima.</p>",
  },
  {
    slug: "yard-care",
    faqNoun: "un sitio de césped",
    siteLabel: "césped",
    designAnchor: "diseño web de cuidado de césped",
    sceneLead:
      "El trabajo de ruta vive o muere por una zona de servicio honesta: publica los barrios que sí alcanzas o pasarás el día diciendo que no.",
    drivesCostHtml: `<p>Los sitios de césped necesitan caminos de alta a ruta vs limpieza puntual, y listas claras (corte, limpieza, desechos de mascotas). Código postal y frecuencia mantienen la planeación de ruta honesta.</p>`,
    payingForHtml:
      "<p>Pagas por páginas de rutas y limpiezas — no una plantilla genérica con tu nombre encima.</p>",
  },
  {
    slug: "junk-removal",
    faqNoun: "un sitio para una empresa de retiro de chatarra",
    siteLabel: "retiro de chatarra",
    designAnchor: "diseño web de retiro de chatarra",
    sceneLead: "Un sofá en la banqueta necesita un teléfono y una ventana de servicio realista; una limpieza de cochera o herencia requiere volumen, acceso y una cotización más detallada.",
    drivesCostHtml: `<p>El costo depende de separar el acarreo urgente de las limpiezas planeadas. Una carga junto a la banqueta necesita llamada fácil y una ventana que sí puedas cumplir. Una cochera o propiedad heredada requiere notas de volumen, escaleras, elevador o códigos de acceso y un formulario breve. Escribir ambos caminos y delimitar la zona según tu calendario de descarga influye en el trabajo, no un recargo misterioso por oficio.</p><p>Las estimaciones con fotos sirven cuando realmente las revisas; aclara si el precio final requiere ver la carga en persona. No prometas recoger cualquier cosa cualquier día. Las rutas recurrentes para caseros o asociaciones solo deben aparecer si de verdad las operas.</p>`,
    payingForHtml: "<p>Pagas por separar acarreos de esta semana y limpiezas grandes, explicar con honestidad cuándo puedes llegar y pedir los datos útiles sobre volumen y acceso. No por un collage genérico con el teléfono escondido.</p>",
  },
  {
    slug: "tree-care",
    faqNoun: "un sitio para una empresa de servicio de árboles",
    siteLabel: "servicio de árboles",
    designAnchor: "diseño web de servicio de árboles",
    sceneLead: "Una rama sobre el techo necesita un teléfono y una ventana de respuesta honesta. Quien planea una poda o tala busca fotos reales del equipo, señales de seguro y una consulta clara.",
    drivesCostHtml: `<p>El costo refleja la diferencia entre emergencias por tormenta y trabajos planeados de copa. Quien llama por una rama caída necesita encontrar el teléfono y saber cuándo responderás. Para podas y talas, hacen falta fotos reales, información de seguro cerca de la llamada y una consulta que no parezca un servicio de grúa. El contenido debe separar esos caminos y limitar la zona a las cuadrillas que realmente puedes enviar.</p><p>Ofrece molienda de tocones solo si es un servicio real. Un distintivo de atención 24/7 genera desconfianza si nadie responde de madrugada. La información de seguridad y seguro junto al teléfono requiere trabajo editorial, no un supuesto “recargo de arborista”.</p>`,
    payingForHtml: "<p>Pagas por páginas distintas para poda, tala y emergencias por tormenta, con señales de seguro cerca del teléfono y fotos reales de cuadrillas y equipo. Las ventanas de respuesta y los servicios se describen con honestidad.</p>",
  },
];

function buildCostBody(trade, meta) {
  const postSlug = COST_SLUG_BY_INDUSTRY[trade.slug];
  const pagesPath = pagesBlogPath(trade.slug);
  const industry = industryPath(trade.slug);

  const lead = `Si estás cotizando ${trade.faqNoun}, empieza con números que puedas verificar — no un “promedio” de foro. ${trade.sceneLead} Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.`;

  const faqs = [
    {
      q: `¿Cuánto cuesta ${trade.faqNoun} con Kinexis?`,
      a: "Website es $97/mes, Lead System es $197/mes, Plus es $297/mes y Own It es $1,497 de una vez. Mira /pricing para inclusiones.",
    },
    {
      q: "¿Hay cargo de configuración?",
      a: "No hay cargos sorpresa de setup. Los planes mensuales son $0 de entrada. Own It es $1,497 únicos por escrito. Cada opción empieza con vista previa gratis del inicio — sin tarjeta ni obligación.",
    },
    {
      q: "¿El sitio es mío en un plan mensual?",
      a: "En planes mensuales, el hosting y la administración siguen mientras pagas. La compra de archivos (buyout) es $1,497 únicos por escrito. Own It incluye propiedad desde el lanzamiento.",
    },
    {
      q: "¿El SEO va incluido en esos precios?",
      a: "Cada sitio sale con estructura clara y páginas de servicio. El SEO continuo se cotiza aparte y no va en los cuatro planes.",
    },
    {
      q: "¿Qué pasa si cancelo un plan mensual?",
      a: "Cancelas cuando quieras sin penalidad. El sitio sigue en línea en el período pagado; después termina el hosting salvo que arregles buyout ($1,497) o pases a Own It antes de que cierre el período.",
    },
    {
      q: "¿Cuánto cuesta el texto por llamada perdida?",
      a: "En Lead System y Plus el texto es opcional: $1/mes por 2.º número más tarifas del operador. En Website y Own It es un add-on de $97/mes. La aprobación del operador suele tardar 10–15 días y no está garantizada.",
    },
  ];

  const sections = [
    { h2: "Precios de Kinexis para sitios de negocios", html: PLAN_TABLE },
    { h2: "Cuánto cuesta en 24 meses", html: TWENTY_FOUR_MONTH },
    {
      h2: "Qué comparar en una cotización",
      html: COMPARE_QUOTES,
    },
    { h2: "Ve el inicio antes de pagar", html: PREVIEW_PROCESS },
    {
      h2: `Qué influye en el costo de un sitio de ${trade.siteLabel}`,
      html: `${trade.drivesCostHtml}<p>Consulta la <a href="${industry}">página de ${trade.siteLabel}</a> y la <a href="${pagesPath}">guía de páginas</a> para ver ejemplos de alcance.</p>`,
    },
    {
      h2: "Define el alcance antes de comparar precios",
      html: `<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para ${trade.siteLabel}, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>`,
    },
    {
      h2: "Considera el tiempo y el mantenimiento",
      html: `<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>`,
    },
    {
      h2: "Verifica los extras y las condiciones",
      html: `<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>`,
    },
    { h2: "Costos y condiciones aparte", html: HIDDEN },
  ];

  return {
    ...meta,
    lead,
    sections,
    faqs,
    bodyOnly: { lead, sections, faqs },
    postSlug,
  };
}

// PAGES shared blocks
const CORE_PAGES = `<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>`;

const HOMEPAGE_WIREFRAME = `<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href="https://pagespeed.web.dev/" rel="noopener noreferrer" target="_blank">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>`;

const NAP_CONSISTENCY = `<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href="https://support.google.com/business/" rel="noopener noreferrer" target="_blank">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>`;

const DEFAULT_PROOF =
  "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>";

const SKIP_DOORWAY = `<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href="/blog/local-seo-get-found-get-called">guía de SEO local</a> y la <a href="/blog/google-business-profile-vs-website">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>`;

const BUILD_ORDER = `<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href="/pricing">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>`;

const SERVICE_PAGE_CHECK = `<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>`;

const PHOTOS_PROOF = `<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>`;

const FORMS_CTA = `<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>`;

const MEASURE_ITERATE = `<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p>`;

const ES_PAGES_META = [
  {
    slug: "plumbing-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de plomería",
    seoTitle: "Qué páginas necesita un sitio de plomería | Kinexis Digital",
    excerpt:
      "Páginas base y de servicio para un sitio de plomería, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
  },
  {
    slug: "hvac-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de HVAC",
    seoTitle: "Qué páginas necesita un sitio de HVAC | Kinexis Digital",
    excerpt:
      "Páginas base y de servicio para un sitio de HVAC, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
  },
  {
    slug: "electrician-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de electricidad",
    seoTitle: "Qué páginas necesita un sitio de electricidad | Kinexis Digital",
    excerpt:
      "Páginas base y de servicio para un sitio de electricidad, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
  },
  {
    slug: "roofing-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de techos",
    seoTitle: "Qué páginas necesita un sitio de techos | Kinexis Digital",
    excerpt:
      "Páginas base y de servicio para un sitio de techos, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
  },
  {
    slug: "garage-door-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de puertas de garaje",
    seoTitle: "Qué páginas necesita un sitio de puertas de garaje | Kinexis Digital",
    excerpt:
      "Páginas base y de servicio para un sitio de puertas de garaje, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
  },
  {
    slug: "painting-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de pintura",
    seoTitle: "Qué páginas necesita un sitio de pintura | Kinexis Digital",
    excerpt:
      "Páginas base y de servicio para un sitio de pintura, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
  },
  {
    slug: "remodeling-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de remodelación",
    seoTitle: "Qué páginas necesita un sitio de remodelación | Kinexis Digital",
    excerpt:
      "Páginas base y de servicio para un sitio de remodelación, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
  },
  {
    slug: "landscaping-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de paisajismo",
    seoTitle: "Qué páginas necesita un sitio de paisajismo | Kinexis Digital",
    excerpt:
      "Páginas base y de servicio para un sitio de paisajismo, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
  },
  {
    slug: "pool-service-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de albercas",
    seoTitle: "Qué páginas necesita un sitio de albercas | Kinexis Digital",
    excerpt:
      "Páginas base y de servicio para un sitio de albercas, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
  },
  {
    slug: "pressure-washing-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de lavado a presión",
    seoTitle: "Qué páginas necesita un sitio de lavado a presión | Kinexis Digital",
    excerpt:
      "Páginas base y de servicio para un sitio de lavado a presión, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
  },
  {
    slug: "window-cleaning-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de limpieza de vidrios",
    seoTitle: "Qué páginas necesita un sitio de limpieza de vidrios | Kinexis Digital",
    excerpt:
      "Páginas base y de servicio para un sitio de limpieza de vidrios, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
  },
  {
    slug: "lawn-care-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de césped",
    seoTitle: "Qué páginas necesita un sitio de césped | Kinexis Digital",
    excerpt:
      "Páginas base y de servicio para un sitio de césped, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
  },
  {
    slug: "junk-removal-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio web de retiro de chatarra",
    seoTitle: "Qué páginas necesita un sitio de retiro de chatarra | Kinexis Digital",
    excerpt: "Páginas base y de servicio para separar acarreos rápidos, limpiezas grandes y cotizaciones sin páginas clonadas por ciudad.",
  },
  {
    slug: "tree-service-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio web de servicio de árboles",
    seoTitle: "Qué páginas necesita un sitio de servicio de árboles | Kinexis Digital",
    excerpt: "Estructura páginas para poda, tala y emergencias por tormenta, con información de seguro visible y sin páginas clonadas por ciudad.",
  },
];

const PAGES_TRADES = [
  {
    industry: "plumbing",
    noun: "plomero",
    nounWithArticle: "un plomero",
    specificH2: "Páginas de servicio de plomería",
    leadFocus:
      "Separa fugas, drenajes y calentadores para que el tráfico de emergencia y de cotización no se mezcle.",
    pagesFaqAnswer:
      "Inicio, servicios para fugas, drenajes y calentadores, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad.",
    servicesHtml: `<p>Las búsquedas de plomería se parten entre pánico y planeación. Una tubería rota quiere un número grande y horario honesto. Una cotización de calentador quiere un formulario corto y marcas que sí instalas. Si esos caminos comparten una página vaga, los dos visitantes dudan — y a Google le cuesta emparejar la consulta correcta.</p><p>Dale a fugas, drenajes y calentadores su propia página. Rutas de emergencia lideran con llamada. Páginas de estimado respiran con fotos de prueba y un formulario de nombre, teléfono, tipo de trabajo y ciudad — nada más en el primer paso.</p>`,
    proofHtml: `<p>Preferred Plumbing Solutions tiene un sitio de plomería en vivo. Su página de inicio destaca Spirit Lake, muestra el teléfono y ofrece solicitar una cotización gratis. También presenta información sobre licencias y separa las reparaciones, la calefacción radiante, los sistemas sin tanque, los drenajes y la obra nueva. Puedes ver el ejemplo en la <a href="/industries/plumbing">página de plomería</a>.</p>`,
  },
  {
    industry: "hvac",
    noun: "HVAC",
    nounWithArticle: "un negocio de HVAC",
    specificH2: "Páginas de servicio de HVAC",
    leadFocus:
      "Mantén reparación, cambio de equipo y mantenimiento en caminos separados para que el trabajo de temporada baja siga visible.",
    pagesFaqAnswer:
      "Inicio, servicios para sin aire, cambio y mantenimiento, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad.",
    servicesHtml: `<p>En temporada de calor, quien se quedó sin aire necesita encontrar cómo pedir una reparación. En los meses más tranquilos, una página de mantenimiento o reemplazo puede ayudar a generar consultas. Mantén esos servicios separados. Incluye información de financiamiento solo si realmente lo ofreces y explica con claridad cualquier precio «desde».</p>`,
  },
  {
    industry: "electrical",
    noun: "electricista",
    nounWithArticle: "un electricista",
    specificH2: "Páginas de servicio de electricidad",
    leadFocus: "Muestra confianza de licencia temprano y da a cargadores EV su propia página cuando ese trabajo es real.",
    pagesFaqAnswer:
      "Inicio, servicios para tableros, cargadores EV y diagnóstico, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad.",
    servicesHtml: `<p>Quien compra electricidad compara confianza tanto como precio. Muestra licencia temprano — cerca del teléfono, no tres scrolls abajo. Tableros, diagnóstico y cargadores EV son trabajos distintos con urgencia distinta. Si instalas cargadores, esa página merece camino de revisión en sitio. Si huele a quemado, la página debe gritar llamar — no invitar a leer folleto largo.</p>`,
  },
  {
    industry: "roofing",
    noun: "techos",
    nounWithArticle: "un negocio de techos",
    specificH2: "Páginas de servicio de techos",
    leadFocus:
      "Separa reparación y cambio completo, y describe proceso de seguro sin prometer resultados de reclamación.",
    pagesFaqAnswer:
      "Inicio, servicios para reparaciones, cambios y llamadas por tormenta, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad.",
    servicesHtml: `<p>Tras el granizo, el dueño quiere ventana de inspección — no novela de marcas de teja. Separa reparación de cambio completo. Puedes explicar cómo documentas daño para seguro sin prometer resultados que no controlas. Formulario corto de inspección: nombre, teléfono, zona de dirección y fotos si es seguro. Fugas activas siguen mereciendo el teléfono sobre todo.</p>`,
  },
  {
    industry: "garage-doors",
    noun: "puertas de garaje",
    nounWithArticle: "un negocio de puertas de garaje",
    specificH2: "Páginas de servicio de puertas de garaje",
    leadFocus:
      "Rutas de resorte/motor de emergencia deben liderar con teléfono; páginas de puerta nueva pueden usar formulario corto de medidas.",
    servicesHtml: `<p>Una puerta atascada a las 7 a.m. no es el mismo comprador que alguien cotizando doble nuevo para remodelar el garaje. Resortes y motores necesitan ruta de reparación con teléfono. Puertas nuevas pueden usar formulario corto (sencilla/doble, material si se sabe, ciudad). Una página vaga de “servicios de garaje” hace trabajar demasiado a los dos.</p>`,
    pagesFaqAnswer:
      "Inicio, servicios para resortes, motores y puertas nuevas, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad.",
  },
  {
    industry: "painting",
    noun: "pintura",
    nounWithArticle: "un contratista de pintura",
    specificH2: "Páginas de servicio de pintura",
    leadFocus: "Separa interior, exterior y gabinetes, y mantén el formulario de estimado corto.",
    pagesFaqAnswer:
      "Inicio, servicios para interior, exterior y gabinetes, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad.",
    servicesHtml: `<p>Interior, exterior y gabinetes se venden distinto. Exterior quiere historias y notas de revestimiento; gabinetes quieren fotos de cajones; interior quiere conteo de cuartos sin formulario de veinte campos. Separa páginas, mantén la petición de estimado corta y deja fotos para después por mensaje cuando confirmes encaje.</p>`,
  },
  {
    industry: "remodeling",
    noun: "remodelación",
    nounWithArticle: "un contratista de remodelación",
    specificH2: "Páginas de servicio de remodelación",
    leadFocus: "Lidera con cuartos terminados y camino de consulta en lugar de lenguaje de llamada de emergencia.",
    pagesFaqAnswer:
      "Inicio, servicios para cocinas, baños y otras remodelaciones que vendes, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad.",
    servicesHtml: `<p>La remodelación rara vez es llamada de la misma hora. Lidera con cuartos que sí construiste y camino de consulta — no banner de emergencia copiado de plantilla de plomero. Cocinas y baños merecen páginas propias. Una nota corta de proceso (recorrido → alcance → calendario) calma compradores más que un “LLAMA YA” que no coincide con cómo vendes.</p>`,
  },
  {
    industry: "landscaping",
    noun: "paisajismo",
    nounWithArticle: "un negocio de paisajismo",
    specificH2: "Páginas de servicio de paisajismo",
    leadFocus:
      "Separa el mantenimiento semanal de los proyectos de diseño y construcción para dirigir cada consulta al servicio adecuado.",
    pagesFaqAnswer:
      "Inicio, servicios para mantenimiento y diseño-obra, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad.",
    servicesHtml: `<p>Quien busca mantenimiento semanal necesita saber si su casa está dentro de la ruta. Quien planea un patio quiere ver proyectos terminados y solicitar una consulta. Separa esas opciones. Para las limpiezas de temporada, pregunta por la ciudad y la semana que prefiere el cliente; usa fotos de jardines que tu equipo haya trabajado.</p>`,
    proofHtml: `<p>A1 Property Services tiene un sitio de paisajismo en vivo. La página de inicio destaca Cedar Falls, separa el cuidado del césped de los proyectos de patios y muestra fotos del antes y después de trabajos reales. También indica las zonas que atiende en el condado de Black Hawk. Consulta estos ejemplos en la <a href="/industries/landscaping">página de paisajismo</a>.</p>`,
  },
  {
    industry: "pool-care",
    noun: "albercas",
    nounWithArticle: "un servicio de albercas",
    specificH2: "Páginas de servicio de albercas",
    leadFocus:
      "Destaca el teléfono para las reparaciones urgentes y mantén las rutas de servicio separadas de los planes de membresía.",
    pagesFaqAnswer:
      "Inicio, servicios para rutas semanales, reparaciones y equipo, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad.",
    servicesHtml: `<p>Quien tiene una alberca verde necesita encontrar el teléfono y saber cuándo responderás. Para las rutas semanales, usa un formulario breve que pregunte el código postal, el día preferido y si la alberca ya se puede usar. Mantén las reparaciones separadas de las membresías.</p>`,
  },
  {
    industry: "pressure-washing",
    noun: "lavado a presión",
    nounWithArticle: "un negocio de lavado a presión",
    specificH2: "Páginas de servicio de lavado a presión",
    leadFocus: "Separa los servicios por superficie y muestra fotos reales del antes y después.",
    pagesFaqAnswer:
      "Inicio, servicios para casas, concreto y techos, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad.",
    servicesHtml: `<p>El lavado de casas, concreto y techos puede requerir métodos distintos. Separa esos servicios y muestra fotos reales del antes y después. Si usas lavado suave en ciertas superficies, explícalo para que el cliente sepa qué esperar.</p>`,
  },
  {
    industry: "window-cleaning",
    noun: "limpieza de vidrios",
    nounWithArticle: "un negocio de limpieza de vidrios",
    specificH2: "Páginas de servicio de limpieza de vidrios",
    leadFocus:
      "Separa vidrio residencial y comercial, y ofrece limpiezas recurrentes como siguiente paso normal.",
    pagesFaqAnswer:
      "Inicio, servicios para casas y aparadores, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad.",
    servicesHtml: `<p>Los clientes residenciales pueden buscar limpiezas recurrentes; los negocios quizá necesiten coordinar el servicio antes de abrir. Explica cada opción por separado. En el formulario, pregunta el número aproximado de ventanas y la frecuencia para preparar una cotización.</p>`,
  },
  {
    industry: "yard-care",
    noun: "césped",
    nounWithArticle: "un negocio de cuidado de césped",
    specificH2: "Páginas de servicio de césped",
    leadFocus:
      "Publica una zona honesta y da a desechos de mascotas su propia página solo cuando esa oferta es real.",
    pagesFaqAnswer:
      "Inicio, servicios para rutas de corte y limpiezas, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad.",
    servicesHtml: `<p>El trabajo por rutas depende de una zona de servicio precisa. Indica los barrios que realmente atiendes. El corte semanal y la recolección de desechos de mascotas son servicios distintos; crea una página para este último solo si lo ofreces. En el formulario de limpieza estacional, pregunta por el código postal y la frecuencia para que el equipo pueda confirmar la cobertura.</p>`,
  },
  {
    industry: "junk-removal",
    noun: "retiro de chatarra",
    nounWithArticle: "una empresa de retiro de chatarra",
    specificH2: "Páginas de servicio para retiro de chatarra",
    leadFocus: "Separa el acarreo rápido de las limpiezas planeadas: cada trabajo necesita un siguiente paso distinto.",
    pagesFaqAnswer: "Inicio; acarreo esta semana; limpiezas de cochera y propiedades heredadas; rutas recurrentes solo si existen; zona; nosotros; reseñas y contacto con teléfono y formulario breve. Evita páginas clonadas por ciudad.",
    servicesHtml: `<p>El sitio falla cuando cada carga termina en una sola página de “retiramos de todo”. Un colchón en la banqueta necesita llamar y conocer una ventana realista. Una cochera o propiedad heredada requiere estimar volumen, acceso y quizá enviar fotos. Si ofreces ambos servicios, sepáralos. Las cargas recurrentes para caseros o asociaciones solo merecen una página si realmente manejas esas rutas.</p><p>Explica cuándo una foto basta para orientar y cuándo necesitas visitar para dar el precio final. No prometas servicio el mismo día fuera de tu zona o de tu horario. Consulta la página de <a href="/industries/junk-removal">retiro de chatarra</a> para ver el enfoque del sitio.</p>`,
  },
  {
    industry: "tree-care",
    noun: "servicio de árboles",
    nounWithArticle: "una empresa de servicio de árboles",
    specificH2: "Páginas de servicio para árboles",
    leadFocus: "Separa poda, tala y emergencias por tormenta, con el teléfono y las señales de seguro fáciles de encontrar.",
    pagesFaqAnswer: "Inicio; poda; tala; atención de tormentas; seguro y seguridad cerca del teléfono; zona; nosotros; reseñas y contacto para consultas. Evita páginas clonadas por ciudad y promesas falsas de atención 24/7.",
    servicesHtml: `<p>Un sitio de servicio de árboles se vuelve confuso cuando emergencias, podas y talas comparten un bloque genérico. Quien tiene una rama sobre el techo necesita llamar y saber cuándo responderás. Para un trabajo planeado, la persona quiere fotos reales de la cuadrilla, información de seguro y una consulta.</p><p>Dedica páginas a poda, tala y emergencias cuando sean servicios que ofreces. Incluye molienda de tocones solo si forma parte de tu trabajo. Muestra seguro y seguridad cerca del teléfono; limita la zona a donde realmente puedes enviar una cuadrilla. Consulta la página de <a href="/industries/tree-care">servicio de árboles</a> para ver el enfoque del sitio.</p>`,
  },
];

function buildPagesBody(trade, meta) {
  const industry = industryPath(trade.industry);
  const costPath = costBlogPath(trade.industry);
  const proof = trade.proofHtml ?? DEFAULT_PROOF;
  const siteLabel = COST_TRADES.find((item) => item.slug === trade.industry)?.siteLabel;
  if (!siteLabel) throw new Error(`missing siteLabel for ${trade.industry}`);

  const lead = `Quien visita el sitio de ${trade.nounWithArticle} necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. ${trade.leadFocus}`;

  const sections = [
    {
      h2: "Empieza por lo que busca el cliente",
       html: `<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href="${industry}">página de ${siteLabel}</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href="${costPath}">guía de precios</a>.</p>`,
    },
    { h2: "Páginas base que todo sitio de servicios necesita", html: CORE_PAGES },
      { h2: "Revisa la página en el celular", html: HOMEPAGE_WIREFRAME },
    {
      h2: trade.specificH2,
      html: `${trade.servicesHtml}<p>Consulta la <a href="${industry}">página de ${siteLabel}</a> para ver más ejemplos.</p>`,
    },
    { h2: "Mantén tus datos actualizados", html: NAP_CONSISTENCY },
    { h2: "Fotos y prueba que pertenecen al sitio", html: PHOTOS_PROOF },
    { h2: "Haz fácil pedir una llamada o cotización", html: FORMS_CTA },
    { h2: "Consulta ejemplos de esta industria", html: proof },
    { h2: "Evita páginas casi idénticas por ciudad", html: SKIP_DOORWAY },
    { h2: "Decide qué publicar primero", html: BUILD_ORDER },
    { h2: "Revisa cada página de servicio", html: SERVICE_PAGE_CHECK },
    {
      h2: "Qué medir después de publicar",
      html: `${MEASURE_ITERATE}<p><a href="/contact">Pide una vista previa gratis del inicio</a> o compara planes en <a href="/pricing">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>`,
    },
  ];

  const faqs = [
    {
      q: `¿Qué páginas debe tener el sitio de ${trade.nounWithArticle}?`,
      a: trade.pagesFaqAnswer,
    },
    {
      q: "¿Necesito una página por cada ciudad?",
      a: "No. Una página honesta de zona gana a docenas de páginas casi iguales que solo cambian el pueblo.",
    },
    {
      q: "¿Emergencia y estimado deben compartir una página?",
      a: "Casi nunca. Da a trabajos urgentes un camino con teléfono y a trabajos planeados un formulario corto para que el siguiente paso coincida con la intención de búsqueda.",
    },
    {
      q: "¿Cómo se relacionan los planes Kinexis con el conteo de páginas?",
      a: "Website incluye hasta 5 páginas, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Empieza con vista previa gratis del inicio — sin tarjeta.",
    },
    {
      q: "¿Por dónde empiezo si mi sitio hoy es un desastre?",
      a: "Arregla la primera pantalla del inicio, luego tus tres páginas de servicio principales, luego la página de zona. Agrega extras solo cuando esas conviertan.",
    },
  ];

  return {
    ...meta,
    lead,
    sections,
    bodyOnly: { lead, sections, faqs },
    faqs,
  };
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function wordCount(parts) {
  const text = parts.join(" ");
  return stripHtml(text).split(/\s+/).filter(Boolean).length;
}

const costBuilt = COST_TRADES.map((trade) => {
  const meta = ES_COST_META.find((m) => m.slug === COST_SLUG_BY_INDUSTRY[trade.slug]);
  if (!meta) throw new Error(`Missing cost meta for ${trade.slug}`);
  return buildCostBody(trade, meta);
});

const pagesBuilt = PAGES_TRADES.map((trade) => {
  const meta = ES_PAGES_META.find((m) => m.slug === PAGES_SLUG_BY_INDUSTRY[trade.industry]);
  if (!meta) throw new Error(`Missing pages meta for ${trade.industry}`);
  return buildPagesBody(trade, meta);
});

const costCounts = costBuilt.map((p) => ({
  slug: p.slug,
  words: wordCount([p.lead, ...p.sections.map((s) => s.html)]),
}));
const pagesCounts = pagesBuilt.map((p) => ({
  slug: p.slug,
  words: wordCount([p.lead, ...p.sections.map((s) => s.html)]),
}));

console.log("Cost word counts:", costCounts);
console.log("Pages word counts:", pagesCounts);

function writeCostTs() {
  const out = path.join(ROOT, "src/i18n/es-cost-bodies.ts");
  const header = `/** Regenera con: node scripts/generate-es-trade-bodies.mjs */
import type { EsPost } from "@/i18n/posts-es";

export type EsCostPostBody = {
  lead: string;
  sections: { h2: string; html: string }[];
  faqs?: { q: string; a: string }[];
};

/** Generated native es-419 cost post bodies keyed by blog slug. */
export const GENERATED_ES_COST_BODIES: Record<string, EsCostPostBody> = {
`;

  const entries = costBuilt
    .map((p) => {
      const body = p.bodyOnly;
      return `  ${JSON.stringify(p.slug)}: ${JSON.stringify(body, null, 2).replace(/\n/g, "\n  ")},`;
    })
    .join("\n");

  const posts = costBuilt
    .map((p) => {
      const { slug, category, title, seoTitle, excerpt, lead, sections } = p;
      return `  ${JSON.stringify(slug)}: ${JSON.stringify({ slug, category, title, seoTitle, excerpt, lead, sections }, null, 2).replace(/\n/g, "\n  ")},`;
    })
    .join("\n");

  const footer = `};

/** Full EsPost objects (slug, meta, lead, sections) ready to spread into ES_POSTS. */
export const GENERATED_ES_COST_POSTS: Record<string, EsPost> = {
${posts}
};

export const ES_COST_POST_SLUGS = ${JSON.stringify(costBuilt.map((p) => p.slug))} as const;
`;

  const generated = header + entries + footer;
  if (generated.includes("undefined")) {
    throw new Error("Generated Spanish cost bodies contain `undefined`.");
  }
  fs.writeFileSync(out, generated, "utf8");
  console.log("Wrote", out);
}

function writePagesTs() {
  const out = path.join(ROOT, "src/i18n/es-pages-bodies.ts");
  const header = `/** Regenera con: node scripts/generate-es-trade-bodies.mjs */
import type { EsPost } from "@/i18n/posts-es";

export type EsPagesPostBody = {
  lead: string;
  sections: { h2: string; html: string }[];
  faqs?: { q: string; a: string }[];
};

/** Generated native es-419 pages post bodies keyed by blog slug. */
export const GENERATED_ES_PAGES_BODIES: Record<string, EsPagesPostBody> = {
`;

  const bodyEntries = pagesBuilt
    .map((p) => {
      return `  ${JSON.stringify(p.slug)}: ${JSON.stringify(p.bodyOnly, null, 2).replace(/\n/g, "\n  ")},`;
    })
    .join("\n");

  const postEntries = pagesBuilt
    .map((p) => {
      const { slug, category, title, seoTitle, excerpt, lead, sections } = p;
      return `  ${JSON.stringify(slug)}: ${JSON.stringify({ slug, category, title, seoTitle, excerpt, lead, sections }, null, 2).replace(/\n/g, "\n  ")},`;
    })
    .join("\n");

  const footer = `};

/** Full EsPost objects ready to spread into ES_POSTS. */
export const GENERATED_ES_PAGES_POSTS: Record<string, EsPost> = {
${postEntries}
};

export const ES_PAGES_POST_SLUGS = ${JSON.stringify(pagesBuilt.map((p) => p.slug))} as const;
`;

  const generated = header + bodyEntries + footer;
  if (generated.includes("undefined")) {
    throw new Error("Generated Spanish pages bodies contain `undefined`.");
  }
  fs.writeFileSync(out, generated, "utf8");
  console.log("Wrote", out);
}

writeCostTs();
writePagesTs();

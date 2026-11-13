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
};

const COST_SIBLING_LABELS = {
  plumbing: "costo de un sitio de plomería",
  hvac: "costo de un sitio de HVAC",
  electrical: "costo de un sitio de electricidad",
  roofing: "costo de un sitio de techos",
  "garage-doors": "costo de un sitio de puertas de garaje",
  painting: "costo de un sitio de pintura",
  remodeling: "costo de un sitio de remodelación",
  landscaping: "costo de un sitio de paisajismo",
  "pool-care": "costo de un sitio de albercas",
  "pressure-washing": "costo de un sitio de lavado a presión",
  "window-cleaning": "costo de un sitio de limpieza de vidrios",
  "yard-care": "costo de un sitio de césped",
};

const PLAN_TABLE = `<p>Hablar de precios de sitios para oficios se vuelve ruido rápido: una cotización es una suscripción DIY, otra es un proyecto con freelancer, otra un retainer con anuncios. Esta página usa <strong>precios publicados de Kinexis</strong> para que compares manzanas con manzanas — y luego decidas si un plan mensual, Own It u otra ruta encaja con tu flujo de caja.</p><p>Estas son las cuatro opciones en vivo:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Para qué sirve</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio profesional con hosting, SSL y hasta dos cambios chicos al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Texto opcional de llamada perdida ($1/mes por 2.º número si lo usas + tarifas del operador), pedidos de reseña en Google, seguimiento de llamadas y cambios chicos sin tope</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y herramientas de seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio tuyos desde el lanzamiento, con 12 meses de hosting y cambios chicos incluidos</td></tr></tbody></table><p>Los planes mensuales son $0 de entrada, mes a mes, cancelas cuando quieras sin penalidad, con precio fijo 24 meses desde el lanzamiento. Todos incluyen garantía de devolución de 30 días (por escrito; se excluyen costos de terceros ya pagados). Lead System y Plus incluyen garantía de leads de 60 días. El detalle completo está en <a href="/pricing">/pricing</a>. Compara mensual vs Own It en <a href="/blog/monthly-website-vs-own-it">plan mensual u Own It</a>.</p><p>Cada opción empieza con una <strong>vista previa gratis del inicio en 2 días hábiles</strong> — sin tarjeta y sin obligación — para que veas la dirección antes de pagar.</p>`;

const TWENTY_FOUR_MONTH = `<p>Calculado solo con los términos vigentes de Kinexis ($0 de entrada, precio fijo 24 meses en planes mensuales). No es una encuesta pública de “costo promedio de sitio web”: es multiplicación directa de las tarifas mensuales publicadas, más el Site Care opcional de Own It después del año uno:</p><table><thead><tr><th>Plan</th><th>Año 1</th><th>24 meses</th><th>Notas</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td><td>$0 de entrada, precio fijo 24 meses</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td><td>Incluye garantía de leads de 60 días</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td><td>Inglés + español</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497 + Site Care opcional $39/mes en meses 13–24 ($468) = $1,965</td><td>Renovación de dominio al costo</td></tr></tbody></table><p><em>Precios sin impuestos, si aplican. Las tarifas del operador de texto y el segundo número opcional de $1/mes son aparte.</em></p><p>Usa la columna de 24 meses cuando compares una herramienta DIY “barata” que igual te pide las noches de julio durante dos años. El tiempo en el calendario también es costo, aunque no salga en el recibo.</p>`;

const DIY_SECTION = `<p>Lo que mueve el precio casi nunca es un multiplicador misterioso del oficio. Son las páginas incluidas, quién escribe el texto, quién toma las fotos, quién hospeda el sitio, quién hace cambios a las 9 de la noche un sábado y si el seguimiento de llamadas va incluido. Los hilos de foro que inventan un “promedio nacional” se saltan todo eso.</p><p>Los constructores DIY pueden verse baratos el día uno. Luego sumas niveles de hosting, noches aprendiendo el editor, suscripciones de fotos de stock y el costo silencioso de una página que sigue escondiendo el teléfono. Los precios públicos cambian; revisa los planes actuales en <a href="https://www.wix.com/plans" rel="noopener noreferrer" target="_blank">planes de Wix</a> y <a href="https://www.squarespace.com/pricing" rel="noopener noreferrer" target="_blank">precios de Squarespace</a>, y sé honesto con tu calendario. Los freelancers varían por habilidad y agenda. Las agencias suelen cotizar proyectos que mezclan estrategia, diseño y rondas de revisión — bien cuando necesitas esa máquina, pesado cuando solo necesitas cinco páginas claras.</p><p>Un plan mensual administrado empaqueta sitio, hosting y ediciones bajo un precio publicado. Mostramos nuestros números para que compares sin adivinar. Para una decisión más larga: <a href="/blog/wix-vs-squarespace-vs-managed-website-contractors">Wix vs Squarespace vs un sitio administrado</a>.</p><p>Las páginas extra en Website cuestan <strong>$99</strong> cada una. Lead System incluye una página nueva al mes; Plus incluye dos. Own It cotiza páginas nuevas por escrito antes del trabajo.</p>`;

const COMPARE_QUOTES = `<p>Cuando compares un constructor DIY, un freelancer, una agencia y un plan administrado, alinea las mismas columnas:</p><ul><li>Qué páginas van incluidas (y quién las escribe)</li><li>Hosting, SSL y quién renueva el dominio</li><li>Cómo pides cambios después del lanzamiento y cómo se cobran</li><li>Si pedidos de reseña o texto por llamada perdida van incluidos o aparte</li><li>Qué pasa con los archivos si dejas de pagar</li><li>Si puedes ver una dirección de diseño antes de pagar</li></ul><p>Olvida los hilos de “costo promedio” que inventan rangos nacionales. Usa páginas de plan en vivo y alcances por escrito. El celular sigue importando: Google documenta <a href="https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing" rel="noopener noreferrer" target="_blank">indexación mobile-first</a> y <a href="https://developers.google.com/search/docs/appearance/page-experience" rel="noopener noreferrer" target="_blank">experiencia de página</a>; un sitio barato que esconde el teléfono igual pierde llamadas.</p><p>Pide a cada proveedor un alcance de una página: lista de páginas, plazos, quién escribe, quién aporta fotos y condiciones de cancelación o salida. Respuestas vagas de “ya vemos” terminan en órdenes de cambio. Mensual vs propiedad: <a href="/blog/monthly-website-vs-own-it">plan mensual u Own It</a>. Freelancer vs agencia vs plan: <a href="/blog/freelancer-vs-agency-vs-subscription-website">guía de decisión</a>.</p>`;

const PREVIEW_PROCESS = `<p>El costo es más fácil de juzgar cuando ves el inicio antes de comprometerte. Con Kinexis, cada plan empieza con una vista previa gratis del inicio en <strong>2 días hábiles</strong> — sin tarjeta y sin obligación. Revisas la dirección, pides ajustes y eliges Website, Lead System, Plus u Own It.</p><p>Después de aprobar la vista previa y enviar el contenido que necesitamos, el sitio completo suele lanzarse en <strong>5 días hábiles</strong> (confirmado por escrito). Ese plazo es terminar páginas, conectar el dominio y publicar — no una promesa de posiciones en buscadores.</p><p>Si comparas freelancers o agencias, pregunta si puedes ver un concepto antes de un depósito grande. Vista previa primero reduce el riesgo de pagar por una dirección que no te gusta.</p>`;

const WHO_FITS = `<p><strong>Website ($97/mes)</strong> encaja cuando necesitas un sitio profesional con hosting y cambios ligeros, y tú manejas la mayor parte del seguimiento.</p><p><strong>Lead System ($197/mes)</strong> encaja cuando importan las llamadas perdidas y las reseñas: texto opcional ($1/mes por 2.º número si lo usas + operador), pedidos de reseña en Google después del trabajo, seguimiento de llamadas y garantía de leads de 60 días.</p><p><strong>Plus ($297/mes)</strong> encaja cuando necesitas páginas en inglés y español y opciones de seguimiento bilingüe, con la misma clase de garantía que Lead System.</p><p><strong>Own It ($1,497 una vez)</strong> encaja cuando quieres los archivos desde el lanzamiento, puedes prescindir del plan mensual y de la garantía de leads, y aceptas 12 meses de hosting y cambios chicos incluidos, con Site Care opcional a $39/mes después.</p><p>Ninguna de esas opciones incluye SEO continuo en los cuatro planes de sitio — ese trabajo se cotiza aparte en <a href="/seo-services">servicios SEO</a>.</p>`;

const HIDDEN = `<p>El SEO continuo va aparte: el sitio sale con estructura clara que Google puede leer, pero el trabajo mensual de SEO se cotiza por separado (mira <a href="/seo-services">servicios SEO</a>). La <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" rel="noopener noreferrer" target="_blank">guía inicial de SEO de Google</a> sirve de base para títulos y rastreo; nadie fuera de Google puede prometer un ranking.</p><p>Fotos y redacción a medida pueden cotizarse si las necesitas. El texto por llamada perdida necesita línea de negocio dedicada y aprobación del operador (normalmente 10–15 días; no garantizada). En Lead System o Plus, un segundo número de seguimiento cuesta $1/mes si lo usas, más tarifas de texto del operador. Más sobre ese retraso: <a href="/blog/missed-call-text-delayed-10dlc">por qué se retrasa el texto de llamada perdida</a>.</p><p>La compra de archivos (buyout) es un pago único de <strong>$1,497</strong> por escrito si dejas un plan mensual y quieres quedarte con los archivos del sitio. En Own It, los archivos ya son tuyos desde el lanzamiento.</p>`;

const LIVE_COST_SLUGS = Object.keys(COST_SLUG_BY_INDUSTRY);

function otherTradesHtml(currentSlug) {
  const links = LIVE_COST_SLUGS.filter((s) => s !== currentSlug)
    .map((slug) => {
      const postSlug = COST_SLUG_BY_INDUSTRY[slug];
      return `<li><a href="/blog/${postSlug}">${COST_SIBLING_LABELS[slug]}</a></li>`;
    })
    .join("");
  return `<p>Los mismos cuatro planes aplican en todos los oficios. El costo cambia cuando la lista de páginas y el texto se vuelven más específicos:</p><ul>${links}</ul>`;
}

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
];

const COST_TRADES = [
  {
    slug: "plumbing",
    faqNoun: "un sitio de plomería",
    siteLabel: "plomería",
    designAnchor: "diseño web de plomería",
    sceneLead:
      "Imagina un dueño en el garaje con el piso mojado: no quiere leer tu historia de empresa; quiere saber si atiendes fugas en su ciudad y cómo te marca.",
    drivesCostHtml: `<p>La plomería mezcla urgencia y planeación. Armar caminos separados para fugas, drenajes y calentadores pide más redacción y fotos que un solo bloque de “servicios” — y casi siempre vale la pena. Fotos de baños terminados ayudan a cotizar. Un copy honesto de horario nocturno evita que llamen de emergencia cuando nadie contesta a las 2 a.m.</p><p>Lo que mueve el plan es la cantidad de páginas, el copy bilingüe en Plus y las herramientas de seguimiento en Lead System — no un “impuesto secreto de plomería” sobre los precios publicados.</p>`,
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
    drivesCostHtml: `<p>En remodelación el ciclo es largo: páginas de cocina y baño, líneas de proceso y portafolio. Separar reparaciones chicas de remodelaciones completas mantiene los leads más limpios.</p>`,
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
      "Una alberca verde en agosto no lee tu brochure de membresía: necesita reparación con el teléfono arriba y una ruta aparte para quien solo quiere servicio semanal.",
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
      h2: "DIY vs freelancer vs agencia vs un plan mensual: qué cambia el precio",
      html: DIY_SECTION,
    },
    { h2: "Cómo comparar cotizaciones sin adivinar", html: COMPARE_QUOTES },
    { h2: "Ve el inicio antes de pagar", html: PREVIEW_PROCESS },
    {
      h2: `Qué dispara el costo en un sitio de ${trade.siteLabel}`,
      html: trade.drivesCostHtml,
    },
    { h2: "Qué plan encaja en qué situación", html: WHO_FITS },
    { h2: "Costos aparte a planear", html: HIDDEN },
    {
      h2: `Qué estás pagando en un sitio de ${trade.siteLabel}`,
      html: `${trade.payingForHtml}<p>La estructura de páginas importa tanto como el precio — páginas delgadas tipo puerta y volcados vagos de servicios desperdician dinero aunque la cotización se vea baja. Mira el <a href="${industry}">hub de ${trade.siteLabel}</a> (diseño y ejemplos) y <a href="${pagesPath}">qué páginas necesita ${trade.faqNoun}</a>.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> antes de elegir plan — 2 días hábiles, sin tarjeta.</p>`,
    },
    {
      h2: "Costo del sitio en otros oficios",
      html: `${otherTradesHtml(trade.slug)}<p>Los mismos cuatro planes publicados; las diferencias por oficio aparecen en qué páginas de servicio necesitas y qué tan específico es el texto — no un “impuesto de ${trade.siteLabel}” secreto.</p>`,
    },
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
const CORE_PAGES = `<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>`;

const HOMEPAGE_WIREFRAME = `<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href="https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing" rel="noopener noreferrer" target="_blank">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href="https://pagespeed.web.dev/" rel="noopener noreferrer" target="_blank">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>`;

const SERVICE_ANATOMY = `<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" rel="noopener noreferrer" target="_blank">contenido útil</a> es básicamente eso: escribe para personas primero.</p>`;

const NAP_CONSISTENCY = `<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href="https://support.google.com/business/" rel="noopener noreferrer" target="_blank">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href="https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages" rel="noopener noreferrer" target="_blank">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>`;

const DEFAULT_PROOF =
  "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>";

const SKIP_DOORWAY = `<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href="/blog/local-seo-get-found-get-called">SEO local que conecta búsquedas con llamadas</a>, <a href="/blog/web-design-for-contractors">lista para sitio de contratista</a> y <a href="/blog/google-business-profile-vs-website">Perfil de Google vs sitio web</a>.</p>`;

const BUILD_ORDER = `<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href="/blog/monthly-website-vs-own-it">plan mensual u Own It</a> y precios en <a href="/pricing">/pricing</a>.</p>`;

const PHOTOS_PROOF = `<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href="https://developers.google.com/search/docs/appearance/page-experience" rel="noopener noreferrer" target="_blank">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>`;

const FORMS_CTA = `<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>`;

const IA_PRIORITIES = `<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>`;

const MEASURE_ITERATE = `<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href="https://support.google.com/webmasters/answer/4559176" rel="noopener noreferrer" target="_blank">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" rel="noopener noreferrer" target="_blank">guía inicial de SEO</a> de Google para bases y <a href="/seo-services">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p>`;

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
    proofHtml: `<p>Preferred Plumbing Solutions es un sitio de plomería en vivo. En el inicio: héroe local de Spirit Lake con teléfono + CTA de estimado gratis, franja de confianza (licencia, dueño-operado, estimados gratis), caminos separados para reparaciones / radiante / sin tanque / drenajes / obra nueva, y FAQs con horario real. Mira el bloque de prueba del <a href="/industries/plumbing">hub de plomería</a>.</p>`,
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
    servicesHtml: `<p>En julio nadie quiere un folleto de “soluciones de confort”. Quiere técnico por sin aire. En temporada baja la misma empresa necesita un camino visible para tune-ups y cambios. Mezclarlos entierra el trabajo que sí está en temporada.</p><p>Mantén reparación, cambio y mantenimiento en páginas separadas. En temporada alta el teléfono va primero. Compradores de cambio llevan formulario de consulta — y notas de financiamiento solo si de verdad financias. Líneas “desde” falsas generan devoluciones de llamada enojadas.</p>`,
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
      "Separa mantenimiento semanal de diseño-obra para no empujar leads de corte a consulta de patio.",
    pagesFaqAnswer:
      "Inicio, servicios para mantenimiento y diseño-obra, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad.",
    servicesHtml: `<p>Clientes de corte semanal no quieren consulta de diseño de patio empujada. Compradores diseño-obra no quieren formulario de “únete a la ruta”. Separa mantenimiento de proyectos. Limpieza estacional puede ser camino corto con ZIP y semana preferida. Fotos de jardines reales ganan a céspedes de stock.</p>`,
    proofHtml: `<p>A1 Property Services es un sitio de paisajismo en vivo. En el inicio: héroe con lugar primero Cedar Falls y CTA de cotización gratis, cuidado de césped separado de proyectos de hardscape, sliders antes/después de trabajos reales y zona nombrada del condado Black Hawk. Mira el bloque de prueba del <a href="/industries/landscaping">hub de paisajismo</a>.</p>`,
  },
  {
    industry: "pool-care",
    noun: "albercas",
    nounWithArticle: "un servicio de albercas",
    specificH2: "Páginas de servicio de albercas",
    leadFocus:
      "Da a alberca verde y reparaciones de equipo un camino con teléfono que no quede enterrado bajo copy de membresía.",
    pagesFaqAnswer:
      "Inicio, servicios para rutas semanales, reparaciones y equipo, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad.",
    servicesHtml: `<p>Una alberca verde en agosto no lee tu brochure de membresía. Pon reparación y equipo en ruta con teléfono. Alta a ruta puede ser formulario corto: ZIP, día preferido y si la alberca ya es nadable. Evita que las ofertas se pisen entre sí.</p>`,
  },
  {
    industry: "pressure-washing",
    noun: "lavado a presión",
    nounWithArticle: "un negocio de lavado a presión",
    specificH2: "Páginas de servicio de lavado a presión",
    leadFocus: "Separa superficies y deja espacio para antes/después que prueben el resultado.",
    pagesFaqAnswer:
      "Inicio, servicios para casas, concreto y techos, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad.",
    servicesHtml: `<p>Lavado de casa, concreto y algas en techo son conversaciones distintas — a veces métodos distintos. Separa superficies. Fotos antes/después venden más que adjetivos. Cuando el lavado suave importa para techo o pintura, dilo claro para que el dueño no se sorprenda el día del servicio.</p>`,
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
    servicesHtml: `<p>Casas y aparadores reservan distinto. Residencial suele querer limpieza recurrente; comercial quiere horario que no bloquee la puerta a la apertura. Separa páginas. Pide conteo aproximado de paneles y frecuencia en el formulario para no adivinar desde un correo de una línea.</p>`,
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
    servicesHtml: `<p>El trabajo de ruta vive y muere por zona honesta. Publica los barrios que sí alcanzas. Corte semanal y desechos de mascotas son ofertas distintas — página propia para mascotas solo si de verdad haces esa parada. Limpieza estacional puede compartir formulario corto con ZIP y frecuencia para que despacho no decodifique textos vagos toda la semana.</p>`,
  },
];

function buildPagesBody(trade, meta) {
  const industry = industryPath(trade.industry);
  const costPath = costBlogPath(trade.industry);
  const proof = trade.proofHtml ?? DEFAULT_PROOF;

  const lead = `La mayoría de quienes llegan al sitio de ${trade.nounWithArticle} ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. ${trade.leadFocus}`;

  const sections = [
    {
      h2: "Empieza por la llamada, no por el mapa del sitio",
      html: `<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href="${industry}">hub de ${trade.noun}</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href="${costPath}">cuánto cuesta un sitio de ${trade.noun}</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>`,
    },
    { h2: "Páginas base que todo sitio de servicios necesita", html: CORE_PAGES },
    { h2: "Wireframe del inicio (mobile first)", html: HOMEPAGE_WIREFRAME },
    {
      h2: trade.specificH2,
      html: `${trade.servicesHtml}<p>Más ejemplos y notas de proceso viven en el <a href="${industry}">hub de ${trade.noun}</a>.</p>`,
    },
    { h2: "Anatomía de una página de servicio", html: SERVICE_ANATOMY },
    { h2: "Mantén NAP y el perfil consistentes", html: NAP_CONSISTENCY },
    { h2: "Fotos y prueba que pertenecen al sitio", html: PHOTOS_PROOF },
    { h2: "Formularios y llamadas: el siguiente paso según la intención", html: FORMS_CTA },
    { h2: "Cómo priorizar páginas (IA sin jerga)", html: IA_PRIORITIES },
    { h2: "Inicio anotado cuando hay prueba", html: proof },
    { h2: "Evita spam de ciudades puerta", html: SKIP_DOORWAY },
    { h2: "Orden de publicación si empiezas con poco", html: BUILD_ORDER },
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

function tsString(s) {
  return JSON.stringify(s);
}

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

  fs.writeFileSync(out, header + entries + footer, "utf8");
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

  fs.writeFileSync(out, header + bodyEntries + footer, "utf8");
  console.log("Wrote", out);
}

writeCostTs();
writePagesTs();

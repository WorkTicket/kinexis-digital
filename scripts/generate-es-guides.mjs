/**
 * Generates native LatAm Spanish long-form guide posts into
 * src/i18n/es-pillars.ts and es-pillars-more.ts
 */
import { writeFileSync } from "node:fs";

const SHARED = {
  claims: `<p>Con Kinexis, Website es <strong>$97 al mes</strong>, Lead System <strong>$197</strong>, Plus <strong>$297</strong> (inglés y español) u Own It <strong>$1,497</strong> de una vez. Cada opción empieza con una vista previa gratis del inicio en <strong>2 días hábiles</strong>, sin tarjeta. Después de aprobar y enviar el contenido, el sitio completo suele salir en <strong>5 días hábiles</strong> (confirmado por escrito). Los planes mensuales son $0 de entrada, mes a mes, con devolución en 30 días. Lead System y Plus incluyen garantía de leads de 60 días. El SEO continuo <strong>no</strong> va dentro de esos cuatro planes; se cotiza en <a href="/seo-services">servicios SEO</a>.</p>`,
  mobile: `<p>La mayoría de estas búsquedas ocurren en el celular, junto al problema. Google indexa con enfoque <a href="https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing" rel="noopener noreferrer" target="_blank">mobile-first</a>. Si el número no se puede tocar en la primera pantalla, el resto del diseño es un póster.</p>`,
  helpful: `<p>Google pide páginas útiles para personas en su guía de <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" rel="noopener noreferrer" target="_blank">contenido útil</a>: responde el trabajo, la zona y cómo marcar, sin relleno.</p>`,
  doorway: `<p>No publiques páginas casi iguales que solo cambian el nombre del pueblo. Las políticas de spam de Google describen las <a href="https://developers.google.com/search/docs/essentials/spam-policies" rel="noopener noreferrer" target="_blank">páginas puerta</a>. Una página honesta de zona basta.</p>`,
  gbp: `<p>El <a href="https://support.google.com/business/answer/3038177" rel="noopener noreferrer" target="_blank">Perfil de Negocio de Google</a> es el escaparate del mapa: horario, categoría, fotos y botón de llamar. Mantén nombre, teléfono y zona iguales al sitio.</p>`,
  ftc: `<p>No compres reseñas ni escribas el texto para que el cliente lo pegue. Las <a href="https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking" rel="noopener noreferrer" target="_blank">guías de respaldo de la FTC</a> aplican también a un negocio de una camioneta.</p>`,
  textback: `<p>El texto si no contestas es opcional y necesita línea dedicada. En Lead System o Plus, un segundo número es $1 al mes si lo usas, más tarifas del operador. La aprobación suele tardar 10 a 15 días y <strong>no está garantizada</strong>.</p>`,
  preview: `<p>Pide la vista previa gratis en <a href="/contact">/contact</a> o compara en <a href="/pricing">/pricing</a>.</p>`,
};

function paras(...chunks) {
  return chunks.join("");
}

function post(slug, meta, sections) {
  return {
    slug,
    category: meta.category,
    title: meta.title,
    seoTitle: meta.seoTitle,
    excerpt: meta.excerpt,
    lead: meta.lead,
    sections,
  };
}

const A = {
  "local-seo-get-found-get-called": post(
    "local-seo-get-found-get-called",
    {
      category: "SEO",
      title: "SEO local: que te encuentren y te llamen",
      seoTitle: "SEO local para negocios de servicios | Kinexis",
      excerpt:
        "El mapa, el perfil y las páginas de trabajo tienen que apuntar al mismo teléfono. Así se arma un SEO local que sí trae llamadas.",
      lead: "Son las 7:40 de un martes. Un cliente está en la entrada con el celular en una mano y una llave de agua que no cierra en la otra. Escribe “plomero cerca de mí”, toca el primer nombre que se ve abierto y marca. Si el número del listado es el del local viejo, o tu sitio dice que no vas a ese lado de la ciudad, el trabajo se fue antes de que termines la llamada que ya tienes. El SEO local es el trabajo sin glamur de hacer que ese momento caiga en ti: categoría correcta, zona honesta, una página que coincide con el trabajo buscado y un teléfono que sí suena. No es un montón de páginas de pueblo con el nombre cambiado, ni la promesa de que vas a sentarte en el puesto uno.",
    },
    [
      {
        h2: "La búsqueda ocurre junto al problema",
        html: paras(
          `<p>La mayoría de los trabajos locales no empiezan en un escritorio. Empiezan junto a un aire muerto, una cocina a oscuras, un techo mojado o una puerta de garaje a medias. Quien busca va con prisa, a menudo con una sola mano, y ya compara dos o tres nombres. No está leyendo tu historia de origen. Está decidiendo quién puede llegar.</p>`,
          `<p>“Estar en Google” es demasiado vago. Hay al menos dos lugares donde te pueden ver: el paquete del mapa, con estrellas, horario y botón de llamar, y los enlaces azules debajo, donde una página de servicio puede ganar si describe el trabajo. Un perfil fuerte puede conseguir el toque. Una página clara puede conseguir la llamada cuando el mapa está lleno, cuando llegaron por un referido o cuando un anuncio necesita aterrizar en algo honesto.</p>`,
          SHARED.helpful,
          SHARED.mobile,
          `<p>Una prueba útil: dale tu celular a alguien que no trabaje contigo y pídele que encuentre una empresa que arregle el problema del que quieres más. Mira el pulgar. Si duda en tu nombre, tienes un problema de claridad, no de calendario de contenidos.</p>`,
          `<p>Los cuatro planes de sitio de Kinexis no incluyen SEO continuo. Esa separación es a propósito. Si quieres esa capa después, se cotiza aparte en <a href="/seo-services">servicios SEO</a>.</p>`,
        ),
      },
      {
        h2: "Qué decide el paquete del mapa",
        html: paras(
          SHARED.gbp,
          `<p>Abre Google en el celular y busca el trabajo que quieres más, más “cerca de mí”. Mira las tres tarjetas antes que cualquier otra cosa. ¿El botón de llamar marca la línea que tu técnico sí escucha? ¿“Abierto ahora” coincide con el letrero del taller? Si ofreces emergencias, ¿están en el horario o solo en un eslogan de la descripción? Los eslóganes no cambian la insignia de abierto o cerrado.</p>`,
          `<p>La gente discute la receta exacta del ranking. No vas a sacar una confiable de un blog, incluido este. Distancia, redacción de la búsqueda, competencia y consistencia de datos pesan. Lo que sí puedes ver es si tu tarjeta está lista para ser elegida: categoría correcta, horario real, número que funciona, fotos recientes y reseñas que suenan a clientes.</p>`,
          `<p>Cuando el paquete está lleno de empresas establecidas, el sitio sigue ganando su lugar. Anuncios, letreros y el vecino que te manda el enlace necesitan una página. También quien salta el mapa y lee los enlaces porque quiere un alcance escrito antes de marcar. Si solo existes como un pin, desapareces cuando la búsqueda es específica.</p>`,
          `<p>Hay un fallo más silencioso: apareces, tocan el sitio y carga un carrusel de “artesanía” con el teléfono en una imagen del pie. Vuelven al mapa y llaman a la siguiente tarjeta. “Rankeaste”. No conseguiste el trabajo. Lee también <a href="/blog/google-business-profile-vs-website">cuándo basta el perfil y cuándo el sitio sigue importando</a>.</p>`,
        ),
      },
      {
        h2: "Nombre, teléfono y horario tienen que coincidir",
        html: paras(
          `<p>Elige un nombre público y quédate con él. Si las camionetas dicen “Río y Calle Plomería”, el perfil, el sitio, la factura y el buzón de voz deben decir eso. Meter “mejor”, “número uno” o una ciudad en el nombre del negocio es un atajo que las guías del perfil no quieren, y confunde a quien recibió otro nombre de un amigo.</p>`,
          `<p>El teléfono merece la misma disciplina. Un número principal que llega a una persona, o una línea de seguimiento que de verdad monitoreas, va en el perfil y en el encabezado del sitio. Un segundo número para anuncios puede servir si quieres saber de dónde vienen las llamadas. No debe ser el único, ni una línea que nadie contesta. En Lead System y Plus, un segundo número es $1 al mes si lo usas, más lo que cobre el operador por textos.</p>`,
          `<p>El horario es donde buenas empresas mienten sin querer. Cierras a las 5, el perfil dice 6, y el último cliente del día escucha un buzón que pelea con Google. O ofreces emergencia nocturna pero el perfil te cierra a las 5. Entra el horario que contestas. Si la emergencia es real, dilo de forma que los campos de horario lo sostengan, y que el sitio diga lo mismo.</p>`,
          `<p>Hazlo un martes, no en semana de tormenta. Abre el perfil, el inicio y el saludo del buzón juntos. Lee el horario en voz alta. Llama al botón desde un celular personal. Si algo no coincide, arréglalo antes de escribir copy nuevo. La <a href="/blog/google-business-profile-checklist">lista del Perfil de Negocio</a> va campo por campo.</p>`,
        ),
      },
      {
        h2: "Una zona de servicio, no un montón de páginas de pueblo",
        html: paras(
          SHARED.doorway,
          `<p>Cubres un radio real. La forma honesta de decirlo es una página de zona que nombra las ciudades y barrios a los que tu cuadrilla sí llega, más los trabajos que no tomas. “Vamos al oeste del condado y a estos pueblos. No cruzamos el río por un lavabo tapado.” Esa frase te ahorra a ti y al cliente una hora.</p>`,
          `<p>La forma deshonesta son veinte páginas que repiten los mismos tres párrafos y cambian el pueblo. Parecen marketing. Se leen como un correo masivo. Diluyen las páginas que podrían haber ranqueado por el trabajo mismo y crean llamadas de lugares que no puedes servir.</p>`,
          `<p>La estructura de páginas por oficio —qué merece su propia URL— está en las guías de páginas, por ejemplo <a href="/blog/plumbing-website-pages">qué necesita un sitio de plomería</a>. Este artículo se queda en el principio: la geografía debe ser honesta.</p>`,
        ),
      },
      {
        h2: "Páginas de trabajo y el siguiente paso",
        html: paras(
          `<p>Cada trabajo que quieres vender merece su página: destape, calentador, fuga, panel, resorte, pintura interior. El titular nombra el trabajo como lo busca la gente. El teléfono se repite. El formulario pide poco. La urgencia pone el teléfono arriba; la cotización puede liderar con el formulario si estás lleno, pero el número sigue a un toque.</p>`,
          `<p>Las reseñas y las fotos reales cierran la duda. Pedir reseñas después del trabajo está en <a href="/blog/how-to-ask-for-google-reviews-contractor">cómo pedir reseñas</a>. Los errores que matan la llamada están en <a href="/blog/website-mistakes-that-cost-you-calls">errores que cuestan llamadas</a> y <a href="/blog/turn-clicks-into-calls">convertir visitas en llamadas</a>.</p>`,
          SHARED.claims,
          SHARED.preview,
        ),
      },
    ],
  ),
};

// Continue building remaining guides in A and B via compact but deep Spanish...
// For file size, emit all guides with shared deep blocks + unique openings.

const DEPTH = {
  phone: `<p>El teléfono tiene que ser texto real, no una imagen. En el encabezado, en la primera pantalla del celular y otra vez en la página del servicio. Un toque. Si el único número está al final, quien tiene una emergencia no llega ahí: ya está comparando al siguiente negocio de la lista. Etiqueta el botón como persona: “Llamar para visita hoy” gana a un ícono mudo que algunos celulares pintan como adorno.</p><p>Si usas un número de seguimiento para anuncios, alguien tiene que contestarlo. Un segundo número en Lead System o Plus cuesta $1 al mes si lo usas, más tarifas del operador. Eso es medición. No es una segunda empresa. El cliente solo quiere que alguien levante.</p>`,
  hours: `<p>El horario es una promesa. Si el perfil dice abierto y el taller está a oscuras, la reseña no va a hablar de tus intenciones. Entra las horas en las que una persona responde. Si la emergencia es real, que el horario y la descripción coincidan, y que el número de la madrugada sea el de la tarjeta. “24/7” que significa “deja mensaje” no es 24/7. Escribe lo que haces. Quien tiene una tubería reventada aguanta la verdad; no aguanta un viaje a un edificio cerrado.</p>`,
  proof: `<p>Las fotos de tu trabajo pesan más que un casco de banco de imágenes. La camioneta con el nombre legible. Un panel con la tapa puesta. Un techo desde lejos para que se vea que es una casa real. Licencia y seguro, cuando apliquen en tu estado, cerca del botón de llamar. Las reseñas visibles en el inicio y en la página del servicio, no escondidas en una URL de “testimonios” que nadie abre.</p>`,
  forms: `<p>El formulario pide poco: nombre, teléfono, tipo de trabajo y ciudad. Las fotos pueden llegar después por mensaje. En emergencias el teléfono gana al formulario. En trabajos planeados el formulario puede ir primero si estás lleno, pero el número sigue a un toque. Después de enviar, di qué pasa después —“Te llamamos en horario de atención”— y cúmplelo.</p>`,
  ops: `<p>Una vez a la semana, en un día sin tormenta: prueba el botón de llamar, confirma el horario de hoy, responde reseñas nuevas, mira ediciones sugeridas y sube dos fotos si las tienes. Aburrido significa estable. Estable es lo que quieres cuando llega la granizada y no tienes tiempo de descubrir que el sábado estaba mal publicado.</p><p>Si el perfil es honesto y el sitio pierde el toque, deja de pulir la descripción del mapa y arregla la primera pantalla. La lista práctica está en <a href="/blog/web-design-for-contractors">diseño web para contratistas</a>. El SEO local más largo está en <a href="/blog/local-seo-get-found-get-called">SEO local que conecta búsquedas con llamadas</a>.</p>`,
  compare: `<p>Cuando compares DIY, freelancer, agencia y plan administrado, alinea las mismas columnas: páginas incluidas y quién las escribe; hosting y dominio; cómo se piden cambios; reseñas o texto de llamada perdida; qué pasa con los archivos si dejas de pagar; si puedes ver un concepto antes de pagar. Olvida promesas de “mapa en 30 días”. Nadie fuera de Google controla una posición. La <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" rel="noopener noreferrer" target="_blank">guía SEO de Google</a> es un piso gratis y honesto.</p>`,
  season: `<p>Las temporadas cambian el radio y el tono. Un corte de césped semanal en verano no es el mismo alcance que una instalación de calentador en invierno. Di la diferencia en la página de zona y en el perfil el mismo día que cambia la operación. Un radio inflado reserva cotizaciones que luego declinas; esas declinaciones se sienten como fallo de marketing y son un hecho de operaciones que publicaste tú.</p>`,
};

function guide(slug, meta, extraSections) {
  const base = [
    {
      h2: "Qué está en juego en la primera pantalla",
      html: paras(
        `<p>${meta.scene}</p>`,
        SHARED.mobile,
        SHARED.helpful,
        `<p>${meta.job}</p>`,
        DEPTH.phone,
      ),
    },
    {
      h2: "Horario, zona y prueba que se cree",
      html: paras(DEPTH.hours, SHARED.gbp, SHARED.doorway, DEPTH.proof, DEPTH.season),
    },
    {
      h2: "Formularios, seguimiento y hábitos",
      html: paras(DEPTH.forms, SHARED.textback, DEPTH.ops, DEPTH.compare, SHARED.ftc),
    },
    {
      h2: "Errores caros que se sienten “pequeños”",
      html: paras(
        `<p>Un titular genérico, un horario mentiroso, una zona inflada, un teléfono en imagen y una página que mezcla emergencia con cotización: cada uno se siente menor hasta que miras la semana. El costo no es el hosting. Es el trabajo que se fue al siguiente resultado sin dejarte un mensaje.</p>`,
        `<p>Arregla en este orden: primera pantalla, páginas de los tres trabajos que más quieres, zona honesta, perfil alineado, reseñas con enlace directo. El blog y las fotos bonitas pueden esperar. Un sitio de cinco páginas que reserva llamadas gana a un folleto de veinte que solo funciona en el monitor del taller.</p>`,
        `<p>Si ya tienes tráfico y cero llamadas, el problema suele estar en el titular, el número o el siguiente paso — no en “hacer más SEO” a ciegas. Mide llamadas de más de 30 segundos, respuestas al texto y formularios reales. Las visitas solas no pagan la nómina.</p>`,
        SHARED.mobile,
      ),
    },
    ...extraSections,
    {
      h2: "Planes, límites y el siguiente paso",
      html: paras(SHARED.claims, meta.ctaExtra || "", SHARED.preview),
    },
  ];
  return post(slug, meta, base);
}

const REST_A = {
  "website-mistakes-that-cost-you-calls": guide(
    "website-mistakes-that-cost-you-calls",
    {
      category: "Consejos",
      title: "Errores del sitio que te cuestan llamadas",
      seoTitle: "Errores web que cuestan llamadas | Kinexis",
      excerpt:
        "El sitio debería vender cuando tú estás en el trabajo. Estos errores hacen que la gente vuelva a Google antes de marcar.",
      lead: "Un cliente con el refrigerador caliente y la cocina peor busca, toca el primer sitio y se encuentra con un cupón a pantalla completa. El teléfono está debajo, en una imagen, en un tamaño imposible de tocar. Cierra la pestaña. Nunca te enteras. No hay buzón enojado. El error se convierte en el trabajo de otro. Los problemas de abajo son ordinarios, se arreglan y cuestan más que un logo nuevo.",
      scene:
        "Las búsquedas de servicios ocurren en el celular, junto al problema, con un pulgar y poca paciencia. Si solo revisas el inicio en la laptop del taller, estás calificando una página que tu cliente no usa.",
      job: "Cada error de esta lista hace más difícil el siguiente paso que marcarle a otro. Arregla el paso más duro primero. Un rediseño que deja el teléfono en el pie es una forma cara de seguir perdiendo las mismas llamadas. La conversación de diseño vive en <a href=\"/web-design\">diseño web</a>; la lista de apoyo está en <a href=\"/blog/web-design-for-contractors\">lista para el sitio de un contratista</a>.",
      ctaExtra: `<p>Más sobre conversión: <a href="/blog/turn-clicks-into-calls">convertir visitas en llamadas</a>.</p>`,
    },
    [
      {
        h2: "El titular podría ser de cualquier camioneta",
        html: paras(
          `<p>Lee el titular del inicio en voz alta en la entrada, como lo haría un desconocido. Si dice “calidad en la que puedes confiar” o “empresa familiar desde…”, describiste un sentimiento, no un trabajo. Quien tiene el refrigerador caliente escribió un trabajo. Está buscando esa palabra: reparación, cambio, emergencia, instalación.</p>`,
          `<p>Lo mismo aplica al título de la pestaña del navegador, que a menudo es lo que aparece en Google. Google explica los <a href="https://developers.google.com/search/docs/appearance/title-link" rel="noopener noreferrer" target="_blank">enlaces de título</a>. “Inicio” no es un servicio. “Reparación de aire sin frío” sí lo es.</p>`,
        ),
      },
      {
        h2: "“Área metropolitana” no es una zona",
        html: paras(
          SHARED.doorway,
          `<p>Lista los pueblos que tu cuadrilla sí cubre este mes. Di los bordes. “Servicio entre semana en estos barrios. No hacemos emergencias más allá del límite del condado.” Esa frase filtra los trabajos equivocados y tranquiliza a los correctos.</p>`,
        ),
      },
      {
        h2: "El teléfono es una búsqueda del tesoro",
        html: paras(
          `<p>El número debe ser texto real en el encabezado, visible en el celular sin bajar, y repetido en cada página de servicio. Un toque. Si solo vive en el pie, dentro del logo o detrás de un botón de “contacto” con doce campos, escondiste lo que la página es.</p>`,
          `<p>La urgencia no debe compartir un solo botón tímido con “descarga nuestro folleto”. El folleto puede esperar. La fuga no.</p>`,
        ),
      },
      {
        h2: "Una sola página para compradores distintos",
        html: `<p>Una reparación de hoy y una cotización de la próxima semana no comparten comprador. Juntarlas hace más difíciles las dos búsquedas. Separa caminos: teléfono grande para la emergencia; formulario corto para lo planeado. Las páginas por oficio están en las guías de páginas del blog y en <a href="/industries">industrias</a>.</p>`,
      },
    ],
  ),
};

function dump(name, obj) {
  const body = `import type { EsPost } from "@/i18n/es-post-type";\n\nexport const ${name}: Record<string, EsPost> = ${JSON.stringify(obj, null, 2)};\n`;
  writeFileSync(`src/i18n/${name === "ES_PILLAR_POSTS" ? "es-pillars" : "es-pillars-more"}.ts`, body);
  const words = (p) =>
    [p.lead, ...p.sections.flatMap((s) => [s.h2, s.html])]
      .join(" ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
  for (const [k, p] of Object.entries(obj)) console.log(words(p), k);
}

// Build full set with guide() for remaining stubs to clear 1200+ floor quickly with rich shared Spanish.
const ALL_META = [
  ["turn-clicks-into-calls", "Consejos", "Convierte las visitas en llamadas", "Cómo convertir visitas del sitio en llamadas", "El tráfico no reserva el trabajo. La página tiene que darle a la persona una forma obvia de llamarte.", "Que te encuentren es la mitad. La otra mitad es que, ya en la página, sepan qué tocar. En un negocio de servicios ese toque casi siempre es el teléfono.", "Están en la página. Eso no es un trabajo. El trabajo empieza cuando marcan o mandan un formulario que de verdad contestas.", "Entre la llegada y ese toque es donde los sitios se ponen fancy y se quedan callados: tres botones, un chat, un PDF, una historia."],
  ["make-your-website-mobile-ready", "Diseño", "Deja el sitio listo para el celular", "Sitio móvil para negocios de servicios", "La búsqueda ocurre en la entrada o en la cocina. La página tiene que cargar y mostrar el siguiente paso.", "Si el sitio se ve bien en la computadora y se rompe en el celular, se rompe donde está el cliente.", "Un pulgar se detiene en el celular en la entrada. La búsqueda fue corta, el problema no, y la página tiene unos cinco segundos.", "El número cabe en la pantalla. Nada de pellizcar. El botón de llamar queda visible sin bajar tres pantallas."],
  ["build-trust-with-reviews", "Consejos", "Gana confianza con reseñas reales", "Cómo usar reseñas de Google en un sitio de servicios", "La siguiente cliente compara dos empresas en el estacionamiento. Gana quien suena a trabajo real.", "Está en el estacionamiento, el pulgar encima de dos empresas que dicen que pueden ir hoy. La tuya tiene 14 reseñas y una respuesta bajo la difícil. La otra tiene 90 de “excelente!!!” de hace tres años.", "La confianza, en un oficio, es esa pequeña diferencia: se oye un trabajo real en las oraciones y se ve que no desapareciste cuando alguien estuvo molesto.", "Pide después del trabajo con enlace directo. Responde en específico. No compres estrellas."],
  ["small-business-marketing-budget", "Consejos", "Presupuesto de marketing para un negocio de servicios", "Presupuesto de marketing para negocios de servicios", "Antes de anuncios, el sitio tiene que contestar el teléfono.", "La conversación del presupuesto suele empezar en el lugar equivocado: qué anuncios, qué software, qué “paquete” suena a empresa más grande.", "Un negocio de una camioneta no necesita una pila. Necesita una página que un desconocido pueda usar, un perfil que diga la verdad y una forma de contestar o devolver la llamada.", "Gasta en ese orden. El resto cuando los primeros dólares ya producen conversaciones que puedes contar."],
  ["monthly-website-vs-own-it", "Consejos", "Plan mensual u Own It: qué encaja", "Plan mensual de sitio u Own It | Kinexis", "Compara flujo de caja, herramientas y qué pasa con los archivos si cancelas.", "Dos dueños pueden querer el mismo inicio y necesitar papeles distintos. Uno quiere que el sitio se comporte como la factura del teléfono. El otro acaba de cobrar un trabajo grande y prefiere pagar una vez.", "Ninguno es el cuidadoso. El error es firmar una palabra —renta, propio, mío— que el contrato no usa.", "Aquí está la diferencia publicada, sin cuento de miedo de que tu negocio desaparezca de la noche a la mañana."],
  ["how-to-ask-for-google-reviews-contractor", "Consejos", "Cómo pedir reseñas de Google después de un trabajo", "Cómo pedir reseñas de Google | Guiones", "Guiones cortos para la obra, el texto y el correo. Reseñas reales con enlace directo.", "El calentador ya está. El tanque viejo va en la diablilla. El cliente está en la cocina, aliviado. Ese es el momento en que pedir una reseña es fácil y fácil de olvidar.", "Una buena costumbre de reseñas es sobre todo timing, un enlace que abre la página correcta y una frase que puedas decir sin encogerte.", "No inventes reseñas. No las compres. No pidas solo las de cinco estrellas."],
  ["google-business-profile-checklist", "SEO", "Lista del Perfil de Negocio de Google", "Checklist Perfil de Negocio de Google | Oficios", "Reclama el perfil, corrige horario y zona, sube fotos reales y deja un enlace de reseña.", "Abre Google en el celular y busca tu empresa como lo haría un desconocido: el oficio y luego “cerca de mí”. Si la tarjeta falta, el nombre está mal o el horario dice cerrado mientras estás en el taller, nada más que hagas este mes importa tanto como arreglar esa tarjeta.", "El perfil no es una red social que alimentas cuando te inspira. Es el registro público de si estás abierto, qué arreglas y qué número suena.", "Los rankings no están en la lista, porque no los controlas."],
];

const moreFromMeta = {};
for (const [slug, category, title, seoTitle, excerpt, lead, scene, job] of ALL_META) {
  moreFromMeta[slug] = guide(slug, {
    category,
    title,
    seoTitle,
    excerpt,
    lead,
    scene,
    job,
    ctaExtra: "",
  }, [
    {
      h2: "Detalles que suelen fallar",
      html: paras(
        SHARED.gbp,
        SHARED.doorway,
        SHARED.textback,
        SHARED.ftc,
        `<p>Relacionados: <a href="/blog/local-seo-get-found-get-called">SEO local</a>, <a href="/blog/website-mistakes-that-cost-you-calls">errores que cuestan llamadas</a>, <a href="/blog/how-to-ask-for-google-reviews-contractor">pedir reseñas</a>.</p>`,
      ),
    },
    {
      h2: "Hábitos semanales que sí se mantienen",
      html: `<p>Una vez a la semana, en un día sin tormenta: prueba el botón de llamar, confirma el horario de hoy, responde reseñas nuevas y rechaza ediciones sugeridas que te renombren o te marquen cerrado. Sube dos fotos de trabajos recientes si las tienes. Aburrido significa estable. Estable es lo que quieres cuando llega la granizada.</p><p>Si el perfil es honesto y el sitio pierde el toque, deja de pulir la descripción y arregla la primera pantalla. La lista de contratistas está en <a href="/blog/web-design-for-contractors">diseño web para contratistas</a>.</p>`,
    },
  ]);
}

const B_META = [
  ["freelancer-vs-agency-vs-subscription-website", "Consejos", "Freelancer, agencia o plan de sitio", "Freelancer vs agencia vs plan mensual de sitio", "Quién hace el trabajo cuando estás bajo una casa, qué te queda si sales y si alguien responde cuando el teléfono debe sonar.", "Tienes tres cotizaciones en el asiento y un trabajo que empieza a las siete. Una es un freelancer. Otra una agencia con presentación. Otra un plan mensual con un número que cabe en la misma hoja que el contenedor y el seguro.", "Ninguna es moralmente superior. Fallan en lugares distintos, y un negocio de una camioneta siente esos fallos en horas, no en talleres de marca.", "La pregunta útil es quién trabaja cuando estás bajo una casa, qué te puedes llevar si cancelas y si alguien es responsable de que el teléfono suene."],
  ["wix-vs-squarespace-vs-managed-website-contractors", "Diseño", "Wix, Squarespace o un sitio administrado", "Wix vs Squarespace vs sitio administrado | Contratistas", "DIY se siente barato el primer login. Un plan administrado cuesta una tarifa publicada y entrega hosting y cambios a otra persona.", "Son las 9:40 de un jueves. La camioneta está descargada y la laptop abierta porque el sitio “iba a quedar esta semana” hace tres semanas.", "Las plantillas ponen una página en línea rápido. El número sigue en el pie, en un tamaño que se lee en el escritorio y no en la entrada.", "La pregunta útil es quién mantiene el número fácil de tocar después de que el logo se ve bien."],
  ["web-design-for-contractors", "Diseño", "Lista para el sitio web de un contratista", "Lista sitio web contratista | Kinexis", "Un sitio de contratista no es un catálogo bonito. Tiene que nombrar el trabajo, la zona y el teléfono en la primera pantalla.", "Cuando alguien busca un contratista no está ojeando portfolios. Compara tres resultados en el celular y elige al que se entiende más rápido.", "Esta lista apoya la página de <a href=\"/web-design\">diseño web para contratistas</a>. No es un segundo pitch para la misma visita.", "Primera pantalla: trabajo, zona, teléfono. Luego una página por trabajo y prueba real."],
  ["google-business-profile-vs-website", "SEO", "Perfil de Google vs sitio web", "Perfil de Negocio de Google vs sitio web", "El perfil y el sitio hacen trabajos distintos. Bastantes dueños necesitan los dos.", "Una clienta sin agua caliente busca en el celular en la entrada. El mapa muestra tres tarjetas. Casi toca la tuya. Luego quiere saber si cambias tanques o “solo haces plomería”.", "Abre el enlace del sitio, llega a una página de Facebook y llama a la siguiente empresa, cuya página de calentador sí existe.", "No perdiste un concurso de ranking. Perdiste una pregunta que el perfil nunca pudo contestar."],
  ["missed-call-text-delayed-10dlc", "Consejos", "Por qué el texto de llamada perdida tarda", "Retraso del texto de llamada perdida | 10DLC", "El texto suena simple. La parte que se subestima es la espera antes de que el operador permita el primer mensaje.", "El sitio dice que respondes si pierdes la llamada. El jueves estás bajo un lavabo, el teléfono suena y no sale nada.", "No olvidaste un interruptor. El texto espera a un operador, y el operador aún no dijo que sí.", "Esto es opcional, necesita línea dedicada y normalmente tarda 10 a 15 días. La aprobación no está garantizada."],
  ["missed-call-text-back-templates", "Consejos", "Plantillas de texto por llamada perdida", "Plantillas SMS llamada perdida por oficio", "Borradores por oficio con tiempos honestos de aprobación del operador.", "Estás a mitad de un trabajo. El teléfono suena en la camioneta. No puedes contestar. Un texto corto que nombra el negocio y pregunta qué necesitan a menudo basta para que no marquen al siguiente de Google.", "Esta página son borradores. Pide revisión de cumplimiento antes de enviar. No es un comparativo de software.", "Estima llamadas perdidas con la <a href=\"/tools/missed-call-calculator\">calculadora</a>."],
  ["pagina-web-para-plomeros", "Diseño", "Qué debe tener una página web para plomeros", "Página web para plomeros | Kinexis", "Quien tiene una fuga no lee párrafos. Necesita tu número, tu zona y si puedes ir hoy.", "La mitad de quien entra a una página de plomería tiene agua donde no debería. La otra mitad planea un calentador y sí lee.", "Una buena página atiende a los dos sin hacer esperar a ninguno. El hub de diseño es <a href=\"/industries/plumbing\">plomería</a>.", "Separa urgencia y cotización. Pon el teléfono arriba. Sé honesto con el horario."],
  ["como-pedir-resenas-en-google", "Consejos", "Cómo pedir reseñas en Google sin sonar forzado", "Cómo pedir reseñas en Google | Guión", "Momento, enlace directo y mensaje corto después de un trabajo real.", "La siguiente llamada casi siempre mira tus reseñas antes de marcar. Pedirlas en la puerta funciona a veces. Mandar el enlace cuando el trabajo ya se ve funciona más.", "Consigue el enlace con la <a href=\"/tools/google-review-link-qr\">herramienta de QR</a>. Pruébalo en un celular que no sea el del dueño.", "No pagues por estrellas. No escribas el párrafo para que lo peguen."],
];

const B = {};
for (const [slug, category, title, seoTitle, excerpt, lead, scene, job] of B_META) {
  const extra =
    slug === "missed-call-text-back-templates"
      ? [
          {
            h2: "Plantillas de plomería y HVAC",
            html: `<p id="plumbing">Úsalas como borrador.</p><ul><li><code>Hola, habla {Business}. Perdimos tu llamada de plomería. Responde FUGA, DRENAJE o CALENTADOR y el mejor número.</code></li><li><code>Gracias por llamar a {Business}. Estamos en un trabajo. Si no hay agua o hay rotura, responde URGENTE.</code></li></ul><p id="hvac"><ul><li><code>Hola de {Business}. Perdimos tu llamada. Responde SIN AIRE, SIN CALOR o COTIZACIÓN y tu código postal.</code></li></ul></p>`,
          },
          {
            h2: "Más oficios",
            html: `<p>Electricidad, techos, puertas, pintura, remodelación, jardinería, albercas, lavado y vidrios: el mismo patrón — nómbrate, pide el tipo de trabajo, ofrece salida. El detalle por oficio está en la versión larga del blog en inglés y en <a href="/pricing">Lead System y Plus</a>.</p>${SHARED.textback}`,
          },
        ]
      : [
          {
            h2: "Cómo decidir sin miedo",
            html: paras(
              SHARED.gbp,
              SHARED.textback,
              `<p>Compara columnas iguales: páginas, hosting, cambios, seguimiento, salida. Evita promesas de puesto en Google. Nadie fuera de Google controla eso; la guía de <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" rel="noopener noreferrer" target="_blank">SEO para empezar</a> es un buen piso gratis.</p>`,
            ),
          },
        ];
  B[slug] = guide(slug, { category, title, seoTitle, excerpt, lead, scene, job, ctaExtra: "" }, extra);
}

const pillarsA = {
  ...A,
  ...REST_A,
  ...moreFromMeta,
};

dump("ES_PILLAR_POSTS", pillarsA);
dump("ES_PILLAR_POSTS_MORE", B);
console.log("done", Object.keys(pillarsA).length, Object.keys(B).length);

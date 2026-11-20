import type { EsPost } from "@/i18n/es-post-type";

/** Spanish bodies for the three covers reserved for these newer English guides. */
export const ES_ARTWORK_POSTS: EsPost[] = [
  {
    slug: "contractor-website-quote-form",
    category: "Diseño",
    title: "Cómo crear un formulario de cotización para contratistas",
    seoTitle: "Formulario de cotización para contratistas",
    excerpt: "Pide solo los datos necesarios para responder y cotizar. Un formulario breve ayuda a que el cliente no abandone desde el celular.",
    lead: "Un formulario de cotización no es una encuesta: es el primer paso para que alguien explique el trabajo y tú puedas responder. Si pide demasiados datos antes de mostrar cómo contactarte, la persona puede volver a Google y llamar a otro negocio.",
    sections: [
      {
        h2: "Empieza con los datos que sí necesitas",
        html: `<p>Para la mayoría de los negocios de servicios, empieza con nombre, teléfono, tipo de trabajo y ciudad o código postal. El teléfono permite devolver la llamada; el trabajo y la ubicación ayudan a saber si puedes atenderlo.</p><p>Deja opcionales las notas, fotos y horarios preferidos. Puedes pedir esos detalles después de confirmar que el contacto y el trabajo están dentro de tu zona.</p>`,
      },
      {
        h2: "Adapta el formulario al trabajo",
        html: `<p>Una fuga urgente y una remodelación planeada no necesitan el mismo siguiente paso. Para una emergencia, muestra primero un botón para llamar y deja el formulario como alternativa. Para una cotización de pintura, jardinería o remodelación, un formulario corto puede ser el camino principal, con el teléfono todavía visible.</p><p>En plomería, por ejemplo, puedes pedir nombre, teléfono, servicio (fuga, drenaje o calentador) y ciudad. Una descripción breve puede ayudar; no obligues a subir fotos para poder enviar la solicitud.</p>`,
      },
      {
        h2: "Quita obstáculos innecesarios",
        html: `<p>No pidas una cuenta, una contraseña ni un correo obligatorio si piensas llamar. Evita preguntas de atribución antes de que la persona pueda explicar el trabajo. Cada campo obligatorio debe ayudarte a decidir si puedes atender la solicitud.</p><p>El formulario debe ser fácil de completar con una mano en el celular. Usa etiquetas claras, errores comprensibles y un botón de envío visible.</p>`,
      },
      {
        h2: "Confirma qué pasa después",
        html: `<p>Después del envío, explica quién responderá y dentro de qué horario. Usa un plazo que tu negocio realmente pueda cumplir; no prometas una respuesta inmediata si el equipo está trabajando en campo.</p><p>Envía la notificación al teléfono o correo que alguien revisa. Antes de publicar, manda una solicitud de prueba desde un celular y confirma que llegó al lugar correcto.</p>`,
      },
      {
        h2: "Conecta el formulario con páginas útiles",
        html: `<p>Un formulario breve funciona mejor junto a páginas claras de servicios y una zona de atención honesta. La persona debe reconocer su trabajo y saber si llegas a su ciudad.</p><p>En Kinexis, los precios y términos vigentes están en <a href="/pricing">planes y precios</a>. Puedes <a href="/contact">pedir una vista previa gratis</a> de la página de inicio antes de elegir un plan.</p>`,
      },
    ],
  },
  {
    slug: "contractor-website-redesign-checklist",
    category: "Diseño",
    title: "Lista para rediseñar el sitio web de tu negocio de servicios",
    seoTitle: "Lista para rediseñar un sitio web",
    excerpt: "Planea el contenido, las direcciones y los formularios antes de cambiar el diseño, para que el nuevo sitio no pierda páginas que ya reciben visitas.",
    lead: "Un rediseño debe resolver problemas reales: un teléfono difícil de encontrar, páginas que ya no describen tus servicios o un sitio incómodo en el celular. También debe cuidar la migración. Si cambian las direcciones sin redirecciones, los clientes y Google pueden llegar a páginas que ya no existen.",
    sections: [
      {
        h2: "Decide si el rediseño hace falta",
        html: `<p>Revisa qué confunde a tus clientes y qué dificulta recibir solicitudes. ¿Se puede tocar el número para llamar? ¿Las páginas describen trabajos que todavía haces? ¿El formulario pide demasiada información? ¿El sitio tarda en abrir en el celular?</p><p>Si el sitio ya explica los servicios, muestra cómo contactarte y recibe solicitudes, quizá solo necesite cambios puntuales. Si vas a cambiar de plataforma, hosting o estructura, planifica una migración aunque el diseño visual parezca similar.</p>`,
      },
      {
        h2: "Haz un inventario antes de cambiar páginas",
        html: `<p>Reúne las páginas actuales y marca cuáles conservar, combinar o retirar. Prioriza las páginas de servicios que todavía vendes, las que reciben consultas y cualquier contenido con fotos o información útil.</p><p>Anota también los elementos que no deben perderse: formularios y sus notificaciones, números de seguimiento, enlaces a documentos y la dirección del sitio en tu Perfil de Negocio de Google.</p>`,
      },
      {
        h2: "Prepara un mapa de redirecciones",
        html: `<p>Por cada dirección antigua que recibe visitas o aparece en Google, define su destino nuevo. Si una página de servicio cambia de ruta, configura una redirección permanente a la página equivalente. No mandes todas las direcciones antiguas a la página de inicio si hay un reemplazo más preciso.</p><p>Prueba las redirecciones antes y después del lanzamiento. Deben llevar a la página correcta, sin ciclos ni cadenas largas. Si una página se elimina sin reemplazo, debe responder como inexistente en lugar de mostrar un error con código de página correcta.</p>`,
      },
      {
        h2: "Conserva lo que ayuda a generar llamadas",
        html: `<p>El nuevo diseño puede cambiar, pero conserva los datos del negocio, horarios, teléfonos, servicios reales, zona de atención, fotos propias y caminos para llamar o pedir una cotización. Comprueba que los formularios sigan llegando a una bandeja o teléfono atendido.</p><p>Revisa títulos, encabezados y enlaces internos. Evita páginas casi idénticas que solo cambian el nombre de una ciudad; publica una zona de servicio que el equipo realmente cubre.</p>`,
      },
      {
        h2: "Verifica el lanzamiento",
        html: `<p>Antes de anunciar el sitio, prueba en un celular los botones para llamar, los formularios, las páginas principales y algunas direcciones antiguas. Actualiza el enlace del sitio en tu Perfil de Negocio de Google y revisa que el mapa del sitio incluya las páginas nuevas.</p><p>Después del cambio, vigila errores de páginas no encontradas y confirma que las páginas importantes sigan recibiendo visitas. Para la estructura inicial, consulta <a href="/web-design">diseño web</a>; los planes y términos están en <a href="/pricing">precios</a>.</p>`,
      },
    ],
  },
  {
    slug: "how-to-choose-contractor-web-designer",
    category: "Diseño",
    title: "Cómo elegir a un diseñador web para tu negocio de servicios",
    seoTitle: "Cómo elegir un diseñador web",
    excerpt: "Compara propiedad, alcance, costos, formularios y soporte por escrito antes de contratar a quien hará el sitio de tu negocio.",
    lead: "Elegir a quien diseñará tu sitio no es solo cuestión de estilo. También importa quién administra el dominio, dónde llegan las solicitudes y qué sucede con los archivos si termina el servicio. Compara las respuestas por escrito antes de pagar un anticipo.",
    sections: [
      {
        h2: "Primero, qué debe resolver el sitio",
        html: `<p>Un sitio de servicios debe explicar qué trabajo haces, qué zona cubres y cómo llamar o pedir una cotización desde un celular. Pide ver un sitio real en móvil y comprueba que el número se pueda tocar y que el formulario funcione.</p><p>Las fotos ayudan cuando muestran trabajo propio. No reemplazan páginas claras ni una ruta de contacto que llegue a alguien que pueda responder.</p>`,
      },
      {
        h2: "Pregunta quién controla el dominio y los archivos",
        html: `<p>¿En qué cuenta está registrado el dominio? ¿Puedes entrar sin depender del diseñador? ¿Quién renueva el dominio y dónde se alojan los archivos? Pide que la propiedad, la transferencia y cualquier costo de salida queden por escrito antes del lanzamiento.</p><p>Si eliges un plan mensual administrado, confirma qué ocurre al cancelar y si existe una opción de compra o transferencia. No supongas que el dominio y los archivos siguen el mismo acuerdo.</p>`,
      },
      {
        h2: "Aclara el alcance y todos los costos",
        html: `<p>Pide una lista de páginas incluidas, qué contenido debes entregar y quién escribe los textos o toma las fotos. Separa diseño, hosting, cambios, herramientas, SEO continuo y cualquier servicio de terceros. Pregunta también por plazos, renovaciones y condiciones para cancelar.</p><p>El SEO técnico de lanzamiento no es lo mismo que un servicio continuo de posicionamiento. Desconfía de promesas de una posición específica: nadie puede garantizar el resultado de Google.</p>`,
      },
      {
        h2: "Prueba formularios, llamadas y soporte",
        html: `<p>Pregunta a qué teléfono o correo llegan las solicitudes y quién responde cuando falla un formulario. Antes de pagar el saldo, envía una prueba y comprueba que llegó. Pide una explicación del soporte y los tiempos de respuesta después del lanzamiento.</p><p>Si te ofrecen seguimiento de llamadas, solicitudes de reseñas o mensajes tras una llamada perdida, pide que expliquen qué incluye cada plan. Los mensajes de llamada perdida son opcionales, requieren una línea dedicada y aprobación del operador, que no está garantizada.</p>`,
      },
      {
        h2: "Compara opciones con las mismas preguntas",
        html: `<p>Un profesional independiente, una agencia, un constructor que manejas tú o un plan administrado pueden ser opciones válidas. Compara el costo total, tu tiempo, quién mantiene el sitio y qué tan fácil será cambiar de proveedor.</p><p>Kinexis publica sus opciones y términos en <a href="/pricing">planes y precios</a>. Cada plan empieza con una vista previa gratis de la página de inicio en 2 días hábiles, sin tarjeta ni obligación. También puedes <a href="/contact">solicitarla</a> antes de decidir.</p>`,
      },
    ],
  },
];

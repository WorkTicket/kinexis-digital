/** Spanish pillar bodies for build-es-pillars-more.mjs */

/** @param {string} h2 @param {string[]} ps */
const sec = (h2, ps) => ({
  h2,
  html: ps.map((p) => `<p>${p}</p>`).join(""),
});

/** @param {string} h2 @param {string} html */
const secHtml = (h2, html) => ({ h2, html });

/** @param {{ sections: Section[] }} post @param {Section[]} extra */
const withSections = (post, extra) => ({
  ...post,
  sections: [...post.sections, ...extra],
});

const TEMPLATE_SECTIONS = [
  {
    h2: "Cómo funciona aquí",
    html: `<p>Lead System y Plus pueden enviar un SMS a quien llamó a tu número de seguimiento, después de la aprobación del operador. Se necesita una línea dedicada. Un segundo número cuesta $1/mes. Pueden aplicar tarifas del operador. Esta página son plantillas — no una comparación de software.</p><p>Estima ingresos en riesgo con la <a href="/tools/missed-call-calculator">calculadora de llamada perdida</a>.</p>`,
  },
  {
    h2: "Plantillas de plomería",
    html: `<p id="plumbing">Úsalas como borrador. Pide una revisión de cumplimiento (TCPA u otras reglas) antes de publicar.</p><ul><li><code>Hola, habla {Business}. Acabamos de perder tu llamada de plomería. Responde FUGA, DRENAJE o CALENTADOR y el mejor número/hora para localizarte.</code></li><li><code>Gracias por llamar a {Business}. Estamos en un trabajo y te devolvemos la llamada pronto. Si no hay agua o hay una rotura, responde URGENTE.</code></li><li><code>Vimos tu llamada perdida. Para cotizar un calentador, responde con marca/edad si la sabes. Te mandamos una ventana de visita.</code></li><li><code>Nota fuera de horario de {Business}: deja el problema en un texto y confirmamos a primera hora en horario de atención.</code></li><li><code>Si llamaste por un tapón, responde DRENAJE y tu ciudad. Confirmamos si podemos llegar hoy.</code></li></ul>`,
  },
  {
    h2: "Plantillas de HVAC",
    html: `<p id="hvac">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business} — perdimos tu llamada. Responde SIN AIRE, SIN CALOR o COTIZACIÓN y tu código postal.</code></li><li><code>Estamos en un servicio. Responde URGENTE si no hay aire/calor y priorizamos la devolución.</code></li><li><code>Para cotizar un cambio de equipo, responde con tamaño/edad de la casa si lo tienes. Agendamos una consulta.</code></li><li><code>Fuera de horario: escribe el síntoma y confirmamos la primera ventana del técnico.</code></li><li><code>Temporada de mantenimiento: responde TUNEUP para preguntar por servicio de entretemporada.</code></li></ul>`,
  },
  {
    h2: "Plantillas de electricidad",
    html: `<p id="electrical">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola, {Business} perdió tu llamada. Responde TABLERO, EV o TOMA y tu ciudad.</code></li><li><code>Si huele a quemado o los breakers no reinician, responde URGENTE — no esperes al correo.</code></li><li><code>Cargadores EV: responde con los amperios del tablero si los sabes y agendamos una visita.</code></li><li><code>Fuera de horario: escribe el problema; confirmamos en horario de atención.</code></li><li><code>Solo trabajo eléctrico con licencia — responde con el tipo de trabajo y confirmamos si encaja.</code></li></ul>`,
  },
  {
    h2: "Plantillas de techos",
    html: `<p id="roofing">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business}. Perdimos tu llamada — responde FUGA, CAMBIO o TORMENTA.</code></li><li><code>¿Fuga activa? Responde URGENTE y tu zona. Buscamos una inspección el mismo día cuando la cuadrilla lo permita.</code></li><li><code>Cotizaciones de cambio: responde con edad/material del techo si lo sabes.</code></li><li><code>Seguimiento de tormenta: documentamos el techo; no prometemos resultados de seguro.</code></li><li><code>Fuera de horario: manda fotos del daño si es seguro, y confirmamos los siguientes pasos.</code></li></ul>`,
  },
  {
    h2: "Plantillas de puertas de garaje",
    html: `<p id="garage-doors">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business}. Perdimos tu llamada — responde RESORTE, MOTOR o PUERTA NUEVA y tu ciudad.</code></li><li><code>Estamos en un servicio. Responde URGENTE si la puerta no abre o no cierra y priorizamos la devolución.</code></li><li><code>Resorte o cable roto: responde RESORTE y si la puerta quedó abierta o cerrada.</code></li><li><code>Cotizaciones de puerta nueva: responde sencilla/doble y el material si lo sabes.</code></li><li><code>Fuera de horario: escribe el problema; confirmamos la primera ventana del técnico.</code></li></ul>`,
  },
  {
    h2: "Plantillas de pintura",
    html: `<p id="painting">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business}. Perdimos tu llamada — responde INTERIOR, EXTERIOR o GABINETES y el mejor número/hora.</code></li><li><code>Gracias por llamar a {Business}. Estamos en un trabajo y te devolvemos la llamada pronto. Responde COTIZACIÓN si quieres una ventana de estimado.</code></li><li><code>Para un estimado de exterior, responde con pisos/tipo de revestimiento si lo sabes y tu ciudad.</code></li><li><code>Fuera de horario: manda los cuartos o fotos y confirmamos una visita en horario de atención.</code></li><li><code>Gabinetes: responde GABINETES y si las puertas siguen en los muebles.</code></li></ul>`,
  },
  {
    h2: "Plantillas de remodelación",
    html: `<p id="remodeling">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business}. Perdimos tu llamada — responde COCINA, BAÑO u OTRO y un buen horario para hablar.</code></li><li><code>Estamos en una obra. Responde CONSULTA si quieres agendar una visita, y tu ciudad.</code></li><li><code>Baños: responde con la edad aproximada del baño si la sabes.</code></li><li><code>Fuera de horario: escribe una nota corta del proyecto; confirmamos en horario de atención.</code></li><li><code>Las fotos ayudan — responde FOTO y manda un par cuando puedas.</code></li></ul>`,
  },
  {
    h2: "Plantillas de paisajismo",
    html: `<p id="landscaping">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business}. Perdimos tu llamada — responde MANTENIMIENTO, DISEÑO o LIMPIEZA y tu código postal.</code></li><li><code>Estamos en cuadrilla. Responde COTIZACIÓN si quieres una ventana de estimado y tu ciudad.</code></li><li><code>Mantenimiento semanal: responde RUTA y tu barrio para checar cobertura.</code></li><li><code>Diseño/instalación: responde DISEÑO y una nota corta del proyecto.</code></li><li><code>Fuera de horario: escribe la dirección y el tipo de trabajo; confirmamos en horario de atención.</code></li></ul>`,
  },
  {
    h2: "Plantillas de albercas",
    html: `<p id="pool-care">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business}. Perdimos tu llamada — responde RUTA, VERDE o REPARACIÓN y tu código postal.</code></li><li><code>Estamos en una ruta. Responde URGENTE por alberca verde o bomba muerta y priorizamos la devolución.</code></li><li><code>Servicio semanal: responde RUTA y tu barrio para checar cobertura.</code></li><li><code>Equipo: responde BOMBA o CALENTADOR y la marca si la sabes.</code></li><li><code>Fuera de horario: escribe el problema; confirmamos la primera ventana abierta.</code></li></ul>`,
  },
  {
    h2: "Plantillas de lavado a presión",
    html: `<p id="pressure-washing">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business}. Perdimos tu llamada — responde CASA, CONCRETO o TECHO y tu ciudad.</code></li><li><code>Estamos en un trabajo. Responde COTIZACIÓN para un estimado y qué hay que lavar.</code></li><li><li><code>Entradas/aceras: responde CONCRETO y tu código postal.</code></li><li><code>Lavado suave / algas en techo: responde TECHO — confirmamos el método antes de agendar.</code></li><li><code>Fuera de horario: manda fotos si tienes y confirmamos los siguientes pasos.</code></li></ul>`,
  },
  {
    h2: "Plantillas de vidrios",
    html: `<p id="window-cleaning">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business}. Perdimos tu llamada — responde CASA, APARADOR o RUTA y tu ciudad.</code></li><li><code>Estamos en una ruta. Responde COTIZACIÓN para un estimado de primera limpieza y cuántos vidrios si lo sabes.</code></li><li><code>Aparadores: responde con la dirección del negocio y el día preferido.</code></li><li><code>Limpiezas recurrentes: responde MENSUAL o TRIMESTRAL y confirmamos espacios.</code></li><li><code>Fuera de horario: escribe la dirección; confirmamos en horario de atención.</code></li></ul>`,
  },
  {
    h2: "Plantillas de jardín",
    html: `<p id="yard-care">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business}. Perdimos tu llamada — responde CORTE, LIMPIEZA o MASCOTAS y tu calle/zona.</code></li><li><code>Estamos en una ruta. Responde RUTA si quieres servicio semanal de césped y tu código postal.</code></li><li><code>Mascotas: responde MASCOTAS y cada cuánto necesitas visitas.</code></li><li><code>Limpieza de temporada: responde LIMPIEZA y confirmamos el siguiente día abierto.</code></li><li><code>Fuera de horario: escribe la dirección y el servicio; confirmamos a primera hora.</code></li></ul>`,
  },
  {
    h2: "Nota de cumplimiento",
    html: `<p>Las plantillas de SMS necesitan una revisión de cumplimiento calificada antes de enviarlas a clientes. Siguen aplicando consentimiento, identificación y baja.</p><p><a href="/pricing">Ver Lead System y Plus</a> o <a href="/contact">pide una vista previa gratis</a>.</p>`,
  },
];

// Fix typo in pressure washing template (stray <li>)
TEMPLATE_SECTIONS[10].html = TEMPLATE_SECTIONS[10].html.replace("<li><li>", "<li>");

const freelancerVs = {
  slug: "freelancer-vs-agency-vs-subscription-website",
  category: "Consejos",
  title: "Freelancer, agencia o plan de sitio: cómo elegir sin adivinar",
  seoTitle: "Freelancer vs agencia vs plan de sitio web | Kinexis",
  excerpt:
    "Tres cotizaciones en el banco de la camioneta y un trabajo que empieza a las siete. Ninguna opción es moralmente superior; fallan en lugares distintos.",
  lead: `Tienes tres cotizaciones en el asiento de la camioneta y un trabajo que arranca a las siete. Una es un freelancer que «te deja algo en línea». Otra es una agencia con presentación y reunión de arranque. La tercera es un plan mensual de sitio con una cifra que puedes poner en la misma hoja que el seguro y la renta del local. Ninguna es mejor en abstracto. Fallan en puntos distintos, y una empresa de una sola cuadrilla siente esas fallas en horas, no en talleres de marca. La pregunta útil es quién hace el trabajo cuando estás debajo de una casa, qué te llevas si te vas, y si alguien responde cuando el teléfono tiene que sonar.`,
  sections: [
    sec("Empieza por la hora que no tienes", [
      `A un negocio de una camioneta no le sobra un departamento de marketing. Estás tú, tal vez tu pareja cuando puede contestar, y un teléfono que suena mientras tienes las manos mojadas. Cualquier camino que suponga que tú escribes el copy, persigues al freelancer, aprendes el editor y además atiendes llamadas es un segundo empleo. Ponle precio a ese empleo antes de comparar facturas.`,
      `Escribe lo que necesitas de verdad en los próximos 90 días. Una página que nombre el trabajo, un número que se pueda tocar, una zona de servicio que coincida con la camioneta y una forma de cambiar el horario de feriado sin abrir un ticket que duerme dos semanas. Si también pierdes llamadas en obra, dilo. Si la mitad de tus clientes hablan español, dilo. Esos datos eligen la opción. Un «sentirse más profesional» no.`,
      `Hazles a los tres caminos las mismas preguntas incómodas. ¿Quién responde si el formulario falla un sábado? ¿Qué te queda si dejas de pagar? ¿Cuántos cambios incluye y en cuánto tiempo? ¿El pedido de reseñas va incluido o es otro contrato? Si la respuesta es un encogimiento de hombros, otra vez eres el departamento de marketing.`,
      `Kinexis es una de las opciones mensuales, así que los precios de aquí son los nuestros, no una encuesta del mercado. Website es $97 al mes, Lead System $197, Plus $297, Own It $1,497 de una vez. No vamos a inventar la «típica» tarifa de freelancer ni el «típico» retainer de agencia; esos números se mueven. Pide por escrito el alcance a la persona que tienes enfrente.`,
    ]),
    sec("Lo que un freelancer realmente vende", [
      `Un buen freelancer vende foco. Una persona diseña, escribe lo justo para lanzar y sabe cómo se llama tu negocio. No eres una línea en un despacho de cuarenta personas. Los cambios pueden ser rápidos cuando tiene tiempo, e imposibles cuando está lleno de otros lanzamientos. El riesgo es concentración: si se enferma, agarra un cliente más grande o desaparece, tu sitio queda quieto.`,
      `Pregunta qué significa «terminado». Portada y formulario de contacto está terminado para un folleto. No está terminado si vendes cuatro trabajos distintos y la única página dice «servicios». Pregunta quién hospeda, en qué cuenta está el dominio y si puedes llevarte los archivos sin negociar. Que quede por escrito antes del anticipo, no cuando ya estés molesto.`,
      `Pregunta qué pasa en el mes cuatro. Muchos sitios de freelancer son proyecto, no relación. El lanzamiento se ve bien. Luego el horario de diciembre está mal, el formulario cae en spam y pagas por hora cada frase. Puede ser un trato justo si te gusta el mantenimiento y la tarifa por hora es una que sí vas a usar. Es mal trato si querías que el sitio dejara de ser tu problema.`,
      `Los freelancers casi nunca están listos para correr texto por llamada perdida, pedidos de reseña y un reporte mensual como un solo sistema. Algunos pegan herramientas. Muchos te mandan a software y buena suerte. Si el seguimiento es por lo que compras, dilo en el primer correo. No lo descubras después de pagar el diseño.`,
    ]),
    sec("Lo que suma una agencia, y qué cuesta en tiempo", [
      `Una agencia vende banca: diseñador, redactor, alguien que habla de búsqueda, alguien que manda la factura. Esa banca vale cuando necesitas marca, varias ubicaciones o trabajo más grande que un sitio de servicios. También puede significar kickoff, documento de estrategia y un sitio sin número visible en el encabezado porque nadie en el hilo maneja una camioneta.`,
      `Tu tiempo es la línea oculta. Las agencias programan reuniones. Las pierdes porque estás en un trabajo sin aire y el proyecto duerme una semana. Un proceso pensado para una empresa con gerente de marketing castiga a quien no lo tiene. Pregunta cuántas reuniones son obligatorias, si puedes aprobar por texto y qué pasa si te callas diez días en temporada alta. La respuesta dice si han trabajado con oficios o solo con gente que vive en calendarios.`,
      `Pregunta quién atiende después del lanzamiento. Quien te vendió puede no ser quien cambia tu horario. Si los cambios pasan por tickets, pide el tiempo real de respuesta, no el del folleto. «Respondemos en un día hábil» sirve. «Somos ágiles» no.`,
      `Los retainers de SEO casi siempre son compra aparte, aquí también. No asumas que la cotización de agencia incluye meses de búsqueda. Lee el alcance. Si prometen posición en una fecha, pregunta qué pasa cuando la fecha llega y Google no coincide. Una agencia seria habla de páginas, claridad e informes. Una descuidada habla de «posición uno».`,
    ]),
    sec("Para qué sirve un plan mensual", [
      `Un sitio por suscripción es apostar que prefieres pagar una cifra conocida y que otro mantenga hosting y cambios a ser dueño de un proyecto. En Kinexis los planes mensuales son $0 de entrada y mes a mes. Cancelas cuando quieras por texto, correo o Messenger. El sitio sigue en línea en el período ya pagado; después el hosting termina salvo que arregles una compra de archivos o pases a Own It antes de que cierre ese período. Sin cargo por cancelar.`,
      `Website a $97 al mes es la versión sencilla: hasta 5 páginas, hosting y SSL, hasta dos cambios pequeños al mes en dos días hábiles, seguimiento de leads por formulario. Páginas nuevas cuestan $99. No incluye pedidos de reseña ni texto por llamada perdida. El texto se puede agregar por $97 al mes si tienes línea dedicada. La aprobación del operador suele tardar 10–15 días y no está garantizada.`,
      `Lead System a $197 agrega lo que muchas camionetas necesitan en obra: texto opcional por llamada perdida (un segundo número de seguimiento cuesta $1 al mes si lo usas, más tarifas del operador), pedido de reseña en Google después del trabajo, ajuste del perfil al lanzar, seguimiento de llamadas con reporte mensual, cambios pequeños ilimitados en un día hábil y una página nueva al mes incluida. Hasta 10 páginas. Plus a $297 es la versión bilingüe: hasta 20 páginas en inglés y español, pedidos y texto opcional en ambos idiomas, dos publicaciones al mes en el perfil, cambios el mismo día hábil si entran antes del mediodía hora Centro.`,
      `Todo empieza con vista previa gratis de la página de inicio en dos días hábiles. Sin tarjeta. Ves la primera pantalla antes de pagar. Tras aprobar y enviar lo que necesitamos, el lanzamiento suele ser cinco días hábiles, confirmado por escrito. La cuadrícula completa está en <a href="/pricing">precios</a>. Este artículo es la comparación, no una segunda lista de precios.`,
    ]),
    sec("Own It es un cuarto camino, no un eslogan", [
      `Own It son $1,497 de una vez, pagados al aprobar la vista previa. Los archivos del sitio son tuyos desde el día del lanzamiento. Hosting, SSL y cambios pequeños (hasta 30 minutos al mes, en dos días hábiles) van incluidos 12 meses. El primer año del dominio también. No hay plan mensual ni garantía de leads de 60 días. Después de 12 meses, Site Care opcional cuesta $39 al mes por hosting y hasta 30 minutos de cambios. Los minutos no usados no se acumulan. Páginas nuevas se cotizan por escrito.`,
      `Ese es el resultado parecido al freelancer con precio publicado: pagas una vez, tienes los archivos, tú respondes por lo que sigue salvo que compres Site Care o contrates a otro. Encaja si quieres una línea de meta. Encaja mal si querías que alguien siga mandando pedidos de reseña y un reporte de llamadas cada mes. Eso vive en Lead System y Plus, no en Own It.`,
      `La compra de archivos en un plan mensual es la otra puerta hacia la propiedad. Si cancelas y quieres quedarte el sitio, una compra única por escrito de $1,497 de los archivos te deja hospedarlos en otro lado. Pide los términos por escrito antes de cancelar. No asumas que el plan mensual te entregó los archivos el día uno. Kinexis hospeda y administra mientras el plan está activo. Own It es el plan donde los archivos son tuyos desde el lanzamiento.`,
      `Un recorrido más largo sobre cancelar, compra y Site Care está en <a href="/blog/monthly-website-vs-own-it">plan mensual u Own It</a>. Úsalo cuando solo te quedan esas dos opciones y la charla con el freelancer ya terminó.`,
    ]),
    sec("Los cambios son donde se pone a prueba la relación", [
      `Todo sitio está mal al mes. Quitas un servicio, agregas un pueblo, cambia un número, una foto de 2019 tiene que bajar. La cotización barata del lanzamiento se encarece en cambios si cada frase es factura y espera.`,
      `En nuestros planes mensuales, un cambio pequeño toma 30 minutos o menos, uno a la vez. Website incluye hasta dos al mes. Lead System y Plus incluyen cambios pequeños ilimitados dentro de esa definición, en los plazos de arriba. No es cheque en blanco para galería nueva, rebranding o expansión de doce páginas. Es «cambia el horario de feriado y cambia la foto principal» sin gerente de proyecto.`,
      `Pide al freelancer y a la agencia la misma definición. ¿Qué incluye 90 días después del lanzamiento? ¿Cuál es la tarifa después? ¿Cómo mandas el pedido — texto, correo, portal que nunca abres? Si la respuesta es otra reunión, no mandarás el pedido y el sitio se pudre. Los sitios podridos te devuelven a esta comparación un año después, molesto con todos, incluidos nosotros.`,
      `La velocidad importa más que el pulido para un oficio. Un número malo corregido mañana vale más que una discusión de layout perfecto el mes entrante. Juzga la opción por el camino de cambios que de verdad usarás un miércoles.`,
    ]),
    sec("El seguimiento no es una decisión de diseño", [
      `El diseño es lo que el cliente ve antes de llamar. El seguimiento es lo que pasa cuando no puedes contestar y lo que pasa después del trabajo para que el siguiente desconocido lea una reseña. Son productos distintos. Un sitio bonito sin plan para llamadas perdidas sigue perdiendo el trabajo que físicamente no pudiste atender.`,
      `Lead System y Plus están pensados para ese hueco: texto opcional en línea dedicada, pedidos de reseña, ajuste del perfil, reporte mensual. El texto es opcional a propósito. No viene «gratis incluido» y no existe hasta que un operador lo aprueba. Dile la verdad al cliente mientras tanto: devuelves la llamada. No prometas un texto que aún no puedes enviar. El retraso se explica en <a href="/blog/missed-call-text-delayed-10dlc">por qué esperan los textos de llamada perdida</a>.`,
      `Un freelancer puede diseñar una página donde llamar sea obvio. Eso vale, y no es lo mismo que correr el texto, el enlace de reseña y el reporte. Una agencia puede vender todo como una pila de herramientas con tres accesos. Si no vas a entrar, es teatro. Prefiere la opción cuyo seguimiento ocurra sin que tú seas el operador.`,
      `Si solo necesitas la página, no compres el seguimiento porque suena serio. Website u Own It pueden ser la opción honesta. Si ya sabes que pierdes llamadas cada semana, no compres la página más barata y esperes disciplina. En julio, cuando estás más ocupado, no alcanza.`,
    ]),
    sec("El trabajo de SEO es una decisión aparte", [
      `Un sitio limpio ayuda a Google y al cliente a entenderte. No es un engagement mensual de SEO. La <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" rel="noopener noreferrer" target="_blank">guía inicial de SEO de Google</a> es la lectura gratis correcta si quieres ver qué significa «páginas claras». No te posiciona sola, y un lanzamiento tampoco.`,
      `Cotizamos SEO aparte de los cuatro planes de sitio. Quien sea honesto contigo debería hacer lo mismo. Un freelancer que mete «SEO» en un build único suele hablar de títulos, encabezados y mapa del sitio. Eso es configuración, no seis meses mejorando páginas que reciben impresiones y cero llamadas. Un retainer de agencia puede ser el trabajo real, o un reporte con flechas. Pide llamadas y formularios reales, no posición.`,
      `Arregla la página antes de pagar tráfico. Anuncios y SEO mandan gente a una URL. Si esa URL esconde el teléfono, compraste una versión más cara del silencio. <a href="/blog/turn-clicks-into-calls">Convertir visitas en llamadas</a> y <a href="/blog/small-business-marketing-budget">dónde va primero el presupuesto</a> son compañeros cuando ya elegiste quién construye el sitio. <a href="/seo-services">Servicios de SEO</a> es donde se define esa capa. Nadie aquí promete ranking.`,
    ]),
    sec("Irse debería ser una frase aburrida", [
      `Algún día querrás salir de algo, aunque hoy te guste. Escribe la salida antes de firmar. Freelancer: ¿puedes llevarte archivos y dominio, y a qué precio? Agencia: ¿periodo de aviso, y eres dueño del diseño o de una licencia? Plan mensual: cancela cuando quieras, el sitio sigue en el período pagado, compra de archivos $1,497 por escrito, o pasa a Own It antes de que termine. Own It: los archivos ya son tuyos; al año eliges Site Care, otro host u otro editor.`,
      `El registro del dominio es la trampa dentro de la trampa. Si el freelancer registró el dominio en su cuenta, no controlas el nombre de tu empresa en internet. Pon el dominio en una cuenta a la que puedas entrar. Renovaciones posteriores en nuestro lado se facturan a costo. El principio es el mismo con quien contrates: el nombre no debe quedar rehén.`,
      `Pregunta también por el contenido. Tus fotos, tus números de licencia, las reseñas que citas en la página deben salir contigo. Un contrato que reclama tus fotos de obra como portafolio exclusivo del proveedor es conversación antes de la primera factura, no durante una pelea.`,
      `«Hazlo tú en un constructor» es un quinto camino que meten en esta elección. Es distinto — tu tiempo en el editor, sus precios, su salida — y tiene su propio artículo: <a href="/blog/wix-vs-squarespace-vs-managed-website-contractors">Wix, Squarespace o sitio administrado</a>. No dejes que un anuncio del constructor resuelva seguimiento y propiedad. Esas son las preguntas. La plantilla no.`,
    ]),
    sec("Una forma sencilla de elegir", [
      `Elige freelancer cuando quieres una persona concreta, toleras un proyecto que termina y editarás tú después o pagarás por hora sin resentimiento. Elige agencia cuando el trabajo es más grande que un sitio de servicios, puedes asistir a reuniones y leíste un alcance que dice lo que no incluye. Elige plan mensual cuando quieres factura conocida, alguien más en cambios y hosting y, si pierdes llamadas, el seguimiento que Website solo no trae. Elige Own It cuando quieres los archivos a tu nombre y aceptas que la garantía de leads y las herramientas mensuales no van en esa compra.`,
      `Ignora discursos de miedo de los cuatro, incluido el nuestro. Freelancer no es «un muchacho que va a desaparecer». Agencia no es «estafa con lobby». Un plan mensual no es trampa si cancelar y compra están por escrito: cancela cuando quieras, compra $1,497 por escrito, devolución de 30 días en todos los planes. Lead System y Plus suman la garantía de leads de 60 días: cero leads rastreados en 60 días y se condonan el 3.er y 4.º cargo. Un lead rastreado es llamada de al menos 30 segundos, quien responde al texto de llamada perdida o formulario de cotización real. Spam, números equivocados, candidatos y clientes actuales no cuentan. Own It no incluye esa garantía.`,
      `Si quieres ver una primera pantalla antes de elegir, pide la vista previa. Dos días hábiles, sin tarjeta, sin obligación de que te encante. <a href="/contact">Contacto</a> es el formulario. Si prefieres leer garantías y reglas de cambios en un solo lugar, quédate en <a href="/pricing">precios</a> hasta que la hoja en tu cabeza esté tranquila. A la camioneta no le importa qué logo construyó el sitio. Le importa que el próximo cliente pueda llamar y que cambiar el horario del sábado no requiera comité.`,
    ]),
    sec("La tabla comparativa es una ayuda de planeación", [
      `La tabla de la página de inicio no es un censo de cada freelancer y agencia. Alinea vista previa gratis antes de pagar, textos por llamada perdida y pedidos de reseña, hosting y actualizaciones, precio fijo 24 meses y sitios en inglés y español. Kinexis aparece marcado en esas filas porque los planes lo incluyen. Freelancers sin marcar; agencias marcadas solo donde hosting o sitio bilingüe es lo común que vemos. Un freelancer cuidadoso puede hospedar, entregar archivos y contestar en español. Una agencia puede no hacer nada de eso. La tabla es nuestra oferta junto a un hueco típico, no afirmación de que todos fallan o todos cumplen.`,
      `Pregunta a quien tienes enfrente y anota la respuesta. Quién hospeda. Quién tiene el dominio. Qué cuesta un cambio después del mes tres. Si los pedidos de reseña van incluidos o son un login que no abrirás. De nuestro lado la conversación es concreta: vista previa antes de pagar, precio mensual fijo 24 meses desde el lanzamiento y al menos 30 días de aviso antes de un cambio después. Del otro lado, lo que diga la propuesta. La propuesta gana a la tabla. Si la propuesta se encoge de hombros, otra vez eres el departamento de marketing, que es justo lo que esta elección debía evitar.`,
      `Haz la tabla en tu cuaderno si eso te ayuda a dormir, pero no dejes que sustituya una conversación. Escribe el nombre de quien hospeda, el correo de quien hace cambios y qué pasa si no pagas el mes diecinueve. Esas tres líneas valen más que comparar logos. Al final del día, el cliente en la entrada solo ve si puede llamar y si alguien contesta.`,
    ]),
  ],
};

const wixVs = {
  slug: "wix-vs-squarespace-vs-managed-website-contractors",
  category: "Consejos",
  title: "Wix, Squarespace o sitio administrado: la noche del jueves",
  seoTitle: "Wix vs Squarespace vs sitio administrado | Kinexis",
  excerpt:
    "La plantilla se ve bien y el número sigue en el pie de página. La pregunta es quién mantiene el teléfono tocable después del logo.",
  lead: `Son las 9:40 de un jueves. La camioneta descargada, la cena en la estufa y el portátil en la barra porque el sitio debía estar listo «esta semana» hace tres. El logo está puesto. El teléfono sigue en el pie de página, legible en el escritorio y no en la entrada. Los constructores DIY se sienten baratos al primer login. Un plan administrado cuesta $97, $197, $297 al mes u Own It $1,497 de una vez, y delega hosting y cambios. Ningún camino es malo por definición. La pregunta útil es quién mantiene el número fácil de tocar cuando el color del encabezado ya te gusta.`,
  sections: [
    sec("Los constructores son buenos para poner un borrador en pantalla", [
      "Puedes probar un diseño cuando los niños ya dormieron. Cambias color sin mandar correo. Controlas la cuenta. Para un dueño que disfruta esas noches y termina, un constructor es legítimo. Un sitio DIY terminado, rápido y honesto le gana a un proyecto administrado inconcluso. Elige el camino que vas a completar.",
      "Los precios públicos se mueven. Mira los planes actuales de Wix y Squarespace y lo que compares, incluido freelancer. Esas tarifas no incluyen horas en páginas de servicio, arreglar la llamada en móvil ni descubrir por qué el formulario cayó en spam. Suma tus horas. Tu noche tiene costo aunque no te factures.",
      "Las plantillas enseñan un «terminado» peligroso. La portada parece empresa por la tipografía. El cliente no sabe si cambias calentadores o solo destapas, y no puede tocar el número sin pellizcar. Bonito y llamable son distinto. La indexación móvil de Google aplica si arrastras bloques o contratas. El teléfono es el escenario en ambos casos.",
      "La versión freelancer y agencia está en <a href=\"/blog/freelancer-vs-agency-vs-subscription-website\">freelancer, agencia o plan de sitio</a>. Quédate aquí si el editor lo usarías tú.",
    ]),
    sec("Dónde se van de verdad las noches", [
      "La primera noche es portada. La segunda, contacto. La tercera descubres que cada trabajo necesita página, la zona debe ser honesta y el número donde el pulgar lo encuentre. Muchas camionetas se atoran cuando la tercera noche choca con emergencias sin aire.",
      "Luego llega el mantenimiento en el mes ocupado. Complementos, formularios rotos, renovación de dominio en bandeja muerta, fotos pesadas que cargan lento en datos. Todo espera a que seas el menos capaz de sentarte. Un plan administrado es pagar a quien sí se sienta.",
      "El seguimiento es otra pila: texto por llamada perdida, reseña después del trabajo, reporte de llamadas. Una suscripción DIY no los trae. En Lead System o Plus forman parte de la oferta, con texto opcional, línea dedicada y aprobación del operador 10–15 días, no garantizada.",
      "Anuncios necesitan página clara. Si esconde el teléfono, más tráfico es silencio más caro. <a href=\"/blog/turn-clicks-into-calls\">Convertir visitas en llamadas</a> y <a href=\"/blog/make-your-website-mobile-ready\">sitio listo para móvil</a> aplican igual al DIY.",
    ]),
    sec("Qué significa administrado en Kinexis", [
      "Vista previa de portada en dos días hábiles, sin tarjeta. Website $97/mes, Lead System $197, Plus $297, Own It $1,497. Mensuales $0 entrada, mes a mes, cancela cuando quieras, precio fijo 24 meses, devolución 30 días por escrito.",
      "Website: hosting, SSL, 5 páginas, dos cambios pequeños/mes. Lead System: reseñas, perfil, reporte, texto opcional, segundo número $1/mes si se usa. Plus bilingüe hasta 20 páginas. Own It entrega archivos día uno, 12 meses hosting y cambios, Site Care $39/mes después.",
      "SEO continuo no va en los cuatro planes. Cotiza aparte. Si no quieres aprender el editor, revisa el camino de cambios: 30 minutos o menos por pedido pequeño.",
      "Tras aprobar vista previa y contenido, lanzamiento suele ser cinco días hábiles, por escrito. Publicar rápido una página mala no es virtud.",
    ]),
    sec("Pon en una hoja la cuenta visible", [
      "Columna DIY: suscripción, apps, dominio, horas, reseñas y textos. Columna administrada: precio con hosting y cambios definidos. No uses promedios de foro.",
      "Costos a 24 meses por oficio en <a href=\"/blog/plumber-website-cost\">plomería</a> y <a href=\"/blog/hvac-website-cost\">HVAC</a>. Este artículo es tiempo. Si no tienes noches, vitrina barata no es barata.",
      "Cotiza la salida: cancelar plan mensual deja sitio en período pagado; después hosting termina salvo compra $1,497 por escrito u Own It antes. Detalle en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a>.",
      "Dominio en cuenta tuya. Renovaciones aquí a costo.",
    ]),
    sec("La tabla de portada es planeación", [
      "Comparamos vista previa gratis, textos, reseñas, hosting, precio 24 meses e inglés/español. Constructores son cuarto camino variable.",
      "Exige términos escrito: texto opcional tras aprobación, reseñas en Lead System/Plus.",
      "SEO continuo fuera de planes. Guía SEO de Google es base, no promesa de posición.",
    ]),
    sec("Lo que debe ser verdad en la página", [
      "Primera pantalla: trabajo, zona, número tocable. Lista en <a href=\"/blog/web-design-for-contractors\">diseño para contratistas</a> y <a href=\"/web-design\">diseño web</a>.",
      "Fotos tuyas, reseñas reales, horario igual que Google.",
      "Si el sitio da vergüenza, arregla la primera pantalla. Enlace roto en el perfil es peor que sin enlace.",
    ]),
    sec("Decisión de domingo", [
      "¿Terminas páginas de servicio este mes? Si no, administrado admite el calendario.",
      "¿Necesitas seguimiento o solo folleto? Lead System/Plus versus Website/Own It.",
      "¿Bilingüe de verdad? Plus, no pie de página decorativo.",
      "<a href=\"/contact\">Contacto</a> vista previa; <a href=\"/pricing\">precios</a>.",
    ]),
    sec("Termina lo que empezaste", [
      "Si el borrador está cerca, sube el número, nombra trabajos, publica horario.",
      "Meses «casi listo» = decisión: dos noches y publicar o entregar contenido.",
      "Dominio tuyo. Reseñas reales. Estándar igual en DIY o administrado.",
    ]),
    sec("El costo invisible de las noches en el editor", [
      "Cada hora en el constructor es hora que no facturas en obra ni contestas emergencias. Eso no aparece en la factura mensual de Wix, pero sí en el ingreso que no entró. Los dueños suelen subestimar cuántas noches necesita una página de servicios honesta: no una lista genérica, sino fugas, calentadores, drenajes y zona en texto legible en móvil.",
      "Si tu temporada alta es verano, construir en julio es construir cuando menos debes abrir el portátil. Un plan administrado no elimina tu trabajo de mandar fotos y horas, pero sí elimina pelear con el editor cuando el teléfono no para.",
      "Pregúntate cuántas veces este año dijiste «actualizo el sitio el domingo» y no pasó. Esas repeticiones son el costo real del DIY. No es moralina; es aritmética con tu calendario.",
      "Hay dueños que disfrutan el control y lo cumplen. Si ese no eres tú, la suscripción barata se convierte en sitio viejo y anuncios que mandan a una página que da vergüenza. El cliente no sabe que «casi» lo terminaste.",
    ]),
    sec("Constructores y seguimiento en el mundo real", [
      "Una suscripción de plantilla rara vez incluye pedido de reseña después del trabajo, ajuste del perfil de Google y reporte de llamadas. Puedes comprar widgets, pero cada widget es otro acceso y otro contrato mental que quizá no abras en temporada de lluvias.",
      "En Lead System ($197/mes) y Plus ($297/mes) esas piezas pueden vivir con el sitio. El texto por llamada perdida sigue siendo opcional, con línea dedicada y aprobación del operador 10–15 días, no garantizada. No prometas texto en la portada del constructor si todavía estás armando la lista de plugins.",
      "Website ($97/mes) y Own It ($1,497) sirven cuando el folleto es lo urgente y el seguimiento puede esperar o hacerse a mano. Own It entrega archivos día uno; después Site Care opcional $39/mes. La compra de archivos al cancelar un mensual es $1,497 por escrito.",
      "Si comparas constructores solo por precio de vitrina, incluye en la misma hoja lo que cobraría un freelancer por hora de cambios en noviembre. A veces el administrado es más barato cuando el precio que importa es «¿quién cambia el horario de Acción de Gracias?»",
    ]),
    sec("Prueba del camión antes de renovar la suscripción", [
      "Antes de renovar otro año en el constructor, abre el sitio en el estacionamiento con datos móviles. ¿El titular nombra el trabajo que quieres vender esta temporada? ¿El número es un toque? ¿Las horas coinciden con el perfil? Si falla alguno, otra renovación solo prolonga el problema.",
      "Manda el enlace a tu cuñado o a la oficina y pide que intenten pedir cotización sin que los guíes. Si se pierden, un desconocido también se pierde.",
      "Si el DIY pasa la prueba, quédate con él y duerme tranquilo. Si no pasa, una vista previa administrada en dos días hábiles, sin tarjeta, te muestra una primera pantalla con tu negocio encima sin tirar el dominio todavía.",
      "El logo bonito puede esperar. El número no. Esa es la comparación entera entre constructor y administrado, reducida a una prueba de cinco minutos en la camioneta.",
    ]),
    sec("Cuando el constructor es la opción correcta", [
      "Elige DIY cuando de verdad terminarás las páginas de servicio este mes, disfrutas controlar la cuenta y puedes mantener horario y número sin depender de tickets. Un sitio terminado en Wix o Squarespace que pasa la prueba del camión es un sitio legítimo.",
      "El constructor brilla en experimentación: probar titulares, cambiar foto de temporada, publicar aviso de vacaciones. Para un dueño que abre el editor cada domingo, la suscripción es herramienta, no castigo.",
      "Ese camino pide disciplina cuando llega julio y el teléfono no para. Si sabes que abandonas el borrador en temporada alta, admítelo antes de renovar. No es falla moral; es patrón de calendario.",
      "Compara salida: lee qué pasa con dominio y exportación si cancelas. Algunos planes permiten HTML; otros encierran más. Pide la respuesta por escrito antes de invertir otro año.",
    ]),
    sec("Cuando el administrado es honestamente más barato", [
      "Suma en una hoja: suscripción anual del constructor, apps de formulario, recordatorio de dominio, y quince horas tuyas valoradas a lo que te pagarías por hora extra de trabajo facturable. Ese total frecuentemente supera Website a $97/mes con cambios pequeños incluidos.",
      "Lead System a $197/mes entra cuando ya sabes que pierdes llamadas y no mandas pedidos de reseña. El texto sigue siendo opcional con reglas del operador; no asumas que llega el día uno.",
      "Own It a $1,497 de una vez encaja si quieres archivos desde lanzamiento y aceptas que reseñas automáticas y garantía de leads no van en esa compra. Site Care $39/mes después del año uno es opcional.",
      "La vista previa gratis en dos días hábiles, sin tarjeta, existe para que compares tu borrador DIY contra una primera pantalla con tu nombre encima sin comprometerte al plan mensual todavía.",
    ]),
    sec("Errores compartidos en DIY y administrado", [
      "Esconder el teléfono por diseño «limpio» falla en ambos caminos. El cliente no adivina que el ícono de teléfono abre marcador.",
      "Zona de servicio inflada genera cotizaciones que rechazas; eso ocurre con plantilla bonita o con copy que alguien más escribió sin conocer tu mapa real.",
      "Prometer texto instantáneo o 24/7 sin operación detrás daña reseñas sin importar quién hospeda.",
      "Revisa <a href=\"/blog/web-design-for-contractors\">lista para contratistas</a> antes de pagar tráfico a cualquier URL.",
    ]),
  ],
};

const webDesign = {
  slug: "web-design-for-contractors",
  category: "Diseño",
  title: "Diseño web para contratistas: lista para la entrada de la casa",
  seoTitle: "Diseño web para contratistas | Lista práctica | Kinexis",
  excerpt:
    "Un pulgar se detiene en la entrada. La página tiene segundos para decir qué haces, dónde vas y cómo llamar. Si falta eso, el diseño es póster.",
  lead: `Un pulgar se detiene en la entrada de una casa. La búsqueda fue corta, el problema no, y la página tiene unos cinco segundos para contestar tres cosas: qué haces, dónde vas y cómo hablar con una persona. Si faltan, el resto del diseño es cartel. Esta es la lista para ese momento. La página de servicio de diseño web vive en <a href="/web-design">diseño web</a>. Este artículo la apoya, no la duplica.`,
  sections: [
    sec("Empieza en la primera pantalla, en el celular", [
      "La mayoría de estas búsquedas van con una mano. A veces es urgencia. A veces cotización para la semana que viene. En ambos casos la persona decide rápido si se queda o vuelve a resultados.",
      "Google indexa con enfoque móvil. Trata el layout del teléfono como el diseño, no como revisión de viernes. Si en escritorio se ve hermoso y en móvil el número está en menú, diseñaste la pantalla equivocada.",
      "El test largo está en <a href=\"/blog/make-your-website-mobile-ready\">sitio listo para móvil</a>. Errores que matan llamadas en <a href=\"/blog/website-mistakes-that-cost-you-calls\">errores que cuestan llamadas</a>. Hubs por oficio en <a href=\"/industries\">industrias</a>.",
      "«Profesional» no es una fuente. Es que un desconocido sepa, en camioneta o cocina, si eres la empresa para este problema.",
    ]),
    sec("Una página por trabajo, no pila de pueblos", [
      "«Servicios de construcción» no ayuda a quien busca baño, techo o cerca. Cada trabajo que quieres que suene el teléfono merece página propia con fotos y siguiente paso.",
      "No necesitas clonar cada pueblo. Una página honesta de zona con ciudades que sí cubres basta. Páginas finas tipo puerta atrapan llamadas que declinarás.",
      "Listas por oficio en <a href=\"/blog/plumbing-website-pages\">plomería</a>, <a href=\"/blog/hvac-website-pages\">HVAC</a>, <a href=\"/blog/electrician-website-pages\">electricidad</a>, <a href=\"/blog/roofing-website-pages\">techos</a>.",
      "Website hasta 5 páginas, Lead System 10, Plus 20 bilingüe, Own It 10. Extra en Website $99. No inventes pueblos para llenar menú.",
    ]),
    sec("Prueba que un desconocido puede verificar", [
      "Licencia y seguro, donde aplique, donde la vista decide. Tus fotos ganan a casco de stock. Reseña corta de Google, citada bien, junto al teléfono.",
      "No edites una reseña dejando solo el halago y quitando el retraso. Guías de la FTC sobre testimonios aplican. Pedir reseñas en <a href=\"/blog/how-to-ask-for-google-reviews-contractor\">cómo pedir reseñas</a>.",
      "Fotos de stock prometen cuadrilla que no llegará. Horario honesto: badge 24/7 con buzón genera la reseña que no pediste.",
      "Iguala sitio y <a href=\"/blog/google-business-profile-checklist\">lista del perfil de Google</a>.",
    ]),
    sec("Dos siguientes pasos, solo esos", [
      "Quien tiene agua en el piso necesita teléfono. Quien planea reemplazo puede usar formulario corto: nombre, teléfono, trabajo, ciudad.",
      "Teléfono primero en páginas urgentes. «Llama por visita hoy» es botón; «saber más» es demora. Más en <a href=\"/blog/turn-clicks-into-calls\">convertir visitas en llamadas</a>.",
      "Texto por llamada perdida es parche, no reemplazo de contestar. Línea dedicada. Lead System/Plus: segundo número $1/mes; Website/Own It extra $97/mes. Aprobación 10–15 días, no garantizada. No prometas texto instantáneo. <a href=\"/blog/missed-call-text-delayed-10dlc\">Por qué esperan los textos</a>.",
    ]),
    sec("Velocidad, tipo y lo que tapa el número", [
      "Comprime el héroe. Foto lenta delante del número es demora. Mapas y chat pueden esperar después del botón de llamada.",
      "PageSpeed es diagnóstico, no trofeo. Texto real gana a palabras dentro de imagen.",
      "Botones grandes para pulgar en movimiento. Gris claro sobre blanco se borra al sol.",
      "Encabezado fijo que come media pantalla esconde lo que querías fijar.",
    ]),
    sec("Recorrido en la entrada", [
      "Abre portada en datos, no Wi‑Fi de taller. Lee titular en voz alta. Busca número sin bajar. Abre página del trabajo que más quieres.",
      "Prueba formulario con un pulgar. Cuenta campos. Envíatelo y mira si cae en spam.",
      "Mira prueba como desconocido: ¿reseña real? ¿foto tuya?",
      "Anota tres arreglos antes de irte. La mayoría solo necesita nombre de trabajo, número tocable y horario que coincida.",
    ]),
    sec("Nombres, enlaces y páginas que no debes clonar", [
      "Un nombre público. Camioneta, sitio, perfil y buzón de acuerdo.",
      "No blogues por obligación. Escribe lo que las últimas diez llamadas preguntaron.",
      "Bilingüe solo si contestas en ambos. Plus hasta 20 páginas y reseñas en inglés y español.",
      "Color puede esperar si el pulgar ya puede llamar. <a href=\"/blog/google-business-profile-vs-website\">Perfil vs sitio</a> dice si aún necesitas página.",
    ]),
    sec("Cómo es un build sin convertir esto en venta", [
      "Vista previa gratis portada en dos días hábiles, sin tarjeta. Lanzamiento completo suele ser cinco días hábiles tras aprobar y enviar contenido, confirmado por escrito.",
      "Website $97, Lead System $197 reseñas y texto opcional, Plus $297 bilingüe, Own It $1,497 archivos tuyos. Mensuales cancela cuando quieras. Devolución 30 días. Garantía leads 60 días en Lead System/Plus. SEO no incluido. <a href=\"/pricing\">Precios</a> y <a href=\"/contact\">contacto</a>.",
      "¿DIY? Lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o administrado</a>. ¿Quién construye? <a href=\"/blog/freelancer-vs-agency-vs-subscription-website\">Freelancer, agencia o plan</a>.",
    ]),
    sec("Pasa la lista a quien teclea", [
      "Freelancer, pareja o build administrado: si no señalan trabajo, zona y teléfono en primera pantalla móvil, no terminó.",
      "El servicio contratista vive en <a href=\"/web-design\">diseño web</a>. Este artículo es la lista de verificación.",
    ]),
    sec("Urgencia y cotización en la misma portada sin pelear", [
      "Muchos contratistas hacen trabajos de hoy y trabajos de la próxima semana. La portada puede servir a los dos si los caminos no compiten por el mismo espacio. El botón grande para llamar en emergencia y el formulario corto para estimado deben verse distintos, no dos botones grises idénticos que nadie entiende.",
      "Si solo promueves «contacto», obligas al charco y al planificador al mismo formulario largo. Perderás uno de los dos tipos de llamada que ya tienes en la vida real.",
      "Páginas separadas por trabajo hacen más fácil esta división. Una página de fuga no necesita el mismo discurso que una de cambio de calentador. El diseño «profesional» que mezcla todo en una galería bonita suele esconder el número.",
      "Antes de discutir color corporativo, dibuja en papel los dos caminos y pruébalos con alguien que no conozca tu empresa. Si tarda más de diez segundos en decidir qué tocar, el diseño todavía no está listo.",
    ]),
    sec("Prueba social sin teatro", [
      "Una reseña real con contexto («llegaron el mismo día por la fuga del baño») vale más que cinco frases vagas. Colócala donde el pulgar decide, no al final de un muro de texto.",
      "Licencia y seguro visibles donde aplique; si tu estado no exige mostrarlos en web, igual puedes decir si estás asegurado cuando eso cierra dudas en trabajos grandes.",
      "Fotos imperfectas de trabajos tuyos ganan a render perfecto de alguien más. El cliente busca prueba de que has estado en una casa parecida a la suya.",
      "Guía FTC sobre testimonios: no inventes voces. Vacío honesto es más creíble que «Juan P.» que escribiste tú.",
    ]),
    sec("Planes Kinexis sin convertir la lista en folleto", [
      "Vista previa gratis de portada en 2 días hábiles, sin tarjeta. Lanzamiento típico ~5 días hábiles tras aprobar y enviar contenido, confirmado por escrito. Website $97/mes, Lead System $197/mes, Plus $297/mes bilingüe, Own It $1,497 una vez. Cancelación mensual cuando quieras; devolución 30 días; garantía de leads 60 días en Lead System/Plus con definición de lead rastreado.",
      "Texto por llamada perdida opcional: segundo número $1/mes en Lead System/Plus si se usa; extra $97/mes en Website/Own It. Aprobación operador 10–15 días, no garantizada.",
      "SEO continuo cotizado aparte en <a href=\"/seo-services\">SEO</a>. Esta lista no promete ranking.",
      "Si la lista pasó y el sitio falla en la entrada, <a href=\"/contact\">pide la vista previa</a>. Si ya tienes proveedor, manda esta lista igual: «terminado» significa llamable en móvil.",
    ]),
    sec("Pop-ups, chat y capas que compiten con el teléfono", [
      "Un cupón a pantalla completa en móvil es impuesto sobre la llamada. El cliente con calentador muerto no cerrará tres capas para encontrar número.",
      "Chat en vivo sin persona detrás promete conversación y entrega buzón. Mejor quitar chat que mentir.",
      "Mapas embebidos pesados pueden esperar después de que el botón de llamar exista en texto real.",
      "Prueba con pulgar en movimiento, no solo con ratón en oficina.",
    ]),
    sec("Tipografía y contraste en la entrada", [
      "Gris claro sobre blanco desaparece en el parabrisas con sol. Negro sobre blanco aburrido gana llamadas.",
      "Texto dentro de imagen no se toca ni escala. Horas y teléfono deben ser HTML.",
      "Encabezado fijo útil solo si es delgado y el número sigue visible.",
      "El diseño «premium» que reduce tamaño de número para verse elegante suele costar leads medibles.",
    ]),
    sec("Checklist para el técnico o la oficina", [
      "Imprime esta lista: trabajo en titular, zona honesta, teléfono tocable, horario igual que Google, formulario corto, fotos tuyas, reseña real citada bien.",
      "Cada ítem es sí o no en celular con datos. Tres «no» bastan para priorizar arreglos antes de marketing.",
      "Pasa la lista al freelancer o al plan administrado como definición de terminado, no como deseo vago de «verse profesional».",
      "Contratistas que pasan la lista dejan de discutir color porque el número ya está ganando.",
    ]),
  ],
};

const googleVs = {
  slug: "google-business-profile-vs-website",
  category: "SEO",
  title: "Perfil de Google vs sitio web: la ficha no es la página",
  seoTitle: "Perfil de Google vs sitio web | Kinexis",
  excerpt:
    "En la entrada casi toca llamar desde el mapa, pero quiere saber si cambias calentadores. La ficha y el sitio hacen trabajos distintos.",
  lead: `Alguien sin agua caliente busca en el celular en la entrada. El mapa muestra tres fichas. La tuya tiene horas, estrellas y botón de llamada. Casi toca. Luego quiere saber si cambias tanques o solo «haces plomería», y la ficha no alcanza. Abre el enlace del sitio, cae en una página de Facebook, y llama al siguiente, cuyo sitio tiene página de calentador y número arriba. No perdió ranking. Perdió una pregunta que la ficha nunca fue a responder.`,
  sections: [
    sec("Aparecen en la misma búsqueda y hacen trabajos distintos", [
      "El paquete de mapas es tarjeta: categoría, estrellas, horas, fotos, llamada, ruta, a veces enlace. Sirve a quien ya sabe el trabajo en una o dos palabras y quiere humano ya. El sitio es donde esas palabras tienen página.",
      "Ayuda del perfil de Google es manual de la tarjeta. No diseña tus páginas de servicio. Quien mete pueblos en la descripción o esconde el teléfono en el sitio mezcla roles.",
      "Puedes verse en mapa y perder el trabajo al hacer clic en sitio. Arregla la página antes de comprar otra publicación en el perfil.",
      "Lista campo por campo en <a href=\"/blog/google-business-profile-checklist\">lista del perfil</a>. Conexión mapa-páginas en <a href=\"/blog/local-seo-get-found-get-called\">SEO local</a>. Este artículo es la decisión intermedia.",
    ]),
    sec("En qué sí es bueno el perfil", [
      "El perfil gana el mapa. Horas, categoría, teléfono real, fotos recientes, reseñas que suenan a clientes.",
      "Las reseñas viven aquí. Pedir está en <a href=\"/blog/how-to-ask-for-google-reviews-contractor\">cómo pedir reseñas</a> y <a href=\"/blog/build-trust-with-reviews\">confianza con reseñas</a>.",
      "Lead System y Plus incluyen ajuste de perfil al lanzar. Plus dos publicaciones al mes. No prometen pin ni reemplazan sitio.",
      "El botón de llamada importa. Segundo número de seguimiento $1/mes en Lead System/Plus si lo usas, más tarifas del operador.",
    ]),
    sec("Para qué sigues necesitando sitio", [
      "Trabajos distintos necesitan pasos distintos. Fuga necesita número grande. Panel necesita explicación y formulario con ciudad.",
      "Una página honesta de zona basta; no clones puerta por pueblo.",
      "Anuncios, letreros y referidos necesitan URL que coincida con la oferta.",
      "Licencia, fotos tuyas y proceso en lenguaje llano. Guías de páginas en <a href=\"/blog/plumbing-website-pages\">plomería</a>, <a href=\"/blog/hvac-website-pages\">HVAC</a>, hubs en <a href=\"/industries\">industrias</a>.",
    ]),
    sec("Cuándo el perfil te aguanta un tiempo", [
      "Puedes esperar sitio completo si el mapa ya te da más llamadas de las que agendas, horas y teléfono son verdad, y no mandas anuncios que necesiten landing.",
      "Aun así mantén la ficha honesta: radio que manejas, fotos de esta temporada, mensajes si contestarás.",
      "Posponer no es nunca sitio. La semana que quieras anuncio o trabajo grande con alcance escrito, la ficha se queda corta.",
      "«Solo perfil» falla al cliente que busca tu nombre para revisarte antes de marcar.",
    ]),
    sec("Cuándo necesitas los dos", [
      "Suma sitio cuando trabajos distintos necesitan páginas, quieres URL para anuncios, cansas de explicar el mismo alcance en cada llamada, o el botón de sitio va a algo vergonzoso. Inglés y español: Plus con reseñas en ambos.",
      "Seguimiento es otro problema: reseñas después del trabajo en Lead System/Plus; texto opcional con línea dedicada y aprobación.",
      "Precios: Website $97, Lead System $197, Plus $297, Own It $1,497. Vista previa dos días hábiles sin tarjeta. SEO continuo no en cuatro planes. <a href=\"/seo-services\">SEO</a>. Propiedad en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a>.",
    ]),
    sec("Nombre, horas y número deben coincidir", [
      "Un nombre público. No metas ciudad en el nombre para cazar búsqueda.",
      "Horas donde mienten de accidente: ficha abierta y buzón a las 5:10. Pon horas que contestas.",
      "Un número principal que llegue a persona en ficha y encabezado del sitio.",
      "Radio de servicio alineado evita cotizaciones que declinas.",
    ]),
    sec("Enlace de sitio que no avergüence la ficha", [
      "El campo sitio debe abrir el sitio real, no link-in-bio muerto.",
      "Sin sitio aún puedes ganar llamada simple; fallas cuando quieren ver página de calentador o foto de techo.",
      "Prueba el botón desde tu celular personal. 404 o login de constructor abandonado = puerta cerrada.",
    ]),
    sec("Reparto práctico para este mes", [
      "Solo perfil: una noche haciendo ficha verdadera, luego decide si pierdes llamadas por visibilidad o por falta de página.",
      "Sitio bonito y ficha muerta: arregla ficha primero.",
      "Ninguno bien: empieza ficha; vista previa en <a href=\"/contact\">contacto</a>; <a href=\"/pricing\">precios</a> cuando elijas plan.",
    ]),
    sec("Cuando el clic al sitio mata la llamada que ganó el mapa", [
      "Es frustrante ver métricas de mapa subir y la bandeja de voz igual. Muchas veces el cliente tocó llamar en el mapa, luego quiso confirmar alcance en el sitio, y el enlace abrió una página que no carga o no dice si haces ese trabajo.",
      "Arreglar el primer segundo del sitio móvil suele costar menos que otra ronda de fotos en el perfil. El perfil trajo la intención; el sitio la confirma o la pierde.",
      "Si aún no tienes páginas por servicio, una portada honesta con tres trabajos, zona y teléfono tocable ya es mejor que enlace a red social.",
      "No necesitas veinte URLs para empezar. Necesitas una URL que no avergüence al botón del mapa.",
    ]),
    sec("Anuncios, referidos y boca a boca", [
      "Un vecino manda tu nombre por texto. Esa persona no siempre abre el mapa; busca tu empresa. Si solo encuentra ficha delgada sin sitio, algunos llaman y otros no.",
      "Anuncios pagados casi siempre necesitan landing con la misma promesa del anuncio. Llevar a ficha genérica funciona en pocos casos; la mayoría necesita página del trabajo.",
      "Mantén la promesa alineada: si el anuncio dice instalación de calentador, la página debe decirlo arriba con teléfono, no «bienvenido a nuestra familia desde 1998».",
      "Plus ($297/mes) sirve cuando contestas en inglés y español y quieres sitio y pedidos de reseña en ambos. No compres idioma decorativo.",
    ]),
    sec("SEO local sin prometer el paquete de mapas", [
      "Perfil fuerte y sitio claro se refuerzan, pero el SEO continuo no viene en Website, Lead System, Plus ni Own It. Cotiza aparte en <a href=\"/seo-services\">SEO</a>.",
      "Puertas finas por ciudad suelen generar llamadas que declinas y contenido que Google describe como páginas puerta. Una zona honesta es más lenta de escribir y más barata de operar.",
      "La guía de contenido útil de Google aplica al oficio: título que coincide con la búsqueda y siguiente paso obvio.",
      "Primero alinea nombre, horario y teléfono entre ficha y encabezado del sitio. Eso es gratis salvo tu media hora.",
    ]),
    sec("Fotos y publicaciones en el perfil", [
      "Fotos de esta temporada en perfil enseñan que sigues activo. Fotos de hace cinco años enseñan lo contrario aunque el trabajo sea bueno.",
      "Plus incluye dos publicaciones al mes en el perfil; eso no reemplaza páginas de servicio ni SEO mensual.",
      "Publicaciones solo para verse ocupado confunden menos que horario falso, pero tampoco sustituyen número claro en el sitio.",
      "Sube trabajo real aunque la foto tenga flash de celular. Autenticidad gana a estudio.",
    ]),
    sec("Mensajes y botones en la ficha", [
      "Activa mensajes en Google solo si alguien los lee. Mensaje sin respuesta es peor que no ofrecer canal.",
      "Botón de llamada debe marcar línea que contestas. Segundo número de seguimiento en Lead System/Plus es para medir, no para esconder teléfono principal.",
      "Si el cliente prefiere formulario en el sitio, el enlace del perfil debe llevar a página con formulario corto, no a laberinto.",
      "Prueba cada botón un martes normal, no solo el día del lanzamiento.",
    ]),
    sec("Decisión de este trimestre", [
      "Si el mapa llena agenda y el sitio actual da vergüenza, prioriza arreglar enlace del perfil o lanzar portada mínima honesta antes de comprar más publicaciones.",
      "Si el mapa está flojo pero el sitio es claro, invierte hora en categoría, horas, fotos y reseñas reales antes de nueva página.",
      "Si necesitas ambos idiomas en serio, Plus con páginas y pedidos de reseña bilingües tiene sentido solo con operación bilingüe.",
      "Vista previa en <a href=\"/contact\">contacto</a> y planes en <a href=\"/pricing\">precios</a> cuando ya sabes que necesitas sitio además de ficha.",
    ]),
  ],
};

const delayed10 = {
  slug: "missed-call-text-delayed-10dlc",
  category: "Consejos",
  title: "Por qué se retrasan los textos de llamada perdida",
  seoTitle: "Retraso en textos por llamada perdida (10DLC) | Kinexis",
  excerpt:
    "El sitio salió el lunes y promete texto si pierdes la llamada. El jueves estás bajo el fregadero y nada sale. No olvidaste un interruptor: el operador aún no dijo sí.",
  lead: `El sitio salió el lunes. La portada dice que mandas texto si pierdes una llamada. El jueves estás bajo un fregadero, suena el teléfono, no puedes agarrarlo, y no sale nada. La persona marca al siguiente negocio. No se te olvidó activar algo. El texto espera a un operador, y el operador no ha dicho que sí. El texto por llamada perdida es un parche útil en oficios. Lo que subestiman es la espera antes del primer mensaje automático permitido.`,
  sections: [
    sec("La sorpresa es el calendario, no la idea", [
      "La idea cabe en una frase: llaman con tus manos ocupadas, un texto corto nombra la empresa y pregunta qué necesitan. Eso es verdad solo después de aprobación. Publicarlo el día uno es prometer lo que no puedes enviar.",
      "En Kinexis el texto es opcional, no gratis, no «encendido» por comprar sitio. Necesita línea dedicada. Aprobación suele 10–15 días, no garantizada. El reloj es aprobación, no la mañana que pediste la función.",
      "El copy permitido está en <a href=\"/blog/missed-call-text-back-templates\">plantillas de texto</a>. Revisión de cumplimiento antes de automatizar. Sigue contestando el teléfono mientras esperas.",
      "El sitio puede convertir con número tocable, formulario corto y horas reales. El texto es puerta extra, no el negocio.",
    ]),
    sec("Por qué el operador tiene voto", [
      "Los textos de negocio comparten red con spam. Mensajes que parecen masivo, número sin empresa clara o celular personal mezclado se retrasan o bloquean.",
      "La CTIA explica registro aplicación-a-persona. No necesitas dominar siglas; necesitas creer que 10–15 días es real y «no garantizado» significa eso.",
      "Línea dedicada es parte de verse como empresa antes de quejarte de lentitud.",
      "Dilo al dueño antes del lanzamiento. No digas «texto al instante» hasta ver una llamada perdida producir texto real.",
    ]),
    sec("Sigue siendo un texto", [
      "Identificación y forma de bajar importan. Guía de la FCC sobre robocalls y textos es orientación, no abogado.",
      "Textas a quien te llamó, no a lista comprada. No mezcles con pedido de reseña o cobro.",
      "Plantillas por oficio son borradores, no permiso. Responde cuando contesten.",
    ]),
    sec("Qué decir antes de lanzar el sitio", [
      "Presupuesta el calendario con la cuadrilla. La portada puede decir que devuelves llamada; no que el texto es instantáneo. Tampoco Google.",
      "Usa días de espera para probar número, formulario, horas, número en texto arriba. Regla: llamada perdida se devuelve el mismo día en horario publicado.",
      "Consigue línea dedicada antes de empezar trámite. Decide quién lee respuestas.",
      "<a href=\"/tools/missed-call-calculator\">Calculadora de llamada perdida</a> es servilleta, no fecha de salida.",
    ]),
    sec("Cómo se ve la espera en una semana real", [
      "«10–15 días» desde registro no es día siete enviando si el papeleo sigue incompleto.",
      "Mientras tanto el teléfono se comporta como siempre. Perder llamada sigue costando trabajos.",
      "Cuando aprueben, prueba desde otro celular antes de cambiar la web.",
      "Si no aprueban, baja la promesa y mantén devolución de llamada.",
    ]),
    sec("Qué debe oír la cuadrilla el lunes", [
      "Si no está vivo el texto, díganlo. La portada no lo afirme. Llamada perdida sigue con devolución humana el mismo día.",
      "Una persona vigilando el trámite como permisos. Quita «texto instantáneo» de imanes y descripción de Google.",
      "Lee el primer texto como cliente. Acorta si suena a banco.",
      "No apiles pedido de reseña en el mismo hilo.",
    ]),
    sec("Qué plan lo cobra cómo", [
      "Website $97 y Own It $1,497 no incluyen texto; extra $97/mes misma regla. Lead System $197 y Plus $297: segundo número $1/mes si se usa, tarifas operador. Plus puede inglés y español.",
      "Pedidos de reseña van aparte en Lead System/Plus.",
      "Garantía 60 días leads en Lead System/Plus no exige texto activo: llamada 30+ seg, respuesta al texto, o formulario real. Own It no incluye garantía.",
      "Detalle en <a href=\"/upgrades\">mejoras</a>, <a href=\"/faqs\">preguntas</a>, <a href=\"/pricing\">precios</a>, vista previa <a href=\"/contact\">contacto</a>.",
    ]),
    sec("Qué escribir en Google mientras esperas", [
      "Si el sitio nuevo aún no puede enviar texto automático, el perfil tampoco debe prometerlo. Un cliente que lee «texto inmediato» y no recibe nada escribe la queja en público.",
      "Sí puedes decir que devuelves llamadas el mismo día en horario de atención. Eso es verificable y lo controlas tú.",
      "Revisa imanes, uniformes y correos de la oficina. Una frase vieja en un solo canal basta para que el cliente cite promesa falsa.",
      "Cuando el primer texto real salga, actualiza sitio y perfil el mismo día. No antes.",
    ]),
    sec("Día de prueba después de la aprobación", [
      "Llama al número de seguimiento desde un celular que no sea el de la empresa. Cuelga sin contestar. Debe llegar un mensaje que nombre tu negocio en la primera línea.",
      "Responde como cliente: una palabra corta, pregunta simple. La persona designada debe ver la respuesta y devolver contacto el mismo día.",
      "Si el mensaje suena a banco o a masivo, acórtalo antes de anunciarlo. Plantillas por oficio en <a href=\"/blog/missed-call-text-back-templates\">plantillas</a> son punto de partida, no permiso.",
      "Prueba exitosa no significa «respuesta instantánea». Significa «si perdemos, podemos escribir cuando el operador lo permite».",
    ]),
    sec("Cuando la aprobación tarda o no llega", [
      "Sigue el plan B: devolución de llamada humana, formulario corto, horario honesto. El negocio no se detiene porque el operador tarda.",
      "No compres otra herramienta en pánico la misma semana. Dos promesas rotas se leen peor que una.",
      "Si el trámite se estancó, revisa si la línea es realmente dedicada y si el papeleo salió completo. A veces el retraso es datos, no mala suerte.",
      "Own It y Website pueden seguir siendo la opción correcta sin texto; el extra de $97/mes sigue disponible si más tarde sí aprueban.",
    ]),
    sec("10DLC en lenguaje de dueño", [
      "No necesitas memorizar siglas. Necesitas saber que mensajes de empresa pasan por registro para separarlos de spam masivo.",
      "El registro mira si el número parece línea de negocio y si el contenido anunciado coincide con lo que envías.",
      "Cambiar de número después del registro puede reiniciar espera. Elige línea antes de empezar trámite.",
      "Proveedores distintos usan formularios distintos; la ventana de 10–15 días publicada sigue siendo la que debes comunicar al cliente.",
    ]),
    sec("Qué NO poner en la portada la semana uno", [
      "Evita «respuesta instantánea por texto», «siempre contestamos por SMS» o iconos de chat que implican bot activo.",
      "Sí puedes decir «llámanos» y «devolvemos llamada el mismo día en horario publicado».",
      "Formulario corto y número tocable siguen convirtiendo sin texto automático.",
      "Si tu diseñador quiere llenar espacio con promesa de texto, reemplázala con horario verdadero.",
    ]),
    sec("Coordinación entre sitio, perfil y cuadrilla", [
      "Un solo documento interno: texto NO activo hasta fecha ____; responsable ____; línea dedicada ____.",
      "Oficina, técnicos y quien contesta el 800 deben decir la misma frase mientras esperan aprobación.",
      "Actualiza el documento el día de la prueba exitosa y cambia copy público ese mismo día.",
      "Plantillas listas en <a href=\"/blog/missed-call-text-back-templates\">plantillas por oficio</a> para cuando el operador diga sí.",
    ]),
  ],
};

const templates = {
  slug: "missed-call-text-back-templates",
  category: "Consejos",
  title: "Plantillas de texto por llamada perdida para 12 negocios",
  seoTitle: "Plantillas de texto por llamada perdida | Kinexis Digital",
  excerpt:
    "Borradores de SMS por oficio para la llamada perdida, con tiempos honestos de aprobación del operador antes de enviarlos.",
  lead: `El teléfono suena mientras sostienes una llave ajustable bajo el gabinete. No alcanzas a contestar. En teoría, un mensaje corto le dice quién eres y qué responder. En la práctica, ese mensaje no sale hasta que un operador aprueba tu línea y tu uso. El texto de llamada perdida es opcional y requiere una línea dedicada de la empresa. En Lead System o Plus, un segundo número cuesta $1/mes si lo usas, más tarifas del operador. La aprobación del operador suele tardar 10–15 días y no está garantizada. Esta página son borradores por oficio — no permiso legal ni comparación de software.`,
  sections: [
    sec("Antes de copiar un mensaje", [
      "Un texto útil nombra la empresa en la primera línea, pide poco y deja claro que pueden responder con una palabra corta. Un párrafo de servicios en SMS es spam con logo.",
      "Solo escribes a quien acaba de llamar tu línea de negocio. No uses el hilo de llamada perdida para promociones, reseñas ni cobros. Un mensaje, un trabajo.",
      "Las plantillas de abajo vienen de oficios reales en campo. Cámbialas a tu voz después de que alguien calificado revise TCPA, consentimiento y palabra STOP.",
      "Mientras esperas aprobación, la regla sigue siendo devolver la llamada el mismo día en horario publicado. El texto es puerta extra cuando ya está vivo.",
    ]),
    sec("Qué plan lleva el texto y cuánto cuesta", [
      "Website ($97/mes) y Own It ($1,497) no incluyen texto automático; el extra es $97/mes con las mismas reglas de línea dedicada y operador.",
      "Lead System ($197/mes) y Plus ($297/mes) no cobran el texto a $97/mes; usan segundo número de seguimiento a $1/mes si lo activas, más tarifas del operador. Plus puede correr mensajes en inglés y español si contestas en ambos.",
      "No confundas esto con pedidos de reseña después del trabajo: van en Lead System y Plus, pero en otro flujo. Mezclarlos entrena al cliente a ignorar los dos.",
      "Estima llamadas en riesgo con la <a href=\"/tools/missed-call-calculator\">calculadora de llamada perdida</a>. Más contexto del retraso en <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué esperan los textos</a>.",
    ]),
    sec("Cómo adaptar {Business} y las palabras clave", [
      "Sustituye {Business} por el nombre público de la empresa, el mismo que ves en la camioneta y en Google. Si el cliente no reconoce el nombre en el SMS, no responde.",
      "Las palabras en mayúsculas (FUGA, URGENTE, COTIZACIÓN) son atajos opcionales para clasificar la llamada cuando vuelvas al camión. No obligues a usarlas si complica el mensaje.",
      "Mantén cada plantilla en un solo mensaje. Si necesitas dos pasos, el segundo sale cuando tú respondes manualmente.",
      "Entrena a quien lee respuestas: URGENTE o rotura activa significa devolver llamada antes que el siguiente trabajo en la lista.",
    ]),
    ...TEMPLATE_SECTIONS,
  ],
};

const plomeros = {
  slug: "pagina-web-para-plomeros",
  category: "Diseño",
  title: "Página web para plomeros hecha para la llamada",
  seoTitle: "Página web para plomeros | Desde $97/mes | Kinexis",
  excerpt:
    "Quien tiene una fuga no lee manifiestos. Necesita número, zona y si puedes ir hoy. Así se arma una página que convierte.",
  lead: `La mitad de quien entra a una página de plomería tiene agua donde no debería. La otra mitad planea un calentador o un destape y sí lee. Una página que funciona atiende a los dos sin esconder el teléfono ni prometer cuadrilla que no tienes a las dos de la mañana.`,
  sections: [
    sec("La búsqueda pasa junto al problema", [
      "No es búsqueda de escritorio. Alguien está en la cocina con toalla bajo el gabinete o en el garaje mirando el calentador. Escribe con un pulgar. La consulta coincide con el estado de ánimo: pánico quiere número, planeación quiere prueba.",
      "Tienes unos tres segundos en el teléfono antes de volver al mapa. Slideshow de «valores familiares» y teléfono en pie de imagen pierde la llamada que ya ganaste del listado.",
      "Este artículo apoya sitios de plomería; el hub de diseño vive en <a href=\"/industries/plumbing\">plomería</a>. Estructura URL en <a href=\"/blog/plumbing-website-pages\">páginas de plomería</a>.",
    ]),
    sec("Primera pantalla: trabajo, zona, teléfono", [
      "El titular suena a puerta de camioneta: «reparación de fuga», «destape», «cambio de calentador» — sustantivos que el cliente ya tiene.",
      "El número va en el encabezado como texto tocable, no bajo video lento. Horas donde un desconocido las ve sin abrir menú.",
      "Licencia y seguro, si aplican en tu estado, cerca del número. Respondes «¿pueden arreglar esto aquí hoy?» antes de que marquen al siguiente.",
    ]),
    sec("Dos compradores, dos caminos", [
      "Tubería rota y cotización de calentador no son la misma persona. Mezclarlos en «servicios» obliga a la urgencia al formulario y al planificador al botón de pánico.",
      "Camino para fugas: teléfono primero, qué hacer mientras llegas. Drenajes aparte de calentadores. Calentadores: reparar o cambiar, marcas que instalas, cotización sin novela antes de llamar.",
      "Guía SEO de Google habla de títulos claros; aquí «útil» es trabajo, zona y humano al otro lado del número.",
    ]),
    sec("Confianza antes de marcar", [
      "Estrellas en el mapa importan. Fotos de tu camioneta y trabajos reales, no stock de llaves brillantes.",
      "Reseñas cerca del teléfono o formulario. No párrafos de cinco estrellas que escribiste tú.",
      "Formulario respetuoso con el pulgar: nombre, teléfono, problema corto. Más en <a href=\"/blog/build-trust-with-reviews\">confianza con reseñas</a>.",
    ]),
    sec("Velocidad móvil no es lujo", [
      "La mayoría de búsquedas de plomería son móviles, a menudo con datos mientras algo sigue goteando.",
      "Prueba sin Wi‑Fi de taller. PageSpeed busca qué retrasa la primera pantalla, no trofeo.",
      "Nombre, dirección y teléfono en texto visible. El único teléfono dentro de imagen no sirve en la cocina.",
    ]),
    sec("Zona honesta gana a enorme", [
      "Una página de zona con pueblos que sí manejas este mes bate veinte clones que solo cambian ciudad.",
      "Sé claro qué sí y qué no corres. Promesa falsa genera reseñas de «mintieron en Google».",
      "Alinea zona con perfil de Google y buzón.",
    ]),
    sec("Texto opcional por llamada perdida", [
      "En obra el teléfono suena en la camioneta. Texto corto puede evitar que marquen al siguiente si monitoreas la línea y cumples reglas.",
      "Texto opcional; no gratis. Línea dedicada. Lead System/Plus: segundo número $1/mes; Website/Own It extra $97/mes. Aprobación 10–15 días, no garantizada.",
      "Plantillas en <a href=\"/blog/missed-call-text-back-templates\">plantillas de texto</a>. No prometas SMS instantáneo en sitio de $97 sin activarlo.",
    ]),
    sec("Qué incluyen los cuatro planes", [
      "Website $97/mes hasta 5 páginas, cambios pequeños. Lead System $197 reseñas y texto opcional. Plus $297 bilingüe. Own It $1,497 archivos tuyos sin pedidos automáticos en base.",
      "Mensuales cancela cuando quieras; sitio en período pagado; después hosting termina salvo compra $1,497 o Own It. Garantía leads 60 días Lead System/Plus; devolución 30 días todos. SEO continuo cotizado aparte.",
      "Detalle en <a href=\"/pricing\">precios</a> y <a href=\"/blog/plumber-website-cost\">costo de sitio de plomería</a>.",
    ]),
    sec("Vista previa y lanzamiento", [
      "Vista previa gratis de portada en 2 días hábiles sin tarjeta. Tras aprobar y enviar fotos, servicios y horas, lanzamiento suele ~5 días hábiles, por escrito.",
      "<a href=\"/contact\">Pide vista previa</a> o compara en <a href=\"/pricing\">precios</a>.",
    ]),
    sec("Qué no es este artículo", [
      "No duplica el <a href=\"/industries/plumbing\">hub de plomería</a> ni la guía URL completa. Úsalo para explicar por qué fuga y calentador no comparten formulario y qué plan manda reseñas.",
    ]),
    sec("Emergencia en cocina vs cotización tranquila", [
      "Quien está parado en charco no lee historia de la empresa. Quien cotiza calentador sí puede leer marcas y proceso, pero también necesita teléfono visible.",
      "Si pones el mismo formulario largo en ambos, pierdes uno de los dos tipos de ingreso. La página de fuga debe abrir con número y horario; la de calentador puede tener párrafo de proceso más abajo.",
      "Explica qué hacer mientras llegas en fugas reales: llave de paso, romper suministro si aplica. Eso reduce pánico y mejora reseñas.",
      "No anuncies 24 horas si de noche contesta buzón. El sitio debe coincidir con quién realmente atiende.",
    ]),
    sec("Reseñas y número en la misma pantalla", [
      "El planificador mira estrellas antes de marcar. Muestra enlace al perfil o estrellas reales cerca del teléfono.",
      "Lead System y Plus pueden enviar pedido con enlace directo después del trabajo. Website y Own It base: lo haces manual con guión corto.",
      "No escondas reseñas al final por una mala. Mezcla real es más humana que silencio.",
      "Cómo pedir en <a href=\"/blog/como-pedir-resenas-en-google\">cómo pedir reseñas en Google</a> y confianza en <a href=\"/blog/build-trust-with-reviews\">reseñas sin perseguir</a>.",
    ]),
    sec("Lanzamiento sin sorpresas de plan", [
      "Todos los planes empiezan con vista previa gratis de portada en 2 días hábiles, sin tarjeta. Tras aprobar y mandar fotos de trabajos, logo y horario, lanzamiento suele ser unos 5 días hábiles, confirmado por escrito.",
      "Diseño web personalizado dentro de alcance estándar; no es línea separada de «diseño custom». Páginas extra en Website: $99 c/u.",
      "Cancela mensual cuando quieras; sitio en período pagado; hosting termina salvo compra archivos $1,497 o Own It. Devolución 30 días; garantía leads 60 días en Lead System/Plus.",
      "<a href=\"/contact\">Pide vista previa</a> si la lista convence de que tu sitio actual no gana la llamada en cocina.",
    ]),
    sec("Datos locales visibles para buscadores y humanos", [
      "Nombre, dirección si aplica y teléfono en texto ayudan al cliente y a motores a leer tu negocio.",
      "Datos estructurados de negocio local pueden complementar; no reemplazan número en encabezado.",
      "Si el único teléfono es imagen, pierdes llamadas aunque el sitio «se vea bien».",
      "PageSpeed y móvil importan porque la búsqueda de plomería ocurre con prisa y con datos limitados.",
    ]),
    sec("Auditoría rápida del sitio actual", [
      "Abre la página de fuga o la portada en celular con datos. Cuenta segundos hasta ver número. Más de cinco es problema.",
      "Busca «servicios generales» sin sustantivos concretos. Reemplaza por trabajos que facturas.",
      "Revisa formulario: más de cuatro campos iniciales suele matar urgencia.",
      "Si fallas tres veces seguidas, no compres anuncios todavía; arregla base primero.",
    ]),
  ],
};

const resenas = {
  slug: "como-pedir-resenas-en-google",
  category: "Consejos",
  title: "Cómo pedir reseñas en Google sin sonar forzado",
  seoTitle: "Cómo pedir reseñas en Google | Enlace directo",
  excerpt:
    "El momento, un enlace directo y un mensaje corto. Pide después de un trabajo real — sin comprar ni inventar estrellas.",
  lead: `La siguiente llamada casi siempre abre tus reseñas de Google antes de marcar. Pedir en la puerta a veces funciona. Mandar enlace directo cuando el trabajo ya se ve funciona más — sin discurso que avergüence al técnico.`,
  sections: [
    sec("Por qué el enlace directo gana a «búscanos en Google»", [
      "«Búscanos en Google» en el taller suena fácil. En el celular es trabajo: nombre parecido, ficha equivocada, silencio.",
      "Enlace directo abre el formulario de tu ubicación. Quitas la caza.",
      "Genera enlace y QR con <a href=\"/tools/google-review-link-qr\">herramienta de enlace y QR</a>. Prueba en celular que no sea cuenta de propietario.",
    ]),
    sec("Consigue el enlace en Google", [
      "Entra con la cuenta que administra el perfil → Leer reseñas → Consigue más reseñas. Copia enlace. QR según ayuda de Google desde computadora.",
      "Guarda enlace en un solo lugar de confianza: CRM, plantilla, procedimiento de oficina.",
      "Perfil limpio: nombre correcto, duplicados fusionados. Mantenimiento en <a href=\"/blog/google-business-profile-checklist\">lista del perfil</a>.",
    ]),
    sec("Reglas para no meterte en problemas", [
      "No pagues ni inventes reseñas. Guías de la FTC y políticas de Google son sentido común: clientes reales después de trabajos reales.",
      "No escribas el texto para que lo peguen. No filtres infelices a formulario privado.",
      "SMS: identifica empresa, respeta STOP. Revisión legal antes de plantilla nueva.",
    ]),
    sec("Cuándo pedir (el timing gana al entusiasmo)", [
      "Cuando el cliente ve el trabajo terminado — no mientras cargas herramientas, no tres semanas después.",
      "Reparaciones el mismo día tras recorrido. Reemplazos tras probar equipo. Rutas semanales tras visita notable, no cada martes.",
      "Lead System ($197/mes) y Plus ($297/mes) pueden enviar pedido con tu enlace. Website ($97/mes) y Own It base ($1,497) no incluyen envío automático. Plus puede español e inglés.",
    ]),
    sec("Guión en la puerta", [
      "Un agradecimiento, por qué importan las reseñas, una pregunta, un paso.",
      "«Gracias por recibirnos. Si quedó bien, una reseña en Google ayuda al siguiente cliente. ¿Te mando el enlace por texto?»",
      "Si dice sí, mándalo antes de salir de la calle. Si duda, paras.",
    ]),
    sec("Textos listos", [
      "Un enlace por mensaje. Mismo día: «Hola [Nombre], soy [Tu nombre] de [Empresa]. Gracias por el trabajo de hoy. Si te parece, enlace de reseña: [enlace]. STOP para no recibir más.»",
      "Al día siguiente solo si dijo sí y olvidaste enlace. Ruta recurrente tras buena visita, no semanal a la misma casa.",
    ]),
    sec("Correo y papel", [
      "Asunto claro. Enlace en correo para quien no usa texto. QR en factura o mostrador.",
      "Línea final: si algo falló, pueden responder correo o llamar — no solo piden halago.",
    ]),
    sec("Lo que nunca hagas", [
      "Sin dinero, descuento ni trabajo gratis por estrellas. Sin reseñas cruzadas con empleados. Sin paquetes de «50 reseñas en una noche».",
      "Más contexto en <a href=\"/blog/build-trust-with-reviews\">conseguir reseñas sin perseguir</a>. <a href=\"/contact\">Vista previa</a> o <a href=\"/pricing\">precios</a>.",
    ]),
    sec("Responde cuando publican", [
      "Agradece reseñas como persona: menciona el trabajo, no solo «gracias por sus amables palabras».",
      "En reseña dura, di cómo te contactan para revisar. No discutas piezas que no instalaste si no estuviste.",
      "Perfil y sitio deben coincidir en horas y nombre mientras arreglas reputación.",
      "Una reseña nueva honesta vale más que pelear con una vieja en comentarios largos.",
    ]),
    sec("Automatización sin mezclar textos", [
      "Lead System ($197/mes) y Plus ($297/mes) pueden enviar pedido tras cerrar trabajo con tu enlace directo. Plus puede español si ya comunicas así.",
      "Eso no es lo mismo que texto por llamada perdida: opcional, línea dedicada, segundo número $1/mes en Lead System/Plus, aprobación 10–15 días no garantizada. Extra $97/mes en Website/Own It.",
      "No mandes pedido de reseña en el hilo de llamada perdida. Un hilo, un propósito.",
      "Website ($97/mes) y Own It ($1,497) siguen siendo válidos si pedirás a mano y solo necesitas sitio que muestre prueba y teléfono.",
    ]),
    sec("Entrena a la cuadrilla en dos frases", [
      "El técnico no necesita monólogo. Agradecer, explicar en una línea por qué ayuda al vecino, preguntar si puede mandar enlace por texto.",
      "Si dice que sí, mándalo antes de salir del vecindario. Si duda, paras. Insistir convierte cliente neutral en historia de cena.",
      "Guarda enlace en nota fija de oficina, no en notas personales distintas por técnico.",
      "Guiones más largos por oficio en <a href=\"/blog/how-to-ask-for-google-reviews-contractor\">reseñas para contratistas</a>.",
    ]),
    sec("Hábito mensual sin obsesión", [
      "Revisa reseñas una vez por semana como crítica de trabajo: ¿patrón en retrasos? ¿fotos del perfil desactualizadas?",
      "Pide después de trabajos terminados, no en cotización que aún no contrataron.",
      "Cuenta delgada crece con trabajo real, no con trucos.",
      "Vista previa gratis del inicio en 2 días hábiles, sin tarjeta, si quieres sitio que muestre estrellas junto al teléfono: <a href=\"/contact\">contacto</a>.",
    ]),
    sec("Hogares que prefieren español", [
      "Si la cuadrilla sirve en español, el guión corto en puerta puede ir en español con la misma estructura: gracias, por qué importa, ¿mando enlace?",
      "Plus puede enviar pedido de reseña en español cuando tu operación ya comunica así. No pegues script en español si la oficina solo devuelve llamadas en inglés.",
      "Un enlace directo funciona igual; lo que cambia es el mensaje que lo acompaña.",
      "Coherencia importa más que cantidad de idiomas en el pie de página.",
    ]),
    sec("Factura, mostrador y pegatina con QR", [
      "QR impreso en hoja de cierre o mostrador sirve a clientes que no abren textos de números desconocidos.",
      "Prueba el QR cada vez que renuevas material; enlaces rotos en factura son peor que no pedir.",
      "En servicios recurrentes, una tarjeta pequeña dejada una vez puede recordar sin presión semanal.",
      "Herramienta de enlace en <a href=\"/tools/google-review-link-qr\">enlace y QR de reseñas</a>.",
    ]),
    sec("Políticas de Google en una frase", [
      "Google prohíbe incentivos ligados a estrellas y contenido falso en reseñas. FTC alinea en no fabricar experiencia.",
      "Si un vendedor promete volumen rápido que no reconoces, detente. Perfil suspendido cuesta más que crecimiento lento.",
      "Ayuda oficial sobre reseñas prohibidas está en documentación de Google para negocios.",
      "Pocas reseñas verdaderas de trabajos recientes superan muchas viejas sospechosas.",
    ]),
  ],
};

const EXTRA = {
  wix: [
    sec("Temporada alta y el sitio que nadie toca", [
      "En enero el constructor parece proyecto divertido. En agosto, cuando cada llamada es dinero en la calle, el mismo constructor se vuelve culpa en la lista de tareas. Los dueños prometen «lo actualizo en septiembre» y septiembre trae otra temporada. El sitio queda con horario de 2024 y un número viejo que ya redirige al celular personal.",
      "Un plan administrado no elimina tu responsabilidad de mandar fotos y textos, pero sí quita la fricción de entrar al editor cuando estás cubierto de polvo. El cambio de horario de Semana Santa se convierte en mensaje de texto a alguien que lo hace, no en tutorial de YouTube a las once de la noche.",
      "Si eliges DIY, bloquea en el calendario dos noches antes de temporada alta solo para revisar número, horas y servicios que ya no vendes. Trátalo como revisión de camioneta, no como marketing opcional.",
      "Si eliges administrado, lee cuántos cambios pequeños incluye cada plan. Website trae dos al mes; Lead System y Plus traen ilimitados dentro de la definición de treinta minutos. Eso es suficiente para horario, foto y frase, no para rehacer todo el sitio cada trimestre.",
      "La comparación justa entre Wix y un plan de $97 no es solo la cuota. Es la cuota más la probabilidad de que el sitio siga verdadero en el mes más ocupado del año.",
    ]),
    sec("Salida, dominio y miedo a quedar atrapado", [
      "Muchos dueños toleran un sitio mediocre porque temen perder el dominio o «tirar meses de trabajo» si se van. Lee la salida antes de entrar. En Kinexis, cancelar un mensual deja el sitio en línea en el período pagado; después puedes comprar archivos por $1,497 por escrito o pasar a Own It antes de que cierre ese período.",
      "En constructores, exportar o migrar varía. Algunos dejan HTML limitado; otros encierran diseño. Pregunta por escrito qué archivo recibes si cancelas, no solo si puedes «bajar ZIP».",
      "El dominio debe estar en tu cuenta de registrador, no en el login del sobrino que te ayudó en 2019. Sin dominio, «tienes sitio» solo mientras otro te presta el nombre.",
      "Own It existe para quien quiere pagar $1,497 una vez y tener archivos desde el día uno, con doce meses de hosting y cambios pequeños incluidos. Después, Site Care opcional a $39 al mes o tu propio host.",
      "Miedo a quedar atrapado es válido. Respuesta válida es contrato claro, no quedarte en una suscripción que ya no usas porque da pena el dominio.",
    ]),
    sec("Comparar manzanas con manzanas en la barra de la cocina", [
      "Antes de firmar otra renovación, imprime la página de inicio del constructor y la vista previa administrada si la pediste. Ponlas lado a lado en la barra. ¿Cuál nombra el trabajo en voz alta? ¿Cuál muestra el número sin instrucciones? Esa comparación vale más que diez pestañas de precios.",
      "La cuota mensual del constructor es solo una línea. La otra línea es tu hora. Si tardas seis horas en lograr lo que la vista previa mostró en dos días hábiles, ya no estás comparando $30 contra $97; estás comparando tu semana contra una factura conocida.",
      "Ningún camino incluye SEO continuo en los cuatro planes de sitio de Kinexis; eso se cotiza aparte. Tampoco lo trae la plantilla DIY por defecto. Quien prometa posición en cualquier lado está vendiendo humo.",
      "Elige constructor si la barra de prueba te convence de que terminarás. Elige administrado si la barra te muestra que llevas meses evitando la misma corrección. Los dos pueden funcionar. El que no funciona es el tercero: sitio casi listo que anuncia trabajo que ya no haces.",
    ]),
    sec("Una última pregunta antes de pagar", [
      "¿Quién cambia el número si mañana compras línea nueva? ¿Quién actualiza horario de Thanksgiving? Si la respuesta es «yo, cuando pueda», cuenta cuántas veces el año pasado «cuando pueda» nunca llegó.",
      "Si la respuesta es «mando mensaje y lo hacen en un día hábil», verifica que el contrato diga eso con la misma claridad que la cuota mensual.",
      "El constructor barato con dueño sin tiempo es el escenario más común que vemos antes de una vista previa.",
      "No es vergüenza contratar administrado. Es vergüenza pagar anuncios a una página que el dueño sabe que está rota.",
      "Si todavía dudas, pide vista previa gratis en dos días hábiles y compara en la barra sin pagar anuncios todavía. Luego decide con números reales.",
    ]),
  ],
  web: [
    sec("Sticky header, menú hamburguesa y el número escondido", [
      "El menú de tres líneas en móvil es cómodo para diseñadores y lento para urgencias. Si el número vive dentro del menú, el cliente con fuga debe descubrir iconografía antes de marcar. Pon el teléfono en texto fuera del menú en páginas de servicio urgentes.",
      "Encabezado fijo puede ayudar si muestra número delgado. Si muestra solo logo y menú, es barra que roba altura sin vender.",
      "Botones secundarios del mismo color que el primario diluyen la acción. Un solo color fuerte para llamar; formulario con estilo distinto.",
      "Prueba con guantes o manos húmedas si atiendes trabajo físico: el botón debe ser grande.",
      "Si falla, no es detalle estético. Es dinero en la cuneta.",
    ]),
    sec("Enlaces internos que el cliente usaría", [
      "Enlaza desde portada a trabajos que quieres vender con palabras que buscarían: «destape», «cambio de calentador», no «servicio A».",
      "Pie de página con treinta enlaces no es navegación; es armario. En móvil empuja el número lejos.",
      "Página de área honesta enlazada una vez desde portada y desde servicios principales basta.",
      "Blog solo si responde pregunta que ya escuchas en llamadas; si no, es ruido.",
      "Cada enlace extra en la primera pantalla compite con el teléfono.",
    ]),
    sec("Formularios que no castigan al pulgar", [
      "Cuatro campos — nombre, teléfono, trabajo, ciudad — suelen bastar para saber si el lead es tuyo. Todo lo demás puede llegar en la devolución de llamada.",
      "Campos obligatorios que exigen subir archivo en urgencia matan conversión. Pide fotos después por texto cuando haya humano.",
      "Etiquetas claras en botón de enviar: «Pedir visita para calentador» convierte mejor que «Enviar».",
      "Prueba formulario con teclado abierto en pantalla pequeña. Si el botón queda oculto, pierdes leads silenciosamente.",
      "Lead System y Plus pueden ayudar con seguimiento después del envío; el formulario todavía tiene que ser usable solo.",
    ]),
    sec("Velocidad percibida en la cuneta", [
      "Cliente no mide milisegundos; mide si ve número antes de frustrarse. Hero pesado que tapa contenido es lento aunque PageSpeed diga lo contrario.",
      "Quita carruseles automáticos que mueven el número. Persona con mareo o prisa solo quiere llamar.",
      "Cookie banner que cubre botón de llamar debe configurarse para no bloquear primer pantallazo en móvil.",
      "Comprime fotos de obra antes de subir. Flash de celular en baño oscuro es aceptable si carga rápido.",
      "Velocidad es parte del diseño porque la búsqueda ocurre con problemas encima, no desde escritorio cómodo.",
    ]),
    sec("Color y jerarquía después de que el número funciona", [
      "Cuando el teléfono ya se ve y se toca, recién ahí vale discutir paleta. Antes es maquillaje sobre puerta cerrada.",
      "Un color de acento para botón de llamar y otro más suave para formulario ayuda al ojo sin confundir.",
      "Evita texto rojo sobre naranja «porque es marca». Contraste importa más que PDF de identidad.",
      "Fotos con overlay oscuro pueden verse premium y esconder número si no cuidas capas.",
      "Dueño satisfecho con color pero sin llamadas en reporte debe volver a lista de número, trabajo y zona.",
    ]),
    sec("Iterar con datos reales, no con opiniones de comité", [
      "Si tienes reporte de llamadas o formularios, mira qué página los trajo antes de rediseñar portada entera.",
      "Una sola página de servicio con tráfico y cero contactos suele tener titular vago o número bajo.",
      "Pide a tres personas ajenas al negocio que intenten pedir cotización sin ayuda. Anota dónde se detienen.",
      "Cambios pequeños semanales ganan a rehacer todo cada seis meses por aburrimiento.",
      "Lista terminada cuando desconocido llama sin que tú expliques el sitio.",
    ]),
    sec("Accesibilidad práctica sin auditoría infinita", [
      "Contraste suficiente y botones grandes cubren la mayoría de problemas reales en obra sin auditoría WCAG de cien páginas.",
      "Texto alternativo en fotos de trabajo ayuda a lectores de pantalla y nunca estorba si describe la reparación.",
      "No uses solo color para indicar urgencia; escribe «llama ahora» en palabras.",
      "Si parientes mayores son tu cliente típico, prueba con ellos antes que con diseñador joven.",
      "Accesible aquí significa «puede llamar con vista cansada y mano fría», no certificado en pared.",
    ]),
    sec("Copia que suena a camioneta, no a folleto corporativo", [
      "«Soluciones integrales de fontanería» no dice nada en la cuneta. «Destape y calentadores en Arlington» sí.",
      "Frases cortas. Verbos concretos. Ciudad real.",
      "Historia de la empresa puede ir abajo para quien quiera leer; no empujes a quien tiene fuga.",
      "Si te da pena sonar simple, recuerda que simple es lo que el cliente buscó en Google.",
      "Reescribe titular hablando en voz alta a alguien que no conoce tu oficio; si tartamudeas, reescribe.",
    ]),
    sec("Checklist de viernes antes de pagar anuncios", [
      "Abre cada página de servicio principal en celular. Si alguna esconde el teléfono, pausa anuncios.",
      "Confirma que el formulario llega a bandeja revisada diariamente.",
      "Confirma que horario coincide con perfil de Google.",
      "Confirma que zona lista coincide con donde enviarás camioneta mañana.",
      "Solo después enciende presupuesto de clic.",
      "Anunciar sin eso es pagar para que alguien confirme que tu sitio no sirve.",
    ]),
    sec("Señales de que necesitas ayuda para publicar", [
      "Llevas más de dos meses con borrador privado y anuncios activos.",
      "Técnicos dicen a clientes «búscanos en Facebook» porque el sitio da pena.",
      "Formulario existe pero nadie sabe a qué correo llega.",
      "Cada cambio de horario requiere «acordar con el primo que lo hizo».",
      "Si reconoces dos o más, vista previa gratis en dos días hábiles es prueba barata antes de otra noche en el editor.",
    ]),
    sec("Handoff al proveedor sin perder el estándar", [
      "Si contratas diseño, entrega esta lista como definición de aceptación. No negocies solo estética.",
      "Exige captura de pantalla móvil con número visible antes del pago final.",
      "Proveedor que resiste prueba del camión probablemente optimiza para portafolio, no para llamadas.",
      "Mantén acceso al dominio en tu cuenta aunque otro hospede o edite.",
    ]),
    sec("Cierre: diseño terminado significa llamada", [
      "Terminado no es cuando te gusta el color. Terminado es cuando un desconocido en la entrada marca sin ayuda.",
      "Si no puedes probar eso esta semana, el diseño sigue en progreso aunque la factura diga entregado.",
      "Lista en mano, vista previa o sitio vivo: el estándar es el mismo.",
      "Menos discusión de marca, más prueba de pulgar.",
      "Guarda esta lista en la carpeta del camión. Cuando dudes si el sitio «ya está», vuelve a la entrada antes de volver a pagar anuncios.",
      "Repite la prueba cada temporada alta. Un sitio que pasó en enero puede fallar en julio si alguien ocultó el número en un rediseño menor.",
    ]),
    sec("Prueba de cinco segundos en la entrada", [
      "Pide a alguien que no conozca tu sitio abrirlo en la puerta y contar hasta cinco. Si no puede decir qué haces, en qué ciudad y cómo llamar, el diseño sigue sin terminar aunque el logo se vea caro.",
      "Esa prueba cuesta menos que un día de anuncios mal dirigidos y vale más que otra ronda de opiniones en la barra.",
    ]),
  ],
  google: [
    sec("Cliente que busca tu nombre, no el trabajo", [
      "Referido por vecino escribe nombre de empresa. Si solo aparece ficha delgada sin sitio, algunos confían y otros buscan otra empresa con fotos de trabajos parecidos.",
      "Sitio mínimo con portada honesta, tres servicios y teléfono ya cambia esa decisión.",
      "Nombre en ficha, sitio y camioneta debe coincidir. Variantes confunden y matan llamadas de boca a boca.",
      "Ficha sin enlace o con enlace roto mata confianza acumulada del referido.",
      "Arreglar enlace es tarea de una tarde con más retorno que otra foto de stock en el perfil.",
    ]),
    sec("Reseñas en ficha vs reseñas citadas en sitio", [
      "Estrellas viven en Google. Sitio puede citar frase real con enlace al perfil; no inventa ranking.",
      "Lead System y Plus pueden enviar pedido con enlace directo tras trabajo. Eso alimenta ficha, no reemplaza páginas de servicio.",
      "No publiques muro falso de testimonios en sitio mientras perfil tiene tres reseñas. Muestra las tres verdaderas.",
      "Responder reseñas en perfil demuestra que hay humano. Sitio puede enlazar a perfil para leer más.",
      "Confianza es coherencia entre lo que dicen, lo que muestran y lo que contestan.",
    ]),
    sec("Horario de feriado y temporadas cruzadas", [
      "Cuando cierras por vacaciones, ficha y sitio deben cerrar al mismo tiempo. Cliente que ve abierto y cae en buzón escribe reseña de mentira, no de mala suerte.",
      "Publicación en perfil avisando feriado ayuda; sitio con banner pequeño arriba refuerza. Quita ambos el día que vuelves.",
      "Plus incluye dos publicaciones al mes; úsalas para horario real, no para parecer activo sin información.",
      "Emergencias reales necesitan frase clara de quién contesta y cuándo. Eslogan de 24 horas sin operador es peor que horario cerrado honesto.",
      "Alinear feriados es trabajo aburrido que ahorra estrellas.",
    ]),
    sec("Presupuesto mental: ficha primero o sitio primero", [
      "Si no tienes nada, empieza por ficha verificada esta semana: categoría, teléfono, horas, fotos recientes, servicios nombrados como suena el teléfono.",
      "Si ya tienes ficha fuerte pero enlace malo, arregla primera pantalla del sitio antes de comprar anuncios.",
      "Si ya tienes ambos mediocres, elige uno para tarde del martes. No intentes rehacer todo en un fin de semana imaginario.",
      "Vista previa gratis en dos días hábiles acelera sitio sin obligarte a plan mensual el primer día.",
      "Decisión de mes, no identidad eterna. Puedes empezar ficha y sumar sitio cuando llegue trabajo grande que necesite página.",
    ]),
    sec("Competidor con sitio y tú solo con ficha", [
      "En mapa pueden verse parejos. Cliente que necesita ver fotos de calentador instalado o lista de marcas abre enlaces.",
      "Si tu enlace va a perfil social con última publicación de hace un año, pierdes trabajo de mayor ticket aunque ganes urgencias pequeñas por proximidad.",
      "No necesitas sitio enorme para cerrar esa brecha. Necesitas sitio verdadero.",
      "Ajuste de perfil en Lead System/Plus no sustituye página de calentador; solo alinea tarjeta con realidad.",
      "Ficha fuerte más enlace roto es peor que ficha media con página honesta de un scroll.",
    ]),
    sec("Cierre: dos herramientas, una meta", [
      "Ficha y sitio compiten por la misma meta: que una persona con problema real pueda contactarte sin adivinar.",
      "Si solo arreglas uno, el otro seguirá filtrando llamadas mal.",
      "Nombre, horario, teléfono y zona iguales en ambos es tarea aburrida de una tarde con retorno largo.",
      "Después de alinear, puedes decidir si SEO continuo, anuncios o más páginas — no antes.",
      "<a href=\"/blog/local-seo-get-found-get-called\">SEO local</a> conecta piezas cuando ambas existen.",
    ]),
    sec("Escenarios de mapa sin sitio", [
      "Urgencia pequeña: ficha con teléfono claro puede bastar si contestas rápido.",
      "Trabajo grande con fotos previas: cliente quiere ver instalaciones parecidas; ficha sola falla.",
      "Referido por nombre: búsqueda de marca; sitio mínimo evita perder a quien ya quería contigo.",
      "Anuncio con promesa específica: casi siempre requiere página igual de específica.",
      "Clasifica tus llamadas de la última semana en esas cuatro cajas y verás cuál te falta.",
    ]),
    sec("Mitos que encarecen la decisión", [
      "«Primero debo rankear» — ficha y sitio claros preceden a SEO continuo cotizado aparte.",
      "«Una página basta para todo» — una portada honesta ayuda, pero trabajos distintos piden URLs distintas cuando compiten en búsqueda.",
      "«Duplicar pueblos me dará más llamadas» — suele dar llamadas que declinas y contenido fino.",
      "«El sitio reemplaza contestar el teléfono» — nunca lo hará.",
      "Salir de mitos aterriza presupuesto en lo que sí mueve llamadas esta temporada.",
    ]),
    sec("Semana tipo: solo ficha vs ficha más sitio", [
      "Lunes: urgencias desde mapa; ficha bien horas gana llamadas sin sitio.",
      "Martes: referido pide fotos de trabajo similar; sin página pierdes cotización grande.",
      "Miércoles: anuncio de servicio específico; sin landing adecuada el clic se desperdicia.",
      "Jueves: oficina actualiza horario de viernes; doble entrada en ficha y sitio evita quejas.",
      "Viernes: revisa enlace del perfil en celular; si falla, arreglo de tarde vale más que publicación nueva.",
    ]),
    sec("Inversión cuando el presupuesto es ajustado", [
      "Ficha verificada cuesta tiempo, no siempre dólares. Hazlo antes de gastar en sitio o anuncios.",
      "Website a $97 al mes puede ser suficiente si solo necesitas páginas claras sin automatización.",
      "Lead System a $197 cuando pierdes llamadas y quieres reseñas y reporte.",
      "No compres Plus por idioma decorativo. Compra Plus si contestas en inglés y español cada semana.",
    ]),
    sec("Tabla mental sin humo", [
      "Columna A: cliente urgente en mapa. Columna B: cliente planificando trabajo grande. Columna C: referido por nombre.",
      "A vive en ficha fuerte. B y C suelen necesitar sitio.",
      "Si la mayoría de tus ingresos nuevos vienen de B y C, postergar sitio es postergar crecimiento.",
      "Si mayoría es A y ya saturado, ficha honesta puede bastar otro trimestre.",
      "Clasifica veinte llamadas recientes y la decisión se vuelve aritmética, no ansiedad.",
    ]),
    sec("Próximo paso concreto", [
      "Abre perfil y sitio en el mismo celular. Corrige la primera discrepancia que encuentres.",
      "Si no tienes sitio, pide vista previa con nombre, ciudad y foto de camioneta.",
      "Si tienes sitio y enlace roto, arregla enlace antes de otra foto en el perfil.",
      "Una acción hoy supera otro artículo leído mañana.",
    ]),
    sec("Dueño saturado de llamadas", [
      "Cuando el mapa ya llena agenda, es fácil dejar la ficha pudrirse. Horas desactualizadas y fotos viejas siguen dañando reseñas aunque no necesites más volumen.",
      "Mantenimiento de ficha sigue siendo trabajo de bajo costo con alto retorno en estrellas y menos malentendidos.",
      "Sitio puede esperar si no corres anuncios ni vendes trabajos grandes; ficha no puede esperar si sigues activo.",
      "Cuando rechaces crecimiento, hazlo por elección, no por perfil falso que genera llamadas malas.",
    ]),
    sec("Fotos: perfil saturado vs sitio ordenado", [
      "Subir treinta fotos sueltas al perfil sin orden no sustituye página que explica calentador vs destape. Cliente con fuga elige número; cliente con remodelación quiere ver trabajo parecido al suyo en contexto, no solo collage.",
      "Usa perfil para prueba social breve y sitio para explicar proceso, zona y expectativa de precio cuando corresponda. Las dos piezas se complementan cuando el enlace funciona y el horario coincide.",
      "Si el enlace del perfil cae en página vacía, las fotos del mapa no salvan la confianza que ya ganaste con buenas reseñas.",
    ]),
    sec("Anuncios que apuntan al perfil", [
      "Algunas campañas locales mandan clic a Google en lugar de tu dominio. Funciona para urgencia si contestas al instante; falla cuando el cliente quería leer servicios antes de marcar.",
      "Combina campañas de intención amplia con sitio específico y de urgencia con ficha fuerte, pero no mezcles promesas: lo que dice el anuncio debe estar visible en el destino en el primer scroll.",
      "Sin alineación, pagas por clics que confirman que tu competidor con sitio luce más serio.",
    ]),
    sec("Pregunta del martes por la mañana", [
      "Si solo puedes arreglar una cosa esta semana — horario en ficha, enlace roto, foto vieja o titular confuso en portada — ¿cuál pierde más llamadas hoy?",
      "Respóndela con datos de la última semana, no con corazonada. A veces el enlace roto cuesta más que tres meses sin SEO.",
      "Cuando sepas cuál pieza falla, arregla esa antes de abrir otra pestaña de «herramientas de marketing».",
    ]),
  ],
  delayed: [
    sec("Registro y expectativas con el cliente final", [
      "Cliente que llama no sabe qué es 10DLC. Solo sabe si recibió texto o no. Mientras no haya aprobación, promete devolución de llamada humana, no automatización.",
      "Si vendes en sitio algo que aún no funciona, la primera reseña negativa será sobre el mensaje que nunca llegó, no sobre tu trabajo en campo.",
      "Oficina debe usar guión: «Si no contestamos, devolvemos la llamada hoy en horario publicado. Texto automático se activa cuando el operador apruebe.»",
      "Cuando se active, cambia guión el mismo día en sitio, perfil y boca de técnicos.",
      "Transparencia corta gana a promesa grande rota.",
    ]),
    sec("Errores que reinician la espera", [
      "Cambiar de número a mitad de trámite, mezclar línea personal con campaña, o mandar promociones desde línea de llamada perdida son formas comunes de reiniciar reloj o ser bloqueado.",
      "Un solo propósito por línea al inicio: cliente que acaba de llamar y quiere hablar del mismo trabajo.",
      "Revisa copia con alguien calificado antes de automatizar. Plantillas en blog son borrador.",
      "Segundo número en Lead System/Plus cuesta $1/mes si lo usas, más tarifas del operador; no es «gratis» ni «incluido sin condiciones».",
      "Paciencia con trámite es parte del producto. Marketing que ignora trámite vende mentira.",
    ]),
    sec("Garantía de leads y texto aún en trámite", [
      "Lead System y Plus incluyen garantía de leads de 60 días: cero leads rastreados y se condonan cargos 3 y 4. Lead es llamada 30+ segundos, respuesta a texto, o formulario real.",
      "Esa garantía no exige que texto esté vivo el día uno. Llamadas y formularios cuentan mientras esperas operador.",
      "Own It no incluye esa garantía porque no hay cargos mensuales que condonar.",
      "No uses garantía como excusa para prometer SMS inexistente en portada.",
      "Define internamente qué cuenta como lead para no discutir con tu propio reporte.",
    ]),
    sec("Capacitación de un solo papel", [
      "Una hoja laminada en camioneta: «Texto automático: pendiente / activo desde ____». Técnicos no deben adivinar.",
      "Quien contesta oficina revisa respuestas a textos el mismo día, igual que llamadas perdidas.",
      "Si solo tú lees respuestas, el sistema falla cuando estás en excavación sin señal.",
      "Prueba mensual simulada desde celular personal evita sorpresa en temporada pico.",
      "Texto es ayuda, no excusa para dejar de contestar cuando puedes.",
    ]),
    sec("Relación con pedidos de reseña", [
      "Cliente frustrado porque prometiste texto que no llegó no está en humor para reseña cinco estrellas.",
      "Arregla expectativa de llamada antes de automatizar pedidos de reseña en Lead System/Plus.",
      "Dos flujos SMS distintos: uno «perdimos tu llamada», otro «gracias por el trabajo». Nunca el mismo hilo.",
      "Website y Own It pueden tener sitio sin ninguno de los dos automatismos; sigue siendo oferta válida.",
      "Claridad en uno mejora el otro.",
    ]),
    sec("Cierre operativo para el dueño", [
      "Escribe fecha de inicio esperada solo después de aprobación, no al firmar plan.",
      "Mientras tanto, mide llamadas perdidas devueltas manualmente. Ese hábito es el núcleo.",
      "Calculadora de llamada perdida ayuda a decidir si vale activar texto; no promete fecha.",
      "30 días de devolución en todos los planes si el conjunto no convence; lee términos en precios.",
      "Operador lento no es excusa para mentir en marketing; es excusa para ser preciso.",
    ]),
    sec("Preguntas que el dueño hace en la primera semana", [
      "«¿Por qué no llegó el texto?» — Porque aprobación del operador suele tardar 10–15 días y no está garantizada.",
      "«¿Entonces para qué pagué Lead System?» — Porque incluye sitio, reseñas, reporte y opción de texto; no porque el texto exista al minuto uno.",
      "«¿Puedo prometerlo en el imán nuevo?» — Solo después de prueba real.",
      "«¿Y la garantía de leads?» — Cuenta llamadas y formularios aunque el texto no esté activo.",
      "Respuestas cortas y repetidas evitan que técnicos improvisen promesas.",
    ]),
    sec("Documento interno de una página", [
      "Fecha de solicitud de texto, línea dedicada usada, persona responsable, estado de aprobación, fecha de primera prueba exitosa.",
      "Copia aprobada para SMS pegada debajo, con fecha de revisión legal si aplica.",
      "Captura de pantalla de prueba archivada el día que funciona.",
      "Actualización de sitio y perfil marcada en la misma fila.",
      "Sin documento, en seis meses nadie recordará por qué el cliente esperaba algo distinto.",
    ]),
    sec("Línea temporal que puedes repetir al cliente", [
      "Día uno a diez: sitio vivo, devolución manual de llamada, sin promesa de SMS.",
      "Día diez a veinticinco: trámite con operador en curso, mismo mensaje público.",
      "Día de aprobación: prueba interna, luego copy modesto en web.",
      "Después: monitoreo semanal de respuestas como cualquier lead.",
      "Esa línea evita que ventas acelere promesas que operaciones no puede cumplir.",
    ]),
    sec("Qué decir si un cliente pregunta en la puerta", [
      "«¿Me van a mandar mensaje automático?» — Solo si ya está activo y aprobado; si no, te devolvemos la llamada hoy.",
      "No adivines fechas de operador. Ofrece callback humano.",
      "Técnico con frase clara evita reseñas sobre promesa rota.",
      "Cuando el texto esté vivo, actualiza guión el mismo día.",
    ]),
    sec("Reporte mensual y texto", [
      "Lead System y Plus traen reporte de llamadas; úsalo para ver si texto, cuando exista, cambia tasa de respuesta.",
      "Si texto no está activo, reporte igual ayuda a ver huecos horarios donde pierdes llamadas.",
      "No esperes magia el día uno. Espera línea base de devolución manual primero.",
      "Datos aburridos deciden si vale seguir esperando aprobación o reforzar despacho.",
    ]),
    sec("Resumen para copiar en nota interna", [
      "Texto opcional. Línea dedicada. Aprobación 10–15 días, no garantizada. Website/Own It: extra $97/mes. Lead System/Plus: $1/mes segundo número si se usa.",
      "Mientras tanto: devolver llamada el mismo día. No prometer SMS en web ni Google hasta prueba.",
      "Plantillas en blog cuando aprueben. Revisión legal antes de enviar.",
    ]),
    sec("Si el lanzamiento coincide con activar texto", [
      "Lanza el sitio con número y formulario probados aunque el SMS siga en trámite.",
      "Marketing y operaciones deben usar el mismo calendario público.",
      "Evita imanes nuevos hasta prueba exitosa.",
      "El cliente perdona espera honesta más que promesa rota.",
    ]),
    sec("Oficina y despacho el mismo día de la aprobación", [
      "El día que el operador aprueba el texto, bloquea treinta minutos: prueba desde dos celulares, confirma que la línea dedicada no es la del dueño en el bolsillo, y pega la plantilla definitiva donde oficina ya la busca.",
      "Sin ritual ese día, en dos semanas nadie sabrá si el sistema está activo y volverás a prometer SMS que a veces falla por configuración, no por cliente.",
      "Mismo día actualiza la nota en perfil y pie de sitio solo si el mensaje ya llegó en prueba. Hasta entonces, sigue el guión de devolución manual.",
    ]),
    sec("Cuando el operador rechaza la primera copia", [
      "Rechazo no es fin del plan; es ajuste de lenguaje. Quita promesas de descuento, acorta identificador de empresa y vuelve a enviar sin cambiar el número a mitad del proceso.",
      "Cada reinicio de número empeora la confianza del cliente que ya vio un SMS raro una vez.",
      "Website y Own It pueden seguir sin texto mientras corriges copy; Lead System y Plus siguen contando llamadas y formularios para la garantía de leads cuando aplique.",
    ]),
  ],
  plomeros: [
    sec("HVAC eléctrico y otros oficios en la misma conversación", [
      "Si solo haces plomería, el sitio debe decir plomería arriba. Si agregaste servicios hermanos, cada uno necesita página o quita del titular lo que no vendes.",
      "Cliente confundido por menú gigante llama al siguiente nombre del mapa.",
      "Hub de industria en <a href=\"/industries/plumbing\">plomería</a> profundiza diseño; este artículo sostiene comportamiento de llamada.",
      "Costo desglosado en <a href=\"/blog/plumber-website-cost\">costo de sitio de plomería</a> complementa sin repetir cada plan.",
      "Vista previa gratis sigue siendo primer paso en <a href=\"/contact\">contacto</a> con fotos de camioneta y lista de ciudades.",
    ]),
    sec("Temporada de clima y mensajes en portada", [
      "Invierno empuja calentadores y tuberías expuestas; verano empuja líneas de condensado y excavaciones. Portada puede rotar foto y titular sin rehacer sitio entero si el número y zona siguen claros.",
      "Aviso temporal de demora por clima debe coincidir en sitio, perfil y buzón.",
      "No prometas mismo día en toda la región si solo tienes dos camionetas.",
      "Honestidad en radio reduce una estrella mala por «nunca llegaron».",
      "Cambios pequeños en plan mensual existen precisamente para estos avisos.",
    ]),
    sec("Oficina, despacho y quien contesta", [
      "Si la oficina solo agenda y técnicos van a campo, el sitio debe decir a quién llaman: despacho con horario, no «Llama a Juan» sin contexto.",
      "Formulario debe llegar a bandeja que alguien revisa antes de que el charco se seque. Formulario a spam equivale a no tener sitio.",
      "Mismo número en sitio, perfil y tarjetas. Tercer número «de seguimiento» solo si realmente lo contestan.",
      "Texto opcional por llamada perdida no reemplaza despacho; suma cuando manos están ocupadas y operador ya aprobó.",
      "Entrenar despacho en urgencia vs cotización evita mandar camioneta de calentador a fuga activa mal clasificada.",
    ]),
    sec("Código y permisos cuando el cliente mira antes de llamar", [
      "Si tu mercado pregunta por licencia, número visible en página de servicio principal ahorra llamada de verificación.",
      "Seguro y vínculo a carrier, cuando aplica, van donde la persona escéptica los busca, no solo en pie de página legal.",
      "No inflar credenciales. Cliente que verifica y encuentra mentira publica peor reseña que si no hubiera página.",
      "Fotos de trabajo con contexto mínimo — ciudad o tipo de casa — ayudan sin violar privacidad.",
      "Confianza en plomería es prisa con prueba, no storytelling largo.",
    ]),
    sec("Anuncios locales y página de plomería", [
      "Si gastas en anuncio «destape hoy», aterriza en página de destape con teléfono arriba, no en portada genérica.",
      "Dinero a landing equivocada es más caro que página extra cotizada.",
      "Perfil de Google puede sostener llamada simple; anuncio de trabajo específico casi siempre necesita URL específica.",
      "Alinea promesa del anuncio, ficha y primera pantalla del sitio antes de subir presupuesto.",
      "Sin alinear, métricas de clic solo miden confusión más rápida.",
    ]),
    sec("Vecino hispanohablante y la misma tubería", [
      "En muchos barrios la llamada llega en español aunque el sitio esté solo en inglés.",
      "Plus existe para sitio y pedidos de reseña en inglés y español cuando contestas en ambos.",
      "Poner español solo en pie de página sin operación es promesa vacía.",
      "Si hoy solo atiendes en inglés, sitio honesto en inglés gana a mezcla confusa.",
      "Idioma es decisión de operación primero, diseño después.",
    ]),
    sec("Después de la tormenta o helada", [
      "Picos de llamada por tuberías expuestas saturan despacho; portada puede llevar aviso temporal sin esconder teléfono.",
      "No prometas tiempo universal si solo puedes priorizar zona afectada.",
      "Fotos de reparaciones recientes de ese tipo de daño ayudan cuando cliente compara tres nombres.",
      "Actualiza perfil y sitio el mismo día que amplías o reduces radio.",
      "Temporada dura semanas; honestidad sostiene reseñas cuando vuelve la normalidad.",
    ]),
    sec("Relación con el hub de plomería", [
      "Este artículo no reemplaza <a href=\"/industries/plumbing\">plomería</a> ni la guía de URLs.",
      "Úsalo para alinear llamadas, formularios y planes con la realidad de tu camioneta.",
      "Si necesitas mockup antes de decidir, vista previa gratis en dos días hábiles en <a href=\"/contact\">contacto</a>.",
      "Precios y alcance detallado permanecen en <a href=\"/pricing\">precios</a> y artículo de costo.",
    ]),
    sec("Mantenimiento trimestral del sitio de plomería", [
      "Revisa número, horario y tres servicios principales cada trimestre aunque no «rediseñes».",
      "Quita servicios que ya no vendes antes de que generen llamadas incorrectas.",
      "Actualiza foto de portada si cambió camioneta o uniforme.",
      "Quince minutos cuatro veces al año evitan año de reseñas sobre información vieja.",
    ]),
    sec("Resumen en una frase", [
      "Página de plomería que funciona nombra el trabajo, la zona y el teléfono en el primer pantazo del celular, separa urgencia de cotización y no promete lo que la cuadrilla no puede cumplir.",
      "Todo lo demás — planes, automatización, SEO — viene después de esa claridad.",
    ]),
    sec("Pregunta del dueño antes de invertir", [
      "¿El sitio actual convierte la llamada que ya ganas del mapa? Si no, arregla eso antes de comprar más exposición.",
      "¿Tienes fotos de trabajos recientes en mano? Sin fotos, cualquier plan tarda más.",
      "¿Quién contesta formularios en temporada alta? Sin respuesta, formulario es decoración.",
      "Tres sí honestos valen más que plan caro mal usado.",
    ]),
    sec("Fuga activa: qué debe decir la primera pantalla", [
      "En emergencia el visitante no lee párrafos. Titular corto, teléfono táctil, línea de «urgencias hoy en [ciudad]» y qué hacer si no contestan en dos timbres — todo visible sin menú.",
      "Formulario secundario para no urgentes evita que quien tiene agua en el piso llene campos largos mientras la fuga sigue.",
      "Prueba esa pantalla con la mano mojada; si no puedes marcar con un dedo, reordena antes de volver a pagar anuncios de destape.",
    ]),
    sec("Marcas y trabajos que sí instalas", [
      "Si solo reparas ciertas marcas, dilo en la página de calentador. Cliente que busca instalación de marca que no tocas llamará igual si el titular es vago, y perderás tiempo en ambas direcciones.",
      "Lista corta honesta convence más que logotipos de fabricantes sin certificación. Fotos tuyas en trabajos reales siguen siendo la prueba que el vecino quiere ver.",
    ]),
  ],
  resenas: [
    sec("Cliente molesto: pedir o no pedir", [
      "Si el trabajo terminó mal, no pidas reseña. Invita a llamar para corregir. Pedir estrellas en ese momento empeora todo.",
      "Arreglar problema real a veces produce reseña mejor que pedir en puerta con trabajo mediocre.",
      "Guion corto asume trabajo aceptable visible. No es herramienta de presión.",
      "Reseña negativa respondida con calma vale más que diez inventadas.",
      "Perfil con mix honesto convence más que solo cinco estrellas sospechosas.",
    ]),
    sec("Correo y texto: una petición, un enlace", [
      "No metas factura, cobro y reseña en el mismo mensaje. Cliente lee cobro y ignora enlace.",
      "Correo con asunto aburrido y enlace directo funciona para quien no usa SMS.",
      "STOP y identificación de empresa en SMS no son opcional por cortesía; son parte de cumplimiento.",
      "Prueba enlace en celular ajeno antes de enviar a clientes.",
      "Lead System y Plus automatizan envío tras trabajo; tú sigues siendo responsable de tono y timing.",
    ]),
    sec("Integrar pedido en cierre de ticket", [
      "Si usas hoja de cierre en papel, casilla pequeña: «¿Enviar enlace de reseña? Sí / No». Oficina manda solo si marcó sí.",
      "En software de ruta, nota al cerrar trabajo dispara plantilla. Sin nota, sin envío.",
      "Evita pedir en mitad de discusión de garantía o ajuste pendiente.",
      "Cliente debe ver resultado terminado. Pintura seca, fuga seca, aire frío encendido.",
      "Hábito de cierre vale más que campaña mensual de estrellas.",
    ]),
    sec("Métrica útil: reseñas nuevas por mes, no vanidad", [
      "Cuenta cuántas reseñas nuevas llegaron este mes comparado con trabajos cerrados. Si pediste en veinte y llegaron dos, revisa timing o enlace roto.",
      "Un enlace roto en plantilla de texto explica silencio mejor que «la gente no quiere».",
      "No compares con competidor que quizá compra reseñas. Comparación injusta desanima.",
      "Meta realista: más reseñas de trabajos reales el trimestre siguiente, no cien de golpe.",
      "Sitio que muestra reseñas junto al teléfono convierte mejor cuando llegan; <a href=\"/pricing\">precios</a> y <a href=\"/contact\">contacto</a> si necesitas esa página.",
    ]),
    sec("Reseña negativa reciente y pedido nuevo", [
      "Si acaba de llegar reseña dura, arregla el problema que nombra antes de empujar pedidos masivos.",
      "Respuesta pública breve y profesional muestra a futuros clientes más que cien pedidos en puerta.",
      "No pausar pedidos seis meses por una mala; sí pausar si el problema sistémico sigue sin arreglo.",
      "Pedir reseña mientras cliente espera repuesta de garantía es tono sordo.",
      "Confía en que trabajo bien hecho después generará reseñas que equilibran sin trucos.",
    ]),
    sec("Resumen para el dueño sin tiempo", [
      "Consigue enlace directo una vez. Guárdalo. Pide después de trabajos bien terminados con una frase corta.",
      "Lead System y Plus pueden automatizar envío; Website y Own It requieren hábito manual.",
      "No pagues ni inventes. No filtres infelices lejos de Google.",
      "Español en pedidos solo con Plus y operación que responde en español.",
      "Siguiente paso concreto: probar enlace hoy, pedir en el próximo trabajo que cierres bien.",
    ]),
    sec("Errores de oficina que matan el pedido", [
      "Enlace guardado en notas del técnico A distinto al de oficina.",
      "Pedido enviado a cliente que disputa factura la misma semana.",
      "Pedido automático sin revisar que el trabajo cerró bien.",
      "QR en factura apunta a perfil de otra sucursal.",
      "Un solo enlace maestro en Google Doc interno evita cuatro versiones rotas.",
    ]),
    sec("Cuando el conteo de estrellas desanima", [
      "Pocas reseñas con trabajo sólido es etapa normal, no sentencia.",
      "Pedir en silencio diez trabajos seguidos sin herramienta de enlace explica estancamiento.",
      "Competidor con cien reseñas puede tener años más o prácticas que no quieres copiar.",
      "Mide siguiente mes: ¿cuántos pedidos hiciste bien? ¿cuántas reseñas llegaron?",
      "Mejorar operación y pedido honesto sube estrellas sin atajos.",
    ]),
    sec("Lista de verificación antes del próximo trabajo", [
      "Enlace copiado y probado en celular ajeno.",
      "Guión de puerta repasado con cuadrilla.",
      "Plantilla de texto sin mezclar con cobro.",
      "Perfil con horas correctas.",
      "Decisión clara: pedir solo si el trabajo visible quedó bien.",
      "Cinco casillas tardan cinco minutos y evitan semana de silencio.",
    ]),
    sec("Primer mes con hábito nuevo", [
      "Semana uno: consigue y prueba enlace una sola vez.",
      "Semana dos: pide en tres trabajos bien cerrados, sin exagerar.",
      "Semana tres: mide cuántas reseñas llegaron y ajusta timing.",
      "Semana cuatro: decide si automatización en Lead System o Plus vale la pena.",
      "Hábito manual primero te enseña qué frase funciona antes de delegar a software.",
    ]),
    sec("Una regla para toda la empresa", [
      "Nadie pide reseña en nombre de la empresa sin enlace probado ese mes.",
      "Nadie ofrece incentivo por estrellas.",
      "Nadie escribe la reseña por el cliente.",
      "Tres reglas en una reunión de diez minutos valen más que política de diez páginas.",
    ]),
    sec("Cierre", [
      "Pedir reseñas en Google es hábito de cierre, no campaña de marketing.",
      "Enlace directo, momento correcto, frase corta, cumplimiento honesto.",
      "Lead System y Plus automatizan el envío; tú sigues eligiendo trabajos dignos de pedir.",
      "Empieza con el próximo trabajo bien terminado y un enlace que ya probaste en tu propio celular.",
    ]),
    sec("Recordatorio de planes", [
      "Website $97/mes y Own It $1,497 no incluyen envío automático de pedido de reseña.",
      "Lead System $197/mes y Plus $297/mes sí pueden enviarlo tras el trabajo con tu enlace.",
      "Plus puede pedir en español e inglés cuando tu operación responde en ambos.",
      "Ningún plan reemplaza políticas de Google ni revisiones legales de SMS.",
      "Detalle completo en <a href=\"/pricing\">precios</a>.",
    ]),
    sec("Timing después de trabajo grande vs visita rápida", [
      "Instalación de varias horas merece pedido al día siguiente, cuando el cliente ya encendió lo que instalaste. Visita de reparación menor puede llevar pedido el mismo día si saliste con todo funcionando y sin discusión pendiente.",
      "Confunde menos que un mensaje automático a las diez de la noche del mismo día del trabajo si el cliente aún revisa la casa.",
      "Ajusta plantilla por tipo de trabajo una vez; después deja que Lead System o Plus envíen solo cuando el ticket cierra bien.",
    ]),
    sec("Equipo en campo: una frase, no un discurso", [
      "El técnico no vende marketing; solo confirma que el trabajo quedó bien y que llegará un enlace corto si el cliente quiere dejar opinión. Si suena a venta, la opinión será mala.",
      "Oficina envía el enlace; técnico no improvisa URL. Esa división evita enlaces rotos escritos a mano en servilleta.",
      "Entrena con role-play de diez minutos antes de temporada alta; vale más que otro póster en el taller.",
    ]),
    sec("Reseña en español cuando el trabajo fue en español", [
      "Cliente que habló contigo en español puede dejar reseña en español si el pedido también va en español — eso es Plus con operación bilingüe real, no traducción decorativa en el sitio.",
      "Pide en el idioma de la conversación; Google permite reseñas en varios idiomas si la experiencia fue así.",
      "Si solo atiendes en inglés, pide en inglés. Coherencia importa más que volumen.",
    ]),
  ],
};

export const POSTS = {
  "freelancer-vs-agency-vs-subscription-website": freelancerVs,
  "wix-vs-squarespace-vs-managed-website-contractors": withSections(wixVs, EXTRA.wix),
  "web-design-for-contractors": withSections(webDesign, EXTRA.web),
  "google-business-profile-vs-website": withSections(googleVs, EXTRA.google),
  "missed-call-text-delayed-10dlc": withSections(delayed10, EXTRA.delayed),
  "missed-call-text-back-templates": templates,
  "pagina-web-para-plomeros": withSections(plomeros, EXTRA.plomeros),
  "como-pedir-resenas-en-google": withSections(resenas, EXTRA.resenas),
};



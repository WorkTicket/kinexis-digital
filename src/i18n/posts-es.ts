import { ES_CLUSTER_ES_ES_OVERRIDES, ES_CLUSTER_POSTS } from "@/i18n/posts-es-cluster";

export type EsPost = {
  slug: string;
  category: string;
  title: string;
  seoTitle: string;
  excerpt: string;
  lead: string;
  sections: { h2: string; html: string }[];
};

export const ES_POSTS: EsPost[] = [
  {
    slug: "website-mistakes-that-cost-you-calls",
    category: "Consejos",
    title: "Errores del sitio que te cuestan llamadas",
    seoTitle: "Errores web que cuestan llamadas",
    excerpt: "El sitio debería vender cuando tú estás en el trabajo. Estos errores hacen que la gente vuelva a Google antes de marcar.",
    lead: "Un sitio de un negocio tiene que contestar tres cosas en el celular: qué haces, dónde lo haces y cómo te llaman. Si eso no está en la primera pantalla, la visita se va.",
    sections: [
      {
        h2: "El titular no dice el trabajo",
        html: `<p>Nadie busca “calidad desde 1995”. Busca la fuga, el aire que no enfría o el techo después de la lluvia. El titular tiene que nombrar ese trabajo.</p><p>Una frase bonita sobre la familia no reemplaza el número. En el celular, la persona decide en unos segundos si sigue o regresa a los resultados.</p>`,
      },
      {
        h2: "La zona de servicio es un misterio",
        html: `<p>“Área metropolitana” no le dice a nadie si llegas a su barrio. Una lista corta de las ciudades que sí cubres le sirve al cliente y a Google.</p><p>No hace falta una página clonada por cada pueblo. Una página honesta, con los lugares que tu cuadrilla ya maneja, evita cotizaciones que no puedes cumplir.</p>`,
      },
      {
        h2: "El teléfono está escondido",
        html: `<p>El número tiene que verse en el encabezado, en la primera pantalla y en las páginas de servicio. En el celular debe ser un toque, no un texto que hay que copiar.</p><p>Si el único teléfono está al final, quien tiene una emergencia no llega ahí. Está comparando al siguiente negocio de la lista.</p>`,
      },
      {
        h2: "Una sola página para trabajos distintos",
        html: `<p>Una reparación de hoy y una cotización de la próxima semana no comparten comprador. Juntarlas hace que las dos búsquedas sean más difíciles.</p><p>Páginas separadas, con un siguiente paso claro, le dicen a la persona qué hacer: llamar ahora o pedir una visita. La computadora y el celular deben mostrar ese mismo camino.</p>`,
      },
    ],
  },
  {
    slug: "turn-clicks-into-calls",
    category: "Consejos",
    title: "Convierte las visitas en llamadas",
    seoTitle: "Cómo convertir visitas del sitio en llamadas",
    excerpt: "El tráfico no reserva el trabajo. La página tiene que darle a la persona una forma obvia de llamarte o pedir una cotización.",
    lead: "Que te encuentren es la mitad. La otra mitad es que, ya en la página, sepan qué tocar. En un negocio, ese toque casi siempre es el teléfono.",
    sections: [
      {
        h2: "Un siguiente paso, no cinco",
        html: `<p>Llamar, cotizar, chatear, descargar y seguir en redes al mismo tiempo no es una oferta. Es un menú. Elige el paso que de verdad quieres: la llamada o un formulario corto.</p><p>En el celular el botón principal tiene que caber en el pulgar. Si hay que pellizcar la pantalla para encontrarlo, la visita se fue.</p>`,
      },
      {
        h2: "El formulario pide poco",
        html: `<p>Nombre, teléfono y el trabajo alcanzan para saber si el lead es real. Pedir la historia de la casa antes del primer contacto es por lo que llaman a otro.</p><p>Las fotos pueden llegar después, por texto. No hace falta un cargador pesado en la primera pantalla.</p>`,
      },
      {
        h2: "La llamada que no contestas",
        html: `<p>Estás en el trabajo. El siguiente cliente no deja buzón. Un texto de vuelta, en los planes que lo incluyen, le escribe a quien llamó a tu número de seguimiento.</p><p>Eso no reemplaza contestar. Evita que una llamada perdida desaparezca mientras tienes las manos ocupadas.</p>`,
      },
      {
        h2: "Mide llamadas, no vanidad",
        html: `<p>Las visitas solas no pagan la nómina. Revisa impresiones, clics y leads: llamadas de más de 30 segundos, respuestas al texto y formularios reales.</p><p>Si una página trae tráfico y cero llamadas, el problema suele estar en el titular, el número o el siguiente paso, no en “hacer más SEO” a ciegas.</p>`,
      },
    ],
  },
  {
    slug: "small-business-marketing-budget",
    category: "Consejos",
    title: "Presupuesto de marketing para un negocio de servicios",
    seoTitle: "Presupuesto de marketing para negocios de servicios",
    excerpt: "Antes de anuncios, el sitio tiene que contestar el teléfono. Así se reparte un presupuesto chico sin comprar herramientas que nadie usa.",
    lead: "Un negocio de servicios no necesita doce suscripciones. Necesita un sitio que cargue en el celular, un número visible y una forma de saber qué llamadas llegaron.",
    sections: [
      {
        h2: "Primero la base",
        html: `<p>Hosting, páginas de los trabajos que sí vendes y un teléfono que se puede tocar. Sin eso, el anuncio manda gente a una página que no convierte.</p><p>Los cuatro planes de Kinexis empiezan con una vista previa de la página de inicio, sin tarjeta. Website es $97 al mes, Lead System $197, Plus $297 y Own It $1,497 de una vez.</p>`,
      },
      {
        h2: "El seguimiento vale más que otro logo",
        html: `<p>Lead System agrega texto cuando no contestas, pedido de reseña después del trabajo y un reporte mensual. Eso atiende el hueco entre la visita y la llamada.</p><p>Plus hace ese seguimiento en inglés y en español, y el sitio también. Own It es un pago, sin plan mensual y sin la garantía de leads.</p>`,
      },
      {
        h2: "El SEO no es un interruptor",
        html: `<p>Un sitio limpio, rápido y con títulos claros es la base. El trabajo mensual de SEO se cotiza aparte. No viene escondido dentro de los planes del sitio.</p><p>Prometer el primer lugar no es un plan. Se informa impresiones, clics y leads, y se dice con claridad que nadie controla los resultados de Google.</p>`,
      },
      {
        h2: "Qué dejar para después",
        html: `<p>Páginas extra, cuidado del sitio después del primer año en Own It y texto de vuelta se pueden agregar cuando el negocio ya los necesita. Los precios de esos extras están en la página de mejoras.</p><p>Gastar primero en anuncios, con un sitio que esconde el teléfono, es pagar para que la gente se vaya.</p>`,
      },
    ],
  },
  {
    slug: "make-your-website-mobile-ready",
    category: "Diseño",
    title: "Deja el sitio listo para el celular",
    seoTitle: "Sitio móvil para negocios de servicios",
    excerpt: "La búsqueda de un negocio ocurre en la entrada de la casa o en la cocina. La página tiene que cargar y mostrar el siguiente paso.",
    lead: "Si el sitio se ve bien en la computadora y se rompe en el celular, se rompe donde está el cliente. La mayoría de estas búsquedas no empiezan en un escritorio.",
    sections: [
      {
        h2: "El número cabe en la pantalla",
        html: `<p>Nada de pellizcar para leer el teléfono. El botón de llamar queda visible sin bajar tres pantallas. El texto del botón dice la acción, no “haz clic aquí”.</p><p>Los formularios usan campos grandes. Un teclado que tapa el botón de enviar es un lead perdido.</p>`,
      },
      {
        h2: "La velocidad es parte del diseño",
        html: `<p>Una foto enorme que tarda en cargar le gana al diseño. Las páginas tienen que mostrarse rápido en una conexión normal de celular.</p><p>Eso también lo mira Google. Un sitio lento compite peor, aunque el texto esté bien escrito.</p>`,
      },
      {
        h2: "El mismo contenido, otro orden",
        html: `<p>En el celular el orden importa más: trabajo, zona, teléfono. La historia de la empresa puede ir después. En la computadora hay más espacio, pero el siguiente paso no cambia.</p><p>No publiques una versión “móvil” con menos servicios. Publica las mismas páginas, legibles en las dos pantallas.</p>`,
      },
      {
        h2: "Pruébalo como cliente",
        html: `<p>Abre el sitio en tu celular, con una mano. ¿Puedes llamar sin buscar? ¿El formulario se puede terminar? ¿Las fotos de los trabajos se ven?</p><p>Si la respuesta es no, el rediseño no es un adorno. Es la diferencia entre una visita y una llamada.</p>`,
      },
    ],
  },
  {
    slug: "local-seo-get-found-get-called",
    category: "SEO",
    title: "SEO local para que te encuentren y te llamen",
    seoTitle: "SEO local para negocios de servicios en EE. UU.",
    excerpt: "El SEO local no es repetir el nombre de la ciudad en cincuenta páginas. Es una zona real, páginas de servicio y un perfil de Google que coincide.",
    lead: "Google tiene que entender qué negocio tienes y dónde trabajas. El cliente tiene que poder llamarte cuando te encuentra. Las dos cosas fallan cuando el sitio es una plantilla con el nombre del pueblo cambiado.",
    sections: [
      {
        h2: "Una zona, no un clon por ciudad",
        html: `<p>Una página de zona con las ciudades que cubres le sirve a quien busca y a quien rastrea el sitio. Veinte páginas iguales, con solo el pueblo distinto, son páginas delgadas.</p><p>Ese atajo no es cómo se gana una búsqueda. Es cómo un sitio deja de parecer confiable.</p>`,
      },
      {
        h2: "Cada servicio tiene su página",
        html: `<p>La gente busca el trabajo, no “servicios para el hogar”. Fuga, calentador, sin aire, techo, ruta de jardín: cada uno puede tener su título, su encabezado y su siguiente paso.</p><p>El título y la descripción deben decir ese trabajo con palabras que un cliente usaría en el celular.</p>`,
      },
      {
        h2: "El perfil de Google y el sitio dicen lo mismo",
        html: `<p>Nombre, teléfono, horario y zona tienen que coincidir. Un perfil que promete 24 horas y un sitio que cierra a las seis crea la llamada enojada.</p><p>Lead System y Plus incluyen un ajuste del perfil. Plus agrega dos publicaciones al mes. Eso no reemplaza el trabajo de SEO continuo, que se cotiza aparte.</p>`,
      },
      {
        h2: "Cómo se sabe si avanza",
        html: `<p>Impresiones, clics y leads. No una posición prometida. Search Console muestra si las páginas se están viendo. El reporte muestra si eso se volvió llamada o formulario.</p><p>Los arreglos técnicos pueden notarse en semanas. El crecimiento de fondo suele tomar meses, según la competencia y el punto de partida.</p>`,
      },
    ],
  },
  {
    slug: "build-trust-with-reviews",
    category: "Consejos",
    title: "Consigue reseñas sin perseguir a la gente",
    seoTitle: "Cómo conseguir más reseñas de Google",
    excerpt: "La reseña se pide cuando el trabajo salió bien, con un enlace directo. No depende de que te acuerdes de pedirla desde la camioneta.",
    lead: "La siguiente cotización mira las reseñas antes de llamar. Pedirlas en la puerta funciona a veces. Un texto con el enlace, enviado cuando tú eliges, funciona aunque ya estés en el siguiente trabajo.",
    sections: [
      {
        h2: "Pide en el momento correcto",
        html: `<p>Después de un trabajo terminado, no una semana después cuando el cliente ya olvidó el nombre de la empresa. El mensaje lleva el enlace al perfil de Google, para que no tenga que buscarlo.</p><p>En una ruta semanal no escribas cada martes. Elige el momento, para no cansar a la misma casa.</p>`,
      },
      {
        h2: "El enlace tiene que ser directo",
        html: `<p>“Búscanos en Google y déjanos una reseña” pierde gente. Un enlace que abre el perfil, en el celular, toma unos segundos.</p><p>Lead System envía ese pedido después de cada trabajo. Plus lo envía en inglés y en español.</p>`,
      },
      {
        h2: "No compres reseñas ni las inventes",
        html: `<p>Una reseña tiene que ser de un cliente real. Inventar opiniones o usar fotos de trabajos ajenos se nota, y le hace daño al perfil.</p><p>Si todavía hay pocas, el sitio igual puede mostrar el camino para llamar. Las reseñas crecen con los trabajos, no con un texto falso.</p>`,
      },
      {
        h2: "Responde desde tu cuenta",
        html: `<p>Una respuesta breve en las reseñas nuevas muestra que hay una persona detrás del negocio. Se contesta desde la cuenta de Google del negocio.</p><p>Eso no está en todos los planes como un servicio de redacción. El pedido automático sí está en Lead System y Plus. Own It no incluye la garantía de leads ni ese seguimiento, salvo que se agregue el texto de vuelta.</p>`,
      },
    ],
  },
  {
    "slug": "monthly-website-vs-own-it",
    "category": "Consejos",
    "title": "Plan mensual u Own It para negocios",
    "seoTitle": "Sitio web mensual vs Own It para negocios | Kinexis Digital",
    "excerpt": "Compara Website, Lead System y Plus con Own It: cancelación, compra de archivos y qué incluye cada uno de los cuatro planes.",
    "lead": "Los planes mensuales y Own It son opciones válidas. Depende del flujo de caja y si quieres herramientas de llamada perdida.",
    "sections": [
      {
        "h2": "Las dos opciones son válidas",
        "html": "<p>Algunos prefieren $0 de entrada y mes a mes. Otros un solo pago y los archivos desde el día uno.</p>"
      },
      {
        "h2": "Comparación",
        "html": "<p>Website $97/mes, Lead System $197/mes, Plus $297/mes u Own It $1,497. Detalle en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Quién se queda con el sitio si cancelas",
        "html": "<p>Cancelas cuando quieras. El sitio sigue en línea en el período ya pagado. Después, el hosting termina salvo compra por escrito de los archivos ($1,497) o pasar a Own It. En Own It, los archivos son tuyos desde el lanzamiento.</p>"
      },
      {
        "h2": "Own It desde el día uno",
        "html": "<p>Un pago, archivos tuyos, 12 meses de hosting y cambios chicos. Luego Site Care opcional a $39/mes.</p>"
      }
    ]
  },
  {
    slug: "missed-call-text-back-templates",
    category: "Consejos",
    title: "Plantillas de texto por llamada perdida para 12 negocios",
    seoTitle: "Plantillas de texto por llamada perdida | Kinexis Digital",
    excerpt: "Borradores de SMS por oficio para la llamada perdida, con tiempos honestos de aprobación del operador antes de enviarlos.",
    lead: "El texto de llamada perdida es opcional y requiere una línea dedicada de la empresa. En Lead System o Plus, un segundo número cuesta $1/mes si lo usas, más tarifas del operador. La aprobación del operador suele tardar 10–15 días y no está garantizada.",
    sections: [
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
        html: `<p id="pressure-washing">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business}. Perdimos tu llamada — responde CASA, CONCRETO o TECHO y tu ciudad.</code></li><li><code>Estamos en un trabajo. Responde COTIZACIÓN para un estimado y qué hay que lavar.</code></li><li><code>Entradas/aceras: responde CONCRETO y tu código postal.</code></li><li><code>Lavado suave / algas en techo: responde TECHO — confirmamos el método antes de agendar.</code></li><li><code>Fuera de horario: manda fotos si tienes y confirmamos los siguientes pasos.</code></li></ul>`,
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
    ],
  },
  {
    slug: "plumber-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de plomería en 2026?",
    seoTitle: "Costo de un sitio web de plomería | Kinexis Digital",
    excerpt: "Precios reales de Kinexis para un sitio de plomería: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    lead: "Con Kinexis, un sitio de plomería empieza en Website a $97/mes, Lead System a $197/mes, Plus a $297/mes u Own It por $1,497 de una vez. Todas las opciones empiezan con una vista previa gratis del inicio — sin tarjeta y sin obligación.",
    sections: [
      {
        h2: "Precios de Kinexis para sitios de negocios",
        html: `<p>Estas son las cuatro opciones en vivo:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Para qué sirve</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio profesional con hosting, SSL y hasta dos cambios chicos al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Texto opcional ($1/mes 2.º número si lo usas + operador), pedidos de reseña, seguimiento de llamadas y cambios chicos sin tope</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos tuyos desde el lanzamiento, con 12 meses de hosting y cambios chicos</td></tr></tbody></table><p>El detalle completo está en <a href="/pricing">/pricing</a>. Compara mensual vs Own It en <a href="/blog/monthly-website-vs-own-it">plan mensual u Own It</a>.</p>`,
      },
      {
        h2: "Cuánto cuesta en 24 meses",
        html: "<p>Calculado solo con los términos vigentes de Kinexis ($0 de entrada, precio fijo 24 meses en planes mensuales):</p><table><thead><tr><th>Plan</th><th>Año 1</th><th>24 meses</th><th>Notas</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td><td>$0 de entrada, precio fijo 24 meses</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td><td>Incluye garantía de leads de 60 días</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td><td>Inglés + español</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497 + Site Care opcional $39/mes en meses 13–24 ($468) = $1,965</td><td>Dominio se factura al costo</td></tr></tbody></table><p><em>Precios sin impuestos, si aplican. Las tarifas del operador de texto y el segundo número opcional de $1/mes son aparte.</em></p>"
      },
      {
        h2: "DIY vs freelancer vs agencia vs un plan mensual: qué cambia el precio",
        html: `<p>Los constructores DIY se ven baratos hasta que sumas hosting, texto, fotos y las horas de aprender la herramienta. Los freelancers varían mucho. Las agencias suelen cotizar por proyecto con estrategia, diseño y revisiones — los rangos cambian por mercado, así que trata cualquier “costo promedio” público como comentario fechado, no como cotización de Kinexis.</p><p>Publicamos nuestros precios de plan para que compares sin adivinar.</p>`,
      },
      {
        h2: "Costos aparte a planear",
        html: `<p>El SEO continuo va aparte. Fotos y redacción a medida se cotizan si las necesitas. El texto de llamada perdida requiere línea dedicada y aprobación del operador (normalmente 10–15 días; no garantizada). En Lead System o Plus, un segundo número es $1/mes si lo usas, más tarifas del operador.</p>`,
      },
      {
        h2: "Qué estás pagando en un sitio de plomería",
        html: `<p>Pagas por páginas armadas alrededor de fugas, drenajes y calentadores — no una plantilla genérica con el nombre cambiado. Mira el <a href="/industries/plumbing">hub de plomería</a> y <a href="/blog/plumbing-website-pages">qué páginas necesita un sitio de plomería</a>.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> antes de elegir plan.</p>`,
      },
    ],
  },
  {
    slug: "plumbing-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de plomería",
    seoTitle: "Qué páginas necesita un sitio de plomería | Kinexis Digital",
    excerpt: "Páginas base y de servicio para un sitio de plomería, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    lead: "Un sitio de plomería necesita un inicio claro, zona honesta, nosotros, reseñas y contacto — más páginas de servicio para lo que la gente busca. Separa fugas, drenajes y calentadores para no mezclar emergencia y cotización.",
    sections: [
      {
        h2: "Páginas base de cualquier sitio de servicios",
        html: `<ul><li><strong>Inicio</strong> — nombra el trabajo, muestra el teléfono y deja claro el siguiente paso.</li><li><strong>Servicios</strong> — páginas separadas para los trabajos que vendes, no un cajón de sastre.</li><li><strong>Zona de servicio</strong> — ciudades y barrios que tu cuadrilla sí cubre.</li><li><strong>Nosotros</strong> — licencia, seguro y quién llega.</li><li><strong>Reseñas</strong> — prueba de trabajos reales.</li><li><strong>Contacto</strong> — formulario + llamada con un toque en cada dispositivo.</li></ul>`,
      },
      {
        h2: "Páginas de servicio de plomería",
        html: `<p>Arma el sitio alrededor de fugas, drenajes y calentadores. Páginas separadas para que la emergencia y la cotización no se mezclen.</p><p>Detalle y ejemplos en el <a href="/industries/plumbing">hub de plomería</a>.</p>`,
      },
      {
        h2: "Inicio anotado cuando hay prueba",
        html: `<p>Preferred Plumbing Solutions es un sitio de cliente de plomería en vivo. En el inicio: héroe local de Spirit Lake con teléfono + CTA de estimado gratis, franja de confianza (licencia, dueño-operado, estimados gratis), caminos separados para reparaciones / radiante / sin tanque / drenajes / obra nueva, y FAQs con horario real. Mira el bloque de prueba del <a href="/industries/plumbing">hub de plomería</a>.</p>`,
      },
      {
        h2: "Sin spam de ciudades",
        html: `<p>No publiques páginas casi iguales que solo cambian el nombre del pueblo. Eso gasta rastreo y no ayuda a quien llama. Una página clara de zona es el enfoque honesto.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> o compara planes en <a href="/pricing">/pricing</a>.</p>`,
      },
    ],
  },
  {
    slug: "hvac-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de HVAC en 2026?",
    seoTitle: "Costo de un sitio web de HVAC | Kinexis Digital",
    excerpt: "Precios reales de Kinexis para un sitio de HVAC: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    lead: "Con Kinexis, un sitio de HVAC empieza en Website a $97/mes, Lead System a $197/mes, Plus a $297/mes u Own It por $1,497 de una vez. Todas las opciones empiezan con una vista previa gratis del inicio — sin tarjeta y sin obligación.",
    sections: [
      {
        h2: "Precios de Kinexis para sitios de negocios",
        html: `<p>Estas son las cuatro opciones en vivo:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Para qué sirve</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio profesional con hosting, SSL y hasta dos cambios chicos al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Texto opcional ($1/mes 2.º número si lo usas + operador), pedidos de reseña, seguimiento de llamadas y cambios chicos sin tope</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos tuyos desde el lanzamiento, con 12 meses de hosting y cambios chicos</td></tr></tbody></table><p>El detalle completo está en <a href="/pricing">/pricing</a>. Compara mensual vs Own It en <a href="/blog/monthly-website-vs-own-it">plan mensual u Own It</a>.</p>`,
      },
      {
        h2: "Cuánto cuesta en 24 meses",
        html: "<p>Calculado solo con los términos vigentes de Kinexis ($0 de entrada, precio fijo 24 meses en planes mensuales):</p><table><thead><tr><th>Plan</th><th>Año 1</th><th>24 meses</th><th>Notas</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td><td>$0 de entrada, precio fijo 24 meses</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td><td>Incluye garantía de leads de 60 días</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td><td>Inglés + español</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497 + Site Care opcional $39/mes en meses 13–24 ($468) = $1,965</td><td>Dominio se factura al costo</td></tr></tbody></table><p><em>Precios sin impuestos, si aplican. Las tarifas del operador de texto y el segundo número opcional de $1/mes son aparte.</em></p>"
      },
      {
        h2: "DIY vs freelancer vs agencia vs un plan mensual: qué cambia el precio",
        html: `<p>Los constructores DIY se ven baratos hasta que sumas hosting, texto, fotos y las horas de aprender la herramienta. Los freelancers varían mucho. Las agencias suelen cotizar por proyecto. Publicamos nuestros precios de plan para que compares sin adivinar.</p>`,
      },
      {
        h2: "Costos aparte a planear",
        html: `<p>El SEO continuo va aparte. Fotos y redacción a medida se cotizan si las necesitas. El texto de llamada perdida requiere línea dedicada y aprobación del operador (normalmente 10–15 días; no garantizada). En Lead System o Plus, un segundo número es $1/mes si lo usas, más tarifas del operador.</p>`,
      },
      {
        h2: "Qué estás pagando en un sitio de HVAC",
        html: `<p>Pagas por páginas armadas alrededor de reparación sin aire, cambio de equipo y mantenimiento — no una plantilla genérica con el nombre cambiado. Mira el <a href="/industries/hvac">hub de HVAC</a> y <a href="/blog/hvac-website-pages">qué páginas necesita un sitio de HVAC</a>.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> antes de elegir plan.</p>`,
      },
    ],
  },
  {
    slug: "hvac-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de HVAC",
    seoTitle: "Qué páginas necesita un sitio de HVAC | Kinexis Digital",
    excerpt: "Páginas base y de servicio para un sitio de HVAC, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    lead: "Un sitio de HVAC necesita un inicio claro, zona honesta, nosotros, reseñas y contacto — más páginas de servicio para lo que la gente busca. Arma el sitio alrededor de reparación sin aire, cambio de equipo y mantenimiento.",
    sections: [
      {
        h2: "Páginas base de cualquier sitio de servicios",
        html: `<ul><li><strong>Inicio</strong> — nombra el trabajo, muestra el teléfono y deja claro el siguiente paso.</li><li><strong>Servicios</strong> — páginas separadas para los trabajos que vendes, no un cajón de sastre.</li><li><strong>Zona de servicio</strong> — ciudades y barrios que tu cuadrilla sí cubre.</li><li><strong>Nosotros</strong> — licencia, seguro y quién llega.</li><li><strong>Reseñas</strong> — prueba de trabajos reales.</li><li><strong>Contacto</strong> — formulario + llamada con un toque en cada dispositivo.</li></ul>`,
      },
      {
        h2: "Páginas de servicio de HVAC",
        html: `<p>Arma el sitio alrededor de reparación sin aire, cambio de equipo y mantenimiento. Páginas separadas para que cada tipo de comprador tenga un siguiente paso claro.</p><p>Detalle y ejemplos en el <a href="/industries/hvac">hub de HVAC</a>.</p>`,
      },
      {
        h2: "Sin spam de ciudades",
        html: `<p>No publiques páginas casi iguales que solo cambian el nombre del pueblo. Eso gasta rastreo y no ayuda a quien llama. Una página clara de zona es el enfoque honesto.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> o compara planes en <a href="/pricing">/pricing</a>.</p>`,
      },
    ],
  },
  {
    slug: "electrician-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de electricidad en 2026?",
    seoTitle: "Costo de un sitio web de electricidad | Kinexis Digital",
    excerpt: "Precios reales de Kinexis para un sitio de electricidad: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    lead: "Con Kinexis, un sitio de electricista empieza en Website a $97/mes, Lead System a $197/mes, Plus a $297/mes u Own It por $1,497 de una vez. Todas las opciones empiezan con una vista previa gratis del inicio — sin tarjeta y sin obligación.",
    sections: [
      {
        h2: "Precios de Kinexis para sitios de negocios",
        html: `<p>Estas son las cuatro opciones en vivo:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Para qué sirve</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio profesional con hosting, SSL y hasta dos cambios chicos al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Texto opcional ($1/mes 2.º número si lo usas + operador), pedidos de reseña, seguimiento de llamadas y cambios chicos sin tope</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos tuyos desde el lanzamiento, con 12 meses de hosting y cambios chicos</td></tr></tbody></table><p>El detalle completo está en <a href="/pricing">/pricing</a>. Compara mensual vs Own It en <a href="/blog/monthly-website-vs-own-it">plan mensual u Own It</a>.</p>`,
      },
      {
        h2: "Cuánto cuesta en 24 meses",
        html: "<p>Calculado solo con los términos vigentes de Kinexis ($0 de entrada, precio fijo 24 meses en planes mensuales):</p><table><thead><tr><th>Plan</th><th>Año 1</th><th>24 meses</th><th>Notas</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td><td>$0 de entrada, precio fijo 24 meses</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td><td>Incluye garantía de leads de 60 días</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td><td>Inglés + español</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497 + Site Care opcional $39/mes en meses 13–24 ($468) = $1,965</td><td>Dominio se factura al costo</td></tr></tbody></table><p><em>Precios sin impuestos, si aplican. Las tarifas del operador de texto y el segundo número opcional de $1/mes son aparte.</em></p>"
      },
      {
        h2: "DIY vs freelancer vs agencia vs un plan mensual: qué cambia el precio",
        html: `<p>Los constructores DIY se ven baratos hasta que sumas hosting, texto, fotos y las horas de aprender la herramienta. Los freelancers varían mucho. Las agencias suelen cotizar por proyecto. Publicamos nuestros precios de plan para que compares sin adivinar.</p>`,
      },
      {
        h2: "Costos aparte a planear",
        html: `<p>El SEO continuo va aparte. Fotos y redacción a medida se cotizan si las necesitas. El texto de llamada perdida requiere línea dedicada y aprobación del operador (normalmente 10–15 días; no garantizada). En Lead System o Plus, un segundo número es $1/mes si lo usas, más tarifas del operador.</p>`,
      },
      {
        h2: "Qué estás pagando en un sitio de electricidad",
        html: `<p>Pagas por páginas armadas alrededor de tableros, cargadores EV y diagnóstico — no una plantilla genérica con el nombre cambiado. Mira el <a href="/industries/electrical">hub de electricidad</a> y <a href="/blog/electrician-website-pages">qué páginas necesita un sitio de electricidad</a>.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> antes de elegir plan.</p>`,
      },
    ],
  },
  {
    slug: "electrician-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de electricidad",
    seoTitle: "Qué páginas necesita un sitio de electricidad | Kinexis Digital",
    excerpt: "Páginas base y de servicio para un sitio de electricidad, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    lead: "Un sitio de electricista necesita un inicio claro, zona honesta, nosotros, reseñas y contacto — más páginas de servicio para lo que la gente busca. Arma el sitio alrededor de tableros, cargadores EV y diagnóstico.",
    sections: [
      {
        h2: "Páginas base de cualquier sitio de servicios",
        html: `<ul><li><strong>Inicio</strong> — nombra el trabajo, muestra el teléfono y deja claro el siguiente paso.</li><li><strong>Servicios</strong> — páginas separadas para los trabajos que vendes, no un cajón de sastre.</li><li><strong>Zona de servicio</strong> — ciudades y barrios que tu cuadrilla sí cubre.</li><li><strong>Nosotros</strong> — licencia, seguro y quién llega.</li><li><strong>Reseñas</strong> — prueba de trabajos reales.</li><li><strong>Contacto</strong> — formulario + llamada con un toque en cada dispositivo.</li></ul>`,
      },
      {
        h2: "Páginas de servicio de electricidad",
        html: `<p>Arma el sitio alrededor de tableros, cargadores EV y diagnóstico. Páginas separadas para que cada tipo de comprador tenga un siguiente paso claro.</p><p>Detalle y ejemplos en el <a href="/industries/electrical">hub de electricidad</a>.</p>`,
      },
      {
        h2: "Sin spam de ciudades",
        html: `<p>No publiques páginas casi iguales que solo cambian el nombre del pueblo. Eso gasta rastreo y no ayuda a quien llama. Una página clara de zona es el enfoque honesto.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> o compara planes en <a href="/pricing">/pricing</a>.</p>`,
      },
    ],
  },
  {
    slug: "roofing-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de techos en 2026?",
    seoTitle: "Costo de un sitio web de techos | Kinexis Digital",
    excerpt: "Precios reales de Kinexis para un sitio de techos: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    lead: "Con Kinexis, un sitio de techos empieza en Website a $97/mes, Lead System a $197/mes, Plus a $297/mes u Own It por $1,497 de una vez. Todas las opciones empiezan con una vista previa gratis del inicio — sin tarjeta y sin obligación.",
    sections: [
      {
        h2: "Precios de Kinexis para sitios de negocios",
        html: `<p>Estas son las cuatro opciones en vivo:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Para qué sirve</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio profesional con hosting, SSL y hasta dos cambios chicos al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Texto opcional ($1/mes 2.º número si lo usas + operador), pedidos de reseña, seguimiento de llamadas y cambios chicos sin tope</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos tuyos desde el lanzamiento, con 12 meses de hosting y cambios chicos</td></tr></tbody></table><p>El detalle completo está en <a href="/pricing">/pricing</a>. Compara mensual vs Own It en <a href="/blog/monthly-website-vs-own-it">plan mensual u Own It</a>.</p>`,
      },
      {
        h2: "Cuánto cuesta en 24 meses",
        html: "<p>Calculado solo con los términos vigentes de Kinexis ($0 de entrada, precio fijo 24 meses en planes mensuales):</p><table><thead><tr><th>Plan</th><th>Año 1</th><th>24 meses</th><th>Notas</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td><td>$0 de entrada, precio fijo 24 meses</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td><td>Incluye garantía de leads de 60 días</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td><td>Inglés + español</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497 + Site Care opcional $39/mes en meses 13–24 ($468) = $1,965</td><td>Dominio se factura al costo</td></tr></tbody></table><p><em>Precios sin impuestos, si aplican. Las tarifas del operador de texto y el segundo número opcional de $1/mes son aparte.</em></p>"
      },
      {
        h2: "DIY vs freelancer vs agencia vs un plan mensual: qué cambia el precio",
        html: `<p>Los constructores DIY se ven baratos hasta que sumas hosting, texto, fotos y las horas de aprender la herramienta. Los freelancers varían mucho. Las agencias suelen cotizar por proyecto. Publicamos nuestros precios de plan para que compares sin adivinar.</p>`,
      },
      {
        h2: "Costos aparte a planear",
        html: `<p>El SEO continuo va aparte. Fotos y redacción a medida se cotizan si las necesitas. El texto de llamada perdida requiere línea dedicada y aprobación del operador (normalmente 10–15 días; no garantizada). En Lead System o Plus, un segundo número es $1/mes si lo usas, más tarifas del operador.</p>`,
      },
      {
        h2: "Qué estás pagando en un sitio de techos",
        html: `<p>Pagas por páginas armadas alrededor de reparaciones, cambios y llamadas por tormenta — no una plantilla genérica con el nombre cambiado. Mira el <a href="/industries/roofing">hub de techos</a> y <a href="/blog/roofing-website-pages">qué páginas necesita un sitio de techos</a>.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> antes de elegir plan.</p>`,
      },
    ],
  },
  {
    slug: "roofing-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de techos",
    seoTitle: "Qué páginas necesita un sitio de techos | Kinexis Digital",
    excerpt: "Páginas base y de servicio para un sitio de techos, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    lead: "Un sitio de techos necesita un inicio claro, zona honesta, nosotros, reseñas y contacto — más páginas de servicio para lo que la gente busca. Arma el sitio alrededor de reparaciones, cambios y llamadas por tormenta.",
    sections: [
      {
        h2: "Páginas base de cualquier sitio de servicios",
        html: `<ul><li><strong>Inicio</strong> — nombra el trabajo, muestra el teléfono y deja claro el siguiente paso.</li><li><strong>Servicios</strong> — páginas separadas para los trabajos que vendes, no un cajón de sastre.</li><li><strong>Zona de servicio</strong> — ciudades y barrios que tu cuadrilla sí cubre.</li><li><strong>Nosotros</strong> — licencia, seguro y quién llega.</li><li><strong>Reseñas</strong> — prueba de trabajos reales.</li><li><strong>Contacto</strong> — formulario + llamada con un toque en cada dispositivo.</li></ul>`,
      },
      {
        h2: "Páginas de servicio de techos",
        html: `<p>Arma el sitio alrededor de reparaciones, cambios y llamadas por tormenta. Páginas separadas para que cada tipo de comprador tenga un siguiente paso claro.</p><p>Detalle y ejemplos en el <a href="/industries/roofing">hub de techos</a>.</p>`,
      },
      {
        h2: "Sin spam de ciudades",
        html: `<p>No publiques páginas casi iguales que solo cambian el nombre del pueblo. Eso gasta rastreo y no ayuda a quien llama. Una página clara de zona es el enfoque honesto.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> o compara planes en <a href="/pricing">/pricing</a>.</p>`,
      },
    ],
  },
  {
    slug: "garage-door-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de puertas de garaje en 2026?",
    seoTitle: "Costo de un sitio web de puertas de garaje | Kinexis Digital",
    excerpt: "Precios reales de Kinexis para un sitio de puertas de garaje: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    lead: "Con Kinexis, un sitio de puertas de garaje empieza en Website a $97/mes, Lead System a $197/mes, Plus a $297/mes u Own It por $1,497 de una vez. Todas las opciones empiezan con una vista previa gratis del inicio — sin tarjeta y sin obligación.",
    sections: [
      {
        h2: "Precios de Kinexis para sitios de negocios",
        html: `<p>Estas son las cuatro opciones en vivo:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Para qué sirve</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio profesional con hosting, SSL y hasta dos cambios chicos al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Texto opcional ($1/mes 2.º número si lo usas + operador), pedidos de reseña, seguimiento de llamadas y cambios chicos sin tope</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos tuyos desde el lanzamiento, con 12 meses de hosting y cambios chicos</td></tr></tbody></table><p>El detalle completo está en <a href="/pricing">/pricing</a>. Compara mensual vs Own It en <a href="/blog/monthly-website-vs-own-it">plan mensual u Own It</a>.</p>`,
      },
      {
        h2: "Cuánto cuesta en 24 meses",
        html: "<p>Calculado solo con los términos vigentes de Kinexis ($0 de entrada, precio fijo 24 meses en planes mensuales):</p><table><thead><tr><th>Plan</th><th>Año 1</th><th>24 meses</th><th>Notas</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td><td>$0 de entrada, precio fijo 24 meses</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td><td>Incluye garantía de leads de 60 días</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td><td>Inglés + español</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497 + Site Care opcional $39/mes en meses 13–24 ($468) = $1,965</td><td>Dominio se factura al costo</td></tr></tbody></table><p><em>Precios sin impuestos, si aplican. Las tarifas del operador de texto y el segundo número opcional de $1/mes son aparte.</em></p>"
      },
      {
        h2: "DIY vs freelancer vs agencia vs un plan mensual: qué cambia el precio",
        html: `<p>Los constructores DIY se ven baratos hasta que sumas hosting, texto, fotos y las horas de aprender la herramienta. Los freelancers varían mucho. Las agencias suelen cotizar por proyecto. Publicamos nuestros precios de plan para que compares sin adivinar.</p>`,
      },
      {
        h2: "Costos aparte a planear",
        html: `<p>El SEO continuo va aparte. Fotos y redacción a medida se cotizan si las necesitas. El texto de llamada perdida requiere línea dedicada y aprobación del operador (normalmente 10–15 días; no garantizada). En Lead System o Plus, un segundo número es $1/mes si lo usas, más tarifas del operador.</p>`,
      },
      {
        h2: "Qué estás pagando en un sitio de puertas de garaje",
        html: `<p>Pagas por páginas armadas alrededor de resortes rotos, motores y puertas nuevas — no una plantilla genérica con el nombre cambiado. Mira el <a href="/industries/garage-doors">hub de puertas de garaje</a> y <a href="/blog/garage-door-website-pages">qué páginas necesita un sitio de puertas de garaje</a>.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> antes de elegir plan.</p>`,
      },
    ],
  },
  {
    slug: "garage-door-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de puertas de garaje",
    seoTitle: "Qué páginas necesita un sitio de puertas de garaje | Kinexis Digital",
    excerpt: "Páginas base y de servicio para un sitio de puertas de garaje, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    lead: "Un sitio de puertas de garaje necesita un inicio claro, zona honesta, nosotros, reseñas y contacto — más páginas de servicio para lo que la gente busca. Arma el sitio alrededor de resortes rotos, motores y puertas nuevas.",
    sections: [
      {
        h2: "Páginas base de cualquier sitio de servicios",
        html: `<ul><li><strong>Inicio</strong> — nombra el trabajo, muestra el teléfono y deja claro el siguiente paso.</li><li><strong>Servicios</strong> — páginas separadas para los trabajos que vendes, no un cajón de sastre.</li><li><strong>Zona de servicio</strong> — ciudades y barrios que tu cuadrilla sí cubre.</li><li><strong>Nosotros</strong> — licencia, seguro y quién llega.</li><li><strong>Reseñas</strong> — prueba de trabajos reales.</li><li><strong>Contacto</strong> — formulario + llamada con un toque en cada dispositivo.</li></ul>`,
      },
      {
        h2: "Páginas de servicio de puertas de garaje",
        html: `<p>Arma el sitio alrededor de resortes rotos, motores y puertas nuevas. Páginas separadas para que cada tipo de comprador tenga un siguiente paso claro.</p><p>Detalle y ejemplos en el <a href="/industries/garage-doors">hub de puertas de garaje</a>.</p>`,
      },
      {
        h2: "Sin spam de ciudades",
        html: `<p>No publiques páginas casi iguales que solo cambian el nombre del pueblo. Eso gasta rastreo y no ayuda a quien llama. Una página clara de zona es el enfoque honesto.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> o compara planes en <a href="/pricing">/pricing</a>.</p>`,
      },
    ],
  },
  {
    slug: "painting-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de pintura en 2026?",
    seoTitle: "Costo de un sitio web de pintura | Kinexis Digital",
    excerpt: "Precios reales de Kinexis para un sitio de pintura: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    lead: "Con Kinexis, un sitio de pintura empieza en Website a $97/mes, Lead System a $197/mes, Plus a $297/mes u Own It por $1,497 de una vez. Todas las opciones empiezan con una vista previa gratis del inicio — sin tarjeta y sin obligación.",
    sections: [
      {
        h2: "Precios de Kinexis para sitios de negocios",
        html: `<p>Estas son las cuatro opciones en vivo:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Para qué sirve</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio profesional con hosting, SSL y hasta dos cambios chicos al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Texto opcional ($1/mes 2.º número si lo usas + operador), pedidos de reseña, seguimiento de llamadas y cambios chicos sin tope</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos tuyos desde el lanzamiento, con 12 meses de hosting y cambios chicos</td></tr></tbody></table><p>El detalle completo está en <a href="/pricing">/pricing</a>. Compara mensual vs Own It en <a href="/blog/monthly-website-vs-own-it">plan mensual u Own It</a>.</p>`,
      },
      {
        h2: "Cuánto cuesta en 24 meses",
        html: "<p>Calculado solo con los términos vigentes de Kinexis ($0 de entrada, precio fijo 24 meses en planes mensuales):</p><table><thead><tr><th>Plan</th><th>Año 1</th><th>24 meses</th><th>Notas</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td><td>$0 de entrada, precio fijo 24 meses</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td><td>Incluye garantía de leads de 60 días</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td><td>Inglés + español</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497 + Site Care opcional $39/mes en meses 13–24 ($468) = $1,965</td><td>Dominio se factura al costo</td></tr></tbody></table><p><em>Precios sin impuestos, si aplican. Las tarifas del operador de texto y el segundo número opcional de $1/mes son aparte.</em></p>"
      },
      {
        h2: "DIY vs freelancer vs agencia vs un plan mensual: qué cambia el precio",
        html: `<p>Los constructores DIY se ven baratos hasta que sumas hosting, texto, fotos y las horas de aprender la herramienta. Los freelancers varían mucho. Las agencias suelen cotizar por proyecto. Publicamos nuestros precios de plan para que compares sin adivinar.</p>`,
      },
      {
        h2: "Costos aparte a planear",
        html: `<p>El SEO continuo va aparte. Fotos y redacción a medida se cotizan si las necesitas. El texto de llamada perdida requiere línea dedicada y aprobación del operador (normalmente 10–15 días; no garantizada). En Lead System o Plus, un segundo número es $1/mes si lo usas, más tarifas del operador.</p>`,
      },
      {
        h2: "Qué estás pagando en un sitio de pintura",
        html: `<p>Pagas por páginas armadas alrededor de interior, exterior y gabinetes — no una plantilla genérica con el nombre cambiado. Mira el <a href="/industries/painting">hub de pintura</a> y <a href="/blog/painting-website-pages">qué páginas necesita un sitio de pintura</a>.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> antes de elegir plan.</p>`,
      },
    ],
  },
  {
    slug: "painting-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de pintura",
    seoTitle: "Qué páginas necesita un sitio de pintura | Kinexis Digital",
    excerpt: "Páginas base y de servicio para un sitio de pintura, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    lead: "Un sitio de pintura necesita un inicio claro, zona honesta, nosotros, reseñas y contacto — más páginas de servicio para lo que la gente busca. Arma el sitio alrededor de interior, exterior y gabinetes.",
    sections: [
      {
        h2: "Páginas base de cualquier sitio de servicios",
        html: `<ul><li><strong>Inicio</strong> — nombra el trabajo, muestra el teléfono y deja claro el siguiente paso.</li><li><strong>Servicios</strong> — páginas separadas para los trabajos que vendes, no un cajón de sastre.</li><li><strong>Zona de servicio</strong> — ciudades y barrios que tu cuadrilla sí cubre.</li><li><strong>Nosotros</strong> — licencia, seguro y quién llega.</li><li><strong>Reseñas</strong> — prueba de trabajos reales.</li><li><strong>Contacto</strong> — formulario + llamada con un toque en cada dispositivo.</li></ul>`,
      },
      {
        h2: "Páginas de servicio de pintura",
        html: `<p>Arma el sitio alrededor de interior, exterior y gabinetes. Páginas separadas para que cada tipo de comprador tenga un siguiente paso claro.</p><p>Detalle y ejemplos en el <a href="/industries/painting">hub de pintura</a>.</p>`,
      },
      {
        h2: "Sin spam de ciudades",
        html: `<p>No publiques páginas casi iguales que solo cambian el nombre del pueblo. Eso gasta rastreo y no ayuda a quien llama. Una página clara de zona es el enfoque honesto.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> o compara planes en <a href="/pricing">/pricing</a>.</p>`,
      },
    ],
  },
  {
    slug: "remodeling-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de remodelación en 2026?",
    seoTitle: "Costo de un sitio web de remodelación | Kinexis Digital",
    excerpt: "Precios reales de Kinexis para un sitio de remodelación: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    lead: "Con Kinexis, un sitio de remodelación empieza en Website a $97/mes, Lead System a $197/mes, Plus a $297/mes u Own It por $1,497 de una vez. Todas las opciones empiezan con una vista previa gratis del inicio — sin tarjeta y sin obligación.",
    sections: [
      {
        h2: "Precios de Kinexis para sitios de negocios",
        html: `<p>Estas son las cuatro opciones en vivo:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Para qué sirve</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio profesional con hosting, SSL y hasta dos cambios chicos al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Texto opcional ($1/mes 2.º número si lo usas + operador), pedidos de reseña, seguimiento de llamadas y cambios chicos sin tope</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos tuyos desde el lanzamiento, con 12 meses de hosting y cambios chicos</td></tr></tbody></table><p>El detalle completo está en <a href="/pricing">/pricing</a>. Compara mensual vs Own It en <a href="/blog/monthly-website-vs-own-it">plan mensual u Own It</a>.</p>`,
      },
      {
        h2: "Cuánto cuesta en 24 meses",
        html: "<p>Calculado solo con los términos vigentes de Kinexis ($0 de entrada, precio fijo 24 meses en planes mensuales):</p><table><thead><tr><th>Plan</th><th>Año 1</th><th>24 meses</th><th>Notas</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td><td>$0 de entrada, precio fijo 24 meses</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td><td>Incluye garantía de leads de 60 días</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td><td>Inglés + español</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497 + Site Care opcional $39/mes en meses 13–24 ($468) = $1,965</td><td>Dominio se factura al costo</td></tr></tbody></table><p><em>Precios sin impuestos, si aplican. Las tarifas del operador de texto y el segundo número opcional de $1/mes son aparte.</em></p>"
      },
      {
        h2: "DIY vs freelancer vs agencia vs un plan mensual: qué cambia el precio",
        html: `<p>Los constructores DIY se ven baratos hasta que sumas hosting, texto, fotos y las horas de aprender la herramienta. Los freelancers varían mucho. Las agencias suelen cotizar por proyecto. Publicamos nuestros precios de plan para que compares sin adivinar.</p>`,
      },
      {
        h2: "Costos aparte a planear",
        html: `<p>El SEO continuo va aparte. Fotos y redacción a medida se cotizan si las necesitas. El texto de llamada perdida requiere línea dedicada y aprobación del operador (normalmente 10–15 días; no garantizada). En Lead System o Plus, un segundo número es $1/mes si lo usas, más tarifas del operador.</p>`,
      },
      {
        h2: "Qué estás pagando en un sitio de remodelación",
        html: `<p>Pagas por páginas armadas alrededor de cocinas, baños y consultas más largas — no una plantilla genérica con el nombre cambiado. Mira el <a href="/industries/remodeling">hub de remodelación</a> y <a href="/blog/remodeling-website-pages">qué páginas necesita un sitio de remodelación</a>.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> antes de elegir plan.</p>`,
      },
    ],
  },
  {
    slug: "remodeling-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de remodelación",
    seoTitle: "Qué páginas necesita un sitio de remodelación | Kinexis Digital",
    excerpt: "Páginas base y de servicio para un sitio de remodelación, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    lead: "Un sitio de remodelación necesita un inicio claro, zona honesta, nosotros, reseñas y contacto — más páginas de servicio para lo que la gente busca. Arma el sitio alrededor de cocinas, baños y consultas más largas.",
    sections: [
      {
        h2: "Páginas base de cualquier sitio de servicios",
        html: `<ul><li><strong>Inicio</strong> — nombra el trabajo, muestra el teléfono y deja claro el siguiente paso.</li><li><strong>Servicios</strong> — páginas separadas para los trabajos que vendes, no un cajón de sastre.</li><li><strong>Zona de servicio</strong> — ciudades y barrios que tu cuadrilla sí cubre.</li><li><strong>Nosotros</strong> — licencia, seguro y quién llega.</li><li><strong>Reseñas</strong> — prueba de trabajos reales.</li><li><strong>Contacto</strong> — formulario + llamada con un toque en cada dispositivo.</li></ul>`,
      },
      {
        h2: "Páginas de servicio de remodelación",
        html: `<p>Arma el sitio alrededor de cocinas, baños y consultas más largas. Páginas separadas para que cada tipo de comprador tenga un siguiente paso claro.</p><p>Detalle y ejemplos en el <a href="/industries/remodeling">hub de remodelación</a>.</p>`,
      },
      {
        h2: "Sin spam de ciudades",
        html: `<p>No publiques páginas casi iguales que solo cambian el nombre del pueblo. Eso gasta rastreo y no ayuda a quien llama. Una página clara de zona es el enfoque honesto.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> o compara planes en <a href="/pricing">/pricing</a>.</p>`,
      },
    ],
  },
  {
    slug: "landscaping-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de paisajismo en 2026?",
    seoTitle: "Costo de un sitio web de paisajismo | Kinexis Digital",
    excerpt: "Precios reales de Kinexis para un sitio de paisajismo: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    lead: "Con Kinexis, un sitio de paisajismo empieza en Website a $97/mes, Lead System a $197/mes, Plus a $297/mes u Own It por $1,497 de una vez. Todas las opciones empiezan con una vista previa gratis del inicio — sin tarjeta y sin obligación.",
    sections: [
      {
        h2: "Precios de Kinexis para sitios de negocios",
        html: `<p>Estas son las cuatro opciones en vivo:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Para qué sirve</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio profesional con hosting, SSL y hasta dos cambios chicos al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Texto opcional ($1/mes 2.º número si lo usas + operador), pedidos de reseña, seguimiento de llamadas y cambios chicos sin tope</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos tuyos desde el lanzamiento, con 12 meses de hosting y cambios chicos</td></tr></tbody></table><p>El detalle completo está en <a href="/pricing">/pricing</a>. Compara mensual vs Own It en <a href="/blog/monthly-website-vs-own-it">plan mensual u Own It</a>.</p>`,
      },
      {
        h2: "Cuánto cuesta en 24 meses",
        html: "<p>Calculado solo con los términos vigentes de Kinexis ($0 de entrada, precio fijo 24 meses en planes mensuales):</p><table><thead><tr><th>Plan</th><th>Año 1</th><th>24 meses</th><th>Notas</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td><td>$0 de entrada, precio fijo 24 meses</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td><td>Incluye garantía de leads de 60 días</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td><td>Inglés + español</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497 + Site Care opcional $39/mes en meses 13–24 ($468) = $1,965</td><td>Dominio se factura al costo</td></tr></tbody></table><p><em>Precios sin impuestos, si aplican. Las tarifas del operador de texto y el segundo número opcional de $1/mes son aparte.</em></p>"
      },
      {
        h2: "DIY vs freelancer vs agencia vs un plan mensual: qué cambia el precio",
        html: `<p>Los constructores DIY se ven baratos hasta que sumas hosting, texto, fotos y las horas de aprender la herramienta. Los freelancers varían mucho. Las agencias suelen cotizar por proyecto. Publicamos nuestros precios de plan para que compares sin adivinar.</p>`,
      },
      {
        h2: "Costos aparte a planear",
        html: `<p>El SEO continuo va aparte. Fotos y redacción a medida se cotizan si las necesitas. El texto de llamada perdida requiere línea dedicada y aprobación del operador (normalmente 10–15 días; no garantizada). En Lead System o Plus, un segundo número es $1/mes si lo usas, más tarifas del operador.</p>`,
      },
      {
        h2: "Qué estás pagando en un sitio de paisajismo",
        html: `<p>Pagas por páginas armadas alrededor de rutas de mantenimiento y diseño-obra — no una plantilla genérica con el nombre cambiado. Mira el <a href="/industries/landscaping">hub de paisajismo</a> y <a href="/blog/landscaping-website-pages">qué páginas necesita un sitio de paisajismo</a>.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> antes de elegir plan.</p>`,
      },
    ],
  },
  {
    slug: "landscaping-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de paisajismo",
    seoTitle: "Qué páginas necesita un sitio de paisajismo | Kinexis Digital",
    excerpt: "Páginas base y de servicio para un sitio de paisajismo, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    lead: "Un sitio de paisajismo necesita un inicio claro, zona honesta, nosotros, reseñas y contacto — más páginas de servicio para lo que la gente busca. Arma el sitio alrededor de rutas de mantenimiento y diseño-obra.",
    sections: [
      {
        h2: "Páginas base de cualquier sitio de servicios",
        html: `<ul><li><strong>Inicio</strong> — nombra el trabajo, muestra el teléfono y deja claro el siguiente paso.</li><li><strong>Servicios</strong> — páginas separadas para los trabajos que vendes, no un cajón de sastre.</li><li><strong>Zona de servicio</strong> — ciudades y barrios que tu cuadrilla sí cubre.</li><li><strong>Nosotros</strong> — licencia, seguro y quién llega.</li><li><strong>Reseñas</strong> — prueba de trabajos reales.</li><li><strong>Contacto</strong> — formulario + llamada con un toque en cada dispositivo.</li></ul>`,
      },
      {
        h2: "Páginas de servicio de paisajismo",
        html: `<p>Arma el sitio alrededor de rutas de mantenimiento y diseño-obra. Páginas separadas para que cada tipo de comprador tenga un siguiente paso claro.</p><p>Detalle y ejemplos en el <a href="/industries/landscaping">hub de paisajismo</a>.</p>`,
      },
      {
        h2: "Sin spam de ciudades",
        html: `<p>No publiques páginas casi iguales que solo cambian el nombre del pueblo. Eso gasta rastreo y no ayuda a quien llama. Una página clara de zona es el enfoque honesto.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> o compara planes en <a href="/pricing">/pricing</a>.</p>`,
      },
    ],
  },
  {
    slug: "pool-service-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de albercas en 2026?",
    seoTitle: "Costo de un sitio web de albercas | Kinexis Digital",
    excerpt: "Precios reales de Kinexis para un sitio de albercas: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    lead: "Con Kinexis, un sitio de servicio de albercas empieza en Website a $97/mes, Lead System a $197/mes, Plus a $297/mes u Own It por $1,497 de una vez. Todas las opciones empiezan con una vista previa gratis del inicio — sin tarjeta y sin obligación.",
    sections: [
      {
        h2: "Precios de Kinexis para sitios de negocios",
        html: `<p>Estas son las cuatro opciones en vivo:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Para qué sirve</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio profesional con hosting, SSL y hasta dos cambios chicos al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Texto opcional ($1/mes 2.º número si lo usas + operador), pedidos de reseña, seguimiento de llamadas y cambios chicos sin tope</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos tuyos desde el lanzamiento, con 12 meses de hosting y cambios chicos</td></tr></tbody></table><p>El detalle completo está en <a href="/pricing">/pricing</a>. Compara mensual vs Own It en <a href="/blog/monthly-website-vs-own-it">plan mensual u Own It</a>.</p>`,
      },
      {
        h2: "Cuánto cuesta en 24 meses",
        html: "<p>Calculado solo con los términos vigentes de Kinexis ($0 de entrada, precio fijo 24 meses en planes mensuales):</p><table><thead><tr><th>Plan</th><th>Año 1</th><th>24 meses</th><th>Notas</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td><td>$0 de entrada, precio fijo 24 meses</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td><td>Incluye garantía de leads de 60 días</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td><td>Inglés + español</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497 + Site Care opcional $39/mes en meses 13–24 ($468) = $1,965</td><td>Dominio se factura al costo</td></tr></tbody></table><p><em>Precios sin impuestos, si aplican. Las tarifas del operador de texto y el segundo número opcional de $1/mes son aparte.</em></p>"
      },
      {
        h2: "DIY vs freelancer vs agencia vs un plan mensual: qué cambia el precio",
        html: `<p>Los constructores DIY se ven baratos hasta que sumas hosting, texto, fotos y las horas de aprender la herramienta. Los freelancers varían mucho. Las agencias suelen cotizar por proyecto. Publicamos nuestros precios de plan para que compares sin adivinar.</p>`,
      },
      {
        h2: "Costos aparte a planear",
        html: `<p>El SEO continuo va aparte. Fotos y redacción a medida se cotizan si las necesitas. El texto de llamada perdida requiere línea dedicada y aprobación del operador (normalmente 10–15 días; no garantizada). En Lead System o Plus, un segundo número es $1/mes si lo usas, más tarifas del operador.</p>`,
      },
      {
        h2: "Qué estás pagando en un sitio de albercas",
        html: `<p>Pagas por páginas armadas alrededor de rutas semanales, reparaciones y equipo — no una plantilla genérica con el nombre cambiado. Mira el <a href="/industries/pool-care">hub de albercas</a> y <a href="/blog/pool-service-website-pages">qué páginas necesita un sitio de albercas</a>.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> antes de elegir plan.</p>`,
      },
    ],
  },
  {
    slug: "pool-service-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de albercas",
    seoTitle: "Qué páginas necesita un sitio de albercas | Kinexis Digital",
    excerpt: "Páginas base y de servicio para un sitio de albercas, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    lead: "Un sitio de servicio de albercas necesita un inicio claro, zona honesta, nosotros, reseñas y contacto — más páginas de servicio para lo que la gente busca. Arma el sitio alrededor de rutas semanales, reparaciones y equipo.",
    sections: [
      {
        h2: "Páginas base de cualquier sitio de servicios",
        html: `<ul><li><strong>Inicio</strong> — nombra el trabajo, muestra el teléfono y deja claro el siguiente paso.</li><li><strong>Servicios</strong> — páginas separadas para los trabajos que vendes, no un cajón de sastre.</li><li><strong>Zona de servicio</strong> — ciudades y barrios que tu cuadrilla sí cubre.</li><li><strong>Nosotros</strong> — licencia, seguro y quién llega.</li><li><strong>Reseñas</strong> — prueba de trabajos reales.</li><li><strong>Contacto</strong> — formulario + llamada con un toque en cada dispositivo.</li></ul>`,
      },
      {
        h2: "Páginas de servicio de albercas",
        html: `<p>Arma el sitio alrededor de rutas semanales, reparaciones y equipo. Páginas separadas para que cada tipo de comprador tenga un siguiente paso claro.</p><p>Detalle y ejemplos en el <a href="/industries/pool-care">hub de albercas</a>.</p>`,
      },
      {
        h2: "Sin spam de ciudades",
        html: `<p>No publiques páginas casi iguales que solo cambian el nombre del pueblo. Eso gasta rastreo y no ayuda a quien llama. Una página clara de zona es el enfoque honesto.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> o compara planes en <a href="/pricing">/pricing</a>.</p>`,
      },
    ],
  },
  {
    slug: "pressure-washing-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de lavado a presión en 2026?",
    seoTitle: "Costo de un sitio web de lavado a presión | Kinexis Digital",
    excerpt: "Precios reales de Kinexis para un sitio de lavado a presión: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    lead: "Con Kinexis, un sitio de lavado a presión empieza en Website a $97/mes, Lead System a $197/mes, Plus a $297/mes u Own It por $1,497 de una vez. Todas las opciones empiezan con una vista previa gratis del inicio — sin tarjeta y sin obligación.",
    sections: [
      {
        h2: "Precios de Kinexis para sitios de negocios",
        html: `<p>Estas son las cuatro opciones en vivo:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Para qué sirve</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio profesional con hosting, SSL y hasta dos cambios chicos al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Texto opcional ($1/mes 2.º número si lo usas + operador), pedidos de reseña, seguimiento de llamadas y cambios chicos sin tope</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos tuyos desde el lanzamiento, con 12 meses de hosting y cambios chicos</td></tr></tbody></table><p>El detalle completo está en <a href="/pricing">/pricing</a>. Compara mensual vs Own It en <a href="/blog/monthly-website-vs-own-it">plan mensual u Own It</a>.</p>`,
      },
      {
        h2: "Cuánto cuesta en 24 meses",
        html: "<p>Calculado solo con los términos vigentes de Kinexis ($0 de entrada, precio fijo 24 meses en planes mensuales):</p><table><thead><tr><th>Plan</th><th>Año 1</th><th>24 meses</th><th>Notas</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td><td>$0 de entrada, precio fijo 24 meses</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td><td>Incluye garantía de leads de 60 días</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td><td>Inglés + español</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497 + Site Care opcional $39/mes en meses 13–24 ($468) = $1,965</td><td>Dominio se factura al costo</td></tr></tbody></table><p><em>Precios sin impuestos, si aplican. Las tarifas del operador de texto y el segundo número opcional de $1/mes son aparte.</em></p>"
      },
      {
        h2: "DIY vs freelancer vs agencia vs un plan mensual: qué cambia el precio",
        html: `<p>Los constructores DIY se ven baratos hasta que sumas hosting, texto, fotos y las horas de aprender la herramienta. Los freelancers varían mucho. Las agencias suelen cotizar por proyecto. Publicamos nuestros precios de plan para que compares sin adivinar.</p>`,
      },
      {
        h2: "Costos aparte a planear",
        html: `<p>El SEO continuo va aparte. Fotos y redacción a medida se cotizan si las necesitas. El texto de llamada perdida requiere línea dedicada y aprobación del operador (normalmente 10–15 días; no garantizada). En Lead System o Plus, un segundo número es $1/mes si lo usas, más tarifas del operador.</p>`,
      },
      {
        h2: "Qué estás pagando en un sitio de lavado a presión",
        html: `<p>Pagas por páginas armadas alrededor de casas, concreto y lavado suave de techos — no una plantilla genérica con el nombre cambiado. Mira el <a href="/industries/pressure-washing">hub de lavado a presión</a> y <a href="/blog/pressure-washing-website-pages">qué páginas necesita un sitio de lavado a presión</a>.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> antes de elegir plan.</p>`,
      },
    ],
  },
  {
    slug: "pressure-washing-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de lavado a presión",
    seoTitle: "Qué páginas necesita un sitio de lavado a presión | Kinexis Digital",
    excerpt: "Páginas base y de servicio para un sitio de lavado a presión, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    lead: "Un sitio de lavado a presión necesita un inicio claro, zona honesta, nosotros, reseñas y contacto — más páginas de servicio para lo que la gente busca. Arma el sitio alrededor de casas, concreto y lavado suave de techos.",
    sections: [
      {
        h2: "Páginas base de cualquier sitio de servicios",
        html: `<ul><li><strong>Inicio</strong> — nombra el trabajo, muestra el teléfono y deja claro el siguiente paso.</li><li><strong>Servicios</strong> — páginas separadas para los trabajos que vendes, no un cajón de sastre.</li><li><strong>Zona de servicio</strong> — ciudades y barrios que tu cuadrilla sí cubre.</li><li><strong>Nosotros</strong> — licencia, seguro y quién llega.</li><li><strong>Reseñas</strong> — prueba de trabajos reales.</li><li><strong>Contacto</strong> — formulario + llamada con un toque en cada dispositivo.</li></ul>`,
      },
      {
        h2: "Páginas de servicio de lavado a presión",
        html: `<p>Arma el sitio alrededor de casas, concreto y lavado suave de techos. Páginas separadas para que cada tipo de comprador tenga un siguiente paso claro.</p><p>Detalle y ejemplos en el <a href="/industries/pressure-washing">hub de lavado a presión</a>.</p>`,
      },
      {
        h2: "Sin spam de ciudades",
        html: `<p>No publiques páginas casi iguales que solo cambian el nombre del pueblo. Eso gasta rastreo y no ayuda a quien llama. Una página clara de zona es el enfoque honesto.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> o compara planes en <a href="/pricing">/pricing</a>.</p>`,
      },
    ],
  },
  {
    slug: "window-cleaning-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de limpieza de vidrios en 2026?",
    seoTitle: "Costo de un sitio web de limpieza de vidrios | Kinexis Digital",
    excerpt: "Precios reales de Kinexis para un sitio de limpieza de vidrios: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    lead: "Con Kinexis, un sitio de limpieza de vidrios empieza en Website a $97/mes, Lead System a $197/mes, Plus a $297/mes u Own It por $1,497 de una vez. Todas las opciones empiezan con una vista previa gratis del inicio — sin tarjeta y sin obligación.",
    sections: [
      {
        h2: "Precios de Kinexis para sitios de negocios",
        html: `<p>Estas son las cuatro opciones en vivo:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Para qué sirve</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio profesional con hosting, SSL y hasta dos cambios chicos al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Texto opcional ($1/mes 2.º número si lo usas + operador), pedidos de reseña, seguimiento de llamadas y cambios chicos sin tope</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos tuyos desde el lanzamiento, con 12 meses de hosting y cambios chicos</td></tr></tbody></table><p>El detalle completo está en <a href="/pricing">/pricing</a>. Compara mensual vs Own It en <a href="/blog/monthly-website-vs-own-it">plan mensual u Own It</a>.</p>`,
      },
      {
        h2: "Cuánto cuesta en 24 meses",
        html: "<p>Calculado solo con los términos vigentes de Kinexis ($0 de entrada, precio fijo 24 meses en planes mensuales):</p><table><thead><tr><th>Plan</th><th>Año 1</th><th>24 meses</th><th>Notas</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td><td>$0 de entrada, precio fijo 24 meses</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td><td>Incluye garantía de leads de 60 días</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td><td>Inglés + español</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497 + Site Care opcional $39/mes en meses 13–24 ($468) = $1,965</td><td>Dominio se factura al costo</td></tr></tbody></table><p><em>Precios sin impuestos, si aplican. Las tarifas del operador de texto y el segundo número opcional de $1/mes son aparte.</em></p>"
      },
      {
        h2: "DIY vs freelancer vs agencia vs un plan mensual: qué cambia el precio",
        html: `<p>Los constructores DIY se ven baratos hasta que sumas hosting, texto, fotos y las horas de aprender la herramienta. Los freelancers varían mucho. Las agencias suelen cotizar por proyecto. Publicamos nuestros precios de plan para que compares sin adivinar.</p>`,
      },
      {
        h2: "Costos aparte a planear",
        html: `<p>El SEO continuo va aparte. Fotos y redacción a medida se cotizan si las necesitas. El texto de llamada perdida requiere línea dedicada y aprobación del operador (normalmente 10–15 días; no garantizada). En Lead System o Plus, un segundo número es $1/mes si lo usas, más tarifas del operador.</p>`,
      },
      {
        h2: "Qué estás pagando en un sitio de limpieza de vidrios",
        html: `<p>Pagas por páginas armadas alrededor de rutas de casa y aparadores — no una plantilla genérica con el nombre cambiado. Mira el <a href="/industries/window-cleaning">hub de limpieza de vidrios</a> y <a href="/blog/window-cleaning-website-pages">qué páginas necesita un sitio de limpieza de vidrios</a>.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> antes de elegir plan.</p>`,
      },
    ],
  },
  {
    slug: "window-cleaning-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de limpieza de vidrios",
    seoTitle: "Qué páginas necesita un sitio de limpieza de vidrios | Kinexis Digital",
    excerpt: "Páginas base y de servicio para un sitio de limpieza de vidrios, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    lead: "Un sitio de limpieza de vidrios necesita un inicio claro, zona honesta, nosotros, reseñas y contacto — más páginas de servicio para lo que la gente busca. Arma el sitio alrededor de rutas de casa y aparadores.",
    sections: [
      {
        h2: "Páginas base de cualquier sitio de servicios",
        html: `<ul><li><strong>Inicio</strong> — nombra el trabajo, muestra el teléfono y deja claro el siguiente paso.</li><li><strong>Servicios</strong> — páginas separadas para los trabajos que vendes, no un cajón de sastre.</li><li><strong>Zona de servicio</strong> — ciudades y barrios que tu cuadrilla sí cubre.</li><li><strong>Nosotros</strong> — licencia, seguro y quién llega.</li><li><strong>Reseñas</strong> — prueba de trabajos reales.</li><li><strong>Contacto</strong> — formulario + llamada con un toque en cada dispositivo.</li></ul>`,
      },
      {
        h2: "Páginas de servicio de limpieza de vidrios",
        html: `<p>Arma el sitio alrededor de rutas de casa y aparadores. Páginas separadas para que cada tipo de comprador tenga un siguiente paso claro.</p><p>Detalle y ejemplos en el <a href="/industries/window-cleaning">hub de limpieza de vidrios</a>.</p>`,
      },
      {
        h2: "Sin spam de ciudades",
        html: `<p>No publiques páginas casi iguales que solo cambian el nombre del pueblo. Eso gasta rastreo y no ayuda a quien llama. Una página clara de zona es el enfoque honesto.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> o compara planes en <a href="/pricing">/pricing</a>.</p>`,
      },
    ],
  },
  {
    slug: "lawn-care-website-cost",
    category: "Consejos",
    title: "¿Cuánto cuesta un sitio web de césped en 2026?",
    seoTitle: "Costo de un sitio web de césped | Kinexis Digital",
    excerpt: "Precios reales de Kinexis para un sitio de césped: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    lead: "Con Kinexis, un sitio de cuidado de césped empieza en Website a $97/mes, Lead System a $197/mes, Plus a $297/mes u Own It por $1,497 de una vez. Todas las opciones empiezan con una vista previa gratis del inicio — sin tarjeta y sin obligación.",
    sections: [
      {
        h2: "Precios de Kinexis para sitios de negocios",
        html: `<p>Estas son las cuatro opciones en vivo:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Para qué sirve</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio profesional con hosting, SSL y hasta dos cambios chicos al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Texto opcional ($1/mes 2.º número si lo usas + operador), pedidos de reseña, seguimiento de llamadas y cambios chicos sin tope</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos tuyos desde el lanzamiento, con 12 meses de hosting y cambios chicos</td></tr></tbody></table><p>El detalle completo está en <a href="/pricing">/pricing</a>. Compara mensual vs Own It en <a href="/blog/monthly-website-vs-own-it">plan mensual u Own It</a>.</p>`,
      },
      {
        h2: "Cuánto cuesta en 24 meses",
        html: "<p>Calculado solo con los términos vigentes de Kinexis ($0 de entrada, precio fijo 24 meses en planes mensuales):</p><table><thead><tr><th>Plan</th><th>Año 1</th><th>24 meses</th><th>Notas</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td><td>$0 de entrada, precio fijo 24 meses</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td><td>Incluye garantía de leads de 60 días</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td><td>Inglés + español</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497 + Site Care opcional $39/mes en meses 13–24 ($468) = $1,965</td><td>Dominio se factura al costo</td></tr></tbody></table><p><em>Precios sin impuestos, si aplican. Las tarifas del operador de texto y el segundo número opcional de $1/mes son aparte.</em></p>"
      },
      {
        h2: "DIY vs freelancer vs agencia vs un plan mensual: qué cambia el precio",
        html: `<p>Los constructores DIY se ven baratos hasta que sumas hosting, texto, fotos y las horas de aprender la herramienta. Los freelancers varían mucho. Las agencias suelen cotizar por proyecto. Publicamos nuestros precios de plan para que compares sin adivinar.</p>`,
      },
      {
        h2: "Costos aparte a planear",
        html: `<p>El SEO continuo va aparte. Fotos y redacción a medida se cotizan si las necesitas. El texto de llamada perdida requiere línea dedicada y aprobación del operador (normalmente 10–15 días; no garantizada). En Lead System o Plus, un segundo número es $1/mes si lo usas, más tarifas del operador.</p>`,
      },
      {
        h2: "Qué estás pagando en un sitio de césped",
        html: `<p>Pagas por páginas armadas alrededor de rutas semanales de césped y desechos de mascotas — no una plantilla genérica con el nombre cambiado. Mira el <a href="/industries/yard-care">hub de césped</a> y <a href="/blog/lawn-care-website-pages">qué páginas necesita un sitio de césped</a>.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> antes de elegir plan.</p>`,
      },
    ],
  },
  {
    slug: "lawn-care-website-pages",
    category: "Consejos",
    title: "Qué páginas necesita un sitio de césped",
    seoTitle: "Qué páginas necesita un sitio de césped | Kinexis Digital",
    excerpt: "Páginas base y de servicio para un sitio de césped, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    lead: "Un sitio de cuidado de césped necesita un inicio claro, zona honesta, nosotros, reseñas y contacto — más páginas de servicio para lo que la gente busca. Arma el sitio alrededor de rutas semanales de césped y desechos de mascotas.",
    sections: [
      {
        h2: "Páginas base de cualquier sitio de servicios",
        html: `<ul><li><strong>Inicio</strong> — nombra el trabajo, muestra el teléfono y deja claro el siguiente paso.</li><li><strong>Servicios</strong> — páginas separadas para los trabajos que vendes, no un cajón de sastre.</li><li><strong>Zona de servicio</strong> — ciudades y barrios que tu cuadrilla sí cubre.</li><li><strong>Nosotros</strong> — licencia, seguro y quién llega.</li><li><strong>Reseñas</strong> — prueba de trabajos reales.</li><li><strong>Contacto</strong> — formulario + llamada con un toque en cada dispositivo.</li></ul>`,
      },
      {
        h2: "Páginas de servicio de césped",
        html: `<p>Arma el sitio alrededor de rutas semanales de césped y desechos de mascotas. Páginas separadas para que cada tipo de comprador tenga un siguiente paso claro.</p><p>Detalle y ejemplos en el <a href="/industries/yard-care">hub de césped</a>.</p>`,
      },
      {
        h2: "Sin spam de ciudades",
        html: `<p>No publiques páginas casi iguales que solo cambian el nombre del pueblo. Eso gasta rastreo y no ayuda a quien llama. Una página clara de zona es el enfoque honesto.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> o compara planes en <a href="/pricing">/pricing</a>.</p>`,
      },
    ],
  },
  ...ES_CLUSTER_POSTS,
];

/**
 * Spain copy omits USD figures. `/es` keeps the same US prices as the English
 * site and stays indexable. `/es-es` is noindex; this override is for visitors.
 */
const ES_ES_POST_OVERRIDES: Partial<Record<string, Partial<EsPost>>> = {
  "monthly-website-vs-own-it": {
    excerpt: "Compara Website, Lead System y Plus con Own It: cancelación, archivos del sitio y qué incluye cada plan.",
    lead: "Los planes mensuales y Own It son opciones válidas. Depende del flujo de caja y de si quieres herramientas de llamada perdida.",
    sections: [
      {
        h2: "Las dos opciones son válidas",
        html: "<p>Algunos prefieren empezar sin entrada y pagar mes a mes. Otros un solo pago y los archivos desde el día uno.</p>",
      },
      {
        h2: "Comparación",
        html: "<p>Website, Lead System y Plus son planes mensuales. Own It es un pago único con los archivos tuyos desde el lanzamiento. El detalle de cada plan está en <a href=\"/pricing\">/pricing</a>.</p>",
      },
      {
        h2: "Quién se queda con el sitio si cancelas",
        html: "<p>Cancelas cuando quieras. El sitio sigue en línea en el período ya pagado. Después, el hosting termina salvo una compra por escrito de los archivos o pasar a Own It. En Own It, los archivos son tuyos desde el lanzamiento.</p>",
      },
      {
        h2: "Own It desde el día uno",
        html: "<p>Un pago, archivos tuyos, 12 meses de hosting y cambios chicos. Luego puedes añadir el cuidado opcional del sitio si quieres seguir con hosting y ediciones.</p>",
      },
    ],
  },
  "plumber-website-cost": {
    seoTitle: "Costo de un sitio web de plomería | Kinexis Digital",
    excerpt: "Planes de Kinexis para un sitio de plomería: Website, Lead System, Plus u Own It. Vista previa gratis del inicio, sin tarjeta ni obligación.",
    lead: "Con Kinexis, un sitio de plomería empieza con Website, Lead System, Plus u Own It. Todas las opciones empiezan con una vista previa gratis del inicio — sin tarjeta y sin obligación.",
    sections: [
      {
        h2: "Planes de Kinexis para sitios de negocios",
        html: `<p>Cuatro opciones en vivo: Website, Lead System (texto opcional, reseñas, seguimiento de llamadas), Plus (inglés y español) y Own It (un pago, archivos tuyos desde el lanzamiento). El detalle está en <a href="/pricing">/pricing</a>. Compara en <a href="/blog/monthly-website-vs-own-it">plan mensual u Own It</a>.</p>`,
      },
      {
        h2: "DIY vs freelancer vs agencia vs un plan mensual: qué cambia el precio",
        html: `<p>Los constructores DIY se ven baratos hasta que sumas hosting, texto, fotos y las horas de aprender la herramienta. Los freelancers varían mucho. Las agencias suelen cotizar por proyecto. Publicamos nuestros planes para que compares sin adivinar.</p>`,
      },
      {
        h2: "Costos aparte a planear",
        html: `<p>El SEO continuo va aparte. Fotos y redacción a medida se cotizan si las necesitas. El texto de llamada perdida requiere línea dedicada y aprobación del operador (normalmente 10–15 días; no garantizada).</p>`,
      },
      {
        h2: "Qué estás pagando en un sitio de plomería",
        html: `<p>Pagas por páginas armadas alrededor de fugas, drenajes y calentadores. Mira el <a href="/industries/plumbing">hub de plomería</a> y <a href="/blog/plumbing-website-pages">qué páginas necesita un sitio de plomería</a>.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> antes de elegir plan.</p>`,
      },
    ],
  },
  "missed-call-text-back-templates": {
    excerpt: "Borradores de SMS por oficio para la llamada perdida, con tiempos honestos de aprobación del operador antes de enviarlos.",
    lead: "El texto de llamada perdida es opcional y requiere una línea dedicada de la empresa. En Lead System o Plus puede haber un segundo número de seguimiento y tarifas del operador. La aprobación del operador suele tardar 10–15 días y no está garantizada.",
    sections: [
      {
        h2: "Cómo funciona aquí",
        html: `<p>Lead System y Plus pueden enviar un SMS a quien llamó a tu número de seguimiento, después de la aprobación del operador. Se necesita una línea dedicada. Esta página son plantillas — no una comparación de software.</p><p>Estima ingresos en riesgo con la <a href="/tools/missed-call-calculator">calculadora de llamada perdida</a>.</p>`,
      },
      {
        h2: "Plantillas de plomería",
        html: `<p id="plumbing">Úsalas como borrador. Pide una revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola, habla {Business}. Acabamos de perder tu llamada de plomería. Responde FUGA, DRENAJE o CALENTADOR y el mejor número/hora para localizarte.</code></li><li><code>Gracias por llamar a {Business}. Estamos en un trabajo y te devolvemos la llamada pronto. Si no hay agua o hay una rotura, responde URGENTE.</code></li><li><code>Vimos tu llamada perdida. Para cotizar un calentador, responde con marca/edad si la sabes.</code></li><li><code>Nota fuera de horario de {Business}: deja el problema en un texto y confirmamos a primera hora.</code></li><li><code>Si llamaste por un tapón, responde DRENAJE y tu ciudad.</code></li></ul>`,
      },
      {
        h2: "Plantillas de HVAC",
        html: `<p id="hvac">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business} — perdimos tu llamada. Responde SIN AIRE, SIN CALOR o COTIZACIÓN y tu código postal.</code></li><li><code>Estamos en un servicio. Responde URGENTE si no hay aire/calor.</code></li><li><code>Para cotizar un cambio de equipo, responde con tamaño/edad de la casa si lo tienes.</code></li><li><code>Fuera de horario: escribe el síntoma y confirmamos la primera ventana.</code></li><li><code>Temporada de mantenimiento: responde TUNEUP.</code></li></ul>`,
      },
      {
        h2: "Plantillas de electricidad",
        html: `<p id="electrical">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola, {Business} perdió tu llamada. Responde TABLERO, EV o TOMA y tu ciudad.</code></li><li><code>Si huele a quemado o los breakers no reinician, responde URGENTE.</code></li><li><code>Cargadores EV: responde con los amperios del tablero si los sabes.</code></li><li><code>Fuera de horario: escribe el problema; confirmamos en horario de atención.</code></li><li><code>Solo trabajo eléctrico con licencia — responde con el tipo de trabajo.</code></li></ul>`,
      },
      {
        h2: "Plantillas de techos",
        html: `<p id="roofing">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business}. Perdimos tu llamada — responde FUGA, CAMBIO o TORMENTA.</code></li><li><code>¿Fuga activa? Responde URGENTE y tu zona.</code></li><li><code>Cotizaciones de cambio: responde con edad/material del techo si lo sabes.</code></li><li><code>Seguimiento de tormenta: documentamos el techo; no prometemos resultados de seguro.</code></li><li><code>Fuera de horario: manda fotos del daño si es seguro.</code></li></ul>`,
      },
      {
        h2: "Plantillas de puertas de garaje",
        html: `<p id="garage-doors">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business}. Perdimos tu llamada — responde RESORTE, MOTOR o PUERTA NUEVA y tu ciudad.</code></li><li><code>Estamos en un servicio. Responde URGENTE si la puerta no abre o no cierra.</code></li><li><code>Resorte o cable roto: responde RESORTE y si quedó abierta o cerrada.</code></li><li><code>Puerta nueva: responde sencilla/doble y el material si lo sabes.</code></li><li><code>Fuera de horario: escribe el problema; confirmamos la primera ventana.</code></li></ul>`,
      },
      {
        h2: "Plantillas de pintura",
        html: `<p id="painting">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business}. Perdimos tu llamada — responde INTERIOR, EXTERIOR o GABINETES y el mejor número/hora.</code></li><li><code>Gracias por llamar a {Business}. Estamos en un trabajo. Responde COTIZACIÓN si quieres una ventana de estimado.</code></li><li><code>Para un estimado de exterior, responde con pisos/tipo de revestimiento si lo sabes.</code></li><li><code>Fuera de horario: manda los cuartos o fotos y confirmamos una visita.</code></li><li><code>Gabinetes: responde GABINETES.</code></li></ul>`,
      },
      {
        h2: "Plantillas de remodelación",
        html: `<p id="remodeling">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business}. Perdimos tu llamada — responde COCINA, BAÑO u OTRO.</code></li><li><code>Estamos en una obra. Responde CONSULTA si quieres agendar una visita.</code></li><li><code>Baños: responde con la edad aproximada si la sabes.</code></li><li><code>Fuera de horario: escribe una nota corta del proyecto.</code></li><li><code>Las fotos ayudan — responde FOTO.</code></li></ul>`,
      },
      {
        h2: "Plantillas de paisajismo",
        html: `<p id="landscaping">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business}. Perdimos tu llamada — responde MANTENIMIENTO, DISEÑO o LIMPIEZA.</code></li><li><code>Estamos en cuadrilla. Responde COTIZACIÓN si quieres una ventana de estimado.</code></li><li><code>Mantenimiento semanal: responde RUTA y tu barrio.</code></li><li><code>Diseño/instalación: responde DISEÑO y una nota corta.</code></li><li><code>Fuera de horario: escribe la dirección y el tipo de trabajo.</code></li></ul>`,
      },
      {
        h2: "Plantillas de albercas",
        html: `<p id="pool-care">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business}. Perdimos tu llamada — responde RUTA, VERDE o REPARACIÓN.</code></li><li><code>Estamos en una ruta. Responde URGENTE por alberca verde o bomba muerta.</code></li><li><code>Servicio semanal: responde RUTA y tu barrio.</code></li><li><code>Equipo: responde BOMBA o CALENTADOR.</code></li><li><code>Fuera de horario: escribe el problema.</code></li></ul>`,
      },
      {
        h2: "Plantillas de lavado a presión",
        html: `<p id="pressure-washing">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business}. Perdimos tu llamada — responde CASA, CONCRETO o TECHO.</code></li><li><code>Estamos en un trabajo. Responde COTIZACIÓN y qué hay que lavar.</code></li><li><code>Entradas/aceras: responde CONCRETO.</code></li><li><code>Lavado suave / techo: responde TECHO — confirmamos el método antes.</code></li><li><code>Fuera de horario: manda fotos si tienes.</code></li></ul>`,
      },
      {
        h2: "Plantillas de vidrios",
        html: `<p id="window-cleaning">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business}. Perdimos tu llamada — responde CASA, APARADOR o RUTA.</code></li><li><code>Estamos en una ruta. Responde COTIZACIÓN para un estimado de primera limpieza.</code></li><li><code>Aparadores: responde con la dirección y el día preferido.</code></li><li><code>Limpiezas recurrentes: responde MENSUAL o TRIMESTRAL.</code></li><li><code>Fuera de horario: escribe la dirección.</code></li></ul>`,
      },
      {
        h2: "Plantillas de jardín",
        html: `<p id="yard-care">Úsalas como borrador. Pide revisión de cumplimiento antes de publicar.</p><ul><li><code>Hola de {Business}. Perdimos tu llamada — responde CORTE, LIMPIEZA o MASCOTAS.</code></li><li><code>Estamos en una ruta. Responde RUTA si quieres servicio semanal.</code></li><li><code>Mascotas: responde MASCOTAS y cada cuánto.</code></li><li><code>Limpieza de temporada: responde LIMPIEZA.</code></li><li><code>Fuera de horario: escribe la dirección y el servicio.</code></li></ul>`,
      },
      {
        h2: "Nota de cumplimiento",
        html: `<p>Las plantillas de SMS necesitan una revisión de cumplimiento calificada antes de enviarlas. Siguen aplicando consentimiento, identificación y baja.</p><p><a href="/pricing">Ver Lead System y Plus</a> o <a href="/contact">pide una vista previa gratis</a>.</p>`,
      },
    ],
  },
  ...ES_CLUSTER_ES_ES_OVERRIDES,
};

export function esPost(slug: string) {
  return ES_POSTS.find((post) => post.slug === slug);
}

/** Latam keeps priced copy; Spain merges overrides that remove USD figures. */
export function esPostForLocale(slug: string, locale: "es-419" | "es-ES") {
  const base = esPost(slug);
  if (!base) return undefined;
  if (locale !== "es-ES") return base;
  const override = ES_ES_POST_OVERRIDES[slug];
  return override ? { ...base, ...override } : base;
}

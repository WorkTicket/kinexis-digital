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
    lead: "Un sitio de un oficio tiene que contestar tres cosas en el celular: qué haces, dónde lo haces y cómo te llaman. Si eso no está en la primera pantalla, la visita se va.",
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
    lead: "Que te encuentren es la mitad. La otra mitad es que, ya en la página, sepan qué tocar. En un oficio, ese toque casi siempre es el teléfono.",
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
    excerpt: "La búsqueda de un oficio ocurre en la entrada de la casa o en la cocina. La página tiene que cargar y mostrar el siguiente paso.",
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
    lead: "Google tiene que entender qué oficio tienes y dónde trabajas. El cliente tiene que poder llamarte cuando te encuentra. Las dos cosas fallan cuando el sitio es una plantilla con el nombre del pueblo cambiado.",
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
    excerpt: "La reseña se pide cuando el trabajo salió bien, con un enlace directo. No depende de que te acuerdes en la camioneta.",
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
    "title": "Plan mensual u Own It para oficios",
    "seoTitle": "Sitio web mensual vs Own It para oficios | Kinexis Digital",
    "excerpt": "Compara Website, Lead System y Plus con Own It: cancelación, compra de archivos y qué incluye cada plan.",
    "lead": "Los planes mensuales y Own It son opciones válidas. Depende del flujo de caja y si quieres herramientas de llamada perdida.",
    "sections": [
      {
        "h2": "Las dos opciones son válidas",
        "html": "<p>Algunos prefieren $0 de enganche y mes a mes. Otros un solo pago y los archivos desde el día uno.</p>"
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
    "slug": "missed-call-text-back-templates",
    "category": "Consejos",
    "title": "Plantillas de texto por llamada perdida para 12 oficios",
    "seoTitle": "Plantillas de texto por llamada perdida | Kinexis Digital",
    "excerpt": "Borradores de SMS por oficio y tiempos honestos de aprobación del operador.",
    "lead": "El texto de llamada perdida es opcional y requiere línea dedicada. En Lead System o Plus, un segundo número cuesta $1/mes si lo usas, más tarifas del operador. La aprobación del operador suele tardar 10–15 días y no está garantizada.",
    "sections": [
      {
        "h2": "Cómo funciona",
        "html": "<p>Tras la aprobación del operador, Lead System y Plus pueden responder por SMS a quien llamó a tu número de seguimiento. Calculadora: <a href=\"/tools/missed-call-calculator\">/tools/missed-call-calculator</a>.</p>"
      },
      {
        "h2": "Plomería",
        "html": "<p id=\"plumbing\">Plantillas en la versión en inglés de esta guía; adapta el tono a tu negocio y pide revisión de cumplimiento antes de publicar.</p>"
      },
      {
        "h2": "Nota de cumplimiento",
        "html": "<p>Revisa consentimiento, identificación y baja antes de enviar. Ver <a href=\"/pricing\">planes</a>.</p>"
      }
    ]
  },
  {
    "slug": "plumber-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de plumbing en 2026?",
    "seoTitle": "Costo de sitio web de plumbing | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis: $97, $197, $297 al mes u Own It $1,497.",
    "lead": "Con Kinexis, un sitio de plumber empieza en Website $97/mes, Lead System $197/mes, Plus $297/mes u Own It $1,497. Vista previa gratis, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis",
        "html": "<p>Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497. Ver <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "DIY, freelancer o agencia",
        "html": "<p>Comparación cualitativa. No inventamos rangos de mercado.</p>"
      },
      {
        "h2": "Costos aparte",
        "html": "<p>SEO continuo aparte. Texto de llamada perdida opcional (10–15 días; no garantizado). El extra cuesta $97 al mes.</p>"
      },
      {
        "h2": "Qué pagas en Plumbing",
        "html": "<p>Páginas para leaks, drains, and water heaters. Hub: <a href=\"/industries/plumbing\">/industries/plumbing</a>.</p>"
      }
    ]
  },
  {
    "slug": "plumbing-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de plumbing",
    "seoTitle": "Páginas para sitio de plumbing | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para plumbing, sin spam de ciudades.",
    "lead": "Inicio, zona, nosotros, reseñas, contacto y servicios claros para leaks, drains, and water heaters.",
    "sections": [
      {
        "h2": "Páginas base",
        "html": "<p>Inicio, servicios, zona, nosotros, reseñas y contacto.</p>"
      },
      {
        "h2": "Servicios de Plumbing",
        "html": "<p>leaks, drains, and water heaters.</p>"
      },
      {
        "h2": "Sin spam de ciudades",
        "html": "<p>Una página honesta de zona supera decenas de páginas casi iguales.</p>"
      }
    ]
  },
  {
    "slug": "hvac-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de hvac en 2026?",
    "seoTitle": "Costo de sitio web de hvac | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis: $97, $197, $297 al mes u Own It $1,497.",
    "lead": "Con Kinexis, un sitio de HVAC empieza en Website $97/mes, Lead System $197/mes, Plus $297/mes u Own It $1,497. Vista previa gratis, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis",
        "html": "<p>Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497. Ver <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "DIY, freelancer o agencia",
        "html": "<p>Comparación cualitativa. No inventamos rangos de mercado.</p>"
      },
      {
        "h2": "Costos aparte",
        "html": "<p>SEO continuo aparte. Texto de llamada perdida opcional (10–15 días; no garantizado). El extra cuesta $97 al mes.</p>"
      },
      {
        "h2": "Qué pagas en HVAC",
        "html": "<p>Páginas para no-cool repair, replacement, and maintenance. Hub: <a href=\"/industries/hvac\">/industries/hvac</a>.</p>"
      }
    ]
  },
  {
    "slug": "hvac-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de hvac",
    "seoTitle": "Páginas para sitio de hvac | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para hvac, sin spam de ciudades.",
    "lead": "Inicio, zona, nosotros, reseñas, contacto y servicios claros para no-cool repair, replacement, and maintenance.",
    "sections": [
      {
        "h2": "Páginas base",
        "html": "<p>Inicio, servicios, zona, nosotros, reseñas y contacto.</p>"
      },
      {
        "h2": "Servicios de HVAC",
        "html": "<p>no-cool repair, replacement, and maintenance.</p>"
      },
      {
        "h2": "Sin spam de ciudades",
        "html": "<p>Una página honesta de zona supera decenas de páginas casi iguales.</p>"
      }
    ]
  },
  {
    "slug": "electrician-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de electrical en 2026?",
    "seoTitle": "Costo de sitio web de electrical | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis: $97, $197, $297 al mes u Own It $1,497.",
    "lead": "Con Kinexis, un sitio de electrician empieza en Website $97/mes, Lead System $197/mes, Plus $297/mes u Own It $1,497. Vista previa gratis, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis",
        "html": "<p>Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497. Ver <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "DIY, freelancer o agencia",
        "html": "<p>Comparación cualitativa. No inventamos rangos de mercado.</p>"
      },
      {
        "h2": "Costos aparte",
        "html": "<p>SEO continuo aparte. Texto de llamada perdida opcional (10–15 días; no garantizado). El extra cuesta $97 al mes.</p>"
      },
      {
        "h2": "Qué pagas en Electrical",
        "html": "<p>Páginas para panels, EV chargers, and troubleshooting. Hub: <a href=\"/industries/electrical\">/industries/electrical</a>.</p>"
      }
    ]
  },
  {
    "slug": "electrician-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de electrical",
    "seoTitle": "Páginas para sitio de electrical | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para electrical, sin spam de ciudades.",
    "lead": "Inicio, zona, nosotros, reseñas, contacto y servicios claros para panels, EV chargers, and troubleshooting.",
    "sections": [
      {
        "h2": "Páginas base",
        "html": "<p>Inicio, servicios, zona, nosotros, reseñas y contacto.</p>"
      },
      {
        "h2": "Servicios de Electrical",
        "html": "<p>panels, EV chargers, and troubleshooting.</p>"
      },
      {
        "h2": "Sin spam de ciudades",
        "html": "<p>Una página honesta de zona supera decenas de páginas casi iguales.</p>"
      }
    ]
  },
  {
    "slug": "roofing-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de roofing en 2026?",
    "seoTitle": "Costo de sitio web de roofing | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis: $97, $197, $297 al mes u Own It $1,497.",
    "lead": "Con Kinexis, un sitio de roofing empieza en Website $97/mes, Lead System $197/mes, Plus $297/mes u Own It $1,497. Vista previa gratis, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis",
        "html": "<p>Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497. Ver <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "DIY, freelancer o agencia",
        "html": "<p>Comparación cualitativa. No inventamos rangos de mercado.</p>"
      },
      {
        "h2": "Costos aparte",
        "html": "<p>SEO continuo aparte. Texto de llamada perdida opcional (10–15 días; no garantizado). El extra cuesta $97 al mes.</p>"
      },
      {
        "h2": "Qué pagas en Roofing",
        "html": "<p>Páginas para repairs, replacements, and storm calls. Hub: <a href=\"/industries/roofing\">/industries/roofing</a>.</p>"
      }
    ]
  },
  {
    "slug": "roofing-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de roofing",
    "seoTitle": "Páginas para sitio de roofing | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para roofing, sin spam de ciudades.",
    "lead": "Inicio, zona, nosotros, reseñas, contacto y servicios claros para repairs, replacements, and storm calls.",
    "sections": [
      {
        "h2": "Páginas base",
        "html": "<p>Inicio, servicios, zona, nosotros, reseñas y contacto.</p>"
      },
      {
        "h2": "Servicios de Roofing",
        "html": "<p>repairs, replacements, and storm calls.</p>"
      },
      {
        "h2": "Sin spam de ciudades",
        "html": "<p>Una página honesta de zona supera decenas de páginas casi iguales.</p>"
      }
    ]
  },
  {
    "slug": "garage-door-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de garage doors en 2026?",
    "seoTitle": "Costo de sitio web de garage doors | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis: $97, $197, $297 al mes u Own It $1,497.",
    "lead": "Con Kinexis, un sitio de garage door company empieza en Website $97/mes, Lead System $197/mes, Plus $297/mes u Own It $1,497. Vista previa gratis, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis",
        "html": "<p>Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497. Ver <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "DIY, freelancer o agencia",
        "html": "<p>Comparación cualitativa. No inventamos rangos de mercado.</p>"
      },
      {
        "h2": "Costos aparte",
        "html": "<p>SEO continuo aparte. Texto de llamada perdida opcional (10–15 días; no garantizado). El extra cuesta $97 al mes.</p>"
      },
      {
        "h2": "Qué pagas en Garage Doors",
        "html": "<p>Páginas para broken springs, openers, and new doors. Hub: <a href=\"/industries/garage-doors\">/industries/garage-doors</a>.</p>"
      }
    ]
  },
  {
    "slug": "garage-door-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de garage doors",
    "seoTitle": "Páginas para sitio de garage doors | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para garage doors, sin spam de ciudades.",
    "lead": "Inicio, zona, nosotros, reseñas, contacto y servicios claros para broken springs, openers, and new doors.",
    "sections": [
      {
        "h2": "Páginas base",
        "html": "<p>Inicio, servicios, zona, nosotros, reseñas y contacto.</p>"
      },
      {
        "h2": "Servicios de Garage Doors",
        "html": "<p>broken springs, openers, and new doors.</p>"
      },
      {
        "h2": "Sin spam de ciudades",
        "html": "<p>Una página honesta de zona supera decenas de páginas casi iguales.</p>"
      }
    ]
  },
  {
    "slug": "painting-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de painting en 2026?",
    "seoTitle": "Costo de sitio web de painting | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis: $97, $197, $297 al mes u Own It $1,497.",
    "lead": "Con Kinexis, un sitio de painting contractor empieza en Website $97/mes, Lead System $197/mes, Plus $297/mes u Own It $1,497. Vista previa gratis, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis",
        "html": "<p>Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497. Ver <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "DIY, freelancer o agencia",
        "html": "<p>Comparación cualitativa. No inventamos rangos de mercado.</p>"
      },
      {
        "h2": "Costos aparte",
        "html": "<p>SEO continuo aparte. Texto de llamada perdida opcional (10–15 días; no garantizado). El extra cuesta $97 al mes.</p>"
      },
      {
        "h2": "Qué pagas en Painting",
        "html": "<p>Páginas para interior, exterior, and cabinet finishes. Hub: <a href=\"/industries/painting\">/industries/painting</a>.</p>"
      }
    ]
  },
  {
    "slug": "painting-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de painting",
    "seoTitle": "Páginas para sitio de painting | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para painting, sin spam de ciudades.",
    "lead": "Inicio, zona, nosotros, reseñas, contacto y servicios claros para interior, exterior, and cabinet finishes.",
    "sections": [
      {
        "h2": "Páginas base",
        "html": "<p>Inicio, servicios, zona, nosotros, reseñas y contacto.</p>"
      },
      {
        "h2": "Servicios de Painting",
        "html": "<p>interior, exterior, and cabinet finishes.</p>"
      },
      {
        "h2": "Sin spam de ciudades",
        "html": "<p>Una página honesta de zona supera decenas de páginas casi iguales.</p>"
      }
    ]
  },
  {
    "slug": "remodeling-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de remodeling en 2026?",
    "seoTitle": "Costo de sitio web de remodeling | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis: $97, $197, $297 al mes u Own It $1,497.",
    "lead": "Con Kinexis, un sitio de remodeling contractor empieza en Website $97/mes, Lead System $197/mes, Plus $297/mes u Own It $1,497. Vista previa gratis, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis",
        "html": "<p>Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497. Ver <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "DIY, freelancer o agencia",
        "html": "<p>Comparación cualitativa. No inventamos rangos de mercado.</p>"
      },
      {
        "h2": "Costos aparte",
        "html": "<p>SEO continuo aparte. Texto de llamada perdida opcional (10–15 días; no garantizado). El extra cuesta $97 al mes.</p>"
      },
      {
        "h2": "Qué pagas en Remodeling",
        "html": "<p>Páginas para kitchens, baths, and longer consults. Hub: <a href=\"/industries/remodeling\">/industries/remodeling</a>.</p>"
      }
    ]
  },
  {
    "slug": "remodeling-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de remodeling",
    "seoTitle": "Páginas para sitio de remodeling | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para remodeling, sin spam de ciudades.",
    "lead": "Inicio, zona, nosotros, reseñas, contacto y servicios claros para kitchens, baths, and longer consults.",
    "sections": [
      {
        "h2": "Páginas base",
        "html": "<p>Inicio, servicios, zona, nosotros, reseñas y contacto.</p>"
      },
      {
        "h2": "Servicios de Remodeling",
        "html": "<p>kitchens, baths, and longer consults.</p>"
      },
      {
        "h2": "Sin spam de ciudades",
        "html": "<p>Una página honesta de zona supera decenas de páginas casi iguales.</p>"
      }
    ]
  },
  {
    "slug": "landscaping-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de landscaping en 2026?",
    "seoTitle": "Costo de sitio web de landscaping | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis: $97, $197, $297 al mes u Own It $1,497.",
    "lead": "Con Kinexis, un sitio de landscaping empieza en Website $97/mes, Lead System $197/mes, Plus $297/mes u Own It $1,497. Vista previa gratis, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis",
        "html": "<p>Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497. Ver <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "DIY, freelancer o agencia",
        "html": "<p>Comparación cualitativa. No inventamos rangos de mercado.</p>"
      },
      {
        "h2": "Costos aparte",
        "html": "<p>SEO continuo aparte. Texto de llamada perdida opcional (10–15 días; no garantizado). El extra cuesta $97 al mes.</p>"
      },
      {
        "h2": "Qué pagas en Landscaping",
        "html": "<p>Páginas para maintenance routes and design-build. Hub: <a href=\"/industries/landscaping\">/industries/landscaping</a>.</p>"
      }
    ]
  },
  {
    "slug": "landscaping-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de landscaping",
    "seoTitle": "Páginas para sitio de landscaping | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para landscaping, sin spam de ciudades.",
    "lead": "Inicio, zona, nosotros, reseñas, contacto y servicios claros para maintenance routes and design-build.",
    "sections": [
      {
        "h2": "Páginas base",
        "html": "<p>Inicio, servicios, zona, nosotros, reseñas y contacto.</p>"
      },
      {
        "h2": "Servicios de Landscaping",
        "html": "<p>maintenance routes and design-build.</p>"
      },
      {
        "h2": "Sin spam de ciudades",
        "html": "<p>Una página honesta de zona supera decenas de páginas casi iguales.</p>"
      }
    ]
  },
  {
    "slug": "pool-service-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de pool care en 2026?",
    "seoTitle": "Costo de sitio web de pool care | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis: $97, $197, $297 al mes u Own It $1,497.",
    "lead": "Con Kinexis, un sitio de pool service empieza en Website $97/mes, Lead System $197/mes, Plus $297/mes u Own It $1,497. Vista previa gratis, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis",
        "html": "<p>Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497. Ver <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "DIY, freelancer o agencia",
        "html": "<p>Comparación cualitativa. No inventamos rangos de mercado.</p>"
      },
      {
        "h2": "Costos aparte",
        "html": "<p>SEO continuo aparte. Texto de llamada perdida opcional (10–15 días; no garantizado). El extra cuesta $97 al mes.</p>"
      },
      {
        "h2": "Qué pagas en Pool Care",
        "html": "<p>Páginas para weekly routes, repairs, and equipment. Hub: <a href=\"/industries/pool-care\">/industries/pool-care</a>.</p>"
      }
    ]
  },
  {
    "slug": "pool-service-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de pool care",
    "seoTitle": "Páginas para sitio de pool care | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para pool care, sin spam de ciudades.",
    "lead": "Inicio, zona, nosotros, reseñas, contacto y servicios claros para weekly routes, repairs, and equipment.",
    "sections": [
      {
        "h2": "Páginas base",
        "html": "<p>Inicio, servicios, zona, nosotros, reseñas y contacto.</p>"
      },
      {
        "h2": "Servicios de Pool Care",
        "html": "<p>weekly routes, repairs, and equipment.</p>"
      },
      {
        "h2": "Sin spam de ciudades",
        "html": "<p>Una página honesta de zona supera decenas de páginas casi iguales.</p>"
      }
    ]
  },
  {
    "slug": "pressure-washing-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de pressure washing en 2026?",
    "seoTitle": "Costo de sitio web de pressure washing | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis: $97, $197, $297 al mes u Own It $1,497.",
    "lead": "Con Kinexis, un sitio de pressure washing empieza en Website $97/mes, Lead System $197/mes, Plus $297/mes u Own It $1,497. Vista previa gratis, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis",
        "html": "<p>Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497. Ver <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "DIY, freelancer o agencia",
        "html": "<p>Comparación cualitativa. No inventamos rangos de mercado.</p>"
      },
      {
        "h2": "Costos aparte",
        "html": "<p>SEO continuo aparte. Texto de llamada perdida opcional (10–15 días; no garantizado). El extra cuesta $97 al mes.</p>"
      },
      {
        "h2": "Qué pagas en Pressure Washing",
        "html": "<p>Páginas para houses, concrete, and roof soft washes. Hub: <a href=\"/industries/pressure-washing\">/industries/pressure-washing</a>.</p>"
      }
    ]
  },
  {
    "slug": "pressure-washing-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de pressure washing",
    "seoTitle": "Páginas para sitio de pressure washing | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para pressure washing, sin spam de ciudades.",
    "lead": "Inicio, zona, nosotros, reseñas, contacto y servicios claros para houses, concrete, and roof soft washes.",
    "sections": [
      {
        "h2": "Páginas base",
        "html": "<p>Inicio, servicios, zona, nosotros, reseñas y contacto.</p>"
      },
      {
        "h2": "Servicios de Pressure Washing",
        "html": "<p>houses, concrete, and roof soft washes.</p>"
      },
      {
        "h2": "Sin spam de ciudades",
        "html": "<p>Una página honesta de zona supera decenas de páginas casi iguales.</p>"
      }
    ]
  },
  {
    "slug": "window-cleaning-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de window cleaning en 2026?",
    "seoTitle": "Costo de sitio web de window cleaning | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis: $97, $197, $297 al mes u Own It $1,497.",
    "lead": "Con Kinexis, un sitio de window cleaning empieza en Website $97/mes, Lead System $197/mes, Plus $297/mes u Own It $1,497. Vista previa gratis, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis",
        "html": "<p>Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497. Ver <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "DIY, freelancer o agencia",
        "html": "<p>Comparación cualitativa. No inventamos rangos de mercado.</p>"
      },
      {
        "h2": "Costos aparte",
        "html": "<p>SEO continuo aparte. Texto de llamada perdida opcional (10–15 días; no garantizado). El extra cuesta $97 al mes.</p>"
      },
      {
        "h2": "Qué pagas en Window Cleaning",
        "html": "<p>Páginas para home routes and storefront schedules. Hub: <a href=\"/industries/window-cleaning\">/industries/window-cleaning</a>.</p>"
      }
    ]
  },
  {
    "slug": "window-cleaning-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de window cleaning",
    "seoTitle": "Páginas para sitio de window cleaning | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para window cleaning, sin spam de ciudades.",
    "lead": "Inicio, zona, nosotros, reseñas, contacto y servicios claros para home routes and storefront schedules.",
    "sections": [
      {
        "h2": "Páginas base",
        "html": "<p>Inicio, servicios, zona, nosotros, reseñas y contacto.</p>"
      },
      {
        "h2": "Servicios de Window Cleaning",
        "html": "<p>home routes and storefront schedules.</p>"
      },
      {
        "h2": "Sin spam de ciudades",
        "html": "<p>Una página honesta de zona supera decenas de páginas casi iguales.</p>"
      }
    ]
  },
  {
    "slug": "lawn-care-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de yard care en 2026?",
    "seoTitle": "Costo de sitio web de yard care | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis: $97, $197, $297 al mes u Own It $1,497.",
    "lead": "Con Kinexis, un sitio de lawn care empieza en Website $97/mes, Lead System $197/mes, Plus $297/mes u Own It $1,497. Vista previa gratis, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis",
        "html": "<p>Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497. Ver <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "DIY, freelancer o agencia",
        "html": "<p>Comparación cualitativa. No inventamos rangos de mercado.</p>"
      },
      {
        "h2": "Costos aparte",
        "html": "<p>SEO continuo aparte. Texto de llamada perdida opcional (10–15 días; no garantizado). El extra cuesta $97 al mes.</p>"
      },
      {
        "h2": "Qué pagas en Yard Care",
        "html": "<p>Páginas para weekly lawn routes and pet-waste stops. Hub: <a href=\"/industries/yard-care\">/industries/yard-care</a>.</p>"
      }
    ]
  },
  {
    "slug": "lawn-care-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de yard care",
    "seoTitle": "Páginas para sitio de yard care | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para yard care, sin spam de ciudades.",
    "lead": "Inicio, zona, nosotros, reseñas, contacto y servicios claros para weekly lawn routes and pet-waste stops.",
    "sections": [
      {
        "h2": "Páginas base",
        "html": "<p>Inicio, servicios, zona, nosotros, reseñas y contacto.</p>"
      },
      {
        "h2": "Servicios de Yard Care",
        "html": "<p>weekly lawn routes and pet-waste stops.</p>"
      },
      {
        "h2": "Sin spam de ciudades",
        "html": "<p>Una página honesta de zona supera decenas de páginas casi iguales.</p>"
      }
    ]
  },
];

/**
 * Spain (`/es-es`) keeps this shared post indexable, but without USD figures —
 * same rule as the Spain homepage meta (no US pricing in Spain-facing copy).
 */
const ES_ES_POST_OVERRIDES: Partial<Record<string, Partial<EsPost>>> = {
  "monthly-website-vs-own-it": {
    excerpt: "Compara Website, Lead System y Plus con Own It: cancelación, archivos del sitio y qué incluye cada plan.",
    lead: "Los planes mensuales y Own It son opciones válidas. Depende del flujo de caja y de si quieres herramientas de llamada perdida.",
    sections: [
      {
        h2: "Las dos opciones son válidas",
        html: "<p>Algunos prefieren empezar sin enganche y pagar mes a mes. Otros un solo pago y los archivos desde el día uno.</p>",
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

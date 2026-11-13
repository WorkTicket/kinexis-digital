type EsPost = {
  slug: string;
  category: string;
  title: string;
  seoTitle: string;
  excerpt: string;
  lead: string;
  sections: { h2: string; html: string }[];
};

/** Native Spanish posts + ES mirrors for the five newest EN posts (Spanish cluster). */
export const ES_CLUSTER_POSTS: EsPost[] = [
  {
    slug: "web-design-for-contractors",
    category: "Diseño",
    title: "Lista para el sitio web de un contratista que sí trae llamadas",
    seoTitle: "Lista para el sitio web de un contratista",
    excerpt: "Un sitio de contratista no es un catálogo bonito. Tiene que nombrar el trabajo, la zona y el teléfono en la primera pantalla del celular.",
    lead: "Cuando alguien busca un contratista, no está ojeando portfolios. Está comparando tres resultados en el celular y elige al que se entiende más rápido: qué haces, dónde llegas y cómo te marcan. El diseño web para contratistas empieza ahí, no en el logo.",
    sections: [
      {
        h2: "Qué busca quien te encuentra",
        html: `<p>La búsqueda casi siempre llega desde el teléfono. A veces es una urgencia. A veces es una cotización para la próxima semana. En los dos casos la persona decide en segundos si se queda o vuelve a Google.</p><p>Tu página de inicio tiene que contestar tres cosas sin hacerla bajar: el trabajo que sí haces, las ciudades que sí cubres y un número que se pueda tocar. Si eso falta, el diseño “profesional” no importa.</p>`,
      },
      {
        h2: "Una página por trabajo, no un menú eterno",
        html: `<p>“Servicios de construcción” no le dice nada a quien busca una remodelación de baño, un techo o una cerca. Cada trabajo que quieres vender merece su propia página, con fotos reales y un siguiente paso claro.</p><p>Eso también ayuda a Google: entiende qué ofreces sin adivinar. No hace falta clonar la misma página para cada pueblo. Sí hace falta ser específico en lo que tu cuadrilla ya entrega.</p>`,
      },
      {
        h2: "Prueba que se siente de verdad",
        html: `<p>Licencia y seguro, cuando apliquen en tu estado, van donde se vean. Las fotos de obra propia pesan más que un stock de cascos brillantes. Las reseñas de Google cerca del teléfono cierran la duda antes de la llamada.</p><p>Si el cliente planea un proyecto, el formulario puede pedir poco: nombre, teléfono, tipo de trabajo y ciudad. Las fotos pueden llegar después por mensaje. Si es emergencia, el botón de llamar gana al formulario.</p>`,
      },
      {
        h2: "Cómo lo armamos en Kinexis",
        html: `<p>Empezamos con una vista previa gratis de la página de inicio en 2 días hábiles, sin tarjeta y sin obligación. Cuando apruebas y envías el contenido que falta, el sitio completo suele salir en 5 días hábiles — lo confirmamos por escrito.</p><p>Website es $97 al mes. Lead System $197 al mes agrega pedidos de reseña en Google y texto opcional si no contestas. Plus $297 al mes hace ese seguimiento en inglés y español. Own It es $1,497 de una vez, con los archivos tuyos desde el lanzamiento.</p><p>La página de servicio para <a href="/web-design">diseño web para contratistas</a> es la dueña de esa búsqueda. Mira las <a href="/industries">industrias</a> o pide tu vista previa en <a href="/contact">/contact</a>. Compara planes en <a href="/pricing">/pricing</a>.</p>`,
      },
    ],
  },
  {
    slug: "pagina-web-para-plomeros",
    category: "Diseño",
    title: "Qué debe tener una página web para plomeros",
    seoTitle: "Qué debe tener una página web para plomeros",
    excerpt: "Quien tiene una fuga no lee párrafos. Necesita tu número, tu zona y si puedes ir hoy. Así se arma una página web para plomeros que sí convierte.",
    lead: "La mitad de quien entra a una página de plomería tiene agua donde no debería. La otra mitad planea un calentador o un destape y sí lee. Una buena página web para plomeros atiende a los dos sin hacer esperar a ninguno.",
    sections: [
      {
        h2: "Primera pantalla: trabajo, zona, teléfono",
        html: `<p>En el celular, el titular nombra el trabajo — fugas, drenajes, calentadores — no un eslogan genérico. El número va arriba, con un toque para llamar. Al lado, las ciudades que de verdad cubres y el horario que sí cumples.</p><p>Si anuncias 24 horas y nadie contesta de noche, las reseñas lo van a decir. Mejor un horario honesto que una promesa que enoja al cliente a las dos de la mañana.</p>`,
      },
      {
        h2: "Separa la urgencia de la cotización",
        html: `<p>Una tubería reventada y un cambio de calentador no comparten comprador. Juntarlos en una sola página hace más difíciles las dos búsquedas.</p><ul><li><strong>Fugas y emergencias</strong> — teléfono grande, qué hacer mientras llega alguien, horario real.</li><li><strong>Drenajes</strong> — camino aparte para tapones y cámara, sin mezclarlo con calentadores.</li><li><strong>Calentadores</strong> — reparación o cambio, marcas que instalas, forma clara de pedir cotización.</li></ul><p>El detalle de esas páginas está también en <a href="/blog/plumbing-website-pages">qué páginas necesita un sitio de plomería</a> y en el <a href="/industries/plumbing">hub de plomería</a>.</p>`,
      },
      {
        h2: "Confianza antes de marcar",
        html: `<p>Licencia y seguro, si aplica, van cerca del teléfono. Fotos de trabajos tuyos — no de un banco de imágenes. Reseñas de Google visibles, no escondidas al final.</p><p>El formulario pide poco: nombre, teléfono y el problema. Quien está parado en un charco no va a subir planos. Quien planea un calentador puede mandar fotos después.</p>`,
      },
      {
        h2: "Precio y siguiente paso",
        html: `<p>Con Kinexis, una página web para plomeros empieza en Website a $97 al mes. Lead System a $197 al mes incluye pedidos de reseña después del trabajo y texto opcional si no contestas. Plus a $297 al mes lo hace en inglés y español. Own It es $1,497 de una sola vez.</p><p>Primero ves una vista previa gratis del inicio (2 días hábiles, sin tarjeta). El costo desglosado está en <a href="/blog/plumber-website-cost">cuánto cuesta un sitio de plomería</a>. <a href="/contact">Pide tu vista previa</a> o compara en <a href="/pricing">/pricing</a>.</p>`,
      },
    ],
  },
  {
    slug: "como-pedir-resenas-en-google",
    category: "Consejos",
    title: "Cómo pedir reseñas en Google sin sonar forzado",
    seoTitle: "Cómo pedir reseñas en Google | Guión y enlace directo",
    excerpt: "El momento, un enlace directo y un mensaje corto. Así pides reseñas en Google después de un trabajo real — sin inventar ni pagar por estrellas.",
    lead: "La siguiente llamada casi siempre mira tus reseñas antes de marcar. Pedirlas en la puerta funciona a veces. Mandar un enlace directo cuando el trabajo ya se ve, funciona más — y no necesitas un discurso largo.",
    sections: [
      {
        h2: "Consigue el enlace (o el código QR)",
        html: `<p>No le pidas al cliente que “te busque en Google”. Dale un enlace que abra directo el formulario de reseña de tu Perfil de Negocio de Google.</p><p>Entra al perfil con la cuenta que lo administra → <strong>Leer reseñas</strong> → <strong>Consigue más reseñas</strong>. Copia el enlace. El código QR, según Google, se descarga desde la computadora (clic derecho → guardar imagen).</p><p>También puedes armar el enlace con tu Place ID en la <a href="/tools/google-review-link-qr">herramienta de enlace y QR de reseñas</a> (disponible en inglés en el sitio). Prueba el enlace en un celular que no sea el tuyo de propietario.</p>`,
      },
      {
        h2: "Cuándo pedirlo",
        html: `<p>Cuando el trabajo terminó y el cliente ya ve el resultado. Suele ser:</p><ul><li>En la camioneta, al repasar lo que se arregló</li><li>Por texto el mismo día que cerraste el trabajo</li><li>Por correo, si así se comunican con ustedes</li></ul><p>En rutas semanales (césped, piscina, limpieza), pide después de una visita que salió bien — no cada semana a la misma casa.</p><p>En <strong>Lead System</strong> ($197/mes) y <strong>Plus</strong> ($297/mes), Kinexis puede enviar el pedido de reseña después del trabajo con el enlace a tu perfil. Website ($97/mes) y Own It base ($1,497) no incluyen ese envío automático. Plus lo puede mandar en inglés y en español.</p>`,
      },
      {
        h2: "Guión en la puerta",
        html: `<p>Corto. Una pregunta. Un siguiente paso.</p><blockquote><p>«Gracias por recibirnos hoy. Si quedó bien el trabajo, una reseña en Google le ayuda al siguiente cliente a encontrarnos. ¿Te mando el enlace por texto?»</p></blockquote><p>Si dice que sí, mándalo antes de salir de la calle. Si duda, paras. No insistas.</p><p><strong>Si pregunta por qué:</strong></p><blockquote><p>«La gente nueva revisa Google antes de llamar. Una reseña corta de un trabajo real es lo más útil que puede dejar.»</p></blockquote>`,
      },
      {
        h2: "Textos listos para copiar",
        html: `<p>Cambia lo que está entre corchetes. Un solo enlace. No mezcles el pedido de reseña con una disputa de factura.</p><p><strong>El mismo día</strong></p><blockquote><p>Hola [Nombre], soy [Tu nombre] de [Empresa]. Gracias otra vez por el trabajo de hoy. Si te parece bien, aquí va el enlace para reseña en Google: [enlace]. Responde STOP para no recibir más textos.</p></blockquote><p><strong>Al día siguiente (solo si en la puerta dijo que sí y se te olvidó el enlace)</strong></p><blockquote><p>Hola [Nombre], te dejo el enlace de reseña en Google que te comenté: [enlace]. Sin presión si estás ocupado. —[Empresa]</p></blockquote><p><strong>Ruta / servicio recurrente</strong></p><blockquote><p>Hola [Nombre], gracias por otra visita esta temporada. Si el equipo te facilitó las cosas, una reseña en Google ayuda a los vecinos a encontrarnos: [enlace].</p></blockquote>`,
      },
      {
        h2: "Correo corto",
        html: `<p><strong>Asunto:</strong> Un favor rápido si el trabajo quedó bien</p><blockquote><p>Hola [Nombre],<br />Gracias por elegir a [Empresa] para [tipo de trabajo] el [fecha].<br />Si el trabajo cumplió lo que esperabas, una reseña en Google ayuda a otros a decidir a quién llamar. Aquí va el enlace directo: [enlace].<br />Gracias por tu tiempo, de cualquier forma.<br />[Tu nombre]<br />[Empresa] · [teléfono]</p></blockquote>`,
      },
      {
        h2: "Lo que no debes hacer",
        html: `<ul><li>No escribas la reseña tú y le pidas que la pegue.</li><li>No ofrezcas dinero, descuento ni trabajo gratis a cambio de cinco estrellas.</li><li>No pidas solo reseñas positivas ni desanimes las negativas.</li><li>No uses fotos de trabajos ajenos en el sitio como si fueran tuyos.</li></ul><p>Pocas reseñas honestas ganan a un montón inventadas. Si hoy tienes pocas, sigue pidiendo después de trabajos terminados: el conteo crece con trabajo real.</p><p>Más contexto en <a href="/blog/build-trust-with-reviews">cómo conseguir reseñas sin perseguir a la gente</a>. <a href="/contact">Vista previa gratis del inicio</a> o planes en <a href="/pricing">/pricing</a>.</p>`,
      },
    ],
  },
  {
    slug: "how-to-ask-for-google-reviews-contractor",
    category: "Consejos",
    title: "Cómo pedir reseñas de Google después de un trabajo",
    seoTitle: "Cómo pedir reseñas de Google (guiones para contratistas)",
    excerpt: "Guiones cortos para la obra, el texto y el correo. Pide reseñas reales con un enlace directo, sin inventar opiniones ni poner a nadie en un aprieto.",
    lead: "El siguiente cliente casi siempre lee tus reseñas de Google antes de llamar. Pedirlo en la puerta a veces funciona. Un mensaje claro con enlace directo, cuando el trabajo ya se ve, funciona más — y no hace falta un discurso largo.",
    sections: [
      {
        h2: "Pide en el momento correcto",
        html: `<p>Esta guía trae guiones listos para la obra, el texto y el correo. Úsalos tal cual o cambia el nombre de tu empresa. No inventes reseñas, no las compres y no publiques fotos de trabajos ajenos como propios.</p><p>Pide o envía el mensaje cuando el trabajo terminó y el cliente ya ve el resultado. Suele ser:</p><ul><li>En la camioneta, al repasar lo que arreglaste</li><li>Por texto el mismo día que cerraste el trabajo</li><li>Por correo, si así se comunican contigo</li></ul><p>En rutas recurrentes (césped, piscina, limpieza), pide después de una visita fuerte — no cada semana a la misma casa.</p><p>En <strong>Lead System</strong> ($197/mes) y <strong>Plus</strong> ($297/mes), Kinexis puede enviar el pedido de reseña después del trabajo con el enlace a tu perfil. Website ($97/mes) y Own It base ($1,497) no incluyen ese envío automático.</p>`,
      },
      {
        h2: "Guión en la obra (dilo en voz alta)",
        html: `<p>Corto. Una sola petición. Un siguiente paso.</p><blockquote><p>«Gracias por recibirnos hoy. Si el trabajo quedó bien, una reseña en Google ayuda al siguiente cliente a encontrarnos. Te puedo mandar el enlace por texto — ¿cuál es el mejor número?»</p></blockquote><p>Si dice que sí, mándalo antes de salir. Si duda, paras. No presiones.</p><p><strong>Si pregunta por qué:</strong></p><blockquote><p>«Los clientes nuevos revisan Google antes de llamar. Una reseña corta de un trabajo real es lo más útil que pueden dejar.»</p></blockquote>`,
      },
      {
        h2: "Textos para copiar y enviar",
        html: `<p>Cambia lo que está entre corchetes. Un solo enlace que abra el flujo de reseña de tu Perfil de Negocio de Google — no un “búscanos en Google”. Arma el enlace con la <a href="/tools/google-review-link-qr">herramienta de enlace y QR</a>.</p><p><strong>El mismo día, después del trabajo</strong></p><blockquote><p>Hola [Nombre], soy [Tu nombre] de [Empresa]. Gracias otra vez por el trabajo de hoy. Si te parece, aquí va el enlace de reseña en Google: [enlace]. Responde STOP para no recibir más textos.</p></blockquote><p><strong>A la mañana siguiente (solo si en la obra dijo que sí y se te olvidó el enlace)</strong></p><blockquote><p>Hola [Nombre], te dejo el enlace de reseña en Google que te comenté: [enlace]. Sin presión si estás ocupado. —[Empresa]</p></blockquote><p><strong>Ruta / servicio recurrente</strong></p><blockquote><p>Hola [Nombre], gracias por otra visita esta temporada. Si el equipo te facilitó las cosas, una reseña en Google ayuda a los vecinos a encontrarnos: [enlace].</p></blockquote><p>No mandes el pedido de reseña en el mismo mensaje que una disputa de factura o un reclamo.</p>`,
      },
      {
        h2: "Correo",
        html: `<p><strong>Asunto:</strong> Un favor rápido si el trabajo quedó bien</p><blockquote><p>Hola [Nombre],<br />Gracias por elegir a [Empresa] para [tipo de trabajo] el [fecha].<br />Si el trabajo cumplió lo que esperabas, una reseña en Google ayuda a otros dueños a decidir a quién llamar. Aquí va el enlace directo: [enlace].<br />Gracias por tu tiempo, de cualquier forma.<br />[Tu nombre]<br />[Empresa] · [teléfono]</p></blockquote>`,
      },
      {
        h2: "Lo que no debes hacer",
        html: `<ul><li>No escribas la reseña tú y le pidas que la pegue.</li><li>No ofrezcas pago, descuento ni trabajo gratis a cambio de cinco estrellas.</li><li>No uses fotos de stock de trabajos ajenos en el sitio como si fueran tuyos.</li><li>No anuncies 24/7 en Google si nadie contesta fuera de horario.</li></ul><p>Pocas reseñas honestas ganan a un montón inventadas. Si hoy tienes pocas, sigue pidiendo después de trabajos terminados.</p>`,
      },
      {
        h2: "Haz el enlace fácil",
        html: `<p>La gente salta los pedidos que la obligan a buscarte. Usa un enlace directo (o un QR que lo abra). Lead System y Plus envían ese tipo de pedido después del trabajo. También puedes poner un enlace corto en la factura y en la camioneta.</p><p>Ver también <a href="/blog/build-trust-with-reviews">cómo conseguir reseñas sin perseguir a la gente</a>, <a href="/blog/como-pedir-resenas-en-google">cómo pedir reseñas en Google</a> y <a href="/industries/plumbing">diseño web para plomeros</a>.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> o compara planes en <a href="/pricing">/pricing</a>.</p>`,
      },
    ],
  },
  {
    slug: "missed-call-text-delayed-10dlc",
    category: "Consejos",
    title: "Por qué se retrasan los textos de llamada perdida",
    seoTitle: "Por qué se retrasan los textos de llamada perdida (aprobación del operador)",
    excerpt: "Por qué el texto de llamada perdida suele esperar la aprobación del operador — normalmente 10 a 15 días — y qué significa eso antes de activarlo.",
    lead: "El texto de llamada perdida suena simple: alguien llama mientras estás bajo el lavabo, sale un texto, responden y agendan. Lo que la gente subestima es la espera antes de que el primer mensaje automatizado pueda salir de forma fiable por la red del operador.",
    sections: [
      {
        h2: "Lo que dice el sitio hoy",
        html: `<p>Esta guía explica ese retraso con el lenguaje que Kinexis publica en el sitio — no con promesas de software.</p><p>En los planes de Kinexis, el texto de llamada perdida es un <strong>extra opcional</strong>. Se necesita una <strong>línea dedicada de la empresa</strong>. Hay un segundo número de seguimiento por <strong>$1/mes</strong>. Pueden aplicar tarifas estándar del operador.</p><p><strong>La activación depende de la aprobación del operador (normalmente 10 a 15 días). Esa aprobación no está garantizada.</strong> Los textos suelen empezar <strong>10 a 15 días después de la aprobación</strong>.</p><p>Ese matiz importa. La función no es “enciéndela hoy y escribe mañana” para todos los números.</p>`,
      },
      {
        h2: "Por qué les importa a los operadores",
        html: `<p>Los operadores y las plataformas de mensajería intentan limitar el spam. Los textos de negocio que parecen marketing masivo, usan números compartidos mal o no identifican claro al negocio se retrasan, se filtran o se bloquean.</p><p>Los pasos de registro y aprobación existen para que la red vea quién envía qué. El papeleo exacto cambia según el proveedor.</p><p>Lo que sí puedes decir hoy, según los términos publicados: espera una ventana de aprobación medida en <strong>días</strong>, no en minutos, y no prometas fecha de inicio hasta que llegue la aprobación.</p>`,
      },
      {
        h2: "Qué decirle al dueño antes del lanzamiento",
        html: `<ol><li><strong>Agenda tiempo en el calendario.</strong> Si el sitio sale el lunes, el texto puede seguir esperando al operador.</li><li><strong>Usa una línea dedicada de la empresa.</strong> Las líneas compartidas o personales complican la aprobación y el seguimiento.</li><li><strong>No anuncies “texto al instante”</strong> en Google ni en el inicio hasta que los textos estén saliendo de verdad.</li><li><strong>Sigue contestando el teléfono.</strong> El texto ayuda cuando pierdes la llamada. No reemplaza contestar.</li></ol>`,
      },
      {
        h2: "Cómo encaja en los planes",
        html: `<ul><li><strong>Website</strong> ($97/mes) y <strong>Own It</strong> ($1,497): el texto es un extra a <strong>$97/mes</strong>.</li><li><strong>Lead System</strong> ($197/mes) y <strong>Plus</strong> ($297/mes): el texto no se cobra a $97/mes. Un segundo número de seguimiento es <strong>$1/mes</strong>, y pueden aplicar tarifas del operador. Plus puede correr en inglés y español.</li></ul><p>Borradores listos en <a href="/blog/missed-call-text-back-templates">plantillas de texto por llamada perdida</a>. Estima ingresos en riesgo con la <a href="/tools/missed-call-calculator">calculadora de llamada perdida</a>. Detalle del extra también en <a href="/upgrades">mejoras</a> y <a href="/faqs">preguntas</a>.</p><p><a href="/pricing">Ver planes</a> o <a href="/contact">pide una vista previa gratis del inicio</a> — 2 días hábiles, sin tarjeta, sin obligación.</p>`,
      },
    ],
  },
  {
    slug: "google-business-profile-vs-website",
    category: "SEO",
    title: "Perfil de Negocio de Google vs sitio web — ¿necesitas los dos?",
    seoTitle: "Perfil de Negocio de Google vs sitio web — ¿un contratista necesita ambos?",
    excerpt: "Respuesta práctica para dueños de oficios: qué hace bien el Perfil de Negocio de Google, qué sigue cubriendo el sitio y cuándo necesitas los dos.",
    lead: "Muchos negocios de una camioneta viven un tiempo solo con el Perfil de Negocio de Google: horario, fotos, reseñas y teléfono. Luego aparece un trabajo más grande, el sitio de un competidor se ve más claro o los anuncios piden una página de aterrizaje. La pregunta es: ¿alcanza el perfil, o también necesitas un sitio?",
    sections: [
      {
        h2: "Respuesta corta",
        html: `<p>Para la mayoría de negocios de servicios al hogar: <strong>el perfil y el sitio hacen trabajos distintos.</strong> Bastantes dueños necesitan los dos. Algunos pueden esperar el sitio completo. Casi nadie debería usar el perfil para esconder un teléfono difícil de marcar.</p>`,
      },
      {
        h2: "En qué es bueno el Perfil de Negocio de Google",
        html: `<ul><li>Mostrarte en el paquete de mapas cuando alguien busca cerca</li><li>Recibir y mostrar reseñas de Google</li><li>Publicar horario, zona y fotos que coinciden con el negocio real</li><li>Dejar llamar con un toque desde los resultados</li></ul><p>Lead System y Plus en Kinexis incluyen un ajuste del perfil de Google en el lanzamiento. Plus también incluye dos publicaciones al mes. Eso apoya el perfil — no reemplaza un sitio.</p>`,
      },
      {
        h2: "Para qué sigue sirviendo un sitio",
        html: `<ul><li>Páginas separadas para trabajos distintos (fuga vs calentador; reparación sin aire vs cambio de equipo)</li><li>Una página honesta de zona con las ciudades que sí cubres — no una pila de páginas de pueblo casi iguales</li><li>Espacio para el proceso, notas de financiamiento que de verdad ofreces, licencias y fotos de proyectos tuyos</li><li>Un formulario de cotización que pide lo que necesitas</li><li>Un lugar al que mandar anuncios, referidos y correo cuando el paquete de mapas está lleno</li></ul><p>Cada sitio de Kinexis sale con estructura limpia y páginas rápidas que Google puede leer. <strong>El SEO continuo no forma parte de los cuatro planes del sitio</strong>; se cotiza aparte. Nadie puede prometer una posición concreta. Mira <a href="/seo-services">servicios de SEO</a> y <a href="/blog/local-seo-get-found-get-called">SEO local para que te encuentren y te llamen</a>.</p>`,
      },
      {
        h2: "Cuándo el perfil solo puede esperar",
        html: `<p>Puedes posponer un sitio completo si:</p><ul><li>Ya te llegan más llamadas de las que puedes agendar desde el mapa</li><li>Horario, zona y teléfono en el perfil están correctos</li><li>No estás corriendo anuncios que necesiten una página de aterrizaje</li></ul><p>Aun así, mantén el perfil honesto. No pongas 24/7 si el taller cierra a las seis.</p>`,
      },
      {
        h2: "Cuándo necesitas los dos",
        html: `<p>Suma o mejora un sitio cuando:</p><ul><li>Trabajos distintos necesitan páginas y siguientes pasos distintos</li><li>Quieres pedidos de reseña y seguimiento de llamada perdida ligados a un número de seguimiento (opciones Lead System / Plus)</li><li>Necesitas páginas en inglés y español (Plus)</li><li>Quieres una vista previa gratis del inicio antes de pagar, y luego un plan que encaje — Website $97/mes, Lead System $197/mes, Plus $297/mes u Own It $1,497</li></ul><p>Mantén <strong>nombre, teléfono, horario y zona consistentes</strong> entre el perfil y el sitio. Las diferencias generan llamadas enojadas.</p><p>Explora los <a href="/industries">hubs por industria</a>, compara <a href="/pricing">planes</a> o <a href="/contact">pide una vista previa gratis del inicio</a>.</p>`,
      },
    ],
  },
  {
    slug: "freelancer-vs-agency-vs-subscription-website",
    category: "Consejos",
    title: "Freelancer, agencia o plan de sitio — ¿qué le sirve a un negocio de una camioneta?",
    seoTitle: "Freelancer vs agencia vs plan de sitio para un negocio chico",
    excerpt: "Comparación clara entre contratar un freelancer, una agencia o un plan de sitio mes a mes — para elegir sin miedo ni presión.",
    lead: "Si manejas una camioneta — o una cuadrilla chica — no necesitas un departamento de marketing de 40 páginas. Necesitas un sitio que cargue en el celular, muestre el trabajo que haces y haga fácil la siguiente llamada. La elección suele ser entre un freelancer, una agencia completa o un plan de sitio con hosting y cambios incluidos.",
    sections: [
      {
        h2: "Qué necesita de verdad un sitio de una camioneta",
        html: `<p>Esta es una guía de decisión, no un ataque. Freelancers y agencias pueden ser la opción correcta. También un plan mes a mes. Elige según flujo de caja, con qué frecuencia cambia el sitio y a quién quieres llamar cuando algo se rompe.</p><ul><li>Diseño móvil con un número visible para tocar y llamar</li><li>Páginas para los trabajos que la gente busca (no un solo bloque de “servicios”)</li><li>Una zona de servicio honesta</li><li>Hosting, SSL y una forma de pedir cambios chicos</li><li>Seguimiento opcional después: texto de llamada perdida, pedidos de reseña, reporte de llamadas</li></ul>`,
      },
      {
        h2: "Freelancer",
        html: `<p><strong>Suele encajar cuando:</strong> tienes un alcance claro, un diseñador de confianza y alguien de tu lado que pueda encargarse del hosting después.</p><p><strong>Pide por escrito:</strong> quién registra el dominio, quién hospeda, cómo se cobran los cambios y qué te queda si el proyecto termina.</p><p><strong>Cuidado con:</strong> esperas largas para un cambio chico; el hosting dejado para que tú lo resuelvas; sin texto de llamada perdida ni pedidos de reseña salvo que agregues otras herramientas.</p>`,
      },
      {
        h2: "Agencia",
        html: `<p><strong>Suele encajar cuando:</strong> necesitas un build grande a medida, muchas sedes o un retainer amplio de marketing.</p><p><strong>Pide por escrito:</strong> qué incluye el retainer mensual, plazo mínimo e informes.</p><p><strong>Cuidado con:</strong> pagar por un equipo que aún no necesitas; contratos difíciles de salir; promesas de SEO de una posición concreta (nadie controla los resultados de Google).</p>`,
      },
      {
        h2: "Plan de sitio estructurado (ejemplo: Kinexis)",
        html: `<p>Kinexis publica cuatro opciones para negocios de servicios locales en Estados Unidos:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Notas</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Hasta 5 páginas; hosting + SSL; cambios chicos; leads de formulario</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Hasta 10 páginas; texto opcional; pedidos de reseña; ajuste del perfil; llamadas + reporte; garantía de 60 días</td></tr><tr><td>Plus (bilingüe)</td><td>$297/mes</td><td>Hasta 20 páginas EN+ES; seguimiento bilingüe; garantía de 60 días</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Hasta 10 páginas; archivos tuyos desde el lanzamiento; 12 meses de hosting/cambios; sin plan mensual; sin garantía de leads</td></tr></tbody></table><p>Los planes mensuales son <strong>$0 de entrada</strong>, <strong>mes a mes</strong>, <strong>cancela cuando quieras</strong>, <strong>sin cargo por cancelar</strong>, con precio <strong>fijo 24 meses</strong> desde el lanzamiento. Todos incluyen <strong>devolución en 30 días</strong> (pedido por escrito; costos de terceros ya pagados quedan fuera). Todos empiezan con una <strong>vista previa gratis del inicio en 2 días hábiles</strong> — sin tarjeta, sin obligación.</p><p>Kinexis también publica una tabla de comparación con huecos habituales frente a freelancers y agencias (vista previa antes de pagar, textos y reseñas, hosting resuelto, precio fijo 24 meses, inglés/español). Cada proveedor varía — esa tabla es una ayuda para decidir, no una afirmación de que todo freelancer falla esas filas. Mira <a href="/web-design">diseño web</a> y <a href="/faqs">preguntas</a>.</p>`,
      },
      {
        h2: "Cómo elegir sin lenguaje de miedo",
        html: `<ul><li><strong>Necesitas lanzar con poco efectivo + hosting resuelto:</strong> un plan mensual puede encajar.</li><li><strong>Quieres un build de un pago y vas a manejar el hosting:</strong> un freelancer o una compra tipo Own It puede encajar.</li><li><strong>Necesitas un programa grande a medida:</strong> una agencia puede encajar — pide el alcance por escrito.</li></ul><p>En los planes mensuales, Kinexis hospeda y administra mientras el plan esté activo. Para quedarte con el sitio al cancelar, arregla una <strong>compra</strong> (pago único por escrito de los archivos) o pasa a <strong>Own It</strong> antes de que termine el período pagado. Pide las condiciones de compra por escrito. En Own It, los archivos son tuyos desde el día del lanzamiento.</p><p>Compara los cuatro planes en <a href="/pricing">/pricing</a>, o <a href="/contact">empieza con una vista previa gratis</a> y decide cuando veas el inicio.</p>`,
      },
    ],
  },
  {
    slug: "google-business-profile-checklist",
    category: "SEO",
    title: "Lista del Perfil de Negocio de Google para oficios",
    seoTitle: "Lista del Perfil de Negocio de Google para plomeros y oficios",
    excerpt: "Reclama el perfil, corrige horario y zona, sube fotos reales y arma el enlace de reseña — luego decide cuándo el sitio todavía ayuda.",
    lead: "Reclamar tu Perfil de Negocio de Google es el primer paso. Mantenerlo exacto — y saber cuándo un sitio todavía ayuda — es el resto del trabajo. Esta lista está pensada para plomeros y otros oficios que aparecen en Maps antes que en una página de inicio.",
    sections: [
      {
        h2: "Reclama y verifica",
        html: `<p>Busca el nombre de tu negocio en Google. Si ya hay un perfil, pide la propiedad. Si no, créalo. Termina la verificación antes de invertir tiempo en fotos o publicaciones — un listado sin verificar es fácil de perder o duplicar.</p><p>Usa el mismo nombre legal o comercial que la gente busca. Que el teléfono coincida con el que contestas en la camioneta.</p>`,
      },
      {
        h2: "Categorías, horario y zona",
        html: `<ul><li><strong>Categoría principal</strong> — el oficio más cercano (por ejemplo, Plomero). Suma categorías secundarias solo si de verdad haces ese trabajo.</li><li><strong>Horario</strong> — las horas en que alguien te puede alcanzar. No marques 24/7 si nadie contesta.</li><li><strong>Zona de servicio</strong> — ciudades y barrios que tu cuadrilla sí cubre. Inflar el mapa genera cotizaciones que no puedes agendar.</li></ul><p>Mantén nombre, teléfono, horario y zona consistentes con tu sitio cuando lo tengas.</p>`,
      },
      {
        h2: "Fotos y servicios",
        html: `<p>Sube fotos reales de trabajos: camioneta, equipo, obra terminada. Evita cascos de banco de imágenes. Agrega los servicios que la gente busca — fugas, drenajes, calentadores para plomeros; la misma honestidad para HVAC, electricidad y otros oficios.</p><p>Una descripción corta que nombre el trabajo y las ciudades gana a un eslogan sobre “calidad desde siempre”.</p>`,
      },
      {
        h2: "Reseñas y enlace directo",
        html: `<p>Activa mensajes solo si vas a responder. Consigue el enlace directo de reseña desde el perfil (<strong>Consigue más reseñas</strong>) o con la <a href="/tools/google-review-link-qr">herramienta de enlace y QR</a>. Pide después de trabajos terminados — mira <a href="/blog/how-to-ask-for-google-reviews-contractor">cómo pedir reseñas de Google</a> y <a href="/blog/como-pedir-resenas-en-google">cómo pedir reseñas en Google</a>.</p><p>En Lead System y Plus, Kinexis puede enviar ese pedido después del trabajo. Website y Own It base no incluyen pedidos automáticos.</p>`,
      },
      {
        h2: "Cuándo el perfil no alcanza",
        html: `<p>El perfil gana el toque para llamar desde el mapa. Un sitio sigue valiendo cuando trabajos distintos necesitan páginas distintas, los anuncios necesitan una URL de aterrizaje o quieres inglés y español (Plus). Lee <a href="/blog/google-business-profile-vs-website">Perfil de Negocio de Google vs sitio web</a> y el <a href="/industries/plumbing">hub de plomería</a>.</p><p>Lead System y Plus incluyen un ajuste del perfil en el lanzamiento. Compara planes en <a href="/pricing">/pricing</a> o <a href="/contact">pide una vista previa gratis del inicio</a> — 2 días hábiles, sin tarjeta.</p>`,
      },
    ],
  },
  {
    slug: "wix-vs-squarespace-vs-managed-website-contractors",
    category: "Consejos",
    title: "Wix, Squarespace o un sitio administrado para contratistas",
    seoTitle: "Wix vs Squarespace vs sitio administrado para contratistas",
    excerpt: "Cómo se comparan los constructores DIY con un plan de sitio administrado para oficios — tiempo, seguimiento y salida, sin tácticas de miedo.",
    lead: "Los constructores DIY son populares porque el primer login se siente barato y rápido. Un plan de sitio administrado cobra una cuota mensual (o un pago Own It) pero deja hosting, cambios y seguimiento opcional en otras manos. Ningún camino es automáticamente “malo”. La pregunta útil es quién va a mantener el teléfono fácil de tocar después de que el logo se vea bien.",
    sections: [
      {
        h2: "Qué hacen bien los constructores DIY",
        html: `<ul><li>Puedes experimentar de noche sin esperar a un diseñador</li><li>Las plantillas ponen una página en línea rápido</li><li>Tú controlas la cuenta día a día</li></ul>`,
      },
      {
        h2: "Dónde se traban los dueños de oficios",
        html: `<ul><li>Armar páginas de servicio, zona y caminos de llamada en móvil sigue tomando horas</li><li>Renovaciones de hosting, plugins y retoques caen en ti en temporada alta</li><li>Texto de llamada perdida, pedidos de reseña y reportes de llamadas casi siempre significan otras herramientas</li><li>Anuncios y SEO siguen necesitando una página clara; el constructor solo no agenda el trabajo</li></ul><p>Esto no es un argumento contra los constructores. Es un recordatorio de que el tiempo en el calendario es real.</p>`,
      },
      {
        h2: "Para qué sirve un plan administrado",
        html: `<p>Una opción administrada encaja cuando prefieres estar en el trabajo antes que dentro del editor. Usando Kinexis como ejemplo concreto (no el único proveedor del mercado):</p><ul><li>Vista previa gratis del inicio en <strong>2 días hábiles</strong>, sin tarjeta, sin obligación</li><li>Website <strong>$97/mes</strong>, Lead System <strong>$197/mes</strong>, Plus <strong>$297/mes</strong> u Own It <strong>$1,497</strong> de una vez</li><li>Hosting, SSL y cambios chicos en los planes mensuales</li><li>Lead System / Plus pueden sumar pedidos de reseña y texto opcional de llamada perdida (aprobación del operador normalmente <strong>10 a 15 días</strong>; no garantizada)</li><li>Cancelación mes a mes en planes mensuales; Own It entrega los archivos desde el lanzamiento</li></ul><p>El SEO continuo se cotiza aparte de esos cuatro planes. Sin promesas de posición.</p>`,
      },
      {
        h2: "Lista para decidir",
        html: `<ol><li><strong>Tiempo:</strong> ¿Vas a terminar las páginas de servicio este mes, o el borrador se va a quedar ahí?</li><li><strong>Llamada en móvil:</strong> ¿Alguien puede tocar para llamar arriba de la primera pantalla hoy?</li><li><strong>Seguimiento:</strong> ¿Necesitas texto de llamada perdida o pedidos de reseña, o solo un sitio brochure?</li><li><strong>Salida:</strong> Si dejas de pagar un constructor o un plan, ¿qué pasa con el dominio y los archivos? Pídelo por escrito. En los planes mensuales de Kinexis, pide <strong>condiciones de compra por escrito</strong> antes de cancelar si quieres quedarte con los archivos; o elige Own It cuando ese modelo encaje.</li><li><strong>Idioma:</strong> ¿Necesitas inglés y español (Plus)?</li></ol><p>Lectura relacionada: <a href="/blog/freelancer-vs-agency-vs-subscription-website">freelancer vs agencia vs plan de sitio</a> y <a href="/web-design">diseño web</a>.</p><p>Compara opciones en <a href="/pricing">/pricing</a> y <a href="/contact">pide una vista previa gratis del inicio</a> antes de comprometerte.</p>`,
      },
    ],
  },
];

/** Spain-facing bodies: same topics, no USD figures. */
export const ES_CLUSTER_ES_ES_OVERRIDES: Partial<Record<string, Partial<EsPost>>> = {
  "web-design-for-contractors": {
    seoTitle: "Lista para el sitio web de un contratista",
    sections: [
      {
        h2: "Qué busca quien te encuentra",
        html: `<p>La búsqueda casi siempre llega desde el teléfono. A veces es una urgencia. A veces es una cotización para la próxima semana. En los dos casos la persona decide en segundos si se queda o vuelve a Google.</p><p>Tu página de inicio tiene que contestar tres cosas sin hacerla bajar: el trabajo que sí haces, las ciudades que sí cubres y un número que se pueda tocar. Si eso falta, el diseño “profesional” no importa.</p>`,
      },
      {
        h2: "Una página por trabajo, no un menú eterno",
        html: `<p>“Servicios de construcción” no le dice nada a quien busca una remodelación de baño, un techo o una cerca. Cada trabajo que quieres vender merece su propia página, con fotos reales y un siguiente paso claro.</p><p>Eso también ayuda a Google: entiende qué ofreces sin adivinar. No hace falta clonar la misma página para cada pueblo. Sí hace falta ser específico en lo que tu cuadrilla ya entrega.</p>`,
      },
      {
        h2: "Prueba que se siente de verdad",
        html: `<p>Licencia y seguro, cuando apliquen, van donde se vean. Las fotos de obra propia pesan más que un stock de cascos brillantes. Las reseñas de Google cerca del teléfono cierran la duda antes de la llamada.</p><p>Si el cliente planea un proyecto, el formulario puede pedir poco: nombre, teléfono, tipo de trabajo y ciudad. Las fotos pueden llegar después por mensaje. Si es emergencia, el botón de llamar gana al formulario.</p>`,
      },
      {
        h2: "Cómo lo armamos en Kinexis",
        html: `<p>Empezamos con una vista previa gratis de la página de inicio en 2 días hábiles, sin tarjeta y sin obligación. Cuando apruebas y envías el contenido que falta, el sitio completo suele salir en 5 días hábiles — lo confirmamos por escrito.</p><p>Hay cuatro planes: Website, Lead System (pedidos de reseña y texto opcional si no contestas), Plus (ese seguimiento en inglés y español) y Own It (un pago, archivos tuyos desde el lanzamiento). El detalle está en Precios.</p><p>Mira <a href="/web-design">diseño web</a>, las <a href="/industries">industrias</a> o pide tu vista previa en <a href="/contact">/contact</a>. Compara planes en <a href="/pricing">/pricing</a>.</p>`,
      },
    ],
  },
  "pagina-web-para-plomeros": {
    seoTitle: "Qué debe tener una página web para plomeros",
    sections: [
      {
        h2: "Primera pantalla: trabajo, zona, teléfono",
        html: `<p>En el celular, el titular nombra el trabajo — fugas, drenajes, calentadores — no un eslogan genérico. El número va arriba, con un toque para llamar. Al lado, las ciudades que de verdad cubres y el horario que sí cumples.</p><p>Si anuncias 24 horas y nadie contesta de noche, las reseñas lo van a decir. Mejor un horario honesto que una promesa que enoja al cliente a las dos de la mañana.</p>`,
      },
      {
        h2: "Separa la urgencia de la cotización",
        html: `<p>Una tubería reventada y un cambio de calentador no comparten comprador. Juntarlos en una sola página hace más difíciles las dos búsquedas.</p><ul><li><strong>Fugas y emergencias</strong> — teléfono grande, qué hacer mientras llega alguien, horario real.</li><li><strong>Drenajes</strong> — camino aparte para tapones y cámara, sin mezclarlo con calentadores.</li><li><strong>Calentadores</strong> — reparación o cambio, marcas que instalas, forma clara de pedir cotización.</li></ul><p>El detalle de esas páginas está también en <a href="/blog/plumbing-website-pages">qué páginas necesita un sitio de plomería</a> y en el <a href="/industries/plumbing">hub de plomería</a>.</p>`,
      },
      {
        h2: "Confianza antes de marcar",
        html: `<p>Licencia y seguro, si aplica, van cerca del teléfono. Fotos de trabajos tuyos — no de un banco de imágenes. Reseñas de Google visibles, no escondidas al final.</p><p>El formulario pide poco: nombre, teléfono y el problema. Quien está parado en un charco no va a subir planos. Quien planea un calentador puede mandar fotos después.</p>`,
      },
      {
        h2: "Precio y siguiente paso",
        html: `<p>Con Kinexis empiezas con Website, Lead System (reseñas y texto opcional), Plus (inglés y español) u Own It (un pago). Primero ves una vista previa gratis del inicio (2 días hábiles, sin tarjeta). El detalle de cada plan está en <a href="/blog/plumber-website-cost">cuánto cuesta un sitio de plomería</a>. <a href="/contact">Pide tu vista previa</a> o compara en <a href="/pricing">/pricing</a>.</p>`,
      },
    ],
  },
  "como-pedir-resenas-en-google": {
    sections: [
      {
        h2: "Consigue el enlace (o el código QR)",
        html: `<p>No le pidas al cliente que “te busque en Google”. Dale un enlace que abra directo el formulario de reseña de tu Perfil de Negocio de Google.</p><p>Entra al perfil con la cuenta que lo administra → <strong>Leer reseñas</strong> → <strong>Consigue más reseñas</strong>. Copia el enlace. El código QR, según Google, se descarga desde la computadora (clic derecho → guardar imagen).</p><p>También puedes armar el enlace con tu Place ID en la <a href="/tools/google-review-link-qr">herramienta de enlace y QR de reseñas</a> (disponible en inglés en el sitio). Prueba el enlace en un celular que no sea el tuyo de propietario.</p>`,
      },
      {
        h2: "Cuándo pedirlo",
        html: `<p>Cuando el trabajo terminó y el cliente ya ve el resultado. Suele ser:</p><ul><li>En la camioneta, al repasar lo que se arregló</li><li>Por texto el mismo día que cerraste el trabajo</li><li>Por correo, si así se comunican con ustedes</li></ul><p>En rutas semanales (césped, piscina, limpieza), pide después de una visita que salió bien — no cada semana a la misma casa.</p><p>En <strong>Lead System</strong> y <strong>Plus</strong>, Kinexis puede enviar el pedido de reseña después del trabajo con el enlace a tu perfil. Website y Own It base no incluyen ese envío automático. Plus lo puede mandar en inglés y en español.</p>`,
      },
      {
        h2: "Guión en la puerta",
        html: `<p>Corto. Una pregunta. Un siguiente paso.</p><blockquote><p>«Gracias por recibirnos hoy. Si quedó bien el trabajo, una reseña en Google le ayuda al siguiente cliente a encontrarnos. ¿Te mando el enlace por texto?»</p></blockquote><p>Si dice que sí, mándalo antes de salir de la calle. Si duda, paras. No insistas.</p><p><strong>Si pregunta por qué:</strong></p><blockquote><p>«La gente nueva revisa Google antes de llamar. Una reseña corta de un trabajo real es lo más útil que puede dejar.»</p></blockquote>`,
      },
      {
        h2: "Textos listos para copiar",
        html: `<p>Cambia lo que está entre corchetes. Un solo enlace. No mezcles el pedido de reseña con una disputa de factura.</p><p><strong>El mismo día</strong></p><blockquote><p>Hola [Nombre], soy [Tu nombre] de [Empresa]. Gracias otra vez por el trabajo de hoy. Si te parece bien, aquí va el enlace para reseña en Google: [enlace]. Responde STOP para no recibir más textos.</p></blockquote><p><strong>Al día siguiente (solo si en la puerta dijo que sí y se te olvidó el enlace)</strong></p><blockquote><p>Hola [Nombre], te dejo el enlace de reseña en Google que te comenté: [enlace]. Sin presión si estás ocupado. —[Empresa]</p></blockquote><p><strong>Ruta / servicio recurrente</strong></p><blockquote><p>Hola [Nombre], gracias por otra visita esta temporada. Si el equipo te facilitó las cosas, una reseña en Google ayuda a los vecinos a encontrarnos: [enlace].</p></blockquote>`,
      },
      {
        h2: "Correo corto",
        html: `<p><strong>Asunto:</strong> Un favor rápido si el trabajo quedó bien</p><blockquote><p>Hola [Nombre],<br />Gracias por elegir a [Empresa] para [tipo de trabajo] el [fecha].<br />Si el trabajo cumplió lo que esperabas, una reseña en Google ayuda a otros a decidir a quién llamar. Aquí va el enlace directo: [enlace].<br />Gracias por tu tiempo, de cualquier forma.<br />[Tu nombre]<br />[Empresa] · [teléfono]</p></blockquote>`,
      },
      {
        h2: "Lo que no debes hacer",
        html: `<ul><li>No escribas la reseña tú y le pidas que la pegue.</li><li>No ofrezcas dinero, descuento ni trabajo gratis a cambio de cinco estrellas.</li><li>No pidas solo reseñas positivas ni desanimes las negativas.</li><li>No uses fotos de trabajos ajenos en el sitio como si fueran tuyos.</li></ul><p>Pocas reseñas honestas ganan a un montón inventadas. Si hoy tienes pocas, sigue pidiendo después de trabajos terminados: el conteo crece con trabajo real.</p><p>Más contexto en <a href="/blog/build-trust-with-reviews">cómo conseguir reseñas sin perseguir a la gente</a>. <a href="/contact">Vista previa gratis del inicio</a> o planes en <a href="/pricing">/pricing</a>.</p>`,
      },
    ],
  },
  "how-to-ask-for-google-reviews-contractor": {
    seoTitle: "Cómo pedir reseñas de Google (guiones para contratistas)",
    sections: [
      {
        h2: "Pide en el momento correcto",
        html: `<p>Esta guía trae guiones listos para la obra, el texto y el correo. Úsalos tal cual o cambia el nombre de tu empresa. No inventes reseñas, no las compres y no publiques fotos de trabajos ajenos como propios.</p><p>Pide o envía el mensaje cuando el trabajo terminó y el cliente ya ve el resultado.</p><p>En <strong>Lead System</strong> y <strong>Plus</strong>, Kinexis puede enviar el pedido de reseña después del trabajo con el enlace a tu perfil. Website y Own It base no incluyen ese envío automático.</p>`,
      },
      {
        h2: "Guión en la obra (dilo en voz alta)",
        html: `<p>Corto. Una sola petición. Un siguiente paso.</p><blockquote><p>«Gracias por recibirnos hoy. Si el trabajo quedó bien, una reseña en Google ayuda al siguiente cliente a encontrarnos. Te puedo mandar el enlace por texto — ¿cuál es el mejor número?»</p></blockquote><p>Si dice que sí, mándalo antes de salir. Si duda, paras. No presiones.</p>`,
      },
      {
        h2: "Textos para copiar y enviar",
        html: `<p>Cambia lo que está entre corchetes. Un solo enlace que abra el flujo de reseña. Arma el enlace con la <a href="/tools/google-review-link-qr">herramienta de enlace y QR</a>.</p><p><strong>El mismo día</strong></p><blockquote><p>Hola [Nombre], soy [Tu nombre] de [Empresa]. Gracias otra vez por el trabajo de hoy. Si te parece, aquí va el enlace de reseña en Google: [enlace]. Responde STOP para no recibir más textos.</p></blockquote>`,
      },
      {
        h2: "Correo",
        html: `<p><strong>Asunto:</strong> Un favor rápido si el trabajo quedó bien</p><blockquote><p>Hola [Nombre],<br />Gracias por elegir a [Empresa] para [tipo de trabajo] el [fecha].<br />Si el trabajo cumplió lo que esperabas, una reseña en Google ayuda a otros dueños a decidir a quién llamar. Aquí va el enlace directo: [enlace].<br />Gracias por tu tiempo, de cualquier forma.<br />[Tu nombre]<br />[Empresa] · [teléfono]</p></blockquote>`,
      },
      {
        h2: "Lo que no debes hacer",
        html: `<ul><li>No escribas la reseña tú y le pidas que la pegue.</li><li>No ofrezcas pago, descuento ni trabajo gratis a cambio de cinco estrellas.</li><li>No uses fotos de stock de trabajos ajenos como si fueran tuyos.</li><li>No anuncies 24/7 en Google si nadie contesta fuera de horario.</li></ul>`,
      },
      {
        h2: "Haz el enlace fácil",
        html: `<p>Usa un enlace directo (o un QR). Lead System y Plus envían ese tipo de pedido después del trabajo.</p><p>Ver también <a href="/blog/build-trust-with-reviews">cómo conseguir reseñas sin perseguir a la gente</a> y <a href="/blog/como-pedir-resenas-en-google">cómo pedir reseñas en Google</a>.</p><p><a href="/contact">Pide una vista previa gratis del inicio</a> o compara planes en <a href="/pricing">/pricing</a>.</p>`,
      },
    ],
  },
  "missed-call-text-delayed-10dlc": {
    seoTitle: "Por qué se retrasan los textos de llamada perdida",
    sections: [
      {
        h2: "Lo que dice el sitio hoy",
        html: `<p>El texto de llamada perdida es un <strong>extra opcional</strong>. Se necesita una <strong>línea dedicada de la empresa</strong>. Puede haber un segundo número de seguimiento y tarifas del operador.</p><p><strong>La activación depende de la aprobación del operador (normalmente 10 a 15 días). Esa aprobación no está garantizada.</strong> Los textos suelen empezar <strong>10 a 15 días después de la aprobación</strong>.</p>`,
      },
      {
        h2: "Por qué les importa a los operadores",
        html: `<p>Los operadores intentan limitar el spam. Espera una ventana de aprobación medida en <strong>días</strong>, no en minutos, y no prometas fecha de inicio hasta que llegue la aprobación.</p>`,
      },
      {
        h2: "Qué decirle al dueño antes del lanzamiento",
        html: `<ol><li><strong>Agenda tiempo en el calendario.</strong></li><li><strong>Usa una línea dedicada de la empresa.</strong></li><li><strong>No anuncies “texto al instante”</strong> hasta que los textos estén saliendo.</li><li><strong>Sigue contestando el teléfono.</strong></li></ol>`,
      },
      {
        h2: "Cómo encaja en los planes",
        html: `<p>En Website y Own It, el texto es un extra. En Lead System y Plus, el seguimiento usa un segundo número cuando lo activas, más tarifas del operador. Plus puede correr en inglés y español.</p><p>Borradores en <a href="/blog/missed-call-text-back-templates">plantillas de texto por llamada perdida</a>. <a href="/pricing">Ver planes</a> o <a href="/contact">pide una vista previa gratis</a>.</p>`,
      },
    ],
  },
  "google-business-profile-vs-website": {
    sections: [
      {
        h2: "Respuesta corta",
        html: `<p>Para la mayoría de negocios de servicios al hogar: <strong>el perfil y el sitio hacen trabajos distintos.</strong> Bastantes dueños necesitan los dos.</p>`,
      },
      {
        h2: "En qué es bueno el Perfil de Negocio de Google",
        html: `<ul><li>Mostrarte en el paquete de mapas cuando alguien busca cerca</li><li>Recibir y mostrar reseñas de Google</li><li>Publicar horario, zona y fotos reales</li><li>Dejar llamar con un toque desde los resultados</li></ul><p>Lead System y Plus incluyen un ajuste del perfil en el lanzamiento. Plus también incluye dos publicaciones al mes.</p>`,
      },
      {
        h2: "Para qué sigue sirviendo un sitio",
        html: `<ul><li>Páginas separadas para trabajos distintos</li><li>Una página honesta de zona</li><li>Proceso, licencias y fotos tuyas</li><li>Formulario de cotización</li><li>Página de aterrizaje para anuncios y referidos</li></ul><p><strong>El SEO continuo no forma parte de los cuatro planes del sitio</strong>; se cotiza aparte.</p>`,
      },
      {
        h2: "Cuándo el perfil solo puede esperar",
        html: `<p>Puedes posponer un sitio completo si ya te llegan más llamadas de las que puedes agendar, el perfil está correcto y no corres anuncios que necesiten una página de aterrizaje. Mantén el perfil honesto.</p>`,
      },
      {
        h2: "Cuándo necesitas los dos",
        html: `<p>Suma o mejora un sitio cuando trabajos distintos necesitan páginas distintas, quieres seguimiento de reseñas o llamada perdida, necesitas inglés y español, o quieres una vista previa gratis del inicio antes de elegir plan.</p><p>Mantén <strong>nombre, teléfono, horario y zona consistentes</strong> entre el perfil y el sitio.</p><p>Explora los <a href="/industries">hubs por industria</a>, compara <a href="/pricing">planes</a> o <a href="/contact">pide una vista previa gratis</a>.</p>`,
      },
    ],
  },
  "freelancer-vs-agency-vs-subscription-website": {
    sections: [
      {
        h2: "Qué necesita de verdad un sitio de una camioneta",
        html: `<p>Elige según flujo de caja, frecuencia de cambios y a quién quieres llamar cuando algo se rompe: móvil con número visible, páginas por trabajo, zona honesta, hosting y cambios, seguimiento opcional después.</p>`,
      },
      {
        h2: "Freelancer",
        html: `<p><strong>Suele encajar cuando</strong> tienes alcance claro y alguien que pueda encargarse del hosting después. Pide por escrito dominio, hosting, cambios y qué te queda al terminar.</p>`,
      },
      {
        h2: "Agencia",
        html: `<p><strong>Suele encajar cuando</strong> necesitas un build grande o un retainer amplio. Pide por escrito qué incluye el retainer, plazo e informes. Nadie puede prometer una posición concreta en Google.</p>`,
      },
      {
        h2: "Plan de sitio estructurado (ejemplo: Kinexis)",
        html: `<p>Kinexis publica cuatro opciones: Website, Lead System, Plus (bilingüe) y Own It. Los planes mensuales son sin entrada, mes a mes, cancela cuando quieras, sin cargo por cancelar, con precio fijo 24 meses. Todos incluyen devolución en 30 días y empiezan con una vista previa gratis del inicio en 2 días hábiles.</p><p>Mira <a href="/web-design">diseño web</a> y <a href="/faqs">preguntas</a>.</p>`,
      },
      {
        h2: "Cómo elegir sin lenguaje de miedo",
        html: `<ul><li><strong>Poco efectivo + hosting resuelto:</strong> plan mensual.</li><li><strong>Un pago y tú manejas hosting:</strong> freelancer u Own It.</li><li><strong>Programa grande a medida:</strong> agencia — alcance por escrito.</li></ul><p>Compara planes en <a href="/pricing">/pricing</a> o <a href="/contact">empieza con una vista previa gratis</a>.</p>`,
      },
    ],
  },
  "wix-vs-squarespace-vs-managed-website-contractors": {
    sections: [
      {
        h2: "Qué hacen bien los constructores DIY",
        html: `<ul><li>Experimentas de noche sin esperar a un diseñador</li><li>Las plantillas ponen una página en línea rápido</li><li>Tú controlas la cuenta día a día</li></ul>`,
      },
      {
        h2: "Dónde se traban los dueños de oficios",
        html: `<ul><li>Páginas de servicio, zona y llamada en móvil siguen tomando horas</li><li>Hosting y retoques caen en ti en temporada alta</li><li>Seguimiento de llamadas y reseñas casi siempre significa otras herramientas</li></ul>`,
      },
      {
        h2: "Para qué sirve un plan administrado",
        html: `<p>Encaja cuando prefieres estar en el trabajo antes que en el editor. Ejemplo Kinexis: vista previa gratis en 2 días hábiles; cuatro planes (Website, Lead System, Plus u Own It); hosting y cambios en planes mensuales; reseñas y texto opcional en Lead System/Plus (aprobación del operador normalmente 10 a 15 días; no garantizada).</p>`,
      },
      {
        h2: "Lista para decidir",
        html: `<ol><li><strong>Tiempo</strong> — ¿terminas las páginas este mes?</li><li><strong>Llamada en móvil</strong> — ¿se puede tocar arriba?</li><li><strong>Seguimiento</strong> — ¿necesitas texto o reseñas?</li><li><strong>Salida</strong> — ¿qué pasa con dominio y archivos? Pídelo por escrito.</li><li><strong>Idioma</strong> — ¿necesitas inglés y español?</li></ol><p>Compara en <a href="/pricing">/pricing</a> y <a href="/contact">pide una vista previa gratis</a>.</p>`,
      },
    ],
  },
  "google-business-profile-checklist": {
    sections: [
      {
        h2: "Reclama y verifica",
        html: `<p>Busca el nombre de tu negocio en Google. Si ya hay un perfil, pide la propiedad. Si no, créalo. Termina la verificación antes de invertir tiempo en fotos o publicaciones.</p>`,
      },
      {
        h2: "Categorías, horario y zona",
        html: `<ul><li><strong>Categoría principal</strong> — el oficio más cercano.</li><li><strong>Horario</strong> — las horas en que alguien te puede alcanzar.</li><li><strong>Zona de servicio</strong> — ciudades que tu cuadrilla sí cubre.</li></ul>`,
      },
      {
        h2: "Fotos y servicios",
        html: `<p>Sube fotos reales de trabajos. Agrega los servicios que la gente busca. Una descripción corta que nombre el trabajo y las ciudades gana a un eslogan genérico.</p>`,
      },
      {
        h2: "Reseñas y enlace directo",
        html: `<p>Consigue el enlace directo desde el perfil o con la <a href="/tools/google-review-link-qr">herramienta de enlace y QR</a>. En Lead System y Plus, Kinexis puede enviar el pedido después del trabajo.</p>`,
      },
      {
        h2: "Cuándo el perfil no alcanza",
        html: `<p>Suma un sitio cuando trabajos distintos necesitan páginas distintas, los anuncios necesitan una URL o quieres inglés y español. Lee <a href="/blog/google-business-profile-vs-website">Perfil de Negocio de Google vs sitio web</a>.</p><p>Compara planes en <a href="/pricing">/pricing</a> o <a href="/contact">pide una vista previa gratis</a>.</p>`,
      },
    ],
  },
};

/** Regenera con: node scripts/generate-es-trade-bodies.mjs */
import type { EsPost } from "@/i18n/posts-es";

export type EsPagesPostBody = {
  lead: string;
  sections: { h2: string; html: string }[];
  faqs?: { q: string; a: string }[];
};

/** Generated native es-419 pages post bodies keyed by blog slug. */
export const GENERATED_ES_PAGES_BODIES: Record<string, EsPagesPostBody> = {
  "plumbing-website-pages": {
    "lead": "Quien visita el sitio de un plomero necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Separa fugas, drenajes y calentadores para que el tráfico de emergencia y de cotización no se mezcle.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/plumbing\">página de plomería</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/plumber-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de plomería",
        "html": "<p>Las búsquedas de plomería se parten entre pánico y planeación. Una tubería rota quiere un número grande y horario honesto. Una cotización de calentador quiere un formulario corto y marcas que sí instalas. Si esos caminos comparten una página vaga, los dos visitantes dudan — y a Google le cuesta emparejar la consulta correcta.</p><p>Dale a fugas, drenajes y calentadores su propia página. Rutas de emergencia lideran con llamada. Páginas de estimado respiran con fotos de prueba y un formulario de nombre, teléfono, tipo de trabajo y ciudad — nada más en el primer paso.</p><p>Consulta la <a href=\"/industries/plumbing\">página de plomería</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Preferred Plumbing Solutions tiene un sitio de plomería en vivo. Su página de inicio destaca Spirit Lake, muestra el teléfono y ofrece solicitar una cotización gratis. También presenta información sobre licencias y separa las reparaciones, la calefacción radiante, los sistemas sin tanque, los drenajes y la obra nueva. Puedes ver el ejemplo en la <a href=\"/industries/plumbing\">página de plomería</a>.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Qué páginas debe tener el sitio de un plomero?",
        "a": "Inicio, servicios para fugas, drenajes y calentadores, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad."
      },
      {
        "q": "¿Necesito una página por cada ciudad?",
        "a": "No. Una página honesta de zona gana a docenas de páginas casi iguales que solo cambian el pueblo."
      },
      {
        "q": "¿Emergencia y estimado deben compartir una página?",
        "a": "Casi nunca. Da a trabajos urgentes un camino con teléfono y a trabajos planeados un formulario corto para que el siguiente paso coincida con la intención de búsqueda."
      },
      {
        "q": "¿Cómo se relacionan los planes Kinexis con el conteo de páginas?",
        "a": "Website incluye hasta 5 páginas, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Empieza con vista previa gratis del inicio — sin tarjeta."
      },
      {
        "q": "¿Por dónde empiezo si mi sitio hoy es un desastre?",
        "a": "Arregla la primera pantalla del inicio, luego tus tres páginas de servicio principales, luego la página de zona. Agrega extras solo cuando esas conviertan."
      }
    ]
  },
  "hvac-website-pages": {
    "lead": "Quien visita el sitio de un negocio de HVAC necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Mantén reparación, cambio de equipo y mantenimiento en caminos separados para que el trabajo de temporada baja siga visible.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/hvac\">página de HVAC</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/hvac-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de HVAC",
        "html": "<p>En temporada de calor, quien se quedó sin aire necesita encontrar cómo pedir una reparación. En los meses más tranquilos, una página de mantenimiento o reemplazo puede ayudar a generar consultas. Mantén esos servicios separados. Incluye información de financiamiento solo si realmente lo ofreces y explica con claridad cualquier precio «desde».</p><p>Consulta la <a href=\"/industries/hvac\">página de HVAC</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Qué páginas debe tener el sitio de un negocio de HVAC?",
        "a": "Inicio, servicios para sin aire, cambio y mantenimiento, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad."
      },
      {
        "q": "¿Necesito una página por cada ciudad?",
        "a": "No. Una página honesta de zona gana a docenas de páginas casi iguales que solo cambian el pueblo."
      },
      {
        "q": "¿Emergencia y estimado deben compartir una página?",
        "a": "Casi nunca. Da a trabajos urgentes un camino con teléfono y a trabajos planeados un formulario corto para que el siguiente paso coincida con la intención de búsqueda."
      },
      {
        "q": "¿Cómo se relacionan los planes Kinexis con el conteo de páginas?",
        "a": "Website incluye hasta 5 páginas, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Empieza con vista previa gratis del inicio — sin tarjeta."
      },
      {
        "q": "¿Por dónde empiezo si mi sitio hoy es un desastre?",
        "a": "Arregla la primera pantalla del inicio, luego tus tres páginas de servicio principales, luego la página de zona. Agrega extras solo cuando esas conviertan."
      }
    ]
  },
  "electrician-website-pages": {
    "lead": "Quien visita el sitio de un electricista necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Muestra confianza de licencia temprano y da a cargadores EV su propia página cuando ese trabajo es real.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/electrical\">página de electricidad</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/electrician-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de electricidad",
        "html": "<p>Quien compra electricidad compara confianza tanto como precio. Muestra licencia temprano — cerca del teléfono, no tres scrolls abajo. Tableros, diagnóstico y cargadores EV son trabajos distintos con urgencia distinta. Si instalas cargadores, esa página merece camino de revisión en sitio. Si huele a quemado, la página debe gritar llamar — no invitar a leer folleto largo.</p><p>Consulta la <a href=\"/industries/electrical\">página de electricidad</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Qué páginas debe tener el sitio de un electricista?",
        "a": "Inicio, servicios para tableros, cargadores EV y diagnóstico, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad."
      },
      {
        "q": "¿Necesito una página por cada ciudad?",
        "a": "No. Una página honesta de zona gana a docenas de páginas casi iguales que solo cambian el pueblo."
      },
      {
        "q": "¿Emergencia y estimado deben compartir una página?",
        "a": "Casi nunca. Da a trabajos urgentes un camino con teléfono y a trabajos planeados un formulario corto para que el siguiente paso coincida con la intención de búsqueda."
      },
      {
        "q": "¿Cómo se relacionan los planes Kinexis con el conteo de páginas?",
        "a": "Website incluye hasta 5 páginas, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Empieza con vista previa gratis del inicio — sin tarjeta."
      },
      {
        "q": "¿Por dónde empiezo si mi sitio hoy es un desastre?",
        "a": "Arregla la primera pantalla del inicio, luego tus tres páginas de servicio principales, luego la página de zona. Agrega extras solo cuando esas conviertan."
      }
    ]
  },
  "roofing-website-pages": {
    "lead": "Quien visita el sitio de un negocio de techos necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Separa reparación y cambio completo, y describe proceso de seguro sin prometer resultados de reclamación.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/roofing\">página de techos</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/roofing-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de techos",
        "html": "<p>Tras el granizo, el dueño quiere ventana de inspección — no novela de marcas de teja. Separa reparación de cambio completo. Puedes explicar cómo documentas daño para seguro sin prometer resultados que no controlas. Formulario corto de inspección: nombre, teléfono, zona de dirección y fotos si es seguro. Fugas activas siguen mereciendo el teléfono sobre todo.</p><p>Consulta la <a href=\"/industries/roofing\">página de techos</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Qué páginas debe tener el sitio de un negocio de techos?",
        "a": "Inicio, servicios para reparaciones, cambios y llamadas por tormenta, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad."
      },
      {
        "q": "¿Necesito una página por cada ciudad?",
        "a": "No. Una página honesta de zona gana a docenas de páginas casi iguales que solo cambian el pueblo."
      },
      {
        "q": "¿Emergencia y estimado deben compartir una página?",
        "a": "Casi nunca. Da a trabajos urgentes un camino con teléfono y a trabajos planeados un formulario corto para que el siguiente paso coincida con la intención de búsqueda."
      },
      {
        "q": "¿Cómo se relacionan los planes Kinexis con el conteo de páginas?",
        "a": "Website incluye hasta 5 páginas, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Empieza con vista previa gratis del inicio — sin tarjeta."
      },
      {
        "q": "¿Por dónde empiezo si mi sitio hoy es un desastre?",
        "a": "Arregla la primera pantalla del inicio, luego tus tres páginas de servicio principales, luego la página de zona. Agrega extras solo cuando esas conviertan."
      }
    ]
  },
  "garage-door-website-pages": {
    "lead": "Quien visita el sitio de un negocio de puertas de garaje necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Rutas de resorte/motor de emergencia deben liderar con teléfono; páginas de puerta nueva pueden usar formulario corto de medidas.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/garage-doors\">página de puertas de garaje</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/garage-door-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de puertas de garaje",
        "html": "<p>Una puerta atascada a las 7 a.m. no es el mismo comprador que alguien cotizando doble nuevo para remodelar el garaje. Resortes y motores necesitan ruta de reparación con teléfono. Puertas nuevas pueden usar formulario corto (sencilla/doble, material si se sabe, ciudad). Una página vaga de “servicios de garaje” hace trabajar demasiado a los dos.</p><p>Consulta la <a href=\"/industries/garage-doors\">página de puertas de garaje</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Qué páginas debe tener el sitio de un negocio de puertas de garaje?",
        "a": "Inicio, servicios para resortes, motores y puertas nuevas, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad."
      },
      {
        "q": "¿Necesito una página por cada ciudad?",
        "a": "No. Una página honesta de zona gana a docenas de páginas casi iguales que solo cambian el pueblo."
      },
      {
        "q": "¿Emergencia y estimado deben compartir una página?",
        "a": "Casi nunca. Da a trabajos urgentes un camino con teléfono y a trabajos planeados un formulario corto para que el siguiente paso coincida con la intención de búsqueda."
      },
      {
        "q": "¿Cómo se relacionan los planes Kinexis con el conteo de páginas?",
        "a": "Website incluye hasta 5 páginas, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Empieza con vista previa gratis del inicio — sin tarjeta."
      },
      {
        "q": "¿Por dónde empiezo si mi sitio hoy es un desastre?",
        "a": "Arregla la primera pantalla del inicio, luego tus tres páginas de servicio principales, luego la página de zona. Agrega extras solo cuando esas conviertan."
      }
    ]
  },
  "painting-website-pages": {
    "lead": "Quien visita el sitio de un contratista de pintura necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Separa interior, exterior y gabinetes, y mantén el formulario de estimado corto.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/painting\">página de pintura</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/painting-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de pintura",
        "html": "<p>Interior, exterior y gabinetes se venden distinto. Exterior quiere historias y notas de revestimiento; gabinetes quieren fotos de cajones; interior quiere conteo de cuartos sin formulario de veinte campos. Separa páginas, mantén la petición de estimado corta y deja fotos para después por mensaje cuando confirmes encaje.</p><p>Consulta la <a href=\"/industries/painting\">página de pintura</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Qué páginas debe tener el sitio de un contratista de pintura?",
        "a": "Inicio, servicios para interior, exterior y gabinetes, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad."
      },
      {
        "q": "¿Necesito una página por cada ciudad?",
        "a": "No. Una página honesta de zona gana a docenas de páginas casi iguales que solo cambian el pueblo."
      },
      {
        "q": "¿Emergencia y estimado deben compartir una página?",
        "a": "Casi nunca. Da a trabajos urgentes un camino con teléfono y a trabajos planeados un formulario corto para que el siguiente paso coincida con la intención de búsqueda."
      },
      {
        "q": "¿Cómo se relacionan los planes Kinexis con el conteo de páginas?",
        "a": "Website incluye hasta 5 páginas, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Empieza con vista previa gratis del inicio — sin tarjeta."
      },
      {
        "q": "¿Por dónde empiezo si mi sitio hoy es un desastre?",
        "a": "Arregla la primera pantalla del inicio, luego tus tres páginas de servicio principales, luego la página de zona. Agrega extras solo cuando esas conviertan."
      }
    ]
  },
  "remodeling-website-pages": {
    "lead": "Quien visita el sitio de un contratista de remodelación necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Lidera con cuartos terminados y camino de consulta en lugar de lenguaje de llamada de emergencia.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/remodeling\">página de remodelación</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/remodeling-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de remodelación",
        "html": "<p>La remodelación rara vez es llamada de la misma hora. Lidera con cuartos que sí construiste y camino de consulta — no banner de emergencia copiado de plantilla de plomero. Cocinas y baños merecen páginas propias. Una nota corta de proceso (recorrido → alcance → calendario) calma compradores más que un “LLAMA YA” que no coincide con cómo vendes.</p><p>Consulta la <a href=\"/industries/remodeling\">página de remodelación</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Qué páginas debe tener el sitio de un contratista de remodelación?",
        "a": "Inicio, servicios para cocinas, baños y otras remodelaciones que vendes, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad."
      },
      {
        "q": "¿Necesito una página por cada ciudad?",
        "a": "No. Una página honesta de zona gana a docenas de páginas casi iguales que solo cambian el pueblo."
      },
      {
        "q": "¿Emergencia y estimado deben compartir una página?",
        "a": "Casi nunca. Da a trabajos urgentes un camino con teléfono y a trabajos planeados un formulario corto para que el siguiente paso coincida con la intención de búsqueda."
      },
      {
        "q": "¿Cómo se relacionan los planes Kinexis con el conteo de páginas?",
        "a": "Website incluye hasta 5 páginas, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Empieza con vista previa gratis del inicio — sin tarjeta."
      },
      {
        "q": "¿Por dónde empiezo si mi sitio hoy es un desastre?",
        "a": "Arregla la primera pantalla del inicio, luego tus tres páginas de servicio principales, luego la página de zona. Agrega extras solo cuando esas conviertan."
      }
    ]
  },
  "landscaping-website-pages": {
    "lead": "Quien visita el sitio de un negocio de paisajismo necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Separa el mantenimiento semanal de los proyectos de diseño y construcción para dirigir cada consulta al servicio adecuado.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/landscaping\">página de paisajismo</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/landscaping-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de paisajismo",
        "html": "<p>Quien busca mantenimiento semanal necesita saber si su casa está dentro de la ruta. Quien planea un patio quiere ver proyectos terminados y solicitar una consulta. Separa esas opciones. Para las limpiezas de temporada, pregunta por la ciudad y la semana que prefiere el cliente; usa fotos de jardines que tu equipo haya trabajado.</p><p>Consulta la <a href=\"/industries/landscaping\">página de paisajismo</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>A1 Property Services tiene un sitio de paisajismo en vivo. La página de inicio destaca Cedar Falls, separa el cuidado del césped de los proyectos de patios y muestra fotos del antes y después de trabajos reales. También indica las zonas que atiende en el condado de Black Hawk. Consulta estos ejemplos en la <a href=\"/industries/landscaping\">página de paisajismo</a>.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Qué páginas debe tener el sitio de un negocio de paisajismo?",
        "a": "Inicio, servicios para mantenimiento y diseño-obra, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad."
      },
      {
        "q": "¿Necesito una página por cada ciudad?",
        "a": "No. Una página honesta de zona gana a docenas de páginas casi iguales que solo cambian el pueblo."
      },
      {
        "q": "¿Emergencia y estimado deben compartir una página?",
        "a": "Casi nunca. Da a trabajos urgentes un camino con teléfono y a trabajos planeados un formulario corto para que el siguiente paso coincida con la intención de búsqueda."
      },
      {
        "q": "¿Cómo se relacionan los planes Kinexis con el conteo de páginas?",
        "a": "Website incluye hasta 5 páginas, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Empieza con vista previa gratis del inicio — sin tarjeta."
      },
      {
        "q": "¿Por dónde empiezo si mi sitio hoy es un desastre?",
        "a": "Arregla la primera pantalla del inicio, luego tus tres páginas de servicio principales, luego la página de zona. Agrega extras solo cuando esas conviertan."
      }
    ]
  },
  "pool-service-website-pages": {
    "lead": "Quien visita el sitio de un servicio de albercas necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Destaca el teléfono para las reparaciones urgentes y mantén las rutas de servicio separadas de los planes de membresía.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la página de albercas para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/pool-service-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de albercas",
        "html": "<p>Quien tiene una alberca verde necesita encontrar el teléfono y saber cuándo responderás. Para las rutas semanales, usa un formulario breve que pregunte el código postal, el día preferido y si la alberca ya se puede usar. Mantén las reparaciones separadas de las membresías.</p><p>Consulta la página de albercas para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Qué páginas debe tener el sitio de un servicio de albercas?",
        "a": "Inicio, servicios para rutas semanales, reparaciones y equipo, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad."
      },
      {
        "q": "¿Necesito una página por cada ciudad?",
        "a": "No. Una página honesta de zona gana a docenas de páginas casi iguales que solo cambian el pueblo."
      },
      {
        "q": "¿Emergencia y estimado deben compartir una página?",
        "a": "Casi nunca. Da a trabajos urgentes un camino con teléfono y a trabajos planeados un formulario corto para que el siguiente paso coincida con la intención de búsqueda."
      },
      {
        "q": "¿Cómo se relacionan los planes Kinexis con el conteo de páginas?",
        "a": "Website incluye hasta 5 páginas, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Empieza con vista previa gratis del inicio — sin tarjeta."
      },
      {
        "q": "¿Por dónde empiezo si mi sitio hoy es un desastre?",
        "a": "Arregla la primera pantalla del inicio, luego tus tres páginas de servicio principales, luego la página de zona. Agrega extras solo cuando esas conviertan."
      }
    ]
  },
  "pressure-washing-website-pages": {
    "lead": "Quien visita el sitio de un negocio de lavado a presión necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Separa los servicios por superficie y muestra fotos reales del antes y después.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/pressure-washing\">página de lavado a presión</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/pressure-washing-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de lavado a presión",
        "html": "<p>El lavado de casas, concreto y techos puede requerir métodos distintos. Separa esos servicios y muestra fotos reales del antes y después. Si usas lavado suave en ciertas superficies, explícalo para que el cliente sepa qué esperar.</p><p>Consulta la <a href=\"/industries/pressure-washing\">página de lavado a presión</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Qué páginas debe tener el sitio de un negocio de lavado a presión?",
        "a": "Inicio, servicios para casas, concreto y techos, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad."
      },
      {
        "q": "¿Necesito una página por cada ciudad?",
        "a": "No. Una página honesta de zona gana a docenas de páginas casi iguales que solo cambian el pueblo."
      },
      {
        "q": "¿Emergencia y estimado deben compartir una página?",
        "a": "Casi nunca. Da a trabajos urgentes un camino con teléfono y a trabajos planeados un formulario corto para que el siguiente paso coincida con la intención de búsqueda."
      },
      {
        "q": "¿Cómo se relacionan los planes Kinexis con el conteo de páginas?",
        "a": "Website incluye hasta 5 páginas, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Empieza con vista previa gratis del inicio — sin tarjeta."
      },
      {
        "q": "¿Por dónde empiezo si mi sitio hoy es un desastre?",
        "a": "Arregla la primera pantalla del inicio, luego tus tres páginas de servicio principales, luego la página de zona. Agrega extras solo cuando esas conviertan."
      }
    ]
  },
  "window-cleaning-website-pages": {
    "lead": "Quien visita el sitio de un negocio de limpieza de vidrios necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Separa vidrio residencial y comercial, y ofrece limpiezas recurrentes como siguiente paso normal.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la página de limpieza de vidrios para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/window-cleaning-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de limpieza de vidrios",
        "html": "<p>Los clientes residenciales pueden buscar limpiezas recurrentes; los negocios quizá necesiten coordinar el servicio antes de abrir. Explica cada opción por separado. En el formulario, pregunta el número aproximado de ventanas y la frecuencia para preparar una cotización.</p><p>Consulta la página de limpieza de vidrios para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Qué páginas debe tener el sitio de un negocio de limpieza de vidrios?",
        "a": "Inicio, servicios para casas y aparadores, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad."
      },
      {
        "q": "¿Necesito una página por cada ciudad?",
        "a": "No. Una página honesta de zona gana a docenas de páginas casi iguales que solo cambian el pueblo."
      },
      {
        "q": "¿Emergencia y estimado deben compartir una página?",
        "a": "Casi nunca. Da a trabajos urgentes un camino con teléfono y a trabajos planeados un formulario corto para que el siguiente paso coincida con la intención de búsqueda."
      },
      {
        "q": "¿Cómo se relacionan los planes Kinexis con el conteo de páginas?",
        "a": "Website incluye hasta 5 páginas, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Empieza con vista previa gratis del inicio — sin tarjeta."
      },
      {
        "q": "¿Por dónde empiezo si mi sitio hoy es un desastre?",
        "a": "Arregla la primera pantalla del inicio, luego tus tres páginas de servicio principales, luego la página de zona. Agrega extras solo cuando esas conviertan."
      }
    ]
  },
  "lawn-care-website-pages": {
    "lead": "Quien visita el sitio de un negocio de cuidado de césped necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Publica una zona honesta y da a desechos de mascotas su propia página solo cuando esa oferta es real.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la página de césped para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/lawn-care-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de césped",
        "html": "<p>El trabajo por rutas depende de una zona de servicio precisa. Indica los barrios que realmente atiendes. El corte semanal y la recolección de desechos de mascotas son servicios distintos; crea una página para este último solo si lo ofreces. En el formulario de limpieza estacional, pregunta por el código postal y la frecuencia para que el equipo pueda confirmar la cobertura.</p><p>Consulta la página de césped para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Qué páginas debe tener el sitio de un negocio de cuidado de césped?",
        "a": "Inicio, servicios para rutas de corte y limpiezas, zona, nosotros, reseñas y contacto. Evita páginas puerta finas por ciudad."
      },
      {
        "q": "¿Necesito una página por cada ciudad?",
        "a": "No. Una página honesta de zona gana a docenas de páginas casi iguales que solo cambian el pueblo."
      },
      {
        "q": "¿Emergencia y estimado deben compartir una página?",
        "a": "Casi nunca. Da a trabajos urgentes un camino con teléfono y a trabajos planeados un formulario corto para que el siguiente paso coincida con la intención de búsqueda."
      },
      {
        "q": "¿Cómo se relacionan los planes Kinexis con el conteo de páginas?",
        "a": "Website incluye hasta 5 páginas, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Empieza con vista previa gratis del inicio — sin tarjeta."
      },
      {
        "q": "¿Por dónde empiezo si mi sitio hoy es un desastre?",
        "a": "Arregla la primera pantalla del inicio, luego tus tres páginas de servicio principales, luego la página de zona. Agrega extras solo cuando esas conviertan."
      }
    ]
  },
  "junk-removal-website-pages": {
    "lead": "Quien visita el sitio de una empresa de retiro de chatarra necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Separa el acarreo rápido de las limpiezas planeadas: cada trabajo necesita un siguiente paso distinto.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/junk-removal\">página de retiro de chatarra</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/junk-removal-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio para retiro de chatarra",
        "html": "<p>El sitio falla cuando cada carga termina en una sola página de “retiramos de todo”. Un colchón en la banqueta necesita llamar y conocer una ventana realista. Una cochera o propiedad heredada requiere estimar volumen, acceso y quizá enviar fotos. Si ofreces ambos servicios, sepáralos. Las cargas recurrentes para caseros o asociaciones solo merecen una página si realmente manejas esas rutas.</p><p>Explica cuándo una foto basta para orientar y cuándo necesitas visitar para dar el precio final. No prometas servicio el mismo día fuera de tu zona o de tu horario. Consulta la página de <a href=\"/industries/junk-removal\">retiro de chatarra</a> para ver el enfoque del sitio.</p><p>Consulta la <a href=\"/industries/junk-removal\">página de retiro de chatarra</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Qué páginas debe tener el sitio de una empresa de retiro de chatarra?",
        "a": "Inicio; acarreo esta semana; limpiezas de cochera y propiedades heredadas; rutas recurrentes solo si existen; zona; nosotros; reseñas y contacto con teléfono y formulario breve. Evita páginas clonadas por ciudad."
      },
      {
        "q": "¿Necesito una página por cada ciudad?",
        "a": "No. Una página honesta de zona gana a docenas de páginas casi iguales que solo cambian el pueblo."
      },
      {
        "q": "¿Emergencia y estimado deben compartir una página?",
        "a": "Casi nunca. Da a trabajos urgentes un camino con teléfono y a trabajos planeados un formulario corto para que el siguiente paso coincida con la intención de búsqueda."
      },
      {
        "q": "¿Cómo se relacionan los planes Kinexis con el conteo de páginas?",
        "a": "Website incluye hasta 5 páginas, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Empieza con vista previa gratis del inicio — sin tarjeta."
      },
      {
        "q": "¿Por dónde empiezo si mi sitio hoy es un desastre?",
        "a": "Arregla la primera pantalla del inicio, luego tus tres páginas de servicio principales, luego la página de zona. Agrega extras solo cuando esas conviertan."
      }
    ]
  },
  "tree-service-website-pages": {
    "lead": "Quien visita el sitio de una empresa de servicio de árboles necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Separa poda, tala y emergencias por tormenta, con el teléfono y las señales de seguro fáciles de encontrar.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/tree-care\">página de servicio de árboles</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/tree-service-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio para árboles",
        "html": "<p>Un sitio de servicio de árboles se vuelve confuso cuando emergencias, podas y talas comparten un bloque genérico. Quien tiene una rama sobre el techo necesita llamar y saber cuándo responderás. Para un trabajo planeado, la persona quiere fotos reales de la cuadrilla, información de seguro y una consulta.</p><p>Dedica páginas a poda, tala y emergencias cuando sean servicios que ofreces. Incluye molienda de tocones solo si forma parte de tu trabajo. Muestra seguro y seguridad cerca del teléfono; limita la zona a donde realmente puedes enviar una cuadrilla. Consulta la página de <a href=\"/industries/tree-care\">servicio de árboles</a> para ver el enfoque del sitio.</p><p>Consulta la <a href=\"/industries/tree-care\">página de servicio de árboles</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Qué páginas debe tener el sitio de una empresa de servicio de árboles?",
        "a": "Inicio; poda; tala; atención de tormentas; seguro y seguridad cerca del teléfono; zona; nosotros; reseñas y contacto para consultas. Evita páginas clonadas por ciudad y promesas falsas de atención 24/7."
      },
      {
        "q": "¿Necesito una página por cada ciudad?",
        "a": "No. Una página honesta de zona gana a docenas de páginas casi iguales que solo cambian el pueblo."
      },
      {
        "q": "¿Emergencia y estimado deben compartir una página?",
        "a": "Casi nunca. Da a trabajos urgentes un camino con teléfono y a trabajos planeados un formulario corto para que el siguiente paso coincida con la intención de búsqueda."
      },
      {
        "q": "¿Cómo se relacionan los planes Kinexis con el conteo de páginas?",
        "a": "Website incluye hasta 5 páginas, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Empieza con vista previa gratis del inicio — sin tarjeta."
      },
      {
        "q": "¿Por dónde empiezo si mi sitio hoy es un desastre?",
        "a": "Arregla la primera pantalla del inicio, luego tus tres páginas de servicio principales, luego la página de zona. Agrega extras solo cuando esas conviertan."
      }
    ]
  },};

/** Full EsPost objects ready to spread into ES_POSTS. */
export const GENERATED_ES_PAGES_POSTS: Record<string, EsPost> = {
  "plumbing-website-pages": {
    "slug": "plumbing-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de plomería",
    "seoTitle": "Qué páginas necesita un sitio de plomería | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de plomería, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "Quien visita el sitio de un plomero necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Separa fugas, drenajes y calentadores para que el tráfico de emergencia y de cotización no se mezcle.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/plumbing\">página de plomería</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/plumber-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de plomería",
        "html": "<p>Las búsquedas de plomería se parten entre pánico y planeación. Una tubería rota quiere un número grande y horario honesto. Una cotización de calentador quiere un formulario corto y marcas que sí instalas. Si esos caminos comparten una página vaga, los dos visitantes dudan — y a Google le cuesta emparejar la consulta correcta.</p><p>Dale a fugas, drenajes y calentadores su propia página. Rutas de emergencia lideran con llamada. Páginas de estimado respiran con fotos de prueba y un formulario de nombre, teléfono, tipo de trabajo y ciudad — nada más en el primer paso.</p><p>Consulta la <a href=\"/industries/plumbing\">página de plomería</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Preferred Plumbing Solutions tiene un sitio de plomería en vivo. Su página de inicio destaca Spirit Lake, muestra el teléfono y ofrece solicitar una cotización gratis. También presenta información sobre licencias y separa las reparaciones, la calefacción radiante, los sistemas sin tanque, los drenajes y la obra nueva. Puedes ver el ejemplo en la <a href=\"/industries/plumbing\">página de plomería</a>.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "hvac-website-pages": {
    "slug": "hvac-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de HVAC",
    "seoTitle": "Qué páginas necesita un sitio de HVAC | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de HVAC, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "Quien visita el sitio de un negocio de HVAC necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Mantén reparación, cambio de equipo y mantenimiento en caminos separados para que el trabajo de temporada baja siga visible.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/hvac\">página de HVAC</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/hvac-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de HVAC",
        "html": "<p>En temporada de calor, quien se quedó sin aire necesita encontrar cómo pedir una reparación. En los meses más tranquilos, una página de mantenimiento o reemplazo puede ayudar a generar consultas. Mantén esos servicios separados. Incluye información de financiamiento solo si realmente lo ofreces y explica con claridad cualquier precio «desde».</p><p>Consulta la <a href=\"/industries/hvac\">página de HVAC</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "electrician-website-pages": {
    "slug": "electrician-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de electricidad",
    "seoTitle": "Qué páginas necesita un sitio de electricidad | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de electricidad, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "Quien visita el sitio de un electricista necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Muestra confianza de licencia temprano y da a cargadores EV su propia página cuando ese trabajo es real.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/electrical\">página de electricidad</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/electrician-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de electricidad",
        "html": "<p>Quien compra electricidad compara confianza tanto como precio. Muestra licencia temprano — cerca del teléfono, no tres scrolls abajo. Tableros, diagnóstico y cargadores EV son trabajos distintos con urgencia distinta. Si instalas cargadores, esa página merece camino de revisión en sitio. Si huele a quemado, la página debe gritar llamar — no invitar a leer folleto largo.</p><p>Consulta la <a href=\"/industries/electrical\">página de electricidad</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "roofing-website-pages": {
    "slug": "roofing-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de techos",
    "seoTitle": "Qué páginas necesita un sitio de techos | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de techos, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "Quien visita el sitio de un negocio de techos necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Separa reparación y cambio completo, y describe proceso de seguro sin prometer resultados de reclamación.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/roofing\">página de techos</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/roofing-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de techos",
        "html": "<p>Tras el granizo, el dueño quiere ventana de inspección — no novela de marcas de teja. Separa reparación de cambio completo. Puedes explicar cómo documentas daño para seguro sin prometer resultados que no controlas. Formulario corto de inspección: nombre, teléfono, zona de dirección y fotos si es seguro. Fugas activas siguen mereciendo el teléfono sobre todo.</p><p>Consulta la <a href=\"/industries/roofing\">página de techos</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "garage-door-website-pages": {
    "slug": "garage-door-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de puertas de garaje",
    "seoTitle": "Qué páginas necesita un sitio de puertas de garaje | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de puertas de garaje, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "Quien visita el sitio de un negocio de puertas de garaje necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Rutas de resorte/motor de emergencia deben liderar con teléfono; páginas de puerta nueva pueden usar formulario corto de medidas.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/garage-doors\">página de puertas de garaje</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/garage-door-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de puertas de garaje",
        "html": "<p>Una puerta atascada a las 7 a.m. no es el mismo comprador que alguien cotizando doble nuevo para remodelar el garaje. Resortes y motores necesitan ruta de reparación con teléfono. Puertas nuevas pueden usar formulario corto (sencilla/doble, material si se sabe, ciudad). Una página vaga de “servicios de garaje” hace trabajar demasiado a los dos.</p><p>Consulta la <a href=\"/industries/garage-doors\">página de puertas de garaje</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "painting-website-pages": {
    "slug": "painting-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de pintura",
    "seoTitle": "Qué páginas necesita un sitio de pintura | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de pintura, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "Quien visita el sitio de un contratista de pintura necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Separa interior, exterior y gabinetes, y mantén el formulario de estimado corto.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/painting\">página de pintura</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/painting-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de pintura",
        "html": "<p>Interior, exterior y gabinetes se venden distinto. Exterior quiere historias y notas de revestimiento; gabinetes quieren fotos de cajones; interior quiere conteo de cuartos sin formulario de veinte campos. Separa páginas, mantén la petición de estimado corta y deja fotos para después por mensaje cuando confirmes encaje.</p><p>Consulta la <a href=\"/industries/painting\">página de pintura</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "remodeling-website-pages": {
    "slug": "remodeling-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de remodelación",
    "seoTitle": "Qué páginas necesita un sitio de remodelación | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de remodelación, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "Quien visita el sitio de un contratista de remodelación necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Lidera con cuartos terminados y camino de consulta en lugar de lenguaje de llamada de emergencia.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/remodeling\">página de remodelación</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/remodeling-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de remodelación",
        "html": "<p>La remodelación rara vez es llamada de la misma hora. Lidera con cuartos que sí construiste y camino de consulta — no banner de emergencia copiado de plantilla de plomero. Cocinas y baños merecen páginas propias. Una nota corta de proceso (recorrido → alcance → calendario) calma compradores más que un “LLAMA YA” que no coincide con cómo vendes.</p><p>Consulta la <a href=\"/industries/remodeling\">página de remodelación</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "landscaping-website-pages": {
    "slug": "landscaping-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de paisajismo",
    "seoTitle": "Qué páginas necesita un sitio de paisajismo | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de paisajismo, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "Quien visita el sitio de un negocio de paisajismo necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Separa el mantenimiento semanal de los proyectos de diseño y construcción para dirigir cada consulta al servicio adecuado.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/landscaping\">página de paisajismo</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/landscaping-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de paisajismo",
        "html": "<p>Quien busca mantenimiento semanal necesita saber si su casa está dentro de la ruta. Quien planea un patio quiere ver proyectos terminados y solicitar una consulta. Separa esas opciones. Para las limpiezas de temporada, pregunta por la ciudad y la semana que prefiere el cliente; usa fotos de jardines que tu equipo haya trabajado.</p><p>Consulta la <a href=\"/industries/landscaping\">página de paisajismo</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>A1 Property Services tiene un sitio de paisajismo en vivo. La página de inicio destaca Cedar Falls, separa el cuidado del césped de los proyectos de patios y muestra fotos del antes y después de trabajos reales. También indica las zonas que atiende en el condado de Black Hawk. Consulta estos ejemplos en la <a href=\"/industries/landscaping\">página de paisajismo</a>.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "pool-service-website-pages": {
    "slug": "pool-service-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de albercas",
    "seoTitle": "Qué páginas necesita un sitio de albercas | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de albercas, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "Quien visita el sitio de un servicio de albercas necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Destaca el teléfono para las reparaciones urgentes y mantén las rutas de servicio separadas de los planes de membresía.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la página de albercas para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/pool-service-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de albercas",
        "html": "<p>Quien tiene una alberca verde necesita encontrar el teléfono y saber cuándo responderás. Para las rutas semanales, usa un formulario breve que pregunte el código postal, el día preferido y si la alberca ya se puede usar. Mantén las reparaciones separadas de las membresías.</p><p>Consulta la página de albercas para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "pressure-washing-website-pages": {
    "slug": "pressure-washing-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de lavado a presión",
    "seoTitle": "Qué páginas necesita un sitio de lavado a presión | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de lavado a presión, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "Quien visita el sitio de un negocio de lavado a presión necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Separa los servicios por superficie y muestra fotos reales del antes y después.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/pressure-washing\">página de lavado a presión</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/pressure-washing-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de lavado a presión",
        "html": "<p>El lavado de casas, concreto y techos puede requerir métodos distintos. Separa esos servicios y muestra fotos reales del antes y después. Si usas lavado suave en ciertas superficies, explícalo para que el cliente sepa qué esperar.</p><p>Consulta la <a href=\"/industries/pressure-washing\">página de lavado a presión</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "window-cleaning-website-pages": {
    "slug": "window-cleaning-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de limpieza de vidrios",
    "seoTitle": "Qué páginas necesita un sitio de limpieza de vidrios | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de limpieza de vidrios, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "Quien visita el sitio de un negocio de limpieza de vidrios necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Separa vidrio residencial y comercial, y ofrece limpiezas recurrentes como siguiente paso normal.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la página de limpieza de vidrios para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/window-cleaning-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de limpieza de vidrios",
        "html": "<p>Los clientes residenciales pueden buscar limpiezas recurrentes; los negocios quizá necesiten coordinar el servicio antes de abrir. Explica cada opción por separado. En el formulario, pregunta el número aproximado de ventanas y la frecuencia para preparar una cotización.</p><p>Consulta la página de limpieza de vidrios para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "lawn-care-website-pages": {
    "slug": "lawn-care-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de césped",
    "seoTitle": "Qué páginas necesita un sitio de césped | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de césped, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "Quien visita el sitio de un negocio de cuidado de césped necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Publica una zona honesta y da a desechos de mascotas su propia página solo cuando esa oferta es real.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la página de césped para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/lawn-care-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio de césped",
        "html": "<p>El trabajo por rutas depende de una zona de servicio precisa. Indica los barrios que realmente atiendes. El corte semanal y la recolección de desechos de mascotas son servicios distintos; crea una página para este último solo si lo ofreces. En el formulario de limpieza estacional, pregunta por el código postal y la frecuencia para que el equipo pueda confirmar la cobertura.</p><p>Consulta la página de césped para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "junk-removal-website-pages": {
    "slug": "junk-removal-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio web de retiro de chatarra",
    "seoTitle": "Qué páginas necesita un sitio de retiro de chatarra | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para separar acarreos rápidos, limpiezas grandes y cotizaciones sin páginas clonadas por ciudad.",
    "lead": "Quien visita el sitio de una empresa de retiro de chatarra necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Separa el acarreo rápido de las limpiezas planeadas: cada trabajo necesita un siguiente paso distinto.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/junk-removal\">página de retiro de chatarra</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/junk-removal-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio para retiro de chatarra",
        "html": "<p>El sitio falla cuando cada carga termina en una sola página de “retiramos de todo”. Un colchón en la banqueta necesita llamar y conocer una ventana realista. Una cochera o propiedad heredada requiere estimar volumen, acceso y quizá enviar fotos. Si ofreces ambos servicios, sepáralos. Las cargas recurrentes para caseros o asociaciones solo merecen una página si realmente manejas esas rutas.</p><p>Explica cuándo una foto basta para orientar y cuándo necesitas visitar para dar el precio final. No prometas servicio el mismo día fuera de tu zona o de tu horario. Consulta la página de <a href=\"/industries/junk-removal\">retiro de chatarra</a> para ver el enfoque del sitio.</p><p>Consulta la <a href=\"/industries/junk-removal\">página de retiro de chatarra</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "tree-service-website-pages": {
    "slug": "tree-service-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio web de servicio de árboles",
    "seoTitle": "Qué páginas necesita un sitio de servicio de árboles | Kinexis Digital",
    "excerpt": "Estructura páginas para poda, tala y emergencias por tormenta, con información de seguro visible y sin páginas clonadas por ciudad.",
    "lead": "Quien visita el sitio de una empresa de servicio de árboles necesita saber qué servicios ofreces, si atiendes su zona y cómo contactarte. La página debe responder esas preguntas sin rodeos. Separa poda, tala y emergencias por tormenta, con el teléfono y las señales de seguro fáciles de encontrar.",
    "sections": [
      {
        "h2": "Empieza por lo que busca el cliente",
        "html": "<p>Alguien que llega desde el celular debe encontrar pronto el servicio que necesita y una forma de contactarte. Organiza el sitio alrededor de esas preguntas, no de la estructura interna de tu empresa.</p><p>Consulta la <a href=\"/industries/tree-care\">página de servicio de árboles</a> para ver ejemplos. Si quieres comparar precios, lee nuestra <a href=\"/blog/tree-service-website-cost\">guía de precios</a>.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Empieza con lo necesario: una página de inicio que explique qué haces y cómo contactarte; páginas para tus servicios principales; una zona de servicio realista; y datos de contacto fáciles de encontrar. Agrega información sobre el equipo, las reseñas y los proyectos cuando ayude al cliente a decidir.</p><p>Los límites publicados son Website hasta 5 páginas, Lead System hasta 10, Plus hasta 20 en inglés y español, y Own It hasta 10. Son máximos, no una lista de páginas que debas llenar.</p>"
      },
      {
        "h2": "Revisa la página en el celular",
        "html": "<p>Abre el sitio en un celular y revisa la primera pantalla: ¿se entiende qué servicio ofreces, qué zona cubres y cómo pueden contactarte? Deja visible el teléfono y una acción principal. Pon las fotos, la historia del negocio y los detalles secundarios más abajo.</p><p>Comprueba también que el texto se lea sin ampliar y que la página cargue bien con datos móviles. Si tarda, <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> puede ayudarte a encontrar qué la está frenando.</p>"
      },
      {
        "h2": "Páginas de servicio para árboles",
        "html": "<p>Un sitio de servicio de árboles se vuelve confuso cuando emergencias, podas y talas comparten un bloque genérico. Quien tiene una rama sobre el techo necesita llamar y saber cuándo responderás. Para un trabajo planeado, la persona quiere fotos reales de la cuadrilla, información de seguro y una consulta.</p><p>Dedica páginas a poda, tala y emergencias cuando sean servicios que ofreces. Incluye molienda de tocones solo si forma parte de tu trabajo. Muestra seguro y seguridad cerca del teléfono; limita la zona a donde realmente puedes enviar una cuadrilla. Consulta la página de <a href=\"/industries/tree-care\">servicio de árboles</a> para ver el enfoque del sitio.</p><p>Consulta la <a href=\"/industries/tree-care\">página de servicio de árboles</a> para ver más ejemplos.</p>"
      },
      {
        "h2": "Mantén tus datos actualizados",
        "html": "<p>Revisa que el nombre, el teléfono, el horario y la zona de servicio coincidan en tu sitio y en el <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Actualiza ambos cuando cambie el horario. Lead System y Plus incluyen un ajuste del perfil al inicio; Plus también incluye dos publicaciones al mes. El SEO continuo se cotiza por separado.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Usa fotos actuales de tu equipo y de trabajos que realmente hayas hecho. Un pie de foto breve puede indicar el servicio o la ciudad si esa información es correcta. Reduce el tamaño de las imágenes para que carguen bien en el celular. Si corresponde a tu oficio y estado, coloca los datos de licencia y seguro donde el cliente pueda encontrarlos.</p>"
      },
      {
        "h2": "Haz fácil pedir una llamada o cotización",
        "html": "<p>Pide solo los datos necesarios para responder: por ejemplo, nombre, teléfono, tipo de trabajo y ciudad o código postal. Puedes solicitar fotos o detalles adicionales después del primer contacto. Para una urgencia, muestra primero el teléfono; para una cotización planeada, un formulario breve también puede servir.</p><p>Después del envío, explica cuándo responderás y asegúrate de que el equipo pueda cumplirlo.</p>"
      },
      {
        "h2": "Consulta ejemplos de esta industria",
        "html": "<p>Consulta la página de esta industria para ver cómo se presentan los servicios, la zona de cobertura y el siguiente paso de contacto.</p>"
      },
      {
        "h2": "Evita páginas casi idénticas por ciudad",
        "html": "<p>Evita crear páginas casi idénticas para cada ciudad. Mantén una lista clara de los lugares que sí atiendes y enlázala desde el sitio. Si empiezas a trabajar en una zona nueva, actualiza esa información donde corresponda en vez de copiar páginas sin contenido propio.</p><p>Lee también la <a href=\"/blog/local-seo-get-found-get-called\">guía de SEO local</a> y la <a href=\"/blog/google-business-profile-vs-website\">comparación entre el Perfil de Negocio de Google y un sitio web</a>.</p>"
      },
      {
        "h2": "Decide qué publicar primero",
        "html": "<p>Si estás organizando o rehaciendo el sitio, empieza por la página de inicio y los servicios que más vendes. Luego añade la zona, el contacto y las pruebas que ayuden a elegirte. Publica primero lo que un cliente necesita para entender el servicio y comunicarse contigo.</p><p>Compara las opciones en la <a href=\"/pricing\">página de precios</a> cuando tengas claro cuántas páginas necesitas.</p>"
      },
      {
        "h2": "Revisa cada página de servicio",
        "html": "<p>Antes de publicar cada página de servicio, comprueba que el nombre del trabajo sea el que usan tus clientes y que la descripción corresponda a lo que realmente haces. Indica si atiendes emergencias, si hace falta una visita para cotizar y qué zonas cubres. No prometas tiempos de respuesta o disponibilidad que el equipo no pueda cumplir.</p><p>Enlaza esa página con el teléfono o formulario adecuado. Si el cliente necesita enviar fotos o medidas para recibir una estimación, explica qué información ayuda y qué ocurrirá después. Revisa los enlaces y el formulario desde un celular para confirmar que funcionan.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Después del lanzamiento, revisa qué páginas reciben visitas, qué llamadas y formularios se convierten en trabajos y si el horario del Perfil de Negocio de Google sigue vigente. Search Console muestra consultas y páginas que aparecen en Google; tu registro de llamadas ayuda a saber qué contactos se convirtieron en trabajo.</p><p>Los cambios técnicos pueden notarse en unas semanas. La visibilidad suele tomar más tiempo y depende de la competencia. Ningún proveedor puede garantizar una posición específica.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
};

export const ES_PAGES_POST_SLUGS = ["plumbing-website-pages","hvac-website-pages","electrician-website-pages","roofing-website-pages","garage-door-website-pages","painting-website-pages","remodeling-website-pages","landscaping-website-pages","pool-service-website-pages","pressure-washing-website-pages","window-cleaning-website-pages","lawn-care-website-pages","junk-removal-website-pages","tree-service-website-pages"] as const;

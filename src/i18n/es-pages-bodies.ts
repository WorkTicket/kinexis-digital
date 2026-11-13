/** Regenera con: node scripts/generate-es-trade-bodies.mjs */
import type { EsPost } from "@/i18n/es-post-type";

export type EsPagesPostBody = {
  lead: string;
  sections: { h2: string; html: string }[];
  faqs?: { q: string; a: string }[];
};

/** Generated native es-419 pages post bodies keyed by blog slug. */
export const GENERATED_ES_PAGES_BODIES: Record<string, EsPagesPostBody> = {
  "plumbing-website-pages": {
    "lead": "La mayoría de quienes llegan al sitio de un plomero ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Separa fugas, drenajes y calentadores para que el tráfico de emergencia y de cotización no se mezcle.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/plumbing\">hub de plomero</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/plumber-website-cost\">cuánto cuesta un sitio de plomero</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de plomería",
        "html": "<p>Las búsquedas de plomería se parten entre pánico y planeación. Una tubería rota quiere un número grande y horario honesto. Una cotización de calentador quiere un formulario corto y marcas que sí instalas. Si esos caminos comparten una página vaga, los dos visitantes dudan — y a Google le cuesta emparejar la consulta correcta.</p><p>Dale a fugas, drenajes y calentadores su propia página. Rutas de emergencia lideran con llamada. Páginas de estimado respiran con fotos de prueba y un formulario de nombre, teléfono, tipo de trabajo y ciudad — nada más en el primer paso.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/plumbing\">hub de plomero</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Preferred Plumbing Solutions es un sitio de plomería en vivo. En el inicio: héroe local de Spirit Lake con teléfono + CTA de estimado gratis, franja de confianza (licencia, dueño-operado, estimados gratis), caminos separados para reparaciones / radiante / sin tanque / drenajes / obra nueva, y FAQs con horario real. Mira el bloque de prueba del <a href=\"/industries/plumbing\">hub de plomería</a>.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
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
    "lead": "La mayoría de quienes llegan al sitio de un negocio de HVAC ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Mantén reparación, cambio de equipo y mantenimiento en caminos separados para que el trabajo de temporada baja siga visible.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/hvac\">hub de HVAC</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/hvac-website-cost\">cuánto cuesta un sitio de HVAC</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de HVAC",
        "html": "<p>En julio nadie quiere un folleto de “soluciones de confort”. Quiere técnico por sin aire. En temporada baja la misma empresa necesita un camino visible para tune-ups y cambios. Mezclarlos entierra el trabajo que sí está en temporada.</p><p>Mantén reparación, cambio y mantenimiento en páginas separadas. En temporada alta el teléfono va primero. Compradores de cambio llevan formulario de consulta — y notas de financiamiento solo si de verdad financias. Líneas “desde” falsas generan devoluciones de llamada enojadas.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/hvac\">hub de HVAC</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
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
    "lead": "La mayoría de quienes llegan al sitio de un electricista ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Muestra confianza de licencia temprano y da a cargadores EV su propia página cuando ese trabajo es real.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/electrical\">hub de electricista</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/electrician-website-cost\">cuánto cuesta un sitio de electricista</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de electricidad",
        "html": "<p>Quien compra electricidad compara confianza tanto como precio. Muestra licencia temprano — cerca del teléfono, no tres scrolls abajo. Tableros, diagnóstico y cargadores EV son trabajos distintos con urgencia distinta. Si instalas cargadores, esa página merece camino de revisión en sitio. Si huele a quemado, la página debe gritar llamar — no invitar a leer folleto largo.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/electrical\">hub de electricista</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
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
    "lead": "La mayoría de quienes llegan al sitio de un negocio de techos ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Separa reparación y cambio completo, y describe proceso de seguro sin prometer resultados de reclamación.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/roofing\">hub de techos</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/roofing-website-cost\">cuánto cuesta un sitio de techos</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de techos",
        "html": "<p>Tras el granizo, el dueño quiere ventana de inspección — no novela de marcas de teja. Separa reparación de cambio completo. Puedes explicar cómo documentas daño para seguro sin prometer resultados que no controlas. Formulario corto de inspección: nombre, teléfono, zona de dirección y fotos si es seguro. Fugas activas siguen mereciendo el teléfono sobre todo.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/roofing\">hub de techos</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
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
    "lead": "La mayoría de quienes llegan al sitio de un negocio de puertas de garaje ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Rutas de resorte/motor de emergencia deben liderar con teléfono; páginas de puerta nueva pueden usar formulario corto de medidas.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/garage-doors\">hub de puertas de garaje</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/garage-door-website-cost\">cuánto cuesta un sitio de puertas de garaje</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de puertas de garaje",
        "html": "<p>Una puerta atascada a las 7 a.m. no es el mismo comprador que alguien cotizando doble nuevo para remodelar el garaje. Resortes y motores necesitan ruta de reparación con teléfono. Puertas nuevas pueden usar formulario corto (sencilla/doble, material si se sabe, ciudad). Una página vaga de “servicios de garaje” hace trabajar demasiado a los dos.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/garage-doors\">hub de puertas de garaje</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
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
    "lead": "La mayoría de quienes llegan al sitio de un contratista de pintura ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Separa interior, exterior y gabinetes, y mantén el formulario de estimado corto.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/painting\">hub de pintura</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/painting-website-cost\">cuánto cuesta un sitio de pintura</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de pintura",
        "html": "<p>Interior, exterior y gabinetes se venden distinto. Exterior quiere historias y notas de revestimiento; gabinetes quieren fotos de cajones; interior quiere conteo de cuartos sin formulario de veinte campos. Separa páginas, mantén la petición de estimado corta y deja fotos para después por mensaje cuando confirmes encaje.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/painting\">hub de pintura</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
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
    "lead": "La mayoría de quienes llegan al sitio de un contratista de remodelación ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Lidera con cuartos terminados y camino de consulta en lugar de lenguaje de llamada de emergencia.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/remodeling\">hub de remodelación</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/remodeling-website-cost\">cuánto cuesta un sitio de remodelación</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de remodelación",
        "html": "<p>La remodelación rara vez es llamada de la misma hora. Lidera con cuartos que sí construiste y camino de consulta — no banner de emergencia copiado de plantilla de plomero. Cocinas y baños merecen páginas propias. Una nota corta de proceso (recorrido → alcance → calendario) calma compradores más que un “LLAMA YA” que no coincide con cómo vendes.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/remodeling\">hub de remodelación</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
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
    "lead": "La mayoría de quienes llegan al sitio de un negocio de paisajismo ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Separa mantenimiento semanal de diseño-obra para no empujar leads de corte a consulta de patio.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/landscaping\">hub de paisajismo</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/landscaping-website-cost\">cuánto cuesta un sitio de paisajismo</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de paisajismo",
        "html": "<p>Clientes de corte semanal no quieren consulta de diseño de patio empujada. Compradores diseño-obra no quieren formulario de “únete a la ruta”. Separa mantenimiento de proyectos. Limpieza estacional puede ser camino corto con ZIP y semana preferida. Fotos de jardines reales ganan a céspedes de stock.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/landscaping\">hub de paisajismo</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>A1 Property Services es un sitio de paisajismo en vivo. En el inicio: héroe con lugar primero Cedar Falls y CTA de cotización gratis, cuidado de césped separado de proyectos de hardscape, sliders antes/después de trabajos reales y zona nombrada del condado Black Hawk. Mira el bloque de prueba del <a href=\"/industries/landscaping\">hub de paisajismo</a>.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
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
    "lead": "La mayoría de quienes llegan al sitio de un servicio de albercas ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Da a alberca verde y reparaciones de equipo un camino con teléfono que no quede enterrado bajo copy de membresía.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/pool-care\">hub de albercas</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/pool-service-website-cost\">cuánto cuesta un sitio de albercas</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de albercas",
        "html": "<p>Una alberca verde en agosto no lee tu brochure de membresía. Pon reparación y equipo en ruta con teléfono. Alta a ruta puede ser formulario corto: ZIP, día preferido y si la alberca ya es nadable. Evita que las ofertas se pisen entre sí.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/pool-care\">hub de albercas</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
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
    "lead": "La mayoría de quienes llegan al sitio de un negocio de lavado a presión ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Separa superficies y deja espacio para antes/después que prueben el resultado.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/pressure-washing\">hub de lavado a presión</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/pressure-washing-website-cost\">cuánto cuesta un sitio de lavado a presión</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de lavado a presión",
        "html": "<p>Lavado de casa, concreto y algas en techo son conversaciones distintas — a veces métodos distintos. Separa superficies. Fotos antes/después venden más que adjetivos. Cuando el lavado suave importa para techo o pintura, dilo claro para que el dueño no se sorprenda el día del servicio.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/pressure-washing\">hub de lavado a presión</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
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
    "lead": "La mayoría de quienes llegan al sitio de un negocio de limpieza de vidrios ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Separa vidrio residencial y comercial, y ofrece limpiezas recurrentes como siguiente paso normal.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/window-cleaning\">hub de limpieza de vidrios</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/window-cleaning-website-cost\">cuánto cuesta un sitio de limpieza de vidrios</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de limpieza de vidrios",
        "html": "<p>Casas y aparadores reservan distinto. Residencial suele querer limpieza recurrente; comercial quiere horario que no bloquee la puerta a la apertura. Separa páginas. Pide conteo aproximado de paneles y frecuencia en el formulario para no adivinar desde un correo de una línea.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/window-cleaning\">hub de limpieza de vidrios</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
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
    "lead": "La mayoría de quienes llegan al sitio de un negocio de cuidado de césped ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Publica una zona honesta y da a desechos de mascotas su propia página solo cuando esa oferta es real.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/yard-care\">hub de césped</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/lawn-care-website-cost\">cuánto cuesta un sitio de césped</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de césped",
        "html": "<p>El trabajo de ruta vive y muere por zona honesta. Publica los barrios que sí alcanzas. Corte semanal y desechos de mascotas son ofertas distintas — página propia para mascotas solo si de verdad haces esa parada. Limpieza estacional puede compartir formulario corto con ZIP y frecuencia para que despacho no decodifique textos vagos toda la semana.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/yard-care\">hub de césped</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
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
  },};

/** Full EsPost objects ready to spread into ES_POSTS. */
export const GENERATED_ES_PAGES_POSTS: Record<string, EsPost> = {
  "plumbing-website-pages": {
    "slug": "plumbing-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de plomería",
    "seoTitle": "Qué páginas necesita un sitio de plomería | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de plomería, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "La mayoría de quienes llegan al sitio de un plomero ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Separa fugas, drenajes y calentadores para que el tráfico de emergencia y de cotización no se mezcle.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/plumbing\">hub de plomero</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/plumber-website-cost\">cuánto cuesta un sitio de plomero</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de plomería",
        "html": "<p>Las búsquedas de plomería se parten entre pánico y planeación. Una tubería rota quiere un número grande y horario honesto. Una cotización de calentador quiere un formulario corto y marcas que sí instalas. Si esos caminos comparten una página vaga, los dos visitantes dudan — y a Google le cuesta emparejar la consulta correcta.</p><p>Dale a fugas, drenajes y calentadores su propia página. Rutas de emergencia lideran con llamada. Páginas de estimado respiran con fotos de prueba y un formulario de nombre, teléfono, tipo de trabajo y ciudad — nada más en el primer paso.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/plumbing\">hub de plomero</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Preferred Plumbing Solutions es un sitio de plomería en vivo. En el inicio: héroe local de Spirit Lake con teléfono + CTA de estimado gratis, franja de confianza (licencia, dueño-operado, estimados gratis), caminos separados para reparaciones / radiante / sin tanque / drenajes / obra nueva, y FAQs con horario real. Mira el bloque de prueba del <a href=\"/industries/plumbing\">hub de plomería</a>.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "hvac-website-pages": {
    "slug": "hvac-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de HVAC",
    "seoTitle": "Qué páginas necesita un sitio de HVAC | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de HVAC, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "La mayoría de quienes llegan al sitio de un negocio de HVAC ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Mantén reparación, cambio de equipo y mantenimiento en caminos separados para que el trabajo de temporada baja siga visible.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/hvac\">hub de HVAC</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/hvac-website-cost\">cuánto cuesta un sitio de HVAC</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de HVAC",
        "html": "<p>En julio nadie quiere un folleto de “soluciones de confort”. Quiere técnico por sin aire. En temporada baja la misma empresa necesita un camino visible para tune-ups y cambios. Mezclarlos entierra el trabajo que sí está en temporada.</p><p>Mantén reparación, cambio y mantenimiento en páginas separadas. En temporada alta el teléfono va primero. Compradores de cambio llevan formulario de consulta — y notas de financiamiento solo si de verdad financias. Líneas “desde” falsas generan devoluciones de llamada enojadas.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/hvac\">hub de HVAC</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "electrician-website-pages": {
    "slug": "electrician-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de electricidad",
    "seoTitle": "Qué páginas necesita un sitio de electricidad | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de electricidad, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "La mayoría de quienes llegan al sitio de un electricista ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Muestra confianza de licencia temprano y da a cargadores EV su propia página cuando ese trabajo es real.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/electrical\">hub de electricista</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/electrician-website-cost\">cuánto cuesta un sitio de electricista</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de electricidad",
        "html": "<p>Quien compra electricidad compara confianza tanto como precio. Muestra licencia temprano — cerca del teléfono, no tres scrolls abajo. Tableros, diagnóstico y cargadores EV son trabajos distintos con urgencia distinta. Si instalas cargadores, esa página merece camino de revisión en sitio. Si huele a quemado, la página debe gritar llamar — no invitar a leer folleto largo.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/electrical\">hub de electricista</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "roofing-website-pages": {
    "slug": "roofing-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de techos",
    "seoTitle": "Qué páginas necesita un sitio de techos | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de techos, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "La mayoría de quienes llegan al sitio de un negocio de techos ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Separa reparación y cambio completo, y describe proceso de seguro sin prometer resultados de reclamación.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/roofing\">hub de techos</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/roofing-website-cost\">cuánto cuesta un sitio de techos</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de techos",
        "html": "<p>Tras el granizo, el dueño quiere ventana de inspección — no novela de marcas de teja. Separa reparación de cambio completo. Puedes explicar cómo documentas daño para seguro sin prometer resultados que no controlas. Formulario corto de inspección: nombre, teléfono, zona de dirección y fotos si es seguro. Fugas activas siguen mereciendo el teléfono sobre todo.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/roofing\">hub de techos</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "garage-door-website-pages": {
    "slug": "garage-door-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de puertas de garaje",
    "seoTitle": "Qué páginas necesita un sitio de puertas de garaje | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de puertas de garaje, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "La mayoría de quienes llegan al sitio de un negocio de puertas de garaje ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Rutas de resorte/motor de emergencia deben liderar con teléfono; páginas de puerta nueva pueden usar formulario corto de medidas.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/garage-doors\">hub de puertas de garaje</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/garage-door-website-cost\">cuánto cuesta un sitio de puertas de garaje</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de puertas de garaje",
        "html": "<p>Una puerta atascada a las 7 a.m. no es el mismo comprador que alguien cotizando doble nuevo para remodelar el garaje. Resortes y motores necesitan ruta de reparación con teléfono. Puertas nuevas pueden usar formulario corto (sencilla/doble, material si se sabe, ciudad). Una página vaga de “servicios de garaje” hace trabajar demasiado a los dos.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/garage-doors\">hub de puertas de garaje</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "painting-website-pages": {
    "slug": "painting-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de pintura",
    "seoTitle": "Qué páginas necesita un sitio de pintura | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de pintura, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "La mayoría de quienes llegan al sitio de un contratista de pintura ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Separa interior, exterior y gabinetes, y mantén el formulario de estimado corto.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/painting\">hub de pintura</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/painting-website-cost\">cuánto cuesta un sitio de pintura</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de pintura",
        "html": "<p>Interior, exterior y gabinetes se venden distinto. Exterior quiere historias y notas de revestimiento; gabinetes quieren fotos de cajones; interior quiere conteo de cuartos sin formulario de veinte campos. Separa páginas, mantén la petición de estimado corta y deja fotos para después por mensaje cuando confirmes encaje.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/painting\">hub de pintura</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "remodeling-website-pages": {
    "slug": "remodeling-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de remodelación",
    "seoTitle": "Qué páginas necesita un sitio de remodelación | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de remodelación, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "La mayoría de quienes llegan al sitio de un contratista de remodelación ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Lidera con cuartos terminados y camino de consulta en lugar de lenguaje de llamada de emergencia.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/remodeling\">hub de remodelación</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/remodeling-website-cost\">cuánto cuesta un sitio de remodelación</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de remodelación",
        "html": "<p>La remodelación rara vez es llamada de la misma hora. Lidera con cuartos que sí construiste y camino de consulta — no banner de emergencia copiado de plantilla de plomero. Cocinas y baños merecen páginas propias. Una nota corta de proceso (recorrido → alcance → calendario) calma compradores más que un “LLAMA YA” que no coincide con cómo vendes.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/remodeling\">hub de remodelación</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "landscaping-website-pages": {
    "slug": "landscaping-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de paisajismo",
    "seoTitle": "Qué páginas necesita un sitio de paisajismo | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de paisajismo, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "La mayoría de quienes llegan al sitio de un negocio de paisajismo ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Separa mantenimiento semanal de diseño-obra para no empujar leads de corte a consulta de patio.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/landscaping\">hub de paisajismo</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/landscaping-website-cost\">cuánto cuesta un sitio de paisajismo</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de paisajismo",
        "html": "<p>Clientes de corte semanal no quieren consulta de diseño de patio empujada. Compradores diseño-obra no quieren formulario de “únete a la ruta”. Separa mantenimiento de proyectos. Limpieza estacional puede ser camino corto con ZIP y semana preferida. Fotos de jardines reales ganan a céspedes de stock.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/landscaping\">hub de paisajismo</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>A1 Property Services es un sitio de paisajismo en vivo. En el inicio: héroe con lugar primero Cedar Falls y CTA de cotización gratis, cuidado de césped separado de proyectos de hardscape, sliders antes/después de trabajos reales y zona nombrada del condado Black Hawk. Mira el bloque de prueba del <a href=\"/industries/landscaping\">hub de paisajismo</a>.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "pool-service-website-pages": {
    "slug": "pool-service-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de albercas",
    "seoTitle": "Qué páginas necesita un sitio de albercas | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de albercas, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "La mayoría de quienes llegan al sitio de un servicio de albercas ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Da a alberca verde y reparaciones de equipo un camino con teléfono que no quede enterrado bajo copy de membresía.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/pool-care\">hub de albercas</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/pool-service-website-cost\">cuánto cuesta un sitio de albercas</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de albercas",
        "html": "<p>Una alberca verde en agosto no lee tu brochure de membresía. Pon reparación y equipo en ruta con teléfono. Alta a ruta puede ser formulario corto: ZIP, día preferido y si la alberca ya es nadable. Evita que las ofertas se pisen entre sí.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/pool-care\">hub de albercas</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "pressure-washing-website-pages": {
    "slug": "pressure-washing-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de lavado a presión",
    "seoTitle": "Qué páginas necesita un sitio de lavado a presión | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de lavado a presión, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "La mayoría de quienes llegan al sitio de un negocio de lavado a presión ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Separa superficies y deja espacio para antes/después que prueben el resultado.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/pressure-washing\">hub de lavado a presión</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/pressure-washing-website-cost\">cuánto cuesta un sitio de lavado a presión</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de lavado a presión",
        "html": "<p>Lavado de casa, concreto y algas en techo son conversaciones distintas — a veces métodos distintos. Separa superficies. Fotos antes/después venden más que adjetivos. Cuando el lavado suave importa para techo o pintura, dilo claro para que el dueño no se sorprenda el día del servicio.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/pressure-washing\">hub de lavado a presión</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "window-cleaning-website-pages": {
    "slug": "window-cleaning-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de limpieza de vidrios",
    "seoTitle": "Qué páginas necesita un sitio de limpieza de vidrios | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de limpieza de vidrios, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "La mayoría de quienes llegan al sitio de un negocio de limpieza de vidrios ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Separa vidrio residencial y comercial, y ofrece limpiezas recurrentes como siguiente paso normal.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/window-cleaning\">hub de limpieza de vidrios</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/window-cleaning-website-cost\">cuánto cuesta un sitio de limpieza de vidrios</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de limpieza de vidrios",
        "html": "<p>Casas y aparadores reservan distinto. Residencial suele querer limpieza recurrente; comercial quiere horario que no bloquee la puerta a la apertura. Separa páginas. Pide conteo aproximado de paneles y frecuencia en el formulario para no adivinar desde un correo de una línea.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/window-cleaning\">hub de limpieza de vidrios</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
  "lawn-care-website-pages": {
    "slug": "lawn-care-website-pages",
    "category": "Consejos",
    "title": "Qué páginas necesita un sitio de césped",
    "seoTitle": "Qué páginas necesita un sitio de césped | Kinexis Digital",
    "excerpt": "Páginas base y de servicio para un sitio de césped, sin spam de ciudades clonadas. Estructura clara para llamadas y cotizaciones.",
    "lead": "La mayoría de quienes llegan al sitio de un negocio de cuidado de césped ya saben qué falló en la casa. No están navegando por gusto. Necesitan ver que haces ese trabajo, que cubres su zona y cómo te contactan — rápido. Publica una zona honesta y da a desechos de mascotas su propia página solo cuando esa oferta es real.",
    "sections": [
      {
        "h2": "Empieza por la llamada, no por el mapa del sitio",
        "html": "<p>Olvida el organigrama perfecto un minuto. Imagina a alguien en el celular en la entrada. Buscó un trabajo, tocó un resultado y ahora tiene unos cinco segundos de paciencia. Si tu página habla alrededor del trabajo — o esconde el número — se va. Ese es el argumento entero por páginas claras.</p><p>Sí necesitas estructura sensata. Inicio, servicios, zona, nosotros, reseñas, contacto. Pero el punto de esa estructura son llamadas y formularios calificados, no impresionar a otro diseñador. Recorre ejemplos en vivo en el <a href=\"/industries/yard-care\">hub de césped</a> cuando quieras prueba de layout. Si lo que sigue es precio, usa <a href=\"/blog/lawn-care-website-cost\">cuánto cuesta un sitio de césped</a> — ese post es dueño de la pregunta de costo; este es dueño de la lista de páginas.</p>"
      },
      {
        "h2": "Páginas base que todo sitio de servicios necesita",
        "html": "<p>Piensa en la última llamada que casi no llegó: alguien encontró tu nombre, abrió el sitio en el estacionamiento y en diez segundos decidió si marcar o volver a la lista de Google. Esas páginas base no son adorno — son lo que contesta en el pulgar.</p><p>Todo sitio de oficio comparte un esqueleto aburrido pero esencial. Si falta una pieza, el visitante inventa su propia historia — casi siempre la incorrecta.</p><p><strong>Inicio</strong> tiene que funcionar en el celular con un pulgar: nombra el trabajo, muestra el número y deja obvio el siguiente paso. <strong>Páginas de servicio</strong> deben separar los trabajos que de verdad vendes, no volcar todo bajo “lo que hacemos”. <strong>Zona de servicio</strong> lista los pueblos que tu cuadrilla sí cubre este mes — no un radio de fantasía. <strong>Nosotros</strong> cubre licencia, seguro y quién llega, corto; la prueba también va cerca del teléfono. <strong>Reseñas</strong> deben sentirse reales. <strong>Contacto</strong> es formulario más llamada con un toque, no un número atrapado en el pie de página.</p><p>Ese es el piso. Las páginas específicas del oficio abajo hacen que alguien piense “hacen <em>mi</em> trabajo” en lugar de “folleto bonito”.</p><p>Si planeas contra un plan Kinexis, los conteos son un tope — no tarea infinita: Website hasta 5, Lead System hasta 10, Plus hasta 20 (inglés + español), Own It hasta 10. Publica primero las páginas que ganan llamadas.</p>"
      },
      {
        "h2": "Wireframe del inicio (mobile first)",
        "html": "<p>Abre tu sitio en el celular como lo vería un desconocido. Sin bajar, ¿se entiende qué arreglas, dónde trabajas y cómo llaman? Si no, el resto del sitio pelea cuesta arriba.</p><p>Una primera pantalla práctica suele ir así: titular que nombra el trabajo (no “calidad desde siempre”), número con toque para llamar, ciudades que cubres, una acción principal clara y una franja fina de confianza — licencia, seguro o una línea de reseña real. Declaraciones de misión, galerías largas y ensayos de financiamiento pueden esperar. Alguien con agua en el piso no lee tu origen.</p><p>Google indexa con enfoque <a href=\"https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing\" rel=\"noopener noreferrer\" target=\"_blank\">mobile-first</a>: diseña primero el celular y amplía en escritorio. La velocidad cuenta. Un héroe bonito que tarda en cargar igual pierde la llamada. Si la página se siente pesada en datos, pásala por <a href=\"https://pagespeed.web.dev/\" rel=\"noopener noreferrer\" target=\"_blank\">PageSpeed Insights</a> y corrige lo que bloquee el número y el titular.</p>"
      },
      {
        "h2": "Páginas de servicio de césped",
        "html": "<p>El trabajo de ruta vive y muere por zona honesta. Publica los barrios que sí alcanzas. Corte semanal y desechos de mascotas son ofertas distintas — página propia para mascotas solo si de verdad haces esa parada. Limpieza estacional puede compartir formulario corto con ZIP y frecuencia para que despacho no decodifique textos vagos toda la semana.</p><p>Más ejemplos y notas de proceso viven en el <a href=\"/industries/yard-care\">hub de césped</a>.</p>"
      },
      {
        "h2": "Anatomía de una página de servicio",
        "html": "<p>Piensa como quien contesta el teléfono. Antes de pedir el nombre, necesita saber de qué va la página. Una página de servicio fuerte responde en el primer aliento: qué se rompió o qué quieren hacer, si es “llama ya” o “agenda visita”, y qué prueba te hace creíble.</p><p>Escribe títulos como busca el cliente. “Cambio de calentador” gana a “soluciones residenciales”. “Resorte de puerta roto” gana a “sistemas de puerta”. Pon ese lenguaje en el H1 y en el párrafo de apertura.</p><p>El primer formulario corto: nombre, teléfono, tipo de trabajo, ciudad. Fotos y seriales pueden ir después por mensaje cuando el lead es real. Páginas de emergencia ponen el teléfono sobre el formulario. Proyectos planeados pueden liderar con formulario si vas lleno, pero el número sigue a un toque.</p><p>FAQs solo cuando quitan una objeción real: horarios, zona, permisos, lo que no haces. Relleno por contar palabras no ayuda a nadie. La guía de Google sobre <a href=\"https://developers.google.com/search/docs/fundamentals/creating-helpful-content\" rel=\"noopener noreferrer\" target=\"_blank\">contenido útil</a> es básicamente eso: escribe para personas primero.</p>"
      },
      {
        "h2": "Mantén NAP y el perfil consistentes",
        "html": "<p>Nombre, teléfono, horario y zona deben coincidir entre tu sitio y tu <a href=\"https://support.google.com/business/\" rel=\"noopener noreferrer\" target=\"_blank\">Perfil de Negocio de Google</a>. Un perfil que dice 24/7 mientras el sitio cierra a las seis genera llamadas enojadas de madrugada y reseñas que no necesitabas.</p><p>Una página honesta de zona — no una pila de clones por ciudad. Las políticas de spam de Google señalan <a href=\"https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages\" rel=\"noopener noreferrer\" target=\"_blank\">páginas puerta</a> hechas sobre todo para rankear por nombres de lugar. Lista los pueblos que sí puedes cubrir, nota límites duros si los hay, y enlaza esa página desde pie y contacto.</p><p>Cuando cambian horarios por festivo, actualiza perfil y sitio el mismo día. Lead System y Plus incluyen ajuste del perfil al lanzar; Plus agrega dos publicaciones al mes. SEO continuo después de esa base se cotiza aparte.</p>"
      },
      {
        "h2": "Fotos y prueba que pertenecen al sitio",
        "html": "<p>Fotos de stock de cascos y extraños entrenan al siguiente cliente a esperar otra cuadrilla. Mejor:</p><ul><li>Tu camión y camisas con marca</li><li>Antes/después de trabajos que sí terminaste</li><li>Primeros planos que muestren oficio (juntas, paneles, bordes de pintura) cuando ayuden a vender</li><li>Leyenda simple con ciudad o barrio cuando sea real</li></ul><p>Comprime imágenes para que el teléfono siga apareciendo rápido. La guía de <a href=\"https://developers.google.com/search/docs/appearance/page-experience\" rel=\"noopener noreferrer\" target=\"_blank\">experiencia de página</a> de Google recuerda que media lenta duele búsqueda y conversión. Licencia y seguro cerca del botón de llamada cuando apliquen en tu estado — no solo en Nosotros enterrado.</p>"
      },
      {
        "h2": "Formularios y llamadas: el siguiente paso según la intención",
        "html": "<p>Los formularios fallan cuando piden una novela. Para la mayoría de oficios, empieza con:</p><ul><li>Nombre</li><li>Teléfono (obligatorio)</li><li>Tipo de trabajo (lista o texto corto)</li><li>Ciudad o ZIP</li></ul><p>Después opcional: fotos, códigos, ventanas preferidas. Páginas de emergencia deben liderar con llamada y tratar el formulario como respaldo. Páginas de estimado planeado pueden liderar con formulario si vas lleno — el número sigue visible.</p><p>Tras enviar, di qué pasa después (“Llamamos en horario de atención”) y cumple la promesa. Una página de gracias que dice “en contacto” sin plazo entrena a la gente a llamar a tu competencia.</p>"
      },
      {
        "h2": "Cómo priorizar páginas (IA sin jerga)",
        "html": "<p>La arquitectura de información no es concurso de mapa del sitio. Ordena páginas por si ganan llamada o formulario calificado:</p><ol><li>Inicio</li><li>Servicios principales o de emergencia</li><li>Zona de servicio</li><li>Contacto</li><li>Reseñas / prueba</li><li>Nosotros</li><li>Servicios secundarios y ofertas estacionales</li></ol><p>Entradas de blog y recursos apoyan esas páginas de dinero — no deben reemplazar una página de servicio clara para un trabajo principal. Enlaces internos obvios: del inicio a servicios, de servicios a zona y contacto, de guías del blog de vuelta al hub de industria y al post de costo hermano cuando la pregunta es precio.</p>"
      },
      {
        "h2": "Inicio anotado cuando hay prueba",
        "html": "<p>Cuando exista un sitio de cliente en vivo para este oficio, anotamos el inicio en el hub de la industria — héroe, franja de confianza, rutas de servicio y dónde va el teléfono. Mientras tanto, usa la lista de servicio de arriba y pide una vista previa gratis del inicio para tu oferta y ve el camino de la primera pantalla antes de pagar.</p>"
      },
      {
        "h2": "Evita spam de ciudades puerta",
        "html": "<p>No publiques páginas casi idénticas que solo cambian el nombre del pueblo. Ese patrón desperdicia rastreo, confunde a quien vive fuera de tu radio real y no ayuda a decidir si marcan.</p><p>Una página clara de zona más páginas de servicio fuertes es el enfoque honesto. Si luego entras de verdad a una ciudad nueva, actualiza la página de zona y el perfil — no subas veinte clones finos de la noche a la mañana.</p><p>Lectura relacionada: <a href=\"/blog/local-seo-get-found-get-called\">SEO local que conecta búsquedas con llamadas</a>, <a href=\"/blog/web-design-for-contractors\">lista para sitio de contratista</a> y <a href=\"/blog/google-business-profile-vs-website\">Perfil de Google vs sitio web</a>.</p>"
      },
      {
        "h2": "Orden de publicación si empiezas con poco",
        "html": "<p>No tienes que publicar veinte URLs el día uno para “verse profesional”. Los dueños que más llamadas reportan suelen tener menos páginas, pero cada una con un siguiente paso que coincide con lo que la persona buscó.</p><p>Si reconstruyes desde un folleto, publica en este orden:</p><ol><li>Arregla la primera pantalla del inicio (trabajo, zona, teléfono)</li><li>Publica las tres páginas de servicio que más coinciden con búsquedas reales</li><li>Agrega la página honesta de zona</li><li>Alinea el Perfil de Google con el sitio</li><li>Solo después páginas secundarias, galerías o entradas de blog</li></ol><p>Un sitio de cinco páginas que genera llamadas gana a uno de veinte que solo sirve en monitor de escritorio. Con la estructura clara, compara modelos de flujo en <a href=\"/blog/monthly-website-vs-own-it\">plan mensual u Own It</a> y precios en <a href=\"/pricing\">/pricing</a>.</p>"
      },
      {
        "h2": "Qué medir después de publicar",
        "html": "<p>Un sitio nuevo no se arregla solo el viernes de lanzamiento. La primera semana suele mostrar la verdad: qué páginas traen clics sin llamadas, qué formularios se abandonan a mitad, si el perfil de Google todavía dice horario viejo. Anota eso en una hoja simple — no hace falta un tablero enterprise para dueños de negocio de servicios.</p><p>Después del lanzamiento, mide lo que importa:</p><ul><li>Llamadas desde el sitio (número de seguimiento si usas uno)</li><li>Formularios que se volvieron trabajos reales</li><li>Consultas y páginas con impresiones en Search Console</li><li>Qué páginas de servicio tienen visitas y cero llamadas (arréglalas primero)</li></ul><p><a href=\"https://support.google.com/webmasters/answer/4559176\" rel=\"noopener noreferrer\" target=\"_blank\">Google Search Console</a> muestra descubrimiento; tu teléfono y CRM muestran dinero. Arreglos técnicos pueden moverse en semanas; crecimiento local más amplio suele tardar meses y depende de competencia. Nadie fuera de Google promete posición — mira la <a href=\"https://developers.google.com/search/docs/fundamentals/seo-starter-guide\" rel=\"noopener noreferrer\" target=\"_blank\">guía inicial de SEO</a> de Google para bases y <a href=\"/seo-services\">servicios SEO</a> cuando quieras trabajo continuo cotizado aparte de los cuatro planes de sitio.</p><p><a href=\"/contact\">Pide una vista previa gratis del inicio</a> o compara planes en <a href=\"/pricing\">/pricing</a>. Website $97/mes, Lead System $197/mes, Plus $297/mes, Own It $1,497 una vez — cada opción empieza con vista previa gratis en 2 días hábiles, sin tarjeta.</p>"
      }
    ]
  },
};

export const ES_PAGES_POST_SLUGS = ["plumbing-website-pages","hvac-website-pages","electrician-website-pages","roofing-website-pages","garage-door-website-pages","painting-website-pages","remodeling-website-pages","landscaping-website-pages","pool-service-website-pages","pressure-washing-website-pages","window-cleaning-website-pages","lawn-care-website-pages"] as const;

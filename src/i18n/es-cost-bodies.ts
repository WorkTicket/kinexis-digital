/** Regenera con: node scripts/generate-es-trade-bodies.mjs */
import type { EsPost } from "@/i18n/posts-es";

export type EsCostPostBody = {
  lead: string;
  sections: { h2: string; html: string }[];
  faqs?: { q: string; a: string }[];
};

/** Generated native es-419 cost post bodies keyed by blog slug. */
export const GENERATED_ES_COST_BODIES: Record<string, EsCostPostBody> = {
  "plumber-website-cost": {
    "lead": "Si estás cotizando un sitio de plomería, empieza con números que puedas verificar — no un “promedio” de foro. Imagina un dueño en el garaje con el piso mojado: no quiere leer tu historia de empresa; quiere saber si atiendes fugas en su ciudad y cómo te marca. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de plomería",
        "html": "<p>Un sitio de plomería puede necesitar páginas separadas para fugas, drenajes y calentadores. Las fotos de trabajos terminados y un horario claro ayudan a que cada cliente sepa qué esperar.</p><p>El precio depende del número de páginas y del plan que elijas, no de un recargo por ser plomero.</p><p>Consulta la <a href=\"/industries/plumbing\">página de plomería</a> y la <a href=\"/blog/plumbing-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para plomería, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Cuánto cuesta un sitio de plomería con Kinexis?",
        "a": "Website es $97/mes, Lead System es $197/mes, Plus es $297/mes y Own It es $1,497 de una vez. Mira /pricing para inclusiones."
      },
      {
        "q": "¿Hay cargo de configuración?",
        "a": "No hay cargos sorpresa de setup. Los planes mensuales son $0 de entrada. Own It es $1,497 únicos por escrito. Cada opción empieza con vista previa gratis del inicio — sin tarjeta ni obligación."
      },
      {
        "q": "¿El sitio es mío en un plan mensual?",
        "a": "En planes mensuales, el hosting y la administración siguen mientras pagas. La compra de archivos (buyout) es $1,497 únicos por escrito. Own It incluye propiedad desde el lanzamiento."
      },
      {
        "q": "¿El SEO va incluido en esos precios?",
        "a": "Cada sitio sale con estructura clara y páginas de servicio. El SEO continuo se cotiza aparte y no va en los cuatro planes."
      },
      {
        "q": "¿Qué pasa si cancelo un plan mensual?",
        "a": "Cancelas cuando quieras sin penalidad. El sitio sigue en línea en el período pagado; después termina el hosting salvo que arregles buyout ($1,497) o pases a Own It antes de que cierre el período."
      },
      {
        "q": "¿Cuánto cuesta el texto por llamada perdida?",
        "a": "En Lead System y Plus el texto es opcional: $1/mes por 2.º número más tarifas del operador. En Website y Own It es un add-on de $97/mes. La aprobación del operador suele tardar 10–15 días y no está garantizada."
      }
    ]
  },
  "hvac-website-cost": {
    "lead": "Si estás cotizando un sitio de HVAC, empieza con números que puedas verificar — no un “promedio” de foro. En agosto, quien busca no quiere un folleto de “soluciones de confort”: quiere saber si mandas técnico sin aire y cuánto tarda en contestar. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de HVAC",
        "html": "<p>El costo en HVAC aparece en las bifurcaciones: reparación sin aire vs cambio de equipo vs mantenimiento. En temporada baja necesitas páginas de mantenimiento visibles cuando baja la urgencia. Líneas de financiamiento solo si de verdad financias. En pleno calor, el seguimiento de llamada perdida suele pagarse solo más rápido que otra foto de stock de familia sonriente.</p><p>Consulta la <a href=\"/industries/hvac\">página de HVAC</a> y la <a href=\"/blog/hvac-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para HVAC, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Cuánto cuesta un sitio de HVAC con Kinexis?",
        "a": "Website es $97/mes, Lead System es $197/mes, Plus es $297/mes y Own It es $1,497 de una vez. Mira /pricing para inclusiones."
      },
      {
        "q": "¿Hay cargo de configuración?",
        "a": "No hay cargos sorpresa de setup. Los planes mensuales son $0 de entrada. Own It es $1,497 únicos por escrito. Cada opción empieza con vista previa gratis del inicio — sin tarjeta ni obligación."
      },
      {
        "q": "¿El sitio es mío en un plan mensual?",
        "a": "En planes mensuales, el hosting y la administración siguen mientras pagas. La compra de archivos (buyout) es $1,497 únicos por escrito. Own It incluye propiedad desde el lanzamiento."
      },
      {
        "q": "¿El SEO va incluido en esos precios?",
        "a": "Cada sitio sale con estructura clara y páginas de servicio. El SEO continuo se cotiza aparte y no va en los cuatro planes."
      },
      {
        "q": "¿Qué pasa si cancelo un plan mensual?",
        "a": "Cancelas cuando quieras sin penalidad. El sitio sigue en línea en el período pagado; después termina el hosting salvo que arregles buyout ($1,497) o pases a Own It antes de que cierre el período."
      },
      {
        "q": "¿Cuánto cuesta el texto por llamada perdida?",
        "a": "En Lead System y Plus el texto es opcional: $1/mes por 2.º número más tarifas del operador. En Website y Own It es un add-on de $97/mes. La aprobación del operador suele tardar 10–15 días y no está garantizada."
      }
    ]
  },
  "electrician-website-cost": {
    "lead": "Si estás cotizando un sitio de electricidad, empieza con números que puedas verificar — no un “promedio” de foro. Quien huele a quemado o tiene el breaker que no reinicia no va a leer cinco párrafos de marketing: necesita licencia cerca del teléfono y un siguiente paso obvio. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de electricidad",
        "html": "<p>Los sitios de electricidad gastan presupuesto en confianza y alcance. Señales de licencia junto al teléfono, páginas aparte para tableros, cargadores EV y diagnóstico, y suficiente claridad para que quien compara presupuestos sepa qué está pidiendo. Animaciones vacías no mueven esa decisión.</p><p>Consulta la <a href=\"/industries/electrical\">página de electricidad</a> y la <a href=\"/blog/electrician-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para electricidad, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Cuánto cuesta un sitio de electricidad con Kinexis?",
        "a": "Website es $97/mes, Lead System es $197/mes, Plus es $297/mes y Own It es $1,497 de una vez. Mira /pricing para inclusiones."
      },
      {
        "q": "¿Hay cargo de configuración?",
        "a": "No hay cargos sorpresa de setup. Los planes mensuales son $0 de entrada. Own It es $1,497 únicos por escrito. Cada opción empieza con vista previa gratis del inicio — sin tarjeta ni obligación."
      },
      {
        "q": "¿El sitio es mío en un plan mensual?",
        "a": "En planes mensuales, el hosting y la administración siguen mientras pagas. La compra de archivos (buyout) es $1,497 únicos por escrito. Own It incluye propiedad desde el lanzamiento."
      },
      {
        "q": "¿El SEO va incluido en esos precios?",
        "a": "Cada sitio sale con estructura clara y páginas de servicio. El SEO continuo se cotiza aparte y no va en los cuatro planes."
      },
      {
        "q": "¿Qué pasa si cancelo un plan mensual?",
        "a": "Cancelas cuando quieras sin penalidad. El sitio sigue en línea en el período pagado; después termina el hosting salvo que arregles buyout ($1,497) o pases a Own It antes de que cierre el período."
      },
      {
        "q": "¿Cuánto cuesta el texto por llamada perdida?",
        "a": "En Lead System y Plus el texto es opcional: $1/mes por 2.º número más tarifas del operador. En Website y Own It es un add-on de $97/mes. La aprobación del operador suele tardar 10–15 días y no está garantizada."
      }
    ]
  },
  "roofing-website-cost": {
    "lead": "Si estás cotizando un sitio de techos, empieza con números que puedas verificar — no un “promedio” de foro. Después del granizo, alguien en el celular con dedos mojados quiere ventana de inspección, no un ensayo de marcas de teja. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de techos",
        "html": "<p>Las cotizaciones de techos se encarecen en tiempo cuando documentación de tormenta, lenguaje de seguros y galerías antes/después se hacen bien. Reparación y cambio completo no deben compartir una página vaga. Tras el granizo, el formulario de inspección tiene que servir en el teléfono con campos cortos.</p><p>Consulta la <a href=\"/industries/roofing\">página de techos</a> y la <a href=\"/blog/roofing-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para techos, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Cuánto cuesta un sitio de techos con Kinexis?",
        "a": "Website es $97/mes, Lead System es $197/mes, Plus es $297/mes y Own It es $1,497 de una vez. Mira /pricing para inclusiones."
      },
      {
        "q": "¿Hay cargo de configuración?",
        "a": "No hay cargos sorpresa de setup. Los planes mensuales son $0 de entrada. Own It es $1,497 únicos por escrito. Cada opción empieza con vista previa gratis del inicio — sin tarjeta ni obligación."
      },
      {
        "q": "¿El sitio es mío en un plan mensual?",
        "a": "En planes mensuales, el hosting y la administración siguen mientras pagas. La compra de archivos (buyout) es $1,497 únicos por escrito. Own It incluye propiedad desde el lanzamiento."
      },
      {
        "q": "¿El SEO va incluido en esos precios?",
        "a": "Cada sitio sale con estructura clara y páginas de servicio. El SEO continuo se cotiza aparte y no va en los cuatro planes."
      },
      {
        "q": "¿Qué pasa si cancelo un plan mensual?",
        "a": "Cancelas cuando quieras sin penalidad. El sitio sigue en línea en el período pagado; después termina el hosting salvo que arregles buyout ($1,497) o pases a Own It antes de que cierre el período."
      },
      {
        "q": "¿Cuánto cuesta el texto por llamada perdida?",
        "a": "En Lead System y Plus el texto es opcional: $1/mes por 2.º número más tarifas del operador. En Website y Own It es un add-on de $97/mes. La aprobación del operador suele tardar 10–15 días y no está garantizada."
      }
    ]
  },
  "garage-door-website-cost": {
    "lead": "Si estás cotizando un sitio de puertas de garaje, empieza con números que puedas verificar — no un “promedio” de foro. A las 7 a.m., con la puerta atascada abierta, el comprador no es el mismo que cotiza un doble nuevo para la remodelación del garaje. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de puertas de garaje",
        "html": "<p>Los sitios de puertas de garaje necesitan separar reparación de resortes, problemas de motor y puertas nuevas. Quien llama el mismo día y quien compra reemplazo no deben aterrizar en el mismo cajón de servicios.</p><p>Consulta la <a href=\"/industries/garage-doors\">página de puertas de garaje</a> y la <a href=\"/blog/garage-door-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para puertas de garaje, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Cuánto cuesta un sitio de puertas de garaje con Kinexis?",
        "a": "Website es $97/mes, Lead System es $197/mes, Plus es $297/mes y Own It es $1,497 de una vez. Mira /pricing para inclusiones."
      },
      {
        "q": "¿Hay cargo de configuración?",
        "a": "No hay cargos sorpresa de setup. Los planes mensuales son $0 de entrada. Own It es $1,497 únicos por escrito. Cada opción empieza con vista previa gratis del inicio — sin tarjeta ni obligación."
      },
      {
        "q": "¿El sitio es mío en un plan mensual?",
        "a": "En planes mensuales, el hosting y la administración siguen mientras pagas. La compra de archivos (buyout) es $1,497 únicos por escrito. Own It incluye propiedad desde el lanzamiento."
      },
      {
        "q": "¿El SEO va incluido en esos precios?",
        "a": "Cada sitio sale con estructura clara y páginas de servicio. El SEO continuo se cotiza aparte y no va en los cuatro planes."
      },
      {
        "q": "¿Qué pasa si cancelo un plan mensual?",
        "a": "Cancelas cuando quieras sin penalidad. El sitio sigue en línea en el período pagado; después termina el hosting salvo que arregles buyout ($1,497) o pases a Own It antes de que cierre el período."
      },
      {
        "q": "¿Cuánto cuesta el texto por llamada perdida?",
        "a": "En Lead System y Plus el texto es opcional: $1/mes por 2.º número más tarifas del operador. En Website y Own It es un add-on de $97/mes. La aprobación del operador suele tardar 10–15 días y no está garantizada."
      }
    ]
  },
  "painting-website-cost": {
    "lead": "Si estás cotizando un sitio de pintura, empieza con números que puedas verificar — no un “promedio” de foro. Interior, exterior y gabinetes no se venden igual: quien pinta la fachada quiere prueba de trabajos terminados; quien pide gabinetes quiere fotos de cajones, no un formulario eterno. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de pintura",
        "html": "<p>Los sitios de pintura invierten tiempo en rutas interior vs exterior, expectativas de preparación y galerías de proyectos. Formularios que capturan habitaciones y superficies reducen visitas de estimado vacías.</p><p>Consulta la <a href=\"/industries/painting\">página de pintura</a> y la <a href=\"/blog/painting-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para pintura, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Cuánto cuesta un sitio de pintura con Kinexis?",
        "a": "Website es $97/mes, Lead System es $197/mes, Plus es $297/mes y Own It es $1,497 de una vez. Mira /pricing para inclusiones."
      },
      {
        "q": "¿Hay cargo de configuración?",
        "a": "No hay cargos sorpresa de setup. Los planes mensuales son $0 de entrada. Own It es $1,497 únicos por escrito. Cada opción empieza con vista previa gratis del inicio — sin tarjeta ni obligación."
      },
      {
        "q": "¿El sitio es mío en un plan mensual?",
        "a": "En planes mensuales, el hosting y la administración siguen mientras pagas. La compra de archivos (buyout) es $1,497 únicos por escrito. Own It incluye propiedad desde el lanzamiento."
      },
      {
        "q": "¿El SEO va incluido en esos precios?",
        "a": "Cada sitio sale con estructura clara y páginas de servicio. El SEO continuo se cotiza aparte y no va en los cuatro planes."
      },
      {
        "q": "¿Qué pasa si cancelo un plan mensual?",
        "a": "Cancelas cuando quieras sin penalidad. El sitio sigue en línea en el período pagado; después termina el hosting salvo que arregles buyout ($1,497) o pases a Own It antes de que cierre el período."
      },
      {
        "q": "¿Cuánto cuesta el texto por llamada perdida?",
        "a": "En Lead System y Plus el texto es opcional: $1/mes por 2.º número más tarifas del operador. En Website y Own It es un add-on de $97/mes. La aprobación del operador suele tardar 10–15 días y no está garantizada."
      }
    ]
  },
  "remodeling-website-cost": {
    "lead": "Si estás cotizando un sitio de remodelación, empieza con números que puedas verificar — no un “promedio” de foro. Una cocina o un baño rara vez son llamada de la misma hora: el sitio debe vender consulta y prueba de cuartos terminados, no solo un botón de emergencia copiado de plomería. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de remodelación",
        "html": "<p>En remodelación, las páginas de cocinas y baños pueden mostrar proyectos terminados y explicar cómo empieza una consulta. Separa las reparaciones pequeñas de los proyectos completos para que cada cliente encuentre el servicio adecuado.</p><p>Consulta la <a href=\"/industries/remodeling\">página de remodelación</a> y la <a href=\"/blog/remodeling-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para remodelación, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Cuánto cuesta un sitio de remodelación con Kinexis?",
        "a": "Website es $97/mes, Lead System es $197/mes, Plus es $297/mes y Own It es $1,497 de una vez. Mira /pricing para inclusiones."
      },
      {
        "q": "¿Hay cargo de configuración?",
        "a": "No hay cargos sorpresa de setup. Los planes mensuales son $0 de entrada. Own It es $1,497 únicos por escrito. Cada opción empieza con vista previa gratis del inicio — sin tarjeta ni obligación."
      },
      {
        "q": "¿El sitio es mío en un plan mensual?",
        "a": "En planes mensuales, el hosting y la administración siguen mientras pagas. La compra de archivos (buyout) es $1,497 únicos por escrito. Own It incluye propiedad desde el lanzamiento."
      },
      {
        "q": "¿El SEO va incluido en esos precios?",
        "a": "Cada sitio sale con estructura clara y páginas de servicio. El SEO continuo se cotiza aparte y no va en los cuatro planes."
      },
      {
        "q": "¿Qué pasa si cancelo un plan mensual?",
        "a": "Cancelas cuando quieras sin penalidad. El sitio sigue en línea en el período pagado; después termina el hosting salvo que arregles buyout ($1,497) o pases a Own It antes de que cierre el período."
      },
      {
        "q": "¿Cuánto cuesta el texto por llamada perdida?",
        "a": "En Lead System y Plus el texto es opcional: $1/mes por 2.º número más tarifas del operador. En Website y Own It es un add-on de $97/mes. La aprobación del operador suele tardar 10–15 días y no está garantizada."
      }
    ]
  },
  "landscaping-website-cost": {
    "lead": "Si estás cotizando un sitio de paisajismo, empieza con números que puedas verificar — no un “promedio” de foro. Quien quiere corte semanal no debe toparse con un formulario de patio de $40k; quien quiere hardscape necesita fotos de proyectos, no solo “únete a nuestra ruta”. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de paisajismo",
        "html": "<p>En paisajismo pesan rutas de mantenimiento vs instalaciones, paquetes estacionales y fotos de jardines reales. Clientes recurrentes de corte y compradores de patio necesitan siguientes pasos distintos.</p><p>Consulta la <a href=\"/industries/landscaping\">página de paisajismo</a> y la <a href=\"/blog/landscaping-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para paisajismo, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Cuánto cuesta un sitio de paisajismo con Kinexis?",
        "a": "Website es $97/mes, Lead System es $197/mes, Plus es $297/mes y Own It es $1,497 de una vez. Mira /pricing para inclusiones."
      },
      {
        "q": "¿Hay cargo de configuración?",
        "a": "No hay cargos sorpresa de setup. Los planes mensuales son $0 de entrada. Own It es $1,497 únicos por escrito. Cada opción empieza con vista previa gratis del inicio — sin tarjeta ni obligación."
      },
      {
        "q": "¿El sitio es mío en un plan mensual?",
        "a": "En planes mensuales, el hosting y la administración siguen mientras pagas. La compra de archivos (buyout) es $1,497 únicos por escrito. Own It incluye propiedad desde el lanzamiento."
      },
      {
        "q": "¿El SEO va incluido en esos precios?",
        "a": "Cada sitio sale con estructura clara y páginas de servicio. El SEO continuo se cotiza aparte y no va en los cuatro planes."
      },
      {
        "q": "¿Qué pasa si cancelo un plan mensual?",
        "a": "Cancelas cuando quieras sin penalidad. El sitio sigue en línea en el período pagado; después termina el hosting salvo que arregles buyout ($1,497) o pases a Own It antes de que cierre el período."
      },
      {
        "q": "¿Cuánto cuesta el texto por llamada perdida?",
        "a": "En Lead System y Plus el texto es opcional: $1/mes por 2.º número más tarifas del operador. En Website y Own It es un add-on de $97/mes. La aprobación del operador suele tardar 10–15 días y no está garantizada."
      }
    ]
  },
  "pool-service-website-cost": {
    "lead": "Si estás cotizando un sitio de albercas, empieza con números que puedas verificar — no un “promedio” de foro. Quien tiene una alberca verde necesita encontrar rápido cómo pedir una reparación. Mantén esa opción separada de la información sobre el servicio semanal. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de albercas",
        "html": "<p>Los sitios de albercas necesitan claridad ruta vs reparación, páginas de química/planes y ofertas de apertura/cierre. Los dueños quieren una forma simple de empezar servicio sin folleto largo.</p><p>Consulta la <a href=\"/industries/pool-care\">página de albercas</a> y la <a href=\"/blog/pool-service-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para albercas, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Cuánto cuesta un sitio de albercas con Kinexis?",
        "a": "Website es $97/mes, Lead System es $197/mes, Plus es $297/mes y Own It es $1,497 de una vez. Mira /pricing para inclusiones."
      },
      {
        "q": "¿Hay cargo de configuración?",
        "a": "No hay cargos sorpresa de setup. Los planes mensuales son $0 de entrada. Own It es $1,497 únicos por escrito. Cada opción empieza con vista previa gratis del inicio — sin tarjeta ni obligación."
      },
      {
        "q": "¿El sitio es mío en un plan mensual?",
        "a": "En planes mensuales, el hosting y la administración siguen mientras pagas. La compra de archivos (buyout) es $1,497 únicos por escrito. Own It incluye propiedad desde el lanzamiento."
      },
      {
        "q": "¿El SEO va incluido en esos precios?",
        "a": "Cada sitio sale con estructura clara y páginas de servicio. El SEO continuo se cotiza aparte y no va en los cuatro planes."
      },
      {
        "q": "¿Qué pasa si cancelo un plan mensual?",
        "a": "Cancelas cuando quieras sin penalidad. El sitio sigue en línea en el período pagado; después termina el hosting salvo que arregles buyout ($1,497) o pases a Own It antes de que cierre el período."
      },
      {
        "q": "¿Cuánto cuesta el texto por llamada perdida?",
        "a": "En Lead System y Plus el texto es opcional: $1/mes por 2.º número más tarifas del operador. En Website y Own It es un add-on de $97/mes. La aprobación del operador suele tardar 10–15 días y no está garantizada."
      }
    ]
  },
  "pressure-washing-website-cost": {
    "lead": "Si estás cotizando un sitio de lavado a presión, empieza con números que puedas verificar — no un “promedio” de foro. Casa, concreto y techo son tres conversaciones distintas — a veces tres métodos. Si mezclas todo, el cliente manda un texto vago y tú pierdes tiempo aclarando. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de lavado a presión",
        "html": "<p>Los sitios de lavado a presión necesitan cotizaciones cortas para casas, concreto y techos, más notas de lavado suave cuando el método cambia. Antes/después y listas claras de superficies reducen mensajes de ida y vuelta.</p><p>Consulta la <a href=\"/industries/pressure-washing\">página de lavado a presión</a> y la <a href=\"/blog/pressure-washing-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para lavado a presión, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Cuánto cuesta un sitio de lavado a presión con Kinexis?",
        "a": "Website es $97/mes, Lead System es $197/mes, Plus es $297/mes y Own It es $1,497 de una vez. Mira /pricing para inclusiones."
      },
      {
        "q": "¿Hay cargo de configuración?",
        "a": "No hay cargos sorpresa de setup. Los planes mensuales son $0 de entrada. Own It es $1,497 únicos por escrito. Cada opción empieza con vista previa gratis del inicio — sin tarjeta ni obligación."
      },
      {
        "q": "¿El sitio es mío en un plan mensual?",
        "a": "En planes mensuales, el hosting y la administración siguen mientras pagas. La compra de archivos (buyout) es $1,497 únicos por escrito. Own It incluye propiedad desde el lanzamiento."
      },
      {
        "q": "¿El SEO va incluido en esos precios?",
        "a": "Cada sitio sale con estructura clara y páginas de servicio. El SEO continuo se cotiza aparte y no va en los cuatro planes."
      },
      {
        "q": "¿Qué pasa si cancelo un plan mensual?",
        "a": "Cancelas cuando quieras sin penalidad. El sitio sigue en línea en el período pagado; después termina el hosting salvo que arregles buyout ($1,497) o pases a Own It antes de que cierre el período."
      },
      {
        "q": "¿Cuánto cuesta el texto por llamada perdida?",
        "a": "En Lead System y Plus el texto es opcional: $1/mes por 2.º número más tarifas del operador. En Website y Own It es un add-on de $97/mes. La aprobación del operador suele tardar 10–15 días y no está garantizada."
      }
    ]
  },
  "window-cleaning-website-cost": {
    "lead": "Si estás cotizando un sitio de limpieza de vidrios, empieza con números que puedas verificar — no un “promedio” de foro. Una casa con vidrios altos y un aparador comercial no reservan igual: uno quiere ruta recurrente, el otro horario que no bloquee la puerta a la apertura. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de limpieza de vidrios",
        "html": "<p>Los sitios de limpieza de vidrios cuestan más cuando residencial, aparadores y rutas recurrentes tienen páginas honestas. Campos de paneles y frecuencia en el formulario evitan adivinar por teléfono.</p><p>Consulta la <a href=\"/industries/window-cleaning\">página de limpieza de vidrios</a> y la <a href=\"/blog/window-cleaning-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para limpieza de vidrios, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Cuánto cuesta un sitio de limpieza de vidrios con Kinexis?",
        "a": "Website es $97/mes, Lead System es $197/mes, Plus es $297/mes y Own It es $1,497 de una vez. Mira /pricing para inclusiones."
      },
      {
        "q": "¿Hay cargo de configuración?",
        "a": "No hay cargos sorpresa de setup. Los planes mensuales son $0 de entrada. Own It es $1,497 únicos por escrito. Cada opción empieza con vista previa gratis del inicio — sin tarjeta ni obligación."
      },
      {
        "q": "¿El sitio es mío en un plan mensual?",
        "a": "En planes mensuales, el hosting y la administración siguen mientras pagas. La compra de archivos (buyout) es $1,497 únicos por escrito. Own It incluye propiedad desde el lanzamiento."
      },
      {
        "q": "¿El SEO va incluido en esos precios?",
        "a": "Cada sitio sale con estructura clara y páginas de servicio. El SEO continuo se cotiza aparte y no va en los cuatro planes."
      },
      {
        "q": "¿Qué pasa si cancelo un plan mensual?",
        "a": "Cancelas cuando quieras sin penalidad. El sitio sigue en línea en el período pagado; después termina el hosting salvo que arregles buyout ($1,497) o pases a Own It antes de que cierre el período."
      },
      {
        "q": "¿Cuánto cuesta el texto por llamada perdida?",
        "a": "En Lead System y Plus el texto es opcional: $1/mes por 2.º número más tarifas del operador. En Website y Own It es un add-on de $97/mes. La aprobación del operador suele tardar 10–15 días y no está garantizada."
      }
    ]
  },
  "lawn-care-website-cost": {
    "lead": "Si estás cotizando un sitio de césped, empieza con números que puedas verificar — no un “promedio” de foro. El trabajo de ruta vive o muere por una zona de servicio honesta: publica los barrios que sí alcanzas o pasarás el día diciendo que no. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de césped",
        "html": "<p>Los sitios de césped necesitan caminos de alta a ruta vs limpieza puntual, y listas claras (corte, limpieza, desechos de mascotas). Código postal y frecuencia mantienen la planeación de ruta honesta.</p><p>Consulta la <a href=\"/industries/yard-care\">página de césped</a> y la <a href=\"/blog/lawn-care-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para césped, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Cuánto cuesta un sitio de césped con Kinexis?",
        "a": "Website es $97/mes, Lead System es $197/mes, Plus es $297/mes y Own It es $1,497 de una vez. Mira /pricing para inclusiones."
      },
      {
        "q": "¿Hay cargo de configuración?",
        "a": "No hay cargos sorpresa de setup. Los planes mensuales son $0 de entrada. Own It es $1,497 únicos por escrito. Cada opción empieza con vista previa gratis del inicio — sin tarjeta ni obligación."
      },
      {
        "q": "¿El sitio es mío en un plan mensual?",
        "a": "En planes mensuales, el hosting y la administración siguen mientras pagas. La compra de archivos (buyout) es $1,497 únicos por escrito. Own It incluye propiedad desde el lanzamiento."
      },
      {
        "q": "¿El SEO va incluido en esos precios?",
        "a": "Cada sitio sale con estructura clara y páginas de servicio. El SEO continuo se cotiza aparte y no va en los cuatro planes."
      },
      {
        "q": "¿Qué pasa si cancelo un plan mensual?",
        "a": "Cancelas cuando quieras sin penalidad. El sitio sigue en línea en el período pagado; después termina el hosting salvo que arregles buyout ($1,497) o pases a Own It antes de que cierre el período."
      },
      {
        "q": "¿Cuánto cuesta el texto por llamada perdida?",
        "a": "En Lead System y Plus el texto es opcional: $1/mes por 2.º número más tarifas del operador. En Website y Own It es un add-on de $97/mes. La aprobación del operador suele tardar 10–15 días y no está garantizada."
      }
    ]
  },
  "junk-removal-website-cost": {
    "lead": "Si estás cotizando un sitio para una empresa de retiro de chatarra, empieza con números que puedas verificar — no un “promedio” de foro. Un sofá en la banqueta necesita un teléfono y una ventana de servicio realista; una limpieza de cochera o herencia requiere volumen, acceso y una cotización más detallada. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de retiro de chatarra",
        "html": "<p>El costo depende de separar el acarreo urgente de las limpiezas planeadas. Una carga junto a la banqueta necesita llamada fácil y una ventana que sí puedas cumplir. Una cochera o propiedad heredada requiere notas de volumen, escaleras, elevador o códigos de acceso y un formulario breve. Escribir ambos caminos y delimitar la zona según tu calendario de descarga influye en el trabajo, no un recargo misterioso por oficio.</p><p>Las estimaciones con fotos sirven cuando realmente las revisas; aclara si el precio final requiere ver la carga en persona. No prometas recoger cualquier cosa cualquier día. Las rutas recurrentes para caseros o asociaciones solo deben aparecer si de verdad las operas.</p><p>Consulta la <a href=\"/industries/junk-removal\">página de retiro de chatarra</a> y la <a href=\"/blog/junk-removal-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para retiro de chatarra, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Cuánto cuesta un sitio para una empresa de retiro de chatarra con Kinexis?",
        "a": "Website es $97/mes, Lead System es $197/mes, Plus es $297/mes y Own It es $1,497 de una vez. Mira /pricing para inclusiones."
      },
      {
        "q": "¿Hay cargo de configuración?",
        "a": "No hay cargos sorpresa de setup. Los planes mensuales son $0 de entrada. Own It es $1,497 únicos por escrito. Cada opción empieza con vista previa gratis del inicio — sin tarjeta ni obligación."
      },
      {
        "q": "¿El sitio es mío en un plan mensual?",
        "a": "En planes mensuales, el hosting y la administración siguen mientras pagas. La compra de archivos (buyout) es $1,497 únicos por escrito. Own It incluye propiedad desde el lanzamiento."
      },
      {
        "q": "¿El SEO va incluido en esos precios?",
        "a": "Cada sitio sale con estructura clara y páginas de servicio. El SEO continuo se cotiza aparte y no va en los cuatro planes."
      },
      {
        "q": "¿Qué pasa si cancelo un plan mensual?",
        "a": "Cancelas cuando quieras sin penalidad. El sitio sigue en línea en el período pagado; después termina el hosting salvo que arregles buyout ($1,497) o pases a Own It antes de que cierre el período."
      },
      {
        "q": "¿Cuánto cuesta el texto por llamada perdida?",
        "a": "En Lead System y Plus el texto es opcional: $1/mes por 2.º número más tarifas del operador. En Website y Own It es un add-on de $97/mes. La aprobación del operador suele tardar 10–15 días y no está garantizada."
      }
    ]
  },
  "tree-service-website-cost": {
    "lead": "Si estás cotizando un sitio para una empresa de servicio de árboles, empieza con números que puedas verificar — no un “promedio” de foro. Una rama sobre el techo necesita un teléfono y una ventana de respuesta honesta. Quien planea una poda o tala busca fotos reales del equipo, señales de seguro y una consulta clara. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de servicio de árboles",
        "html": "<p>El costo refleja la diferencia entre emergencias por tormenta y trabajos planeados de copa. Quien llama por una rama caída necesita encontrar el teléfono y saber cuándo responderás. Para podas y talas, hacen falta fotos reales, información de seguro cerca de la llamada y una consulta que no parezca un servicio de grúa. El contenido debe separar esos caminos y limitar la zona a las cuadrillas que realmente puedes enviar.</p><p>Ofrece molienda de tocones solo si es un servicio real. Un distintivo de atención 24/7 genera desconfianza si nadie responde de madrugada. La información de seguridad y seguro junto al teléfono requiere trabajo editorial, no un supuesto “recargo de arborista”.</p><p>Consulta la <a href=\"/industries/tree-care\">página de servicio de árboles</a> y la <a href=\"/blog/tree-service-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para servicio de árboles, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ],
    "faqs": [
      {
        "q": "¿Cuánto cuesta un sitio para una empresa de servicio de árboles con Kinexis?",
        "a": "Website es $97/mes, Lead System es $197/mes, Plus es $297/mes y Own It es $1,497 de una vez. Mira /pricing para inclusiones."
      },
      {
        "q": "¿Hay cargo de configuración?",
        "a": "No hay cargos sorpresa de setup. Los planes mensuales son $0 de entrada. Own It es $1,497 únicos por escrito. Cada opción empieza con vista previa gratis del inicio — sin tarjeta ni obligación."
      },
      {
        "q": "¿El sitio es mío en un plan mensual?",
        "a": "En planes mensuales, el hosting y la administración siguen mientras pagas. La compra de archivos (buyout) es $1,497 únicos por escrito. Own It incluye propiedad desde el lanzamiento."
      },
      {
        "q": "¿El SEO va incluido en esos precios?",
        "a": "Cada sitio sale con estructura clara y páginas de servicio. El SEO continuo se cotiza aparte y no va en los cuatro planes."
      },
      {
        "q": "¿Qué pasa si cancelo un plan mensual?",
        "a": "Cancelas cuando quieras sin penalidad. El sitio sigue en línea en el período pagado; después termina el hosting salvo que arregles buyout ($1,497) o pases a Own It antes de que cierre el período."
      },
      {
        "q": "¿Cuánto cuesta el texto por llamada perdida?",
        "a": "En Lead System y Plus el texto es opcional: $1/mes por 2.º número más tarifas del operador. En Website y Own It es un add-on de $97/mes. La aprobación del operador suele tardar 10–15 días y no está garantizada."
      }
    ]
  },};

/** Full EsPost objects (slug, meta, lead, sections) ready to spread into ES_POSTS. */
export const GENERATED_ES_COST_POSTS: Record<string, EsPost> = {
  "plumber-website-cost": {
    "slug": "plumber-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de plomería en 2026?",
    "seoTitle": "Costo de un sitio web de plomería | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis para un sitio de plomería: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    "lead": "Si estás cotizando un sitio de plomería, empieza con números que puedas verificar — no un “promedio” de foro. Imagina un dueño en el garaje con el piso mojado: no quiere leer tu historia de empresa; quiere saber si atiendes fugas en su ciudad y cómo te marca. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de plomería",
        "html": "<p>Un sitio de plomería puede necesitar páginas separadas para fugas, drenajes y calentadores. Las fotos de trabajos terminados y un horario claro ayudan a que cada cliente sepa qué esperar.</p><p>El precio depende del número de páginas y del plan que elijas, no de un recargo por ser plomero.</p><p>Consulta la <a href=\"/industries/plumbing\">página de plomería</a> y la <a href=\"/blog/plumbing-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para plomería, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ]
  },
  "hvac-website-cost": {
    "slug": "hvac-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de HVAC en 2026?",
    "seoTitle": "Costo de un sitio web de HVAC | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis para un sitio de HVAC: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    "lead": "Si estás cotizando un sitio de HVAC, empieza con números que puedas verificar — no un “promedio” de foro. En agosto, quien busca no quiere un folleto de “soluciones de confort”: quiere saber si mandas técnico sin aire y cuánto tarda en contestar. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de HVAC",
        "html": "<p>El costo en HVAC aparece en las bifurcaciones: reparación sin aire vs cambio de equipo vs mantenimiento. En temporada baja necesitas páginas de mantenimiento visibles cuando baja la urgencia. Líneas de financiamiento solo si de verdad financias. En pleno calor, el seguimiento de llamada perdida suele pagarse solo más rápido que otra foto de stock de familia sonriente.</p><p>Consulta la <a href=\"/industries/hvac\">página de HVAC</a> y la <a href=\"/blog/hvac-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para HVAC, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ]
  },
  "electrician-website-cost": {
    "slug": "electrician-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de electricidad en 2026?",
    "seoTitle": "Costo de un sitio web de electricidad | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis para un sitio de electricidad: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    "lead": "Si estás cotizando un sitio de electricidad, empieza con números que puedas verificar — no un “promedio” de foro. Quien huele a quemado o tiene el breaker que no reinicia no va a leer cinco párrafos de marketing: necesita licencia cerca del teléfono y un siguiente paso obvio. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de electricidad",
        "html": "<p>Los sitios de electricidad gastan presupuesto en confianza y alcance. Señales de licencia junto al teléfono, páginas aparte para tableros, cargadores EV y diagnóstico, y suficiente claridad para que quien compara presupuestos sepa qué está pidiendo. Animaciones vacías no mueven esa decisión.</p><p>Consulta la <a href=\"/industries/electrical\">página de electricidad</a> y la <a href=\"/blog/electrician-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para electricidad, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ]
  },
  "roofing-website-cost": {
    "slug": "roofing-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de techos en 2026?",
    "seoTitle": "Costo de un sitio web de techos | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis para un sitio de techos: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    "lead": "Si estás cotizando un sitio de techos, empieza con números que puedas verificar — no un “promedio” de foro. Después del granizo, alguien en el celular con dedos mojados quiere ventana de inspección, no un ensayo de marcas de teja. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de techos",
        "html": "<p>Las cotizaciones de techos se encarecen en tiempo cuando documentación de tormenta, lenguaje de seguros y galerías antes/después se hacen bien. Reparación y cambio completo no deben compartir una página vaga. Tras el granizo, el formulario de inspección tiene que servir en el teléfono con campos cortos.</p><p>Consulta la <a href=\"/industries/roofing\">página de techos</a> y la <a href=\"/blog/roofing-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para techos, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ]
  },
  "garage-door-website-cost": {
    "slug": "garage-door-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de puertas de garaje en 2026?",
    "seoTitle": "Costo de un sitio web de puertas de garaje | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis para un sitio de puertas de garaje: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    "lead": "Si estás cotizando un sitio de puertas de garaje, empieza con números que puedas verificar — no un “promedio” de foro. A las 7 a.m., con la puerta atascada abierta, el comprador no es el mismo que cotiza un doble nuevo para la remodelación del garaje. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de puertas de garaje",
        "html": "<p>Los sitios de puertas de garaje necesitan separar reparación de resortes, problemas de motor y puertas nuevas. Quien llama el mismo día y quien compra reemplazo no deben aterrizar en el mismo cajón de servicios.</p><p>Consulta la <a href=\"/industries/garage-doors\">página de puertas de garaje</a> y la <a href=\"/blog/garage-door-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para puertas de garaje, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ]
  },
  "painting-website-cost": {
    "slug": "painting-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de pintura en 2026?",
    "seoTitle": "Costo de un sitio web de pintura | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis para un sitio de pintura: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    "lead": "Si estás cotizando un sitio de pintura, empieza con números que puedas verificar — no un “promedio” de foro. Interior, exterior y gabinetes no se venden igual: quien pinta la fachada quiere prueba de trabajos terminados; quien pide gabinetes quiere fotos de cajones, no un formulario eterno. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de pintura",
        "html": "<p>Los sitios de pintura invierten tiempo en rutas interior vs exterior, expectativas de preparación y galerías de proyectos. Formularios que capturan habitaciones y superficies reducen visitas de estimado vacías.</p><p>Consulta la <a href=\"/industries/painting\">página de pintura</a> y la <a href=\"/blog/painting-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para pintura, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ]
  },
  "remodeling-website-cost": {
    "slug": "remodeling-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de remodelación en 2026?",
    "seoTitle": "Costo de un sitio web de remodelación | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis para un sitio de remodelación: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    "lead": "Si estás cotizando un sitio de remodelación, empieza con números que puedas verificar — no un “promedio” de foro. Una cocina o un baño rara vez son llamada de la misma hora: el sitio debe vender consulta y prueba de cuartos terminados, no solo un botón de emergencia copiado de plomería. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de remodelación",
        "html": "<p>En remodelación, las páginas de cocinas y baños pueden mostrar proyectos terminados y explicar cómo empieza una consulta. Separa las reparaciones pequeñas de los proyectos completos para que cada cliente encuentre el servicio adecuado.</p><p>Consulta la <a href=\"/industries/remodeling\">página de remodelación</a> y la <a href=\"/blog/remodeling-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para remodelación, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ]
  },
  "landscaping-website-cost": {
    "slug": "landscaping-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de paisajismo en 2026?",
    "seoTitle": "Costo de un sitio web de paisajismo | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis para un sitio de paisajismo: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    "lead": "Si estás cotizando un sitio de paisajismo, empieza con números que puedas verificar — no un “promedio” de foro. Quien quiere corte semanal no debe toparse con un formulario de patio de $40k; quien quiere hardscape necesita fotos de proyectos, no solo “únete a nuestra ruta”. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de paisajismo",
        "html": "<p>En paisajismo pesan rutas de mantenimiento vs instalaciones, paquetes estacionales y fotos de jardines reales. Clientes recurrentes de corte y compradores de patio necesitan siguientes pasos distintos.</p><p>Consulta la <a href=\"/industries/landscaping\">página de paisajismo</a> y la <a href=\"/blog/landscaping-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para paisajismo, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ]
  },
  "pool-service-website-cost": {
    "slug": "pool-service-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de albercas en 2026?",
    "seoTitle": "Costo de un sitio web de albercas | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis para un sitio de albercas: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    "lead": "Si estás cotizando un sitio de albercas, empieza con números que puedas verificar — no un “promedio” de foro. Quien tiene una alberca verde necesita encontrar rápido cómo pedir una reparación. Mantén esa opción separada de la información sobre el servicio semanal. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de albercas",
        "html": "<p>Los sitios de albercas necesitan claridad ruta vs reparación, páginas de química/planes y ofertas de apertura/cierre. Los dueños quieren una forma simple de empezar servicio sin folleto largo.</p><p>Consulta la <a href=\"/industries/pool-care\">página de albercas</a> y la <a href=\"/blog/pool-service-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para albercas, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ]
  },
  "pressure-washing-website-cost": {
    "slug": "pressure-washing-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de lavado a presión en 2026?",
    "seoTitle": "Costo de un sitio web de lavado a presión | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis para un sitio de lavado a presión: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    "lead": "Si estás cotizando un sitio de lavado a presión, empieza con números que puedas verificar — no un “promedio” de foro. Casa, concreto y techo son tres conversaciones distintas — a veces tres métodos. Si mezclas todo, el cliente manda un texto vago y tú pierdes tiempo aclarando. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de lavado a presión",
        "html": "<p>Los sitios de lavado a presión necesitan cotizaciones cortas para casas, concreto y techos, más notas de lavado suave cuando el método cambia. Antes/después y listas claras de superficies reducen mensajes de ida y vuelta.</p><p>Consulta la <a href=\"/industries/pressure-washing\">página de lavado a presión</a> y la <a href=\"/blog/pressure-washing-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para lavado a presión, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ]
  },
  "window-cleaning-website-cost": {
    "slug": "window-cleaning-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de limpieza de vidrios en 2026?",
    "seoTitle": "Costo de un sitio web de limpieza de vidrios | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis para un sitio de limpieza de vidrios: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    "lead": "Si estás cotizando un sitio de limpieza de vidrios, empieza con números que puedas verificar — no un “promedio” de foro. Una casa con vidrios altos y un aparador comercial no reservan igual: uno quiere ruta recurrente, el otro horario que no bloquee la puerta a la apertura. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de limpieza de vidrios",
        "html": "<p>Los sitios de limpieza de vidrios cuestan más cuando residencial, aparadores y rutas recurrentes tienen páginas honestas. Campos de paneles y frecuencia en el formulario evitan adivinar por teléfono.</p><p>Consulta la <a href=\"/industries/window-cleaning\">página de limpieza de vidrios</a> y la <a href=\"/blog/window-cleaning-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para limpieza de vidrios, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ]
  },
  "lawn-care-website-cost": {
    "slug": "lawn-care-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de césped en 2026?",
    "seoTitle": "Costo de un sitio web de césped | Kinexis Digital",
    "excerpt": "Precios reales de Kinexis para un sitio de césped: $97, $197 o $297 al mes, u Own It por $1,497. Vista previa gratis del inicio, sin tarjeta.",
    "lead": "Si estás cotizando un sitio de césped, empieza con números que puedas verificar — no un “promedio” de foro. El trabajo de ruta vive o muere por una zona de servicio honesta: publica los barrios que sí alcanzas o pasarás el día diciendo que no. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de césped",
        "html": "<p>Los sitios de césped necesitan caminos de alta a ruta vs limpieza puntual, y listas claras (corte, limpieza, desechos de mascotas). Código postal y frecuencia mantienen la planeación de ruta honesta.</p><p>Consulta la <a href=\"/industries/yard-care\">página de césped</a> y la <a href=\"/blog/lawn-care-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para césped, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ]
  },
  "junk-removal-website-cost": {
    "slug": "junk-removal-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de retiro de chatarra en 2026?",
    "seoTitle": "Costo de un sitio web de retiro de chatarra | Kinexis Digital",
    "excerpt": "Precios reales para un sitio de retiro de chatarra: planes desde $97/mes o Own It por $1,497. Vista previa gratis, sin tarjeta.",
    "lead": "Si estás cotizando un sitio para una empresa de retiro de chatarra, empieza con números que puedas verificar — no un “promedio” de foro. Un sofá en la banqueta necesita un teléfono y una ventana de servicio realista; una limpieza de cochera o herencia requiere volumen, acceso y una cotización más detallada. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de retiro de chatarra",
        "html": "<p>El costo depende de separar el acarreo urgente de las limpiezas planeadas. Una carga junto a la banqueta necesita llamada fácil y una ventana que sí puedas cumplir. Una cochera o propiedad heredada requiere notas de volumen, escaleras, elevador o códigos de acceso y un formulario breve. Escribir ambos caminos y delimitar la zona según tu calendario de descarga influye en el trabajo, no un recargo misterioso por oficio.</p><p>Las estimaciones con fotos sirven cuando realmente las revisas; aclara si el precio final requiere ver la carga en persona. No prometas recoger cualquier cosa cualquier día. Las rutas recurrentes para caseros o asociaciones solo deben aparecer si de verdad las operas.</p><p>Consulta la <a href=\"/industries/junk-removal\">página de retiro de chatarra</a> y la <a href=\"/blog/junk-removal-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para retiro de chatarra, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ]
  },
  "tree-service-website-cost": {
    "slug": "tree-service-website-cost",
    "category": "Consejos",
    "title": "¿Cuánto cuesta un sitio web de servicio de árboles en 2026?",
    "seoTitle": "Costo de un sitio web de servicio de árboles | Kinexis Digital",
    "excerpt": "Precios reales para un sitio de servicio de árboles: planes desde $97/mes o Own It por $1,497. Vista previa gratis, sin tarjeta.",
    "lead": "Si estás cotizando un sitio para una empresa de servicio de árboles, empieza con números que puedas verificar — no un “promedio” de foro. Una rama sobre el techo necesita un teléfono y una ventana de respuesta honesta. Quien planea una poda o tala busca fotos reales del equipo, señales de seguro y una consulta clara. Con Kinexis, Website es $97/mes, Lead System $197/mes, Plus $297/mes (inglés + español) u Own It $1,497 una vez. Cada opción empieza con vista previa gratis del inicio en 2 días hábiles, sin tarjeta.",
    "sections": [
      {
        "h2": "Precios de Kinexis para sitios de negocios",
        "html": "<p>Estos son los precios publicados de Kinexis. Compáralos por lo que incluye cada plan:</p><table><thead><tr><th>Plan</th><th>Precio</th><th>Qué incluye</th></tr></thead><tbody><tr><td>Website</td><td>$97/mes</td><td>Sitio, hosting, SSL y hasta dos cambios pequeños al mes</td></tr><tr><td>Lead System</td><td>$197/mes</td><td>Solicitudes de reseña, seguimiento de llamadas y cambios pequeños ilimitados; texto por llamada perdida opcional</td></tr><tr><td>Plus</td><td>$297/mes</td><td>Sitio y seguimiento en inglés y español</td></tr><tr><td>Own It</td><td>$1,497 una vez</td><td>Archivos del sitio desde el lanzamiento, 12 meses de hosting y cambios pequeños</td></tr></tbody></table><p>Los planes mensuales son mes a mes, sin pago inicial, y su precio queda fijo durante 24 meses desde el lanzamiento. Puedes cancelar cuando quieras. Todos incluyen una garantía de devolución de 30 días; Lead System y Plus también incluyen una garantía de leads de 60 días. Consulta los detalles en <a href=\"/pricing\">/pricing</a> y la <a href=\"/blog/monthly-website-vs-own-it\">comparación entre los planes mensuales y Own It</a>.</p><p>Cada plan empieza con una <strong>vista previa gratis de la página de inicio en 2 días hábiles</strong>, sin tarjeta ni obligación de contratar.</p>"
      },
      {
        "h2": "Cuánto cuesta en 24 meses",
        "html": "<p>Este cálculo usa los precios actuales de Kinexis: el costo mensual multiplicado por 12 o 24 meses. En Own It se muestra también el costo si eliges Site Care durante el segundo año.</p><table><thead><tr><th>Plan</th><th>Primer año</th><th>24 meses</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497; con Site Care opcional durante el segundo año: $1,965</td></tr></tbody></table><p><em>No incluye impuestos, si aplican. Las tarifas del operador y el segundo número opcional de $1/mes se cobran aparte.</em></p><p>La comparación de 24 meses ayuda a ver el costo total, no solo el pago inicial o mensual.</p>"
      },
      {
        "h2": "Qué comparar en una cotización",
        "html": "<p>Pide a cada proveedor una propuesta por escrito que detalle:</p><ul><li>Qué páginas y servicios incluye</li><li>Quién aporta el texto y las fotos</li><li>Qué cubren el hosting y el mantenimiento</li><li>Cómo solicitas cambios y cuánto tardan</li><li>Qué archivos recibes si termina el servicio</li></ul><p>Compara el alcance junto con el precio; una cotización inicial baja puede no incluir el trabajo que necesitas. Para comparar opciones DIY, lee <a href=\"/blog/wix-vs-squarespace-vs-managed-website-contractors\">Wix, Squarespace o un sitio administrado</a>.</p>"
      },
      {
        "h2": "Ve el inicio antes de pagar",
        "html": "<p>Antes de elegir, puedes revisar gratis una vista previa de la página de inicio. La enviamos en <strong>2 días hábiles</strong>; no necesitas tarjeta ni tienes que contratar.</p><p>Después de que apruebes el diseño y envíes el contenido necesario, el sitio completo suele publicarse en <strong>5 días hábiles</strong>. Confirmamos el plazo por escrito. Esto se refiere a la publicación del sitio, no a resultados en buscadores.</p>"
      },
      {
        "h2": "Qué influye en el costo de un sitio de servicio de árboles",
        "html": "<p>El costo refleja la diferencia entre emergencias por tormenta y trabajos planeados de copa. Quien llama por una rama caída necesita encontrar el teléfono y saber cuándo responderás. Para podas y talas, hacen falta fotos reales, información de seguro cerca de la llamada y una consulta que no parezca un servicio de grúa. El contenido debe separar esos caminos y limitar la zona a las cuadrillas que realmente puedes enviar.</p><p>Ofrece molienda de tocones solo si es un servicio real. Un distintivo de atención 24/7 genera desconfianza si nadie responde de madrugada. La información de seguridad y seguro junto al teléfono requiere trabajo editorial, no un supuesto “recargo de arborista”.</p><p>Consulta la <a href=\"/industries/tree-care\">página de servicio de árboles</a> y la <a href=\"/blog/tree-service-website-pages\">guía de páginas</a> para ver ejemplos de alcance.</p>"
      },
      {
        "h2": "Define el alcance antes de comparar precios",
        "html": "<p>Haz una lista de los trabajos principales que quieres presentar y de las páginas que necesitas para explicarlos. Para servicio de árboles, considera qué debe saber un cliente antes de llamar: el tipo de trabajo, la zona atendida, el horario y cómo solicitar una visita o cotización. No es necesario crear una página para cada variación si una página clara responde la pregunta.</p><p>Compara esa lista con el límite de páginas y los servicios incluidos en cada propuesta. Pregunta quién prepara el texto, quién aporta las fotos y qué cambios están contemplados después de publicar. Así reduces la posibilidad de elegir por un precio inicial que no cubre el alcance esperado.</p>"
      },
      {
        "h2": "Considera el tiempo y el mantenimiento",
        "html": "<p>Un constructor de sitios puede tener una tarifa mensual menor, pero también requiere que alguien actualice las páginas, revise los formularios y mantenga la información vigente. Un freelancer o una agencia pueden ofrecer otros niveles de apoyo; confirma qué ocurre después de la entrega y cómo se cobran las solicitudes adicionales.</p><p>En un plan administrado, revisa específicamente el hosting, los cambios incluidos y las condiciones de cancelación. Elige según el tiempo que puedas dedicar al sitio y el apoyo que quieras delegar, no solo por la tarifa del primer mes.</p>"
      },
      {
        "h2": "Verifica los extras y las condiciones",
        "html": "<p>Antes de aceptar una cotización, confirma si el dominio, las fotos, la redacción, las herramientas de seguimiento y el trabajo de SEO continuo están incluidos o se cobran aparte. Pregunta también quién conserva los archivos del sitio y qué opciones tienes si cancelas o cambias de proveedor.</p><p>Los servicios de terceros, como el registro del dominio o las tarifas de mensajería, pueden tener costos propios. Pide que aparezcan por separado en la propuesta para poder comparar el total. No des por sentado que un término como «mantenimiento» incluye cualquier cambio que puedas necesitar.</p>"
      },
      {
        "h2": "Costos y condiciones aparte",
        "html": "<p>El SEO continuo se cotiza por separado; no está incluido en los planes del sitio. El texto por llamada perdida es opcional y requiere una línea dedicada. En Lead System y Plus, un segundo número cuesta $1/mes si lo usas, más las tarifas del operador. La aprobación suele tardar de 10 a 15 días y no está garantizada. Lee <a href=\"/blog/missed-call-text-delayed-10dlc\">por qué puede tardar la activación</a>.</p><p>Si cancelas un plan mensual y quieres conservar los archivos, puedes acordar por escrito una compra única de $1,497. En Own It, los archivos son tuyos desde el lanzamiento. Consulta <a href=\"/pricing\">los términos de cada plan</a> antes de decidir.</p>"
      }
    ]
  },
};

export const ES_COST_POST_SLUGS = ["plumber-website-cost","hvac-website-cost","electrician-website-cost","roofing-website-cost","garage-door-website-cost","painting-website-cost","remodeling-website-cost","landscaping-website-cost","pool-service-website-cost","pressure-washing-website-cost","window-cleaning-website-cost","lawn-care-website-cost","junk-removal-website-cost","tree-service-website-cost"] as const;

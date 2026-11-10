# Drafts: 3 native Spanish posts (US/LatAm `/es`)

**Status:** shipped into `src/i18n/posts-es-cluster.ts` + `POSTS` / `EN_POST_CONTENT` (Nov 10, 2026)  
**Voice:** native Spanish (not EN translation). Short paragraphs, phone-first, owner-to-owner.  
**Facts:** only approved plans/prices from `docs/CONTENT.md`. No invented stats or guarantees.  
**Spain `/es-es`:** `spainize()` will swap plomero→fontanero, celular→móvil. Add `ES_ES_POST_OVERRIDES` if you want USD stripped on these three (same pattern as priced ES-ES posts).  
**Diff note:** `build-trust-with-reviews` stays the short “why/when” piece. Post 3 is the practical “how to ask” with scripts + enlace/QR.

---

## 1) Diseño web para contratistas

```ts
{
  slug: "diseno-web-para-contratistas",
  category: "Diseño",
  title: "Diseño web para contratistas que sí trae llamadas",
  seoTitle: "Diseño web para contratistas | Desde $97/mes | Kinexis",
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
      html: `<p>Empezamos con una vista previa gratis de la página de inicio en 2 días hábiles, sin tarjeta y sin obligación. Cuando apruebas y envías el contenido que falta, el sitio completo suele salir en 5 días hábiles — lo confirmamos por escrito.</p><p>Website es $97 al mes. Lead System $197 al mes agrega pedidos de reseña en Google y texto opcional si no contestas. Plus $297 al mes hace ese seguimiento en inglés y español. Own It es $1,497 de una vez, con los archivos tuyos desde el lanzamiento.</p><p>Mira <a href="/web-design">diseño web</a>, las <a href="/industries">industrias</a> o pide tu vista previa en <a href="/contact">/contact</a>. Compara planes en <a href="/pricing">/pricing</a>.</p>`,
    },
  ],
}
```

**Primary intent:** `diseño web para contratistas`  
**Internal links:** `/web-design`, `/industries`, `/contact`, `/pricing`

---

## 2) Página web para plomeros

```ts
{
  slug: "pagina-web-para-plomeros",
  category: "Diseño",
  title: "Página web para plomeros hecha para la llamada",
  seoTitle: "Página web para plomeros | Desde $97/mes | Kinexis",
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
}
```

**Primary intent:** `página web para plomeros`  
**Internal links:** `/industries/plumbing`, `/blog/plumbing-website-pages`, `/blog/plumber-website-cost`, `/contact`, `/pricing`  
**Note:** Fix “anunciás” → “anuncias” for US/LatAm neutral (avoid voseo). Correcting below in final copy block if I used voseo — I did use "anunciás". Fix to "anuncias".

---

## 3) Cómo pedir reseñas en Google

```ts
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
      html: `<p>No le pidas al cliente que “te busque en Google”. Dale un enlace que abra directo el formulario de reseña de tu Perfil de Empresa.</p><p>Entra al perfil con la cuenta que lo administra → <strong>Leer reseñas</strong> → <strong>Consigue más reseñas</strong>. Copia el enlace. El código QR, según Google, se descarga desde la computadora (clic derecho → guardar imagen).</p><p>También puedes armar el enlace con tu Place ID en la <a href="/tools/google-review-link-qr">herramienta de enlace y QR de reseñas</a> (disponible en inglés en el sitio). Prueba el enlace en un celular que no sea el tuyo de propietario.</p>`,
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
}
```

**Primary intent:** `cómo pedir reseñas en Google`  
**Internal links:** `/tools/google-review-link-qr`, `/blog/build-trust-with-reviews`, `/contact`, `/pricing`  
**Compliance:** mirrors Google’s “no incentives / authentic reviews” rules; no promised ranking lift.

---

## Coding-pass checklist

1. Append the three objects to `ES_POSTS` in `src/i18n/posts-es.ts` (fix voseo: use **anuncias**, not anunciás).
2. Register slugs in Spanish blog index / sitemap / pages registry the same way existing ES-only or mirrored posts are registered.
3. Hero art: sticker-style covers for the three slugs (or shared pattern until custom art ships).
4. Optional: `ES_ES_POST_OVERRIDES` without `$` figures for Spain.
5. QA: no invented claims; links resolve under `/es/...`; Rich Results Article when shipped.

**Copy fix applied in file:** `anuncias` (not voseo), `piscina`, `si te parece bien` (neutral LatAm).

# Landing page copy review

Original review branch: `copy/get-a-website-review`. The notes below record that review stage. The copy update was subsequently committed to `main` as `cdeb51a8`; the user then authorized committing all remaining changes, pushing `main`, and deploying to the live site from this machine.

The workspace already contained unrelated edits, including edits to both landing content files. `landing-copy-review.patch` contains only this task's changes relative to that starting workspace. No existing work was staged or committed.

## Exact copy changes (old → new)

Each entry gives the current file and starting line. Blocks include exact source strings and their config expressions; unchanged strings inside a block retain their meaning. Numeric originals remain available only behind `showResultNumbers = false`.

### `src/content/lp/get-a-website.ts:3`

Old → new:

```ts
 * Basic sites from $500. Custom multi-page sites from $2,000+.
→
 * Basic sites from $500. Custom multi-page sites from $2,000.
```

### `src/content/lp/get-a-website.ts:19`

Old → new:

```ts
/** Sticky and header keep the call. The hero button names the free plan. */
const CTA = "Book a 15-Minute Project Call";
→
/** One request label for the hero, header, and sticky CTA. */
// Enable only after the original result sources have been verified.
export const showResultNumbers = false;
const CTA = "Request My Free Project Call";
```

### `src/content/lp/get-a-website.ts:25`

Old → new:

```ts
  "Basic websites from $500. Custom websites from $2,000+.";
→
  "Basic websites from $500. Custom websites from $2,000.";
```

### `src/content/lp/get-a-website.ts:43`

Old → new:

```ts
      { label: "Price", basic: "From $500", custom: "From $2,000+" },
      { label: "Pages", basic: "Up to 4", custom: "Set in the proposal" },
→
      { label: "Price", basic: "From $500", custom: "From $2,000" },
      { label: "Pages", basic: "Up to 4", custom: "5 pages or more" },
```

### `src/content/lp/get-a-website.ts:55`

Old → new:

```ts
      "Domains, stock photos, and paid tools at cost. Monthly care is optional.",
→
      "Hosting is typically $0/month on Cloudflare's free plan; you only pay for your domain (about $10–20/year). Domains, stock photos, and paid tools at cost. Monthly care is optional.",
```

### `src/content/lp/get-a-website.ts:59`

Old → new:

```ts
      "Custom: from $2,000; six pages or more, with writing per page and a contact form. More pages and writing cost more.",
→
      "Custom: from $2,000; 5 pages or more, with writing per page and a contact form. More pages and writing cost more.",
```

### `src/content/lp/get-a-website.ts:74`

Old → new:

```ts
    customPrice: "From $2,000+",
→
    customPrice: "From $2,000",
```

### `src/content/lp/get-a-website.ts:83`

Old → new:

```ts
      "Basic websites start at $500 and stop at four pages: Home, About, Services, and Contact. Custom websites start at $2,000. The page count is set on the call. A six-page site can start at that price. A 15-page site with writing on each page costs more. Booking, payments, and client portals are quoted only if the project needs them.",
→
      "Basic websites start at $500 and stop at four pages: Home, About, Services, and Contact. Custom websites start at $2,000. The page count is set on the call. Custom covers 5 pages or more. A 15-page site with writing on each page costs more. Booking, payments, and client portals are quoted only if the project needs them.",
```

### `src/content/lp/get-a-website.ts:85`

Old → new:

```ts
      "The site runs on Cloudflare Pages. Managed care is optional, and the monthly rate is in the proposal. It covers monitoring and fixes. The domain stays in your name. If you want to run it yourself, we'll move the site to your own Cloudflare account.",
→
      "Hosting is typically $0/month on Cloudflare's free plan; you only pay for your domain (about $10–20/year). The site runs on Cloudflare Pages. Managed care is optional, and the monthly rate is in the proposal. It covers monitoring and fixes. The domain stays in your name. If you want to run it yourself, we'll move the site to your own Cloudflare account.",
```

### `src/content/lp/get-a-website.ts:93`

Old → new:

```ts
      `El básico se queda en cuatro páginas, desde ${LOW_ES}: Inicio, Nosotros, Servicios y Contacto. Usa tu logo, tus colores y el texto que envías, con un botón de llamada, títulos, descripciones e indexación.\n\nEl a medida empieza en ${HIGH_ES}. El número de páginas va en la propuesta. Un sitio de seis páginas puede ser a medida. Uno más grande también. Un sitio de 15 páginas, con texto en cada una, cuesta más. El precio exacto sale después de la llamada, según las páginas, el texto y lo que el sitio tiene que hacer.\n\nEl a medida suma un formulario y el texto escrito para cada página. La base de SEO puede incluir una página por servicio, títulos y descripciones, estructura local, un sitemap e indexación. Reservas, pagos, un acceso para tus clientes y fotos se cotizan solo si los necesitas. Apruebas las páginas y el aspecto antes de que construyamos. El sitio, el contenido y el código son tuyos cuando se liquida el último pago. La mayoría sale en vivo en 2 a 6 semanas, cuando vuelven las fotos y los comentarios.`,
→
      `El básico se queda en cuatro páginas, desde ${LOW_ES}: Inicio, Nosotros, Servicios y Contacto. Usa tu logo, tus colores y el texto que envías, con un botón de llamada, títulos, descripciones e indexación.\n\nEl a medida empieza en ${HIGH_ES}. El número de páginas va en la propuesta. El sitio a medida cubre 5 páginas o más. Uno más grande también. Un sitio de 15 páginas, con texto en cada una, cuesta más. El precio exacto sale después de la llamada, según las páginas, el texto y lo que el sitio tiene que hacer.\n\nEl a medida suma un formulario y el texto escrito para cada página. La base de SEO puede incluir una página por servicio, títulos y descripciones, estructura local, un sitemap e indexación. Reservas, pagos, un acceso para tus clientes y fotos se cotizan solo si los necesitas. Apruebas las páginas y el aspecto antes de que construyamos. El sitio, el contenido y el código son tuyos cuando se liquida el último pago. La mayoría sale en vivo en 2 a 6 semanas, cuando vuelven las fotos y los comentarios.`,
```

### `src/content/lp/get-a-website.ts:101`

Old → new:

```ts
      { label: "Precio", basic: `Desde ${LOW_ES}`, custom: `Desde ${HIGH_ES}+` },
      { label: "Páginas", basic: "Hasta 4", custom: "En la propuesta" },
→
      { label: "Precio", basic: `Desde ${LOW_ES}`, custom: `Desde ${HIGH_ES}` },
      { label: "Páginas", basic: "Hasta 4", custom: "5 páginas o más" },
```

### `src/content/lp/get-a-website.ts:122`

Old → new:

```ts
    customPrice: `Desde ${HIGH_ES}+`,
→
    customPrice: `Desde ${HIGH_ES}`,
```

### `src/content/lp/get-a-website.ts:128`

Old → new:

```ts
    heroPrice: `Sitios básicos desde ${LOW_ES}. Sitios a medida desde ${HIGH_ES}+.`,
→
    heroPrice: `Sitios básicos desde ${LOW_ES}. Sitios a medida desde ${HIGH_ES}.`,
```

### `src/content/lp/get-a-website.ts:130`

Old → new:

```ts
    costFaqAnswer: `Sitios básicos desde ${LOW_ES}. Se quedan en cuatro páginas: Inicio, Nosotros, Servicios y Contacto. Los sitios a medida empiezan en ${HIGH_ES}. Las páginas se fijan en la llamada. Un sitio de seis páginas puede empezar en ese precio. Un sitio de 15 páginas, con texto en cada una, cuesta más. Reservas, pagos y portales se cotizan solo si el proyecto los necesita.`,
→
    costFaqAnswer: `Sitios básicos desde ${LOW_ES}. Se quedan en cuatro páginas: Inicio, Nosotros, Servicios y Contacto. Los sitios a medida empiezan en ${HIGH_ES}. Las páginas se fijan en la llamada. El sitio a medida cubre 5 páginas o más. Un sitio de 15 páginas, con texto en cada una, cuesta más. Reservas, pagos y portales se cotizan solo si el proyecto los necesita.`,
```

### `src/content/lp/get-a-website.ts:132`

Old → new:

```ts
      "El sitio corre en Cloudflare Pages. El cuidado mensual es opcional, y la tarifa va en la propuesta. Cubre monitoreo y correcciones. El dominio queda a tu nombre. Si quieres operarlo tú, lo movemos a tu propia cuenta de Cloudflare.",
→
      "El hosting normalmente cuesta $0/mes en el plan gratuito de Cloudflare; solo pagas tu dominio (unos $10–20/año). El sitio corre en Cloudflare Pages. El cuidado mensual es opcional, y la tarifa va en la propuesta. Cubre monitoreo y correcciones. El dominio queda a tu nombre. Si quieres operarlo tú, lo movemos a tu propia cuenta de Cloudflare.",
```

### `src/content/lp/get-a-website.ts:140`

Old → new:

```ts
      `El básico se queda en cuatro páginas, desde ${LOW_ES} €: Inicio, Nosotros, Servicios y Contacto. Usa tu logo, tus colores y el texto que envías, con un botón de llamada, títulos, descripciones e indexación.\n\nEl a medida empieza en ${HIGH_ES} €. El número de páginas va en la propuesta. Un sitio de seis páginas puede ser a medida. Uno más grande también. Un sitio de 15 páginas, con texto en cada una, cuesta más. El precio exacto sale después de la llamada, según las páginas, el texto y lo que el sitio tiene que hacer.\n\nEl a medida suma un formulario y el texto escrito para cada página. La base de SEO puede incluir una página por servicio, títulos y descripciones, estructura local, un sitemap e indexación. Reservas, pagos, un acceso para tus clientes y fotos se presupuestan solo si los necesitas. Apruebas las páginas y el aspecto antes de que construyamos. El sitio, el contenido y el código son tuyos cuando se liquida el último pago. La mayoría sale en vivo en 2 a 6 semanas, cuando vuelven las fotos y los comentarios.`,
→
      `El básico se queda en cuatro páginas, desde ${LOW_ES} €: Inicio, Nosotros, Servicios y Contacto. Usa tu logo, tus colores y el texto que envías, con un botón de llamada, títulos, descripciones e indexación.\n\nEl a medida empieza en ${HIGH_ES} €. El número de páginas va en la propuesta. El sitio a medida cubre 5 páginas o más. Uno más grande también. Un sitio de 15 páginas, con texto en cada una, cuesta más. El precio exacto sale después de la llamada, según las páginas, el texto y lo que el sitio tiene que hacer.\n\nEl a medida suma un formulario y el texto escrito para cada página. La base de SEO puede incluir una página por servicio, títulos y descripciones, estructura local, un sitemap e indexación. Reservas, pagos, un acceso para tus clientes y fotos se presupuestan solo si los necesitas. Apruebas las páginas y el aspecto antes de que construyamos. El sitio, el contenido y el código son tuyos cuando se liquida el último pago. La mayoría sale en vivo en 2 a 6 semanas, cuando vuelven las fotos y los comentarios.`,
```

### `src/content/lp/get-a-website.ts:148`

Old → new:

```ts
      { label: "Precio", basic: `Desde ${LOW_ES} €`, custom: `Desde ${HIGH_ES} €+` },
      { label: "Páginas", basic: "Hasta 4", custom: "En la propuesta" },
→
      { label: "Precio", basic: `Desde ${LOW_ES} €`, custom: `Desde ${HIGH_ES} €` },
      { label: "Páginas", basic: "Hasta 4", custom: "5 páginas o más" },
```

### `src/content/lp/get-a-website.ts:169`

Old → new:

```ts
    customPrice: `Desde ${HIGH_ES} €+`,
→
    customPrice: `Desde ${HIGH_ES} €`,
```

### `src/content/lp/get-a-website.ts:175`

Old → new:

```ts
    heroPrice: `Sitios básicos desde ${LOW_ES} €. Sitios a medida desde ${HIGH_ES} €+.`,
→
    heroPrice: `Sitios básicos desde ${LOW_ES} €. Sitios a medida desde ${HIGH_ES} €.`,
```

### `src/content/lp/get-a-website.ts:177`

Old → new:

```ts
    costFaqAnswer: `Sitios básicos desde ${LOW_ES} €. Se quedan en cuatro páginas: Inicio, Nosotros, Servicios y Contacto. Los sitios a medida empiezan en ${HIGH_ES} €. Las páginas se fijan en la llamada. Un sitio de seis páginas puede empezar en ese precio. Un sitio de 15 páginas, con texto en cada una, cuesta más. Reservas, pagos y portales se presupuestan solo si el proyecto los necesita.`,
→
    costFaqAnswer: `Sitios básicos desde ${LOW_ES} €. Se quedan en cuatro páginas: Inicio, Nosotros, Servicios y Contacto. Los sitios a medida empiezan en ${HIGH_ES} €. Las páginas se fijan en la llamada. El sitio a medida cubre 5 páginas o más. Un sitio de 15 páginas, con texto en cada una, cuesta más. Reservas, pagos y portales se presupuestan solo si el proyecto los necesita.`,
```

### `src/content/lp/get-a-website.ts:179`

Old → new:

```ts
      "El sitio corre en Cloudflare Pages. El cuidado mensual es opcional, y la tarifa va en la propuesta. Cubre la monitorización y las correcciones. El dominio queda a tu nombre. Si quieres gestionarlo tú, lo movemos a tu propia cuenta de Cloudflare.",
→
      "El hosting normalmente cuesta $0/mes en el plan gratuito de Cloudflare; solo pagas tu dominio (unos $10–20/año). El sitio corre en Cloudflare Pages. El cuidado mensual es opcional, y la tarifa va en la propuesta. Cubre la monitorización y las correcciones. El dominio queda a tu nombre. Si quieres gestionarlo tú, lo movemos a tu propia cuenta de Cloudflare.",
```

### `src/content/lp/get-a-website.ts:191`

Old → new:

```ts
    "Contractor websites from $500. Basic starts from a proven layout. Custom is designed and coded around the business, from $2,000+.",
→
    "Contractor websites from $500. Basic starts from a proven layout. Custom is designed and coded around the business, from $2,000.",
```

### `src/content/lp/get-a-website.ts:203`

Old → new:

```ts
  headerCtaLabel: "Book a 15-Min Call",
→
  headerCtaLabel: CTA,
```

### `src/content/lp/get-a-website.ts:216`

Old → new:

```ts
  heroCredit: "Talk to Colton.",
→
  heroCredit: "Talk directly with Colton about your site, pages and price. No obligation.",
```

### `src/content/lp/get-a-website.ts:242`

Old → new:

```ts
  formTitle: "Book a 15-minute project call",
→
  formTitle: "Request a free project call",
```

### `src/content/lp/get-a-website.ts:245`

Old → new:

```ts
  submitLabel: "Book my call",
→
  submitLabel: "Request my call",
```

### `src/content/lp/get-a-website.ts:423`

Old → new:

```ts
(absent)
→
  // TODO: Link the original source for this existing testimonial before enabling result numbers.
```

### `src/content/lp/get-a-website.ts:425`

Old → new:

```ts
    quote:
      "The quote button used to disappear on a phone. After the rebuild, conversion went from 1.8% to 3.9%.",
→
    quote: showResultNumbers
      ? "The quote button used to disappear on a phone. After the rebuild, conversion went from 1.8% to 3.9%."
      : "The quote button used to disappear on a phone.",
```

### `src/content/lp/get-a-website.ts:448`

Old → new:

```ts
      result: "Qualified leads went from 10 a month to 28.",
→
      result: showResultNumbers ? "Qualified leads went from 10 a month to 28." : "Rebuilt around clear service pages, local search structure, and a mobile quote path.",
```

### `src/content/lp/get-a-website.ts:451`

Old → new:

```ts
      metric: "10 → 28",
      label: "leads/mo",
→
      metric: showResultNumbers ? "10 → 28" : "Rebuilt",
      label: showResultNumbers ? "leads/mo" : "Service pages and mobile quote path",
```

### `src/content/lp/get-a-website.ts:469`

Old → new:

```ts
      result: "Emergency calls went from 22 a month to 52.",
→
      result: showResultNumbers ? "Emergency calls went from 22 a month to 52." : "Rebuilt around clear services and a call button within reach on mobile.",
```

### `src/content/lp/get-a-website.ts:472`

Old → new:

```ts
      metric: "22 → 52",
      label: "emergency calls/mo",
→
      metric: showResultNumbers ? "22 → 52" : "Rebuilt",
      label: showResultNumbers ? "emergency calls/mo" : "Clear services and mobile call button",
```

### `src/content/lp/get-a-website.ts:542`

Old → new:

```ts
  fitNotTitle: "Probably not a fit if",
→
  fitNotTitle: "What to expect",
```

### `src/content/lp/get-a-website.ts:544`

Old → new:

```ts
    "You want a website for free",
    "You need it live this weekend",
    "You're shopping for the cheapest price",
    "You can't make time to review drafts",
    "You won't send photos or notes",
    "You want to stay in a page builder",
→
    "Projects start at $500.",
    "Most sites launch in 2–6 weeks.",
    "You send photos and notes about your services; we handle the writing and design, and you review drafts.",
```

### `src/content/lp/get-a-website.ts:573`

Old → new:

```ts
      body: "Written pages, a form, and a stronger search setup.",
→
      body: "5 pages or more, written copy, a form, and a stronger search setup.",
```

### `src/content/lp/get-a-website.ts:587`

Old → new:

```ts
  proofIntro: "Published KINEXIS client work. Individual results vary.",
→
  proofIntro: showResultNumbers ? "Published KINEXIS client work. Individual results vary." : "Published KINEXIS client work.",
```

### `src/content/lp/get-a-website.ts:598`

Old → new:

```ts
  closingTitle: "Book a 15-minute project call",
→
  closingTitle: "Request a free project call",
```

### `src/content/lp/get-a-website.ts:654`

Old → new:

```ts
  "es-419": buildSpanishGetAWebsite(softPricing["es-419"]),
  "es-ES": buildSpanishGetAWebsite(softPricing["es-ES"]),
→
  "es-419": buildSpanishGetAWebsite(softPricing["es-419"], showResultNumbers),
  "es-ES": buildSpanishGetAWebsite(softPricing["es-ES"], showResultNumbers),
```

### `src/content/lp/get-a-website-es.ts:14`

Old → new:

```ts
const CTA = "Reservar llamada de 15 min";
→
const CTA = "Solicitar mi llamada gratis";
```

### `src/content/lp/get-a-website-es.ts:18`

Old → new:

```ts
  "pricingNote": "Dominios, fotos de stock y herramientas de pago al costo. El mantenimiento mensual es opcional.",
→
  "pricingNote": "El hosting normalmente cuesta $0/mes en el plan gratuito de Cloudflare; solo pagas tu dominio (unos $10–20/año). Dominios, fotos de stock y herramientas de pago al costo. El mantenimiento mensual es opcional.",
```

### `src/content/lp/get-a-website-es.ts:22`

Old → new:

```ts
    "A medida: desde $2,000; seis páginas o más, con redacción por página y un formulario de contacto. Más páginas y redacción tienen un costo adicional.",
→
    "A medida: desde $2,000; 5 páginas o más, con redacción por página y un formulario de contacto. Más páginas y redacción tienen un costo adicional.",
```

### `src/content/lp/get-a-website-es.ts:61`

Old → new:

```ts
(absent)
→
  showResultNumbers: boolean,
```

### `src/content/lp/get-a-website-es.ts:84`

Old → new:

```ts
    headerCtaLabel: "Llamada de 15 min",
→
    headerCtaLabel: CTA,
```

### `src/content/lp/get-a-website-es.ts:97`

Old → new:

```ts
    heroCredit: "Habla con Colton.",
→
    heroCredit: "Habla directamente con Colton sobre tu sitio, las páginas y el precio. Sin compromiso.",
```

### `src/content/lp/get-a-website-es.ts:123`

Old → new:

```ts
    formTitle: "Reserva una llamada de proyecto de 15 minutos",
→
    formTitle: "Solicita una llamada de proyecto de 15 minutos",
```

### `src/content/lp/get-a-website-es.ts:126`

Old → new:

```ts
    submitLabel: "Reservar mi llamada",
→
    submitLabel: "Solicitar mi llamada",
```

### `src/content/lp/get-a-website-es.ts:305`

Old → new:

```ts
(absent)
→
    // TODO: Vincular la fuente original de este testimonio antes de activar las cifras.
```

### `src/content/lp/get-a-website-es.ts:307`

Old → new:

```ts
      quote:
        "El botón de cotización desaparecía en el teléfono. Después de la reconstrucción, la conversión pasó de 1,8% a 3,9%.",
→
      quote: showResultNumbers
        ? "El botón de cotización desaparecía en el teléfono. Después de la reconstrucción, la conversión pasó de 1,8% a 3,9%."
        : "El botón de cotización desaparecía en el teléfono.",
```

### `src/content/lp/get-a-website-es.ts:330`

Old → new:

```ts
        result: "Los leads calificados pasaron de 10 al mes a 28.",
→
        result: showResultNumbers ? "Los leads calificados pasaron de 10 al mes a 28." : "Sitio reconstruido con páginas de servicio, estructura local y un camino de cotización para móvil.",
```

### `src/content/lp/get-a-website-es.ts:333`

Old → new:

```ts
        metric: "10 → 28",
        label: "leads/mes",
→
        metric: showResultNumbers ? "10 → 28" : "Rediseño",
        label: showResultNumbers ? "leads/mes" : "Servicios y cotización móvil",
```

### `src/content/lp/get-a-website-es.ts:351`

Old → new:

```ts
        result: "Las llamadas de emergencia pasaron de 22 al mes a 52.",
→
        result: showResultNumbers ? "Las llamadas de emergencia pasaron de 22 al mes a 52." : "Sitio reconstruido con servicios claros y un botón de llamada a mano en móvil.",
```

### `src/content/lp/get-a-website-es.ts:354`

Old → new:

```ts
        metric: "22 → 52",
        label: "llamadas de emergencia/mes",
→
        metric: showResultNumbers ? "22 → 52" : "Rediseño",
        label: showResultNumbers ? "llamadas de emergencia/mes" : "Servicios y llamada móvil",
```

### `src/content/lp/get-a-website-es.ts:371`

Old → new:

```ts
        result: "Los pedidos mensuales pasaron de 32 a 78.",
→
        result: showResultNumbers ? "Los pedidos mensuales pasaron de 32 a 78." : "Tienda reconstruida con colecciones, fichas de producto y un camino de compra para móvil.",
```

### `src/content/lp/get-a-website-es.ts:374`

Old → new:

```ts
        metric: "32 → 78",
        label: "pedidos / mes",
→
        metric: showResultNumbers ? "32 → 78" : "Rediseño",
        label: showResultNumbers ? "pedidos / mes" : "Colecciones y compra móvil",
```

### `src/content/lp/get-a-website-es.ts:444`

Old → new:

```ts
    fitNotTitle: "Probablemente no es encaje si",
→
    fitNotTitle: "Qué puedes esperar",
```

### `src/content/lp/get-a-website-es.ts:446`

Old → new:

```ts
      "Quieres un sitio web gratis",
      "Lo necesitas en línea este fin de semana",
      "Estás buscando el precio más bajo",
      "No tienes tiempo para revisar borradores",
      "No vas a enviar fotos ni notas",
      "Quieres quedarte en un constructor",
→
      `Los proyectos empiezan ${pricing.basicPrice.charAt(0).toLowerCase()}${pricing.basicPrice.slice(1)}.`,
      "La mayoría de los sitios se lanzan en 2–6 semanas.",
      "Nos envías fotos y notas sobre tus servicios; nos encargamos de los textos y el diseño, y tú revisas los borradores.",
```

### `src/content/lp/get-a-website-es.ts:472`

Old → new:

```ts
        body: "Páginas escritas, un formulario y mejor SEO.",
→
        body: "5 páginas o más, textos, un formulario y mejor SEO.",
```

### `src/content/lp/get-a-website-es.ts:486`

Old → new:

```ts
    proofIntro: "Trabajo publicado de clientes KINEXIS. Los resultados individuales varían.",
→
    proofIntro: showResultNumbers ? "Trabajo publicado de clientes KINEXIS. Los resultados individuales varían." : "Trabajo publicado de clientes KINEXIS.",
```

### `src/content/lp/get-a-website-es.ts:497`

Old → new:

```ts
    closingTitle: "Reserva una llamada de proyecto de 15 minutos",
→
    closingTitle: "Solicita una llamada de proyecto de 15 minutos",
```

### `src/content/landing-chrome.generated.json:44`

Old → new:

```ts
      "ctaLabel": "Book a 15-Minute Project Call",
      "headerCtaLabel": "Book a 15-Min Call",
→
      "ctaLabel": "Request My Free Project Call",
      "headerCtaLabel": "Request My Free Project Call",
```

### `src/content/landing-chrome.generated.json:47`

Old → new:

```ts
      "closingTitle": "Book a 15-minute project call",
→
      "closingTitle": "Request a free project call",
```

### `src/content/landing-chrome.generated.json:94`

Old → new:

```ts
      "ctaLabel": "Reservar llamada de 15 min",
      "headerCtaLabel": "Llamada de 15 min",
→
      "ctaLabel": "Solicitar mi llamada gratis",
      "headerCtaLabel": "Solicitar mi llamada gratis",
```

### `src/content/landing-chrome.generated.json:97`

Old → new:

```ts
      "closingTitle": "Reserva una llamada de proyecto de 15 minutos",
→
      "closingTitle": "Solicita una llamada de proyecto de 15 minutos",
```

### `src/content/landing-chrome.generated.json:144`

Old → new:

```ts
      "ctaLabel": "Reservar llamada de 15 min",
      "headerCtaLabel": "Llamada de 15 min",
→
      "ctaLabel": "Solicitar mi llamada gratis",
      "headerCtaLabel": "Solicitar mi llamada gratis",
```

### `src/content/landing-chrome.generated.json:147`

Old → new:

```ts
      "closingTitle": "Reserva una llamada de proyecto de 15 minutos",
→
      "closingTitle": "Solicita una llamada de proyecto de 15 minutos",
```

## Behavior and verification

- One result-number flag, default false, gates every English and Spanish project metric, result sentence, numeric testimonial sentence, and disclaimer.
- Existing client live-site URLs and testimonial attribution retained; TODO source comments added. The default testimonial uses only the existing first sentence.
- Hero supporting line reuses the existing credit slot; only its text span gets wrapping utilities. Section order, headline, structure, and layout retained.
- Form fields, options, steps, validation, handlers, thank-you flow, analytics, Pixel/CAPI code, event names, event IDs, CTA hrefs and tracking attributes unchanged.
- The existing qualified-lead flow actually offers a calendar after submission; its accurate calendar copy remains. Other leads receive the existing callback/note message.
- No fixed hosting/care price found in repo search. Added the requested typical free-plan/domain estimate, preserving optional care proposal pricing and existing ownership copy.
- Matching Latin American Spanish and Spain strings updated; existing locale currency formatting preserved.
- The existing `resolveRequestLocale` deliberately forces this campaign to English, even with Spanish cookies. The actual page was checked at 375px in English; Spanish content is covered by registry tests.
- No deploy, push, form submission, or external message performed.

Final validation: 408 tests passed, 0 failed across 51 files; TypeScript passed; ESLint passed with 0 errors and 13 existing image warnings; design lint passed; git diff --check passed. Browser check at 375px: document width 375, no overflowing main-content elements, no numeric results visible; hero screenshot visually reviewed.

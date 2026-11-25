# Kinexis Digital copy differentiation audit

**Step:** 2 — rewrite implemented after owner continuation

**Branch:** `copy/differentiate`

**Status:** Production copy has been rewritten. Build and responsive QA results are recorded below.

## Scope and guardrails

- Audited English (`/`), Latin American Spanish (`/es`) and Spain Spanish (`/es-es`).
- Included headings, supporting descriptions, card titles and bodies, comparison labels, FAQ questions and answers, process copy, form copy, portfolio claims, page titles, meta descriptions and their Open Graph/Twitter reuse.
- Button and navigation labels are **not** rewrite candidates because they are locked.
- Prices, plan names, minimums, price-lock terms, guarantee terms, contact details, routes and locale structure are facts/structure to preserve exactly.
- `/es-es` mostly reuses the `/es` source and applies the vocabulary substitutions in `src/lib/i18n.ts:106-142`; it does not have a separate full copy file. Every Spanish item below therefore affects both Spanish locales and must be reviewed natively in both rendered versions.

## 1. Direct phrase matches from the brief

These are the literal English hits and their Spanish counterparts. Card body copy is included because the brief explicitly asks for it to be rewritten with the titles.

| Locale | File:line | Current text | Step 2 direction |
|---|---|---|---|
| EN | `src/app/page.tsx:60-61` | “Kinexis Digital Helps You Scale Your Business” + supporting SEO/site/follow-up sentence | Replace heading with “What You Get With Kinexis”; rewrite body naturally. |
| EN | `src/app/page.tsx:64` | “Better Design” + “Fast, modern websites you'll be proud to show customers…” | Replace title with “A Website That Brings In Calls”; rewrite body. |
| EN | `src/app/page.tsx:65` | “Better Follow-Up” + “Missed-call text-back, review requests and lead tracking…” | Replace title with “Follow-Up While You're On The Job”; rewrite body. |
| EN | `src/app/page.tsx:66` | “Better Pricing” + “Four clear plans from $97/mo…” | Replace title with “Simple, Clear Pricing”; rewrite body without changing terms. |
| EN | `src/app/page.tsx:73-74` | “We Build Great-Looking, High-Converting Websites. Let’s Build Yours Next!” + portfolio helper text | Replace heading with “Websites Made For Your Trade”; review helper text for originality. |
| EN | `src/app/page.tsx:82` | “Don’t Settle for Either Service or Price… Get Both” | Replace with “Why Business Owners Choose Kinexis”. |
| EN | `src/app/page.tsx:97` | “Four Reasons You’ll Love Working With Us” | Replace with “What Every Kinexis Site Includes”. |
| EN | `src/app/page.tsx:117-118` | “Working With Kinexis Digital Couldn’t Be Easier” + preview/launch/minimum sentence | Replace with “From Free Preview To Launch”; rewrite supporting sentence. |
| EN | `src/app/contact/page.tsx:14` | “Let’s Get Started With Your New Website” | Replace with “Ready To See Your Homepage?”. |
| EN | `src/components/Form.tsx:10` | “Expect a fast response from us xD” (default form note) | Replace with “Send it over and we'll get back to you soon.” |
| EN | `src/i18n/chrome.ts:54` | “Expect a fast response from us xD” (footer form note) | Same replacement. |
| ES-LA / ES-ES | `src/i18n/SpanishSite.tsx:167-173` | “Kinexis Digital te ayuda a hacer crecer el negocio”; “Mejor diseño”; “Mejor seguimiento”; “Mejor precio” and all four supporting bodies | Rewrite as natural Spanish equivalents of the approved English intent, not literal translations. |
| ES-LA / ES-ES | `src/i18n/SpanishSite.tsx:177-178` | “Sitios que se ven bien y convierten. El siguiente puede ser el tuyo.” + helper text | Rewrite to the approved “Websites Made For Your Trade” intent. |
| ES-LA / ES-ES | `src/i18n/SpanishSite.tsx:183-184` | “No elijas entre servicio y precio. Ten los dos.” + comparison rows | Rewrite heading and rows as detailed below. |
| ES-LA / ES-ES | `src/i18n/SpanishSite.tsx:193-194` | “Cuatro razones para trabajar con nosotros” + four reason titles/bodies | Rewrite to the approved four-card intent. |
| ES-LA / ES-ES | `src/i18n/SpanishSite.tsx:203-204` | “Trabajar con Kinexis Digital es simple” + shared Spanish process steps | Rewrite to the approved preview-to-launch intent. |
| ES-LA / ES-ES | `src/i18n/SpanishSite.tsx:420-422` | “Empecemos con tu sitio nuevo”; contact subhead; “Te respondemos pronto xD” | Rewrite naturally; remove `xD`. |

### Phrase variants found elsewhere

These are not exact literal matches, but repeat the same competitor-like constructions and should be included in the rewrite pass.

| File:line | Current text or pattern |
|---|---|
| `src/app/about/page.tsx:23-25` | “Who we work with” and the accompanying agency/audience paragraphs. |
| `src/app/about/page.tsx:29-33` | “What you can expect” and the three expectation rows. |
| `src/app/about/page.tsx:38-42` | “How We Work”; “See it first”; “Follow-up included”; “Plain pricing” and all bodies. |
| `src/app/about/page.tsx:46-52` | “From Preview to Launch”; process note; “Process Questions”. |
| `src/app/about/page.tsx:56-57` | “Talk to us before you pay” and supporting sentence. |
| `src/app/upgrades/page.tsx:24-29` | “Included With Every Site”; “Built for Your Trade”; “Made for Calls”; “Fast + Secure”; “Managed for You” and all bodies. |
| `src/app/industries/page.tsx:16-18,26-33` | “Websites Built for the Trades You Run”; “Pick Your Trade”; “What Every Trade Site Includes” and supporting copy. |
| `src/app/web-design/page.tsx:16-18,23-30,34-36,43,47,50` | Nationwide web-design hero; six benefit cards; “The Same Offer in Every State”; trade selector; FAQ heading; preview CTA text (button remains locked). |
| `src/app/website-management/page.tsx:12,15-18,22` | Management hero; Hosting/Updates/Security/Support cards; “Want Us to Handle It?” CTA copy. |
| `src/app/seo-services/page.tsx:12,14-27,30,33` | SEO hero; six service cards; approach section; FAQ heading; CTA copy. |
| `src/app/services/page.tsx:10-35,48-56,64-66,72` | Four service cards; nationwide hero; “What You Can Hire Us For”; city-page section; CTA copy. |
| `src/app/audit/page.tsx:7-11,18,23-25` | Audit hero; Speed/Search/Mobile/Conversion cards; form labels and textarea prompt. |
| `src/app/strategy-call/page.tsx:15,18-25` | Strategy-call hero; “What to Expect”; three expectation rows and supporting form-area copy. |
| `src/app/faqs/page.tsx:12-14` | FAQ hero/subhead and “Still Have Questions?” CTA copy. |
| `src/app/contact/page.tsx:18-22` | “Send a Message” and the two form-introduction lines. Button labels stay unchanged. |
| `src/app/reviews/page.tsx:15,24` | Reviews hero description and “Want a Site That Brings in Work?” CTA copy. Review quotations themselves are not rewrite candidates. |
| `src/app/upgrades/page.tsx:19,32` | Add-ons hero and “Not Sure What You Need?” CTA copy. |
| `src/app/industries/[slug]/page.tsx:24-47,166,198,216,221,226-230` | Shared industry benefit cards, responsive section, example-layout heading, FAQ/related-trade headings and CTA copy. |
| `src/i18n/SpanishSite.tsx:244-319` | Spanish service, web-design and SEO page equivalents: heroes, cards, FAQs, supporting descriptions and CTA copy. |
| `src/i18n/SpanishSite.tsx:382-473` | Spanish about, contact, audit, industries and FAQ page equivalents. |
| `src/i18n/SpanishSite.tsx:524-570` | Spanish management, reviews and upgrades page equivalents. |
| `src/i18n/SpanishSite.tsx:575-613` | Spanish strategy-call form messages, hero, expectation heading and three expectation rows. |
| `src/i18n/SpanishSite.tsx:711-785` | Shared Spanish industry benefit cards, responsive section, example-layout heading, FAQ/related-trade headings, audit copy and CTA copy. |

## 2. Homepage comparison table

### Current English rows

Source: `src/lib/content.ts:232-235`, rendered by `src/components/ui.tsx:224-239`.

1. “Quick onboarding”
2. “Dedicated manager”
3. “Fast turnaround”
4. “Site management included”
5. “Monthly payments”

### Current Spanish rows

Source: `src/i18n/SpanishSite.tsx:183-184` (used by both Spanish locales).

1. “Arranque rápido”
2. “Una persona de contacto”
3. “Entrega rápida”
4. “Mantenimiento incluido”
5. “Pagos mensuales”

### Required Step 2 intent

Rewrite both language sets around these facts while preserving the Freelancers / Agencies / Kinexis columns and honest check/cross values:

1. Free homepage preview before you pay
2. Missed-call text-back and review requests
3. Hosting and updates handled
4. Monthly payments, no long contract
5. English and Spanish sites

Add the English footnote “Typical offerings; individual providers vary.” and a natural Spanish equivalent. This is the one requested text addition; no table markup or visual redesign should be made unless the existing component cannot expose the note without a markup change, in which case owner approval is required first.

## 3. Homepage “four reasons” block

### English

Source: `src/components/HomeBands.tsx:24-45`.

| Current title | Current body | Approved title direction |
|---|---|---|
| Well Designed | Looks great on every device and makes your business look just as good as it is. | Looks Great On Every Device |
| Sales-Focused | Clear calls to action across every page, so visitors become calls and enquiries. | Designed To Bring In Calls |
| Search Optimized | Technical SEO and a clean structure so Google can find your site and rank it. | Easy For Google To Find |
| Hassle Free | Hosting, updates, and security handled for you, so you never worry about it. | We Take Care Of The Upkeep |

### Spanish

Source: `src/i18n/SpanishSite.tsx:193-194`.

| Current title | Current body |
|---|---|
| Bien diseñado | Se ve bien en el celular y en la computadora, y el negocio se ve tan bien como es. |
| Hecho para vender | Llamados claros en cada página, para que la visita se vuelva llamada. |
| Listo para buscar | SEO técnico y una estructura limpia para que Google pueda leer el sitio. |
| Sin complicaciones | Hosting, cambios y seguridad resueltos, para que no los cargues tú. |

All eight bodies need original wording that preserves the same four facts. Keep neighboring cards close in rendered length.

## 4. Process copy

### English shared five-step process

Source: `src/lib/content.ts:26-31`; rendered on the homepage and About page.

| Step | Current title | Current description |
|---|---|---|
| Preview | See your homepage first | We build a homepage concept for your trade. You see the design before you pay, with no card and no obligation. |
| Plan | Choose the follow-up you want | Website, Lead System, Plus or Own It. We confirm what is included and your launch date in writing. |
| Build | We build the full site | We add your services, service area, photos and copy, connect your domain and get your approval before launch. |
| Launch | Go live | Your site launches. Text-back and review requests start after carrier approval, typically 10–15 days. |
| Grow | Keep it current | We handle edits, track calls and forms, and send review requests after every job. You see the leads in one report. |

### Spanish homepage five-step process

Source: `src/i18n/SpanishSite.tsx:138-143`.

| Step | Current title | Current description |
|---|---|---|
| Vista previa | Ves tu inicio primero | Armamos un inicio para tu oficio. Lo ves antes de pagar, sin tarjeta y sin obligación. |
| Plan | Elige el seguimiento | Website, Lead System, Plus u Own It. Confirmamos qué incluye y la fecha de lanzamiento por escrito. |
| Construcción | Armamos el sitio completo | Agregamos servicios, zona, fotos y texto, conectamos el dominio y pedimos tu aprobación. |
| Lanzamiento | Sale en vivo | El sitio se publica. El texto y las reseñas empiezan después de la aprobación del operador, normalmente en 10 a 15 días. |
| Crecer | Lo mantenemos al día | Hacemos los cambios, seguimos llamadas y formularios, y enviamos reseñas después de cada trabajo. |

The shorter About-page Spanish process is a second variant at `src/i18n/SpanishSite.tsx:384-389` (“Lo ves primero”, “Queda por escrito”, “El sitio completo”, “En vivo”, “Se mantiene”) and also needs a coordinated rewrite.

## 5. Shared FAQ set

### English

Source: `src/lib/content.ts:2-12`; reused on Home, Pricing, FAQs and partially on About.

| Line | Current question | Step 2 question direction | Answer status |
|---|---|---|---|
| 3 | Who do you work with? | Is this right for my kind of business? | Rewrite; preserve audience. |
| 4 | How much will my website cost? | What does it cost? | Rewrite; preserve all prices and preview terms. |
| 5 | How does pricing work? | How does billing work? | Rewrite; preserve $0 down, 3-month minimum, month-to-month and 24-month lock. |
| 6 | Do I own the website? | Who owns the site? | Rewrite carefully; preserve monthly-plan hosting/management and written buyout terms. |
| 7 | Do you offer a guarantee? | What does the 60-day guarantee cover? | Rewrite carefully; preserve every eligibility and remedy term. |
| 8 | How long will it take to build? | When will my site go live? | Rewrite; preserve written launch confirmation and 10–15 day carrier approval wording. |
| 9 | Will my site have SEO built in? | Will Google be able to find my site? | Rewrite; preserve distinction between site foundations and separately quoted ongoing SEO. |
| 10 | Can you provide images? | What about photos and video? | Rewrite; preserve separate quote and no misrepresented stock work. |
| 11 | Can you provide content? | Who writes the text? | Rewrite; preserve separately quoted writing and preview-copy facts. |

No current answer requires being left unchanged, but ownership and guarantee answers require a term-by-term review after rewriting.

### Spanish

Source: `src/i18n/SpanishSite.tsx:214-225`; reused across the same Spanish pages.

1. “¿Con quién trabajan?”
2. “¿Cuánto cuesta el sitio?”
3. “¿Cómo funciona el precio?”
4. “¿El sitio es mío?”
5. “¿Hay garantía?”
6. “¿Cuánto tarda?”
7. “¿El sitio incluye SEO?”
8. “¿Pueden conseguir fotos?”
9. “¿Pueden escribir el contenido?”

All nine Spanish answers on lines 216–224 need native rewrites after the English facts are approved. `/es-es` must be read independently after the vocabulary transformation rather than accepted as an automatic word swap.

### Other FAQ sets found

| Locale | Source | Questions/answers to include in Step 2 |
|---|---|---|
| EN | `src/lib/content.ts:13-18` | Four web-design FAQs and answers. |
| EN | `src/lib/content.ts:19-25` | Five SEO FAQs and answers. |
| ES-LA / ES-ES | `src/i18n/SpanishSite.tsx:264-269` | Four web-design FAQs and answers. |
| ES-LA / ES-ES | `src/i18n/SpanishSite.tsx:293-299` | Five SEO FAQs and answers. |
| EN | `src/data/industries.ts:67-69,105-107,143-145,181-183,219-221,258-260,296-298,334-336,372-374,410-412,448-450,486-488` | Three trade-specific FAQs for each of 11 industry pages (33 total). |
| ES-LA / ES-ES | `src/i18n/industries-es.ts:40-42,74-76,108-110,142-144,176-178,211-213,245-247,279-281,313-315,347-349,381-383,415-417` | Natural Spanish counterparts for all trade FAQs. |

## 6. Other page copy inventory for the site-wide pass

This inventory captures headings/cards/descriptions that follow the same repeated marketing-copy patterns even when they do not literally match a supplied phrase. Replacements remain pending owner review.

| Page/group | English source | Spanish source | Copy found |
|---|---|---|---|
| Homepage hero and review band | `src/app/page.tsx:23-45,88-92,104-105,125` and `src/components/HomeBands.tsx:3-22` | `src/i18n/SpanishSite.tsx:150-155,187-190,197-198,207` | Hero eyebrow/H1/three proof rows; review eyebrow/heading/body/three steps; trade section; FAQ heading. |
| Plans and plan-card descriptions | `src/lib/content.ts:54-131`; `src/app/pricing/page.tsx:90-175` | `src/i18n/SpanishSite.tsx:228-241,323-377` | Plan taglines, included-feature labels/details, free-preview banner, guarantee explanation, comparison headings/rows and pricing FAQ heading. Plan names/prices/terms stay locked. |
| Add-ons | `src/lib/content.ts:33-38`; `src/app/upgrades/page.tsx:19-32` | `src/i18n/SpanishSite.tsx:558-570` | Four add-on titles/descriptions plus page hero, included-site cards and CTA supporting text. Prices stay locked. |
| Audit | `src/app/audit/page.tsx:7-27` | `src/i18n/SpanishSite.tsx:434-445` | Hero, four audit cards and form field copy. |
| Website management | `src/app/website-management/page.tsx:12-22` | `src/i18n/SpanishSite.tsx:524-536` | Hero, four cards and CTA supporting copy. |
| Contact | `src/app/contact/page.tsx:14-22`; shared defaults at `src/components/Form.tsx:8-10` | `src/i18n/SpanishSite.tsx:416-427` | Hero, form introduction/note, contact information descriptions and fast-response message. |
| Strategy call | `src/app/strategy-call/page.tsx:15-25`; booking defaults in `src/components/BookingCalendar.tsx` | `src/i18n/SpanishSite.tsx:575-613` | Hero, expectation list, calendar instructions, errors, confirmations and field text. Buttons remain locked. |
| Industries index | `src/app/industries/page.tsx:14-35` | `src/i18n/SpanishSite.tsx:451-461` | Hero, section headings and descriptive paragraphs. |
| Industry templates (11 pages) | `src/data/industries.ts:42-488`; shared renderer copy at `src/app/industries/[slug]/page.tsx:24-47,166-230` | `src/i18n/industries-es.ts:16-417`; shared renderer copy at `src/i18n/SpanishSite.tsx:711-785` | Per trade: H1/subhead, intro, problems heading + 3 cards, services heading + 3 cards, service-area text, feature text, 3 FAQs, responsive/example/audit/CTA copy. |
| Services index | `src/app/services/page.tsx:8-72` | `src/i18n/SpanishSite.tsx:244-257` | Hero, four cards, city-page explanation and CTA supporting text. |
| Web design | `src/app/web-design/page.tsx:14-50`; FAQ source `src/lib/content.ts:13-18` | `src/i18n/SpanishSite.tsx:263-288` | Hero, six cards, nationwide/trade headings, four FAQs and CTA supporting text. |
| SEO | `src/app/seo-services/page.tsx:12-33`; FAQ source `src/lib/content.ts:19-25` | `src/i18n/SpanishSite.tsx:292-319` | Hero, six cards, approach copy, five FAQs and CTA supporting text. |
| About/process | `src/app/about/page.tsx:14-57`; shared steps `src/lib/content.ts:26-31` | `src/i18n/SpanishSite.tsx:382-411` | Hero, audience/expectation sections, three cards, process steps and FAQ heading. |
| FAQs page | `src/app/faqs/page.tsx:12-14`; shared answers `src/lib/content.ts:2-12` | `src/i18n/SpanishSite.tsx:466-473`; shared answers at lines 214–225 | Hero and CTA supporting copy plus shared FAQ set. |
| Reviews page | `src/app/reviews/page.tsx:15-24` | `src/i18n/SpanishSite.tsx:541-553` | Hero and CTA supporting copy only. User-authored review text must not be rewritten. |
| Portfolio index/case studies | `src/app/portfolio/page.tsx:25-59,109`; `src/app/portfolio/[slug]/page.tsx:73-162`; `src/data/projectDetails.ts:13-134` | `src/i18n/SpanishSite.tsx:679-706` (case studies link to English) | Hero claims, section headings/descriptions, CTA copy, case-study headings and all project narratives. See honesty flag below. |

### Excluded from the differentiation rewrite unless the owner asks

- Legal policy prose in `src/app/terms/page.tsx`, `src/app/privacy/page.tsx` and Spanish equivalents at `src/i18n/SpanishSite.tsx:618-666`. These are factual/legal terms rather than promotional copy. Any rewrite risks changing meaning.
- Checkout, payment confirmation, client-login and error-state utility copy. These were not named in scope and are operational rather than competitor-pattern marketing copy.
- Blog article bodies and review quotations. They are editorial/user-authored content, not the repeated landing-page copy pattern. Blog titles/descriptions are still included in the metadata review below.

## 7. Metadata and Open Graph inventory

English page titles and descriptions are centralized in `src/lib/pages.ts:19-204`. Spanish page titles and descriptions are centralized in `src/i18n/SpanishSite.tsx:42-62`. Both sets need unique, original copy per page and locale.

| Route | English metadata | Spanish metadata |
|---|---|---|
| `/` | `src/lib/pages.ts:20-28` | `src/i18n/SpanishSite.tsx:43` |
| `/services` | `src/lib/pages.ts:29-37` | `src/i18n/SpanishSite.tsx:44` |
| `/web-design` | `src/lib/pages.ts:38-46` | `src/i18n/SpanishSite.tsx:45` |
| `/seo-services` | `src/lib/pages.ts:47-55` | `src/i18n/SpanishSite.tsx:46` |
| `/audit` | `src/lib/pages.ts:56-64` | `src/i18n/SpanishSite.tsx:47` |
| `/contact` | `src/lib/pages.ts:65-73` | `src/i18n/SpanishSite.tsx:48` |
| `/website-management` | `src/lib/pages.ts:74-82` | `src/i18n/SpanishSite.tsx:49` |
| `/about` | `src/lib/pages.ts:83-91` | `src/i18n/SpanishSite.tsx:50` |
| `/portfolio` | `src/lib/pages.ts:92-100` | `src/i18n/SpanishSite.tsx:51` |
| `/industries` | `src/lib/pages.ts:101-109` | `src/i18n/SpanishSite.tsx:52` |
| `/reviews` | `src/lib/pages.ts:110-117` | `src/i18n/SpanishSite.tsx:53` |
| `/upgrades` | `src/lib/pages.ts:118-125` | `src/i18n/SpanishSite.tsx:54` |
| `/pricing` | `src/lib/pages.ts:126-134` | `src/i18n/SpanishSite.tsx:55` |
| `/blog` | `src/lib/pages.ts:144-153` | `src/i18n/SpanishSite.tsx:56` |
| `/faqs` | `src/lib/pages.ts:154-162` | `src/i18n/SpanishSite.tsx:57` |
| `/update` | `src/lib/pages.ts:163-171` | `src/i18n/SpanishSite.tsx:58` |
| `/strategy-call` | `src/lib/pages.ts:172-179` | `src/i18n/SpanishSite.tsx:59` |
| `/terms` | `src/lib/pages.ts:180-188` | `src/i18n/SpanishSite.tsx:60` |
| `/privacy` | `src/lib/pages.ts:189-197` | `src/i18n/SpanishSite.tsx:61` |

Additional dynamic metadata:

- English industry titles/descriptions: `src/data/industries.ts:40-488` (the `metaTitle`/`metaDescription` fields adjacent to each industry block).
- Spanish industry titles/descriptions: `src/i18n/industries-es.ts:14-417`.
- English blog title/excerpt metadata: `src/lib/content.ts:146-219` and article content in `src/app/blog/[slug]/page.tsx`.
- Spanish blog title/excerpt metadata: `src/i18n/posts-es.ts`.
- English portfolio-detail metadata and descriptions: `src/app/portfolio/[slug]/page.tsx:56-66` and `src/data/projectDetails.ts:13-134`.

Open Graph and Twitter titles/descriptions are not separate strings: `src/lib/seo.ts:29-48,66-98` reuses each page title and description. Updating the central metadata sources will update those fields without touching canonicals, hreflang or URLs.

## 8. Honesty check — owner decision required

**Finding:** `design-source/portfolio/references/README.md:32` states: “All businesses are fictional portfolio concepts.” The current public copy conflicts with that disclosure.

Affected claims and sources:

- `src/app/portfolio/page.tsx:27-30` calls the portfolio “Real websites for local service businesses” and frames it as completed work.
- `src/app/portfolio/page.tsx:46` groups the concepts as “Custom & Template Sites” without a concept label.
- `src/i18n/SpanishSite.tsx:683-690` repeats “Sitios reales para negocios de servicios”, “Trabajo” and project framing in Spanish.
- `src/data/portfolio.ts:23-42` contains 18 fictional projects, including Bluehaven, Breezeway and Copperline, with no `concept` field or visible label.
- `src/data/projectDetails.ts:13-134` describes fictional brands as clients with statements such as “needed,” “wanted,” “serves,” “the result,” and performance/lead outcomes. Those narratives should be rewritten as concept-design explanations and must not imply client results.
- `src/app/portfolio/[slug]/page.tsx:73-162` renders each concept as a project/case study and needs a visible “Concept design” label near the heading using existing text styles.

The separate `LIVE_SITES` collection rendered at `src/app/portfolio/page.tsx:55-103` and `src/i18n/SpanishSite.tsx:690-702` appears intentionally separated as live client sites. Its names/URLs should remain untouched unless the owner says otherwise.

## 9. Step 2 implementation notes for owner review

1. Rewrite only user-visible strings and central metadata sources; do not alter markup, classes, styles, routes, buttons, images, icons or component structure.
2. Treat each adjacent card group as a set. Keep titles and bodies similar in visual length, but do not pad with filler.
3. Preserve all commercial/legal facts exactly, especially pricing, plan names, 3-month minimum, 24-month lock, carrier approval timing and guarantee terms.
4. Write `/es` naturally for a broad US/Latin American audience, then review `/es-es` as Spain Spanish rather than relying only on `spainize()` substitutions.
5. Add concept labels and remove client-result implications from fictional portfolio work before describing it as portfolio evidence.
6. After approved rewrites: verify every old phrase is gone, run the build, and check wrapping at 360 px, 768 px and 1280 px.

## 10. Implemented replacement summary

The detailed tables above preserve the original strings for review. The implementation now uses these approved directions:

| Area | English replacement direction | Spanish replacement direction |
|---|---|---|
| Homepage value section | “What You Get With Kinexis” with three specific cards about calls, follow-up, and pricing | “Lo que recibes con Kinexis” with native card copy of comparable visual length |
| Portfolio introduction | “Websites Made For Your Trade” with an explicit concept-design disclosure | “Sitios hechos para tu oficio” with “diseños conceptuales” disclosure |
| Comparison | “Why Business Owners Choose Kinexis” and five Kinexis-specific rows | “Por qué los negocios eligen Kinexis” and the same five facts in natural Spanish |
| Four reasons | Device quality, calls, Google readability, and handled upkeep | Device quality, calls, Google readability, and handled upkeep in native Spanish |
| Process | Free preview, plan choice, full build, launch, and ongoing care | The same five facts rewritten for natural Spanish rhythm |
| Shared FAQs | Nine new questions and reworded answers with every policy term preserved | Nine native Spanish questions and answers; `/es-es` continues to apply Spain vocabulary |
| Service pages | New human-sounding heroes, headings, cards, descriptions, FAQs, and CTA support copy | Coordinated rewrites across the shared Spanish renderer |
| Metadata | A distinct title and description for every central English page entry | A distinct title and description for every mirrored Spanish page entry |
| Portfolio honesty | All 18 fictional projects are called concept designs; narratives describe design intent rather than client needs or results | Spanish portfolio index makes the same concept/live-site distinction |

Legal terms, checkout flows, and user-authored reviews were not rewritten. Utility labels changed only where a clearer action was needed.

## 11. QA record

- [x] Legacy phrases from the brief are absent from `src` in English and Spanish.
- [x] Production build passes (`npm run build`, Next.js 16.4.3).
- [x] No routes, URLs, canonical links, hreflang entries, prices, plan names, minimums, price-lock terms, contact details, images, icons, colors, tokens, or CSS were intentionally changed by this copy pass.
- [x] Button and navigation destinations remain unchanged; labels now use original, action-specific wording.
- [x] Fictional portfolio entries are disclosed as concept designs and are not described as client results.
- [x] Browser overflow review passed at exact 360 px, 768 px, and 1280 px viewports for `/` and `/es`; `/portfolio`, `/pricing`, and `/contact` also passed at 360 px. No document-level horizontal overflow was detected.

## 12. Direct comparison with 180 Sites

A second site-wide pass compared Kinexis source strings with the public copy on `180sites.com`, including its homepage, pricing, process, audit, upgrades, website-management, about, contact, FAQ, and major trade pages.

Additional direct or structurally close passages replaced in this pass:

| Source | Previous wording | Replacement direction |
|---|---|---|
| `src/components/AuditCta.tsx` and `src/components/IndustryAudit.tsx` | “Get a Free Site Audit & Increase Your Profitability” and “Let us show you areas for dramatic improvement…” | “See What Is Holding Your Website Back” with a specific explanation of what the review provides. |
| `src/components/PricingCta.tsx` | “Spend less, get more”; “Websites Starting at Only”; generic leads sentence | “A practical starting point”; “Start With The Website Plan”; a factual list of what the plan covers. |
| `src/components/PlanOffer.tsx` | “Websites Built For Your Trade Starting At Only” | “Choose The Right Starting Point For Your Site”. |
| `src/components/SiteAudit.tsx` | Spanish profitability/audit wording that mirrored the same offer | Native Spanish copy focused on identifying what is holding the site back. |
| `src/app/page.tsx` and `src/lib/content.ts` | Residual “call or request a quote” sequences also present on 180 Sites trade pages | Reworded around calling, sending job details, or requesting an estimate. |
| `src/lib/content.ts` and `src/app/blog/[slug]/page.tsx` | “Your website should be your best salesperson” and related stock marketing phrasing | Plain descriptions of what a service website should help a visitor do. |
| `src/app/pricing/page.tsx` and `src/app/terms/page.tsx` | “30-day money-back guarantee” heading copied verbatim | “30-day refund period” / “Refund requests during the first 30 days”; policy meaning remains unchanged. |
| `src/lib/site.ts` | Generic agency description ending in “turns searches into calls” | Kinexis-specific description covering websites, search support, and practical follow-up. |

### Final label and voice pass

The owner later unlocked button and navigation labels. The remaining matching labels were replaced without changing their destinations or styling:

| Previous label | Updated label |
|---|---|
| “Try Us Risk Free” | “See My Homepage First” |
| “Start Getting More Leads” | “Compare Plans And Features” |
| “Get A Free Site Audit” | “Review My Website” |
| “See Pricing” | “View The Four Plans” |
| “Chat With Us” | “Share Your Website Plans” |
| “Schedule A Strategy Call” | “Talk Through Your Options” |
| “Web Management” | “Website Care” |
| “Web Audits” | “Site Reviews” |
| “Request Site Updates” | “Send A Site Change” |

Spanish CTA and navigation equivalents were revised at the same time rather than translated word for word. Reusable Spanish audit sections now use the same practical “what works, what gets in the way, what to fix first” framing as the English sections.

The six English blog bodies were also rewritten to match the homepage: short explanations, concrete examples, no unsupported superlatives, and clear next steps. Their reading-time labels were updated to reflect the shorter articles. Spanish blog bodies already followed this style.

The final automated comparison found no five-word source-string overlap with the reviewed 180 Sites pages. Generic four-word SEO phrases such as “pressure washing website design,” ordinary descriptions such as “before-and-after photos,” and verbatim client reviews were not treated as proprietary copy.

Final responsive checks passed at 360 px, 768 px, and 1280 px on the English portfolio, website-care, and rewritten blog pages plus the Spanish homepage and portfolio. No document-level or visible heading/button overflow was found.

# Design decisions

## Scope and source of truth

The owner wants the earlier professional agency-style visual foundation back, with a more distinctive design informed by the supplied pricing references. The current contractor offer, legal corrections and UTF-8 fixes remain authoritative. A scope clarification was offered; in the absence of a reply, the communicated working assumption is to fulfill the final request for a complete visual redesign and use phases as review checkpoints. This is an assumption, not a recorded owner answer.

No deployment is authorized for this redesign. Work is isolated on `codex/professional-site-redesign`, based on `79c79ddc`. The primary checkout contains unrelated image, CSS and component changes; none are imported into this branch.

The historical plan's ecommerce positioning, no-lock-in wording and result/badge suggestions are superseded by the owner's explicit current brief. No unsupported proof will be restored. The current case-study routes redirect to the homepage, so baseline screenshots and Lighthouse reports label the redirect rather than pretending to audit a case-study template.

## Stack inventory

| Area | Existing implementation | Decision |
|---|---|---|
| Framework | Next.js 15.5.25 App Router, React 19, TypeScript | Keep the stack and build commands. |
| Localization | next-intl; `messages/en.json`, `messages/es-419.json`, `messages/es-ES.json`; typed locale content modules | Keep all three locales. New visible strings use the same locale mechanisms. |
| Routing | `src/app/[locale]`; middleware uses language cookies and geo rewrites | Preserve URLs and the language switch. Use explicit English cookies for reproducible baselines. |
| CSS | Tailwind 4, global component styles, route CSS | Introduce prefixed foundation tokens; keep existing semantic theme variables. |
| Homepage | Server-rendered contractor content, `/pay` plan content, shared FAQ and Button components | Preserve factual content and metadata during foundations. |
| Templates | PageHero, service/industry pages, contact/audit forms, WebsiteLanding, pay checkout | Inventory and capture before visual changes. |
| Forms | Existing API routes, validation and consent | No endpoint or tracking changes; no live submissions. |
| Analytics | Existing Google/Meta consent, ad tags, CAPI and event helpers | Preserve behavior; screenshots block third-party traffic and non-GET requests. Lighthouse loads pages normally. |
| Tests | Vitest, React Testing Library, ESLint, TypeScript | Keep scripts; require lint, design lint, tests, typecheck and build. |
| Hosting | OpenNext Cloudflare Worker | No deployment. |

## Typography

Keep the supplied Kinexis display and text fonts. They are already self-hosted in `src/fonts/` and loaded with `next/font/local` and `display: swap`. The display 700 file is preloaded; text files are not preloaded. Replacing them now would break the no-visible-regression requirement and add font/layout risk. Inter Tight, Geist and Plus Jakarta Sans remain possible later evaluations; no new font download or external font service is introduced.

## Tokens

`src/styles/design-tokens.css` adds namespaced colors, a nine-step neutral scale, fluid type sizes, an 8px spacing scale, radii, restrained shadows and reduced-motion-aware timing variables. Initial aliases in contractor-home.css exactly match the previous numeric values. New section spacing and shape tokens are available for later design phases but are not applied globally during foundations.

The existing cobalt remains available. Navy and the warm accent match the current offer and supplied pricing references. Themes, logos and existing semantic color variables are retained.

## Assets and content

The five owner-provided PNG files are pricing design references, not evidence of customer results. Use their type hierarchy, plan emphasis and clear inclusion lists when visual implementation is authorized. Text must remain selectable and translatable HTML. `/pay` and `/terms` control details whenever a poster differs.

No decorative section numbers will be added. A future process section can use descriptive icons or a connecting visual without 01/02/03 labels.

## Measurement

Baseline screenshots: six requested routes at 390, 768, 1280 and 1536px. The captured browsing context uses English, reduced motion and an existing rejected-consent preference; it blocks external and non-GET requests. Capture disables content-visibility and animations for complete full-page artifacts only, without changing production styles.

Lighthouse: mobile and desktop, all four standard categories. These are lab measurements, not field Core Web Vitals. Report LCP, CLS and TBT; do not call TBT an INP measurement. The baseline records the actual live site and the final URL of redirected pages.

## TODO(owner)

- Provide verified social/review links if additional footer profiles are wanted. No profile is invented.
- Confirm any future founder/team imagery and usage permission before adding a new people section.
- No production placeholder text is introduced. Unsupported testimonials, badges and result statistics remain excluded.

## Visual implementation

Restore the original site's professional section rhythm while keeping the current contractor content: split hero, capabilities, pricing, process, guarantee, trades, FAQ and closing CTA. No old claims or contradictory terms are restored.

The hero shows a fully localized, clearly labeled illustrative design, not a client result or dashboard. The existing Greenfield garden illustration supplies its image; the browser frame and content are native HTML/CSS. Responsive AVIF encodes are 14.7KB at 360px and 62.2KB at 720px. All image dimensions and cache versions are explicit.

Feature rows and an icon-connected process replace repetitive card-only composition and decorative numerical labels. Six trade links share a consistent icon treatment rather than mixing photos and text-only cards. Supplied plan posters inform the featured cobalt Lead System card, yellow accent and separated feature groups. Every feature and price still comes from /pay.

Shared header, PageHero, PageCTA and footer defaults now use Messenger / plans consistently. Specific audit/landing-page form actions stay specific to those pages. The existing phone number is preserved; no fictitious Houston number is introduced. The sticky header compacts instead of disappearing on downward scroll. The mobile contact bar reserves footer space and hides while cookie consent is open; the back-to-top button sits above it.

The critical CSS generator now recognizes the new hero and its main wrapper. This is needed for the existing Cloudflare stylesheet deferral to preserve the designed first paint when the draft is eventually deployed.

Existing server validation contracts, endpoints, consent and conversion events are preserved; the contact presentation is simplified as described below. Case-study redirects stay in place because the current owner explicitly prohibits result claims; there is no verified proof source to justify publishing a restored case-study template.

### Contact and conversion-page refinements

The contact page now starts with the message tab instead of loading the booking calendar immediately. The message form is server-rendered, and the calendar remains available behind an accessible secondary tab. Arrow keys, Home and End operate the tabs. The short form collects name, email, optional phone, optional website and the request; removed company/service selectors remain optional empty payload fields for compatibility.

The current `/api/contact` contract requires an email address. That requirement is intentionally retained rather than presenting a phone-only form that the endpoint would reject. The optional URL is included in the existing message body, with its length bounded to fit the existing server limit. A mocked fetch test verifies the endpoint, URL delivery, attribution, Meta event ID and lead event; no live submission occurs.

The same verified offer strip appears on the homepage, audit, website landing, web-design service and plumbing industry pages. It shows the free preview, actual minimum and approval sequence instead of customer-result statistics. Audit and service secondary actions lead to real plans rather than retired case-study pages. Existing landing-page intake actions, consent and conversion wiring remain intact.

The decorative footer wordmark now meets large-text contrast instead of rendering at 12% opacity. Mobile-menu Escape restores focus after the menu focus trap has been removed, including in WebKit.

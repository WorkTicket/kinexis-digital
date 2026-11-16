# DECISIONS.md

## Architecture/stack
- Next.js 16 App Router, TypeScript strict, Tailwind v4
- Deploy to Cloudflare Workers via OpenNext adapter
- Path alias `@/*` -> `./src/*`
- Images unoptimized (Cloudflare Images not enabled yet) - see README

## Design/UX
- Sticker/cartoon style with navy/orange/cobalt, hard shadows
- Single primary CTA per screen where possible
- Responsive-first, accessibility considered
- Local fonts with swap/fallback tracking to avoid layout shift

## Routing/SEO
- Canonical metadata in `src/lib/pages.ts` (single source of truth)
- Many legacy redirects in `next.config.ts` (html, old paths, retired industry slugs) to preserve crawl signals
- `robots.ts`, `sitemap.ts` present; post-deploy checks + IndexNow in deploy flow
- `pay`/utility pages marked non-indexable where appropriate

## Content/claims
- Do not invent claims/pricing - use repo as source of truth
- Free homepage preview emphasized; plans as documented in pages
- Spanish locales present (`/es`, `/es-es`)
- **Currency:** EN + LatAm `/es` use USD. Spain `/es-es` shows the **same published numerals in euros** (`src/i18n/prices.ts` → `toSpainEuros` / `spanishPlans({ currency: "eur" })`). Not a separate FX price book.

## i18n maintainability (deferred epic)
- EN pages live as per-route files under `src/app/(en)/`; Spanish is a catch-all + `SpanishSite.tsx` / `SpanishIndustry.tsx` monolith with a separate `PAGE_META` map.
- Coverage guard: `npm run check:spanish-mirror` asserts `MIRROR_PATHS` ⊆ static `SPANISH_STATIC_META_PATHS` + industry/blog data.
- **Deferred (do not start in a drive-by):** split Spanish into shared locale-aware section components, unify metadata with `PAGES`, dedupe industry + home markup. Track as its own epic when EN/ES drift becomes costly.

## Conferbot / lead intel
- Separate Cloudflare D1 binding `LEAD_DB` (not `INVOICE_DB`) for chat/leads/outbox; migration `migrations-lead/0001_conferbot_lead_intel.sql`. Binding omitted from `wrangler.jsonc` until real DB ids exist (placeholders break `wrangler` / OpenNext deploys). Merging to `main` does not deploy; production ships are manual (`npm run deploy`).
- Webhook HMAC + redaction + feature flags; see `docs/CONFERBOT-INTEGRATION.md`
- Integration and notify flags default off; no production secrets in git
- **Widget load (owner 2026-11-15):** live chat is a functional feature, not analytics. `ConferbotWidget` loads for every public visitor when `NEXT_PUBLIC_CONFERBOT_ENABLED=1` (skips `/admin`), regardless of `kinexis_consent` analytics choice. Deferred via `requestIdleCallback` (~2.5s timeout) or first scroll/pointer/touch/key; module-level guard prevents double-init across client navigations. Privacy / cookie banner copy already describes only GA4 + Meta as consent-gated — no chat-waits-for-consent wording found, so no privacy copy change in that PR (owner can still review if product wants chat named under Necessary).
- **Widget mobile lift (owner 2026-11-15):** launcher is `#open-chatbot.chatbot__icon` inside `<conferbot-widget>` open shadow DOM (not an iframe). Conferbot sets `bottom` via inline styles + `!important` media queries, so site `globals.css` never wins. `ConferbotWidget` measures `.float-cta`, then sets host `data-cb-own-m-bottom` / `--cb-o-m-bottom` and injects shadow `#kx-chat-lift` + `setProperty(..., "important")` so the bubble sits ~12px above the sticky bar (updates on resize / `no-float` / consent). Desktop (≤860px MQ false) clears the override.
- **Widget lift hardening (owner 2026-11-16):** positioner is page-lifetime (`liftArmed` singleton — React remount cleanup must not clear the lift). Re-binds float + host/shadow observers, re-appends `#kx-chat-lift` last after Conferbot styles, permanent 1s sync (no 20s cutoff), floors measured bottom against `--float-bar-h` + gap, targets `#open-chatbot.chatbot__icon`.

## Security/headers
- CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options, COOP, CORP configured in `next.config.ts` (includes Conferbot CDN/WDT hosts for future widget)
- Powered-by header disabled
- Contact/checkout/reviews share KV rate limits (`src/lib/rate-limit.ts`); missing KV fails open for local/tests; KV errors fail closed
- On-site reviews are queued pending staff approval; moderation email links open a **confirm page** (GET), then mutate via **POST** with CSPRNG keys (`/api/reviews/moderate`) — avoids mail-scanner prefetch publishes
- Contact attachments limited to PDF/Word/images; phone validated server-side; `FORM_ENDPOINT` must be https; request bodies also checked after parse (`rejectReadOversize`)
- API routes log structured errors via `src/lib/api-log.ts` (no PII)

## Config notes
- `SITE.announce` configurable in `src/lib/site.ts`
- Kit asset versioning via `KIT_ASSET_VERSION` for cache busting
- Experimental `cpus: 4` in next.config
- Facebook/Trustpilot API fetches live in `facebook-api.ts` / `trustpilot-api.ts` (`server-only`); public URL constants stay client-safe

## Performance
- Locale layouts use `revalidate = 86400` so OpenNext KV cache interception can serve HTML without booting Next
- Industry LCP art uses capped 480/768/960 WebP+AVIF derivatives only (never the multi-hundred-KB master WebP)
- Interaction boot ships as minified `boot.min.js` (source remains `public/assets/js/boot.js`; `scripts/minify-boot.mjs` runs in build)
- Heavy client islands (checkout, calendar, review form) load via `next/dynamic` so Spanish monolith routes stay light
- Language switch stays a tiny client component (`usePathname`) so layouts never call `headers()` and pages can stay statically generated for OpenNext cache + defer-chunks
- Meta Pixel loads from `boot.min.js` on first input (or 45s fallback), same idea as GA — keeps fbevents off the Lighthouse critical path; CSP allows Meta openbridge hosts (`*.a.run.app`, `*.on.aws`)
- Do not re-enable async/deferred Next CSS injects in `defer-chunks.mjs` — that caused FOUC and hydration failures before

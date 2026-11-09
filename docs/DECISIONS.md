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

## Security/headers
- CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options, COOP, CORP configured in `next.config.ts`
- Powered-by header disabled
- Contact/checkout/reviews share KV rate limits (`src/lib/rate-limit.ts`); missing KV fails open for local/tests; KV errors fail closed
- On-site reviews are queued pending staff approval; notification email includes one-click approve/reject links (`/api/reviews/moderate`)
- Contact attachments limited to PDF/Word/images; phone validated server-side; `FORM_ENDPOINT` must be https

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
- Language switch is a server component (no client hydration on every page)

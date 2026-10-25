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

## Config notes
- `SITE.announce` configurable in `src/lib/site.ts`
- Kit asset versioning via `KIT_ASSET_VERSION` for cache busting
- Experimental `cpus: 4` in next.config

# ARCHITECTURE.md

## Stack
- Next.js 16 (App Router), TypeScript (strict), Tailwind CSS v4
- React 19.3.1
- Deployed to Cloudflare Workers via OpenNext (`@opennextjs/cloudflare`)
- Node >=22.0.0 (see package.json)

## Config
- `next.config.ts` - CSP, redirects (legacy/html/industry routes), security headers, `images.unoptimized: true`, Cloudflare dev init
- `tsconfig.json` - `@/*` -> `./src/*`, strict
- `wrangler.jsonc` - Worker config (assets/bindings/routes); `REVIEWS` KV for on-site review posts
- `open-next.config.ts` - OpenNext adapter config
- `package.json` scripts: dev/build/start/lint/typecheck/images:optimize/images:heroes/check:contact/preview/deploy/search:notify/upload/cf-typegen

## App structure (from repo)
```
src/
├── app/
│   ├── (en)/           English marketing routes + layout (renders <html>)
│   ├── es/             LatAm Spanish catch-all + layout (renders <html>)
│   ├── es-es/          Spain Spanish catch-all + layout (renders <html>)
│   ├── api/            Contact, checkout, reviews APIs
│   └── globals.css     Design system (shared)
├── components/         Shared UI
├── data/               Industries and portfolio content
├── i18n/               SpanishSite monolith, SpanishIndustry, posts-es, chrome
├── lib/                Site config, SEO, content, pages, payments, etc.
└── proxy.ts

public/
├── assets/logos/       Header/footer logos
├── assets/brand/       Brand artwork
├── assets/video/       Homepage hero film
├── assets/kinexis/     Icons/illustrations/heroes/decorative SVGs
├── blog/               Article images
└── portfolio/          Project screenshots

docs/                   (this doc set)
scripts/                Search Console/IndexNow on deploy, optimizations, checks
```

There is **no** single `src/app/layout.tsx`. Each locale tree owns a full document shell via `DocumentShell` so `lang` / defaults stay per-locale.

## Routes (observed)
Indexable EN marketing routes live under `src/app/(en)/` and are listed in `src/lib/pages.ts`. Spanish mirrors are driven by `MIRROR_PATHS` in `src/lib/locale-path.ts` and rendered by `SpanishPage` / `SpanishIndustry`. Utility examples: `/`, `/about`, `/api/*`, `/audit`, `/blog`, `/contact`, `/es/*`, `/es-es/*`, `/faqs`, `/industries`, `/pay`, `/portfolio`, `/pricing`, `/privacy`, `/reviews`, `/seo-services`, `/services`, `/strategy-call`, `/terms`, `/update`, `/upgrades`, `/web-design`, `/website-management`. Process UI is embedded (home Stepper, about ProcessFlow, web-design DesignProcess) — there is no `/process` route.

## Key files
- `src/components/DocumentShell.tsx` - Shared `<html>`/`<head>`/`<body>`, fonts, chrome
- `src/app/(en)/layout.tsx`, `src/app/es/layout.tsx`, `src/app/es-es/layout.tsx` - Locale roots
- `src/app/globals.css` - Tailwind v4 theme tokens, design system classes (buttons/stickers/cards), responsive rules
- `src/lib/site.ts` - SITE config (name/url/phone/email/social/announce/video/ogImage)
- `src/lib/pages.ts` - Canonical page metadata/sitemap/redirect source of truth
- `src/components/Header.tsx`, `Footer.tsx`, `ui.tsx`, `artwork.tsx` - Core UI
- `src/i18n/SpanishSite.tsx` - Spanish static page router + `PAGE_META`

## Notes
- Images: `next/image` uses `unoptimized: true` (Cloudflare Images not enabled). Stills in `public/` pre-encoded, with AVIF served first and WebP fallback where variants exist. Run `npm run images:heroes` after replacing page hero artwork.
- SEO: `robots.ts`, `sitemap.ts` present. `next.config.ts` does many 301 redirects.
- Security headers set in `next.config.ts` (CSP, HSTS, etc.)
- Contact forms/checkout use Mailgun/forwarding/Gmail SMTP/PayPal (see README). Invoice checkout may offer contact fallback if PayPal secret missing.
- `/reviews` shows on-site reviews (KV via `POST /api/reviews`), matched Trustpilot/Facebook review CTAs (evaluate + Facebook review URLs), optional Trustpilot API cards when `TRUSTPILOT_API_KEY` is set, and Facebook recommendations.

# ARCHITECTURE.md

## Stack
- Next.js 16 (App Router), TypeScript (strict), Tailwind CSS v4
- React 19.3.1
- Deployed to Cloudflare Workers via OpenNext (`@opennextjs/cloudflare`)
- Node >=22.0.0 (see package.json)

## Config
- `next.config.ts` - CSP, redirects (legacy/html/industry routes), headers (long cache for assets), `images.unoptimized: true`, Cloudflare dev init
- `tsconfig.json` - `@/*` -> `./src/*`, strict
- `wrangler.jsonc` - Worker config (assets/bindings/routes)
- `open-next.config.ts` - OpenNext adapter config
- `package.json` scripts: dev/build/start/lint/typecheck/images:optimize/images:heroes/check:contact/preview/deploy/search:notify/upload/cf-typegen

## App structure (from repo)
```
src/
├── app/                App Router routes, layout, global CSS
├── components/         Shared UI (36 files)
├── data/               Industries and portfolio content
├── i18n/               Localization (chrome/locale helpers)
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

## Routes (observed)
Top-level routes include: `/`, `/about`, `/api/*`, `/audit`, `/blog`, `/client-login`, `/contact`, `/es/*`, `/es-es/*`, `/faqs`, `/industries`, `/pay`, `/portfolio`, `/pricing`, `/privacy`, `/process`, `/reviews`, `/seo-services`, `/services`, `/strategy-call`, `/terms`, `/update`, `/upgrades`, `/video-reviews`, `/web-design`, `/website-management`. See `src/app/` and `src/lib/pages.ts` for canonical metadata.

## Key files
- `src/app/layout.tsx` - Root layout, fonts (Inter/Poppins), locale boot, chrome, schema, global UI components
- `src/app/globals.css` - Tailwind v4 theme tokens, design system classes (buttons/stickers/cards), responsive rules
- `src/lib/site.ts` - SITE config (name/url/phone/email/social/announce/video/ogImage)
- `src/lib/pages.ts` - Canonical page metadata/sitemap/redirect source of truth
- `src/components/Header.tsx`, `Footer.tsx`, `ui.tsx`, `artwork.tsx` - Core UI
- `src/lib/i18n/*` - Locale handling (en/es/es-es)

## Notes
- Images: `next/image` uses `unoptimized: true` (Cloudflare Images not enabled). Stills in `public/` pre-encoded, with AVIF served first and WebP fallback where variants exist. Run `npm run images:heroes` after replacing page hero artwork.
- SEO: `robots.ts`, `sitemap.ts` present. `next.config.ts` does many 301 redirects.
- Security headers set in `next.config.ts` (CSP, HSTS, etc.)
- Contact forms/checkout use Mailgun/forwarding/Gmail SMTP/PayPal (see README). Invoice checkout may offer contact fallback if PayPal secret missing.

# KINEXIS Digital — Website

Production marketing website for [KINEXIS Digital](https://www.kinexisdigital.com) — a premium growth agency focused on strategic websites, SEO, paid media, and measurable business growth.

Built with Next.js 15, TypeScript, and Tailwind CSS. Fully bilingual (English / Spanish) with 395+ statically generated routes across services, industries, locations, blog, case studies, pricing, and comparison pages.

## Tech stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **i18n:** next-intl (`en`, `es`)
- **Forms & API:** Nodemailer (contact, lead magnet), rate limiting, sanitization
- **Analytics:** Google Analytics, Microsoft Clarity (cookie-consent gated)
- **Monitoring:** Sentry (optional)
- **Deployment:** Cloudflare Workers via [@opennextjs/cloudflare](https://opennext.js.org/cloudflare)
- **CMS schemas:** Sanity schema definitions in `sanity/` (content is file-based in `src/content/`)

## Features

- Homepage, about, contact, resources, and lead magnet flows
- 16 service pages with shared architecture and hero visualizations
- Industry hub with category and detail pages
- Location pages (city + city/service combinations)
- Blog with clustered articles in EN and ES
- Case studies, pricing tiers, SEO comparison pages, and solution landing pages
- JSON-LD, sitemap, robots.txt, security headers, and OG metadata
- Pre-rendered production build committed in `.next/` (webpack cache excluded)

## Getting started

```bash
git clone https://github.com/WorkTicket/kinexis-digital.git
cd kinexis-digital
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For a production-like local test in the Workers runtime:

```bash
cp .env.example .dev.vars   # fill in secrets (gitignored)
npm run preview             # http://localhost:8787
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `GMAIL_USER` / `GMAIL_APP_PASSWORD` | SMTP for contact and lead forms |
| `CONTACT_TO_EMAIL` | Inbox for form submissions |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (e.g. `https://www.kinexisdigital.com`) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics (loaded after consent) |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity (optional) |
| `SENTRY_*` | Error monitoring (optional) |

For local Workers preview, copy the same values into `.dev.vars` (see `.env.example`).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Local development server (Next.js) |
| `npm run build` | Production build (395 static pages) |
| `npm run preview` | Build + serve in Cloudflare Workers runtime locally |
| `npm run deploy` | Build + deploy to Cloudflare Workers |
| `npm run upload` | Build + upload a new Worker version (no traffic switch) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run optimize-images` | Compress images in `public/assets/` |
| `npm run generate-favicons` | Regenerate favicon assets |

## Project structure

```
public/assets/           Logos, hero images, OG image
messages/                UI copy (en.json, es.json)
src/app/                 Next.js App Router pages and API routes
src/components/          Layout, sections, pages, services, UI
src/content/             Page copy, blog posts, case studies, pricing
src/i18n/                Locale routing and request config
src/lib/                 Metadata, schema, email, motion, utilities
sanity/                  Sanity Studio schema definitions
scripts/                 Image optimization, QA, migration helpers
docs/                    Brand guidelines and site map reference
```

## Deployment

**Live:** [https://www.kinexisdigital.com](https://www.kinexisdigital.com) — hosted on **Cloudflare Workers** via OpenNext (not static Cloudflare Pages).

### One-time setup

```bash
npx wrangler login
npx wrangler secret bulk .dev.vars   # upload production secrets
npm run deploy
```

Custom domain and routes are configured in [`wrangler.jsonc`](wrangler.jsonc).

### Environment variables (Cloudflare)

| Variable | Where to set |
|---|---|
| `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_TO_EMAIL` | Worker **Variables and Secrets** (runtime) |
| `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID` | **Build Variables and secrets** + runtime |
| `SENTRY_*` | Optional — build + runtime |

`GMAIL_APP_PASSWORD` must be a **Secret**. `NEXT_PUBLIC_*` vars must be present at build time or OG URLs, sitemap, and analytics will break.

### CI/CD (GitHub Actions)

Pushes to `main` deploy via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Add these repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_TO_EMAIL`

### DNS

- **www** → custom domain on the Worker (configured in `wrangler.jsonc`)
- **apex** → add a Redirect Rule: `kinexisdigital.com/*` → `https://www.kinexisdigital.com/$1` (301)

The repo includes a committed `.next/` production build so `npm start` works immediately after `npm install` without rebuilding.

## Documentation

- [`docs/BRAND_GUIDELINES.md`](docs/BRAND_GUIDELINES.md) — colors, typography, logo usage
- [`docs/SITE_MAP.md`](docs/SITE_MAP.md) — page-by-page section breakdown

## License

Private — © KINEXIS Digital.

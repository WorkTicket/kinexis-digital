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

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Local development server |
| `npm run build` | Production build (395 static pages) |
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

Target host: **Cloudflare Pages** (see `.env.example` for variable setup).

- **Build command:** `npm run build`
- **Adapter:** Use `@cloudflare/next-on-pages` or OpenNext so API routes (`/api/contact`, `/api/lead`, `/api/chat`) work on the edge
- Set all environment variables in Workers & Pages → Settings → Environment variables
- Point `NEXT_PUBLIC_SITE_URL` at your production domain (www preferred)

The repo includes a committed `.next/` production build so `npm start` works immediately after `npm install` without rebuilding.

## Documentation

- [`docs/BRAND_GUIDELINES.md`](docs/BRAND_GUIDELINES.md) — colors, typography, logo usage
- [`docs/SITE_MAP.md`](docs/SITE_MAP.md) — page-by-page section breakdown

## License

Private — © KINEXIS Digital.

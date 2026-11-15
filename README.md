# Kinexis Digital

Marketing site for Kinexis Digital, built with Next.js 16 (App Router) and
deployed to Cloudflare Workers through the OpenNext adapter.

## Requirements

- Node.js 22+ (Node 24 LTS recommended)
- npm 11+
- A Cloudflare account for deploys (`npx wrangler login`)

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local dev server at http://localhost:3000 |
| `npm run build` | Production Next.js build |
| `npm run lint` | ESLint (flat config) |
| `npm run typecheck` | TypeScript, no emit |
| `npm run check` | Lint, typecheck, and mocked contact-delivery checks |
| `npm run check:contact` | Validate SMTP form delivery with a mocked transport; sends no email |
| `npm run preview` | Build for Workers and serve locally in the Workers runtime |
| `npm run build:worker` | Validate assets and produce the OpenNext Worker bundle |
| `npm run deploy` | Build, deploy to Cloudflare Workers, then check Search Console readiness and submit IndexNow |
| `npm run search:notify` | Run that live check and IndexNow submission without deploying |
| `npm run upload` | Build and upload a new version without deploying it |
| `npm run cf-typegen` | Regenerate `cloudflare-env.d.ts` from `wrangler.jsonc` |

## Deploy

1. `npx wrangler login`
2. `npm run deploy`

The Worker name is `kinexis-digital` (see `wrangler.jsonc`). The first deploy
creates it and prints a `*.workers.dev` URL.

`npm run deploy` then requests the canonical host
(`NEXT_PUBLIC_SITE_URL`, default `https://www.kinexisdigital.com`) and checks
the homepage, `robots.txt`, `sitemap.xml`, and every sitemap URL. When those
pass, it submits the sitemap URLs to IndexNow. The ownership key is the text
file in `public/` whose name matches its contents. Set `SEARCH_NOTIFY=0` to
deploy without that live check.

Google Search Console reads the sitemap from `robots.txt` after the property
is verified. Submit `https://www.kinexisdigital.com/sitemap.xml` once in the
Sitemaps report. IndexNow covers the engines that participate in that
protocol, including Bing and Yandex. For a URL-prefix property, set
`NEXT_PUBLIC_GSC_VERIFICATION` in the build environment so the homepage meta
tag is present. A domain property can use a DNS TXT record instead.

### Custom domain

Both `kinexisdigital.com` and `www.kinexisdigital.com` are configured as custom
domains in `wrangler.jsonc`. Keep the zone attached to the deploying Cloudflare
account.

### Production deploy (manual)

Merging to `main` does **not** deploy. Workers Builds is not connected for
this Worker (`wrangler deployments list` shows only manual CLI deploys).

Ship production from a machine with `wrangler` logged in:

1. `git checkout main && git pull`
2. `npm run deploy` — runs `scripts/deploy-production.mjs` (`check` →
   `build:worker` → `deploy:worker` → `search:notify`)

Preview: `npm run deploy:preview` (never for apex/www).

GitHub Actions validates pull requests and `main` (`check` + `build:worker`)
but never deploys and needs no Cloudflare credentials.

Add runtime secrets with `npx wrangler secret put <NAME>`. Build-time
`NEXT_PUBLIC_*` values must be present in the local env (or `.env.local`) when
you run `npm run deploy`, because Next inlines them at build time. Local Wrangler
values belong in `.dev.vars`; never commit `.env.local` or `.dev.vars`.

Optional later: Cloudflare Workers Builds can be connected in the dashboard
(build `npm run check && npm run build:worker`, deploy
`npm run deploy:worker && npm run search:notify`, `NODE_VERSION` 24). Until that
is wired and verified, treat all production ships as manual CLI deploys.

Contact, booking, and update forms use the restricted Cloudflare Email Service
binding in production, with Mailgun, a forwarding endpoint, and Gmail SMTP as
fallbacks. Gmail uses `GMAIL_USER` and `GMAIL_APP_PASSWORD`. Recipients use the
comma-separated `CONTACT_TO` list, then `CONTACT_TO_EMAIL`, then the site email.
Invoice checkout requires `PAYPAL_CLIENT_SECRET`; until
it is configured, the payment page offers a contact link for a secure invoice
payment link instead of a checkout form that cannot complete.

On-site reviews (`/api/reviews`) are stored pending until staff approve them.
The team notification email includes one-click approve and reject links to
`/api/reviews/moderate`. Published reviews live in the `REVIEWS` KV binding.

Workers commands run the full OpenNext build so Next.js produces standalone
output. `scripts/prepare-cloudflare-traces.mjs` includes OpenTelemetry's ESM
files in the middleware trace because OpenNext selects the module entry while
Next.js traces the CommonJS entry.

## Structure

```
public/assets/logos/    Header and footer logos
public/assets/brand/    Standalone brand artwork
public/assets/video/    Homepage hero film
public/assets/kinexis/  Icons, illustrations, heroes, decorative SVGs
public/blog/            Article images
public/portfolio/       Project screenshots
src/app/                App Router routes, layout, global CSS
src/components/         Shared UI
src/data/               Industries and portfolio content
src/lib/                Site config, SEO, content, and payments
scripts/                Search Console check and IndexNow submission on deploy
wrangler.jsonc          Worker config (assets, bindings, routes)
open-next.config.ts     OpenNext adapter config
```

## Images

Cloudflare Images is not enabled, so `next/image` runs with
`unoptimized: true`. Stills in `public/` are already encoded at the sizes
the pages use. Enable the `IMAGES` binding and drop `unoptimized` once
Cloudflare Images is available on the account.

Run `npm run images:optimize` after replacing homepage section art or blog
images, `npm run images:heroes` after replacing page heroes, and
`npm run images:posters` after replacing the homepage film poster.

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
| `npm run preview` | Build for Workers and serve locally in the Workers runtime |
| `npm run deploy` | Build and deploy to Cloudflare Workers |
| `npm run upload` | Build and upload a new version without deploying it |
| `npm run cf-typegen` | Regenerate `cloudflare-env.d.ts` from `wrangler.jsonc` |

## Deploy

1. `npx wrangler login`
2. `npm run deploy`

The Worker name is `kinexis-digital` (see `wrangler.jsonc`). The first deploy
creates it and prints a `*.workers.dev` URL.

### Custom domain

Attach the zone to the Cloudflare account, then uncomment the `routes` block in
`wrangler.jsonc` and redeploy. Both `kinexisdigital.com` and
`www.kinexisdigital.com` are pre-filled.

### CI (Workers Builds)

Connect the repository in the Cloudflare dashboard:

- Build command: `npm run deploy`
- Deploy command: leave empty (the build script deploys)
- `NODE_VERSION`: `24`

Add secrets with `npx wrangler secret put <NAME>`. Local values belong in
`.env.local` (Next.js) or `.dev.vars` (Wrangler).

## Structure

```
public/assets/          Brand kit: logos, photos, illustrations, video
src/app/                App Router routes, layout, global CSS
src/fonts/              Kinexis Display / Kinexis Text (woff2)
docs/                   Brand guidelines and photography notes
wrangler.jsonc          Worker config (assets, bindings, routes)
open-next.config.ts     OpenNext adapter config
```

## Images

Cloudflare Images is not enabled, so `next/image` runs with
`unoptimized: true`. All stills in `public/assets` are already encoded to
WebP/AVIF at the sizes the design needs. Enable the `IMAGES` binding and drop
`unoptimized` once Cloudflare Images is available on the account.

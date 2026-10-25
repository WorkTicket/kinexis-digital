# WORKFLOWS.md

## Development
- `npm run dev` - Local dev server at http://localhost:3000 (Next dev)
- Node 22+ required (see engines)

## Lint/typecheck
- `npm run lint` - ESLint (flat config)
- `npm run typecheck` - TypeScript no emit

## Build
- `npm run build` - Runs `node scripts/build.mjs` (custom build script). Check script if build behavior differs from default Next build.
- `npm run preview` - `opennextjs-cloudflare build && opennextjs-cloudflare preview` (Workers runtime locally)
- `npm run upload` - Build and upload version without deploying
- `npm run deploy` - `node scripts/search-on-deploy.mjs --preflight && opennextjs-cloudflare build && opennextjs-cloudflare deploy && node scripts/search-on-deploy.mjs` (builds, deploys to Workers, checks Search Console readiness/sitemap, submits IndexNow). Set `SEARCH_NOTIFY=0` to skip post-deploy checks.

## Utilities
- `npm run images:optimize` - `node scripts/optimize-content-images.mjs`
- `npm run check:contact` - `node scripts/check-contact-delivery.mjs` (mock transport, no email sent)
- `npm run search:notify` - Run live check + IndexNow without deploying
- `npm run cf-typegen` - `wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts`

## Deployment notes (from README)
- Worker name: `kinexis-digital` (see `wrangler.jsonc`)
- Custom domain: attach zone to Cloudflare account, uncomment routes in `wrangler.jsonc`, redeploy
- Secrets via `npx wrangler secret put <NAME>`. Local: `.env.local` (Next) or `.dev.vars` (Wrangler)
- CI (Workers Builds): build command `npm run deploy`, deploy command empty, NODE_VERSION 24. Needs outbound access for post-deploy checks.

## Verification advice
- Run targeted checks first (`npm run lint`, `npm run typecheck`) for changes.
- Run full build only if changes justify it (deps/config/build scripts/routes affecting build).
- Fix errors caused by your changes.
- Report checks not run.

# WORKFLOWS.md

## Development
- `npm run dev` - Local dev server at http://localhost:3000 (Next dev)
- Node 22+ required (see engines)

## Lint/typecheck
- `npm run lint` - ESLint (flat config)
- `npm run typecheck` - TypeScript no emit
- `npm run check` - Lint, typecheck, mocked contact-delivery, reviews route handlers, and Spanish mirror
- `npm run check:reviews` - Real `/api/reviews` and `/api/reviews/moderate` handlers with in-memory KV (no Cloudflare/SMTP)
- `npm run check:route-integration` - Contact + reviews + invoice-security handler suites

## Build
- `npm run build` - Runs `node scripts/build.mjs` (custom build script). Check script if build behavior differs from default Next build.
- `npm run preview` - `opennextjs-cloudflare build && opennextjs-cloudflare preview` (Workers runtime locally)
- `npm run build:worker` - Asset preflight plus the full OpenNext Worker build
- `npm run upload` - Build and upload version without deploying
- `npm run deploy` - `node scripts/search-on-deploy.mjs --preflight && opennextjs-cloudflare build && opennextjs-cloudflare deploy && node scripts/search-on-deploy.mjs` (builds, deploys to Workers, checks Search Console readiness/sitemap, submits IndexNow). Set `SEARCH_NOTIFY=0` to skip post-deploy checks.

## Utilities
- `npm run images:optimize` - `node scripts/optimize-content-images.mjs`
- `npm run images:heroes` - rebuild page + industry hero WebP/AVIF derivatives (run after replacing masters)
- `node scripts/minify-boot.mjs` - regenerate `public/assets/js/boot.min.js` from `boot.js` (also runs at the start of `npm run build`)
- `npm run check:contact` - `node scripts/check-contact-delivery.mjs` (mock transport, no email sent)
- `npm run search:notify` - Run live check + IndexNow without deploying
- `npm run cf-typegen` - `wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts`

## Deployment notes (from README)
- Worker name: `kinexis-digital` (see `wrangler.jsonc`)
- Custom domains: `kinexisdigital.com` and `www.kinexisdigital.com` are configured in `wrangler.jsonc`; keep the zone attached to the deploying account
- **Merging to `main` does not deploy.** Workers Builds is not connected for this Worker; production ships are manual via `npm run deploy` (`scripts/deploy-production.mjs`) from a logged-in wrangler session. Preview: `npm run deploy:preview`.
- Secrets via `npx wrangler secret put <NAME>`. Local: `.env.local` (Next) or `.dev.vars` (Wrangler)
- `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_META_PIXEL_ID` must be in the local env / `.env.local` when running `npm run deploy` (Next inlines `NEXT_PUBLIC_*` at build time). A runtime Worker secret alone leaves the tags empty.
- GitHub Actions runs checks and a Worker build for pull requests and `main`; it never deploys.

## Verification advice
- Run targeted checks first (`npm run lint`, `npm run typecheck`) for changes.
- Run full build only if changes justify it (deps/config/build scripts/routes affecting build).
- Fix errors caused by your changes.
- Report checks not run.

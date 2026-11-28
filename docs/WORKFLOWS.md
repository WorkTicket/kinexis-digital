# WORKFLOWS.md

## Development
- `npm run dev` - Local dev server at http://localhost:3000 (Next dev)
- Node 22+ required (see engines)

## Lint/typecheck
- `npm run lint` - ESLint (flat config)
- `npm run typecheck` - TypeScript no emit
- `npm run check` - Lint, typecheck, mocked contact-delivery, reviews route handlers, Spanish mirror, commercial consistency, SEO ownership guard, Conferbot checks
- `npm run check:seo-ownership` - Keyword → URL ownership map + forbidden `/pricing` cannibal slugs
- `npm run check:reviews` - Real `/api/reviews` and `/api/reviews/moderate` handlers with in-memory KV (no Cloudflare/SMTP)
- `npm run check:route-integration` - Contact + reviews + invoice-security handler suites
- `npm run check:payment-reconciliation` - Offline invoice/payment_events consistency fixtures (also part of `check:invoice-security`)
- `npm run reconcile:invoices` - Local empty-ledger smoke; owner remote: `RECONCILE_CONFIRM=YES npm run reconcile:invoices -- --remote` (SELECT-only; see `docs/engineering/PAYMENT-RECONCILIATION.md`)
- `npm run backup:d1-invoice` - Dry-run prints wrangler export command; owner remote: `D1_BACKUP_CONFIRM=YES npm run backup:d1-invoice -- --remote` (see `docs/engineering/D1-BACKUP-RESTORE.md`)
- `npm run check:rum` - First-party RUM payload validation (`docs/engineering/RUM.md`)

## Build
- `npm run build` - Runs `node scripts/build.mjs` (custom build script). Check script if build behavior differs from default Next build.
- `npm run preview` - `opennextjs-cloudflare build && opennextjs-cloudflare preview` (Workers runtime locally)
- `npm run build:worker` - Asset preflight plus the full OpenNext Worker build
- `npm run build:worker:production` - Strict `.env.production` analytics preflight, then the full Worker build; used by the production deploy sequence. CI may continue using `build:worker`.
- `npm run upload` - Build and upload version without deploying
- `npm run deploy` - `node scripts/deploy-production.mjs`; requires a clean tree, `APPROVED_SHA` matching `HEAD`, and `DEPLOY_CONFIRM="DEPLOY_PRODUCTION <full SHA>"`. It runs the production gates, deploys to Workers, notifies search, and verifies production.

## Utilities
- `npm run images:optimize` - `node scripts/optimize-content-images.mjs`
- `npm run images:heroes` - rebuild page hero WebP/AVIF derivatives (run after replacing masters); industry pages use trade-specific desktop/mobile assets
- `node scripts/minify-boot.mjs` - regenerate `public/assets/js/boot.min.js` from `boot.js` (also runs at the start of `npm run build`)
- `npm run check:contact` - `node scripts/check-contact-delivery.mjs` (mock transport, no email sent)
- `npm run search:notify` - Run live check + IndexNow without deploying
- `npm run cf-typegen` - `wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts`

## Deployment notes (from README)
- Worker name: `kinexis-digital` (see `wrangler.jsonc`)
- Custom domains: `kinexisdigital.com` and `www.kinexisdigital.com` are configured in `wrangler.jsonc`; keep the zone attached to the deploying account
- **Merging to `main` does not deploy.** Workers Builds is not connected for this Worker. Production deploys are explicit/manual through either the protected `Deploy production` GitHub Actions workflow or `npm run deploy` from a Wrangler-authenticated local session. Preview: `npm run deploy:preview`.
- **Production deploy gates** (`scripts/deploy-production.mjs`): strict analytics preflight (loads `.env.production`) → `check` → `test:e2e` (full Playwright projects) → `build:worker:production` → Conferbot bot-id guard on `.open-next/` → `deploy:worker` → `search:notify` → `verify:prod` (non-destructive live smoke / structured data / Lighthouse budget). Install browsers first: `npx playwright install`.
- Runtime secrets via Cloudflare Worker **Settings → Variables and Secrets → Secrets**, or owner-run `npx wrangler secret put <NAME>`; use separate production/preview secret sets. Local: ignored `.env.local` (Next) or `.dev.vars` (Wrangler). Never commit secret values, place them in tracked `.env.production`/`wrangler.jsonc`, or use plain Wrangler vars for secrets.
- `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_META_PIXEL_ID` are public build-time IDs in `.env.production` and are inlined by Next. The strict production preflight/build fails if either is missing or invalid; shell-provided values override the file. A runtime Worker secret alone leaves the tags empty.
- Conferbot widget public flags live in committed `.env.production` (`NEXT_PUBLIC_CONFERBOT_ENABLED=1`, public bot id). CI forces the flag to `0` so checks/e2e stay off-by-default. Webhook/notify runtime flags stay off until Starter.
- **Deploy env isolation:** `deploy-production.mjs` sets `NEXT_PUBLIC_CONFERBOT_ENABLED=0` only on the `check` and `test:e2e` child envs. `build:worker` runs with that var **removed** so `.env.production` wins. Do not set the flag on the parent `process.env` for the whole script — a leftover `0` overrides `.env.production` and ships chat off. After build, deploy fails closed if `.open-next/` lacks bot id `6afa0edabbad567d637ee189`.
- GitHub Actions runs checks, invoice-security, Worker build, and **Playwright e2e (chromium project only)** for pull requests and `main`; it never deploys. Full desktop+mobile e2e runs on the owner PC via `deploy-production.mjs`.
- `.github/workflows/deploy-production.yml` is `workflow_dispatch` only and invokes the same full production gate script. It accepts the selected tip of `release/3-seo-audit-nov27` or `release/2-performance-html`, requires an exact-SHA confirmation phrase, and uses the protected GitHub `production` Environment. Before first use, configure that Environment to require owner/reviewer approval, add `CLOUDFLARE_API_TOKEN` as an Environment secret and `CLOUDFLARE_ACCOUNT_ID` as an Environment variable, and merge the workflow onto the repository default branch so GitHub exposes it for dispatch. Scope the token narrowly to required Worker deploy operations; never store it in Git or project config. See `docs/release/KX-AUD-01-RELEASE-READINESS.md`.
- Preview Worker name: `kinexis-digital-preview` (`wrangler.jsonc` `env.preview`). Restore with `npm run deploy:preview` when the Worker is missing; keep ops-staging Workers off this path. Until hosted preview is healthy, use `npm run preview` locally.
- Local explicit deploy (PowerShell): set `$env:APPROVED_SHA` to the full reviewed commit SHA, set `$env:DEPLOY_CONFIRM` to `DEPLOY_PRODUCTION <that same SHA>`, then run `npm run deploy` from a clean checkout with Wrangler authenticated to the intended Cloudflare account. Remove both environment variables afterward. The script refuses a dirty tree, missing/mismatched SHA, or missing/mismatched confirmation.

## Verification advice
- Run targeted checks first (`npm run lint`, `npm run typecheck`) for changes.
- Run `npm run test:e2e` (or `npx playwright test --project=chromium`) when changing routes, checkout, consent, or deploy gates.
- Run full build only if changes justify it (deps/config/build scripts/routes affecting build).
- Fix errors caused by your changes.
- Report checks not run.
- `npm run verify:prod` hits live www — use after a real deploy only (already wired into `deploy-production.mjs`). Includes **mobile + desktop** Lighthouse budgets (`scripts/lighthouse-budget.mjs --form-factor=both`).
- GitHub Actions workflow `lighthouse-prod.yml` re-runs those budgets against www on `main` pushes and `workflow_dispatch` (read-only; not on pull requests).

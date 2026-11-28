# KX-AUD-01 — Release readiness (2026-11-27)

## Candidate

| Field | Value |
|-------|-------|
| Branch | `release/3-seo-audit-nov27` |
| Baseline SHA (live match) | `315e362b188a115faee816bf474c5a683d320235` |
| Production Worker | `kinexis-digital` |
| Preview Worker | `kinexis-digital-preview` (absent from account inventory at readiness check; restore with `npm run deploy:preview` only) |
| Ops staging | Keep `kinexis-ops-api-staging` / `kinexis-ops-queue` out of this marketing release path |

## Live production versions (refreshed 2026-11-28)

| Role | Worker version ID | Annotation |
|------|-------------------|------------|
| Active (100%) | `c41f308e-5890-469f-b11a-29e19f25d6ed` | `release-1@315e362b188a115faee816bf474c5a683d320235` |
| Prior known-good | `e7e2f8c7-df53-4c29-ac42-537fdff6e0f1` | `release-1@234d07591bb6c23c91490af8df4f0444fc97c01e` |

Refresh these IDs in Cloudflare immediately before any production deploy or rollback.

## Deploy routes

1. **Local exact-SHA (primary):** clean tree, `APPROVED_SHA=<full SHA>`, `DEPLOY_CONFIRM="DEPLOY_PRODUCTION <full SHA>"`, then `npm run deploy` (`scripts/deploy-production.mjs`).
2. **GitHub Actions:** `workflow_dispatch` on `.github/workflows/deploy-production.yml`, admitted branches:
   - `release/3-seo-audit-nov27`
   - `release/2-performance-html`
   Exact-SHA inputs, `production` environment, and concurrency group `production-deploy` remain required.

## Preview isolation

Until `kinexis-digital-preview` is restored and `preview.kinexisdigital.com` returns a healthy response:

- Use local OpenNext preview (`npm run preview`) and mocked fixtures.
- Hosted preview must keep `NEXT_PUBLIC_IS_PREVIEW=1`, empty production GA/Meta bake-in, empty sitemap / noindex, empty `CONTACT_TO`, and a dedicated `CONTACT_PREVIEW_TO` sink listed in `send_email` allowlist.
- Do not point apex/www at the preview Worker.

## Rollback

- Preview rehearsal: deploy to `--env preview`, then `npx wrangler rollback --env preview` only after naming the preview version.
- Production rollback: separate authorization naming exact version ID; command `npx wrangler rollback` (see `ROLLBACK-PLAN.md`). Worker rollback does not reverse D1.
- Invoice DB: these audit tickets require no invoice migration.

## Approver / reversible settings

- Reversible: release-branch workflow `if`, preview Worker presence, analytics event definitions (KX-AUD-02), redirects/lastmod (KX-AUD-03), copy on existing URLs.
- Irreversible without restore: production Worker version traffic split; treat as authorized-only.
- Approver for production deploy: owner (explicit SHA + `DEPLOY_CONFIRM`).

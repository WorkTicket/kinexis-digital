# Rollback plan

**Status: PARTIAL — versions recorded; production rollback still requires separate authorization and has not been rehearsed on production. Preview rollback may be rehearsed on `kinexis-digital-preview` only.**

## Current production snapshot (KX-AUD-01, refreshed 2026-11-28)

| Role | Worker version ID | Message / tag |
|------|-------------------|---------------|
| Active (100%) | `c41f308e-5890-469f-b11a-29e19f25d6ed` | `release-1@315e362b188a115faee816bf474c5a683d320235` |
| Immediate prior | `e7e2f8c7-df53-4c29-ac42-537fdff6e0f1` | `release-1@234d07591bb6c23c91490af8df4f0444fc97c01e` |

Refresh active and prior IDs in Cloudflare before every deploy or rollback decision. Apex and www both map to Worker `kinexis-digital`.

## Commands

- Documented Worker rollback: `npx wrangler rollback` (see `docs/engineering/production-hardening/PHASE1-PRODUCTION-SETUP.md`).
- Preview only: `npx wrangler rollback --env preview` after naming the preview version under test.
- Do not execute production rollback without separate authorization naming the exact target version.
- Worker rollback does not reverse D1. Invoice export/restore remains a separate owner path (`docs/engineering/D1-BACKUP-RESTORE.md`).

## Historical note (2026-11-17)

An earlier readiness pass recorded versions `40abc15c-3663-4656-b2e0-52cb15613de3` / `7dc65298-4bda-4ebf-9c66-0690b0f2d687` and a structural D1 export under `artifacts/d1-backups/` (gitignored). Those IDs are superseded by the snapshot above for current www traffic.

## Stop / rollback triggers (KX-AUD)

Unintended production noindex/robots/sitemap changes, broken forms, duplicate production conversions, unexpected host redirects, or a reproducible material performance regression: stop promotion, diagnose in preview, obtain authorization for exact rollback scope, then re-run live checks after restoration.

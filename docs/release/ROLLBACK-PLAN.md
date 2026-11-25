# Rollback plan

**Status: PARTIAL — active/prior Worker versions identified and invoice DB export created; rollback and restore remain untested.**

On 2026-11-17, read-only Wrangler deployment history identified active Worker version `40abc15c-3663-4656-b2e0-52cb15613de3` and the immediately preceding version `7dc65298-4bda-4ebf-9c66-0690b0f2d687`. The owner-authorized remote D1 invoice export completed and passed structural verification (1,730 bytes): `artifacts/d1-backups/kinexis-invoice-ledger-2026-11-17T20-44-36-145Z.sql` (gitignored). It contains schema and migration metadata, but no invoice or payment-event INSERT statements; confirm live row counts separately before treating this as a data-bearing backup. Wrangler warned that the database could be unavailable to serve queries during export. The dump has not yet been moved to encrypted off-repo storage; no restore or rollback was run. No deployment occurred during this follow-up.

The established Worker rollback command documented by this repo is `npx wrangler rollback` (see `docs/engineering/production-hardening/PHASE1-PRODUCTION-SETUP.md`). Do not execute it without separate authorization. The current and immediately preceding versions are recorded above; verify the intended rollback target in Cloudflare immediately before any rollback.

Before release, retain the dump off-repo in encrypted storage, document configuration recovery, D1 restore availability, monitoring thresholds, decision owner and exact command. Worker rollback does not reverse D1 changes. Rehearse only in an isolated environment. No production rollback or migration was performed.

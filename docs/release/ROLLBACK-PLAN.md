# Rollback plan

**Status: BLOCKED — operational rollback readiness has not been verified.**

The established Worker rollback command documented by this repo is `npx wrangler rollback` (see `docs/engineering/production-hardening/PHASE1-PRODUCTION-SETUP.md`). Do not execute it from this preparation session. Cloudflare Operations must first identify the currently deployed Worker and confirm the desired previous version in the account; historical version IDs in older reports may be stale.

Before release, record the prior Worker version, approved candidate, migration compatibility/recovery procedure, configuration recovery, D1 backup/restore availability, monitoring thresholds, decision owner and exact command. `npm run backup:d1-invoice` was run only in dry-run mode; it performed no network operation. Owner-run remote backup requires `D1_BACKUP_CONFIRM=YES` and `--remote`; do not execute without separate approval. Worker rollback does not reverse D1 changes. Rehearse only in an isolated environment. No production rollback or migration was performed.

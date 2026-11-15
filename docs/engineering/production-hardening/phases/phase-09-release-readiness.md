# Phase 9 — Release readiness (STOP for approval)

**Date:** 2026-11-15  
**Branch:** `cursor/phase9-release-readiness-67c1`  
**Verdict:** Documentation complete. **Not authorized to merge to `main` or deploy production.** Waiting for explicit owner release approval.

## What is ready in code (on the stacked PR tip)

- Phase 1 payment/invoice integrity (already live from PR #6).
- Phase 2–7 engineering on stacked PRs #8–#14 (+ this branch).
- Conferbot: CSP, consent-gated lazy widget (flag off), HMAC webhook, redaction, LEAD_DB migration file, lead score + notify outbox MVPs (flags off).

## Explicit stop

Do **not**:

- Merge this stack to `main` (Workers Builds deploys production).
- Flip `NEXT_PUBLIC_CONFERBOT_ENABLED`, `CONFERBOT_INTEGRATION_ENABLED`, or `CONFERBOT_NOTIFY_ENABLED` in production.
- Apply production D1 migration `0002`, create production LEAD_DB, or register production Conferbot webhooks.
- Charge live PayPal, send real lead alerts, or upgrade Conferbot without owner action.

## Release approval checklist (owner)

When approving a release, tick in writing:

1. [ ] Review and merge stacked PRs in order (or squash strategy agreed) knowing `main` deploys.
2. [ ] Production LEAD_DB created; placeholders replaced; migration `0002` applied.
3. [ ] Conferbot Starter upgraded; production webhook registered to `https://www.kinexisdigital.com/api/integrations/conferbot/webhook` (or apex→www equivalent).
4. [ ] Secrets set on production Worker (never committed): `CONFERBOT_WEBHOOK_SECRET`, optional expected bot id.
5. [ ] Build vars: `NEXT_PUBLIC_CONFERBOT_ENABLED` only when widget should go live; bot id public.
6. [ ] Runtime vars: `CONFERBOT_INTEGRATION_ENABLED=1` only after webhook secret + DB ready; `CONFERBOT_NOTIFY_ENABLED=1` only when lead email is wanted.
7. [ ] Scoring weights marked OWNER_DECISION_REQUIRED reviewed.
8. [ ] Rollback Worker version noted (`5c5690e8-…` was Phase 1 rollback target; refresh after each deploy).
9. [ ] Post-deploy smoke: home 200, unsigned PayPal webhook 400, Conferbot unsigned 401/503 as configured, no unexpected customer email.

## Verification this phase

| Command | Result |
|---|---|
| `npm run check` | PASS |
| Production deploy | NOT RUN |
| Flag flip | NOT RUN |

## Related

- `FINAL-REPORT.md` — programme summary for owner.
- `PHASE8-PREVIEW-QA.md` — preview-first path.

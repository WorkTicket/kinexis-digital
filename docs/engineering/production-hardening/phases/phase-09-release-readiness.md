# Phase 9 — Release readiness (STOP for approval)

**Date:** 2026-11-15  
**Branch:** `cursor/phase9-release-readiness-67c1`  
**Verdict:** Stack #7–#16 merged to `main`. Flags stay **OFF**. Production publish is a **manual** owner step (`npm run deploy`), not an automatic merge side-effect.

## What is ready in code (on `main`)

- Phase 1 payment/invoice integrity (already live from PR #6).
- Phase 2–9 engineering from stacked PRs #7–#16.
- Conferbot: CSP, consent-gated lazy widget (flag off), HMAC webhook, redaction, LEAD_DB migration file, lead score + notify outbox MVPs (flags off). `LEAD_DB` bindings omitted until real D1 ids exist.

## Explicit stop (still)

Do **not**:

- Flip `NEXT_PUBLIC_CONFERBOT_ENABLED`, `CONFERBOT_INTEGRATION_ENABLED`, or `CONFERBOT_NOTIFY_ENABLED` in production.
- Apply production lead migrations, create production LEAD_DB, or register production Conferbot webhooks.
- Charge live PayPal, send real lead alerts, or upgrade Conferbot without owner action.

## Deploy model

Merging to `main` does **not** deploy. Workers Builds is not connected for Worker `kinexis-digital`. Ship with `npm run deploy` (`scripts/deploy-production.mjs`) from a wrangler-authenticated owner machine.

## Release checklist (owner)

1. [x] Stack #7–#16 merged to `main` (flags off; LEAD_DB placeholders removed).
2. [ ] Owner PC: `git pull` on `main`, then `npm run deploy`. Note new Worker version; keep prior (`87e26f40-…` / `a610e135-…`) for rollback.
3. [ ] Post-deploy smoke: home 200, unsigned PayPal webhook 400, Conferbot unsigned **503** while integration flag/secret off, no `conferbot-js` on the homepage, no unexpected customer email.
4. [ ] Later (not this ship): create LEAD_DB with real ids, bind, apply `migrations-lead`.
5. [ ] Later: Conferbot Starter + webhook secret + register URL (preview first).
6. [ ] Separate written approval before any Conferbot/lead flag flip.
7. [ ] Scoring weights marked OWNER_DECISION_REQUIRED reviewed.

## Verification this phase

| Command | Result |
|---|---|
| `npm run check` | PASS |
| Production deploy | NOT RUN |
| Flag flip | NOT RUN |

## Related

- `FINAL-REPORT.md` — programme summary for owner.
- `PHASE8-PREVIEW-QA.md` — preview-first path.

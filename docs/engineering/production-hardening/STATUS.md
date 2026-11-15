# Programme status

**Current phase:** Phase 3 — CI enforcement and preview-email isolation  
**Status:** Phase 2 PR #8 open. Phase 3 complete on `cursor/phase3-ci-preview-email-67c1`. Continue Phases 4–9 including chatbot without waiting. **Do not merge to `main` without owner approval** (Workers Builds deploys production).  
**Production commit:** `a32c39b` (merge of PR #6)  
**Worker:** `kinexis-digital` version `87e26f40-6f60-4c83-95c9-33d56e483705`. Rollback `5c5690e8-216f-4441-ab32-fb056b401dd2`.

## Completed

| Phase | State |
|---|---|
| 0 Baseline | Complete |
| 1 Payment/invoice | Live; open: signed live webhook SUCCESS |
| 2 Route integration tests | PR #8 — reviews handlers + harness |
| 3 CI + preview email | This branch — invoice-security in CI; preview mail isolated |

## In flight / next

- Phase 4 Spanish/commercial consistency
- Phase 5 Security + Conferbot widget/CSP/webhook (flags off)
- Phases 6–9 per PROGRAM + `phases/phase-chatbot-fold-in.md`

## Owner blockers (accumulating)

1. Merge PRs to `main` only when ready to accept a Workers Builds production deploy.
2. Phase 1 docs PR #7 (CI green) — docs-only evidence.
3. Set `CONTACT_PREVIEW_TO` (+ allowlist) before relying on preview form mail.
4. Conferbot Starter upgrade before webhooks; Pro only if API needed; secrets; LEAD_DB — later phases.
5. Live PayPal-signed webhook observation (wait for real payment).

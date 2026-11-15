# Programme status

**Current phase:** Phase 2 — real route integration tests (complete on branch; PR open)  
**Status:** Phase 0 and Phase 1 live. Phase 2 engineering complete on `cursor/phase2-route-integration-tests-67c1`. Owner supersession: finish all phases including chatbot; do not wait for approval between phases. **Do not merge to `main` without owner approval** (Workers Builds deploys production).  
**Production commit:** `a32c39b` (merge of PR #6)  
**Worker:** `kinexis-digital` version `87e26f40-6f60-4c83-95c9-33d56e483705`. Rollback target `5c5690e8-216f-4441-ab32-fb056b401dd2`.

## Phase 0

Complete. See `phases/phase-00-baseline.md`.

## Phase 1

Live in production. Open check: PayPal-signed live webhook `SUCCESS` not yet observed (wait for first real payment event). Docs evidence PR: https://github.com/WorkTicket/kinexis-digital/pull/7 (CI green; left unmerged by agent to avoid production deploy). See `STATUS` history in that PR and `phases/phase-01-closure.md`.

## Phase 2

Route integration coverage for `/api/reviews` and `/api/reviews/moderate` via the same esbuild harness pattern as invoices/contact. `npm run check` now includes `check:reviews`. Chatbot fold-in map: `phases/phase-chatbot-fold-in.md` (plan only; no Conferbot runtime in this phase).

| Criterion | State |
|---|---|
| Reviews POST validation, honeypot, cross-site, rate limit | Met (local KV double) |
| Moderate GET confirm-only; POST approve/reject/bad-key/replay | Met |
| Shared harness stubs `next/cache` | Met |
| `check:route-integration` script | Met |
| Conferbot implementation | Not this phase — see fold-in map |

## Still open (programme)

1. Phase 1 live signed PayPal webhook observation.
2. Phases 3–9 + Conferbot implementation per fold-in map.
3. Owner: Conferbot Starter upgrade before webhooks; secrets; LEAD_DB; production merges/deploys.

**Completed phases:** Phase 0, Phase 1 (except live signed-webhook observation), Phase 2 (this branch).  
**Next:** Phase 3 — CI enforcement, deploy gates, preview-email isolation.

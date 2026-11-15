# Programme handoff

## Current

- **Phase:** 2 — Real route integration tests
- **Date:** 2026-11-15
- **Status:** Complete on `cursor/phase2-route-integration-tests-67c1`. Owner asked to continue through Phases 2–9 including chatbot without waiting. Agent does not merge to `main` (production deploy).

## Git and scope

- **Branch:** `cursor/phase2-route-integration-tests-67c1` from `origin/main` (`a32c39b`).
- Phase 1 live-evidence docs remain on PR #7 (`cursor/phase1-live-evidence-67c1`), CI green, unmerged.
- No chatbot runtime, pricing, package, terms, or guarantee copy changes in Phase 2.
- No deploy and no secret write.

## What Phase 2 does

- Injectable Map KV (`REVIEWS_TEST_MEMORY=1`) for reviews + rate-limit route tests.
- Handler tests for review queue and moderation (confirm-only GET, approve, reject, bad key, replay).
- `check:reviews` / `check:route-integration`; reviews included in `npm run check`.
- Documented chatbot fold-in: `phases/phase-chatbot-fold-in.md`.

## Exact commands and results (this session)

Runtime: Node v22.23.4, npm 10.9.9 (engine warning: repo asks npm >= 11).

| Command | Result |
|---|---|
| `node scripts/check-reviews-routes.mjs` | PASS |
| `npm run check` | PASS (3 pre-existing ESLint warnings, 0 errors) |
| `node scripts/check-invoice-routes.mjs` | PASS (PayPal HTTP mocked; sandbox NOT RUN) |
| `npm run test:e2e` | NOT RUN this phase (no UI change) |
| `npm run build:worker` | NOT RUN this phase (no Worker/runtime feature change beyond test hooks) |

## Exact owner actions

1. Review/merge Phase 1 docs PR #7 when ready (merge to `main` deploys Worker from that tip — docs-only diff on top of live Phase 1).
2. Review Phase 2 PR; do not treat merge as chatbot go-live.
3. Continue programme: Phase 3 next. Conferbot Starter upgrade remains blocked until Phase 8 readiness; flags stay off.
4. Still waiting on first real PayPal payment for signed live webhook SUCCESS (Phase 1 open check).

Phase report: `phases/phase-02-route-integration-tests.md`.

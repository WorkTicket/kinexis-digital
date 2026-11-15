# Phase 2 — Real route integration tests

**Date:** 2026-11-15  
**Branch:** `cursor/phase2-route-integration-tests-67c1`  
**Base:** `origin/main` at `a32c39b`  
**Owner supersession:** Proceed despite earlier “Do not start Phase 2” — owner instructed finishing all phases including chatbot.

## Scope

Close the handler-level gap for `/api/reviews` and `/api/reviews/moderate`, and record the shared route-test architecture used by invoice and contact checks. No production deploy, secrets, or chatbot runtime feature in this PR (chatbot fold-in plan only).

## What changed

- `src/lib/reviews-test-kv.ts` — Map-backed KV injectable only when `REVIEWS_TEST_MEMORY=1`.
- `site-reviews.ts` / `rate-limit.ts` — prefer the test KV when the flag is set.
- `scripts/bundle-server.mjs` — stub `next/cache` (`revalidatePath` / `revalidateTag`) for Node harnesses.
- `scripts/reviews-route-harness.ts` + `scripts/check-reviews-routes.mjs` — real handlers, local KV, no SMTP/Cloudflare.
- `package.json` — `check:reviews`, `check:route-integration`; `check` now includes reviews.

## Cases covered

Queue success; name/email/quote/stars validation; cross-site 403; wrong content-type 415; honeypot (no pending growth); per-IP rate limit 429; GET confirm-only (no mutation); POST approve publishes once; replay 404; bad reject key 403; reject removes pending without publishing; incomplete moderation link 400.

## Chatbot fold-in (plan only this phase)

See `phases/phase-chatbot-fold-in.md`. Phase 2 lands the harness pattern Conferbot webhook tests will mirror in Phase 5. No Conferbot code in this PR.

## Verification (ran this session)

| Command | Result |
|---|---|
| `node scripts/check-reviews-routes.mjs` | PASS |
| `npm run check` | PASS (3 pre-existing ESLint warnings, 0 errors) |
| `node scripts/check-invoice-routes.mjs` | PASS (mocked PayPal; sandbox NOT RUN) |
| `npm run test:e2e` | NOT RUN |
| `npm run build:worker` | NOT RUN |

## Not done / blockers

- Live PayPal-signed webhook SUCCESS remains open from Phase 1 (wait for real payment event).
- Conferbot implementation deferred to Phases 3–9 per fold-in map.
- No merge to `main` from the agent (Workers Builds deploys production).

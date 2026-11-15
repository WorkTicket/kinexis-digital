# Phase 1 closure

**Date:** 2026-11-15
**Branch:** `codex/production-hardening-v1`
**Base:** `c43041d` (`Fix half-empty portfolio previews and polish home CTAs.`)
**Verdict:** Engineering scope is closed. Do not merge, deploy, or start Phase 2 until the owner reviews this PR and supplies the items in `HANDOFF.md`.

## What closed

The payment path now treats PayPal responses and invoice links as untrusted until they match a server-side invoice, and it records the result in one conditional database transaction.

- Signing. New links are `v2.` plus an HMAC from `INVOICE_LINK_SECRET` (32 UTF-8 bytes minimum). The previous key verifies v2 and legacy links only while it is configured and, if `INVOICE_LINK_SECRET_PREVIOUS_UNTIL` is set, only before that time. There is no PayPal-secret fallback.
- Ledger. `migrations/0001_invoice_payment_ledger.sql` creates `invoices` and `payment_events`. Order association updates a row only when it is unpaid and the order id is empty or already that id. Mark-paid updates only when the order, USD amount, and capture id match, then inserts one event. The primary key is `(provider, event_id)`.
- Why D1, not a Durable Object. KV has no multi-key transaction. One global Durable Object would funnel every payment through a single object. One object per invoice cannot enforce a unique PayPal order id or webhook event id across invoices. D1's batch is one SQLite transaction and matches the migration the programme already described. The binding ids in `wrangler.jsonc` are placeholders so a deploy cannot attach a real database by accident.
- Webhooks. `POST /api/paypal/webhook` verifies with PayPal's `verify-webhook-signature` API. `SUCCESS` is the only accept. The handler then re-fetches the order and runs the same capture checks used by the return URL. The event id is stored once.
- Tests. Route handlers are called directly with PayPal HTTP replaced. Cases include double capture, amount tampering, currency tampering, replay, expired links, forged links, a rejected webhook signature, and a webhook amount mismatch. The full browser suite finished 33 passed / 3 skipped / 0 failed. No worker process exited early.

## What was deliberately not done

- No `wrangler deploy`, no `npm run deploy`, no preview publish, no production D1 migration, no `wrangler secret put`, no live PayPal call.
- Sandbox script result: mocked contract passed, then `SANDBOX EVIDENCE: NOT RUN`.
- Subscription SDK ready/loading: NOT RUN. The browser test observed the fail-closed alert because `NEXT_PUBLIC_PAYPAL_CLIENT_ID` is empty.
- `npm run check:structured-data` and `npm run verify:prod`: NOT RUN.
- Phase 2 was not started. Conferbot and chatbot files were not edited. Prices, packages, terms, and guarantees were not edited.

## Checks actually run

| Command | Result |
|---|---|
| `npm run check` | PASS, with the same 3 pre-existing lint warnings |
| `npm run check:invoice-security` | PASS |
| `npm run check:paypal-sandbox` | MOCKED PASS; sandbox NOT RUN |
| `npx playwright test --workers=1` | 33 passed, 3 skipped, 0 failed |
| `npm run build:worker` | PASS, exit 0. Preflight warned that GA and Meta build variables are missing. Those warnings are pre-existing and did not fail the build. |
| `git diff --check` | PASS |

Node v22.23.4 and npm 10.9.9 were used. The package asks for npm >= 11, so npm printed an engine warning. `node:sqlite` printed an experimental warning inside the ledger and route scripts.

## Self-review

Reviewed as a separate pass over the diff, not as a second author:

- Invoice writes cannot fall back to KV. A missing `INVOICE_DB` fails closed, including checkout after a storage exception (503).
- Mark-paid and order association are single batches. The route tests and the in-memory SQLite rehearsal both saw a second capture and a replayed event id leave one applied row.
- Webhook signature failure returns 400 and does not write. The route test covers that.
- The placeholder database ids are the nil-style values `…0001` and `…0002`, not account ids taken from the KV bindings.
- Playwright's first full run failed two mobile checkout guards with 429 because both projects shared a forwarded IP inside the checkout rate-limit window. The fix gives each project its own test address and still expects HTTP 400. The rerun passed. That is the invoice-admin "worker exit" investigation: the admin route itself returns 503 when unconfigured, and the suite no longer dies mid-run.
- One older smoke test still treats 429 as success for a client amount post. It was already in the tree. It was not widened.
- Customer-facing marketing copy was not changed. The staff-only invoice create error no longer says "KV".

Residual risk to accept before release: a capture webhook without `custom_id` is rejected even if `invoice_id` is present. Orders created by this app set both. Confirm a sandbox webhook payload includes both before relying on the webhook in production.

## Deploy safety

GitHub Actions (`.github/workflows/ci.yml`) runs `npm run check` and `npm run build:worker` on pull requests and on pushes to `main`. It does not deploy. This branch is not `main`. Workers Builds, as documented in `README.md`, deploys the repository's protected production branch. Pushing `codex/production-hardening-v1` does not match that branch. Preview builds for other branches are a dashboard setting this repo cannot prove are off. No deploy command was run.

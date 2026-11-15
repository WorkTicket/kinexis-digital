# Current handoff

## Phase identity

- **Phase:** 1 — Payment and Invoice Integrity
- **Date:** 2026-11-15
- **Status:** Live in production from `a32c39b` (PR #6). Do not start Phase 2. A real PayPal-signed webhook delivery is still unseen.

## Git and scope

- **Branch:** `codex/production-hardening-v1`, based on `c43041d`.
- First commit restores the owner's uncommitted Phase 0/1 work unchanged.
- Later commits add the ledger, webhook verification, route tests, and this record.
- No chatbot, Conferbot, pricing, package, terms, or guarantee copy changes.
- Production Worker `kinexis-digital` version `87e26f40-6f60-4c83-95c9-33d56e483705`, deployed 2026-11-15 from `a32c39b`. Rollback version `5c5690e8-216f-4441-ab32-fb056b401dd2`.
- D1 migration 0001 is applied. Production `kinexis-invoice-ledger` (`077c8e46-2ea8-4997-8b6a-c06902194575`) and preview `kinexis-invoice-ledger-preview` (`5a474f5a-4ac9-4d4c-8309-943c3d52981b`) each had 0 invoice rows. KV `invoice:v1:*` count was 0. The unrelated database named `kinexis` was left alone.
- Production secrets set, values not copied here: live `PAYPAL_MERCHANT_ID`, live `PAYPAL_WEBHOOK_ID` (`24N19060893354101`) for `https://kinexisdigital.com/api/paypal/webhook`, `PAYPAL_API_BASE` = `https://api-m.paypal.com`, and `INVOICE_LINK_SECRET` (32 random bytes, never printed). `INVOICE_LINK_SECRET_PREVIOUS` was not set.

## What this phase now does

- New invoice links are `v2.` HMAC signatures from `INVOICE_LINK_SECRET` (minimum 32 UTF-8 bytes). `INVOICE_LINK_SECRET_PREVIOUS` verifies older links only until `INVOICE_LINK_SECRET_PREVIOUS_UNTIL`, when that timestamp is set. Removing the previous secret closes the window immediately. The PayPal client secret is not a signing fallback.
- Invoice creates, PayPal order association, and paid transitions go through D1 (`INVOICE_DB`) in one batch. The paid transition is a conditional update plus a unique `(provider, event_id)` row. A second capture id, a mismatched amount, or a replayed event does not change the paid invoice.
- `POST /api/paypal/webhook` calls PayPal `verify-webhook-signature` and accepts only `verification_status: SUCCESS`. Signature failure stores nothing. Provider or storage failure returns 503 so PayPal retries.
- `npm run check:paypal-sandbox` runs a local mock first, then the sandbox provider when `PAYPAL_SANDBOX_CONFIRM=1` and the API base is sandbox. Mocked lines are not sandbox evidence.

## Verification on this machine

Runtime: Node v22.23.4, npm 10.9.9. The repo asks for npm >= 11. `node:sqlite` printed an experimental warning during ledger and route tests. See `TEST-MATRIX.md`. Sandbox evidence is in its own section there. Mocked lines are not that evidence.

## What remains

1. Watch the first real PayPal payment event. A signed live webhook `SUCCESS` has not been seen. Smoke only: unsigned `POST /api/paypal/webhook` returned 400 `{"error":"invalid signature headers"}`, and `GET` returned 405. No real payment test was run.
2. Optional: set `NEXT_PUBLIC_PAYPAL_CLIENT_ID` and re-run `npx playwright test e2e/production-audit.spec.ts` if the subscription SDK ready state must be proven. That is not a Phase 2 task.
3. Do not start Phase 2.

Closure write-up: `phases/phase-01-closure.md`. Setup runbook: `PHASE1-PRODUCTION-SETUP.md`.

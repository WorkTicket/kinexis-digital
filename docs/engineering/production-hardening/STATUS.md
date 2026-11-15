# Programme status

**Current phase:** Phase 1 — payment and invoice integrity
**Status:** Engineering scope closed. Release acceptance is BLOCKED. Do not merge, deploy, or start Phase 2.
**Branch:** `codex/production-hardening-v1`
**Production:** untouched. No deployment, production migration, secret write, or real payment.

## Phase 0

Complete, as recorded at the start of this branch. Baseline E2E failures were environmental or unrelated to invoice capture. See `phases/phase-00-baseline.md`.

## Phase 1

Code and local evidence are in place for the payment and invoice integrity scope:

- Dedicated invoice signing key, versioned `v2.` links, and a previous-key rotation window.
- D1 ledger for conditional, idempotent invoice and payment transitions, with `migrations/0001_invoice_payment_ledger.sql`. KV is no longer the invoice store.
- PayPal webhook signature verification and durable event deduplication on that ledger.
- Route-handler tests for checkout, capture, and webhooks, including double capture, amount and currency tampering, replay, and expired or forged links. PayPal HTTP is mocked.
- Full Playwright suite: 33 passed, 3 skipped, 0 failed. The invoice-admin worker exit was not reproduced.

Sandbox order, capture, mismatch, and forged-signature checks passed against `api-m.sandbox.paypal.com`. A PayPal-signed webhook `SUCCESS` was not observed, because that needs a delivery to the production URL and this route is not deployed. The D1 binding ids in `wrangler.jsonc` are still placeholders. No signing secret was created.

## Owner blockers before any release

1. Sandbox API checks are recorded in `TEST-MATRIX.md`. Still open: a real PayPal-signed webhook delivery (`verification_status: SUCCESS`). That was skipped so nothing was posted to `kinexisdigital.com`.
2. Production `INVOICE_LINK_SECRET` (at least 32 UTF-8 bytes). During rotation, put the real previous signing material in `INVOICE_LINK_SECRET_PREVIOUS`. Optional `INVOICE_LINK_SECRET_PREVIOUS_UNTIL` closes that window. Never commit the values.
3. Create the production and preview D1 databases, replace both placeholder `database_id` values, approve applying `migrations/0001_invoice_payment_ledger.sql`, and backfill existing `invoice:v1:*` KV rows before the worker that contains this code is deployed. Until then invoice checkout fails closed.
4. The sandbox webhook is already registered for `https://kinexisdigital.com/api/paypal/webhook`. Production still needs its own webhook id when that app is configured. Do not point sandbox events at production until this route is deployed on purpose.
5. `NEXT_PUBLIC_PAYPAL_CLIENT_ID` if the subscription SDK ready state must be exercised. The sandbox run did not start the browser suite, so that check is still the fail-closed alert only.

**Completed phases:** Phase 0, and the Phase 1 engineering scope.
**Do not start Phase 2.**
**Recommendation:** draft PR for owner review only. Not ready to merge or deploy.

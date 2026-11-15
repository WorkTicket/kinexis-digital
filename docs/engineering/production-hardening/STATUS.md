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

Release is still blocked. Live PayPal sandbox was not run. The D1 binding ids in `wrangler.jsonc` are placeholders. No signing secret or webhook id was created.

## Owner blockers before any release

1. Sandbox `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_MERCHANT_ID`, `PAYPAL_WEBHOOK_ID`, `PAYPAL_API_BASE=https://api-m.sandbox.paypal.com`, and `PAYPAL_SANDBOX_CONFIRM=1`. Re-run `npm run check:paypal-sandbox`. Mocked output is not sandbox evidence.
2. Production `INVOICE_LINK_SECRET` (at least 32 UTF-8 bytes). During rotation, put the real previous signing material in `INVOICE_LINK_SECRET_PREVIOUS`. Optional `INVOICE_LINK_SECRET_PREVIOUS_UNTIL` closes that window. Never commit the values.
3. Create the production and preview D1 databases, replace both placeholder `database_id` values, approve applying `migrations/0001_invoice_payment_ledger.sql`, and backfill existing `invoice:v1:*` KV rows before the worker that contains this code is deployed. Until then invoice checkout fails closed.
4. Register PayPal webhook URL `/api/paypal/webhook` for the sandbox app first, then production only after sandbox evidence.
5. `NEXT_PUBLIC_PAYPAL_CLIENT_ID` if the subscription SDK ready state must be exercised. This run only proved the fail-closed alert.

**Completed phases:** Phase 0, and the Phase 1 engineering scope.
**Do not start Phase 2.**
**Recommendation:** draft PR for owner review only. Not ready to merge or deploy.

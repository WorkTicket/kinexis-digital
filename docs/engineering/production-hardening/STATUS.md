# Programme status

**Current phase:** Phase 1 — payment and invoice integrity
**Status:** Code and local checks are complete. Production setup is a separate owner step in `PHASE1-PRODUCTION-SETUP.md`. Do not merge or deploy until that setup is approved. Do not start Phase 2.
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

## Exit criteria

| Criterion | State |
|---|---|
| Signing rotation window in code | Met |
| Atomic idempotent invoice transitions and migration file | Met. Not applied to Cloudflare. |
| PayPal webhook verification and dedupe in code | Met |
| Route tests for tamper, replay, expiry, and forged links | Met (PayPal HTTP mocked) |
| Sandbox create, capture, mismatch, forged signature | Met. See `TEST-MATRIX.md`. |
| PayPal-signed webhook SUCCESS | Waiting. Route is not deployed. |
| KV-to-D1 import tool, dry-run, idempotent, verify, KV untouched | Met in code and in a local Miniflare plus SQLite rehearsal. Not run against production. |
| Owner runbook and Windows script, no deploy command | Met. `PHASE1-PRODUCTION-SETUP.md` and `scripts/phase1-production-setup.ps1`. |
| Production D1 databases, migration, import, and Worker secrets | Waiting on the owner. |
| `INVOICE_LINK_SECRET` generated and stored | Waiting on the owner. The setup script generates it and does not print it. |
| Deploy | Waiting. Not part of the setup script. |

## Owner blockers before any release

1. Sandbox API checks are recorded in `TEST-MATRIX.md`. Still open: a real PayPal-signed webhook delivery (`verification_status: SUCCESS`). That was skipped so nothing was posted to `kinexisdigital.com`.
2. Production `INVOICE_LINK_SECRET` (at least 32 UTF-8 bytes). During rotation, put the real previous signing material in `INVOICE_LINK_SECRET_PREVIOUS`. Optional `INVOICE_LINK_SECRET_PREVIOUS_UNTIL` closes that window. Never commit the values.
3. Create the production and preview D1 databases, replace both placeholder `database_id` values, approve applying `migrations/0001_invoice_payment_ledger.sql`, and backfill existing `invoice:v1:*` KV rows before the worker that contains this code is deployed. Until then invoice checkout fails closed.
4. The sandbox webhook is already registered for `https://kinexisdigital.com/api/paypal/webhook`. Production still needs its own webhook id when that app is configured. Do not point sandbox events at production until this route is deployed on purpose.
5. `NEXT_PUBLIC_PAYPAL_CLIENT_ID` if the subscription SDK ready state must be exercised. The sandbox run did not start the browser suite, so that check is still the fail-closed alert only.

**Completed phases:** Phase 0, and the Phase 1 engineering scope.
**Do not start Phase 2.**
**Recommendation:** draft PR for owner review only. Not ready to merge or deploy.

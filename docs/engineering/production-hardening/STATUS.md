# Programme status

**Current phase:** Phase 1 — payment and invoice integrity
**Status:** Code and local checks are complete. Production setup is a separate owner step in `PHASE1-PRODUCTION-SETUP.md`. Do not merge or deploy until that setup is approved. Do not start Phase 2.
**Branch:** `codex/production-hardening-v1`
**Production:** D1 databases created and migration 0001 applied. No invoice rows existed in KV. No secrets set. Nothing deployed.

## Phase 0

Complete, as recorded at the start of this branch. Baseline E2E failures were environmental or unrelated to invoice capture. See `phases/phase-00-baseline.md`.

## Phase 1

Code and local evidence are in place for the payment and invoice integrity scope:

- Dedicated invoice signing key, versioned `v2.` links, and a previous-key rotation window.
- D1 ledger for conditional, idempotent invoice and payment transitions, with `migrations/0001_invoice_payment_ledger.sql`. KV is no longer the invoice store.
- PayPal webhook signature verification and durable event deduplication on that ledger.
- Route-handler tests for checkout, capture, and webhooks, including double capture, amount and currency tampering, replay, and expired or forged links. PayPal HTTP is mocked.
- Full Playwright suite: 33 passed, 3 skipped, 0 failed. The invoice-admin worker exit was not reproduced.

Sandbox order, capture, mismatch, and forged-signature checks passed against `api-m.sandbox.paypal.com`. A PayPal-signed webhook `SUCCESS` was not observed, because that needs a delivery to the production URL and this route is not deployed.

Production data steps, run by the owner from a detached worktree at `d123e14` (region ENAM):

- `kinexis-invoice-ledger` = `077c8e46-2ea8-4997-8b6a-c06902194575`
- `kinexis-invoice-ledger-preview` = `5a474f5a-4ac9-4d4c-8309-943c3d52981b`
- An older database named `kinexis` was left alone.
- Migration 0001 applied to preview (`--env preview`) and to production. Production `invoices` and `payment_events` each had 0 rows.
- KV dry run on `REVIEWS` prefix `invoice:v1:` read 0, valid 0, invalid 0, errors empty. There is nothing to import.
- `--remote --apply` with 0 rows crashed before verification because it passed an empty SQL file to `wrangler d1 execute --file` (Windows exit `3221226505`). The importer now skips that execute and still verifies. No secrets were set and nothing was deployed.

## Exit criteria

| Criterion | State |
|---|---|
| Signing rotation window in code | Met |
| Atomic idempotent invoice transitions and migration file | Met. Migration 0001 is applied on preview and production. Both ledger tables are empty. |
| PayPal webhook verification and dedupe in code | Met |
| Route tests for tamper, replay, expiry, and forged links | Met (PayPal HTTP mocked) |
| Sandbox create, capture, mismatch, forged signature | Met. See `TEST-MATRIX.md`. |
| PayPal-signed webhook SUCCESS | Waiting. Route is not deployed. |
| KV-to-D1 import tool, dry-run, idempotent, verify, KV untouched | Met. Production dry run found 0 invoice keys. Empty apply no longer calls `d1 execute`. |
| Owner runbook and Windows script, no deploy command | Met. `PHASE1-PRODUCTION-SETUP.md` and `scripts/phase1-production-setup.ps1`. |
| Production D1 databases and migration | Met. Ids are in `wrangler.jsonc`. Secrets are not set. |
| `INVOICE_LINK_SECRET` generated and stored | Waiting until immediately after deploy. `INVOICE_LINK_SECRET_PREVIOUS` is likely unneeded: the API returns a link only after the invoice row is stored, and production KV has no invoice rows. |
| Deploy | Waiting. Not part of the setup script. |

## Owner blockers before any release

1. Sandbox API checks are recorded in `TEST-MATRIX.md`. Still open: a real PayPal-signed webhook delivery (`verification_status: SUCCESS`). That was skipped so nothing was posted to `kinexisdigital.com`.
2. Production `INVOICE_LINK_SECRET` (at least 32 UTF-8 bytes), set only after this code is deployed. `INVOICE_LINK_SECRET_PREVIOUS` is likely unneeded. The staff route signs a token and then stores the invoice, and it returns the link only when that store succeeds. Nothing else in the app creates invoice links, and the app never deletes `invoice:v1:*` keys. With zero KV rows, the API never handed out a link. A link could exist only if someone saved one and the KV row was removed by hand outside the app.
3. D1 create, migration, and the KV dry run are done. There were no `invoice:v1:*` rows to import. Deploy still has to happen before invoice checkout uses D1. Until then the live Worker keeps using KV, which has no invoices.
4. The sandbox webhook is already registered for `https://kinexisdigital.com/api/paypal/webhook`. Production still needs its own webhook id when that app is configured. Do not point sandbox events at production until this route is deployed on purpose.
5. `NEXT_PUBLIC_PAYPAL_CLIENT_ID` if the subscription SDK ready state must be exercised. The sandbox run did not start the browser suite, so that check is still the fail-closed alert only.

**Completed phases:** Phase 0, and the Phase 1 engineering scope.
**Do not start Phase 2.**
**Recommendation:** draft PR for owner review only. Not ready to merge or deploy.

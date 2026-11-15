# Programme status

**Current phase:** Phase 1 — payment and invoice integrity
**Status:** Live in production as of 2026-11-15. Do not start Phase 2. One check remains open: a real PayPal-signed live webhook has not arrived yet.
**Production commit:** `a32c39b` (merge of PR #6)
**Worker:** `kinexis-digital` version `87e26f40-6f60-4c83-95c9-33d56e483705`. Rollback target `5c5690e8-216f-4441-ab32-fb056b401dd2`.

## Phase 0

Complete, as recorded at the start of this branch. Baseline E2E failures were environmental or unrelated to invoice capture. See `phases/phase-00-baseline.md`.

## Phase 1

Code and local evidence are in place for the payment and invoice integrity scope:

- Dedicated invoice signing key, versioned `v2.` links, and a previous-key rotation window.
- D1 ledger for conditional, idempotent invoice and payment transitions, with `migrations/0001_invoice_payment_ledger.sql`. KV is no longer the invoice store.
- PayPal webhook signature verification and durable event deduplication on that ledger.
- Route-handler tests for checkout, capture, and webhooks, including double capture, amount and currency tampering, replay, and expired or forged links. PayPal HTTP is mocked.
- Full Playwright suite: 33 passed, 3 skipped, 0 failed. The invoice-admin worker exit was not reproduced.

Sandbox order, capture, mismatch, and forged-signature checks passed against `api-m.sandbox.paypal.com`. A PayPal-signed live webhook `SUCCESS` has not been observed. No real payment was made to produce one. The route is deployed, and the first real payment event will be the check.

## Production ship (2026-11-15)

- PR #6 merged to `main` as `a32c39b`.
- Worker `kinexis-digital` deployed from that commit as version `87e26f40-6f60-4c83-95c9-33d56e483705`. Rollback version is `5c5690e8-216f-4441-ab32-fb056b401dd2`.
- Production secrets set, values not recorded here: live `PAYPAL_MERCHANT_ID`, live `PAYPAL_WEBHOOK_ID` for `https://kinexisdigital.com/api/paypal/webhook` (webhook id `24N19060893354101`), `PAYPAL_API_BASE` = `https://api-m.paypal.com`, and `INVOICE_LINK_SECRET` (32 random bytes generated on the owner PC and never printed).
- `INVOICE_LINK_SECRET_PREVIOUS` was not set. Production KV had no `invoice:v1:*` keys. The staff route returns a link only after the invoice row is stored, nothing else signs invoice links, and the app never deletes those keys. A previous key would matter only if a link was saved and its row was removed by hand.
- Smoke, no payment: `https://www.kinexisdigital.com/` and `https://kinexisdigital.com/` returned 200. `/pay` returned 200. An unsigned `POST /api/paypal/webhook` returned 400 `{"error":"invalid signature headers"}`. `GET` on that route returned 405.

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
| PayPal-signed live webhook SUCCESS | Open. The route is deployed. No real payment event has arrived. Unsigned POST smoke returned 400. |
| KV-to-D1 import tool, dry-run, idempotent, verify, KV untouched | Met. Production dry run found 0 invoice keys. Empty apply no longer calls `d1 execute`. |
| Owner runbook and Windows script, no deploy command | Met. `PHASE1-PRODUCTION-SETUP.md` and `scripts/phase1-production-setup.ps1`. |
| Production D1 databases and migration | Met. Both databases are in `wrangler.jsonc`. Both ledger tables had 0 rows. |
| `INVOICE_LINK_SECRET` generated and stored | Met. Set on `kinexis-digital` after deploy. The value was not printed. `INVOICE_LINK_SECRET_PREVIOUS` was not set. |
| Deploy | Met. Version `87e26f40-6f60-4c83-95c9-33d56e483705` from `a32c39b`. |

## Still open

1. A real PayPal-signed live webhook (`verification_status: SUCCESS`) has not been seen. Wait for the first real payment event. Do not run a live charge to manufacture one.
2. `NEXT_PUBLIC_PAYPAL_CLIENT_ID` if the subscription SDK ready state must be exercised in E2E. That check is still the fail-closed alert when the id is absent.

**Completed phases:** Phase 0, and Phase 1 except the live signed-webhook observation.
**Do not start Phase 2.**

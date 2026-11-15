# Current handoff

## Phase identity

- **Phase:** 1 — Payment and Invoice Integrity
- **Date:** 2026-11-15
- **Status:** Code complete. Production setup is written and not executed. NOT READY to deploy or start Phase 2.

## Git and scope

- **Branch:** `codex/production-hardening-v1`, based on `c43041d`.
- First commit restores the owner's uncommitted Phase 0/1 work unchanged.
- Later commits add the ledger, webhook verification, route tests, and this record.
- No chatbot, Conferbot, pricing, package, terms, or guarantee copy changes.
- No deployment, production migration, production secret, or real payment.

## What this phase now does

- New invoice links are `v2.` HMAC signatures from `INVOICE_LINK_SECRET` (minimum 32 UTF-8 bytes). `INVOICE_LINK_SECRET_PREVIOUS` verifies older links only until `INVOICE_LINK_SECRET_PREVIOUS_UNTIL`, when that timestamp is set. Removing the previous secret closes the window immediately. The PayPal client secret is not a signing fallback.
- Invoice creates, PayPal order association, and paid transitions go through D1 (`INVOICE_DB`) in one batch. The paid transition is a conditional update plus a unique `(provider, event_id)` row. A second capture id, a mismatched amount, or a replayed event does not change the paid invoice.
- `POST /api/paypal/webhook` calls PayPal `verify-webhook-signature` and accepts only `verification_status: SUCCESS`. Signature failure stores nothing. Provider or storage failure returns 503 so PayPal retries.
- `npm run check:paypal-sandbox` runs a local mock first, then the sandbox provider when `PAYPAL_SANDBOX_CONFIRM=1` and the API base is sandbox. Mocked lines are not sandbox evidence.

## Verification on this machine

Runtime: Node v22.23.4, npm 10.9.9. The repo asks for npm >= 11. `node:sqlite` printed an experimental warning during ledger and route tests. See `TEST-MATRIX.md`. Sandbox evidence is in its own section there. Mocked lines are not that evidence.

## Exact owner actions

1. Sandbox order create, unpaid-capture rejection, positive sandbox card capture, amount and currency mismatch, and forged webhook signature rejection are done. Still needed if you want a PayPal-signed `SUCCESS`: deliver a sandbox event to a deployed route, or capture a real sandbox transmission and verify it. Do not post sandbox events at production until that deploy is approved. Keep credential values out of git.
2. Generate `INVOICE_LINK_SECRET` (at least 32 UTF-8 bytes) and set it with `wrangler secret put` only when a deploy is separately approved. If any live links were signed with an older key, copy that key into `INVOICE_LINK_SECRET_PREVIOUS` for the rotation window. Set `INVOICE_LINK_SECRET_PREVIOUS_UNTIL` if the window should end on a timestamp.
3. Create two empty D1 databases (production and preview). Replace `00000000-0000-4000-8000-000000000001` and `00000000-0000-4000-8000-000000000002` in `wrangler.jsonc`. Review `migrations/0001_invoice_payment_ledger.sql`. Apply it only after approval, to the new databases, not by deploying this branch. Export KV keys prefixed `invoice:v1:` and import them before switching reads. Do not delete the KV keys in the observation window.
4. The sandbox webhook is registered for `https://kinexisdigital.com/api/paypal/webhook` with the six order and capture events. Set the sandbox webhook id as a Worker secret only with an approved deploy. Production needs its own webhook when that app is configured.
5. To exercise the subscription button E2E beyond the fail-closed alert, set `NEXT_PUBLIC_PAYPAL_CLIENT_ID` in the test environment and re-run `npx playwright test e2e/production-audit.spec.ts`.
6. On the Windows checkout, read `PHASE1-PRODUCTION-SETUP.md` and run `scripts/phase1-production-setup.ps1` only after approving each command. The script never deploys. Deploy remains `npm run deploy`, typed separately.
7. Do not merge or deploy until the setup verification reports `countsMatch: true` and the signing secrets are in place. Phase 2 has not been started.

Closure write-up: `phases/phase-01-closure.md`. Setup runbook: `PHASE1-PRODUCTION-SETUP.md`.

# Test matrix

## Phase 2 pass (2026-11-15)

Local runtime: Node v22.23.4, npm 10.9.9 (engine warning: repo asks npm >= 11).

| Check | Result |
|---|---|
| `node scripts/check-reviews-routes.mjs` | PASS. Queue, validation, cross-site, honeypot, rate limit, confirm-only GET, approve, reject, bad key, replay. |
| `npm run check` | PASS. Includes new `check:reviews`. ESLint: 3 pre-existing warnings, 0 errors. Contact + Spanish mirror (73 paths) PASS. |
| `node scripts/check-invoice-routes.mjs` | PASS (PayPal HTTP mocked; sandbox NOT RUN). |
| `npm run test:e2e` | NOT RUN (no UI change this phase). |
| `npm run build:worker` | NOT RUN (test-hook only; no Worker feature change). |
| PayPal-signed live webhook SUCCESS | NOT RUN (Phase 1 open; wait for real payment event). |

## Phase 1 closure pass (retained)

Local runtime for that pass: Node v22.23.4, npm 10.9.9. npm printed an engine warning because the repo asks for npm >= 11. Ledger tests used `node:sqlite` and printed its experimental warning. That warning is not a failure.

| Check | Result on that pass |
|---|---|
| `npm run check` | PASS. ESLint: 3 pre-existing warnings, 0 errors (`scripts/es-pillars-core/local-seo.mjs`, `scripts/es-pillars-more-payload.mjs`, `scripts/generate-es-trade-bodies.mjs`). `tsc --noEmit` passed. Contact delivery passed. Spanish mirror passed (73 paths). |
| `npm run check:invoice-security` | PASS. Includes invoice-core (rotation window), payment-integrity, PayPal order service with mocked HTTP, ledger migration on local SQLite, and route handlers with mocked PayPal. |
| `npm run check:paypal-sandbox` | Mocked contract inside the script PASS. Sandbox half PASS, exit 0. See the sandbox section below. The two results are separate. |
| `npx playwright test --workers=1` | 33 passed, 3 skipped, 0 failed. Skips: measurement delivery on chromium and mobile (not production, no GA/Meta ids), and mobile nav on the chromium project. |
| PayPal subscription SDK ready/loading | NOT RUN. Both projects hit the fail-closed `.pay-alert` because `NEXT_PUBLIC_PAYPAL_CLIENT_ID` is unset. The test still requires ready or loading when a client id is present. No payment button was clicked. |
| Invoice-admin worker exit | NOT REPRODUCED. `POST /api/invoices` without a configured admin secret returned 503. The suite process did not exit early. |
| `npm run build:worker` | PASS (exit 0). OpenNext completed. Preflight printed the existing missing `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_META_PIXEL_ID` warnings and continued. This command does not deploy. |
| `npm run check:structured-data` | NOT RUN. It needs a running site. Production was not requested. |
| `npm run verify:prod` | NOT RUN. No production access. |
| `git diff --check` | PASS. |
| GitHub Actions `validate` | First push FAIL (`KVNamespace` missing from the gitignored generated types; `main` fails the same way). Follow-up `125f4f78` PASS. |

## Sandbox evidence

Recorded 2026-11-15. Host was `api-m.sandbox.paypal.com` only. No request was sent to `api-m.paypal.com`. Credentials stayed in the process environment and were not written into the repo, docs, or logs. This section is the sandbox evidence. The mocked contract inside `check:paypal-sandbox` is not part of it.

| Step | Sandbox result |
|---|---|
| OAuth client-credentials | PASS |
| Create CAPTURE order `7CT01134FB4619833` | PASS, status `CREATED` |
| GET that order | PASS, stays `CREATED` |
| Capture that unpaid order | PASS, rejected, status was not `COMPLETED` |
| Positive capture via sandbox test card, order `5NS738509J696993M` | PASS, status `COMPLETED`. This is a sandbox $1 capture, not a live charge. |
| Second created order, payee compared with the configured merchant id | PASS. Payee was present and matched. The id is not recorded here. |
| Production `verifyOrderBeforeCapture` on that real order, expected amount `25.00` USD | `not_approved` (CREATED is not treated as paid) |
| Same order, expected amount `1.00` | `amount_mismatch` |
| Same order, expected currency `EUR` | `currency_mismatch` |
| Same order, different invoice id | `invoice_mismatch` |
| Same order, different merchant id | `merchant_mismatch` |
| Production `verifyPayPalWebhookSignature` with a forged transmission signature | `failure` |
| Direct `POST /v1/notifications/verify-webhook-signature` | HTTP 200, `verification_status: FAILURE` |
| Read the registered sandbox webhook | PASS. Host `kinexisdigital.com`, path `/api/paypal/webhook`. Events: `CHECKOUT.ORDER.APPROVED`, `CHECKOUT.ORDER.COMPLETED`, `PAYMENT.CAPTURE.COMPLETED`, `PAYMENT.CAPTURE.DENIED`, `PAYMENT.CAPTURE.REFUNDED`, `PAYMENT.CAPTURE.REVERSED`. |
| Live webhook delivery to that URL | NOT RUN. The route is not deployed, so a PayPal-signed `SUCCESS` was not observed. |

A later `npm run check:paypal-sandbox` without credentials printed `SANDBOX EVIDENCE: NOT RUN`. That line is the mocked-script gate. It does not replace the sandbox table above.

## How to read this

Mocked PayPal checks and the local SQLite ledger rehearsal are not sandbox evidence and not a production D1 migration. The table above is the sandbox evidence. The route tests call the real checkout, capture, invoice, and webhook handlers. They cover a client-supplied amount, a missing or forged token, an expired invoice, a repeated checkout and a repeated capture, a capture whose PayPal amount or currency does not match the invoice, a webhook with a failed signature, a webhook replay, and a webhook whose amount does not match. A first full Playwright run failed two mobile checkout guards with HTTP 429 because both projects reused the same forwarded address inside the rate-limit window. The rerun above uses a distinct address per project and keeps the 400 assertion.

No live PayPal host was called. The completed capture above is a sandbox test-card charge. No production deployment, production migration, or customer email was performed.

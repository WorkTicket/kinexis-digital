# Test matrix

Local runtime for this closure pass: Node v22.23.4, npm 10.9.9. npm printed an engine warning because the repo asks for npm >= 11. Ledger tests used `node:sqlite` and printed its experimental warning. That warning is not a failure.

| Check | Result on this pass |
|---|---|
| `npm run check` | PASS. ESLint: 3 pre-existing warnings, 0 errors (`scripts/es-pillars-core/local-seo.mjs`, `scripts/es-pillars-more-payload.mjs`, `scripts/generate-es-trade-bodies.mjs`). `tsc --noEmit` passed. Contact delivery passed. Spanish mirror passed (73 paths). |
| `npm run check:invoice-security` | PASS. Includes invoice-core (rotation window), payment-integrity, PayPal order service with mocked HTTP, ledger migration on local SQLite, and route handlers with mocked PayPal. |
| `npm run check:paypal-sandbox` | MOCKED provider contract PASS. `SANDBOX EVIDENCE: NOT RUN`. No sandbox credentials and `PAYPAL_SANDBOX_CONFIRM` was not set. |
| `npx playwright test --workers=1` | 33 passed, 3 skipped, 0 failed. Skips: measurement delivery on chromium and mobile (not production, no GA/Meta ids), and mobile nav on the chromium project. |
| PayPal subscription SDK ready/loading | NOT RUN. Both projects hit the fail-closed `.pay-alert` because `NEXT_PUBLIC_PAYPAL_CLIENT_ID` is unset. The test still requires ready or loading when a client id is present. No payment button was clicked. |
| Invoice-admin worker exit | NOT REPRODUCED. `POST /api/invoices` without a configured admin secret returned 503. The suite process did not exit early. |
| `npm run build:worker` | PASS (exit 0). OpenNext completed. Preflight printed the existing missing `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_META_PIXEL_ID` warnings and continued. This command does not deploy. |
| `npm run check:structured-data` | NOT RUN. It needs a running site. Production was not requested. |
| `npm run verify:prod` | NOT RUN. No production access. |
| `git diff --check` | PASS. |
| GitHub Actions `validate` on the first push | FAIL. `tsc` could not find the global `KVNamespace` because `cloudflare-env.d.ts` is generated and gitignored. `main` fails the same way. The follow-up types the two KV call sites structurally so check does not need that file. |

## How to read this

Mocked PayPal checks and the local SQLite ledger rehearsal are not live sandbox evidence and not a production D1 migration. The route tests call the real checkout, capture, invoice, and webhook handlers. They cover a client-supplied amount, a missing or forged token, an expired invoice, a repeated checkout and a repeated capture, a capture whose PayPal amount or currency does not match the invoice, a webhook with a failed signature, a webhook replay, and a webhook whose amount does not match. A first full Playwright run failed two mobile checkout guards with HTTP 429 because both projects reused the same forwarded address inside the rate-limit window. The rerun above uses a distinct address per project and keeps the 400 assertion.

No real payment, deployment, production migration, or customer email was performed.

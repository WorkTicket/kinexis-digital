# Test matrix

| Check | Phase 0 result | Phase 1 result |
|---|---|---|
| Runtime / dependency install | PASS — Node 24.15.0, npm 11.12.1; `npm ci` passed | Not rerun; installed dependencies retained |
| `npm run check` | PASS — 3 pre-existing lint warnings | PASS — lint (same 3 warnings), typecheck, contact checks, 73-path Spanish mirror |
| `npm run check:invoice-security` | PASS (old checks) | PASS — production invoice core, PayPal response validators, and PayPal service with mocked HTTP boundary |
| `npx playwright test e2e/invoice-payment-integrity.spec.ts --project=chromium` | N/A | PASS — 3 route guard tests |
| `npm run verify` | PARTIAL — 21 passed, 4 failed, 3 skipped; sandbox unavailable | FAIL/PARTIAL — 27 passed, 4 failed, 3 skipped; see note below |
| Full E2E failures | PayPal SDK display x2; mobile plan header; mobile nav | PayPal SDK display x2; mobile plan header; mobile nav passed; invoice-admin test worker exited unexpectedly. The worker crash needs reproduction; do not classify it as a confirmed product regression. |
| `npm run check:paypal-sandbox` | PARTIAL — live sandbox unavailable | PARTIAL — ID-shape check passed; live sandbox explicitly NOT RUN (credentials unavailable) |
| `npm run build:worker` | N/A | PASS — OpenNext build completed. Preflight emitted existing missing GA/Meta build-variable warnings; it did not block the build. Windows OpenNext compatibility and internal DO dev warnings remain environmental. |
| `npm run verify:prod` | PASS — read-only smoke 133 URLs, structured data 9/9, Lighthouse budgets | Not rerun; no production access/change in Phase 1 |
| `git diff --check` | N/A | PASS |

## Test interpretation

Mocked provider tests validate production service code at the HTTP boundary; they are not live PayPal sandbox evidence. E2E route tests cover input guards, not a complete invoice checkout-to-capture flow. KV-backed concurrency, persistence failure injection at route level, webhook verification and durable replay deduplication remain unproven. No real payment, deployment, production migration, or customer email was performed.

# Findings

## Phase 1 — payment and invoice integrity

### Fixed in this branch (not yet production deployed)

1. `src/app/api/checkout/route.ts`: ignores caller-supplied idempotency keys and derives PayPal's request ID from the server-side invoice ID; rejects checkout if the PayPal order association cannot be persisted.
2. `src/app/api/checkout/capture/route.ts`: resolves the PayPal order's invoice association, loads that exact stored invoice, requires the stored PayPal order ID to match, and only redirects to success after verified capture state and successful persistence.
3. `src/lib/paypal-order.ts` + `src/lib/payment-verification.ts`: validates expected order/invoice IDs, both correlation IDs, original invoice amount, USD currency, configured merchant ID, approved/completed states, and exactly one completed capture with the full expected amount. An `ORDER_ALREADY_CAPTURED`/conflict response is not trusted; the order is re-fetched and re-validated.
4. `src/lib/invoices.ts` + `src/lib/invoice-core.ts`: invoice tokens are newly issued as versioned HMAC (`v2.`), use a dedicated `INVOICE_LINK_SECRET` with a 32-byte minimum, and support a configured previous key for versioned and legacy links. The PayPal-secret fallback has been removed. Legacy key migration still requires owner configuration.
5. `scripts/check-invoice-security.mjs`, `scripts/check-payment-integrity.mjs`, and `scripts/check-paypal-order-service.mjs` exercise production functions (provider HTTP mocked at the boundary) instead of mirroring the core validation logic. Route-guard E2E coverage is added in `e2e/invoice-payment-integrity.spec.ts`.

### Remaining confirmed blockers/risks

6. Invoice state still resides in Cloudflare KV (`REVIEWS` namespace). KV does not provide transactional compare-and-set for an invoice plus unique payment-event ledger. Same-order retries are verified idempotently against PayPal, but concurrent state changes and durable webhook deduplication cannot be guaranteed with the current binding. Do not represent this as a transactional ledger.
7. No PayPal webhook endpoint or configured webhook ID exists. Official PayPal signature verification requires the configured webhook ID and transmission headers/body to be submitted to PayPal's `POST /v1/notifications/verify-webhook-signature` API (or equivalent cryptographic validation), plus durable event-ID deduplication. The D1/event-ledger blocker and design are recorded in `DECISIONS.md`.
8. `PAYPAL_MERCHANT_ID` is a new required server setting for invoice order/capture verification. Until configured with the correct account merchant ID, invoice PayPal operations fail closed.
9. Phase 0 E2E PayPal subscription-widget failures were unrelated to invoice capture/state. They displayed the widget failure state because `NEXT_PUBLIC_PAYPAL_CLIENT_ID` was absent in the isolated test environment. The mobile plan-header and mobile-navigation failures are unrelated. They were not fixed in Phase 1.
10. Actual live PayPal sandbox confirmation was not available in the isolated worktree. Provider-mocked tests are not sandbox evidence.

## Phase 0 environment/release risks retained

- `wrangler.jsonc` preview configuration names production recipients in `CONTACT_TO` and `CONTACT_EMAIL.allowed_destination_addresses`; Phase 1 did not modify it. Review/isolate before preview emails.
- Text-back/second-number commercial relationship and Spain EUR pricing remain owner decisions; no commercial policy changed.

No production deployment, production data migration, real payment, or real customer notification was performed.

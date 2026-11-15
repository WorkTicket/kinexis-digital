# Findings

## Phase 1 — payment and invoice integrity

### In the restored owner commit

Strict PayPal order and capture checks, stable per-invoice PayPal request ids, fail-closed persistence, versioned invoice tokens, and removal of the PayPal-secret signing fallback. Those changes were committed unchanged from the owner's worktree and then extended below.

### Added after that commit

1. Invoice links are signed only with `INVOICE_LINK_SECRET` (minimum 32 UTF-8 bytes) as `v2.` HMAC. `INVOICE_LINK_SECRET_PREVIOUS` is accepted for v2 and legacy tokens during the rotation window. If `INVOICE_LINK_SECRET_PREVIOUS_UNTIL` is a valid timestamp, the previous key stops working at that instant. An unparseable timestamp closes the previous key immediately. The current key keeps working.
2. Invoice and payment writes no longer use the `REVIEWS` KV namespace. `INVOICE_DB` (D1) runs create, order association, and mark-paid as batched SQL. Mark-paid updates the invoice only when the order, amount, currency, and capture id match, and inserts one payment event. A second capture id, a wrong amount, or an event id already stored as rejected leaves the invoice unpaid. Replaying the same applied event returns success without a second row.
3. `POST /api/paypal/webhook` sends the transmission headers, configured webhook id, and event body to PayPal `POST /v1/notifications/verify-webhook-signature`. Only `verification_status: SUCCESS` is accepted. The event id is the dedupe key. Storage or provider failure responds 503. A verified event that does not match the stored invoice is recorded as rejected and acknowledged so PayPal does not retry it forever.
4. Route tests in `scripts/check-invoice-routes.mjs` drive the real handlers. PayPal is mocked. See `TEST-MATRIX.md`.
5. Playwright: the mobile homepage now asserts the mobile plan card instead of the desktop column header. The PayPal checkout spec asserts the fail-closed alert when no public client id is configured. Invoice route guards use a distinct forwarded address per project so the second project is not rate-limited into a false 429. The full suite completed with no worker crash.

### Still open

6. Sandbox evidence is in `TEST-MATRIX.md` and is separate from the mocked contract. Create, unpaid-capture rejection, a completed sandbox card capture, and amount, currency, invoice, and merchant mismatch rejection against a real order all passed. A forged webhook signature was `FAILURE` from PayPal's verify API. A PayPal-signed `SUCCESS` was not run, because that would deliver to `kinexisdigital.com` and the route is not deployed.
7. D1 database ids in `wrangler.jsonc` are placeholders (`…0001` production, `…0002` preview). The migration file was applied only to an in-memory SQLite database in the ledger test. It was not applied to Cloudflare.
8. Existing invoice rows, if any, still live under KV prefix `invoice:v1:`. This code does not read them. They must be imported into D1 before a deploy or those links will look missing.
9. `INVOICE_LINK_SECRET` is still not set. The sandbox merchant id and webhook id were supplied for the verification run and were not committed. They still have to be set as Worker secrets before a deploy.
10. Subscription SDK ready/loading was not observed. Measurement-id E2E stays skipped without GA/Meta build variables. `e2e/smoke.spec.ts` still allows HTTP 429 on one older invoice tamper test; that assertion was already in the tree and was not loosened.
11. A verified capture webhook must include both `invoice_id` and `custom_id`, equal to each other. That matches the orders this app creates. A payload that drops `custom_id` is rejected.

## Phase 0 risks retained

- Preview `CONTACT_TO` still lists production recipients. Not changed.
- Text-back, second-number, and Spain EUR pricing were not changed.

No production deployment, production data migration, real payment, or customer notification was performed.

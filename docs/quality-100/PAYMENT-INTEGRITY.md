# Payment integrity audit

## Flow reviewed

1. Staff-only `POST /api/invoices` checks same-site/size/content type, requires `INVOICE_ADMIN_SECRET`, validates invoice fields and expiry, signs invoice ID with `INVOICE_LINK_SECRET` (minimum 32 UTF-8 bytes), and stores the invoice before returning the signed link.
2. Public `POST /api/checkout` rejects client-provided amount, validates the invoice ID/token and payable state, uses only stored amount/description, and sends a stable invoice-based PayPal request ID. The resulting order must be associated conditionally with the same unpaid invoice.
3. PayPal order creation uses CAPTURE intent and server-composed USD amount, invoice/custom IDs, fixed merchant and redirect URLs, a 15-second timeout, and validates the approval URL host as HTTPS PayPal.
4. Capture return resolves the PayPal order association, reloads invoice and requires the stored order ID to match. PayPal order/capture state is re-read and verified for approval/completed capture, invoice/custom ID, amount in minor units, USD currency, and configured merchant. Payment success is returned only after ledger persistence.
5. `/api/paypal/webhook` bounds and parses the body, validates signature headers/certificate URL allowlist, asks PayPal to verify the signature, validates capture event shape and IDs, reloads matching invoice, independently verifies PayPal capture, then applies a unique event/conditional D1 transition. Unmatched or inconsistent events are recorded as rejected/alerted and do not mark invoice paid.

## Controls and test evidence

- `invoice-core.ts`: versioned HMAC-SHA256 invoice token, constant-time digest comparison, current/previous key rotation with optional expiry, invoice expiry/state, currency, and client amount guard.
- `payment-verification.ts`: decimal USD to integer minor units; rejects malformed/excess precision and verifies order/capture invoice, order, amount, currency, merchant, approval and completion.
- `invoice-ledger.ts` + `0001_invoice_payment_ledger.sql`: prepared/bound SQL, conditional transitions, unique order/capture IDs and provider event key; D1 batch transaction.
- `paypal-order.ts`: server-side OAuth/order calls, fixed PayPal hosts, 15-second timeouts, idempotency request IDs; invalid or unavailable results fail closed.
- `paypal-webhook.ts`: configured webhook ID, signed PayPal verification endpoint, HTTPS paypal.com certificate host validation, strict header/body size checks.
- `npm run check:invoice-security`: passed all helper, mocked PayPal, order-service, ledger, route, import and reconciliation suites.
- E2E invoice negative guards passed: client-supplied amount rejected, missing link rejected, missing admin secret fails closed, malformed order token rejected before provider call.
- `npm run check:paypal-sandbox` was run with explicit confirmation disabled: mock contract passes; sandbox **not run**. No charge, capture, refund, or live provider operation occurred.

## Observations and limitations

- No false paid response path was found: capture-return success follows D1 persistence; webhook storage failures return 503. A capture completed at PayPal but not persisted is reported as failure to the browser and can be reconciled/retried through provider callback; this transient mismatch is preferable to false success.
- Webhook replay and concurrent capture protection are ledger-backed; browser return and webhook can race, but conditional/idempotent ledger transitions prevent double application.
- Invoice creation requires a high-entropy administrator secret over HTTPS in deployment; it is a shared capability, not user-based RBAC. Secret provisioning, access, and rotation are not observable from source.
- Webhook signature verification is an outbound call to PayPal. Certificate URL is restricted to HTTPS PayPal domains. No certificate is fetched directly from an attacker-controlled host.
- Logs inspected do not include raw payment payloads, customer names/emails, invoice descriptions, card data, OAuth tokens, or signing secrets. Structured mismatch alerts include provider IDs for reconciliation.
- Production/preview D1 state, KV rollback copies, merchant identity, PayPal webhook registration, and sandbox credentials were not inspected. Existing operational docs require owner confirmation for remote SELECT/backup and prohibit agent production writes.

**Conclusion:** repository-level payment controls are strong and regression-tested with fixtures/mocks. Live and sandbox integration evidence remains a release/owner gate; this report does not claim PayPal is actively configured or operational.

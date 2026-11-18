# Findings

Findings below are preliminary Phase 0 observations from checked-in source; Phase 1 must independently verify full route behavior and test coverage. No production exploitation or external payment was attempted.

## Confirmed source observations — payment integrity (Phase 1 review required)

1. `src/lib/invoices.ts:37-39`: invoice link signing falls back from `INVOICE_LINK_SECRET` to `PAYPAL_CLIENT_SECRET`; no versioned-key transition/rotation is evident in the inspected helper.
2. `src/lib/invoices.ts:85-94`: invoice persistence uses KV `put`; KV does not provide transactional compare-and-set across the read/update payment path.
3. `src/lib/paypal-order.ts:145-174`: capture helper checks USD and reports paid when order status is `COMPLETED` (or `ORDER_ALREADY_CAPTURED` detail), but the inspected code does not compare amount, payee, stored invoice/order association, or captured amount.
4. `src/app/api/checkout/capture/route.ts:13-26`: redirect handler uses PayPal-returned invoice ID, marks a currently-unpaid invoice paid, and returns the paid thank-you redirect even if invoice lookup/update does not succeed. Confirm behavior against creation/storage route and tests.

These are source-level findings, not a complete exploitability assessment. Phase 1 owns remediation and regression tests.

## Confirmed environment/release risks

5. `wrangler.jsonc:74-76,101-108`: preview configuration names production customer recipients in `CONTACT_TO` and `CONTACT_EMAIL.allowed_destination_addresses`. That binding alone does not demonstrate actual email delivery behavior; nevertheless the configuration can allow production-address delivery and must be reviewed/isolated before preview sends.
6. Baseline dependency installation failed (`EPERM`); lint/typecheck/E2E cannot be declared passing from this machine state.

## Owner decision preserved

- Resolve approved relationship between $97/month missed-call text-back and optional $1/month second phone number/carrier charges.
- Confirm approved Spain EUR pricing before any localization changes introduce or adjust monetary amounts.

No commercial policy was changed.

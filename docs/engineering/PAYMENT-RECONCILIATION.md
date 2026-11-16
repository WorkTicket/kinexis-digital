# Payment reconciliation + alerts

**Status:** Ops tooling on `main` (no deploy required for the check script).  
**Scope:** Invoice D1 ledger (`INVOICE_DB` / `kinexis-invoice-ledger`) only. No live PayPal charges. No schema changes.

## What it checks

Pure logic in `src/lib/payment-reconciliation.ts`:

| Finding | Severity |
|---|---|
| Paid invoice missing capture / order / applied event | alert |
| Applied event order/capture/amount mismatch vs invoice | alert |
| Rejected capture webhook event in `payment_events` | alert |
| Capture id on unpaid invoice | alert |
| Paid missing `paid_at` | warn |
| Unpaid past `expires_at` still holding an order id | warn |

## CI / local (no secrets)

```bash
npm run check:payment-reconciliation
```

Wired into `npm run check:invoice-security`. Uses fixtures only.

## Owner remote read (explicit confirm)

From a wrangler-logged-in machine:

```powershell
$env:RECONCILE_CONFIRM = "YES"
node .\scripts\reconcile-invoice-ledger.mjs --remote
Remove-Item Env:RECONCILE_CONFIRM
```

- SELECT-only. Does not mutate D1.
- Prints finding codes + invoice/event ids. Does **not** print company or description.
- Exit `1` when any **alert** finding exists (warn-only → exit 0).

## Alerts

1. **Live webhook (already structured logs):** rejected capture paths in `src/app/api/paypal/webhook/route.ts` emit `console.error` with `kind: "payment_alert"`. Cloudflare Workers Observability (`wrangler.jsonc` `observability.enabled`) surfaces these without a paid product.
2. **Batch mail (optional, owner PC):** set `RECONCILE_ALERT_MAIL=1`, `RECONCILE_ALERT_TO=…`, and existing `SMTP_*` when running `--remote`. Mail sends only when alert findings exist. Do not put SMTP passwords in git.

## Suggested cadence

Run `--remote` after any production payment-related deploy and weekly otherwise. Treat alert exits as “look at PayPal + D1 before the next invoice send.”

## Out of scope

- Pulling the PayPal transaction list API (needs live secrets; owner sandbox/live evidence stays separate).
- Auto-voiding expired invoices.
- LEAD_DB / Conferbot ledgers.

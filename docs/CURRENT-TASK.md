# CURRENT-TASK.md

## Goal
Production ship with domain year 1 on all monthly plans; preview torn down; PayPal smoke-tested.

## Status
**Done for this request.**

## Shipped
- Commit `79d253b` on `main` (pushed)
- Production Worker deployed: `kinexis-digital` → kinexisdigital.com / www
- Preview Worker deleted: `kinexis-digital-preview` (preview.kinexisdigital.com unresolved)
- Domain year 1 included on Website / Lead System / Plus / Own It (catalog, matrix, checkout, EN/ES terms)
- Fine print: chooser + ownership footnote copy kept; presentation uses labeled text-back bullets (no raw `**`)

## PayPal smoke (live)
- `/pay?plan=lead-system`: terms check → “Loading secure PayPal checkout…” → PayPal SDK + button iframe (~486×132)
- Live `paypal.com/sdk` client-id (not sandbox). No capture / no real charge run.

## Still open
1. Copywriting inclusion decision (still quoted separately)
2. Optional full live capture only if you intentionally pay / cancel a real subscription

## Next action
None required for this ship. Hard-refresh `/` and `/pricing` if local or CDN still shows old fine-print layout.

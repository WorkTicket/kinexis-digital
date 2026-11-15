# Phase 01 — Payment and Invoice Integrity

**Date:** 2026-11-15  
**Status:** INCOMPLETE — code hardening and mocked checks completed; release acceptance blocked.

## Isolation and baseline

Work remained in the isolated `codex/production-hardening-v1` worktree. The original checkout and its pre-existing modifications were not changed. Phase 0 recorded four E2E failures: PayPal subscription SDK display in desktop/mobile, mobile plan-header lookup, and mobile navigation. Inspection of Playwright error context confirmed the PayPal tests observed the widget failure state; isolated environment checks found no `NEXT_PUBLIC_PAYPAL_CLIENT_ID`. Those tests do not exercise invoice capture or state. The mobile header and navigation failures are unrelated to payment. The latest full suite had mobile navigation passing, while a separate invoice-admin test worker crashed unexpectedly.

## Changes

- `src/lib/payment-verification.ts`: strict validation for PayPal order identity, single invoice purchase unit, invoice/custom IDs, USD amount in integer minor units, merchant ID, intent/status and exactly one fully completed capture.
- `src/lib/paypal-order.ts`: requires `PAYPAL_MERCHANT_ID`; creates orders with invoice ID as both correlation fields and stable PayPal request key; validates fetched order before capture; uses a stable capture request ID; never treats an API conflict or `ORDER_ALREADY_CAPTURED` detail alone as proof; refetches the order and verifies full capture details.
- `src/app/api/checkout/route.ts`: uses only invoice-derived values and stable per-invoice request ID; fails closed if persisting order association returns false or throws.
- `src/app/api/checkout/capture/route.ts`: looks up the invoice association from PayPal, requires the persisted order ID match, validates/captures against the stored invoice and redirects to success only after payment-state persistence succeeds.
- `src/lib/invoice-core.ts` and `src/lib/invoices.ts`: versioned HMAC `v2.` new invoice links, dedicated 32-byte-minimum signing secret, previous-key verification and legacy link support; removed PayPal client-secret fallback; validate stored record fields.
- Tests now invoke production invoice core, validators and PayPal service with HTTP mocked at the provider boundary. Added three actual route guard E2E tests. Sandbox script no longer describes local mirrors as provider verification.

## Verification and limits

See `TEST-MATRIX.md`. `npm run check`, `npm run check:invoice-security`, targeted Chromium E2E (3/3) and `npm run build:worker` passed. `npm run verify` is not green: 27 passed, 4 failed, 3 skipped. Two widget failures and mobile header failure correspond to Phase 0; mobile nav passed; the invoice-admin test encountered a worker process crash. Live PayPal sandbox was not run. Worker build completed despite existing missing GA/Meta build-variable preflight warnings.

The new route E2E tests cover malformed/client-tampered requests only. They do not exercise a complete successful checkout/capture or persistence failures/replays through actual route handlers. Mocked HTTP service tests are not live PayPal verification.

## Blockers and recommendation

- KV remains nontransactional for invoice payment transitions; concurrency-safe state changes and durable deduplication cannot be claimed.
- No D1 binding/database exists. D1 is proposed for an atomic invoice/payment event ledger; migration, reconciliation and rollback require owner approval.
- No PayPal webhook endpoint or configured webhook ID exists. Official signature verification and durable event-ID dedupe remain unimplemented; see `DECISIONS.md`.
- No sandbox credentials or merchant ID were available. Production release requires sandbox evidence and correct account configuration.
- Dedicated invoice signing secret must be configured with a safe legacy-key transition.
- Full actual-route integration coverage and reproduction of the invoice-admin E2E worker crash remain.

**Recommendation:** Phase 1 is not accepted as complete; not ready for Phase 2 or production. Stop here pending blockers and owner decisions. No deployment, production data mutation, production secret changes, or real payment occurred.

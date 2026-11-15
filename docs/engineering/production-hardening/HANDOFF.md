# Current handoff

## Phase identity

- **Phase:** 1 — Payment and Invoice Integrity
- **Date:** 2026-11-15
- **Status:** INCOMPLETE / NOT READY for Phase 2 or production release

## Git and scope

- **Branch/worktree:** `codex/production-hardening-v1` at `C:\Users\Slay3r\.local\share\opencode\worktree\1fc06f\production-hardening-v1`.
- Original checkout changes remain separate and untouched. Phase 1 changes are uncommitted and unpushed.
- Modified app/build files: `package.json`; `src/app/api/checkout/route.ts`; `src/app/api/checkout/capture/route.ts`; `src/app/api/invoices/route.ts`; `src/lib/invoice-core.ts`; `src/lib/invoices.ts`; `src/lib/paypal-order.ts`.
- Added tests/helpers: `src/lib/payment-verification.ts`; `scripts/check-payment-integrity.mjs`; `scripts/check-paypal-order-service.mjs`; updated `scripts/check-invoice-security.mjs`, `scripts/check-paypal-sandbox.mjs`; added `e2e/invoice-payment-integrity.spec.ts`.
- Updated programme docs: `FINDINGS.md`, `DECISIONS.md`, `STATUS.md`, `TEST-MATRIX.md`, this handoff, and `phases/phase-01-payment-invoice-integrity.md`.
- No chatbot changes, deployment, production data migration, production secrets changes, or real payment.

## Verification

- `npm run check` — PASS (3 existing lint warnings; typecheck and other checks pass).
- `npm run check:invoice-security` — PASS (production logic and mocked provider-boundary checks).
- `npx playwright test e2e/invoice-payment-integrity.spec.ts --project=chromium` — PASS (3 guard tests).
- `npm run verify` — PARTIAL/FAIL: 27 passed, 4 failed, 3 skipped. The two subscription widget failures and mobile plan-header issue match Phase 0; mobile nav passed; invoice-admin E2E had an unexpected worker process exit. See `TEST-MATRIX.md`.
- `npm run check:paypal-sandbox` — live sandbox NOT RUN; credentials unavailable.
- `npm run build:worker` — PASS; preflight reported existing missing GA/Meta build variables; OpenNext completed.
- `git diff --check` — PASS.

## Blockers and exact next actions

1. Supply approved PayPal sandbox client ID/secret, `PAYPAL_MERCHANT_ID`, sandbox API base, and test payment method; run a real sandbox order create/approve/capture and inspect provider order/capture response. Do not call mocked tests sandbox verification.
2. Supply the correct merchant account ID and configure dedicated production `INVOICE_LINK_SECRET` (minimum 32 UTF-8 bytes); preserve the actual prior signing key in `INVOICE_LINK_SECRET_PREVIOUS` during rotation. No secret values in source/docs.
3. Owner approval is needed to provision/configure D1 and rehearse migration before claiming atomic state transitions or durable deduplication. `REVIEWS` KV is not transactional; no D1 binding exists.
4. Configure PayPal webhook ID and implement the official PayPal verification API plus D1-unique event IDs in one atomic payment transition. Webhooks are currently absent.
5. Add full actual-route integration coverage for successful checkout/capture and false/throw persistence failures/replays. The current E2E tests only cover guards; mocked service checks are not route end-to-end coverage.
6. Reproduce the unexpected invoice-admin E2E worker exit, then rerun full verification. Keep Phase 0 failures separately identified.

Phase 1 stops here. Do not start Phase 2, deploy, migrate, push, or merge without authorization. See `STATUS.md`, `FINDINGS.md`, `DECISIONS.md`, and the dedicated Phase 1 report for detail.

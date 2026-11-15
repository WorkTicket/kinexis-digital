# Programme status

**Current phase:** Phase 1 — payment and invoice integrity  
**Status:** INCOMPLETE / BLOCKED for production readiness.  
**Branch:** `codex/production-hardening-v1` (isolated worktree; changes uncommitted).  
**Production:** untouched; no deployment, migration, or real payment performed.

## Phase 0

Complete. The four baseline E2E failures were investigated: two subscription PayPal SDK widget failures caused by absent `NEXT_PUBLIC_PAYPAL_CLIENT_ID`, plus mobile plan-header and navigation failures unrelated to invoice payment. The latest full verification run had 27 passed, 4 failed, and 3 skipped: the two PayPal widget failures and mobile plan header remain; mobile navigation passed; an invoice-admin E2E worker process exited unexpectedly. Treat the worker crash as a new flaky/environmental failure pending reproduction, not a payment finding.

## Phase 1 work completed

- Strict PayPal order/capture validation against stored invoice ID, order ID, amount, currency, configured merchant, status and completed capture.
- Stable per-invoice PayPal request ID; fail-closed on failed order association persistence and invoice payment-state persistence.
- Versioned invoice token signing and previous-key/legacy-token verification.
- Production service/validator tests with mocked provider HTTP; route-level E2E guard tests.
- KV limitations and proposed D1/webhook architecture recorded in `DECISIONS.md` and the Phase 1 report.

## Blockers / next actions

1. Configure an approved sandbox `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_MERCHANT_ID`, sandbox API base, and account-owned test payment method; run actual create/approve/capture and verify amount/payee/capture details. No live sandbox pass is established.
2. Owner must provide/configure the correct `PAYPAL_MERCHANT_ID` and production `INVOICE_LINK_SECRET`; preserve the previous signing key as `INVOICE_LINK_SECRET_PREVIOUS` during any rotation. Never place values in tracked files.
3. Approve a D1 database/binding, schema, migration rehearsal and rollback plan before claiming concurrency-safe invoice transitions or durable webhook deduplication. D1 is not configured; no production data was changed.
4. Configure a PayPal webhook ID and implement/test official signature verification and D1-backed event idempotency before release.
5. Expand route-level integration coverage beyond guard cases to cover a full mocked checkout/capture through actual route handlers, including persistence exception/false results and replay behavior; add an approved test storage/provider injection seam if needed.
6. Reproduce the latest invoice-admin worker crash and rerun full E2E; preserve Phase 0 failures as separate baseline.

**Completed phases:** Phase 0.  
**Phase 1:** implementation/testing progress recorded, but acceptance criteria not met.  
**Recommendation:** NOT READY for Phase 2 or production release until sandbox, transactional storage/webhook decisions, and remaining route tests/blockers are resolved.

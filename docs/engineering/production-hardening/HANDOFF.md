# Current handoff

## Phase identity

- **Phase:** 0 — Baseline and setup
- **Date:** 2026-11-15
- **Status:** INCOMPLETE / BLOCKED for formal acceptance

## Git state

- Start/end HEAD: `c43041d7773c023e778d6f828bd7833620212b2d`
- Branch: `main` (requested hardening branch not created because the worktree is already dirty)
- Pre-existing changes preserved: `docs/CURRENT-TASK.md`, `e2e/smoke.spec.ts`, untracked `intelligence/`
- Phase 0 added only `docs/engineering/production-hardening/**`; no commit made; worktree is not clean.

## Summary and decisions

Programme docs, baseline, findings, decisions, test matrix, status and Phase 0 report are recorded in this directory. Initial review identified payment-integrity observations in `src/lib/paypal-order.ts`, `src/lib/invoices.ts`, and `src/app/api/checkout/capture/route.ts`; see `FINDINGS.md`. Preview email destination configuration requires isolation review in `wrangler.jsonc`. No app changes, migration, merge, push or deployment occurred. No new environment variables were configured.

## Tests

Exact commands, environment, outcome and evidence are in `BASELINE.md` and `TEST-MATRIX.md`. `npm ci` failed with Windows EPERM on a locked native dependency; aggregate checks then failed to launch ESLint. Targeted invoice security and PayPal sandbox checks passed. Public smoke and structured data subchecks passed (133 URLs, 9/9 types); Lighthouse could not start due to missing `chrome-launcher`.

## Risks/blockers

- Do not discard/stash current user changes. Safely establish the requested branch or separate worktree before implementation; obtain user/owner direction if necessary.
- Repair the local dependency installation lock condition and rerun baseline checks; do not claim skipped checks passed.
- Payment source observations need Phase 1 independent verification and tests.
- Preview destination config includes production recipients and must be isolated before preview email testing.
- Preserve owner decision blockers for text-back/second-number charges and Spain EUR prices.

## Next agent instructions

Phase 1 is next but should not begin until the baseline/branch blocker is addressed. Independently inspect checkout creation, capture, invoice routes, storage and tests. Prioritize exact invoice/order/amount/currency/payee/capture associations, duplicate-state protection, signing transition for issued links, and whether transactional persistence is required. Do not migrate production data, deploy, or alter commercial policy. Run targeted checks first after a reproducible install.

Read `PROGRAM.md`, `STATUS.md`, `BASELINE.md`, `FINDINGS.md`, `DECISIONS.md`, `TEST-MATRIX.md`, and `HANDOFF.md`. Verify the previous phase's actual Git diff and test results. Continue only with Phase 01. Do not repeat completed work. Do not advance beyond your assigned phase. Preserve all non-negotiable project constraints.

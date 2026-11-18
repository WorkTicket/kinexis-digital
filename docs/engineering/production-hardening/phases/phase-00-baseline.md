# Phase 00 — Baseline and setup

**Date:** 2026-11-15  
**Status:** INCOMPLETE / BLOCKED

## Git state

- Start/end commit: `c43041d7773c023e778d6f828bd7833620212b2d`
- Current branch: `main`; hardening branch not created due to existing dirty worktree.
- Pre-existing changes preserved: `docs/CURRENT-TASK.md`, `e2e/smoke.spec.ts`, untracked `intelligence/`.
- Added files: `docs/engineering/production-hardening/PROGRAM.md`, `STATUS.md`, `BASELINE.md`, `FINDINGS.md`, `DECISIONS.md`, `TEST-MATRIX.md`, `HANDOFF.md`, and this report.
- No commit; worktree remains dirty.

## Work completed

Inspected the repository instructions, architecture/workflow docs, package scripts, CI workflow, Wrangler bindings, PayPal order helper, invoice storage/signing, and capture route. The configured architecture and baseline risks are recorded in `BASELINE.md` and `FINDINGS.md`. No application code changed.

## Verification

See `BASELINE.md` and `TEST-MATRIX.md` for exact commands and results. Key evidence: `npm ci` failed with Windows EPERM on a locked native module; `npm run check` and `npm run verify` could not start ESLint; targeted invoice security passed; configured PayPal sandbox negative and positive capture tests passed; production read-only smoke checked 133 URLs with zero failures and structured data passed 9/9, while Lighthouse did not run because `chrome-launcher` was unavailable.

## Risks and blockers

- Worktree branch safety: current user changes must remain intact. No branch switch/create was attempted.
- Dependency install issue blocks a complete repeatable baseline.
- Payment/source findings require Phase 1 review; preview email config must be isolated before sending from preview.
- Commercial owner decisions on text-back/second-number charges and EUR pricing remain open.

## Next action

Safely arrange the hardening branch/worktree without touching current user changes, fix the locked dependency install condition, rerun baseline gates, then start Phase 1 only. Do not deploy or perform production migrations.

Read `PROGRAM.md`, `STATUS.md`, `BASELINE.md`, `FINDINGS.md`, `DECISIONS.md`, `TEST-MATRIX.md` and `HANDOFF.md`. Verify the previous phase's actual Git diff and test results. Continue only with Phase 01. Do not repeat completed work. Do not advance beyond your assigned phase. Preserve all non-negotiable project constraints.

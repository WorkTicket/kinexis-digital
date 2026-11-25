# Phase 00 — Baseline and setup

**Date:** 2026-11-15  
**Status:** COMPLETE (verification failures documented as baseline)

## Git state

- Start/end commit: `c43041d7773c023e778d6f828bd7833620212b2d`
- Current branch: `codex/production-hardening-v1` in an isolated worktree created from recorded `main` HEAD.
- Pre-existing changes preserved: `docs/CURRENT-TASK.md`, `e2e/smoke.spec.ts`, untracked `intelligence/`.
- Added files: `docs/engineering/production-hardening/PROGRAM.md`, `STATUS.md`, `BASELINE.md`, `FINDINGS.md`, `DECISIONS.md`, `TEST-MATRIX.md`, `HANDOFF.md`, and this report. Generated ignored `cloudflare-env.d.ts` with Wrangler typegen.
- No commit; isolated worktree has untracked documentation only.

## Work completed

Inspected the repository instructions, architecture/workflow docs, package scripts, CI workflow, Wrangler bindings, PayPal order helper, invoice storage/signing, and capture route. The configured architecture and baseline risks are recorded in `BASELINE.md` and `FINDINGS.md`. No application code changed.

## Verification

See `BASELINE.md` and `TEST-MATRIX.md` for exact commands and results. In the isolated worktree, install, aggregate check, invoice security, public smoke (133 URLs), structured data (9/9) and Lighthouse budgets passed. Full verify is partial: live PayPal sandbox skipped for unavailable credentials; Playwright had 21 pass / 4 fail / 3 skip. Failures and the initial typegen prerequisite are documented. The original checkout's locked-module install issue did not recur in isolation.

## Risks and blockers

- Four existing E2E failures remain for later triage; live PayPal sandbox unavailable in this isolated worktree.
- Payment/source findings require Phase 1 review; preview email config must be isolated before sending from preview.
- Commercial owner decisions on text-back/second-number charges and EUR pricing remain open.

## Next action

Proceed to Phase 1 only in the isolated hardening worktree/branch. Do not modify the original checkout's changes, deploy, or perform production migrations.

Read `PROGRAM.md`, `STATUS.md`, `BASELINE.md`, `FINDINGS.md`, `DECISIONS.md`, `TEST-MATRIX.md` and `HANDOFF.md`. Verify the previous phase's actual Git diff and test results. Continue only with Phase 01. Do not repeat completed work. Do not advance beyond your assigned phase. Preserve all non-negotiable project constraints.

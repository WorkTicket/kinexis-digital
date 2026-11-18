# Programme status

**Current phase:** Phase 0 — baseline and setup  
**Status:** INCOMPLETE / BLOCKED on clean dependency install and hardening-branch setup. Baseline observations and documentation are recorded.  
**Current branch/HEAD:** `main` / `c43041d7773c023e778d6f828bd7833620212b2d`.  
**Production:** untouched; no deployment performed.

## Completed

- Recorded initial dirty worktree and preserved it.
- Inspected package scripts, CI, Cloudflare configuration, architecture and representative payment/invoice implementation.
- Attempted all requested baseline commands; results in `BASELINE.md` and `TEST-MATRIX.md`.
- Created programme memory documents and Phase 0 report.

## Blockers / next actions

1. Resolve the Windows locked native module preventing `npm ci`; rerun clean baseline checks without deleting or overwriting user data.
2. Establish `codex/production-hardening-v1` from the intended baseline only after owner/user confirms safe handling of the existing dirty changes (or a safe worktree is created). Do not stash/discard automatically.
3. Phase 1 should independently inspect checkout creation/capture, invoice routes/storage and signing, then prove/repair payment invariants with tests. Do not treat current baseline sandbox checks as proof of invoice-payment integrity.

**Completed phases:** none (Phase 0 documentation started; formal acceptance blocked).  
**Blocked phases:** Phase 0 acceptance; subsequent phases not started.

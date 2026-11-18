# Decisions and constraints

| Decision | Status | Rationale / alternatives |
|---|---|---|
| Preserve initial dirty worktree; do not switch/create branch over it | Phase 0 decision | `main` contains pre-existing modified and untracked files. No stash/discard was authorized. Establish branch safely after owner/user direction or through a separate worktree. |
| No app-code changes in Phase 0 | Required | Phase 0 establishes baseline only. |
| No production deployment or mutation | Required | Programme explicitly requires owner approval. Phase 0 ran only read-only public route/structured-data/Lighthouse checks. |
| Invoice/payment findings remain candidates for Phase 1 confirmation | Pending | Initial code observations identify missing checks in the inspected path, but full route/creation flow and regression suite need inspection. |
| Invoice-signing secret must be dedicated; preserve issued links during rotation | Required by programme; implementation undecided | Phase 1 must design a safe versioned transition; do not silently invalidate existing links or reuse PayPal credentials. |
| Transactional ledger selection | Pending | Phase 1 must assess whether KV guarantees suffice, propose schema/import/reconciliation/rollback if not, and obtain approval before any production migration. |
| Commercial policy unchanged; text-back/second-number and Spain pricing require owner confirmation | Owner decision required | Do not infer catalog values or convert prices. |

Never record secret values in these documents.

# Programme status

**Current phase:** Phase 4 — Spanish / commercial consistency  
**Status:** Phases 2–4 on stacked PRs #8 → #9 → Phase 4 branch. Continue without waiting. **Do not merge to `main` without owner approval** (deploys).  
**Production:** `a32c39b` / Worker `87e26f40-6f60-4c83-95c9-33d56e483705`

| Phase | PR / branch | State |
|---|---|---|
| 1 docs evidence | #7 | CI green; unmerged (avoid deploy) |
| 2 route tests | #8 | Open |
| 3 CI + preview email | #9 | Open (stacked on #8) |
| 4 Spanish/commercial | this branch | Complete locally |
| 5–9 + chatbot | pending | Next: Phase 5 security + Conferbot |

## Owner blockers

1. Merges to `main` = production deploy.
2. `CONTACT_PREVIEW_TO` before preview form mail.
3. Conferbot Starter upgrade + secrets + LEAD_DB later.
4. content.ts text-back footnote `$1` vs `$97` policy ambiguity (not rewritten).
5. Live PayPal signed webhook SUCCESS still open.

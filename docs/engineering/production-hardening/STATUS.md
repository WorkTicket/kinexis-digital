# Programme status

**Current phase:** Phase 5 — security + Conferbot (complete on branch)  
**Status:** Stacked PRs #8 → #9 → #11 → Phase 5 branch. Flags off. No merge to `main` (deploys).  
**Production:** `a32c39b` / Worker `87e26f40-6f60-4c83-95c9-33d56e483705`

| Phase | PR | State |
|---|---|---|
| 1 docs | #7 | CI green; unmerged |
| 2 tests | #8 | Open |
| 3 CI/preview email | #9 | Open |
| 4 Spanish/commercial | #11 | Open |
| 5 security + Conferbot | this branch | Complete locally; PR next |
| 6–9 | pending | Continue |

## Owner blockers

1. Merges to `main` deploy production.
2. `CONTACT_PREVIEW_TO` for preview mail.
3. Conferbot Starter upgrade, LEAD_DB create/migrate, secrets, webhook register — flags stay off until approved.
4. content.ts text-back footnote `$1` vs `$97` ambiguity.
5. Live PayPal signed webhook SUCCESS still open.

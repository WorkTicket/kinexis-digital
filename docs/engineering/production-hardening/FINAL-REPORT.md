# Production hardening — final report

**Date:** 2026-11-15  
**Status:** Stack #7–#16 merged to `main`. Conferbot/lead flags stay **OFF**. Placeholder `LEAD_DB` bindings removed. **Production is not live from this merge** — deploy is manual (`npm run deploy` / `scripts/deploy-production.mjs`) from the owner's PC.

## Merge commits on `main`

| What | SHA |
|---|---|
| Phase 1 docs (#7) | `3433797863d2b398893204bb4114182b8fe88273` |
| Stack tip #8–#16 (merge of #16) | `8b78de178a573dd0fe9abfbae02466ad55ee352f` |

`main` HEAD after the stack landed: **`8b78de178a573dd0fe9abfbae02466ad55ee352f`**. A follow-up docs PR may advance HEAD; use `git rev-parse origin/main` before deploy.

## PR map

| Phase | PR | Notes |
|---|---|---|
| 1 live evidence docs | [#7](https://github.com/WorkTicket/kinexis-digital/pull/7) | Merged |
| 2 route tests | [#8](https://github.com/WorkTicket/kinexis-digital/pull/8) | Merged |
| 3 CI + preview email | [#9](https://github.com/WorkTicket/kinexis-digital/pull/9) | Merged |
| 4 Spanish/commercial | [#11](https://github.com/WorkTicket/kinexis-digital/pull/11) | Merged |
| 5 Conferbot security | [#12](https://github.com/WorkTicket/kinexis-digital/pull/12) | Merged |
| 6 perf/a11y | [#13](https://github.com/WorkTicket/kinexis-digital/pull/13) | Merged |
| 7 repo docs | [#14](https://github.com/WorkTicket/kinexis-digital/pull/14) | Merged |
| 8 staging QA | [#15](https://github.com/WorkTicket/kinexis-digital/pull/15) | Merged |
| 9 release readiness | [#16](https://github.com/WorkTicket/kinexis-digital/pull/16) | Merged; includes LEAD_DB binding removal |

## Deploy model (corrected)

- **Not connected:** Cloudflare Workers Builds for Worker `kinexis-digital`. `wrangler deployments list` shows only manual CLI deploys (prior live: `87e26f40-…`, secret-change `a610e135-…`).
- **How to ship:** on the owner PC, from current `main`: `npm run deploy` → `scripts/deploy-production.mjs`.
- Merging to `main` only updates git + GitHub Actions validate; it does **not** publish the Worker.

## Conferbot / LEAD_DB (post-ship)

Bot ID `6afa0edabbad567d637ee189` (public). Widget and backend remain **off** until flags are flipped after a separate written approval.

**This ship does not create LEAD_DB, apply lead migrations, set Conferbot secrets, upgrade Conferbot, or flip flags.**

Before enabling integration:

1. Create D1 databases (suggested names `kinexis-lead-intel` / `kinexis-lead-intel-preview`).
2. Add `LEAD_DB` bindings to `wrangler.jsonc` with the **real** ids (never placeholders) and `migrations_dir: "migrations-lead"` on that binding only.
3. Apply `migrations-lead/0001_conferbot_lead_intel.sql` to those databases (`wrangler d1 migrations apply` against LEAD_DB / preview env).
4. Set `CONFERBOT_WEBHOOK_SECRET` (and related vars) via `wrangler secret put`.
5. Upgrade Conferbot to Starter; register webhook (preview first).
6. Flip flags only with a separate written approval: `NEXT_PUBLIC_CONFERBOT_ENABLED`, `CONFERBOT_INTEGRATION_ENABLED`, `CONFERBOT_NOTIFY_ENABLED`.

## Owner action list (remaining)

1. Pull current `main`, run `npm run deploy` from the owner PC, note the new Worker version, then smoke (home 200, unsigned PayPal webhook 400, Conferbot unsigned 503 while flags off, no `conferbot-js` / `cdn.conferbot.com` on the homepage).
2. Set `CONTACT_PREVIEW_TO` (+ allowlist) when using preview form mail.
3. Later: LEAD_DB create + bind + `migrations-lead` apply (see above).
4. Later: Conferbot Starter + webhook secret + register URL.
5. Decide scoring weights marked OWNER_DECISION_REQUIRED.
6. Optional: `content.ts` text-back `$1` vs `$97` footnote.
7. Wait for first real PayPal payment for signed live webhook SUCCESS — do not manufacture a live charge.
8. Separate written approval before any Conferbot/lead flag flip.

## Test evidence policy

Every phase records exact commands. **NOT RUN is never PASS.** See `TEST-MATRIX.md`.

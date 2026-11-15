# Production hardening — final report

**Date:** 2026-11-15  
**Status:** Owner release approved for merge/deploy with all Conferbot/lead flags **OFF**. Placeholder `LEAD_DB` bindings removed so Workers Builds can ship safely.

## PR map

| Phase | PR | Notes |
|---|---|---|
| 1 live evidence docs | [#7](https://github.com/WorkTicket/kinexis-digital/pull/7) | |
| 2 route tests | [#8](https://github.com/WorkTicket/kinexis-digital/pull/8) | |
| 3 CI + preview email | [#9](https://github.com/WorkTicket/kinexis-digital/pull/9) | |
| 4 Spanish/commercial | [#11](https://github.com/WorkTicket/kinexis-digital/pull/11) | |
| 5 Conferbot security | [#12](https://github.com/WorkTicket/kinexis-digital/pull/12) | |
| 6 perf/a11y | [#13](https://github.com/WorkTicket/kinexis-digital/pull/13) | |
| 7 repo docs | [#14](https://github.com/WorkTicket/kinexis-digital/pull/14) | |
| 8 staging QA | [#15](https://github.com/WorkTicket/kinexis-digital/pull/15) | |
| 9 release readiness | [#16](https://github.com/WorkTicket/kinexis-digital/pull/16) | Includes LEAD_DB binding removal |

## Conferbot / LEAD_DB (post-ship)

Bot ID `6afa0edabbad567d637ee189` (public). Widget and backend remain **off** after this deploy.

**This ship does not create LEAD_DB, apply lead migrations, set Conferbot secrets, upgrade Conferbot, or flip flags.**

Before enabling integration:

1. Create D1 databases (suggested names `kinexis-lead-intel` / `kinexis-lead-intel-preview`).
2. Add `LEAD_DB` bindings to `wrangler.jsonc` with the **real** ids (never placeholders) and `migrations_dir: "migrations-lead"` on that binding only.
3. Apply `migrations-lead/0001_conferbot_lead_intel.sql` to those databases (`wrangler d1 migrations apply` against LEAD_DB / preview env).
4. Set `CONFERBOT_WEBHOOK_SECRET` (and related vars) via `wrangler secret put`.
5. Upgrade Conferbot to Starter; register webhook (preview first).
6. Flip flags only with a separate written approval: `NEXT_PUBLIC_CONFERBOT_ENABLED`, `CONFERBOT_INTEGRATION_ENABLED`, `CONFERBOT_NOTIFY_ENABLED`.

## Owner action list (remaining)

1. After this deploy: confirm Worker version + smoke (agent reports).
2. Set `CONTACT_PREVIEW_TO` (+ allowlist) when using preview form mail.
3. Later: LEAD_DB create + bind + `migrations-lead` apply (see above).
4. Later: Conferbot Starter + webhook secret + register URL.
5. Decide scoring weights marked OWNER_DECISION_REQUIRED.
6. Optional: `content.ts` text-back `$1` vs `$97` footnote.
7. Wait for first real PayPal payment for signed live webhook SUCCESS — do not manufacture a live charge.
8. Separate written approval before any Conferbot/lead flag flip.

## Test evidence policy

Every phase records exact commands. **NOT RUN is never PASS.** See `TEST-MATRIX.md`.

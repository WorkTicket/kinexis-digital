# Production hardening — final report

**Date:** 2026-11-15  
**Status:** Stack #7–#16 merged and production deployed. **Conferbot widget is live on the free plan.** Webhook integration + notify stay **OFF** (Starter required). Placeholder `LEAD_DB` bindings remain omitted. Deploy is manual (`npm run deploy` / `scripts/deploy-production.mjs`).

## Production release evidence (owner PC)

### Initial flags-off ship

| Field | Value |
|---|---|
| Deployed git SHA | `8b78de178a573dd0fe9abfbae02466ad55ee352f` (stack tip #16) |
| Command | `npm run deploy` (all checks inside it passed) |
| Worker version | `4e7ffb77-d236-47b8-a6c6-5a196add4f66` |
| Rollback target | `87e26f40` |
| Pages smoke (www + apex) | `/`, `/es`, `/pay`, `/contact`, `/services`, `/pricing` → **200** |
| Unsigned PayPal webhook POST | **400** |
| Conferbot webhook (flags off) | **404** |
| Homepage Conferbot HTML | none |
| `search:notify` | OK — IndexNow **131** URLs |

### Widget-on ship (free plan, owner-approved)

| Field | Value |
|---|---|
| Deployed git SHA | `8b78de178a573dd0fe9abfbae02466ad55ee352f` |
| Worker version | `19235f28-4018-4bbe-96c5-ecc0216b915c` |
| Build flags used | `NEXT_PUBLIC_CONFERBOT_ENABLED=1`, `NEXT_PUBLIC_CONFERBOT_BOT_ID=6afa0edabbad567d637ee189` (then via gitignored `.env.local`; next ships use committed `.env.production`) |
| Runtime flags | `CONFERBOT_INTEGRATION_ENABLED` **OFF**, `CONFERBOT_NOTIFY_ENABLED` **OFF** |
| Smoke | `/`, `/es`, `/pay` → **200**; bot id in client chunk; CSP lists `cdn.conferbot.com` / `wdt.conferbot.com` |

## Merge commits on `main`

| What | SHA |
|---|---|
| Phase 1 docs (#7) | `3433797863d2b398893204bb4114182b8fe88273` |
| Stack tip #8–#16 (merge of #16) | `8b78de178a573dd0fe9abfbae02466ad55ee352f` |
| Manual-deploy docs correction (#17) | `535e1fdb4812cc232233d8e5665b8f6b1fbdc268` |
| Release evidence docs (#18) | `9e4aaa93960a640d3d37634864e724c942007e3e` |

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
| Deploy-model docs | [#17](https://github.com/WorkTicket/kinexis-digital/pull/17) | Merged; Workers Builds not connected |
| Release evidence | [#18](https://github.com/WorkTicket/kinexis-digital/pull/18) | Merged |

## Deploy model

- **Not connected:** Cloudflare Workers Builds for Worker `kinexis-digital`.
- **How to ship:** owner PC, from the intended `main` SHA: `npm run deploy` → `scripts/deploy-production.mjs`.
- Merging to `main` only updates git + GitHub Actions validate; it does **not** publish the Worker.
- **Widget build flags:** committed `.env.production` (public only). CI sets `NEXT_PUBLIC_CONFERBOT_ENABLED=0` so contract checks and e2e stay off-by-default.

## Conferbot / LEAD_DB

Bot ID `6afa0edabbad567d637ee189` (public). **Widget is on** (free plan). **Webhook backend and notify remain off** until Starter + separate approval.

**Not done in this programme ship:** create LEAD_DB, apply lead migrations, set Conferbot webhook secrets, upgrade Conferbot, or flip integration/notify flags.

Before enabling webhook integration:

1. Create D1 databases (suggested names `kinexis-lead-intel` / `kinexis-lead-intel-preview`).
2. Add `LEAD_DB` bindings to `wrangler.jsonc` with the **real** ids (never placeholders) and `migrations_dir: "migrations-lead"` on that binding only.
3. Apply `migrations-lead/0001_conferbot_lead_intel.sql` to those databases (`wrangler d1 migrations apply` against LEAD_DB / preview env).
4. Set `CONFERBOT_WEBHOOK_SECRET` (and related vars) via `wrangler secret put`.
5. Upgrade Conferbot to Starter; register webhook (preview first).
6. Flip `CONFERBOT_INTEGRATION_ENABLED` / `CONFERBOT_NOTIFY_ENABLED` only with a separate written approval.

## Owner action list (remaining)

1. ~~Deploy + smoke (flags off)~~ — done.
2. ~~Widget on (free plan)~~ — done (Worker `19235f28…`); persistent `.env.production` on `main` for next builds.
3. Set `CONTACT_PREVIEW_TO` (+ allowlist) when using preview form mail.
4. Later: LEAD_DB create + bind + `migrations-lead` apply (see above).
5. Later: Conferbot Starter + webhook secret + register URL.
6. Decide scoring weights marked OWNER_DECISION_REQUIRED.
7. Optional: `content.ts` text-back `$1` vs `$97` footnote.
8. Wait for first real PayPal payment for signed live webhook SUCCESS — do not manufacture a live charge.
9. Separate written approval before integration/notify flag flips.

## Test evidence policy

Every phase records exact commands. **NOT RUN is never PASS.** See `TEST-MATRIX.md`.

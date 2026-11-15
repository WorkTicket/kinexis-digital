# Phase 8 preview QA runbook

Owner-operated. Agent does not deploy, upgrade Conferbot, or set production secrets.

## Commands (approve each)

```powershell
# From a clean checkout of the approved PR tip
npm run check
npm run build:worker
npm run deploy:preview
```

Then set preview vars/secrets in the Cloudflare dashboard or via `wrangler secret put --env preview` (never paste values into git).

See `phases/phase-08-staging-qa.md` for the full isolation and Conferbot Starter checklist.

## LEAD_DB (later — not part of the flags-off production ship)

Placeholder `LEAD_DB` bindings were removed from `wrangler.jsonc` so manual `npm run deploy` / `deploy:preview` do not fail on missing D1 ids. When ready:

1. Create preview D1 (e.g. `kinexis-lead-intel-preview`).
2. Add a real `LEAD_DB` binding under `env.preview` with `migrations_dir: "migrations-lead"`.
3. Apply: `npx wrangler d1 migrations apply <database_name> --env preview` (never against `INVOICE_DB`).
4. Keep `CONFERBOT_INTEGRATION_ENABLED=0` until webhook secret + Starter registration are ready.

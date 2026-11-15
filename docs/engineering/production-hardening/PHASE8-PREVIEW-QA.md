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

# CURRENT-TASK.md

## Goal
Meta Pixel `2080705549212381` on the site for ad conversion tracking.

## Status
Pixel ID set in `.env.local`, `.dev.vars`, and Worker secret `NEXT_PUBLIC_META_PIXEL_ID`

## Completed
- Meta Pixel PageView + Lead (+ Contact on tel)
- Live ID in local env files
- `npx wrangler secret put NEXT_PUBLIC_META_PIXEL_ID` uploaded to Worker `kinexis-digital`
- Deploy preflight checks Pixel ID; README lists it as a Builds var

## Still open
- Workers Builds **Build variables** dashboard entry (CI) if deploys go through Cloudflare Builds — same name/value
- Deploy + Meta Events Manager Test Events (PageView, Lead)

## Next action
Deploy (local deploy already has `.env.local` for inlining). For CI Builds, add the same build variable in the Cloudflare dashboard if not already mirrored.

# CURRENT-TASK.md

## Goal
Land KINEXIS Intelligence foundation against live Supabase schema. No production deploy.

## Status
Supabase project live; schema applied; code landed under `intelligence/`. **Site widget not mounted yet.** No Worker/KV deploy yet.

## Done this phase
- `intelligence/sql/001_init.sql` (applied schema — source of truth)
- `intelligence/docs/SUPABASE.md` + `intelligence/README.md`
- Worker rewritten for applied columns (`token_hash`, `business_name`, `interest`, `consent`, score in `metadata`)
- Widget + admin preview (admin is local-only)
- `intelligence/worker/.dev.vars` created (gitignored) with URL + ADMIN_API_KEY + service_role

## Unfinished
- Create Cloudflare KV `RATE_LIMIT` and put IDs in `wrangler.toml`
- `npm install` + `npm run check` / `npm run dev` in `intelligence/worker`
- Mount widget behind `NEXT_PUBLIC_KI_API_URL` + CSP `connect-src` (feature branch)
- Restyle widget to KINEXIS tokens; expand knowledge base; production admin Auth/MFA
- Resend (or reuse Mailgun) alerts optional

## Blockers for you
1. Confirm service_role is in `intelligence/worker/.dev.vars` (never commit)
2. Free Supabase pauses after ~1 week idle — upgrade before live traffic
3. Approve later preview Worker deploy separately from main site

## Next action
Create RATE_LIMIT KV, run Worker locally, smoke `/session` + `/chat` against localhost origin. Do not mount on production site yet.

# KINEXIS Intelligence

**Status: development foundation — not deployed, not production-ready.**

Separate Cloudflare Worker API + React chat widget + SQL schema + internal admin preview for the KINEXIS Digital site. Does not modify production until explicitly wired and approved.

## Layout

```
intelligence/
├── sql/001_init.sql          # Applied to Supabase (source of truth)
├── docs/SUPABASE.md          # Project URL, verified access, secret steps
├── worker/                   # Cloudflare Worker (Workers AI + Supabase)
├── widget/                   # React chat widget (mount later behind env flag)
└── admin/AdminLeads.tsx      # Dev-only preview — do NOT ship publicly
```

## Already done

- Supabase project `kinexis-intelligence` (US East) with schema + RLS
- Worker code written against `sql/001_init.sql` columns
- Local secrets template: `worker/.dev.vars.example`
- Real local secrets: `worker/.dev.vars` (gitignored)

## Next (local)

1. Confirm `intelligence/worker/.dev.vars` has a real `SUPABASE_SECRET_KEY` (service_role).
2. `cd intelligence/worker && npm install`
3. Create KV: `npx wrangler kv namespace create RATE_LIMIT` (and preview) → put IDs in `wrangler.toml`
4. `npm run check` then `npm run dev`
5. Smoke: `GET /rest/v1/ki_sessions?select=id&limit=1` with service role (see `docs/SUPABASE.md`)

## Site wiring (later — feature branch)

- Mount widget from `DocumentShell` only when `NEXT_PUBLIC_KI_API_URL` is set
- Add Worker origin to CSP `connect-src` in `next.config.ts`
- Restyle widget to KINEXIS design tokens
- Keep admin off the public site until Auth/MFA + server proxy

## Security

- Never commit `.dev.vars` or the service_role key
- Never put Supabase secrets in `NEXT_PUBLIC_*` or the widget
- Origin checks ≠ auth; session tokens are visitor-scoped
- Admin browser API key is development-only

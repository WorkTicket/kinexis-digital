# KINEXIS Intelligence: Supabase setup (done)

## Project
- Name: kinexis-intelligence
- Org: Kinexis (phiwjsytrdpfqbvnspcf), Free plan, $0/month
- Ref: sxqvywghxzyboucsixtc
- Region: us-east-1 (East US)
- URL: https://sxqvywghxzyboucsixtc.supabase.co
- Dashboard: https://supabase.com/dashboard/project/sxqvywghxzyboucsixtc
- Created: 2026-11-15

## Schema
Migration `001_init` was applied from `sql/001_init.sql` (included here). This is the source of truth.
Commit it to the repo as `intelligence/sql/001_init.sql`, and write the Worker against these columns.

Tables:
- **ki_sessions**: id uuid pk; token_hash text unique; visitor_id; page_url; referrer; utm jsonb; user_agent; ip_hash; country; locale; status (active|ended|blocked); message_count int; metadata jsonb; created_at; last_seen_at; ended_at.
- **ki_messages**: id uuid pk; session_id → ki_sessions (cascade); role (user|assistant|system|tool); content; model; tokens_in; tokens_out; latency_ms; metadata jsonb; created_at.
- **ki_leads**: id uuid pk; session_id → ki_sessions (set null); name; email; phone; business_name; website; industry; city; state; interest; plan_interest; notes; source (default 'chat_widget'); status (new|contacted|qualified|won|lost|spam); consent bool; metadata jsonb; created_at; updated_at (set by trigger).
- **ki_events**: id bigint identity pk; session_id → ki_sessions (cascade); event_type; payload jsonb; created_at.

## Access, verified
- RLS is enabled on all 4 tables, with no policies on purpose.
- anon and authenticated have no table privileges (the verify query returned 0 rows).
- service_role has full access and bypasses RLS. Only the Worker uses it.
- Supabase's security advisor shows only the INFO-level "RLS enabled, no policy" note on the 4 tables. That's expected for this design.

## Secrets (values are in `kinexis-intelligence.dev.vars`, not in this doc)
- SUPABASE_URL
- SUPABASE_SECRET_KEY: the service role key
- ADMIN_API_KEY: a 64-hex random value generated for you

Production: run `cd intelligence/worker && npx wrangler secret put SUPABASE_URL` (and the same for SUPABASE_SECRET_KEY and ADMIN_API_KEY).
Local: copy the dev.vars file to `intelligence/worker/.dev.vars`, make sure it's gitignored, and never commit it.

Smoke test, server-side only:
curl "$SUPABASE_URL/rest/v1/ki_sessions?select=id&limit=1" -H "apikey: $SUPABASE_SECRET_KEY" -H "Authorization: Bearer $SUPABASE_SECRET_KEY"
This should return 200 and [].

## Not done yet (by design)
These are left for later: visitor auth, anon policies, a retention job, and backups beyond the Free plan defaults. The Free plan pauses a project after about a week of inactivity, so upgrade before you take live traffic.

-- KINEXIS Intelligence: initial schema (service-role only access)
create extension if not exists pgcrypto;

create table if not exists public.ki_sessions (
  id uuid primary key default gen_random_uuid(),
  token_hash text unique,
  visitor_id text,
  page_url text,
  referrer text,
  utm jsonb not null default '{}'::jsonb,
  user_agent text,
  ip_hash text,
  country text,
  locale text,
  status text not null default 'active' check (status in ('active','ended','blocked')),
  message_count integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  ended_at timestamptz
);

create table if not exists public.ki_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.ki_sessions(id) on delete cascade,
  role text not null check (role in ('user','assistant','system','tool')),
  content text not null,
  model text,
  tokens_in integer,
  tokens_out integer,
  latency_ms integer,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.ki_leads (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.ki_sessions(id) on delete set null,
  name text,
  email text,
  phone text,
  business_name text,
  website text,
  industry text,
  city text,
  state text,
  interest text,
  plan_interest text,
  notes text,
  source text not null default 'chat_widget',
  status text not null default 'new' check (status in ('new','contacted','qualified','won','lost','spam')),
  consent boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ki_events (
  id bigint generated always as identity primary key,
  session_id uuid references public.ki_sessions(id) on delete cascade,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists ki_messages_session_created_idx on public.ki_messages (session_id, created_at);
create index if not exists ki_leads_session_idx on public.ki_leads (session_id);
create index if not exists ki_leads_created_idx on public.ki_leads (created_at desc);
create index if not exists ki_leads_email_idx on public.ki_leads (lower(email));
create index if not exists ki_events_session_idx on public.ki_events (session_id);
create index if not exists ki_events_type_created_idx on public.ki_events (event_type, created_at desc);
create index if not exists ki_sessions_last_seen_idx on public.ki_sessions (last_seen_at desc);

create or replace function public.ki_set_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists ki_leads_updated_at on public.ki_leads;
create trigger ki_leads_updated_at before update on public.ki_leads
  for each row execute function public.ki_set_updated_at();

-- RLS on, no policies: anon/authenticated get nothing; service_role bypasses RLS.
alter table public.ki_sessions enable row level security;
alter table public.ki_messages enable row level security;
alter table public.ki_leads    enable row level security;
alter table public.ki_events   enable row level security;

revoke all on public.ki_sessions, public.ki_messages, public.ki_leads, public.ki_events from anon, authenticated;
revoke all on sequence public.ki_events_id_seq from anon, authenticated;
revoke execute on function public.ki_set_updated_at() from public, anon, authenticated;

grant all on public.ki_sessions, public.ki_messages, public.ki_leads, public.ki_events to service_role;
grant usage, select on sequence public.ki_events_id_seq to service_role;

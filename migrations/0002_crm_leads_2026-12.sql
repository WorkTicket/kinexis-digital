-- PROMPT 4 / Dec 11 — CRM leads table (UNAPPLIED).
-- Do NOT run against production without Colton's explicit approval of this exact SQL + target DB.
-- Destination ASSUMPTION: Cloudflare D1 bound for marketing leads (or Excel/Command Center import of the same columns).
-- PII lives here; never mirror name/email/phone into GA4 event params.

CREATE TABLE IF NOT EXISTS crm_leads (
  id TEXT PRIMARY KEY,
  dedupe_key TEXT UNIQUE,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  -- Contact (PII)
  name TEXT,
  email TEXT,
  phone TEXT,
  business TEXT,
  -- Qualification / geo
  inquiry_type TEXT, -- preview | contact | audit | intake | strategy-call | call | referral | partner
  trade TEXT,
  city TEXT,
  state TEXT,
  has_website TEXT, -- yes | wants | no
  website_url TEXT,
  start_timeline TEXT,
  decision_maker TEXT, -- yes | helps | no
  -- Attribution (first touch; no PII)
  first_source TEXT,
  first_landing_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  referrer TEXT,
  consent_analytics INTEGER NOT NULL DEFAULT 0,
  consent_ads INTEGER NOT NULL DEFAULT 0,
  -- Pre-qual flags (see docs/LEAD_QUALITY_RULES.md) — hints until sales confirms on call
  flag_served_trade INTEGER NOT NULL DEFAULT 0,
  flag_decision_maker INTEGER NOT NULL DEFAULT 0,
  flag_has_or_wants_site INTEGER NOT NULL DEFAULT 0,
  flag_budget_fit TEXT NOT NULL DEFAULT 'unknown', -- 0 | 1 | unknown stored as text for clarity
  flag_start_within_90_days INTEGER NOT NULL DEFAULT 0,
  qualified_hint INTEGER NOT NULL DEFAULT 0,
  hint_score INTEGER NOT NULL DEFAULT 0,
  spam_suspect INTEGER NOT NULL DEFAULT 0,
  -- Sales outcomes
  qualified TEXT NOT NULL DEFAULT 'unknown', -- Y | N | unknown (call-confirmed)
  booked INTEGER NOT NULL DEFAULT 0,
  held INTEGER NOT NULL DEFAULT 0,
  won_lost TEXT, -- won | lost | null
  no_sale_reason TEXT,
  cash_collected_cents INTEGER,
  contracted_mrr_cents INTEGER,
  fulfilment_hours REAL,
  -- Provenance
  form_path TEXT,
  source_channel TEXT,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_crm_leads_created ON crm_leads (created_at);
CREATE INDEX IF NOT EXISTS idx_crm_leads_hint_score ON crm_leads (hint_score);
CREATE INDEX IF NOT EXISTS idx_crm_leads_qualified ON crm_leads (qualified);
CREATE INDEX IF NOT EXISTS idx_crm_leads_inquiry ON crm_leads (inquiry_type);

CREATE TABLE IF NOT EXISTS crm_touch_log (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL REFERENCES crm_leads(id),
  touched_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  channel TEXT, -- email | call | sms | other
  direction TEXT, -- outbound | inbound
  outcome TEXT,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_crm_touch_lead ON crm_touch_log (lead_id, touched_at);

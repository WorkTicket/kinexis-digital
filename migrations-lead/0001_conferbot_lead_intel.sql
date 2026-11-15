-- Conferbot lead intelligence (chat + leads + outbox).
-- Intended for the LEAD_DB binding (separate from INVOICE_DB).
-- Owner creates the D1 databases and applies this file; agents do not
-- wrangler-d1 against production. Do not put secrets in this file.
--
-- Privacy: webhook_events.payload_json must store redacted JSON only.
-- Strip visitor.ip, visitor.location (all), visitor.isp, and
-- visitor.device.userAgent before any persist or log.
--
-- Additive only: CREATE TABLE / INDEX. No DROP or destructive ALTER.

CREATE TABLE leads (
  id TEXT PRIMARY KEY CHECK (length(id) BETWEEN 8 AND 64),
  full_name TEXT,
  email TEXT,
  phone TEXT,
  business_name TEXT,
  website TEXT,
  industry TEXT,
  location TEXT,
  requested_services TEXT,
  project_description TEXT,
  budget_range TEXT,
  desired_start TEXT,
  decision_maker INTEGER CHECK (decision_maker IS NULL OR decision_maker IN (0, 1)),
  contact_consent INTEGER CHECK (contact_consent IS NULL OR contact_consent IN (0, 1)),
  marketing_consent INTEGER CHECK (marketing_consent IS NULL OR marketing_consent IN (0, 1)),
  lead_score INTEGER NOT NULL CHECK (lead_score BETWEEN 0 AND 100),
  lead_temperature TEXT NOT NULL CHECK (
    lead_temperature IN ('HOT', 'QUALIFIED', 'DEVELOPING', 'EARLY_STAGE')
  ),
  lead_status TEXT NOT NULL CHECK (
    lead_status IN ('new', 'contacted', 'proposal_requested', 'won', 'lost')
  ),
  score_reasons_json TEXT,
  score_override_json TEXT,
  scoring_config_version TEXT NOT NULL,
  source TEXT,
  landing_page TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  preferred_language TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  last_contacted_at TEXT
);

CREATE UNIQUE INDEX leads_email_unique
  ON leads (email)
  WHERE email IS NOT NULL;

CREATE UNIQUE INDEX leads_phone_unique
  ON leads (phone)
  WHERE phone IS NOT NULL;

CREATE INDEX leads_temperature_status_created
  ON leads (lead_temperature, lead_status, created_at);

CREATE TABLE conversations (
  id TEXT PRIMARY KEY CHECK (length(id) BETWEEN 8 AND 64),
  provider TEXT NOT NULL CHECK (provider = 'conferbot'),
  provider_session_id TEXT NOT NULL,
  provider_visitor_id TEXT,
  provider_bot_id TEXT,
  lead_id TEXT REFERENCES leads (id),
  channel TEXT,
  status TEXT,
  resolution TEXT,
  escalation_reason TEXT,
  ended_by TEXT,
  page_url TEXT,
  referrer TEXT,
  language TEXT,
  started_at TEXT,
  completed_at TEXT,
  duration_seconds INTEGER,
  turn_count INTEGER,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE (provider, provider_session_id)
);

CREATE INDEX conversations_lead_id ON conversations (lead_id);

CREATE TABLE messages (
  id TEXT PRIMARY KEY CHECK (length(id) BETWEEN 8 AND 64),
  conversation_id TEXT NOT NULL REFERENCES conversations (id),
  provider_message_id TEXT NOT NULL,
  sequence INTEGER,
  sender TEXT NOT NULL CHECK (sender IN ('visitor', 'bot', 'ai', 'agent')),
  sender_name TEXT,
  message_type TEXT,
  message_text TEXT,
  sent_at TEXT,
  created_at TEXT NOT NULL,
  UNIQUE (conversation_id, provider_message_id)
);

CREATE INDEX messages_conversation_sequence
  ON messages (conversation_id, sequence);

CREATE TABLE webhook_events (
  id TEXT PRIMARY KEY CHECK (length(id) BETWEEN 8 AND 64),
  provider TEXT NOT NULL CHECK (provider = 'conferbot'),
  event_type TEXT NOT NULL,
  provider_event_key TEXT NOT NULL,
  provider_session_id TEXT,
  payload_json TEXT NOT NULL,
  processing_status TEXT NOT NULL CHECK (
    processing_status IN ('received', 'processed', 'ignored', 'failed')
  ),
  processing_attempts INTEGER NOT NULL DEFAULT 1,
  last_error TEXT,
  received_at TEXT NOT NULL,
  processed_at TEXT,
  UNIQUE (provider, provider_event_key)
);

CREATE INDEX webhook_events_session ON webhook_events (provider_session_id);
CREATE INDEX webhook_events_status ON webhook_events (processing_status, received_at);

CREATE TABLE notification_outbox (
  id TEXT PRIMARY KEY CHECK (length(id) BETWEEN 8 AND 64),
  idempotency_key TEXT NOT NULL UNIQUE,
  lead_id TEXT REFERENCES leads (id),
  conversation_id TEXT REFERENCES conversations (id),
  notification_type TEXT NOT NULL CHECK (
    notification_type IN ('hot', 'qualified', 'handoff')
  ),
  recipient TEXT NOT NULL,
  delivery_status TEXT NOT NULL CHECK (
    delivery_status IN ('pending', 'sent', 'failed')
  ),
  attempts INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  created_at TEXT NOT NULL,
  sent_at TEXT
);

CREATE INDEX notification_outbox_status
  ON notification_outbox (delivery_status, created_at);

CREATE TABLE lead_activity (
  id TEXT PRIMARY KEY CHECK (length(id) BETWEEN 8 AND 64),
  lead_id TEXT NOT NULL REFERENCES leads (id),
  activity_type TEXT NOT NULL,
  description TEXT,
  actor_type TEXT,
  actor_id TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX lead_activity_lead_created
  ON lead_activity (lead_id, created_at);

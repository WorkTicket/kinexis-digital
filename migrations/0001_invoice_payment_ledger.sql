-- Invoice and payment ledger.
-- Apply only to a database the owner has created. Do not run this against
-- production from the application, and do not treat the placeholder binding
-- id in wrangler.jsonc as a provisioned database.
--
-- D1 executes each batch of statements in one transaction. Payment transitions
-- below are conditional UPDATEs plus a unique payment-event key so a replay
-- cannot mark an invoice paid twice or attach a second capture.

CREATE TABLE invoices (
  id TEXT PRIMARY KEY CHECK (length(id) BETWEEN 8 AND 64),
  amount_minor INTEGER NOT NULL CHECK (amount_minor BETWEEN 100 AND 7500000),
  currency TEXT NOT NULL CHECK (currency = 'USD'),
  description TEXT NOT NULL CHECK (length(description) BETWEEN 3 AND 127),
  status TEXT NOT NULL CHECK (status IN ('unpaid', 'paid', 'void')),
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  company TEXT,
  paypal_order_id TEXT,
  paypal_capture_id TEXT,
  paid_at TEXT
);

CREATE UNIQUE INDEX invoices_paypal_order_id_unique
  ON invoices (paypal_order_id)
  WHERE paypal_order_id IS NOT NULL;

CREATE UNIQUE INDEX invoices_paypal_capture_id_unique
  ON invoices (paypal_capture_id)
  WHERE paypal_capture_id IS NOT NULL;

CREATE TABLE payment_events (
  provider TEXT NOT NULL CHECK (provider = 'paypal'),
  event_id TEXT NOT NULL CHECK (length(event_id) BETWEEN 1 AND 128),
  event_type TEXT NOT NULL CHECK (length(event_type) BETWEEN 1 AND 64),
  invoice_id TEXT,
  paypal_order_id TEXT,
  paypal_capture_id TEXT,
  amount_minor INTEGER,
  currency TEXT,
  outcome TEXT NOT NULL CHECK (outcome IN ('applied', 'ignored', 'rejected')),
  received_at TEXT NOT NULL,
  PRIMARY KEY (provider, event_id)
);

CREATE INDEX payment_events_invoice_id ON payment_events (invoice_id);

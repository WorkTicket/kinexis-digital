/**
 * Conferbot D1 ledger — batch upserts with injectable test adapter (LEAD_TEST_MEMORY).
 * Mirrors invoice-ledger / invoices binding patterns. Web Crypto UUID only.
 */
import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { ConferbotEventType } from "@/lib/conferbot-config";

export type SqlValue = string | number | null;

export type SqlStatement = {
  sql: string;
  params: SqlValue[];
};

export type SqlBatchResult = {
  changes: number;
  rows: Array<Record<string, unknown>>;
};

export type ConferbotDatabase = {
  batch(statements: SqlStatement[]): Promise<SqlBatchResult[]>;
};

export type LedgerWrite =
  | { ok: true; idempotent: boolean }
  | { ok: false; reason: "storage" | "conflict" };

type BoundStatement = object;

type D1Like = {
  prepare(query: string): {
    bind(...values: Array<string | number | null>): BoundStatement;
  };
  batch(statements: BoundStatement[]): Promise<Array<{
    results?: Array<Record<string, unknown>>;
    meta?: { changes?: number };
  }>>;
};

let testDatabase: ConferbotDatabase | null = null;

function leadTestMemory() {
  return process.env.LEAD_TEST_MEMORY === "1";
}

/** Route tests inject a SQLite-like batch adapter. Production must never set LEAD_TEST_MEMORY. */
export function setConferbotTestDatabase(db: ConferbotDatabase | null) {
  if (!leadTestMemory()) {
    throw new Error("Conferbot test database requires LEAD_TEST_MEMORY=1");
  }
  testDatabase = db;
}

function cloudflareDatabase(): ConferbotDatabase | null {
  try {
    const env: unknown = getCloudflareContext().env;
    if (!env || typeof env !== "object" || !("LEAD_DB" in env)) return null;
    const binding = (env as { LEAD_DB?: unknown }).LEAD_DB;
    if (!binding || typeof binding !== "object" || !("prepare" in binding) || !("batch" in binding)) return null;
    const d1 = binding as D1Like;
    return {
      async batch(statements) {
        const bound = statements.map((statement) => d1.prepare(statement.sql).bind(...statement.params));
        const results = await d1.batch(bound);
        return results.map((result) => ({
          changes: result.meta?.changes ?? 0,
          rows: result.results ?? [],
        }));
      },
    };
  } catch {
    return null;
  }
}

export function conferbotDatabase(): ConferbotDatabase | null {
  if (leadTestMemory()) return testDatabase;
  return cloudflareDatabase();
}

function isConstraintError(error: unknown): boolean {
  return error instanceof Error && /unique|constraint/i.test(error.message);
}

async function runBatch(db: ConferbotDatabase, statements: SqlStatement[]): Promise<SqlBatchResult[] | null> {
  try {
    return await db.batch(statements);
  } catch (error) {
    if (isConstraintError(error)) throw error;
    return null;
  }
}

export function newEntityId(): string {
  return crypto.randomUUID();
}

export type WebhookEventRecord = {
  id: string;
  eventType: ConferbotEventType | string;
  providerEventKey: string;
  providerSessionId: string | null;
  payloadJson: string;
  processingStatus: "received" | "processed" | "ignored" | "failed";
  receivedAt: string;
  processedAt?: string | null;
  lastError?: string | null;
};

const INSERT_WEBHOOK = `
INSERT INTO webhook_events (
  id, provider, event_type, provider_event_key, provider_session_id,
  payload_json, processing_status, processing_attempts, last_error, received_at, processed_at
) VALUES (?1, 'conferbot', ?2, ?3, ?4, ?5, ?6, 1, ?7, ?8, ?9)
ON CONFLICT (provider, provider_event_key) DO NOTHING
`;

const SELECT_WEBHOOK = `
SELECT id, event_type, provider_event_key, processing_status
FROM webhook_events
WHERE provider = 'conferbot' AND provider_event_key = ?1
`;

export async function recordWebhookEvent(
  db: ConferbotDatabase,
  input: WebhookEventRecord,
): Promise<LedgerWrite & { eventId?: string; processingStatus?: WebhookEventRecord["processingStatus"] }> {
  try {
    const results = await runBatch(db, [
      {
        sql: INSERT_WEBHOOK,
        params: [
          input.id,
          input.eventType,
          input.providerEventKey,
          input.providerSessionId,
          input.payloadJson,
          input.processingStatus,
          input.lastError ?? null,
          input.receivedAt,
          input.processedAt ?? null,
        ],
      },
      { sql: SELECT_WEBHOOK, params: [input.providerEventKey] },
    ]);
    if (!results) return { ok: false, reason: "storage" };
    const inserted = results[0]?.changes ?? 0;
    const row = results[1]?.rows[0];
    const eventId = typeof row?.id === "string" ? row.id : input.id;
    const processingStatus = row?.processing_status;
    if (
      processingStatus !== "received" &&
      processingStatus !== "processed" &&
      processingStatus !== "ignored" &&
      processingStatus !== "failed"
    ) return { ok: false, reason: "storage" };
    if (inserted === 1) return { ok: true, idempotent: false, eventId, processingStatus };
    if (inserted === 0 && row) return { ok: true, idempotent: true, eventId, processingStatus };
    return { ok: false, reason: "conflict" };
  } catch (error) {
    return isConstraintError(error) ? { ok: false, reason: "conflict" } : { ok: false, reason: "storage" };
  }
}

export async function markWebhookEventProcessed(db: ConferbotDatabase, eventId: string, processedAt: string): Promise<LedgerWrite> {
  try {
    const results = await runBatch(db, [{
      sql: `UPDATE webhook_events
            SET processing_status = 'processed', processed_at = ?2, last_error = NULL
            WHERE id = ?1 AND processing_status = 'received'`,
      params: [eventId, processedAt],
    }]);
    if (!results) return { ok: false, reason: "storage" };
    return { ok: true, idempotent: (results[0]?.changes ?? 0) === 0 };
  } catch {
    return { ok: false, reason: "storage" };
  }
}

export type ConversationUpsert = {
  id: string;
  providerSessionId: string;
  providerVisitorId?: string | null;
  providerBotId?: string | null;
  leadId?: string | null;
  channel?: string | null;
  status?: string | null;
  resolution?: string | null;
  escalationReason?: string | null;
  endedBy?: string | null;
  pageUrl?: string | null;
  referrer?: string | null;
  language?: string | null;
  startedAt?: string | null;
  completedAt?: string | null;
  durationSeconds?: number | null;
  turnCount?: number | null;
  createdAt: string;
  updatedAt: string;
};

const UPSERT_CONVERSATION = `
INSERT INTO conversations (
  id, provider, provider_session_id, provider_visitor_id, provider_bot_id, lead_id,
  channel, status, resolution, escalation_reason, ended_by, page_url, referrer, language,
  started_at, completed_at, duration_seconds, turn_count, created_at, updated_at
) VALUES (
  ?1, 'conferbot', ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19
)
ON CONFLICT (provider, provider_session_id) DO UPDATE SET
  provider_visitor_id = COALESCE(excluded.provider_visitor_id, conversations.provider_visitor_id),
  provider_bot_id = COALESCE(excluded.provider_bot_id, conversations.provider_bot_id),
  lead_id = COALESCE(excluded.lead_id, conversations.lead_id),
  channel = COALESCE(excluded.channel, conversations.channel),
  status = COALESCE(excluded.status, conversations.status),
  resolution = COALESCE(excluded.resolution, conversations.resolution),
  escalation_reason = COALESCE(excluded.escalation_reason, conversations.escalation_reason),
  ended_by = COALESCE(excluded.ended_by, conversations.ended_by),
  page_url = COALESCE(excluded.page_url, conversations.page_url),
  referrer = COALESCE(excluded.referrer, conversations.referrer),
  language = COALESCE(excluded.language, conversations.language),
  started_at = COALESCE(conversations.started_at, excluded.started_at),
  completed_at = COALESCE(excluded.completed_at, conversations.completed_at),
  duration_seconds = COALESCE(excluded.duration_seconds, conversations.duration_seconds),
  turn_count = COALESCE(excluded.turn_count, conversations.turn_count),
  updated_at = excluded.updated_at
`;

const SELECT_CONVERSATION = `
SELECT id FROM conversations
WHERE provider = 'conferbot' AND provider_session_id = ?1
`;

export async function upsertConversation(
  db: ConferbotDatabase,
  input: ConversationUpsert,
): Promise<LedgerWrite & { conversationId?: string }> {
  try {
    const results = await runBatch(db, [
      {
        sql: UPSERT_CONVERSATION,
        params: [
          input.id,
          input.providerSessionId,
          input.providerVisitorId ?? null,
          input.providerBotId ?? null,
          input.leadId ?? null,
          input.channel ?? null,
          input.status ?? null,
          input.resolution ?? null,
          input.escalationReason ?? null,
          input.endedBy ?? null,
          input.pageUrl ?? null,
          input.referrer ?? null,
          input.language ?? null,
          input.startedAt ?? null,
          input.completedAt ?? null,
          input.durationSeconds ?? null,
          input.turnCount ?? null,
          input.createdAt,
          input.updatedAt,
        ],
      },
      { sql: SELECT_CONVERSATION, params: [input.providerSessionId] },
    ]);
    if (!results) return { ok: false, reason: "storage" };
    const conversationId = typeof results[1]?.rows[0]?.id === "string"
      ? String(results[1].rows[0].id)
      : input.id;
    return { ok: true, idempotent: results[0]?.changes === 0, conversationId };
  } catch (error) {
    return isConstraintError(error) ? { ok: false, reason: "conflict" } : { ok: false, reason: "storage" };
  }
}

export type MessageUpsert = {
  id: string;
  conversationId: string;
  providerMessageId: string;
  sequence?: number | null;
  sender: "visitor" | "bot" | "ai" | "agent";
  senderName?: string | null;
  messageType?: string | null;
  messageText?: string | null;
  sentAt?: string | null;
  createdAt: string;
};

const INSERT_MESSAGE = `
INSERT INTO messages (
  id, conversation_id, provider_message_id, sequence, sender, sender_name,
  message_type, message_text, sent_at, created_at
) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)
ON CONFLICT (conversation_id, provider_message_id) DO NOTHING
`;

export async function insertMessage(db: ConferbotDatabase, input: MessageUpsert): Promise<LedgerWrite> {
  try {
    const results = await runBatch(db, [{
      sql: INSERT_MESSAGE,
      params: [
        input.id,
        input.conversationId,
        input.providerMessageId,
        input.sequence ?? null,
        input.sender,
        input.senderName ?? null,
        input.messageType ?? null,
        input.messageText ?? null,
        input.sentAt ?? null,
        input.createdAt,
      ],
    }]);
    if (!results) return { ok: false, reason: "storage" };
    const changes = results[0]?.changes ?? 0;
    if (changes === 1) return { ok: true, idempotent: false };
    if (changes === 0) return { ok: true, idempotent: true };
    return { ok: false, reason: "conflict" };
  } catch (error) {
    return isConstraintError(error) ? { ok: true, idempotent: true } : { ok: false, reason: "storage" };
  }
}

export type OutboxInsert = {
  id: string;
  idempotencyKey: string;
  leadId: string | null;
  conversationId: string | null;
  notificationType: "hot" | "qualified" | "handoff";
  recipient: string;
  createdAt: string;
};

const INSERT_OUTBOX = `
INSERT INTO notification_outbox (
  id, idempotency_key, lead_id, conversation_id, notification_type,
  recipient, delivery_status, attempts, last_error, created_at, sent_at
) VALUES (?1, ?2, ?3, ?4, ?5, ?6, 'pending', 0, NULL, ?7, NULL)
ON CONFLICT (idempotency_key) DO NOTHING
`;

const SELECT_OUTBOX = `
SELECT id, delivery_status FROM notification_outbox WHERE idempotency_key = ?1
`;

export async function enqueueNotification(
  db: ConferbotDatabase,
  input: OutboxInsert,
): Promise<LedgerWrite & { outboxId?: string }> {
  try {
    const results = await runBatch(db, [
      {
        sql: INSERT_OUTBOX,
        params: [
          input.id,
          input.idempotencyKey,
          input.leadId,
          input.conversationId,
          input.notificationType,
          input.recipient,
          input.createdAt,
        ],
      },
      { sql: SELECT_OUTBOX, params: [input.idempotencyKey] },
    ]);
    if (!results) return { ok: false, reason: "storage" };
    const inserted = results[0]?.changes ?? 0;
    const row = results[1]?.rows[0];
    const outboxId = typeof row?.id === "string" ? row.id : input.id;
    if (inserted === 1) return { ok: true, idempotent: false, outboxId };
    if (inserted === 0 && row) return { ok: true, idempotent: true, outboxId };
    return { ok: false, reason: "conflict" };
  } catch (error) {
    return isConstraintError(error) ? { ok: true, idempotent: true } : { ok: false, reason: "storage" };
  }
}

const MARK_OUTBOX_SENT = `
UPDATE notification_outbox
SET delivery_status = 'sent', attempts = attempts + 1, sent_at = ?2, last_error = NULL
WHERE id = ?1 AND delivery_status = 'pending'
`;

const MARK_OUTBOX_FAILED = `
UPDATE notification_outbox
SET delivery_status = 'failed', attempts = attempts + 1, last_error = ?2
WHERE id = ?1
`;

export async function markOutboxSent(db: ConferbotDatabase, id: string, sentAt: string): Promise<LedgerWrite> {
  const results = await runBatch(db, [{ sql: MARK_OUTBOX_SENT, params: [id, sentAt] }]);
  if (!results) return { ok: false, reason: "storage" };
  return { ok: true, idempotent: (results[0]?.changes ?? 0) === 0 };
}

export async function markOutboxFailed(db: ConferbotDatabase, id: string, error: string): Promise<LedgerWrite> {
  const results = await runBatch(db, [{ sql: MARK_OUTBOX_FAILED, params: [id, error.slice(0, 500)] }]);
  if (!results) return { ok: false, reason: "storage" };
  return { ok: true, idempotent: false };
}

export type LeadUpsertInput = {
  id: string;
  fullName?: string | null;
  email?: string | null;
  phone?: string | null;
  businessName?: string | null;
  website?: string | null;
  industry?: string | null;
  location?: string | null;
  requestedServices?: string | null;
  projectDescription?: string | null;
  budgetRange?: string | null;
  desiredStart?: string | null;
  decisionMaker?: number | null;
  contactConsent?: number | null;
  marketingConsent?: number | null;
  leadScore: number;
  leadTemperature: "HOT" | "QUALIFIED" | "DEVELOPING" | "EARLY_STAGE";
  leadStatus?: string;
  scoreReasonsJson?: string | null;
  scoringConfigVersion: string;
  source?: string | null;
  landingPage?: string | null;
  referrer?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  preferredLanguage?: string | null;
  createdAt: string;
  updatedAt: string;
};

const SELECT_LEAD_BY_EMAIL = `SELECT id FROM leads WHERE email = ?1 LIMIT 1`;
const SELECT_LEAD_BY_PHONE = `SELECT id FROM leads WHERE phone = ?1 LIMIT 1`;

const INSERT_LEAD = `
INSERT INTO leads (
  id, full_name, email, phone, business_name, website, industry, location,
  requested_services, project_description, budget_range, desired_start, decision_maker,
  contact_consent, marketing_consent, lead_score, lead_temperature, lead_status,
  score_reasons_json, score_override_json, scoring_config_version, source, landing_page,
  referrer, utm_source, utm_medium, utm_campaign, preferred_language, created_at, updated_at, last_contacted_at
) VALUES (
  ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18,
  ?19, NULL, ?20, ?21, ?22, ?23, ?24, ?25, ?26, ?27, ?28, ?29, NULL
)
`;

const UPDATE_LEAD = `
UPDATE leads SET
  full_name = COALESCE(?2, full_name),
  email = COALESCE(?3, email),
  phone = COALESCE(?4, phone),
  business_name = COALESCE(?5, business_name),
  website = COALESCE(?6, website),
  industry = COALESCE(?7, industry),
  location = COALESCE(?8, location),
  requested_services = COALESCE(?9, requested_services),
  project_description = COALESCE(?10, project_description),
  budget_range = COALESCE(?11, budget_range),
  desired_start = COALESCE(?12, desired_start),
  decision_maker = COALESCE(?13, decision_maker),
  contact_consent = COALESCE(?14, contact_consent),
  marketing_consent = COALESCE(?15, marketing_consent),
  lead_score = ?16,
  lead_temperature = ?17,
  score_reasons_json = COALESCE(?18, score_reasons_json),
  scoring_config_version = ?19,
  source = COALESCE(?20, source),
  landing_page = COALESCE(?21, landing_page),
  referrer = COALESCE(?22, referrer),
  utm_source = COALESCE(?23, utm_source),
  utm_medium = COALESCE(?24, utm_medium),
  utm_campaign = COALESCE(?25, utm_campaign),
  preferred_language = COALESCE(?26, preferred_language),
  updated_at = ?27
WHERE id = ?1
`;

const INSERT_ACTIVITY = `
INSERT INTO lead_activity (id, lead_id, activity_type, description, actor_type, actor_id, created_at)
VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
`;

export async function upsertLead(
  db: ConferbotDatabase,
  input: LeadUpsertInput,
): Promise<LedgerWrite & { leadId?: string }> {
  try {
    const lookups: SqlStatement[] = [];
    if (input.email) lookups.push({ sql: SELECT_LEAD_BY_EMAIL, params: [input.email] });
    if (input.phone) lookups.push({ sql: SELECT_LEAD_BY_PHONE, params: [input.phone] });

    let existingId: string | null = null;
    if (lookups.length > 0) {
      const found = await runBatch(db, lookups);
      if (!found) return { ok: false, reason: "storage" };
      for (const result of found) {
        const id = result.rows[0]?.id;
        if (typeof id === "string") {
          existingId = id;
          break;
        }
      }
    }

    const leadId = existingId ?? input.id;
    if (existingId) {
      const results = await runBatch(db, [{
        sql: UPDATE_LEAD,
        params: [
          leadId,
          input.fullName ?? null,
          input.email ?? null,
          input.phone ?? null,
          input.businessName ?? null,
          input.website ?? null,
          input.industry ?? null,
          input.location ?? null,
          input.requestedServices ?? null,
          input.projectDescription ?? null,
          input.budgetRange ?? null,
          input.desiredStart ?? null,
          input.decisionMaker ?? null,
          input.contactConsent ?? null,
          input.marketingConsent ?? null,
          input.leadScore,
          input.leadTemperature,
          input.scoreReasonsJson ?? null,
          input.scoringConfigVersion,
          input.source ?? null,
          input.landingPage ?? null,
          input.referrer ?? null,
          input.utmSource ?? null,
          input.utmMedium ?? null,
          input.utmCampaign ?? null,
          input.preferredLanguage ?? null,
          input.updatedAt,
        ],
      }]);
      if (!results) return { ok: false, reason: "storage" };
      return { ok: true, idempotent: true, leadId };
    }

    const results = await runBatch(db, [{
      sql: INSERT_LEAD,
      params: [
        leadId,
        input.fullName ?? null,
        input.email ?? null,
        input.phone ?? null,
        input.businessName ?? null,
        input.website ?? null,
        input.industry ?? null,
        input.location ?? null,
        input.requestedServices ?? null,
        input.projectDescription ?? null,
        input.budgetRange ?? null,
        input.desiredStart ?? null,
        input.decisionMaker ?? null,
        input.contactConsent ?? null,
        input.marketingConsent ?? null,
        input.leadScore,
        input.leadTemperature,
        input.leadStatus ?? "new",
        input.scoreReasonsJson ?? null,
        input.scoringConfigVersion,
        input.source ?? null,
        input.landingPage ?? null,
        input.referrer ?? null,
        input.utmSource ?? null,
        input.utmMedium ?? null,
        input.utmCampaign ?? null,
        input.preferredLanguage ?? null,
        input.createdAt,
        input.updatedAt,
      ],
    }]);
    if (!results) return { ok: false, reason: "storage" };
    return { ok: true, idempotent: false, leadId };
  } catch (error) {
    return isConstraintError(error) ? { ok: false, reason: "conflict" } : { ok: false, reason: "storage" };
  }
}

export async function recordLeadActivity(
  db: ConferbotDatabase,
  input: {
    id: string;
    leadId: string;
    activityType: string;
    description?: string | null;
    actorType?: string | null;
    actorId?: string | null;
    createdAt: string;
  },
): Promise<LedgerWrite> {
  try {
    const results = await runBatch(db, [{
      sql: INSERT_ACTIVITY,
      params: [
        input.id,
        input.leadId,
        input.activityType,
        input.description ?? null,
        input.actorType ?? null,
        input.actorId ?? null,
        input.createdAt,
      ],
    }]);
    if (!results) return { ok: false, reason: "storage" };
    return { ok: true, idempotent: false };
  } catch (error) {
    return isConstraintError(error) ? { ok: false, reason: "conflict" } : { ok: false, reason: "storage" };
  }
}

export async function countWebhookEvents(db: ConferbotDatabase, providerEventKey: string): Promise<number> {
  const results = await db.batch([{
    sql: `SELECT COUNT(*) AS c FROM webhook_events WHERE provider = 'conferbot' AND provider_event_key = ?1`,
    params: [providerEventKey],
  }]);
  const raw = results[0]?.rows[0]?.c;
  return typeof raw === "number" ? raw : Number(raw ?? 0);
}

export async function countMessages(db: ConferbotDatabase, conversationId: string): Promise<number> {
  const results = await db.batch([{
    sql: `SELECT COUNT(*) AS c FROM messages WHERE conversation_id = ?1`,
    params: [conversationId],
  }]);
  const raw = results[0]?.rows[0]?.c;
  return typeof raw === "number" ? raw : Number(raw ?? 0);
}

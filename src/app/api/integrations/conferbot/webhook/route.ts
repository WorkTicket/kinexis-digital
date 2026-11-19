/**
 * Conferbot webhook — cross-site by design. Do NOT call rejectCrossSite.
 * Auth = HMAC + expected bot id + feature flag.
 */
import {
  expectedConferbotBotId,
  conferbotWebhookSecret,
  isConferbotIntegrationEnabled,
  isSupportedEvent,
  maxBodyBytes,
  type ConferbotEventType,
} from "@/lib/conferbot-config";
import { conferbotProviderEventKey } from "@/lib/conferbot-event-key";
import {
  conferbotDatabase,
  insertMessage,
  newEntityId,
  markWebhookEventProcessed,
  recordWebhookEvent,
  upsertConversation,
} from "@/lib/conferbot-ledger";
import { extractLeadFields, syncLeadFromPayload } from "@/lib/conferbot-leads";
import { enqueueLeadNotifications } from "@/lib/conferbot-notify";
import { redactConferbotPayload } from "@/lib/conferbot-redact";
import { verifyConferbotSignature } from "@/lib/conferbot-signature";
import { privateJson, rejectOversize, rejectReadOversize } from "@/lib/request-security";

function json(body: Record<string, boolean | string>, status: number) {
  return privateJson(body, { status });
}

function text(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function nested(obj: unknown, ...path: string[]): unknown {
  let current: unknown = obj;
  for (const key of path) {
    if (!current || typeof current !== "object" || Array.isArray(current)) return null;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

function sessionId(payload: unknown): string | null {
  return (
    text(nested(payload, "chatSessionId")) ||
    text(nested(payload, "conversation", "chatSessionId")) ||
    text(nested(payload, "sessionId"))
  );
}

function payloadEventType(payload: unknown, headerEvent: string | null): string | null {
  const fromPayload = text(nested(payload, "event")) || text(nested(payload, "type"));
  if (fromPayload) return fromPayload;
  return headerEvent;
}

function asSender(value: unknown): "visitor" | "bot" | "ai" | "agent" {
  if (value === "visitor" || value === "bot" || value === "ai" || value === "agent") return value;
  return "bot";
}

export async function POST(request: Request) {
  try {
    return await handleWebhook(request);
  } catch (error) {
    console.error("Conferbot webhook failed", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return json({ error: "unavailable" }, 503);
  }
}

async function handleWebhook(request: Request) {
  // Prefer 503 while disabled so Conferbot retries after enable. No secret leak.
  if (!isConferbotIntegrationEnabled()) {
    return json({ error: "unavailable" }, 503);
  }

  const limit = maxBodyBytes();
  const rejected = rejectOversize(request, limit);
  if (rejected) return rejected;

  const raw = await request.text();
  const oversize = rejectReadOversize(new TextEncoder().encode(raw).byteLength, limit);
  if (oversize) return oversize;

  const secret = conferbotWebhookSecret();
  const signature = request.headers.get("x-webhook-signature");
  const valid = await verifyConferbotSignature(raw, signature, secret);
  if (!valid) return json({ error: "unauthorized" }, 401);

  let payload: unknown;
  try {
    payload = JSON.parse(raw) as unknown;
  } catch {
    return json({ error: "invalid json" }, 400);
  }

  const headerEvent = request.headers.get("x-webhook-event");
  const eventType = payloadEventType(payload, headerEvent);
  const botId =
    text(nested(payload, "botId")) ||
    text(nested(payload, "bot", "id")) ||
    text(nested(payload, "chatbotId"));

  const expectedBot = expectedConferbotBotId();
  const supported = Boolean(eventType && isSupportedEvent(eventType));
  const botOk = Boolean(botId && botId === expectedBot);

  // Signed but wrong bot / unsupported → 200 ignored (do not trip vendor auto-disable).
  if (!botOk || !supported || !eventType) {
    return json({ ok: true, status: "ignored" }, 200);
  }

  const typedEvent = eventType as ConferbotEventType;
  const redacted = redactConferbotPayload(payload);
  const providerEventKey = await conferbotProviderEventKey(typedEvent, redacted, raw);
  if (!providerEventKey) {
    return json({ ok: true, status: "ignored" }, 200);
  }

  const db = conferbotDatabase();
  if (!db) return json({ error: "unavailable" }, 503);

  const now = new Date().toISOString();
  const session = sessionId(redacted);
  const stored = await recordWebhookEvent(db, {
    id: newEntityId(),
    eventType: typedEvent,
    providerEventKey,
    providerSessionId: session,
    payloadJson: JSON.stringify(redacted),
    processingStatus: "received",
    receivedAt: now,
  });
  if (!stored.ok && stored.reason === "storage") return json({ error: "unavailable" }, 503);
  if (!stored.ok) return json({ error: "unavailable" }, 503);

  // Duplicate delivery — already persisted.
  if (stored.idempotent && stored.processingStatus === "processed") {
    return json({ ok: true, status: "duplicate" }, 200);
  }
  if (!stored.eventId) return json({ error: "unavailable" }, 503);

  let conversationId: string | undefined;
  if (session) {
    const conversation = await upsertConversation(db, {
      id: newEntityId(),
      providerSessionId: session,
      providerVisitorId: text(nested(redacted, "visitor", "id")) || text(nested(redacted, "visitorId")),
      providerBotId: botId,
      channel: text(nested(redacted, "channel")),
      status: typedEvent === "conversation.completed" ? "completed" : "open",
      resolution: text(nested(redacted, "resolution")),
      escalationReason: text(nested(redacted, "escalationReason")),
      endedBy: text(nested(redacted, "endedBy")),
      pageUrl: text(nested(redacted, "page", "url")),
      referrer: text(nested(redacted, "page", "referrer")),
      language: text(nested(redacted, "customData", "locale")) || text(nested(redacted, "visitor", "language")),
      startedAt: typedEvent === "conversation.started" ? (text(nested(redacted, "timestamp")) || now) : null,
      completedAt: typedEvent === "conversation.completed" ? (text(nested(redacted, "timestamp")) || now) : null,
      durationSeconds: typeof nested(redacted, "duration") === "number"
        ? Number(nested(redacted, "duration"))
        : null,
      turnCount: typeof nested(redacted, "turnCount") === "number"
        ? Number(nested(redacted, "turnCount"))
        : null,
      createdAt: now,
      updatedAt: now,
    });
    if (!conversation.ok) return json({ error: "unavailable" }, 503);
    conversationId = conversation.conversationId;

    if (typedEvent === "message.created" && conversationId) {
      const messageId =
        text(nested(redacted, "message", "id")) ||
        text(nested(redacted, "messageId")) ||
        text(nested(redacted, "id"));
      if (messageId) {
        const sequenceRaw = nested(redacted, "message", "sequence") ?? nested(redacted, "sequence");
        const sender = asSender(nested(redacted, "message", "sender") ?? nested(redacted, "sender"));
        const inserted = await insertMessage(db, {
          id: newEntityId(),
          conversationId,
          providerMessageId: messageId,
          sequence: typeof sequenceRaw === "number" ? sequenceRaw : null,
          sender,
          senderName: text(nested(redacted, "message", "senderName")) || text(nested(redacted, "senderName")),
          messageType: text(nested(redacted, "message", "type")) || text(nested(redacted, "messageType")),
          messageText: text(nested(redacted, "message", "text")) || text(nested(redacted, "text")),
          sentAt: text(nested(redacted, "message", "sentAt")) || text(nested(redacted, "timestamp")),
          createdAt: now,
        });
        if (!inserted.ok) return json({ error: "unavailable" }, 503);
      }
    }
  }

  // Lead sync + notify only after durable persist, and only when integration is on.
  const lead = await syncLeadFromPayload(redacted, {
    conversationId,
    providerSessionId: session,
    nowIso: now,
  }, db);
  if (lead.failed) return json({ error: "unavailable" }, 503);

  if (lead.leadId && lead.temperature && typeof lead.score === "number") {
    const fields = extractLeadFields(redacted);
    await enqueueLeadNotifications({
      leadId: lead.leadId,
      conversationId,
      temperature: lead.temperature,
      score: lead.score,
      handoff: lead.handoff,
      summary: {
        fullName: fields.fullName,
        email: fields.email,
        phone: fields.phone,
        businessName: fields.businessName,
      },
    }, db);
  }

  const completed = await markWebhookEventProcessed(db, stored.eventId, new Date().toISOString());
  if (!completed.ok) return json({ error: "unavailable" }, 503);

  return json({ ok: true }, 200);
}

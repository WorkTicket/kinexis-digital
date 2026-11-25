/**
 * Conferbot lead notification outbox + optional send via CONTACT_EMAIL.
 * Default notify OFF. Never blocks webhook ack on mail failures beyond marking outbox.
 */
import "server-only";
import {
  contactDeliveryBlocked,
  contactEmailBinding,
  contactRecipients,
  logDeliveryFailure,
} from "@/lib/contact-mail";
import { isConferbotNotifyEnabled } from "@/lib/conferbot-config";
import {
  conferbotDatabase,
  enqueueNotification,
  markOutboxFailed,
  markOutboxSent,
  newEntityId,
  type ConferbotDatabase,
} from "@/lib/conferbot-ledger";
import type { LeadTemperature } from "@/lib/conferbot-leads";
import { SITE } from "@/lib/site";

export type NotifyInput = {
  leadId: string;
  conversationId?: string | null;
  temperature: LeadTemperature;
  score: number;
  handoff?: boolean;
  summary?: {
    fullName?: string | null;
    email?: string | null;
    phone?: string | null;
    businessName?: string | null;
  };
};

function escapeText(value: string) {
  return value.replace(/[<>&"]/g, (ch) => {
    switch (ch) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case '"': return "&quot;";
      default: return ch;
    }
  });
}

function notificationTypes(input: NotifyInput): Array<"hot" | "qualified" | "handoff"> {
  const types: Array<"hot" | "qualified" | "handoff"> = [];
  if (input.temperature === "HOT") types.push("hot");
  if (input.temperature === "QUALIFIED") types.push("qualified");
  if (input.handoff) types.push("handoff");
  return types;
}

function idempotencyKey(type: "hot" | "qualified" | "handoff", input: NotifyInput): string {
  if (type === "handoff") return `handoff:${input.conversationId || input.leadId}`;
  return `${type}:${input.leadId}`;
}

function buildMessage(type: "hot" | "qualified" | "handoff", input: NotifyInput) {
  const label = type === "hot" ? "HOT" : type === "qualified" ? "QUALIFIED" : "HANDOFF";
  const who = input.summary?.fullName || input.summary?.email || input.summary?.phone || "Unknown contact";
  const lines = [
    `Kinexis Digital — Conferbot ${label} alert`,
    `Score: ${input.score}`,
    `Temperature: ${input.temperature}`,
    `Lead id: ${input.leadId}`,
    input.conversationId ? `Conversation id: ${input.conversationId}` : null,
    `Name: ${who}`,
    input.summary?.email ? `Email: ${input.summary.email}` : null,
    input.summary?.phone ? `Phone: ${input.summary.phone}` : null,
    input.summary?.businessName ? `Business: ${input.summary.businessName}` : null,
  ].filter(Boolean) as string[];
  const text = lines.join("\n");
  const html = `<pre>${escapeText(text)}</pre>`;
  return {
    subject: `[Kinexis] Conferbot ${label} lead (${input.score})`,
    text,
    html,
  };
}

/**
 * Enqueue outbox rows for HOT / QUALIFIED / handoff. Sends only when
 * CONFERBOT_NOTIFY_ENABLED=1, integration on, and delivery is not blocked.
 */
export async function enqueueLeadNotifications(
  input: NotifyInput,
  db: ConferbotDatabase | null = conferbotDatabase(),
): Promise<{ enqueued: number; sent: number; skipped: boolean }> {
  if (!db) return { enqueued: 0, sent: 0, skipped: true };

  const types = notificationTypes(input);
  if (types.length === 0) return { enqueued: 0, sent: 0, skipped: true };

  const recipients = contactRecipients();
  if (recipients.length === 0) return { enqueued: 0, sent: 0, skipped: true };

  const recipient = recipients[0];
  const now = new Date().toISOString();
  let enqueued = 0;
  const pendingIds: Array<{ id: string; type: "hot" | "qualified" | "handoff" }> = [];

  for (const type of types) {
    const key = idempotencyKey(type, input);
    const result = await enqueueNotification(db, {
      id: newEntityId(),
      idempotencyKey: key,
      leadId: input.leadId,
      conversationId: input.conversationId ?? null,
      notificationType: type,
      recipient,
      createdAt: now,
    });
    if (result.ok && !result.idempotent && result.outboxId) {
      enqueued += 1;
      pendingIds.push({ id: result.outboxId, type });
    } else if (result.ok && result.idempotent && result.outboxId) {
      // Already queued or sent — do not resend.
    }
  }

  if (!isConferbotNotifyEnabled() || contactDeliveryBlocked()) {
    return { enqueued, sent: 0, skipped: true };
  }

  const mail = contactEmailBinding();
  if (!mail) return { enqueued, sent: 0, skipped: true };

  let sent = 0;
  for (const item of pendingIds) {
    const message = buildMessage(item.type, input);
    try {
      await mail.send({
        from: { email: SITE.email, name: SITE.name },
        to: [recipient],
        subject: message.subject,
        text: message.text,
        attachments: [],
      });
      await markOutboxSent(db, item.id, new Date().toISOString());
      sent += 1;
    } catch (error) {
      logDeliveryFailure("conferbot-notify", error);
      await markOutboxFailed(db, item.id, error instanceof Error ? error.message : "send_failed");
    }
  }

  return { enqueued, sent, skipped: false };
}

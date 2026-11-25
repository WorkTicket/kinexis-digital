/**
 * Deterministic provider_event_key values — Conferbot payloads have no event id.
 */

import type { ConferbotEventType } from "@/lib/conferbot-config";

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

async function sha256Hex(rawBody: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(rawBody));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Derive the unique provider_event_key for a signed payload.
 * Returns null when required ids are missing.
 */
export async function conferbotProviderEventKey(
  eventType: ConferbotEventType,
  payload: unknown,
  rawBody: string,
): Promise<string | null> {
  const session =
    text(nested(payload, "chatSessionId")) ||
    text(nested(payload, "conversation", "chatSessionId")) ||
    text(nested(payload, "sessionId"));

  switch (eventType) {
    case "message.created": {
      const messageId =
        text(nested(payload, "message", "id")) ||
        text(nested(payload, "id")) ||
        text(nested(payload, "messageId"));
      return messageId ? `message:${messageId}` : null;
    }
    case "conversation.started":
      return session ? `started:${session}` : null;
    case "conversation.completed":
      return session ? `completed:${session}` : null;
    case "response.created": {
      const responseId =
        text(nested(payload, "responseId")) ||
        text(nested(payload, "response", "id")) ||
        text(nested(payload, "id"));
      return responseId ? `rcreated:${responseId}` : null;
    }
    case "response.updated": {
      const responseId =
        text(nested(payload, "responseId")) ||
        text(nested(payload, "response", "id")) ||
        text(nested(payload, "id"));
      if (!responseId) return null;
      const hash = await sha256Hex(rawBody);
      return `rupdated:${responseId}:${hash}`;
    }
    default:
      return null;
  }
}

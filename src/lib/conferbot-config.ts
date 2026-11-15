/**
 * Conferbot integration limits and feature flags.
 * Flags stay off unless explicitly set to "1". Secrets are never logged.
 */

/** Reject webhook bodies larger than this before JSON parse. */
export const MAX_BODY_BYTES = 256_000;

/** Documented Conferbot live-chat webhook event types. */
export const SUPPORTED_EVENTS = [
  "conversation.started",
  "message.created",
  "conversation.completed",
  "response.created",
  "response.updated",
] as const;

export type ConferbotEventType = (typeof SUPPORTED_EVENTS)[number];

/** Public bot id — compare only when integration is enabled. Not a secret. */
export const PUBLIC_CONFERBOT_BOT_ID = "6afa0edabbad567d637ee189";

export const SCORING_CONFIG_VERSION = "v1";

export const LEAD_SCORING_CONFIG = {
  maximumScore: 100,
  thresholds: {
    hot: 80,
    qualified: 60,
    developing: 40,
  },
  weights: {
    /** OWNER_DECISION_REQUIRED — award 0 until owner defines verification. */
    operatingBusiness: 10,
    decisionMaker: 15,
    clearNeed: 15,
    /** OWNER_DECISION_REQUIRED — which services count as strong fit. */
    serviceFit: 15,
    /** OWNER_DECISION_REQUIRED — USD floor not invented here. */
    realisticBudget: 20,
    nearTermTimeline: 15,
    contactAndNextStep: 10,
  },
} as const;

export function isSupportedEvent(value: string): value is ConferbotEventType {
  return (SUPPORTED_EVENTS as readonly string[]).includes(value);
}

export function conferbotWebhookSecret(): string {
  return (process.env.CONFERBOT_WEBHOOK_SECRET || "").trim();
}

/**
 * Expected bot id for payload compare. Defaults to the public id when unset.
 * Only consulted after isConferbotIntegrationEnabled().
 */
export function expectedConferbotBotId(): string {
  const configured = (process.env.CONFERBOT_EXPECTED_BOT_ID || "").trim();
  return configured || PUBLIC_CONFERBOT_BOT_ID;
}

/**
 * Backend integration gate. Requires explicit "1" and a non-empty webhook secret.
 * Widget public flag is separate (NEXT_PUBLIC_CONFERBOT_ENABLED) and is not checked here.
 */
export function isConferbotIntegrationEnabled(): boolean {
  return process.env.CONFERBOT_INTEGRATION_ENABLED === "1" && conferbotWebhookSecret().length > 0;
}

/** Lead-alert email send gate. Default off. Requires integration on as well. */
export function isConferbotNotifyEnabled(): boolean {
  return process.env.CONFERBOT_NOTIFY_ENABLED === "1" && isConferbotIntegrationEnabled();
}

export function maxBodyBytes(): number {
  const raw = (process.env.CONFERBOT_WEBHOOK_MAX_BODY_BYTES || "").trim();
  if (!raw) return MAX_BODY_BYTES;
  if (!/^\d+$/.test(raw)) return MAX_BODY_BYTES;
  const parsed = Number(raw);
  if (!Number.isSafeInteger(parsed) || parsed < 1_024 || parsed > 2_000_000) return MAX_BODY_BYTES;
  return parsed;
}

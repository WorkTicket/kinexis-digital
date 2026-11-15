/**
 * MVP lead extraction + deterministic scoring from Conferbot payloads.
 * Only runs when integration is enabled, after the webhook event is persisted.
 */
import {
  LEAD_SCORING_CONFIG,
  SCORING_CONFIG_VERSION,
  isConferbotIntegrationEnabled,
} from "@/lib/conferbot-config";
import {
  conferbotDatabase,
  newEntityId,
  recordLeadActivity,
  upsertConversation,
  upsertLead,
  type ConferbotDatabase,
} from "@/lib/conferbot-ledger";

export type LeadTemperature = "HOT" | "QUALIFIED" | "DEVELOPING" | "EARLY_STAGE";

export type ExtractedLeadFields = {
  fullName: string | null;
  email: string | null;
  phone: string | null;
  businessName: string | null;
  website: string | null;
  industry: string | null;
  budgetRange: string | null;
  desiredStart: string | null;
  decisionMaker: boolean | null;
  contactConsent: boolean | null;
  requestedServices: string | null;
  projectDescription: string | null;
  landingPage: string | null;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  preferredLanguage: string | null;
  source: string | null;
  handoff: boolean;
};

export type ScoreResult = {
  score: number;
  temperature: LeadTemperature;
  reasons: string[];
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function text(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function boolish(value: unknown): boolean | null {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1 ? true : value === 0 ? false : null;
  if (typeof value === "string") {
    const v = value.trim().toLowerCase();
    if (["1", "true", "yes", "y"].includes(v)) return true;
    if (["0", "false", "no", "n"].includes(v)) return false;
  }
  return null;
}

function pick(map: Record<string, unknown>, keys: string[]): string | null {
  for (const key of keys) {
    const direct = text(map[key]);
    if (direct) return direct;
    const lower = Object.entries(map).find(([k]) => k.toLowerCase() === key.toLowerCase());
    if (lower) {
      const value = text(lower[1]);
      if (value) return value;
    }
  }
  return null;
}

function flattenVariables(payload: unknown): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (!isPlainObject(payload)) return out;
  const sources = [payload.variables, payload.customData, payload.response];
  for (const source of sources) {
    if (!isPlainObject(source)) continue;
    for (const [key, value] of Object.entries(source)) {
      if (value !== undefined && value !== null && out[key] === undefined) out[key] = value;
    }
  }
  return out;
}

function normalizeEmail(value: string | null): string | null {
  if (!value) return null;
  const email = value.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

function normalizePhone(value: string | null): string | null {
  if (!value) return null;
  const digits = value.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return null;
  return digits;
}

/** Extract contact + attribution fields without inventing values. */
export function extractLeadFields(payload: unknown): ExtractedLeadFields {
  const vars = flattenVariables(payload);
  const visitor = isPlainObject(payload) && isPlainObject(payload.visitor) ? payload.visitor : {};
  const page = isPlainObject(payload) && isPlainObject(payload.page) ? payload.page : {};
  const custom = isPlainObject(payload) && isPlainObject(payload.customData) ? payload.customData : {};

  const email = normalizeEmail(
    pick(vars, ["email", "Email", "visitor_email", "contact_email"]) || text(visitor.email),
  );
  const phone = normalizePhone(
    pick(vars, ["phone", "Phone", "mobile", "visitor_phone", "contact_phone"]) || text(visitor.phone),
  );
  const fullName =
    pick(vars, ["full_name", "fullName", "name", "Name", "visitor_name"]) || text(visitor.name);
  const handoff = Boolean(
    boolish(vars.handoff) ||
    boolish(vars.live_agent) ||
    boolish(vars.escalated) ||
    text(isPlainObject(payload) ? payload.escalationReason : null) ||
    text(isPlainObject(payload) ? payload.endedBy : null)?.toLowerCase() === "agent",
  );

  return {
    fullName,
    email,
    phone,
    businessName: pick(vars, ["business_name", "businessName", "company", "business"]),
    website: pick(vars, ["website", "site", "url"]),
    industry: pick(vars, ["industry"]),
    budgetRange: pick(vars, ["budget", "budget_range", "budgetRange"]),
    desiredStart: pick(vars, ["desired_start", "timeline", "start_date", "start"]),
    decisionMaker: boolish(vars.decision_maker ?? vars.decisionMaker ?? vars.owner),
    contactConsent: boolish(vars.contact_consent ?? vars.contactConsent ?? vars.consent),
    requestedServices: pick(vars, ["services", "requested_services", "service", "need"]),
    projectDescription: pick(vars, ["project_description", "description", "notes", "goal"]),
    landingPage: text(page.landingPage) || text(page.url),
    referrer: text(page.referrer),
    utmSource: text(page.utmSource) || text((page as { utm?: { source?: unknown } }).utm?.source),
    utmMedium: text(page.utmMedium) || text((page as { utm?: { medium?: unknown } }).utm?.medium),
    utmCampaign: text(page.utmCampaign) || text((page as { utm?: { campaign?: unknown } }).utm?.campaign),
    preferredLanguage: text(custom.locale) || text(visitor.language),
    source: text(custom.source) || "conferbot",
    handoff,
  };
}

function temperatureFor(score: number): LeadTemperature {
  const { hot, qualified, developing } = LEAD_SCORING_CONFIG.thresholds;
  if (score >= hot) return "HOT";
  if (score >= qualified) return "QUALIFIED";
  if (score >= developing) return "DEVELOPING";
  return "EARLY_STAGE";
}

/**
 * Deterministic 0–100 score. Owner-decision weights (budget/service/business verification)
 * award 0 until concrete rules exist.
 */
export function scoreLead(fields: ExtractedLeadFields): ScoreResult {
  const w = LEAD_SCORING_CONFIG.weights;
  let score = 0;
  const reasons: string[] = [];

  // operatingBusiness / serviceFit / realisticBudget: OWNER_DECISION_REQUIRED → 0
  reasons.push("operatingBusiness:0:OWNER_DECISION_REQUIRED");
  reasons.push("serviceFit:0:OWNER_DECISION_REQUIRED");
  reasons.push("realisticBudget:0:OWNER_DECISION_REQUIRED");

  if (fields.decisionMaker === true) {
    score += w.decisionMaker;
    reasons.push(`decisionMaker:${w.decisionMaker}`);
  } else {
    reasons.push("decisionMaker:0");
  }

  if (fields.requestedServices || fields.projectDescription) {
    score += w.clearNeed;
    reasons.push(`clearNeed:${w.clearNeed}`);
  } else {
    reasons.push("clearNeed:0");
  }

  if (fields.desiredStart) {
    const lower = fields.desiredStart.toLowerCase();
    const nearTerm =
      /\b(asap|immediate|this week|next week|within\s*30|30 days|this month|soon)\b/.test(lower);
    if (nearTerm) {
      score += w.nearTermTimeline;
      reasons.push(`nearTermTimeline:${w.nearTermTimeline}`);
    } else {
      reasons.push("nearTermTimeline:0");
    }
  } else {
    reasons.push("nearTermTimeline:0");
  }

  if ((fields.email || fields.phone) && (fields.contactConsent !== false)) {
    score += w.contactAndNextStep;
    reasons.push(`contactAndNextStep:${w.contactAndNextStep}`);
  } else {
    reasons.push("contactAndNextStep:0");
  }

  if (score > LEAD_SCORING_CONFIG.maximumScore) score = LEAD_SCORING_CONFIG.maximumScore;
  return { score, temperature: temperatureFor(score), reasons };
}

export type LeadSyncResult = {
  skipped: boolean;
  leadId?: string;
  temperature?: LeadTemperature;
  score?: number;
  handoff?: boolean;
};

/** Merge/upsert lead when contact identifiers exist. No-op when integration disabled. */
export async function syncLeadFromPayload(
  payload: unknown,
  options: { conversationId?: string | null; providerSessionId?: string | null; nowIso?: string } = {},
  db: ConferbotDatabase | null = conferbotDatabase(),
): Promise<LeadSyncResult> {
  if (!isConferbotIntegrationEnabled()) return { skipped: true };
  if (!db) return { skipped: true };

  const fields = extractLeadFields(payload);
  if (!fields.email && !fields.phone && !fields.fullName) {
    return { skipped: true, handoff: fields.handoff };
  }

  const scored = scoreLead(fields);
  const now = options.nowIso ?? new Date().toISOString();
  const written = await upsertLead(db, {
    id: newEntityId(),
    fullName: fields.fullName,
    email: fields.email,
    phone: fields.phone,
    businessName: fields.businessName,
    website: fields.website,
    industry: fields.industry,
    requestedServices: fields.requestedServices,
    projectDescription: fields.projectDescription,
    budgetRange: fields.budgetRange,
    desiredStart: fields.desiredStart,
    decisionMaker: fields.decisionMaker === null ? null : fields.decisionMaker ? 1 : 0,
    contactConsent: fields.contactConsent === null ? null : fields.contactConsent ? 1 : 0,
    leadScore: scored.score,
    leadTemperature: scored.temperature,
    scoreReasonsJson: JSON.stringify(scored.reasons),
    scoringConfigVersion: SCORING_CONFIG_VERSION,
    source: fields.source,
    landingPage: fields.landingPage,
    referrer: fields.referrer,
    utmSource: fields.utmSource,
    utmMedium: fields.utmMedium,
    utmCampaign: fields.utmCampaign,
    preferredLanguage: fields.preferredLanguage,
    createdAt: now,
    updatedAt: now,
  });

  if (!written.ok || !written.leadId) return { skipped: true };

  await recordLeadActivity(db, {
    id: newEntityId(),
    leadId: written.leadId,
    activityType: "score_updated",
    description: `${scored.temperature}:${scored.score}`,
    actorType: "system",
    actorId: "conferbot-webhook",
    createdAt: now,
  });

  if (options.providerSessionId) {
    await upsertConversation(db, {
      id: options.conversationId ?? newEntityId(),
      providerSessionId: options.providerSessionId,
      leadId: written.leadId,
      createdAt: now,
      updatedAt: now,
    });
  }

  return {
    skipped: false,
    leadId: written.leadId,
    temperature: scored.temperature,
    score: scored.score,
    handoff: fields.handoff,
  };
}

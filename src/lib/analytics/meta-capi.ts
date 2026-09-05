/**
 * Meta Conversions API (server-side Lead / Schedule).
 * Shares event_id with the browser Pixel so Events Manager can dedupe.
 * No-ops when the access token or pixel id is missing — never fail a form.
 */

import { createHash } from "node:crypto";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  getMetaPixelId,
  PRODUCTION_META_PIXEL_ID,
} from "@/lib/analytics/ads-config";
import { getSiteUrl } from "@/lib/metadata";

const GRAPH_VERSION = "v21.0";
const CAPI_TIMEOUT_MS = 2500;

export type MetaCapiEventName = "Lead" | "Schedule" | "Purchase";

export type MetaCapiEventInput = {
  eventName?: MetaCapiEventName;
  eventId?: string;
  email?: string;
  phone?: string;
  fbp?: string;
  fbc?: string;
  fbclid?: string;
  clientIp?: string;
  userAgent?: string;
  eventSourceUrl?: string;
  contentName?: string;
  contentCategory?: string;
};

export type MetaCapiResult = {
  sent: boolean;
  reason?: "missing_credentials" | "http_error" | "network";
};

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function normalizeEmailForMeta(email: string): string {
  return email.trim().toLowerCase();
}

/** NANP: 10-digit numbers get a leading 1. */
export function normalizePhoneForMeta(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return digits;
  return digits;
}

export function hashMetaUserValue(value: string): string {
  return sha256(value);
}

export function sanitizeMetaEventId(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  const value = raw.trim();
  if (!/^(Lead|Schedule|Purchase)\.[A-Za-z0-9._-]{6,80}$/.test(value)) {
    return undefined;
  }
  return value;
}

export function sanitizeMetaFbp(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  const value = raw.trim();
  if (!/^fb\.\d\.\d{10,16}\.\d{5,30}$/.test(value)) return undefined;
  return value;
}

export function sanitizeMetaFbc(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  const value = raw.trim();
  if (!/^fb\.\d\.\d{10,16}\.[A-Za-z0-9_-]{6,200}$/.test(value)) return undefined;
  return value;
}

export function fbcFromFbclid(fbclid: string, now = Date.now()): string {
  return `fb.1.${now}.${fbclid}`;
}

async function readCloudflareSecret(
  key: "META_CAPI_ACCESS_TOKEN" | "NEXT_PUBLIC_META_PIXEL_ID",
): Promise<string | undefined> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const value = (env as Record<string, string | undefined>)[key]?.trim();
    return value || undefined;
  } catch {
    return undefined;
  }
}

async function getCapiAccessToken(): Promise<string | undefined> {
  return (
    process.env.META_CAPI_ACCESS_TOKEN?.trim() ||
    (await readCloudflareSecret("META_CAPI_ACCESS_TOKEN"))
  );
}

async function getCapiPixelId(): Promise<string | undefined> {
  const fromConfig = getMetaPixelId();
  if (fromConfig) return fromConfig;
  const fromCf = await readCloudflareSecret("NEXT_PUBLIC_META_PIXEL_ID");
  if (fromCf && /^\d{5,20}$/.test(fromCf)) return fromCf;
  return PRODUCTION_META_PIXEL_ID;
}

function absoluteEventSourceUrl(raw?: string): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim().slice(0, 2000);
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("/")) return `${getSiteUrl()}${trimmed}`;
  return undefined;
}

export async function sendMetaCapiEvent(
  input: MetaCapiEventInput,
): Promise<MetaCapiResult> {
  const token = await getCapiAccessToken();
  if (!token) {
    console.error("Meta CAPI skipped: missing access token");
    return { sent: false, reason: "missing_credentials" };
  }
  const pixelId = await getCapiPixelId();
  if (!pixelId) {
    console.error("Meta CAPI skipped: missing pixel id");
    return { sent: false, reason: "missing_credentials" };
  }

  const userData: Record<string, unknown> = {};
  if (input.email) {
    userData.em = [hashMetaUserValue(normalizeEmailForMeta(input.email))];
  }
  if (input.phone) {
    const phone = normalizePhoneForMeta(input.phone);
    if (phone.length >= 10) {
      userData.ph = [hashMetaUserValue(phone)];
    }
  }

  const fbp = sanitizeMetaFbp(input.fbp);
  const fbc =
    sanitizeMetaFbc(input.fbc) ??
    (input.fbclid ? fbcFromFbclid(input.fbclid) : undefined);
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;
  if (input.clientIp && input.clientIp !== "unknown") {
    userData.client_ip_address = input.clientIp;
  }
  if (input.userAgent) {
    userData.client_user_agent = input.userAgent.slice(0, 512);
  }

  const event: Record<string, unknown> = {
    event_name: input.eventName ?? "Lead",
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    user_data: userData,
  };

  const eventId = sanitizeMetaEventId(input.eventId);
  if (eventId) event.event_id = eventId;

  const sourceUrl = absoluteEventSourceUrl(input.eventSourceUrl);
  if (sourceUrl) event.event_source_url = sourceUrl;

  const customData: Record<string, string> = {};
  if (input.contentName) {
    customData.content_name = input.contentName.slice(0, 100);
  }
  if (input.contentCategory) {
    customData.content_category = input.contentCategory.slice(0, 100);
  }
  if (Object.keys(customData).length > 0) {
    event.custom_data = customData;
  }

  const payload: Record<string, unknown> = {
    data: [event],
    access_token: token,
  };
  const testCode = process.env.META_CAPI_TEST_EVENT_CODE?.trim();
  if (testCode) payload.test_event_code = testCode;

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(CAPI_TIMEOUT_MS),
      },
    );
    if (!res.ok) {
      console.error(`Meta CAPI HTTP ${res.status}`);
      return { sent: false, reason: "http_error" };
    }
    console.info(`Meta CAPI ${String(event.event_name)} sent`);
    return { sent: true };
  } catch {
    console.error("Meta CAPI request failed");
    return { sent: false, reason: "network" };
  }
}

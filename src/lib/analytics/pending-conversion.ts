/**
 * Stash lead details before redirecting to a thank-you page so Enhanced
 * Conversions can fire once on the destination without putting PII in the URL.
 *
 * sessionStorage first; first-party cookie fallback for Meta in-app browsers
 * that clear or block web storage between the form page and thank-you.
 */

import {
  clearDocumentCookie,
  readDocumentCookie,
  writeDocumentCookie,
} from "@/lib/client-cookie";

export const PENDING_CONVERSION_KEY = "kinexis-pending-conversion";
export const META_FIRED_PREFIX = "kinexis-meta-fired-";
const META_FIRED_COOKIE = "kinexis-meta-fired";

export type MetaConversionEvent = "Lead" | "Schedule" | "Purchase";

export type PendingConversion = {
  type: "lead" | "audit" | "booking" | "purchase";
  email?: string;
  phone?: string;
  serviceInterest?: string;
  formType?: "contact" | "lead-magnet" | "landing-page";
  landingSlug?: string;
  /** When true, conversion already fired on submit (e.g. booking) — thank-you only sets user_data. */
  conversionAlreadyFired?: boolean;
  metaEvent?: MetaConversionEvent;
  metaEventId?: string;
  purchaseValue?: number;
  purchaseCurrency?: string;
  storedAt: number;
};

const MAX_AGE_MS = 30 * 60 * 1000; // 30 minutes
const MAX_AGE_SECONDS = 30 * 60;
const claimedMetaEventIds = new Set<string>();

/** Inline: sessionStorage then cookie. Used by head conversion snippets. */
export const READ_PENDING_CONVERSION_JS = `(function(){try{var s=sessionStorage.getItem('${PENDING_CONVERSION_KEY}');if(s)return s}catch(e){}try{var m=document.cookie.match(/(?:^|; )${PENDING_CONVERSION_KEY}=([^;]*)/);return m?decodeURIComponent(m[1]):null}catch(e){return null}})()`;

/** Parenthesized expression so `if (eid) fn(eid)` cannot parse as a statement. */
export const HAS_META_FIRED_JS = `(function(id){try{if(sessionStorage.getItem('${META_FIRED_PREFIX}'+id))return true}catch(e){}try{var m=document.cookie.match(/(?:^|; )${META_FIRED_COOKIE}=([^;]*)/);if(m){var ids=JSON.parse(decodeURIComponent(m[1]));if(ids&&ids.indexOf(id)>=0)return true}}catch(e){}return false})`;

/** Parenthesized expression so `if (eid) fn(eid)` cannot parse as a statement. */
export const MARK_META_FIRED_JS = `(function(id){try{sessionStorage.setItem('${META_FIRED_PREFIX}'+id,'1')}catch(e){}try{var ids=[];var m=document.cookie.match(/(?:^|; )${META_FIRED_COOKIE}=([^;]*)/);if(m)ids=JSON.parse(decodeURIComponent(m[1]))||[];if(ids.indexOf(id)<0)ids.push(id);document.cookie='${META_FIRED_COOKIE}='+encodeURIComponent(JSON.stringify(ids.slice(-20)))+'; Path=/; Max-Age=${MAX_AGE_SECONDS}; SameSite=Lax'}catch(e){}})`;

export function createMetaEventId(event: MetaConversionEvent | string): string {
  const rand =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `${event}.${rand}`;
}

export function resolveMetaConversionEvent(
  pending: PendingConversion,
): MetaConversionEvent | null {
  if (
    pending.metaEvent === "Lead" ||
    pending.metaEvent === "Schedule" ||
    pending.metaEvent === "Purchase"
  ) {
    return pending.metaEvent;
  }
  if (pending.type === "booking") return "Schedule";
  if (pending.type === "purchase") return "Purchase";
  if (pending.type === "lead" || pending.type === "audit") return "Lead";
  return null;
}

function sessionStore(): Storage | undefined {
  try {
    return typeof window !== "undefined"
      ? window.sessionStorage
      : typeof sessionStorage !== "undefined"
        ? sessionStorage
        : undefined;
  } catch {
    return undefined;
  }
}

function readFiredIds(): Set<string> {
  const ids = new Set<string>(claimedMetaEventIds);
  const store = sessionStore();
  try {
    if (store) {
      for (let i = 0; i < store.length; i += 1) {
        const key = store.key(i);
        if (key?.startsWith(META_FIRED_PREFIX)) {
          ids.add(key.slice(META_FIRED_PREFIX.length));
        }
      }
    }
  } catch {
    // ignore
  }
  const cookie = readDocumentCookie(META_FIRED_COOKIE);
  if (cookie) {
    try {
      const parsed = JSON.parse(cookie) as unknown;
      if (Array.isArray(parsed)) {
        for (const id of parsed) {
          if (typeof id === "string" && id) ids.add(id);
        }
      }
    } catch {
      // ignore
    }
  }
  return ids;
}

/** Returns false when this event id already fired (dedupe across submit + thank-you). */
export function claimMetaEventFire(eventId: string): boolean {
  if (!eventId) return true;
  if (claimedMetaEventIds.has(eventId)) return false;
  const ids = readFiredIds();
  if (ids.has(eventId)) {
    claimedMetaEventIds.add(eventId);
    return false;
  }
  try {
    sessionStore()?.setItem(`${META_FIRED_PREFIX}${eventId}`, "1");
  } catch {
    // ignore
  }
  ids.add(eventId);
  claimedMetaEventIds.add(eventId);
  writeDocumentCookie(
    META_FIRED_COOKIE,
    JSON.stringify([...ids].slice(-20)),
    MAX_AGE_SECONDS,
  );
  return true;
}

function parsePending(raw: string | null): PendingConversion | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as PendingConversion;
    if (!parsed?.type) return null;
    if (parsed.type !== "purchase" && !parsed.email) return null;
    if (Date.now() - parsed.storedAt > MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function readPendingRaw(): string | null {
  try {
    const fromSession = sessionStore()?.getItem(PENDING_CONVERSION_KEY) ?? null;
    if (fromSession) return fromSession;
  } catch {
    // ignore
  }
  return readDocumentCookie(PENDING_CONVERSION_KEY);
}

export function stashPendingConversion(
  data: Omit<PendingConversion, "storedAt">,
): void {
  if (typeof window === "undefined") return;
  const payload: PendingConversion = { ...data, storedAt: Date.now() };
  const raw = JSON.stringify(payload);
  try {
    sessionStore()?.setItem(PENDING_CONVERSION_KEY, raw);
  } catch {
    // ignore
  }
  writeDocumentCookie(PENDING_CONVERSION_KEY, raw, MAX_AGE_SECONDS);
}

export function peekPendingConversion(
  expectedType?: PendingConversion["type"],
): PendingConversion | null {
  if (typeof window === "undefined") return null;
  const parsed = parsePending(readPendingRaw());
  if (!parsed) return null;
  if (expectedType && parsed.type !== expectedType) return null;
  return parsed;
}

export function consumePendingConversion(
  expectedType?: PendingConversion["type"],
): PendingConversion | null {
  const parsed = peekPendingConversion(expectedType);
  try {
    sessionStore()?.removeItem(PENDING_CONVERSION_KEY);
  } catch {
    // ignore
  }
  clearDocumentCookie(PENDING_CONVERSION_KEY);
  return parsed;
}

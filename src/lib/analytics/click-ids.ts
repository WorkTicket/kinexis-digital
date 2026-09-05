/**
 * Capture and persist Google / Meta click IDs + UTM params for closed-loop attribution.
 * sessionStorage first; first-party cookie fallback for Instagram/Facebook WebViews.
 */

import {
  readDocumentCookie,
  writeDocumentCookie,
} from "@/lib/client-cookie";

export const CLICK_ID_STORAGE_KEY = "kinexis-ads-attribution";

export type AttributionData = {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  fbclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_page?: string;
  captured_at?: string;
  /** Meta Pixel first-party cookies for Conversions API. */
  fbp?: string;
  fbc?: string;
};

const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid", "fbclid"] as const;
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const MAX_PARAM_LENGTH = 200;
/** Meta click ID cookie window (90 days). */
const ATTRIBUTION_COOKIE_MAX_AGE = 60 * 60 * 24 * 90;

function sanitizeParam(value: string | null): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim().slice(0, MAX_PARAM_LENGTH);
  return trimmed.length > 0 ? trimmed : undefined;
}

/** Parse attribution fields from a URLSearchParams (or URL search string). Pure — no DOM. */
export function parseAttributionFromSearch(
  search: string | URLSearchParams,
): AttributionData {
  const params =
    typeof search === "string" ? new URLSearchParams(search) : search;

  const data: AttributionData = {};

  for (const key of CLICK_ID_KEYS) {
    const value = sanitizeParam(params.get(key));
    if (value) data[key] = value;
  }

  for (const key of UTM_KEYS) {
    const value = sanitizeParam(params.get(key));
    if (value) data[key] = value;
  }

  return data;
}

function hasAttributionSignal(data: AttributionData): boolean {
  return (
    Boolean(data.gclid) ||
    Boolean(data.gbraid) ||
    Boolean(data.wbraid) ||
    Boolean(data.fbclid) ||
    Boolean(data.utm_source) ||
    Boolean(data.utm_medium) ||
    Boolean(data.utm_campaign)
  );
}

function parseStoredJson(raw: string | null): AttributionData | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as AttributionData;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function readStored(): AttributionData | null {
  if (typeof window === "undefined") return null;
  try {
    const fromSession = parseStoredJson(
      window.sessionStorage.getItem(CLICK_ID_STORAGE_KEY),
    );
    if (fromSession) return fromSession;
  } catch {
    // sessionStorage blocked (common in Instagram iOS)
  }
  return parseStoredJson(readDocumentCookie(CLICK_ID_STORAGE_KEY));
}

/**
 * Meta first-party `_fbc` from fbclid so the Pixel can still attribute after
 * the query string is dropped (consent delay, in-app navigation).
 * Format: fb.{subdomainIndex}.{creationTime}.{fbclid}
 */
export function fbcCookieFromFbclid(
  fbclid: string,
  hostname = typeof location !== "undefined" ? location.hostname : "",
  now = Date.now(),
): string {
  const parts = hostname.split(".").filter(Boolean);
  const subdomainIndex = Math.max(parts.length - 1, 1);
  return `fb.${subdomainIndex}.${now}.${fbclid}`;
}

function persistFbcCookie(fbclid: string): void {
  const existing = readDocumentCookie("_fbc");
  if (existing && existing.endsWith(`.${fbclid}`)) return;
  writeDocumentCookie(
    "_fbc",
    fbcCookieFromFbclid(fbclid),
    ATTRIBUTION_COOKIE_MAX_AGE,
  );
}

function writeStored(data: AttributionData): void {
  if (typeof window === "undefined") return;
  const raw = JSON.stringify(data);
  try {
    window.sessionStorage.setItem(CLICK_ID_STORAGE_KEY, raw);
  } catch {
    // sessionStorage may be blocked — cookie + live URL still cover this visit
  }
  writeDocumentCookie(CLICK_ID_STORAGE_KEY, raw, ATTRIBUTION_COOKIE_MAX_AGE);
  if (data.fbclid) persistFbcCookie(data.fbclid);
}

/**
 * Capture click IDs / UTMs from the current URL into sessionStorage.
 * First-touch within the session wins for click IDs; UTMs refresh when present.
 */
export function captureClickIds(): AttributionData {
  if (typeof window === "undefined") return {};

  const fromUrl = parseAttributionFromSearch(window.location.search);
  const existing = readStored() ?? {};

  const merged: AttributionData = { ...existing };

  // Click IDs: keep first-touch within the session unless a new one arrives
  for (const key of CLICK_ID_KEYS) {
    if (fromUrl[key]) merged[key] = fromUrl[key];
  }

  for (const key of UTM_KEYS) {
    if (fromUrl[key]) merged[key] = fromUrl[key];
  }

  if (hasAttributionSignal(fromUrl) || !existing.landing_page) {
    if (!merged.landing_page) {
      merged.landing_page = `${window.location.pathname}${window.location.search}`.slice(
        0,
        500,
      );
    }
    if (!merged.captured_at) {
      merged.captured_at = new Date().toISOString();
    }
  }

  if (hasAttributionSignal(merged) || merged.landing_page) {
    writeStored(merged);
  }

  return merged;
}

function pixelCookies(): Pick<AttributionData, "fbp" | "fbc"> {
  const fbp = readDocumentCookie("_fbp") ?? undefined;
  const fbc = readDocumentCookie("_fbc") ?? undefined;
  return {
    ...(fbp ? { fbp } : {}),
    ...(fbc ? { fbc } : {}),
  };
}

/** Return stored attribution for attaching to form payloads. */
export function getAttributionPayload(): AttributionData {
  if (typeof window === "undefined") return {};
  const cookies = pixelCookies();
  const stored = readStored();
  // Include landing_page-only storage (no click IDs/UTMs) so lead emails
  // still show which page converted organic or direct traffic.
  if (stored && (hasAttributionSignal(stored) || stored.landing_page)) {
    return { ...stored, ...cookies };
  }

  // Fallback: parse live URL if storage was empty/blocked
  const fromUrl = parseAttributionFromSearch(window.location.search);
  if (hasAttributionSignal(fromUrl)) return { ...fromUrl, ...cookies };

  return {
    landing_page: `${window.location.pathname}${window.location.search}`.slice(
      0,
      500,
    ),
    ...cookies,
  };
}

/** Validate attribution fields from an API request body. Returns sanitized subset. */
export function sanitizeAttributionFromBody(
  body: Record<string, unknown>,
): AttributionData {
  const out: AttributionData = {};
  const allKeys = [
    ...CLICK_ID_KEYS,
    ...UTM_KEYS,
    "landing_page",
    "captured_at",
    "fbp",
    "fbc",
  ] as const;

  for (const key of allKeys) {
    const raw = body[key];
    if (typeof raw !== "string") continue;
    const value = sanitizeParam(raw);
    if (!value) continue;
    if (key === "landing_page") {
      out.landing_page = value.slice(0, 500);
    } else if (key === "captured_at") {
      // Accept ISO-ish timestamps only
      if (/^\d{4}-\d{2}-\d{2}T/.test(value)) {
        out.captured_at = value.slice(0, 40);
      }
    } else {
      out[key] = value;
    }
  }

  return out;
}

/** Build email rows for attribution fields (empty string if none). */
export function attributionEmailRows(
  data: AttributionData,
  emailRow: (label: string, value: string) => string,
): string {
  const rows: string[] = [];
  if (data.gclid) rows.push(emailRow("GCLID", data.gclid));
  if (data.gbraid) rows.push(emailRow("GBRAID", data.gbraid));
  if (data.wbraid) rows.push(emailRow("WBRAID", data.wbraid));
  if (data.fbclid) rows.push(emailRow("FBCLID", data.fbclid));
  if (data.utm_source) rows.push(emailRow("UTM Source", data.utm_source));
  if (data.utm_medium) rows.push(emailRow("UTM Medium", data.utm_medium));
  if (data.utm_campaign) rows.push(emailRow("UTM Campaign", data.utm_campaign));
  if (data.utm_term) rows.push(emailRow("UTM Term", data.utm_term));
  if (data.utm_content) rows.push(emailRow("UTM Content", data.utm_content));
  if (data.landing_page) rows.push(emailRow("Landing Page", data.landing_page));
  return rows.join("");
}

/** Plain-text lines for attribution in lead emails. */
export function attributionTextLines(data: AttributionData): string[] {
  const lines: string[] = [];
  if (data.gclid) lines.push(`GCLID: ${data.gclid}`);
  if (data.gbraid) lines.push(`GBRAID: ${data.gbraid}`);
  if (data.wbraid) lines.push(`WBRAID: ${data.wbraid}`);
  if (data.fbclid) lines.push(`FBCLID: ${data.fbclid}`);
  if (data.utm_source) lines.push(`UTM Source: ${data.utm_source}`);
  if (data.utm_medium) lines.push(`UTM Medium: ${data.utm_medium}`);
  if (data.utm_campaign) lines.push(`UTM Campaign: ${data.utm_campaign}`);
  if (data.utm_term) lines.push(`UTM Term: ${data.utm_term}`);
  if (data.utm_content) lines.push(`UTM Content: ${data.utm_content}`);
  if (data.landing_page) lines.push(`Landing Page: ${data.landing_page}`);
  return lines;
}

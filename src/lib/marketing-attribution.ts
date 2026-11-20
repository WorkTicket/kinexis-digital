export const ATTRIBUTION_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
  "referrer",
] as const;

export type MarketingAttribution = Partial<Record<(typeof ATTRIBUTION_FIELDS)[number], string>>;

const UTM_PATTERN = /^[\p{L}\p{N} ._~:+-]+$/u;
const CLICK_ID_PATTERN = /^[A-Za-z0-9._~-]+$/;

function cleanText(value: unknown, max: number, pattern: RegExp): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  if (!normalized || normalized.length > max || !pattern.test(normalized)) return null;
  return normalized;
}

/**
 * Normalize untrusted browser-submitted attribution before it reaches lead email.
 * Only first-touch fields supplied by the browser are considered; direct is never synthesized.
 */
export function sanitizeMarketingAttribution(input: Record<string, unknown>): MarketingAttribution {
  const result: MarketingAttribution = {};
  for (const key of ATTRIBUTION_FIELDS) {
    const value = input[key];
    if (key.startsWith("utm_")) {
      const clean = cleanText(value, 100, UTM_PATTERN);
      if (clean) result[key] = clean;
    } else if (key === "referrer") {
      if (typeof value !== "string" || value.length > 500) continue;
      try {
        const url = new URL(value);
        if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) continue;
        result.referrer = `${url.origin}${url.pathname}`.slice(0, 300);
      } catch {
        // Omit malformed referrers.
      }
    } else {
      const clean = cleanText(value, 256, CLICK_ID_PATTERN);
      if (clean) result[key] = clean;
    }
  }
  return result;
}

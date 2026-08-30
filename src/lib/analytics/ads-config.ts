/**
 * Shared Google Ads / GA4 ID resolution for layout, gtag loaders, and events.
 * Invalid or empty values return undefined so callers can no-op safely.
 */

/** Production Google tag / conversion ID for www.kinexisdigital.com. */
export const PRODUCTION_GOOGLE_ADS_ID = "AW-18409243306";

/** Production GA4 measurement ID paired with the Google tag. */
export const PRODUCTION_GA_ID = "G-Z8245BRX2L";

/** "Submit lead form (1)" — page-load event snippet on /thank-you. */
export const PRODUCTION_GADS_LABEL_LEAD = "AtDSCIa1--ccEKqFm8pE";

/** Production Meta Pixel for Facebook / Instagram ads (web design lander). */
export const PRODUCTION_META_PIXEL_ID = "2080705549212381";

function productionFallback(raw: string | undefined, fallback: string): string | undefined {
  // Explicit empty disables (tests / local opt-out).
  if (raw !== undefined && raw.trim() === "") return undefined;
  return (
    raw?.trim() ||
    (process.env.NODE_ENV === "production" ? fallback : undefined)
  );
}

export function getGaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_ID?.trim();
  return id && id.startsWith("G-") ? id : undefined;
}

export function getGoogleAdsId(): string | undefined {
  const id = productionFallback(
    process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
    PRODUCTION_GOOGLE_ADS_ID,
  );
  return id && id.startsWith("AW-") ? id : undefined;
}

export function getLeadConversionLabel(): string | undefined {
  return productionFallback(
    process.env.NEXT_PUBLIC_GADS_LABEL_LEAD,
    PRODUCTION_GADS_LABEL_LEAD,
  );
}

/** `AW-…/label` for the Submit lead form conversion event snippet. */
export function getLeadConversionSendTo(): string | undefined {
  const adsId = getGoogleAdsId();
  const label = getLeadConversionLabel();
  if (!adsId || !label) return undefined;
  return `${adsId}/${label}`;
}

/** Classic conversion pixel for no-JS / AdsBot fetches of /thank-you. */
export function getLeadConversionPixelUrl(): string | undefined {
  const adsId = getGoogleAdsId();
  const label = getLeadConversionLabel();
  if (!adsId || !label) return undefined;
  const conversionId = adsId.replace(/^AW-/, "");
  if (!/^\d+$/.test(conversionId)) return undefined;
  return `https://www.googleadservices.com/pagead/conversion/${conversionId}/?label=${encodeURIComponent(label)}&guid=ON&script=0`;
}

/**
 * LP / audit conversions. Uses NEXT_PUBLIC_GADS_LABEL_AUDIT when set;
 * otherwise the lead label so reviews still count while the audit action
 * is being created in Google Ads.
 */
export function getAuditConversionLabel(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_GADS_LABEL_AUDIT;
  if (raw?.trim()) return raw.trim();
  return getLeadConversionLabel();
}

/**
 * Per-lander Google Ads conversion labels. Create a conversion action per
 * campaign in Ads, then set the env var. Falls back to the shared audit
 * label until those actions exist — do not leave them unset in production
 * once both landers are spending.
 */
export function getLandingPageConversionLabel(
  slug?: string,
): string | undefined {
  if (slug === "web-design") {
    const raw = process.env.NEXT_PUBLIC_GADS_LABEL_LP_WEB_DESIGN;
    if (raw?.trim()) return raw.trim();
  }
  if (slug === "facebook-web-design") {
    const raw = process.env.NEXT_PUBLIC_GADS_LABEL_LP_FACEBOOK_WEB_DESIGN;
    if (raw?.trim()) return raw.trim();
  }
  return getAuditConversionLabel();
}

/** Prefer GA4 for the gtag.js loader; fall back to Ads when GA is unset. */
export function getGtagLoaderId(): string | undefined {
  return getGaMeasurementId() ?? getGoogleAdsId();
}

/** Meta Pixel ID. Invalid or empty values return undefined so callers can no-op. */
export function getMetaPixelId(): string | undefined {
  const id = productionFallback(
    process.env.NEXT_PUBLIC_META_PIXEL_ID,
    PRODUCTION_META_PIXEL_ID,
  );
  return id && /^\d{5,20}$/.test(id) ? id : undefined;
}


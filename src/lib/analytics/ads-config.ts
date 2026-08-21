/**
 * Shared Google Ads / GA4 ID resolution for layout, gtag loaders, and events.
 * Invalid or empty values return undefined so callers can no-op safely.
 */

export function getGaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_ID?.trim();
  return id && id.startsWith("G-") ? id : undefined;
}

export function getGoogleAdsId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
  return id && id.startsWith("AW-") ? id : undefined;
}

/** Prefer GA4 for the gtag.js loader; fall back to Ads when GA is unset. */
export function getGtagLoaderId(): string | undefined {
  return getGaMeasurementId() ?? getGoogleAdsId();
}

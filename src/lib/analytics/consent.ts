/**
 * Consent Mode v2 helpers shared by CookieConsent consumers and conversion tags.
 * Update consent before firing Ads conversions so cookieless / modeled pings are correct.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const CONSENT_STORAGE_KEY = "kinexis-cookie-consent";

const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Inline: apply a stored banner choice before gtag.js flushes the queue. */
export const GTAG_CONSENT_RESTORE_SCRIPT =
  "try{var c=localStorage.getItem('kinexis-cookie-consent');if(c==='accepted')gtag('consent','update',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});else if(c==='rejected')gtag('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});}catch(e){}";

/** Mirror the banner choice to a first-party cookie so the edge can gate tags. */
export function persistConsentChoice(value: "accepted" | "rejected"): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // private mode / blocked storage
  }
  if (typeof document === "undefined") return;
  document.cookie = `${CONSENT_STORAGE_KEY}=${value}; Path=/; Max-Age=${CONSENT_COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function updateGtagConsent(granted: boolean): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  });
}

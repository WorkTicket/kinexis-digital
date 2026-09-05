/**
 * Consent Mode v2 helpers shared by CookieConsent consumers and conversion tags.
 * Update consent before firing Ads conversions so cookieless / modeled pings are correct.
 */

import { readDocumentCookie, writeDocumentCookie } from "@/lib/client-cookie";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const CONSENT_STORAGE_KEY = "kinexis-cookie-consent";

const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export type ConsentChoice = "accepted" | "rejected";

function isConsentChoice(value: string | null | undefined): value is ConsentChoice {
  return value === "accepted" || value === "rejected";
}

/**
 * Inline expression: stored banner choice from localStorage, then the
 * first-party cookie. WebViews (Instagram/Facebook) often block storage.
 */
export const READ_STORED_CONSENT_JS =
  "(function(){try{var c=localStorage.getItem('kinexis-cookie-consent');if(c==='accepted'||c==='rejected')return c}catch(e){}try{var m=document.cookie.match(/(?:^|; )kinexis-cookie-consent=(accepted|rejected)/);if(m)return m[1]}catch(e){}return null})()";

/** Inline: apply a stored banner choice before gtag.js flushes the queue. */
export const GTAG_CONSENT_RESTORE_SCRIPT = `try{var c=${READ_STORED_CONSENT_JS};if(c==='accepted')gtag('consent','update',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});else if(c==='rejected')gtag('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});}catch(e){}`;

export function readStoredConsent(): ConsentChoice | null {
  try {
    if (typeof localStorage !== "undefined") {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (isConsentChoice(stored)) return stored;
    }
  } catch {
    // private mode / Instagram WebView
  }
  const fromCookie = readDocumentCookie(CONSENT_STORAGE_KEY);
  return isConsentChoice(fromCookie) ? fromCookie : null;
}

/** Mirror the banner choice to a first-party cookie so the edge can gate tags. */
export function persistConsentChoice(value: ConsentChoice): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // private mode / blocked storage
  }
  writeDocumentCookie(CONSENT_STORAGE_KEY, value, CONSENT_COOKIE_MAX_AGE);
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

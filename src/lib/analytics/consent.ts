/**
 * Consent Mode v2 helpers shared by CookieConsent consumers and conversion tags.
 * Update consent before firing Ads conversions so cookieless / modeled pings are correct.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
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

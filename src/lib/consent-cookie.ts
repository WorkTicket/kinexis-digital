/** Pure consent-cookie helpers — safe for the client CookieConsent island. */

export function parseConsentCookie(raw: string | null | undefined): {
  decided: boolean;
  analytics: boolean;
  ads: boolean;
} {
  if (!raw) return { decided: false, analytics: false, ads: false };
  try {
    const v = decodeURIComponent(raw);
    if (!v.startsWith("v1|")) return { decided: false, analytics: false, ads: false };
    return {
      decided: true,
      analytics: /(?:^|\|)a=1(?:\||$)/.test(v),
      ads: /(?:^|\|)d=1(?:\||$)/.test(v),
    };
  } catch {
    return { decided: false, analytics: false, ads: false };
  }
}

export function formatConsentCookie(analytics: boolean, ads: boolean) {
  return `v1|a=${analytics ? 1 : 0}|d=${ads ? 1 : 0}`;
}

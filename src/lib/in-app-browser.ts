/**
 * Facebook / Instagram (and related) in-app browsers. Ads open here, not in
 * Safari or Chrome, and several WebView quirks break forms, storage, and
 * client-side navigation.
 */

const IN_APP_UA_RE =
  /FBAN|FBAV|FB_IAB|FB4A|FBIOS|Instagram|Messenger|Line\/|TikTok|BytedanceWebview|Twitter/i;

const INSTAGRAM_UA_RE = /Instagram/i;
const FACEBOOK_UA_RE = /FBAN|FBAV|FB_IAB|FB4A|FBIOS/i;

export type InAppBrowserKind = "facebook" | "instagram" | "other";

export function getUserAgent(
  userAgent?: string | null,
): string {
  if (userAgent) return userAgent;
  if (typeof navigator === "undefined") return "";
  return navigator.userAgent ?? "";
}

export function isInAppBrowser(userAgent?: string | null): boolean {
  return IN_APP_UA_RE.test(getUserAgent(userAgent));
}

export function getInAppBrowserKind(
  userAgent?: string | null,
): InAppBrowserKind | null {
  const ua = getUserAgent(userAgent);
  if (!IN_APP_UA_RE.test(ua)) return null;
  if (INSTAGRAM_UA_RE.test(ua)) return "instagram";
  if (FACEBOOK_UA_RE.test(ua)) return "facebook";
  return "other";
}

/**
 * Thank-you and other post-submit navigations. Meta WebViews often drop
 * History API updates, so a full load is more reliable than router.push.
 */
export function navigateAfterSubmit(
  href: string,
  router?: { push: (href: string) => void },
): void {
  if (typeof window === "undefined") return;
  if (isInAppBrowser() || typeof router?.push !== "function") {
    window.location.assign(href);
    return;
  }
  try {
    router.push(href);
  } catch {
    window.location.assign(href);
  }
}

/** Runs before paint so CSS can offset Instagram/Facebook chrome. */
export const IN_APP_BROWSER_PREFLIGHT_SCRIPT =
  '(function(){try{var r=document.documentElement;var ua=navigator.userAgent||"";if(/FBAN|FBAV|FB_IAB|FB4A|FBIOS|Instagram|Messenger/i.test(ua)){r.classList.add("in-app-browser");if(/Instagram/i.test(ua))r.classList.add("in-app-instagram");else if(/FBAN|FBAV|FB_IAB|FB4A|FBIOS/i.test(ua))r.classList.add("in-app-facebook")}}catch(e){}})();';

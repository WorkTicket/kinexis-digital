/**
 * Meta Pixel (Facebook) base tag + standard-event helpers.
 * Mirrors the Google tag pattern: production ID fallback, no-op when unset.
 */

import { getMetaPixelId } from "@/lib/analytics/ads-config";
import { PENDING_CONVERSION_KEY } from "@/lib/analytics/pending-conversion";

const PIXEL_ID_PATTERN = /^\d{5,20}$/;

export type MetaStandardEvent = "PageView" | "Lead" | "Contact" | "Schedule";

export type MetaLeadOptions = {
  email?: string;
  phone?: string;
  contentName?: string;
  contentCategory?: string;
  value?: number;
  currency?: string;
};

declare global {
  interface Window {
    fbq?: MetaPixelFn;
    _fbq?: MetaPixelFn;
  }
}

type MetaPixelFn = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded: boolean;
  version: string;
  push: MetaPixelFn;
};

function validPixelId(id: string | undefined): string | undefined {
  return id && PIXEL_ID_PATTERN.test(id) ? id : undefined;
}

function canTrackMeta(): boolean {
  return typeof window !== "undefined" && typeof window.fbq === "function";
}

export type MetaPixelInitOptions = {
  /**
   * GDPR countries should start revoked so PageView waits for the banner.
   * Elsewhere matches Google Consent Mode (granted until the visitor rejects).
   */
  defaultConsent?: "grant" | "revoke";
};

/** Official fbevents.js stub + init + PageView. Consent restore before init. */
export function buildMetaPixelInitScript(
  pixelId?: string,
  options: MetaPixelInitOptions = {},
): string {
  const id = validPixelId(pixelId);
  if (!id) return "";
  const defaultConsent = options.defaultConsent === "revoke" ? "revoke" : "grant";

  return [
    "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');",
    `fbq('consent','${defaultConsent}');`,
    "try{var c=localStorage.getItem('kinexis-cookie-consent');if(c==='rejected')fbq('consent','revoke');else if(c==='accepted')fbq('consent','grant');}catch(e){}",
    `fbq('init','${id}');`,
    "fbq('track','PageView');",
  ].join("");
}

/**
 * Early <head> HTML for the Cloudflare worker prepend (no element ids).
 * React layout copies use id="meta-pixel-init" so the worker can strip dupes.
 */
export function buildEarlyMetaPixelHtml(
  pixelId?: string,
  options: MetaPixelInitOptions = {},
): string {
  const init = buildMetaPixelInitScript(pixelId, options);
  if (!init) return "";
  const lead = buildMetaLeadSnippet(pixelId);
  return `<script>${init}</script>${lead ? `<script>${lead}</script>` : ""}`;
}

/**
 * Page-load Lead event on /thank-you, with Advanced Matching from the
 * pending-conversion stash. Skips when the form already fired Lead.
 */
export function buildMetaLeadSnippet(pixelId?: string): string {
  const id = validPixelId(pixelId);
  if (!id) return "";

  return [
    "(function(){",
    "if(typeof fbq!=='function')return;",
    "if(!/(^|\\/)thank-you(\\/|$)/.test(location.pathname))return;",
    "try{",
    "var c=localStorage.getItem('kinexis-cookie-consent');",
    "if(c==='rejected'){fbq('consent','revoke');return;}",
    "if(c==='accepted')fbq('consent','grant');",
    `var raw=sessionStorage.getItem('${PENDING_CONVERSION_KEY}');`,
    "if(raw){",
    "var p=JSON.parse(raw);",
    "if(p&&p.conversionAlreadyFired&&!/[?&]_dbg=/.test(location.search))return;",
    "if(p&&p.email){",
    "var ud={em:String(p.email).trim().toLowerCase()};",
    "if(p.phone){var ph=String(p.phone).replace(/[^\\d+]/g,'');if(ph)ud.ph=ph;}",
    `fbq('init','${id}',ud);`,
    "}",
    "}",
    "}catch(e){}",
    "fbq('track','Lead');",
    "})();",
  ].join("");
}

export function updateMetaPixelConsent(granted: boolean): void {
  if (!canTrackMeta()) return;
  window.fbq!("consent", granted ? "grant" : "revoke");
}

function advancedMatching(options: MetaLeadOptions): Record<string, string> {
  const userData: Record<string, string> = {};
  if (options.email) {
    userData.em = options.email.trim().toLowerCase();
  }
  if (options.phone) {
    const phone = options.phone.replace(/[^\d+]/g, "");
    if (phone) userData.ph = phone;
  }
  return userData;
}

/** Re-init with Advanced Matching, then fire a standard event. */
export function trackMetaEvent(
  event: MetaStandardEvent,
  options: MetaLeadOptions = {},
): boolean {
  if (!canTrackMeta()) return false;
  const pixelId = getMetaPixelId();
  if (!pixelId) return false;

  const userData = advancedMatching(options);
  if (Object.keys(userData).length > 0) {
    window.fbq!("init", pixelId, userData);
  }

  const payload: Record<string, unknown> = {};
  if (options.contentName) payload.content_name = options.contentName;
  if (options.contentCategory) payload.content_category = options.contentCategory;
  if (typeof options.value === "number") payload.value = options.value;
  if (options.currency) payload.currency = options.currency;

  if (Object.keys(payload).length > 0) {
    window.fbq!("track", event, payload);
  } else {
    window.fbq!("track", event);
  }
  return true;
}

export function trackMetaLead(options: MetaLeadOptions = {}): boolean {
  return trackMetaEvent("Lead", options);
}

export function trackMetaPageView(): boolean {
  if (!canTrackMeta() || !getMetaPixelId()) return false;
  window.fbq!("track", "PageView");
  return true;
}

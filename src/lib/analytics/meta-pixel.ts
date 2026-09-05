/**
 * Meta Pixel (Facebook) base tag + standard-event helpers.
 * Mirrors the Google tag pattern: production ID fallback, no-op when unset.
 *
 * Conversion events (Lead / Schedule / Purchase) are fired only after a
 * confirmed success, then suppressed by metaEventId so submit, thank-you,
 * and refresh cannot double-count. ViewContent is owned elsewhere — do not
 * add it here. Search is omitted because the site has no internal search.
 */

import { getMetaPixelId } from "@/lib/analytics/ads-config";
import { READ_STORED_CONSENT_JS } from "@/lib/analytics/consent";
import {
  claimMetaEventFire,
  HAS_META_FIRED_JS,
  MARK_META_FIRED_JS,
  peekPendingConversion,
  READ_PENDING_CONVERSION_JS,
  resolveMetaConversionEvent,
  type PendingConversion,
} from "@/lib/analytics/pending-conversion";

const PIXEL_ID_PATTERN = /^\d{5,20}$/;

export type MetaStandardEvent = "PageView" | "Lead" | "Contact" | "Schedule" | "Purchase";

export type MetaEventOptions = {
  email?: string;
  phone?: string;
  contentName?: string;
  contentCategory?: string;
  value?: number;
  currency?: string;
  eventId?: string;
};

/** @deprecated Use MetaEventOptions. */
export type MetaLeadOptions = MetaEventOptions;

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
    `try{var c=${READ_STORED_CONSENT_JS};if(c==='rejected')fbq('consent','revoke');else if(c==='accepted')fbq('consent','grant');}catch(e){}`,
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
  const conversion = buildMetaConversionSnippet(pixelId);
  return `<script>${init}</script>${conversion ? `<script>${conversion}</script>` : ""}`;
}

/**
 * Confirmation-page Pixel events for Lead / Schedule / Purchase.
 * Lives in <head> so Events Manager can see the standard event names, but
 * only fires on /thank-you when a pending confirmed conversion exists and
 * has not already been claimed. Direct visits and refreshes no-op.
 */
export function buildMetaConversionSnippet(pixelId?: string): string {
  const id = validPixelId(pixelId);
  if (!id) return "";

  return [
    "(function(){",
    "if(typeof fbq!=='function')return;",
    "if(!/(^|\\/)thank-you(\\/|$)/.test(location.pathname))return;",
    "try{",
    `var c=${READ_STORED_CONSENT_JS};`,
    "if(c==='rejected'){fbq('consent','revoke');return;}",
    "if(c==='accepted')fbq('consent','grant');",
    `var raw=${READ_PENDING_CONVERSION_JS};`,
    "if(!raw)return;",
    "var p=JSON.parse(raw);",
    "if(!p||!p.type)return;",
    "var event=p.metaEvent||(p.type==='booking'?'Schedule':p.type==='purchase'?'Purchase':'Lead');",
    "if(event!=='Lead'&&event!=='Schedule'&&event!=='Purchase')return;",
    "var eid=p.metaEventId?String(p.metaEventId):'';",
    `if(eid&&${HAS_META_FIRED_JS}(eid))return;`,
    "if(!eid&&p.conversionAlreadyFired&&!/[?&]_dbg=/.test(location.search))return;",
    "if(p.email){",
    "var ud={em:String(p.email).trim().toLowerCase()};",
    "if(p.phone){var ph=String(p.phone).replace(/[^\\d+]/g,'');if(ph)ud.ph=ph;}",
    `fbq('init','${id}',ud);`,
    "}",
    "var opts=eid?{eventID:eid}:undefined;",
    "if(event==='Purchase'){",
    "if(typeof p.purchaseValue!=='number'||!(p.purchaseValue>0))return;",
    "fbq('track','Purchase',{value:p.purchaseValue,currency:p.purchaseCurrency||'USD'},opts||{});",
    "}else if(event==='Schedule'){",
    "opts?fbq('track','Schedule',{},opts):fbq('track','Schedule');",
    "}else{",
    "opts?fbq('track','Lead',{},opts):fbq('track','Lead');",
    "}",
    `if(eid)${MARK_META_FIRED_JS}(eid);`,
    "}catch(e){}",
    "})();",
  ].join("");
}

/** @deprecated Use buildMetaConversionSnippet. */
export function buildMetaLeadSnippet(pixelId?: string): string {
  return buildMetaConversionSnippet(pixelId);
}

export function updateMetaPixelConsent(granted: boolean): void {
  if (!canTrackMeta()) return;
  window.fbq!("consent", granted ? "grant" : "revoke");
}

function advancedMatching(options: MetaEventOptions): Record<string, string> {
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

/** Re-init with Advanced Matching, then fire a standard event once per eventId. */
export function trackMetaEvent(
  event: MetaStandardEvent,
  options: MetaEventOptions = {},
): boolean {
  if (!canTrackMeta()) return false;
  const pixelId = getMetaPixelId();
  if (!pixelId) return false;
  if (options.eventId && !claimMetaEventFire(options.eventId)) return false;

  const userData = advancedMatching(options);
  if (Object.keys(userData).length > 0) {
    window.fbq!("init", pixelId, userData);
  }

  const payload: Record<string, unknown> = {};
  if (options.contentName) payload.content_name = options.contentName;
  if (options.contentCategory) payload.content_category = options.contentCategory;
  if (typeof options.value === "number") payload.value = options.value;
  if (options.currency) payload.currency = options.currency;

  const trackOptions = options.eventId ? { eventID: options.eventId } : undefined;
  if (Object.keys(payload).length > 0) {
    if (trackOptions) {
      window.fbq!("track", event, payload, trackOptions);
    } else {
      window.fbq!("track", event, payload);
    }
  } else if (trackOptions) {
    window.fbq!("track", event, {}, trackOptions);
  } else {
    window.fbq!("track", event);
  }
  return true;
}

export function trackMetaLead(options: MetaEventOptions = {}): boolean {
  return trackMetaEvent("Lead", options);
}

export function trackMetaSchedule(options: MetaEventOptions = {}): boolean {
  return trackMetaEvent("Schedule", options);
}

export function trackMetaPurchase(
  options: MetaEventOptions & { value: number },
): boolean {
  if (!Number.isFinite(options.value) || options.value <= 0) return false;
  return trackMetaEvent("Purchase", {
    ...options,
    currency: options.currency || "USD",
  });
}

/**
 * SPA fallback: fire the pending Meta conversion on /thank-you if submit
 * did not already claim the event id (pixel missing, full page load, etc.).
 */
export function firePendingMetaConversion(
  pending: PendingConversion | null = peekPendingConversion(),
): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (!/(^|\/)thank-you(\/|$)/.test(window.location?.pathname ?? "")) {
      return false;
    }
  } catch {
    return false;
  }
  if (!pending) return false;

  const event = resolveMetaConversionEvent(pending);
  if (!event) return false;

  const shared = {
    email: pending.email,
    phone: pending.phone,
    contentName: pending.landingSlug ?? pending.serviceInterest,
    contentCategory: pending.formType,
    eventId: pending.metaEventId,
  };

  if (event === "Purchase") {
    if (typeof pending.purchaseValue !== "number" || pending.purchaseValue <= 0) {
      return false;
    }
    return trackMetaPurchase({
      ...shared,
      value: pending.purchaseValue,
      currency: pending.purchaseCurrency || "USD",
    });
  }

  return trackMetaEvent(event, shared);
}

export function trackMetaPageView(): boolean {
  if (!canTrackMeta() || !getMetaPixelId()) return false;
  window.fbq!("track", "PageView");
  return true;
}

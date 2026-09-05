/**
 * Typed Google Ads / GA4 conversion helpers via gtag.js.
 * No-ops when IDs or labels are unset so builds stay green before credentials exist.
 */

import {
  getGoogleAdsId,
  getLandingPageConversionLabel,
  getLeadConversionLabel,
} from "@/lib/analytics/ads-config";
import {
  trackMetaEvent,
  trackMetaLead,
  trackMetaPurchase,
  trackMetaSchedule,
} from "@/lib/analytics/meta-pixel";
import {
  createMetaEventId,
  stashPendingConversion,
} from "@/lib/analytics/pending-conversion";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type LeadFormType = "contact" | "lead-magnet" | "landing-page";

export type ConversionOptions = {
  email?: string;
  phone?: string;
  formType?: LeadFormType;
  serviceInterest?: string;
  /** Paid lander slug — splits GA/Meta reporting when both pages share an offer. */
  landingSlug?: string;
  value?: number;
  currency?: string;
  /** Pixel eventID — same id on submit and thank-you so Meta cannot double-count. */
  metaEventId?: string;
};

function getLeadLabel(): string | undefined {
  return getLeadConversionLabel();
}

function getAuditLabel(slug?: string): string | undefined {
  return getLandingPageConversionLabel(slug);
}

function getCallLabel(): string | undefined {
  const label = process.env.NEXT_PUBLIC_GADS_LABEL_CALL;
  return label && label.length > 0 ? label : undefined;
}

function getBookingLabel(): string | undefined {
  const label = process.env.NEXT_PUBLIC_GADS_LABEL_BOOKING;
  return label && label.length > 0 ? label : undefined;
}

function sendTo(label: string): string | undefined {
  const adsId = getGoogleAdsId();
  if (!adsId || !label) return undefined;
  return `${adsId}/${label}`;
}

function canTrack(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

function isAdsDebug(): boolean {
  try {
    return (
      typeof window !== "undefined" &&
      /[?&]_dbg=/.test(window.location?.search ?? "")
    );
  } catch {
    return false;
  }
}

function trackClarityConversion(
  name: string,
  tags?: Record<string, string>,
): void {
  if (typeof window === "undefined") return;
  const clarity = (
    window as Window & { clarity?: (...args: unknown[]) => void }
  ).clarity;
  if (typeof clarity !== "function") return;
  if (tags) {
    for (const [key, value] of Object.entries(tags)) {
      if (value) clarity("set", key, value);
    }
  }
  clarity("event", name);
}

function generateLeadParams(options: ConversionOptions): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    form_type: options.formType ?? "contact",
    service_interest: options.serviceInterest ?? "not_specified",
  };
  if (options.landingSlug) payload.landing_page = options.landingSlug;
  if (isAdsDebug()) payload.debug_mode = true;
  return payload;
}

/** Normalize email for Enhanced Conversions (lowercase, trim). */
export function normalizeUserEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Set Enhanced Conversions user_data before firing a conversion. */
export function setEnhancedConversionUserData(options: {
  email?: string;
  phone?: string;
}): void {
  if (!canTrack()) return;

  const userData: Record<string, string> = {};
  if (options.email) {
    userData.email = normalizeUserEmail(options.email);
  }
  if (options.phone) {
    // E.164 preferred; pass through trimmed digits/+ only
    const phone = options.phone.replace(/[^\d+]/g, "");
    if (phone) userData.phone_number = phone;
  }

  if (Object.keys(userData).length === 0) return;
  window.gtag!("set", "user_data", userData);
}

function inferredCurrency(explicit?: string): string | undefined {
  if (explicit) return explicit;
  if (typeof document === "undefined") return undefined;
  return document.documentElement.lang === "es-ES" ? "EUR" : undefined;
}

/**
 * Fire a Google Ads conversion for a given conversion label.
 * Also emits a GA4 `generate_lead` / custom event when GA is present.
 */
export function trackConversion(
  label: string | undefined,
  options: ConversionOptions = {},
): boolean {
  if (!canTrack() || !label) return false;

  const destination = sendTo(label);
  if (!destination) return false;

  setEnhancedConversionUserData({
    email: options.email,
    phone: options.phone,
  });

  const payload: Record<string, unknown> = {
    send_to: destination,
  };
  if (typeof options.value === "number") payload.value = options.value;
  const currency = inferredCurrency(options.currency);
  if (currency) payload.currency = currency;

  window.gtag!("event", "conversion", payload);
  return true;
}

/** Primary lead conversion (contact / landing page forms). */
export function trackLead(options: ConversionOptions = {}): boolean {
  const label = getLeadLabel();
  const fired = trackConversion(label, options);

  if (canTrack()) {
    window.gtag!("event", "generate_lead", generateLeadParams(options));
  }

  trackMetaLead({
    email: options.email,
    phone: options.phone,
    contentName: options.landingSlug ?? options.serviceInterest,
    contentCategory: options.formType ?? "contact",
    value: options.value,
    currency: options.currency,
    eventId: options.metaEventId,
  });

  trackClarityConversion(
    "generate_lead",
    options.landingSlug ? { landing_page: options.landingSlug } : undefined,
  );

  return fired;
}

/** Free audit / lead-magnet conversion. */
export function trackAuditLead(options: ConversionOptions = {}): boolean {
  const formType = options.formType ?? "lead-magnet";
  const serviceInterest = options.serviceInterest ?? "audit";
  const label = getAuditLabel(options.landingSlug);
  const fired = trackConversion(label, {
    ...options,
    formType,
    serviceInterest,
  });

  if (canTrack()) {
    window.gtag!("event", "generate_lead", generateLeadParams({
      ...options,
      formType,
      serviceInterest,
    }));
  }

  trackMetaLead({
    email: options.email,
    phone: options.phone,
    contentName: options.landingSlug ?? serviceInterest,
    contentCategory: formType,
    value: options.value,
    currency: options.currency,
    eventId: options.metaEventId,
  });

  trackClarityConversion(
    "generate_lead",
    options.landingSlug ? { landing_page: options.landingSlug } : undefined,
  );

  return fired;
}

/** Click-to-call conversion. */
export function trackCallClick(): boolean {
  const label = getCallLabel();
  const fired = trackConversion(label);

  if (canTrack()) {
    window.gtag!("event", "click_to_call", {});
  }

  trackMetaEvent("Contact");

  return fired;
}

/** Booking / calendar conversion — pass email (and phone) for Enhanced Conversions. */
export function trackBookingClick(options: ConversionOptions = {}): boolean {
  const label = getBookingLabel() ?? getLeadLabel();
  const fired = trackConversion(label, options);

  if (canTrack()) {
    window.gtag!("event", "book_appointment", {});
  }

  trackMetaSchedule({
    email: options.email,
    phone: options.phone,
    contentName: options.serviceInterest,
    contentCategory: "booking",
    eventId: options.metaEventId,
  });

  return fired;
}

/**
 * Meta Purchase — only after a payment provider confirms the charge.
 * Never call this from a checkout-button click or a cancelled/failed payment.
 * Stashes the conversion so /thank-you can finish Advanced Matching without
 * firing a second Pixel event.
 */
export function trackPurchase(
  options: ConversionOptions & { value: number },
): boolean {
  if (!Number.isFinite(options.value) || options.value <= 0) return false;
  const metaEventId = options.metaEventId ?? createMetaEventId("Purchase");
  if (typeof window !== "undefined") {
    stashPendingConversion({
      type: "purchase",
      email: options.email,
      phone: options.phone,
      conversionAlreadyFired: true,
      metaEvent: "Purchase",
      metaEventId,
      purchaseValue: options.value,
      purchaseCurrency: options.currency || "USD",
    });
  }
  return trackMetaPurchase({
    email: options.email,
    phone: options.phone,
    value: options.value,
    currency: options.currency || "USD",
    eventId: metaEventId,
  });
}

/** Exported for tests — resolve whether Ads conversion would fire. */
export function getConversionSendTo(
  which: "lead" | "audit" | "call" | "booking",
): string | undefined {
  const label =
    which === "lead"
      ? getLeadLabel()
      : which === "audit"
        ? getAuditLabel()
        : which === "call"
          ? getCallLabel()
          : getBookingLabel() ?? getLeadLabel();
  return label ? sendTo(label) : undefined;
}

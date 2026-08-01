/**
 * Typed Google Ads / GA4 conversion helpers via gtag.js.
 * No-ops when IDs or labels are unset so builds stay green before credentials exist.
 */

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
  value?: number;
  currency?: string;
};

function getAdsId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  return id && id.startsWith("AW-") ? id : undefined;
}

function getLeadLabel(): string | undefined {
  const label = process.env.NEXT_PUBLIC_GADS_LABEL_LEAD;
  return label && label.length > 0 ? label : undefined;
}

function getAuditLabel(): string | undefined {
  const label = process.env.NEXT_PUBLIC_GADS_LABEL_AUDIT;
  return label && label.length > 0 ? label : undefined;
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
  const adsId = getAdsId();
  if (!adsId || !label) return undefined;
  return `${adsId}/${label}`;
}

function canTrack(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
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
  if (options.currency) payload.currency = options.currency;

  window.gtag!("event", "conversion", payload);
  return true;
}

/** Primary lead conversion (contact / landing page forms). */
export function trackLead(options: ConversionOptions = {}): boolean {
  const label = getLeadLabel();
  const fired = trackConversion(label, options);

  if (canTrack()) {
    window.gtag!("event", "generate_lead", {
      form_type: options.formType ?? "contact",
      service_interest: options.serviceInterest ?? "not_specified",
    });
  }

  return fired;
}

/** Free audit / lead-magnet conversion. */
export function trackAuditLead(options: ConversionOptions = {}): boolean {
  const label = getAuditLabel() ?? getLeadLabel();
  const fired = trackConversion(label, {
    ...options,
    formType: options.formType ?? "lead-magnet",
  });

  if (canTrack()) {
    window.gtag!("event", "generate_lead", {
      form_type: options.formType ?? "lead-magnet",
      service_interest: options.serviceInterest ?? "audit",
    });
  }

  return fired;
}

/** Click-to-call conversion. */
export function trackCallClick(): boolean {
  const label = getCallLabel();
  const fired = trackConversion(label);

  if (canTrack()) {
    window.gtag!("event", "click_to_call", {});
  }

  return fired;
}

/** Booking / calendar click conversion. */
export function trackBookingClick(): boolean {
  const label = getBookingLabel() ?? getLeadLabel();
  const fired = trackConversion(label);

  if (canTrack()) {
    window.gtag!("event", "book_appointment", {});
  }

  return fired;
}

/** Exported for tests — resolve whether Ads conversion would fire. */
export function getConversionSendTo(
  which: "lead" | "audit" | "call" | "booking",
): string | undefined {
  const label =
    which === "lead"
      ? getLeadLabel()
      : which === "audit"
        ? getAuditLabel() ?? getLeadLabel()
        : which === "call"
          ? getCallLabel()
          : getBookingLabel() ?? getLeadLabel();
  return label ? sendTo(label) : undefined;
}

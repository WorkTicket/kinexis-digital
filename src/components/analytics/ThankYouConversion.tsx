"use client";

import { useEffect } from "react";
import { useCookieConsent } from "@/components/analytics/CookieConsent";
import { consumePendingConversion } from "@/lib/analytics/pending-conversion";
import {
  setEnhancedConversionUserData,
  trackAuditLead,
  trackLead,
} from "@/lib/analytics/events";

/**
 * Fires the stashed form conversion on /thank-you after analytics consent.
 * Booking already sent a click conversion on submit; we only attach hashed
 * user_data there so Ads is not double-counted.
 */
export function ThankYouConversion() {
  const { consent, ready } = useCookieConsent();

  useEffect(() => {
    if (!ready || consent !== "accepted") return;

    const pending = consumePendingConversion();
    if (!pending?.email) return;

    if (pending.serviceInterest === "Strategy Call") {
      setEnhancedConversionUserData({ email: pending.email });
      return;
    }

    if (pending.type === "audit" || pending.formType === "lead-magnet") {
      trackAuditLead({
        email: pending.email,
        formType: pending.formType ?? "lead-magnet",
        serviceInterest: pending.serviceInterest,
      });
      return;
    }

    trackLead({
      email: pending.email,
      formType: pending.formType ?? "contact",
      serviceInterest: pending.serviceInterest,
    });
  }, [ready, consent]);

  return null;
}

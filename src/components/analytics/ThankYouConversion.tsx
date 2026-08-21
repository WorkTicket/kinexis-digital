"use client";

import { useEffect } from "react";
import { useCookieConsent } from "@/components/analytics/CookieConsent";
import { updateGtagConsent } from "@/lib/analytics/consent";
import { consumePendingConversion } from "@/lib/analytics/pending-conversion";
import {
  setEnhancedConversionUserData,
  trackAuditLead,
  trackLead,
} from "@/lib/analytics/events";

/**
 * Fires the stashed form conversion on /thank-you once the visitor has
 * accepted or rejected cookies. Consent Mode still applies (cookieless /
 * modeled pings when denied). Booking already sent a conversion on submit
 * with Enhanced Conversions email; thank-you only re-attaches user_data.
 */
export function ThankYouConversion() {
  const { consent, ready } = useCookieConsent();

  useEffect(() => {
    if (!ready || consent === "pending") return;

    // Apply Consent Mode before the conversion hit so Ads models correctly.
    updateGtagConsent(consent === "accepted");

    const pending = consumePendingConversion();
    if (!pending?.email) return;

    if (pending.conversionAlreadyFired) {
      setEnhancedConversionUserData({
        email: pending.email,
        phone: pending.phone,
      });
      return;
    }

    const opts = {
      email: pending.email,
      phone: pending.phone,
      formType: pending.formType,
      serviceInterest: pending.serviceInterest,
    };

    if (pending.type === "audit" || pending.formType === "lead-magnet") {
      trackAuditLead({
        ...opts,
        formType: pending.formType ?? "lead-magnet",
      });
      return;
    }

    trackLead({
      ...opts,
      formType: pending.formType ?? "contact",
    });
  }, [ready, consent]);

  return null;
}

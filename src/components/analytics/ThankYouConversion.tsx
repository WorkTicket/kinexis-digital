"use client";

import { useEffect } from "react";
import { useCookieConsent } from "@/components/analytics/CookieConsent";
import { updateGtagConsent } from "@/lib/analytics/consent";
import {
  firePendingMetaConversion,
  updateMetaPixelConsent,
} from "@/lib/analytics/meta-pixel";
import {
  consumePendingConversion,
  peekPendingConversion,
} from "@/lib/analytics/pending-conversion";
import { setEnhancedConversionUserData } from "@/lib/analytics/events";

/**
 * Completes Enhanced Conversions + GA4 generate_lead after the head snippet
 * has already sent the Google Ads conversion on /thank-you page load.
 * Booking already fired Ads on submit (`conversionAlreadyFired`).
 *
 * Meta Lead / Schedule / Purchase fire here on client navigation if the
 * inline head snippet did not run. eventId claim prevents duplicates.
 */
export function ThankYouConversion() {
  const { consent, ready } = useCookieConsent();

  useEffect(() => {
    if (!ready) return;

    if (consent !== "pending") {
      const granted = consent === "accepted";
      updateGtagConsent(granted);
      updateMetaPixelConsent(granted);
    }

    const pendingMeta = peekPendingConversion();
    firePendingMetaConversion(pendingMeta);

    const pending = consumePendingConversion();
    if (!pending?.email) return;

    setEnhancedConversionUserData({
      email: pending.email,
      phone: pending.phone,
    });

    if (pending.conversionAlreadyFired) return;
    if (pending.type === "booking" || pending.type === "purchase") return;
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "generate_lead", {
      form_type: pending.formType ?? "contact",
      service_interest: pending.serviceInterest ?? "not_specified",
      ...(pending.landingSlug ? { landing_page: pending.landingSlug } : {}),
    });
  }, [ready, consent]);

  return null;
}

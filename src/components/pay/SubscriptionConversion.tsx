"use client";
import { useEffect } from "react";
import { useCookieConsent } from "@/components/analytics/CookieConsent";
import { trackSubscription } from "@/lib/analytics/subscription";
import type { PlanKey } from "@/config/paypal-plans";

export function SubscriptionConversion({ plan, sid }: { plan: PlanKey; sid: string }) {
  const { consent, ready } = useCookieConsent();
  useEffect(() => {
    if (!ready || consent !== "accepted") return;
    trackSubscription(plan, sid);
    // The shared analytics loader may become ready after this component mounts.
    const timer = window.setInterval(() => trackSubscription(plan, sid), 1000);
    return () => window.clearInterval(timer);
  }, [plan, sid, consent, ready]);
  return null;
}

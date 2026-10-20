import { readStoredConsent } from "./consent";
import { PAYPAL_PLANS, type PlanKey } from "@/config/paypal-plans";
import { sanitizeSubscriptionId } from "@/lib/paypal-subscriptions";

export function trackSubscription(plan: PlanKey, sid: string) {
  if (readStoredConsent() !== "accepted" || !sanitizeSubscriptionId(sid)) return;
  const params = { value: PAYPAL_PLANS[plan].price, currency: "USD", event_id: sid, transaction_id: sid, plan };
  // Fail closed when storage is unavailable: we cannot guarantee deduplication.
  try {
    if (typeof window.gtag === "function" && !sessionStorage.getItem(`subscription:ga:${sid}`)) {
      sessionStorage.setItem(`subscription:ga:${sid}`, "1");
      window.gtag("event", "purchase", params);
      window.gtag("event", "subscribe", params);
    }
    if (typeof window.fbq === "function" && !sessionStorage.getItem(`subscription:meta:${sid}`)) {
      sessionStorage.setItem(`subscription:meta:${sid}`, "1");
      window.fbq("track", "Subscribe", { value: params.value, currency: "USD" }, { eventID: sid });
    }
  } catch { /* Storage blocked: skip rather than repeat a conversion. */ }
}

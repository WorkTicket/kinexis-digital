"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PAYPAL_PLANS, type PlanKey } from "@/config/paypal-plans";
import { BUSINESS_PHONE_E164 } from "@/config/business-identity";
import type { PlanContent } from "@/content/pay-plans";
import { loadPayPalSDK, sanitizeSubscriptionId, type ButtonActions, type PayPalButtons } from "@/lib/paypal-subscriptions";

export function PayPalSubscribeButtons({ planKey, locale, agreed, content: c }: { planKey: PlanKey; locale: string; agreed: boolean; content: PlanContent }) {
  const router = useRouter();
  const container = useRef<HTMLDivElement>(null);
  const agreement = useRef(agreed);
  const actions = useRef<ButtonActions | null>(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  useEffect(() => { agreement.current = agreed; if (actions.current) void (agreed ? actions.current.enable() : actions.current.disable()); if (agreed) setError(""); }, [agreed]);
  useEffect(() => {
    let disposed = false;
    let buttons: PayPalButtons | undefined;
    const host = document.createElement("div");
    container.current?.appendChild(host);
    loadPayPalSDK(locale).then(async (sdk) => {
      if (disposed) return;
      buttons = sdk.Buttons({
        style: { shape: "rect", color: "gold", layout: "vertical", label: "subscribe" },
        onInit: (_, controls) => { actions.current = controls; void (agreement.current ? controls.enable() : controls.disable()); },
        onClick: (_, controls) => { if (!agreement.current) { setError(c.guard); return controls.reject(); } },
        createSubscription: (_, controls) => {
          if (!agreement.current) { setError(c.guard); return Promise.reject(new Error("Terms required")); }
          return controls.subscription.create({ plan_id: PAYPAL_PLANS[planKey].planId });
        },
        onApprove: (data) => {
          const sid = sanitizeSubscriptionId(data.subscriptionID);
          if (!sid) { setError(c.error); return; }
          const query = new URLSearchParams({ plan: planKey, sid, agreedTermsVersion: "2.0", agreedAt: new Date().toISOString() });
          router.push(`/pay/thanks?${query}`);
        },
        onError: () => { if (!disposed) setError(c.error); },
        onCancel: () => {},
      });
      await buttons.render(host);
      if (!disposed) setStatus("ready");
    }).catch(() => { if (!disposed) setStatus("failed"); });
    return () => { disposed = true; actions.current = null; void buttons?.close?.().catch(() => {}); host.remove(); };
  }, [locale, planKey, router, c]);
  return <div>
    {status === "loading" && <p className="pay-loading" role="status">{c.loading}</p>}
    {status === "failed" && <p role="alert"><a href={`sms:${BUSINESS_PHONE_E164}`}>{c.sdkError}</a></p>}
    <div className="pay-button-wrap" aria-disabled={!agreed}>
      <div ref={container} inert={!agreed} />
      {!agreed && <button className="pay-button-overlay" type="button" aria-label={c.guard} onClick={() => setError(c.guard)} />}
    </div>
    {error && <p role="alert" className="pay-error">{error}</p>}
  </div>;
}

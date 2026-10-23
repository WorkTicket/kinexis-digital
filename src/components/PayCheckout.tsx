"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { CHECKOUT_PLANS, money, type CheckoutKey, type CheckoutPlan } from "@/lib/pay";
import { isSubscriptionId, OWN_IT_CHECKOUT, PAYPAL_PLANS, PAYPAL_SDK_SRC } from "@/lib/paypal";
import { SITE, telHref } from "@/lib/site";

type PayPalButtons = {
  render: (target: HTMLElement) => Promise<void>;
  close: () => Promise<void>;
};

type PayPalSDK = {
  Buttons: (options: {
    style?: { shape?: string; color?: string; layout?: string; label?: string };
    createSubscription: (
      data: unknown,
      actions: { subscription: { create: (order: { plan_id: string }) => Promise<string> } },
    ) => Promise<string>;
    onApprove: (data: { subscriptionID?: string }) => void;
    onError: () => void;
    onCancel: () => void;
  }) => PayPalButtons;
};

let sdkPromise: Promise<PayPalSDK> | null = null;

function loadPayPal() {
  const existing = (window as Window & { paypal?: PayPalSDK }).paypal;
  if (existing?.Buttons) return Promise.resolve(existing);
  if (!sdkPromise) {
    sdkPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.id = "kinexis-paypal-subscriptions";
      script.src = PAYPAL_SDK_SRC;
      script.async = true;
      const timer = window.setTimeout(() => {
        sdkPromise = null;
        reject(new Error("PayPal timed out"));
      }, 20000);
      script.onload = () => {
        window.clearTimeout(timer);
        const paypal = (window as Window & { paypal?: PayPalSDK }).paypal;
        if (paypal?.Buttons) resolve(paypal);
        else {
          sdkPromise = null;
          reject(new Error("PayPal missing"));
        }
      };
      script.onerror = () => {
        window.clearTimeout(timer);
        sdkPromise = null;
        reject(new Error("PayPal failed"));
      };
      document.head.appendChild(script);
    });
  }
  return sdkPromise;
}

function PlanMark({ id }: { id: CheckoutKey }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#031b4e",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  if (id === "website") {
    return (
      <svg {...common}><rect x="4" y="5" width="18" height="14" rx="3" fill="#031b4e" /><rect x="2" y="3" width="18" height="14" rx="3" fill="#fff" /><path d="M3 7h16" /><path d="M7 11h3m-3 3h7" stroke="#0b3dff" /><path d="M8 21h8M12 17v4" /><circle cx="18" cy="17" r="4" fill="#ff6a00" /><path d="m16.5 17 1 1 2-2.5" strokeWidth="1.5" /></svg>
    );
  }
  if (id === "leadSystem") {
    return (
      <svg {...common}><rect x="3" y="3" width="18" height="18" rx="4" fill="#031b4e" /><rect x="1" y="1" width="18" height="18" rx="4" fill="#fff" /><path d="M5 15v-3h3v3" fill="#00c2ff" /><path d="M10 15V9h3v6" fill="#0b3dff" /><path d="M15 15V6h3v9" fill="#ff6a00" /><path d="m5 8 5-4 3 1 5-3" stroke="#0b3dff" /><path d="m15 2 3 0 0 3" stroke="#0b3dff" /></svg>
    );
  }
  if (id === "plus") {
    return (
      <svg {...common}><circle cx="13" cy="13" r="9" fill="#031b4e" /><circle cx="11" cy="11" r="9" fill="#00c2ff" /><path d="M2 11h18M11 2c5 5 5 13 0 18-5-5-5-13 0-18Z" strokeWidth="1.5" /><path d="M15 14h7v7h-7l-3 2v-6a3 3 0 0 1 3-3Z" fill="#ff6a00" /><path d="M16 17h3m-3 2h2" strokeWidth="1.3" /></svg>
    );
  }
  return (
    <svg {...common}><rect x="5" y="4" width="16" height="18" rx="3" fill="#031b4e" /><rect x="2" y="1" width="16" height="18" rx="3" fill="#fff" /><path d="M6 6h8M6 10h5" stroke="#0b3dff" /><circle cx="17" cy="17" r="5" fill="#ff6a00" /><path d="m14.5 17 2 2 3-4" /></svg>
  );
}

function termsFor(plan: CheckoutPlan) {
  if (!plan.monthly) {
    return "One payment when you approve your preview · No monthly plan and no minimum · Site files are yours from launch · Plus tax, if any";
  }
  const guarantee = plan.guarantee ? " · 60-day tracked-lead guarantee" : "";
  return `3-month minimum, then month to month · Price locked 24 months · First charge when you subscribe · Later domain renewals at cost · Plus tax, if any${guarantee}`;
}

export default function PayCheckout({ initialPlan }: { initialPlan: CheckoutKey }) {
  const router = useRouter();
  const [selected, setSelected] = useState<CheckoutKey>(initialPlan);
  const [agreed, setAgreed] = useState(false);
  const [notice, setNotice] = useState("");
  const [sdk, setSdk] = useState<"idle" | "loading" | "ready" | "failed">("idle");
  const [retry, setRetry] = useState(0);
  const hostRef = useRef<HTMLDivElement>(null);
  const plan = CHECKOUT_PLANS.find((item) => item.key === selected) ?? CHECKOUT_PLANS[1];

  useEffect(() => {
    if (!agreed || plan.key === "ownIt") return;
    const host = hostRef.current;
    if (!host) return;
    const planId = PAYPAL_PLANS[plan.key].planId;
    const planKey = plan.key;
    let dead = false;
    let buttons: PayPalButtons | null = null;
    const slot = document.createElement("div");
    host.appendChild(slot);
    setSdk("loading");
    loadPayPal()
      .then(async (paypal) => {
        if (dead) return;
        buttons = paypal.Buttons({
          style: { shape: "rect", color: "gold", layout: "vertical", label: "subscribe" },
          createSubscription: (_data, actions) => actions.subscription.create({ plan_id: planId }),
          onApprove: (data) => {
            const sid = data.subscriptionID ?? "";
            if (!isSubscriptionId(sid)) {
              setNotice("PayPal confirmed something, but the subscription id didn't look right. Check your PayPal email, or text us.");
              return;
            }
            router.push(`/pay/thanks?plan=${planKey}&sid=${encodeURIComponent(sid)}`);
          },
          onError: () => {
            if (!dead) setNotice("Something went wrong with PayPal. Please try again or text us.");
          },
          onCancel: () => {
            if (!dead) setNotice("Checkout cancelled. You have not been charged.");
          },
        });
        await buttons.render(slot);
        if (dead) {
          buttons.close().catch(() => {});
          return;
        }
        setSdk("ready");
      })
      .catch(() => {
        if (!dead) setSdk("failed");
      });
    return () => {
      dead = true;
      buttons?.close().catch(() => {});
      slot.remove();
    };
  }, [agreed, plan.key, retry, router]);

  function requireTerms() {
    setNotice("Please check the box to agree to the Terms first.");
    document.getElementById("plan-terms")?.focus();
  }

  return (
    <div className="pay-checkout" data-island="">
    <div className="pay-layout">
        <fieldset className="pay-plans">
          <legend>Choose your plan</legend>
          <p className="muted">Select a plan to see what’s included and update your total.</p>
          <div className="pay-options">
            {CHECKOUT_PLANS.map((item) => (
              <Fragment key={item.key}>
              <label className={`pay-option${selected === item.key ? " is-selected" : ""}`}>
                <input
                  className="pay-radio"
                  type="radio"
                  name="website-plan"
                  value={item.key}
                  checked={selected === item.key}
                  onChange={() => { setSelected(item.key); setNotice(""); }}
                />
                <span className="pay-option__art" aria-hidden="true"><PlanMark id={item.key} /><span className="pay-tick" /></span>
                <span className="pay-option__copy">
                  <span className="pay-option__name">
                    {item.name}
                    {item.popular && <span className="pay-badge">Most popular</span>}
                  </span>
                  <span className="pay-option__desc">{item.description}</span>
                </span>
                <span className="pay-option__price">
                  ${money(item.price)}
                  <small>{item.monthly ? "/mo" : " once"}</small>
                </span>
              </label>
              {selected === item.key && (
                <div className="pay-included pay-included--selected" aria-live="polite">
                  <div className="pay-included__head">
                    <h2>Included in {item.name}</h2>
                  </div>
                  <ul className="ticks">
                    {item.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                </div>
              )}
              </Fragment>
            ))}
          </div>
        </fieldset>

      <aside className="pay-summary" aria-labelledby="pay-checkout-heading">
        <header className="pay-summary__head">
          <p className="pay-kicker">Checkout</p>
          <div className="pay-summary__plan">
            <span className="pay-mark"><PlanMark id={plan.key} /></span>
            <div>
              <h2 id="pay-checkout-heading">
                {plan.name}
                {plan.key === "leadSystem" && <span className="pay-down">$0 down</span>}
              </h2>
              <p>{plan.description}</p>
            </div>
          </div>
        </header>
        <div className="pay-summary__body">
          <dl className="pay-breakdown">
            <div><dt>Billing</dt><dd>{plan.monthly ? "Monthly" : "One time"}</dd></div>
            <div><dt>First charge</dt><dd>{plan.monthly ? "When you subscribe" : "When you pay"}</dd></div>
            {plan.monthly && <div><dt>Minimum term</dt><dd>3 months, then monthly</dd></div>}
          </dl>
          <div className="pay-total">
            <span>{plan.monthly ? "Monthly total" : "One-time total"}</span>
            <p>${money(plan.price)}{plan.monthly && <small> /mo</small>}</p>
          </div>
          <p className="pay-tax">USD · Plus tax, if any</p>

          <label className="pay-agree" htmlFor="plan-terms">
            <input
              id="plan-terms"
              type="checkbox"
              checked={agreed}
              onChange={(event) => { setAgreed(event.target.checked); setNotice(""); }}
            />
            <span>
              I agree to the <Link href="/terms" prefetch={false}>Terms of Service</Link> and <Link href="/privacy" prefetch={false}>Privacy Policy</Link>.
            </span>
          </label>

          <div className="pay-action">
            {plan.monthly ? (
              agreed ? (
                <>
                  {sdk === "loading" && <p className="pay-wait" role="status">Loading secure PayPal checkout…</p>}
                  {sdk === "failed" && (
                    <p className="pay-alert" role="alert">
                      PayPal didn’t load. Text us at <a href={telHref(SITE.phone)}>{SITE.phone}</a> and we’ll send a payment link.{" "}
                      <button type="button" className="link-btn" onClick={() => { setNotice(""); setRetry((n) => n + 1); }}>Try again</button>
                    </p>
                  )}
                  <div ref={hostRef} className="pay-paypal" />
                </>
              ) : (
                <button type="button" className="btn btn--primary btn--lg pay-lock" onClick={requireTerms}>
                  Agree to continue with PayPal
                </button>
              )
            ) : agreed ? (
              <>
                <a className="btn btn--primary btn--lg pay-lock" href={OWN_IT_CHECKOUT} target="_blank" rel="noopener noreferrer">
                  Pay ${money(plan.price)} with PayPal
                </a>
                <p className="pay-tax">Opens PayPal’s secure page in a new tab.</p>
              </>
            ) : (
              <button type="button" className="btn btn--primary btn--lg pay-lock" onClick={requireTerms}>
                Agree to pay ${money(plan.price)}
              </button>
            )}
          </div>

          <p className={`pay-ready${notice ? " is-alert" : ""}`} role={notice ? "alert" : undefined}>
            {notice || (agreed ? "You’re ready to continue securely with PayPal." : "Accept the terms above to continue.")}
          </p>
        </div>
        <footer className="pay-summary__foot">
          <p className="pay-secure">Secure checkout by PayPal. Pay with your PayPal account or a debit/credit card. We never see your full card number.</p>
          <details className="pay-details">
            <summary>Plan terms &amp; billing details</summary>
            <p>{termsFor(plan)}</p>
          </details>
          <a className="pay-help" href={telHref(SITE.phone)}>Need a hand? Call or text {SITE.phone}</a>
        </footer>
      </aside>
    </div>
    <div className="pay-below">
      <div className="pay-note">
        <span className="pay-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="#031b4e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="6" width="17" height="16" rx="3" fill="#031b4e" />
            <rect x="2" y="3" width="17" height="16" rx="3" fill="#fff" />
            <path d="M3 8h15" /><path d="M7 1v4M14 1v4" />
            <rect x="6" y="11" width="4" height="4" rx="1" fill="#0b3dff" stroke="none" />
            <circle cx="18" cy="17" r="5" fill="#ff6a00" /><path d="m15.5 17 2 2 3-4" />
          </svg>
        </span>
        <div>
          <h3>Your preview first. Your launch next.</h3>
          <p>Subscribe on your launch day, after you approve your site. Your first charge happens when you subscribe.</p>
        </div>
      </div>
    </div>
    </div>
  );
}

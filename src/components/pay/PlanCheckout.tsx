"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronDown, FolderCheck, Globe2, Languages, LayoutGrid, LockKeyhole, MessageCircle, ShieldCheck, TrendingUp } from "lucide-react";
import Card from "@/components/ui/Card";
import type { Locale } from "@/i18n/routing";
import { getPlanContent } from "@/content/pay-plans";
import { BUSINESS_PHONE_E164 } from "@/config/business-identity";
import { OWN_IT_PAYMENT_URL, PAYPAL_PLANS } from "@/config/paypal-plans";
import { PayPalSubscribeButtons } from "./PayPalSubscribeButtons";

const plans = [
  { key: "website", icon: Globe2 },
  { key: "leadSystem", icon: TrendingUp },
  { key: "plus", icon: Languages },
  { key: "ownIt", icon: FolderCheck },
] as const;
type CheckoutPlan = typeof plans[number]["key"];

export function PlanCheckout({ locale }: { locale: Locale }) {
  const c = getPlanContent(locale);
  const [selected, setSelected] = useState<CheckoutPlan>("leadSystem");
  const [agreed, setAgreed] = useState(false);
  const selectedIndex = plans.findIndex(plan => plan.key === selected);
  const ownIt = selected === "ownIt";
  const price = ownIt ? "1,497" : PAYPAL_PLANS[selected].price;
  const SelectedIcon = plans[selectedIndex].icon;

  return (
    <section className="pay-plans" aria-label={c.checkoutLabel}>
      <div className="shell pay-shell">
        <div className="pay-checkout-grid">
          <div className="pay-selection">
            <fieldset className="pay-plan-fieldset">
              <legend className="pay-step-heading"><LayoutGrid className="pay-heading-icon" strokeWidth={1.5} aria-hidden />{c.choosePlan}</legend>
              <p className="pay-step-copy">{c.chooseHint}</p>
              <div className="pay-grid">
                {plans.map(({ key, icon: Icon }, index) => (
                  <Card key={key} hover={false} className={`pay-card ${key === "leadSystem" ? "pay-card-popular" : ""} ${selected === key ? "pay-card-selected" : ""}`}>
                    <input
                      className="pay-plan-input"
                      id={`plan-${key}`}
                      type="radio"
                      name="website-plan"
                      value={key}
                      checked={selected === key}
                      onChange={() => setSelected(key)}
                      aria-labelledby={`plan-${key}-name plan-${key}-price`}
                      aria-describedby={`plan-${key}-description`}
                    />
                    <label className="pay-plan-label" htmlFor={`plan-${key}`}>
                      <span className="pay-plan-top">
                        <span className="icon-well icon-well--sm"><Icon strokeWidth={1.5} aria-hidden /></span>
                        {key === "leadSystem" && <span className="pay-badge">{c.popular.replace("★ ", "")}</span>}
                        <span className="pay-radio-mark" aria-hidden>{selected === key && <Check size={12} strokeWidth={3} />}</span>
                      </span>
                      <span className="pay-plan-name" id={`plan-${key}-name`}>{c.names[index]}</span>
                      <span className="pay-price" id={`plan-${key}-price`}>${key === "ownIt" ? "1,497" : PAYPAL_PLANS[key].price}<span> {key === "ownIt" ? c.once : c.monthly}</span></span>
                      <span className="pay-plan-description" id={`plan-${key}-description`}>{c.descriptions[index]}</span>
                    </label>
                  </Card>
                ))}
              </div>
            </fieldset>

            <div className="pay-included" aria-live="polite" aria-atomic="true">
              <div className="pay-included-heading"><h2>{c.included}</h2><span>{c.names[selectedIndex]}</span></div>
              <ul className="pay-features">
                {c.features[selectedIndex].map(feature => <li key={feature}><Check size={15} aria-hidden /><span>{feature}</span></li>)}
              </ul>
            </div>
            <div className="pay-launch-note"><ShieldCheck size={21} strokeWidth={1.5} aria-hidden /><div><h3>{c.launchTitle}</h3><p>{c.timing}</p></div></div>
          </div>

          <aside className="pay-checkout" aria-labelledby="pay-checkout-heading">
            <Card hover={false} className="pay-summary">
              <h2 id="pay-checkout-heading" className="pay-step-heading"><LockKeyhole className="pay-heading-icon" strokeWidth={1.5} aria-hidden />{c.checkoutTitle}</h2>
              <div className="pay-summary-plan" aria-live="polite" aria-atomic="true">
                <span className="icon-well"><SelectedIcon strokeWidth={1.5} aria-hidden /></span>
                <div><p className="pay-summary-name">{c.names[selectedIndex]}{selected === "leadSystem" && <span className="pay-down">{c.down}</span>}</p><p className="pay-summary-description">{c.descriptions[selectedIndex]}</p></div>
              </div>
              <dl className="pay-breakdown">
                <div><dt>{c.billing}</dt><dd>{ownIt ? c.once : c.monthlyBilling}</dd></div>
                <div><dt>{c.firstCharge}</dt><dd>{ownIt ? c.whenPaid : c.onLaunch}</dd></div>
                {!ownIt && <div><dt>{c.commitment}</dt><dd>{c.minimum}</dd></div>}
              </dl>
              <div className="pay-total"><span>{ownIt ? c.oneTimeTotal : c.monthlyTotal}</span><p className="pay-summary-price">${price}<span> {ownIt ? "" : c.monthly}</span></p></div>
              <p className="pay-tax-note">{c.taxNote}</p>
              <div className="pay-agreement">
                <input id="plan-terms" type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} aria-labelledby="plan-agreement-label" />
                <label id="plan-agreement-label" htmlFor="plan-terms">{c.agree} <Link href="/terms">{c.terms}</Link> {c.and} <Link href="/privacy">{c.privacy}</Link>.</label>
              </div>
              <div className="pay-payment">
                {ownIt ? <>
                  <a role="link" className={`pay-own ${!agreed ? "pointer-events-none" : ""}`} href={agreed ? OWN_IT_PAYMENT_URL : undefined} aria-disabled={!agreed} tabIndex={agreed ? 0 : -1} target="_blank" rel="noopener noreferrer">{c.payOwn}<ArrowUpRight size={17} aria-hidden /></a>
                  <p className="pay-tab-note">{c.newTab}</p>
                </> : <PayPalSubscribeButtons key={selected} planKey={selected} locale={locale} agreed={agreed} content={c} />}
              </div>
              <p className="pay-terms-hint">{agreed ? c.readyToPay : c.agreementHint}</p>
              <div className="pay-secure-label"><LockKeyhole size={13} aria-hidden /><span>{c.secureLabel}</span><span className="pay-paypal-wordmark" aria-hidden>PayPal</span></div>
              <details className="pay-plan-terms"><summary>{c.planTerms}<ChevronDown size={15} aria-hidden /></summary><p>{ownIt ? c.ownTerms : c.monthlyTerms}{(selected === "leadSystem" || selected === "plus") && ` · ${c.guarantee}`}</p></details>
            </Card>
            <a className="pay-help" href={`sms:${BUSINESS_PHONE_E164}`}><MessageCircle size={17} strokeWidth={1.5} aria-hidden /><span>{c.help}</span><ArrowUpRight size={15} aria-hidden /></a>
          </aside>
        </div>

        <p className="pay-trust"><ShieldCheck size={18} aria-hidden /><span>{c.trust}</span></p>
        <section className="pay-faq" aria-labelledby="pay-faq-heading">
          <div><p className="section-eyebrow">{c.faqEyebrow}</p><h2 id="pay-faq-heading" className="type-section">{c.faqTitle}</h2><a href="#pay-invoice" className="pay-invoice-link">{c.invoiceLink}<ArrowUpRight size={16} aria-hidden /></a></div>
          <div className="pay-faq-list">{c.faq.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={17} aria-hidden /></summary><p>{answer}</p></details>)}</div>
        </section>
      </div>
    </section>
  );
}

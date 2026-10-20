"use client";
import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/routing";
import { getPlanContent } from "@/content/pay-plans";
import { OWN_IT_PAYMENT_URL, PAYPAL_PLANS, type PlanKey } from "@/config/paypal-plans";
import { PayPalSubscribeButtons } from "./PayPalSubscribeButtons";

const keys = ["website", "leadSystem", "plus", "ownIt"] as const;
export function PlanCheckout({ locale }: { locale: Locale }) {
  const c = getPlanContent(locale);
  const [agreed, setAgreed] = useState(false);
  return <section className="pay-plans">
    <div className="shell">
      <header className="pay-hero"><p className="pay-eyebrow">KINEXIS DIGITAL · PAYPAL</p><h1>{c.title}</h1><p>{c.intro}</p><p className="pay-preview">{c.preview} <Link href="/contact">{c.previewLink}</Link> {c.first}</p></header>
      <div className="pay-agreement"><p>{c.timing}</p><div className="pay-check"><input id="plan-terms" type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} aria-labelledby="plan-agreement-label" /><label id="plan-agreement-label" htmlFor="plan-terms">{c.agree} <Link href="/terms">{c.terms}</Link> {c.and} <Link href="/privacy">{c.privacy}</Link>.</label></div></div>
      <div className="pay-grid">{keys.map((key, index) => <article key={key} className={`pay-card ${key === "leadSystem" ? "pay-card-popular" : ""}`}>
        <div className="pay-card-heading">{key === "leadSystem" && <span className="pay-badge">{c.popular}</span>}<h2>{c.names[index]}</h2><p className="pay-price">${key === "ownIt" ? "1,497" : PAYPAL_PLANS[key].price}<span> {key === "ownIt" ? c.once : c.monthly}</span></p>{key === "leadSystem" && <p>{c.down}</p>}</div>
        <ul className="pay-features">{c.features[index].map(feature => <li key={feature}>{feature}</li>)}</ul>
        <div className="pay-card-bottom"><p className="pay-key-terms">{key === "ownIt" ? c.ownTerms : c.monthlyTerms}{(key === "leadSystem" || key === "plus") && ` · ${c.guarantee}`}</p>
        {key === "ownIt" ? <><a className={`pay-own ${!agreed ? "pointer-events-none" : ""}`} href={agreed ? OWN_IT_PAYMENT_URL : undefined} aria-disabled={!agreed} tabIndex={agreed ? 0 : -1} target="_blank" rel="noopener noreferrer">{c.payOwn}</a><p className="pay-tab-note">{c.newTab}</p></> : <PayPalSubscribeButtons planKey={key as PlanKey} locale={locale} agreed={agreed} content={c} />}</div>
      </article>)}</div>
      <p className="pay-trust">🔒 {c.trust}</p>
      <section className="pay-faq"><h2>{c.faqTitle}</h2>{c.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
    </div>
  </section>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { CHECKOUT_PLANS, money } from "@/lib/pay";
import { SITE, telHref } from "@/lib/site";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

const thanksScript = `(function(){var q=new URLSearchParams(location.search);var plan=q.get("plan")||"";var sid=q.get("sid")||"";var invoice=q.get("kind")==="invoice"&&q.get("status")==="paid";var known={website:1,leadSystem:1,plus:1,ownIt:1};var subscribed=!!known[plan]&&/^I-[A-Z0-9]{6,}$/.test(sid);var root=document.documentElement;if(invoice){root.classList.add("thanks-invoice");document.title="Your PayPal payment was received";}else if(subscribed){root.classList.add("thanks-sub","thanks-plan-"+plan);document.title="Your website subscription is active";}else{root.classList.add("thanks-none");document.title="This checkout was not completed";}})()`;

const sidScript = `document.querySelectorAll(".thanks-sid").forEach(function(node){node.textContent=new URLSearchParams(location.search).get("sid")||""})`;

export default function Page() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: thanksScript }} />
      <div className="thanks-view thanks-view--none">
        <PageHero
          eyebrow="Checkout"
          h1="Checkout"
          sub="We don’t see a completed checkout on this page."
        />
        <section className="section">
          <div className="container container--narrow">
            <p className="center">
              <Link className="btn btn--primary btn--lg" href="/pay" prefetch={false}>Back to checkout</Link>
            </p>
            <ContactLine />
          </div>
        </section>
      </div>
      <div className="thanks-view thanks-view--sub">
        <PageHero
          eyebrow="Checkout"
          h1="You’re subscribed"
          mark="subscribed"
          sub="Thank you. PayPal has your subscription, and we’ll confirm the launch date shortly."
        />
        <section className="section">
          <div className="container container--narrow">
            <div className="pay-receipt">
              {CHECKOUT_PLANS.map((plan) => (
                <p key={plan.key} className={`thanks-plan thanks-plan--${plan.key}`}>
                  <b>{plan.name}</b> · ${money(plan.price)}{plan.monthly ? "/mo" : " one time"}
                </p>
              ))}
              <p>Subscription ID <code className="thanks-sid"></code></p>
              <script dangerouslySetInnerHTML={{ __html: sidScript }} />
              <h2>What happens next</h2>
              <ol className="pay-steps">
                <li><b>PayPal emails your receipt.</b><span>Keep it with the subscription ID above.</span></li>
                <li><b>We confirm your launch date.</b><span>By text or email within 1 business day.</span></li>
                <li>
                  <b>Send anything we still need.</b>
                  <span>Logo, photos, license number, or domain. Reply to our text or email {SITE.email}.</span>
                </li>
              </ol>
            </div>
            <ContactLine />
          </div>
        </section>
      </div>
      <div className="thanks-view thanks-view--invoice">
        <PageHero
          eyebrow="Checkout"
          h1="Payment received"
          mark="received"
          sub="PayPal will email your receipt. We’ll match this payment to your invoice or deposit."
        />
        <section className="section">
          <div className="container container--narrow">
            <div className="pay-receipt">
              <h2>What happens next</h2>
              <ol className="pay-steps">
                <li><b>PayPal emails your receipt.</b><span>That receipt is the record of this payment.</span></li>
                <li><b>We match it to your invoice.</b><span>If anything doesn’t line up, we’ll text or email you.</span></li>
              </ol>
            </div>
            <ContactLine />
          </div>
        </section>
      </div>
    </>
  );
}

function ContactLine() {
  return (
    <p className="center muted">
      Questions? Call or text <a href={telHref(SITE.phone)}>{SITE.phone}</a> or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
    </p>
  );
}

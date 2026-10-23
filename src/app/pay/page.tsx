import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { checkoutPlanFromQuery, PAY_FAQS } from "@/lib/pay";
import { PageSchema } from "@/components/JsonLd";
import InvoicePay from "@/components/InvoicePay";
import PayCheckout from "@/components/PayCheckout";
import { Faq, PageHero } from "@/components/ui";

export const metadata = pageMetadata("pay");

function PaymentIcon({ kind }: { kind: "plan" | "receipt" | "card" | "notification" }) {
  return (
    <svg className="pay-step-icon" viewBox="0 0 40 40" fill="none" stroke="#031b4e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="6" width="31" height="31" rx="10" fill="#031b4e" stroke="none" />
      <rect x="2" y="2" width="31" height="31" rx="10" fill="#ff6a00" />
      {kind === "plan" && <><rect x="9" y="9" width="17" height="17" rx="3" fill="#fff" /><path d="M13 14h8m-8 5 3 3 6-7" /></>}
      {kind === "receipt" && <><path d="M10 8h15v19l-4-2-3 2-4-2-4 2Z" fill="#fff" /><path d="M14 13h7m-7 5h7m-7 4h3" /></>}
      {kind === "card" && <><rect x="7" y="11" width="21" height="15" rx="3" fill="#fff" /><path d="M8 16h19M12 22h4" /><path d="m23 6 2-3m5 7 3-1" /></>}
      {kind === "notification" && <><path d="M10 23h16l-2-4v-4a6 6 0 0 0-12 0v4Z" fill="#fff" /><path d="M16 27h4M18 7V5m10 7 3-2M7 12l-3-2" /></>}
    </svg>
  );
}

export default async function Page({ searchParams }: { searchParams: Promise<{ plan?: string | string[]; invoice?: string | string[] }> }) {
  const query = await searchParams;
  const initialPlan = checkoutPlanFromQuery(typeof query.plan === "string" ? query.plan : null).key;
  const invoiceStatus = query.invoice === "cancelled" || query.invoice === "error" ? query.invoice : null;

  return (
    <div className="pay-page">
      <PageSchema page="pay" faqs={PAY_FAQS} />
      <PageHero
        className="pay-hero"
        eyebrow="Plans & payment"
        h1="Your new website starts here."
        mark="starts here"
        image="pricing"
        imageAlt="Payment card and checkmarks in Kinexis brand colors"
        sub="Subscribe on your launch day, after you approve your site. Your first charge happens when you subscribe."
      >
        <p className="pay-hero-links">
          Haven’t seen your free preview yet? <Link href="/contact" prefetch={false}>Get your free preview</Link> first.{" "}
          <a className="pay-hero-links__invoice" href="#invoice">Pay an existing invoice</a>
        </p>
      </PageHero>

      <section className="section pay-pick">
        <div className="container">
          <div className="pay-route" aria-label="Payment process">
            <span><PaymentIcon kind="plan" /> Choose your plan</span>
            <span><PaymentIcon kind="receipt" /> Review your total</span>
            <span><PaymentIcon kind="card" /> Continue with PayPal</span>
          </div>
          <PayCheckout key={initialPlan} initialPlan={initialPlan} />

          <div className="pay-after">
            <div className="pay-after__head">
              <div>
                <p className="eyebrow">Billing</p>
                <h2>Before you pay</h2>
                <p className="muted">The short version of canceling, the guarantee, and when the first charge happens.</p>
              </div>
              <a className="pay-jump" href="#invoice">Pay an existing invoice →</a>
            </div>
            <div className="pay-after__faqs">
              <Faq items={PAY_FAQS} openFirst={false} />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tint pay-invoice-section" id="invoice">
        <div className="container">
          <p className="eyebrow center">One-time payments</p>
          <h2 className="center">Paying an invoice or a deposit?</h2>
          <p className="center muted pay-invoice-lead">You leave this page only to pay on PayPal. Use the amount we already confirmed.</p>
          <div className="pay-invoice">
          {process.env.PAYPAL_CLIENT_SECRET ? <InvoicePay status={invoiceStatus} /> : (
            <div className="pay-invoice">
              <h2>Pay an invoice or deposit</h2>
              <p>Contact us for a secure payment link with the amount from your invoice.</p>
              <Link className="btn btn--primary" href="/contact" prefetch={false}>Request a payment link</Link>
            </div>
          )}
            <aside className="pay-next">
              <h2>What happens next</h2>
              <ol className="pay-steps">
                <li>
                  <PaymentIcon kind="receipt" />
                  <b>Confirm the amount</b>
                  <span>Name the invoice or deposit so we can match it.</span>
                </li>
                <li>
                  <PaymentIcon kind="card" />
                  <b>Pay on PayPal</b>
                  <span>Use a card or your PayPal balance. PayPal emails the receipt when it goes through.</span>
                </li>
                <li>
                  <PaymentIcon kind="notification" />
                  <b>We get notified</b>
                  <span>PayPal tells us when the payment is complete. The name and note you entered are how we match it.</span>
                </li>
              </ol>
              <ul className="pay-pills">
                <li>PayPal checkout</li>
                <li>Email receipt</li>
                <li>USD only</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

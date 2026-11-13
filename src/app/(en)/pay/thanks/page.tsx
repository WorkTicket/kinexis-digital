import Link from "next/link";
import { CHECKOUT_PLANS, money, type CheckoutKey } from "@/lib/pay";
import { isSubscriptionId } from "@/lib/paypal";
import { SITE, telHref } from "@/lib/site";
import { PageHero } from "@/components/ui";
import { contentMetadata } from "@/lib/seo";

type ThanksKind = "none" | "sub" | "invoice";

const KNOWN: Record<string, CheckoutKey> = {
  website: "website",
  leadSystem: "leadSystem",
  plus: "plus",
  ownIt: "ownIt",
};

function resolveThanks(query: {
  plan?: string | string[];
  sid?: string | string[];
  kind?: string | string[];
  status?: string | string[];
}): { kind: ThanksKind; plan: CheckoutKey | null; sid: string } {
  const planRaw = typeof query.plan === "string" ? query.plan : "";
  const sid = typeof query.sid === "string" ? query.sid : "";
  const kind = typeof query.kind === "string" ? query.kind : "";
  const status = typeof query.status === "string" ? query.status : "";
  if (kind === "invoice" && status === "paid") return { kind: "invoice", plan: null, sid: "" };
  const plan = KNOWN[planRaw] ?? null;
  if (plan && isSubscriptionId(sid)) return { kind: "sub", plan, sid };
  return { kind: "none", plan: null, sid: "" };
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string | string[]; sid?: string | string[]; kind?: string | string[]; status?: string | string[] }>;
}) {
  const { kind } = resolveThanks(await searchParams);
  const title =
    kind === "invoice"
      ? "Your PayPal payment was received"
      : kind === "sub"
        ? "Your website subscription is active"
        : "This checkout was not completed";
  return contentMetadata({
    path: "/pay/thanks",
    title,
    description: "Review your Kinexis checkout status and next steps. Return to secure checkout or contact the team if you need help with a plan or payment.",
    index: false,
  });
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string | string[]; sid?: string | string[]; kind?: string | string[]; status?: string | string[] }>;
}) {
  const { kind, plan, sid } = resolveThanks(await searchParams);
  const selected = plan ? CHECKOUT_PLANS.find((item) => item.key === plan) : null;

  if (kind === "invoice") {
    return (
      <div className="thanks-view">
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
    );
  }

  if (kind === "sub" && selected) {
    return (
      <div className="thanks-view">
        <PageHero
          eyebrow="Checkout"
          h1="You’re subscribed"
          mark="subscribed"
          sub="Thank you. PayPal has your subscription, and we’ll confirm the launch date shortly."
        />
        <section className="section">
          <div className="container container--narrow">
            <div className="pay-receipt">
              <p>
                <b>{selected.name}</b> · ${money(selected.price)}{selected.monthly ? "/mo" : " one time"}
              </p>
              <p>Subscription ID <code className="thanks-sid">{sid}</code></p>
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
    );
  }

  return (
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
  );
}

function ContactLine() {
  return (
    <p className="center muted">
      Questions? Call or text <a href={telHref(SITE.phone)}>{SITE.phone}</a> or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
    </p>
  );
}

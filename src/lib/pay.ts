import type { QA } from "@/lib/content";
import { CATALOG_PLANS, type CheckoutKey } from "@/lib/plans-catalog";

export type { CheckoutKey };

export type CheckoutPlan = {
  key: CheckoutKey;
  slug: string;
  name: string;
  description: string;
  price: number;
  monthly: boolean;
  popular?: boolean;
  guarantee?: boolean;
  features: string[];
};

export const CHECKOUT_PLANS: CheckoutPlan[] = CATALOG_PLANS.map((plan) => ({
  key: plan.checkoutKey,
  slug: plan.slug,
  name: plan.name,
  description: plan.tagline,
  price: plan.amount,
  monthly: plan.monthly,
  popular: plan.popular,
  guarantee: plan.guarantee,
  features: plan.checkoutFeatures,
}));

export const PAY_FAQS: QA[] = [
  {
    q: "How do I cancel?",
    a: "Anytime by text, email, or Messenger. No cancellation fee. Your site stays live through the billing period you’ve already paid for. After that, hosting stops and the site comes offline unless you arrange a buyout or Own It. Cancelling inside PayPal alone may not stop the plan—tell us directly. See section 7 of the Terms.",
  },
  {
    q: "How does the 60-day lead guarantee work?",
    a: "Lead System and Plus: zero tracked leads in your first 60 days live means your 3rd and 4th monthly charges are waived. Once per business. See section 5 of the Terms.",
  },
  {
    q: "How does the 30-day money-back guarantee work?",
    a: "Every plan includes it. If you are not satisfied within 30 days of launch, we refund your most recent payment in full when you request it in writing. Third-party costs already paid on your behalf are not refundable. See section 10 of the Terms.",
  },
  {
    q: "What do I need for missed-call text-back?",
    a: "Missed-call text-back is an optional add-on. A dedicated business phone line is required. A second tracking number is available for $1/mo, and standard carrier messaging rates may apply. Activation is subject to carrier approval, typically within 10–15 days. See section 4 of the Terms.",
  },
  {
    q: "Can I pay by card without a PayPal account?",
    a: "Yes. Choose “Debit or Credit Card” in the PayPal window, where PayPal offers it, and pay as a guest.",
  },
  {
    q: "When am I charged?",
    a: "Subscribe on your launch day, after you approve your site. Your first charge happens when you subscribe. Later charges follow your PayPal billing schedule. Own It is charged when you pay.",
  },
  {
    q: "Is there a contract?",
    a: "Monthly plans are month-to-month with no long-term contract. Your price is locked for 24 months. Own It is one payment.",
  },
  {
    q: "Taxes?",
    a: "Prices don't include sales tax, if any applies.",
  },
];

const SLUGS: Record<string, CheckoutKey> = {
  website: "website",
  "lead-system": "leadSystem",
  leadsystem: "leadSystem",
  plus: "plus",
  "own-it": "ownIt",
  ownit: "ownIt",
};

export function checkoutPlanFromQuery(value: string | null | undefined): { plan: CheckoutPlan; found: boolean } {
  const key = value ? SLUGS[value.toLowerCase()] : undefined;
  const plan = CHECKOUT_PLANS.find((item) => item.key === key);
  if (!plan) return { plan: CHECKOUT_PLANS[1], found: false };
  return { plan, found: true };
}

export function money(amount: number) {
  return amount.toLocaleString("en-US");
}

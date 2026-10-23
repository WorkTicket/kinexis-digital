import type { QA } from "@/lib/content";
import { PAYPAL_PLANS } from "@/lib/paypal";

export type CheckoutKey = "website" | "leadSystem" | "plus" | "ownIt";

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

export const CHECKOUT_PLANS: CheckoutPlan[] = [
  {
    key: "website",
    slug: "website",
    name: "Website",
    description: "A professional home for your business.",
    price: PAYPAL_PLANS.website.price,
    monthly: true,
    features: [
      "Up to 5 pages",
      "Hosting, SSL and backups",
      "2 small edits a month, in 2 business days",
      "Contact form leads",
      "Domain in your name",
      "No texting, reviews or guarantee",
    ],
  },
  {
    key: "leadSystem",
    slug: "lead-system",
    name: "Lead System",
    description: "Your website, built to bring in leads.",
    price: PAYPAL_PLANS.leadSystem.price,
    monthly: true,
    popular: true,
    guarantee: true,
    features: [
      "Up to 10 pages",
      "Unlimited small edits within 1 business day",
      "1 new page a month",
      "Missed-call text-back",
      "Google review requests to every customer",
      "Google Business Profile tune-up",
      "Call tracking and monthly report",
      "60-day tracked-lead guarantee",
    ],
  },
  {
    key: "plus",
    slug: "plus",
    name: "Plus (Bilingual)",
    description: "Reach customers in English and Spanish.",
    price: PAYPAL_PLANS.plus.price,
    monthly: true,
    guarantee: true,
    features: [
      "Everything in Lead System",
      "Full English + Spanish site, up to 20 pages",
      "Same-day edits if sent by noon Central",
      "2 new pages a month",
      "2 Google profile posts a month",
    ],
  },
  {
    key: "ownIt",
    slug: "own-it",
    name: "Own It",
    description: "One payment. A website you own.",
    price: 1497,
    monthly: false,
    features: [
      "Same site as Lead System, up to 10 pages",
      "Site files are yours from launch on full payment",
      "12 months of hosting and up to 30 min of edits a month",
      "Domain year 1 included",
      "Optional Site Care $39/mo after",
      "Texting and reviews add-on $97/mo",
      "No minimum, no guarantee",
    ],
  },
];

export const PAY_FAQS: QA[] = [
  {
    q: "How do I cancel?",
    a: "After the 3-month minimum, by text, email or Messenger. No call or form needed. Billing stops at the end of the month you've paid for. Cancelling inside PayPal alone doesn't end the minimum. See section 7 of the Terms.",
  },
  {
    q: "How does the guarantee work?",
    a: "Lead System and Plus: zero tracked leads in your first 60 days live means your 3rd and 4th monthly charges are waived and the minimum is dropped. Once per business. See section 5 of the Terms.",
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
    a: "Monthly plans have a 3-month minimum, then month to month. Your price is locked for 24 months. Own It is one payment with no minimum.",
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

export function checkoutPlanFromQuery(value: string | null | undefined): CheckoutPlan {
  const key = value ? SLUGS[value.toLowerCase()] : undefined;
  return CHECKOUT_PLANS.find((plan) => plan.key === key) ?? CHECKOUT_PLANS[1];
}

export function money(amount: number) {
  return amount.toLocaleString("en-US");
}

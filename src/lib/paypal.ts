/** Public PayPal checkout settings. Plan IDs match the live Kinexis subscriptions. */

const DEFAULT_CLIENT_ID =
  "BAA94hZ6Xo-P3Sruwoxvirr-LCBzJGNXhkyPECc6QDLa_OcBRvoP_cvUN2J9XKy-YO21gowF4u-GyFWrjg";

export const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || DEFAULT_CLIENT_ID;

export const PAYPAL_PLANS = {
  website: {
    planId: process.env.NEXT_PUBLIC_PAYPAL_WEBSITE_PLAN_ID || "P-2JL273468D026502FNLLKUHA",
    price: 97,
  },
  leadSystem: {
    planId: process.env.NEXT_PUBLIC_PAYPAL_LEAD_SYSTEM_PLAN_ID || "P-53X957121N0017056NLLKUUA",
    price: 197,
  },
  plus: {
    planId: process.env.NEXT_PUBLIC_PAYPAL_PLUS_PLAN_ID || "P-67H306359M3060154NLLKUYY",
    price: 297,
  },
} as const;

/** Hosted PayPal checkout for the one-time Own It plan. */
export const OWN_IT_CHECKOUT = "https://www.paypal.com/ncp/payment/24TVQPFTKBCGW";

export const PAYPAL_SDK_SRC =
  `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(PAYPAL_CLIENT_ID)}&vault=true&intent=subscription&locale=en_US`;

export function isSubscriptionId(value: string) {
  return /^I-[A-Z0-9]{6,}$/.test(value);
}

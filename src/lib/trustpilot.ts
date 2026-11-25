/** Direct Trustpilot review form for Kinexis Digital. */
export const TRUSTPILOT_EVALUATE_URL = "https://www.trustpilot.com/evaluate/kinexisdigital.com";
export const TRUSTPILOT_PROFILE_URL = "https://www.trustpilot.com/review/kinexisdigital.com";
export const TRUSTPILOT_DOMAIN = "kinexisdigital.com";

/** Trustpilot Business Unit ID (API + profile). */
export const TRUSTPILOT_BUSINESS_UNIT_ID = "6aef824c0156593a34415361";

export type TrustpilotReview = {
  id: string;
  name: string;
  quote: string;
  date: string;
  stars: number;
};

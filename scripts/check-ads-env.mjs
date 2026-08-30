#!/usr/bin/env node
/**
 * Fail deploy when Google Ads env is invalid (wrong ID prefix, labels without ID).
 * Tag-only installs (Ads ID, no conversion labels) are allowed — Google requires
 * the base tag before event snippets. Form conversions no-op until labels are set.
 */
const adsId = (process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "").trim();
const lead = (process.env.NEXT_PUBLIC_GADS_LABEL_LEAD || "").trim();
const audit = (process.env.NEXT_PUBLIC_GADS_LABEL_AUDIT || "").trim();
const lpWeb = (process.env.NEXT_PUBLIC_GADS_LABEL_LP_WEB_DESIGN || "").trim();
const lpFacebook = (
  process.env.NEXT_PUBLIC_GADS_LABEL_LP_FACEBOOK_WEB_DESIGN || ""
).trim();
const call = (process.env.NEXT_PUBLIC_GADS_LABEL_CALL || "").trim();
const booking = (process.env.NEXT_PUBLIC_GADS_LABEL_BOOKING || "").trim();
const pixel = (process.env.NEXT_PUBLIC_META_PIXEL_ID || "").trim();
const phone = (process.env.NEXT_PUBLIC_BUSINESS_PHONE || "").trim();

let failed = false;

function error(msg) {
  console.error(`::error::${msg}`);
  failed = true;
}

function warn(msg) {
  console.warn(`::warning::${msg}`);
}

if (adsId && !adsId.startsWith("AW-")) {
  error(
    `NEXT_PUBLIC_GOOGLE_ADS_ID must start with AW- (got "${adsId.slice(0, 12)}…").`,
  );
}

if (adsId && !lead) {
  warn(
    "NEXT_PUBLIC_GADS_LABEL_LEAD is unset — the Google tag will load, but form conversions will no-op until conversion labels are set.",
  );
}

if (lead && !adsId) {
  error(
    "NEXT_PUBLIC_GADS_LABEL_LEAD is set but NEXT_PUBLIC_GOOGLE_ADS_ID is missing.",
  );
}

if (phone && adsId && !call) {
  warn(
    "NEXT_PUBLIC_BUSINESS_PHONE is set without NEXT_PUBLIC_GADS_LABEL_CALL — call clicks will not fire an Ads conversion.",
  );
}

if (audit && !adsId) {
  warn("NEXT_PUBLIC_GADS_LABEL_AUDIT is set without NEXT_PUBLIC_GOOGLE_ADS_ID.");
}

if ((lpWeb || lpFacebook) && !adsId) {
  warn(
    "Landing-page conversion labels are set without NEXT_PUBLIC_GOOGLE_ADS_ID.",
  );
}

if (adsId && lead && (!lpWeb || !lpFacebook)) {
  warn(
    "Per-lander Google Ads labels are unset — /lp/web-design and /lp/facebook-web-design will share the audit/lead conversion until NEXT_PUBLIC_GADS_LABEL_LP_WEB_DESIGN and NEXT_PUBLIC_GADS_LABEL_LP_FACEBOOK_WEB_DESIGN are set.",
  );
}

if (booking && !adsId) {
  warn(
    "NEXT_PUBLIC_GADS_LABEL_BOOKING is set without NEXT_PUBLIC_GOOGLE_ADS_ID.",
  );
}

if (pixel && !/^\d{5,20}$/.test(pixel)) {
  error(
    `NEXT_PUBLIC_META_PIXEL_ID must be a numeric pixel id (got "${pixel.slice(0, 12)}…").`,
  );
}

if (!adsId && !lead) {
  console.log(
    "Ads conversion env unset — site will deploy; form conversions will no-op until secrets are set and redeployed.",
  );
} else if (!failed && lead) {
  console.log(
    `Ads conversion env OK (ID ${adsId.slice(0, 6)}…, lead label present${audit ? ", audit label present" : ""}).`,
  );
} else if (!failed) {
  console.log(
    `Google Ads tag ID set (${adsId.slice(0, 6)}…); conversion labels not yet configured.`,
  );
}

process.exit(failed ? 1 : 0);

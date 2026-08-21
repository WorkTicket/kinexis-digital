#!/usr/bin/env node
/**
 * Fail deploy when Google Ads env is half-configured (silent conversion no-ops).
 * Empty Ads ID + empty lead label is allowed (site ships without Ads spend ready).
 */
const adsId = (process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "").trim();
const lead = (process.env.NEXT_PUBLIC_GADS_LABEL_LEAD || "").trim();
const audit = (process.env.NEXT_PUBLIC_GADS_LABEL_AUDIT || "").trim();
const call = (process.env.NEXT_PUBLIC_GADS_LABEL_CALL || "").trim();
const booking = (process.env.NEXT_PUBLIC_GADS_LABEL_BOOKING || "").trim();
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
  error(
    "NEXT_PUBLIC_GADS_LABEL_LEAD is required when NEXT_PUBLIC_GOOGLE_ADS_ID is set. Conversions would silently no-op.",
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

if (booking && !adsId) {
  warn(
    "NEXT_PUBLIC_GADS_LABEL_BOOKING is set without NEXT_PUBLIC_GOOGLE_ADS_ID.",
  );
}

if (!adsId && !lead) {
  console.log(
    "Ads conversion env unset — site will deploy; form conversions will no-op until secrets are set and redeployed.",
  );
} else if (!failed) {
  console.log(
    `Ads conversion env OK (ID ${adsId.slice(0, 6)}…, lead label present${audit ? ", audit label present" : ""}).`,
  );
}

process.exit(failed ? 1 : 0);

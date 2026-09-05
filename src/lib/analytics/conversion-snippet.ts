import { GTAG_CONSENT_RESTORE_SCRIPT, READ_STORED_CONSENT_JS } from "@/lib/analytics/consent";
import { READ_PENDING_CONVERSION_JS } from "@/lib/analytics/pending-conversion";

/** Google Ads conversion IDs look like AW-1234567890/AbCdEfGhIjK. */
const SEND_TO_PATTERN = /^AW-\d+\/[A-Za-z0-9_-]+$/;
const TAG_ID_PATTERN = /^(AW|G)-[A-Z0-9]+$/i;

/**
 * EEA + UK + CH. Consent Mode stays denied here until the banner updates;
 * everywhere else defaults to granted so Google Ads can set first-party
 * `_gcl_*` cookies (sitewide tagging / conversion tracking compatibility).
 */
export const GDPR_CONSENT_REGIONS = [
  "AT",
  "BE",
  "BG",
  "CH",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GB",
  "GR",
  "HR",
  "HU",
  "IE",
  "IS",
  "IT",
  "LI",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
] as const;

const GDPR_REGION_LITERAL = `[${GDPR_CONSENT_REGIONS.map((code) => `'${code}'`).join(",")}]`;

const GDPR_REGION_SET = new Set<string>(GDPR_CONSENT_REGIONS);

/** Cloudflare `cf.country` / CF-IPCountry — ISO 3166-1 alpha-2. */
export function isGdprConsentRegion(
  country: string | undefined | null,
): boolean {
  if (!country) return false;
  return GDPR_REGION_SET.has(country.toUpperCase());
}

function validTagId(id: string | undefined): string | undefined {
  return id && TAG_ID_PATTERN.test(id) ? id : undefined;
}

/** Prefer the Ads ID so gtag.js loads the conversion linker for AW-… */
export function getGtagScriptSrcId(adsId?: string, gaId?: string): string | undefined {
  return validTagId(adsId) ?? validTagId(gaId);
}

/**
 * Start downloading gtag.js from the first inline head script so Next.js
 * cannot park the library behind hundreds of KB of streamed metadata.
 */
export function buildGtagLoaderSnippet(id: string): string {
  if (!TAG_ID_PATTERN.test(id)) return "";
  return `(function(){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${id}';document.head.appendChild(s);})();`;
}

/**
 * Inline Google tag bootstrap (no <script> wrapper). One copy of this plus
 * one gtag.js src is the sitewide tag.
 */
export function buildGtagInitScript(adsId?: string, gaId?: string): string {
  const validAds = validTagId(adsId);
  const validGa = validTagId(gaId);
  if (!validAds && !validGa) return "";

  return [
    "window.dataLayer=window.dataLayer||[];",
    "function gtag(){dataLayer.push(arguments);}",
    "window.gtag=gtag;",
    `gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500,region:${GDPR_REGION_LITERAL}});`,
    "gtag('consent','default',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});",
    GTAG_CONSENT_RESTORE_SCRIPT,
    "gtag('set','url_passthrough',true);",
    "gtag('set','ads_data_redaction',true);",
    "gtag('js',new Date());",
    validGa ? `gtag('config','${validGa}');` : "",
    validAds ? `gtag('config','${validAds}',{allow_enhanced_conversions:true});` : "",
  ]
    .filter(Boolean)
    .join("");
}

/**
 * Official Google tag HTML prepended as the first <head> children so Tag
 * Assistant can find a real gtag/js script src before Next.js inlined CSS.
 */
export function buildEarlyGoogleTagHtml(adsId: string, gaId?: string): string {
  const srcId = getGtagScriptSrcId(adsId, gaId);
  const init = buildGtagInitScript(adsId, gaId);
  if (!srcId || !init) return "";
  return `<script async src="https://www.googletagmanager.com/gtag/js?id=${srcId}"></script><script>${init}</script>`;
}

/**
 * Page-load event snippet for "Submit lead form (1)".
 * Lives in <head> on every page so Google's tag scanner can find `send_to`,
 * but only fires on /thank-you (and /thank-you/audit).
 */
export function buildLeadConversionSnippet(sendTo: string): string {
  if (!SEND_TO_PATTERN.test(sendTo)) return "";

  return [
    "(function(){",
    "if(!/(^|\\/)thank-you(\\/|$)/.test(location.pathname))return;",
    "try{",
    `var c=${READ_STORED_CONSENT_JS};`,
    "if(c==='accepted'||c==='rejected'){",
    "var g=c==='accepted'?'granted':'denied';",
    "gtag('consent','update',{analytics_storage:g,ad_storage:g,ad_user_data:g,ad_personalization:g});",
    "}",
    `var raw=${READ_PENDING_CONVERSION_JS};`,
    "if(raw){",
    "var p=JSON.parse(raw);",
    "if(p&&p.conversionAlreadyFired&&!/[?&]_dbg=/.test(location.search))return;",
    "if(p&&p.email){",
    "var ud={email:String(p.email).trim().toLowerCase()};",
    "if(p.phone){var ph=String(p.phone).replace(/[^\\d+]/g,'');if(ph)ud.phone_number=ph;}",
    "gtag('set','user_data',ud);",
    "}",
    "}",
    "}catch(e){}",
    `gtag('event', 'conversion', {'send_to': '${sendTo}'});`,
    "})();",
  ].join("");
}

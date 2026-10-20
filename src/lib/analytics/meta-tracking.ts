import { READ_PENDING_CONVERSION_JS } from "./pending-conversion";

export function isMetaTrackingPath(pathname: string): boolean {
  if (/\/pay\/thanks\/?$/.test(pathname)) return true;
  return /\/lp\/get-a-website\/?$/.test(pathname) || /(^|\/)thank-you(\/|$)/.test(pathname);
}

export function shouldLoadMetaTracking(
  pathname: string,
  pending?: { landingSlug?: string; storedAt?: number } | null,
): boolean {
  if (/\/pay\/thanks\/?$/.test(pathname)) return true;
  if (/\/lp\/get-a-website\/?$/.test(pathname)) return true;
  return /(^|\/)thank-you(\/|$)/.test(pathname)
    && pending?.landingSlug === "get-a-website"
    && typeof pending.storedAt === "number"
    && Date.now() - pending.storedAt < 30 * 60 * 1000;
}

/** Storage is checked in the browser so cached HTML stays visitor-independent. */
export function guardMetaTrackingScript(script: string): string {
  const eligible = `(function(){if(/\\/pay\\/thanks\\/?$/.test(location.pathname))return true;if(/\\/lp\\/get-a-website\\/?$/.test(location.pathname))return true;if(!/(^|\\/)thank-you(\\/|$)/.test(location.pathname))return false;try{var p=JSON.parse(${READ_PENDING_CONVERSION_JS});return !!p&&p.landingSlug==='get-a-website'&&typeof p.storedAt==='number'&&Date.now()-p.storedAt<1800000}catch(e){return false}})()`;
  return `if(${eligible}){window.__kinexisMetaTrackingPath=location.pathname;${script}}`;
}

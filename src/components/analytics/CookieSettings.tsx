"use client";
import { useLocale } from "next-intl";
export function CookieSettings() {
 const es = useLocale() !== "en";
 return <button type="button" className="site-footer__bar-link" onClick={() => window.dispatchEvent(new Event("kinexis:cookie-settings"))}>{es ? "ConfiguraciÃ³n de cookies" : "Cookie settings"}</button>;
}

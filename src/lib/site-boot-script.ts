import { IN_APP_BROWSER_PREFLIGHT_SCRIPT } from "@/lib/in-app-browser";

/** Sync cookie + in-app-browser preflight — runs before paint. */
export const COOKIE_PREFLIGHT_SCRIPT = `${IN_APP_BROWSER_PREFLIGHT_SCRIPT}(function(){try{if(/\\/lp\\/dallas-website-audit\\/?$/.test(location.pathname))document.documentElement.classList.add("lp-chrome")}catch(e){}try{if(/\\/lp\\//.test(location.pathname)||/\\/thank-you(\\/|$)/.test(location.pathname)){document.documentElement.classList.remove("cookie-pending");return}var c=null;try{c=localStorage.getItem("kinexis-cookie-consent")}catch(e){}if(!(c==="accepted"||c==="rejected")){var m=document.cookie.match(/(?:^|; )kinexis-cookie-consent=(accepted|rejected)/);c=m&&m[1]}if(c==="accepted"||c==="rejected")document.documentElement.classList.remove("cookie-pending")}catch(e){}})();`;

/** Inlined in layout head — keeps cookie-banner space reserved without a render-blocking stylesheet. */
export const COOKIE_PENDING_CRITICAL_CSS =
  "html.cookie-pending body{padding-bottom:6.5rem}@media(min-width:640px){html.cookie-pending body{padding-bottom:5.5rem}}html.cookie-pending.in-app-browser body{padding-bottom:11rem}@media(min-width:640px){html.cookie-pending.in-app-browser body{padding-bottom:8.5rem}}";

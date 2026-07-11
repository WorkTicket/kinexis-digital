/** Sync cookie preflight — runs before paint; pairs with server `cookie-pending` on `<html>`. */
export const COOKIE_PREFLIGHT_SCRIPT = `(function(){try{var c=localStorage.getItem("kinexis-cookie-consent");if(c)document.documentElement.classList.remove("cookie-pending")}catch(e){}})();`;

/** Inlined in layout head — keeps cookie-banner space reserved without a render-blocking stylesheet. */
export const COOKIE_PENDING_CRITICAL_CSS =
  "html.cookie-pending body{padding-bottom:6.5rem}@media(min-width:640px){html.cookie-pending body{padding-bottom:5.5rem}}";

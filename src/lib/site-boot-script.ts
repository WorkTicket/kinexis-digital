/** Inline cookie preflight — runs before paint, no extra network request. */
export const SITE_BOOT_SCRIPT = `(function(){try{var c=localStorage.getItem("kinexis-cookie-consent");if(!c)document.documentElement.classList.add("cookie-pending")}catch(e){}})();`;

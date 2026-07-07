/** Inline cookie preflight — runs before paint, no extra network request. */
export const SITE_BOOT_SCRIPT = `(function(){try{var c=localStorage.getItem("kinexis-cookie-consent");if(!c)document.documentElement.classList.add("cookie-pending")}catch(e){}})();`;

/** Dismiss preloader on DOMContentLoaded — before React hydrates. */
export const PRELOADER_BOOT_SCRIPT = `(function(){function d(){var r=document.documentElement,e=document.getElementById("site-preloader");window.__kinexisPreloaderDone=1;r.classList.remove("preloader-active");r.removeAttribute("aria-busy");if(e){e.classList.add("site-preloader--done");setTimeout(function(){e.remove()},200)}}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",d,{once:true});else d()})();`;

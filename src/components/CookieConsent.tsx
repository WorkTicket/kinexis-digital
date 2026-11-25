/**
 * Server markup only. Visibility + Accept/Reject/Preferences are owned by
 * boot.js (and a same-tick inline script) so marketing layouts need no React
 * island for consent. Markup/classes match the prior client component for e2e.
 */

const COPY = {
  en: {
    title: "Cookies & measurement",
    body: "Necessary cookies keep the site working. Analytics and ads load only if you allow them.",
    accept: "Accept",
    reject: "Reject",
    manage: "Preferences",
    save: "Save preferences",
    back: "Back",
    analytics: "Analytics",
    analyticsHint: "GA4 page and funnel events",
    ads: "Advertising",
    adsHint: "Meta Pixel for ads measurement",
    privacy: "Privacy policy",
    prefs: "Cookie preferences",
    necessary: "Necessary",
    necessaryHint: "Always on — security and basic site function",
    on: "On",
  },
  es: {
    title: "Cookies y medición",
    body: "Las cookies necesarias hacen funcionar el sitio. Analítica y anuncios solo se cargan si las permites.",
    accept: "Aceptar",
    reject: "Rechazar",
    manage: "Preferencias",
    save: "Guardar preferencias",
    back: "Volver",
    analytics: "Analítica",
    analyticsHint: "Eventos de página y embudo (GA4)",
    ads: "Publicidad",
    adsHint: "Meta Pixel para medición de anuncios",
    privacy: "Privacidad",
    prefs: "Preferencias de cookies",
    necessary: "Necesarias",
    necessaryHint: "Siempre activas — seguridad y función básica",
    on: "Activas",
  },
} as const;

const COOKIE_SVG = (
  <svg viewBox="0 0 48 48" width="46" height="46" aria-hidden="true">
    <circle cx="24" cy="24" r="21.5" fill="#0b3dff" />
    <path d="M8 16c2.7-6.1 8.3-10.2 15-11.2M9 32c3.8 6 9.8 9.3 16.5 9.6" fill="none" stroke="#7c9aff" strokeWidth="2" strokeLinecap="round" opacity=".9" />
    <circle cx="15.2" cy="15.4" r="2.5" fill="#061d79" />
    <circle cx="29.8" cy="11.8" r="2.2" fill="#061d79" />
    <circle cx="35.1" cy="24.1" r="2.7" fill="#061d79" />
    <circle cx="23.2" cy="31.9" r="2.8" fill="#061d79" />
    <circle cx="12.9" cy="29" r="1.8" fill="#061d79" />
    <circle cx="25.3" cy="19.5" r="1.7" fill="#061d79" />
    <circle cx="17.8" cy="23.3" r=".9" fill="#7c9aff" />
    <circle cx="30.5" cy="35" r="1.1" fill="#7c9aff" />
  </svg>
);

export default function CookieConsent({
  privacyHref = "/privacy",
  lang = "en",
}: {
  privacyHref?: string;
  lang?: "en" | "es";
}) {
  const t = COPY[lang];
  const titleId = "kx-consent-title";

  return (
    <div id="kx-consent" data-consent-root="" data-privacy={privacyHref} data-lang={lang} hidden={false}>
      <div className="consent-dock" data-consent-dock="" role="presentation" suppressHydrationWarning>
        <div
          className="consent-banner"
          data-consent-banner=""
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <div className="consent-banner__inner">
            <div className="consent-banner__copy">
              <p className="sr-only" id={titleId} data-consent-title="">
                {t.title}
              </p>
              <p className="consent-banner__body">
                {t.body}{" "}
                <a href={privacyHref}>{t.privacy}</a>
              </p>
              <div className="consent-banner__prefs" role="group" aria-label={t.manage} data-consent-prefs="" hidden>
                <div className="consent-pref consent-pref--locked">
                  <div className="consent-pref__text">
                    <span className="consent-pref__name">{t.necessary}</span>
                    <span className="consent-pref__hint">{t.necessaryHint}</span>
                  </div>
                  <span className="consent-pref__state" aria-hidden="true">{t.on}</span>
                </div>
                <label className="consent-pref">
                  <div className="consent-pref__text">
                    <span className="consent-pref__name">{t.analytics}</span>
                    <span className="consent-pref__hint">{t.analyticsHint}</span>
                  </div>
                  <input type="checkbox" className="consent-pref__input" data-consent-analytics="" />
                  <span className="consent-pref__switch" aria-hidden="true" />
                </label>
                <label className="consent-pref">
                  <div className="consent-pref__text">
                    <span className="consent-pref__name">{t.ads}</span>
                    <span className="consent-pref__hint">{t.adsHint}</span>
                  </div>
                  <input type="checkbox" className="consent-pref__input" data-consent-ads="" />
                  <span className="consent-pref__switch" aria-hidden="true" />
                </label>
              </div>
            </div>
            <div className="consent-banner__actions" data-consent-actions-main="">
              <div className="consent-banner__choice">
                <button type="button" className="btn btn--ghost consent-banner__btn" data-consent-reject="">
                  {t.reject}
                </button>
                <button type="button" className="btn btn--ghost consent-banner__btn" data-consent-accept="">
                  {t.accept}
                </button>
              </div>
              <button type="button" className="consent-banner__prefs-link" data-consent-manage="">
                {t.manage}
              </button>
            </div>
            <div className="consent-banner__actions" data-consent-actions-panel="" hidden>
              <button type="button" className="btn btn--ghost consent-banner__btn" data-consent-save="">
                {t.save}
              </button>
              <button type="button" className="btn btn--ghost consent-banner__btn" data-consent-back="">
                {t.back}
              </button>
            </div>
          </div>
        </div>
      </div>
      <button type="button" className="consent-fab" data-consent-fab="" aria-label={t.prefs} hidden suppressHydrationWarning>
        <span className="consent-fab__icon" aria-hidden="true">
          {COOKIE_SVG}
        </span>
        <span className="consent-fab__label">{t.prefs}</span>
      </button>
      {/* Full consent UI before paint — must not wait on lazyOnload boot.
          User dismiss detaches .consent-banner (React-parity / e2e count 0). Do not
          detach on first-paint sync — that races hydration and drops the FAB. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var r=document.getElementById("kx-consent");if(!r||r.__kxWired)return;r.__kxWired=1;var MAX=60*60*24*180,panel=!1,force=!1,geoPending=!1;var EEA="AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE IS LI NO GB UK CH";function parse(){var m=document.cookie.match(/(?:^|; )kinexis_consent=([^;]*)/);if(!m)return{decided:!1,a:!1,d:!1};try{var v=decodeURIComponent(m[1]);if(v.indexOf("v1|")!==0)return{decided:!1,a:!1,d:!1};return{decided:!0,a:/(?:^|\\|)a=1(?:\\||$)/.test(v),d:/(?:^|\\|)d=1(?:\\||$)/.test(v)}}catch(e){return{decided:!1,a:!1,d:!1}}}function write(a,d){document.cookie="kinexis_consent="+encodeURIComponent("v1|a="+(a?1:0)+"|d="+(d?1:0))+"; Path=/; Max-Age="+MAX+"; SameSite=Lax";window.dispatchEvent(new Event("kinexis:consent"))}var dock=r.querySelector("[data-consent-dock]"),fab=r.querySelector("[data-consent-fab]"),banner=r.querySelector("[data-consent-banner]"),bannerParent=banner&&banner.parentNode,title=r.querySelector("[data-consent-title]"),prefs=r.querySelector("[data-consent-prefs]"),main=r.querySelector("[data-consent-actions-main]"),panelEl=r.querySelector("[data-consent-actions-panel]"),an=r.querySelector("[data-consent-analytics]"),ad=r.querySelector("[data-consent-ads]");function setOpen(o){if(dock)dock.hidden=!o;if(fab)fab.hidden=o;if(banner&&o&&!banner.isConnected&&bannerParent)bannerParent.appendChild(banner);document.documentElement.classList.toggle("consent-open",o)}function setPanel(n){panel=n;if(banner)banner.classList.toggle("consent-banner--panel",panel);if(title){title.classList.toggle("sr-only",!panel);title.classList.toggle("consent-banner__title",panel)}if(prefs)prefs.hidden=!panel;if(main)main.hidden=panel;if(panelEl)panelEl.hidden=!panel}function sync(){var c=parse();if(geoPending&&!c.decided&&!force){setOpen(!1);if(fab)fab.hidden=!0;return}var o=force||!c.decided;setOpen(o);if(!o)setPanel(!1)}function close(){force=!1;setPanel(!1);sync();if(banner)banner.remove()}function finishGeo(showBanner){geoPending=!1;if(!showBanner&&!parse().decided)write(!0,!0);sync();if(!showBanner&&banner&&parse().decided)banner.remove()}r.querySelector("[data-consent-reject]")&&r.querySelector("[data-consent-reject]").addEventListener("click",function(){write(!1,!1);close()});r.querySelector("[data-consent-accept]")&&r.querySelector("[data-consent-accept]").addEventListener("click",function(){write(!0,!0);close()});r.querySelector("[data-consent-manage]")&&r.querySelector("[data-consent-manage]").addEventListener("click",function(){var c=parse();if(an)an.checked=c.a;if(ad)ad.checked=c.d;setPanel(!0)});r.querySelector("[data-consent-save]")&&r.querySelector("[data-consent-save]").addEventListener("click",function(){write(!!(an&&an.checked),!!(ad&&ad.checked));close()});r.querySelector("[data-consent-back]")&&r.querySelector("[data-consent-back]").addEventListener("click",function(){setPanel(!1)});fab&&fab.addEventListener("click",function(){window.dispatchEvent(new Event("kinexis:open-consent"))});window.addEventListener("kinexis:open-consent",function(){var c=parse();if(an)an.checked=c.a;if(ad)ad.checked=c.d;force=!0;setPanel(!0);setOpen(!0)});window.addEventListener("kinexis:consent",sync);if(!parse().decided){geoPending=!0;sync();var settled=!1;function settle(show){if(settled)return;settled=!0;finishGeo(show)}var timer=setTimeout(function(){settle(!0)},900);fetch("/cdn-cgi/trace",{credentials:"omit",cache:"no-store"}).then(function(res){return res.text()}).then(function(txt){clearTimeout(timer);var m=String(txt).match(/(?:^|\\n)loc=([A-Z]{2})(?:\\n|$)/);var loc=m?m[1]:"";settle(!loc||EEA.split(" ").indexOf(loc)>=0)}).catch(function(){clearTimeout(timer);settle(!0)})}else sync()})()`,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var r=document.getElementById("kx-consent");if(!r)return;r.__kxConsentKeyboardReady=!0;var banner=r.querySelector("[data-consent-banner]"),fab=r.querySelector("[data-consent-fab]"),lastOpen=!1;function open(){return document.documentElement.classList.contains("consent-open")}function items(){return banner?[...banner.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(function(e){return e.getClientRects().length&&!e.closest("[hidden]")}):[]}function focusFirst(){var a=items();if(a[0])a[0].focus({preventScroll:!0})}function restoreFocus(){if(fab&&!fab.hidden){var s=getComputedStyle(fab);if(s.display!=="none"&&s.visibility!=="hidden"&&Number(s.opacity)>.05){fab.focus({preventScroll:!0});if(document.activeElement===fab)return}}var target=document.querySelector("#content");if(!target)return;var had=target.hasAttribute("tabindex");if(!had)target.setAttribute("tabindex","-1");target.focus({preventScroll:!0});if(!had)target.addEventListener("blur",function(){target.removeAttribute("tabindex")},{once:!0})}function sync(){var now=open();if(now&&!lastOpen)requestAnimationFrame(focusFirst);if(!now&&lastOpen)requestAnimationFrame(restoreFocus);lastOpen=now}new MutationObserver(sync).observe(document.documentElement,{attributes:!0,attributeFilter:["class"]});new MutationObserver(sync).observe(r,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["hidden","class"]});document.addEventListener("focusin",function(e){if(open()&&banner&&!banner.contains(e.target))focusFirst()});document.addEventListener("keydown",function(e){if(!open())return;if(e.key==="Escape"){e.preventDefault();var reject=r.querySelector("[data-consent-reject]");if(reject)reject.click();return}if(e.key!=="Tab")return;var a=items();if(!a.length)return;var first=a[0],last=a[a.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});sync()})()`,
        }}
      />
    </div>
  );
}

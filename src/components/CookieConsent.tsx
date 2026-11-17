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
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8.25" fill="currentColor" fillOpacity=".18" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 3.75c.2 1.55 1.35 2.7 2.9 2.9.55.07 1.05.35 1.35.8.95.2 1.7.9 1.95 1.85.55.2 1 .65 1.15 1.2" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" opacity=".55" />
    <circle cx="9.1" cy="10.2" r="1.35" fill="currentColor" />
    <circle cx="14.6" cy="8.9" r="1.05" fill="currentColor" />
    <circle cx="15.2" cy="14.1" r="1.45" fill="currentColor" />
    <circle cx="10.4" cy="15.3" r="1.1" fill="currentColor" />
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
          __html: `(function(){var r=document.getElementById("kx-consent");if(!r||r.__kxWired)return;r.__kxWired=1;var MAX=60*60*24*180,panel=!1,force=!1;function parse(){var m=document.cookie.match(/(?:^|; )kinexis_consent=([^;]*)/);if(!m)return{decided:!1,a:!1,d:!1};try{var v=decodeURIComponent(m[1]);if(v.indexOf("v1|")!==0)return{decided:!1,a:!1,d:!1};return{decided:!0,a:/(?:^|\\|)a=1(?:\\||$)/.test(v),d:/(?:^|\\|)d=1(?:\\||$)/.test(v)}}catch(e){return{decided:!1,a:!1,d:!1}}}function write(a,d){document.cookie="kinexis_consent="+encodeURIComponent("v1|a="+(a?1:0)+"|d="+(d?1:0))+"; Path=/; Max-Age="+MAX+"; SameSite=Lax";window.dispatchEvent(new Event("kinexis:consent"))}var dock=r.querySelector("[data-consent-dock]"),fab=r.querySelector("[data-consent-fab]"),banner=r.querySelector("[data-consent-banner]"),bannerParent=banner&&banner.parentNode,title=r.querySelector("[data-consent-title]"),prefs=r.querySelector("[data-consent-prefs]"),main=r.querySelector("[data-consent-actions-main]"),panelEl=r.querySelector("[data-consent-actions-panel]"),an=r.querySelector("[data-consent-analytics]"),ad=r.querySelector("[data-consent-ads]");function setOpen(o){if(dock)dock.hidden=!o;if(fab)fab.hidden=o;if(banner&&o&&!banner.isConnected&&bannerParent)bannerParent.appendChild(banner);document.documentElement.classList.toggle("consent-open",o)}function setPanel(n){panel=n;if(banner)banner.classList.toggle("consent-banner--panel",panel);if(title){title.classList.toggle("sr-only",!panel);title.classList.toggle("consent-banner__title",panel)}if(prefs)prefs.hidden=!panel;if(main)main.hidden=panel;if(panelEl)panelEl.hidden=!panel}function sync(){var c=parse(),o=force||!c.decided;setOpen(o);if(!o)setPanel(!1)}function close(){force=!1;setPanel(!1);sync();if(banner)banner.remove()}r.querySelector("[data-consent-reject]")&&r.querySelector("[data-consent-reject]").addEventListener("click",function(){write(!1,!1);close()});r.querySelector("[data-consent-accept]")&&r.querySelector("[data-consent-accept]").addEventListener("click",function(){write(!0,!0);close()});r.querySelector("[data-consent-manage]")&&r.querySelector("[data-consent-manage]").addEventListener("click",function(){var c=parse();if(an)an.checked=c.a;if(ad)ad.checked=c.d;setPanel(!0)});r.querySelector("[data-consent-save]")&&r.querySelector("[data-consent-save]").addEventListener("click",function(){write(!!(an&&an.checked),!!(ad&&ad.checked));close()});r.querySelector("[data-consent-back]")&&r.querySelector("[data-consent-back]").addEventListener("click",function(){setPanel(!1)});fab&&fab.addEventListener("click",function(){window.dispatchEvent(new Event("kinexis:open-consent"))});window.addEventListener("kinexis:open-consent",function(){var c=parse();if(an)an.checked=c.a;if(ad)ad.checked=c.d;force=!0;setPanel(!0);setOpen(!0)});window.addEventListener("kinexis:consent",sync);sync()})()`,
        }}
      />
    </div>
  );
}

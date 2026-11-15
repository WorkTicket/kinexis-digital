"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { formatConsentCookie, parseConsentCookie } from "@/lib/invoice-core";

const COOKIE = "kinexis_consent";
const MAX_AGE = 60 * 60 * 24 * 180; // 180 days

type ConsentState = { decided: boolean; analytics: boolean; ads: boolean };

const UNDECIDED: ConsentState = { decided: false, analytics: false, ads: false };
let cachedConsent: ConsentState = UNDECIDED;
let cachedRaw: string | null | undefined = undefined;

function readConsent(): ConsentState {
  if (typeof document === "undefined") return UNDECIDED;
  const m = document.cookie.match(/(?:^|; )kinexis_consent=([^;]*)/);
  const raw = m ? m[1] : null;
  if (raw === cachedRaw) return cachedConsent;
  cachedRaw = raw;
  const next = parseConsentCookie(raw);
  cachedConsent =
    next.decided === cachedConsent.decided &&
    next.analytics === cachedConsent.analytics &&
    next.ads === cachedConsent.ads
      ? cachedConsent
      : next;
  return cachedConsent;
}

function writeConsent(analytics: boolean, ads: boolean) {
  const value = encodeURIComponent(formatConsentCookie(analytics, ads));
  document.cookie = `${COOKIE}=${value}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax`;
  cachedRaw = undefined;
  window.dispatchEvent(new Event("kinexis:consent"));
}

function subscribeConsent(onStoreChange: () => void) {
  const handler = () => {
    cachedRaw = undefined;
    onStoreChange();
  };
  window.addEventListener("kinexis:consent", handler);
  window.addEventListener("kinexis:open-consent", handler);
  return () => {
    window.removeEventListener("kinexis:consent", handler);
    window.removeEventListener("kinexis:open-consent", handler);
  };
}

const COPY = {
  en: {
    title: "Cookies & measurement",
    eyebrow: "Privacy choice",
    body: "Necessary cookies keep the site working. Analytics and ads load only if you allow them.",
    accept: "Accept analytics & ads",
    reject: "Reject non-essential",
    manage: "Manage preferences",
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
    eyebrow: "Privacidad",
    body: "Las cookies necesarias hacen funcionar el sitio. Analítica y anuncios solo se cargan si las permites.",
    accept: "Aceptar analítica y anuncios",
    reject: "Rechazar no esenciales",
    manage: "Gestionar preferencias",
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

export default function CookieConsent({
  privacyHref = "/privacy",
  lang = "en",
}: {
  privacyHref?: string;
  lang?: "en" | "es";
}) {
  const titleId = useId();
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => UNDECIDED);
  const [panel, setPanel] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);
  const [draftAnalytics, setDraftAnalytics] = useState(false);
  const [draftAds, setDraftAds] = useState(false);
  const t = COPY[lang];
  const open = forceOpen || !consent.decided;

  useEffect(() => {
    const onOpen = () => {
      setDraftAnalytics(readConsent().analytics);
      setDraftAds(readConsent().ads);
      setPanel(true);
      setForceOpen(true);
    };
    window.addEventListener("kinexis:open-consent", onOpen);
    return () => window.removeEventListener("kinexis:open-consent", onOpen);
  }, []);

  // Hide the floating CTA while the consent dialog is open so they don't stack.
  useEffect(() => {
    document.documentElement.classList.toggle("consent-open", open);
    return () => document.documentElement.classList.remove("consent-open");
  }, [open]);

  if (!open) {
    return (
      <button
        type="button"
        className="consent-fab"
        onClick={() => window.dispatchEvent(new Event("kinexis:open-consent"))}
        aria-label={t.prefs}
      >
        <span className="consent-fab__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <circle cx="9" cy="10" r="1.4" fill="currentColor" />
            <circle cx="14.5" cy="9" r="1.1" fill="currentColor" />
            <circle cx="13" cy="14.5" r="1.5" fill="currentColor" />
          </svg>
        </span>
        <span className="consent-fab__label">{t.prefs}</span>
      </button>
    );
  }

  return (
    <div className="consent-dock" role="presentation">
      <div
        className={`consent-banner${panel ? " consent-banner--panel" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="consent-banner__glow" aria-hidden="true" />
        <div className="consent-banner__inner">
          <div className="consent-banner__copy">
            <p className="consent-banner__eyebrow">{t.eyebrow}</p>
            <p className="consent-banner__title" id={titleId}>{t.title}</p>
            <p className="consent-banner__body">
              {t.body}{" "}
              <Link href={privacyHref} prefetch={false}>{t.privacy}</Link>
            </p>
            {panel ? (
              <div className="consent-banner__prefs" role="group" aria-label={t.manage}>
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
                  <input
                    type="checkbox"
                    className="consent-pref__input"
                    checked={draftAnalytics}
                    onChange={(e) => setDraftAnalytics(e.target.checked)}
                  />
                  <span className="consent-pref__switch" aria-hidden="true" />
                </label>
                <label className="consent-pref">
                  <div className="consent-pref__text">
                    <span className="consent-pref__name">{t.ads}</span>
                    <span className="consent-pref__hint">{t.adsHint}</span>
                  </div>
                  <input
                    type="checkbox"
                    className="consent-pref__input"
                    checked={draftAds}
                    onChange={(e) => setDraftAds(e.target.checked)}
                  />
                  <span className="consent-pref__switch" aria-hidden="true" />
                </label>
              </div>
            ) : null}
          </div>
          <div className="consent-banner__actions">
            {panel ? (
              <>
                <button
                  type="button"
                  className="btn btn--primary consent-banner__btn"
                  onClick={() => {
                    writeConsent(draftAnalytics, draftAds);
                    setForceOpen(false);
                    setPanel(false);
                  }}
                >
                  {t.save}
                </button>
                <button
                  type="button"
                  className="btn btn--ghost consent-banner__btn"
                  onClick={() => setPanel(false)}
                >
                  {t.back}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn--primary consent-banner__btn"
                  onClick={() => {
                    writeConsent(true, true);
                    setForceOpen(false);
                  }}
                >
                  {t.accept}
                </button>
                <button
                  type="button"
                  className="btn btn--ghost consent-banner__btn"
                  onClick={() => {
                    writeConsent(false, false);
                    setForceOpen(false);
                  }}
                >
                  {t.reject}
                </button>
                <button
                  type="button"
                  className="consent-banner__linkish"
                  onClick={() => {
                    setDraftAnalytics(consent.analytics);
                    setDraftAds(consent.ads);
                    setPanel(true);
                  }}
                >
                  {t.manage}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

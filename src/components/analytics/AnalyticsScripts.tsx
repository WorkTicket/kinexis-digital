"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useCookieConsent } from "@/components/analytics/CookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
const GTAG_RETRY_MS = 100;
const GTAG_MAX_ATTEMPTS = 50;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __kinexisClarityLoaded?: boolean;
  }
}

function runWhenGtagReady(fn: () => void) {
  let attempts = 0;

  const tick = () => {
    if (typeof window.gtag === "function") {
      fn();
      return;
    }

    attempts += 1;
    if (attempts < GTAG_MAX_ATTEMPTS) {
      window.setTimeout(tick, GTAG_RETRY_MS);
    }
  };

  tick();
}

function setAnalyticsConsent(granted: boolean) {
  window.gtag!("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function loadClarity() {
  if (!CLARITY_ID || window.__kinexisClarityLoaded) return;
  window.__kinexisClarityLoaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(script);
}

export default function AnalyticsScripts() {
  const pathname = usePathname();
  const { consent, ready } = useCookieConsent();
  const lastTrackedUrl = useRef<string | null>(null);

  const trackPageView = () => {
    const pageLocation = window.location.href;
    if (lastTrackedUrl.current === pageLocation) return;

    lastTrackedUrl.current = pageLocation;
    window.gtag!("event", "page_view", {
      page_location: pageLocation,
      page_title: document.title,
    });
  };

  useEffect(() => {
    if (!ready) return;

    runWhenGtagReady(() => {
      if (consent === "accepted") {
        setAnalyticsConsent(true);
        trackPageView();
        loadClarity();
      } else if (consent === "rejected") {
        setAnalyticsConsent(false);
      }
    });
  }, [consent, ready]);

  // Consent Mode v2: page views fire even when analytics_storage is denied.
  // Google records cookieless pings until the visitor accepts cookies.
  useEffect(() => {
    if (!ready) return;
    runWhenGtagReady(trackPageView);
  }, [pathname, ready]);

  if (!GA_ID) return null;

  return (
    <>
      <Script id="gtag-consent-default" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>
      <Script
        id="gtag-js"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script id="gtag-config" strategy="lazyOnload">
        {`
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}

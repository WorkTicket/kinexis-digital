"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCookieConsent } from "@/components/analytics/CookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
const GTAG_LOAD_TIMEOUT_MS = 8000;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __kinexisClarityLoaded?: boolean;
    __kinexisGtagScriptInjected?: boolean;
  }
}

function injectGtagScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window.gtag === "function") {
      resolve();
      return;
    }

    if (window.__kinexisGtagScriptInjected) {
      const checkReady = () => {
        if (typeof window.gtag === "function") {
          resolve();
        } else {
          setTimeout(checkReady, 100);
        }
      };
      checkReady();
      return;
    }

    window.__kinexisGtagScriptInjected = true;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.onload = () => resolve();
    script.onerror = () => {
      window.__kinexisGtagScriptInjected = false;
      reject(new Error("gtag script failed to load"));
    };
    document.head.appendChild(script);

    const timeout = setTimeout(() => {
      if (typeof window.gtag !== "function") {
        reject(new Error("gtag load timeout"));
      }
    }, GTAG_LOAD_TIMEOUT_MS);

    const checkReady = () => {
      if (typeof window.gtag === "function") {
        clearTimeout(timeout);
        resolve();
      } else {
        setTimeout(checkReady, 100);
      }
    };
    checkReady();
  });
}

function setAnalyticsConsent(granted: boolean) {
  if (typeof window.gtag !== "function") return;
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
  const [gtagLoaded, setGtagLoaded] = useState(false);

  const trackPageView = () => {
    if (typeof window.gtag !== "function") return;
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

    if (consent === "accepted") {
      injectGtagScript()
        .then(() => {
          setGtagLoaded(true);
          window.gtag!("js", new Date());
          window.gtag!("config", GA_ID, { send_page_view: false });
          setAnalyticsConsent(true);
          trackPageView();
          loadClarity();
        })
        .catch(() => {
          setGtagLoaded(false);
        });
    } else if (consent === "rejected") {
      setGtagLoaded(false);
    }
  }, [consent, ready]);

  useEffect(() => {
    if (!ready) return;
    if (typeof window.gtag === "function") {
      trackPageView();
    }
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
      {gtagLoaded && (
        <Script id="gtag-config-after-consent" strategy="lazyOnload">
          {`
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { send_page_view: false });
          `}
        </Script>
      )}
    </>
  );
}

"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { useCookieConsent } from "@/components/analytics/CookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export default function AnalyticsScripts() {
  const { consent } = useCookieConsent();

  if (consent !== "accepted") return null;

  return (
    <>
      {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
      {CLARITY_ID ? (
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`,
          }}
        />
      ) : null}
    </>
  );
}

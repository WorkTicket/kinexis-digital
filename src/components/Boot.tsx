import Script from "next/script";

declare global {
  interface Window {
    __KINEXIS_CFG__?: { email: string; ga: string; metaPixel: string; video: string };
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string };
    _fbq?: Window["fbq"];
  }
}

export default function Boot({
  email,
  ga,
  metaPixel,
  video,
}: {
  email: string;
  ga: string;
  metaPixel: string;
  video: string;
}) {
  const config = JSON.stringify({ email, ga, metaPixel, video }).replace(/</g, "\\u003c");
  return (
    <>
      <Script
        id="kinexis-cfg"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: `window.__KINEXIS_CFG__=${config}` }}
      />
      {/* Meta Pixel / GA load from boot.min.js only after cookie consent
          (and then on first input / 45s). No noscript pixel — that would
          fire without consent. */}
      {/* lazyOnload avoids a head preload that contends with LCP; boot still
          wires menus, forms, marks, and film after the window load event. */}
      <Script id="kinexis-boot" src="/assets/js/boot.min.js?v=58" strategy="lazyOnload" />
      {/* First-party RUM (sampled). Not analytics-gated — path + vitals only. */}
      <Script id="kinexis-rum" src="/assets/js/rum.js?v=1" strategy="lazyOnload" />
    </>
  );
}

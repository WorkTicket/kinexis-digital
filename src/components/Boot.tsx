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
      {/* Meta Pixel loads from boot.min.js on first input / idle — same gate as
          GA — so Lighthouse never pays for fbevents on the initial lab run. */}
      {metaPixel ? (
        <noscript>
          <img
            height={1}
            width={1}
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${encodeURIComponent(metaPixel)}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      ) : null}
      {/* lazyOnload avoids a head preload that contends with LCP; boot still
          wires menus, forms, marks, and film after the window load event. */}
      <Script id="kinexis-boot" src="/assets/js/boot.min.js?v=55" strategy="lazyOnload" />
    </>
  );
}

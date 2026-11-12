import Script from "next/script";

declare global {
  interface Window {
    __KINEXIS_CFG__?: { email: string; ga: string; metaPixel: string; video: string };
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string };
    _fbq?: Window["fbq"];
  }
}

/** Standard Meta Pixel bootstrap. Kept as a string so Next Script can inject it verbatim. */
function metaPixelBootstrap(pixelId: string) {
  return `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(pixelId)});fbq('track','PageView');`;
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
      {metaPixel ? (
        <>
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: metaPixelBootstrap(metaPixel) }}
          />
          <noscript>
            <img
              height={1}
              width={1}
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${encodeURIComponent(metaPixel)}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      ) : null}
      {/* lazyOnload avoids a head preload that contends with LCP; boot still
          wires menus, forms, marks, and film after the window load event. */}
      <Script id="kinexis-boot" src="/assets/js/boot.min.js?v=51" strategy="lazyOnload" />
    </>
  );
}

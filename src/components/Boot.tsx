import Script from "next/script";

declare global {
  interface Window { __KINEXIS_CFG__?: { email: string; ga: string; video: string } }
}

export default function Boot({ email, ga, video }: { email: string; ga: string; video: string }) {
  const config = JSON.stringify({ email, ga, video }).replace(/</g, "\\u003c");
  return (
    <>
      <Script
        id="kinexis-cfg"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: `window.__KINEXIS_CFG__=${config}` }}
      />
      {/* lazyOnload avoids a head preload that contends with LCP; boot still
          wires menus, forms, marks, and film after the window load event. */}
      <Script id="kinexis-boot" src="/assets/js/boot.min.js?v=50" strategy="lazyOnload" />
    </>
  );
}

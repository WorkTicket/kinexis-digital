import Script from "next/script";

declare global {
  interface Window { __KINEXIS_CFG__?: { email: string; ga: string; video: string } }
}

export default function Boot({ email, ga, video }: { email: string; ga: string; video: string }) {
  const config = JSON.stringify({ email, ga, video }).replace(/</g, "\\u003c");
  return (
    <>
      {/* Register before paint so production CSS minify can't invalidate the fill wipe. */}
      <Script
        id="kinexis-btn-fill"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `try{CSS.registerProperty({name:"--btn-fill",syntax:"<number>",inherits:!1,initialValue:"0"})}catch(e){}`,
        }}
      />
      <Script
        id="kinexis-cfg"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: `window.__KINEXIS_CFG__=${config}` }}
      />
      {/* lazyOnload avoids a head preload that contends with LCP; boot still
          wires menus, forms, marks, and film after the window load event. */}
      <Script id="kinexis-boot" src="/assets/js/boot.min.js?v=24" strategy="lazyOnload" />
    </>
  );
}

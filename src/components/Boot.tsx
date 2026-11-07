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
      <Script id="kinexis-boot" src="/assets/js/boot.js?v=14" strategy="afterInteractive" />
    </>
  );
}

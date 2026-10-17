/**
 * Meta Pixel origin hints for the website landing page only.
 *
 * React hoists these <link> tags into <head>, so the browser opens the TLS
 * connection to connect.facebook.net before fbevents.js is requested and
 * resolves www.facebook.com ahead of the first /tr beacon.
 */
export function MetaPixelPreconnect() {
  return (
    <>
      <link
        rel="preconnect"
        href="https://connect.facebook.net"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="https://www.facebook.com" />
    </>
  );
}

import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import Boot from "@/components/Boot";
import ConferbotWidget from "@/components/ConferbotWidget";
import { htmlLang, localeBootScript, type Locale } from "@/lib/i18n";
import { descriptionWithFallback, ogImage } from "@/lib/seo";
import { isPreviewSite, SITE } from "@/lib/site";
import "@/app/globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";
const gsc = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim() || SITE.googleSiteVerification;
const defaultTitle = "Website Plans From $97/mo for Local Businesses | Kinexis Digital";
const defaultDescription = descriptionWithFallback(
  SITE.description,
  " See your free homepage preview first. No card required.",
);

/** Stable public URL so preload and @font-face share one cacheable file. */
const DISPLAY_FONT_HREF = "/assets/fonts/poppins-latin-800.woff2";

export const documentMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: defaultTitle, template: `%s | ${SITE.name}` },
  description: defaultDescription,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: `${SITE.url}/about` }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Digital Marketing",
  ...(isPreviewSite()
    ? { robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } } }
    : {}),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    title: defaultTitle,
    description: defaultDescription,
    url: SITE.url,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: defaultDescription, images: [ogImage.url] },
  // Keep phone/email tappable in iOS Safari and Meta in-app browsers; avoid auto-linking street addresses.
  formatDetection: { telephone: true, email: true, address: false },
  // Skip GSC verification meta on preview so it cannot look like a production property claim.
  ...(!isPreviewSite() && gsc ? { verification: { google: gsc } } : {}),
  icons: {
    icon: [
      { url: "/favicon-32.webp", sizes: "32x32", type: "image/webp" },
      { url: "/favicon-16.webp", sizes: "16x16", type: "image/webp" },
      { url: "/favicon-48.webp", sizes: "48x48", type: "image/webp" },
      { url: "/favicon-192.webp", sizes: "192x192", type: "image/webp" },
      { url: "/favicon-512.webp", sizes: "512x512", type: "image/webp" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

/** viewport-fit=cover unlocks env(safe-area-*); interactive-widget helps Android keyboards. */
export const documentViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0b3dff" },
    { media: "(prefers-color-scheme: dark)", color: "#031b4e" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

/** Shared document shell. Each locale tree owns `<html lang>` so crawlers see the right language without JS. */
export default function DocumentShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  // Same URL as @font-face. Without this, Display 800 is discovered late via CSS and
  // swapping it in shifts page-hero art (CLS ~0.15 on about/portfolio).
  preload(DISPLAY_FONT_HREF, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });

  return (
    <html lang={htmlLang(locale)} data-scroll-behavior="smooth" suppressHydrationWarning>
      {/* Custom document head for FOUC CSS and locale boot (same pattern as the former root layout). */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* First-paint guards only. Do NOT unlayer-hide .mega__panel /
            .dropdown__menu — design CSS lives in @layer components, so an
            unlayered display:none permanently beats .is-open and kills menus. */}
        <style>{`
html,body{background:#fff;color:#0a1230}
body{margin:0;font-family:system-ui,sans-serif;line-height:1.6;font-weight:500;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4,.btn,button{font-weight:700}
.trust-hl,.trust-mark,.link-btn{font-weight:700}
h1{font-weight:800}
@media(max-width:1320px){.nav:not(.is-open){display:none}}
`}</style>
        <script id="locale-choice" dangerouslySetInnerHTML={{ __html: localeBootScript() }} />
        {/* Inline before paint: App Router forbids next/script beforeInteractive outside pages/_document.
            Lightning CSS can mangle @property syntax:"<number>" in the built stylesheet; register both
            wipe variables here so button + trust-link orange fills still interpolate on live. */}
        <script
          id="kinexis-fill-props"
          dangerouslySetInnerHTML={{
            __html: `try{CSS.registerProperty({name:"--btn-fill",syntax:"<number>",inherits:!1,initialValue:"0"})}catch(e){}try{CSS.registerProperty({name:"--mark-fill",syntax:"<number>",inherits:!1,initialValue:"0"})}catch(e){}`,
          }}
        />
        <script
          id="route-chrome"
          dangerouslySetInnerHTML={{
            __html: `(function(){
var p=location.pathname,r=document.documentElement,ua=navigator.userAgent||"";
if(p==="/es"||p.indexOf("/es/")===0){r.lang="es";p=p==="/es"?"/":p.slice(3)}
else if(p==="/es-es"||p.indexOf("/es-es/")===0){r.lang="es-ES";p=p==="/es-es"?"/":p.slice(6)}
if(p==="/contact"||p==="/audit"||p==="/strategy-call"||p.indexOf("/pay")===0||p.indexOf("/lp/")===0)r.classList.add("no-lead");
if(p==="/contact"||p==="/upgrades"||p.indexOf("/pay")===0||p==="/strategy-call"||p.indexOf("/lp/")===0)r.classList.add("no-float");
if(p==="/contact"||p==="/audit"||p==="/privacy"||p==="/terms"||p==="/update"||p==="/intake"||p.indexOf("/pay")===0||p.indexOf("/lp/")===0)r.classList.add("no-audit");
if(p==="/intake")r.classList.add("no-lead");
if(p.indexOf("/lp/")===0)r.classList.add("lp-route");
if(/FBAN|FBAV|FB_IAB|FB4A|FBIOS|Instagram|IGTV|Messenger|Line\\//i.test(ua))r.classList.add("is-meta-webview");
})()`,
          }}
        />
      </head>
      <body>
        {children}
        <Boot
          email={SITE.email}
          ga={/^G-[A-Z0-9]+$/.test(gaId) ? gaId : ""}
          metaPixel={/^\d{5,20}$/.test(metaPixelId) ? metaPixelId : ""}
          video={SITE.videoUrl}
        />
        {/* Off unless NEXT_PUBLIC_CONFERBOT_ENABLED=1; loads after analytics consent + idle/input. */}
        <ConferbotWidget locale={locale} />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Boot from "@/components/Boot";
import { htmlLang, localeBootScript, type Locale } from "@/lib/i18n";
import { descriptionWithFallback, ogImage } from "@/lib/seo";
import { SITE } from "@/lib/site";
import "@/app/globals.css";

const inter = localFont({
  src: "../app/fonts/inter-latin.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "optional",
  adjustFontFallback: "Arial",
  preload: false,
});
const poppins = localFont({
  src: [
    { path: "../app/fonts/poppins-latin-600.woff2", weight: "600", style: "normal" },
    { path: "../app/fonts/poppins-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "optional",
  adjustFontFallback: "Arial",
  preload: false,
});
const poppinsDisplay = localFont({
  src: "../app/fonts/poppins-latin-800.woff2",
  variable: "--font-poppins-display",
  weight: "800",
  // swap (not optional): optional skips the ExtraBold face on cold loads when
  // the preloaded file misses the ~100ms block window, so H1s look thin until refresh.
  display: "swap",
  adjustFontFallback: "Arial",
  preload: true,
});

const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";
const gsc = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim() || SITE.googleSiteVerification;
const defaultTitle = "Website Plans From $97/mo for Local Businesses | Kinexis Digital";
const defaultDescription = descriptionWithFallback(
  SITE.description,
  " See your free homepage preview first. No card required.",
);

export const documentMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: defaultTitle, template: `%s | ${SITE.name}` },
  description: defaultDescription,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: `${SITE.url}/about` }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Digital Marketing",
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
  ...(gsc ? { verification: { google: gsc } } : {}),
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

export const documentViewport: Viewport = { themeColor: "#0b3dff", width: "device-width", initialScale: 1 };

/** Shared document shell. Each locale tree owns `<html lang>` so crawlers see the right language without JS. */
export default function DocumentShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html lang={htmlLang(locale)} data-scroll-behavior="smooth" className={`${inter.variable} ${poppins.variable} ${poppinsDisplay.variable}`} suppressHydrationWarning>
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
var p=location.pathname,r=document.documentElement;
if(p==="/es"||p.indexOf("/es/")===0){r.lang="es";p=p==="/es"?"/":p.slice(3)}
else if(p==="/es-es"||p.indexOf("/es-es/")===0){r.lang="es-ES";p=p==="/es-es"?"/":p.slice(6)}
if(p==="/contact"||p==="/audit"||p==="/strategy-call"||p.indexOf("/pay")===0||p.indexOf("/lp/")===0)r.classList.add("no-lead");
if(p==="/contact"||p==="/upgrades"||p.indexOf("/pay")===0||p==="/strategy-call"||p.indexOf("/lp/")===0)r.classList.add("no-float");
if(p==="/contact"||p==="/audit"||p==="/privacy"||p==="/terms"||p==="/update"||p.indexOf("/pay")===0)r.classList.add("no-audit");
if(p.indexOf("/lp/")===0)r.classList.add("lp-route");
})()`,
          }}
        />
      </head>
      <body>
        {children}
        <Boot email={SITE.email} ga={/^G-[A-Z0-9]+$/.test(gaId) ? gaId : ""} video={SITE.videoUrl} />
      </body>
    </html>
  );
}

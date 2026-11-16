import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import Boot from "@/components/Boot";
import {
  HERO_POSTER,
  HERO_POSTER_AVIF_SRCSET,
  HERO_POSTER_SIZES,
} from "@/components/HeroFilm";
import { htmlLang, localeBootScript, type Locale } from "@/lib/i18n";
import { imageVariant } from "@/lib/image-sources";
import { pageHeroPreloadBootScript } from "@/lib/page-hero-lcp";
import { descriptionWithFallback, ogImage } from "@/lib/seo";
import { isPreviewSite, SITE } from "@/lib/site";
import "@/app/globals.css";

const PAGE_HERO_LCP_BOOT = pageHeroPreloadBootScript();

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
/** Home LCP poster href — 560w matches desktop sizes; mobile (360×~1.75 DPR) selects 768w via imagesrcset.
 *  Must go through react-dom preload() so Next emits an early hint WITH href before
 *  precedence-inlined CSS (plain <link> in DocumentShell lands after the ~240KB stylesheet). */
const HERO_POSTER_PRELOAD_HREF = imageVariant(HERO_POSTER, 560, "avif");

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
  // Home poster: react-dom preload(href, …) is what lands before <style data-precedence>
  // with a real href. A head <link> alone is reordered after the inlined CSS (~240KB),
  // which is the resource-load-delay seen on `/` and `/es` in PSI.
  preload(HERO_POSTER_PRELOAD_HREF, {
    as: "image",
    imageSrcSet: HERO_POSTER_AVIF_SRCSET,
    imageSizes: HERO_POSTER_SIZES,
    type: "image/avif",
    fetchPriority: "high",
  });

  return (
    <html lang={htmlLang(locale)} data-scroll-behavior="smooth" suppressHydrationWarning>
      {/* Custom document head for FOUC CSS and locale boot (same pattern as the former root layout). */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* Resource hints: react-dom preload() above emits the early font + poster hints
            (with href) before <style data-precedence>. These explicit <link>s stay as
            document-order fallbacks (Next may place them after inlined CSS).
            Home poster is unconditional: path gating via headers() needs an async shell,
            which drops experimental.inlineCss and fails check-css-inlined.
            Interior page-hero art uses a sync pathname boot for the same constraint. */}
        <link rel="preload" as="font" href={DISPLAY_FONT_HREF} type="font/woff2" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="image"
          href={HERO_POSTER_PRELOAD_HREF}
          imageSrcSet={HERO_POSTER_AVIF_SRCSET}
          imageSizes={HERO_POSTER_SIZES}
          type="image/avif"
          fetchPriority="high"
        />
        <script id="page-hero-lcp" dangerouslySetInnerHTML={{ __html: PAGE_HERO_LCP_BOOT }} />
        {/* First-paint guards only. Do NOT unlayer-hide .mega__panel /
            .dropdown__menu — design CSS lives in @layer components, so an
            unlayered display:none permanently beats .is-open and kills menus. */}
        <style>{`
/* Critical first-paint: bind Display 800 + metric-matched fallback BEFORE the
   ~240KB inlined globals.css so H1 (blog LCP) can paint without waiting on
   stylesheet parse / font-display:block. Values match globals.css. */
@font-face{font-family:"poppinsDisplay";src:url("${DISPLAY_FONT_HREF}") format("woff2");font-weight:800;font-style:normal;font-display:swap}
@font-face{font-family:"poppinsDisplay Fallback";src:local("Arial");ascent-override:88.85%;descent-override:29.62%;line-gap-override:8.46%;size-adjust:118.17%}
html,body{background:#fff;color:#0a1230}
body{margin:0;font-family:system-ui,sans-serif;line-height:1.6;font-weight:500;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4,.btn,button{font-weight:700}
.trust-hl,.trust-mark,.link-btn{font-weight:700}
h1{font-family:"poppinsDisplay","poppinsDisplay Fallback",Arial,sans-serif;font-weight:800}
.page-hero--article h1{max-width:18ch;margin-inline:auto;text-wrap:balance}
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
          locale={locale}
        />
        {/* Conferbot: vanilla public/assets/js/conferbot.min.js via Boot (flag + consent-open defer). */}
      </body>
    </html>
  );
}

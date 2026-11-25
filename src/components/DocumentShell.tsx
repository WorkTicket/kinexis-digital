import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import Boot from "@/components/Boot";
import Rum from "@/components/Rum";
import { htmlLang, localeBootScript, type Locale } from "@/lib/i18n";
import { pageHeroPreloadBootScript } from "@/lib/page-hero-lcp";
import { descriptionWithFallback, ogImage } from "@/lib/seo";
import { isPreviewSite, SITE } from "@/lib/site";
import "@/app/globals.css";

const PAGE_HERO_LCP_BOOT = pageHeroPreloadBootScript();

const gaId = isPreviewSite() ? "" : process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";
const metaPixelId = isPreviewSite() ? "" : process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";
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
  // Single preload only — a duplicate <link> raced the homepage LCP poster.
  preload(DISPLAY_FONT_HREF, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return (
    <html lang={htmlLang(locale)} data-scroll-behavior="smooth" suppressHydrationWarning>
      {/* Custom document head for FOUC CSS and locale boot (same pattern as the former root layout). */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* LCP image preload first (homepage poster / page-hero art), then font.
            Keep the homepage poster off routes whose LCP is their page-hero artwork. */}
        <script id="page-hero-lcp" dangerouslySetInnerHTML={{ __html: PAGE_HERO_LCP_BOOT }} />
        {/* First-paint guards only. Do NOT unlayer-hide .mega__panel /
            .dropdown__menu — design CSS lives in @layer components, so an
            unlayered display:none permanently beats .is-open and kills menus.
            Hero media rules match globals.css so the LCP poster can paint before
            the ~57 KiB shared stylesheet arrives (cuts element-render delay). */}
        <style>{`
/* Critical first-paint: Display 800 + metric-matched fallback + homepage LCP shell.
   Values match globals.css (tokens inlined as hex — vars load with the full sheet). */
@font-face{font-family:"poppinsDisplay";src:url("${DISPLAY_FONT_HREF}") format("woff2");font-weight:800;font-style:normal;font-display:swap}
@font-face{font-family:"poppinsDisplay Fallback";src:local("Arial");ascent-override:88.85%;descent-override:29.62%;line-gap-override:8.46%;size-adjust:118.17%}
html,body{background:#fff;color:#0a1230}
body{margin:0;font-family:system-ui,sans-serif;line-height:1.6;font-weight:500;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4,.btn,button{font-weight:700}
.trust-hl,.trust-mark,.link-btn{font-weight:700}
h1{font-family:"poppinsDisplay","poppinsDisplay Fallback",Arial,sans-serif;font-weight:800}
.page-hero--article h1{max-width:18ch;margin-inline:auto;text-wrap:balance}
.container{width:100%;max-width:1180px;margin:0 auto;padding:0 20px}
/* Unlayered .container{padding:0 20px} above beats @layer preview-bar__inner — restore vertical inset. */
.preview-bar>.container.preview-bar__inner{padding:22px 20px 26px}
@media(max-width:560px){.preview-bar>.container.preview-bar__inner{padding:20px 16px 24px}}
.hero{position:relative;overflow:visible;padding:76px 0 88px;color:#0a1230;background:#fff}
.hero .container{position:relative;z-index:2}
.hero__inner{display:grid;grid-template-columns:minmax(0,1.38fr) minmax(0,1fr);gap:48px;align-items:center}
.hero__media{position:relative;width:100%;padding:12px;background:#fff;border:3px solid #031b4e;border-radius:22px;box-shadow:8px 8px 0 #031b4e;line-height:0}
.hero__frame{position:relative;border-radius:14px;overflow:hidden;border:3px solid #031b4e;background:#0a1230}
.hero__poster,.hero__film{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;background:#0a1230}
.hero__film{position:absolute;inset:0;width:100%;height:100%;opacity:0;pointer-events:none}
.page-hero{position:relative;overflow:visible;padding:72px 0 56px;background:linear-gradient(180deg,#f4f7ff,#fff);border-bottom:1px solid #e1e6f2}
.page-hero__grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(28px,4vw,64px);align-items:center;text-align:left}
.page-hero__art{min-width:0}.art-wrap{position:relative}.page-hero__art .art-wrap{aspect-ratio:1/1;width:100%;max-width:100%}
.campaign-page-art{display:block;width:100%}.hero-art,.campaign-page-art__img{display:block;width:100%;height:auto;object-fit:contain}
@media(max-width:720px){.hero__inner{grid-template-columns:1fr;gap:clamp(12px,1.8svh,16px)}.hero.hero--fit{min-height:0;padding:28px 0 36px}.hero__media{padding:8px;box-shadow:5px 5px 0 #031b4e}}
@media(max-width:860px){.page-hero__grid{grid-template-columns:1fr}.page-hero__art .art-wrap{max-width:260px;margin-inline:auto}}
@media(max-width:1320px){.nav:not(.is-open){display:none}}
/* Unlayered: keep reason-sheet icon box size; sheet overflow visible so soft edges are not shaved. */
.reason-sheet{overflow:visible}
.reason-sheet__item:nth-child(1){border-top-left-radius:19px}
.reason-sheet__item:nth-child(2){border-top-right-radius:19px}
.reason-sheet__item:nth-child(3){border-bottom-left-radius:19px}
.reason-sheet__item:nth-child(4){border-bottom-right-radius:19px}
.reason-sheet__mark{overflow:visible}
.reason-sheet__mark img.icon{width:96px!important;height:96px!important;max-width:96px!important;object-fit:contain!important;overflow:visible}
@media(max-width:900px){.reason-sheet__mark img.icon{width:80px!important;height:80px!important;max-width:80px!important}}
@media(max-width:560px){.reason-sheet__mark img.icon{width:68px!important;height:68px!important;max-width:68px!important}}
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
        <Rum />
        {/* Conferbot: vanilla public/assets/js/conferbot.min.js via Boot (flag + consent-open defer). */}
      </body>
    </html>
  );
}

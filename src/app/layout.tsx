import type { Metadata, Viewport } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import "./globals.css";
import { chromeFor } from "@/i18n/chrome";
import { contentLanguage, getLocale, getRequestPath, localeBootScript, withLocale } from "@/lib/i18n";
import { heroPreload } from "@/lib/lcp";
import { ogImage } from "@/lib/seo";
import { SITE } from "@/lib/site";
import Header from "@/components/Header";
import SiteAudit from "@/components/SiteAudit";
import Footer from "@/components/Footer";
import ScrollUi from "@/components/ScrollUi";
import DialogHost from "@/components/DialogHost";
import Boot from "@/components/Boot";
import { SiteSchema } from "@/components/JsonLd";

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: "Arial",
  preload: true,
});
const poppins = localFont({
  src: [
    { path: "./fonts/poppins-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
  adjustFontFallback: "Arial",
  preload: true,
});
const poppinsDisplay = localFont({
  src: "./fonts/poppins-latin-800.woff2",
  variable: "--font-poppins-display",
  weight: "800",
  display: "swap",
  adjustFontFallback: "Arial",
  preload: true,
});

const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";
const gsc = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim() || SITE.googleSiteVerification;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Websites and SEO for US Service Businesses | Kinexis Digital", template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: `${SITE.url}/about` }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Digital Marketing",
  openGraph: { type: "website", locale: "en_US", siteName: SITE.name, images: [ogImage] },
  twitter: { card: "summary_large_image", images: [SITE.ogImage] },
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
export const viewport: Viewport = { themeColor: "#0b3dff", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const chrome = chromeFor(locale);
  const preload = heroPreload(await getRequestPath());
  return (
    <html lang={contentLanguage(locale)} data-scroll-behavior="smooth" className={`${inter.variable} ${poppins.variable} ${poppinsDisplay.variable}`} suppressHydrationWarning>
      <head>
        {/* Prevent the desktop navigation from painting unstyled while the
            external stylesheet is in flight. The full mobile menu still opens
            normally because this rule stops matching as soon as it is open. */}
        <style>{`@media(max-width:1024px){.nav:not(.is-open){display:none}}`}</style>
        {preload && (
          <link
            rel="preload"
            as="image"
            href={preload.href}
            imageSrcSet={preload.srcSet}
            imageSizes={preload.sizes}
            type={preload.type}
            fetchPriority="high"
          />
        )}
        <script id="locale-choice" dangerouslySetInnerHTML={{ __html: localeBootScript() }} />
        <script
          id="route-chrome"
          dangerouslySetInnerHTML={{
            __html: `(function(){
var p=location.pathname,r=document.documentElement;
if(p==="/es"||p.indexOf("/es/")===0)p=p==="/es"?"/":p.slice(3);
else if(p==="/es-es"||p.indexOf("/es-es/")===0)p=p==="/es-es"?"/":p.slice(6);
if(p==="/contact"||p==="/audit"||p==="/strategy-call"||p.indexOf("/pay")===0)r.classList.add("no-lead");
if(p.indexOf("/pay")===0||p==="/strategy-call")r.classList.add("no-float");
var started=false;
var start=function(){
  if(started)return;started=true;
  if(!document.fonts||!document.fonts.load){r.classList.add("fonts-on");return}
  Promise.all([
    document.fonts.load("800 16px poppinsDisplay"),
    document.fonts.load("700 16px poppins"),
    document.fonts.load("600 16px poppins"),
    document.fonts.load("16px inter")
  ]).then(function(){r.classList.add("fonts-on")},function(){r.classList.add("fonts-on")});
};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});
else start();
})()`,
          }}
        />
        <SiteSchema />
      </head>
      <body>
        <div className="page-veil" aria-hidden="true" />
        <a className="skip" href="#content">{chrome.skip}</a>
        {SITE.announce && <div className="announce"><Link href={withLocale(locale, SITE.announce.href)} prefetch={false}>{chrome.announce}</Link></div>}
        <Header />
        <main id="content">{children}</main>
        <SiteAudit />
        <Footer />
        <ScrollUi />
        <DialogHost />
        <Boot email={SITE.email} ga={/^G-[A-Z0-9]+$/.test(gaId) ? gaId : ""} video={SITE.videoUrl} />
      </body>
    </html>
  );
}

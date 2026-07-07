import type { Viewport } from "next";
import Script from "next/script";
import { headers } from "next/headers";
import { Ubuntu } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import "../../styles/light-mode-overrides.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkipToMain from "@/components/layout/SkipToMain";
import { MotionProvider } from "@/components/providers/MotionProvider";
import DeferredWidgets from "@/components/providers/DeferredWidgets";
import { CookieConsentProvider } from "@/components/analytics/CookieConsent";
import AnalyticsScripts from "@/components/analytics/AnalyticsScripts";
import { routing, type Locale } from "@/i18n/routing";
import { getHtmlLang } from "@/i18n/locale-tags";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ubuntu",
  display: "optional",
  preload: true,
  adjustFontFallback: true,
});

/** Weight 500 deferred — not needed for hero LCP (400/700 only above fold). */
const ubuntuMedium = Ubuntu({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-ubuntu-medium",
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** ISR — warm HTML at the edge to keep Ahrefs TTFB under 1s on re-crawl. */
export const revalidate = 86400;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const nonce = (await headers()).get("x-csp-nonce") ?? "";

  return (
    <html lang={getHtmlLang(locale as Locale)} className={`${ubuntu.variable} ${ubuntuMedium.variable}`}>
      <body className="font-ubuntu bg-bg text-foreground antialiased">
        <Script id="cookie-consent-preflight" strategy="beforeInteractive" nonce={nonce}>
          {`(function(){try{var c=localStorage.getItem("kinexis-cookie-consent");if(!c)document.documentElement.classList.add("cookie-pending")}catch(e){}})();`}
        </Script>
        <NextIntlClientProvider locale={locale} messages={messages} key={locale}>
          <CookieConsentProvider>
            <MotionProvider>
              <SkipToMain />
              <div className="grain-overlay" />
              <Header />
              <main id="main-content" tabIndex={-1} className="overflow-x-clip">
                {children}
              </main>
              <DeferredWidgets />
              <Footer />
            </MotionProvider>
            <AnalyticsScripts nonce={nonce} />
          </CookieConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

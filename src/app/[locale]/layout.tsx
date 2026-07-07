import type { Viewport } from "next";
import { Ubuntu } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkipToMain from "@/components/layout/SkipToMain";
import SitePreloaderClient from "@/components/layout/SitePreloaderClient";
import { MotionFlagsProvider } from "@/components/providers/MotionFlagsProvider";
import FramerMotionShell from "@/components/providers/FramerMotionShell";
import DeferredWidgets from "@/components/providers/DeferredWidgets";
import { CookieConsentProvider } from "@/components/analytics/CookieConsent";
import AnalyticsScripts from "@/components/analytics/AnalyticsScripts";
import { routing, type Locale } from "@/i18n/routing";
import { getHtmlLang } from "@/i18n/locale-tags";
import { COOKIE_PREFLIGHT_SCRIPT, COOKIE_PENDING_CRITICAL_CSS } from "@/lib/site-boot-script";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ubuntu",
  display: "optional",
  preload: true,
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
  colorScheme: "dark",
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

  return (
    <html
      lang={getHtmlLang(locale as Locale)}
      className={`${ubuntu.variable} cookie-pending`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: COOKIE_PREFLIGHT_SCRIPT }} />
        <style dangerouslySetInnerHTML={{ __html: COOKIE_PENDING_CRITICAL_CSS }} />
      </head>
      <body className="font-ubuntu bg-bg text-foreground antialiased">
        <SitePreloaderClient />
        <NextIntlClientProvider locale={locale} messages={messages} key={locale}>
          <CookieConsentProvider>
            <MotionFlagsProvider>
              <SkipToMain />
              <div className="grain-overlay" />
              <Header />
              <FramerMotionShell>
                <main id="main-content" tabIndex={-1} className="overflow-x-clip">
                  {children}
                </main>
              </FramerMotionShell>
              <DeferredWidgets />
              <Footer />
            </MotionFlagsProvider>
            <AnalyticsScripts />
          </CookieConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Ubuntu } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MotionProvider } from "@/components/providers/MotionProvider";
import DeferredWidgets from "@/components/providers/DeferredWidgets";
import { CookieConsentProvider } from "@/components/analytics/CookieConsent";
import AnalyticsScripts from "@/components/analytics/AnalyticsScripts";
import { buildPageMetadata } from "@/lib/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { getHtmlLang } from "@/i18n/locale-tags";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return buildPageMetadata({
    locale: locale as Locale,
    path: "/",
    title: t("title"),
    description: t("description"),
  });
}

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
    <html lang={getHtmlLang(locale as Locale)} className={`${ubuntu.variable}`}>
      <head>
        {/* Early connection hints — reduces RTT for consent-gated analytics */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://region1.google-analytics.com" />
      </head>
      <body className="font-ubuntu bg-bg text-white antialiased">
        <NextIntlClientProvider locale={locale} messages={messages} key={locale}>
          <CookieConsentProvider>
            <MotionProvider>
              <div className="grain-overlay" />
              <Header />
              <main className="page-enter overflow-x-clip">{children}</main>
              <DeferredWidgets />
              <Footer />
            </MotionProvider>
            <AnalyticsScripts />
          </CookieConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

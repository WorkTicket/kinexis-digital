import type { Metadata, Viewport } from "next";
import { Ubuntu } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { MotionProvider } from "@/components/providers/MotionProvider";
import DeferredWidgets from "@/components/providers/DeferredWidgets";
import { CookieConsentProvider } from "@/components/analytics/CookieConsent";
import AnalyticsScripts from "@/components/analytics/AnalyticsScripts";
import { getDefaultOgImageUrl } from "@/lib/metadata";
import { organizationSchema } from "@/lib/schema";
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

  const ogImage = getDefaultOgImageUrl();

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      images: [{ url: ogImage, alt: "KINEXIS Digital" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("ogDescription"),
      images: [ogImage],
    },
  };
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
      <body className="font-ubuntu bg-bg text-white antialiased">
        <JsonLd data={organizationSchema()} />
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

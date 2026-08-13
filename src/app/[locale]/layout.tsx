import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { SiteAnalytics } from "@/components/analytics/SiteAnalytics";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SiteAtmosphere } from "@/components/SiteAtmosphere";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MotionProvider } from "@/components/providers/FramerMotionProvider";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { getHtmlLang, getOgLocale } from "@/i18n/locale-tags";
import { routing } from "@/i18n/routing";
import {
  DEFAULT_OG_IMAGE_PATH,
  getDefaultOgImageUrl,
  getSiteUrl,
} from "@/lib/metadata";
import { pickChromeMessages } from "@/lib/chrome-messages";
import {
  COOKIE_PENDING_CRITICAL_CSS,
  COOKIE_PREFLIGHT_SCRIPT,
} from "@/lib/site-boot-script";
import { THEME_PREFLIGHT_SCRIPT } from "@/lib/theme";
import "../globals.css";

const kinexisDisplay = localFont({
  src: "../../fonts/kinexis-display/KinexisDisplay-Bold.woff2",
  weight: "700",
  variable: "--font-display",
  display: "optional",
  preload: true,
  adjustFontFallback: "Arial",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

const kinexisText = localFont({
  src: [
    { path: "../../fonts/kinexis-text/KinexisText-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/kinexis-text/KinexisText-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/kinexis-text/KinexisText-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-text",
  display: "optional",
  preload: false,
  adjustFontFallback: "Arial",
  fallback: ["Arial", "Helvetica", "sans-serif"],
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
  params: LocaleParams;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("title");
  const description = t("description");

  return {
    title: {
      default: title,
      template: "%s | Kinexis Digital",
    },
    description,
    openGraph: {
      type: "website",
      locale: getOgLocale(locale),
      url: getSiteUrl(),
      siteName: "KINEXIS Digital",
      title,
      description,
      images: [
        {
          url: DEFAULT_OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: "KINEXIS Digital",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@kinexisdigital",
      title,
      description,
      images: [getDefaultOgImageUrl()],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LocaleParams;
}) {
  const locale = await resolveLocale(params);
  const messages = pickChromeMessages(await getMessages());
  const t = await getTranslations({ locale, namespace: "a11y" });
  const gtagId =
    process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  return (
    <html
      lang={getHtmlLang(locale)}
      suppressHydrationWarning
      className={`${kinexisDisplay.variable} ${kinexisText.variable} cookie-pending h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_PREFLIGHT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: COOKIE_PREFLIGHT_SCRIPT }} />
        <style dangerouslySetInnerHTML={{ __html: COOKIE_PENDING_CRITICAL_CSS }} />
        {gtagId ? (
          <script
            id="gtag-init"
            dangerouslySetInnerHTML={{
              __html: [
                "window.dataLayer=window.dataLayer||[];",
                "function gtag(){dataLayer.push(arguments);}",
                "window.gtag=gtag;",
                "gtag('consent','default',{",
                "analytics_storage:'denied',",
                "ad_storage:'denied',",
                "ad_user_data:'denied',",
                "ad_personalization:'denied',",
                "wait_for_update:500",
                "});",
                "gtag('set','url_passthrough',true);",
                "gtag('set','ads_data_redaction',true);",
                "gtag('js',new Date());",
                process.env.NEXT_PUBLIC_GA_ID
                  ? `gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`
                  : "",
                process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
                  ? `gtag('config','${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}',{allow_enhanced_conversions:true});`
                  : "",
              ]
                .filter(Boolean)
                .join(""),
            }}
          />
        ) : null}
      </head>
      <body className="min-h-full flex flex-col text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages} key={locale}>
          <a href="#main-content" className="skip-link">
            {t("skipToMain")}
          </a>
          <ThemeProvider>
            <MotionProvider>
              <SiteAnalytics>
                <SiteAtmosphere />
                <Header />
                <div className="site-shell flex min-h-full flex-1 flex-col">
                  <div id="main-content" className="flex flex-1 flex-col">
                    {children}
                  </div>
                  <Footer />
                </div>
              </SiteAnalytics>
            </MotionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

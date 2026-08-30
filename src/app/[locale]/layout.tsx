import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { SiteAnalytics } from "@/components/analytics/SiteAnalytics";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SiteAtmosphere } from "@/components/SiteAtmosphere";
import { SiteShell } from "@/components/SiteShell";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MotionFlagsProvider } from "@/components/providers/MotionFlagsProvider";
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
import {
  getGaMeasurementId,
  getGoogleAdsId,
  getLeadConversionSendTo,
  getMetaPixelId,
} from "@/lib/analytics/ads-config";
import {
  buildGtagInitScript,
  buildLeadConversionSnippet,
  getGtagScriptSrcId,
} from "@/lib/analytics/conversion-snippet";
import {
  buildMetaLeadSnippet,
  buildMetaPixelInitScript,
} from "@/lib/analytics/meta-pixel";
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
  const gaId = getGaMeasurementId();
  const adsId = getGoogleAdsId();
  const gtagSrcId = getGtagScriptSrcId(adsId, gaId);
  const gtagInit = buildGtagInitScript(adsId, gaId);
  const leadSendTo = getLeadConversionSendTo();
  const leadSnippet = leadSendTo ? buildLeadConversionSnippet(leadSendTo) : "";
  const metaPixelId = getMetaPixelId();
  const metaInit = metaPixelId ? buildMetaPixelInitScript(metaPixelId) : "";
  const metaLeadSnippet = metaPixelId ? buildMetaLeadSnippet(metaPixelId) : "";

  return (
    <html
      lang={getHtmlLang(locale)}
      suppressHydrationWarning
      className={`${kinexisDisplay.variable} ${kinexisText.variable} cookie-pending h-full antialiased`}
    >
      <head>
        {gtagSrcId && gtagInit ? (
          <>
            <script
              id="gtag-src"
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gtagSrcId}`}
            />
            <script
              id="gtag-init"
              dangerouslySetInnerHTML={{ __html: gtagInit }}
            />
            {leadSnippet ? (
              <script
                id="gtag-lead-conversion"
                dangerouslySetInnerHTML={{
                  __html: `/* Event snippet for Submit lead form (1) conversion page */${leadSnippet}`,
                }}
              />
            ) : null}
          </>
        ) : null}
        {metaInit ? (
          <>
            <script
              id="meta-pixel-init"
              dangerouslySetInnerHTML={{ __html: metaInit }}
            />
            {metaLeadSnippet ? (
              <script
                id="meta-pixel-lead"
                dangerouslySetInnerHTML={{ __html: metaLeadSnippet }}
              />
            ) : null}
          </>
        ) : null}
        <script dangerouslySetInnerHTML={{ __html: THEME_PREFLIGHT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: COOKIE_PREFLIGHT_SCRIPT }} />
        <style dangerouslySetInnerHTML={{ __html: COOKIE_PENDING_CRITICAL_CSS }} />
      </head>
      <body className="min-h-full flex flex-col text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages} key={locale}>
          <a href="#main-content" className="skip-link">
            {t("skipToMain")}
          </a>
          <ThemeProvider>
            <MotionFlagsProvider>
              <SiteAnalytics>
                <SiteAtmosphere />
                <SiteShell header={<Header />} footer={<Footer />}>
                  {children}
                </SiteShell>
              </SiteAnalytics>
            </MotionFlagsProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

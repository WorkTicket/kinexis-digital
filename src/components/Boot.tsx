import Script from "next/script";
import { PUBLIC_CONFERBOT_BOT_ID } from "@/lib/conferbot-config";
import type { Locale } from "@/lib/i18n";
import { META_CONTENT_NAME_BY_FORM, type MetaLeadForm } from "@/lib/meta-capi";

type PendingMetaLead = { form: string; path: string; eventId: string };

declare global {
  interface Window {
    __KINEXIS_CFG__?: {
      email: string;
      ga: string;
      metaPixel: string;
      video: string;
      metaContentNameByForm: Readonly<Record<MetaLeadForm, string>>;
      conferbotBotId: string;
      conferbotLocale: string;
    };
    __KINEXIS_TRACK_META_LEAD__?: (form: string, path: string, eventId: string) => void;
    __KINEXIS_PENDING_META_LEADS__?: PendingMetaLead[];
    __KINEXIS_MIRRORS__?: readonly string[];
    __KINEXIS_ENGLISH_FALLBACKS__?: Readonly<Record<string, string>>;
    __KINEXIS_SPANISH_UTILITY_PATHS__?: readonly string[];
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string };
    _fbq?: Window["fbq"];
  }
}

function conferbotLocale(locale: Locale) {
  if (locale === "es-419") return "es";
  if (locale === "es-ES") return "es-ES";
  return "en";
}

export default function Boot({
  email,
  ga,
  metaPixel,
  video,
  locale,
}: {
  email: string;
  ga: string;
  metaPixel: string;
  video: string;
  locale: Locale;
}) {
  const conferbotOn = process.env.NEXT_PUBLIC_CONFERBOT_ENABLED === "1";
  const botFromEnv = (process.env.NEXT_PUBLIC_CONFERBOT_BOT_ID || "").trim();
  const conferbotBotId = conferbotOn ? botFromEnv || PUBLIC_CONFERBOT_BOT_ID : "";
  const config = JSON.stringify({
    email,
    ga,
    metaPixel,
    video,
    metaContentNameByForm: META_CONTENT_NAME_BY_FORM,
    conferbotBotId,
    conferbotLocale: conferbotLocale(locale),
  }).replace(/</g, "\\u003c");
  return (
    <>
      <Script
        id="kinexis-cfg"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: `window.__KINEXIS_CFG__=${config}` }}
      />
      {/* Meta Pixel / GA load from boot.min.js only after cookie consent,
          then on first input / scroll / 45s. No noscript pixel — that would
          fire without consent. */}
      {/* lazyOnload avoids a head preload that contends with LCP; boot still
          wires menus, forms, marks, and film after the window load event. */}
      <Script id="kinexis-boot" src="/assets/js/boot.min.js?v=66" strategy="lazyOnload" />
      {/* Separate file so Conferbot lift/load is not one long task with boot.
          /assets is served immutable for a year: bump ?v= whenever conferbot.js changes. */}
      <Script id="kinexis-conferbot" src="/assets/js/conferbot.min.js?v=3" strategy="lazyOnload" />
    </>
  );
}

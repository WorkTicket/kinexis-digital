import Link from "next/link";
import { chromeFor } from "@/i18n/chrome";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import Header from "@/components/Header";
import SiteAudit from "@/components/SiteAudit";
import Footer from "@/components/Footer";
import ScrollUi from "@/components/ScrollUi";
import DialogHost from "@/components/DialogHost";
import { SiteSchema } from "@/components/JsonLd";

/** Locale-scoped chrome. Kept out of the root layout so pages can prerender. */
export default function SiteChrome({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const chrome = chromeFor(locale);
  return (
    <>
      <SiteSchema locale={locale} />
      <a className="skip" href="#content">{chrome.skip}</a>
      {SITE.announce && (
        <div className="announce">
          <Link href={withLocale(locale, SITE.announce.href)} prefetch={false}>
            {chrome.announce}
          </Link>
        </div>
      )}
      <Header locale={locale} />
      <main id="content">{children}</main>
      <div data-site-audit="">
        <SiteAudit locale={locale} />
      </div>
      <Footer locale={locale} />
      <ScrollUi locale={locale} />
      <DialogHost locale={locale} />
    </>
  );
}

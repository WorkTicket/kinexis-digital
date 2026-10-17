import type { Metadata } from "next";
import { MetaPixelPreconnect } from "@/components/analytics/MetaPixelPreconnect";
import { WebsiteLanding } from "@/components/landing/WebsiteLanding";
import { getLandingPage } from "@/content/registry/landing-pages";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { buildPageMetadata } from "@/lib/metadata";

// A dedicated route keeps other campaign layouts and their CSS out of this page.
export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const page = getLandingPage("get-a-website", locale)!;
  return buildPageMetadata({
    locale,
    path: "/lp/get-a-website",
    title: page.metaTitle,
    description: page.metaDescription,
    noIndex: true,
    noFollow: true,
  });
}

export default async function GetAWebsitePage({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  return (
    <>
      <MetaPixelPreconnect />
      <WebsiteLanding page={getLandingPage("get-a-website", locale)!} />
    </>
  );
}

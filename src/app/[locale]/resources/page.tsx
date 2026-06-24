import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/routing";
import { resourcesContent } from "@/content/resources";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { buildPageMetadata, buildAbsoluteUrl } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import { getTranslations } from "next-intl/server";

const ResourcesPageClient = dynamic(
  () => import("@/components/pages/ResourcesPageClient")
);

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = getLocalizedContent(resourcesContent, locale);
  return buildPageMetadata({
    locale,
    path: "/resources",
    title: `${content.meta.heroTitle} ${content.meta.heroTitleHighlight} | KINEXIS Digital`,
    description: content.meta.heroSubtitle.replace("|", " "),
  });
}

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = getLocalizedContent(resourcesContent, locale);
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: tNav("home"), url: buildAbsoluteUrl(locale, "/") },
            { name: tNav("resources"), url: buildAbsoluteUrl(locale, "/resources") },
          ]),
        ]}
      />
      <ResourcesPageClient
        meta={content.meta}
        categories={content.categories}
        guides={content.guides}
        guidesTitle={content.guidesTitle}
        guidesSubtitle={content.guidesSubtitle}
        introLabel={content.introLabel}
        keyLabel={content.keyLabel}
        categoryNavLabel={content.categoryNavLabel}
        badgeLabels={content.badgeLabels}
        visitToolLabel={content.visitToolLabel}
      />
    </>
  );
}

import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import JsonLd from "@/components/seo/JsonLd";
import { solutionsHubContent } from "@/content/solutions-hub";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";

const SolutionsHubClient = dynamic(() => import("@/components/pages/SolutionsHubClient"));

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = solutionsHubContent[locale].meta;
  return buildPageMetadata({
    locale,
    path: "/solutions",
    ...meta,
  });
}

export default async function SolutionsIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = getLocalizedContent(solutionsHubContent, locale);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "Solutions" },
          ]),
        ]}
      />
      <SolutionsHubClient content={content} />
    </>
  );
}

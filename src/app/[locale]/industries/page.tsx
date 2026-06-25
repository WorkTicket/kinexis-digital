import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { industriesHubContent } from "@/content/industries/detail";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";

const IndustriesHubClient = dynamic(() => import("@/components/pages/IndustriesHubClient"));

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = industriesHubContent[locale];
  return buildPageMetadata({ locale, path: "/industries", title: c.meta.title, description: c.meta.description });
}

export default async function IndustriesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = getLocalizedContent(industriesHubContent, locale);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "Industries" },
          ]),
        ]}
      />
      <IndustriesHubClient content={content} />
    </>
  );
}

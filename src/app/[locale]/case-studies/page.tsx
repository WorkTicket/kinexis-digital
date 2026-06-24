import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import JsonLd from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/routing";
import { caseStudiesContent } from "@/content/case-studies";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { buildAbsoluteUrl } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

const CaseStudiesPageClient = dynamic(() => import("@/components/pages/CaseStudiesPageClient"));

type Props = { params: Promise<{ locale: Locale }> };

export default async function CaseStudiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = getLocalizedContent(caseStudiesContent, locale);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "Case Studies", url: buildAbsoluteUrl(locale, "/case-studies") },
          ]),
        ]}
      />
      <CaseStudiesPageClient content={content} />
    </>
  );
}

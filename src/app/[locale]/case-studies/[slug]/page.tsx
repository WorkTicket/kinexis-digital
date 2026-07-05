import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import CaseStudyDetailPageClient from "@/components/pages/CaseStudyDetailPageClient";
import type { Locale } from "@/i18n/routing";
import { getCaseStudyDetail, getCaseStudyStaticParams } from "@/content/case-study-details";
import { getCaseStudySlugMeta } from "@/content/case-study-slug-meta";
import { buildAbsoluteUrl, buildPageMetadata, normalizeMetaDescription } from "@/lib/metadata";
import { breadcrumbSchema, caseStudySchema, organizationSchema } from "@/lib/schema";

type Params = Promise<{ locale: Locale; slug: string }>;

export function generateStaticParams() {
  return getCaseStudyStaticParams();
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const cs = getCaseStudyDetail(locale, slug);
  if (!cs) return {};

  return buildPageMetadata({
    locale,
    path: `/case-studies/${slug}`,
    title: `${cs.title} Case Study | KINEXIS`,
    description: normalizeMetaDescription(cs.results),
  });
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const cs = getCaseStudyDetail(locale, slug);

  if (!cs) notFound();

  const meta = getCaseStudySlugMeta(slug);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          caseStudySchema({
            title: cs.title,
            description: normalizeMetaDescription(cs.results),
            url: buildAbsoluteUrl(locale, `/case-studies/${slug}`),
            industry: cs.industry,
            datePublished: cs.datePublished,
          }),
          breadcrumbSchema([
            { name: cs.breadcrumbs.home, url: buildAbsoluteUrl(locale, "/") },
            { name: cs.breadcrumbs.caseStudies, url: buildAbsoluteUrl(locale, "/case-studies") },
            { name: cs.title },
          ]),
        ]}
      />
      <CaseStudyDetailPageClient
        cs={cs}
        meta={meta}
        breadcrumbs={[
          { name: cs.breadcrumbs.home, url: "/" },
          { name: cs.breadcrumbs.caseStudies, url: "/case-studies" },
          { name: cs.title },
        ]}
      />
    </>
  );
}

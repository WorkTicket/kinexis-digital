import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import IndustryDetailClient from "@/components/pages/IndustryDetailClient";
import JsonLd from "@/components/seo/JsonLd";
import { buildIndustryDetailContent } from "@/content/industries/detail";
import {
  allIndustries,
  getCategoryById,
  getIndustryBySlug,
  type IndustryCategoryId,
} from "@/content/registry/industries";
import { routing, type Locale } from "@/i18n/routing";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, organizationSchema, serviceSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: Locale; categoryId: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    allIndustries.map((industry) => ({
      locale,
      categoryId: industry.categoryId,
      slug: industry.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  const content = buildIndustryDetailContent(industry, locale);
  return buildPageMetadata({
    locale,
    path: `/industries/${industry.categoryId}/${industry.slug}`,
    title: content.meta.title,
    description: content.meta.description,
  });
}

export default async function IndustryDetailPage({ params }: Props) {
  const { locale, categoryId, slug } = await params;
  setRequestLocale(locale);

  const industry = getIndustryBySlug(slug);
  if (!industry || industry.categoryId !== categoryId) notFound();

  const category = getCategoryById(categoryId as IndustryCategoryId);
  const content = buildIndustryDetailContent(industry, locale);
  const path = `/industries/${categoryId}/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          serviceSchema(
            `${industry.label} Marketing`,
            content.meta.description,
            buildAbsoluteUrl(locale, path)
          ),
          faqSchema(content.faqs),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "Industries", url: buildAbsoluteUrl(locale, "/industries") },
            { name: category?.label || categoryId, url: buildAbsoluteUrl(locale, `/industries/${categoryId}`) },
            { name: industry.label },
          ]),
        ]}
      />
      <IndustryDetailClient
        content={content}
        categoryLabel={category?.label || categoryId}
        industryLabel={industry.label}
        categoryId={categoryId}
        industrySlug={slug}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries" },
          { name: category?.label || categoryId, url: `/industries/${categoryId}` },
          { name: industry.label },
        ]}
      />
    </>
  );
}

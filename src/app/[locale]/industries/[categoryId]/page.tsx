import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import IndustryCard from "@/components/ui/IndustryCard";
import {
  getCategoryById,
  getIndustriesByCategory,
  industryCategories,
  type IndustryCategoryId,
} from "@/content/registry/industries";
import { routing, type Locale } from "@/i18n/routing";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: Locale; categoryId: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    industryCategories.map((cat) => ({ locale, categoryId: cat.id }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, categoryId } = await params;
  const category = getCategoryById(categoryId as IndustryCategoryId);
  if (!category) return {};
  return buildPageMetadata({
    locale,
    path: `/industries/${categoryId}`,
    title: `${category.label} Marketing | Industry Solutions | KINEXIS`,
    description: category.description,
  });
}

export default async function IndustryCategoryPage({ params }: Props) {
  const { locale, categoryId } = await params;
  setRequestLocale(locale);

  const category = getCategoryById(categoryId as IndustryCategoryId);
  if (!category) notFound();

  const industries = getIndustriesByCategory(category.id);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "Industries", url: buildAbsoluteUrl(locale, "/industries") },
            { name: category.label },
          ]),
        ]}
      />
      <HeroArchetype
        archetype="showcase"
        label={category.label}
        headline={
          <>
            <span className="type-hero-line">{category.label}</span>
            <span className="type-hero-line">marketing built for your vertical.</span>
          </>
        }
        subtitle={category.description}
        ctaLabel="Book a Strategy Call"
        ctaHref="/contact"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries" },
          { name: category.label },
        ]}
      />
      <section className="section-padding bg-bg-dark">
        <div className="container-site">
          <SectionHeader pattern="C" title={`${category.label} industries we serve`} />
          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <IndustryCard
                key={industry.slug}
                href={`/industries/${category.id}/${industry.slug}`}
                label={industry.label}
                description={industry.shortDescription}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

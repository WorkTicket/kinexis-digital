import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import SolutionPageClient from "@/components/pages/SolutionPageClient";
import StaticHeroShell from "@/components/ui/StaticHeroShell";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { solutions, getSolutionBySlug } from "@/content/registry/solutions";
import { uiChrome } from "@/content/ui-chrome";
import { routing, type Locale } from "@/i18n/routing";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, organizationSchema, serviceSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    solutions.map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};
  return buildPageMetadata({
    locale,
    path: `/solutions/${slug}`,
    title: `${solution.title} | KINEXIS`,
    description: solution.metaDescription,
  });
}

export default async function SolutionPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  const path = `/solutions/${slug}`;
  const chrome = uiChrome[locale];
  const homeLabel = locale === "es" ? "Inicio" : "Home";
  const solutionsLabel = locale === "es" ? "Soluciones" : "Solutions";

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          serviceSchema(solution.title, solution.metaDescription, buildAbsoluteUrl(locale, path)),
          faqSchema(solution.faqs),
          breadcrumbSchema([
            { name: homeLabel, url: buildAbsoluteUrl(locale, "/") },
            { name: solutionsLabel, url: buildAbsoluteUrl(locale, "/solutions") },
            { name: solution.title },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: homeLabel, url: "/" },
          { name: solutionsLabel, url: "/solutions" },
          { name: solution.title },
        ]}
      />
      <StaticHeroShell
        variant="showcase"
        label={solution.title}
        line1={solution.headlineLine1}
        line2={solution.headlineLine2}
        subtitle={solution.challenge}
        ctaLabel={chrome.solution.ctaLabel}
        ctaHref="/contact"
      />
      <SolutionPageClient solution={solution} />
    </>
  );
}

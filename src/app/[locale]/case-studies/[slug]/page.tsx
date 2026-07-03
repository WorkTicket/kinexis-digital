import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import CTAArchetype from "@/components/ui/CTAArchetype";
import HeroArchetype from "@/components/ui/HeroArchetype";
import JsonLd from "@/components/seo/JsonLd";
import CaseStudyResultsMetrics from "@/components/case-studies/CaseStudyResultsMetrics";
import type { Locale } from "@/i18n/routing";
import { getCaseStudyDetail, getCaseStudyStaticParams } from "@/content/case-study-details";
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

  return (
    <article>
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
      <HeroArchetype
        archetype="article"
        label={cs.industry}
        headline={
          <>
            <span className="block type-section type-section--center gradient-text mb-4">{cs.headline}</span>
            {cs.title}
          </>
        }
        subtitle={cs.client}
        ctaLabel={cs.heroCtaLabel}
        ctaHref="/contact"
        breadcrumbs={[
          { name: cs.breadcrumbs.home, url: "/" },
          { name: cs.breadcrumbs.caseStudies, url: "/case-studies" },
          { name: cs.title },
        ]}
      />

      <AnimatedWrapper className="section-padding">
        <div className="container-site">
          <div className="mx-auto max-w-4xl">
            <CaseStudyResultsMetrics results={cs.resultsList} />
          </div>

          <div className="mx-auto mt-20 max-w-3xl space-y-20">
            <AnimatedWrapper>
              <h2 className="text-2xl font-bold">
                <span className="text-accent">{cs.challengeHeading}</span>
              </h2>
              <div className="mt-3 h-px w-10 bg-accent/30" />
              <p className="mt-5 leading-relaxed text-text-secondary">{cs.challenge}</p>
            </AnimatedWrapper>

            <AnimatedWrapper>
              <h2 className="text-2xl font-bold">
                <span className="text-accent">{cs.solutionHeading}</span>
              </h2>
              <div className="mt-3 h-px w-10 bg-accent/30" />
              <p className="mt-5 leading-relaxed text-text-secondary">{cs.solution}</p>
            </AnimatedWrapper>

            <AnimatedWrapper>
              <div className="rounded-2xl border border-white/[0.06] p-8">
                <h2 className="text-2xl font-bold">
                  <span className="text-accent">{cs.resultsHeading}</span>
                </h2>
                <div className="mt-3 h-px w-10 bg-accent/30" />
                <p className="mt-5 leading-relaxed text-text-secondary">{cs.results}</p>
              </div>
            </AnimatedWrapper>
          </div>
        </div>
      </AnimatedWrapper>

      <CTAArchetype
        headline={cs.ctaHeadline}
        subtitle={cs.ctaSubtitle}
        ctaLabel={cs.ctaLabel}
        ctaHref="/contact"
      />
    </article>
  );
}

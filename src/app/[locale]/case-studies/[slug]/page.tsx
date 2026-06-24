import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ProofMetric from "@/components/ui/ProofMetric";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import CTAArchetype from "@/components/ui/CTAArchetype";
import HeroArchetype from "@/components/ui/HeroArchetype";
import JsonLd from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/routing";
import { getCaseStudyDetail, getCaseStudyStaticParams } from "@/content/case-study-details";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
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
    title: `${cs.title} Case Study | ${cs.headline} | KINEXIS Digital`,
    description: cs.results.slice(0, 155),
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
            description: cs.results.slice(0, 155),
            url: buildAbsoluteUrl(locale, `/case-studies/${slug}`),
            industry: cs.industry,
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
          <div className="mx-auto max-w-3xl space-y-20">
            <div className="grid gap-grid-sm sm:grid-cols-2 lg:grid-cols-4">
              {cs.resultsList.map((r) => (
                <div key={r.label} className="proof-metric-card">
                  <ProofMetric
                    value={
                      <AnimatedCounter
                        from={r.before}
                        to={r.after}
                        prefix={r.prefix}
                        suffix={r.suffix}
                        decimals={r.decimals}
                      />
                    }
                    label={r.label}
                    description={
                      <span className="inline-flex items-center justify-center gap-1.5">
                        <span>{r.prefix}{r.before}{r.suffix}</span>
                        <span className="text-accent">&rarr;</span>
                        <span className="text-white font-semibold">{r.prefix}{r.after}{r.suffix}</span>
                      </span>
                    }
                  />
                </div>
              ))}
            </div>

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

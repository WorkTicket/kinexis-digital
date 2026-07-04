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

      {/* Hero */}
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

      {/* Metrics Dashboard */}
      <section className="section-padding border-t border-white/[0.06]">
        <div className="container-site">
          <div className="mx-auto max-w-4xl">
            <CaseStudyResultsMetrics results={cs.resultsList} />
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="section-padding border-t border-white/[0.06] bg-bg-dark">
        <div className="container-site">
          <div className="mx-auto max-w-4xl space-y-20">

            {/* The Challenge */}
            <AnimatedWrapper>
              <h2 className="text-2xl font-bold">
                <span className="text-accent">{cs.challengeHeading}</span>
              </h2>
              <div className="mt-3 h-px w-10 bg-accent/30" />
              <p className="mt-5 leading-relaxed text-text-secondary">{cs.challenge}</p>
            </AnimatedWrapper>

            {/* Before We Started */}
            {cs.problems.length > 0 && (
              <AnimatedWrapper>
                <h2 className="text-2xl font-bold">
                  <span className="text-accent">{cs.beforeHeading}</span>
                </h2>
                <div className="mt-3 h-px w-10 bg-accent/30" />
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  {cs.problems.map((group) => (
                    <div key={group.category} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-neon-cyan">{group.category}</span>
                      <ul className="mt-4 space-y-3">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-cyan/40" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </AnimatedWrapper>
            )}

            {/* Growth Strategy */}
            {cs.strategyPhases.length > 0 && (
              <AnimatedWrapper>
                <h2 className="text-2xl font-bold">
                  <span className="text-accent">{cs.strategyHeading}</span>
                </h2>
                <div className="mt-3 h-px w-10 bg-accent/30" />
                <div className="mt-8 space-y-6">
                  {cs.strategyPhases.map((phase, i) => (
                    <div key={phase.objective} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8">
                      <div className="flex items-start gap-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neon-cyan/10 text-sm font-bold text-neon-cyan">
                          {i + 1}
                        </span>
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">{phase.objective}</h3>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <span className="text-xs font-semibold uppercase tracking-wider text-muted">{cs.actionsLabel}</span>
                              <p className="mt-1 text-sm text-text-secondary">{phase.actions}</p>
                            </div>
                            <div>
                              <span className="text-xs font-semibold uppercase tracking-wider text-neon-cyan">{cs.outcomeLabel}</span>
                              <p className="mt-1 text-sm text-white/90">{phase.outcome}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedWrapper>
            )}

            {/* The Solution (narrative) */}
            <AnimatedWrapper>
              <h2 className="text-2xl font-bold">
                <span className="text-accent">{cs.solutionHeading}</span>
              </h2>
              <div className="mt-3 h-px w-10 bg-accent/30" />
              <p className="mt-5 leading-relaxed text-text-secondary">{cs.solution}</p>
            </AnimatedWrapper>

          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding border-t border-white/[0.06]">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <AnimatedWrapper>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10">
                <h2 className="text-2xl font-bold">
                  <span className="text-accent">{cs.resultsHeading}</span>
                </h2>
                <div className="mt-3 h-px w-10 bg-accent/30" />
                <p className="mt-5 leading-relaxed text-text-secondary">{cs.results}</p>
              </div>
            </AnimatedWrapper>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      {cs.techStack.length > 0 && (
        <section className="section-padding border-t border-white/[0.06] bg-bg-dark">
          <div className="container-site">
            <div className="mx-auto max-w-3xl">
              <AnimatedWrapper>
                <h2 className="text-2xl font-bold">
                  <span className="text-accent">{cs.techStackHeading}</span>
                </h2>
                <div className="mt-3 h-px w-10 bg-accent/30" />
                <div className="mt-6 flex flex-wrap gap-2">
                  {cs.techStack.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm text-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              </AnimatedWrapper>
            </div>
          </div>
        </section>
      )}

      <CTAArchetype
        headline={cs.ctaHeadline}
        subtitle={cs.ctaSubtitle}
        ctaLabel={cs.ctaLabel}
        ctaHref="/contact"
      />
    </article>
  );
}

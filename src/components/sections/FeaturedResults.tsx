import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/shared/services/Section";
import { cardClasses } from "@/lib/card-styles";
import OutcomeComparison from "@/components/ui/DataViz/OutcomeComparison";

const caseStudyMeta = [
  {
    key: "landscaping" as const,
    before: 10,
    after: 48,
    unit: "leads/mo",
    multiplierLabel: "4.8X",
    duration: "10 months",
    slug: "landscaping-company-growth",
  },
  {
    key: "plumbing" as const,
    before: 22,
    after: 94,
    unit: "calls/mo",
    multiplierLabel: "327%",
    duration: "8 months",
    slug: "plumbing-company-growth",
  },
  {
    key: "saas" as const,
    before: 32,
    after: 189,
    unit: "demos/mo",
    multiplierLabel: "5.9X",
    duration: "8 months",
    slug: "saas-platform-growth",
  },
];

type Props = { surfaceIndex?: number };

export default function FeaturedResults({ surfaceIndex = 0 }: Props) {
  const t = useTranslations("featuredResults");
  const tCommon = useTranslations("common");

  const caseStudies = caseStudyMeta.map((meta) => ({
    ...meta,
    category: t(`cases.${meta.key}.category`),
    title: t(`cases.${meta.key}.title`),
    headline: t(`cases.${meta.key}.headline`),
    summary: t(`cases.${meta.key}.summary`),
  }));

  return (
    <Section id="featured-results" surfaceIndex={surfaceIndex}>
      <div className="container-site">
        <SectionHeader
          badge={t("label")}
          title={t("title")}
          description={t("subtitle")}
          headingId="featured-results-heading"
        />

        <Reveal stagger className="section-content space-y-grid-lg">
          {caseStudies.map((cs, i) => (
            <article
              key={cs.slug}
              className="relative"
            >
              <div
                className={cn(
                  "grid items-center gap-grid-lg lg:grid-cols-2",
                  i % 2 === 1 && "lg:[&>*:first-child]:order-2"
                )}
              >
                <div className={cn(i % 2 === 1 ? "lg:pl-8" : "lg:pr-8")}>
                  <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-neon-cyan">
                    {cs.category}
                  </span>
                  <h3 className="type-section mt-6 gradient-text">{cs.headline}</h3>
                  <p className="type-subheader mt-3 text-white/80">{cs.title}</p>
                  <p className="type-body mt-6 section-intro section-intro--left">{cs.summary}</p>
                  <div className="after-copy-cta">
                    <Button
                      href={`/case-studies/${cs.slug}`}
                      variant="secondary"
                    >
                      {tCommon("viewCaseStudy")}
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className={cardClasses({ hover: false, className: "!bg-bg-dark" })}>
                    <div className="flex items-baseline justify-between mb-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                        {tCommon("outcomeComparison")}
                      </span>
                      <span className="text-xs text-muted/50">{cs.unit}</span>
                    </div>
                    <OutcomeComparison
                      before={cs.before}
                      after={cs.after}
                      unit={cs.unit}
                      multiplierLabel={cs.multiplierLabel}
                      duration={cs.duration}
                    />
                  </div>

                  <div
                    className={cn(
                      "absolute -z-10 w-48 h-48 rounded-full bg-neon-cyan/5 blur-[80px]",
                      i % 2 === 0 ? "-right-8 -bottom-8" : "-left-8 -top-8"
                    )}
                  />
                </div>
              </div>
            </article>
          ))}
        </Reveal>

        <div className="section-cta-row">
          <Button
            href="/case-studies"
            variant="secondary"
          >
            {tCommon("viewAllCaseStudies")}
          </Button>
        </div>
      </div>
    </Section>
  );
}

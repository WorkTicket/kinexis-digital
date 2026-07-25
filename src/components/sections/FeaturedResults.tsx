"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/shared/services/Section";
import { cardClasses } from "@/lib/card-styles";
import OutcomeComparison from "@/components/ui/DataViz/OutcomeComparison";
import { getHomepageCaseStudies } from "@/content/case-studies";
import type { Locale } from "@/i18n/routing";

const PRIMARY_UNIT: Record<string, { en: string; es: string }> = {
  "landscaping-company-growth": { en: "leads/mo", es: "leads/mes" },
  "plumbing-company-growth": { en: "calls/mo", es: "llamadas/mes" },
  "saas-platform-growth": { en: "orders/mo", es: "pedidos/mes" },
};

const VISIT_LABEL: Record<Locale, string> = {
  en: "Visit Live Site",
  es: "Visitar Sitio en Vivo",
};

type Props = { surfaceIndex?: number };

export default function FeaturedResults({ surfaceIndex = 0 }: Props) {
  const t = useTranslations("featuredResults");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const studies = getHomepageCaseStudies(locale);

  const caseStudies = studies.map((study) => {
    const primary = study.metrics[0];
    return {
      slug: study.slug,
      category: study.industry,
      client: study.client,
      title: study.title,
      headline: study.headline,
      summary: study.summary,
      liveUrl: study.liveUrl,
      screenshotCard: study.screenshotCard,
      before: primary.from,
      after: primary.to,
      unit: PRIMARY_UNIT[study.slug]?.[locale] ?? "mo",
      multiplierLabel: study.primaryLift,
      duration: study.timeline,
    };
  });

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
            <article key={cs.slug} className="relative">
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
                  <p className="type-subheader mt-3 text-white/80">{cs.client}</p>
                  <p className="type-body mt-6 section-intro section-intro--left">{cs.summary}</p>
                  <div className="after-copy-cta flex flex-wrap items-center gap-4">
                    <Button href={`/case-studies/${cs.slug}`} variant="secondary">
                      {tCommon("viewCaseStudy")}
                    </Button>
                    <a
                      href={cs.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-neon-cyan"
                    >
                      {VISIT_LABEL[locale]}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                <div className="relative space-y-4">
                  <a
                    href={cs.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden rounded-2xl border border-surface bg-bg-dark"
                  >
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={cs.screenshotCard}
                        alt={`${cs.client} website`}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 560px"
                      />
                    </div>
                  </a>

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
          <Button href="/case-studies" variant="secondary">
            {tCommon("viewAllCaseStudies")}
          </Button>
        </div>
      </div>
    </Section>
  );
}

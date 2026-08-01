"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import Section from "@/components/shared/services/Section";
import { Link } from "@/i18n/navigation";
import { getHomepageCaseStudies } from "@/content/case-studies";
import { featureCardGridClass } from "@/lib/card-styles";
import type { Locale } from "@/i18n/routing";

const PRIMARY_UNIT: Record<string, { en: string; es: string }> = {
  "landscaping-company-growth": { en: "leads/mo", es: "leads/mes" },
  "plumbing-company-growth": { en: "calls/mo", es: "llamadas/mes" },
  "saas-platform-growth": { en: "orders/mo", es: "pedidos/mes" },
};

const BEFORE_LABEL: Record<Locale, string> = { en: "Before", es: "Antes" };
const AFTER_LABEL: Record<Locale, string> = { en: "After", es: "Después" };

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
      headline: study.headline,
      summary: study.summary,
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
          align="center"
        />

        <ul className={`section-content ${featureCardGridClass(3)}`}>
          {caseStudies.map((cs) => (
            <li key={cs.slug}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-surface bg-surface-raised">
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="group relative block overflow-hidden border-b border-surface"
                >
                  <div className="relative aspect-[16/10] w-full bg-bg-dark">
                    <Image
                      src={cs.screenshotCard}
                      alt={`${cs.client} website`}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                    {cs.category}
                    <span className="text-white/20"> · </span>
                    {cs.duration}
                  </p>

                  <p className="mt-4 type-metric text-3xl font-bold tracking-tight">
                    <span className="gradient-text">{cs.multiplierLabel}</span>
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      className="transition-colors hover:text-neon-cyan"
                    >
                      {cs.headline}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm font-medium text-white/50">{cs.client}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{cs.summary}</p>

                  <dl className="mt-6 flex gap-6 border-t border-surface pt-5">
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
                        {BEFORE_LABEL[locale]}
                      </dt>
                      <dd className="mt-1 text-base font-semibold tabular-nums text-white/45">
                        {cs.before}
                        <span className="ml-1 text-xs font-medium text-white/30">{cs.unit}</span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neon-cyan/60">
                        {AFTER_LABEL[locale]}
                      </dt>
                      <dd className="mt-1 text-base font-semibold tabular-nums text-white">
                        {cs.after}
                        <span className="ml-1 text-xs font-medium text-white/35">{cs.unit}</span>
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6">
                    <Button href={`/case-studies/${cs.slug}`} variant="secondary" fullWidthMobile>
                      {tCommon("viewCaseStudy")}
                    </Button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="section-cta-row">
          <Button href="/case-studies" variant="secondary">
            {tCommon("viewAllCaseStudies")}
          </Button>
        </div>
      </div>
    </Section>
  );
}

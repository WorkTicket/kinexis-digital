"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import TwoLineText from "@/components/ui/TwoLineText";
import { m as motion } from "@/lib/framer";
import { useMotionVariants } from "@/hooks/useMotionVariants";
const OutcomeComparison = dynamic(() => import("@/components/ui/DataViz/OutcomeComparison"));

const caseStudyMeta = [
  {
    key: "landscaping" as const,
    before: 2,
    after: 11.5,
    unit: "$K/mo",
    multiplierLabel: "5.8X",
    duration: "8 months",
    slug: "landscaping-company-growth",
  },
  {
    key: "dental" as const,
    before: 45,
    after: 198,
    unit: "patients/mo",
    multiplierLabel: "340%",
    duration: "7 months",
    slug: "dental-practice-local-seo",
  },
  {
    key: "ecommerce" as const,
    before: 12,
    after: 45,
    unit: "$K/mo",
    multiplierLabel: "3.8X",
    duration: "7 months",
    slug: "premium-ecommerce-brand",
  },
];

export default function FeaturedResults() {
  const t = useTranslations("featuredResults");
  const tCommon = useTranslations("common");
  const { fadeUp } = useMotionVariants();

  const caseStudies = useMemo(
    () =>
      caseStudyMeta.map((meta) => ({
        ...meta,
        category: t(`cases.${meta.key}.category`),
        title: t(`cases.${meta.key}.title`),
        headline: t(`cases.${meta.key}.headline`),
        summary: t(`cases.${meta.key}.summary`),
      })),
    [t]
  );

  return (
    <section className="section-padding border-t border-white/[0.06]">
      <div className="container-site">
        <div className="section-header">
          <span className="section-label">{t("label")}</span>
          <h2 className="section-title"><TwoLineText text={t("title")} variant="section" /></h2>
          <p className="section-subtitle"><TwoLineText text={t("subtitle")} variant="body" /></p>
        </div>

        <div className="section-content space-y-grid-lg">
          {caseStudies.map((cs, i) => (
            <motion.article
              key={cs.slug}
              className="relative"
              initial={fadeUp.hidden}
              whileInView={fadeUp.visible}
              viewport={{ once: true, margin: "-100px" }}
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
                  <div className="rounded-2xl border border-white/[0.06] bg-bg-dark card-pad">
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
            </motion.article>
          ))}
        </div>

        <div className="section-cta-row">
          <Button
            href="/case-studies"
            variant="secondary"
          >
            {tCommon("viewAllCaseStudies")}
          </Button>
        </div>
      </div>
    </section>
  );
}

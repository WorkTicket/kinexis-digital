"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Section from "@/components/shared/services/Section";
import { getHomepageCaseStudies, caseStudiesContent } from "@/content/case-studies";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Props = { surfaceIndex?: number };

export default function ProofStrip({ surfaceIndex = 0 }: Props) {
  const t = useTranslations("proofStrip");
  const locale = useLocale() as Locale;
  const studies = getHomepageCaseStudies(locale).slice(0, 3);
  const avgTraffic = caseStudiesContent[locale].metricWall.find((m) =>
    /traffic|tráfico/i.test(m.label),
  );

  const items = [
    ...studies.map((study) => ({
      value: study.primaryLift,
      label: study.headline,
      meta: study.client,
      href: `/case-studies/${study.slug}` as const,
    })),
    ...(avgTraffic
      ? [
          {
            value: avgTraffic.value,
            label: avgTraffic.label,
            meta: t("aggregateMeta"),
            href: "/case-studies" as const,
          },
        ]
      : []),
  ];

  return (
    <Section id="proof" surfaceIndex={surfaceIndex} compact className="border-y border-surface">
      <div className="container-site">
        <h2 id="proof-heading" className="sr-only">
          {t("credibility")}
        </h2>

        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-[0.9375rem]">
            {t("credibility")}
          </p>
          <Link
            href="/case-studies"
            className="shrink-0 text-sm font-medium text-neon-cyan/80 transition-colors hover:text-neon-cyan"
          >
            {t("viewAll")}
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-8 border-t border-surface pt-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/[0.08]">
          {items.map((item, index) => (
            <li key={`${item.value}-${index}`}>
              <Link
                href={item.href}
                className={cn(
                  "group flex h-full flex-col gap-2 lg:px-8",
                  index === 0 && "lg:pl-0",
                  index === items.length - 1 && "lg:pr-0",
                )}
              >
                <span className="type-metric text-3xl font-bold tracking-tight sm:text-4xl">
                  <span className="gradient-text">{item.value}</span>
                </span>
                <span className="text-sm font-medium leading-snug text-white/85 transition-colors group-hover:text-white">
                  {item.label}
                </span>
                <span className="text-xs text-muted">{item.meta}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

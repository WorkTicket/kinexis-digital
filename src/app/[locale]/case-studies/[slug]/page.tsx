import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CaseStudyHero } from "@/components/page/CaseStudyHero";
import { PageCTA } from "@/components/page/PageCTA";
import JsonLd from "@/components/seo/JsonLd";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  getAllCaseStudySlugs,
  getCaseStudyPages,
} from "@/content/case-studies";
import { caseStudyHref } from "@/content/home-results";
import { resolveLocale } from "@/i18n/locale";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { duration } from "@/lib/motion";
import {
  breadcrumbSchema,
  caseStudySchema,
  organizationSchema,
} from "@/lib/schema";
import { getPathLastModified } from "@/lib/sitemap-last-modified";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const study = getCaseStudyPages(locale).find((s) => s.slug === slug);
  if (!study) return {};
  return buildPageMetadata({
    locale,
    path: `/case-studies/${slug}`,
    title: study.metaTitle,
    description: study.metaDescription,
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const study = getCaseStudyPages(locale).find((s) => s.slug === slug);
  if (!study) notFound();

  const t = await getTranslations("common");
  const tWork = await getTranslations("pages.work");
  const tNav = await getTranslations("nav");
  const others = getCaseStudyPages(locale).filter((c) => c.slug !== study.slug);

  const metricFills = ["88%", "76%", "64%", "92%"];

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={[
          organizationSchema(),
          caseStudySchema({
            title: study.metaTitle,
            description: study.metaDescription,
            url: buildAbsoluteUrl(locale, `/case-studies/${slug}`),
            industry: study.industry,
            datePublished: getPathLastModified(`/case-studies/${slug}`)
              .toISOString()
              .slice(0, 10),
          }),
          breadcrumbSchema([
            { name: tNav("home"), url: buildAbsoluteUrl(locale, "/") },
            { name: tNav("work"), url: buildAbsoluteUrl(locale, "/case-studies") },
            {
              name: study.client,
              url: buildAbsoluteUrl(locale, `/case-studies/${slug}`),
            },
          ]),
        ]}
      />
      <CaseStudyHero study={study} />

      <section className="chapter chapter--studio relative">
        <div className="shell relative py-24 md:py-32 lg:py-40">
          <RevealGroup
            as="ul"
            className="case-metric-grid"
            aria-label={t("results")}
            stagger={duration.staggerTight}
          >
            {study.metrics.map((metric, i) => (
              <RevealItem key={metric.label} as="li" variant="fadeUp">
                <div className="case-metric case-metric--visual">
                  <p className="case-metric__label">{metric.label}</p>
                  <p className="case-metric__value">
                    {metric.after}
                    {metric.before !== "Baseline" && metric.before !== "Base" ? (
                      <span className="ml-2 text-[0.55em] font-semibold tracking-normal text-muted">
                        {t("from")} {metric.before}
                      </span>
                    ) : null}
                  </p>
                  <p className="case-metric__note">{metric.note}</p>
                  <div className="case-metric__bar" aria-hidden>
                    <i style={{ width: metricFills[i % metricFills.length] }} />
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="page-prose mt-16 sm:mt-20 md:mt-28">
            <Reveal
              variant="fadeUp"
              className="page-prose__block page-prose__block--split"
            >
              <h2 className="page-prose__heading">{study.challengeTitle}</h2>
              <p className="page-prose__body">{study.challenge}</p>
            </Reveal>

            <Reveal
              variant="fadeUp"
              className="page-prose__block page-prose__block--split"
            >
              <h2 className="page-prose__heading">{study.approachTitle}</h2>
              <p className="page-prose__body">{study.approach}</p>
            </Reveal>

            <div>
              <Reveal variant="rise" when="chapter">
                <h2 className="page-prose__heading mb-8 md:mb-10">{t("theWork")}</h2>
              </Reveal>
              <RevealGroup
                as="ul"
                className="scope-grid"
                stagger={duration.staggerTight}
              >
                {study.work.map((item) => (
                  <RevealItem key={item.title} as="li" variant="fadeUp">
                    <div className="scope-item">
                      <h3 className="scope-item__title">{item.title}</h3>
                      <p className="scope-item__copy">{item.description}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <Reveal
              variant="fadeUp"
              className="page-prose__block page-prose__block--split"
            >
              <h2 className="page-prose__heading">{t("whatMoved")}</h2>
              <div>
                <p className="page-prose__body">{study.resultsCopy}</p>
                <ul className="cap-chips" aria-label={t("servicesUsed")}>
                  {study.servicesUsed.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {study.nextCopy ? (
              <Reveal
                variant="fadeUp"
                className="page-prose__block page-prose__block--split"
              >
                <h2 className="page-prose__heading">{study.nextTitle}</h2>
                <p className="page-prose__body">{study.nextCopy}</p>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      {others.length > 0 ? (
        <section className="chapter chapter--void relative">
          <div className="shell relative py-16 sm:py-24 md:py-32">
            <Reveal variant="rise" when="chapter">
              <p className="section-eyebrow">{t("moreWork")}</p>
              <h2 className="mt-4 max-w-xl font-[family-name:var(--font-display)] text-[clamp(1.85rem,4vw,3rem)] font-bold tracking-[-0.04em] leading-[1.05]">
                {t("keepReading")}
              </h2>
            </Reveal>
            <ul className="related-list mt-10">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={caseStudyHref(other.slug)}
                    className="related-row group"
                  >
                    <span className="related-row__title">{other.client}</span>
                    <span className="related-row__dek">
                      {other.primaryLift} {other.headline}
                    </span>
                    <span aria-hidden className="related-row__arrow">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <PageCTA
        title={tWork("ctaTitle")}
        copy={tWork("ctaCopy")}
      />
    </main>
  );
}

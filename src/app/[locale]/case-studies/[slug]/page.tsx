import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound, permanentRedirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CaseStudyHero } from "@/components/page/CaseStudyHero";
import { PageCTA } from "@/components/page/PageCTA";
import { ChapterLead } from "@/components/ui/ChapterLead";
import JsonLd from "@/components/seo/JsonLd";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  getAllCaseStudySlugs,
  getCaseStudyPages,
} from "@/content/case-studies";
import { caseStudyHref, getHomeResults } from "@/content/home-results";
import { resolveLocale } from "@/i18n/locale";
import { matchUnprefixedLegacyRedirect } from "@/lib/legacy-redirects.mjs";
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
  const retired = matchUnprefixedLegacyRedirect(`/case-studies/${slug}`);
  if (retired) permanentRedirect(retired);
  const study = getCaseStudyPages(locale).find((s) => s.slug === slug);
  if (!study) notFound();

  const t = await getTranslations("common");
  const tWork = await getTranslations("pages.work");
  const tNav = await getTranslations("nav");
  const roster = getHomeResults(locale);
  const result = roster.find((item) => item.slug === study.slug);
  const execution = study.work[1];
  const others = getCaseStudyPages(locale)
    .filter((item) => item.slug !== study.slug)
    .map((item) => ({
      slug: item.slug,
      href: caseStudyHref(item.slug),
      client: item.client,
      lift: item.primaryLift.replace(/X/g, "×"),
      headline:
        roster.find((entry) => entry.slug === item.slug)?.headline ??
        item.headline,
    }));

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
      <CaseStudyHero
        study={study}
        headline={result?.headline}
        homeLabel={tNav("home")}
        workLabel={tNav("work")}
        eyebrow={tWork("caseEyebrow")}
      />

      <section className="chapter chapter--void relative">
        <div className="shell chapter-shell--monument relative">
          <RevealGroup
            as="ul"
            className="case-metric-grid"
            aria-label={t("results")}
            stagger={duration.staggerTight}
          >
            {study.metrics.map((metric) => (
              <RevealItem key={metric.label} as="li" variant="fadeUp">
                <div className="case-metric">
                  <p className="case-metric__label">{metric.label}</p>
                  <p className="case-metric__value">{metric.after}</p>
                  {metric.before !== "Baseline" && metric.before !== "Base" ? (
                    <p className="case-metric__note">
                      {t("from")} {metric.before}
                    </p>
                  ) : null}
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

            {execution ? (
              <Reveal
                variant="fadeUp"
                className="page-prose__block page-prose__block--split"
              >
                <h2 className="page-prose__heading">{execution.title}.</h2>
                <p className="page-prose__body">{execution.description}</p>
              </Reveal>
            ) : null}

            <Reveal
              variant="fadeUp"
              className="page-prose__block page-prose__block--split"
            >
              <h2 className="page-prose__heading">{t("whatMoved")}</h2>
              <div>
                <p className="page-prose__body">{study.resultsCopy}</p>
                <ul className="cap-chips" aria-label={t("servicesUsed")}>
                  {study.servicesUsed.map((service) => (
                    <li key={service} className="cap-chips__item">
                      {service}
                    </li>
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
          <div className="shell chapter-shell--standard relative">
            <Reveal variant="rise" when="chapter">
              <ChapterLead
                eyebrow={t("moreWork")}
                title={t("keepReading")}
                headingClassName="max-w-[16ch]"
              />
            </Reveal>
            <ul className="related-list">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link href={other.href} className="related-row group">
                    <span className="related-row__title">{other.client}</span>
                    <span className="related-row__proof">
                      <span className="related-row__lift">{other.lift}</span>
                      <span className="related-row__dek">{other.headline}</span>
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

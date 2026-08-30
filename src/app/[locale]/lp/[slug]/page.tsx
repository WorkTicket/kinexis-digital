import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingIntake } from "@/components/landing/LandingIntake";
import { LandingProcess } from "@/components/landing/LandingProcess";
import { LandingSpotlight } from "@/components/landing/LandingSpotlight";
import { LandingStickyCta } from "@/components/landing/LandingStickyCta";
import { LandingWorkSamples } from "@/components/landing/LandingWorkSamples";
import { FaqAccordion } from "@/components/page/FaqAccordion";
import { PageCTA } from "@/components/page/PageCTA";
import { PageHero } from "@/components/page/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  getLandingPage,
  landingPageSlugs,
} from "@/content/registry/landing-pages";
import { resolveLocale } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { buildPageMetadata } from "@/lib/metadata";
import { duration } from "@/lib/motion";
import { faqSchema } from "@/lib/schema";
import "@/styles/components/landing.css";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return landingPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) {
    return buildPageMetadata({
      locale,
      path: `/lp/${slug}`,
      title: "Landing page",
      description: "KINEXIS Digital paid campaign landing page.",
      noIndex: true,
      noFollow: true,
    });
  }

  return buildPageMetadata({
    locale,
    path: `/lp/${page.slug}`,
    title: page.metaTitle,
    description: page.metaDescription,
    noIndex: true,
    noFollow: true,
  });
}

function CheckIcon() {
  return (
    <svg
      className="svc-offer__check"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path
        d="M4.2 10.4 8 14.1 15.8 5.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function LandingPage({ params }: Props) {
  await resolveLocale(params);
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  const scopeItems = page.scopeItems;
  const hasWork = Boolean(page.samples?.length && page.samplesTitle);
  const heroIntake = Boolean(page.heroIntake);

  return (
    <main className="flex flex-1 flex-col pb-24 md:pb-0">
      <JsonLd data={faqSchema(page.faqs)} />
      <PageHero
        eyebrow={page.badge}
        title={page.headline}
        signal={page.headlineAccent}
        copy={page.subheadline}
        compact={!heroIntake}
        intake={heroIntake}
        hideActions={heroIntake}
        className={heroIntake ? "page-hero--lp-intake" : undefined}
        visual={
          heroIntake ? <LandingIntake page={page} embedded /> : undefined
        }
        primaryHref="#lp-form"
        primaryLabel={page.stickyCtaLabel}
        secondaryHref={!heroIntake && hasWork ? "#work" : undefined}
        secondaryLabel={!heroIntake && hasWork ? "See the work" : undefined}
        meta={
          page.heroMeta?.length || page.serviceArea?.length ? (
            <div className="lp-hero-meta">
              {page.heroMeta?.length ? (
                <ul className="page-hero__meta-list">
                  {page.heroMeta.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {page.serviceArea?.length ? (
                <p className="lp-service-area">{page.serviceArea.join(" · ")}</p>
              ) : null}
            </div>
          ) : undefined
        }
      />

      {heroIntake ? null : <LandingIntake page={page} />}

      {page.spotlight ? <LandingSpotlight {...page.spotlight} /> : null}

      {hasWork && page.samples && page.samplesTitle && page.samplesIntro ? (
        <LandingWorkSamples
          title={page.samplesTitle}
          intro={page.samplesIntro}
          samples={page.samples}
          proof={page.proof}
        />
      ) : (
        <section
          aria-labelledby="lp-proof-heading"
          className="chapter chapter--void relative"
        >
          <div className="shell chapter-shell--monument relative">
            <Reveal variant="rise" when="chapter">
              <ChapterLead
                layout="split"
                eyebrow="Proof"
                headingId="lp-proof-heading"
                title={page.proofTitle ?? "The work, in numbers."}
                dek={page.proofIntro}
              />
            </Reveal>
            <RevealGroup
              as="ul"
              className={cn(
                "results-metric-rail",
                page.proof.length >= 4 && "results-metric-rail--quad",
              )}
              stagger={duration.staggerTight}
              delayChildren={0.08}
            >
              {page.proof.map((item) => (
                <RevealItem key={item.label} as="li" variant="fadeUp">
                  <div className="results-metric-rail__item">
                    <p className="results-metric-rail__lift">{item.metric}</p>
                    <p className="results-metric-rail__label">{item.label}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <section
        aria-labelledby="lp-scope-heading"
        className="chapter chapter--studio relative"
      >
        <div className="shell chapter-shell--tight relative">
          <Reveal variant="rise" when="chapter">
            <ChapterLead
              layout="split"
              eyebrow="Scope"
              headingId="lp-scope-heading"
              title={page.bulletsTitle}
            />
          </Reveal>
          <RevealGroup
            as="ul"
            className="svc-offer__included mt-10 max-w-3xl"
            stagger={duration.staggerTight}
            delayChildren={0.06}
          >
            {scopeItems?.length
              ? scopeItems.map((item) => (
                  <RevealItem as="li" key={item.title} variant="fadeUp">
                    <CheckIcon />
                    <span>
                      <strong>{item.title}.</strong> {item.description}
                    </span>
                  </RevealItem>
                ))
              : page.bullets.map((bullet) => (
                  <RevealItem as="li" key={bullet} variant="fadeUp">
                    <CheckIcon />
                    <span>{bullet}</span>
                  </RevealItem>
                ))}
          </RevealGroup>
          {page.hideServiceLink ? null : (
            <p className="mt-10 text-sm text-muted">
              Prefer the long version?{" "}
              <Link
                href={page.serviceHref}
                className="text-foreground underline underline-offset-2"
              >
                {page.serviceLabel}
              </Link>
            </p>
          )}
        </div>
      </section>

      {page.process?.length && page.processTitle && page.processIntro ? (
        <LandingProcess
          title={page.processTitle}
          intro={page.processIntro}
          steps={page.process}
        />
      ) : null}

      <FaqAccordion
        items={page.faqs}
        eyebrow="Before you reach out"
        title="Straight answers."
      />

      <PageCTA
        title={page.closingTitle ?? page.formTitle}
        copy={page.closingCopy ?? page.formSubtitle}
        primaryHref="#lp-form"
        primaryLabel={page.stickyCtaLabel}
        secondaryLabel={hasWork ? "See the work" : null}
        secondaryHref="#work"
        meta={page.formFootnote}
      />

      <LandingStickyCta label={page.stickyCtaLabel} />
    </main>
  );
}

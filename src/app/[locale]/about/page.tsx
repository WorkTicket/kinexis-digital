import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FaqAccordion } from "@/components/page/FaqAccordion";
import { PageCTA } from "@/components/page/PageCTA";
import { PageHero } from "@/components/page/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import { ChapterLead } from "@/components/ui/ChapterLead";
import {
  MediaReveal,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/ui/Reveal";
import { getAboutContent, getFaqItems } from "@/content/about";
import { pageHeroStills } from "@/content/page-hero-stills";
import { localeContent } from "@/i18n/locale-content";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import type { Locale } from "@/i18n/routing";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { duration } from "@/lib/motion";
import {
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
} from "@/lib/schema";

type Props = { params: LocaleParams };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const about = getAboutContent(locale);
  return buildPageMetadata({
    locale,
    path: "/about",
    title: about.metaTitle,
    description: about.metaDescription,
  });
}

const statusLabel = localeContent({
  en: {
    done: "Done",
    now: "Now",
    soon: "Soon",
  },
  "es-419": {
    done: "Hecho",
    now: "Ahora",
    soon: "Pronto",
  },
});

export default async function AboutPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const c = getAboutContent(locale);
  const faqs = getFaqItems(locale);
  const labels = statusLabel[locale as Locale];
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");

  return (
    <main className="about-page flex flex-1 flex-col">
      <JsonLd
        data={[
          organizationSchema(),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: tNav("home"), url: buildAbsoluteUrl(locale, "/") },
            { name: tNav("about"), url: buildAbsoluteUrl(locale, "/about") },
          ]),
        ]}
      />

      <PageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        signal={c.heroSignal}
        copy={c.heroCopy}
        secondaryHref="/case-studies"
        secondaryLabel={tCommon("seeTheWork")}
        atmosphereSrc={pageHeroStills.about.src}
        atmosphereSrcSm={pageHeroStills.about.srcSm}
      />

      {/* Why — manifesto + full-bleed still */}
      <section
        aria-labelledby="about-why-heading"
        className="chapter chapter--studio relative overflow-hidden"
      >
        <div className="shell chapter-shell--monument relative">
          <Reveal variant="rise" when="chapter" className="about-why__lead">
            <ChapterLead
              eyebrow={c.why.eyebrow}
              headingId="about-why-heading"
              title={c.why.title}
              headingClassName="max-w-[18ch]"
            />
          </Reveal>

          <div className="about-why">
            <Reveal variant="fadeUp" className="about-why__problem">
              <p className="about-why__label">{c.why.problemLabel}</p>
              {c.why.problem.map((para) => (
                <p key={para.slice(0, 24)} className="about-why__copy">
                  {para}
                </p>
              ))}
            </Reveal>

            <Reveal
              variant="fadeUp"
              delay={0.08}
              className="about-why__solution"
            >
              <p className="about-why__label">{c.why.solutionLabel}</p>
              <p className="about-why__quote">{c.why.solutionQuote}</p>
              {c.why.solution.map((para) => (
                <p key={para.slice(0, 24)} className="about-why__copy">
                  {para}
                </p>
              ))}
            </Reveal>
          </div>

          <MediaReveal
            variant="float"
            delay={0.1}
            className="about-why__still media-grade"
          >
            <Image
              src="/assets/images/agency/about-system.webp"
              alt=""
              width={1600}
              height={800}
              className="about-why__still-img"
              sizes="(max-width: 900px) 100vw, 1120px"
            />
          </MediaReveal>
        </div>
      </section>

      {/* Partnership — sticky lead + indexed manifesto rows */}
      <section
        aria-labelledby="about-work-heading"
        className="chapter chapter--void relative overflow-hidden"
      >
        <div className="shell chapter-shell--standard relative">
          <div className="about-partnership">
            <Reveal
              variant="rise"
              when="chapter"
              className="about-partnership__lead"
            >
              <ChapterLead
                eyebrow={c.partnership.eyebrow}
                headingId="about-work-heading"
                title={c.partnership.title}
                headingClassName="max-w-[16ch]"
                dek={c.partnership.copy}
              />
            </Reveal>

            <RevealGroup
              as="ol"
              className="about-partnership__list"
              stagger={duration.staggerTight}
            >
              {c.partnership.signals.map((signal, index) => (
                <RevealItem key={signal.title} as="li" variant="fadeUp">
                  <article className="about-partnership__row">
                    <span className="about-partnership__index" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="about-partnership__body">
                      <h3 className="about-partnership__title">
                        {signal.title}
                      </h3>
                      <p className="about-partnership__copy">
                        {signal.description}
                      </p>
                    </div>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Method — large-number vertical stack */}
      <section
        aria-labelledby="about-method-heading"
        className="chapter chapter--signal relative overflow-hidden"
      >
        <div className="shell chapter-shell--standard relative">
          <Reveal variant="rise" when="chapter" className="mb-12 md:mb-16">
            <ChapterLead
              eyebrow={c.method.eyebrow}
              headingId="about-method-heading"
              title={c.method.title}
              headingClassName="max-w-[16ch]"
            />
          </Reveal>

          <RevealGroup
            as="ol"
            className="about-method"
            stagger={duration.staggerTight}
            aria-label="KINEXIS method phases"
          >
            {c.method.phases.map((phase, index) => (
              <RevealItem key={phase.title} as="li" variant="fadeUp">
                <article className="about-method__step">
                  <span className="about-method__num" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="about-method__copy">
                    <h3 className="about-method__title">{phase.title}</h3>
                    <p className="about-method__body">{phase.desc}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Architecture — editorial channel index (no icon wells) */}
      <section
        aria-labelledby="about-arch-heading"
        className="chapter chapter--studio relative overflow-hidden"
      >
        <div className="shell chapter-shell--standard relative">
          <Reveal variant="rise" when="chapter" className="about-arch__lead">
            <ChapterLead
              eyebrow={c.architecture.eyebrow}
              headingId="about-arch-heading"
              title={c.architecture.title}
              headingClassName="max-w-[14ch]"
              dek={c.architecture.copy}
            />
          </Reveal>

          <RevealGroup
            as="ul"
            className="about-arch"
            stagger={duration.staggerTight}
          >
            {c.architecture.nodes.map((node) => (
              <RevealItem key={node.id} as="li" variant="fadeUp">
                <article className="about-arch__node">
                  <p className="about-arch__role">{node.role}</p>
                  <h3 className="about-arch__title">{node.label}</h3>
                  <p className="about-arch__copy">{node.summary}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal variant="fadeUp" delay={0.1} className="about-arch__caption">
            <p>{c.architecture.caption}</p>
          </Reveal>

          <MediaReveal
            variant="float"
            delay={0.12}
            className="about-arch__plate media-grade"
          >
            <Image
              src="/assets/images/editorial/service-seo.webp"
              alt=""
              width={1400}
              height={788}
              className="about-arch__plate-img"
              sizes="(max-width: 900px) 100vw, 960px"
            />
          </MediaReveal>
        </div>
      </section>

      {/* Principles — open manifesto */}
      <section
        aria-labelledby="about-principles-heading"
        className="chapter chapter--void relative overflow-hidden"
      >
        <div className="shell chapter-shell--monument relative">
          <Reveal variant="rise" when="chapter" className="mb-12 md:mb-16">
            <ChapterLead
              eyebrow={c.principles.eyebrow}
              headingId="about-principles-heading"
              title={c.principles.title}
              headingClassName="max-w-[16ch]"
            />
          </Reveal>

          <RevealGroup
            as="ul"
            className="about-principles"
            stagger={duration.staggerTight}
          >
            {c.principles.items.map((item) => (
              <RevealItem key={item.statement} as="li" variant="fadeUp">
                <article className="about-principle">
                  <p className="about-principle__accent">{item.accent}</p>
                  <h3 className="about-principle__title">{item.statement}</h3>
                  <p className="about-principle__copy">{item.explanation}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Roadmap — open year spine, no tiles */}
      <section
        aria-labelledby="about-roadmap-heading"
        className="chapter chapter--studio relative overflow-hidden"
      >
        <div className="shell chapter-shell--standard relative">
          <Reveal variant="rise" when="chapter" className="mb-12 md:mb-16">
            <ChapterLead
              eyebrow={c.roadmap.eyebrow}
              headingId="about-roadmap-heading"
              title={c.roadmap.title}
              headingClassName="max-w-[16ch]"
              dek={c.roadmap.copy}
            />
          </Reveal>

          <RevealGroup
            as="ol"
            className="about-roadmap"
            stagger={duration.staggerTight}
            aria-label="Company roadmap"
          >
            {c.roadmap.milestones.map((milestone) => (
              <RevealItem key={milestone.year} as="li" variant="fadeUp">
                <article
                  className={`about-roadmap__item about-roadmap__item--${milestone.status}`}
                >
                  <div className="about-roadmap__year-block">
                    <span className="about-roadmap__status">
                      {
                        labels[
                          milestone.status as "done" | "now" | "soon"
                        ]
                      }
                    </span>
                    <span className="about-roadmap__year">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="about-roadmap__body">
                    <h3 className="about-roadmap__title">{milestone.title}</h3>
                    <ul className="about-roadmap__list">
                      {milestone.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FaqAccordion items={faqs} />

      <PageCTA layout="minimal" title={c.ctaTitle} copy={c.ctaCopy} />
    </main>
  );
}

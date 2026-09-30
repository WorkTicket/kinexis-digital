import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  architectureIcon,
  methodIcon,
  partnershipIcon,
} from "@/components/about/AboutMarks";
import {
  AboutArchitectureMap,
  AboutRoster,
  AboutWhyPlate,
} from "@/components/about/AboutPlates";
import "@/styles/components/about.css";
import { FaqAccordion } from "@/components/page/FaqAccordion";
import { PageCTA } from "@/components/page/PageCTA";
import { PageHero } from "@/components/page/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getAboutContent, getFaqItems } from "@/content/about";
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
        visual={<AboutRoster locale={locale as Locale} />}
      />

      {/* Why — headline opposite the quote, essays under, diagram last */}
      <section
        aria-labelledby="about-why-heading"
        className="chapter chapter--void relative overflow-hidden"
      >
        <div className="shell chapter-shell--monument relative">
          <div className="about-why">
            <Reveal variant="rise" when="chapter" className="about-why__mast">
              <ChapterLead
                eyebrow={c.why.eyebrow}
                headingId="about-why-heading"
                title={c.why.title}
                headingClassName="max-w-[18ch]"
              />
            </Reveal>

            <Reveal variant="fadeUp" delay={0.06} className="about-why__voice">
              <p className="about-why__quote">{c.why.solutionQuote}</p>
            </Reveal>
          </div>

          <div className="about-why__essays">
            <Reveal variant="fadeUp" className="about-why__essay">
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
              className="about-why__essay about-why__essay--solution"
            >
              <p className="about-why__label">{c.why.solutionLabel}</p>
              {c.why.solution.map((para) => (
                <p key={para.slice(0, 24)} className="about-why__copy">
                  {para}
                </p>
              ))}
            </Reveal>
          </div>

          <Reveal variant="fadeUp" delay={0.04}>
            <AboutWhyPlate
              locale={locale as Locale}
              brokenLabel={c.why.problemLabel}
              systemLabel={c.why.solutionLabel}
            />
          </Reveal>
        </div>
      </section>

      {/* Partnership — centered lead + icon triad */}
      <section
        aria-labelledby="about-work-heading"
        className="chapter chapter--void relative overflow-hidden"
      >
        <div className="shell chapter-shell--standard relative">
          <Reveal variant="rise" when="chapter" className="about-chapter-lead">
            <ChapterLead
              eyebrow={c.partnership.eyebrow}
              headingId="about-work-heading"
              title={c.partnership.title}
              headingClassName="max-w-[18ch]"
              dek={c.partnership.copy}
              dekClassName="max-w-[42rem]"
            />
          </Reveal>

          <RevealGroup
            as="ul"
            className="about-partnership"
            stagger={duration.staggerTight}
          >
            {c.partnership.signals.map((signal, index) => {
              const Icon = partnershipIcon(index);
              return (
                <RevealItem key={signal.title} as="li" variant="fadeUp">
                  <article className="about-partnership__row">
                    <div className="about-partnership__head">
                      <span className="icon-well" aria-hidden>
                        <Icon strokeWidth={1.5} />
                      </span>
                      <h3 className="about-partnership__title">{signal.title}</h3>
                    </div>
                    <p className="about-partnership__copy">
                      {signal.description}
                    </p>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Method — centered process spine */}
      <section
        aria-labelledby="about-method-heading"
        className="chapter chapter--void relative overflow-hidden"
      >
        <div className="shell chapter-shell--standard relative">
          <Reveal variant="rise" when="chapter" className="about-chapter-lead">
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
            {c.method.phases.map((phase, index) => {
              const Icon = methodIcon(index);
              return (
                <RevealItem key={phase.title} as="li" variant="fadeUp">
                  <article className="about-method__step">
                    <span className="icon-well" aria-hidden>
                      <Icon strokeWidth={1.5} />
                    </span>
                    <h3 className="about-method__title">{phase.title}</h3>
                    <p className="about-method__body">{phase.desc}</p>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Architecture — caption, then channel legend */}
      <section
        aria-labelledby="about-arch-heading"
        className="chapter chapter--void relative overflow-hidden"
      >
        <div className="shell chapter-shell--standard relative">
          <Reveal variant="rise" when="chapter" className="about-chapter-lead">
            <ChapterLead
              eyebrow={c.architecture.eyebrow}
              headingId="about-arch-heading"
              title={c.architecture.title}
              headingClassName="max-w-[14ch]"
              dek={c.architecture.copy}
              dekClassName="max-w-[40rem]"
            />
          </Reveal>

          <Reveal variant="fadeUp" delay={0.1} className="about-arch__caption">
            <p>{c.architecture.caption}</p>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.06}>
            <AboutArchitectureMap nodes={c.architecture.nodes} />
          </Reveal>

          <RevealGroup
            as="ul"
            className="about-arch"
            stagger={duration.staggerTight}
          >
            {c.architecture.nodes.map((node) => {
              const Icon = architectureIcon(node.id);
              return (
                <RevealItem key={node.id} as="li" variant="fadeUp">
                  <article className="about-arch__node">
                    <p className="about-arch__role">{node.role}</p>
                    <div className="about-arch__name">
                      <span className="icon-well icon-well--sm" aria-hidden>
                        <Icon strokeWidth={1.5} />
                      </span>
                      <h3 className="about-arch__title">{node.label}</h3>
                    </div>
                    <p className="about-arch__copy">{node.summary}</p>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Principles — statement type, no icons */}
      <section
        aria-labelledby="about-principles-heading"
        className="chapter chapter--void relative overflow-hidden"
      >
        <div className="shell chapter-shell--monument relative">
          <Reveal variant="rise" when="chapter" className="about-chapter-lead">
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

      {/* Roadmap — centered timeline */}
      <section
        aria-labelledby="about-roadmap-heading"
        className="chapter chapter--void relative overflow-hidden"
      >
        <div className="shell chapter-shell--standard relative">
          <Reveal variant="rise" when="chapter" className="about-chapter-lead">
            <ChapterLead
              eyebrow={c.roadmap.eyebrow}
              headingId="about-roadmap-heading"
              title={c.roadmap.title}
              headingClassName="max-w-[16ch]"
              dek={c.roadmap.copy}
              dekClassName="max-w-[40rem]"
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
                  <div className="about-roadmap__rail" aria-hidden>
                    <span className="about-roadmap__dot" />
                  </div>
                  <div className="about-roadmap__year-block">
                    <span className="about-roadmap__status">
                      {labels[milestone.status as "done" | "now" | "soon"]}
                    </span>
                    <span className="about-roadmap__year">{milestone.year}</span>
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

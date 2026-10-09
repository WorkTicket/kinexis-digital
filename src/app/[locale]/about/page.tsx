import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutStage } from "@/components/about/AboutStage";
import { HomeProcess } from "@/components/home/HomeProcess";
import { ArchitectureLoop } from "@/components/about/ArchitectureLoop";
import {
  SplitStudy,
  SystemStudy,
  partnershipMarks,
  principleMarks,
  type MethodMarkId,
} from "@/components/about/about-studies";
import "@/styles/components/about.css";
import "@/styles/routes/home-services.css";
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
import { cn } from "@/lib/cn";
import {
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
} from "@/lib/schema";

type Props = { params: LocaleParams };

const METHOD_IDS: MethodMarkId[] = [
  "analyze",
  "strategize",
  "build",
  "optimize",
  "scale",
];

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
        visual={
          <div className="about-hero-study">
            <SystemStudy locale={locale} />
          </div>
        }
      />

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

          <div className="about-why-board">
            <div className="about-why__essays about-why__essays--stack">
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

            <Reveal variant="fade" delay={0.04} className="about-study">
              <SplitStudy locale={locale} />
            </Reveal>
          </div>
        </div>
      </section>

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
            className="service-spread"
            stagger={duration.staggerTight}
          >
            {c.partnership.signals.map((signal, index) => {
              const Mark = partnershipMarks[index] ?? partnershipMarks[0];
              return (
                <RevealItem key={signal.title} as="li" variant="fadeUp">
                  <article
                    className={cn(
                      "service-spread__link",
                      index % 2 === 1 && "service-spread__link--flip",
                    )}
                  >
                    <div className="service-spread__art">
                      <Mark locale={locale} />
                    </div>
                    <div className="service-spread__copy">
                      <h3 className="service-spread__title">{signal.title}</h3>
                      <p className="service-spread__dek">{signal.description}</p>
                    </div>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <HomeProcess
        headingId="about-process-heading"
        sectionId="about-process"
        ctaHref="#about-method-heading"
      />

      <section
        aria-labelledby="about-method-heading"
        className="chapter chapter--void relative overflow-hidden"
      >
        <div className="shell about-band relative">
          <Reveal variant="rise" when="chapter" className="about-chapter-lead">
            <ChapterLead
              eyebrow={c.method.eyebrow}
              headingId="about-method-heading"
              title={c.method.title}
              headingClassName="max-w-[16ch]"
            />
          </Reveal>

          <Reveal variant="rise" when="chapter">
            <AboutStage
              ariaLabel={c.method.title}
              steps={c.method.phases.map((phase, index) => ({
                id: METHOD_IDS[index] ?? "analyze",
                title: phase.title,
                description: phase.desc,
              }))}
            />
          </Reveal>
        </div>
      </section>

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

          <Reveal variant="fade" when="chapter">
            <ArchitectureLoop
              ariaLabel={c.architecture.title}
              caption={c.architecture.caption}
              oneLabel={c.architecture.one}
              sharpensLabel={c.architecture.sharpensLabel}
              nodes={c.architecture.nodes}
            />
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="about-principles-heading"
        className="chapter chapter--void relative overflow-hidden"
      >
        <div className="shell about-band relative">
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
            {c.principles.items.map((item, index) => {
              const Mark = principleMarks[index] ?? principleMarks[0];
              return (
                <RevealItem key={item.statement} as="li" variant="fadeUp">
                  <article className="about-principle">
                    <div className="about-principle__plate">
                      <Mark locale={locale} />
                    </div>
                    <div className="about-principle__body">
                      <p className="about-principle__accent">{item.accent}</p>
                      <h3 className="about-principle__title">{item.statement}</h3>
                      <p className="about-principle__copy">{item.explanation}</p>
                    </div>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section
        aria-labelledby="about-roadmap-heading"
        className="chapter chapter--void relative overflow-hidden"
      >
        <div className="shell about-band relative">
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
            aria-label={c.roadmap.title}
          >
            {c.roadmap.milestones.map((milestone) => (
              <RevealItem
                key={milestone.year}
                as="li"
                variant="fadeUp"
                className={`about-roadmap__item about-roadmap__item--${milestone.status}`}
              >
                <div className="about-roadmap__track" aria-hidden>
                  <span className="about-roadmap__bar" />
                </div>
                <p className="about-roadmap__status">
                  {labels[milestone.status as "done" | "now" | "soon"]}
                </p>
                <p className="about-roadmap__year">{milestone.year}</p>
                <h3 className="about-roadmap__title">{milestone.title}</h3>
                <ul className="about-roadmap__list">
                  {milestone.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
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

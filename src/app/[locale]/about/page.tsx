import type { Metadata } from "next";
import Image from "next/image";
import {
  Activity,
  BarChart3,
  Layers,
  LineChart,
  Mail,
  Search,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FaqAccordion } from "@/components/page/FaqAccordion";
import { PageCTA } from "@/components/page/PageCTA";
import { PageHero } from "@/components/page/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
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

const SIGNAL_ICONS: LucideIcon[] = [Users, Target, LineChart];
const METHOD_ICONS: LucideIcon[] = [Search, Layers, Activity, BarChart3, Target];
const ARCH_ICONS: Record<string, LucideIcon> = {
  seo: Search,
  "paid-ads": Target,
  "web-design": Layers,
  analytics: BarChart3,
  cro: Activity,
  email: Mail,
};

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

  return (
    <main className="about-page flex flex-1 flex-col">
      <JsonLd
        data={[
          organizationSchema(),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "About", url: buildAbsoluteUrl(locale, "/about") },
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

      {/* Why we exist — editorial split, monument density */}
      <section
        aria-labelledby="about-why-heading"
        className="chapter chapter--studio relative overflow-hidden"
      >
        <div className="shell chapter-shell--monument relative">
          <Reveal variant="rise" when="chapter" className="mb-10 md:mb-14">
            <ChapterLead
              eyebrow={c.why.eyebrow}
              headingId="about-why-heading"
              title={c.why.title}
              headingClassName="max-w-[22ch]"
            />
          </Reveal>

          <div className="about-why">
            <Reveal variant="fadeUp" className="about-why__col">
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
              className="about-why__col about-why__col--solution"
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

          <Reveal variant="fadeUp" delay={0.1} className="about-why__still media-grade">
            <Image
              src="/assets/images/editorial/hero-still.webp"
              alt=""
              width={1400}
              height={700}
              className="about-why__still-img"
            />
          </Reveal>
        </div>
      </section>

      {/* How we work — numbered columns */}
      <section
        aria-labelledby="about-work-heading"
        className="chapter chapter--void relative overflow-hidden"
      >
        <div className="shell chapter-shell--tight relative">
          <Reveal variant="rise" when="chapter" className="mb-10 md:mb-12">
            <ChapterLead
              eyebrow={c.partnership.eyebrow}
              headingId="about-work-heading"
              title={c.partnership.title}
              headingClassName="max-w-[22ch]"
              dek={c.partnership.copy}
            />
          </Reveal>

          <RevealGroup
            as="ul"
            className="about-signals"
            stagger={duration.staggerTight}
          >
            {c.partnership.signals.map((signal, index) => {
              const Icon = SIGNAL_ICONS[index % SIGNAL_ICONS.length];
              return (
                <RevealItem key={signal.title} as="li" variant="fadeUp">
                  <article className="about-signal">
                    <span className="icon-well" aria-hidden>
                      <Icon strokeWidth={1.5} />
                    </span>
                    <h3 className="about-signal__title">{signal.title}</h3>
                    <p className="about-signal__copy">{signal.description}</p>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Method — vertical spine */}
      <section
        aria-labelledby="about-method-heading"
        className="chapter chapter--void relative overflow-hidden"
      >
        <div className="shell chapter-shell--standard relative">
          <Reveal variant="rise" when="chapter" className="mb-10 md:mb-14">
            <ChapterLead
              eyebrow={c.method.eyebrow}
              headingId="about-method-heading"
              title={c.method.title}
              headingClassName="max-w-[20ch]"
            />
          </Reveal>

          <RevealGroup
            as="ol"
            className="about-method"
            stagger={duration.staggerTight}
            aria-label="KINEXIS method phases"
          >
            {c.method.phases.map((phase, index) => {
              const Icon = METHOD_ICONS[index % METHOD_ICONS.length];
              return (
                <RevealItem key={phase.title} as="li" variant="fadeUp">
                  <article className="about-method__step">
                    <span className="icon-well" aria-hidden>
                      <Icon strokeWidth={1.5} />
                    </span>
                    <div className="about-method__copy">
                      <h3 className="about-method__title">{phase.title}</h3>
                      <p className="about-method__body">{phase.desc}</p>
                    </div>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Architecture — linked role list */}
      <section
        aria-labelledby="about-arch-heading"
        className="chapter chapter--studio relative overflow-hidden"
      >
        <div className="shell chapter-shell--tight relative">
          <Reveal variant="rise" when="chapter" className="mb-10 md:mb-12">
            <ChapterLead
              eyebrow={c.architecture.eyebrow}
              headingId="about-arch-heading"
              title={c.architecture.title}
              headingClassName="max-w-[20ch]"
              dek={c.architecture.copy}
            />
          </Reveal>

          <RevealGroup
            as="ul"
            className="about-arch"
            stagger={duration.staggerTight}
          >
            {c.architecture.nodes.map((node) => {
              const Icon = ARCH_ICONS[node.id] ?? Layers;
              return (
                <RevealItem key={node.id} as="li" variant="fadeUp">
                  <article className="about-arch__node">
                    <div className="about-arch__lead">
                      <span className="icon-well icon-well--sm" aria-hidden>
                        <Icon strokeWidth={1.5} />
                      </span>
                      <p className="about-arch__role">{node.role}</p>
                    </div>
                    <h3 className="about-arch__title">{node.label}</h3>
                    <p className="about-arch__copy">{node.summary}</p>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>

          <Reveal variant="fadeUp" delay={0.12} className="about-arch__caption">
            <p>{c.architecture.caption}</p>
          </Reveal>
        </div>
      </section>

      {/* Principles — manifesto rows */}
      <section
        aria-labelledby="about-principles-heading"
        className="chapter chapter--studio relative overflow-hidden"
      >
        <div className="shell chapter-shell--standard relative">
          <Reveal variant="rise" when="chapter" className="mb-8 md:mb-10">
            <ChapterLead
              eyebrow={c.principles.eyebrow}
              headingId="about-principles-heading"
              title={c.principles.title}
              headingClassName="max-w-[20ch]"
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
                  <div className="about-principle__body">
                    <h3 className="about-principle__title">{item.statement}</h3>
                    <p className="about-principle__copy">{item.explanation}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Roadmap — keep milestone cards, split mast, tight density */}
      <section
        aria-labelledby="about-roadmap-heading"
        className="chapter chapter--void relative overflow-hidden"
      >
        <div className="shell chapter-shell--tight relative">
          <Reveal variant="rise" when="chapter" className="mb-10 md:mb-12">
            <ChapterLead
              eyebrow={c.roadmap.eyebrow}
              headingId="about-roadmap-heading"
              title={c.roadmap.title}
              headingClassName="max-w-[20ch]"
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
                  <div className="about-roadmap__meta">
                    <span className="about-roadmap__status">
                      {
                        labels[
                          milestone.status as "done" | "now" | "soon"
                        ]
                      }
                    </span>
                    <span className="about-roadmap__year">{milestone.year}</span>
                    <h3 className="about-roadmap__title">{milestone.title}</h3>
                  </div>
                  <ul className="about-roadmap__list">
                    {milestone.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
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

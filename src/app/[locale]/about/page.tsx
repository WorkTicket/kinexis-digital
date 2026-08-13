import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Calendar,
  Handshake,
  LineChart,
  Mail,
  Map,
  Megaphone,
  Monitor,
  MousePointerClick,
  Rocket,
  Search,
  Target,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FaqAccordion } from "@/components/page/FaqAccordion";
import { PageCTA } from "@/components/page/PageCTA";
import { PageHero } from "@/components/page/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getAboutContent, getFaqItems } from "@/content/about";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { duration } from "@/lib/motion";
import {
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
} from "@/lib/schema";

const METHOD_ICONS: LucideIcon[] = [Search, Map, Wrench, LineChart, Rocket];

const SIGNAL_ICONS: LucideIcon[] = [Users, Handshake, BarChart3];

const ARCH_ICONS: Record<string, LucideIcon> = {
  seo: Search,
  "paid-ads": Megaphone,
  "web-design": Monitor,
  analytics: BarChart3,
  cro: MousePointerClick,
  email: Mail,
};

const PRINCIPLE_ICONS: Record<string, LucideIcon> = {
  Evidence: BarChart3,
  Systems: Workflow,
  "Long-term": Calendar,
  Focus: Target,
  Evidencia: BarChart3,
  Sistemas: Workflow,
  "Largo plazo": Calendar,
  Enfoque: Target,
};

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

const statusLabel = {
  en: { done: "Done", now: "Now", soon: "Soon" },
  es: { done: "Hecho", now: "Ahora", soon: "Pronto" },
} as const;

export default async function AboutPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const c = getAboutContent(locale);
  const faqs = getFaqItems(locale);
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
        atmosphere
      />

      {/* Why we exist */}
      <section
        aria-labelledby="about-why-heading"
        className="chapter chapter--studio relative overflow-hidden"
      >
        <div className="shell relative py-24 md:py-32 lg:py-40">
          <Reveal variant="rise" when="chapter" className="mb-12 md:mb-16 lg:mb-20">
            <ChapterLead
              eyebrow={c.why.eyebrow}
              headingId="about-why-heading"
              title={c.why.title}
              headingClassName="max-w-[18ch]"
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

            <Reveal variant="fadeUp" delay={0.08} className="about-why__col about-why__col--solution">
              <p className="about-why__label">{c.why.solutionLabel}</p>
              <p className="about-why__quote">{c.why.solutionQuote}</p>
              {c.why.solution.map((para) => (
                <p key={para.slice(0, 24)} className="about-why__copy">
                  {para}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section
        aria-labelledby="about-work-heading"
        className="chapter chapter--void relative overflow-hidden"
      >
        <div className="shell relative py-24 md:py-32 lg:py-40">
          <Reveal variant="rise" when="chapter" className="mb-12 md:mb-16 lg:mb-20">
            <ChapterLead
              eyebrow={c.partnership.eyebrow}
              headingId="about-work-heading"
              title={c.partnership.title}
              headingClassName="max-w-[16ch]"
              dek={c.partnership.copy}
            />
          </Reveal>

          <RevealGroup
            as="ul"
            className="about-signals"
            stagger={duration.staggerTight}
          >
            {c.partnership.signals.map((signal, index) => {
              const Icon = SIGNAL_ICONS[index] ?? Users;
              return (
                <RevealItem key={signal.title} as="li" variant="fadeUp">
                  <article className="about-signal motion-card surface-tile">
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

      {/* Method */}
      <section
        aria-labelledby="about-method-heading"
        className="chapter chapter--studio relative overflow-hidden"
      >
        <div className="shell relative py-24 md:py-32 lg:py-40">
          <Reveal variant="rise" when="chapter" className="mb-12 md:mb-16 lg:mb-20">
            <ChapterLead
              eyebrow={c.method.eyebrow}
              headingId="about-method-heading"
              title={c.method.title}
              headingClassName="max-w-[14ch]"
            />
          </Reveal>

          <RevealGroup
            as="ol"
            className="about-method"
            stagger={duration.staggerTight}
            aria-label="KINEXIS method phases"
          >
            {c.method.phases.map((phase, index) => {
              const Icon = METHOD_ICONS[index] ?? Search;
              return (
                <RevealItem key={phase.title} as="li" variant="fadeUp">
                  <article className="about-method__step motion-card">
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

      {/* Architecture */}
      <section
        aria-labelledby="about-arch-heading"
        className="chapter chapter--void relative overflow-hidden"
      >
        <div className="shell relative py-24 md:py-32 lg:py-40">
          <Reveal variant="rise" when="chapter" className="mb-12 md:mb-16 lg:mb-20">
            <ChapterLead
              eyebrow={c.architecture.eyebrow}
              headingId="about-arch-heading"
              title={c.architecture.title}
              headingClassName="max-w-[12ch]"
              dek={c.architecture.copy}
            />
          </Reveal>

          <RevealGroup
            as="ul"
            className="about-arch"
            stagger={duration.staggerTight}
          >
            {c.architecture.nodes.map((node) => {
              const Icon = ARCH_ICONS[node.id] ?? Search;
              return (
                <RevealItem key={node.id} as="li" variant="fadeUp">
                  <article className="about-arch__node motion-card surface-tile">
                    <span className="icon-well" aria-hidden>
                      <Icon strokeWidth={1.5} />
                    </span>
                    <p className="about-arch__role">{node.role}</p>
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

      {/* Principles */}
      <section
        aria-labelledby="about-principles-heading"
        className="chapter chapter--studio relative overflow-hidden"
      >
        <div className="shell relative py-24 md:py-32 lg:py-40">
          <Reveal variant="rise" when="chapter" className="mb-12 md:mb-16 lg:mb-20">
            <ChapterLead
              eyebrow={c.principles.eyebrow}
              headingId="about-principles-heading"
              title={c.principles.title}
              headingClassName="max-w-[14ch]"
            />
          </Reveal>

          <RevealGroup
            as="ul"
            className="about-principles"
            stagger={duration.staggerTight}
          >
            {c.principles.items.map((item) => {
              const Icon = PRINCIPLE_ICONS[item.accent] ?? Target;
              return (
                <RevealItem key={item.statement} as="li" variant="fadeUp">
                  <article className="about-principle motion-card surface-tile">
                    <span className="icon-well" aria-hidden>
                      <Icon strokeWidth={1.5} />
                    </span>
                    <p className="about-principle__accent">{item.accent}</p>
                    <h3 className="about-principle__title">{item.statement}</h3>
                    <p className="about-principle__copy">{item.explanation}</p>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Roadmap */}
      <section
        aria-labelledby="about-roadmap-heading"
        className="chapter chapter--void relative overflow-hidden"
      >
        <div className="shell relative py-24 md:py-32 lg:py-40">
          <Reveal variant="rise" when="chapter" className="mb-12 md:mb-16 lg:mb-20">
            <ChapterLead
              eyebrow={c.roadmap.eyebrow}
              headingId="about-roadmap-heading"
              title={c.roadmap.title}
              headingClassName="max-w-[12ch]"
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
                      {statusLabel[locale][milestone.status]}
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

      <PageCTA title={c.ctaTitle} copy={c.ctaCopy} />
    </main>
  );
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { FaqAccordion } from "@/components/page/FaqAccordion";
import { PageCTA } from "@/components/page/PageCTA";
import {
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/ui/Reveal";
import { IndustryHero } from "@/components/industry/IndustryHero";
import { IndustryPainPoints } from "@/components/industry/IndustryPainPoints";
import { IndustryCaseStudyCard } from "@/components/industry/IndustryCaseStudyCard";
import { IndustryProcessSteps } from "@/components/industry/IndustryProcessSteps";
import { IndustryTestimonialBlock } from "@/components/industry/IndustryTestimonialBlock";
import {
  getHelpIcon,
  getWhyIcon,
} from "@/components/industry/industry-icons";
import JsonLd from "@/components/seo/JsonLd";
import {
  getAllIndustrySlugs,
  getIndustryBySlug,
  isStandaloneIndustry,
} from "@/content/industries";
import { resolveLocale } from "@/i18n/locale";
import { matchUnprefixedLegacyRedirect } from "@/lib/legacy-redirects.mjs";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { duration } from "@/lib/motion";
import {
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
  serviceSchema,
} from "@/lib/schema";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  if (!isStandaloneIndustry(slug)) {
    return buildPageMetadata({
      locale,
      path: "/industries",
      title: "Industry Demand Programs We Build",
      description:
        "Digital marketing for home services, ecommerce, healthcare, legal, SaaS, and more. Demand programs built for booked jobs, signed work, and revenue.",
      noIndex: true,
    });
  }
  return buildPageMetadata({
    locale,
    path: `/industries/${slug}`,
    title: industry.metaTitle,
    description: industry.metaDescription,
  });
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    redirect({
      href: matchUnprefixedLegacyRedirect(`/industries/${slug}`) ?? "/industries",
      locale,
    });
    return null;
  }

  // Only home-services + ecommerce keep full detail pages (nav dropdown).
  // Everyone else lives as a chapter on the industries hub.
  if (!isStandaloneIndustry(slug)) {
    redirect({ href: `/industries#${slug}`, locale });
  }

  const t = await getTranslations("common");
  const tNav = await getTranslations("nav");

  return (
    <main className="industries-page flex flex-1 flex-col">
      <JsonLd
        data={[
          organizationSchema(),
          serviceSchema(
            industry.metaTitle,
            industry.metaDescription,
            buildAbsoluteUrl(locale, `/industries/${slug}`),
          ),
          faqSchema(industry.faq),
          breadcrumbSchema([
            { name: tNav("home"), url: buildAbsoluteUrl(locale, "/") },
            { name: tNav("industries"), url: buildAbsoluteUrl(locale, "/industries") },
            {
              name: industry.title,
              url: buildAbsoluteUrl(locale, `/industries/${slug}`),
            },
          ]),
        ]}
      />
      <IndustryHero industry={industry} />

      <IndustryPainPoints
        title={industry.problemTitle}
        copy={industry.problemCopy}
        approachTitle={industry.approachTitle}
        approachCopy={industry.approachCopy}
        painPoints={industry.painPoints}
      />

      <section
        aria-labelledby="industry-help-heading"
        className="industry-program-chapter chapter chapter--studio relative overflow-hidden"
      >
        <div className="shell relative z-[1] py-24 md:py-32 lg:py-40">
          <Reveal variant="rise" when="chapter">
            <header className="industry-program__mast">
              <p className="section-eyebrow">{t("program")}</p>
              <h2
                id="industry-help-heading"
                className="industry-program__heading"
              >
                {industry.helpTitle}
              </h2>
            </header>
          </Reveal>

          <RevealGroup
            as="ol"
            className="industry-program-grid"
            stagger={duration.staggerTight}
          >
            {industry.help.map((item, index) => (
              <RevealItem key={item.title} as="li" variant="fadeUp">
                <article className="industry-program">
                  <span className="industry-program__index" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="industry-program__copy">
                    <h3 className="industry-program__title">{item.title}</h3>
                    <p className="industry-program__body">{item.detail}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {industry.caseStudy && industry.proofTitle ? (
        <IndustryCaseStudyCard
          title={industry.proofTitle}
          caseStudy={industry.caseStudy}
        />
      ) : null}

      {industry.testimonials &&
      industry.testimonials.length > 0 &&
      industry.testimonialsTitle ? (
        <IndustryTestimonialBlock
          title={industry.testimonialsTitle}
          testimonials={industry.testimonials}
        />
      ) : null}

      {industry.processSteps &&
      industry.processSteps.length > 0 &&
      industry.processTitle &&
      industry.processCopy ? (
        <IndustryProcessSteps
          title={industry.processTitle}
          copy={industry.processCopy}
          steps={industry.processSteps}
          accentColor={industry.accentColor}
        />
      ) : null}

      <section
        aria-labelledby="industry-domains-heading"
        className="chapter chapter--void relative overflow-hidden"
      >
        <div className="shell relative z-[1] py-24 md:py-32 lg:py-40">
          <Reveal variant="rise" when="chapter">
            <header className="industry-domains__mast">
              <p className="section-eyebrow">{t("focus")}</p>
              <h2
                id="industry-domains-heading"
                className="industry-domains__heading"
              >
                {industry.domainsTitle}
              </h2>
              <p className="industry-domains__dek">{industry.domainsCopy}</p>
            </header>
          </Reveal>

          <RevealGroup
            as="ul"
            className="industry-domain-rail"
            stagger={duration.staggerTight}
          >
            {industry.domains.map((domain) => {
              const Icon = getHelpIcon(domain.title);
              return (
                <RevealItem key={domain.title} as="li" variant="fadeUp">
                  <article className="industry-domain motion-card">
                    <span className="icon-well" aria-hidden>
                      <Icon strokeWidth={1.5} />
                    </span>
                    <h3 className="industry-domain__title">{domain.title}</h3>
                    <p className="industry-domain__body">{domain.detail}</p>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section
        aria-labelledby="industry-why-heading"
        className="chapter chapter--studio relative"
      >
        <div className="shell relative py-24 md:py-32 lg:py-40">
          <Reveal variant="rise" when="chapter">
            <header className="industry-section-mast mb-12 md:mb-16">
              <p className="section-eyebrow">{t("whyUs")}</p>
              <h2
                id="industry-why-heading"
                className="mt-5 max-w-[22ch] font-[family-name:var(--font-display)] text-[clamp(2.35rem,5vw+0.15rem,4rem)] font-bold leading-[0.96] tracking-[-0.05em] text-balance text-foreground"
              >
                {industry.whyTitle}
              </h2>
            </header>
          </Reveal>

          <RevealGroup
            as="ul"
            className="industry-why-grid"
            stagger={duration.staggerTight}
          >
            {industry.why.map((item) => {
              const Icon = getWhyIcon(item.title);
              return (
                <RevealItem key={item.title} as="li" variant="fadeUp">
                  <article className="industry-why motion-card">
                    <span className="icon-well" aria-hidden>
                      <Icon strokeWidth={1.5} />
                    </span>
                    <h3 className="industry-why__title">{item.title}</h3>
                    <p className="industry-why__body">{item.detail}</p>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <FaqAccordion
        items={industry.faq}
        title={
          industry.faqTitle ??
          `Questions about ${industry.title.toLowerCase()}.`
        }
      />

      <PageCTA title={industry.ctaTitle} copy={industry.ctaCopy} />
    </main>
  );
}

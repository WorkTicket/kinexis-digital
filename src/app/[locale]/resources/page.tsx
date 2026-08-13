import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { PageCTA } from "@/components/page/PageCTA";
import { PageHero } from "@/components/page/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { fieldResources } from "@/content/field-resources";
import {
  getResourcesContent,
  type ResourceBadge,
} from "@/content/resources";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { cn } from "@/lib/cn";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { duration } from "@/lib/motion";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

type Props = { params: LocaleParams };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const content = getResourcesContent(locale);
  return buildPageMetadata({
    locale,
    path: "/resources",
    title: "Marketing Resources and Field Tools",
    description: content.meta.metaDescription,
  });
}

const BADGE_ORDER: ResourceBadge[] = ["Free", "Free + Paid", "Paid"];

export default async function ResourcesPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const content = getResourcesContent(locale);
  const t = await getTranslations("pages.resources");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");
  return (
    <main className="resources-page flex flex-1 flex-col">
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: tNav("home"), url: buildAbsoluteUrl(locale, "/") },
            { name: tNav("resources"), url: buildAbsoluteUrl(locale, "/resources") },
          ]),
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        signal={t("signal")}
        copy={t("copy")}
        secondaryHref="/blog"
        secondaryLabel={tCommon("readTheBlog")}
      />

      <section
        aria-labelledby="resources-heading"
        className="resources-section chapter chapter--void relative"
      >
        <div className="shell relative py-16 md:py-32 lg:py-40">
          <Reveal variant="rise" when="chapter" className="mb-12 md:mb-16 lg:mb-20">
            <ChapterLead
              eyebrow={t("deskEyebrow")}
              headingId="resources-heading"
              title={t("deskTitle")}
              headingClassName="max-w-[22ch]"
              dek={t("deskDek")}
            />
          </Reveal>

          <RevealGroup
            as="ul"
            className="resources-dossier"
            stagger={duration.staggerTight}
            delayChildren={0.06}
            aria-label={t("deskTitle")}
          >
            {fieldResources.map((link) => (
              <RevealItem key={link.href} as="li" variant="fadeUp">
                <a
                  href={link.href}
                  className="resource-tile group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="resource-tile__media" aria-hidden>
                    <Image
                      src={link.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="resource-tile__photo"
                    />
                    <span className="resource-tile__scrim" />
                  </span>
                  <span className="resource-tile__top">
                    <span className="resource-tile__source">{link.source}</span>
                    <span aria-hidden className="resource-tile__arrow">
                      ↗
                    </span>
                  </span>
                  <span className="resource-tile__label">{link.label}</span>
                  <span className="resource-tile__dek">{link.dek}</span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section
        aria-labelledby="toolkit-heading"
        className="chapter chapter--studio relative"
        id="toolkit"
      >
        <div className="shell relative py-16 md:py-32 lg:py-40">
          <Reveal variant="rise" when="chapter" className="mb-10 md:mb-14">
            <ChapterLead
              eyebrow={content.introLabel}
              headingId="toolkit-heading"
              title={content.meta.introTitle}
              headingClassName="max-w-[22ch]"
              dek={content.meta.introBody}
            />
          </Reveal>

          <Reveal variant="fadeUp" delay={0.08} when="chapter" className="toolkit-meta">
            <ul className="toolkit-stats" aria-label="Toolkit snapshot">
              {content.meta.stats.map((stat) => (
                <li key={stat.label} className="toolkit-stats__item">
                  <span className="toolkit-stats__value">{stat.value}</span>
                  <span className="toolkit-stats__label">{stat.label}</span>
                </li>
              ))}
            </ul>

            <div className="toolkit-key">
              <span className="toolkit-key__label">{content.keyLabel}</span>
              <ul className="toolkit-key__list" aria-label="Pricing key">
                {BADGE_ORDER.map((badge) => (
                  <li key={badge}>
                    <span
                      className={cn(
                        "toolkit-badge",
                        badge === "Free" && "toolkit-badge--free",
                        badge === "Free + Paid" && "toolkit-badge--hybrid",
                        badge === "Paid" && "toolkit-badge--paid",
                      )}
                    >
                      {content.badgeLabels[badge]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <nav aria-label={content.categoryNavLabel} className="toolkit-jump">
              <ul className="toolkit-jump__list">
                {content.categories.map((category) => (
                  <li key={category.id}>
                    <a href={`#${category.id}`} className="toolkit-jump__link">
                      {category.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="guides-heading"
        className="chapter chapter--void relative"
      >
        <div className="shell relative py-16 md:py-32 lg:py-40">
          <Reveal variant="rise" when="chapter" className="mb-10 md:mb-14">
            <ChapterLead
              eyebrow="Guides"
              headingId="guides-heading"
              title={content.guidesTitle}
              headingClassName="max-w-[22ch]"
              dek={content.guidesSubtitle}
            />
          </Reveal>

          <RevealGroup
            as="ul"
            className="toolkit-guides"
            stagger={duration.staggerTight}
            aria-label={content.guidesTitle}
          >
            {content.guides.map((guide) => (
              <RevealItem key={guide.href} as="li" variant="fadeUp">
                <Link href={guide.href} className="toolkit-guide motion-row">
                  <span className="toolkit-guide__title">{guide.title}</span>
                  <span className="toolkit-guide__dek">{guide.description}</span>
                  <span aria-hidden className="toolkit-guide__arrow">
                    →
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {content.categories.map((category, index) => {
        const chapterClass =
          index % 2 === 0 ? "chapter--studio" : "chapter--void";

        return (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`${category.id}-heading`}
            className={cn("chapter relative", chapterClass)}
          >
            <div className="shell relative py-16 md:py-32 lg:py-40">
              <Reveal
                variant="rise"
                when="chapter"
                className="mb-10 md:mb-14"
              >
                <ChapterLead
                  eyebrow={category.label}
                  headingId={`${category.id}-heading`}
                  title={category.title}
                  headingClassName="max-w-[22ch]"
                  dek={category.subtitle}
                />
              </Reveal>

              <RevealGroup
                as="ul"
                className="toolkit-tools"
                stagger={duration.staggerTight}
                aria-label={category.label}
              >
                {category.resources.map((tool) => (
                  <RevealItem key={tool.name} as="li" variant="fadeUp">
                    <a
                      href={tool.url}
                      className="toolkit-tool motion-row"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="toolkit-tool__head">
                        <h3 className="toolkit-tool__name">{tool.name}</h3>
                        <span
                          className={cn(
                            "toolkit-badge",
                            tool.badge === "Free" && "toolkit-badge--free",
                            tool.badge === "Free + Paid" &&
                              "toolkit-badge--hybrid",
                            tool.badge === "Paid" && "toolkit-badge--paid",
                          )}
                        >
                          {content.badgeLabels[tool.badge]}
                        </span>
                      </div>
                      <p className="toolkit-tool__dek">{tool.description}</p>
                      <span className="toolkit-tool__cta">
                        {content.visitToolLabel}
                        <span aria-hidden>↗</span>
                      </span>
                    </a>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>
        );
      })}

      <PageCTA
        title={content.meta.ctaTitle}
        copy={content.meta.ctaSubtitle}
        secondaryLabel="See services"
        secondaryHref="/services"
      />
    </main>
  );
}

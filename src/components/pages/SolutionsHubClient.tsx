"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import CTAArchetype from "@/components/ui/CTAArchetype";
import Card from "@/components/ui/Card";
import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import Section from "@/components/shared/services/Section";
import { solutions } from "@/content/registry/solutions";
import type { SolutionsHubContent } from "@/content/solutions-hub";
import { featureCardGridClass } from "@/lib/card-styles";

type Props = { content: SolutionsHubContent };

export default function SolutionsHubClient({ content: c }: Props) {
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: c.hero.label }]} />
      <HeroArchetype
        archetype="showcase"
        label={c.hero.label}
        headline={
          <>
            <span className="type-hero-line">{c.hero.headlineLine1}</span>
            <span className="type-hero-line gradient-text">{c.hero.headlineLine2}</span>
          </>
        }
        subtitle={c.hero.subtitle}
        ctaLabel={tCommon("bookStrategyCall")}
        ctaHref="/contact"
        secondaryCtaLabel={tCommon("getFreeAudit")}
        secondaryCtaHref="/lead-magnet"
      />

      <Section id="browse-solutions" surfaceIndex={0}>
        <div className="container-site">
          <SectionHeader
            badge={c.browse.badge}
            title={c.browse.title}
            description={c.browse.description}
            headingId="browse-solutions-heading"
          />
          <ul className={`section-content ${featureCardGridClass(3)}`}>
            {solutions.map((s) => (
              <li key={s.slug}>
                <Link href={`/solutions/${s.slug}`} className="group block h-full touch-manipulation">
                  <Card className="flex h-full flex-col">
                    <h3 className="card-heading transition-colors duration-200 group-hover:text-neon-cyan">
                      {s.title}
                    </h3>
                    <p className="mt-3 flex-1 type-body text-muted line-clamp-3">{s.metaDescription}</p>
                    <div className="mt-8 border-t border-strong pt-5">
                      <span className="inline-flex min-h-touch items-center gap-2 text-sm font-semibold text-neon-cyan">
                        {tNav("explore")}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CTAArchetype
        headline={c.cta.headline}
        subtitle={c.cta.subtitle}
        ctaLabel={tCommon("bookStrategyCall")}
        ctaHref="/contact"
      />
    </>
  );
}

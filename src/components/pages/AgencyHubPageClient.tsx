"use client";

import { Link } from "@/i18n/navigation";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import CardFamily from "@/components/ui/CardFamily";
import CTAArchetype from "@/components/ui/CTAArchetype";
import AgencyPositioningSection from "@/components/sections/AgencyPositioningSection";
import AgencyProcessSection from "@/components/sections/AgencyProcessSection";
import FAQSection from "@/components/sections/FAQSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import Button from "@/components/ui/Button";
import ProofMetric from "@/components/ui/ProofMetric";
import TextLink from "@/components/ui/TextLink";
import { getServiceExploreLabel } from "@/lib/service-explore-labels";
import type { AgencyHubContent } from "@/content/agency-hub";
import Section from "@/components/shared/services/Section";
type Props = { content: AgencyHubContent };

export default function AgencyHubPageClient({ content: c }: Props) {
  let surfaceIndex = 0;

  return (
    <>
      <AgencyPositioningSection positioning={c.positioning} outro={c.outro} surfaceIndex={surfaceIndex++} />

      <Section id="audiences" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <SectionHeader title={c.audiences.title} description={c.audiences.subtitle} headingId="audiences-heading" />
          <div className="section-content grid gap-grid-sm md:grid-cols-2">
            {c.audiences.segments.map((seg) => (
              <CardFamily key={seg.label} family="dashboard">
                <h3 className="card-heading">{seg.label}</h3>
                <p className="mt-4 type-body text-muted">{seg.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {seg.examples.map((ex) => (
                    <span key={ex} className="text-xs px-2.5 py-1 rounded-full border border-surface text-muted">{ex}</span>
                  ))}
                </div>
              </CardFamily>
            ))}
          </div>
          <div className="section-cta-row">
            <Button href="/industries" variant="secondary" fullWidthMobile>
              {c.audiences.viewAllLabel}
            </Button>
          </div>
        </div>
      </Section>

      <Section id="capabilities" variant="data" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <SectionHeader title={c.capabilities.title} description={c.capabilities.subtitle} />
          <div className="section-content grid gap-grid-sm md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            {c.capabilities.items.slice(0, 6).map((item) => (
              <Link key={item.href} href={item.href} className="group block h-full">
                <Card className="h-full flex flex-col hover:border-neon-cyan/30">
                  <h3 className="card-heading group-hover:text-neon-cyan transition-colors">{item.label}</h3>
                  <p className="mt-4 type-body text-muted flex-1">{item.description}</p>
                  <span className="mt-4 block">
                    <TextLink size="sm">{getServiceExploreLabel(item.href)}</TextLink>
                  </span>
                </Card>
              </Link>
            ))}
          </div>
          <div className="section-cta-row">
            <Button href="/services" variant="secondary" fullWidthMobile>
              {c.capabilities.viewAllLabel}
            </Button>
          </div>
        </div>
      </Section>

      <AgencyProcessSection process={c.process} surfaceIndex={surfaceIndex++} />

      <Section id="proof" variant="data" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <SectionHeader title={c.proof.title} description={c.proof.subtitle} />
          <div className="section-content grid gap-grid-sm md:grid-cols-4">
            {c.proof.metrics.map((m) => (
              <ProofMetric key={m.label} value={m.value} label={m.label} />
            ))}
          </div>
          <div className="section-cta-row">
            <Button href="/case-studies" variant="secondary" fullWidthMobile>
              {c.proof.viewAllLabel}
            </Button>
          </div>
        </div>
      </Section>

      <FAQSection items={c.faqs} surfaceIndex={surfaceIndex++} />

      <RelatedLinks
        industryLinks={[
          { href: "/industries/technology/saas", label: "SaaS Marketing" },
          { href: "/industries/home-services/hvac", label: "HVAC Marketing" },
          { href: "/industries/professional-services/law-firms", label: "Law Firm Marketing" },
        ]}
        solutionLinks={[
          { href: "/solutions/saas-marketing-agency", label: "SaaS Marketing Agency" },
          { href: "/solutions/seo-for-hvac-companies", label: "SEO for HVAC" },
        ]}
        blogLinks={[
          { href: "/blog/technical-seo-fundamentals", label: "Technical SEO Guide" },
          { href: "/blog/roas-calculations", label: "ROAS Calculations" },
        ]}
        surfaceIndex={surfaceIndex++}
      />

      <CTAArchetype archetype="story" headline={c.cta.headline} subtitle={c.cta.subtitle} ctaLabel={c.cta.ctaLabel} ctaHref="/contact" />
    </>
  );
}

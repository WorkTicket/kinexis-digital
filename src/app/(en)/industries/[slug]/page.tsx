import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustry, relatedIndustries, type FeatureKey, type Industry } from "@/data/industries";
import { INDUSTRY_FEATURES_EN } from "@/data/industry-features";
import { getProject, portfolioFile } from "@/data/portfolio";
import { contentMetadata } from "@/lib/seo";
import { ReviewRail } from "@/components/HomeBands";
import IndustryHeroArt from "@/components/IndustryHeroArt";
import IndustryIncludes, { industryFeatureBody } from "@/components/IndustryIncludes";
import { ContentSchema } from "@/components/JsonLd";
import IndustryGrid from "@/components/IndustryGrid";
import PlanOffer from "@/components/PlanOffer";
import { ShotFrame } from "@/components/ShotFrame";
import { CtaBand, Faq, HL, PageHero, Section } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return { title: "Industry Not Found", robots: { index: false, follow: false } };
  return contentMetadata({
    path: `/industries/${industry.slug}`,
    title: industry.metaTitle,
    description: industry.metaDescription,
    absolute: true,
  });
}

function featureText(industry: Industry, key: FeatureKey) {
  return industryFeatureBody(industry, key, INDUSTRY_FEATURES_EN[key].text);
}

function articleFor(name: string) {
  return /^(hvac|electrical)$/i.test(name) ? "an" : "a";
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();
  const project = industry.projectSlug ? getProject(industry.projectSlug) : undefined;
  const path = `/industries/${industry.slug}`;
  const related = relatedIndustries(industry);
  const callsTitle = `The Calls ${industry.name} Businesses Get`;
  const includesTitle = `What Your ${industry.name} Website Includes`;
  const textBackTitle = `Missed-Call Text-Back for ${industry.name}`;
  const faqTitle = `FAQs for ${industry.name} Owners`;

  return (
    <>
      <ContentSchema
        path={path}
        title={industry.metaTitle}
        description={industry.metaDescription}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path },
        ]}
        faqs={industry.faqs}
        serviceType={`${industry.name} website design`}
      />
      <PageHero
        eyebrow="Industries"
        h1={industry.h1}
        mark={industry.mark}
        sub={industry.sub}
        className={`industry-hero industry-hero--${industry.slug}`}
        art={<IndustryHeroArt slug={industry.slug} alt={industry.heroAlt} />}
      >
        <div className="industry-hero__intro">
          <p>{industry.intro[0]}</p>
          <p>{industry.intro[1]}</p>
        </div>
        <p className="btn-row">
          <Link className="btn btn--primary" href="/contact" prefetch={false}>Get My Free Preview</Link>
          <Link className="btn btn--ghost" href="/pricing" prefetch={false}>See Plans &amp; Pricing</Link>
        </p>
        <p className="muted small">60-Day Lead Guarantee · $0 down · Free preview in 2 business days</p>
      </PageHero>

      <Section tint>
        <h2 className="center"><HL text={callsTitle} mark={industry.name} /></h2>
        <p className="center muted industry-section-lead">These are the searches and jobs {industry.name.toLowerCase()} owners need the site to handle clearly.</p>
        <ReviewRail
          numbersOnly
          steps={industry.services.map((point, index) => ({
            n: String(index + 1),
            title: point.title,
            text: point.text,
          }))}
        />
        <p className="center muted industry-problems-label">{industry.problemsTitle}</p>
        <div className="industry-problems">
          {industry.problems.map((point) => (
            <article className="industry-problems__item" key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section accent={`/assets/industries/${industry.slug}/section-accent.svg`}>
        <h2 className="center"><HL text={includesTitle} mark="Website Includes" /></h2>
        {project ? (
          <div className="media-split industry-screens">
            <div className="media-split__copy">
              <h3>Works on every screen</h3>
              <p>The site is laid out for a phone in the driveway and a laptop on the desk. The number, the form and the service area stay usable without pinching or scrolling sideways.</p>
            </div>
            <div className="screen-art">
              <img
                className="screen-art__img"
                src={portfolioFile(`/portfolio/${project.slug}-devices-sm.webp`)}
                alt={`${project.name} website on a desktop monitor, laptop, tablet, and phone`}
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
            </div>
          </div>
        ) : (
          <div className="industry-screens-lead">
            <h3>Works on every screen</h3>
            <p>The site is laid out for a phone in the driveway and a laptop on the desk. The number, the form and the service area stay usable without pinching or scrolling sideways.</p>
          </div>
        )}
        <IndustryIncludes
          features={industry.features}
          copy={INDUSTRY_FEATURES_EN}
          featureText={(key) => featureText(industry, key)}
        />
      </Section>

      <Section tint>
        <h2 className="center"><HL text={textBackTitle} mark="Text-Back" /></h2>
        <p className="center muted" style={{ maxWidth: "42rem", marginInline: "auto" }}>
          When a {industry.name.toLowerCase()} crew is on a job and misses a call, Lead System and Plus send an automatic text-back on your tracking number. After the work is done, a Google review request goes out with a direct link to your profile.
        </p>
        <p className="center btn-row spaced">
          <Link className="btn btn--primary" href="/contact" prefetch={false}>Get My Free Preview</Link>
          <Link className="btn btn--ghost" href="/pricing#lead-system" prefetch={false}>See the Lead System</Link>
        </p>
      </Section>

      {project && (
        <Section>
          <div className="media-split">
            <div className="media-split__copy">
              <h2><HL text={`See ${articleFor(industry.slug)} ${industry.name} Website Template`} mark="Website Template" /></h2>
              <p>
                Like the <Link href={`/portfolio/${project.slug}`} prefetch={false}>{project.name}</Link> design? Use it as the starting point for your website, and we’ll customize it around your services, brand, and customers.
              </p>
              <p className="btn-row"><Link className="btn btn--ghost" href={`/portfolio/${project.slug}`} prefetch={false}>View the Template</Link></p>
            </div>
            <ShotFrame project={project} href={`/portfolio/${project.slug}`} label={`View the ${project.name} website`} />
          </div>
        </Section>
      )}

      <Section id="plans">
        <PlanOffer />
      </Section>

      <Section tint narrow>
        <h2 className="center"><HL text={faqTitle} mark="Owners" /></h2>
        <Faq items={[...industry.faqs]} />
      </Section>

      <Section>
        <h2 className="center"><HL text="Other Trades We Build For" mark="Other Trades" /></h2>
        <IndustryGrid industries={related} />
        <p className="center btn-row spaced"><Link className="btn btn--ghost" href="/industries" prefetch={false}>All Industries</Link></p>
      </Section>

      <CtaBand
        h="Get Your Free Preview"
        mark="Free Preview"
        sub={`See ${articleFor(industry.name)} ${industry.name.toLowerCase()} homepage before you pay. Free preview, no card, and no obligation.`}
        btn="Get My Free Preview"
        href="/contact"
        secondary="See Plans & Pricing"
        secondaryHref="/pricing"
      />
    </>
  );
}

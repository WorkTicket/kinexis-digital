import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustry, relatedIndustries, type FeatureKey, type Industry } from "@/data/industries";
import { getProject, portfolioFile } from "@/data/portfolio";
import { imageVariant, still } from "@/lib/image-sources";
import { contentMetadata } from "@/lib/seo";
import { kitSrc } from "@/lib/site";
import { ContentSchema } from "@/components/JsonLd";
import IndustryGrid from "@/components/IndustryGrid";
import PlanOffer from "@/components/PlanOffer";
import { ShotFrame } from "@/components/ShotFrame";
import { CtaBand, Faq, HL, IconCard, PageHero, Section } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

/* These headings sit on a line break. Fallback tracking keeps that break when the real face arrives. */
const HERO_TRACK: Record<string, { mobile?: string; desktop?: string }> = {
  painting: { mobile: "-0.015em" },
  "pressure-washing": { desktop: "-0.03em" },
  "yard-care": { desktop: "-0.03em" },
};

const FEATURES: Record<FeatureKey, { title: string; text: string; icon: string }> = {
  calls: {
    title: "Make It Easy to Call",
    text: "Click-to-call and a phone number that stays visible while someone is deciding.",
    icon: "calls",
  },
  "quote-requests": {
    title: "Capture Quote Requests",
    text: "An enquiry form that asks for the job details you need, and nothing you do not.",
    icon: "quote-requests",
  },
  reviews: {
    title: "Build Customer Confidence",
    text: "On Lead System and Plus, a review request goes out after the job with a direct link to your Google profile.",
    icon: "reviews",
  },
  bookings: {
    title: "Support Bookings",
    text: "A straight way to ask for a recurring visit, a route slot, or the next opening.",
    icon: "bookings",
  },
  "service-area": {
    title: "Show Where You Work",
    text: "",
    icon: "service-area",
  },
};

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
  return industry.featureText?.[key] ?? (key === "service-area" ? industry.serviceArea : FEATURES[key].text);
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
  const heroFile = `/assets/industries/${industry.slug}/hero.webp`;
  const hero = still(heroFile);
  const heroMobile = imageVariant(heroFile, 768, "webp");
  const heroAvif = `${imageVariant(heroFile, 768, "avif")} 768w, ${still(heroFile.replace(".webp", ".avif"))} 1536w`;
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
        fallbackTrack={HERO_TRACK[industry.slug]}
        className={`industry-hero industry-hero--${industry.slug}`}
        art={(
          <picture>
            <source type="image/avif" srcSet={heroAvif} sizes="(max-width: 860px) 86vw, 620px" />
            <source media="(min-width: 861px)" srcSet={`${heroMobile} 768w, ${hero} 1536w`} sizes="620px" />
            <img
              className="hero-art industry-hero__img"
              src={heroMobile}
              srcSet={`${heroMobile} 768w, ${hero} 1536w`}
              sizes="(max-width: 860px) 86vw, 620px"
              alt={industry.heroAlt}
              width={1536}
              height={1024}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        )}
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
        <p className="center muted">These are the searches and jobs {industry.name.toLowerCase()} owners need the site to handle clearly.</p>
        <div className="grid grid--3">
          {industry.services.map((point) => (
            <IconCard
              key={point.title}
              title={point.title}
              text={point.text}
              iconClass="icon--service"
              src={kitSrc(`/assets/industries/${industry.slug}/icons/${point.icon}.svg`)}
            />
          ))}
        </div>
        <p className="center muted" style={{ marginTop: "1.5rem" }}>{industry.problemsTitle}</p>
        <div className="grid grid--3">
          {industry.problems.map((point) => (
            <IconCard
              key={point.title}
              title={point.title}
              text={point.text}
              iconClass="icon--problem"
              src={kitSrc(`/assets/kinexis/icons/industries/${industry.slug}/${point.icon}.svg`)}
            />
          ))}
        </div>
      </Section>

      <Section accent={`/assets/industries/${industry.slug}/section-accent.svg`}>
        <h2 className="center"><HL text={includesTitle} mark="Website Includes" /></h2>
        <div className="media-split industry-screens">
          <div className="media-split__copy">
            <h3>Works on every screen</h3>
            <p>The site is laid out for a phone in the driveway and a laptop on the desk. The number, the form and the service area stay usable without pinching or scrolling sideways.</p>
          </div>
          <div className="screen-art">
            <img
              className="screen-art__img"
              src={project ? portfolioFile(`/portfolio/${project.slug}-devices-sm.webp`) : "/assets/shared/responsive-design.svg"}
              alt={project ? `${project.name} website on a desktop monitor, laptop, tablet, and phone` : `A ${industry.name.toLowerCase()} website shown on a desktop monitor, laptop, tablet, and phone`}
              width={project ? 1536 : 680}
              height={project ? 1024 : 400}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          </div>
        </div>
        <div className="feature-grid">
          {industry.features.map((key) => (
            <IconCard
              key={key}
              title={FEATURES[key].title}
              text={featureText(industry, key)}
              src={kitSrc(`/assets/shared/icons/${FEATURES[key].icon}.svg`)}
            />
          ))}
        </div>
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
                Like the <Link href={`/portfolio/${project.slug}`} prefetch={false}>{project.name}</Link> design? Choose this professionally designed template as the starting point for your website, and we’ll customize it around your services, brand, and customers.
              </p>
              <p className="btn-row"><Link className="btn btn--ghost" href={`/portfolio/${project.slug}`} prefetch={false}>View the Template</Link></p>
            </div>
            <ShotFrame project={project} href={`/portfolio/${project.slug}`} label={`View the ${project.name} website template`} />
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

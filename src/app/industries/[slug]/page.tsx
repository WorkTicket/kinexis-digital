import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustry, relatedIndustries, type FeatureKey, type Industry } from "@/data/industries";
import { getProject, portfolioFile } from "@/data/portfolio";
import { contentMetadata } from "@/lib/seo";
import { kitSrc } from "@/lib/site";
import { ContentSchema } from "@/components/JsonLd";
import IndustryGrid from "@/components/IndustryGrid";
import IndustryAudit from "@/components/IndustryAudit";
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
  });
}

function featureText(industry: Industry, key: FeatureKey) {
  return industry.featureText?.[key] ?? (key === "service-area" ? industry.serviceArea : FEATURES[key].text);
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();
  const project = getProject(industry.projectSlug);
  const path = `/industries/${industry.slug}`;
  const related = relatedIndustries(industry);
  const hero = `/assets/industries/${industry.slug}/hero.webp`;
  const heroMobile = `/assets/industries/${industry.slug}/hero-768.webp`;

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
        className="industry-hero"
        art={(
          <picture>
            <source type="image/avif" srcSet={`${heroMobile.replace(".webp", ".avif")} 768w, ${hero.replace(".webp", ".avif")} 1536w`} sizes="(max-width: 860px) 86vw, 620px" />
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
          <Link className="btn btn--primary" href="/audit" prefetch={false}>Get a Free Audit</Link>
          <Link className="btn btn--ghost" href="/pricing" prefetch={false}>See Plans &amp; Pricing</Link>
        </p>
      </PageHero>

      <Section tint>
        <h2 className="center"><HL text={industry.problemsTitle} mark={industry.problemsMark} /></h2>
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
        <h2 className="center"><HL text={industry.servicesTitle} mark={industry.servicesMark} /></h2>
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
      </Section>

      <Section tint>
        <div className="media-split industry-screens">
          <div className="media-split__copy">
            <h2><HL text="Works on Every Screen" mark="Every Screen" /></h2>
            <p>The site is laid out for a phone in the driveway and a laptop on the desk. The number, the form and the service area stay usable without pinching or scrolling sideways.</p>
          </div>
          <div className="screen-art">
            <img
              className="screen-art__img"
              src={project ? portfolioFile(`/portfolio/${project.slug}-devices-sm.webp`) : "/assets/shared/responsive-design.svg"}
              alt={project ? `${project.name} website on a desktop monitor, laptop, tablet, and phone` : "A website shown on a desktop monitor, laptop, tablet, and phone"}
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

      {project && (
        <Section>
          <div className="media-split">
            <div className="media-split__copy">
              <h2><HL text={`${/^(hvac|electrical)$/i.test(industry.slug) ? "An" : "A"} ${industry.name} Layout, In Practice`} mark="In Practice" /></h2>
              <p>
                See <Link href={`/portfolio/${project.slug}`} prefetch={false}>{project.name}</Link> for the kind of {project.trade.toLowerCase()} page we build: the jobs up front, and a next step that matches the call.
              </p>
              <p className="btn-row"><Link className="btn btn--ghost" href={`/portfolio/${project.slug}`} prefetch={false}>View the Project</Link></p>
            </div>
            <ShotFrame project={project} href={`/portfolio/${project.slug}`} label={`View ${project.name}`} />
          </div>
        </Section>
      )}

      <IndustryAudit />

      <Section id="plans">
        <PlanOffer />
      </Section>

      <Section tint narrow>
        <h2 className="center"><HL text={`${industry.name} Questions`} mark="Questions" /></h2>
        <Faq items={[...industry.faqs]} />
      </Section>

      <Section>
        <h2 className="center"><HL text="Other Trades We Build For" mark="Other Trades" /></h2>
        <IndustryGrid industries={related} />
        <p className="center btn-row spaced"><Link className="btn btn--ghost" href="/industries" prefetch={false}>All Industries</Link></p>
      </Section>

      <CtaBand
        h={`See ${/^(hvac|electrical)/i.test(industry.name) ? "an" : "a"} ${industry.name} Homepage Before You Pay`}
        mark="Before You Pay"
        sub="Free preview, no card and no obligation. Then pick Website, Lead System, Plus or Own It."
        btn="Get a Free Audit"
        href="/audit"
      />
    </>
  );
}

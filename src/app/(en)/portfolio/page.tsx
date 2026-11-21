import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PROJECTS, portfolioCardFile, portfolioCardSrcSet } from "@/data/portfolio";
import { CASE_STUDIES } from "@/data/caseStudies";
import { LIVE_SITES } from "@/data/liveSites";
import ProjectCard from "@/components/ProjectCard";
import { DeferredImg } from "@/components/DeferredImg";
import { PageSchema } from "@/components/JsonLd";
import ReviewsSection from "@/components/ReviewsSection";
import PlanCompare from "@/components/PlanCompare";
import { CtaBand, Faq, HL, PageHero, Section } from "@/components/ui";
import { IMAGE_SIZES } from "@/lib/image-sources";

export const metadata = pageMetadata("portfolio");

const PORTFOLIO_FAQS = [
  {
    q: "What's the difference between a template site and a custom site?",
    a: "Both are built for calls and clarity. A template direction is a starting point we customize for your services, colors, and calls to action. If you want something fully unique, share the look you like and we design it into your free homepage preview — no custom-design add-on charge for a standard website.",
  },
  {
    q: "Can you build me a fully custom site?",
    a: "Yes. Start with any plan, share the direction you want, and we prepare a free homepage preview around that look. As long as it is a website build, custom design is included — not a separate upgrade fee.",
  },
  {
    q: "If I show you a website I love, can you make something similar?",
    a: "Yes. Share the examples you like and we prepare a free homepage preview for your business in that direction.",
  },
] as const;

function siteHost(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function Page() {
  return (
    <>
      <PageSchema page="portfolio" />
      <PageHero
        className="portfolio-hero"
        eyebrow="Websites for local service businesses"
        h1="Explore Our Design Work"
        mark="Design Work"
        sub="Live client websites are listed first. Browse the examples, then tell us what you like. We’ll use that direction to shape a preview for your business and make it easy for customers to call or request a quote."
        image="portfolio"
        imageAlt="Service business websites shown on desktop and phone screens"
      >
        <div className="btn-row spaced">
          <Link className="btn btn--primary btn--lg" href="/contact" prefetch={false}>Get My Free Preview</Link>
          <Link className="btn btn--ghost btn--lg" href="/pricing" prefetch={false}>View The Four Plans</Link>
        </div>
        <p className="muted small trust">Designs for garage doors, roofing, electrical, cleaning, and other local services.</p>
      </PageHero>

      <Section>
        <div className="showcase__head">
          <div>
            <p className="eyebrow">Live Sites</p>
            <h2><HL text="Client Websites" mark="Websites" /></h2>
            <p className="muted">Open any live site to see the finished homepage, or read the verified case study.</p>
          </div>
        </div>
        <div className="portfolio--live">
          {LIVE_SITES.map((site, index) => {
            const host = siteHost(site.url);
            const study = CASE_STUDIES.find((item) => item.liveSiteSlug === site.slug);
            return (
              <div key={site.slug} className="live-site-wrap">
                <a className="live-site" href={site.url} target="_blank" rel="noopener noreferrer">
                  <div className="shot shot--static" data-name={site.name}>
                    <div className="shot__page">
                      <div className="shot__track">
                        <DeferredImg
                          src={study ? study.heroImage.replace("1322w", "640w") + "?v=1" : portfolioCardFile(site.image, 400)}
                          srcSet={study
                            ? `${study.heroImage.replace("1322w", "640w")}?v=1 640w, ${study.heroImage}?v=1 ${study.heroWidth}w`
                            : portfolioCardSrcSet(site.image)}
                          sizes={IMAGE_SIZES.portfolioCard}
                          alt=""
                          width={study?.heroWidth ?? 400}
                          height={study?.heroHeight ?? 300}
                          className="shot__img"
                          eager={index === 0}
                        />
                      </div>
                    </div>
                    <span className="btn btn--primary shot__cta-overlay" aria-hidden="true">Visit Site</span>
                  </div>
                  <span className="live-site__copy">
                    <span className="live-site__status"><span className="live-site__dot" aria-hidden="true" />Live</span>
                    <span className="live-site__id">
                      <span className="live-site__name">{site.name}</span>
                      <span className="live-site__meta">
                        <span>{site.trade}</span>
                        <span className="live-site__host">{host}</span>
                      </span>
                    </span>
                    <span className="btn btn--ghost btn--sm live-site__go">Visit site</span>
                  </span>
                </a>
                {study ? (
                  <Link className="trust-mark live-site__case" href={`/case-studies/${study.slug}`} prefetch={false}>
                    Read case study →
                  </Link>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="showcase__head showcase__head--follow">
          <div>
            <p className="eyebrow">Template sites</p>
            <h2><HL text="Websites Made for Your Business" mark="Your Business" /></h2>
            <p className="muted">Choose a design direction you like. We’ll tailor the pages, wording, and next steps to your services and service area.</p>
          </div>
          <Link className="trust-mark" href="/contact" prefetch={false}>Ask us about a design</Link>
        </div>
        <div className="portfolio portfolio--main">
          {PROJECTS.map((project) => (
            <article key={project.slug} className="work-card">
              <ProjectCard
                project={project}
                label={`View the ${project.name} website`}
                ctaLabel="View This Project"
                scrollOnHover={false}
              />
              <div className="work-card__meta">
                <h3>{project.trade}</h3>
                <p className="muted small">{project.name}</p>
                <Link className="btn btn--ghost btn--sm" href={`/portfolio/${project.slug}`} prefetch={false}>
                  View This Project
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <ReviewsSection
        limit={3}
        eyebrow="Client reviews"
        title="What Our Clients Say"
        mark="Our Clients Say"
        sub="Real feedback from owners who launched with a Kinexis website plan."
      />

      <Section tint>
        <PlanCompare />
      </Section>

      <Section narrow>
        <h2 className="center">Frequently Asked Design Questions</h2>
        <Faq items={[...PORTFOLIO_FAQS]} />
      </Section>

      <CtaBand h="See What Your Website Could Look Like" mark="Your Website" sub="Tell us about your business and we’ll prepare a free homepage preview." btn="Get My Free Preview" />
    </>
  );
}

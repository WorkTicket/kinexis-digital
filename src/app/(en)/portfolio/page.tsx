import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PROJECTS, portfolioFile } from "@/data/portfolio";
import { LIVE_SITES } from "@/data/liveSites";
import ProjectCard from "@/components/ProjectCard";
import { DeferredImg } from "@/components/DeferredImg";
import { PageSchema } from "@/components/JsonLd";
import ReviewsSection from "@/components/ReviewsSection";
import { Compare, CtaBand, Faq, HL, PageHero, Section } from "@/components/ui";

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
        sub="Live client websites are listed first. Browse our work further down and we’ll customize a direction for your business, from the first screen to the quote path."
        image="portfolio"
        imageAlt="Service business websites shown on desktop and phone screens"
      >
        <div className="btn-row spaced">
          <Link className="btn btn--primary btn--lg" href="/contact" prefetch={false}>See My Homepage First</Link>
          <Link className="btn btn--ghost btn--lg" href="/pricing" prefetch={false}>View The Four Plans</Link>
        </div>
        <p className="muted small trust">Designs for garage doors, roofing, electrical, cleaning, and other local services.</p>
      </PageHero>

      <Section>
        <div className="showcase__head">
          <div>
            <p className="eyebrow">Live Sites</p>
            <h2><HL text="Client Websites" mark="Websites" /></h2>
            <p className="muted">Open any live site to see the finished homepage.</p>
          </div>
        </div>
        <div className="portfolio--live">
          {LIVE_SITES.map((site) => {
            const shot = portfolioFile(site.image, 640);
            const host = siteHost(site.url);
            return (
              <a key={site.slug} className="live-site" href={site.url} target="_blank" rel="noopener noreferrer">
                <div className="shot shot--static" data-name={site.name}>
                  <div className="shot__page">
                    <div className="shot__track">
                      <DeferredImg
                        src={shot}
                        sizes="(max-width: 960px) 92vw, 380px"
                        alt=""
                        width={640}
                        height={Math.round((site.height * 640) / site.width)}
                        className="shot__img"
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
                  <span className="live-site__go">
                    Visit site
                    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                      <path d="M4.5 11.5 11.5 4.5M6.5 4.5h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </a>
            );
          })}
        </div>

        <div className="showcase__head showcase__head--follow">
          <div>
            <p className="eyebrow">Template sites</p>
            <h2><HL text="Websites Made for Your Business" mark="Your Business" /></h2>
            <p className="muted">Choose a look you like and we’ll tailor the design, content, services, and calls to action for your business.</p>
          </div>
          <Link className="trust-mark" href="/contact" prefetch={false}>Reach out to see more</Link>
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
        title="Reviews From Our Awesome Clients"
        mark="Awesome Clients"
        sub="Real feedback from owners who launched with a Kinexis website plan."
      />

      <Section tint>
        <h2 className="center"><HL text="Why Business Owners Choose Kinexis Over Freelancers and Agencies" mark="Over Freelancers and Agencies" /></h2>
        <p className="center muted">A clearer plan than hiring a freelancer or a full web design agency for a small business.</p>
        <Compare />
        <p className="center muted small">Typical offerings; individual providers vary.</p>
      </Section>

      <Section narrow>
        <h2 className="center"><HL text="Frequently Asked Design Questions" mark="Design Questions" /></h2>
        <Faq items={[...PORTFOLIO_FAQS]} />
      </Section>

      <CtaBand h="Want To See A Direction For Your Site?" mark="Your Site" sub="Tell us about your business and we’ll prepare a free homepage preview for your business." btn="Get My Free Preview" />
    </>
  );
}

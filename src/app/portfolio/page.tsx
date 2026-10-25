import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PROJECTS, portfolioFile } from "@/data/portfolio";
import { LIVE_SITES } from "@/data/liveSites";
import ProjectCard from "@/components/ProjectCard";
import { DeferredImg } from "@/components/DeferredImg";
import { PageSchema } from "@/components/JsonLd";
import { CtaBand, HL, PageHero, Section } from "@/components/ui";

export const metadata = pageMetadata("portfolio");

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
      <PageSchema page="portfolio" items={PROJECTS.filter((project) => !project.placeholder).map((project) => ({ name: project.name, path: `/portfolio/${project.slug}` }))} />
      <PageHero
        className="portfolio-hero"
        eyebrow="Website templates for local service businesses"
        h1="Explore Our Design Work"
        mark="Design Work"
        sub="Choose a website template you like and we’ll customize it for your business, from the first screen to the quote path. Live client websites are listed separately below."
        image="portfolio"
        imageAlt="Trade websites shown on desktop and phone screens"
      >
        <div className="btn-row spaced">
          <Link className="btn btn--primary btn--lg" href="/contact" prefetch={false}>See My Homepage First</Link>
          <Link className="btn btn--ghost btn--lg" href="/pricing" prefetch={false}>View The Four Plans</Link>
        </div>
        <p className="muted small trust">Professionally designed templates for pool care, HVAC, plumbing, roofing, and other local trades.</p>
      </PageHero>

      <Section>
        <div className="container">
          <div className="showcase__head">
            <div>
              <p className="eyebrow">Choose your starting design</p>
              <h2><HL text="Professionally Designed Website Templates" mark="Website Templates" /></h2>
              <p className="muted">Choose a template you like and we’ll tailor the design, content, services, and calls to action for your business. Hover or tap a screenshot to view the full template.</p>
            </div>
            <Link className="link-btn" href="/contact" prefetch={false}>Reach out to see more</Link>
          </div>
          <div className="portfolio portfolio--main">
            {PROJECTS.map((project) => <ProjectCard key={project.slug} project={project} label={`View the ${project.name} template`} ctaLabel="View This Template" scrollOnHover={false} />)}
          </div>

          <div className="showcase__head showcase__head--follow">
            <div>
              <p className="eyebrow">Live Sites</p>
              <h2><HL text="Client Websites" mark="Websites" /></h2>
              <p className="muted">Hover a screenshot to scroll the page, or open the live site.</p>
            </div>
          </div>
          <div className="portfolio--live">
            {LIVE_SITES.map((site) => {
              const shot = portfolioFile(site.image, 640);
              const full = portfolioFile(site.image);
              const host = siteHost(site.url);
              return (
                <a key={site.slug} className="live-site" href={site.url} target="_blank" rel="noopener noreferrer">
                  <div className="shot" data-name={site.name}>
                    <div className="shot__page">
                      <div className="shot__track">
                        <DeferredImg
                          src={shot}
                          srcSet={`${shot} 640w, ${full} 1100w`}
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
        </div>
      </Section>

      <CtaBand h="Want To See A Direction For Your Site?" mark="Your Site" sub="Tell us about your trade and we’ll prepare a free homepage preview for your business." btn="Get My Free Preview" />
    </>
  );
}

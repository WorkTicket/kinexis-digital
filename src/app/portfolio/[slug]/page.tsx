import type { Metadata } from "next";
import Link from "next/link";
import { DeferredImg } from "@/components/DeferredImg";
import { notFound } from "next/navigation";
import { getProject, portfolioDeviceFile, portfolioFile, PROJECTS } from "@/data/portfolio";
import { getProjectDetail } from "@/data/projectDetails";
import { contentMetadata, clipDescription } from "@/lib/seo";
import { ProjectSchema } from "@/components/JsonLd";
import SafeImage from "@/components/SafeImage";
import ProjectCard from "@/components/ProjectCard";
import ReviewsSection from "@/components/ReviewsSection";
import PricingCta from "@/components/PricingCta";
import { HL, fallbackTrack } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.placeholder) return { title: "Project Not Found", robots: { index: false, follow: false } };
  const detail = getProjectDetail(slug);
  const description = clipDescription(detail?.about?.[0] ?? `Web design by Kinexis Digital for ${project.name}, a ${project.trade.toLowerCase()} business in the United States.`);
  return contentMetadata({
    path: `/portfolio/${project.slug}`,
    title: `${project.name} Website Template`,
    description,
    image: portfolioFile(project.image),
    imageAlt: `${project.name} website design`,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.placeholder) notFound();
  const detail = getProjectDetail(slug);
  const related = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 5);
  const h1Track = fallbackTrack({
    "liftline-garage-doors": "-0.015em",
    "happy-yard": "-0.015em",
  }[slug]);
  const eyebrowTrack = fallbackTrack(slug === "happy-yard" ? "0.07em" : undefined);
  const h2Track = fallbackTrack({
    "brush-and-co": "-0.015em",
    "oak-and-form": "-0.025em",
    "rinseworks": "-0.015em",
    "happy-yard": "-0.025em",
  }[slug]);
  const aboutTrack = fallbackTrack({
    "happy-yard": "-0.015em",
    "oak-and-form": "-0.02em",
  }[slug]);

  return (
    <article className="project-page">
      <ProjectSchema
        name={project.name}
        description={detail?.about?.[0] ?? `A Kinexis Digital website template for ${project.name}.`}
        path={`/portfolio/${project.slug}`}
        image={portfolioFile(project.image)}
        trade={project.trade}
      />
      {/* 1. Title */}
      <header className="page-hero project-hero">
        <div className="container center">
          <p className={`eyebrow${eyebrowTrack ? ` ${eyebrowTrack.className}` : ""}`} style={eyebrowTrack?.style}>Website template · {project.trade}</p>
          <h1 className={h1Track?.className} style={h1Track?.style}><HL text={`A Website Template For ${project.name}`} mark={project.name} /></h1>
          <p className="muted lead">Like this design? Choose it as the starting point for your website and we’ll customize the content, services, colors, and calls to action for your business.</p>
        </div>
      </header>

      {/* 2. About */}
      <section className="section">
        <div className="container container--narrow prose project-about">
          <h2 className={h2Track?.className} style={h2Track?.style}><HL text={`Inside The ${project.name} Template`} mark={project.name} /></h2>
          {(detail?.about ?? [`A professionally designed website template for a ${project.trade.toLowerCase()} business.`]).map((paragraph, index) => (
            <p key={paragraph.slice(0, 48)} className={index === 1 ? aboutTrack?.className : undefined} style={index === 1 ? aboutTrack?.style : undefined}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* 3. PageSpeed scores (optional) */}
      {detail?.pagespeedImage && (
        <section className="section section--tint project-media-section">
          <div className="container container--narrow">
            <div className="section-head center">
              <p className="eyebrow">Built for performance</p>
              <h2><HL text="Professionally Optimized For Speed" mark="Optimized For Speed" /></h2>
              <p className="muted">The {project.name} template is professionally optimized for fast loading, responsive performance, and a strong experience across mobile and desktop. The Google PageSpeed Insights results below show that performance is part of the build from the beginning—not an afterthought.</p>
            </div>
            <SafeImage
              src={detail.pagespeedImage}
              width={1200}
              height={420}
              alt={`${project.name} Google PageSpeed Insights scores`}
              className="project-media"
              sizes="(max-width: 800px) 100vw, 800px"
              fallbackLabel="PageSpeed scores coming soon"
            />
          </div>
        </section>
      )}

      {/* 4. Full-page screenshot + live site button */}
      <section className="section project-shot-section">
        <div className="container container--narrow">
          <div className="section-head center">
            <p className="eyebrow">Full homepage preview</p>
            <h2><HL text={`Explore The Full ${project.name} Template`} mark={project.name} /></h2>
            <p className="muted">See the complete homepage template from the opening hero through the services, trust-building content, process, and quote path. Every section is designed to help a {project.trade.toLowerCase()} business look professional and turn more visitors into qualified leads.</p>
          </div>
          <SafeImage
            src={portfolioFile(project.image)}
            srcSet={`${portfolioFile(project.image, 640)} 640w, ${portfolioFile(project.image)} 1100w`}
            alt={`${project.name} website design`}
            width={project.width}
            height={project.height}
            sizes="(max-width: 800px) 100vw, 800px"
            className="project-media"
            fallbackLabel={`${project.name} screenshot coming soon`}
          />
          {detail?.liveUrl && (
            <p className="center">
              <a className="btn btn--primary btn--lg" href={detail.liveUrl} target="_blank" rel="noopener noreferrer">
                Go To The {project.name} Website
              </a>
            </p>
          )}
        </div>
      </section>

      {/* 5-6. Devices and the audit CTA share a tinted block, so the gray runs
          from the devices section straight into the blue audit band. */}
      <div className="project-devices-block">
        <section className="section section--tint project-devices">
          <div className="container container--narrow center">
            <h2>
              <HL text="Looks Great On All Devices" mark="All Devices" />
              <DeferredImg
                className="devices-arrow"
                src="/assets/brand/cobalt-brushstroke-arrow-sm.webp"
                alt=""
                width={480}
                height={480}
              />
            </h2>
            <div className="devices-wrapper">
              <SafeImage
                src={portfolioDeviceFile(project.deviceImage, 768)}
                srcSet={`${portfolioDeviceFile(project.deviceImage, 768)} 768w, ${portfolioDeviceFile(project.deviceImage)} 1536w`}
                width={1536}
                height={1024}
                alt={`${project.name} website shown on a desktop monitor, laptop, tablet, and phone`}
                className="project-media project-devices-image"
                sizes="(max-width: 800px) 100vw, 800px"
                fallbackLabel="Device preview coming soon"
              />
            </div>
          </div>
        </section>

        {/* Free site audit */}

      </div>

      {/* 7. Other projects */}
      <section className="section project-related">
        <div className="container">
          <h2 className="center"><HL text="Other Templates You Might Like" mark="You Might Like" /></h2>
          <div className="portfolio portfolio--related">
            {related.map((item) => (
              <ProjectCard
                key={item.slug}
                project={item}
                label={`View the ${item.name} template`}
                ctaLabel="View This Template"
              />
            ))}
          </div>
          <p className="center">
            <Link className="btn btn--ghost" href="/portfolio" prefetch={false}>See More Of Our Portfolio</Link>
          </p>
        </div>
      </section>

      {/* 8. Reviews */}
      <ReviewsSection />

      {/* 9. $195/mo offer */}
      <PricingCta />
    </article>
  );
}

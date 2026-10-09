import { SitePreview } from "@/components/home/SitePreview";
import { Button } from "@/components/ui/Button";
import { MediaReveal, Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export type WorkStudyProps = {
  href: string;
  client: string;
  industry: string;
  timeline: string;
  lift: string;
  headline: string;
  mechanism?: string;
  summary: string;
  services: string[];
  image: string;
  imageAlt: string;
  flipped?: boolean;
  readLabel: string;
  servicesLabel: string;
};

export function WorkStudy({
  href,
  client,
  industry,
  timeline,
  lift,
  headline,
  mechanism,
  summary,
  services,
  image,
  imageAlt,
  flipped = false,
  readLabel,
  servicesLabel,
}: WorkStudyProps) {
  const headingId = `work-${href.split("/").pop()}`;

  return (
    <article
      aria-labelledby={headingId}
      className={cn("work-study", flipped && "work-study--flip")}
    >
      <MediaReveal className="work-study__media">
        <Link href={href} className="work-study__plate">
          <SitePreview
            image={image}
            imageAlt={imageAlt}
            sizes="(max-width: 1023px) 100vw, 58vw"
          />
        </Link>
      </MediaReveal>

      <Reveal variant="fadeUp" when="media" className="work-study__copy">
        <p className="work-study__kicker">
          <span>{industry}</span>
          <span aria-hidden className="work-study__dot">
            ·
          </span>
          <span>{timeline}</span>
        </p>
        <h3 id={headingId} className="work-study__client">
          <Link href={href}>{client}</Link>
        </h3>
        <p className="work-study__metric">
          <span className="work-study__lift">{lift}</span>
          <span className="work-study__headline">
            {" "}
            {headline}
          </span>
        </p>
        {mechanism ? <p className="work-study__mechanism">{mechanism}</p> : null}
        <p className="work-study__summary">{summary}</p>
        {services.length > 0 ? (
          <ul className="work-study__services" aria-label={servicesLabel}>
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        ) : null}
        <div className="work-study__cta">
          <Button href={href} variant="link" arrow>
            {readLabel}
          </Button>
        </div>
      </Reveal>
    </article>
  );
}

import { cn } from "@/lib/cn";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { duration } from "@/lib/motion";
import type { IndustryTestimonial } from "@/content/industries";

type Props = {
  title: string;
  testimonials: IndustryTestimonial[];
  className?: string;
};

export function IndustryTestimonialBlock({
  title,
  testimonials,
  className,
}: Props) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section
      aria-labelledby="industry-testimonials-heading"
      className={cn("chapter chapter--studio relative overflow-hidden", className)}
    >
      <div className="shell relative z-[1] py-24 md:py-32 lg:py-40">
        <div className="testimonial-editorial">
          <Reveal variant="rise" when="chapter" className="testimonial-editorial__lead">
            <p className="section-eyebrow">Testimonials</p>
            <h2
              id="industry-testimonials-heading"
              className="testimonial-editorial__heading"
            >
              {title}
            </h2>
          </Reveal>

          <RevealGroup
            as="ul"
            className="testimonial-editorial__list"
            stagger={duration.staggerTight}
            delayChildren={0.08}
          >
            {testimonials.map((t) => (
              <RevealItem key={t.name} as="li" variant="fadeUp">
                <figure className="testimonial-quote">
                  <blockquote>
                    <p className="testimonial-quote__text">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className="testimonial-quote__attr">
                    <span className="testimonial-quote__name">{t.name}</span>
                    <span className="testimonial-quote__role">
                      {t.role}, {t.company}
                    </span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

import { Reveal } from "@/components/ui/Reveal";
import type { LandingPageTestimonial } from "@/content/registry/landing-pages";

export function CampaignQuote({
  testimonial,
}: {
  testimonial: LandingPageTestimonial;
}) {
  return (
    <section className="lp-campaign-quote chapter relative" aria-label="Client result">
      <div className="shell chapter-shell--tight relative">
        <Reveal variant="rise" when="chapter">
          <figure className="lp-campaign-quote__frame">
            <blockquote>
              <p className="lp-campaign-quote__text">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </blockquote>
            <figcaption className="lp-campaign-quote__attr">
              <span className="lp-campaign-quote__name">{testimonial.name}</span>
              <span className="lp-campaign-quote__role">{testimonial.role}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

import type {
  LandingPageLogo,
  LandingPageTestimonial,
} from "@/content/registry/landing-pages";

type Props = {
  logos?: LandingPageLogo[];
  testimonial?: LandingPageTestimonial;
};

export function LandingTrust({ logos, testimonial }: Props) {
  if (!logos?.length && !testimonial) return null;

  return (
    <div className="lp-trust">
      {logos?.length ? (
        <ul className="lp-logos" aria-label="Clients">
          {logos.map((logo) => (
            <li key={logo.name} className="lp-logos__item">
              {/* Native img: small marks, already optimized assets, not LCP. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt=""
                width={160}
                height={64}
                className="lp-logos__mark"
                loading="lazy"
                decoding="async"
              />
              <span className="lp-logos__name">{logo.name}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {testimonial ? (
        <figure className="lp-quote">
          <blockquote>
            <p className="lp-quote__text">&ldquo;{testimonial.quote}&rdquo;</p>
          </blockquote>
          <figcaption className="lp-quote__attr">
            <span className="lp-quote__name">{testimonial.name}</span>
            <span className="lp-quote__role">{testimonial.role}</span>
          </figcaption>
        </figure>
      ) : null}
    </div>
  );
}

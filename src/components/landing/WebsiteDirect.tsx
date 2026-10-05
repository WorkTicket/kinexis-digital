import type { LandingPageEntry } from "@/content/registry/landing-pages";

type Intro = NonNullable<LandingPageEntry["directIntro"]>;
type Portrait = NonNullable<LandingPageEntry["heroPortrait"]>;

/** Photo and intro sitting directly above the plan form. */
export function WebsiteDirect({
  intro,
  portrait,
}: {
  intro: Intro;
  portrait: Portrait;
}) {
  return (
    <section
      id="lp-direct"
      className="lp-web-direct chapter"
      aria-labelledby="lp-direct-heading"
    >
      <div className="shell">
        <div className="lp-web-direct__layout">
          <figure className="lp-web-direct__photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={portrait.src}
              srcSet={portrait.srcSet}
              sizes="(max-width: 767px) 16rem, 18rem"
              alt=""
              width={portrait.width}
              height={portrait.height}
              decoding="async"
            />
            <figcaption>
              {intro.name}, {intro.role}
            </figcaption>
          </figure>
          <div className="lp-web-direct__copy">
            <h2 id="lp-direct-heading">{intro.title}</h2>
            <p>{intro.body}</p>
            {intro.points.length ? (
              <ul>
                {intro.points.map((point) => (
                  <li key={point}>
                    <DirectCheck />
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function DirectCheck() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden>
      <path
        d="M3.2 8.2 6.4 11.4 12.8 4.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

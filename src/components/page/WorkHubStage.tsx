import { Link } from "@/i18n/navigation";

export type WorkHubItem = {
  slug: string;
  href: string;
  client: string;
  lift: string;
  headline: string;
  image: string;
  imageAlt: string;
};

type Props = {
  studies: WorkHubItem[];
  ariaLabel: string;
};

/** Hero instrument: one live site plate, the rest of the roster as links. */
export function WorkHubStage({ studies, ariaLabel }: Props) {
  if (studies.length === 0) return null;

  return (
    <div className="hub-stage work-hub">
      <div className="work-hub__stage">
        {studies.map((study) => (
          <div className="work-hub__pane" key={study.slug}>
            <Link
              href={study.href}
              className="hub-stage__still"
              aria-label={study.imageAlt}
            >
              {/* Local case-study stills are already compressed webp. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={study.image}
                alt=""
                width={1200}
                height={750}
                className="hub-stage__img"
              />
            </Link>
            <p className="work-hub__metric">
              <span className="work-hub__lift">{study.lift}</span>
              <span className="work-hub__headline">
                {" "}
                {study.headline}
              </span>
            </p>
          </div>
        ))}
      </div>
      <nav className="hub-stage__list" aria-label={ariaLabel}>
        {studies.map((study) => (
          <Link
            key={study.slug}
            href={study.href}
            className="hub-stage__row work-hub__name"
          >
            <span className="hub-stage__name">{study.client}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export type ShowcaseVariant =
  | "ridge"
  | "marigold"
  | "haven"
  | "meridian"
  | "dated";

export type ShowcaseLayout = "desktop" | "tablet" | "phone";

const ASSET_V = "20260908a";

const PHOTOS = {
  ridge: `/assets/images/lp/showcase-ridge.webp?v=${ASSET_V}`,
  marigold: `/assets/images/lp/showcase-marigold.webp?v=${ASSET_V}`,
  haven: `/assets/images/lp/showcase-haven.webp?v=${ASSET_V}`,
  meridian: `/assets/images/lp/showcase-meridian.webp?v=${ASSET_V}`,
  /** Yard photo for the dated A1 WordPress recreation — not the industry board. */
  a1: `/assets/images/lp/showcase-a1-before.webp?v=${ASSET_V}`,
} as const;

function Chrome({
  host,
  secure = true,
  windows = false,
}: {
  host: string;
  secure?: boolean;
  windows?: boolean;
}) {
  if (windows) {
    return (
      <div className="lp-site__chrome lp-site__chrome--win">
        <span className="lp-site__win-nav" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="lp-site__url lp-site__url--http">
          <span className="lp-site__insecure">Not secure</span>
          <span className="lp-site__sep" aria-hidden>
            |
          </span>
          <span className="lp-site__host">{host.replace(/^www\./, "")}</span>
        </span>
      </div>
    );
  }

  return (
    <div className="lp-site__chrome">
      <span className="lp-site__dots" aria-hidden>
        <i />
        <i />
        <i />
      </span>
      <span className="lp-site__url">
        {secure ? <span className="lp-site__lock" /> : null}
        {secure ? host : `http://${host}`}
      </span>
    </div>
  );
}

function Photo({
  src,
  priority = false,
}: {
  src: string;
  priority?: boolean;
}) {
  return (
    // Decorative miniature site — parent is aria-hidden.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={1280}
      height={720}
      decoding={priority ? "sync" : "async"}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "low"}
    />
  );
}

function Ridge({
  layout,
  priority,
}: {
  layout: ShowcaseLayout;
  priority?: boolean;
}) {
  const phone = layout === "phone";
  return (
    <>
      {phone ? null : <Chrome host="ridgeandco.com" />}
      <header className="lp-site__nav">
        <span className="lp-site__mark">Ridge &amp; Co.</span>
        {phone ? (
          <span className="lp-site__menu" />
        ) : (
          <>
            <span className="lp-site__links">
              <span className="is-current">Roofing</span>
              <span>Repairs</span>
              <span>Reviews</span>
            </span>
            <span className="lp-site__nav-cta">Get a quote</span>
          </>
        )}
      </header>
      <div className="lp-site__hero">
        <div className="lp-site__photo">
          <Photo src={PHOTOS.ridge} priority={priority} />
        </div>
        <div className="lp-site__copy">
          {phone ? null : (
            <p className="lp-site__kicker">Licensed crews</p>
          )}
          <p className="lp-site__title">Storm-tight roofs. Same week.</p>
          {layout === "desktop" ? (
            <p className="lp-site__lede">
              Quote in a tap. A crew on the way.
            </p>
          ) : null}
          <span className="lp-site__cta">Get a quote</span>
          {phone ? null : (
            <p className="lp-site__meta">★★★★★ 4.9 · 200+ jobs this year</p>
          )}
        </div>
      </div>
      {phone ? (
        <p className="lp-site__call">Call now</p>
      ) : (
        <div className="lp-site__strip">
          <span>Roof repair</span>
          <span>Replacement</span>
          <span>Inspections</span>
        </div>
      )}
    </>
  );
}

function Marigold({ layout }: { layout: ShowcaseLayout }) {
  const phone = layout === "phone";
  return (
    <>
      {phone ? null : <Chrome host="marigoldsupper.com" />}
      <header className="lp-site__nav lp-site__nav--center">
        <span className="lp-site__mark">Marigold</span>
        {phone ? (
          <span className="lp-site__menu" />
        ) : (
          <span className="lp-site__links">
            <span>Menu</span>
            <span>Evenings</span>
            <span>Private</span>
          </span>
        )}
      </header>
      <div className="lp-site__hero lp-site__hero--poster">
        <div className="lp-site__photo">
          <Photo src={PHOTOS.marigold} />
        </div>
        <div className="lp-site__copy">
          <p className="lp-site__ornament">✦</p>
          {phone ? null : (
            <p className="lp-site__kicker">Supper house · since 1974</p>
          )}
          <p className="lp-site__title">Supper, the old way.</p>
          {layout === "desktop" ? (
            <p className="lp-site__lede">
              Cloth napkins. A proper steak. A table worth dressing for.
            </p>
          ) : null}
          <span className="lp-site__cta">Reserve a table</span>
        </div>
      </div>
      {phone ? (
        <p className="lp-site__call">Book tonight</p>
      ) : (
        <div className="lp-site__strip">
          <span>Ribeye</span>
          <span>Martini</span>
          <span>8pm seating</span>
        </div>
      )}
    </>
  );
}

function Haven({ layout }: { layout: ShowcaseLayout }) {
  const phone = layout === "phone";
  return (
    <>
      {phone ? null : <Chrome host="havendental.com" />}
      <header className="lp-site__nav lp-site__nav--spread">
        <span className="lp-site__mark">Haven</span>
        {phone ? (
          <span className="lp-site__menu" />
        ) : (
          <span className="lp-site__links">
            <span>Care</span>
            <span>Doctors</span>
            <span>Visit</span>
          </span>
        )}
      </header>
      <div className="lp-site__hero lp-site__hero--editorial">
        <div className="lp-site__copy">
          {phone ? null : (
            <p className="lp-site__kicker">Family practice</p>
          )}
          <p className="lp-site__title">Calm care. A clear next step.</p>
          {layout === "desktop" ? (
            <p className="lp-site__lede">
              New patients seen this week. Same-day emergencies.
            </p>
          ) : null}
          <span className="lp-site__cta">Book a visit</span>
        </div>
        <div className="lp-site__photo">
          <Photo src={PHOTOS.haven} />
        </div>
      </div>
      {phone ? <p className="lp-site__call">Call the desk</p> : null}
    </>
  );
}

function Meridian({ layout }: { layout: ShowcaseLayout }) {
  const phone = layout === "phone";
  return (
    <>
      {phone ? null : <Chrome host="meridianrealty.com" />}
      <div className="lp-site__hero lp-site__hero--bleed">
        <div className="lp-site__photo">
          <Photo src={PHOTOS.meridian} />
        </div>
        <header className="lp-site__nav">
          <span className="lp-site__mark">Meridian</span>
          {phone ? (
            <span className="lp-site__menu" />
          ) : (
            <>
              <span className="lp-site__links">
                <span>Listings</span>
                <span>Neighborhoods</span>
              </span>
              <span className="lp-site__nav-cta">Schedule a showing</span>
            </>
          )}
        </header>
        <div className="lp-site__copy">
          {phone ? null : (
            <p className="lp-site__kicker">Private listings</p>
          )}
          <p className="lp-site__title">Homes with presence.</p>
          {layout === "desktop" ? (
            <p className="lp-site__lede">
              Quiet streets. Serious architecture. Shown by appointment.
            </p>
          ) : null}
          <span className="lp-site__cta">Schedule a showing</span>
          {phone ? null : (
            <p className="lp-site__meta">$1.85M · listed this week</p>
          )}
        </div>
      </div>
      {phone ? <p className="lp-site__call">Request access</p> : null}
    </>
  );
}

function Dated({ layout }: { layout: ShowcaseLayout }) {
  const phone = layout === "phone";
  return (
    <>
      {phone ? null : (
        <Chrome host="www.a1propertyservices.com" secure={false} windows />
      )}
      <div className="lp-site__dated-page">
        <div className="lp-site__dated-wrap">
          <div className="lp-site__dated-top">
            <span>Free Estimates</span>
            {phone ? (
              <span>Call now</span>
            ) : (
              <>
                <span>Licensed &amp; Insured</span>
                <span>Free estimates</span>
                <span className="lp-site__dated-socials" aria-hidden>
                  <i />
                  <i />
                  <i />
                </span>
              </>
            )}
          </div>
          <header className="lp-site__dated-head">
            <span className="lp-site__dated-logo">
              <svg
                className="lp-site__dated-mark"
                viewBox="0 0 200 150"
                aria-hidden
              >
                <path
                  fill="#E31C23"
                  d="M30 86 L30 74 L100 22 L148 62 V42 H166 V76 C166 76 166 86 166 86 C128 64 72 64 30 86 Z"
                />
                <path
                  fill="#8B9099"
                  d="M22 122 C78 92 128 90 182 112 C136 96 86 96 38 118 Z"
                />
              </svg>
              A1 Property Services
            </span>
            {phone ? (
              <span className="lp-site__menu" />
            ) : (
              <span className="lp-site__dated-nav">
                <span className="is-current">Home</span>
                <span>About Us</span>
                <span>Our Services</span>
                <span>Gallery</span>
                <span>Testimonials</span>
                <span>Contact</span>
              </span>
            )}
          </header>
          <div className="lp-site__dated-slider">
            <div className="lp-site__dated-slide">
              <Photo src={PHOTOS.a1} />
            </div>
            <div className="lp-site__dated-caption">
              <p className="lp-site__dated-kicker">Welcome to our website</p>
              <p className="lp-site__dated-title">
                Quality Landscaping You Can Trust
              </p>
              {phone ? null : (
                <p className="lp-site__dated-sub">
                  Family owned since 1998. Call for more information.
                </p>
              )}
              <span className="lp-site__dated-cta">Click Here</span>
            </div>
            {phone ? null : (
              <>
                <span className="lp-site__dated-prev" aria-hidden>
                  ‹
                </span>
                <span className="lp-site__dated-next" aria-hidden>
                  ›
                </span>
                <span className="lp-site__dated-dots" aria-hidden>
                  <i className="is-on" />
                  <i />
                  <i />
                </span>
              </>
            )}
          </div>
          {phone ? null : (
            <div className="lp-site__dated-cards">
              <span>
                <i aria-hidden />
                Lawn Care
              </span>
              <span>
                <i aria-hidden />
                Landscaping
              </span>
              <span>
                <i aria-hidden />
                Hardscaping
              </span>
            </div>
          )}
          <p className="lp-site__dated-foot">
            {phone
              ? "Call for more information"
              : "A1 Property Services · Cedar Falls, IA"}
          </p>
        </div>
      </div>
    </>
  );
}

const VARIANTS = {
  ridge: Ridge,
  marigold: Marigold,
  haven: Haven,
  meridian: Meridian,
  dated: Dated,
} as const;

/** Miniature marketing sites used inside device frames — real page chrome, not overlay labels. */
export function ShowcaseSite({
  variant,
  layout,
  priority = false,
}: {
  variant: ShowcaseVariant;
  layout: ShowcaseLayout;
  priority?: boolean;
}) {
  const Site = VARIANTS[variant];
  return (
    <div
      className={`lp-site lp-site--${variant} lp-site--${layout}`}
      aria-hidden
    >
      {variant === "ridge" ? (
        <Ridge layout={layout} priority={priority} />
      ) : (
        <Site layout={layout} />
      )}
    </div>
  );
}

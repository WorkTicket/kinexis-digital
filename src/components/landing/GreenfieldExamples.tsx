"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from "react";
import {
  getGreenfieldExampleCopy,
  type ExampleViewpoint,
  type GreenfieldExampleCopy,
  type NxExampleCopy,
  type NxPageId,
  type WpExampleCopy,
  type WpPageId,
} from "@/content/lp/greenfield-examples";
import type { Locale } from "@/i18n/routing";

const YARD = "/assets/images/lp/showcase-greenfield-yard.webp?v=20261010a";
const BEFORE = "/assets/images/lp/showcase-a1-before.webp?v=20261010a";
const PATIO = "/assets/images/lp/greenfield-patio.webp?v=20261010a";
const IRRIGATION = "/assets/images/lp/greenfield-irrigation.webp?v=20261010a";
const AERATION = "/assets/images/lp/greenfield-aeration.webp?v=20261010a";
const CLEANUP = "/assets/images/lp/greenfield-cleanup.webp?v=20261010a";
const FEED = "/assets/images/lp/greenfield-feed.webp?v=20261010a";
const WALL = "/assets/images/lp/greenfield-wall.webp?v=20261010a";

const STILL_SRC = {
  yard: YARD,
  house: BEFORE,
  walk: YARD,
  patio: PATIO,
  irrigation: IRRIGATION,
  aeration: AERATION,
  cleanup: CLEANUP,
  feed: FEED,
  wall: WALL,
} as const;

type IconName =
  | "lawn"
  | "shrub"
  | "paver"
  | "drop"
  | "soil"
  | "phone"
  | "search"
  | "pin"
  | "menu"
  | "close"
  | "camera";

function Icon({ name }: { name: IconName }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  if (name === "lawn") {
    return (
      <svg {...common}>
        <path d="M3 17c1.8-3.2 3.2-3.2 5 0s3.2 3.2 5 0 3.2-3.2 5 0 3.2 3.2 3 0" />
        <circle cx="7.5" cy="17.5" r="2.1" />
        <path d="M12.5 15.2V8.5H17l1.2 3.2" />
      </svg>
    );
  }
  if (name === "shrub") {
    return (
      <svg {...common}>
        <circle cx="12" cy="9" r="4.2" />
        <path d="M12 13.2V20" />
        <path d="M8.2 20h7.6" />
      </svg>
    );
  }
  if (name === "paver") {
    return (
      <svg {...common}>
        <rect x="3" y="4.5" width="8" height="6.5" rx="0.6" />
        <rect x="13" y="4.5" width="8" height="6.5" rx="0.6" />
        <rect x="3" y="13" width="18" height="6.5" rx="0.6" />
      </svg>
    );
  }
  if (name === "drop") {
    return (
      <svg {...common}>
        <path d="M12 3.5s5.5 6.2 5.5 10a5.5 5.5 0 1 1-11 0c0-3.8 5.5-10 5.5-10Z" />
      </svg>
    );
  }
  if (name === "soil") {
    return (
      <svg {...common}>
        <path d="M4 16.5c2.2-2.4 3.6-2.4 5.4 0s3.2 2.4 5.2 0 3.2-2.4 5.4 0" />
        <circle cx="8" cy="8" r="1.3" />
        <circle cx="12.5" cy="6.2" r="1.3" />
        <circle cx="16.5" cy="9" r="1.3" />
      </svg>
    );
  }
  if (name === "phone") {
    return (
      <svg {...common}>
        <rect x="7" y="2.5" width="10" height="19" rx="2" />
        <path d="M10 18.5h4" />
      </svg>
    );
  }
  if (name === "search") {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
      </svg>
    );
  }
  if (name === "pin") {
    return (
      <svg {...common}>
        <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
        <circle cx="12" cy="11" r="1.6" />
      </svg>
    );
  }
  if (name === "menu") {
    return (
      <svg {...common}>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    );
  }
  if (name === "close") {
    return (
      <svg {...common}>
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="3.5" y="6" width="17" height="13" rx="2" />
      <circle cx="12" cy="12.5" r="3" />
      <path d="M8 6l1.2-2h5.6L16 6" />
    </svg>
  );
}

function Mark() {
  return (
    <svg className="lp-ex__mark" viewBox="0 0 64 64" aria-hidden>
      <rect width="64" height="64" fill="#2f4a22" />
      <path fill="#fff" d="M32 8 54 40H42l8 16H14l8-16H10Z" />
      <rect x="28" y="50" width="8" height="10" fill="#c9a227" />
    </svg>
  );
}

const WP_ICONS: Record<string, IconName> = {
  lawn: "lawn",
  scape: "shrub",
  hard: "paver",
};

function useDemoPage<T extends string>(initial: T, layout: ExampleViewpoint) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pendingAnchor = useRef<string | null>(null);
  const [page, setPage] = useState<T>(initial);
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (next: T, anchor?: string) => {
    pendingAnchor.current = anchor ?? null;
    setPage(next);
    setMenuOpen(false);
  };

  useLayoutEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const anchor = pendingAnchor.current;
    pendingAnchor.current = null;
    if (anchor) {
      const target = root.querySelector<HTMLElement>(`#${anchor}`);
      if (target) {
        const top =
          target.getBoundingClientRect().top -
          root.getBoundingClientRect().top +
          root.scrollTop;
        root.scrollTop = Math.max(0, top - 8);
        return;
      }
    }
    root.scrollTop = 0;
  }, [page]);

  useEffect(() => {
    setMenuOpen(false);
  }, [layout]);

  return { page, go, menuOpen, setMenuOpen, scrollRef };
}

function useWide(ref: RefObject<HTMLElement | null>, layout: ExampleViewpoint) {
  const [wide, setWide] = useState(layout === "desktop");
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || layout === "phone") {
      setWide(false);
      return;
    }
    const update = () => setWide(el.clientWidth >= 760);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [layout, ref]);
  return wide;
}

function StatusBar({ tone }: { tone: "light" | "dark" }) {
  return (
    <div className={`lp-safari__status lp-safari__status--${tone}`} aria-hidden>
      <span>9:41</span>
      <span className="lp-web-pain__status-glyphs">
        <i className="lp-web-pain__signal" />
        <i className="lp-web-pain__wifi" />
        <i className="lp-web-pain__battery" />
      </span>
    </div>
  );
}

function AddressBar({ host, variant }: { host: string; variant: "safari" | "desk" }) {
  return (
    <div className={variant === "safari" ? "lp-safari__bar" : "lp-ex-desk__url"} aria-hidden>
      {variant === "safari" ? <span className="lp-safari__aa">aA</span> : null}
      <span className={variant === "safari" ? "lp-safari__host" : "lp-ex-desk__host"}>
        <svg viewBox="0 0 12 14" className="lp-safari__lock" aria-hidden>
          <rect x="1.5" y="6" width="9" height="7" rx="1.2" />
          <path d="M3.2 6V4.2a2.8 2.8 0 0 1 5.6 0V6" />
        </svg>
        {host}
      </span>
      {variant === "safari" ? (
        <svg viewBox="0 0 16 16" className="lp-safari__reload" aria-hidden>
          <path d="M13.2 8a5.2 5.2 0 1 1-1.4-3.5" />
          <path d="M12.2 1.8v3.1H9" />
        </svg>
      ) : null}
    </div>
  );
}

function PhoneFrame({
  tone,
  host,
  children,
}: {
  tone: "light" | "dark";
  host: string;
  children: ReactNode;
}) {
  return (
    <div className="lp-web-pain__phone">
      <div className="lp-web-pain__screen">
        <div className={`lp-safari lp-safari--${tone} lp-safari--live`}>
          <StatusBar tone={tone} />
          <AddressBar host={host} variant="safari" />
          <div className="lp-safari__page lp-safari__page--live">{children}</div>
          <span className="lp-safari__home" />
        </div>
      </div>
      <img
        className="lp-web-pain__chassis"
        src="/assets/images/lp/iphone-15-mockup.webp"
        alt=""
      />
    </div>
  );
}

function TabletFrame({
  tone,
  host,
  children,
}: {
  tone: "light" | "dark";
  host: string;
  children: ReactNode;
}) {
  return (
    <div className={`lp-ex-tablet lp-ex-tablet--${tone}`}>
      <div className="lp-ex-tablet__screen">
        <div className={`lp-safari lp-safari--${tone} lp-safari--live`}>
          <StatusBar tone={tone} />
          <AddressBar host={host} variant="safari" />
          <div className="lp-safari__page lp-safari__page--live">{children}</div>
          <span className="lp-safari__home" />
        </div>
      </div>
    </div>
  );
}

function DesktopFrame({ host, children }: { host: string; children: ReactNode }) {
  return (
    <div className="lp-ex-desk">
      <div className="lp-ex-desk__bar">
        <span className="lp-ex-desk__dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <AddressBar host={host} variant="desk" />
      </div>
      <div className="lp-ex-desk__screen">{children}</div>
    </div>
  );
}

function Frame({
  layout,
  tone,
  host,
  children,
}: {
  layout: ExampleViewpoint;
  tone: "light" | "dark";
  host: string;
  children: ReactNode;
}) {
  if (layout === "phone") {
    return (
      <PhoneFrame tone={tone} host={host}>
        {children}
      </PhoneFrame>
    );
  }
  if (layout === "tablet") {
    return (
      <TabletFrame tone={tone} host={host}>
        {children}
      </TabletFrame>
    );
  }
  return <DesktopFrame host={host}>{children}</DesktopFrame>;
}

function WpSite({
  layout,
  copy,
  onHost,
}: {
  layout: ExampleViewpoint;
  copy: WpExampleCopy;
  onHost: (host: string) => void;
}) {
  const siteRef = useRef<HTMLDivElement>(null);
  const wide = useWide(siteRef, layout);
  const { page, go, menuOpen, setMenuOpen, scrollRef } = useDemoPage<WpPageId>(
    "home",
    layout,
  );
  const [slide, setSlide] = useState(0);
  const [blogOpen, setBlogOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [loginNote, setLoginNote] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const path = copy.nav.find((item) => item.id === page)?.path ?? "";
    onHost(`${copy.domain}${path}`);
  }, [copy.domain, copy.nav, onHost, page]);

  const current = copy.slides[slide] ?? copy.slides[0];
  const phone = layout === "phone";

  function onSearch(event: FormEvent) {
    event.preventDefault();
    setSearched(true);
  }

  function onContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setError(true);
      setSent(false);
      return;
    }
    setError(false);
    setSent(true);
  }

  return (
    <div
      ref={siteRef}
      className={`lp-ex-site lp-ex-site--wp lp-ex-site--${layout}${wide ? " is-wide" : ""}`}
    >
      <div className="lp-ex-wp__top">
        <span>{copy.free}</span>
        <button type="button" className="lp-ex-wp__call" onClick={() => go("contact")}>
          <Icon name="phone" />
          {copy.call}
        </button>
        {phone ? null : <span className="lp-ex-wp__licensed">{copy.licensed}</span>}
        <span className="lp-ex-wp__socials" aria-hidden>
          <i>f</i>
          <i>
            <Icon name="camera" />
          </i>
          <i>
            <Icon name="pin" />
          </i>
        </span>
      </div>
      <header className="lp-ex-wp__head">
        <button type="button" className="lp-ex-wp__logo" onClick={() => go("home")}>
          <Mark />
          <span>Greenfield Lawn Care</span>
        </button>
        {phone ? (
          <button
            type="button"
            className="lp-ex-wp__burger"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? copy.close : copy.menu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        ) : (
          <nav className="lp-ex-wp__nav" aria-label="Greenfield">
            {copy.nav.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={page === item.id ? "page" : undefined}
                onClick={() => go(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </header>
      <div className="lp-ex__body">
        {menuOpen ? (
          <nav className="lp-ex__drawer lp-ex__drawer--wp" aria-label="Greenfield">
            {copy.nav.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={page === item.id ? "page" : undefined}
                onClick={() => go(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        ) : null}
        <div
          ref={scrollRef}
          className="lp-ex__scroll"
          aria-hidden={menuOpen}
          tabIndex={0}
        >
          <div className="lp-ex__doc">
            {page === "home" ? (
              <>
                <div className="lp-ex-wp__slider">
                  <img src={slide === 1 ? YARD : BEFORE} alt="" />
                  <button
                    type="button"
                    className="lp-ex-wp__arrow lp-ex-wp__arrow--prev"
                    aria-label="Previous"
                    onClick={() =>
                      setSlide((index) => (index + copy.slides.length - 1) % copy.slides.length)
                    }
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="lp-ex-wp__arrow lp-ex-wp__arrow--next"
                    aria-label="Next"
                    onClick={() => setSlide((index) => (index + 1) % copy.slides.length)}
                  >
                    ›
                  </button>
                  <span className="lp-ex-wp__dots">
                    {copy.slides.map((item, index) => (
                      <button
                        key={item.title}
                        type="button"
                        className={index === slide ? "is-on" : undefined}
                        aria-label={item.title}
                        onClick={() => setSlide(index)}
                      />
                    ))}
                  </span>
                  {wide && current ? (
                    <div className="lp-ex-wp__overlay">
                      <p className="lp-ex-wp__kicker">{current.kicker}</p>
                      <h1>{current.title}</h1>
                      <p>{current.body}</p>
                      <button type="button" className="lp-ex-wp__click" onClick={() => go("contact")}>
                        {copy.click}
                      </button>
                    </div>
                  ) : null}
                </div>
                {wide || !current ? null : (
                  <div className="lp-ex-wp__intro">
                    <p className="lp-ex-wp__kicker">{current.kicker}</p>
                    <h1>{current.title}</h1>
                    <p>{current.body}</p>
                    <button type="button" className="lp-ex-wp__click" onClick={() => go("contact")}>
                      {copy.click}
                    </button>
                  </div>
                )}
                <div className="lp-ex-wp__layout">
                  <div>
                    <div className="lp-ex-wp__cards">
                      {copy.services.map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          className="lp-ex-wp__card"
                          onClick={() => go("services", `wp-${service.id}`)}
                        >
                          <span className="lp-ex-wp__badge">
                            <Icon name={WP_ICONS[service.id] ?? "lawn"} />
                          </span>
                          <strong>{service.title}</strong>
                          {wide ? <span>{service.body}</span> : null}
                        </button>
                      ))}
                    </div>
                    <section className="lp-ex-wp__welcome">
                      <h2>{copy.welcomeTitle}</h2>
                      {copy.welcome.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </section>
                    <section className="lp-ex-wp__blog">
                      <h2>{copy.blogTitle}</h2>
                      <p>{copy.blogPost}</p>
                      {blogOpen ? <p className="lp-ex-wp__blog-body">{copy.blogBody}</p> : null}
                      <button type="button" onClick={() => setBlogOpen((open) => !open)}>
                        {blogOpen ? copy.blogLess : copy.blogMore}
                      </button>
                    </section>
                  </div>
                  <aside className="lp-ex-wp__side">
                    <form onSubmit={onSearch}>
                      <h2>{copy.searchLabel}</h2>
                      <label className="lp-ex-sr" htmlFor={`wp-search-${layout}`}>
                        {copy.searchLabel}
                      </label>
                      <div className="lp-ex-wp__search">
                        <Icon name="search" />
                        <input
                          id={`wp-search-${layout}`}
                          value={query}
                          onChange={(event) => {
                            setQuery(event.target.value);
                            setSearched(false);
                          }}
                          autoComplete="off"
                        />
                        <button type="submit">{copy.searchButton}</button>
                      </div>
                      {searched ? <p className="lp-ex-wp__empty">{copy.searchEmpty}</p> : null}
                    </form>
                    <div>
                      <h2>{copy.recentTitle}</h2>
                      <ul>
                        {copy.recent.map((item) => (
                          <li key={item}>
                            <button type="button" onClick={() => setBlogOpen(true)}>
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h2>{copy.categoriesTitle}</h2>
                      <ul>
                        {copy.categories.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h2>{copy.metaTitle}</h2>
                      <ul>
                        <li>
                          <button type="button" onClick={() => setLoginNote(true)}>
                            {copy.login}
                          </button>
                        </li>
                        <li>{copy.rss}</li>
                      </ul>
                      {loginNote ? <p className="lp-ex-wp__empty">{copy.loginNote}</p> : null}
                    </div>
                  </aside>
                </div>
              </>
            ) : null}

            {page === "about" ? (
              <article className="lp-ex-wp__page">
                <h1>{copy.aboutTitle}</h1>
                <img className="lp-ex-wp__about-photo" src={BEFORE} alt="" />
                {copy.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <button type="button" className="lp-ex-wp__click" onClick={() => go("contact")}>
                  {copy.click}
                </button>
              </article>
            ) : null}

            {page === "services" ? (
              <article className="lp-ex-wp__page">
                <h1>{copy.servicesTitle}</h1>
                <p>{copy.servicesIntro}</p>
                {copy.services.map((service) => (
                  <section key={service.id} id={`wp-${service.id}`} className="lp-ex-wp__service">
                    <span className="lp-ex-wp__badge">
                      <Icon name={WP_ICONS[service.id] ?? "lawn"} />
                    </span>
                    <div>
                      <h2>{service.title}</h2>
                      <p>{service.body}</p>
                      <button type="button" className="lp-ex-wp__click" onClick={() => go("contact")}>
                        {copy.click}
                      </button>
                    </div>
                  </section>
                ))}
              </article>
            ) : null}

            {page === "contact" ? (
              <article className="lp-ex-wp__page">
                <h1>{copy.contactTitle}</h1>
                <p>{copy.contactIntro}</p>
                {sent ? (
                  <p className="lp-ex-wp__thanks">{copy.form.thanks}</p>
                ) : (
                  <form className="lp-ex-wp__form" onSubmit={onContact}>
                    <label>
                      {copy.form.name}
                      <input name="name" autoComplete="off" />
                    </label>
                    <label>
                      {copy.form.email}
                      <input name="email" type="email" autoComplete="off" />
                    </label>
                    <label>
                      {copy.form.message}
                      <textarea name="message" rows={4} />
                    </label>
                    {error ? <p className="lp-ex-wp__empty">{copy.form.error}</p> : null}
                    <button type="submit" className="lp-ex-wp__click">
                      {copy.form.send}
                    </button>
                  </form>
                )}
                <p className="lp-ex-wp__fine">
                  <Icon name="phone" />
                  {copy.phoneLabel}: {copy.phone}
                </p>
                <p className="lp-ex-wp__fine">
                  <Icon name="pin" />
                  {copy.address}
                </p>
              </article>
            ) : null}

            <footer className="lp-ex-wp__foot">{copy.footer}</footer>
          </div>
        </div>
      </div>
    </div>
  );
}

function Wordmark({ trade }: { trade: string }) {
  return (
    <span className="lp-ex-nx__wordmark">
      <Mark />
      <span>
        <strong>Greenfield</strong>
        <em>{trade}</em>
      </span>
    </span>
  );
}

const MOSAIC_IDS = ["lawn", "hardscape", "planting", "irrigation"] as const;

const SERVICE_STILLS: Record<string, { id: keyof typeof STILL_SRC; focus: string }> = {
  lawn: { id: "yard", focus: "center 78%" },
  hardscape: { id: "patio", focus: "center 58%" },
  planting: { id: "yard", focus: "center 8%" },
  irrigation: { id: "irrigation", focus: "center 62%" },
  design: { id: "yard", focus: "center 28%" },
  feed: { id: "feed", focus: "center 48%" },
  aeration: { id: "aeration", focus: "center 55%" },
  cleanup: { id: "cleanup", focus: "center 42%" },
};

function serviceStill(id: string) {
  const still = SERVICE_STILLS[id] ?? { id: "yard" as const, focus: "center 40%" };
  return {
    src: STILL_SRC[still.id],
    focus: still.focus,
  };
}

function NxPageHero({
  src,
  focus,
  kicker,
  title,
  lede,
  children,
}: {
  src: string;
  focus?: string;
  kicker?: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <section className="lp-ex-nx__hero lp-ex-nx__hero--page">
      <img src={src} alt="" style={focus ? { objectPosition: focus } : undefined} />
      <div className="lp-ex-nx__hero-copy">
        {kicker ? <p className="lp-ex-nx__kicker">{kicker}</p> : null}
        <h1>{title}</h1>
        {lede ? <p>{lede}</p> : null}
        {children}
      </div>
    </section>
  );
}

function CallButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" className="lp-ex-nx__call" onClick={onClick}>
      <Icon name="phone" />
      {label}
    </button>
  );
}

function NxSite({
  layout,
  copy,
  onHost,
}: {
  layout: ExampleViewpoint;
  copy: NxExampleCopy;
  onHost: (host: string) => void;
}) {
  const siteRef = useRef<HTMLDivElement>(null);
  const wide = useWide(siteRef, layout);
  const { page, go, menuOpen, setMenuOpen, scrollRef } = useDemoPage<NxPageId>(
    "home",
    layout,
  );
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const phone = layout === "phone";

  useEffect(() => {
    if (!menuOpen) setServicesOpen(false);
  }, [menuOpen]);

  useEffect(() => {
    onHost(`${copy.domain}${nxPath(page, copy)}`);
  }, [copy, onHost, page]);

  function onQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phoneNumber = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    if (!name || (!phoneNumber && !email)) {
      setError(true);
      setSent(false);
      return;
    }
    setError(false);
    setSent(true);
  }

  const service = copy.services.find((item) => item.id === page);
  const featured =
    copy.services.find((item) => item.id === "design") ?? copy.services[0];
  const featuredStill = featured ? serviceStill(featured.id) : null;
  const mosaic = MOSAIC_IDS.flatMap((id) => {
    const item = copy.services.find((entry) => entry.id === id);
    return item ? [item] : [];
  });
  const rest = copy.services.filter(
    (item) => item.id !== featured?.id && !MOSAIC_IDS.includes(item.id as (typeof MOSAIC_IDS)[number]),
  );

  return (
    <div
      ref={siteRef}
      className={`lp-ex-site lp-ex-site--nx lp-ex-site--${layout}${wide ? " is-wide" : ""}`}
    >
      <header className="lp-ex-nx__bar">
        <button type="button" className="lp-ex-nx__logo" onClick={() => go("home")}>
          <Wordmark trade={copy.trade} />
        </button>
        <button
          type="button"
          className="lp-ex-nx__burger"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? copy.close : copy.menu}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
      </header>
      <div className="lp-ex__body">
        {menuOpen ? (
          <nav className="lp-ex__drawer lp-ex-nx__menu" aria-label="Greenfield">
            <button type="button" onClick={() => go("home")}>
              {copy.home}
            </button>
            <button
              type="button"
              className="lp-ex-nx__disclose"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((open) => !open)}
            >
              {copy.servicesLabel}
              <i className={servicesOpen ? "is-open" : undefined} />
            </button>
            {servicesOpen ? (
              <div className="lp-ex-nx__sub">
                {copy.services.map((item) => (
                  <button key={item.id} type="button" onClick={() => go(item.id)}>
                    {item.nav}
                  </button>
                ))}
              </div>
            ) : null}
            <button type="button" onClick={() => go("areas")}>
              {copy.areasNav}
            </button>
            <button type="button" onClick={() => go("gallery")}>
              {copy.galleryNav}
            </button>
            <button type="button" onClick={() => go("about")}>
              {copy.aboutNav}
            </button>
            <button type="button" onClick={() => go("contact")}>
              {copy.contactNav}
            </button>
          </nav>
        ) : null}
        <div ref={scrollRef} className="lp-ex__scroll" aria-hidden={menuOpen} tabIndex={0}>
          <div className="lp-ex__doc">
            {page === "home" && featured && featuredStill ? (
              <div className="lp-ex-nx__home">
                <section className="lp-ex-nx__hero">
                  <img src={YARD} alt="" />
                  <div className="lp-ex-nx__hero-copy">
                    <p className="lp-ex-nx__kicker">{copy.kicker}</p>
                    <h1>{copy.title}</h1>
                    <p>{copy.lede}</p>
                    <p className="lp-ex-nx__rating">
                      <span className="lp-ex-nx__stars" aria-hidden>
                        ★★★★★
                      </span>
                      <span>{copy.rating}</span>
                    </p>
                    <div className="lp-ex-nx__actions">
                      <button type="button" className="lp-ex-nx__quote" onClick={() => go("contact")}>
                        {copy.quote}
                      </button>
                      <CallButton label={copy.call} onClick={() => go("contact")} />
                    </div>
                  </div>
                </section>
                <ul className="lp-ex-nx__stats">
                  {copy.stats.map((item) => (
                    <li key={item.label}>
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
                <div className="lp-ex-nx__pair">
                  <section className="lp-ex-nx__block lp-ex-nx__intro">
                    <p className="lp-ex-nx__eyebrow">{copy.introEyebrow}</p>
                    <h2>{copy.introTitle}</h2>
                    <p className="lp-ex-nx__lead">{copy.introBody}</p>
                    <button type="button" className="lp-ex-nx__textlink" onClick={() => go("about")}>
                      {copy.introLink}
                    </button>
                  </section>
                  <section className="lp-ex-nx__block lp-ex-nx__process">
                    <h2>{copy.processTitle}</h2>
                    <ol className="lp-ex-nx__steps">
                      {copy.steps.map((step) => (
                        <li key={step.title}>
                          <strong>{step.title}</strong>
                          <span>{step.body}</span>
                        </li>
                      ))}
                    </ol>
                  </section>
                </div>
                <section className="lp-ex-nx__block lp-ex-nx__home-services">
                  <div className="lp-ex-nx__section-head">
                    <h2>{copy.servicesLabel}</h2>
                    <p className="lp-ex-nx__lead">{copy.servicesLead}</p>
                  </div>
                  <button
                    type="button"
                    className="lp-ex-nx__feature"
                    onClick={() => go(featured.id)}
                  >
                    <img
                      src={featuredStill.src}
                      alt=""
                      style={{ objectPosition: featuredStill.focus }}
                    />
                    <span className="lp-ex-nx__feature-copy">
                      <em>{copy.featuredLabel}</em>
                      <strong>{featured.nav}</strong>
                      <span>{featured.card}</span>
                    </span>
                  </button>
                  <div className="lp-ex-nx__mosaic">
                    {mosaic.map((item) => {
                      const still = serviceStill(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className="lp-ex-nx__cell"
                          onClick={() => go(item.id)}
                        >
                          <img src={still.src} alt="" style={{ objectPosition: still.focus }} />
                          <span>
                            <strong>{item.nav}</strong>
                            <em>{item.card}</em>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="lp-ex-nx__also">
                    <p className="lp-ex-nx__also-label">{copy.alsoLabel}</p>
                    <ul>
                      {rest.map((item) => (
                        <li key={item.id}>
                          <button type="button" onClick={() => go(item.id)}>
                            <span>
                              <strong>{item.nav}</strong>
                              <em>{item.card}</em>
                            </span>
                            <i className="lp-ex-nx__chev" aria-hidden />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
                <section className="lp-ex-nx__spot">
                  <img src={PATIO} alt="" style={{ objectPosition: "center 46%" }} />
                  <div className="lp-ex-nx__spot-copy">
                    <p className="lp-ex-nx__kicker">{copy.spotlightKicker}</p>
                    <h2>{copy.spotlightTitle}</h2>
                    <p>{copy.spotlightBody}</p>
                    <button type="button" onClick={() => go("gallery")}>
                      {copy.spotlightLink}
                    </button>
                  </div>
                </section>
                <section className="lp-ex-nx__block lp-ex-nx__reviews">
                  <h2>{copy.reviewsTitle}</h2>
                  <div className="lp-ex-nx__quotes">
                    {copy.reviews.map((item) => (
                      <blockquote key={item.by} className="lp-ex-nx__quote-card">
                        <p className="lp-ex-nx__stars" aria-hidden>
                          ★★★★★
                        </p>
                        <p>“{item.quote}”</p>
                        <footer>{item.by}</footer>
                      </blockquote>
                    ))}
                  </div>
                </section>
                <section className="lp-ex-nx__block lp-ex-nx__areas">
                  <div className="lp-ex-nx__section-head">
                    <h2>{copy.areasLabel}</h2>
                    <p className="lp-ex-nx__lead">{copy.areasLead}</p>
                  </div>
                  <div className="lp-ex-nx__town-grid">
                    {copy.towns.map((town) => (
                      <button
                        key={town.name}
                        type="button"
                        onClick={() => go("areas", townAnchor(town.name))}
                      >
                        <Icon name="pin" />
                        <strong>{town.name}</strong>
                        <em>{town.body}</em>
                      </button>
                    ))}
                  </div>
                  <button type="button" className="lp-ex-nx__textlink" onClick={() => go("areas")}>
                    {copy.areasLink}
                  </button>
                </section>
                <section className="lp-ex-nx__band">
                  <h2>{copy.ctaTitle}</h2>
                  <p>{copy.ctaBody}</p>
                  <button type="button" className="lp-ex-nx__quote" onClick={() => go("contact")}>
                    {copy.quote}
                  </button>
                </section>
              </div>
            ) : null}

            {service ? (
              <>
                <NxPageHero
                  src={serviceStill(service.id).src}
                  focus={serviceStill(service.id).focus}
                  kicker={service.nav}
                  title={service.title}
                  lede={service.lede}
                >
                  <div className="lp-ex-nx__actions">
                    <button type="button" className="lp-ex-nx__quote" onClick={() => go("contact")}>
                      {copy.quote}
                    </button>
                    <CallButton label={copy.call} onClick={() => go("contact")} />
                  </div>
                </NxPageHero>
              <article className="lp-ex-nx__page">
                <p className="lp-ex-nx__crumb">
                  <button type="button" onClick={() => go("home")}>
                    {copy.home}
                  </button>
                  <span aria-hidden>/</span>
                  {service.nav}
                </p>
                <h2>{copy.includedLabel}</h2>
                <ul className="lp-ex-nx__includes">
                  {service.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <h2>{copy.faqLabel}</h2>
                <div className="lp-ex-nx__faqs">
                  {service.faqs.map((item) => (
                    <div key={item.q}>
                      <h3>{item.q}</h3>
                      <p>{item.a}</p>
                    </div>
                  ))}
                </div>
                <h2>{copy.otherLabel}</h2>
                <div className="lp-ex-nx__related">
                  {copy.services
                    .filter((item) => item.id !== service.id)
                    .map((item) => (
                      <button key={item.id} type="button" onClick={() => go(item.id)}>
                        <img
                          src={serviceStill(item.id).src}
                          alt=""
                          style={{ objectPosition: serviceStill(item.id).focus }}
                        />
                        <span>
                          <strong>{item.nav}</strong>
                          <span>{item.card}</span>
                        </span>
                      </button>
                    ))}
                </div>
              </article>
              </>
            ) : null}

            {page === "areas" ? (
              <>
                <NxPageHero
                  src={BEFORE}
                  focus="center 48%"
                  kicker={copy.areasNav}
                  title={copy.townsTitle}
                  lede={copy.townsLede}
                >
                  <button type="button" className="lp-ex-nx__quote" onClick={() => go("contact")}>
                    {copy.quote}
                  </button>
                </NxPageHero>
              <article className="lp-ex-nx__page">
                <div className="lp-ex-nx__towns">
                  {copy.towns.map((town) => (
                    <section key={town.name} id={townAnchor(town.name)}>
                      <h2>{town.name}</h2>
                      <p>{town.body}</p>
                    </section>
                  ))}
                </div>
                <button type="button" className="lp-ex-nx__quote" onClick={() => go("contact")}>
                  {copy.quote}
                </button>
              </article>
              </>
            ) : null}

            {page === "gallery" ? (
              <>
                <NxPageHero
                  src={PATIO}
                  focus="center 40%"
                  kicker={copy.galleryNav}
                  title={copy.galleryTitle}
                  lede={copy.galleryLede}
                />
              <article className="lp-ex-nx__page">
                <div className="lp-ex-nx__gallery">
                  {copy.projects.map((project) => (
                    <figure key={project.title}>
                      <img
                        src={STILL_SRC[project.image]}
                        alt=""
                        style={{ objectPosition: project.focus }}
                      />
                      <figcaption>
                        <strong>{project.title}</strong>
                        <span>{project.place}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </article>
              </>
            ) : null}

            {page === "about" ? (
              <>
                <NxPageHero
                  src={BEFORE}
                  focus="center 55%"
                  kicker={copy.aboutNav}
                  title={copy.aboutTitle}
                />
              <article className="lp-ex-nx__page">
                {copy.about.map((paragraph) => (
                  <p key={paragraph} className="lp-ex-nx__lede">
                    {paragraph}
                  </p>
                ))}
                <ul className="lp-ex-nx__trust lp-ex-nx__trust--plain">
                  {copy.trust.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              </>
            ) : null}

            {page === "contact" ? (
              <>
                <NxPageHero
                  src={YARD}
                  focus="center 16%"
                  kicker={copy.contactNav}
                  title={copy.contactTitle}
                  lede={copy.contactLede}
                />
              <article className="lp-ex-nx__page">
                <p className="lp-ex-nx__phone">
                  <Icon name="phone" />
                  <span>
                    {copy.phoneLabel}
                    <strong>{copy.phone}</strong>
                  </span>
                </p>
                {sent ? (
                  <p className="lp-ex-nx__thanks">{copy.form.thanks}</p>
                ) : (
                  <form className="lp-ex-nx__form" onSubmit={onQuote}>
                    <label>
                      {copy.form.name}
                      <input name="name" autoComplete="off" />
                    </label>
                    <label>
                      {copy.form.phone}
                      <input name="phone" autoComplete="off" />
                    </label>
                    <label>
                      {copy.form.email}
                      <input name="email" type="email" autoComplete="off" />
                    </label>
                    <label>
                      {copy.form.need}
                      <select name="need" defaultValue={copy.services[0]?.nav}>
                        {copy.services.map((item) => (
                          <option key={item.id}>{item.nav}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      {copy.form.message}
                      <textarea name="message" rows={3} />
                    </label>
                    {error ? <p className="lp-ex-nx__error">{copy.form.error}</p> : null}
                    <button type="submit" className="lp-ex-nx__quote">
                      {copy.form.send}
                    </button>
                  </form>
                )}
              </article>
              </>
            ) : null}

            <footer className="lp-ex-nx__foot">
              <div className="lp-ex-nx__foot-brand">
                <button type="button" className="lp-ex-nx__logo" onClick={() => go("home")}>
                  <Wordmark trade={copy.trade} />
                </button>
                <p>{copy.footerBlurb}</p>
                <CallButton label={copy.phone} onClick={() => go("contact")} />
              </div>
              <div className="lp-ex-nx__foot-grid">
                <div>
                  <h2>{copy.footerServices}</h2>
                  <ul>
                    {copy.services.map((item) => (
                      <li key={item.id}>
                        <button type="button" onClick={() => go(item.id)}>
                          {item.nav}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2>{copy.footerCompany}</h2>
                  <ul>
                    <li>
                      <button type="button" onClick={() => go("about")}>
                        {copy.aboutNav}
                      </button>
                    </li>
                    <li>
                      <button type="button" onClick={() => go("gallery")}>
                        {copy.galleryNav}
                      </button>
                    </li>
                    <li>
                      <button type="button" onClick={() => go("contact")}>
                        {copy.contactNav}
                      </button>
                    </li>
                    <li>
                      <button type="button" onClick={() => go("areas")}>
                        {copy.areasNav}
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="lp-ex-nx__foot-areas">
                  <h2>{copy.footerAreas}</h2>
                  <ul>
                    {copy.towns.map((town) => (
                      <li key={town.name}>
                        <button type="button" onClick={() => go("areas", townAnchor(town.name))}>
                          {town.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="lp-ex-nx__foot-note">{copy.since}</p>
            </footer>
          </div>
        </div>
      </div>
      {phone ? (
        <div className="lp-ex-nx__dock">
          <button type="button" className="lp-ex-nx__quote" onClick={() => go("contact")}>
            {copy.quote}
          </button>
          <CallButton label={copy.call} onClick={() => go("contact")} />
        </div>
      ) : null}
    </div>
  );
}

function townAnchor(name: string) {
  return `town-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function nxPath(page: NxPageId, copy: NxExampleCopy) {
  if (page === "home") return "";
  if (page === "areas") return "/service-areas";
  if (page === "gallery") return "/gallery";
  if (page === "about") return "/about";
  if (page === "contact") return "/contact";
  return copy.services.find((item) => item.id === page)?.path ?? "";
}

function DemoPane({
  kind,
  layout,
  copy,
  tone,
}: {
  kind: "wp" | "nx";
  layout: ExampleViewpoint;
  copy: GreenfieldExampleCopy;
  tone: "light" | "dark";
}) {
  const [host, setHost] = useState(
    kind === "wp" ? copy.wp.domain : copy.nx.domain,
  );
  return (
    <Frame layout={layout} tone={tone} host={host}>
      {kind === "wp" ? (
        <WpSite layout={layout} copy={copy.wp} onHost={setHost} />
      ) : (
        <NxSite layout={layout} copy={copy.nx} onHost={setHost} />
      )}
    </Frame>
  );
}

export function GreenfieldExamples({
  locale,
  beforeColumn,
  afterColumn,
}: {
  locale: Locale;
  beforeColumn?: ReactNode;
  afterColumn?: ReactNode;
}) {
  const copy = getGreenfieldExampleCopy(locale);
  const [side, setSide] = useState<"before" | "after">("before");

  return (
    <div className="lp-web-pain__stage lp-web-pain__stage--overlap lp-ex-stage lp-ex-stage--phone lp-ex-stage--switch">
      <div className="lp-ex__switch">
        <p className="lp-ex__hint">{copy.hint}</p>
        <div className="lp-ex__views" role="radiogroup" aria-label={copy.switchLabel}>
          <button
            type="button"
            role="radio"
            aria-checked={side === "before"}
            onClick={() => setSide("before")}
          >
            {copy.beforeCaption}
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={side === "after"}
            onClick={() => setSide("after")}
          >
            {copy.afterCaption}
          </button>
        </div>
      </div>
      <figure
        className={`lp-web-pain__shot${side === "before" ? " is-active" : ""}`}
        aria-label={copy.frameBefore}
      >
        <DemoPane kind="wp" layout="phone" copy={copy} tone="light" />
        <figcaption>
          <strong>{copy.beforeCaption}</strong>
          <span>{copy.beforeNote}</span>
        </figcaption>
      </figure>
      <div className={`lp-ex__pane${side === "before" ? " is-active" : ""}`}>{beforeColumn}</div>
      <figure
        className={`lp-web-pain__shot lp-web-pain__shot--after${side === "after" ? " is-active" : ""}`}
        aria-label={copy.frameAfter}
      >
        <DemoPane kind="nx" layout="phone" copy={copy} tone="dark" />
        <figcaption>
          <strong>{copy.afterCaption}</strong>
          <span>{copy.afterNote}</span>
        </figcaption>
      </figure>
      <div className={`lp-ex__pane${side === "after" ? " is-active" : ""}`}>{afterColumn}</div>
    </div>
  );
}

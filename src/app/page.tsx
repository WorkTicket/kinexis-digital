import Image from "next/image";

const CONTACT_EMAIL = "hello@kinexisdigital.com";
const CONTACT_PHONE = "+13075003371";

export default function HomePage() {
  return (
    <>
      <header className="mx-auto flex w-full max-w-page items-center justify-between px-6 py-6 sm:px-10">
        <Image
          src="/assets/logos/kinexis-logo-on-light.webp"
          alt="Kinexis Digital"
          width={180}
          height={44}
          priority
          className="h-9 w-auto"
        />
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="rounded-control bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-opacity hover:opacity-80"
        >
          Start a project
        </a>
      </header>

      <main
        id="main"
        className="mx-auto grid w-full max-w-page gap-12 px-6 pb-section sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
      >
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Web design · Branding · Marketing
          </p>

          <h1 className="mt-6 font-display text-hero text-balance">
            Websites that turn local searches into booked work.
          </h1>

          <p className="mt-6 max-w-readable text-lg leading-relaxed text-muted">
            Kinexis Digital builds fast, clear websites for service businesses —
            then helps the right customers find them.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="rounded-control bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong"
            >
              Start a project
            </a>
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="rounded-control border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface"
            >
              (307) 500-3371
            </a>
          </div>
        </section>

        <div className="relative aspect-[4/5] overflow-hidden rounded-media bg-surface">
          <Image
            src="/assets/kinexis/photos/commercial.webp"
            alt="Commercial space photographed for the Kinexis Digital brand system"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </main>

      <footer className="mx-auto flex w-full max-w-page flex-col gap-2 border-t border-line px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p>© {new Date().getFullYear()} Kinexis Digital</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="transition-colors hover:text-ink"
        >
          {CONTACT_EMAIL}
        </a>
      </footer>
    </>
  );
}

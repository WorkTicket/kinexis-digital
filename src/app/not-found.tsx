import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-dvh w-full max-w-page flex-col items-start justify-center px-6 py-24 sm:px-10"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
        404
      </p>
      <h1 className="mt-4 font-display text-section">Page not found</h1>
      <p className="mt-4 max-w-readable text-lg text-muted">
        The page you are looking for moved or no longer exists.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-control bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong"
      >
        Back to home
      </Link>
    </main>
  );
}

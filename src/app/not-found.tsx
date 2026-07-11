import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page Not Found | KINEXIS Digital",
  description: "This page does not exist. Return to the KINEXIS Digital homepage or contact us to find what you need.",
  robots: { index: false, follow: false },
};

export default function RootNotFound() {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg text-foreground antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center px-8 text-center">
          <span className="mb-6 inline-block rounded-full border border-neon-cyan/20 bg-neon-cyan/[0.06] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-neon-cyan">
            404
          </span>

          <h1 className="text-4xl font-bold">Page not found</h1>
          <p className="mt-4 max-w-lg leading-relaxed text-muted">
            The page you&apos;re looking for doesn&apos;t exist. Head back to the homepage to find
            what you need.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/en"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-text-secondary no-underline transition-colors hover:bg-white/[0.08] hover:text-text"
            >
              Homepage
            </Link>
            <Link
              href="/en/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-neon-cyan px-5 py-2.5 text-sm font-bold text-bg no-underline transition-shadow hover:shadow-glow-sm"
            >
              Book a strategy call
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    absolute: "Page Not Found | Kinexis Digital",
  },
  description:
    "This page does not exist. Return to the homepage or contact us to find what you need.",
  robots: { index: false, follow: false },
};

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="text-foreground antialiased">
        <main className="not-found-shell">
          <div className="shell">
            <div className="mx-auto w-full max-w-2xl">
              <p className="section-eyebrow mb-5">404</p>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.35rem,8vw_+_0.25rem,4.85rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance">
                Page not found.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                The page you&apos;re looking for doesn&apos;t exist. Head back
                home or book a call and we&apos;ll point you the right way.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/" size="lg" arrow>
                  Back to home
                </Button>
                <Button href="/contact" variant="link" arrow>
                  Book a strategy call
                </Button>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}

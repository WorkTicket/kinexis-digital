"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    try {
      Sentry.captureException(error);
    } catch {
      console.error("[KINEXIS] Global error:", error);
    }
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="bg-bg text-foreground antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-8 text-center">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="max-w-md leading-relaxed text-muted">
            An unexpected error occurred. We&apos;ve been notified and will look into it.
          </p>
          <button
            onClick={reset}
            className="rounded-xl bg-neon-cyan px-6 py-2.5 text-sm font-bold text-bg transition-shadow hover:shadow-glow-sm"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}

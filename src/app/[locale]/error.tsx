"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function Error({
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
      console.error("[KINEXIS] Route error:", error);
    }
  }, [error]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <h2 className="text-xl font-bold">Something went wrong</h2>
        <p className="mt-3 leading-relaxed text-muted">
          An error occurred while loading this page. Please try again.
        </p>
        <button
          onClick={reset}
          className="mt-6 rounded-xl bg-neon-cyan px-5 py-2.5 text-sm font-bold text-bg transition-shadow hover:shadow-glow-sm"
        >
          Try again
        </button>
      </div>
    </main>
  );
}

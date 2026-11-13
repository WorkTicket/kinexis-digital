"use client";

import LocaleError from "@/components/LocaleError";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <LocaleError error={error} reset={reset} homeHref="/es" />;
}

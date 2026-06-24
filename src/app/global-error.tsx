"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#05060a",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          padding: "2rem",
          gap: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
          Something went wrong
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "420px", lineHeight: 1.7, margin: 0 }}>
          An unexpected error occurred. We&apos;ve been notified and will look into it.
        </p>
        <button
          onClick={reset}
          style={{
            padding: "0.625rem 1.5rem",
            borderRadius: "0.75rem",
            background: "#00d4ff",
            color: "#05060a",
            border: "none",
            fontWeight: 700,
            fontSize: "0.875rem",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors for observability
    console.error("Unhandled client error:", error);
  }, [error]);

  return (
    <div className="section">
      <div className="container center" style={{ maxWidth: 640, margin: "4rem auto", textAlign: "center" }}>
        <p className="eyebrow" style={{ color: "#0b3dff", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Unexpected Error
        </p>
        <h1 style={{ fontSize: "2.5rem", margin: "1rem 0" }}>Something went wrong</h1>
        <p className="muted" style={{ margin: "1rem 0 2rem", lineHeight: 1.6 }}>
          We ran into an issue while loading this page. You can try refreshing the section, return home, or reach out to us directly.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => reset()}
          >
            Try Again
          </button>
          <Link href="/" className="btn btn--outline" prefetch={false}>
            Return Home
          </Link>
        </div>
        <p style={{ fontSize: "0.95rem", color: "#64748b" }}>
          Need immediate help? Call <a href={`tel:${SITE.phoneE164}`} style={{ color: "#0b3dff", fontWeight: 700 }}>{SITE.phone}</a> or email <a href={`mailto:${SITE.email}`} style={{ color: "#0b3dff", fontWeight: 700 }}>{SITE.email}</a>.
        </p>
      </div>
    </div>
  );
}

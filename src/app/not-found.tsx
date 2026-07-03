import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | KINEXIS Digital",
  description: "This page does not exist. Return to the KINEXIS Digital homepage or contact us to find what you need.",
  robots: { index: false, follow: false },
};

export default function RootNotFound() {
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
        }}
      >
        <span
          style={{
            display: "inline-block",
            marginBottom: "1.5rem",
            borderRadius: "9999px",
            border: "1px solid rgba(0,212,255,0.2)",
            background: "rgba(0,212,255,0.06)",
            padding: "0.375rem 1rem",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#00d4ff",
          }}
        >
          404
        </span>

        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, margin: "0 0 1rem" }}>
          Page not found
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "480px", lineHeight: 1.7 }}>
          The page you&apos;re looking for doesn&apos;t exist. Head back to the homepage to find
          what you need.
        </p>

        <div style={{ marginTop: "2.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.625rem 1.25rem",
              borderRadius: "0.75rem",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.8)",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            Homepage
          </Link>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.625rem 1.25rem",
              borderRadius: "0.75rem",
              background: "#00d4ff",
              color: "#05060a",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: 700,
            }}
          >
            Book a strategy call
          </Link>
        </div>
      </body>
    </html>
  );
}

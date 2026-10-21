import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  src: [
    { path: "../fonts/kinexis-display/KinexisDisplay-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/kinexis-display/KinexisDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/kinexis-display/KinexisDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/kinexis-display/KinexisDisplay-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/kinexis-display/KinexisDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-kinexis-display",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const text = localFont({
  src: [
    { path: "../fonts/kinexis-text/KinexisText-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/kinexis-text/KinexisText-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/kinexis-text/KinexisText-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/kinexis-text/KinexisText-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/kinexis-text/KinexisText-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-kinexis-text",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kinexisdigital.com";

const description =
  "Kinexis Digital designs and builds fast, clear websites for local service businesses.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Kinexis Digital",
  title: {
    default: "Kinexis Digital — Websites for local service businesses",
    template: "%s | Kinexis Digital",
  },
  description,
  authors: [{ name: "Kinexis Digital", url: siteUrl }],
  creator: "Kinexis Digital",
  publisher: "Kinexis Digital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Kinexis Digital",
    title: "Kinexis Digital — Websites for local service businesses",
    description,
    images: [
      {
        url: "/assets/images/kinexis_OG_image.webp",
        alt: "Kinexis Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kinexis Digital",
    description,
    images: ["/assets/images/kinexis_OG_image.webp"],
  },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <body className="min-h-dvh bg-paper font-sans text-ink antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

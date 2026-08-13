import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: "KINEXIS Digital",
  authors: [{ name: "KINEXIS Digital", url: getSiteUrl() }],
  creator: "KINEXIS Digital",
  publisher: "KINEXIS Digital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

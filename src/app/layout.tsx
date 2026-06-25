import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/metadata";

const GSC_VERIFICATION =
  process.env.NEXT_PUBLIC_GSC_VERIFICATION ??
  "7uGCkyYE9LslqA7saQP7jpc0HrzVlVZvds1YX02sr6Q";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  verification: {
    google: GSC_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

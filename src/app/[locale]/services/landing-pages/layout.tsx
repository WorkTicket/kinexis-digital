import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("landing-pages");

export default function LandingPagesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

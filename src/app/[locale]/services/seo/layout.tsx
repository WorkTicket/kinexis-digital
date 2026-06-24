import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("seo");

export default function SeoLayout({ children }: { children: React.ReactNode }) {
  return children;
}

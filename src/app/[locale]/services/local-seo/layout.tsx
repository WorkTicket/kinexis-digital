import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("local-seo");

export default function LocalSeoLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("content-marketing");

export default function ContentMarketingLayout({ children }: { children: React.ReactNode }) {
  return children;
}

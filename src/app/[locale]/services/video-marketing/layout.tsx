import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("video-marketing");

export default function VideoMarketingLayout({ children }: { children: React.ReactNode }) {
  return children;
}

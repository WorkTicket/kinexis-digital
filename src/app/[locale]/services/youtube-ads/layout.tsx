import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("youtube-ads");

export default function YouTubeAdsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

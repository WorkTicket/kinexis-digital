import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("social-media");

export default function SocialMediaLayout({ children }: { children: React.ReactNode }) {
  return children;
}

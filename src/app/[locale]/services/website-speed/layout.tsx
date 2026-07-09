import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("website-speed");

export default function WebsiteSpeedLayout({ children }: { children: React.ReactNode }) {
  return children;
}

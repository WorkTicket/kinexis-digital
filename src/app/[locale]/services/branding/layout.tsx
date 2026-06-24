import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("branding");

export default function BrandingLayout({ children }: { children: React.ReactNode }) {
  return children;
}

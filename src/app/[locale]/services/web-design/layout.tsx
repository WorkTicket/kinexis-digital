import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("web-design");

export default function WebDesignLayout({ children }: { children: React.ReactNode }) {
  return children;
}

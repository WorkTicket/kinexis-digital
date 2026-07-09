import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("website-maintenance");

export default function WebsiteMaintenanceLayout({ children }: { children: React.ReactNode }) {
  return children;
}

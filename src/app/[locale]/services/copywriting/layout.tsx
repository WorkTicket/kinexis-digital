import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("copywriting");

export default function CopywritingLayout({ children }: { children: React.ReactNode }) {
  return children;
}

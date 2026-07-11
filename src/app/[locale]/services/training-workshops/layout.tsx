import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("training-workshops");

export default function TrainingWorkshopsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

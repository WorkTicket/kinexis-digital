import type { LucideIcon } from "lucide-react";
import {
  Hammer,
  LayoutGrid,
  Layers,
  Mail,
  Store,
  TrendingUp,
} from "lucide-react";
import type { ExploreIconId } from "@/content/home-links";

export const exploreIcons: Record<ExploreIconId, LucideIcon> = {
  industries: LayoutGrid,
  "home-services": Hammer,
  ecommerce: Store,
  services: Layers,
  work: TrendingUp,
  contact: Mail,
};

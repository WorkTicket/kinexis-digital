import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Crosshair,
  Layers,
  LineChart,
  Mail,
  Map,
  Megaphone,
  MessageSquare,
  RefreshCw,
  Search,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";

const PARTNERSHIP_ICONS = [Users, MessageSquare, LineChart] as const;

const METHOD_ICONS = [Search, Map, Wrench, RefreshCw, TrendingUp] as const;

const ARCHITECTURE_ICONS: Record<string, LucideIcon> = {
  seo: Search,
  "paid-ads": Megaphone,
  "web-design": Layers,
  analytics: BarChart3,
  cro: Crosshair,
  email: Mail,
};

export function partnershipIcon(index: number): LucideIcon {
  return PARTNERSHIP_ICONS[index % PARTNERSHIP_ICONS.length] ?? Users;
}

export function methodIcon(index: number): LucideIcon {
  return METHOD_ICONS[index % METHOD_ICONS.length] ?? Search;
}

export function architectureIcon(id: string): LucideIcon {
  return ARCHITECTURE_ICONS[id] ?? Layers;
}

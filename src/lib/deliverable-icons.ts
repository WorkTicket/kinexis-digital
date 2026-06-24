import {
  BarChart3,
  BookOpen,
  ClipboardList,
  Code2,
  FileText,
  FlaskConical,
  Globe,
  GraduationCap,
  Layers,
  LayoutGrid,
  Lightbulb,
  LineChart,
  Link2,
  Mail,
  Map,
  MapPin,
  Megaphone,
  Monitor,
  MousePointerClick,
  Palette,
  PenLine,
  Plug,
  Rocket,
  Search,
  Share2,
  Star,
  Target,
  TrendingUp,
  Users,
  Video,
  Workflow,
  type LucideIcon,
} from "lucide-react";

type IconRule = {
  keywords: string[];
  icon: LucideIcon;
};

const deliverableRules: IconRule[] = [
  { keywords: ["google business", "gbp", "map pack"], icon: MapPin },
  { keywords: ["citation", "nap"], icon: Link2 },
  { keywords: ["review"], icon: Star },
  { keywords: ["location page", "local rank", "local link"], icon: MapPin },
  { keywords: ["pixel", "tag manager", "ga4", "gtm"], icon: LineChart },
  { keywords: ["dashboard", "reporting", "report", "analytics"], icon: BarChart3 },
  { keywords: ["conversion tracking", "tracking setup", "funnel analytics"], icon: LineChart },
  { keywords: ["crm", "integration", "routing"], icon: Plug },
  { keywords: ["email", "automation sequence", "automation workflow"], icon: Mail },
  { keywords: ["workflow", "automation"], icon: Workflow },
  { keywords: ["a/b", "multivariate", "testing program", "creative testing"], icon: FlaskConical },
  { keywords: ["hypothesis"], icon: Lightbulb },
  { keywords: ["landing page", "lead magnet", "page template"], icon: Monitor },
  { keywords: ["funnel"], icon: Target },
  { keywords: ["retargeting", "audience"], icon: Users },
  { keywords: ["campaign", "ppc", "google ads", "meta ads", "paid media", "ad copy"], icon: Megaphone },
  { keywords: ["keyword", "negative list"], icon: Search },
  { keywords: ["performance max", "shopping"], icon: TrendingUp },
  { keywords: ["video", "production", "editing", "storyboard", "script"], icon: Video },
  { keywords: ["social", "community", "scheduling", "platform strategy"], icon: Share2 },
  { keywords: ["segmentation"], icon: Layers },
  { keywords: ["content calendar", "editorial", "blog", "article", "guide", "case stud"], icon: FileText },
  { keywords: ["copy", "messaging", "scriptwriting"], icon: PenLine },
  { keywords: ["brand guideline", "collateral", "visual identity", "logo"], icon: Palette },
  { keywords: ["brand strategy", "positioning", "messaging framework"], icon: BookOpen },
  { keywords: ["discovery", "wireframe", "ux", "architecture", "sitemap"], icon: LayoutGrid },
  { keywords: ["audit", "scorecard", "opportunity map"], icon: ClipboardList },
  { keywords: ["strategy", "roadmap", "plan", "competitive", "market analysis"], icon: Map },
  { keywords: ["design", "mockup", "visual"], icon: Palette },
  { keywords: ["development", "responsive", "build", "cms"], icon: Code2 },
  { keywords: ["conversion", "cro", "cta", "form"], icon: MousePointerClick },
  { keywords: ["seo", "schema", "meta", "on-page"], icon: Globe },
  { keywords: ["launch", "training", "handoff", "rollout"], icon: Rocket },
  { keywords: ["optimization", "bid", "budget"], icon: TrendingUp },
  { keywords: ["link building", "digital pr", "outreach"], icon: Link2 },
  { keywords: ["content production", "content strategy", "distribution"], icon: FileText },
  { keywords: ["technical seo"], icon: Search },
  { keywords: ["on-page optimization"], icon: Globe },
  { keywords: ["session", "research", "user research"], icon: Users },
  { keywords: ["quarterly", "strategy session", "strategy review"], icon: GraduationCap },
];

const comparisonRules: IconRule[] = [
  { keywords: ["cost", "investment", "budget", "salary"], icon: BarChart3 },
  { keywords: ["speed", "vitals", "load"], icon: TrendingUp },
  { keywords: ["conversion", "lift", "roas"], icon: MousePointerClick },
  { keywords: ["seo", "ranking", "organic"], icon: Globe },
  { keywords: ["strategy", "ux"], icon: LayoutGrid },
  { keywords: ["time", "launch", "setup"], icon: Rocket },
  { keywords: ["tracking", "reporting", "attribution"], icon: LineChart },
  { keywords: ["flexibility", "scale"], icon: Layers },
  { keywords: ["tool", "stack"], icon: Plug },
  { keywords: ["technical", "content", "link"], icon: Link2 },
  { keywords: ["maintenance"], icon: Monitor },
  { keywords: ["editor", "platform"], icon: Code2 },
  { keywords: ["visibility", "map pack"], icon: MapPin },
  { keywords: ["competitive", "moat"], icon: Target },
  { keywords: ["creative", "testing"], icon: FlaskConical },
  { keywords: ["cross-channel", "channel"], icon: Share2 },
  { keywords: ["deliverability"], icon: Mail },
  { keywords: ["design"], icon: Palette },
];

function matchIcon(text: string, rules: IconRule[], fallback: LucideIcon): LucideIcon {
  const normalized = text.toLowerCase();
  for (const rule of rules) {
    if (rule.keywords.some((keyword) => normalized.includes(keyword))) {
      return rule.icon;
    }
  }
  return fallback;
}

export function getDeliverableIcon(title: string): LucideIcon {
  return matchIcon(title, deliverableRules, FileText);
}

export function getComparisonIcon(label: string): LucideIcon {
  return matchIcon(label, comparisonRules, Target);
}

import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  BadgeCheck,
  BarChart3,
  ClipboardCheck,
  Clock,
  Filter,
  GitBranch,
  Handshake,
  Palette,
  Route,
  Search,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

export function getHelpIcon(title: string): LucideIcon {
  const t = title.toLowerCase();

  if (/search|seo|maps|local|organic|visibility|ranking/i.test(t))
    return Search;

  if (/page|site|conversion|landing|booking|checkout|cart|experience|ux/i.test(t))
    return AppWindow;

  if (/paid|ads?[\s,]|acquisition|media|campaign|pipeline|demand|generation/i.test(t))
    return Target;

  if (/brand|message|positioning|narrative|voice|identity/i.test(t))
    return Palette;

  if (/architect|multi.?location|multi.?unit|structure|system/i.test(t))
    return GitBranch;

  if (/reputation|review|signal|trust/i.test(t))
    return Star;

  if (/onboard|signup|funnel|path/i.test(t))
    return Filter;

  return Target;
}

export function getWhyIcon(title: string): LucideIcon {
  const t = title.toLowerCase();

  if (/margin|scoreboard|revenue|contribution|quality/i.test(t))
    return BarChart3;
  if (/site|media|room|together|system/i.test(t)) return GitBranch;
  if (/promo|discount|coupon|addiction/i.test(t)) return Shield;
  if (/time|staff|attorney|desk|capacity/i.test(t)) return Clock;
  if (/compliant|specific|message|claim/i.test(t)) return BadgeCheck;
  if (/consult|retainer|matter|fit/i.test(t)) return Handshake;
  if (/crew|truck|operator|owner|team/i.test(t)) return Users;
  if (/trust|review|proof/i.test(t)) return Star;

  return BadgeCheck;
}

const PROCESS_FALLBACK: LucideIcon[] = [
  Search,
  Route,
  TrendingUp,
  ClipboardCheck,
];

/** Icons for industry engagement steps — Lucide, same family as IndustryGlyph. */
export function getProcessIcon(title: string, index = 0): LucideIcon {
  const t = title.toLowerCase();

  if (/map|audit|find|define|journey|leak/i.test(t)) return Search;
  if (/rebuild|build|align|intake|path|pages|condition/i.test(t)) return Route;
  if (/compound|scale|layer|run|paid/i.test(t) && !/protect/i.test(t))
    return TrendingUp;
  if (/staff|protect|own|monitor|reinforce|margin/i.test(t))
    return ClipboardCheck;

  return PROCESS_FALLBACK[Math.min(index, PROCESS_FALLBACK.length - 1)];
}

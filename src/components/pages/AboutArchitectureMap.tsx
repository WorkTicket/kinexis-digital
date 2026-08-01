import {
  Activity,
  BarChart3,
  Mail,
  Monitor,
  MousePointerClick,
  Search,
  type LucideIcon,
} from "lucide-react";
import type { ArchitectureNode } from "@/content/about";
import Card from "@/components/ui/Card";
import { featureCardGridClass } from "@/lib/card-styles";

const NODE_ICONS: Record<string, LucideIcon> = {
  seo: Search,
  "paid-ads": BarChart3,
  "web-design": Monitor,
  analytics: Activity,
  cro: MousePointerClick,
  email: Mail,
};

type Props = {
  nodes: ArchitectureNode[];
  caption: string;
};

/** Static channel grid — no interaction, industry-standard capabilities layout. */
export default function AboutArchitectureMap({ nodes, caption }: Props) {
  return (
    <div>
      <ul className={featureCardGridClass(3)} role="list">
        {nodes.map((node) => {
          const Icon = NODE_ICONS[node.id] ?? Activity;

          return (
            <li key={node.id}>
              <Card hover={false} className="flex h-full flex-col">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/5">
                  <Icon className="h-5 w-5 text-neon-cyan" aria-hidden />
                </div>
                <h3 className="card-heading">{node.label}</h3>
                <p className="mt-2 text-sm font-medium text-neon-cyan/70">{node.role}</p>
                <p className="mt-4 flex-1 type-body text-muted">{node.summary}</p>
              </Card>
            </li>
          );
        })}
      </ul>

      <p className="mt-10 text-center text-sm leading-relaxed text-muted">{caption}</p>
    </div>
  );
}

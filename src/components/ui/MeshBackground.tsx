import { cn } from "@/lib/utils";
import DeferredMeshPoly from "@/components/ui/DeferredMeshPoly";
import "@/styles/components/mesh.css";

type Props = {
  variant?: "hero" | "section" | "footer";
  showNodes?: boolean;
  className?: string;
};

const VARIANT_CLASS = {
  hero: "mesh-variant-hero",
  section: "mesh-variant-section",
  footer: "mesh-variant-footer",
} as const;

export default function MeshBackground({
  variant = "hero",
  showNodes = false,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "mesh-background",
        `mesh-background--${variant}`,
        showNodes && "mesh-background--nodes",
        className
      )}
      aria-hidden="true"
    >
      <div className={cn("mesh-layer", VARIANT_CLASS[variant])} />
      <DeferredMeshPoly />
      <div className="mesh-grade" />
      <div className="mesh-contrast" />
      <div className="mesh-glow" />
      <div className="mesh-vignette" />
      <div className="mesh-streaks" />
      <div className="mesh-glass" />
      <div className="mesh-grain" />
      <div className="mesh-overlay" />
    </div>
  );
}

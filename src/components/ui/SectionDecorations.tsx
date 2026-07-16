import { cn } from "@/lib/utils";

const ORB_COLORS = { cyan: "#00d4ff", blue: "#0099cc" } as const;
const ORB_SIZES = {
  sm: { width: 288, height: 288 },
  md: { width: 400, height: 400 },
  lg: { width: 480, height: 480 },
  xl: { width: 500, height: 500 },
} as const;
const ORB_BLURS = { sm: 100, md: 120, lg: 140, xl: 140 } as const;

type Position = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  transform?: string;
};

type GlowOrbProps = {
  color?: "cyan" | "blue";
  size?: keyof typeof ORB_SIZES;
  width?: number;
  height?: number;
  opacity?: number;
  blur?: number;
  position?: Position;
};

export function SectionGlow({ color = "cyan", size = "md", width, height, opacity = 0.04, blur, position }: GlowOrbProps) {
  const preset = ORB_SIZES[size];
  const dims = { width: width ?? preset.width, height: height ?? preset.height };
  const blurValue = blur ?? ORB_BLURS[size];
  const hex = ORB_COLORS[color];

  return (
    <div
      className="pointer-events-none absolute rounded-full"
      style={{
        width: dims.width,
        height: dims.height,
        backgroundColor: hex,
        opacity,
        filter: `blur(${blurValue}px)`,
        ...position,
      }}
      aria-hidden
    />
  );
}

type SectionDividerProps = {
  color?: "white" | "cyan";
};

export function SectionDivider({ color = "white" }: SectionDividerProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 h-px",
        color === "cyan"
          ? "bg-gradient-to-r from-transparent via-neon-cyan/[0.15] to-transparent"
          : "bg-gradient-to-r from-transparent via-white/[0.1] to-transparent",
      )}
      aria-hidden
    />
  );
}

type SectionGridOverlayProps = {
  cellSize?: number;
  opacity?: number;
};

export function SectionGridOverlay({ cellSize = 28, opacity = 0.4 }: SectionGridOverlayProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
        backgroundSize: `${cellSize}px ${cellSize}px`,
        opacity,
      }}
      aria-hidden
    />
  );
}

"use client";

import { useId } from "react";

type Props = {
  before: number;
  after: number;
  beforeLabel?: string;
  afterLabel?: string;
  unit?: string;
  lowerIsBetter?: boolean;
  height?: number;
  className?: string;
};

function formatDisplay(value: number, unit?: string) {
  if (unit === "time") {
    const mins = Math.floor(value);
    const secs = Math.round((value - mins) * 60);
    return `${mins}:${String(secs).padStart(2, "0")}`;
  }
  if (unit === "%") return `${value}%`;
  return `${value}`;
}

export default function BeforeAfterBarChart({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  unit,
  lowerIsBetter = false,
  height = 160,
  className = "",
}: Props) {
  const uid = useId().replace(/:/g, "");
  const beforeGradId = `beforeBarGrad-${uid}`;
  const afterGradId = `afterBarGrad-${uid}`;

  const width = 280;
  const padding = { top: 12, right: 16, bottom: 36, left: 16 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const max = Math.max(before, after) * 1.15;
  const beforeH = (before / max) * chartH;
  const afterH = (after / max) * chartH;
  const barW = 56;
  const gap = chartW - barW * 2;
  const beforeX = padding.left;
  const afterX = padding.left + barW + gap;
  const baselineY = padding.top + chartH;

  const improved = lowerIsBetter ? after < before : after > before;

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient id={beforeGradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f87171" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id={afterGradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0099cc" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        <line
          x1={padding.left}
          y1={baselineY}
          x2={width - padding.right}
          y2={baselineY}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />

        <rect
          x={beforeX}
          y={baselineY - beforeH}
          width={barW}
          height={beforeH}
          rx={4}
          fill={`url(#${beforeGradId})`}
        />

        <rect
          x={afterX}
          y={baselineY - afterH}
          width={barW}
          height={afterH}
          rx={4}
          fill={`url(#${afterGradId})`}
        />

        <text
          x={beforeX + barW / 2}
          y={baselineY - beforeH - 8}
          textAnchor="middle"
          fill="rgba(248,113,113,0.9)"
          fontSize="11"
          fontWeight="600"
        >
          {formatDisplay(before, unit)}
        </text>

        <text
          x={afterX + barW / 2}
          y={baselineY - afterH - 8}
          textAnchor="middle"
          fill={improved ? "rgba(0, 212, 255,0.95)" : "rgba(255,255,255,0.5)"}
          fontSize="11"
          fontWeight="700"
        >
          {formatDisplay(after, unit)}
        </text>

        <text
          x={beforeX + barW / 2}
          y={height - 10}
          textAnchor="middle"
          fill="rgba(248,113,113,0.65)"
          fontSize="10"
          fontWeight="600"
        >
          {beforeLabel}
        </text>

        <text
          x={afterX + barW / 2}
          y={height - 10}
          textAnchor="middle"
          fill="rgba(0, 212, 255,0.75)"
          fontSize="10"
          fontWeight="600"
        >
          {afterLabel}
        </text>
      </svg>
    </div>
  );
}

"use client";

import { m as motion } from "@/lib/framer";

type Props = {
  data: number[];
  labels?: string[];
  unit?: string;
  height?: number;
  className?: string;
};

function formatValue(value: number, unit?: string) {
  if (unit?.includes("$")) {
    return value >= 10 ? `${value}K` : value < 1 ? value.toFixed(1) : `${value}`;
  }
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

export default function GrowthBarChart({
  data,
  labels,
  unit,
  height = 160,
  className = "",
}: Props) {
  const width = 320;
  const padding = { top: 20, right: 12, bottom: 28, left: 36 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const min = 0;
  const max = Math.max(...data) * 1.12;
  const range = max - min || 1;
  const barGap = 5;
  const barW = (chartW - barGap * (data.length - 1)) / data.length;

  const bars = data.map((v, i) => {
    const barH = ((v - min) / range) * chartH;
    const x = padding.left + i * (barW + barGap);
    const y = padding.top + chartH - barH;
    return { x, y, barH, v, i };
  });

  const yTicks = [0, 0.5, 1].map((pct) => ({
    pct,
    value: min + range * pct,
    y: padding.top + chartH * (1 - pct),
  }));

  const startVal = data[0];
  const endVal = data[data.length - 1];
  const gradId = `growthBarGrad-${data.join("-")}`;

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-[10px] font-medium text-white/40">
          {formatValue(startVal, unit)}
          {unit && !unit.includes("$") ? ` ${unit}` : unit?.includes("$") ? "/mo" : ""}
        </span>
        <span className="text-[10px] font-semibold text-neon-cyan/80">
          {formatValue(endVal, unit)}
          {unit && !unit.includes("$") ? ` ${unit}` : unit?.includes("$") ? "/mo" : ""}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0099cc" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {yTicks.map(({ pct, value, y }) => (
          <g key={pct}>
            <line
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
            {pct > 0 && (
              <text
                x={padding.left - 6}
                y={y + 3}
                textAnchor="end"
                fill="rgba(255,255,255,0.25)"
                fontSize="8"
              >
                {formatValue(value, unit)}
              </text>
            )}
          </g>
        ))}

        <line
          x1={padding.left}
          y1={padding.top + chartH}
          x2={width - padding.right}
          y2={padding.top + chartH}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />

        {bars.map(({ x, y, barH, i }) => {
          const progress = i / (data.length - 1);
          return (
            <motion.rect
              key={i}
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx={2}
              fill={`url(#${gradId})`}
              opacity={0.4 + progress * 0.6}
              initial={{ height: 0, y: padding.top + chartH }}
              whileInView={{ height: barH, y }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          );
        })}

        {labels &&
          labels.map((label, i) => (
            <text
              key={`${label}-${i}`}
              x={(bars[i]?.x ?? 0) + barW / 2}
              y={height - 6}
              textAnchor="middle"
              fill={i === labels.length - 1 ? "rgba(0, 212, 255,0.7)" : "rgba(255,255,255,0.3)"}
              fontSize="9"
              fontWeight={i === labels.length - 1 ? "600" : "500"}
            >
              {label}
            </text>
          ))}
      </svg>
    </div>
  );
}

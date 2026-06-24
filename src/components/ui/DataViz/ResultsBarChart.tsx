"use client";

import { m as motion } from "@/lib/framer";

type Props = {
  data: number[];
  labels?: string[];
  height?: number;
  className?: string;
};

export default function ResultsBarChart({
  data,
  labels,
  height = 180,
  className = "",
}: Props) {
  const width = 320;
  const padding = { top: 16, right: 12, bottom: 28, left: 12 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const min = 0;
  const max = Math.max(...data) * 1.08;
  const range = max - min || 1;
  const barGap = 6;
  const barW = (chartW - barGap * (data.length - 1)) / data.length;

  const bars = data.map((v, i) => {
    const barH = ((v - min) / range) * chartH;
    const x = padding.left + i * (barW + barGap);
    const y = padding.top + chartH - barH;
    return { x, y, barH, v, i };
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full ${className}`}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="resultsBarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0099cc" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="resultsBarPeak" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.5" />
        </linearGradient>
        <filter id="resultsBarGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Baseline */}
      <line
        x1={padding.left}
        y1={padding.top + chartH}
        x2={width - padding.right}
        y2={padding.top + chartH}
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />

      {bars.map(({ x, y, barH, i }) => {
        const isPeak = i === bars.length - 1;
        const isStart = i === 0;
        const progress = i / (data.length - 1);
        return (
          <motion.rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={barH}
            rx={3}
            fill={isPeak ? "url(#resultsBarPeak)" : "url(#resultsBarGrad)"}
            opacity={isStart ? 0.45 : isPeak ? 1 : 0.5 + progress * 0.4}
            filter={isPeak ? "url(#resultsBarGlow)" : undefined}
            initial={{ height: 0, y: padding.top + chartH }}
            whileInView={{ height: barH, y }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.15 + i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        );
      })}

      {labels &&
        labels.map((label, i) => (
          <text
            key={label}
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
  );
}

"use client";

import { useMemo } from "react";
import { m as motion } from "@/lib/framer";

type Props = {
  data: number[];
  labels?: string[];
  unit?: string;
  height?: number;
  className?: string;
  accent?: string;
  showArea?: boolean;
  showDots?: boolean;
  chartKey?: string;
  baselineZero?: boolean;
  lowerIsBetter?: boolean;
};

function formatValue(value: number, unit?: string) {
  if (unit === "%") {
    return `${value.toFixed(1)}%`;
  }
  if (unit?.includes("$")) {
    return value >= 10 ? `$${value}K` : value < 1 ? `$${value.toFixed(1)}K` : `$${value}K`;
  }
  if (unit?.includes("(K)")) {
    return value >= 10 ? `${value}` : value.toFixed(1);
  }
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

function niceTick(value: number, unit?: string) {
  if (unit?.includes("$")) {
    if (value >= 10) return Math.round(value);
    return Math.round(value * 10) / 10;
  }
  if (value >= 100) return Math.round(value / 10) * 10;
  if (value >= 10) return Math.round(value);
  return Math.round(value * 10) / 10;
}

function formatAxisValue(value: number, unit?: string) {
  const rounded = niceTick(value, unit);
  if (unit === "%") return `${rounded}%`;
  const formatted = formatValue(rounded, unit);
  if (unit?.includes("$")) return formatted;
  if (unit?.includes("(K)")) return `${formatted}K`;
  return formatted;
}

export default function GrowthLineChart({
  data,
  labels,
  unit,
  height = 120,
  className = "",
  accent = "#00d4ff",
  showArea = true,
  showDots = true,
  chartKey,
  baselineZero = false,
  lowerIsBetter = false,
}: Props) {
  const width = 320;
  const padding = { top: 12, right: 8, bottom: 24, left: 40 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const { points, linePath, areaPath, yTicks, min, max } = useMemo(() => {
    const dataMin = Math.min(...data);
    const dataMax = Math.max(...data);
    const minVal = baselineZero ? 0 : dataMin * 0.92;
    const maxVal = baselineZero ? dataMax * 1.12 : dataMax * 1.08;
    const range = maxVal - minVal || 1;

    const pts = data.map((v, i) => {
      const x = padding.left + (i / (data.length - 1)) * chartW;
      const normalized = (v - minVal) / range;
      const y = lowerIsBetter
        ? padding.top + normalized * chartH
        : padding.top + chartH - normalized * chartH;
      return { x, y, v };
    });

    const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    const area = `${path} L ${pts[pts.length - 1].x} ${padding.top + chartH} L ${pts[0].x} ${padding.top + chartH} Z`;

    const tickValues = baselineZero
      ? [0, dataMax / 2, dataMax]
      : [dataMin, (dataMin + dataMax) / 2, dataMax];

    return {
      points: pts,
      linePath: path,
      areaPath: area,
      yTicks: tickValues,
      min: minVal,
      max: maxVal,
    };
  }, [data, chartW, chartH, padding.left, padding.top, baselineZero, lowerIsBetter]);

  const animationKey = chartKey ?? data.join("-");
  const areaGradId = `areaGrad-${animationKey}`;
  const startVal = data[0];
  const endVal = data[data.length - 1];

  return (
    <div className={className}>
      {unit && (
        <div className="flex items-baseline justify-between mb-3 pl-10">
          <span className="text-[10px] font-medium text-white/40">
            {formatValue(startVal, unit)}
          </span>
          <span className="text-[10px] font-semibold text-neon-cyan/80">
            {formatValue(endVal, unit)}
          </span>
        </div>
      )}

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={areaGradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>

        {yTicks.map((tick, i) => {
          const tickNormalized = (tick - min) / (max - min || 1);
          const y = lowerIsBetter
            ? padding.top + tickNormalized * chartH
            : padding.top + chartH - tickNormalized * chartH;
          return (
            <g key={`${tick}-${i}`}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
              />
              <text
                x={padding.left - 6}
                y={y + 3}
                textAnchor="end"
                fill="rgba(255,255,255,0.3)"
                fontSize="8"
                fontWeight="500"
              >
                {formatAxisValue(tick, unit)}
              </text>
            </g>
          );
        })}

        {showArea && (
          <motion.path
            key={`area-${animationKey}`}
            d={areaPath}
            fill={`url(#${areaGradId})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        )}

        <motion.path
          key={`line-${animationKey}`}
          d={linePath}
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {showDots &&
          points.map((p, i) => {
            const isStart = i === 0;
            const isEnd = i === points.length - 1;
            return (
              <motion.circle
                key={`${animationKey}-dot-${i}`}
                cx={p.x}
                cy={p.y}
                r={isEnd ? 4 : isStart ? 3.5 : 3}
                fill={isEnd ? accent : isStart ? "rgba(255,255,255,0.2)" : accent}
                stroke={isStart ? "rgba(255,255,255,0.35)" : isEnd ? "#0a0f1a" : "none"}
                strokeWidth={isEnd ? 2 : 1.5}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              />
            );
          })}

        {labels &&
          labels.map((label, i) => (
            <text
              key={`${animationKey}-${label}-${i}`}
              x={points[i]?.x ?? 0}
              y={height - 4}
              textAnchor="middle"
              fill={i === labels.length - 1 ? "rgba(0, 212, 255,0.7)" : "rgba(255,255,255,0.35)"}
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

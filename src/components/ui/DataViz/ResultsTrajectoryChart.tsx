"use client";

import { useId } from "react";
import { m as motion } from "@/lib/framer";

type Props = {
  data: number[];
  labels?: string[];
  height?: number;
  className?: string;
  startLabel?: string;
  endLabel?: string;
  unit?: string;
};

function smoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function formatValue(value: number, unit?: string) {
  const formattedValue = Number.isInteger(value) ? `${Math.round(value)}` : value.toFixed(1);
  if (unit?.includes("$") || unit?.includes("(K)")) {
    return `${formattedValue}K`;
  }
  return formattedValue;
}

export default function ResultsTrajectoryChart({
  data,
  labels,
  height = 180,
  className = "",
  startLabel = "Before",
  endLabel = "After",
  unit,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const width = 320;
  const padding = { top: 28, right: 16, bottom: 28, left: 16 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const min = 0;
  const max = Math.max(...data) * 1.1;
  const range = max - min || 1;

  const points = data.map((v, i) => ({
    x: padding.left + (i / (data.length - 1)) * chartW,
    y: padding.top + chartH - ((v - min) / range) * chartH,
    v,
    i,
  }));

  const curvePath = smoothPath(points);
  const areaPath = `${curvePath} L ${points[points.length - 1].x} ${padding.top + chartH} L ${points[0].x} ${padding.top + chartH} Z`;
  const start = points[0];
  const end = points[points.length - 1];

  const areaGradId = `ribbonAreaGrad-${uid}`;
  const strokeGradId = `ribbonStrokeGrad-${uid}`;
  const glowFilterId = `ribbonGlow-${uid}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full ${className}`}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={areaGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.22" />
          <stop offset="55%" stopColor="#0099cc" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0099cc" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={strokeGradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0, 212, 255,0.35)" />
          <stop offset="100%" stopColor="#00d4ff" />
        </linearGradient>
        <filter id={glowFilterId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {[0.33, 0.66].map((pct) => (
        <line
          key={pct}
          x1={padding.left}
          y1={padding.top + chartH * (1 - pct)}
          x2={width - padding.right}
          y2={padding.top + chartH * (1 - pct)}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
          strokeDasharray="3 6"
        />
      ))}

      <motion.path
        d={areaPath}
        fill={`url(#${areaGradId})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.path
        d={curvePath}
        stroke={`url(#${strokeGradId})`}
        strokeWidth="3"
        strokeLinecap="round"
        filter={`url(#${glowFilterId})`}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {points.map((p, i) => {
        const isStart = i === 0;
        const isEnd = i === points.length - 1;
        const r = isEnd ? 6 : isStart ? 4 : 3;
        return (
          <g key={i}>
            {!isStart && !isEnd && (
              <circle cx={p.x} cy={p.y} r={r + 4} fill="rgba(0, 212, 255,0.06)" />
            )}
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={r}
              fill={isEnd ? "#00d4ff" : isStart ? "rgba(255,255,255,0.15)" : "rgba(0, 212, 255,0.5)"}
              stroke={isEnd ? "#0a0f1a" : isStart ? "rgba(255,255,255,0.25)" : "rgba(0, 212, 255,0.3)"}
              strokeWidth={isEnd ? 2 : 1.5}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            />
          </g>
        );
      })}

      {start && (
        <>
          <motion.line
            x1={start.x}
            y1={start.y}
            x2={start.x}
            y2={padding.top + chartH}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            strokeDasharray="2 4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
          <text
            x={start.x}
            y={padding.top - 8}
            textAnchor="middle"
            fill="rgba(255,255,255,0.4)"
            fontSize="8"
            fontWeight="600"
            letterSpacing="0.08em"
          >
            {startLabel.toUpperCase()}
          </text>
          <text
            x={start.x}
            y={start.y - 10}
            textAnchor="middle"
            fill="rgba(255,255,255,0.55)"
            fontSize="10"
            fontWeight="600"
          >
            {formatValue(start.v, unit)}
          </text>
        </>
      )}

      {end && (
        <>
          <motion.line
            x1={end.x}
            y1={end.y}
            x2={end.x}
            y2={padding.top + chartH}
            stroke="rgba(0, 212, 255,0.2)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
          />
          <text
            x={end.x}
            y={padding.top - 8}
            textAnchor="middle"
            fill="rgba(0, 212, 255,0.7)"
            fontSize="8"
            fontWeight="600"
            letterSpacing="0.08em"
          >
            {endLabel.toUpperCase()}
          </text>
          <text
            x={end.x}
            y={end.y - 12}
            textAnchor="middle"
            fill="#00d4ff"
            fontSize="11"
            fontWeight="700"
          >
            {formatValue(end.v, unit)}
          </text>
        </>
      )}

      {labels &&
        labels.map((label, i) => (
          <text
            key={`${label}-${i}`}
            x={points[i]?.x ?? 0}
            y={height - 6}
            textAnchor="middle"
            fill={i === labels.length - 1 ? "rgba(0, 212, 255,0.75)" : "rgba(255,255,255,0.3)"}
            fontSize="9"
            fontWeight={i === labels.length - 1 ? "600" : "500"}
          >
            {label}
          </text>
        ))}
    </svg>
  );
}

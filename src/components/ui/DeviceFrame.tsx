"use client";

import { useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type DeviceFrameProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

/**
 * Industry-standard MacBook Pro mockup for website screenshots.
 * Screen slot is sized to the SVG display cutout so Next/Image fills correctly.
 */
export function DeviceFrame({
  className,
  children,
  ...props
}: DeviceFrameProps) {
  const uid = useId().replace(/:/g, "");
  const lid = `mbp-lid-${uid}`;
  const lidEdge = `mbp-lid-edge-${uid}`;
  const base = `mbp-base-${uid}`;
  const indent = `mbp-indent-${uid}`;
  const ground = `mbp-ground-${uid}`;

  return (
    <div className={cn("device-frame", className)} {...props}>
      <div className="device-frame__stage">
        <svg
          className="device-frame__chrome"
          viewBox="0 0 650 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <ellipse
            cx="325"
            cy="392"
            rx="268"
            ry="7.5"
            fill={`url(#${ground})`}
            opacity="0.55"
          />

          <path
            fill={`url(#${lid})`}
            d="M79.56 13.18h491.32c7.23 0 13.1 5.87 13.1 13.1v336.61H66.46V26.28c0-7.23 5.87-13.1 13.1-13.1Z"
          />

          <path
            stroke={`url(#${lidEdge})`}
            strokeWidth="0.75"
            d="M79.9 13.55h490.6c6.9 0 12.5 5.6 12.5 12.5"
            opacity="0.55"
          />

          <path
            fill="#121214"
            d="M79.96 14.24h490.45c6.83 0 12.37 5.54 12.37 12.37v336.28H67.59V26.6c0-6.83 5.54-12.37 12.37-12.37Z"
          />

          <path
            fill="#050505"
            fillRule="evenodd"
            d="M570.25 15.74H80.34c-6.12 0-11.08 4.96-11.08 11.08v336.07h512.08V26.82c0-6.12-4.96-11.08-11.08-11.08ZM575.74 345.17H74.52V27.31c0-3.31 2.68-5.99 5.99-5.99h489.24c3.31 0 5.99 2.68 5.99 5.99v317.86Z"
          />
          <rect
            x="74.52"
            y="21.32"
            width="501.22"
            height="323.85"
            rx="5"
            ry="5"
            fill="#050505"
          />

          <path
            fill="#050505"
            d="M298.14 21.02h54.07v6.5c0 1.56-1.27 2.82-2.82 2.82h-48.42c-1.56 0-2.82-1.27-2.82-2.82v-6.5Z"
          />
          <circle cx="325.11" cy="23.61" r="1.45" fill="#1c2748" />
          <circle cx="325.11" cy="23.61" r="0.7" fill="#0a1020" />

          <path
            fill={`url(#${base})`}
            d="M19.04 362.77h611.92v10.39c0 5.95-4.83 10.79-10.79 10.79H29.83c-5.95 0-10.79-4.83-10.79-10.79v-10.39Z"
          />

          <path
            fill={`url(#${indent})`}
            d="M278.11 362.6h94.05c0 3.63-2.95 6.58-6.58 6.58h-80.89c-3.63 0-6.58-2.95-6.58-6.58Z"
          />

          <polygon
            fill="#d2d3d5"
            points="600.06 385.39 567.29 385.39 565.84 383.95 601.82 383.95 600.06 385.39"
          />
          <polygon
            fill="#2a2a2a"
            points="598.73 386.82 568.64 386.82 567.32 385.39 600.35 385.39 598.73 386.82"
          />
          <polygon
            fill="#d2d3d5"
            points="82.64 385.39 49.87 385.39 48.43 383.95 84.41 383.95 82.64 385.39"
          />
          <polygon
            fill="#2a2a2a"
            points="81.31 386.82 51.23 386.82 49.9 385.39 82.93 385.39 81.31 386.82"
          />

          <defs>
            <linearGradient
              id={lid}
              x1="325"
              y1="13"
              x2="325"
              y2="363"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#e0e1e3" />
              <stop offset="0.18" stopColor="#c4c5c7" />
              <stop offset="0.55" stopColor="#a6a7a9" />
              <stop offset="1" stopColor="#8c8d8f" />
            </linearGradient>
            <linearGradient
              id={lidEdge}
              x1="80"
              y1="13"
              x2="570"
              y2="13"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#fff" stopOpacity="0.7" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id={base}
              x1="325"
              y1="362"
              x2="325"
              y2="384"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#d4d5d7" />
              <stop offset="0.45" stopColor="#b0b1b3" />
              <stop offset="1" stopColor="#8e8f91" />
            </linearGradient>
            <linearGradient
              id={indent}
              x1="325"
              y1="362"
              x2="325"
              y2="369"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#9a9b9d" />
              <stop offset="1" stopColor="#6e6f71" />
            </linearGradient>
            <radialGradient
              id={ground}
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(325 392) scale(268 7.5)"
            >
              <stop offset="0" stopColor="#000" stopOpacity="0.55" />
              <stop offset="1" stopColor="#000" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        <div className="device-frame__screen">
          {children}
          <span className="device-frame__gloss" aria-hidden />
        </div>

        <div aria-hidden className="device-frame__notch">
          <span className="device-frame__camera" />
        </div>
      </div>
    </div>
  );
}

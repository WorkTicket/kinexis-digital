"use client";

import { useEffect } from "react";
import type { Metric } from "web-vitals";
import { toRumMetricRecord } from "@/lib/rum-report";

declare global {
  interface Window {
    __KINEXIS_RUM__?: number;
  }
}

export default function Rum() {
  useEffect(() => {
    if (window.__KINEXIS_RUM__) return;
    window.__KINEXIS_RUM__ = 1;
    const SAMPLE = 0.2;
    if (Math.random() >= SAMPLE) return;

    let disposed = false;
    let timer = 0;
    const pending = new Map<string, {
      name: Metric["name"];
      value: number;
      id: string;
      navigationType: string;
      path: string;
    }>();
    const sent = new Set<string>();

    function flush() {
      if (!pending.size) return;
      const metrics = [...pending.values()];
      pending.clear();
      const groups = new Map<string, typeof metrics>();
      for (const metric of metrics) {
        const group = groups.get(metric.path) ?? [];
        group.push(metric);
        groups.set(metric.path, group);
      }
      for (const [path, entries] of groups) {
        for (let index = 0; index < entries.length; index += 8) {
          const body = JSON.stringify({
            path,
            sample: SAMPLE,
            metrics: entries.slice(index, index + 8).map(({ name, value, id, navigationType }) => ({
              name,
              value,
              id,
              navigationType,
            })),
          });
          try {
            const blob = new Blob([body], { type: "application/json" });
            if (!navigator.sendBeacon?.("/api/rum", blob)) {
              fetch("/api/rum", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body,
                keepalive: true,
                credentials: "same-origin",
              }).catch(() => {});
            }
          } catch {
            /* Telemetry transport must never affect the page. */
          }
        }
      }
    }

    function record(metric: Metric) {
      if (disposed) return;
      const record = toRumMetricRecord(metric, location.pathname, location.origin);
      if (!record) return;
      const key = `${record.name}:${record.id}`;
      if (sent.has(key)) return;
      sent.add(key);
      pending.set(key, record);
      if (timer) clearTimeout(timer);
      timer = window.setTimeout(flush, 2500);
    }

    function onVisibility() {
      if (document.visibilityState === "hidden") queueMicrotask(flush);
    }
    const onPageHide = () => queueMicrotask(flush);
    document.addEventListener("visibilitychange", onVisibility);
    addEventListener("pagehide", onPageHide);

    void import("web-vitals").then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
      if (disposed) return;
      const opts = { reportSoftNavs: true };
      onCLS(record, opts);
      onINP(record, opts);
      onLCP(record, opts);
      onFCP(record);
      onTTFB(record);
    }).catch(() => {
      /* RUM must never affect the application. */
    });

    return () => {
      disposed = true;
      if (timer) clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
      removeEventListener("pagehide", onPageHide);
    };
  }, []);

  return null;
}

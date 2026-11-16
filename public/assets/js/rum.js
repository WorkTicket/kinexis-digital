/**
 * First-party web-vitals beacon (no third-party SDK).
 * Samples ~20% of page views; posts path + metric values only to /api/rum.
 */
(() => {
  try {
    if (window.__KINEXIS_RUM__) return;
    window.__KINEXIS_RUM__ = 1;
    const SAMPLE = 0.2;
    if (Math.random() > SAMPLE) return;

    const metrics = [];
    let flushTimer = 0;

    function pathOnly() {
      const p = location.pathname || "/";
      return p.length > 200 ? p.slice(0, 200) : p;
    }

    function queue(name, value, id) {
      if (!Number.isFinite(value) || value < 0) return;
      metrics.push({ name, value, id: String(id || name).slice(0, 64) });
      if (flushTimer) clearTimeout(flushTimer);
      flushTimer = setTimeout(flush, 2500);
    }

    function flush() {
      if (!metrics.length) return;
      const body = JSON.stringify({
        path: pathOnly(),
        sample: SAMPLE,
        metrics: metrics.splice(0, 8),
      });
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/rum", blob);
        return;
      }
      fetch("/api/rum", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body,
        keepalive: true,
        credentials: "same-origin",
      }).catch(() => {});
    }

    function observe(type, map) {
      try {
        const po = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) map(entry);
        });
        po.observe({ type, buffered: true });
      } catch {
        /* unsupported */
      }
    }

    observe("largest-contentful-paint", (entry) => {
      queue("LCP", entry.startTime, "lcp");
    });
    observe("event", (entry) => {
      // INP candidate: duration of event timing entries
      if (entry.duration) queue("INP", entry.duration, "inp");
    });
    observe("layout-shift", (entry) => {
      if (entry.hadRecentInput) return;
      queue("CLS", entry.value, "cls");
    });
    observe("navigation", (entry) => {
      if (entry.responseStart) queue("TTFB", entry.responseStart, "ttfb");
    });
    observe("paint", (entry) => {
      if (entry.name === "first-contentful-paint") queue("FCP", entry.startTime, "fcp");
    });

    addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flush();
    });
    addEventListener("pagehide", flush);
  } catch {
    /* never break the page */
  }
})();

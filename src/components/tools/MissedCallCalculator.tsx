"use client";

import { useMemo, useState } from "react";
import { INDUSTRIES } from "@/data/industries";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function MissedCallCalculator({ initialTrade = "plumbing" }: { initialTrade?: string }) {
  const [trade, setTrade] = useState(initialTrade);
  const [callsWeek, setCallsWeek] = useState("");
  const [missPct, setMissPct] = useState("");
  const [jobValue, setJobValue] = useState("");
  const [closeRate, setCloseRate] = useState("");

  const result = useMemo(() => {
    const calls = Number(callsWeek);
    const miss = Number(missPct);
    const value = Number(jobValue);
    const close = Number(closeRate);
    if (![calls, miss, value, close].every((n) => Number.isFinite(n) && n >= 0)) return null;
    const missedPerMonth = calls * (miss / 100) * 4.345;
    const atRisk = missedPerMonth * value;
    const recover = atRisk * (close / 100);
    return { missedPerMonth, atRisk, recover };
  }, [callsWeek, missPct, jobValue, closeRate]);

  function trackCalculate() {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "tool_calculate", { tool: "missed_call", trade });
    }
  }

  return (
    <div className="missed-call-calc">
      <div className="missed-call-calc__grid">
        <label>
          Trade
          <select value={trade} onChange={(e) => setTrade(e.target.value)}>
            {INDUSTRIES.map((industry) => (
              <option key={industry.slug} value={industry.slug}>
                {industry.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Calls per week
          <input inputMode="decimal" value={callsWeek} onChange={(e) => setCallsWeek(e.target.value)} placeholder="e.g. 40" />
        </label>
        <label>
          Percent missed
          <input inputMode="decimal" value={missPct} onChange={(e) => setMissPct(e.target.value)} placeholder="e.g. 25" />
        </label>
        <label>
          Average job value ($)
          <input inputMode="decimal" value={jobValue} onChange={(e) => setJobValue(e.target.value)} placeholder="e.g. 350" />
        </label>
        <label>
          Close rate (%)
          <input inputMode="decimal" value={closeRate} onChange={(e) => setCloseRate(e.target.value)} placeholder="e.g. 40" />
        </label>
      </div>

      <p className="missed-call-calc__formula">
        Planning math (not a guarantee): missed/mo = calls/week × (miss%/100) × 4.345; at risk = missed/mo × job value; illustrative recover = at risk × (close%/100).
      </p>

      <p className="btn-row">
        <button type="button" className="btn btn--primary" onClick={trackCalculate}>
          Calculate
        </button>
      </p>

      {result ? (
        <div className="missed-call-calc__results" aria-live="polite">
          <p><strong>Missed calls / month:</strong> {result.missedPerMonth.toFixed(1)}</p>
          <p><strong>Revenue at risk / month:</strong> ${result.atRisk.toFixed(0)}</p>
          <p><strong>Illustrative recover / month:</strong> ${result.recover.toFixed(0)}</p>
          <p className="muted small">These numbers use only the inputs you entered. They are planning math, not a promise of recovered jobs.</p>
        </div>
      ) : (
        <p className="muted">Enter your own numbers above. We do not invent industry averages.</p>
      )}
    </div>
  );
}

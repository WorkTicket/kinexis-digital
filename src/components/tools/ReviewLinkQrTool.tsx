"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { INDUSTRIES } from "@/data/industries";
import { extractPlaceId, reviewUrl } from "@/lib/google-place-id";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function scriptForTrade(tradeName: string, link: string) {
  return `Hi — this is ${tradeName}. Thanks again for the work today. If you’re willing, here’s our Google review link: ${link}. Reply STOP to opt out of texts.`;
}

export default function ReviewLinkQrTool({ initialTrade = "" }: { initialTrade?: string }) {
  const [input, setInput] = useState("");
  const [trade, setTrade] = useState(initialTrade);
  const [placeId, setPlaceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<"url" | "script" | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const link = placeId ? reviewUrl(placeId) : null;
  const tradeName = INDUSTRIES.find((item) => item.slug === trade)?.name ?? "our crew";
  const script = link ? scriptForTrade(tradeName, link) : "";

  useEffect(() => {
    if (!link || !canvasRef.current) return;
    void QRCode.toCanvas(canvasRef.current, link, {
      width: 240,
      margin: 2,
      color: { dark: "#031b4e", light: "#ffffff" },
    });
  }, [link]);

  function generate() {
    const id = extractPlaceId(input);
    if (!id) {
      setPlaceId(null);
      setError("Paste a Place ID or a link that includes placeid=");
      return;
    }
    setError(null);
    setPlaceId(id);
    setCopied(null);
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "tool_generate", {
        tool: "review_qr",
        ...(trade ? { trade } : {}),
      });
    }
  }

  async function copyText(value: string, kind: "url" | "script") {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
    } catch {
      setCopied(null);
    }
  }

  function downloadPng() {
    const canvas = canvasRef.current;
    if (!canvas || !placeId) return;
    const anchor = document.createElement("a");
    anchor.href = canvas.toDataURL("image/png");
    anchor.download = `google-review-qr-${placeId.slice(0, 12)}.png`;
    anchor.click();
  }

  return (
    <div className="review-qr-tool">
      <label className="review-qr-tool__field">
        Google Place ID or review / Maps URL
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          placeholder="ChIJ… or a link with placeid="
          aria-invalid={error ? true : undefined}
          aria-describedby="review-qr-help"
        />
      </label>
      <p id="review-qr-help" className="muted small">
        Find Place ID in Google Business Profile → Home → [business] → Place ID, or from a Maps share link. We never store your ID on our servers for this tool. This page does not connect to Google APIs or verify the business exists.
      </p>

      <label className="review-qr-tool__field">
        Business type (optional — for the sample text only)
        <select value={trade} onChange={(e) => setTrade(e.target.value)}>
          <option value="">Any business</option>
          {INDUSTRIES.map((industry) => (
            <option key={industry.slug} value={industry.slug}>
              {industry.name}
            </option>
          ))}
        </select>
      </label>

      <p className="btn-row">
        <button type="button" className="btn btn--primary" onClick={generate}>
          Generate review link &amp; QR
        </button>
      </p>

      {error ? (
        <p className="review-qr-tool__error" role="alert">
          {error}
        </p>
      ) : null}

      {link && placeId ? (
        <div className="review-qr-tool__results" aria-live="polite">
          <div className="review-qr-tool__output">
            <p className="eyebrow">Review URL</p>
            <p className="review-qr-tool__url">
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </p>
            <p className="btn-row">
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => void copyText(link, "url")}>
                {copied === "url" ? "Copied" : "Copy link"}
              </button>
            </p>
          </div>

          <div className="review-qr-tool__qr">
            <p className="eyebrow">QR code</p>
            <canvas ref={canvasRef} width={240} height={240} aria-label="QR code for the Google review link" />
            <p className="btn-row">
              <button type="button" className="btn btn--ghost btn--sm" onClick={downloadPng}>
                Download PNG
              </button>
            </p>
          </div>

          <div className="review-qr-tool__script">
            <p className="eyebrow">Sample SMS (template only — not compliance advice)</p>
            <pre>{script}</pre>
            <p className="btn-row">
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => void copyText(script, "script")}>
                {copied === "script" ? "Copied" : "Copy script"}
              </button>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

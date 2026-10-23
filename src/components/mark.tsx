"use client";

import { useEffect, useRef } from "react";

const TRAILING_PUNCT = /^[.!?,;:…'"“”‘’)\]]+/;

export function HL({ text, mark }: { text: string; mark: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const i = text.indexOf(mark);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-marked");
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  if (i < 0) return <>{text}</>;
  let end = i + mark.length;
  const trail = text.slice(end).match(TRAILING_PUNCT);
  if (trail) end += trail[0].length;
  return (
    <>
      {text.slice(0, i)}
      <span ref={ref} className="hl">
        {text.slice(i, end)}
      </span>
      {text.slice(end)}
    </>
  );
}

export function Phrase({ text, mark, tone }: { text: string; mark: string; tone: "orange" | "cobalt" }) {
  const i = text.indexOf(mark);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className={`phrase-mark phrase-mark--${tone}`}>{mark}</span>
      {text.slice(i + mark.length)}
    </>
  );
}

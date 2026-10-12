"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ComponentProps } from "react";
import type { GreenfieldExamples } from "./GreenfieldExamples";

const Examples = dynamic(
  () => import("./GreenfieldExamples").then((module) => module.GreenfieldExamples),
  { ssr: false },
);

export function LazyGreenfieldExamples(props: ComponentProps<typeof GreenfieldExamples>) {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!container.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true);
        observer.disconnect();
      }
    }, { rootMargin: "1000px" });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={container} style={ready ? undefined : { minHeight: "50rem" }}>
      {ready ? <Examples {...props} /> : (
        <noscript>{props.beforeColumn}{props.afterColumn}</noscript>
      )}
    </div>
  );
}

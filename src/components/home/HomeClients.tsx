"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal } from "@/components/ui/Reveal";
import { clientMarks as clients } from "@/content/client-engagements";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

const VISIBLE = 5;
const STEP_MS = 2200;
const PASS_PAUSE_MS = 1200;

const PATTERNS: number[][] = [
  [2, 0, 4, 1, 3],
  [0, 4, 2, 1, 3],
  [4, 1, 3, 0, 2],
  [1, 3, 0, 4, 2],
  [2, 4, 0, 3, 1],
  [3, 1, 4, 0, 2],
];

function pickNextPattern(current: number[]) {
  const others = PATTERNS.filter((p) => p !== current);
  return others[Math.floor(Math.random() * others.length)] ?? PATTERNS[0]!;
}

function pickReplacement(visible: number[], slot: number) {
  const occupied = new Set(visible);
  occupied.delete(visible[slot]);

  const pool = clients
    .map((_, i) => i)
    .filter((i) => !occupied.has(i) && i !== visible[slot]);

  if (pool.length === 0) {
    return (visible[slot] + 1) % clients.length;
  }

  return pool[Math.floor(Math.random() * pool.length)]!;
}

function ClientSlot({
  clientIndex,
  fadeKey,
}: {
  clientIndex: number;
  fadeKey: number;
}) {
  const client = clients[clientIndex]!;

  return (
    <li className="client-wall__item">
      <span
        key={`${client.slug}-${fadeKey}`}
        className={cn("client-wall__mark", "client-wall__mark--fade")}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/assets/logos/brands/${client.slug}.svg`}
          alt={client.name}
          width={160}
          height={48}
          className="client-wall__logo"
          decoding="async"
          loading="lazy"
        />
      </span>
    </li>
  );
}

type HomeClientsProps = {
  eyebrow: string;
  title: string;
  dek: string;
  meetClients: string;
};

export function HomeClients({
  eyebrow,
  title,
  dek,
  meetClients,
}: HomeClientsProps) {
  const reduced = usePrefersReducedMotion();
  const [slots, setSlots] = useState(() => {
    const preferred = ["uber", "sony", "amazon", "slack", "meta"];
    const bySlug = new Map(clients.map((c, i) => [c.slug, i]));
    const initial = preferred
      .map((slug) => bySlug.get(slug))
      .filter((i): i is number => i !== undefined);
    if (initial.length >= VISIBLE) return initial.slice(0, VISIBLE);
    return clients.slice(0, VISIBLE).map((_, i) => i);
  });
  const [fadeKeys, setFadeKeys] = useState(() =>
    Array.from({ length: VISIBLE }, () => 0),
  );
  const [ready, setReady] = useState(false);
  const stepRef = useRef(0);
  const patternRef = useRef(PATTERNS[0]!);

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => setReady(true), 1200);
    return () => window.clearTimeout(id);
  }, [reduced]);

  useEffect(() => {
    if (reduced || !ready) return;

    let cancelled = false;
    let timeoutId = 0;

    const run = () => {
      const pattern = patternRef.current;
      const step = stepRef.current;
      const slot = pattern[step] ?? 0;

      setSlots((prev) => {
        const next = [...prev];
        next[slot] = pickReplacement(prev, slot);
        return next;
      });
      setFadeKeys((prev) => {
        const next = [...prev];
        next[slot] = (next[slot] ?? 0) + 1;
        return next;
      });

      const nextStep = step + 1;
      if (nextStep >= pattern.length) {
        stepRef.current = 0;
        patternRef.current = pickNextPattern(pattern);
        timeoutId = window.setTimeout(() => {
          if (!cancelled) run();
        }, STEP_MS + PASS_PAUSE_MS);
      } else {
        stepRef.current = nextStep;
        timeoutId = window.setTimeout(() => {
          if (!cancelled) run();
        }, STEP_MS);
      }
    };

    timeoutId = window.setTimeout(run, STEP_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [reduced, ready]);

  return (
    <section aria-labelledby="home-clients-heading" className="client-wall">
      <div className="shell client-wall__frame">
        <Reveal variant="fadeUp" delay={0.04} when="chapter">
          <ChapterLead
            className="client-wall__lead"
            eyebrow={eyebrow}
            headingId="home-clients-heading"
            title={title}
            dek={dek}
          />
        </Reveal>

        <Reveal variant="fade" delay={0.2} when="chapter">
          <div className="client-wall__stage">
            <ul className="client-wall__batch" aria-live="polite">
              {slots.map((clientIndex, slot) => (
                <ClientSlot
                  key={slot}
                  clientIndex={clientIndex}
                  fadeKey={fadeKeys[slot] ?? 0}
                />
              ))}
            </ul>

            <div className="client-wall__all">
              <Button href="/clients" variant="link" arrow>
                {meetClients}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

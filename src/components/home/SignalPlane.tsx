"use client";

import { useEffect, useRef, useState } from "react";
import { Mesh, Program, Renderer, Triangle, Vec2 } from "ogl";
import { useTheme } from "@/components/ThemeProvider";
import { signalFragment, signalVertex } from "@/components/home/signal-shaders";

function isMobileViewport() {
  return window.matchMedia("(max-width: 768px)").matches;
}

type SignalPlaneProps = {
  onUnsupported?: () => void;
};

export function SignalPlane({ onUnsupported }: SignalPlaneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        canvas,
        width: Math.max(canvas.clientWidth, 2),
        height: Math.max(canvas.clientHeight, 2),
        dpr: Math.min(window.devicePixelRatio || 1, isMobileViewport() ? 1.25 : 1.75),
        alpha: false,
        depth: false,
        antialias: false,
        powerPreference: "high-performance",
        // GLSL ES 1.0 shaders (attribute / varying / gl_FragColor)
        webgl: 1,
      });
    } catch {
      onUnsupported?.();
      return;
    }

    if (!renderer.gl) {
      onUnsupported?.();
      return;
    }

    const gl = renderer.gl;
    gl.clearColor(
      themeRef.current === "dark" ? 0.02 : 0.985,
      themeRef.current === "dark" ? 0.02 : 0.985,
      themeRef.current === "dark" ? 0.025 : 0.988,
      1,
    );

    const geometry = new Triangle(gl);
    let program: Program;
    try {
      program = new Program(gl, {
        vertex: signalVertex,
        fragment: signalFragment,
        cullFace: false,
        depthTest: false,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new Vec2(1, 1) },
          uPointer: { value: new Vec2(0.62, 0.48) },
          uDark: { value: themeRef.current === "dark" ? 1 : 0 },
          uMobile: { value: isMobileViewport() ? 1 : 0 },
        },
      });
    } catch {
      onUnsupported?.();
      return;
    }

    if (!gl.getProgramParameter(program.program, gl.LINK_STATUS)) {
      onUnsupported?.();
      return;
    }

    const mesh = new Mesh(gl, { geometry, program });

    const pointerTarget = { x: 0.62, y: 0.48 };
    const pointerCurrent = { x: 0.62, y: 0.48 };
    let raf = 0;
    let running = true;
    let visible = true;
    let start = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      const w = Math.max(parent?.clientWidth || window.innerWidth, 2);
      const h = Math.max(parent?.clientHeight || window.innerHeight, 2);
      const mobile = isMobileViewport();
      renderer.dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.75);
      renderer.setSize(w, h);
      program.uniforms.uResolution.value.set(
        renderer.gl.canvas.width,
        renderer.gl.canvas.height,
      );
      program.uniforms.uMobile.value = mobile ? 1 : 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointerTarget.x = (event.clientX - rect.left) / rect.width;
      pointerTarget.y = 1 - (event.clientY - rect.top) / rect.height;
    };

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible) {
        start = performance.now() - program.uniforms.uTime.value * 1000;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    observer.observe(canvas.parentElement || canvas);

    const frame = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (!visible) return;

      const darkTarget = themeRef.current === "dark" ? 1 : 0;
      program.uniforms.uDark.value +=
        (darkTarget - program.uniforms.uDark.value) * 0.1;

      // Calm idle orbit — pointer influence stays subtle
      const idleX = 0.6 + Math.sin(now * 0.00005) * 0.016;
      const idleY = 0.48 + Math.cos(now * 0.000045) * 0.012;
      const targetX = pointerTarget.x;
      const targetY = pointerTarget.y;
      const mixIdle = 0.68;
      const aimX = targetX * (1 - mixIdle) + idleX * mixIdle;
      const aimY = targetY * (1 - mixIdle) + idleY * mixIdle;

      const lerp = isMobileViewport() ? 0.022 : 0.032;
      pointerCurrent.x += (aimX - pointerCurrent.x) * lerp;
      pointerCurrent.y += (aimY - pointerCurrent.y) * lerp;
      program.uniforms.uPointer.value.set(pointerCurrent.x, pointerCurrent.y);
      program.uniforms.uTime.value = (now - start) / 1000;

      renderer.render({ scene: mesh });
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame((now) => {
      frame(now);
      setReady(true);
    });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
      geometry.remove();
      program.remove();
    };
  }, [onUnsupported]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`signal-plane-canvas pointer-events-none absolute inset-0 h-full w-full${ready ? " is-ready" : ""}`}
    />
  );
}

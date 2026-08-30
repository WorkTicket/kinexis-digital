/** Static monochrome mesh when WebGL is unavailable or motion is reduced. */
export function SignalPlaneFallback() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden bg-background"
    >
      <div className="mesh-fallback__blob mesh-fallback__blob--a" />
      <div className="mesh-fallback__blob mesh-fallback__blob--b" />
      <div className="mesh-fallback__blob mesh-fallback__blob--c" />
      {/* Desktop-only extra layers — cut mobile paint work */}
      <div className="mesh-fallback__blob mesh-fallback__blob--d max-lg:hidden" />
      <div className="mesh-fallback__sheen" />
      <div className="mesh-noise max-lg:hidden" />
    </div>
  );
}

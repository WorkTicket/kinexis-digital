/** Static monochrome mesh when WebGL is unavailable or motion is reduced. */
export function SignalPlaneFallback() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden bg-background"
    >
      {/* Morphing mesh stand-in — layered soft blobs */}
      <div className="mesh-fallback__blob mesh-fallback__blob--a" />
      <div className="mesh-fallback__blob mesh-fallback__blob--b" />
      <div className="mesh-fallback__blob mesh-fallback__blob--c" />
      <div className="mesh-fallback__blob mesh-fallback__blob--d" />

      {/* Soft sheen */}
      <div className="mesh-fallback__sheen" />

      {/* Film grain */}
      <div className="mesh-noise" />
    </div>
  );
}

/**
 * Static site-wide paper depth — gradient flow, vignette, and film grain.
 * No scroll motion; sits under .site-shell.
 */
export function SiteAtmosphere() {
  return (
    <div className="site-atmosphere" aria-hidden>
      <div className="site-atmosphere__flow" />
      <div className="site-atmosphere__vignette" />
      <div className="site-atmosphere__grain" />
    </div>
  );
}

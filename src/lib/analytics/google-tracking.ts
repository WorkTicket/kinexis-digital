/** This landing page uses Meta tracking rather than Google measurement. */
export function shouldLoadGoogleTracking(pathname: string): boolean {
  return !/\/lp\/get-a-website\/?$/.test(pathname);
}

export function guardGoogleTrackingScript(script: string): string {
  return `if(!/\\/lp\\/get-a-website\\/?$/.test(location.pathname)){${script}}`;
}

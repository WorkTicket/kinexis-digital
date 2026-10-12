/** Responsive derivatives keep full-size originals available to other routes. */
export function homeImageAssets(source: string) {
  const name = source.split("?")[0].split("/").pop()?.replace(/\.webp$/, "");
  const asset = (width: number) => `/assets/images/home/optimized/${name}-${width}.webp?v=20261010home`;
  return {
    src: asset(960),
    srcSet: [640, 960, 1536].map(width => `${asset(width)} ${width}w`).join(", "),
  };
}

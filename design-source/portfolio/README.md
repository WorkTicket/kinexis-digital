# Portfolio assets

- `full-pages/Desktop/` and `full-pages/Mobile/`: 36 final full-resolution screenshots, used as the source for website previews.
- `layouts/`: supplied editable HTML and bundled fonts, including font licenses.
- `design-manifest.json`: supplied brand identities, locations, and asset descriptions.
- `references/`: retained review images, dimension metadata, and historical package notes. Paths described in those historical notes refer to the original package, not this repository.
- `device-mockups.txt`: supplied notes for the final 18 lossless device mockups.
- `asset-checksums.json`: SHA-256 checksums of the 99 retained files copied during consolidation.

Website assets live in `public/portfolio/`: lossless device mockups use `<slug>-devices.webp`; derived device previews use `<slug>-devices-sm.webp`; desktop previews use `<slug>.webp` and `<slug>-640.webp`. Project references are in `src/data/portfolio.ts`.

Run `node scripts/update-portfolio-assets.mjs` from the repository root to regenerate the desktop and device previews and update the cache version.

The supplied HTML package is incomplete: its referenced CSS files and brand/photo image directories were absent when consolidated. The available HTML, fonts, and licenses are preserved; the complete final screenshots and device mockups are available independently.

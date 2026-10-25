import fs from "node:fs";
import path from "node:path";

// Pre-create the directory tree before webpack and worker processes start.
// On Windows NTFS, concurrent mkdir calls across multiple worker processes can
// trigger transient EPERM collisions. Pre-creating all directory skeletons prevents that.

export function ensureSkeleton() {
  function replicateDirs(src, dst) {
    if (!fs.existsSync(src)) return;
    try {
      fs.mkdirSync(dst, { recursive: true });
    } catch {}
    let entries;
    try {
      entries = fs.readdirSync(src);
    } catch {
      return;
    }
    for (const name of entries) {
      const srcChild = path.join(src, name);
      try {
        if (fs.statSync(srcChild).isDirectory()) {
          const dstChild = path.join(dst, name);
          replicateDirs(srcChild, dstChild);
        }
      } catch {}
    }
  }

  // 1. App route skeleton
  const appSrc = "src/app";
  replicateDirs(appSrc, ".next/server/app");
  replicateDirs(appSrc, ".next/static/chunks/app");
  replicateDirs(appSrc, ".next/types/app");

  // 2. Extra next subdirs
  for (const p of [
    ".next/server/app/_global-error.segments/_global-error",
    ".next/static/chunks/pages",
    ".next/standalone",
  ]) {
    try {
      fs.mkdirSync(p, { recursive: true });
    } catch {}
  }

  // 3. Standalone node_modules directory skeleton
  replicateDirs("node_modules", ".next/standalone/node_modules");
}

ensureSkeleton();

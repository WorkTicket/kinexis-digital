import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const srcDir = join(process.cwd(), "src");

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (!/\.(tsx|ts)$/.test(entry)) continue;
    if (entry === "framer.ts") continue;

    let content = readFileSync(full, "utf8");
    const original = content;

    content = content.replace(
      /import \{ motion \} from "framer-motion";/g,
      'import { m as motion } from "@/lib/framer";'
    );
    content = content.replace(
      /import \{ motion, AnimatePresence \} from "framer-motion";/g,
      'import { m as motion, AnimatePresence } from "@/lib/framer";'
    );
    content = content.replace(
      /import \{ AnimatePresence, motion \} from "framer-motion";/g,
      'import { AnimatePresence, m as motion } from "@/lib/framer";'
    );
    content = content.replace(
      /import \{ type Variants \} from "framer-motion";/g,
      'import { type Variants } from "@/lib/framer";'
    );
    content = content.replace(
      /from "@\/lib\/animations"/g,
      'from "@/lib/motion"'
    );

    if (content !== original) {
      writeFileSync(full, content);
      console.log("updated:", full.replace(process.cwd(), ""));
    }
  }
}

walk(srcDir);

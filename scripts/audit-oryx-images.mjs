#!/usr/bin/env node
/**
 * Audit all images under `public/oryx` (recursive), verify curated pool files exist.
 * Run: npm run images:audit
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "public", "oryx");

const MIN_ACCEPTABLE_KB = 25;

/** Every path wired in `src/lib/oryx-sharp-pool.ts` → `ORYX_CURATED` (relative to public). */
const REQUIRED_POOL = [
  "oryx/main-entrance.jpg",
  "oryx/ig_extracted/C_XVsJWSGSD_330065_22.jpg",
  "oryx/ig_extracted/Ch8xpQwPMQU_230139_24.jpg",
  "oryx/ig_extracted/CgHUixavita_291525_21.jpg",
  "oryx/ig_extracted/CgHUixavita_354956_19.jpg",
  "oryx/ig_extracted/Ch8xpQwPMQU_354956_19.jpg",
  "oryx/ig_extracted/Ch8xpQwPMQU_280336_36.jpg",
  "oryx/ig_extracted/C_XVsJWSGSD_41260_71.jpg",
];

async function walk(dir, baseRel = "") {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const rel = path.join(baseRel, e.name);
    const abs = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await walk(abs, rel)));
    } else if (/\.(jpe?g|png|webp|avif)$/i.test(e.name)) {
      const st = await fs.stat(abs);
      const kb = st.size / 1024;
      out.push({
        rel: path.join("oryx", rel).replace(/\\/g, "/"),
        kb,
        weak: st.size < MIN_ACCEPTABLE_KB * 1024,
      });
    }
  }
  return out;
}

async function main() {
  const files = await walk(ROOT);
  files.sort((a, b) => b.kb - a.kb);

  console.log("ORYX public/oryx — full tree, sorted by file size (decode detail proxy)\n");
  for (const f of files) {
    const tag = f.weak ? " [WEAK <25KB]" : f.kb < 200 ? " [sub-200KB]" : "";
    console.log(`${String(f.kb.toFixed(1)).padStart(8)} KB  ${f.rel}${tag}`);
  }

  const missing = REQUIRED_POOL.filter((p) => !files.some((f) => f.rel === p));
  if (missing.length) {
    console.error("\n[FAIL] Curated pool files missing:", missing.join(", "));
    process.exit(1);
  }

  const inPool = REQUIRED_POOL.map((p) => files.find((f) => f.rel === p));
  const weakInPool = REQUIRED_POOL.filter((_, i) => inPool[i]?.weak);
  if (weakInPool.length) {
    console.warn("\n[WARN] Curated pool includes files under 25KB:", weakInPool.join(", "));
  }

  console.log("\n[OK] Curated pool (ORYX_CURATED) —", REQUIRED_POOL.length, "assets verified.");
  console.log("     Total image files under public/oryx:", files.length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

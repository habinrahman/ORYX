/**
 * Optional pre-deploy pass: tone + sharpen sources, write WebP masters to `public/oryx/print/`.
 * Does not replace originals — review outputs, then manually promote or adjust paths.
 *
 * Run: npm run images:print
 *
 * Super-resolution (Real-ESRGAN, Upscayl, etc.) is a SEPARATE upstream step — see
 * `docs/image-upscale-workflow.md`. Color grading brief: `docs/image-color-grading-prompt.md`.
 * Run those workflows *before* placing files in `public/oryx/`. This script only does
 * capture-style sharpen + encode.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "public", "oryx");
const OUT = path.join(ROOT, "print");

/** Filenames under public/oryx — extend as you add photography */
const SOURCES = [
  "hero-village-thatch-dining-night.png",
  "editorial-estate-evening.png",
  "editorial-pasta-cheese-pull-vertical.png",
  "editorial-feast-thali-overhead.png",
  "editorial-split-hero.png",
  "epic-feast-spread-table.png",
  "feast-kebab-mandi-overhead.png",
  "campus-wayfinding-signs-night.png",
  "mocktails-tropical-trio.png",
  "signature-mandi-masala-fish-duo.png",
  "village-feast-parotta-grill.png",
  "grand-thali-silver-service.png",
];

async function processOne(file) {
  const input = path.join(ROOT, file);
  try {
    await fs.access(input);
  } catch {
    console.warn(`[skip] missing: ${file}`);
    return;
  }

  const base = file.replace(/\.[^.]+$/i, "");
  const outWebp = path.join(OUT, `${base}.webp`);
  const outAvif = path.join(OUT, `${base}.avif`);

  await fs.mkdir(OUT, { recursive: true });

  const chain = () =>
    sharp(input)
      .rotate()
      .resize({
        width: 2560,
        height: 2560,
        fit: "inside",
        withoutEnlargement: true,
      })
      .sharpen({ sigma: 0.9, m1: 0.8, m2: 0.35 })
      .modulate({ saturation: 1.06, brightness: 1.01 });

  await chain()
    .webp({ quality: 93, effort: 6, smartSubsample: true })
    .toFile(outWebp);

  await chain()
    .avif({ quality: 78, effort: 7 })
    .toFile(outAvif);

  console.log(`[ok] ${file} → print/${base}.{webp,avif}`);
}

async function main() {
  console.log("Oryx print master — writing to public/oryx/print/\n");
  for (const f of SOURCES) {
    await processOne(f);
  }
  console.log(
    "\nDone. Point Next.js assets at /oryx/print/<name>.webp after visual QA if you prefer pre-baked masters.\n" +
      "Super-res first: docs/image-upscale-workflow.md",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

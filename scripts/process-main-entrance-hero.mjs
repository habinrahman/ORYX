#!/usr/bin/env node
/**
 * Daylight main-entrance hero — brochure grade for web LCP.
 * Input: public/oryx/source-hero-main-entrance.png
 * Output: public/oryx/hero-main-entrance.jpg (set `ORYX_CURATED.hero` to this path if you switch off main-entrance.jpg)
 *
 * Run: npm run images:hero-main
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "public", "oryx", "source-hero-main-entrance.png");
const out = path.join(root, "public", "oryx", "hero-main-entrance.jpg");

const meta = await sharp(src).metadata();
const w = meta.width ?? 1024;

/** Decode width for hero (upscale modestly from 1024 for retina) */
const TARGET_W = Math.min(3840, Math.max(1920, Math.round(w * 2)));

let pipeline = sharp(src).resize({
  width: TARGET_W,
  withoutEnlargement: false,
  fit: "inside",
  kernel: sharp.kernel.lanczos3,
});

/** Daylight hospitality: richer greens & terracotta, gentle contrast, crisp architecture */
pipeline = pipeline
  .modulate({ brightness: 1.02, saturation: 1.08 })
  .gamma(1.02)
  .linear(1.05, -(128 * 0.025))
  .sharpen({ sigma: 0.85, m1: 1, m2: 2, x1: 2, y2: 12, y3: 14 });

await pipeline
  .jpeg({
    quality: 97,
    mozjpeg: true,
    chromaSubsampling: "4:4:4",
  })
  .toFile(out);

const st = await fs.stat(out);
console.log(
  "Source",
  `${w}×${meta.height}`,
  "→",
  path.relative(root, out),
  `${(st.size / 1024).toFixed(1)} KB @ ${TARGET_W}px wide`
);

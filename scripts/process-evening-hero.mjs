#!/usr/bin/env node
/**
 * Grade + upscale evening pavilion hero for LCP (best effort from chat thumbnail).
 * Replace `public/oryx/source-evening-pavilion-hero.png` with a full-res export when available.
 *
 * Run: node ./scripts/process-evening-hero.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "public", "oryx", "source-evening-pavilion-hero.png");
const out = path.join(root, "public", "oryx", "hero-evening-pavilion-boardwalk.jpg");

const meta = await sharp(src).metadata();
const w = meta.width ?? 256;

/** Target decode width for retina hero (upscale from small chat asset when needed) */
const TARGET_W = Math.max(1920, Math.min(3840, Math.round(w * 8)));

let pipeline = sharp(src).resize({
  width: TARGET_W,
  withoutEnlargement: false,
  fit: "inside",
  kernel: sharp.kernel.lanczos3,
});

/** Brochure night grade: rich blacks, warm interior, controlled noise */
pipeline = pipeline
  .modulate({ brightness: 1.06, saturation: 1.14 })
  .gamma(1.08)
  .linear(1.08, -(128 * 0.045))
  .sharpen({ sigma: 1.1, m1: 1.2, m2: 2.5, x1: 3, y2: 15, y3: 15 });

await pipeline
  .jpeg({
    quality: 98,
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
  `${(st.size / 1024).toFixed(1)} KB @ target width ${TARGET_W}px`
);

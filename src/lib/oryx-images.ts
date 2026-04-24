/**
 * Central tuning for Oryx photography — Next.js Image optimization (Sharp under the hood).
 * `quality` values must exist in `next.config.ts` → `images.qualities`.
 *
 * For **super-resolution** and **luxury color grading** before assets hit `public/oryx/`, see
 * `docs/image-upscale-workflow.md` and `docs/image-color-grading-prompt.md`. The live site
 * also applies light cinematic CSS (see `globals.css` — `.oryx-hospitality-*`).
 */

/** Full-bleed hero / first paint — highest encoder budget */
export const Q_HERO = 93;

/** Full-viewport editorial spreads */
export const Q_SPREAD = 92;

/** Split layouts & large plates */
export const Q_EDITORIAL = 92;

/** Horizontal gallery cards — curated stills, high encoder budget */
export const Q_GALLERY = 93;

/** Signature grid — food detail matters */
export const Q_SIGNATURE = 95;

/** LCP & above-fold */
export const SIZES_VIEWPORT = "100vw";

/** Split section image column */
export const SIZES_SPLIT_IMAGE =
  "(min-width: 1536px) min(720px, 44vw), (min-width: 1024px) 44vw, 100vw";

/** Gallery rail — one card dominates viewport width on phone */
export const SIZES_GALLERY_CARD =
  "(min-width: 1536px) min(480px, 32vw), (min-width: 1024px) 32vw, min(92vw, 420px)";

/** Three-up signatures */
export const SIZES_SIGNATURE =
  "(min-width: 1536px) min(400px, 28vw), (min-width: 1024px) 33vw, min(92vw, 520px)";

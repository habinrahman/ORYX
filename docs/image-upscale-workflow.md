# Super-resolution workflow (Real-ESRGAN & alternatives)

Use this **before** images land in `public/oryx/` for the site. Next.js `Image` and the Sharp script `npm run images:print` **sharpen and encode** — they do **not** invent missing detail. Super-res belongs **upstream** of those steps.

## When to upscale

- Exports from social / chat are **small or heavily compressed** (e.g. short edge &lt; 1600px, blocky JPEG).
- You need **larger physical pixels** for hero spreads and **2×/3× DPR** without softness.
- **Skip** super-res on **already sharp** 2400px+ raws; you risk plastic texture and halos.

## Recommended tool stack

### 1. Real-ESRGAN (primary recommendation)

**Best for:** general photography, interiors, food plates (use conservative settings).

| Variant | Use case |
|--------|-----------|
| **RealESRGAN_x4plus** | General scenes; 4× then optionally downscale to target width. |
| **RealESRGAN_x2plus** | Less aggressive; fewer hallucinated fine details on tricky food highlights. |
| **realesr-anime** | **Not** for restaurant photography — tuned for illustration. |

**CLI (GPU, fast):** [xinntao/Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN) — `realesrgan-ncnn-vulkan` (Windows/Linux) or Python inference.

**Typical CLI pattern (ncnn-vulkan):**

```bash
# Example: 4× upscale, write next to source for review
realesrgan-ncnn-vulkan.exe -i input.png -o output_x4.png -n realesrgan-x4plus -s 4
```

Then **resize down** in GIMP / Photoshop / Sharp to final long edge **2560–3200px** if 4× is oversized — this often looks **cleaner** than a single 2× pass on noisy sources.

**Python:** same models via the official repo’s `inference_realesrgan.py` — good for batching on a machine with CUDA.

### 2. Alternatives (pick one team standard)

- **[Upscayl](https://github.com/upscayl/upscayl)** — GUI, Real-ESRGAN-family models, easy handoff for non-devs.
- **[ChaiNNer](https://github.com/ChaiNNer-org/chaiNNer)** — node graphs; chain **upscale → mild blur → unsharp** for control freaks.
- **Topaz Photo AI** — commercial; strong **denoise + sharpen + upscale** in one; good for mixed-quality client folders.

## Suggested pipeline (luxury web, minimal “AI look”)

1. **Source of truth** — Export **max-quality** from the camera roll or RAW processor (16-bit TIFF optional; **PNG** for web pipeline is fine if size allows).
2. **Optional denoise** — Light NR **before** super-res if JPEG noise is visible (Topaz / Lightroom / ChaiNNer); avoids the model treating noise as texture.
3. **Super-res** — Real-ESRGAN **x4** (or **x2** twice with review) on the **largest** file you have.
4. **Downscale to delivery ceiling** — Long edge **2560–3200px**, **Lanczos** or **bicubic sharper**; reduces oversharpened micro-contrast.
5. **Color** — One consistent pass (white balance / gentle S-curve) in a color-managed app; avoid heavy HDR.
6. **Drop into repo** — Save as **`public/oryx/<descriptive-name>.png`** (or high-Q JPEG if photo is huge).
7. **Repo encode pass** — Run `npm run images:print` for optional **print masters** in `public/oryx/print/` (WebP/AVif + mild sharpen), or rely on **Next.js `Image`** only after step 6.

## Integration with this project

| Stage | Location / command |
|--------|---------------------|
| Staging upscales (optional) | `public/oryx/upscale-staging/` — gitignored; move winners into `public/oryx/` when satisfied. |
| Web-facing assets | `public/oryx/*.png` / `.jpg` referenced from `src/components/editorial/oryx-editorial-experience.tsx` (`IMG` map). |
| Optional encode | `npm run images:print` → see `scripts/oryx-print-master.mjs` |

After changing files under `public/oryx/`, extend the `SOURCES` array in `scripts/oryx-print-master.mjs` if you want print masters for new names.

## Quality checklist (sign-off before merge)

- [ ] **No waxy skin** or **melty cheese** on food — reduce model strength or use x2 / downscale.
- [ ] **Text and signage** still readable — if garbled, that frame is a bad super-res candidate; use a different crop or source.
- [ ] **Side-by-side** at **100%** and at **simulated phone width** in browser devtools.
- [ ] **File size** sensible for mobile (hero under ~800KB–1.5MB after Next optimization is a reasonable target band; tune per art direction).

## CI note

Real-ESRGAN in **GitHub Actions** needs a **GPU runner** or a **pre-baked asset** workflow: upscale **locally or on a workstation**, commit the **high-res masters** (or LFS), let **Next.js** resize in production. Running Vulkan/CUDA in default CI is brittle and slow.

---

## Color grading (often beats “more pixels”)

For **luxury warmth, shadow depth, and highlight control**, use the creative brief and prompts in **[image-color-grading-prompt.md](./image-color-grading-prompt.md)**. Typical order: denoise → upscale (if needed) → **grade** → export → `public/oryx/`.

The live site also applies a **light cinematic grade layer** in CSS so photography reads consistently between sessions.

---

**Summary:** Upscale **once** with **Real-ESRGAN** (or Upscayl / Topaz) **before** `public/oryx/` when sources are weak; **grade** for mood; then let **Next `Image`** + optional **`images:print`** handle formats and delivery.

# Luxury hospitality color grading — creative brief & prompts

Resolution alone rarely reads “premium.” **Grading** (shadow depth, highlight roll-off, warmth, separation) is what makes photography feel like a **campaign**, not a menu snapshot.

Use this doc in two ways:

1. **Post-production** — Hand to a retoucher or use in Lightroom / Capture One / DaVinci (still exports).
2. **Generative / AI assist** — Copy the **master prompt** into your tool of choice (adapt names).

---

## Master prompt (copy-paste)

```text
Color grade this restaurant photograph for a luxury hospitality brand (ORYX VILLAGE, Kerala).
Goals: premium cinematic mood, NOT trendy HDR or oversaturated social-media look.

Shadows: deep, warm blacks (brown/amber bias), retain detail in deepest tones—no crushed mud.
Midtones: rich, slightly warm neutrals; natural skin and wood where present.
Highlights: controlled roll-off on lamps, metal, and plate speculars—preserve texture, no blown white blobs.
Color: restrained warmth (gold/amber in shadows, subtle separation between reds of food and greens of herbs).
Contrast: elevated but elegant—S-curve with gentle shoulder, not harsh clipping.
Mood: evening editorial, Aman / Rosewood campaign stills—inviting, expensive, quiet confidence.
Avoid: neon saturation, teal-orange cliché, plastic skin, fake golden hour, halos around edges.
```

### Shorter variant (tool character limits)

```text
Luxury hotel campaign grade: warm deep shadows, soft highlight roll-off, rich midtones, restrained saturation, cinematic NOT HDR. Editorial hospitality, Kerala fine dining.
```

---

## Lightroom / Camera Raw (slider ballpark)

| Control | Direction |
|--------|-----------|
| **Temp** | +3 to +12 (scene-dependent) |
| **Tint** | +2 toward magenta if greens go neon |
| **Exposure** | neutral to −0.15 if highlights hot |
| **Contrast** | +8 to +18 |
| **Highlights** | −25 to −55 (recover metal / steam) |
| **Shadows** | +5 to +25 (lift only if blocked) |
| **Whites** | −5 to −20 |
| **Blacks** | −10 to −25 (anchor warm shadow) |
| **Texture / Clarity** | texture +5–15; clarity +3–8 (food only—stop before crunch) |
| **Vibrance** | +5–15 (prefer over Saturation) |
| **Saturation** | −5 to +5 global |
| **Tone curve** | gentle S: lift shadow toe slightly warm, soft shoulder in highlights |
| **Calibration** | subtle red primary hue toward orange if food reds read “cheap” |

Export **sRGB**, **16-bit TIFF** for archive if possible; **high-quality JPEG 90–95** or **PNG** for web handoff.

---

## DaVinci Resolve (still)

- **Color space / timeline:** Rec.709–gamma 2.4 (or scene-referred if from log).
- **Nodes:** (1) balance & exposure → (2) parallel mix — warm lift in shadows via **Lift** / **Color Warper** → (3) **HDR** panel highlight recovery → (4) **Film Grain** 2–4% if desired → (5) **Output** limiter gentle.

---

## On-site treatment (this repo)

Runtime **CSS** layers (`.oryx-hospitality-grade`, `.oryx-hospitality-photo`) add a **consistent** warm cinematic envelope on the live site. They **do not** replace proper grading in source files—re-grade masters when you have time, keep CSS as glue.

See `src/app/globals.css` and `oryx-editorial-experience.tsx` for usage.

---

## Linked workflow

Super-resolution **before** grading still applies when sources are tiny: [image-upscale-workflow.md](./image-upscale-workflow.md).

Suggested order: **denoise → upscale (if needed) → color grade → export →** `public/oryx/` → optional `npm run images:print`.

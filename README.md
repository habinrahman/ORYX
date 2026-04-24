# Oryx Village — lux-restaurant

Marketing site for **Oryx Village** (Kanhangad, Kerala): premium hospitality layout, curated photography, and Next.js image optimization tuned for sharp, brochure-grade presentation.

## Stack

| Layer | Choice |
|--------|--------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Components | shadcn-style utilities, Base UI, Framer Motion |
| 3D (optional routes) | React Three Fiber, Drei, Three.js |
| Motion | GSAP, Lenis |
| Image pipeline | `next/image` + [Sharp](https://sharp.pixelplumbing.com/) (devDependency for local processing scripts) |

## Quick start

```bash
cd lux-restaurant
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home route renders **`OryxPremiumHome`** (`src/components/hospitality/oryx-premium-home.tsx`).

```bash
npm run build   # production build
npm run start   # serve production build locally
npm run lint    # ESLint
```

## Project layout (high level)

```
src/
  app/
    page.tsx          # Home → OryxPremiumHome
    layout.tsx        # Root layout, fonts, globals
  components/
    hospitality/      # Primary marketing experience (hero, galleries, reserve)
    cinematic/        # Alternate full-page journey (GSAP / Lenis)
    editorial/        # Alternate editorial layout
  lib/
    oryx-sharp-pool.ts   # Curated asset URLs + reject list (single source of truth)
    oryx-images.ts       # next/image quality + sizes helpers
public/
  oryx/                # Static photography (see below)
scripts/
  audit-oryx-images.mjs
  process-main-entrance-hero.mjs
  process-evening-hero.mjs
  oryx-print-master.mjs
docs/
  image-upscale-workflow.md
  image-color-grading-prompt.md
```

## Photography & assets

All live marketing images are intended to live under **`public/oryx/`** (and `public/oryx/ig_extracted/` for reel stills). The app does **not** pull hero art from remote CDNs for the core experience—paths are defined in code.

### Curated pool

- **`src/lib/oryx-sharp-pool.ts`** exports **`ORYX_CURATED`** (canonical paths) and **`ORYX_SHARP_10`** (section aliases used by components).
- **`ORYX_PHOTO_REJECTED`** documents filenames that should not be wired into UI without a new export or re-grade.

Changing the hero or any section image means updating this file (and re-running the audit).

### Commands

| Script | Purpose |
|--------|---------|
| `npm run images:audit` | Recursively lists everything under `public/oryx`, sorts by size, and **fails** if any path in the curated pool is missing. Run before CI or release. |
| `npm run images:hero-main` | Builds `hero-main-entrance.jpg` from `source-hero-main-entrance.png` (Sharp grade + resize). Switch `ORYX_CURATED.hero` to that output if you use it instead of `main-entrance.jpg`. |
| `npm run images:hero-evening` | Builds `hero-evening-pavilion-boardwalk.jpg` from `source-evening-pavilion-hero.png` (legacy evening hero pipeline). |
| `npm run images:print` | Optional sharpen + WebP pass to `public/oryx/print/` (see script header). |

Upstream guidance for masters lives in **`docs/image-upscale-workflow.md`** and **`docs/image-color-grading-prompt.md`**.

### `next/image` quality

Encoder steps are declared in **`next.config.ts`** (`images.qualities`). Tuned constants live in **`src/lib/oryx-images.ts`**—any `quality` prop on `<Image />` must match one of those values.

## Alternate experiences

The default route is the hospitality home. Other large components exist for experimentation or future routes:

- **`oryx-cinematic-journey.tsx`** — scroll-driven cinematic narrative (imports the same **`ORYX_CURATED`** pool).
- **`oryx-editorial-experience.tsx`** — editorial spreads and gallery patterns.

Wire them from `app/` if you promote them to routes.

## Monorepo note

If Next warns about multiple lockfiles (parent `oryx` vs `lux-restaurant`), either set `turbopack.root` in `next.config.ts` as suggested in the warning, or keep a single lockfile strategy—see [Turbopack root](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack#root-directory).

## License

Private project (`"private": true` in `package.json`). All rights to branding and photography belong to the property owner.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useLayoutEffect, useRef, useState, useEffect, useCallback } from "react";
import { useLenis } from "@/contexts/lenis-context";
import { CinematicChrome } from "@/components/cinematic/cinematic-chrome";
import {
  MobileAppDock,
  ReserveBottomSheet,
  VisitBottomSheet,
  type MobileDockTab,
} from "@/components/cinematic/mobile-experience";
import { useActiveSectionIndex } from "@/hooks/use-active-section";
import { useIsNarrow } from "@/hooks/use-is-narrow";
import { ORYX_CURATED as C } from "@/lib/oryx-sharp-pool";

const JourneyCanvas = dynamic(
  () =>
    import("@/components/cinematic/journey-canvas").then((m) => m.JourneyCanvas),
  { ssr: false }
);

const SCENE_IDS = [
  "hero",
  "reels",
  "destination",
  "dishes",
  "community",
  "book",
] as const;

/** Real Oryx photography — lives in /public/oryx (see filenames). */
const O = "/oryx";

/** Next.js optimization — AVIF/WebP + tuned quality in `next.config.ts` */
const ORYX_PHOTO = { quality: 90 as const };

const IMG = {
  /** Arrival — curated estate exterior (no people) */
  hero: C.hero,
  /** Mobile monument — heritage outdoor seating */
  signatureWow: C.heritageOutdoorSeating,
  /** Reels: food & campus only */
  r1: C.grandThaliOverhead,
  r2: C.mandiPlatter,
  r3: C.masalaFishDuo,
  r4: C.campusLawnReflections,
  r5: C.indoChinesePair,
  d1: C.grandThaliOverhead,
  d2: C.masalaFishDuo,
  d3: C.friedRiceBowls,
};

const REELS = [
  { src: IMG.r1, tag: "FEAST", title: "Grand spread · colour, steam, appetite" },
  { src: IMG.r2, tag: "KERALA", title: "Parotta, smoke, and the full spread" },
  {
    src: IMG.r3,
    tag: "RICE & SEA",
    title: "Mandi · masala fish · newsprint",
  },
  { src: IMG.r4, tag: "CAMPUS", title: "Night signage · quiet arrival" },
  {
    src: IMG.r5,
    tag: "GRILL",
    title: "Kebab & mandi · smoke on the pass",
  },
] as const;

const DISHES = [
  {
    src: IMG.d1,
    k: "GRAND THALI",
    title: "Silver service feast",
    tone: "text-[color:var(--gold)]",
    story: "Curries, grills, rice, naan — one platter, zero restraint. The table shot everyone asks for.",
    saves: "4.2K",
  },
  {
    src: IMG.r3,
    k: "HOUSE FAVORITE",
    title: "Mandi & masala fish",
    tone: "text-fuchsia-300",
    story: "Long-grain rice, slow meat, fish on the wrap — the Village Cafe print you’ll spot on the table.",
    saves: "3.1K",
  },
  {
    src: IMG.d3,
    k: "VILLAGE GRILL",
    title: "Parotta & grill",
    tone: "text-orange-300",
    story: "Flaky parotta, seekh, chutney bowls — the highway stop that turned destination.",
    saves: "2.8K",
  },
] as const;

const MOMENTS = [
  { user: "@familytable_kerala", line: "Three generations. One platter. Zero rush." },
  { user: "@highway_eats", line: "Drove in for the counter — stayed for dessert." },
  { user: "@society_night", line: "Banquet night sounded as good as it tasted." },
  { user: "@weekendfork", line: "Kids played. We actually finished a meal." },
  { user: "@coast_cravings", line: "Karimeen moment. Worth every km." },
  { user: "@aftermidnight", line: "Open till 12:30 — they meant it." },
] as const;

function useScrollProgress(lenis: Lenis | null) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!lenis) return;
    const onScroll = (instance: Lenis) => {
      const lim = instance.limit;
      setProgress(lim > 0 ? instance.scroll / lim : 0);
    };
    lenis.on("scroll", onScroll);
    onScroll(lenis);
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  return progress;
}

function ReelCard({
  r,
  sizes,
}: {
  r: (typeof REELS)[number];
  sizes: string;
}) {
  return (
    <article className="relative w-[min(88vw,340px)] shrink-0 snap-center first:pl-0.5 last:pr-1 sm:w-[min(72vw,320px)]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.1rem] border border-white/12 shadow-[0_28px_100px_rgba(0,0,0,0.62)]">
        <Image {...ORYX_PHOTO} src={r.src} alt="" fill className="object-cover" sizes={sizes} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-black/30" />
        <div className="absolute left-2.5 top-3 rounded-md bg-black/50 px-2.5 py-1.5 font-mono text-[10px] font-black tracking-[0.22em] text-[color:var(--gold)] backdrop-blur-sm">
          {r.tag}
        </div>
        <p className="absolute bottom-12 left-3 right-3 font-display text-[clamp(1.15rem,4.5vw,1.35rem)] font-bold leading-snug text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
          {r.title}
        </p>
        <p className="absolute bottom-3 left-3 font-mono text-[9px] font-bold tracking-[0.22em] text-white/40">
          SWIPE →
        </p>
      </div>
    </article>
  );
}

type DishStory = (typeof DISHES)[number];

function MobileDishStories({ dishes }: { dishes: readonly DishStory[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const slides = root.querySelectorAll<HTMLElement>("[data-dish-story]");
    if (!slides.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio >= 0.42)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const raw = visible?.target?.getAttribute("data-dish-index");
        if (raw == null) return;
        const n = Number.parseInt(raw, 10);
        if (!Number.isNaN(n)) setActive(n);
      },
      { root, threshold: [0.3, 0.5, 0.65, 0.85] }
    );

    slides.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative">
      <div className="sticky top-0 z-[2] border-b border-white/10 bg-black/70 px-3 py-2.5 backdrop-blur-md">
        <p className="font-mono text-[9px] font-black tracking-[0.26em] text-white/50">
          SIGNATURE · <span className="text-[color:var(--gold)]">SWIPE</span>
        </p>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-0 overflow-x-auto overflow-y-hidden pl-1 pr-4 [-webkit-overflow-scrolling:touch] overscroll-x-contain touch-pan-x pb-12 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {dishes.map((d, i) => (
          <article
            key={d.title}
            data-dish-story
            data-dish-index={i}
            className="relative w-[min(92vw,400px)] shrink-0 snap-center px-2.5"
          >
            <div className="relative flex h-[min(92dvh,820px)] flex-col overflow-hidden rounded-[1.15rem] border border-white/12 bg-black shadow-[0_32px_120px_rgba(0,0,0,0.68)]">
              <header className="relative z-[2] flex shrink-0 items-center gap-2 border-b border-white/10 bg-black/50 px-2.5 py-2 backdrop-blur-sm">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-fuchsia-600 font-display text-[11px] font-black text-black"
                  aria-hidden
                >
                  O
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-[11px] font-bold tracking-[0.08em] text-white">
                    oryx_village
                  </p>
                  <p className="truncate font-mono text-[9px] tracking-[0.06em] text-white/45">
                    Original audio · Kitchen pass
                  </p>
                </div>
                <span className="shrink-0 font-mono text-lg leading-none text-white/35" aria-hidden>
                  ···
                </span>
              </header>

              <div className="relative min-h-0 flex-1">
                <Image
                  {...ORYX_PHOTO}
                  src={d.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1023px) 96vw, 560px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/20" />
                <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 font-mono text-[9px] font-black tracking-[0.22em] text-white/80 backdrop-blur-sm">
                  {i + 1}/{dishes.length}
                </div>
              </div>

              <div className="relative z-[2] space-y-2.5 border-t border-white/10 bg-gradient-to-t from-black via-black/95 to-black/80 px-4 pb-5 pt-4">
                <p className={`font-mono text-[10px] font-black tracking-[0.26em] ${d.tone}`}>{d.k}</p>
                <h3 className="scene-h1 font-display text-[1.85rem] font-black uppercase leading-[0.95] tracking-[-0.03em] text-white">
                  {d.title}
                </h3>
                <p className="font-editorial text-[15px] leading-relaxed text-white/78">{d.story}</p>
                <div className="flex items-center gap-2 pt-1 font-mono text-[11px] font-bold text-white/55">
                  <Heart className="size-4 text-fuchsia-400" fill="currentColor" aria-hidden />
                  <span>{d.saves} saves on stories</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div
        className="pointer-events-none absolute bottom-3 left-0 right-0 z-[3] flex justify-center gap-1.5"
        aria-hidden
      >
        {dishes.map((d, i) => (
          <span
            key={d.title}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-[color:var(--gold)]" : "w-1.5 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function mobileDockTab(
  reserveOpen: boolean,
  visitOpen: boolean,
  sceneIndex: number
): MobileDockTab {
  if (reserveOpen) return "reserve";
  if (visitOpen) return "visit";
  const id = SCENE_IDS[sceneIndex];
  if (id === "dishes") return "menu";
  if (id === "reels" || id === "community") return "explore";
  if (id === "destination" || id === "book") return "visit";
  return "explore";
}

export function OryxCinematicJourney() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const narrow = useIsNarrow();
  const progress = useScrollProgress(lenis);
  const activeScene = useActiveSectionIndex(SCENE_IDS);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);

  const scrollToSection = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el || !lenis) return;
      lenis.scrollTo(el, { offset: -12 });
      window.history.pushState({}, "", `#${id}`);
    },
    [lenis]
  );

  const openReserve = useCallback(() => {
    setVisitOpen(false);
    setReserveOpen(true);
  }, []);

  const openVisit = useCallback(() => {
    setReserveOpen(false);
    setVisitOpen(true);
  }, []);

  const dockTab = mobileDockTab(reserveOpen, visitOpen, activeScene);

  useLayoutEffect(() => {
    if (!lenis || !rootRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
          right: window.innerWidth,
          bottom: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    const onLenis = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onLenis);

    const scope = rootRef.current;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const pins = gsap.utils.toArray<HTMLElement>(".cinematic-pin", scope);

      pins.forEach((pin, i) => {
          const depth = pin.querySelector<HTMLElement>(".scene-depth");
          const h1 = pin.querySelector<HTMLElement>(".scene-h1");
          const h2 = pin.querySelector<HTMLElement>(".scene-h2");
          const sub = pin.querySelector<HTMLElement>(".scene-sub");
          const splash = pin.querySelector<HTMLElement>(".hero-splash");
          const reelTrack = pin.querySelector<HTMLElement>(".reel-track");
          const destTags = pin.querySelectorAll<HTMLElement>(".dest-tag");
          const dishSlabs = pin.querySelectorAll<HTMLElement>(".dish-slab");
          const momCards = pin.querySelectorAll<HTMLElement>(".mom-card");
          const bleed = pin.querySelector<HTMLElement>(".scene-bleed");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pin,
              scroller: document.documentElement,
              start: "top top",
              end: i === 1 || i === 3 ? "+=155%" : "+=140%",
              pin: true,
              pinSpacing: true,
              scrub: 0.55,
              anticipatePin: 1,
            },
          });

          if (i === 0) {
            const monument = pin.querySelector<HTMLElement>(".hero-food-monument");
            if (monument)
              tl.fromTo(
                monument,
                { xPercent: 6, yPercent: 10, scale: 1.06, opacity: 0.5 },
                { xPercent: 0, yPercent: 0, scale: 1, opacity: 1, ease: "none" },
                0
              );
            if (splash)
              tl.fromTo(
                splash,
                { scale: 1.22, rotate: 1 },
                { scale: 1, rotate: 0, ease: "none" },
                0
              );
            if (h1)
              tl.fromTo(
                h1,
                { yPercent: 55, opacity: 0, skewY: 3 },
                { yPercent: 0, opacity: 1, skewY: 0, ease: "none" },
                0.06
              );
            if (h2)
              tl.fromTo(
                h2,
                { xPercent: -40, opacity: 0 },
                { xPercent: 0, opacity: 1, ease: "none" },
                0.12
              );
            if (sub) tl.fromTo(sub, { y: 28, opacity: 0 }, { y: 0, opacity: 1, ease: "none" }, 0.18);
          } else if (i === 1) {
            if (reelTrack)
              tl.fromTo(reelTrack, { xPercent: 6 }, { xPercent: -40, ease: "none" }, 0);
            if (depth)
              tl.fromTo(
                depth,
                { scale: 1.12, opacity: 0.55 },
                { scale: 1, opacity: 1, ease: "none" },
                0
              );
            if (h1)
              tl.fromTo(
                h1,
                { scale: 0.92, opacity: 0 },
                { scale: 1, opacity: 1, ease: "none" },
                0.05
              );
          } else if (i === 2) {
            if (depth)
              tl.fromTo(
                depth,
                { rotate: -2, scale: 1.05 },
                { rotate: 0, scale: 1, ease: "none" },
                0
              );
            if (destTags.length)
              tl.fromTo(
                destTags,
                { y: 44, opacity: 0, rotate: 2 },
                { y: 0, opacity: 1, rotate: 0, stagger: 0.04, ease: "none" },
                0.05
              );
            if (h1)
              tl.fromTo(
                h1,
                { clipPath: "inset(0 100% 0 0)" },
                { clipPath: "inset(0 0% 0 0)", ease: "none" },
                0.08
              );
          } else if (i === 3) {
            if (dishSlabs.length)
              tl.fromTo(
                dishSlabs,
                { yPercent: 35, opacity: 0, scale: 0.95 },
                { yPercent: 0, opacity: 1, scale: 1, stagger: 0.06, ease: "none" },
                0.02
              );
            if (bleed)
              tl.fromTo(
                bleed,
                { scaleY: 0, opacity: 0 },
                { scaleY: 1, opacity: 1, ease: "none", transformOrigin: "50% 0%" },
                0.1
              );
          } else if (i === 4) {
            if (momCards.length)
              tl.fromTo(
                momCards,
                { scale: 0.92, opacity: 0, y: 24 },
                { scale: 1, opacity: 1, y: 0, stagger: 0.03, ease: "none" },
                0.05
              );
            if (h1)
              tl.fromTo(
                h1,
                { letterSpacing: "0.35em", opacity: 0 },
                { letterSpacing: "-0.02em", opacity: 1, ease: "none" },
                0
              );
          } else {
            if (h1) tl.fromTo(h1, { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: "none" }, 0.08);
            if (sub) tl.fromTo(sub, { opacity: 0 }, { opacity: 1, ease: "none" }, 0.2);
          }
        });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      lenis.off("scroll", onLenis);
      mm.revert();
      ScrollTrigger.clearScrollMemory();
    };
  }, [lenis]);

  return (
    <div
      ref={rootRef}
      className="relative overflow-x-hidden bg-[#070302] pb-[calc(5.85rem+env(safe-area-inset-bottom))] text-white selection:bg-fuchsia-500/30 selection:text-white lg:pb-0"
    >
      <JourneyCanvas progress={progress} lowPower={narrow} />
      <CinematicChrome activeScene={activeScene} />
      <MobileAppDock
        activeTab={dockTab}
        onMenu={() => {
          setReserveOpen(false);
          setVisitOpen(false);
          scrollToSection("dishes");
        }}
        onExplore={() => {
          setReserveOpen(false);
          setVisitOpen(false);
          scrollToSection("reels");
        }}
        onReserve={openReserve}
        onVisit={openVisit}
      />
      <ReserveBottomSheet open={reserveOpen} onClose={() => setReserveOpen(false)} />
      <VisitBottomSheet
        open={visitOpen}
        onClose={() => setVisitOpen(false)}
        onScrollToBook={() => scrollToSection("book")}
      />

      {/* I — Campaign hero: kinetic “Eat. Loud.” + full-bleed signature monument */}
      <section
        id="hero"
        className="cinematic-pin relative overflow-hidden bg-[#050201] lg:min-h-[100dvh]"
      >
        <div className="hero-splash pointer-events-none absolute inset-0 opacity-95 lg:opacity-100">
          <Image
            {...ORYX_PHOTO}
            src={IMG.hero}
            alt=""
            fill
            priority
            className="object-cover object-center lg:object-[center_30%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-orange-600/30 lg:via-black/50" />
          <div className="pointer-events-none absolute inset-0 mix-blend-soft-light bg-gradient-to-br from-fuchsia-600/25 via-transparent to-amber-400/20 oryx-hero-heat-veil" />
        </div>

        {/* Desktop — editorial food monument (breaks the grid; dominates right half) */}
        <div className="hero-food-monument pointer-events-none absolute inset-y-0 right-[-12%] top-0 z-[2] hidden w-[min(72vw,900px)] lg:block">
          <div className="relative h-full min-h-[100dvh]">
            <div className="absolute bottom-[4%] right-[2%] aspect-[3/4] w-[min(88%,760px)] max-w-none -rotate-[5deg] overflow-hidden rounded-sm border border-white/12 shadow-[0_50px_140px_rgba(0,0,0,0.72)]">
              <Image
                {...ORYX_PHOTO}
                src={IMG.signatureWow}
                alt=""
                fill
                className="oryx-hero-monument-img object-cover object-[center_48%]"
                sizes="(min-width: 1024px) min(900px, 75vw), 0"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-[max(9vh,4.75rem)] hidden overflow-hidden py-2 opacity-[0.18] lg:block">
          <div className="oryx-marquee gap-10 pr-10 font-display text-[clamp(2.5rem,12vw,5.5rem)] font-black uppercase leading-none tracking-[-0.04em] text-white/14 sm:gap-12 sm:pr-12">
            <span>Kerala&apos;s largest</span>
            <span className="text-white/25">·</span>
            <span>Multi cuisine</span>
            <span className="text-white/25">·</span>
            <span>Village cafe</span>
            <span className="text-white/25">·</span>
            <span>Banquet hall</span>
            <span className="text-white/25">·</span>
            <span>Kerala&apos;s largest</span>
            <span className="text-white/25">·</span>
            <span>Multi cuisine</span>
            <span className="text-white/25">·</span>
            <span>Village cafe</span>
            <span className="text-white/25">·</span>
            <span>Banquet hall</span>
            <span className="text-white/25">·</span>
            <span>Kerala&apos;s largest</span>
            <span className="text-white/25">·</span>
            <span>Multi cuisine</span>
            <span className="text-white/25">·</span>
            <span>Village cafe</span>
            <span className="text-white/25">·</span>
            <span>Banquet hall</span>
          </div>
        </div>

        <div className="relative z-[3]">
          <div className="flex min-h-[min(100dvh,100svh)] flex-col justify-end px-3 pb-[max(5.5rem,11vh)] pt-[max(5rem,14svh)] sm:px-5 sm:pb-[max(5rem,10vh)] lg:min-h-[100dvh] lg:max-w-[min(52rem,58%)] lg:px-10 lg:pb-[max(3.5rem,10vh)]">
            <div className="mb-3 hidden flex-wrap gap-2 lg:flex">
              <span className="rounded-full border border-white/20 bg-black/55 px-4 py-2.5 font-mono text-[11px] font-bold tracking-[0.16em] text-white backdrop-blur-md">
                35K+ FOLLOWERS
              </span>
              <span className="rounded-full bg-gradient-to-r from-fuchsia-500 to-orange-500 px-4 py-2.5 font-mono text-[11px] font-black tracking-[0.14em] text-black">
                DESTINATION DINING
              </span>
            </div>
            <h1 className="scene-h1 -mx-1 max-w-none font-display text-[clamp(5.25rem,26vw,18rem)] font-black uppercase leading-[0.78] tracking-[-0.07em] drop-shadow-[0_12px_50px_rgba(0,0,0,0.92)] sm:-mx-0 lg:text-[clamp(6rem,11vw,14rem)]">
              <span className="oryx-kinetic-eat block">Eat</span>
              <span className="oryx-kinetic-loud block bg-gradient-to-r from-amber-200 via-white to-fuchsia-300 bg-clip-text text-transparent">
                Loud.
              </span>
            </h1>
            <p className="oryx-kinetic-line scene-h2 mt-6 max-w-[min(100%,42rem)] font-display text-[clamp(1.12rem,4.8vw,1.45rem)] font-semibold leading-snug tracking-[-0.02em] text-white/88 sm:text-lg lg:mt-8 lg:text-xl">
              Kerala&apos;s largest — multi cuisine, Village Cafe, banquet hall, live grills. Built for
              hunger you can hear.
            </p>
            <div className="oryx-kinetic-line mt-7 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-10">
              <button
                type="button"
                onClick={openReserve}
                className="flex min-h-[54px] w-full items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 via-[color:var(--gold)] to-orange-500 font-mono text-[12px] font-black tracking-[0.16em] text-black shadow-lg sm:w-auto sm:px-12"
              >
                RESERVE
              </button>
              <button
                type="button"
                onClick={() => {
                  setReserveOpen(false);
                  setVisitOpen(false);
                  scrollToSection("dishes");
                }}
                className="flex min-h-[54px] w-full items-center justify-center rounded-2xl border border-white/25 font-mono text-[11px] font-bold tracking-[0.18em] text-white sm:w-auto sm:px-10"
              >
                THE SIGNATURE DISH →
              </button>
            </div>
            <p className="scene-sub mt-5 font-mono text-[10px] font-bold tracking-[0.28em] text-[color:var(--gold)] lg:mt-6">
              ORYX VILLAGE · KOCHI–PANVEL · KANHANGAD
            </p>
          </div>

          {/* Mobile act II — near life-size signature (food is the wow, not chrome) */}
          <div className="relative left-1/2 z-[4] w-screen max-w-[100vw] -translate-x-1/2 lg:hidden">
            <div className="relative min-h-[min(112svh,980px)] w-full overflow-hidden bg-black">
              <Image
                {...ORYX_PHOTO}
                src={IMG.signatureWow}
                alt=""
                fill
                className="oryx-hero-monument-img object-cover object-[center_40%]"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/55" />
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-[max(2.25rem,9svh)] pt-28">
                <p className="font-mono text-[10px] font-black tracking-[0.38em] text-[color:var(--gold)]">
                  REAL TABLE · ORYX VILLAGE
                </p>
                <p className="mt-3 font-display text-[clamp(2.75rem,12vw,4.25rem)] font-black uppercase leading-[0.92] tracking-[-0.045em] text-white">
                  The village feast
                </p>
                <p className="mt-4 max-w-md font-editorial text-[1.05rem] leading-relaxed text-white/72">
                  Scroll for reels, grills, thalis — this is how dinner actually lands here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* II — Reels: native horizontal swipe on mobile, GSAP strip on lg */}
      <section
        id="reels"
        className="cinematic-pin relative min-h-[min(100dvh,900px)] overflow-hidden bg-[#0a0604] py-6 lg:min-h-[100dvh] lg:py-0"
      >
        <div
          className="scene-depth pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 100% 50%, rgba(255,80,120,0.12), transparent), radial-gradient(ellipse 70% 50% at 0% 80%, rgba(255,160,60,0.1), transparent), #080604",
          }}
        />
        <div className="relative z-[3] flex flex-col px-3 pt-[max(4.5rem,14svh)] sm:px-5 lg:min-h-[100dvh] lg:px-8 lg:pt-28">
          <div className="-mx-1 flex flex-wrap items-end justify-between gap-2 border-b border-white/10 pb-4 sm:-mx-0 sm:pb-6">
            <h2 className="scene-h1 max-w-[85vw] font-display text-[clamp(3.1rem,14vw,6.5rem)] font-black uppercase italic leading-[0.88] tracking-[-0.055em] text-white">
              Reels
            </h2>
            <p className="max-w-[10rem] text-right font-mono text-[9px] font-bold leading-relaxed tracking-[0.2em] text-white/40 lg:text-[10px]">
              SWIPE
            </p>
          </div>

          <div className="mt-4 -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden px-4 pb-6 [-webkit-overflow-scrolling:touch] overscroll-x-contain touch-pan-x [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
            {REELS.map((r) => (
              <ReelCard key={`m-${r.title}`} r={r} sizes="(max-width: 1023px) 92vw, 380px" />
            ))}
          </div>

          <div className="mt-8 hidden min-h-0 flex-1 items-center overflow-hidden lg:flex">
            <div className="reel-track flex gap-6 pb-4">
              {REELS.map((r) => (
                <ReelCard key={r.title} r={r} sizes="(min-width: 1024px) 40vw, 480px" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* III — Destination */}
      <section
        id="destination"
        className="cinematic-pin relative min-h-[min(100dvh,920px)] overflow-hidden bg-[#050302] lg:min-h-[100dvh]"
      >
        <div className="scene-depth pointer-events-none absolute inset-0" aria-hidden>
          <Image
            {...ORYX_PHOTO}
            src={C.lobbyReception}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/85 to-black/90 lg:bg-gradient-to-r lg:from-black lg:via-black/88 lg:to-black/40" />
        <div className="relative z-[3] flex flex-col justify-center px-3 py-14 sm:px-6 lg:min-h-[100dvh] lg:px-16 lg:py-24">
          <h2 className="scene-h1 max-w-[min(100%,18ch)] font-display text-[clamp(2.35rem,10.5vw,5.25rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-white lg:text-[clamp(1.85rem,8vw,4.5rem)]">
            The whole destination
          </h2>
          <p className="scene-h2 mt-5 max-w-xl font-display text-[1.05rem] font-semibold leading-snug text-white/75 sm:text-lg">
            Architecture you can roam. Family tables. Cafe daylight. Banquet nights.
            Highway neon after dark.
          </p>
          <div className="mt-10 flex max-w-3xl flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
            {[
              "MULTI CUISINE",
              "VILLAGE CAFE",
              "BANQUET HALL",
              "LIVE SEAFOOD",
              "KIDS ZONE",
              "OPEN TILL 12:30AM",
            ].map((t) => (
              <span
                key={t}
                className="dest-tag inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 font-mono text-[11px] font-black tracking-[0.14em] text-white shadow-lg backdrop-blur-md sm:inline-flex sm:min-h-0 sm:px-5 sm:py-3"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* IV — Viral dishes: swipe carousel mobile */}
      <section
        id="dishes"
        className="cinematic-pin relative min-h-[min(100dvh,900px)] overflow-hidden bg-[#080402] lg:min-h-[100dvh]"
      >
        <div className="scene-bleed pointer-events-none absolute left-0 top-0 hidden h-full w-[45%] max-w-xl bg-gradient-to-br from-orange-500/25 via-fuchsia-600/10 to-transparent opacity-90 lg:block" />

        <div className="relative z-[3] lg:hidden">
          <MobileDishStories dishes={DISHES} />
        </div>

        <div className="relative z-[3] hidden min-h-[100dvh] lg:flex lg:flex-row">
          {DISHES.map((d, i) => (
            <div
              key={d.title}
              className={`dish-slab relative flex min-h-[100dvh] flex-1 flex-col justify-end overflow-hidden ${
                i === 1 ? "border-x border-white/10" : ""
              }`}
            >
              <Image
                {...ORYX_PHOTO}
                src={d.src}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 34vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="relative p-8 sm:p-10">
                <p className={`font-mono text-[9px] font-black tracking-[0.3em] ${d.tone}`}>
                  {d.k}
                </p>
                <h3 className="scene-h1 mt-2 font-display text-[clamp(1.75rem,5vw,3.25rem)] font-black uppercase leading-none tracking-[-0.03em]">
                  {d.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* V — Community (single column on mobile) */}
      <section
        id="community"
        className="cinematic-pin relative min-h-[min(78dvh,820px)] overflow-hidden bg-[#060308] py-7 lg:min-h-[100dvh] lg:py-0"
      >
        <div
          className="scene-depth pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(236,72,153,0.15), transparent 40%), radial-gradient(circle at 80% 60%, rgba(251,146,60,0.12), transparent 45%)",
          }}
        />
        <div className="relative z-[3] flex flex-col px-4 py-12 sm:px-6 lg:min-h-[100dvh] lg:justify-center lg:px-8 lg:py-24">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="scene-h1 font-display text-[clamp(2rem,9vw,4rem)] font-black uppercase tracking-[-0.03em]">
              Your feed
            </h2>
            <div className="flex items-end gap-6 sm:flex-col sm:items-end sm:gap-1">
              <p className="font-display text-5xl font-black tabular-nums leading-none text-white sm:text-6xl">
                4.8
              </p>
              <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-white/50">
                36K+ REVIEWS · GOOGLE
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {MOMENTS.map((m, idx) => (
              <div
                key={m.user}
                className="mom-card rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-black/45 p-5 shadow-xl backdrop-blur-sm sm:p-6 lg:rotate-0"
                style={{
                  transform: narrow ? "none" : `rotate(${idx % 2 === 0 ? -1.2 : 1.4}deg)`,
                }}
              >
                <p className="font-mono text-[11px] font-bold tracking-[0.1em] text-fuchsia-300/95">
                  {m.user}
                </p>
                <p className="mt-3 font-editorial text-base leading-relaxed text-white/85">
                  {m.line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VI — Book (teaser + sheet on mobile) */}
      <section
        id="book"
        className="cinematic-pin relative min-h-[min(100dvh,820px)] overflow-hidden bg-black lg:min-h-[100dvh]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 120%, rgba(251,191,36,0.2), transparent 55%), radial-gradient(ellipse at 50% 0%, rgba(244,114,182,0.12), transparent 50%)",
          }}
        />
        <div className="relative z-[3] mx-auto flex max-w-5xl flex-col justify-center gap-10 px-4 py-16 sm:px-6 lg:min-h-[100dvh] lg:gap-12 lg:py-20">
          <div>
            <h2 className="scene-h1 font-display text-[clamp(2.5rem,9vw,4.5rem)] font-black uppercase leading-none tracking-[-0.04em]">
              Pull up.
            </h2>
            <p className="scene-sub mt-5 max-w-lg font-display text-[1.1rem] font-semibold leading-snug text-white/78 sm:text-lg">
              Tables · banquets · late nights —{" "}
              <a href="tel:+919562217000" className="text-[color:var(--gold)] underline-offset-4">
                +91 95622 17000
              </a>
            </p>
            <p className="mt-3 font-mono text-[10px] font-bold leading-relaxed tracking-[0.2em] text-white/40">
              KOCHI–PANVEL HIGHWAY · KOVALPALLI · KANHANGAD · KERALA
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="tel:+919562217000"
                className="oryx-pulse-glow flex min-h-[52px] items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 via-[color:var(--gold)] to-orange-500 font-mono text-[12px] font-black tracking-[0.14em] text-black shadow-lg sm:px-12"
              >
                CALL NOW
              </a>
              <button
                type="button"
                onClick={openReserve}
                className="flex min-h-[52px] items-center justify-center rounded-2xl border-2 border-white/30 font-mono text-[11px] font-black tracking-[0.16em] text-white sm:px-10"
              >
                RESERVE (SHEET)
              </button>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Oryx+Village+Kovalpalli+Kanhangad+Kerala"
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[52px] items-center justify-center rounded-2xl border border-white/25 font-mono text-[11px] font-bold tracking-[0.16em] text-white sm:px-8"
              >
                MAPS ↗
              </a>
            </div>
          </div>
          <form
            className="scene-sub hidden max-w-xl flex-col gap-5 border-t border-white/15 pt-10 lg:flex"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="font-mono text-[10px] font-bold tracking-[0.22em] text-white/45">
              YOUR NAME
              <input
                name="name"
                className="mt-2 min-h-[52px] w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 font-display text-xl font-bold text-white outline-none focus:border-[color:var(--gold)]/50"
              />
            </label>
            <label className="font-mono text-[10px] font-bold tracking-[0.22em] text-white/45">
              PARTY & TIME
              <textarea
                name="plan"
                rows={2}
                className="mt-2 min-h-[88px] w-full resize-none rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3 font-editorial text-base text-white outline-none focus:border-[color:var(--gold)]/50"
              />
            </label>
            <button
              type="submit"
              className="min-h-[52px] w-fit rounded-2xl border border-white/30 px-10 font-mono text-[11px] font-black tracking-[0.22em] text-white transition hover:bg-white hover:text-black"
            >
              SEND REQUEST
            </button>
          </form>
        </div>
      </section>

      <footer className="relative z-[3] border-t border-white/10 bg-black/85 px-4 py-10 pb-[calc(6.25rem+env(safe-area-inset-bottom))] sm:px-6 lg:pb-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-white/40">
            ORYX VILLAGE · FOOD · FAMILY · BANQUETS · NIGHT
          </p>
          <a
            href="https://www.instagram.com/oryxvillage/"
            target="_blank"
            rel="noreferrer"
            className="min-h-[44px] font-mono text-[10px] font-black tracking-[0.2em] text-fuchsia-400"
          >
            FOLLOW ON INSTAGRAM ↗
          </a>
        </div>
      </footer>
    </div>
  );
}

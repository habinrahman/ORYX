"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/contexts/lenis-context";
import {
  Q_EDITORIAL,
  Q_GALLERY,
  Q_HERO,
  Q_SIGNATURE,
  Q_SPREAD,
  SIZES_GALLERY_CARD,
  SIZES_SIGNATURE,
  SIZES_SPLIT_IMAGE,
  SIZES_VIEWPORT,
} from "@/lib/oryx-images";
import { ORYX_CURATED as C } from "@/lib/oryx-sharp-pool";

const MAPS =
  "https://www.google.com/maps/search/?api=1&query=Oryx+Village+Kovalpalli+Kanhangad+Kerala";
const PHONE = "+919562217000";
const PHONE_DISPLAY = "+91 95622 17000";

const IMG = {
  hero: C.hero,
  spreadNight: C.mandiPlatter,
  spreadTable: C.grandThaliOverhead,
  spreadGrand: C.campusLawnReflections,
  kitchen: C.villageCafeSign,
  feast: C.grandThaliOverhead,
  lobby: C.lobbyReception,
  mandi: C.mandiPlatter,
  parotta: C.indoChinesePair,
  thali: C.grandThaliOverhead,
} as const;

const GALLERY = [
  { src: IMG.spreadGrand, caption: "Campus · lawns & pool", credit: "Oryx Village" },
  { src: IMG.kitchen, caption: "Arrival · architecture", credit: "Oryx Village" },
  { src: IMG.feast, caption: "Grand thali", credit: "Oryx Village" },
  { src: IMG.lobby, caption: "Layered coffee", credit: "Oryx Village" },
] as const;

const SIGNATURES = [
  {
    src: IMG.mandi,
    name: "Mandi & masala fish",
    note: "Rice, slow heat, coastal spice — the plate that travels home in memory.",
  },
  {
    src: IMG.parotta,
    name: "Parotta & the grill",
    note: "Flaky pull, smoke on the tongue, chutney in small bowls — highway ritual, refined.",
  },
  {
    src: IMG.thali,
    name: "Grand thali",
    note: "Curries, grills, breads — one composition, many voices, one table.",
  },
] as const;

function useScrollPast(threshold: number) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const on = () => setPast(window.scrollY > threshold);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [threshold]);
  return past;
}

function LuxeReserveSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-labelledby="reserve-heading">
      <button
        type="button"
        className="absolute inset-0 bg-black/80"
        aria-label="Close reservation"
        onClick={onClose}
      />
      <div
        className="absolute inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] max-h-[min(90dvh,820px)] overflow-hidden rounded-[1.25rem] border border-white/[0.09] bg-[#0a0908] shadow-[0_40px_120px_rgba(0,0,0,0.65)] lg:inset-x-auto lg:bottom-auto lg:left-1/2 lg:top-1/2 lg:w-full lg:max-w-md lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-[1.35rem]"
        style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.4'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative max-h-[min(86dvh,800px)] overflow-y-auto overscroll-contain px-6 pb-2 pt-8">
          <p className="text-center font-display text-[0.65rem] font-normal uppercase tracking-[0.42em] text-white/40">
            Reservations
          </p>
          <h2
            id="reserve-heading"
            className="mt-4 text-center font-display text-[1.85rem] font-light leading-[1.08] tracking-[-0.02em] text-white sm:text-[2.1rem]"
          >
            A table for you
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-center font-editorial text-[1.05rem] font-normal leading-relaxed text-white/58">
            Call the house directly — we shape the room around your evening, from quiet corners to banquet scale.
          </p>

          <div className="mx-auto mt-10 max-w-xs border-t border-b border-white/[0.08] py-8 text-center">
            <p className="font-display text-[0.62rem] font-normal uppercase tracking-[0.38em] text-[color:var(--gold)]/80">
              Concierge line
            </p>
            <a
              href={`tel:${PHONE}`}
              className="mt-3 block font-display text-2xl font-light tracking-wide text-white transition hover:text-[color:var(--gold)]"
            >
              {PHONE_DISPLAY}
            </a>
            <p className="mt-4 font-editorial text-sm italic leading-relaxed text-white/45">
              Daily · until half past midnight
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3">
            <a
              href={`tel:${PHONE}`}
              className="flex min-h-[52px] items-center justify-center border border-[color:var(--gold)]/35 bg-[color:var(--gold)]/10 font-display text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[color:var(--gold)] transition hover:bg-[color:var(--gold)]/18 active:scale-[0.99]"
            >
              Call to reserve
            </a>
            <button
              type="button"
              onClick={onClose}
              className="min-h-[48px] font-editorial text-sm text-white/50 underline-offset-[6px] transition hover:text-white/75"
            >
              Close
            </button>
          </div>

          <p className="mx-auto mt-10 max-w-sm text-center font-editorial text-[0.8125rem] leading-relaxed text-white/38">
            Kovalpalli, Kanhangad · Kochi–Panvel Highway, Kerala
          </p>
        </div>
      </div>
    </div>
  );
}

function LuxeVisitSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-labelledby="visit-heading">
      <button
        type="button"
        className="absolute inset-0 bg-black/80"
        aria-label="Close directions"
        onClick={onClose}
      />
      <div
        className="absolute inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] max-h-[min(88dvh,760px)] overflow-hidden rounded-[1.25rem] border border-white/[0.09] bg-[#0a0908] shadow-[0_40px_120px_rgba(0,0,0,0.65)] lg:inset-x-auto lg:bottom-auto lg:left-1/2 lg:top-1/2 lg:w-full lg:max-w-md lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-[1.35rem]"
        style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
        <div className="relative max-h-[min(84dvh,720px)] overflow-y-auto overscroll-contain px-6 pb-4 pt-8">
          <p className="text-center font-display text-[0.65rem] font-normal uppercase tracking-[0.42em] text-white/40">
            Visit
          </p>
          <h2
            id="visit-heading"
            className="mt-4 text-center font-display text-[1.85rem] font-light leading-[1.08] tracking-[-0.02em] text-white sm:text-[2.1rem]"
          >
            Find the estate
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-center font-editorial text-[1.05rem] font-normal leading-relaxed text-white/58">
            Follow the highway to Kovalpalli — the campus opens into banquet halls, Village Cafe, and the main dining rooms.
          </p>
          <div className="mt-10 flex flex-col gap-3">
            <a
              href={MAPS}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-[52px] items-center justify-center border border-white/18 font-display text-[0.7rem] font-medium uppercase tracking-[0.22em] text-white/90 transition hover:border-[color:var(--gold)]/40 hover:text-[color:var(--gold)]"
            >
              Open in Maps
            </a>
            <a
              href={`tel:${PHONE}`}
              className="flex min-h-[48px] items-center justify-center font-editorial text-sm text-white/50 underline-offset-[6px] hover:text-white/75"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
          <dl className="mt-10 space-y-6 border-t border-white/[0.08] pt-8 font-editorial text-sm leading-relaxed text-white/55">
            <div>
              <dt className="font-display text-[0.62rem] uppercase tracking-[0.32em] text-white/35">Hours</dt>
              <dd className="mt-2 text-white/78">Daily · 11:00 AM — 12:30 AM</dd>
            </div>
            <div>
              <dt className="font-display text-[0.62rem] uppercase tracking-[0.32em] text-white/35">Arrival</dt>
              <dd className="mt-2">Main entrance from the highway — signage to restaurant and banquet.</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={onClose}
            className="mt-10 w-full font-editorial text-sm text-white/45 underline-offset-[6px] hover:text-white/70"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function EditorialSpread({
  src,
  alt,
  chapter,
  kicker,
  title,
  body,
  objectPosition,
  imageClassName = "",
  sizes = SIZES_VIEWPORT,
  quality = Q_SPREAD,
  priority = false,
}: {
  src: string;
  alt: string;
  chapter: string;
  kicker: string;
  title: string;
  body: string;
  /** Optional inline object-position (e.g. `30% center`) when Tailwind classes are not enough */
  objectPosition?: string;
  /** Art-directed `object-*` utilities — mobile vs `lg:` */
  imageClassName?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
}) {
  return (
    <section className="relative min-h-[min(100dvh,920px)] w-full overflow-hidden bg-[#060504] lg:min-h-screen">
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={priority}
          className={["oryx-lux-photo", "oryx-hospitality-photo", "object-cover", imageClassName].filter(Boolean).join(" ")}
          style={objectPosition ? { objectPosition } : undefined}
        />
        <div className="oryx-hospitality-grade" aria-hidden />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/48 to-amber-950/22 lg:via-black/34" />
      </div>
      <div className="pointer-events-none absolute left-6 top-[max(5.5rem,14svh)] hidden font-display text-[clamp(4rem,14vw,10rem)] font-light leading-none text-white/[0.04] lg:left-10 lg:block">
        {chapter}
      </div>
      <div className="relative flex min-h-[min(100dvh,920px)] flex-col justify-end px-5 pb-[max(3rem,12svh)] pt-40 sm:px-8 lg:min-h-screen lg:max-w-2xl lg:px-14 lg:pb-24">
        <p className="editorial-view-rise font-display text-[0.62rem] font-normal uppercase tracking-[0.4em] text-[color:var(--gold)]/85">
          {kicker}
        </p>
        <h2 className="editorial-view-rise-slow mt-5 font-display text-[clamp(2.25rem,8.5vw,4rem)] font-light leading-[0.98] tracking-[-0.03em] text-white">
          {title}
        </h2>
        <p className="editorial-view-rise-slow mt-6 max-w-md font-editorial text-[1.0625rem] leading-[1.65] text-white/72">
          {body}
        </p>
      </div>
    </section>
  );
}

function GalleryRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const hide = () => setHint(false);
    el.addEventListener("scroll", hide, { passive: true });
    return () => el.removeEventListener("scroll", hide);
  }, []);

  return (
    <section
      id="gallery"
      className="border-t border-white/[0.06] bg-[#080706] py-[clamp(4rem,14vw,7.5rem)]"
      aria-labelledby="gallery-heading"
    >
      <div className="px-5 sm:px-8 lg:px-14">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/[0.07] pb-8">
          <div>
            <p id="gallery-heading" className="editorial-chapter-mark text-[0.7rem]">
              04
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,5vw,2.75rem)] font-light tracking-[-0.02em] text-white">
              Atmosphere, frame by frame
            </h2>
          </div>
          <p
            className={`max-w-[11rem] text-right font-display text-[0.58rem] font-normal uppercase tracking-[0.36em] text-white/35 transition-opacity duration-700 lg:max-w-none ${
              hint ? "opacity-100" : "opacity-0"
            }`}
          >
            Swipe
          </p>
        </div>
      </div>
      <div
        ref={railRef}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] sm:gap-5 sm:px-8 lg:gap-6 lg:px-14 [&::-webkit-scrollbar]:hidden"
      >
        {GALLERY.map((item) => (
          <figure
            key={item.src}
            className="relative w-[min(88vw,420px)] shrink-0 snap-center overflow-hidden rounded-sm border border-white/[0.08] bg-black shadow-[0_24px_80px_rgba(0,0,0,0.45)] lg:w-[min(32vw,480px)]"
          >
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={item.src}
                alt={item.caption}
                fill
                sizes={SIZES_GALLERY_CARD}
                quality={Q_GALLERY}
                className="oryx-lux-photo oryx-hospitality-photo object-cover object-center"
              />
              <div className="oryx-hospitality-grade oryx-hospitality-grade--subtle" aria-hidden />
            </div>
            <figcaption className="border-t border-white/[0.06] px-4 py-4">
              <p className="font-display text-[0.58rem] uppercase tracking-[0.32em] text-white/40">{item.credit}</p>
              <p className="mt-1 font-editorial text-base italic text-white/75">{item.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function OryxEditorialExperience() {
  const navSolid = useScrollPast(24);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  return (
    <div className="relative bg-[#080706] text-white">
      <LuxeReserveSheet open={reserveOpen} onClose={() => setReserveOpen(false)} />
      <LuxeVisitSheet open={visitOpen} onClose={() => setVisitOpen(false)} />

      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,backdrop-filter] duration-500 ${
          navSolid ? "bg-[#080706]/88 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/" className="group font-display text-[0.72rem] font-light uppercase tracking-[0.38em] text-white/90">
            Oryx Village
            <span className="ml-2 inline-block h-px w-0 bg-[color:var(--gold)] transition-all duration-500 group-hover:w-8" />
          </Link>
          <nav className="flex items-center gap-6 sm:gap-10" aria-label="Primary">
            <button
              type="button"
              onClick={() => setVisitOpen(true)}
              className="font-display text-[0.58rem] font-normal uppercase tracking-[0.32em] text-white/50 transition hover:text-white/85"
            >
              Visit
            </button>
            <button
              type="button"
              onClick={() => setReserveOpen(true)}
              className="font-display text-[0.58rem] font-normal uppercase tracking-[0.32em] text-[color:var(--gold)] transition hover:text-[color:var(--gold-3)]"
            >
              Reserve
            </button>
          </nav>
        </div>
      </header>

      {/* I — Opening: real arrival photography */}
      <section id="arrival" className="relative min-h-[100dvh] w-full overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src={IMG.hero}
            alt="Oryx Village — thatched gazebo at night, table set for four under a warm pendant lamp, tropical garden"
            fill
            priority
            fetchPriority="high"
            sizes={SIZES_VIEWPORT}
            quality={Q_HERO}
            className={`oryx-lux-photo oryx-hospitality-photo object-cover max-lg:object-[center_56%] lg:object-[center_50%] motion-reduce:scale-100 motion-safe:transition-transform motion-safe:duration-[2.8s] motion-safe:ease-out ${
              heroLoaded ? "scale-100" : "scale-[1.03]"
            }`}
            onLoadingComplete={() => setHeroLoaded(true)}
          />
          <div className="oryx-hospitality-grade" aria-hidden />
          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/52 to-amber-950/24 lg:via-black/42" />
        </div>
        <div className="relative flex min-h-[100dvh] flex-col justify-end px-5 pb-[max(2.5rem,10svh)] pt-32 sm:px-8 lg:px-14 lg:pb-20">
          <p className="editorial-view-rise max-w-xl font-display text-[0.62rem] font-normal uppercase tracking-[0.42em] text-[color:var(--gold)]/90">
            Kanhangad, Kerala
          </p>
          <h1 className="editorial-view-rise-slow mt-6 max-w-[min(100%,20ch)] font-display text-[clamp(2.75rem,12vw,5.5rem)] font-light leading-[0.95] tracking-[-0.04em] text-white">
            An estate built for appetite
          </h1>
          <p className="editorial-view-rise-slow mt-8 max-w-md font-editorial text-[1.0625rem] leading-[1.68] text-white/70">
            Banquet halls, Village Cafe, live grills, and rooms that stay open until the highway quiets — all on one campus.
          </p>
          <div className="editorial-view-rise-slow mt-12 flex flex-wrap items-center gap-8">
            <span className="font-display text-[0.55rem] font-normal uppercase tracking-[0.42em] text-white/38">
              Scroll
            </span>
            <span className="h-px w-16 bg-gradient-to-r from-[color:var(--gold)]/50 to-transparent" aria-hidden />
          </div>
        </div>
      </section>

      {/* II — First editorial spread */}
      <EditorialSpread
        chapter="01"
        src={IMG.spreadNight}
        alt="Creamy baked pasta lifted on a fork — cheese pull, herbs, shallow depth of field"
        kicker="The pass"
        title="Heat you can feel before the first bite"
        body="Cream, melt, a little char on the crust — the kind of moment phones come out for, then get put away because the steam says enough."
        imageClassName="max-lg:object-[center_42%] lg:object-[center_36%]"
      />

      {/* III — Story interlude */}
      <section
        id="story"
        className="relative border-t border-white/[0.05] bg-[#080706] px-5 py-[clamp(4.5rem,16vw,9rem)] sm:px-8 lg:px-14"
        aria-labelledby="story-heading"
      >
        <div className="pointer-events-none absolute right-6 top-24 font-display text-[clamp(5rem,22vw,14rem)] font-extralight leading-none text-white/[0.03] lg:right-16">
          02
        </div>
        <div className="relative mx-auto max-w-xl">
          <p id="story-heading" className="font-display text-[0.62rem] font-normal uppercase tracking-[0.4em] text-[color:var(--gold)]/80">
            A single narrative
          </p>
          <p className="editorial-view-rise mt-10 font-editorial text-[clamp(1.125rem,2.4vw,1.25rem)] font-normal leading-[1.72] text-white/62">
            Oryx Village was conceived as a destination, not a dining room with a parking lot. Families arrive for milestones;
            friends gather after long drives; kitchens stay lit for late tables. Kerala, Arabic, and grill traditions share one
            fire — disciplined craft, generous portions, and service that reads the room.
          </p>
          <blockquote className="editorial-view-rise-slow mt-14 border-l border-[color:var(--gold)]/35 pl-6 font-editorial text-[clamp(1.2rem,3vw,1.45rem)] font-normal italic leading-snug text-white/78">
            We cook for the people who will talk about this meal for years.
          </blockquote>
        </div>
      </section>

      {/* IV — Second spread: table as canvas */}
      <section className="relative min-h-[min(92dvh,880px)] w-full overflow-hidden bg-[#050403] lg:min-h-screen">
        <div className="grid min-h-[min(92dvh,880px)] lg:min-h-screen lg:grid-cols-[1fr_min(44vw,520px)]">
          <div className="relative min-h-[52dvh] lg:min-h-full">
            <Image
              src={IMG.spreadTable}
              alt="Oryx Village — editorial still, atmosphere without portraits"
              fill
              sizes={SIZES_SPLIT_IMAGE}
              quality={Q_EDITORIAL}
              className="oryx-lux-photo oryx-hospitality-photo object-cover max-lg:object-[center_48%] lg:object-[center_52%]"
            />
            <div className="oryx-hospitality-grade oryx-hospitality-grade--subtle" aria-hidden />
            <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/58 via-black/22 to-transparent lg:from-black/42" />
          </div>
          <div className="flex flex-col justify-center px-5 py-16 sm:px-10 lg:py-24 lg:pl-4 lg:pr-16">
            <p className="editorial-chapter-mark text-[0.7rem]">03</p>
            <h2 className="editorial-view-rise mt-4 font-display text-[clamp(1.85rem,4.5vw,2.65rem)] font-light leading-[1.05] tracking-[-0.025em] text-white">
              Composition matters as much as flavour
            </h2>
            <p className="editorial-view-rise-slow mt-8 font-editorial text-[1.0625rem] leading-[1.68] text-white/58">
              Every service is plated with the eye of an editor — colour, height, negative space. On the plate and on the floor,
              we favour clarity over noise.
            </p>
          </div>
        </div>
      </section>

      <GalleryRail />

      {/* V — Signatures as art */}
      <section
        id="signatures"
        className="border-t border-white/[0.06] bg-[#060504] px-5 py-[clamp(4rem,14vw,7rem)] sm:px-8 lg:px-14"
        aria-labelledby="signatures-heading"
      >
        <div className="mx-auto max-w-[1200px]">
          <p id="signatures-heading" className="editorial-chapter-mark text-[0.7rem]">
            05
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.85rem,5vw,3rem)] font-light tracking-[-0.02em] text-white">
            Signatures
          </h2>
          <p className="mt-5 max-w-lg font-editorial text-[1.02rem] leading-relaxed text-white/52">
            Three notes from the repertoire — photographed as they arrive, not styled for a template.
          </p>
          <div className="mt-16 grid gap-16 lg:mt-20 lg:grid-cols-3 lg:gap-10">
            {SIGNATURES.map((dish, i) => (
              <article key={dish.name} className="group">
                <div className="relative overflow-hidden rounded-sm border border-white/[0.07] bg-black">
                  <div className="relative aspect-[4/5] w-full lg:aspect-[3/4]">
                    <Image
                      src={dish.src}
                      alt={dish.name}
                      fill
                      sizes={SIZES_SIGNATURE}
                      quality={Q_SIGNATURE}
                      className="oryx-lux-photo oryx-hospitality-food object-cover object-center transition duration-[1.4s] ease-out group-hover:scale-[1.02]"
                    />
                    <div className="oryx-hospitality-grade oryx-hospitality-grade--subtle" aria-hidden />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent opacity-80 lg:opacity-70" />
                </div>
                <div className="mt-6 flex items-start gap-4">
                  <span className="font-display text-[0.65rem] font-light tabular-nums text-white/25">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-lg font-light tracking-wide text-white">{dish.name}</h3>
                    <p className="mt-3 font-editorial text-[0.9375rem] leading-relaxed text-white/50">{dish.note}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VI — Visit & footer */}
      <footer id="visit" className="border-t border-white/[0.06] bg-[#080706] px-5 py-[clamp(3.5rem,12vw,6rem)] sm:px-8 lg:px-14">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-display text-[0.62rem] font-normal uppercase tracking-[0.4em] text-white/38">Oryx Village</p>
            <p className="mt-4 max-w-sm font-editorial text-[1rem] leading-relaxed text-white/55">
              Kovalpalli, Kanhangad · Kerala. On the Kochi–Panvel Highway.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <button
              type="button"
              onClick={() => setVisitOpen(true)}
              className="inline-flex min-h-[48px] items-center justify-center border border-white/15 px-8 font-display text-[0.58rem] font-normal uppercase tracking-[0.28em] text-white/75 transition hover:border-[color:var(--gold)]/35 hover:text-white"
            >
              Directions
            </button>
            <button
              type="button"
              onClick={() => setReserveOpen(true)}
              className="inline-flex min-h-[48px] items-center justify-center border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/[0.08] px-8 font-display text-[0.58rem] font-normal uppercase tracking-[0.28em] text-[color:var(--gold)] transition hover:bg-[color:var(--gold)]/14"
            >
              Reserve
            </button>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-[1200px] border-t border-white/[0.06] pt-8 font-display text-[0.55rem] uppercase tracking-[0.28em] text-white/30">
          © {new Date().getFullYear()} Oryx Village · Crafted for the table
        </div>
      </footer>

      {/* Mobile-first floating reserve — thumb reach without app-chrome clutter */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[55] flex justify-center pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
        <button
          type="button"
          onClick={() => setReserveOpen(true)}
          className="pointer-events-auto mb-1 rounded-full border border-white/12 bg-[#0c0b0a]/90 px-7 py-3.5 font-display text-[0.58rem] font-medium uppercase tracking-[0.34em] text-white/88 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md transition active:scale-[0.98]"
        >
          Reserve a table
        </button>
      </div>
    </div>
  );
}

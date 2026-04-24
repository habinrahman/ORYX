"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Q_GALLERY, Q_SIGNATURE, SIZES_GALLERY_CARD, SIZES_SIGNATURE, SIZES_VIEWPORT } from "@/lib/oryx-images";
import { ORYX_SHARP_10 as P } from "@/lib/oryx-sharp-pool";

/** Brochure strip — six distinct owner-grade frames (estate, food, campus, beverage). */
const IG_MOMENTS = [P.spreadWide, P.banquet, P.dishMandi, P.dishParotta, P.editorialStill, P.thaliFeastOverhead] as const;

const SPACES = [
  { src: P.banquet, alt: "Grand thali spread on the table", cap: "Banquet tables" },
  { src: P.estateExterior, alt: "Campus lawn, reflection pool, and tiled roofs", cap: "Arrival" },
  { src: P.lobbyInterior, alt: "Layered coffee in a tall glass — stone wall setting", cap: "Beverages" },
] as const;

/** Brochure grid — print-ready photography + brand lockup */
const GALLERY_GRID = [
  { src: P.banquet, alt: "Grand thali with curries, breads, and sides" },
  { src: P.banquetFeast, alt: "Mandi-style rice with grilled chicken and sauces" },
  { src: P.estateExterior, alt: "Campus arrival — lawns, pool, and tiled roofs" },
  { src: P.editorialStill, alt: "Campus grounds with reflection pool and palms" },
  { src: P.thaliFeastOverhead, alt: "Layered evening coffee in a tall glass" },
  {
    src: P.brandLockup,
    alt: "Oryx Village wordmark and emblem on deep burgundy",
    contain: true,
  },
] as const;

const MENU_HIGHLIGHTS = [
  {
    name: "Live grill & tandoor",
    desc: "Seekh, tikka, naan from the coal — Arabic and North Indian classics.",
  },
  {
    name: "Kerala coastal",
    desc: "Karimeen, crab, prawns — spice-forward, coconut-led, lime-bright.",
  },
  {
    name: "Village Cafe favourites",
    desc: "Parotta, beef fry, hearty curries — the highway comfort that built the name.",
  },
  {
    name: "Biriyani & rice",
    desc: "Kizhi, mandi, ghee rice — long grains, slow meat, crowd-pleasing portions.",
  },
  {
    name: "Indo-Chinese & soups",
    desc: "Manchow, noodles, chilli — late-night plates the kitchen never rushes.",
  },
  {
    name: "Desserts & beverages",
    desc: "House pastries, cold coffee, mocktails — a proper finish.",
  },
] as const;

const NAV = [
  { id: "signatures", label: "Signatures" },
  { id: "spaces", label: "Spaces" },
  { id: "menu", label: "Menu" },
  { id: "instagram", label: "Gallery" },
  { id: "banquets", label: "Banquets" },
  { id: "reserve", label: "Reserve" },
] as const;

const PHONE = "+919562217000";
const PHONE_DISPLAY = "+91 95622 17000";
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=Oryx+Village+Kovalpalli+Kanhangad+Kerala";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function OryxPremiumHome() {
  const [reserveOpen, setReserveOpen] = useState(false);
  const closeReserve = useCallback(() => setReserveOpen(false), []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      {/* Top trust strip */}
      <div className="border-b border-white/[0.08] bg-[#080808]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center sm:justify-start sm:text-left">
            <a
              href="https://www.instagram.com/oryxvillage/"
              target="_blank" 
              rel="noreferrer"
              className="text-sm text-zinc-300 transition hover:text-white"
            >
              <span className="font-semibold text-white">35K+</span> Instagram followers
            </a>
            <a href={MAPS} target="_blank" rel="noreferrer" className="text-sm text-zinc-300 transition hover:text-white">
              <span className="font-semibold text-white">4.8</span> Google rating
            </a>
            <span className="text-sm text-zinc-300">
              Open until <span className="font-semibold text-white">12:30 AM</span>
            </span>
          </div>
          <div className="flex justify-center sm:justify-end">
            <a
              href="https://www.instagram.com/oryxvillage/"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--gold)] transition hover:text-[color:var(--gold-3)]"
            >
              @oryxvillage
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0a]/98">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <Link href="/" className="font-display text-lg font-medium tracking-[0.12em] text-white sm:text-xl">
            ORYX VILLAGE
          </Link>
          <nav className="hidden items-center gap-5 lg:flex" aria-label="Section">
            {NAV.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => scrollToId(n.id)}
                className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-400 transition hover:text-white"
              >
                {n.label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setReserveOpen(true)}
            className="shrink-0 rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--gold)] transition hover:bg-[color:var(--gold)]/18"
          >
            Reserve
          </button>
        </div>
        <nav className="flex gap-1 overflow-x-auto border-t border-white/[0.05] px-4 py-2.5 lg:hidden" aria-label="Section">
          {NAV.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => scrollToId(n.id)}
              className="shrink-0 rounded-full bg-white/[0.06] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-300"
            >
              {n.label}
            </button>
          ))}
        </nav>
      </header>

      {reserveOpen ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
          <button type="button" className="absolute inset-0 bg-black/70" aria-label="Close" onClick={closeReserve} />
          <div className="relative z-10 w-full max-w-md rounded-t-2xl border border-white/10 bg-[#111] p-6 shadow-2xl sm:rounded-2xl">
            <h2 className="font-display text-2xl font-medium text-white">Reserve a table</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Kovalpalli, Kanhangad · Kochi–Panvel Highway. Call the restaurant directly — we confirm quickly.
            </p>
            <a
              href={`tel:${PHONE}`}
              className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-[color:var(--gold)] text-sm font-semibold text-black transition hover:opacity-95"
            >
              {PHONE_DISPLAY}
            </a>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a href={MAPS} target="_blank" rel="noreferrer" className="text-[color:var(--gold)] underline-offset-4 hover:underline">
                Directions on Google Maps
              </a>
            </div>
            <button type="button" onClick={closeReserve} className="mt-6 w-full text-sm text-zinc-500 hover:text-zinc-300">
              Close
            </button>
          </div>
        </div>
      ) : null}

      {/* Hero — main entrance daylight; bottom scrim only for type */}
      <section id="hero" className="relative">
        <div className="relative aspect-[4/5] w-full sm:aspect-[21/9] sm:max-h-[min(85vh,820px)] sm:min-h-[420px]">
          <Image
            src={P.hero}
            alt="Oryx Village — main entrance, boardwalk and tropical architecture"
            fill
            priority
            fetchPriority="high"
            sizes={SIZES_VIEWPORT}
            quality={100}
            className="object-cover object-[center_bottom] sm:object-[center_45%] brightness-[1.02] contrast-[1.06] saturate-[1.05]"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(54%,420px)] bg-gradient-to-t from-black/88 via-black/28 to-transparent sm:h-[min(44%,360px)]"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 max-w-6xl px-4 pb-10 pt-24 sm:px-6 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[color:var(--gold)] drop-shadow-sm">Kanhangad, Kerala</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.75)] sm:text-5xl lg:text-6xl">
              Destination dining on the highway
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-100 drop-shadow-[0_1px_16px_rgba(0,0,0,0.8)] sm:text-lg">
              Multi-cuisine rooms, Village Cafe, banquet halls, grills, and late service — one estate, one standard of hospitality.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToId("reserve")}
                className="h-12 rounded-full bg-white px-8 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                Book a table
              </button>
              <button
                type="button"
                onClick={() => scrollToId("menu")}
                className="h-12 rounded-full border border-white/25 px-8 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View menu highlights
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Signature dishes */}
      <section id="signatures" className="scroll-mt-20 border-t border-white/[0.06] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--gold)]">The kitchen</p>
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">Signature dishes</h2>
          <p className="mt-3 max-w-2xl text-zinc-400">Brochure-grade plates — composed for clarity and appetite.</p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-8">
            {[
              { src: P.dishMandi, title: "Mandi & rice", alt: "Mandi-style rice with grilled chicken and sauces" },
              { src: P.dishParotta, title: "Indo-Chinese signatures", alt: "Crispy plates with glazed mains on the table" },
              { src: P.masalaFish, title: "Grand thali", alt: "Overhead grand thali with curries, breads, and sides" },
            ].map((d) => (
              <article key={d.title} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-zinc-900 sm:aspect-[3/4]">
                  <Image
                    src={d.src}
                    alt={d.alt}
                    fill
                    sizes={SIZES_SIGNATURE}
                    quality={Q_SIGNATURE}
                    className="object-cover object-[center_40%] transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <h3 className="mt-4 font-display text-lg font-medium text-white">{d.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant spaces */}
      <section id="spaces" className="scroll-mt-20 border-t border-white/[0.06] bg-[#080808] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--gold)]">The estate</p>
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">Restaurant spaces</h2>
          <p className="mt-3 max-w-2xl text-zinc-400">Reception, main dining, and campus arrival — built for both quiet tables and full houses.</p>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {SPACES.map((s) => (
              <figure key={s.cap} className="overflow-hidden rounded-lg">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(min-width:1024px) 33vw, 100vw"
                    quality={Q_GALLERY}
                    className="object-cover object-[center_45%] sm:object-center"
                  />
                </div>
                <figcaption className="mt-3 text-sm font-medium text-zinc-300">{s.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Menu highlights */}
      <section id="menu" className="scroll-mt-20 border-t border-white/[0.06] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--gold)]">Menu</p>
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">Highlights</h2>
          <p className="mt-3 max-w-2xl text-zinc-400">A concise map of the house — full à la carte and banquet menus available on site.</p>
          <ul className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {MENU_HIGHLIGHTS.map((m) => (
              <li key={m.name} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <span className="font-medium text-white">{m.name}</span>
                <span className="max-w-xl text-sm leading-relaxed text-zinc-400">{m.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Instagram moments — horizontal strip */}
      <section id="instagram" className="scroll-mt-20 border-t border-white/[0.06] bg-[#080808] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--gold)]">Instagram</p>
              <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">Moments from the pass</h2>
            </div>
            <a
              href="https://www.instagram.com/oryxvillage/"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 text-sm font-medium text-[color:var(--gold)] hover:underline"
            >
              Follow on Instagram →
            </a>
          </div>
          <div className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] sm:gap-4">
            {IG_MOMENTS.map((src) => (
              <div
                key={src}
                className="relative aspect-square w-[min(78vw,280px)] shrink-0 snap-start overflow-hidden rounded-lg sm:w-[min(32vw,220px)]"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes={SIZES_GALLERY_CARD}
                  quality={Q_GALLERY}
                  className="object-cover object-[center_42%]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family / Banquets */}
      <section id="banquets" className="scroll-mt-20 border-t border-white/[0.06] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 sm:items-center sm:px-6 lg:gap-16 lg:px-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg sm:order-2">
            <Image
              src={P.banquetFeast}
              alt="Mandi-style feast platter with rice and grilled chicken"
              fill
              sizes="(min-width:1024px) 45vw, 100vw"
              quality={Q_SIGNATURE}
              className="object-cover object-[center_38%]"
            />
          </div>
          <div className="sm:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--gold)]">Celebrations</p>
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">Family tables & banquets</h2>
            <p className="mt-4 text-zinc-400 leading-relaxed">
              Private dining, children&apos;s salon, seafood counter, and banquet halls sized for weddings and corporate nights — same kitchen, same service team, scaled to your occasion.
            </p>
            <button
              type="button"
              onClick={() => setReserveOpen(true)}
              className="mt-8 h-12 rounded-full border border-white/20 px-8 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Enquire for banquets
            </button>
          </div>
        </div>
      </section>

      {/* Gallery — strongest stills */}
      <section className="border-t border-white/[0.06] bg-[#080808] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-medium text-white sm:text-3xl">Gallery</h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Owner-approved photography and brand — suitable for premium print collateral.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
            {GALLERY_GRID.map((g) => (
              <div
                key={"contain" in g && g.contain ? `${g.src}-brand` : g.src}
                className={
                  "contain" in g && g.contain
                    ? "relative aspect-[3/4] overflow-hidden rounded-lg bg-[#1f080c]"
                    : "relative aspect-[3/4] overflow-hidden rounded-lg"
                }
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(min-width:1024px) 33vw, 50vw"
                  quality={Q_GALLERY}
                  className={
                    "contain" in g && g.contain
                      ? "object-contain object-center p-6 sm:p-8"
                      : "object-cover object-[center_40%] sm:object-[center_45%]"
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation */}
      <section id="reserve" className="scroll-mt-20 border-t border-white/[0.06] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.08] bg-[#111] p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div>
              <h2 className="font-display text-3xl font-medium text-white sm:text-4xl">Reserve</h2>
              <p className="mt-3 max-w-md text-zinc-400">Daily service · 11:00 AM — 12:30 AM. Call for same-day tables and banquet holds.</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 lg:mt-0 lg:min-w-[240px]">
              <a
                href={`tel:${PHONE}`}
                className="flex h-12 items-center justify-center rounded-lg bg-[color:var(--gold)] text-sm font-semibold text-black hover:opacity-95"
              >
                {PHONE_DISPLAY}
              </a>
              <a href={MAPS} target="_blank" rel="noreferrer" className="flex h-11 items-center justify-center text-sm text-[color:var(--gold)] hover:underline">
                Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} Oryx Village · Kovalpalli, Kanhangad</span>
          <span className="text-xs uppercase tracking-wider">Kochi–Panvel Highway, Kerala</span>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { CalendarPlus, Compass, MapPin, UtensilsCrossed } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLenis } from "@/contexts/lenis-context";

export type MobileDockTab = "menu" | "explore" | "reserve" | "visit";

type MobileAppDockProps = {
  activeTab: MobileDockTab;
  onMenu: () => void;
  onExplore: () => void;
  onReserve: () => void;
  onVisit: () => void;
};

const TAB = [
  {
    id: "menu" as const,
    label: "Menu",
    Icon: UtensilsCrossed,
    onPress: (p: MobileAppDockProps) => p.onMenu,
  },
  {
    id: "explore" as const,
    label: "Explore",
    Icon: Compass,
    onPress: (p: MobileAppDockProps) => p.onExplore,
  },
  {
    id: "reserve" as const,
    label: "Reserve",
    Icon: CalendarPlus,
    onPress: (p: MobileAppDockProps) => p.onReserve,
  },
  {
    id: "visit" as const,
    label: "Visit",
    Icon: MapPin,
    onPress: (p: MobileAppDockProps) => p.onVisit,
  },
];

/**
 * App-style bottom navigation — mobile-first. Desktop hidden; use chapter chrome on lg+.
 */
export function MobileAppDock(props: MobileAppDockProps) {
  const { activeTab } = props;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[70] lg:hidden"
      style={{ paddingBottom: "max(0.35rem, env(safe-area-inset-bottom))" }}
      aria-label="Primary"
    >
      <div className="mx-auto max-w-lg px-2 pb-1">
        <div className="flex items-stretch justify-between gap-1 rounded-[1.35rem] border border-white/12 bg-[rgba(8,6,5,0.88)] p-1.5 shadow-[0_-8px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          {TAB.map(({ id, label, Icon, onPress }) => {
            const active = activeTab === id;
            const handler = onPress(props);
            return (
              <button
                key={id}
                type="button"
                onClick={handler}
                className={`relative flex min-h-[56px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 transition-[transform,background-color,color] duration-200 active:scale-[0.96] ${
                  active
                    ? "bg-gradient-to-b from-white/[0.14] to-white/[0.06] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                    : "text-white/48 active:bg-white/[0.06]"
                }`}
              >
                {active ? (
                  <span
                    className="absolute inset-x-3 top-1 h-0.5 rounded-full bg-gradient-to-r from-amber-400 via-[color:var(--gold)] to-fuchsia-400 opacity-95"
                    aria-hidden
                  />
                ) : null}
                <Icon
                  className={`size-[22px] shrink-0 ${active ? "text-[color:var(--gold)]" : "text-white/55"}`}
                  strokeWidth={active ? 2.25 : 1.85}
                  aria-hidden
                />
                <span
                  className={`max-w-full truncate text-[10px] font-semibold tracking-[0.04em] ${
                    active ? "text-white" : "text-white/45"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

type ReserveBottomSheetProps = {
  open: boolean;
  onClose: () => void;
};

export function ReserveBottomSheet({ open, onClose }: ReserveBottomSheetProps) {
  const lenis = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);

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
    <div className="fixed inset-0 z-[85] lg:hidden" role="dialog" aria-modal="true" aria-label="Reserve">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="absolute inset-x-0 bottom-0 max-h-[min(92dvh,880px)] rounded-t-[1.85rem] border border-white/12 bg-[linear-gradient(165deg,rgba(24,18,14,0.98)_0%,#0a0806_45%)] px-4 pt-4 shadow-[0_-28px_90px_rgba(0,0,0,0.72)]"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto mb-4 h-1 w-11 rounded-full bg-white/20" aria-hidden />
        <div className="max-h-[min(76dvh,700px)] overflow-y-auto overscroll-contain pb-2">
          <p className="text-center font-mono text-[10px] font-bold tracking-[0.32em] text-fuchsia-300/80">
            TABLE · BANQUET · LATE NIGHT
          </p>
          <h2 className="mt-2 text-center font-display text-[1.65rem] font-black tracking-[-0.02em] text-white sm:text-3xl">
            Reserve your night
          </h2>
          <p className="mt-2 text-center font-display text-base font-semibold text-white/72">
            <a href="tel:+919562217000" className="text-[color:var(--gold)] underline-offset-4">
              +91 95622 17000
            </a>
          </p>
          <p className="mt-1 text-center font-mono text-[9px] leading-relaxed tracking-[0.14em] text-white/42">
            Open daily until 12:30 AM · Kochi–Panvel, Kanhangad
          </p>

          <div className="mt-7 flex flex-col gap-3">
            <a
              href="tel:+919562217000"
              className="flex min-h-[54px] items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 font-mono text-[12px] font-black tracking-[0.14em] text-black shadow-lg active:scale-[0.98]"
            >
              CALL TO BOOK
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Oryx+Village+Kovalpalli+Kanhangad+Kerala"
              target="_blank"
              rel="noreferrer"
              className="flex min-h-[50px] items-center justify-center rounded-2xl border border-white/18 font-mono text-[11px] font-bold tracking-[0.12em] text-white active:bg-white/5"
            >
              NEED DIRECTIONS? MAPS ↗
            </a>
          </div>

          <form
            className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-7"
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <label className="font-mono text-[10px] font-bold tracking-[0.2em] text-white/45">
              YOUR NAME
              <input
                name="name"
                autoComplete="name"
                className="mt-2 min-h-[54px] w-full rounded-xl border border-white/14 bg-white/[0.04] px-4 font-display text-lg font-bold text-white outline-none transition focus:border-[color:var(--gold)]/45"
                placeholder=""
              />
            </label>
            <label className="font-mono text-[10px] font-bold tracking-[0.2em] text-white/45">
              PARTY & TIME
              <textarea
                name="plan"
                rows={3}
                className="mt-2 min-h-[104px] w-full resize-none rounded-xl border border-white/14 bg-white/[0.04] px-4 py-3 font-editorial text-base text-white outline-none focus:border-[color:var(--gold)]/45"
                placeholder="Guests, occasion, preferred hour"
              />
            </label>
            <button
              type="submit"
              className="min-h-[54px] w-full rounded-2xl border border-white/22 font-mono text-[12px] font-black tracking-[0.2em] text-white transition active:bg-white active:text-black"
            >
              SEND REQUEST
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

type VisitBottomSheetProps = {
  open: boolean;
  onClose: () => void;
  onScrollToBook: () => void;
};

export function VisitBottomSheet({ open, onClose, onScrollToBook }: VisitBottomSheetProps) {
  const lenis = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);

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

  const mapsHref =
    "https://www.google.com/maps/search/?api=1&query=Oryx+Village+Kovalpalli+Kanhangad+Kerala";

  return (
    <div className="fixed inset-0 z-[85] lg:hidden" role="dialog" aria-modal="true" aria-label="Visit">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="absolute inset-x-0 bottom-0 max-h-[min(88dvh,780px)] rounded-t-[1.85rem] border border-white/12 bg-[linear-gradient(175deg,rgba(18,14,12,0.98)_0%,#060504_50%)] px-4 pt-4 shadow-[0_-28px_90px_rgba(0,0,0,0.72)]"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto mb-4 h-1 w-11 rounded-full bg-white/20" aria-hidden />
        <div className="max-h-[min(72dvh,640px)] overflow-y-auto overscroll-contain pb-2">
          <p className="text-center font-mono text-[10px] font-bold tracking-[0.3em] text-[color:var(--gold)]/85">
            VISIT · ORYX VILLAGE
          </p>
          <h2 className="mt-2 text-center font-display text-[1.6rem] font-black tracking-[-0.02em] text-white sm:text-3xl">
            Pull up to the highway
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-center font-editorial text-[15px] leading-relaxed text-white/72">
            Kovalpalli, Kanhangad — on the Kochi–Panvel corridor. Banquets, Village Cafe, and
            midnight service till 12:30 AM.
          </p>

          <div className="mt-7 flex flex-col gap-3">
            <a
              href={mapsHref}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-[54px] items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-600 to-orange-500 font-mono text-[12px] font-black tracking-[0.12em] text-white shadow-lg active:scale-[0.98]"
            >
              OPEN IN MAPS
            </a>
            <a
              href="tel:+919562217000"
              className="flex min-h-[50px] items-center justify-center rounded-2xl border border-white/18 font-mono text-[11px] font-bold tracking-[0.12em] text-white active:bg-white/5"
            >
              CALL THE FRONT DESK
            </a>
            <button
              type="button"
              onClick={() => {
                onClose();
                onScrollToBook();
              }}
              className="flex min-h-[50px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] font-mono text-[10px] font-bold tracking-[0.18em] text-white/75 active:bg-white/10"
            >
              FULL VISIT DETAILS ↓
            </button>
          </div>

          <dl className="mt-8 grid gap-4 border-t border-white/10 pt-6 font-mono text-[10px] tracking-[0.14em] text-white/45">
            <div>
              <dt className="font-bold text-white/55">HOURS</dt>
              <dd className="mt-1 font-display text-sm font-semibold tracking-normal text-white/88">
                Daily · 11:00 AM — 12:30 AM
              </dd>
            </div>
            <div>
              <dt className="font-bold text-white/55">PARKING & ENTRANCE</dt>
              <dd className="mt-1 font-display text-sm font-semibold tracking-normal text-white/88">
                Main campus entrance off the highway — follow signage to banquet & restaurant.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

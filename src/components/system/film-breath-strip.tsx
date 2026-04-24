"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";

const BEATS = [
  {
    line: "Beyond the corridor, charcoal and cardamom meet the same discipline.",
    note: "Approach",
  },
  {
    line: "Three kitchens answer to one pass—counter, tandoor, atelier.",
    note: "Line",
  },
  {
    line: "The last seating is not rushed; the house closes at half past twelve.",
    note: "Night",
  },
] as const;

/**
 * Signature moment: no buttons — trace the beam. Horizontal position crossfades
 * three beats of copy (campaign VO, not UI).
 */
export function FilmBreathStrip() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [zone, setZone] = useState(0);
  const mx = useMotionValue(0.5);
  const beam = useSpring(mx, {
    stiffness: reduce ? 300 : 120,
    damping: reduce ? 40 : 28,
    mass: reduce ? 0.9 : 0.4,
  });
  const beamPct = useTransform(beam, (v) => `${v * 100}%`);

  const active = useMemo(() => BEATS[reduce ? 1 : zone]!, [reduce, zone]);

  const onPointer = useCallback(
    (clientX: number) => {
      if (reduce) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (clientX - r.left) / Math.max(1, r.width);
      const clamped = Math.min(1, Math.max(0, x));
      mx.set(clamped);
      const z = clamped < 0.34 ? 0 : clamped < 0.67 ? 1 : 2;
      setZone((prev) => (prev === z ? prev : z));
    },
    [mx, reduce]
  );

  return (
    <section
      ref={ref}
      data-cursor="active"
      className="relative z-[2] border-y border-white/[0.05] bg-[linear-gradient(180deg,rgba(0,0,0,0.55),rgba(0,0,0,0.35))] py-14 sm:py-16"
      onPointerMove={(e) => onPointer(e.clientX)}
      onPointerDown={(e) => onPointer(e.clientX)}
      onPointerEnter={(e) => onPointer(e.clientX)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0px, transparent 11px, color-mix(in oklab, white 4%, transparent) 11px, color-mix(in oklab, white 4%, transparent) 12px)",
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--gold)]/25 to-transparent" />

      <div className="relative mx-auto max-w-[min(52rem,92vw)] px-6 text-center">
        <p className="lux-caption text-white/30">
          {reduce ? "Three beats, still frame" : "Trace the beam — three beats"}
        </p>

        <div className="relative mt-8 h-px w-full bg-white/[0.08]">
          <motion.div
            className="absolute -top-px h-[3px] w-[min(28%,8rem)] -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[color:var(--gold)]/70 to-transparent shadow-[0_0_24px_rgba(214,177,86,0.22)]"
            style={{ left: beamPct }}
          />
          <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-[8%] text-[8px] font-mono tracking-[0.28em] text-white/20">
            <span>Ⅰ</span>
            <span>Ⅱ</span>
            <span>Ⅲ</span>
          </div>
        </div>

        <div className="relative mt-10 min-h-[4.5rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={active.line}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-editorial text-[clamp(1.05rem,2.2vw,1.35rem)] font-normal italic leading-snug tracking-[0.02em] text-white/72"
              aria-live="polite"
            >
              {active.line}
            </motion.p>
          </AnimatePresence>
          <p className="mt-4 lux-caption text-white/28">{active.note}</p>
        </div>
      </div>
    </section>
  );
}

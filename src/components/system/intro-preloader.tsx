"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type IntroPreloaderProps = {
  onDone: () => void;
};

/** Film-leader style open — avoids generic “loading bar + marketing line” clichés. */
export function IntroPreloader({ onDone }: IntroPreloaderProps) {
  const reduce = useReducedMotion();
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    const t = window.setTimeout(onDone, reduce ? 900 : 1850);
    return () => window.clearTimeout(t);
  }, [onDone, reduce]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setTicks((n) => (n + 1) % 24);
    }, 70);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[oklch(0.02_0_0)]"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{
        clipPath: "inset(0% 0% 0% 100%)",
        transition: { duration: 0.72, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-3 opacity-[0.14]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, transparent 0px, transparent 10px, white 10px, white 12px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-3 opacity-[0.14]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, transparent 0px, transparent 10px, white 10px, white 12px)",
        }}
      />

      <div className="flex min-h-full flex-col items-center justify-center px-8">
        <motion.div
          className="relative w-full max-w-md text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="lux-caption text-white/35">Picture start</p>
          <p className="mt-6 font-display text-[clamp(2.15rem,8.5vw,3.75rem)] font-extralight tracking-[0.22em] text-white sm:tracking-[0.28em]">
            ORYX VILLAGE
          </p>
          <p className="mt-4 font-editorial text-sm italic text-white/45">
            Kanhangad · Kerala&apos;s grand coastal table
          </p>

          <div className="mx-auto mt-12 flex max-w-[16rem] items-center justify-between border-t border-b border-white/[0.1] py-3">
            <span className="lux-caption text-white/30">Reel 01</span>
            <span className="font-mono text-[11px] tabular-nums tracking-[0.2em] text-[color:var(--gold)]/90">
              {reduce ? "00:00:00:00" : `00:00:00:${String(ticks).padStart(2, "0")}`}
            </span>
            <span className="lux-caption text-white/30">Head</span>
          </div>

          {!reduce ? (
            <motion.div
              className="mx-auto mt-10 h-px max-w-[12rem] origin-left bg-gradient-to-r from-[color:var(--gold)]/80 via-white/25 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            />
          ) : null}
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[32vh] bg-gradient-to-t from-black via-black/40 to-transparent"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 0.55 }}
        transition={{ duration: 1.2 }}
      />
    </motion.div>
  );
}

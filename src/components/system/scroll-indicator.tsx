"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.55 });

  return (
    <div className="pointer-events-none fixed right-5 top-1/2 z-[55] hidden -translate-y-1/2 xl:flex xl:flex-col xl:items-center xl:gap-3">
      <span className="lux-caption text-[9px] tracking-[0.32em] text-white/28 [writing-mode:vertical-lr]">
        scroll
      </span>
      <div className="relative h-44 w-[2px]">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "repeating-linear-gradient(180deg, transparent 0px, transparent 7px, color-mix(in oklab, white 18%, transparent) 7px, color-mix(in oklab, white 18%, transparent) 8px)",
          }}
        />
        <div className="absolute inset-0 overflow-hidden bg-white/[0.04]">
          <motion.div
            className="h-full w-full origin-top bg-gradient-to-b from-[color:var(--gold)]/95 via-[color:var(--gold)]/35 to-transparent"
            style={{ scaleY: p }}
          />
        </div>
      </div>
      <span className="font-mono text-[9px] tabular-nums tracking-[0.2em] text-white/22">
        00—01
      </span>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";
import { ACT_PLAYBILL, type Scene } from "@/lib/scenes";

type SceneChangeDetail = {
  scene: Scene;
  previous: Scene;
};

/**
 * Full-screen iris “cut” between chapters — flagship interaction.
 * Listens for `oryx:scenechange` (dispatched from SceneManager).
 */
export function FilmChapterMask() {
  const reduce = useReducedMotion();
  const busy = useRef(false);
  const irisRef = useRef<HTMLDivElement>(null);
  const [playbill, setPlaybill] = useState<Scene | null>(null);

  useEffect(() => {
    const onSceneChange = async (e: Event) => {
      const { scene, previous } = (e as CustomEvent<SceneChangeDetail>).detail;
      if (!previous || previous === scene) return;
      if (reduce) return;
      if (busy.current) return;
      busy.current = true;

      const el = irisRef.current;
      if (!el) {
        busy.current = false;
        return;
      }

      try {
        setPlaybill(null);
        await animate(
          el,
          { clipPath: "circle(0% at 50% 50%)" },
          { duration: 0.01 }
        );
        await animate(
          el,
          { clipPath: "circle(150% at 50% 50%)" },
          { duration: 0.52, ease: [0.76, 0, 0.24, 1] }
        );
        setPlaybill(scene);
        await new Promise((r) => setTimeout(r, 300));
        await animate(
          el,
          { clipPath: "circle(0% at 50% 50%)" },
          { duration: 0.62, ease: [0.19, 1, 0.22, 1] }
        );
      } finally {
        setPlaybill(null);
        busy.current = false;
      }
    };

    window.addEventListener("oryx:scenechange", onSceneChange);
    return () => window.removeEventListener("oryx:scenechange", onSceneChange);
  }, [reduce]);

  if (reduce) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[48] flex items-center justify-center"
      aria-hidden="true"
    >
      <div
        ref={irisRef}
        className="film-iris absolute inset-0 bg-[oklch(0.02_0_0)]"
        style={{
          clipPath: "circle(0% at 50% 50%)",
          willChange: "clip-path",
        }}
      />

      <AnimatePresence>
        {playbill ? (
          <motion.div
            key={playbill}
            className="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-center px-6 text-center"
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[9px] font-semibold tracking-[0.36em] text-white/40 sm:text-[10px] sm:tracking-[0.42em]">
              ORYX VILLAGE · ACT {ACT_PLAYBILL[playbill].roman}
            </p>
            <p className="mt-5 font-display text-[clamp(2.75rem,9vw,4.5rem)] font-medium leading-none tracking-[-0.04em] text-white">
              {ACT_PLAYBILL[playbill].title}
            </p>
            <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-gold/90">
              {ACT_PLAYBILL[playbill].line}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

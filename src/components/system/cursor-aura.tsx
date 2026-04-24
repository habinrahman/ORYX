"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorAura() {
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);

  const sx = useSpring(x, { stiffness: 560, damping: 42, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 560, damping: 42, mass: 0.2 });

  const [active, setActive] = useState(false);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  useEffect(() => {
    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      const el = t?.closest?.(
        "a,button,[role='button'],input,textarea,select,[data-cursor='active']"
      ) as HTMLElement | null;
      setActive(Boolean(el));
    };
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => window.removeEventListener("pointerover", onOver);
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden mix-blend-screen md:block"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className="relative"
        animate={{
          scale: active ? 1.08 : 1,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.32 }}
      >
        <div className="h-[180px] w-[180px] rounded-full blur-2xl">
          <div
            className="h-full w-full rounded-full opacity-90"
            style={{
              background:
                "radial-gradient(circle at 42% 32%, color-mix(in oklab, var(--gold) 22%, transparent) 0%, transparent 58%)",
            }}
          />
        </div>

        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/[0.22] bg-black/25 backdrop-blur-[2px]"
          animate={{
            width: active ? 36 : 22,
            height: active ? 36 : 22,
            borderRadius: active ? 4 : 0,
            rotate: active ? 45 : 0,
          }}
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
        <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-[color:var(--gold)] shadow-[0_0_12px_rgba(214,177,86,0.45)]" />
      </motion.div>
    </motion.div>
  );
}

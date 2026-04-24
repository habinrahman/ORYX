"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type TiltProps = React.PropsWithChildren<{
  className?: string;
  max?: number;
}>;

export function Tilt({ children, className, max = 10 }: TiltProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  const srx = useSpring(rx, { stiffness: 260, damping: 24, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 260, damping: 24, mass: 0.4 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const tiltY = (px - 0.5) * max;
      const tiltX = -(py - 0.5) * max;
      rx.set(tiltX);
      ry.set(tiltY);
    };
    const onLeave = () => {
      rx.set(0);
      ry.set(0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max, rx, ry]);

  return (
    <motion.div
      ref={ref}
      className={cn("[transform-style:preserve-3d]", className)}
      style={{
        rotateX: srx,
        rotateY: sry,
        perspective: 900,
      }}
    >
      {children}
    </motion.div>
  );
}


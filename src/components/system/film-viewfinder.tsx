"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Subtle “camera gate” corners that breathe with scroll — reinforces film language.
 */
export function FilmViewfinder() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.45,
  });

  const s = useTransform(p, [0, 1], reduce ? [1, 1] : [1, 1.04]);
  const o = useTransform(p, [0, 0.12, 0.9, 1], reduce ? [0.35, 0.35, 0.35, 0.35] : [0.35, 0.55, 0.55, 0.4]);

  const corner = "absolute h-8 w-8 border-white/20";
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[46] hidden md:block"
      style={{ scale: s, opacity: o }}
    >
      <div className="absolute inset-x-0 top-[5vh] h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      <div className="absolute inset-x-0 bottom-[5vh] h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      <div className={`${corner} left-5 top-20 border-l border-t`} />
      <div className={`${corner} right-5 top-20 border-r border-t`} />
      <div className={`${corner} bottom-8 left-5 border-b border-l`} />
      <div className={`${corner} bottom-8 right-5 border-b border-r`} />
    </motion.div>
  );
}

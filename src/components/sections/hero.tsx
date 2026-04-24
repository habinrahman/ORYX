"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/system/container";
import { Section } from "@/components/system/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/system/magnetic";
import { Tilt } from "@/components/system/tilt";

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollY, [0, 600], [0, 100]);
  const fade = useTransform(scrollY, [0, 420], [1, 0]);

  const parallaxFar = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const parallaxMid = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 85]);
  const parallaxNear = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 45]);
  const parallaxRight = useTransform(parallaxNear, (v) => -v * 0.6);
  const parallaxConicY = useTransform(parallaxMid, (v) => v * 0.35);
  const contentLift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -28]);
  const revelationRotateX = useTransform(
    scrollYProgress,
    [0, 0.42],
    reduce ? [0, 0] : [0, -52]
  );
  const revelationZ = useTransform(
    scrollYProgress,
    [0, 0.42],
    reduce ? [0, 0] : [0, -120]
  );
  const revelationGlow = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5],
    reduce ? [0.55, 0.55, 0.55] : [0.45, 0.95, 0.55]
  );
  const revelationTextShadow = useTransform(
    revelationGlow,
    (o) =>
      `0 0 ${24 + o * 48}px color-mix(in oklab, var(--gold) ${Math.round(o * 42)}%, transparent)`
  );

  return (
    <Section
      ref={sectionRef}
      id="top"
      variant="hero"
      className="min-h-[100svh] overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y, opacity: fade }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[oklch(0.055_0_0)]" />
        <motion.div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            y: parallaxFar,
            background:
              "radial-gradient(1100px 640px at 22% 0%, rgba(255,255,255,0.055), transparent 58%), radial-gradient(860px 500px at 86% 18%, color-mix(in oklab, var(--gold) 18%, transparent) 0%, transparent 60%)",
          }}
        />
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { opacity: [0.5, 0.72, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{
            y: parallaxMid,
            background:
              "radial-gradient(1100px 620px at 32% 12%, color-mix(in oklab, var(--gold) 22%, transparent) 0%, transparent 58%), radial-gradient(960px 620px at 72% 22%, rgba(255,255,255,0.05) 0%, transparent 60%)",
          }}
        />
        <motion.div
          className="absolute -left-40 top-[-20%] h-[500px] w-[500px] rounded-full blur-3xl"
          animate={reduce ? undefined : { x: [-36, 48, -36], y: [0, 22, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          style={{
            y: parallaxNear,
            background:
              "radial-gradient(circle at 40% 40%, color-mix(in oklab, var(--gold) 22%, transparent) 0%, transparent 66%)",
          }}
        />
        <motion.div
          className="absolute -right-44 bottom-[-28%] h-[600px] w-[600px] rounded-full blur-3xl"
          animate={reduce ? undefined : { x: [36, -36, 36], y: [0, -22, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{
            y: parallaxRight,
            background:
              "radial-gradient(circle at 55% 45%, rgba(255,255,255,0.07) 0%, transparent 66%)",
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-[0.55]"
          animate={reduce ? undefined : { opacity: [0.32, 0.58, 0.32] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{
            y: parallaxConicY,
            background:
              "conic-gradient(from 200deg at 50% 50%, rgba(255,255,255,0.04), color-mix(in oklab, var(--gold-3) 12%, transparent), rgba(255,255,255,0.03), transparent 72%)",
            maskImage:
              "radial-gradient(circle at center, black 0%, black 46%, transparent 74%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/38 to-black" />
      </motion.div>

      <motion.div style={{ y: contentLift }} className="relative z-10">
        <Container
          mode="editorial"
          className="flex min-h-[100svh] items-center pt-[4.75rem] pb-16"
        >
          <div className="grid w-full items-center gap-14 lg:grid-cols-12 lg:gap-6">
            <div className="relative min-w-0 lg:col-span-8 xl:col-span-7">
              <span
                className="lux-campaign-index pointer-events-none absolute -left-1 top-[-0.2em] select-none font-display text-[clamp(4rem,18vw,10rem)] max-lg:hidden lg:-left-[min(3rem,5vw)] xl:-left-[min(4.25rem,6vw)]"
                aria-hidden
              >
                01
              </span>

              <div className="relative max-lg:border-l max-lg:border-white/[0.08] max-lg:pl-6 lg:pl-[min(4.5rem,9%)]">
                <motion.p
                  className="lux-eyebrow"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  Kochi–Panvel Highway, Kovalpalli · Kanhangad, Kerala
                </motion.p>

                <motion.p
                  className="mt-6 font-display text-[10px] font-light tracking-[0.48em] text-white/50"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.24 }}
                >
                  ORYX VILLAGE
                </motion.p>

                <motion.h1
                  className="mt-5 font-display text-white [perspective:1100px]"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.05, delayChildren: 0.28 },
                    },
                  }}
                >
                  <motion.span
                    className="block max-w-[26ch] font-display text-[clamp(1.85rem,3.4vw,2.85rem)] font-light leading-[1.05] tracking-[-0.02em] text-white/78"
                    variants={{
                      hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
                      show: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                  >
                    Kerala&apos;s grand table on the coast
                  </motion.span>
                  <motion.span
                    className="relative mt-2 block max-w-[22ch] origin-[50%_100%] [transform-style:preserve-3d]"
                    variants={{
                      hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
                      show: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    style={{
                      rotateX: revelationRotateX,
                      translateZ: revelationZ,
                    }}
                  >
                    <motion.span
                      className="text-shine inline-block font-display text-[clamp(2.85rem,8.5vw,5.5rem)] font-light leading-[0.92] tracking-[-0.04em]"
                      style={{ textShadow: revelationTextShadow }}
                    >
                      open until half past midnight
                    </motion.span>
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="lux-lead-editorial mt-10 max-w-[min(36rem,100%)]"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.72, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
                >
                  The estate gathers the main dining rooms, Village Cafe, banquet halls,
                  a live seafood salon, and a children&apos;s salon under one roof on the
                  Malabar corridor. Service runs daily until 12:30 AM—whether the evening
                  calls for a quiet table or a room full of kin.
                </motion.p>

                <motion.div
                  className="mt-12 flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center sm:gap-4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.72, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Magnetic strength={0.1}>
                    <Tilt max={5} className="inline-block">
                      <a
                        href="#reservations"
                        className={cn(
                          buttonVariants({ variant: "default", size: "lg" }),
                          "border-shimmer relative h-12 rounded-none px-10 text-[10px] font-semibold tracking-[0.26em] text-black shadow-[0_24px_70px_rgba(0,0,0,0.55)] transition hover:brightness-[1.02]"
                        )}
                      >
                        <span className="relative z-10">Request a table</span>
                      </a>
                    </Tilt>
                  </Magnetic>
                  <a
                    href="tel:+919562217000"
                    className="inline-flex h-12 items-center justify-center border border-white/[0.12] bg-transparent px-10 text-[10px] font-medium tracking-[0.24em] text-white/72 transition hover:border-white/[0.2] hover:text-white"
                  >
                    +91 95622 17000
                  </a>
                  <a
                    href="#about"
                    className="inline-flex h-12 items-center justify-center border border-white/[0.08] bg-white/[0.03] px-8 text-[10px] font-medium tracking-[0.22em] text-white/65 transition hover:border-white/[0.16] hover:text-white sm:ml-0"
                  >
                    The estate
                  </a>
                </motion.div>

                <motion.dl
                  className="mt-20 flex flex-col gap-8 border-t border-white/[0.08] pt-10 sm:flex-row sm:flex-wrap sm:items-start sm:gap-x-10 sm:gap-y-8 lg:gap-x-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.82, duration: 0.65 }}
                >
                  {[
                    { k: "Seafood salon", v: "Counter & charcoal" },
                    { k: "Service", v: "Nightly until 12:30 AM" },
                    { k: "Celebrations", v: "Halls & private rooms" },
                  ].map((m) => (
                    <div
                      key={m.k}
                      className="min-w-[10rem] border-l border-white/[0.08] pl-8 first:border-l-0 first:pl-0"
                    >
                      <dt className="lux-caption text-white/40">{m.k}</dt>
                      <dd className="mt-2 font-display text-lg font-medium tracking-[-0.02em] text-white/88">
                        {m.v}
                      </dd>
                    </div>
                  ))}
                </motion.dl>
              </div>
            </div>

            <aside className="hidden lg:col-span-4 lg:block xl:col-span-5">
              <div className="sticky top-32 flex min-h-[12rem] justify-end border-l border-white/[0.07] pl-10">
                <p
                  className="max-w-[14rem] font-editorial text-sm leading-relaxed text-white/42 [writing-mode:vertical-rl] rotate-180"
                  style={{ textOrientation: "mixed" }}
                >
                  Kerala coastal cooking, Arabic feasts, and the grill line share one
                  ledger here. The house keeps late hours so the road need not hurry you.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </motion.div>

      <div className="pointer-events-none absolute bottom-6 right-5 z-20 max-w-[18rem] text-right sm:bottom-10 sm:right-10">
        <p className="lux-caption text-white/28">Exterior · reference frame</p>
        <p className="mt-1.5 font-mono text-[9px] leading-relaxed tracking-[0.14em] text-white/35">
          Oryx Village, Kanhangad — dusk plate
        </p>
      </div>
    </Section>
  );
}

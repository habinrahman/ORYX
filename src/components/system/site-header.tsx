"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/system/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AmbientSoundToggle } from "@/components/system/ambient-sound-toggle";

export function SiteHeader() {
  const { scrollY } = useScroll();
  const bgAlpha = useTransform(scrollY, [0, 140], [0.38, 0.82]);
  const bg = useMotionTemplate`rgba(0,0,0,${bgAlpha})`;
  const blur = useTransform(scrollY, [0, 140], [0, 16]);
  const filter = useMotionTemplate`blur(${blur}px) saturate(1.06)`;
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        className="border-b border-white/[0.06]"
        style={{
          backgroundColor: bg,
          backdropFilter: filter,
        }}
      >
        <Container mode="editorial" className="flex h-[4.25rem] items-center justify-between">
          <a
            href="#top"
            className="group flex min-w-0 items-center gap-3 sm:gap-4"
            aria-label="ORYX VILLAGE home"
          >
            <span className="font-display text-[9px] font-light tracking-[0.32em] text-white sm:text-[10px] sm:tracking-[0.38em]">
              ORYX VILLAGE
            </span>
            <span className="hidden h-3 w-px bg-white/15 lg:block" aria-hidden />
            <span className="hidden max-w-[14rem] truncate text-[9px] font-medium tracking-[0.22em] text-white/38 lg:inline">
              Kanhangad · Kerala
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-[9px] font-medium tracking-[0.22em] text-white/48 xl:flex xl:gap-9">
            <a className="transition-colors hover:text-white" href="#about">
              About
            </a>
            <a className="transition-colors hover:text-white" href="#destination">
              Why Oryx
            </a>
            <a className="transition-colors hover:text-white" href="#experiences">
              Signature
            </a>
            <a className="transition-colors hover:text-white" href="#menu">
              Menu
            </a>
            <a className="transition-colors hover:text-white" href="#gallery">
              Gallery
            </a>
            <a className="transition-colors hover:text-white" href="#banquets">
              Banquets
            </a>
            <a className="transition-colors hover:text-white" href="#family">
              Family
            </a>
            <a className="transition-colors hover:text-white" href="#contact">
              Visit
            </a>
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <AmbientSoundToggle />
            <a
              href="#reservations"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "h-10 shrink-0 rounded-none border border-white/[0.1] bg-white/[0.04] px-5 text-white shadow-none backdrop-blur-sm transition hover:bg-white/[0.08] sm:px-6"
              )}
            >
              <span className="text-[10px] font-medium tracking-[0.22em]">
                Reserve
              </span>
            </a>
          </div>
        </Container>
      </motion.div>
    </header>
  );
}

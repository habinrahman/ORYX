"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Chapter = {
  id: string;
  num: string;
  name: string;
};

const CHAPTERS: Chapter[] = [
  { id: "top", num: "01", name: "Arrival" },
  { id: "about", num: "02", name: "About" },
  { id: "destination", num: "03", name: "Why Oryx" },
  { id: "experiences", num: "04", name: "Dining" },
  { id: "menu", num: "05", name: "Menu" },
  { id: "gallery", num: "06", name: "Gallery" },
  { id: "banquets", num: "07", name: "Banquets" },
  { id: "family", num: "08", name: "Family" },
  { id: "reservations", num: "09", name: "Reserve" },
  { id: "reviews", num: "10", name: "Reviews" },
  { id: "contact", num: "11", name: "Visit" },
];

export function ChapterNav() {
  const [active, setActive] = useState(CHAPTERS[0]!.id);
  const ids = useMemo(() => CHAPTERS.map((c) => c.id), []);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        const id = best?.target?.id;
        if (id) setActive(id);
      },
      { threshold: [0.28, 0.48, 0.62], rootMargin: "-22% 0px -58% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return (
    <nav
      aria-label="Page chapters"
      className="fixed left-0 top-1/2 z-[56] hidden -translate-y-1/2 xl:block"
    >
      <div className="relative pl-6 pr-2">
        <div
          aria-hidden
          className="absolute left-[1.375rem] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/[0.12] to-transparent"
        />

        <ul className="relative flex flex-col gap-0.5 py-1">
          {CHAPTERS.map((c) => {
            const isActive = c.id === active;
            return (
              <li key={c.id} className="relative">
                <a
                  href={`#${c.id}`}
                  title={c.name}
                  className={cn(
                    "group relative flex items-center gap-3 py-2 pl-1 pr-2 outline-none transition-[color]",
                    isActive ? "text-white" : "text-white/35 hover:text-white/65"
                  )}
                >
                  <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center">
                    {isActive ? (
                      <motion.span
                        layoutId="chapter-active"
                        className="absolute inset-0 border border-[color:var(--gold)]/35 bg-[color:var(--gold)]/[0.06]"
                        transition={{ type: "spring", stiffness: 420, damping: 38 }}
                      />
                    ) : null}
                    <span className="relative z-10 font-mono text-[9px] tabular-nums tracking-[0.14em]">
                      {c.num}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "pointer-events-none absolute left-full top-1/2 z-20 ml-3 -translate-y-1/2 whitespace-nowrap font-display text-[10px] font-light tracking-[0.22em] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100",
                      isActive && "opacity-100 text-[color:var(--gold)]/90"
                    )}
                  >
                    {c.name}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

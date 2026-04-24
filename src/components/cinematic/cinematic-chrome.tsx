"use client";

import { AmbientSoundToggle } from "@/components/system/ambient-sound-toggle";

const CHAPTERS = [
  { id: "hero", label: "I" },
  { id: "reels", label: "II" },
  { id: "destination", label: "III" },
  { id: "dishes", label: "IV" },
  { id: "community", label: "V" },
  { id: "book", label: "VI" },
] as const;

type CinematicChromeProps = {
  activeScene: number;
};

export function CinematicChrome({ activeScene }: CinematicChromeProps) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] pt-[max(0.5rem,env(safe-area-inset-top))]">
      <div className="pointer-events-none flex items-start justify-between gap-2 px-3 sm:px-6">
        <div className="pointer-events-auto flex min-h-[48px] min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <a
            href="#hero"
            className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-2xl border border-white/15 bg-black/55 px-4 font-display text-[10px] font-bold tracking-[0.22em] text-white backdrop-blur-md sm:min-w-0 sm:px-5"
          >
            ORYX
          </a>
          <span className="hidden min-h-[40px] items-center rounded-full border border-[color:var(--gold)]/35 bg-[color:var(--gold)]/12 px-3 font-mono text-[9px] font-bold tracking-[0.12em] text-[color:var(--gold)] lg:flex">
            35K+
          </span>
        </div>

        <nav
          className="pointer-events-auto hidden items-center gap-1 xl:flex xl:gap-1.5"
          aria-label="Scenes desktop"
        >
          <a
            href="https://www.instagram.com/oryxvillage/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 min-w-[44px] items-center justify-center rounded-full border border-white/18 bg-gradient-to-br from-fuchsia-600/28 to-orange-500/18 px-3 font-mono text-[9px] font-bold tracking-[0.16em] text-white/95 transition hover:border-white/35"
          >
            IG
          </a>
          {CHAPTERS.map((c, i) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              title={c.id}
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-[8px] font-black transition ${
                i === activeScene
                  ? "border-[color:var(--gold)] bg-[color:var(--gold)]/18 text-[color:var(--gold)]"
                  : "border-white/12 bg-black/35 text-white/45 hover:border-white/25 hover:text-white/80"
              }`}
            >
              {c.label}
            </a>
          ))}
          <div className="ml-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
            <AmbientSoundToggle />
          </div>
        </nav>

        <div className="pointer-events-auto flex items-center gap-1.5 xl:hidden">
          <a
            href="https://www.instagram.com/oryxvillage/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-2xl border border-fuchsia-500/25 bg-gradient-to-br from-fuchsia-600/25 to-orange-500/15 font-mono text-[10px] font-black text-white"
          >
            IG
          </a>
          <div className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md">
            <AmbientSoundToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

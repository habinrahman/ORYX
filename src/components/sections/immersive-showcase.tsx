"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/system/container";
import { Section } from "@/components/system/section";
import { SectionHeader } from "@/components/system/section-header";

type Shot = {
  title: string;
  tone: string;
  w: "wide" | "tall" | "std";
  lens: string;
  iso: string;
  look: string;
};

const SHOTS: Shot[] = [
  {
    title: "Banquet hall, candle wash",
    tone: "gold",
    w: "wide",
    lens: "65mm T1.4",
    iso: "ISO 800",
    look: "Low key · brass candle",
  },
  {
    title: "Live seafood counter",
    tone: "mist",
    w: "tall",
    lens: "50mm T2",
    iso: "ISO 1250",
    look: "Ice · steam · tungsten",
  },
  {
    title: "Tandoor row",
    tone: "noir",
    w: "std",
    lens: "90mm macro",
    iso: "ISO 640",
    look: "Charcoal rim light",
  },
  {
    title: "Village Cafe · morning",
    tone: "ember",
    w: "std",
    lens: "35mm T1.5",
    iso: "ISO 1600",
    look: "Coastal daylight",
  },
  {
    title: "Pastry house display",
    tone: "gold",
    w: "tall",
    lens: "75mm T1.8",
    iso: "ISO 500",
    look: "Glass specular",
  },
  {
    title: "Highway dusk exterior",
    tone: "mist",
    w: "std",
    lens: "40mm T2",
    iso: "ISO 1000",
    look: "Signage glow · monsoon sky",
  },
];

function toneBg(tone: string) {
  switch (tone) {
    case "gold":
      return "radial-gradient(560px 320px at 32% 22%, color-mix(in oklab, var(--gold) 28%, transparent) 0%, transparent 64%), linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.62))";
    case "mist":
      return "radial-gradient(580px 340px at 62% 18%, rgba(255,255,255,0.1) 0%, transparent 64%), linear-gradient(180deg, rgba(255,255,255,0.05), rgba(0,0,0,0.68))";
    case "ember":
      return "radial-gradient(580px 360px at 42% 28%, rgba(255,120,30,0.14) 0%, transparent 62%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.72))";
    default:
      return "radial-gradient(580px 360px at 42% 28%, rgba(255,255,255,0.07) 0%, transparent 62%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.74))";
  }
}

export function ImmersiveShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -42]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 42]);

  return (
    <Section ref={sectionRef} id="gallery">
      <Container mode="editorial">
        <SectionHeader
          variant="editorial"
          index="VI"
          eyebrow="Gallery"
          title="The estate in still frames—light, smoke, glass."
          lead="A horizontal contact sheet of the property: banquet wash, seafood ice, tandoor glow, cafe morning, pastry case, and the highway at dusk. Drag to advance; final photography will replace these plates."
          aside={
            <p className="lux-caption text-white/40">
              Drag horizontally
            </p>
          }
        />
      </Container>

      <div className="relative mt-16 w-screen max-w-[100vw] left-1/2 right-1/2 -translate-x-1/2 border-y border-white/[0.06] bg-black/20 py-6 sm:py-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[oklch(0.08_0_0)] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[oklch(0.08_0_0)] to-transparent sm:w-24" />

        <motion.div
          className="flex gap-3 px-5 sm:gap-5 sm:px-8 md:px-12"
          drag="x"
          dragConstraints={{ left: -920, right: 0 }}
          dragElastic={0.05}
          whileTap={{ cursor: "grabbing" }}
        >
          {SHOTS.map((s, idx) => {
            const wide = s.w === "wide";
            const tall = s.w === "tall";
            return (
              <motion.article
                key={s.title}
                className={`group relative shrink-0 overflow-hidden border border-white/[0.09] bg-black ${
                  wide
                    ? "h-[380px] w-[min(88vw,520px)] sm:h-[400px]"
                    : tall
                      ? "h-[420px] w-[min(70vw,340px)] sm:h-[440px]"
                      : "h-[360px] w-[min(76vw,360px)] sm:h-[380px]"
                } ${idx === 0 ? "rounded-none sm:rounded-none" : "rounded-sm"} ${wide ? "sm:rounded-none" : ""}`}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                style={{ y: idx % 2 === 0 ? y1 : y2 }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: toneBg(s.tone) }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/22 to-transparent" />
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(480px 240px at 28% 0%, color-mix(in oklab, var(--gold) 14%, transparent) 0%, transparent 58%)",
                  }}
                />

                <div className="pointer-events-none absolute left-4 top-4 max-w-[70%] border border-white/[0.1] bg-black/50 px-3 py-2 text-left backdrop-blur-sm">
                  <p className="font-mono text-[8px] leading-relaxed tracking-[0.16em] text-white/55">
                    {s.lens} · {s.iso}
                  </p>
                  <p className="mt-1 font-editorial text-[10px] italic leading-snug text-white/45">
                    {s.look}
                  </p>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <p className="lux-caption text-white/48">
                    Frame {String(idx + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 max-w-[20ch] font-display text-2xl font-light tracking-[-0.03em] text-white sm:text-[1.65rem]">
                    {s.title}
                  </h3>
                </div>

                <div className="absolute right-4 top-4 border border-white/[0.12] bg-black/40 px-2.5 py-1 text-[9px] font-semibold tracking-[0.24em] text-white/55 backdrop-blur-md">
                  ORYX VILLAGE
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}

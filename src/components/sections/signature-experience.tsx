"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/system/container";
import { Reveal } from "@/components/system/reveal";
import { Section } from "@/components/system/section";
import { SectionHeader } from "@/components/system/section-header";

export function SignatureDiningExperiences() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const line = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const panelY = useTransform(scrollYProgress, [0.12, 0.78], [72, -56]);
  const panelRotate = useTransform(scrollYProgress, [0.12, 0.78], [1.1, -0.6]);
  const panelScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.98, 1, 0.995]);

  return (
    <Section ref={sectionRef} id="experiences">
      <Container mode="editorial">
        <SectionHeader
          variant="editorial"
          index="IV"
          eyebrow="Signature dining"
          title={
            <>
              From the <span className="text-gold">counter</span> to the banquet
              floor—each course earns its pause.
            </>
          }
          lead="Seafood weighed and chosen in the salon. Kizhi biriyani opened at the table. Tandoori and Arabic platters passed hand to hand. The pastry atelier closes the arc. Nothing is announced twice; timing does the speaking."
        />

        <div className="mt-20 grid items-start gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4 lg:pt-4">
            <Reveal delay={0.06}>
              <div className="grid gap-4">
                {[
                  {
                    k: "Seafood",
                    v: "The catch is presented, then cooked to your counsel—grill or coconut milk, always with room to listen.",
                  },
                  {
                    k: "Kizhi biriyani",
                    v: "Leaf and stone do the first service; aroma arrives before silver touches the parcel.",
                  },
                  {
                    k: "Tandoori & Arabic platters",
                    v: "Charcoal depth and Levantine generosity, composed for passing rather than plating in solitude.",
                  },
                  {
                    k: "Pastry house",
                    v: "Petits gâteaux, Kerala chocolate, late espresso—the final act, unhurried.",
                  },
                ].map((i) => (
                  <div
                    key={i.k}
                    className="border-l border-[color:var(--gold)]/25 py-1 pl-5 transition-colors hover:border-[color:var(--gold)]/45"
                  >
                    <div className="text-[11px] font-medium tracking-[0.18em] text-white/80">
                      {i.k}
                    </div>
                    <p className="mt-2 font-editorial text-sm leading-relaxed text-white/52">
                      {i.v}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="relative lg:col-span-8 lg:-ml-[min(6%,3rem)] lg:pl-0">
            <motion.div
              className="lux-panel-editorial relative origin-top overflow-hidden p-7 sm:p-12 [transform-style:preserve-3d]"
              style={{
                y: panelY,
                rotateZ: panelRotate,
                scale: panelScale,
              }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-80">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(760px 400px at 58% 18%, color-mix(in oklab, var(--gold) 14%, transparent) 0%, transparent 62%), radial-gradient(680px 460px at 12% 82%, rgba(255,255,255,0.04) 0%, transparent 58%)",
                  }}
                />
              </div>

              <div className="relative">
                <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                  <Reveal>
                    <div>
                      <p className="lux-eyebrow">Private dining & gatherings</p>
                      <p className="mt-4 max-w-[20ch] font-display text-[clamp(1.85rem,3.2vw,2.65rem)] font-light leading-[1.05] tracking-[-0.03em] text-white">
                        Salons for vows, birthdays, and{" "}
                        <span className="font-medium text-gold">tables that refuse to end</span>.
                      </p>
                    </div>
                  </Reveal>

                  <div className="hidden sm:block">
                    <div
                      className="mx-auto h-[120px] w-[120px] rounded-full sm:mx-0"
                      style={{
                        background:
                          "conic-gradient(from 200deg, rgba(255,255,255,0.05), color-mix(in oklab, var(--gold) 32%, transparent), rgba(255,255,255,0.05))",
                        maskImage:
                          "radial-gradient(circle at center, black 58%, transparent 62%)",
                      }}
                    />
                  </div>
                </div>

                <div className="mt-10 grid gap-8 border-t border-white/[0.06] pt-10 sm:grid-cols-2">
                  <Reveal>
                    <p className="lux-eyebrow">Kerala & grill</p>
                    <p className="mt-3 font-editorial text-sm leading-relaxed text-white/52">
                      Coastal masalas, slow roasts, and the discipline of the tandoor—
                      heat and smoke held in balance so the guest, not the kitchen, stays
                      in focus.
                    </p>
                  </Reveal>
                  <Reveal delay={0.06}>
                    <p className="lux-eyebrow">Arabic table</p>
                    <p className="mt-3 font-editorial text-sm leading-relaxed text-white/52">
                      Mezze, charcoal meats, bread torn by hand—composed for the
                      procession of a shared meal.
                    </p>
                  </Reveal>
                </div>

                <div className="mt-10">
                  <div className="lux-divider" />
                  <div className="mt-5 flex items-center justify-between gap-6">
                    <span className="lux-eyebrow">Scroll</span>
                    <motion.div
                      className="h-px w-[min(56%,14rem)] origin-left bg-[color:var(--gold)]/60"
                      style={{ scaleX: line }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 top-1/3 hidden h-40 w-px bg-gradient-to-b from-transparent via-[color:var(--gold)]/35 to-transparent lg:block"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

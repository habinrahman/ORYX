"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/system/container";
import { Reveal } from "@/components/system/reveal";
import { Section } from "@/components/system/section";
import { SectionHeader } from "@/components/system/section-header";

const MOMENTS = [
  {
    k: "Children's salon",
    v: "A dedicated play space, sight-lined to the dining floor and kept at a courteous distance from the room's pulse.",
  },
  {
    k: "Family tables",
    v: "Generous seating for generations together—platters sized for passing, courses paced for conversation.",
  },
  {
    k: "Late service",
    v: "The house closes at half past midnight, every night—so no one need cut a birthday short for the road.",
  },
];

export function FamilyExperience() {
  return (
    <Section id="family">
      <Container mode="editorial">
        <SectionHeader
          variant="editorial"
          index="VIII"
          eyebrow="Family"
          title={
            <>
              The same attention,{" "}
              <span className="text-gold">whether the guest is six or sixty.</span>
            </>
          }
          lead="Oryx Village was laid out for households: room between tables, patience at the door, and hosts who remember that the smallest guest sets the tempo for the whole party."
          aside={
            <p className="lux-caption text-white/40">Play · dine · depart</p>
          }
        />

        <div className="mt-20 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="border-l border-[color:var(--gold)]/30 py-2 pl-8">
                <p className="font-editorial text-[clamp(1.15rem,2vw,1.35rem)] italic leading-relaxed text-white/70">
                  True luxury here is proportion: strollers beside banquet chairs,
                  cousins reaching the same platter, elders who can hear the room without
                  straining.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="grid gap-5 lg:col-span-7">
            {MOMENTS.map((m, idx) => (
              <motion.div
                key={m.k}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.07 * idx }}
                className="border border-white/[0.08] bg-black/25 px-6 py-5 sm:px-8 sm:py-6"
              >
                <p className="lux-eyebrow text-white/45">{m.k}</p>
                <p className="mt-3 font-editorial text-sm leading-relaxed text-white/55">
                  {m.v}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/system/container";
import { Reveal } from "@/components/system/reveal";
import { Section } from "@/components/system/section";
import { SectionHeader } from "@/components/system/section-header";

const PILLARS = [
  {
    title: "Three kitchens, one standard",
    body: "Kerala coastal cooking, Arabic feasting, and the grill line each follow their own mise en place—then meet the same expectation of heat, timing, and grace at the pass.",
  },
  {
    title: "Village Cafe",
    body: "Morning light, espresso, and the pastry atelier. It is the soft threshold before the dining rooms fill—and the same pastry brigade that finishes banquets after midnight.",
  },
  {
    title: "Gatherings at scale",
    body: "Banquet floors for vows and milestones, captained as carefully as a table for two. Volume never trades away discretion.",
  },
  {
    title: "The live salon",
    body: "Seafood chosen in plain sight, charcoal within earshot. Guests are invited to watch the work; the kitchen accepts the compliment in silence.",
  },
];

export function AboutOryxVillage() {
  return (
    <Section id="about">
      <Container mode="editorial">
        <SectionHeader
          variant="editorial"
          index="II"
          eyebrow="About Oryx Village"
          title={
            <>
              One estate on the highway,{" "}
              <span className="text-gold">composed as a village.</span>
            </>
          }
          lead="Oryx Village is not a single dining room. It is a sequence of halls, salons, and counters along the Kochi–Panvel corridor—each with its own brief, one front desk to bind them."
          aside={
            <p className="lux-caption max-w-[14rem] text-white/42">
              Kovalpalli · Kanhangad · Coastal Kerala
            </p>
          }
        />

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{
                duration: 0.55,
                delay: 0.06 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-white/[0.14]"
            >
              <Reveal delay={0.04 * i}>
                <p className="lux-eyebrow text-white/40">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-lg font-light leading-snug tracking-[-0.02em] text-white">
                  {p.title}
                </h3>
                <p className="mt-3 font-editorial text-sm leading-relaxed text-white/52">
                  {p.body}
                </p>
              </Reveal>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/system/container";
import { Reveal } from "@/components/system/reveal";
import { Section } from "@/components/system/section";
import { SectionHeader } from "@/components/system/section-header";

const REASONS = [
  {
    k: "01",
    title: "An estate, not a room",
    body: "Main dining halls, Village Cafe, banquet floors, a seafood salon, pastry atelier, and a children’s play salon share one arrival—and one standard of how the floor is run.",
  },
  {
    k: "02",
    title: "The evening belongs to the guest",
    body: "Service runs until half past midnight, every night. A destination earns the drive by refusing to hurry the last course—or the last toast.",
  },
  {
    k: "03",
    title: "Several kitchens, one ledger",
    body: "Kerala coastal cooking, the grill line, Arabic feasting, and dessert are not concessions to fashion; each line has its own chef’s table logic, composed for the same guest journey.",
  },
  {
    k: "04",
    title: "Built for the miles before the door",
    body: "On the Kochi–Panvel corridor at Kovalpalli, guests do not stumble in from the pavement alone—they bring households, luggage, and occasions worth crossing districts for.",
  },
];

export function WhyOryxDestination() {
  return (
    <Section id="destination">
      <Container mode="editorial">
        <SectionHeader
          variant="editorial"
          index="III"
          eyebrow="House perspective"
          title={
            <>
              Why Oryx is a Destination,{" "}
              <span className="text-gold">Not Just a Restaurant</span>
            </>
          }
          lead="A restaurant answers hunger. A destination holds time: for banquets and birthdays, for children between courses, for seafood chosen at the counter and pastry finished after midnight. Oryx Village was laid out for that fuller brief."
          aside={
            <p className="lux-caption max-w-[16rem] text-white/42">
              Scale · late hours · several lines · one reception
            </p>
          }
        />

        <div className="mt-20 border-t border-white/[0.06] pt-16">
          <div className="grid gap-px bg-white/[0.06] lg:grid-cols-2">
            {REASONS.map((r, i) => (
              <motion.article
                key={r.k}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.55,
                  delay: 0.06 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-[oklch(0.055_0_0)] p-8 sm:p-10 lg:min-h-[14rem]"
              >
                <Reveal delay={0.04 * i}>
                  <p className="font-mono text-[10px] tabular-nums tracking-[0.28em] text-white/35">
                    {r.k}
                  </p>
                  <h3 className="mt-5 font-display text-xl font-light leading-snug tracking-[-0.02em] text-white sm:text-2xl">
                    {r.title}
                  </h3>
                  <p className="mt-4 max-w-[48ch] font-editorial text-sm leading-relaxed text-white/52">
                    {r.body}
                  </p>
                </Reveal>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

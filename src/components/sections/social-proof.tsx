"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/system/container";
import { Section } from "@/components/system/section";
import { SectionHeader } from "@/components/system/section-header";

const QUOTES = [
  {
    quote:
      "Three generations drove down from Kasaragod for a birthday. The Arabic platter was paced without hurry; the floor team seemed to have nowhere else to be.",
    by: "Guest correspondence · Google",
  },
  {
    quote:
      "The children watched the grill while we opened Kizhi biriyani at the table. The room allowed for both stillness and noise.",
    by: "Family visit · Google",
  },
  {
    quote:
      "Our society banquet required sound, light, and portions that matched what we had promised our members. The house delivered without drama.",
    by: "Evening host · Google",
  },
];

export function SocialProof() {
  const [hero, ...rest] = QUOTES;

  return (
    <Section id="reviews">
      <Container mode="editorial">
        <SectionHeader
          variant="editorial"
          index="X"
          eyebrow="Reputation"
          title="Thirty-six thousand evenings, one ledger."
          lead="Families, travellers, and hosts who stake their own names on an event have written this reputation in small increments. We excerpt lightly; the aggregate score states the rest."
          aside={
            <div className="inline-flex flex-col gap-1 border border-white/[0.1] bg-white/[0.03] px-5 py-3 sm:items-end">
              <span className="lux-caption text-white/35">Google Reviews</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-light tabular-nums tracking-[-0.04em] text-white">
                  4.8
                </span>
                <span className="font-editorial text-sm italic text-white/45">
                  36k+ reviews
                </span>
              </div>
            </div>
          }
        />

        <div className="mt-20 grid gap-6 lg:grid-cols-12 lg:gap-5">
          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[22rem] flex-col justify-between border border-white/[0.09] bg-gradient-to-br from-white/[0.04] to-transparent p-8 sm:p-10 lg:col-span-7"
          >
            <span className="font-display text-5xl font-extralight leading-none text-gold/75 sm:text-6xl">
              “
            </span>
            <blockquote className="lux-pullquote -mt-4 max-w-[36ch] text-[clamp(1.4rem,2.5vw,1.85rem)] leading-snug text-white/78">
              {hero.quote}
            </blockquote>
            <figcaption className="mt-10 border-t border-white/[0.08] pt-6">
              <cite className="lux-caption not-italic text-white/45">{hero.by}</cite>
            </figcaption>
          </motion.figure>

          <div className="grid gap-5 lg:col-span-5">
            {rest.map((q, idx) => (
              <motion.figure
                key={q.by}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{
                  duration: 0.55,
                  delay: 0.08 * (idx + 1),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col border-l border-[color:var(--gold)]/30 py-2 pl-6 transition-colors hover:border-[color:var(--gold)]/50"
              >
                <blockquote className="font-editorial text-sm leading-relaxed text-white/58">
                  {q.quote}
                </blockquote>
                <figcaption className="mt-5 lux-caption text-white/38">
                  {q.by}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

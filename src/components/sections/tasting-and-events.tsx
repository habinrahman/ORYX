"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/system/container";
import { Reveal } from "@/components/system/reveal";
import { Section } from "@/components/system/section";
import { SectionHeader } from "@/components/system/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export function BanquetsAndEvents() {
  return (
    <Section id="banquets">
      <Container mode="editorial">
        <SectionHeader
          variant="editorial"
          index="VII"
          eyebrow="Banquets & events"
          title="Occasions that fill a hall—served as if the room were intimate."
          lead="Weddings, corporate evenings, and society nights move through the same kitchen and pastry atelier as the main floor. Scale is managed; standards are not."
        />

        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="grid gap-4">
              {[
                {
                  title: "Grand Banquet Hall",
                  meta: "Bespoke menus · AV · dedicated captain of the floor",
                  tag: "Signature",
                },
                {
                  title: "Corporate & society evenings",
                  meta: "Arabic and grill platters · service through 12:30 AM",
                  tag: "Events",
                },
              ].map((c, idx) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: idx * 0.06 }}
                  className="border border-white/[0.08] bg-white/[0.02] p-7 transition-colors hover:border-white/[0.14]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="max-w-[18ch] font-display text-xl font-light tracking-[-0.03em] text-white sm:text-2xl">
                      {c.title}
                    </h3>
                    <Badge variant="lux" className="shrink-0">
                      {c.tag.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="mt-4 font-editorial text-sm text-white/48">{c.meta}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="lux-panel-editorial p-7 sm:p-11">
              <Reveal>
                <div className="flex flex-col gap-2 border-b border-white/[0.06] pb-8 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="lux-eyebrow">Planning desk</p>
                    <p className="mt-3 max-w-[18ch] font-display text-3xl font-light tracking-[-0.03em] text-white sm:text-4xl">
                      Quietly thorough.
                    </p>
                  </div>
                  <p className="lux-caption text-white/38">Reference</p>
                </div>
              </Reveal>

              <div className="mt-6">
                <Accordion defaultValue={["a"]} className="w-full">
                  <AccordionItem value="a">
                    <AccordionTrigger className="text-left font-display text-base font-light tracking-[-0.01em] text-white/88 hover:text-white">
                      Flow & capacity
                    </AccordionTrigger>
                    <AccordionContent className="font-editorial text-sm leading-relaxed text-white/52">
                      Arrival, seating, buffet or plated service, live stations, and
                      dessert are mapped to your head count and timeline—so the evening
                      advances without improvisation at the door.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="b">
                    <AccordionTrigger className="text-left font-display text-base font-light tracking-[-0.01em] text-white/88 hover:text-white">
                      Menu architecture
                    </AccordionTrigger>
                    <AccordionContent className="font-editorial text-sm leading-relaxed text-white/52">
                      Kerala, Arabic, grill, seafood, and pastry may form one narrative
                      or stand as separate chapters. Dietary requirements are accommodated
                      with notice.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="c">
                    <AccordionTrigger className="text-left font-display text-base font-light tracking-[-0.01em] text-white/88 hover:text-white">
                      Late evening
                    </AccordionTrigger>
                    <AccordionContent className="font-editorial text-sm leading-relaxed text-white/52">
                      The property serves until 12:30 AM daily—suited to receptions that
                      run long, and to guests travelling the Kochi–Panvel corridor.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="mt-10 border border-white/[0.08] bg-black/25 p-7">
                <p className="lux-eyebrow">Private dining</p>
                <p className="mt-4 font-display text-2xl font-light tracking-[-0.03em] text-white">
                  A room within the estate.
                </p>
                <p className="mt-4 font-editorial text-sm leading-relaxed text-white/52">
                  Smaller salons for board dinners and family milestones—bespoke menus,
                  lighting as requested, and one captain who remains through the final
                  toast.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

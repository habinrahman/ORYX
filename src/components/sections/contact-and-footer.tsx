"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/system/container";
import { Reveal } from "@/components/system/reveal";
import { Section } from "@/components/system/section";
import { SectionHeader } from "@/components/system/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Oryx+Village+Kovalpalli+Kanhangad+Kerala";

export function ContactAndFooter() {
  return (
    <Section id="contact" className="border-b-0 pb-0">
      <Container mode="editorial" className="pb-20 pt-0 sm:pb-24">
        <SectionHeader
          variant="editorial"
          index="XI"
          eyebrow="Visit us"
          title={
            <>
              The estate sits{" "}
              <span className="text-gold">on the Malabar corridor.</span>
            </>
          }
          lead="Kochi–Panvel Highway, Kovalpalli, Kanhangad. The house receives guests daily until 12:30 AM. When plans shift at the last hour, the telephone is the fastest line to the desk."
        />

        <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal delay={0.06}>
              <div className="border border-white/[0.08] bg-white/[0.02] p-8">
                <p className="lux-eyebrow">Reception</p>
                <dl className="mt-6 space-y-5 font-editorial text-sm text-white/62">
                  <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                    <dt className="lux-caption text-white/35">Address</dt>
                    <dd className="max-w-[32ch] text-white/78">
                      Kochi–Panvel Highway, Kovalpalli, Kanhangad, Kerala
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                    <dt className="lux-caption text-white/35">Phone</dt>
                    <dd>
                      <a
                        className="text-white/85 transition hover:text-white"
                        href="tel:+919562217000"
                      >
                        +91 95622 17000
                      </a>
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                    <dt className="lux-caption text-white/35">Hours</dt>
                    <dd>Open daily until 12:30 AM</dd>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                    <dt className="lux-caption text-white/35">Directions</dt>
                    <dd>
                      <a
                        className="text-white/85 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white/40"
                        href={MAPS_URL}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open in Google Maps
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="lux-panel-editorial overflow-hidden p-7 sm:p-11">
              <Reveal>
                <div className="flex flex-col gap-3 border-b border-white/[0.06] pb-8 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="lux-eyebrow">Correspondence</p>
                    <p className="mt-4 max-w-[20ch] font-display text-3xl font-light tracking-[-0.03em] text-white sm:text-4xl">
                      Seasonal menus and private event dates.
                    </p>
                  </div>
                  <p className="lux-caption text-white/38">Low frequency</p>
                </div>
              </Reveal>

              <div className="mt-10 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                <div className="space-y-2">
                  <Label
                    className="lux-caption text-white/45"
                    htmlFor="newsletter-email"
                  >
                    Email
                  </Label>
                  <Input
                    id="newsletter-email"
                    type="email"
                    placeholder="you@domain.com"
                    className="h-12 rounded-none border-white/[0.1] bg-black/45 text-white placeholder:text-white/28 focus-visible:ring-[color:var(--gold)]/30"
                  />
                </div>
                <Button variant="lux" className="min-w-0 px-10">
                  Join
                </Button>
              </div>

              <div className="mt-12 overflow-hidden border border-white/[0.08] bg-black/40">
                <div className="relative h-[300px] sm:h-[340px]">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(820px 420px at 22% 0%, color-mix(in oklab, var(--gold) 12%, transparent) 0%, transparent 58%), radial-gradient(640px 380px at 78% 28%, rgba(255,255,255,0.06) 0%, transparent 58%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.9))",
                    }}
                  />

                  <motion.div
                    className="absolute left-[62%] top-[42%]"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="relative">
                      <div className="h-3.5 w-3.5 rounded-full bg-[color:var(--gold)] shadow-[0_0_0_5px_rgba(0,0,0,0.45),0_0_32px_rgba(214,177,86,0.28)]" />
                      <motion.div
                        className="absolute inset-0 -m-5 rounded-full border border-[color:var(--gold)]/25"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.45, 0.12, 0.45],
                        }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                  </motion.div>

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <p className="lux-caption text-white/42">Map</p>
                    <p className="mt-3 max-w-[40ch] font-editorial text-sm leading-relaxed text-white/52">
                      Final map embed: coordinate to Kovalpalli, chrome restrained to
                      match the estate palette.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-24 border-t border-white/[0.07] pt-16">
          <div className="grid gap-16 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <p className="font-display text-[clamp(1.85rem,5vw,2.85rem)] font-extralight tracking-[0.28em] text-white sm:tracking-[0.36em]">
                ORYX VILLAGE
              </p>
              <p className="mt-6 max-w-[36ch] font-editorial text-base leading-relaxed text-white/48">
                A dining estate on the Malabar coast—several kitchens, one standard of
                service, and hours that respect how Kerala actually dines.
              </p>
            </div>
            <div className="grid gap-12 sm:grid-cols-3 md:col-span-7">
              {[
                {
                  title: "Navigate",
                  links: [
                    ["About", "#about"],
                    ["Why Oryx", "#destination"],
                    ["Signature dining", "#experiences"],
                    ["Featured menu", "#menu"],
                    ["Gallery", "#gallery"],
                    ["Reserve", "#reservations"],
                  ],
                },
                {
                  title: "On property",
                  links: [
                    ["Banquets & events", "#banquets"],
                    ["Family experience", "#family"],
                    ["Guest reputation", "#reviews"],
                    ["Visit us", "#contact"],
                  ],
                },
                {
                  title: "Connect",
                  links: [
                    ["Call +91 95622 17000", "tel:+919562217000"],
                    ["Instagram", "#"],
                    ["Careers", "#"],
                  ],
                },
              ].map((col) => (
                <div key={col.title}>
                  <p className="lux-caption text-white/38">{col.title}</p>
                  <ul className="mt-5 space-y-3 font-editorial text-sm text-white/55">
                    {col.links.map(([label, href]) => (
                      <li key={label}>
                        <a
                          href={href}
                          className="inline-block transition-colors hover:text-white"
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.05] pt-10 text-[10px] font-medium tracking-[0.2em] text-white/32 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} ORYX VILLAGE. All rights reserved.</p>
            <p className="text-white/22">Kovalpalli · Kanhangad · Kerala</p>
          </div>
        </footer>
      </Container>
    </Section>
  );
}

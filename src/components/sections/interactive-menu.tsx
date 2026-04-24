"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/system/container";
import { Reveal } from "@/components/system/reveal";
import { Section } from "@/components/system/section";
import { SectionHeader } from "@/components/system/section-header";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tilt } from "@/components/system/tilt";

type MenuCategory = "seafood" | "kerala-grill" | "arabic-pastry";

type Dish = {
  name: string;
  note: string;
  price: string;
  tag?: "Signature" | "House" | "Counter";
};

const MENU: Record<MenuCategory, Dish[]> = {
  seafood: [
    {
      name: "Live catch — grill or curry",
      note: "Selected at the counter, finished over charcoal or coconut milk. The chef advises; the guest decides.",
      price: "MRP",
      tag: "Counter",
    },
    {
      name: "Malabar crab roast",
      note: "Roasted masala, curry leaf, fennel. Bread alongside; a short rest tempers the heat.",
      price: "₹1,290",
      tag: "Signature",
    },
    {
      name: "Karimeen pollichathu",
      note: "Banana leaf, kokum, ember. A coastal ritual, held to the house standard.",
      price: "₹1,180",
      tag: "House",
    },
  ],
  "kerala-grill": [
    {
      name: "Kizhi biriyani",
      note: "Stone and leaf seal the rice and meat; the parcel is opened only at the table.",
      price: "₹1,450",
      tag: "Signature",
    },
    {
      name: "Tandoori mixed platter",
      note: "Chicken, malai kebab, seekh. Charcoal crust, measured smoke, three chutneys.",
      price: "₹1,680",
      tag: "House",
    },
    {
      name: "Nadan beef fry",
      note: "Black pepper, coconut, curry leaf. Slow finish, firm texture.",
      price: "₹890",
      tag: "House",
    },
    {
      name: "Grilled king prawns",
      note: "Lemon, garlic confit, char. Sweet shellfish with a clean edge.",
      price: "₹1,520",
      tag: "Signature",
    },
  ],
  "arabic-pastry": [
    {
      name: "Arabic mixed grill platter",
      note: "Lamb kofta, shish tawook, mutton chop. Mezze first, then the grill, served the length of the table.",
      price: "₹2,200",
      tag: "Signature",
    },
    {
      name: "Mandi family tray",
      note: "Long-grain rice, slow meat, house spice. Serves four; paced for sharing.",
      price: "₹3,600",
      tag: "House",
    },
    {
      name: "Pastry house — tasting of five",
      note: "Petits gâteaux, Kerala chocolate, fruit of the day. The pastry brigade's closing argument.",
      price: "₹890",
      tag: "House",
    },
  ],
};

const CATEGORY_LABEL: Record<MenuCategory, string> = {
  seafood: "Seafood salon",
  "kerala-grill": "Kerala & grill",
  "arabic-pastry": "Arabic & pastry",
};

export function InteractiveMenu() {
  const categories = useMemo(() => Object.keys(MENU) as MenuCategory[], []);
  const [active, setActive] = useState<MenuCategory>("seafood");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const planeX = useTransform(scrollYProgress, [0, 1], [7, -6]);
  const planeY = useTransform(scrollYProgress, [0, 1], [-4, 5]);

  return (
    <Section ref={sectionRef} id="menu">
      <Container mode="editorial">
        <SectionHeader
          variant="editorial"
          index="V"
          eyebrow="The menu"
          title={
            <>
              Three lines, <span className="text-gold">one evening.</span>
            </>
          }
          lead="Below are representative dishes from the seafood salon, the Kerala and grill line, and the Arabic and pastry atelier. Market seafood is quoted daily; all other prices are indicative."
          aside={
            <p className="lux-caption max-w-[14rem] text-white/45">
              Seasonal availability applies
            </p>
          }
        />

        <div className="mt-16 flex flex-wrap gap-2 border-t border-white/[0.06] pt-10 md:justify-end">
          {categories.map((c) => {
            const isActive = c === active;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={cn(
                  "relative overflow-hidden border px-6 py-2.5 text-[10px] font-semibold tracking-[0.22em] transition",
                  isActive
                    ? "border-[color:var(--gold)]/35 bg-[color:var(--gold)]/[0.08] text-white"
                    : "border-white/[0.1] bg-transparent text-white/50 hover:border-white/[0.16] hover:text-white/78"
                )}
              >
                <span className="relative z-10">{CATEGORY_LABEL[c]}</span>
                {isActive ? (
                  <motion.span
                    layoutId="menu-pill"
                    className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent"
                    transition={{ type: "spring", stiffness: 400, damping: 38 }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8 [perspective:1400px]">
            <motion.div
              className="relative overflow-hidden border border-white/[0.09] bg-black/35 p-0 sm:p-0 [transform-style:preserve-3d] backdrop-blur-md"
              style={{
                rotateX: planeY,
                rotateY: planeX,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex flex-col gap-2 border-b border-white/[0.08] px-6 py-7 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-8">
                    <div>
                      <p className="lux-eyebrow">Selection</p>
                      <p className="mt-3 font-display text-2xl font-light tracking-[-0.03em] text-white sm:text-3xl">
                        {CATEGORY_LABEL[active]}
                      </p>
                    </div>
                    <p className="lux-caption text-white/38">
                      {active === "seafood" ? "Tank & ice" : "Chef’s board"}
                    </p>
                  </div>

                  <ul className="divide-y divide-white/[0.06]">
                    {MENU[active].map((d) => (
                      <li key={d.name}>
                        <motion.div
                          whileHover={{ x: 2 }}
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                          className="group flex cursor-default flex-col gap-3 px-6 py-5 transition-colors hover:bg-white/[0.02] sm:flex-row sm:items-start sm:justify-between sm:gap-10 sm:px-8 sm:py-6"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline gap-3">
                              <span className="font-display text-[0.98rem] font-medium tracking-[-0.02em] text-white">
                                {d.name}
                              </span>
                              {d.tag ? (
                                <Badge variant="lux">{d.tag.toUpperCase()}</Badge>
                              ) : null}
                            </div>
                            <p className="mt-2 max-w-[52ch] font-editorial text-[0.9375rem] leading-relaxed text-white/48">
                              {d.note}
                            </p>
                          </div>
                          <div className="shrink-0 text-left sm:text-right">
                            <span className="inline-flex min-w-[3.5rem] justify-start font-mono text-[11px] tabular-nums tracking-[0.12em] text-[color:var(--gold)]/85 sm:justify-end">
                              {d.price}
                            </span>
                          </div>
                        </motion.div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="lg:col-span-4">
            <Reveal>
              <Tilt max={5}>
                <aside className="lux-panel-editorial relative overflow-hidden p-8">
                  <p className="lux-eyebrow">Village Cafe</p>
                  <p className="mt-5 font-display text-[clamp(1.7rem,2.5vw,2.35rem)] font-light leading-[1.06] tracking-[-0.02em] text-white">
                    Morning espresso.
                    <span className="mt-2 block font-medium text-gold">Evening handover.</span>
                  </p>
                  <p className="mt-5 font-editorial text-sm leading-relaxed text-white/52">
                    Travellers pause here before the dining rooms fill. Short menus,
                    viennoiserie, and the same pastry brigade that signs off banquets well
                    after midnight.
                  </p>
                  <figure className="mt-8 border-t border-white/[0.06] pt-8">
                    <blockquote className="lux-pullquote max-w-[24ch] text-white/72">
                      A house is judged by how it receives the first guest—and how it
                      says goodnight to the last.
                    </blockquote>
                    <figcaption className="mt-4 lux-caption text-white/38">
                      House note
                    </figcaption>
                  </figure>
                </aside>
              </Tilt>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

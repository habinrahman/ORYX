"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/system/container";
import { Reveal } from "@/components/system/reveal";
import { Section } from "@/components/system/section";
import { SectionHeader } from "@/components/system/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Step = "details" | "confirm";

export function ReservationExperience() {
  const [step, setStep] = useState<Step>("details");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [party, setParty] = useState("2");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:30");
  const [note, setNote] = useState("");

  const summary = useMemo(() => {
    const bits = [
      name ? name : "Guest",
      `Party of ${party}`,
      date ? date : "Date TBD",
      time,
    ];
    return bits.join(" · ");
  }, [name, party, date, time]);

  return (
    <Section id="reservations">
      <Container mode="editorial">
        <SectionHeader
          variant="editorial"
          index="IX"
          eyebrow="Reservations"
          title={
            <>
              Request a table.{" "}
              <span className="text-gold">We confirm with care.</span>
            </>
          }
          lead="Private salons, family spreads, or a first look at a banquet menu—describe the occasion. The reservations desk replies in full sentences: clear timing, clear expectations."
        />

        <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <div className="lux-panel-editorial p-8">
                <p className="lux-eyebrow">Your evening</p>
                <p className="mt-5 font-display text-2xl font-light tracking-[-0.03em] text-white sm:text-3xl">
                  {summary}
                </p>
                <p className="mt-6 font-editorial text-sm leading-relaxed text-white/50">
                  We confirm tables, children&apos;s salon seating, banquet pacing, and
                  seafood counter timing—typically within the same business day. The house
                  serves until 12:30 AM nightly.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="lux-panel-elevated relative overflow-hidden p-7 sm:p-10">
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(720px 380px at 18% 0%, color-mix(in oklab, var(--gold) 12%, transparent) 0%, transparent 58%)",
                }}
              />

              <div className="relative">
                <div className="flex flex-col gap-1 border-b border-white/[0.06] pb-6 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="lux-eyebrow">Request</p>
                    <p className="mt-3 font-display text-3xl font-light tracking-[-0.03em] text-white sm:text-4xl">
                      {step === "details" ? "Details" : "Confirm"}
                    </p>
                  </div>
                  <p className="lux-eyebrow text-white/40">
                    Step {step === "details" ? "01" : "02"}
                  </p>
                </div>

                <div className="mt-8">
                  <AnimatePresence mode="wait">
                    {step === "details" ? (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label className="lux-caption text-white/45">Name</Label>
                            <Input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Full name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="lux-caption text-white/45">Email</Label>
                            <Input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@domain.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="lux-caption text-white/45">Party</Label>
                            <Select
                              value={party}
                              onValueChange={(v) => setParty(v ?? "2")}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="2" />
                              </SelectTrigger>
                              <SelectContent>
                                {["1", "2", "3", "4", "5", "6", "7", "8"].map((n) => (
                                  <SelectItem key={n} value={n}>
                                    {n}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="lux-caption text-white/45">Date</Label>
                            <Input
                              type="date"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label className="lux-caption text-white/45">
                              Preferred time
                            </Label>
                            <Select
                              value={time}
                              onValueChange={(v) => setTime(v ?? "19:30")}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="19:30" />
                              </SelectTrigger>
                              <SelectContent>
                                {[
                                  "18:00",
                                  "18:30",
                                  "19:00",
                                  "19:30",
                                  "20:00",
                                  "20:30",
                                  "21:00",
                                ].map((t) => (
                                  <SelectItem key={t} value={t}>
                                    {t}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label className="lux-caption text-white/45">Notes</Label>
                            <Textarea
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                              placeholder="Dietary requirements, occasion, preferences"
                            />
                          </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
                          <p className="max-w-[42ch] text-[10px] font-medium leading-relaxed tracking-[0.12em] text-white/40">
                            Proceeding acknowledges the house policies and cancellation
                            terms, which we send with every confirmation.
                          </p>
                          <Button
                            type="button"
                            variant="lux"
                            className="shrink-0"
                            onClick={() => setStep("confirm")}
                          >
                            Continue
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="confirm"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="border border-white/[0.09] bg-black/30 p-7">
                          <p className="lux-eyebrow">Confirm</p>
                          <p className="mt-4 font-display text-2xl font-light tracking-[-0.03em] text-white sm:text-3xl">
                            {summary}
                          </p>
                          <p className="mt-5 font-editorial text-sm leading-relaxed text-white/52">
                            A note will reach{" "}
                            <span className="font-medium text-white/85">
                              {email || "you"}
                            </span>{" "}
                            shortly. For same‑evening tables, banquets, or counter
                            seating, please call{" "}
                            <a
                              className="whitespace-nowrap font-medium text-gold/95 underline decoration-gold/25 underline-offset-4 transition hover:decoration-gold/50"
                              href="tel:+919562217000"
                            >
                              +91 95622 17000
                            </a>
                            .
                          </p>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end sm:gap-3">
                          <Button
                            type="button"
                            variant="luxOutline"
                            onClick={() => setStep("details")}
                          >
                            Edit
                          </Button>
                          <Button
                            type="button"
                            variant="lux"
                            onClick={() => {
                              setStep("details");
                              setName("");
                              setEmail("");
                              setParty("2");
                              setDate("");
                              setTime("19:30");
                              setNote("");
                            }}
                          >
                            Send request
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

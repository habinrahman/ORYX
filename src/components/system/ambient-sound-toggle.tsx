"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Opt-in sub-audible room tone: detuned sines + low-pass. Never autoplays.
 */
export function AmbientSoundToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ o1: OscillatorNode; o2: OscillatorNode } | null>(null);

  const stop = useCallback(() => {
    const nodes = nodesRef.current;
    if (nodes) {
      try {
        nodes.o1.stop();
        nodes.o2.stop();
      } catch {
        /* already stopped */
      }
      nodesRef.current = null;
    }
    const ctx = ctxRef.current;
    if (ctx && ctx.state !== "closed") {
      void ctx.close();
    }
    ctxRef.current = null;
    setOn(false);
  }, []);

  const start = useCallback(async () => {
    stop();
    const Ctor =
      window.AudioContext ||
      (
        window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;
    if (!Ctor) return;

    const ctx = new Ctor();
    ctxRef.current = ctx;
    await ctx.resume();

    const o1 = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    o1.type = "sine";
    o2.type = "sine";
    o1.frequency.value = 97.2;
    o2.frequency.value = 101.6;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 210;
    filter.Q.value = 0.65;

    const g = ctx.createGain();
    g.gain.value = 0.006;

    o1.connect(filter);
    o2.connect(filter);
    filter.connect(g);
    g.connect(ctx.destination);

    o1.start();
    o2.start();
    nodesRef.current = { o1, o2 };
    setOn(true);
  }, [stop]);

  const toggle = useCallback(() => {
    if (on) {
      stop();
      return;
    }
    void start();
  }, [on, start, stop]);

  useEffect(() => () => stop(), [stop]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      title={
        on
          ? "Mute room tone"
          : "Room tone: very low level (headphones suggested)"
      }
      className={cn(
        "flex h-9 w-9 items-center justify-center border transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--gold)]/35",
        on
          ? "border-[color:var(--gold)]/35 bg-[color:var(--gold)]/[0.08] text-[color:var(--gold)]"
          : "border-white/[0.1] bg-white/[0.03] text-white/45 hover:border-white/[0.16] hover:text-white/75"
      )}
    >
      <span className="sr-only">
        {on ? "Room tone on" : "Room tone off"}
      </span>
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden
      >
        {on ? (
          <>
            <path d="M8 10v4M12 8v8M16 6v12" strokeLinecap="round" />
            <path d="M4 14h2M18 14h2" strokeLinecap="round" opacity="0.45" />
          </>
        ) : (
          <>
            <path d="M8 10v4M12 8v8M16 6v12" strokeLinecap="round" opacity="0.35" />
            <path d="M4 14h2M18 14h2" strokeLinecap="round" opacity="0.2" />
          </>
        )}
      </svg>
    </button>
  );
}

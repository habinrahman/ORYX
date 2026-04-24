"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SCENE_GRADIENT, SCENE_SECTIONS, type Scene } from "@/lib/scenes";

export function SceneManager() {
  const [scene, setScene] = useState<Scene>("hero");

  useEffect(() => {
    const root = document.documentElement;
    const els = SCENE_SECTIONS.map((s) => ({
      ...s,
      el: document.getElementById(s.id),
    })).filter((s): s is { id: string; scene: Scene; el: HTMLElement } => Boolean(s.el));

    if (!els.length) return;

    const apply = (next: Scene) => {
      const prev = root.dataset.scene as Scene | undefined;
      root.dataset.scene = next;
      setScene(next);
      if (prev && prev !== next) {
        window.dispatchEvent(
          new CustomEvent("oryx:scenechange", {
            detail: { scene: next, previous: prev },
          })
        );
      }
    };

    apply(els[0]!.scene);

    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        const id = best?.target?.id;
        if (!id) return;
        const match = SCENE_SECTIONS.find((s) => s.id === id);
        if (match) apply(match.scene);
      },
      {
        threshold: [0.22, 0.38, 0.55],
        rootMargin: "-18% 0px -58% 0px",
      }
    );

    els.forEach(({ el }) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: SCENE_GRADIENT[scene],
            mixBlendMode: "soft-light",
          }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/55" />
    </div>
  );
}

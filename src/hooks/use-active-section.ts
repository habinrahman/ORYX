"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is in the "hero" viewport band — tuned for unpinned
 * mobile scroll (thumb-first nav).
 */
export function useActiveSectionIndex(sectionIds: readonly string[]) {
  const [index, setIndex] = useState(0);

  const key = sectionIds.join("|");

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio >= 0.35)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target?.id) return;
        const i = sectionIds.indexOf(visible.target.id);
        if (i >= 0) setIndex(i);
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-38% 0px -38% 0px",
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- key encodes sectionIds
  }, [key]);

  return index;
}

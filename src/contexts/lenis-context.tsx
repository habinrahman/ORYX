"use client";

import Lenis from "lenis";
import {
  createContext,
  startTransition,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useLayoutEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const narrow =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1023px)").matches;

    const instance = new Lenis({
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: narrow ? 1 : 0.82,
      touchMultiplier: narrow ? 1.05 : 1,
      syncTouchLerp: narrow ? 0.075 : 0.1,
      duration: reduced ? 0.42 : narrow ? 0.88 : 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
    startTransition(() => {
      setLenis(instance);
    });

    let raf = 0;
    const loop = (t: number) => {
      instance.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement | null)?.closest?.(
        "a[href^='#']"
      ) as HTMLAnchorElement | null;
      if (!t) return;
      const href = t.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      instance.scrollTo(el, { offset: 0 });
      window.history.pushState({}, "", href);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  const value = useMemo(() => lenis, [lenis]);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}

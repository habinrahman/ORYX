"use client";

import type { ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  children?: ReactNode;
  id?: string;
  className?: string;
  /** First screen (hero): no top rule, different rhythm */
  variant?: "default" | "hero";
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { id, className, children, variant = "default" },
  ref
) {
  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "relative",
        variant === "default" &&
          "lux-section border-t border-white/[0.04] bg-[linear-gradient(180deg,rgba(255,255,255,0.028)_0px,transparent_42%)]",
        variant === "hero" && "lux-section-hero",
        className
      )}
    >
      {children}
    </section>
  );
});

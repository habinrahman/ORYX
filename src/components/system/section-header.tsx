"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/system/reveal";

export type SectionHeaderVariant = "default" | "editorial";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  aside?: ReactNode;
  className?: string;
  /** Roman or numeric chapter index — pairs with editorial variant */
  index?: string;
  variant?: SectionHeaderVariant;
  /** When true with editorial variant, title uses lighter campaign scale */
  campaignTitle?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  lead,
  aside,
  className,
  index,
  variant = "default",
  campaignTitle = true,
}: SectionHeaderProps) {
  if (variant === "editorial") {
    return (
      <div className={cn("relative", className)}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-x-6">
          <div className="relative min-w-0 lg:col-span-7">
            {index ? (
              <span
                className="lux-campaign-index pointer-events-none select-none font-display text-[clamp(4.5rem,14vw,9rem)] max-lg:mb-2 max-lg:block lg:absolute lg:-left-[min(2.5rem,4vw)] lg:top-[-0.35em] xl:-left-[min(4.5rem,6vw)]"
                aria-hidden
              >
                {index}
              </span>
            ) : null}
            <div className={cn("relative", index && "lg:pl-[min(5.5rem,11%)]")}>
              <Reveal>
                <p className="lux-eyebrow">{eyebrow}</p>
                <h2
                  className={cn(
                    "mt-6 text-balance text-white",
                    campaignTitle ? "lux-h2 lux-h2-campaign" : "lux-h2"
                  )}
                >
                  {title}
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-10 border-t border-white/[0.06] pt-10 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-16 xl:pl-14">
            {lead ? (
              <Reveal delay={0.06}>
                <p className="lux-lead-editorial">{lead}</p>
              </Reveal>
            ) : null}
            {aside ? <Reveal delay={0.1}>{aside}</Reveal> : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16 lg:gap-20",
        className
      )}
    >
      <div className="min-w-0 max-w-[min(44rem,100%)]">
        <Reveal>
          <p className="lux-eyebrow">{eyebrow}</p>
          <h2 className="lux-h2 mt-5">{title}</h2>
        </Reveal>
        {lead ? (
          <Reveal delay={0.06}>
            <p className="lux-lead-editorial mt-6 md:mt-8">{lead}</p>
          </Reveal>
        ) : null}
      </div>
      {aside ? (
        <div className="shrink-0 md:max-w-[min(20rem,36vw)] md:text-right">
          <Reveal delay={0.1}>{aside}</Reveal>
        </div>
      ) : null}
    </div>
  );
}

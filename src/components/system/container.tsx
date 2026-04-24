"use client";

import { cn } from "@/lib/utils";

type ContainerMode = "default" | "editorial";

export function Container({
  className,
  mode = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { mode?: ContainerMode }) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        mode === "default" &&
          "max-w-[min(var(--content-max),calc(100vw-2.5rem))] px-5 sm:px-8 lg:px-10",
        mode === "editorial" &&
          "max-w-[min(var(--content-max),calc(100vw-1.75rem))] px-5 sm:pl-10 sm:pr-12 md:pl-12 md:pr-16 lg:pl-16 lg:pr-20",
        className
      )}
      {...props}
    />
  );
}

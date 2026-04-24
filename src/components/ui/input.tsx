import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-none border border-white/[0.1] bg-black/40 px-3 py-2 text-sm text-white outline-none transition-[border-color,box-shadow] file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-xs file:font-medium file:tracking-wide file:text-white/80 placeholder:text-white/32 focus-visible:border-[color:var(--gold)]/35 focus-visible:ring-1 focus-visible:ring-[color:var(--gold)]/25 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 aria-invalid:border-red-400/40 aria-invalid:ring-1 aria-invalid:ring-red-400/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }

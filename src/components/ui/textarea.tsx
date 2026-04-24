import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-[6.5rem] w-full rounded-none border border-white/[0.1] bg-black/40 px-3 py-3 text-sm text-white outline-none transition-[border-color,box-shadow] placeholder:text-white/32 focus-visible:border-[color:var(--gold)]/35 focus-visible:ring-1 focus-visible:ring-[color:var(--gold)]/25 disabled:cursor-not-allowed disabled:opacity-45 aria-invalid:border-red-400/40 aria-invalid:ring-1 aria-invalid:ring-red-400/20",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

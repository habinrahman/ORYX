"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = React.PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

/** In-view reveal: motion without heavy blur (reads sharper / less “template”). */
const variants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px -12% 0px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

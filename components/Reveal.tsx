"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
export default function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

/** Line-mask headline reveal. Pass lines; wrap `<em>` for italic accents.
 *  Observes the (unclipped) heading, not the masked lines, so the trigger always fires. */
export function Headline({ lines, className = "" }: { lines: React.ReactNode[]; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <h2 ref={ref} className={`display ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em]">
          <motion.span className="block" initial={{ y: "110%" }} animate={{ y: inView ? 0 : "110%" }}
            transition={{ duration: 1.1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}>{l}</motion.span>
        </span>
      ))}
    </h2>
  );
}

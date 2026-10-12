"use client";
import { motion } from "framer-motion";
export default function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

/** Line-mask headline reveal. Pass lines; wrap `<em>` for italic accents. */
export function Headline({ lines, className = "" }: { lines: React.ReactNode[]; className?: string }) {
  return (
    <h2 className={`display ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span className="block" initial={{ y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}>{l}</motion.span>
        </span>
      ))}
    </h2>
  );
}

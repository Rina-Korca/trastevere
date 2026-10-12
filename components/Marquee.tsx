"use client";
import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

const words = ["Pasta", "Pizza", "Antipasti", "Dolci", "Vino", "Aperitivo", "Salute"];
export default function Marquee() {
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(vel, [-1500, 0, 1500], [-4, 0, 4]);
  const dir = useRef(1);
  useAnimationFrame((_, d) => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const f = factor.get();
    if (f < 0) dir.current = -1; else if (f > 0) dir.current = 1;
    const move = dir.current * 0.025 * (d / 16) + f * (d / 16) * 0.02;
    let v = base.get() + move;
    if (v <= -50) v += 50; if (v > 0) v -= 50;
    base.set(v);
  });
  const x = useTransform(base, v => `${v}%`);
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className="overflow-hidden border-y border-ink/15 bg-bone py-6" aria-label="Pasta, Pizza, Antipasti, Dolci, Vino">
      <motion.div style={{ x }} className="display flex w-max gap-10 whitespace-nowrap text-6xl md:text-8xl" aria-hidden>
        {row.map((w, i) => <span key={i} className="flex items-center gap-10"><span className={i % 2 ? "italic" : "outline-text"}>{w}</span><span className="text-gold text-3xl">✦</span></span>)}
      </motion.div>
    </div>
  );
}

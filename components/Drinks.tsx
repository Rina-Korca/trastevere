"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
const styles = ["Leichter Weißwein oder Spritz", "Fruchtiger Rosé oder Pils", "Runder Rotwein oder Helles", "Kräftiger Rotwein oder dunkles Bier"];
export default function Drinks() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "center 0.4"] });
  const fill = useTransform(scrollYProgress, [0, 1], [100, 30]);
  const [v, setV] = useState(1);
  return (
    <section ref={ref} className="overflow-hidden bg-espresso px-5 py-28 text-travertine [--espresso:#1e1611]">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
        <svg viewBox="0 0 100 160" className="mx-auto h-80" role="img" aria-label="Weinglas füllt sich">
          <defs><clipPath id="bowl"><path d="M20 10h60c0 45-10 70-30 75C30 80 20 55 20 10z" /></clipPath></defs>
          <motion.rect x="0" width="100" height="100" fill="#c9502b" clipPath="url(#bowl)" style={{ y: fill }} />
          <path d="M20 10h60c0 45-10 70-30 75C30 80 20 55 20 10z" fill="none" stroke="#f4ecdf" strokeWidth="2" />
          <path d="M50 85v55M30 142h40" stroke="#f4ecdf" strokeWidth="2" />
          {[0, 1, 2].map(i => <motion.circle key={i} cx={125 - 0} r="3" fill="#f1c65b" animate={{ cy: [150, 0], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 3 + i, delay: i, ease: "easeOut" }} style={{ translateX: -40 + i * 18 }} />)}
        </svg>
        <div>
          <h2 className="font-display text-5xl font-semibold md:text-6xl">Wein, Bier <span className="italic text-butter">&amp; mehr</span></h2>
          <p className="mt-4 text-travertine/70">Von leicht bis kräftig – allgemeine Empfehlung, keine konkreten Produzenten.</p>
          <label className="mt-8 block font-mono text-xs uppercase tracking-widest">leicht ⟷ kräftig
            <input type="range" min={0} max={3} value={v} onChange={e => setV(+e.target.value)} className="mt-3 w-full accent-[#f1c65b]" /></label>
          <p className="mt-6 font-display text-3xl italic text-butter" aria-live="polite">{styles[v]}</p>
        </div>
      </div>
    </section>
  );
}

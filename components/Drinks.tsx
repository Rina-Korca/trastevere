"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Headline } from "./Reveal";

const styles = ["Leichter Weißwein oder ein frischer Spritz", "Fruchtiger Rosé oder ein knackiges Pils", "Runder Rotwein oder ein süffiges Helles", "Kräftiger Rotwein oder ein dunkles Bier"];
const bubbles = Array.from({ length: 14 }, (_, i) => ({ x: 28 + ((i * 37) % 44), d: 3 + (i % 5), dl: (i * 0.45) % 4, r: 1 + (i % 3) * 0.6 }));

export default function Drinks() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "center 0.4"] });
  const fill = useTransform(scrollYProgress, [0, 1], [90, 28]);
  const [v, setV] = useState(1);
  return (
    <section ref={ref} className="relative overflow-hidden bg-coal px-5 py-32 text-bone md:px-10 md:py-44">
      <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-clay/20 blur-[140px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
        <div>
          <p className="label mb-6 text-gold">— Wein, Bier & mehr</p>
          <Headline className="text-6xl md:text-9xl" lines={["Von leicht", <em key="a" className="text-gold">bis kräftig.</em>]} />
          <p className="mt-8 max-w-md text-bone/60">Allgemeine Empfehlung – keine konkreten Produzenten oder Preise.</p>
          <label className="label mt-12 block text-bone/60">
            <span className="flex justify-between"><span>Leicht</span><span>Kräftig</span></span>
            <input type="range" min={0} max={3} value={v} onChange={e => setV(+e.target.value)} className="mt-4 w-full accent-[#c0653b]" aria-label="Von leicht bis kräftig" />
          </label>
          <motion.p key={v} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} aria-live="polite" className="display mt-8 min-h-24 text-4xl italic md:text-5xl">{styles[v]}</motion.p>
        </div>
        <svg viewBox="0 0 100 150" className="mx-auto h-[26rem]" role="img" aria-label="Weinglas füllt sich">
          <defs><clipPath id="bowl"><path d="M22 8h56c1 42-9 68-28 72C31 76 21 50 22 8z" /></clipPath>
            <linearGradient id="wine" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#9c3a2a" /><stop offset="1" stopColor="#4a1410" /></linearGradient></defs>
          <g clipPath="url(#bowl)"><motion.rect x="0" width="100" height="100" fill="url(#wine)" style={{ y: fill }} />
            {bubbles.map((b, i) => <motion.circle key={i} cx={b.x} r={b.r} fill="#f3ece1" fillOpacity="0.5" animate={{ cy: [78, 20], opacity: [0, 0.8, 0] }} transition={{ repeat: Infinity, duration: b.d, delay: b.dl, ease: "easeOut" }} />)}</g>
          <path d="M22 8h56c1 42-9 68-28 72C31 76 21 50 22 8z" fill="none" stroke="#f3ece1" strokeWidth="1" strokeOpacity=".8" />
          <path d="M50 80v52M32 134c10-4 26-4 36 0" stroke="#f3ece1" strokeWidth="1" fill="none" strokeOpacity=".8" />
        </svg>
      </div>
    </section>
  );
}

"use client";
import { useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

// Generic copy – describes a typical Italian evening, not specific dishes or claims.
const acts = [
  { n: "I", t: "Aperitivo", d: "Ein kühles Glas, ein paar Oliven und die ersten Gespräche. Ankommen, durchatmen, und der Abend darf beginnen.", img: "/images/friends.jpg" },
  { n: "II", t: "Antipasti", d: "Kleine Teller, die in die Mitte wandern und von Hand zu Hand gehen. Jeder probiert, jeder darf nachlegen.", img: "/images/dinner.jpg" },
  { n: "III", t: "Pizza & Pasta", d: "Das Herzstück des Abends: ofenwarm oder frisch gekocht, zum Teilen oder ganz für dich allein. Hier wird es satt und glücklich.", img: "/images/pizza-1.jpg" },
  { n: "IV", t: "Dolci", d: "Ein süßer Schlusspunkt und noch ein Espresso, bevor es nach Hause geht. Manchmal auch noch ein Löffel mehr.", img: "/images/dolci.jpg" },
];

export default function Evening() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [i, setI] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", v => setI(Math.min(acts.length - 1, Math.floor(v * acts.length))));
  return (
    <section ref={ref} className="relative bg-coal text-bone" style={{ height: `${acts.length * 90}vh` }}>
      <div className="sticky top-0 grid h-screen md:grid-cols-2">
        <div className="relative flex flex-col justify-between px-5 py-24 md:px-10 md:py-28">
          <p className="label text-gold">— Ein Abend in vier Akten</p>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
                <span className="display text-8xl text-clay md:text-9xl">{acts[i].n}</span>
                <h2 className="display text-6xl md:text-8xl">{acts[i].t}</h2>
                <p className="mt-6 max-w-md text-lg text-bone/70">{acts[i].d}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <ol className="flex gap-2" aria-label="Fortschritt">
            {acts.map((a, k) => <li key={a.n} className="h-px flex-1 bg-bone/20"><motion.div className="h-px bg-clay" animate={{ width: k <= i ? "100%" : "0%" }} transition={{ duration: 0.5 }} /></li>)}
          </ol>
        </div>
        <div className="relative hidden md:block">
          <AnimatePresence mode="sync">
            <motion.div key={i} initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} exit={{ opacity: 0.99 }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-0">
              <Image src={acts[i].img} alt={acts[i].t} fill sizes="50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-coal/50 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="pointer-events-none absolute inset-0 md:hidden -z-0">
          <Image src={acts[i].img} alt="" fill sizes="100vw" className="object-cover opacity-25" />
        </div>
      </div>
    </section>
  );
}

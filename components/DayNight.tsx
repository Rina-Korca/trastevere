"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
export default function DayNight() {
  const [day, setDay] = useState(true);
  return (
    <motion.section animate={{ background: day ? "linear-gradient(160deg,#f6d98a,#f19a6b)" : "linear-gradient(160deg,#1b2447,#5b3a6e)" }} transition={{ duration: 0.8 }}
      className={`px-5 py-28 text-center ${day ? "text-espresso" : "text-travertine"}`}>
      <h2 className="font-display text-5xl font-semibold md:text-7xl">Mittag <span className="italic">&amp;</span> Abend</h2>
      <button role="switch" aria-checked={!day} aria-label="Zwischen Mittag und Abend wechseln" onClick={() => setDay(d => !d)}
        className="relative mx-auto mt-8 flex h-14 w-28 items-center rounded-full bg-espresso/25 p-1.5 backdrop-blur">
        <motion.span layout transition={{ type: "spring", stiffness: 300, damping: 22 }} className={`grid h-11 w-11 place-items-center rounded-full bg-travertine text-terracotta ${day ? "" : "ml-auto"}`}>
          {day ? <Sun size={22} /> : <Moon size={22} />}</motion.span>
      </button>
      <p className="mx-auto mt-8 max-w-lg font-display text-2xl italic">
        {day ? "Mittags: ein ruhiger Teller, ein Espresso, Zeit für ein Gespräch." : "Abends: Kerzenlicht, Wein und eine Platte für alle."}</p>
      <p className="mt-3 font-mono text-xs opacity-70">Zeiten siehe „Besuch“ – Text ist generisch.</p>
    </motion.section>
  );
}

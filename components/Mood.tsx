"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";

const moods: Record<string, { pick: string; note: string; emoji: string }> = {
  Hungrig: { pick: "Pasta", note: "Ein großer Teller, der satt und glücklich macht.", emoji: "🍝" },
  Gemütlich: { pick: "Pizza zum Teilen", note: "Ofenwarm, in der Mitte vom Tisch.", emoji: "🍕" },
  Leicht: { pick: "Antipasti", note: "Kleine Teller, frisch und bunt.", emoji: "🍅" },
  Feierlaune: { pick: "Aperitivo & Vino", note: "Erst anstoßen, dann bestellen.", emoji: "🥂" },
  Vegetarisch: { pick: "Vegetarische Klassiker", note: "Gemüse, Käse, Kräuter.", emoji: "🌿" },
};

export default function Mood() {
  const [m, setM] = useState("Gemütlich");
  return (
    <section id="stimmung" className="bg-butter px-5 py-28 text-espresso">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal><h2 className="font-display text-5xl font-semibold md:text-7xl">Was passt zu deiner <span className="italic text-terracotta">Laune?</span></h2></Reveal>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {Object.keys(moods).map(k => (
            <button key={k} aria-pressed={k === m} onClick={() => setM(k)} className={`rounded-full border-2 border-espresso px-5 py-2 font-medium transition ${k === m ? "bg-espresso text-travertine" : "hover:bg-espresso/10"}`}>{k}</button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={m} initial={{ rotateX: 90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} exit={{ rotateX: -90, opacity: 0 }} transition={{ duration: 0.4 }}
            className="mx-auto mt-10 max-w-md rounded-3xl bg-travertine p-10 shadow-xl">
            <div className="text-7xl" aria-hidden>{moods[m].emoji}</div>
            <p className="mt-4 font-display text-4xl font-semibold">{moods[m].pick}</p>
            <p className="mt-2 text-espresso/70">{moods[m].note}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

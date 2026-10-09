"use client";
import { useState } from "react";
import Reveal from "./Reveal";
const items = [
  { n: "Bruschetta", e: "🍞", x: 50, y: 14 }, { n: "Oliven", e: "🫒", x: 82, y: 36 },
  { n: "Mozzarella", e: "🧀", x: 74, y: 76 }, { n: "Tomaten", e: "🍅", x: 26, y: 76 },
  { n: "Salumi", e: "🥓", x: 18, y: 36 }, { n: "Basilikum", e: "🌿", x: 50, y: 50 },
];
export default function Sharing() {
  const [h, setH] = useState<string | null>(null);
  return (
    <section id="teilen" className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-28 md:grid-cols-2">
      <Reveal>
        <h2 className="font-display text-5xl font-semibold md:text-7xl">Für <span className="italic text-terracotta">Freunde</span></h2>
        <p className="mt-5 max-w-md text-lg text-espresso/75">Antipasti-Platten und Pizza zum Teilen: eine Mitte, viele Hände. Beispiel-Zutaten – die echte Auswahl bitte ergänzen.</p>
        <p className="mt-6 min-h-8 font-display text-3xl italic text-olive" aria-live="polite">{h ?? "Fahr über die Platte →"}</p>
      </Reveal>
      <div className="relative mx-auto aspect-square w-full max-w-md rounded-full border-[14px] border-rosato bg-travertine shadow-2xl">
        <div className="absolute inset-6 rounded-full bg-butter/50" />
        {items.map(i => (
          <button key={i.n} onMouseEnter={() => setH(i.n)} onFocus={() => setH(i.n)} onMouseLeave={() => setH(null)} aria-label={i.n}
            style={{ left: `${i.x}%`, top: `${i.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-5xl transition hover:scale-125 hover:-rotate-12 md:text-6xl">{i.e}</button>))}
      </div>
    </section>
  );
}

"use client";
import { useState } from "react";
import Image from "next/image";
import Reveal, { Headline } from "./Reveal";

// Hotspots on the placeholder photo – EXAMPLE items, adjust once real photo is in place.
const spots = [
  { n: "Pizza zum Teilen", x: 40, y: 48 }, { n: "Frische Kräuter", x: 78, y: 70 }, { n: "Tomaten", x: 20, y: 22 },
];
export default function Sharing() {
  const [h, setH] = useState(0);
  return (
    <section id="teilen" className="bg-paper px-5 py-32 md:px-10 md:py-44">
      <div className="mx-auto grid max-w-7xl items-center gap-8 md:gap-12 md:grid-cols-2">
        <div>
          <p className="label mb-6 text-clay">— Für Freunde</p>
          <Headline className="text-6xl md:text-9xl" lines={["Eine Mitte,", <em key="a" className="text-clay">viele Hände.</em>]} />
          <Reveal delay={0.2}><p className="mt-8 max-w-md text-lg text-ink/70">Antipasti-Platten und Pizza zum Teilen: Hier wird nicht abgezählt, sondern weitergereicht. Beispieltext – die echte Auswahl bitte ergänzen.</p>
            <p className="display mt-8 min-h-12 text-4xl italic" aria-live="polite">{spots[h].n}</p></Reveal>
        </div>
        <Reveal>
          <div className="relative aspect-square overflow-hidden rounded-full">
            <Image src="/images/pizza-2.jpg" alt="Pizza zum Teilen" fill sizes="(min-width:768px) 45vw, 90vw" className="object-cover" />
            {spots.map((s, i) => (
              <button key={s.n} aria-label={s.n} onMouseEnter={() => setH(i)} onFocus={() => setH(i)} style={{ left: `${s.x}%`, top: `${s.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2">
                <span className={`relative grid h-9 w-9 place-items-center rounded-full border border-bone bg-ink/50 backdrop-blur transition ${h === i ? "scale-125 bg-clay" : ""}`}>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bone/40" /><span className="label relative text-bone">{i + 1}</span></span>
              </button>))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

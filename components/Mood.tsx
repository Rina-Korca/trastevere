"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Headline } from "./Reveal";

const moods = {
  Hungrig: { pick: "Pasta", note: "Ein großer Teller, der satt und glücklich macht.", img: "/images/pasta.jpg" },
  Gemütlich: { pick: "Pizza zum Teilen", note: "Ofenwarm, in der Mitte vom Tisch.", img: "/images/pizza-1.jpg" },
  Leicht: { pick: "Antipasti", note: "Kleine Teller, frisch und bunt.", img: "/images/dinner.jpg" },
  Feierlaune: { pick: "Aperitivo & Vino", note: "Erst anstoßen, dann bestellen.", img: "/images/friends.jpg" },
  Süß: { pick: "Dolci", note: "Das letzte Kapitel des Abends.", img: "/images/dolci.jpg" },
} as const;
type K = keyof typeof moods;

export default function Mood() {
  const [m, setM] = useState<K>("Gemütlich");
  return (
    <section id="stimmung" className="bg-bone px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="label mb-6 text-clay">— Wonach ist dir?</p>
        <Headline className="text-6xl md:text-9xl" lines={["Was passt zu", <em key="a" className="text-clay">deiner Laune?</em>]} />
        <p className="mt-8 max-w-2xl text-ink/80">Nicht jeder Abend ist gleich. Mal hast du Hunger auf etwas Großes, mal willst du dir nur etwas Leichtes gönnen oder mit Freunden anstoßen. Wähle deine Stimmung – wir zeigen dir, was dazu passt.</p>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <ul className="flex flex-wrap gap-2 self-start md:flex-col md:gap-0">
            {(Object.keys(moods) as K[]).map(k => (
              <li key={k}><button onClick={() => setM(k)} aria-pressed={k === m}
                className={`display min-h-11 border-b border-transparent text-4xl transition md:py-1 md:text-7xl ${k === m ? "italic text-clay" : "text-ink/25 hover:text-ink/60"}`}>{k}</button></li>))}
          </ul>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink">
            <AnimatePresence mode="popLayout">
              <motion.div key={m} initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-0">
                <Image src={moods[m].img} alt={moods[m].pick} fill sizes="50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                <div className="absolute bottom-0 p-6 text-bone"><p className="label text-gold">Unser Vorschlag</p><p className="display text-5xl">{moods[m].pick}</p><p className="mt-1 text-bone/80">{moods[m].note}</p></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Headline } from "./Reveal";

const faq = [
  ["Gibt es vegetarische Gerichte?", "Bitte rufen Sie uns an – wir beraten Sie gern."],
  ["Kann ich etwas zum Mitnehmen bestellen?", "Bitte rufen Sie uns an."],
  ["Gibt es Lieferung?", "Bitte rufen Sie uns an."],
  ["Wo finde ich euch?", "Adresse und Route finden Sie im Abschnitt „Besuch“."],
  ["Parkplätze, Zahlung, Allergene, Gruppen?", "Bitte rufen Sie uns an."],
];
export default function FAQ() {
  const [o, setO] = useState<number | null>(0);
  return (
    <section className="bg-paper px-5 py-32 md:px-10 md:py-44">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-12">
        <div className="md:col-span-5"><p className="label mb-6 text-clay">— FAQ</p><Headline className="text-6xl md:text-8xl" lines={["Gut", <em key="a" className="text-clay">zu wissen.</em>]} />
          <p className="label mt-6 text-clay">Antworten sind Platzhalter – bitte bestätigen.</p></div>
        <div className="md:col-span-7">
          {faq.map(([q, a], i) => (
            <div key={q} className="border-t border-ink/20 last:border-b">
              <button aria-expanded={o === i} onClick={() => setO(o === i ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                <span className="display text-3xl md:text-4xl">{q}</span>
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/30 transition ${o === i ? "rotate-45 bg-ink text-bone" : ""}`}><Plus size={16} /></span>
              </button>
              <AnimatePresence initial={false}>{o === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                  <p className="pb-6 text-lg text-ink/70">{a}</p></motion.div>)}</AnimatePresence>
            </div>))}
        </div>
      </div>
    </section>
  );
}

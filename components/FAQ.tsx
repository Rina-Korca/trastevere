"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const faq = [
  ["Gibt es vegetarische Gerichte?", "Bitte rufen Sie uns an – wir beraten Sie gern."],
  ["Kann ich etwas zum Mitnehmen bestellen?", "Bitte rufen Sie uns an."],
  ["Gibt es Lieferung?", "Bitte rufen Sie uns an."],
  ["Wo finde ich euch?", "Die Adresse und die Route finden Sie im Abschnitt „Besuch“."],
  ["Parkplätze, Zahlung, Allergene, Gruppen?", "Bitte rufen Sie uns an."],
];
export default function FAQ() {
  const [o, setO] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-5 py-28">
      <h2 className="font-display text-5xl font-semibold md:text-7xl">Fragen <span className="italic text-terracotta">&amp; Antworten</span></h2>
      <p className="mt-2 font-mono text-xs text-terracotta">Antworten sind Platzhalter – bitte bestätigen.</p>
      <div className="mt-8 divide-y divide-espresso/20 border-y border-espresso/20">
        {faq.map(([q, a], i) => (
          <div key={q}>
            <button aria-expanded={o === i} onClick={() => setO(o === i ? null : i)} className="flex w-full items-center justify-between py-5 text-left font-display text-xl">
              {q}<Plus className={`transition ${o === i ? "rotate-45" : ""}`} />
            </button>
            <motion.div initial={false} animate={{ height: o === i ? "auto" : 0 }} className="overflow-hidden"><p className="pb-5 text-espresso/70">{a}</p></motion.div>
          </div>))}
      </div>
    </section>
  );
}

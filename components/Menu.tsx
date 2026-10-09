"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Leaf, Search } from "lucide-react";
import { menu } from "@/lib/menu-data";
import Reveal from "./Reveal";

export default function Menu() {
  const cats = Object.keys(menu);
  const [cat, setCat] = useState(cats[0]);
  const [q, setQ] = useState("");
  const [veg, setVeg] = useState(false);
  const [openRow, setOpenRow] = useState<string | null>(null);
  const items = menu[cat].filter(d => (!veg || d.veg) && (d.name + d.desc).toLowerCase().includes(q.toLowerCase()));

  return (
    <section id="speisekarte" className="mx-auto max-w-4xl px-5 py-28">
      <Reveal><h2 className="font-display text-5xl font-semibold md:text-7xl">Speisekarte <span className="italic text-terracotta">assaggio</span></h2>
        <p className="mt-3 rounded-lg bg-butter/60 px-3 py-2 font-mono text-xs">Beispiel-Gerichte – bitte durch die echte Karte ersetzen.</p></Reveal>
      <div className="sticky top-20 z-30 mt-8 flex gap-2 overflow-x-auto rounded-full bg-travertine/80 py-2 backdrop-blur" role="tablist">
        {cats.map(c => (
          <button key={c} role="tab" aria-selected={c === cat} onClick={() => setCat(c)}
            className={`shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition ${c === cat ? "border-terracotta bg-terracotta text-travertine" : "border-espresso/25 hover:bg-espresso/10"}`}>{c}</button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className="flex flex-1 items-center gap-2 rounded-full border border-espresso/25 px-4 py-2"><Search size={16} />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Suchen…" aria-label="Speisekarte durchsuchen" className="w-full bg-transparent outline-none" /></label>
        <button aria-pressed={veg} onClick={() => setVeg(v => !v)} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm ${veg ? "bg-olive text-travertine" : "border border-espresso/25"}`}><Leaf size={16} /> Vegetarisch</button>
      </div>
      <ul className="mt-6 divide-y divide-espresso/15">
        <AnimatePresence mode="popLayout">
          {items.map(d => (
            <motion.li layout key={d.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <button onClick={() => setOpenRow(openRow === d.name ? null : d.name)} aria-expanded={openRow === d.name} className="flex w-full items-baseline gap-3 py-5 text-left">
                <span className="font-display text-2xl">{d.name}</span>
                {d.veg && <span className="rounded-full bg-olive px-2 text-xs font-bold text-travertine">V</span>}
                <span className="flex-1 border-b-2 border-dotted border-espresso/30" />
                <span className="font-mono text-sm text-espresso/60">€ —</span>
              </button>
              {openRow === d.name && <p className="pb-5 text-espresso/70">{d.desc}</p>}
            </motion.li>
          ))}
        </AnimatePresence>
        {!items.length && <li className="py-8 text-espresso/60">Nichts gefunden.</li>}
      </ul>
    </section>
  );
}

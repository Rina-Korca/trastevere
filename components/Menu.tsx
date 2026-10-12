"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { Search } from "lucide-react";
import { menu, Dish } from "@/lib/menu-data";
import { Headline } from "./Reveal";

export default function Menu() {
  const cats = Object.keys(menu);
  const [cat, setCat] = useState(cats[0]);
  const [q, setQ] = useState("");
  const [veg, setVeg] = useState(false);
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [hover, setHover] = useState<Dish | null>(null);
  const mx = useSpring(useMotionValue(0), { stiffness: 250, damping: 28 });
  const my = useSpring(useMotionValue(0), { stiffness: 250, damping: 28 });
  const items = menu[cat].filter(d => (!veg || d.veg) && (d.name + d.desc).toLowerCase().includes(q.toLowerCase()));

  return (
    <section id="speisekarte" className="bg-bone px-5 py-32 md:px-10 md:py-44"
      onMouseMove={e => { mx.set(e.clientX); my.set(e.clientY); }}>
      <div className="mx-auto max-w-7xl">
        <p className="label mb-6 text-clay">— Speisekarte</p>
        <Headline className="text-6xl md:text-9xl" lines={["Zum Teilen,", <em key="a" className="text-clay">zum Genießen.</em>]} />
        <p className="label mt-6 inline-block rounded-full border border-clay/50 px-4 py-2 text-clay">Beispiel-Gerichte · bitte durch die echte Karte ersetzen</p>

        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="md:sticky md:top-28">
              <ul role="tablist" className="flex gap-2 overflow-x-auto md:flex-col md:gap-0">
                {cats.map(c => (
                  <li key={c} className="shrink-0">
                    <button role="tab" aria-selected={c === cat} onClick={() => setCat(c)}
                      className={`display flex w-full items-center gap-3 py-1 text-left text-3xl transition md:text-5xl ${c === cat ? "text-ink" : "text-ink/30 hover:text-ink/70"}`}>
                      {c === cat && <motion.span layoutId="dot" className="h-2 w-2 rounded-full bg-clay" />}{c}
                    </button>
                  </li>))}
              </ul>
              <div className="mt-8 flex items-center gap-2 border-b border-ink/30 pb-2"><Search size={14} />
                <input value={q} onChange={e => setQ(e.target.value)} placeholder="Suchen" aria-label="Speisekarte durchsuchen" className="label w-full bg-transparent outline-none placeholder:text-ink/40" /></div>
              <button aria-pressed={veg} onClick={() => setVeg(v => !v)} className={`label mt-4 rounded-full border px-4 py-2 transition ${veg ? "border-moss bg-moss text-bone" : "border-ink/30"}`}>Nur vegetarisch</button>
            </div>
          </div>

          <ul className="md:col-span-9">
            <AnimatePresence mode="popLayout">
              {items.map((d, i) => (
                <motion.li layout key={d.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }}
                  className="border-t border-ink/15 last:border-b" onMouseEnter={() => setHover(d)} onMouseLeave={() => setHover(null)}>
                  <button onClick={() => setOpenRow(openRow === d.name ? null : d.name)} aria-expanded={openRow === d.name} className="group flex w-full items-baseline gap-4 py-6 text-left">
                    <span className="label w-8 text-ink/40">0{i + 1}</span>
                    <span className="display text-4xl transition group-hover:translate-x-2 group-hover:italic md:text-6xl">{d.name}</span>
                    {d.veg && <span className="label rounded-full bg-moss px-2 py-0.5 text-bone">V</span>}
                    <span className="mb-2 flex-1 border-b border-dotted border-ink/30" />
                    <span className="label text-ink/50">€ —</span>
                  </button>
                  <AnimatePresence>{openRow === d.name && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-6 pl-12 text-lg text-ink/70">{d.desc}</motion.p>)}</AnimatePresence>
                </motion.li>))}
            </AnimatePresence>
            {!items.length && <li className="py-10 text-ink/50">Nichts gefunden.</li>}
          </ul>
        </div>
      </div>
      {/* cursor-following photo preview */}
      <motion.div aria-hidden style={{ x: mx, y: my }} className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block">
        <AnimatePresence>{hover && (
          <motion.div key={hover.img} initial={{ opacity: 0, scale: 0.8, rotate: -6 }} animate={{ opacity: 1, scale: 1, rotate: -3 }} exit={{ opacity: 0, scale: 0.8 }}
            className="relative -translate-y-1/2 translate-x-8 h-56 w-44 overflow-hidden rounded-xl shadow-2xl">
            <Image src={hover.img} alt="" fill sizes="180px" className="object-cover" /></motion.div>)}</AnimatePresence>
      </motion.div>
    </section>
  );
}

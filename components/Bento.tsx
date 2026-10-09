"use client";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

// Foto-Platzhalter: replace each `bg` tile with <Image src="/images/..."/>
const tiles = [
  { t: "Pizza", e: "🍕", c: "bg-terracotta text-travertine", s: "md:col-span-2 md:row-span-2" },
  { t: "Pasta", e: "🍝", c: "bg-butter", s: "" },
  { t: "Vino", e: "🍷", c: "bg-olive text-travertine", s: "" },
  { t: "Dolci", e: "🍮", c: "bg-rosato", s: "" },
  { t: "Antipasti", e: "🫒", c: "bg-espresso text-travertine", s: "md:col-span-2" },
  { t: "Amici", e: "🥂", c: "bg-terracotta text-travertine", s: "" },
];
export default function Bento() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-28">
      <Reveal><h2 className="font-display text-5xl font-semibold md:text-7xl">Momente <span className="italic text-terracotta">am Tisch</span></h2>
        <p className="mt-2 font-mono text-xs text-terracotta">Foto-Platzhalter – bitte echte Bilder in /public/images ersetzen.</p></Reveal>
      <div className="mt-10 grid auto-rows-[10rem] grid-cols-2 gap-4 md:auto-rows-[12rem] md:grid-cols-4">
        {tiles.map((t, i) => (
          <motion.div key={t.t} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
            whileHover={{ scale: 1.03, rotate: i % 2 ? 1.5 : -1.5 }}
            className={`relative flex flex-col justify-between overflow-hidden rounded-[2rem] p-5 ${t.c} ${t.s}`}>
            <span className="text-5xl md:text-7xl" aria-hidden>{t.e}</span>
            <span className="font-display text-2xl italic">{t.t}</span>
          </motion.div>))}
      </div>
    </section>
  );
}

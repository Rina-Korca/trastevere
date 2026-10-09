"use client";
import { motion } from "framer-motion";
import { Phone, UtensilsCrossed } from "lucide-react";
import Magnetic from "./Magnetic";
import StatusChip from "./StatusChip";
import { business, hasPhone } from "@/lib/business-info";

export default function Hero() {
  const words = business.name.split("");
  return (
    <section id="start" className="relative overflow-hidden px-5 pb-16 pt-32 md:pt-40">
      <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-butter/70 blur-3xl" aria-hidden />
      <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-rosato/70 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-6xl">
        <StatusChip />
        <h1 className="mt-6 font-display text-[clamp(3.5rem,15vw,13rem)] font-semibold leading-[0.9] tracking-tight" aria-label={business.name}>
          {words.map((c, i) => (
            <motion.span key={i} aria-hidden className="inline-block" initial={{ y: "80%", opacity: 0, rotate: 6 }} animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.1 + i * 0.06, type: "spring", stiffness: 120, damping: 14 }}>{c}</motion.span>
          ))}
        </h1>
        <p className="mt-4 max-w-xl font-display text-2xl italic text-terracotta md:text-4xl">Ein Stück Rom – für Freunde am Tisch.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Magnetic><a href={hasPhone ? `tel:${business.phone.tel}` : "#besuch"} className="inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-4 font-medium text-travertine transition hover:scale-105 hover:bg-espresso">
            <Phone size={18} /> Anrufen
          </a></Magnetic>
          <Magnetic><a href="#speisekarte" className="inline-flex items-center gap-2 rounded-full border-2 border-espresso px-7 py-4 font-medium transition hover:scale-105 hover:bg-espresso hover:text-travertine">
            <UtensilsCrossed size={18} /> Speisekarte
          </a></Magnetic>
          <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full px-5 py-4 font-medium underline underline-offset-4">Route planen</a>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2">
          {business.services.map(s => <li key={s} className="rounded-full bg-olive px-4 py-1.5 text-sm text-travertine">{s}</li>)}
        </ul>
        {/* rotating seal */}
        <motion.div aria-hidden animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="absolute right-0 top-0 hidden h-36 w-36 md:block">
          <svg viewBox="0 0 100 100"><defs><path id="c" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
            <text className="fill-espresso font-mono" fontSize="8.5" letterSpacing="2"><textPath href="#c">PIZZA · PASTA · VINO · AMICI · SALUTE ·</textPath></text></svg>
        </motion.div>
      </div>
    </section>
  );
}

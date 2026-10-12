"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const modes = {
  mittag: { img: "/images/friends.jpg", title: "Mittag", text: "Ein ruhiger Teller, ein Espresso und Zeit für ein gutes Gespräch.", tint: "from-gold/30 via-transparent to-ink/60" },
  abend: { img: "/images/dinner.jpg", title: "Abend", text: "Kerzenlicht, ein Glas Wein und eine Platte für alle am Tisch.", tint: "from-clay/30 via-ink/40 to-ink/90" },
};
export default function DayNight() {
  const [m, setM] = useState<"mittag" | "abend">("abend");
  const c = modes[m];
  return (
    <section className="relative flex min-h-[75svh] items-center overflow-hidden bg-ink px-5 py-20 text-bone md:px-10">
      <AnimatePresence mode="sync">
        <motion.div key={m} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} className="absolute inset-0">
          <Image src={c.img} alt="" fill sizes="100vw" className="object-cover" /><div className={`absolute inset-0 bg-gradient-to-br ${c.tint}`} />
        </motion.div>
      </AnimatePresence>
      <div className="relative mx-auto w-full max-w-7xl">
        <p className="label text-gold">— Mittag & Abend</p>
        <div role="radiogroup" aria-label="Tageszeit" className="relative mt-8 inline-flex rounded-full border border-bone/30 bg-ink/40 p-1.5 backdrop-blur-xl">
          {(["mittag", "abend"] as const).map(k => (
            <button key={k} role="radio" aria-checked={m === k} onClick={() => setM(k)} className={`label relative z-10 flex items-center gap-2 px-6 py-3 transition-colors ${m === k ? "text-ink" : "text-bone"}`}>
              {k === "mittag" ? <Sun size={14} /> : <Moon size={14} />}{modes[k].title}
              {m === k && <motion.span layoutId="dn" className="absolute inset-0 -z-10 rounded-full bg-bone" transition={{ type: "spring", stiffness: 350, damping: 30 }} />}
            </button>))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={m} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}>
            <h2 className="display mt-10 text-[clamp(5rem,16vw,15rem)]">{c.title}</h2>
            <p className="display mt-4 max-w-xl text-3xl italic text-bone/90">{c.text}</p>
            <p className="mt-6 max-w-lg text-bone/80">{m === "mittag" ? "Tagsüber ist es hell, entspannt und unkompliziert – ideal für eine Pause mitten im Tag. Die genauen Zeiten findest du unter „Besuch“." : "Am Abend wird das Licht weicher und der Tisch voller. Zeit, Platten zu teilen, anzustoßen und lange sitzen zu bleiben. Die genauen Zeiten findest du unter „Besuch“."}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

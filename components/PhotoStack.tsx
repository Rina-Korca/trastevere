"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Headline } from "./Reveal";

const photos = [
  { src: "/images/friends.jpg", cap: "Am Tisch" }, { src: "/images/pizza-3.jpg", cap: "Pizza" },
  { src: "/images/pasta.jpg", cap: "Pasta" }, { src: "/images/dinner.jpg", cap: "Abend" }, { src: "/images/dolci.jpg", cap: "Dolci" },
];

export default function PhotoStack() {
  const [order, setOrder] = useState(photos.map((_, i) => i));
  const next = () => setOrder(o => [...o.slice(1), o[0]]);
  return (
    <section className="overflow-hidden bg-bone px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:gap-12 md:grid-cols-2">
        <div>
          <p className="label mb-6 text-clay">— Eindrücke</p>
          <Headline className="text-6xl md:text-9xl" lines={["Zieh", <em key="a" className="text-clay">mich weg.</em>]} />
          <p className="mt-8 max-w-md text-ink/80">Ein paar Eindrücke zum Durchblättern: Zieh die Karten zur Seite, wische oder klicke dich durch Tisch, Teller und Gläser.</p>
          <p className="mt-5 max-w-lg text-ink/80">Gutes Essen ist mehr als der Teller: Es sind die Menschen am Tisch, das gedämpfte Licht und der Moment, in dem alle gleichzeitig zugreifen. Genau diese Stimmung möchten wir dir zeigen.</p>
          <ul className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-ink/20 pt-6">{["Am Tisch", "Auf dem Teller", "Im Glas"].map((t, i) => <li key={t}><span className="label text-clay">0{i + 1}</span><p className="display mt-2 !text-2xl md:!text-3xl">{t}</p></li>)}</ul>
          <p className="label mt-6 text-ink/65">Platzhalter-Fotos · ziehen, wischen oder klicken</p>
          <button onClick={next} className="label mt-6 inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 transition hover:bg-ink hover:text-bone">Nächstes Foto <ArrowRight size={14} /></button>
        </div>
        <div className="relative mx-auto h-[28rem] w-72 md:h-[34rem] md:w-96" aria-roledescription="Foto-Stapel" aria-live="polite">
          {order.map((idx, pos) => {
            const top = pos === 0;
            return (
              <motion.figure key={idx} layout drag={top ? "x" : false} dragSnapToOrigin dragElastic={0.6}
                onDragEnd={(_, i) => { if (Math.abs(i.offset.x) > 120 || Math.abs(i.velocity.x) > 600) next(); }}
                animate={{ scale: 1 - pos * 0.05, y: pos * 18, rotate: pos === 0 ? 0 : (pos % 2 ? 3 : -3) * pos, zIndex: photos.length - pos, opacity: pos > 3 ? 0 : 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className={`absolute inset-0 overflow-hidden rounded-2xl shadow-2xl ${top ? "cursor-grab active:cursor-grabbing" : ""}`}>
                <Image src={photos[idx].src} alt={photos[idx].cap} fill sizes="400px" draggable={false} className="pointer-events-none object-cover" />
                <figcaption className="label absolute bottom-0 w-full bg-gradient-to-t from-ink/80 to-transparent p-5 text-bone">{photos[idx].cap}</figcaption>
              </motion.figure>);
          })}
        </div>
      </div>
    </section>
  );
}

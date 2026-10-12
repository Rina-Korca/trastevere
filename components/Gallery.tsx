"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const shots = [
  { src: "/images/pizza-3.jpg", t: "Pizza" }, { src: "/images/pasta.jpg", t: "Pasta" },
  { src: "/images/dinner.jpg", t: "Antipasti" }, { src: "/images/dolci.jpg", t: "Dolci" },
  { src: "/images/friends.jpg", t: "Amici" },
];
export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-62%"]);
  return (
    <section id="galerie" ref={ref} className="relative h-[320vh] bg-ink text-bone">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="px-5 md:px-10">
          <p className="label text-gold">— Galerie</p>
          <h2 className="display mt-3 text-5xl md:text-8xl">Momente <em>am Tisch</em></h2>
          <p className="mt-4 max-w-xl text-bone/80">Ein Blick auf das, was uns ausmacht: Essen, das gemeinsam geteilt wird, Gläser, die aneinanderstoßen, und Abende, die länger dauern als geplant.</p>
          <p className="label mt-3 text-bone/65">Platzhalter-Fotos · bitte ersetzen</p>
        </div>
        <motion.div style={{ x }} className="mt-10 flex w-max gap-5 px-5 md:px-10">
          {shots.map((s, i) => (
            <figure key={s.t} data-hover className={`group relative shrink-0 overflow-hidden rounded-2xl ${i % 2 ? "mt-12 h-[44vh] w-[62vw] md:w-[26vw]" : "h-[50vh] w-[70vw] md:w-[30vw]"}`}>
              <Image src={s.src} alt={s.t} fill sizes="40vw" className="object-cover transition duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <figcaption className="display absolute bottom-4 left-5 text-4xl italic">{s.t}</figcaption>
            </figure>))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const cards = [
  { n: "01", t: "Pizza", d: "Ofenwarm, zum Teilen.", img: "/images/pizza-1.jpg" },
  { n: "02", t: "Pasta", d: "Frisch und großzügig.", img: "/images/pasta.jpg" },
  { n: "03", t: "Dolci", d: "Der süße Schlusspunkt.", img: "/images/dolci.jpg" },
];

function Item({ c, i, p }: { c: (typeof cards)[number]; i: number; p: MotionValue<number> }) {
  const target = 1 - (cards.length - 1 - i) * 0.04;
  const scale = useTransform(p, [i / cards.length, 1], [1, target]);
  return (
    <div className="sticky top-0 flex h-screen items-center justify-center px-5 md:px-10" style={{ paddingTop: i * 24 }}>
      <motion.article style={{ scale }} className="relative grid h-[70vh] w-full max-w-6xl origin-top overflow-hidden rounded-3xl bg-ink text-bone shadow-2xl md:grid-cols-2">
        <div className="flex flex-col justify-between p-8 md:p-14">
          <span className="label text-gold">{c.n} / 0{cards.length} · Beispiel</span>
          <div><h3 className="display text-7xl md:text-9xl">{c.t}</h3><p className="display mt-4 text-3xl italic text-bone/70">{c.d}</p></div>
        </div>
        <div className="relative min-h-40"><Image src={c.img} alt={c.t} fill sizes="50vw" className="object-cover" /></div>
      </motion.article>
    </div>
  );
}

export default function CardStack() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section ref={ref} className="bg-paper py-20">
      <p className="label px-5 pb-10 text-clay md:px-10">— Klassiker (Beispiele)</p>
      {cards.map((c, i) => <Item key={c.n} c={c} i={i} p={scrollYProgress} />)}
    </section>
  );
}

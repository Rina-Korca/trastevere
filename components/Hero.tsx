"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ArrowDown } from "lucide-react";
import StatusChip from "./StatusChip";
import Magnetic from "./Magnetic";
import { business, hasPhone } from "@/lib/business-info";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  return (
    <section id="start" ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-bone">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image src="/images/interior.jpg" alt="Gastraum" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />
      <motion.div style={{ y: textY }} className="relative z-10 flex h-full flex-col justify-end px-5 pb-10 md:px-10 md:pb-14">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3 }} className="mb-6"><StatusChip /></motion.div>
        <h1 className="display text-[clamp(4.5rem,21vw,22rem)] leading-[.82]" aria-label={business.name}>
          <span className="block overflow-hidden pb-[.08em]">
            <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 2.1, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}>{business.name}</motion.span>
          </span>
        </h1>
        <p className="mt-6 hidden max-w-xl text-bone/75 md:block">Italienische Küche, Pizza, Pasta und Wein in gemütlicher Atmosphäre. Komm vorbei, teile deinen Teller mit Freunden und lass den Alltag draußen.</p>
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.6, duration: 1 }} className="display max-w-md text-3xl italic text-bone/90 md:text-4xl">
            Ein Stück Rom – für Freunde am Tisch.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }} className="flex flex-wrap items-center gap-3">
            <Magnetic><a href={hasPhone ? `tel:${business.phone.tel}` : "#besuch"} className="label inline-flex items-center gap-2 rounded-full bg-clay px-7 py-4 transition hover:bg-bone hover:text-ink"><Phone size={14} /> Anrufen</a></Magnetic>
            <Magnetic><a href="#speisekarte" className="label inline-flex items-center gap-2 rounded-full border border-bone/40 px-7 py-4 backdrop-blur transition hover:bg-bone hover:text-ink">Speisekarte</a></Magnetic>
            <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="label px-3 py-4 underline underline-offset-8 decoration-bone/40 hover:decoration-bone">Route planen</a>
          </motion.div>
        </div>
        <div className="label mt-10 hidden items-center justify-between border-t border-bone/20 pt-5 text-bone/60 md:flex">
          <span>{business.address.street} · {business.address.city}</span>
          <span>{business.services.join(" · ")}</span>
          <span className="flex items-center gap-2">Scroll <ArrowDown size={12} className="animate-bounce" /></span>
        </div>
      </motion.div>
    </section>
  );
}

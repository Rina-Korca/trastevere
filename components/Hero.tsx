"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone } from "lucide-react";
import StatusChip from "./StatusChip";
import FlagLine from "./FlagLine";
import { business, hasPhone } from "@/lib/business-info";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  return (
    <section id="start" ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-bone">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/hero-poster-mobile.jpg" />
          <img src="/images/hero-poster.jpg" alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        </picture>
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Frisch zubereitete Pasta in der Küche"
        >
          <source src="/videos/hero-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/50 md:via-ink/40 md:to-ink/60" />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-5 pb-24 pt-24 md:px-10 md:pb-16 md:pt-28">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}><StatusChip /></motion.div>
          <p className="label text-gold">Ristorante · Pizzeria · Cucina Italiana</p>
        </div>
        <div className="grid gap-5 md:grid-cols-12 md:items-end md:gap-10">
          <h1 className="display text-[clamp(3rem,8vw,7rem)] leading-[1.02] md:col-span-7">
            {["Ein Abend", "wie in Rom."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[.1em]">
                <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 1.9 + i * 0.14, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>{i ? <em className="text-gold">{l}</em> : l}</motion.span>
              </span>))}
          </h1>
          <motion.div className="md:col-span-5 md:col-start-8 md:pb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4, duration: 1 }}>
            <FlagLine className="w-20" />
            <p className="mt-4 max-w-md leading-relaxed md:mt-6 text-bone/80">Pizza, Pasta und italienische Klassiker in warmer Atmosphäre – zum Teilen, Genießen und Verweilen.</p>
            <div className="mt-5 flex flex-wrap gap-3 md:mt-8">
              <a href="#reservieren" className="label inline-flex min-h-14 items-center bg-gold px-8 text-ink transition hover:bg-bone">Tisch reservieren</a>
              <a href="#speisekarte" className="label inline-flex min-h-14 items-center border border-bone/50 px-8 transition hover:bg-bone hover:text-ink">Speisekarte ansehen</a>
            </div>
            <a href={hasPhone ? `tel:${business.phone.tel}` : "#besuch"} className="label mt-6 hidden items-center gap-2 text-bone/80 hover:text-bone md:inline-flex"><Phone size={13} /> {business.phone.display}</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useRef } from "react";
import Image from "next/image";
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
        <Image src="/images/interior.jpg" alt="Gastraum mit warmem Licht" fill priority sizes="100vw" className="object-cover object-[60%_50%]" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/50 md:bg-gradient-to-r md:from-ink/90 md:via-ink/50 md:to-ink/10" />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-28 pt-28 md:justify-center md:px-10 md:pb-0">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}><StatusChip /></motion.div>
        <p className="label mt-8 text-gold">Ristorante · Pizzeria · Cucina Italiana</p>
        <h1 className="display mt-5 max-w-3xl text-[clamp(3rem,8vw,7rem)] leading-[1.02]">
          {["Ein Abend", "wie in Rom."].map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[.1em]">
              <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 1.9 + i * 0.14, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>{i ? <em className="text-gold">{l}</em> : l}</motion.span>
            </span>))}
        </h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4, duration: 1 }}>
          <FlagLine className="mt-8 w-20" />
          <p className="mt-6 max-w-md text-lg leading-relaxed text-bone/80">Pizza, Pasta und italienische Klassiker in warmer Atmosphäre – zum Teilen, Genießen und Verweilen.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#reservieren" className="label inline-flex min-h-14 items-center bg-gold px-8 text-ink transition hover:bg-bone">Tisch reservieren</a>
            <a href="#speisekarte" className="label inline-flex min-h-14 items-center border border-bone/50 px-8 transition hover:bg-bone hover:text-ink">Speisekarte ansehen</a>
          </div>
          <a href={hasPhone ? `tel:${business.phone.tel}` : "#besuch"} className="label mt-6 hidden items-center gap-2 text-bone/70 hover:text-bone md:inline-flex"><Phone size={13} /> {business.phone.display}</a>
        </motion.div>
      </div>
    </section>
  );
}

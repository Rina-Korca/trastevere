"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Phone, ArrowUpRight } from "lucide-react";
import { business, hasPhone } from "@/lib/business-info";
import StatusChip from "./StatusChip";

const links = [
  { id: "start", label: "Start", img: "/images/interior.jpg" },
  { id: "geschichte", label: "Geschichte", img: "/images/friends.jpg" },
  { id: "speisekarte", label: "Speisekarte", img: "/images/pasta.jpg" },
  { id: "galerie", label: "Galerie", img: "/images/pizza-3.jpg" },
  { id: "teilen", label: "Teilen", img: "/images/pizza-2.jpg" },
  { id: "besuch", label: "Besuch", img: "/images/dinner.jpg" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hover, setHover] = useState(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    let last = window.scrollY;
    const onS = () => { const y = window.scrollY; setHidden(y > last && y > 200); last = y; };
    window.addEventListener("scroll", onS, { passive: true });
    return () => window.removeEventListener("scroll", onS);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [open]);

  const call = hasPhone ? `tel:${business.phone.tel}` : "#besuch";

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed left-0 top-0 z-[80] h-[2px] w-full origin-left bg-clay" />
      <motion.header animate={{ y: hidden && !open ? "-110%" : 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[75] flex items-center justify-between px-5 py-5 text-bone mix-blend-difference md:px-10">
        <a href="#start" onClick={() => setOpen(false)} className="display text-3xl italic md:text-4xl">{business.name}</a>
        <div className="hidden md:block mix-blend-normal"><StatusChip /></div>
        <div className="flex items-center gap-3">
          <a href={call} className="label hidden items-center gap-2 rounded-full border border-bone/60 px-5 py-3 transition hover:bg-bone hover:text-ink md:flex"><Phone size={13} /> Anrufen</a>
          <button onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="menu-overlay" className="label group flex items-center gap-3 rounded-full bg-bone py-2 pl-5 pr-2 text-ink">
            <span>{open ? "Schließen" : "Menü"}</span>
            <span className="relative grid h-9 w-9 place-items-center rounded-full bg-ink">
              <span className={`absolute h-px w-4 bg-bone transition-all duration-300 ${open ? "rotate-45" : "-translate-y-[3px] group-hover:-translate-y-[4px]"}`} />
              <span className={`absolute h-px w-4 bg-bone transition-all duration-300 ${open ? "-rotate-45" : "translate-y-[3px] group-hover:translate-y-[4px]"}`} />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div id="menu-overlay" role="dialog" aria-label="Navigation" initial={{ clipPath: "circle(0% at calc(100% - 3.5rem) 2.8rem)" }} animate={{ clipPath: "circle(150% at calc(100% - 3.5rem) 2.8rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3.5rem) 2.8rem)" }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[70] grid bg-ink text-bone md:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col justify-between px-6 pb-8 pt-28 md:px-14">
              <ul onMouseLeave={() => setHover(0)}>
                {links.map((l, i) => (
                  <li key={l.id} className="overflow-hidden">
                    <motion.a href={`#${l.id}`} onClick={() => setOpen(false)} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)}
                      initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.35 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className={`display flex items-baseline gap-5 py-1 text-6xl transition-all duration-300 md:text-8xl ${hover === i ? "translate-x-3 text-bone" : "text-bone/35"}`}>
                      <span className="label text-clay">0{i + 1}</span>{l.label}
                    </motion.a>
                  </li>))}
              </ul>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <address className="label not-italic leading-loose text-bone/60">{business.address.street}<br />{business.address.zip} {business.address.city}</address>
                <a href={call} className="label inline-flex items-center gap-2 rounded-full bg-clay px-7 py-4">Anrufen <ArrowUpRight size={14} /></a>
              </div>
            </div>
            <div className="relative hidden md:block">
              <AnimatePresence mode="sync">
                <motion.div key={hover} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0">
                  <Image src={links[hover].img} alt="" fill sizes="40vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <a href={call} aria-label="Anrufen" className="fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-clay text-bone shadow-2xl md:hidden"><Phone size={20} /></a>
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Phone, ArrowUpRight } from "lucide-react";
import { business, hasPhone } from "@/lib/business-info";
import Logo from "./Logo";

const links = [
  { id: "start", label: "Start", img: "/images/interior.jpg" },
  { id: "geschichte", label: "Geschichte", img: "/images/friends.jpg" },
  { id: "speisekarte", label: "Speisekarte", img: "/images/pasta.jpg" },
  { id: "galerie", label: "Galerie", img: "/images/pizza-3.jpg" },
  { id: "reservieren", label: "Reservieren", img: "/images/dinner.jpg" },
  { id: "besuch", label: "Besuch", img: "/images/dinner.jpg" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("start");
  const [hover, setHover] = useState(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onS = () => { const y = window.scrollY; setScrolled(y > 40); };
    onS();
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(l => { const el = document.getElementById(l.id); if (el) io.observe(el); });
    window.addEventListener("scroll", onS, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onS); };
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [open]);

  const call = hasPhone ? `tel:${business.phone.tel}` : "#besuch";

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed left-0 top-0 z-[80] h-[2px] w-full origin-left bg-gold" />
      <motion.header animate={{ y: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-[75] flex items-center justify-between gap-6 px-5 py-4 text-bone transition-colors duration-500 md:px-10 ${scrolled || open ? "border-b border-bone/10 bg-ink/80 backdrop-blur-xl" : "bg-gradient-to-b from-ink/70 to-transparent"}`}>
        <a href="#start" onClick={() => setOpen(false)} aria-label={`${business.name} – Start`}><Logo priority className="h-10 md:h-14" /></a>
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 lg:flex">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} className={`label relative px-4 py-2 transition-colors ${active === l.id ? "text-bone" : "text-bone/75 hover:text-bone"}`}>
              {l.label}
              {active === l.id && <motion.span layoutId="nav-underline" className="absolute inset-x-4 -bottom-0.5 h-px bg-gold" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
            </a>))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={call} className="label hidden min-h-11 items-center gap-2 px-3 text-bone/80 transition hover:text-bone lg:flex"><Phone size={13} /> Anrufen</a>
          <a href="#reservieren" className="label hidden min-h-11 items-center whitespace-nowrap bg-gold px-6 text-ink transition hover:bg-bone md:inline-flex">Tisch reservieren</a>
          <button onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="menu-overlay" className="label group flex items-center gap-3 rounded-full border border-bone/30 bg-bone/10 py-1.5 pl-5 pr-1.5 text-bone backdrop-blur transition hover:bg-bone/20 lg:hidden">
            <span>{open ? "Schließen" : "Menü"}</span>
            <span className="relative grid h-9 w-9 place-items-center rounded-full bg-bone text-ink">
              <span className={`absolute h-px w-4 bg-ink transition-all duration-300 ${open ? "rotate-45" : "-translate-y-[3px] group-hover:-translate-y-[4px]"}`} />
              <span className={`absolute h-px w-4 bg-ink transition-all duration-300 ${open ? "-rotate-45" : "translate-y-[3px] group-hover:translate-y-[4px]"}`} />
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
                      <span className="label text-gold">0{i + 1}</span>{l.label}
                    </motion.a>
                  </li>))}
              </ul>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <a href="#reservieren" onClick={() => setOpen(false)} className="label inline-flex min-h-12 w-full items-center justify-center bg-gold px-7 text-ink">Tisch reservieren</a>
                <address className="label not-italic leading-loose text-bone/75">{business.address.street}<br />{business.address.zip} {business.address.city}</address>
                <a href={call} className="label inline-flex min-h-12 items-center gap-2 border border-bone/40 px-7 text-bone">Anrufen <ArrowUpRight size={14} /></a>
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

      <div className="fixed inset-x-0 bottom-0 z-[60] grid grid-cols-2 border-t border-bone/15 bg-ink/90 backdrop-blur-xl md:hidden">
        <a href="#reservieren" className="label grid min-h-14 place-items-center bg-gold text-ink">Tisch reservieren</a>
        <a href={call} className="label flex min-h-14 items-center justify-center gap-2 text-bone"><Phone size={14} /> Anrufen</a>
      </div>
    </>
  );
}

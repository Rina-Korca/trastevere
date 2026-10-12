"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Phone, ArrowUpRight } from "lucide-react";
import { business, hasPhone } from "@/lib/business-info";

const links = [
  { id: "start", label: "Start" },
  { id: "geschichte", label: "Geschichte" },
  { id: "speisekarte", label: "Speisekarte" },
  { id: "galerie", label: "Galerie" },
  { id: "teilen", label: "Teilen" },
  { id: "besuch", label: "Besuch" },
];

export default function Navbar() {
  const [active, setActive] = useState("start");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(l => { const el = document.getElementById(l.id); if (el) io.observe(el); });
    const onS = () => setScrolled(window.scrollY > 80);
    onS(); window.addEventListener("scroll", onS, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onS); };
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const call = hasPhone ? `tel:${business.phone.tel}` : "#besuch";

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-clay" />
      <header className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-5 py-4 md:px-10 md:py-6">
        <a href="#start" className="display relative z-[70] text-3xl italic text-bone mix-blend-difference">{business.name}</a>

        <nav aria-label="Hauptnavigation" className={`hidden rounded-full border px-2 py-1.5 backdrop-blur-xl transition-all duration-500 md:block ${scrolled ? "border-bone/15 bg-ink/70" : "border-bone/20 bg-bone/10"}`}>
          <ul className="flex">
            {links.map(l => (
              <li key={l.id} className="relative">
                <a href={`#${l.id}`} className={`label relative z-10 block px-4 py-2.5 transition-colors ${active === l.id ? "text-ink" : "text-bone/80 hover:text-bone"}`}>{l.label}</a>
                {active === l.id && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-bone" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-[70] flex items-center gap-3">
          <a href={call} className="group label hidden items-center gap-2 rounded-full bg-clay px-5 py-3 text-bone transition hover:bg-bone hover:text-ink md:flex">
            <Phone size={14} /> Anrufen <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button aria-label={open ? "Menü schließen" : "Menü öffnen"} aria-expanded={open} onClick={() => setOpen(o => !o)} className="grid h-11 w-11 place-items-center rounded-full border border-bone/30 bg-ink/40 backdrop-blur md:hidden">
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-px w-5 bg-bone transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-5 bg-bone transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-[65] flex flex-col justify-between bg-ink px-6 pb-8 pt-28 text-bone md:hidden">
            <ul>
              {links.map((l, i) => (
                <li key={l.id} className="overflow-hidden border-b border-bone/10">
                  <motion.a href={`#${l.id}`} onClick={() => setOpen(false)} initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.3 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="display flex items-baseline justify-between py-3 text-5xl"><span>{l.label}</span><span className="label text-bone/40">0{i + 1}</span></motion.a>
                </li>
              ))}
            </ul>
            <div>
              <p className="label text-bone/60">{business.address.street}, {business.address.city}</p>
              <a href={call} className="label mt-4 flex items-center justify-center gap-2 rounded-full bg-clay py-4"><Phone size={14} /> Anrufen</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <a href={call} aria-label="Anrufen" className="fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-clay text-bone shadow-2xl md:hidden"><Phone size={20} /></a>
    </>
  );
}

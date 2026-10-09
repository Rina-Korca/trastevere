"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Phone, Menu, X, MapPin } from "lucide-react";
import { business, hasPhone } from "@/lib/business-info";

const links = [
  { id: "start", label: "Start" },
  { id: "geschichte", label: "Amore" },
  { id: "speisekarte", label: "Speisekarte" },
  { id: "stimmung", label: "Stimmung" },
  { id: "besuch", label: "Besuch" },
];

export default function Navbar() {
  const [active, setActive] = useState("start");
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach(l => { const el = document.getElementById(l.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const call = hasPhone ? `tel:${business.phone.tel}` : "#besuch";

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-terracotta" />
      {/* Floating pill island */}
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav aria-label="Hauptnavigation" className="flex items-center gap-1 rounded-full border border-espresso/15 bg-travertine/70 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,.12)] backdrop-blur-xl">
          <a href="#start" className="px-4 font-display text-lg font-semibold italic">{business.name}</a>
          <ul className="hidden items-center md:flex">
            {links.map(l => (
              <li key={l.id} className="relative">
                <a href={`#${l.id}`} className="relative z-10 block px-4 py-2 text-sm font-medium">{l.label}</a>
                {active === l.id && (
                  <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-butter" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
              </li>
            ))}
          </ul>
          <a href={call} className="ml-1 hidden items-center gap-2 rounded-full bg-espresso px-4 py-2 text-sm font-medium text-travertine transition hover:bg-terracotta md:flex">
            <Phone size={15} /> Anrufen
          </a>
          <button aria-label="Menü" aria-expanded={open} onClick={() => setOpen(o => !o)} className="ml-1 grid h-10 w-10 place-items-center rounded-full bg-espresso text-travertine md:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen sheet */}
      <motion.div
        initial={false}
        animate={{ clipPath: open ? "circle(150% at 90% 5%)" : "circle(0% at 90% 5%)" }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-40 flex flex-col justify-center bg-terracotta px-8 text-travertine md:hidden"
        aria-hidden={!open}
        inert={!open}
      >
        {links.map((l, i) => (
          <motion.a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}
            animate={{ y: open ? 0 : 40, opacity: open ? 1 : 0 }} transition={{ delay: open ? 0.25 + i * 0.07 : 0 }}
            className="font-display text-5xl font-semibold leading-tight">{l.label}</motion.a>
        ))}
        <p className="mt-8 flex items-center gap-2 text-sm"><MapPin size={16} /> {business.address.street}, {business.address.city}</p>
      </motion.div>

      {/* Mobile bottom call bar */}
      <a href={call} className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-terracotta text-travertine shadow-xl md:hidden" aria-label="Anrufen">
        <Phone />
      </a>
    </>
  );
}

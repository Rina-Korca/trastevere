"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone } from "lucide-react";
import { business, hasPhone } from "@/lib/business-info";
export default function Takeaway() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "center 0.5"] });
  const lid = useTransform(scrollYProgress, [0, 1], [0, -115]);
  return (
    <section ref={ref} className="mx-auto max-w-5xl px-5 py-28">
      <div className="grid items-center gap-10 rounded-[2.5rem] bg-rosato p-8 md:grid-cols-2 md:p-14">
        <div style={{ perspective: 800 }} className="relative mx-auto h-56 w-64" aria-hidden>
          <div className="absolute bottom-0 h-36 w-full rounded-b-3xl bg-terracotta [background-image:repeating-linear-gradient(45deg,transparent_0_14px,rgba(255,255,255,.15)_14px_28px)]"><span className="absolute inset-0 grid place-items-center text-6xl">🍕</span></div>
          <motion.div style={{ rotateX: lid, transformOrigin: "top" }} className="absolute top-12 h-14 w-full rounded-t-3xl bg-butter" />
        </div>
        <div>
          <h2 className="font-display text-5xl font-semibold md:text-6xl">Zum <span className="italic text-terracotta">Mitnehmen</span></h2>
          <p className="mt-4 text-lg">Gern auch zum Mitnehmen: einfach anrufen unter <strong className="font-mono">{business.phone.display}</strong>. Kein Warenkorb, kein Formular.</p>
          <a href={hasPhone ? `tel:${business.phone.tel}` : "#besuch"} className="mt-6 inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-4 font-medium text-travertine transition hover:bg-terracotta"><Phone size={18} /> Anrufen</a>
        </div>
      </div>
    </section>
  );
}

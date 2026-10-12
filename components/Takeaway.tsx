"use client";
import Image from "next/image";
import { Phone } from "lucide-react";
import { business, hasPhone } from "@/lib/business-info";
import Reveal, { Headline } from "./Reveal";
import Magnetic from "./Magnetic";
export default function Takeaway() {
  return (
    <section className="bg-bone px-5 pb-32 md:px-10 md:pb-44">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-olive text-bone md:grid-cols-2">
        <div className="p-8 md:p-16">
          <p className="label mb-6 text-bone/70">— Zum Mitnehmen</p>
          <Headline className="text-6xl md:text-8xl" lines={["Gern auch", <em key="a">to go.</em>]} />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-lg text-bone/90">Einfach anrufen unter <span className="font-mono">{business.phone.display}</span>. Kein Warenkorb, kein Formular – nur ein kurzes Gespräch.</p>
            <div className="mt-8"><Magnetic><a href={hasPhone ? `tel:${business.phone.tel}` : "#besuch"} className="label inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 transition hover:bg-bone hover:text-ink"><Phone size={14} /> Anrufen</a></Magnetic></div>
          </Reveal>
        </div>
        <div className="relative min-h-80"><Image src="/images/pizza-3.jpg" alt="Pizza zum Mitnehmen" fill sizes="50vw" className="object-cover" /></div>
      </div>
    </section>
  );
}

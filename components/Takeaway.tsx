"use client";
import Image from "next/image";
import { Phone } from "lucide-react";
import { business, hasPhone } from "@/lib/business-info";
import FlagLine from "./FlagLine";
import { Headline } from "./Reveal";
import Magnetic from "./Magnetic";

const steps = [
  { n: "01", t: "Anrufen", d: "Ruf uns an und sag, worauf du Lust hast." },
  { n: "02", t: "Besprechen", d: "Wir klären gemeinsam Auswahl und Abholzeit." },
  { n: "03", t: "Abholen", d: "Dein Essen wartet, frisch und gut verpackt." },
];

export default function Takeaway() {
  return (
    <section id="mitnehmen" className="relative overflow-hidden bg-ink text-bone">
      <Image src="/images/pizza-3.jpg" alt="Pizza zum Mitnehmen" fill sizes="100vw" className="object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <p className="label mb-6 text-gold">— Zum Mitnehmen</p>
        <Headline className="text-5xl md:text-8xl" lines={["Gern auch", <em key="a" className="text-gold">to go.</em>]} />
        <FlagLine className="mt-8 w-20" />
        <p className="mt-8 max-w-xl leading-relaxed text-bone/80">
          Du hast keine Zeit zu bleiben? Kein Problem: einfach anrufen unter <span className="whitespace-nowrap font-medium text-bone">{business.phone.display}</span> – ohne Warenkorb, ohne Formular, nur ein kurzes Gespräch.
        </p>
        <ol className="mt-12 grid max-w-4xl gap-0 border-t border-bone/20 md:grid-cols-3">
          {steps.map(s => (
            <li key={s.n} className="border-b border-bone/20 py-6 md:border-b-0 md:border-r md:px-6 md:last:border-r-0 md:first:pl-0">
              <span className="label text-gold">{s.n}</span>
              <p className="display mt-3 text-3xl">{s.t}</p>
              <p className="mt-2 text-bone/75">{s.d}</p>
            </li>))}
        </ol>
        <div className="mt-10">
          <Magnetic><a href={hasPhone ? `tel:${business.phone.tel}` : "#besuch"} className="label inline-flex min-h-14 items-center gap-2 bg-gold px-8 text-ink transition hover:bg-bone"><Phone size={14} /> Jetzt anrufen</a></Magnetic>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useState } from "react";
import { MapPin, Phone } from "lucide-react";
import { business, hasPhone, hours, hoursVerified } from "@/lib/business-info";
import Reveal from "./Reveal";

export default function Visit() {
  const [today, setToday] = useState(-1);
  useEffect(() => { setToday((new Date().getDay() + 6) % 7); }, []);
  return (
    <section id="besuch" className="mx-auto grid max-w-6xl gap-10 px-5 py-28 md:grid-cols-2">
      <Reveal>
        <h2 className="font-display text-5xl font-semibold md:text-7xl">Besuch <span className="italic text-terracotta">uns</span></h2>
        <p className="mt-4 flex items-start gap-2"><MapPin className="mt-1 shrink-0" size={18} />{business.address.street}, {business.address.zip} {business.address.city}</p>
        <p className="mt-2 flex items-center gap-2"><Phone size={18} />{business.phone.display}</p>
        <table className="mt-8 w-full font-mono text-sm"><caption className="sr-only">Öffnungszeiten</caption>
          <tbody>{hours.map((h, i) => (
            <tr key={h.day} className={`border-b border-espresso/15 ${i === today ? "bg-butter font-medium" : ""}`}>
              <th scope="row" className="px-2 py-2 text-left font-medium">{h.day}</th>
              <td className="px-2 py-2 text-right">{h.slots.map(s => s.join("–")).join(" & ")}</td>
            </tr>))}</tbody></table>
        {!hoursVerified && <p className="mt-2 font-mono text-xs text-terracotta">Beispiel-Zeiten – bitte mit Google Maps abgleichen.</p>}
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-terracotta px-6 py-3 font-medium text-travertine">Route planen</a>
          <a href={hasPhone ? `tel:${business.phone.tel}` : business.mapsUrl} className="rounded-full border-2 border-espresso px-6 py-3 font-medium">Anrufen</a>
        </div>
      </Reveal>
      <Reveal delay={0.15} className="min-h-96 overflow-hidden rounded-[2rem] border-4 border-espresso">
        <iframe title="Karte" loading="lazy" className="h-full min-h-96 w-full"
          src={`https://maps.google.com/maps?q=${business.lat},${business.lng}&z=16&output=embed`} />
      </Reveal>
    </section>
  );
}

"use client";
import { useEffect, useState } from "react";
import { MapPin, Phone } from "lucide-react";
import { business, hasPhone, hours, hoursVerified } from "@/lib/business-info";
import Reveal, { Headline } from "./Reveal";

export default function Visit() {
  const [today, setToday] = useState(-1);
  useEffect(() => { setToday((new Date().getDay() + 6) % 7); }, []);
  return (
    <section id="besuch" className="bg-bone px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="label mb-6 text-clay">— Besuch</p>
        <Headline className="text-6xl md:text-9xl" lines={["Komm", <em key="a" className="text-clay">vorbei.</em>]} />
        <p className="mt-8 max-w-2xl text-lg text-ink/70">Wir freuen uns auf dich. Alle Infos zum Weg und zu den Öffnungszeiten findest du hier. Für Fragen, Wünsche oder Bestellungen zum Mitnehmen ruf uns einfach an – ein kurzes Gespräch genügt.</p>
        <div className="mt-10 grid gap-12 md:grid-cols-2">
          <Reveal>
            <p className="flex items-start gap-3 text-lg"><MapPin className="mt-1 shrink-0 text-clay" size={18} />{business.address.street}, {business.address.zip} {business.address.city}</p>
            <p className="mt-3 flex items-center gap-3 text-lg"><Phone className="shrink-0 text-clay" size={18} />{business.phone.display}</p>
            <table className="mt-10 w-full font-mono text-sm"><caption className="sr-only">Öffnungszeiten</caption>
              <tbody>{hours.map((h, i) => (
                <tr key={h.day} className={`border-t border-ink/15 ${i === today ? "bg-ink text-bone" : ""}`}>
                  <th scope="row" className="px-3 py-3 text-left font-medium">{h.day}</th>
                  <td className="px-3 py-3 text-right">{h.slots.map(s => s.join("–")).join(" & ")}</td></tr>))}</tbody></table>
            {!hoursVerified && <p className="label mt-3 text-clay">Beispiel-Zeiten · bitte mit Google Maps abgleichen</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="label rounded-full bg-clay px-7 py-4 text-bone transition hover:bg-ink">Route planen</a>
              <a href={hasPhone ? `tel:${business.phone.tel}` : business.mapsUrl} className="label rounded-full border border-ink px-7 py-4 transition hover:bg-ink hover:text-bone">Anrufen</a>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="min-h-[28rem] overflow-hidden rounded-2xl">
            <iframe title="Karte" loading="lazy" className="h-full min-h-[28rem] w-full grayscale contrast-110 sepia-[.25]" src={`https://maps.google.com/maps?q=${business.lat},${business.lng}&z=16&output=embed`} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

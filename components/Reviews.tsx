"use client";
import { Star } from "lucide-react";
import { business } from "@/lib/business-info";
import Reveal, { Headline } from "./Reveal";
export default function Reviews() {
  return (
    <section className="bg-bone px-5 py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-7xl">
        <p className="label mb-6 text-clay">— Stimmen der Gäste</p>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Headline className="text-6xl md:text-9xl" lines={["Gut", <em key="a" className="text-clay">besucht.</em>]} />
          <Reveal>
            <p className="display text-7xl md:text-9xl">{business.rating ? business.rating.value : "[ – ]"}<Star className="ml-2 inline fill-clay text-clay" size={40} /></p>
            <p className="label mt-2 text-ink/60">{business.rating ? `${business.rating.count} Google-Bewertungen` : "Bewertung aus Google Maps ergänzen"}</p>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map(i => (
            <Reveal key={i} delay={i * 0.1}>
              <figure className="flex h-full flex-col justify-between rounded-2xl border border-ink/15 bg-paper p-8">
                <div><span className="label rounded-full bg-clay px-3 py-1 text-bone">Beispiel – bitte ersetzen</span>
                  <blockquote className="display mt-8 text-3xl italic leading-tight">„[Echte Google-Bewertung hier einfügen]“</blockquote></div>
                <figcaption className="label mt-8 text-ink/50">[Autor:in]</figcaption>
              </figure>
            </Reveal>))}
        </div>
        <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="label mt-10 inline-block border-b border-ink pb-1 hover:text-clay">Auf Google ansehen ↗</a>
      </div>
    </section>
  );
}

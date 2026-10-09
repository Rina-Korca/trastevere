import { business } from "@/lib/business-info";
export default function Reviews() {
  return (
    <section className="bg-olive px-5 py-28 text-travertine">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-5xl font-semibold md:text-7xl">Stimmen <span className="italic text-butter">der Gäste</span></h2>
        <p className="mt-3 font-mono text-sm">{business.rating ? `${business.rating.value} ★ · ${business.rating.count} Bewertungen` : "[Bewertung & Anzahl aus Google Maps ergänzen]"}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map(i => (
            <figure key={i} className="rounded-3xl bg-travertine p-6 text-espresso" style={{ transform: `rotate(${(i - 2) * 1.5}deg)` }}>
              <span className="rounded-full bg-butter px-3 py-1 font-mono text-xs">Beispiel – bitte ersetzen</span>
              <blockquote className="mt-4 font-display text-xl italic">[Echte Google-Bewertung einfügen]</blockquote>
              <figcaption className="mt-3 text-sm text-espresso/60">[Autor:in]</figcaption>
            </figure>))}
        </div>
        <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full bg-butter px-6 py-3 font-medium text-espresso">Auf Google ansehen</a>
      </div>
    </section>
  );
}

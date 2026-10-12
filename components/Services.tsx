import { business } from "@/lib/business-info";
import FlagLine from "./FlagLine";
import { Headline } from "./Reveal";

// Editorial list instead of another card grid. Services are PLACEHOLDERS in business-info.ts.
export default function Services() {
  return (
    <section className="bg-moss px-5 py-16 text-bone md:px-10 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="label mb-6 text-gold">— Bei uns</p>
          <Headline className="text-5xl lg:text-7xl" lines={["Alles, was", <em key="a" className="text-gold">dazugehört.</em>]} />
          <FlagLine className="mt-8 w-20" />
          <p className="mt-8 max-w-md text-lg leading-relaxed text-bone/75">Ob zu zweit, mit der ganzen Runde oder spontan nach Feierabend: gemütliche Atmosphäre, italienische Küche und Gastgeber, die sich auf deinen Besuch freuen.</p>
        </div>
        <ol className="md:col-span-7">
          {business.services.map((s, i) => (
            <li key={s} className="group flex items-baseline gap-6 border-t border-bone/20 py-5 last:border-b">
              <span className="label w-8 text-gold">0{i + 1}</span>
              <span className="display text-4xl transition-transform duration-500 group-hover:translate-x-3 md:text-6xl">{s}</span>
            </li>))}
          <li className="label pt-4 text-bone/40">Angaben vorläufig · bitte bestätigen</li>
        </ol>
      </div>
    </section>
  );
}

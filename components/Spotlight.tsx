"use client";
import { useRef } from "react";
import { Utensils, ShoppingBag, Sunset, Leaf, Wine } from "lucide-react";
import { business } from "@/lib/business-info";
import { Headline } from "./Reveal";

const icons = [Utensils, ShoppingBag, Sunset, Leaf, Wine];
const notes = ["Am Tisch, mit Zeit", "Einfach anrufen", "Zwei Stimmungen", "Auf Nachfrage", "Zum Anstoßen"];

function Card({ label, note, Icon, i }: { label: string; note: string; Icon: typeof Utensils; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onPointerMove={move} tabIndex={0}
      className={`group relative overflow-hidden rounded-2xl border border-bone/15 bg-coal p-8 outline-offset-4 ${i === 0 ? "md:col-span-2" : ""}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{ background: "radial-gradient(360px circle at var(--mx,50%) var(--my,50%), rgba(192,101,59,.28), transparent 70%)" }} />
      <div className="relative flex h-full min-h-40 flex-col justify-between">
        <Icon size={22} className="text-gold" />
        <div><p className="display text-4xl md:text-5xl">{label}</p><p className="label mt-2 text-bone/50">{note}</p></div>
      </div>
    </div>
  );
}

export default function Spotlight() {
  return (
    <section className="bg-ink px-5 pb-32 text-bone md:px-10 md:pb-44">
      <div className="mx-auto max-w-7xl">
        <p className="label mb-6 text-gold">— Bei uns</p>
        <Headline className="mb-14 text-5xl md:text-8xl" lines={["Alles, was", <em key="a" className="text-gold">dazugehört.</em>]} />
        <div className="grid gap-4 md:grid-cols-3">
          {business.services.slice(0, 5).map((s, i) => <Card key={s} label={s} note={notes[i]} Icon={icons[i]} i={i} />)}
        </div>
        <p className="label mt-4 text-bone/40">Services laut Platzhalter in business-info.ts · bitte bestätigen</p>
      </div>
    </section>
  );
}

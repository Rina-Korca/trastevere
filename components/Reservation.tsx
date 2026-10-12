"use client";
import { useState } from "react";
import { Check, Phone } from "lucide-react";
import { business, hasPhone } from "@/lib/business-info";
import FlagLine from "./FlagLine";
import { Headline } from "./Reveal";

// Set NEXT_PUBLIC_RESERVATION_ENDPOINT to a backend/form service that accepts JSON POST.
// Without it, the form prepares the request and asks the guest to confirm by phone – nothing is sent.
const ENDPOINT = process.env.NEXT_PUBLIC_RESERVATION_ENDPOINT;

type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "prepared"; text: string } | { kind: "error" };

const field = "mt-2 w-full rounded-none border-0 border-b border-bone/30 bg-transparent px-0 py-3 text-bone placeholder:text-bone/30 focus:border-gold focus:outline-none focus:ring-0";

export default function Reservation() {
  const [st, setSt] = useState<State>({ kind: "idle" });
  const today = new Date().toISOString().slice(0, 10);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (!ENDPOINT) {
      setSt({ kind: "prepared", text: `Reservierungsanfrage ${business.name}\n${d.datum} um ${d.zeit} Uhr · ${d.personen} Personen\nName: ${d.name}\nTelefon: ${d.telefon}${d.hinweis ? `\nHinweis: ${d.hinweis}` : ""}` });
      return;
    }
    setSt({ kind: "sending" });
    try {
      const r = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
      setSt(r.ok ? { kind: "sent" } : { kind: "error" });
    } catch { setSt({ kind: "error" }); }
  }

  return (
    <section id="reservieren" className="bg-coal px-5 py-16 text-bone md:px-10 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="label mb-6 text-gold">— Reservierung</p>
          <Headline className="text-5xl md:text-7xl" lines={["Ein Tisch", <em key="a" className="text-gold">für euch.</em>]} />
          <FlagLine className="mt-8 w-20" />
          <p className="mt-8 max-w-md text-lg leading-relaxed text-bone/70">Sag uns, wann ihr kommen möchtet und wie viele ihr seid. Wir melden uns, um alles zu bestätigen. Für kurzfristige Wünsche erreichst du uns auch direkt per Telefon.</p>
          <p className="mt-6 flex items-center gap-3 text-bone/80"><Phone size={16} className="text-gold" />{business.phone.display}</p>
        </div>

        <div className="md:col-span-7">
          {st.kind === "sent" || st.kind === "prepared" ? (
            <div role="status" className="border border-gold/40 p-8 md:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gold text-ink"><Check size={22} /></span>
              {st.kind === "sent" ? (
                <><h3 className="display mt-6 text-4xl">Danke – deine Anfrage ist da.</h3><p className="mt-3 text-bone/70">Wir melden uns bei dir, um die Reservierung zu bestätigen.</p></>
              ) : (
                <>
                  <h3 className="display mt-6 text-4xl">Fast geschafft.</h3>
                  <p className="mt-3 text-bone/70">Deine Anfrage ist noch nicht verschickt. Bitte bestätige sie kurz telefonisch, dann ist der Tisch gesichert.</p>
                  <pre className="mt-6 whitespace-pre-wrap border-l-2 border-gold/50 pl-4 text-sm text-bone/70">{st.text}</pre>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href={hasPhone ? `tel:${business.phone.tel}` : "#besuch"} className="label inline-flex min-h-12 items-center gap-2 bg-gold px-7 text-ink transition hover:bg-bone"><Phone size={14} /> Jetzt anrufen</a>
                    <button type="button" onClick={() => navigator.clipboard?.writeText(st.text)} className="label min-h-12 border border-bone/30 px-7 transition hover:bg-bone hover:text-ink">Anfrage kopieren</button>
                  </div>
                </>)}
              <button type="button" onClick={() => setSt({ kind: "idle" })} className="label mt-8 text-bone/50 underline underline-offset-4 hover:text-bone">Neue Anfrage</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <label className="label text-bone/60">Name<input name="name" required autoComplete="name" className={field} placeholder="Vor- und Nachname" /></label>
              <label className="label text-bone/60">Telefon<input name="telefon" required type="tel" autoComplete="tel" className={field} placeholder="Für Rückfragen" /></label>
              <label className="label text-bone/60">Datum<input name="datum" required type="date" min={today} className={`${field} [color-scheme:dark]`} /></label>
              <label className="label text-bone/60">Uhrzeit<input name="zeit" required type="time" className={`${field} [color-scheme:dark]`} /></label>
              <label className="label text-bone/60 sm:col-span-2">Personen
                <select name="personen" defaultValue="2" className={`${field} [color-scheme:dark]`}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(n => <option key={n} value={n} className="bg-coal">{n} {n === 1 ? "Person" : "Personen"}</option>)}
                </select></label>
              <label className="label text-bone/60 sm:col-span-2">Hinweis (optional)<textarea name="hinweis" rows={3} className={field} placeholder="Allergien, Anlass, Kinderstuhl …" /></label>
              {st.kind === "error" && <p role="alert" className="sm:col-span-2 text-[#e08a87]">Das hat leider nicht geklappt. Bitte ruf uns kurz an.</p>}
              <div className="sm:col-span-2">
                <button disabled={st.kind === "sending"} className="label inline-flex min-h-14 items-center bg-gold px-10 text-ink transition hover:bg-bone disabled:opacity-60">{st.kind === "sending" ? "Wird gesendet …" : "Tisch anfragen"}</button>
              </div>
            </form>)}
        </div>
      </div>
    </section>
  );
}

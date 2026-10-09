"use client";
import { useEffect, useState } from "react";
import { hours, hoursVerified } from "@/lib/business-info";

const toMin = (t: string) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };

export function useStatus() {
  const [s, setS] = useState<string | null>(null);
  useEffect(() => {
    const calc = () => {
      const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Berlin", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
      const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.find(p => p.type === "weekday")!.value);
      const now = Number(parts.find(p => p.type === "hour")!.value) * 60 + Number(parts.find(p => p.type === "minute")!.value);
      const slots = hours[(wd + 6) % 7].slots;
      const open = slots.find(([a, b]) => now >= toMin(a) && now < toMin(b));
      if (open) return `Jetzt geöffnet bis ${open[1]}`;
      const next = slots.find(([a]) => now < toMin(a));
      return next ? `Öffnet um ${next[0]}` : "Heute geschlossen";
    };
    setS(hoursVerified ? calc() : "Öffnungszeiten folgen");
  }, []);
  return s;
}

export default function StatusChip() {
  const s = useStatus();
  if (!s) return null;
  const open = s.startsWith("Jetzt");
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-espresso/20 bg-travertine/70 px-4 py-1.5 font-mono text-xs backdrop-blur">
      <span className={`h-2 w-2 rounded-full ${open ? "bg-olive animate-pulse" : "bg-terracotta"}`} />
      {s}
    </span>
  );
}

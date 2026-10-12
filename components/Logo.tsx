// Trastevere mark: a Roman arch holding a "T" and a rising sun/plate.
export function LogoMark({ className = "h-9 w-9", accent = "var(--clay)" }: { className?: string; accent?: string }) {
  return (
    <svg viewBox="0 0 48 64" className={className} fill="none" aria-hidden>
      <path d="M5 61V26a19 19 0 0 1 38 0v35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 61V26a12 12 0 0 1 24 0v35" stroke="currentColor" strokeWidth="1" strokeOpacity=".45" />
      <circle cx="24" cy="21" r="4" fill={accent} />
      <path d="M15 31h18M24 31v26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M2 61h44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="display text-3xl italic md:text-4xl">Trastevere</span>
        <span className="label mt-1 text-[0.6rem] opacity-60">Cucina Italiana</span>
      </span>
    </span>
  );
}

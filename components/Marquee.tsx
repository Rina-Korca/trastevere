const words = ["Pasta", "Pizza", "Antipasti", "Dolci", "Vino", "Salute!", "Aperitivo", "Amici"];
export default function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="marquee -rotate-2 overflow-hidden bg-terracotta py-4 text-travertine" tabIndex={0} aria-label="Pasta, Pizza, Antipasti, Dolci, Vino">
      <div className="marquee-track flex w-max gap-8 font-display text-4xl italic md:text-6xl" aria-hidden>
        {[...row, ...row].map((w, i) => <span key={i} className="flex items-center gap-8">{w}<span className="text-butter">✺</span></span>)}
      </div>
    </div>
  );
}

import { business } from "@/lib/business-info";
export default function Footer() {
  return (
    <footer className="overflow-hidden bg-terracotta px-5 pb-10 pt-20 text-travertine">
      <p className="font-display text-[clamp(3rem,13vw,11rem)] font-semibold leading-none [-webkit-text-stroke:2px_var(--travertine)] text-transparent">Grazie, amici!</p>
      <div className="mt-10 flex flex-wrap justify-between gap-6 text-sm">
        <address className="not-italic">{business.name}<br />{business.address.street}<br />{business.address.zip} {business.address.city}<br />{business.phone.display}</address>
        <nav className="flex gap-4" aria-label="Footer"><a href="#start">Nach oben ↑</a><a href="#">Impressum</a><a href="#">Datenschutz</a></nav>
      </div>
    </footer>
  );
}

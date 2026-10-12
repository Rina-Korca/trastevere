import { business } from "@/lib/business-info";
import Logo from "./Logo";
import FlagLine from "./FlagLine";
export default function Footer() {
  return (
    <footer className="overflow-hidden bg-ink px-5 pb-24 md:pb-8 pt-14 text-bone md:px-10">
      <p className="display text-center text-[clamp(3.5rem,14vw,14rem)] leading-[.9]"><span className="outline-text">Grazie,</span> <em className="text-gold">amici!</em></p>
      <FlagLine className="mx-auto mt-10 w-24" />
      <div className="label mt-10 flex flex-wrap justify-between gap-8 border-t border-bone/20 pt-8 text-bone/80">
        <div className="flex flex-col gap-6 text-bone"><Logo className="h-14 md:h-16" /><address className="not-italic leading-loose">{business.name}<br />{business.address.street}<br />{business.address.zip} {business.address.city}<br />{business.phone.display}</address></div>
        <nav aria-label="Footer" className="flex flex-col gap-2"><a href="#start" className="py-2 hover:text-bone">Nach oben ↑</a><a href="#" className="py-2 hover:text-bone">Impressum</a><a href="#" className="py-2 hover:text-bone">Datenschutz</a></nav>
      </div>
    </footer>
  );
}

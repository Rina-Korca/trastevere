import { business } from "@/lib/business-info";
export default function Footer() {
  return (
    <footer className="overflow-hidden bg-ink px-5 pb-8 pt-14 text-bone md:px-10">
      <p className="display text-center text-[clamp(4rem,19vw,22rem)] leading-[.8]"><span className="outline-text">Grazie,</span> <em>amici!</em></p>
      <div className="label mt-10 flex flex-wrap justify-between gap-8 border-t border-bone/20 pt-8 text-bone/70">
        <address className="not-italic leading-loose">{business.name}<br />{business.address.street}<br />{business.address.zip} {business.address.city}<br />{business.phone.display}</address>
        <nav aria-label="Footer" className="flex flex-col gap-2"><a href="#start" className="hover:text-bone">Nach oben ↑</a><a href="#" className="hover:text-bone">Impressum</a><a href="#" className="hover:text-bone">Datenschutz</a></nav>
      </div>
    </footer>
  );
}

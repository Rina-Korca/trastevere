import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Story from "@/components/Story";
import Menu from "@/components/Menu";
import Mood from "@/components/Mood";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Visit from "@/components/Visit";
import Footer from "@/components/Footer";
import { business } from "@/lib/business-info";

export default function Home() {
  const ld = { "@context": "https://schema.org", "@type": "Restaurant", name: business.name, servesCuisine: "Italian",
    address: { "@type": "PostalAddress", addressLocality: business.address.city, addressCountry: "DE" },
    geo: { "@type": "GeoCoordinates", latitude: business.lat, longitude: business.lng }, hasMap: business.mapsUrl };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Navbar />
      <main>
        <Hero /><Marquee /><Story /><Menu /><Mood /><Reviews /><FAQ /><Visit />
      </main>
      <Footer />
    </>
  );
}

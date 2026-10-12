import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Story from "@/components/Story";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import Sharing from "@/components/Sharing";
import DayNight from "@/components/DayNight";
import Mood from "@/components/Mood";
import Takeaway from "@/components/Takeaway";
import Evening from "@/components/Evening";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Visit from "@/components/Visit";
import Spotlight from "@/components/Spotlight";
import CardStack from "@/components/CardStack";
import PhotoStack from "@/components/PhotoStack";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Intro from "@/components/Intro";
import { business } from "@/lib/business-info";

export default function Home() {
  const ld = { "@context": "https://schema.org", "@type": "Restaurant", name: business.name, servesCuisine: "Italian",
    address: { "@type": "PostalAddress", addressLocality: business.address.city, addressCountry: "DE" },
    geo: { "@type": "GeoCoordinates", latitude: business.lat, longitude: business.lng }, hasMap: business.mapsUrl };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Intro /><Cursor /><Navbar />
      <main>
        <Hero /><Marquee /><Story /><Spotlight /><Menu /><CardStack /><Gallery /><Sharing /><Evening /><DayNight /><Mood /><Takeaway /><PhotoStack /><Reviews /><FAQ /><Visit />
      </main>
      <Footer />
    </>
  );
}

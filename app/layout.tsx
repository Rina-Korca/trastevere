import type { Metadata } from "next";
import { Instrument_Serif, Inter, DM_Mono } from "next/font/google";
import "./globals.css";
import { business } from "@/lib/business-info";

const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const dmmono = DM_Mono({ variable: "--font-dmmono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: `${business.name} – Italienisches Restaurant in ${business.address.city}`,
  description: `${business.name}: italienische Küche, Pizza, Pasta und Wein in ${business.address.city}. Anrufen, Route planen, Speisekarte ansehen.`,
  openGraph: { title: business.name, description: business.tagline, locale: "de_DE", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${instrument.variable} ${inter.variable} ${dmmono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

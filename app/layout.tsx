import type { Metadata } from "next";
import { Fraunces, Bricolage_Grotesque, DM_Mono } from "next/font/google";
import "./globals.css";
import { business } from "@/lib/business-info";

const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], style: ["normal", "italic"], axes: ["SOFT", "opsz"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const dmmono = DM_Mono({ variable: "--font-dmmono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: `${business.name} – Italienisches Restaurant in ${business.address.city}`,
  description: `${business.name}: italienische Küche, Pizza, Pasta und Wein in ${business.address.city}. Anrufen, Route planen, Speisekarte ansehen.`,
  openGraph: { title: business.name, description: business.tagline, locale: "de_DE", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${fraunces.variable} ${bricolage.variable} ${dmmono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

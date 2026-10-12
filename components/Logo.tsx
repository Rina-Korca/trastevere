import Image from "next/image";
import { business } from "@/lib/business-info";

// Uses the client's real logo (public/images/logo-full.png, champagne on transparent).
export default function Logo({ className = "h-12 md:h-14", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image src="/images/logo-full.png" alt={`${business.name} – Ristorante · Pizzeria · Cucina Italiana`} width={1400} height={314}
      priority={priority} className={`w-auto ${className}`} />
  );
}

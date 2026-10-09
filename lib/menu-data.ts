// EXAMPLE dishes only – replace with the real Speisekarte. Prices intentionally omitted.
export type Dish = { name: string; desc: string; veg?: boolean };
export const menu: Record<string, Dish[]> = {
  Antipasti: [
    { name: "Bruschetta (Beispiel)", desc: "Geröstetes Brot, Tomaten, Basilikum", veg: true },
    { name: "Antipasti-Platte (Beispiel)", desc: "Auswahl zum Teilen" },
    { name: "Caprese (Beispiel)", desc: "Tomate, Mozzarella, Basilikum", veg: true },
  ],
  Pizza: [
    { name: "Margherita (Beispiel)", desc: "Tomate, Mozzarella, Basilikum", veg: true },
    { name: "Diavola (Beispiel)", desc: "Scharfe Salami, Tomate, Mozzarella" },
    { name: "Quattro Formaggi (Beispiel)", desc: "Vier Käsesorten", veg: true },
  ],
  Pasta: [
    { name: "Cacio e Pepe (Beispiel)", desc: "Pecorino, schwarzer Pfeffer", veg: true },
    { name: "Carbonara (Beispiel)", desc: "Ei, Pecorino, Guanciale" },
    { name: "Amatriciana (Beispiel)", desc: "Tomate, Guanciale, Pecorino" },
  ],
  Dolci: [
    { name: "Tiramisù (Beispiel)", desc: "Mascarpone, Espresso, Kakao", veg: true },
    { name: "Panna Cotta (Beispiel)", desc: "Mit Fruchtsauce", veg: true },
  ],
  Getränke: [
    { name: "Vino (Beispiel)", desc: "Rot, Weiß & Rosé" },
    { name: "Aperitivo (Beispiel)", desc: "Zum Start in den Abend" },
    { name: "Espresso (Beispiel)", desc: "Zum Abschluss", veg: true },
  ],
};

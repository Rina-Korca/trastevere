// EXAMPLE dishes only – replace with the real Speisekarte. Prices intentionally omitted.
export type Dish = { name: string; desc: string; veg?: boolean; img: string };
export const menu: Record<string, Dish[]> = {
  Antipasti: [
    { name: "Bruschetta", desc: "Geröstetes Brot, Tomaten, Basilikum", veg: true, img: "/images/dinner.jpg" },
    { name: "Antipasti-Platte", desc: "Auswahl zum Teilen", img: "/images/friends.jpg" },
    { name: "Caprese", desc: "Tomate, Mozzarella, Basilikum", veg: true, img: "/images/dinner.jpg" },
  ],
  Pizza: [
    { name: "Margherita", desc: "Tomate, Mozzarella, Basilikum", veg: true, img: "/images/pizza-2.jpg" },
    { name: "Diavola", desc: "Scharfe Salami, Tomate, Mozzarella", img: "/images/pizza-1.jpg" },
    { name: "Quattro Formaggi", desc: "Vier Käsesorten", veg: true, img: "/images/pizza-3.jpg" },
  ],
  Pasta: [
    { name: "Cacio e Pepe", desc: "Pecorino, schwarzer Pfeffer", veg: true, img: "/images/penne.jpg" },
    { name: "Carbonara", desc: "Ei, Pecorino, Guanciale", img: "/images/pasta.jpg" },
    { name: "Amatriciana", desc: "Tomate, Guanciale, Pecorino", img: "/images/penne.jpg" },
  ],
  Dolci: [
    { name: "Tiramisù", desc: "Mascarpone, Espresso, Kakao", veg: true, img: "/images/dolci.jpg" },
    { name: "Panna Cotta", desc: "Mit Fruchtsauce", veg: true, img: "/images/dolci.jpg" },
  ],
  Getränke: [
    { name: "Vino", desc: "Rot, Weiß & Rosé", img: "/images/dinner.jpg" },
    { name: "Aperitivo", desc: "Zum Start in den Abend", img: "/images/friends.jpg" },
    { name: "Espresso", desc: "Zum Abschluss", veg: true, img: "/images/dolci.jpg" },
  ],
};

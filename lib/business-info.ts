// Single source of truth. Values marked PLACEHOLDER are NOT verified – replace from Google Maps / owner.
export const PLACEHOLDER = (label: string) => `[${label}]`;

export const business = {
  name: "Trastevere",
  tagline: "Roma in der Stadt",
  cuisine: "Italienisch",
  // Coordinates taken from the supplied Google Maps link (not a verified street address).
  lat: 51.2450122,
  lng: 6.7857396,
  mapsUrl:
    "https://www.google.com/maps/place/Trastevere/@51.2450122,6.7857396,2832m/data=!3m1!1e3!4m6!3m5!1s0x47b8c99ebdca464d:0xd2e3a0ef8e11a745!8m2!3d51.2450122!4d6.7857396!16s%2Fg%2F11nvtlcwtc",
  address: {
    street: PLACEHOLDER("Straße & Nr. ergänzen"),
    zip: PLACEHOLDER("PLZ"),
    city: "Düsseldorf", // inferred from map coordinates – please confirm
  },
  phone: { display: PLACEHOLDER("Telefon ergänzen"), tel: "" },
  email: PLACEHOLDER("E-Mail ergänzen"),
  rating: null as null | { value: number; count: number }, // fill in from Google Maps
  priceLevel: PLACEHOLDER("€–€€€"),
  services: ["Vor Ort", "Zum Mitnehmen", "Mittag & Abend", "Vegetarisch", "Wein & Bier"], // PLACEHOLDER – confirm
};

export const hoursVerified = false;

// 0 = Sonntag … 6 = Samstag. Sample values until verified.
export const hours: { day: string; slots: [string, string][] }[] = [
  { day: "Montag", slots: [["17:00", "23:00"]] },
  { day: "Dienstag", slots: [["17:00", "23:00"]] },
  { day: "Mittwoch", slots: [["17:00", "23:00"]] },
  { day: "Donnerstag", slots: [["17:00", "23:00"]] },
  { day: "Freitag", slots: [["17:00", "23:00"]] },
  { day: "Samstag", slots: [["12:00", "14:30"], ["17:00", "23:00"]] },
  { day: "Sonntag", slots: [["12:00", "14:30"], ["17:00", "23:00"]] },
];

export const hasPhone = business.phone.tel !== "";

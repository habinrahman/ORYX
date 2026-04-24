export type Scene =
  | "hero"
  | "about"
  | "destination"
  | "experience"
  | "menu"
  | "gallery"
  | "banquets"
  | "family"
  | "reserve"
  | "proof"
  | "contact";

export const SCENE_SECTIONS: Array<{ id: string; scene: Scene }> = [
  { id: "top", scene: "hero" },
  { id: "about", scene: "about" },
  { id: "destination", scene: "destination" },
  { id: "experiences", scene: "experience" },
  { id: "menu", scene: "menu" },
  { id: "gallery", scene: "gallery" },
  { id: "banquets", scene: "banquets" },
  { id: "family", scene: "family" },
  { id: "reservations", scene: "reserve" },
  { id: "reviews", scene: "proof" },
  { id: "contact", scene: "contact" },
];

export const SCENE_GRADIENT: Record<Scene, string> = {
  hero:
    "radial-gradient(1000px 560px at 22% 0%, color-mix(in oklab, var(--gold) 14%, transparent), transparent 58%), radial-gradient(900px 520px at 88% 8%, rgba(255,255,255,0.05), transparent 58%)",
  about:
    "radial-gradient(980px 540px at 30% 0%, color-mix(in oklab, var(--gold) 11%, transparent), transparent 60%), radial-gradient(820px 500px at 75% 85%, rgba(255,160,90,0.06), transparent 55%)",
  destination:
    "radial-gradient(1020px 560px at 45% 0%, rgba(255,255,255,0.055), transparent 62%), radial-gradient(900px 520px at 12% 88%, color-mix(in oklab, var(--gold) 10%, transparent), transparent 56%)",
  experience:
    "radial-gradient(980px 540px at 70% 0%, rgba(255,255,255,0.05), transparent 60%), radial-gradient(820px 480px at 10% 90%, color-mix(in oklab, var(--gold) 8%, transparent), transparent 55%)",
  menu:
    "radial-gradient(960px 520px at 72% 0%, color-mix(in oklab, var(--gold) 12%, transparent), transparent 60%), radial-gradient(860px 520px at 18% 85%, rgba(255,255,255,0.04), transparent 58%)",
  gallery:
    "radial-gradient(1100px 620px at 28% 0%, rgba(255,255,255,0.06), transparent 62%), radial-gradient(900px 520px at 82% 70%, color-mix(in oklab, var(--gold) 8%, transparent), transparent 58%)",
  banquets:
    "radial-gradient(960px 540px at 40% 0%, rgba(255,120,30,0.08), transparent 62%), radial-gradient(900px 520px at 72% 80%, color-mix(in oklab, var(--gold) 9%, transparent), transparent 58%)",
  family:
    "radial-gradient(940px 520px at 55% 0%, rgba(255,255,255,0.055), transparent 62%), radial-gradient(880px 500px at 20% 90%, color-mix(in oklab, var(--gold) 7%, transparent), transparent 56%)",
  reserve:
    "radial-gradient(920px 540px at 18% 12%, color-mix(in oklab, var(--gold) 16%, transparent), transparent 60%), radial-gradient(900px 520px at 80% 10%, rgba(255,255,255,0.05), transparent 58%)",
  proof:
    "radial-gradient(980px 560px at 50% 0%, rgba(255,255,255,0.045), transparent 62%), radial-gradient(800px 480px at 20% 100%, color-mix(in oklab, var(--gold) 7%, transparent), transparent 55%)",
  contact:
    "radial-gradient(1020px 580px at 58% 0%, color-mix(in oklab, var(--gold) 10%, transparent), transparent 62%), radial-gradient(880px 520px at 30% 95%, rgba(255,255,255,0.035), transparent 58%)",
};

export const ACT_PLAYBILL: Record<
  Scene,
  { roman: string; title: string; line: string }
> = {
  hero: { roman: "I", title: "Arrival", line: "The corridor yields to lamplight and charcoal." },
  about: {
    roman: "II",
    title: "The estate",
    line: "Many rooms, one ledger, a single front door.",
  },
  destination: {
    roman: "III",
    title: "The brief",
    line: "More than a menu—an address worth the miles.",
  },
  experience: {
    roman: "IV",
    title: "The table",
    line: "Sea, coal, spice, pastry—each in its turn.",
  },
  menu: { roman: "V", title: "The spread", line: "Counter, grill, atelier—choose your line." },
  gallery: { roman: "VI", title: "Still life", line: "Glass, smoke, linen—held in frame." },
  banquets: {
    roman: "VII",
    title: "Gatherings",
    line: "Halls measured in hundreds of seats, served with precision.",
  },
  family: {
    roman: "VIII",
    title: "Kin",
    line: "Space for the youngest guest and the eldest toast.",
  },
  reserve: {
    roman: "IX",
    title: "Hold",
    line: "Your hour, your party—confirmed in writing.",
  },
  proof: { roman: "X", title: "Witness", line: "Many voices; one steady score." },
  contact: {
    roman: "XI",
    title: "Wayfinding",
    line: "Coastal road, late light—the door stays lit.",
  },
};

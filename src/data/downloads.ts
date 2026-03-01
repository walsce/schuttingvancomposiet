export type DownloadCategory = "handleiding" | "onderhoud" | "video" | "checklist" | "gids";

export interface DownloadGuide {
  id: string;
  title: string;
  slug: string;
  description: string;
  bulletPoints: string[];
  category: DownloadCategory;
  image: string;
  relatedLinks: { label: string; href: string }[];
  /** Direct PDF path (no email gate) */
  pdfPath?: string;
  /** YouTube video ID for embedded video content */
  videoId?: string;
  /** Related product categories */
  relatedCategory?: "vlonderplanken" | "schuttingen" | "accessoires";
}

export const categoryLabels: Record<DownloadCategory, string> = {
  handleiding: "Montagehandleiding",
  onderhoud: "Onderhoud",
  video: "Video",
  checklist: "Checklist",
  gids: "Gids",
};

export const downloads: DownloadGuide[] = [
  // ─── MONTAGEHANDLEIDINGEN ────────────────────────────────────────────
  {
    id: "handleiding-composiet-schutting",
    title: "Montagehandleiding: composiet schutting plaatsen",
    slug: "montagehandleiding-composiet-schutting",
    description:
      "Volledige stap-voor-stap montagehandleiding voor het plaatsen van Gamrat WPC composiet schuttingen. Inclusief onderdelenlijst en technische specificaties.",
    bulletPoints: [
      "Onderdelenlijst & technische specificaties",
      "Paalplaatsing met voetplaten of betonpoeren",
      "Planken stapelen & insteeksysteem uitgelegd",
      "Windbelasting tot 100 km/u (max. 2000 mm hoogte)",
    ],
    category: "handleiding",
    image: "https://gamratwpc.pl/wp-content/uploads/2025/04/gamrat-wpc-ogrodzenia-2.webp",
    relatedLinks: [
      { label: "Composiet schuttingen bekijken", href: "/categorie/schuttingen" },
    ],
    pdfPath: "/downloads/montagehandleiding-composiet-schutting.pdf",
    relatedCategory: "schuttingen",
  },
  {
    id: "handleiding-vlonderplanken",
    title: "Montagehandleiding: composiet vlonderplanken leggen",
    slug: "montagehandleiding-vlonderplanken",
    description:
      "De complete montagehandleiding voor Gamrat WPC composiet vlonderplanken. Van planning en lay-out tot de laatste afwerking.",
    bulletPoints: [
      "Lay-out berekenen: materiaal per m²",
      "Onderconstructie & balkafstanden (max. 40 cm)",
      "Clips plaatsen & planken monteren",
      "Komorowa, Classic, Premium & Elegance specificaties",
    ],
    category: "handleiding",
    image: "https://gamratwpc.pl/wp-content/uploads/2025/04/gamrat-wpc-systemy-tarasowe-slider-2.webp",
    relatedLinks: [
      { label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" },
    ],
    pdfPath: "/downloads/montagehandleiding-vlonderplanken.pdf",
    relatedCategory: "vlonderplanken",
  },
  {
    id: "handleiding-aluminium-onderbalken",
    title: "Montagehandleiding: aluminium onderbalken voor vlonders",
    slug: "montagehandleiding-aluminium-onderbalken",
    description:
      "Gedetailleerde installatiehandleiding voor aluminium onderbalken. Voor toepassing op plots of rubberstroken.",
    bulletPoints: [
      "Aluminium legger laag: 36,4 × 24 mm (4m)",
      "Aluminium legger hoog: 38 × 51 mm (4m)",
      "Montage op plots & rubberstroken",
      "Verbindingsstukken & hoekbeugels",
    ],
    category: "handleiding",
    image: "https://gamratwpc.pl/wp-content/uploads/2025/04/gamrat-wpc-systemy-tarasowe-slider-1.webp",
    relatedLinks: [
      { label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" },
      { label: "Accessoires bekijken", href: "/categorie/accessoires" },
    ],
    pdfPath: "/downloads/montagehandleiding-aluminium-onderbalken-vlonder.pdf",
    relatedCategory: "accessoires",
  },
  {
    id: "handleiding-vlonder-accessoires",
    title: "Montagehandleiding: vlonder accessoires & afwerking",
    slug: "montagehandleiding-vlonder-accessoires",
    description:
      "Installatiehandleiding voor vlonder accessoires: WPC leggers, aluminium leggers, clips, afwerkingsprofielen en randafwerking.",
    bulletPoints: [
      "WPC legger: 50 × 30 mm (3m)",
      "Verstelbare terrasdragers (25-260 mm)",
      "Afwerkingsprofielen & plintplanken",
      "Montagesets 2m² en 10m²",
    ],
    category: "handleiding",
    image: "https://gamratwpc.pl/wp-content/uploads/2025/04/gamrat-wpc-systemy-tarasowe-slider-3.webp",
    relatedLinks: [
      { label: "Accessoires bekijken", href: "/categorie/accessoires" },
    ],
    pdfPath: "/downloads/montagehandleiding-vlonder-accessoires.pdf",
    relatedCategory: "accessoires",
  },
  {
    id: "snelstartgids-vlonder",
    title: "Snelstartgids: vlonder monteren in 4 m²/uur",
    slug: "snelstartgids-vlonder-montage",
    description:
      "Visuele snelstartgids met de belangrijkste montagestappen voor Gamrat WPC composiet vlonders.",
    bulletPoints: [
      "Overzichtelijke visuele montagestappen",
      "Balkinstallatie & clipmontage",
      "Afwerkingsdetails & randprofielen",
      "Tempo: ca. 4 m² per uur",
    ],
    category: "handleiding",
    image: "https://gamratwpc.pl/wp-content/uploads/2025/04/gamrat-wpc-realizacje-taras-2.webp",
    relatedLinks: [
      { label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" },
    ],
    pdfPath: "/downloads/snelstartgids-vlonder-montage.pdf",
    relatedCategory: "vlonderplanken",
  },

  // ─── CATALOGI & GIDSEN ─────────────────────────────────────────────
  {
    id: "gamrat-catalogus",
    title: "Gamrat WPC Productcatalogus 2026",
    slug: "gamrat-wpc-catalogus",
    description:
      "De complete Gamrat WPC productcatalogus met alle vlonderplanken, schuttingen en accessoires. Inclusief technische specificaties en kleuren.",
    bulletPoints: [
      "7 vlonderplank-lijnen met alle kleurvarianten",
      "Compleet schuttingassortiment",
      "Alle accessoires en montagesets",
      "Technische specificaties per product",
    ],
    category: "gids",
    image: "https://gamratwpc.pl/wp-content/uploads/2025/04/gamrat-wpc-systemy-tarasowe-slider-2.webp",
    relatedLinks: [
      { label: "Bekijk alle producten", href: "/assortiment" },
    ],
    pdfPath: "https://gamratwpc.pl/wp-content/uploads/2025/05/Katalog-Deski-2026-PL-_-podglad.pdf",
  },
  {
    id: "gamrat-prijslijst",
    title: "Gamrat WPC Prijslijst 2026",
    slug: "gamrat-wpc-prijslijst",
    description:
      "Actuele prijslijst voor alle Gamrat WPC producten. Inclusief staffelprijzen en leveringsvoorwaarden.",
    bulletPoints: [
      "Actuele prijzen per product",
      "Staffelprijzen voor grotere projecten",
      "Leveringsvoorwaarden & levertijden",
      "Adviesverkoopprijzen",
    ],
    category: "gids",
    image: "https://gamratwpc.pl/wp-content/uploads/2025/04/gamrat-wpc-realizacje-taras-1.webp",
    relatedLinks: [
      { label: "Contact voor offerte", href: "/contact" },
    ],
    pdfPath: "https://gamratwpc.pl/wp-content/uploads/2026/01/CENNIK-PL-EDYCJA-1.2026-OD-01.2026.pdf",
  },

  // ─── ONDERHOUD ──────────────────────────────────────────────────────
  {
    id: "onderhoud-composiet-vlonder",
    title: "Onderhoudsadvies: Gamrat WPC vlonderplanken",
    slug: "onderhoudsadvies-gamrat-wpc-vlonder",
    description:
      "Officieel onderhoudsadvies voor Gamrat WPC vlonderplanken. Inclusief reinigingsmethoden en seizoensschema.",
    bulletPoints: [
      "Jaarlijkse wasbeurt met warm zeepwater",
      "Reinigingstips per planktype",
      "Groene aanslag verwijderen",
      "Seizoensgebonden onderhoudstips",
    ],
    category: "onderhoud",
    image: "https://gamratwpc.pl/wp-content/uploads/2025/04/gamrat-wpc-realizacje-taras-3.webp",
    relatedLinks: [
      { label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" },
    ],
    relatedCategory: "vlonderplanken",
  },

  // ─── CHECKLISTS ─────────────────────────────────────────────────────
  {
    id: "checklist-schutting-plaatsen",
    title: "Checklist: composiet schutting plaatsen",
    slug: "checklist-schutting-plaatsen",
    description:
      "Stap-voor-stap checklist voor het plaatsen van een Gamrat WPC composiet schutting.",
    bulletPoints: [
      "Benodigd gereedschap & materialen",
      "Grondvoorbereiding & drainage",
      "Paalafstanden & montage-instructies",
      "Veelgemaakte fouten vermijden",
    ],
    category: "checklist",
    image: "https://gamratwpc.pl/wp-content/uploads/2025/04/gamrat-wpc-ogrodzenia-1.webp",
    relatedLinks: [
      { label: "Schuttingen bekijken", href: "/categorie/schuttingen" },
    ],
    relatedCategory: "schuttingen",
  },
  {
    id: "grondvoorbereiding",
    title: "Checklist: grondvoorbereiding voor schuttingen & vlonders",
    slug: "grondvoorbereiding",
    description:
      "De juiste fundering begint bij de grond. Leer alles over grondtypen, drainage en funderingsopties.",
    bulletPoints: [
      "Grondtypen herkennen & beoordelen",
      "Drainage & waterafvoer aanleggen",
      "Betonpoeren vs. paaltjes kiezen",
      "Hellingen & vorstdiepte berekenen",
    ],
    category: "checklist",
    image: "https://gamratwpc.pl/wp-content/uploads/2025/04/gamrat-wpc-systemy-tarasowe-slider-3.webp",
    relatedLinks: [
      { label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" },
    ],
  },
  {
    id: "vergunningen-regels",
    title: "Gids: vergunningen & regels voor schuttingen",
    slug: "vergunningen-regels",
    description:
      "Alles over gemeentelijke regels, maximale hoogtes, erfgrenzen en burenrecht in Nederland.",
    bulletPoints: [
      "Wanneer heb je een vergunning nodig?",
      "Maximale hoogtes per situatie",
      "Erfgrens & burenrecht uitgelegd",
      "Handige links naar gemeentewebsites",
    ],
    category: "gids",
    image: "https://gamratwpc.pl/wp-content/uploads/2025/04/gamrat-wpc-ogrodzenia-2.webp",
    relatedLinks: [
      { label: "Contact voor advies", href: "/contact" },
    ],
  },
  {
    id: "kleurengids",
    title: "Kleurengids: het perfecte composiet voor jouw tuin",
    slug: "kleurengids",
    description:
      "Kies de ideale kleur Gamrat WPC composiet die past bij jouw tuin, gevel en persoonlijke stijl.",
    bulletPoints: [
      "Warme vs. koele tinten uitgelegd",
      "Kleuren combineren met tuinelementen",
      "Kleurvastheid & UV-bestendigheid",
      "Stijlgids: modern, landelijk & stoer",
    ],
    category: "gids",
    image: "https://gamratwpc.pl/wp-content/uploads/2025/04/gamrat-wpc-realizacje-taras-2.webp",
    relatedLinks: [
      { label: "Bekijk alle kleuren", href: "/assortiment" },
    ],
  },
];

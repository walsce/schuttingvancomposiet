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
  relatedCategory?: "vlonderplanken" | "schuttingen" | "tuindeuren" | "gevelbekleding" | "accessoires";
}

export const categoryLabels: Record<DownloadCategory, string> = {
  handleiding: "Montagehandleiding",
  onderhoud: "Onderhoud",
  video: "Video",
  checklist: "Checklist",
  gids: "Gids",
};

const STORAGE_BASE = (() => {
  const urlFromEnv = import.meta.env.VITE_SUPABASE_URL;
  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;

  if (urlFromEnv) return `${urlFromEnv}/storage/v1/object/public/product-images/branded-pdfs`;
  if (projectId) return `https://${projectId}.supabase.co/storage/v1/object/public/product-images/branded-pdfs`;

  return "/storage/v1/object/public/product-images/branded-pdfs";
})();

const pdfUrl = (id: string) => `${STORAGE_BASE}/${id}.pdf`;

export const downloads: DownloadGuide[] = [
  // ─── MONTAGEHANDLEIDINGEN ────────────────────────────────────────────
  {
    id: "handleiding-composiet-schutting",
    title: "Montagehandleiding: composiet schutting plaatsen",
    slug: "montagehandleiding-composiet-schutting",
    description: "Volledige stap-voor-stap montagehandleiding voor het plaatsen van composiet schuttingen. Inclusief onderdelenlijst en technische specificaties.",
    bulletPoints: [
      "Onderdelenlijst & technische specificaties",
      "Paalplaatsing met voetplaten of betonpoeren",
      "Planken stapelen & insteeksysteem uitgelegd",
      "Windbelasting tot 100 km/u (max. 2000 mm hoogte)",
    ],
    category: "handleiding",
    image: "/images/wpc/baner-ogrodzenia.webp",
    relatedLinks: [{ label: "Composiet schuttingen bekijken", href: "/categorie/schuttingen" }],
    relatedCategory: "schuttingen",
    pdfPath: pdfUrl("handleiding-composiet-schutting"),
  },
  {
    id: "handleiding-vlonderplanken",
    title: "Montagehandleiding: composiet vlonderplanken leggen",
    slug: "montagehandleiding-vlonderplanken",
    description: "De complete montagehandleiding voor composiet vlonderplanken. Van planning en lay-out tot de laatste afwerking.",
    bulletPoints: [
      "Lay-out berekenen: materiaal per m²",
      "Onderconstructie & balkafstanden (max. 40 cm)",
      "Clips plaatsen & planken monteren",
      "Standaard, naadloos massief & Rhombus specificaties",
    ],
    category: "handleiding",
    image: "/images/wpc/wpc-systemy-tarasowe-slider-2.webp",
    relatedLinks: [{ label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" }],
    relatedCategory: "vlonderplanken",
    pdfPath: pdfUrl("handleiding-vlonderplanken"),
  },
  {
    id: "handleiding-aluminium-onderbalken",
    title: "Montagehandleiding: aluminium onderbalken voor vlonders",
    slug: "montagehandleiding-aluminium-onderbalken",
    description: "Gedetailleerde installatiehandleiding voor aluminium onderbalken. Voor toepassing op plots of rubberstroken.",
    bulletPoints: [
      "Aluminium legger laag: 36,4 × 24 mm (4m)",
      "Aluminium legger hoog: 38 × 51 mm (4m)",
      "Montage op plots & rubberstroken",
      "Verbindingsstukken & hoekbeugels",
    ],
    category: "handleiding",
    image: "/images/wpc/wpc-systemy-tarasowe-slider-1.webp",
    relatedLinks: [
      { label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" },
      { label: "Accessoires bekijken", href: "/categorie/accessoires" },
    ],
    relatedCategory: "accessoires",
    pdfPath: pdfUrl("handleiding-aluminium-onderbalken"),
  },
  {
    id: "handleiding-vlonder-accessoires",
    title: "Montagehandleiding: vlonder accessoires & afwerking",
    slug: "montagehandleiding-vlonder-accessoires",
    description: "Installatiehandleiding voor vlonder accessoires: WPC leggers, aluminium leggers, clips, afwerkingsprofielen en randafwerking.",
    bulletPoints: [
      "WPC legger: 50 × 30 mm (3m)",
      "Verstelbare terrasdragers (25-260 mm)",
      "Afwerkingsprofielen & plintplanken",
      "Montagesets 2m² en 10m²",
    ],
    category: "handleiding",
    image: "/images/wpc/akcesoria-wpc.webp",
    relatedLinks: [{ label: "Accessoires bekijken", href: "/categorie/accessoires" }],
    relatedCategory: "accessoires",
    pdfPath: pdfUrl("handleiding-vlonder-accessoires"),
  },
  {
    id: "snelstartgids-vlonder",
    title: "Snelstartgids: vlonder monteren in 4 m²/uur",
    slug: "snelstartgids-vlonder-montage",
    description: "Visuele snelstartgids met de belangrijkste montagestappen voor composiet vlonders.",
    bulletPoints: [
      "Overzichtelijke visuele montagestappen",
      "Balkinstallatie & clipmontage",
      "Afwerkingsdetails & randprofielen",
      "Tempo: ca. 4 m² per uur",
    ],
    category: "handleiding",
    image: "/images/wpc/galeria-realizacje-1.webp",
    relatedLinks: [{ label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" }],
    relatedCategory: "vlonderplanken",
    pdfPath: pdfUrl("snelstartgids-vlonder"),
  },

  // ─── CATALOGI & GIDSEN ─────────────────────────────────────────────
  {
    id: "wpc-catalogus",
    title: "Productcatalogus 2026",
    slug: "productcatalogus-2026",
    description: "De complete productcatalogus met alle vlonderplanken, schuttingen en accessoires. Inclusief technische specificaties en kleuren.",
    bulletPoints: [
      "Vlonderplanken: standaard & naadloos massief",
      "Schuttingen, tuindeuren & gevelbekleding",
      "Alle accessoires en montagesets",
      "Technische specificaties per product",
    ],
    category: "gids",
    image: "/images/wpc/wpc-systemy-tarasowe-slider-2.webp",
    relatedLinks: [{ label: "Bekijk alle producten", href: "/assortiment" }],
    pdfPath: pdfUrl("productcatalogus"),
  },
  {
    id: "wpc-prijslijst",
    title: "Prijslijst 2026",
    slug: "prijslijst-2026",
    description: "Actuele prijslijst voor alle producten. Inclusief staffelprijzen en leveringsvoorwaarden.",
    bulletPoints: [
      "Actuele prijzen per product",
      "Staffelprijzen voor grotere projecten",
      "Leveringsvoorwaarden & levertijden",
      "Adviesverkoopprijzen",
    ],
    category: "gids",
    image: "/images/wpc/tarasy-kompozytowe.webp",
    relatedLinks: [{ label: "Contact voor offerte", href: "/contact" }],
    pdfPath: pdfUrl("productcatalogus"),
  },

  // ─── ONDERHOUD ──────────────────────────────────────────────────────
  {
    id: "onderhoud-composiet-vlonder",
    title: "Onderhoudsadvies: composiet vlonderplanken",
    slug: "onderhoudsadvies-composiet-vlonder",
    description: "Officieel onderhoudsadvies voor composiet vlonderplanken. Inclusief reinigingsmethoden en seizoensschema.",
    bulletPoints: [
      "Jaarlijkse wasbeurt met warm zeepwater",
      "Reinigingstips per planktype",
      "Groene aanslag verwijderen",
      "Seizoensgebonden onderhoudstips",
    ],
    category: "onderhoud",
    image: "/images/wpc/galeria-1.webp",
    relatedLinks: [{ label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" }],
    relatedCategory: "vlonderplanken",
    pdfPath: pdfUrl("onderhoud-composiet-vlonder"),
  },

  // ─── CHECKLISTS ─────────────────────────────────────────────────────
  {
    id: "checklist-schutting-plaatsen",
    title: "Checklist: composiet schutting plaatsen",
    slug: "checklist-schutting-plaatsen",
    description: "Stap-voor-stap checklist voor het plaatsen van een composiet schutting.",
    bulletPoints: [
      "Benodigd gereedschap & materialen",
      "Grondvoorbereiding & drainage",
      "Paalafstanden & montage-instructies",
      "Veelgemaakte fouten vermijden",
    ],
    category: "checklist",
    image: "/images/wpc/ogrodzenia-wizualizacja.webp",
    relatedLinks: [{ label: "Schuttingen bekijken", href: "/categorie/schuttingen" }],
    relatedCategory: "schuttingen",
    pdfPath: pdfUrl("checklist-schutting-plaatsen"),
  },
  {
    id: "grondvoorbereiding",
    title: "Checklist: grondvoorbereiding voor schuttingen & vlonders",
    slug: "grondvoorbereiding",
    description: "De juiste fundering begint bij de grond. Leer alles over grondtypen, drainage en funderingsopties.",
    bulletPoints: [
      "Grondtypen herkennen & beoordelen",
      "Drainage & waterafvoer aanleggen",
      "Betonpoeren vs. paaltjes kiezen",
      "Hellingen & vorstdiepte berekenen",
    ],
    category: "checklist",
    image: "/images/wpc/galeria-4.webp",
    relatedLinks: [{ label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" }],
    pdfPath: pdfUrl("grondvoorbereiding"),
  },
  {
    id: "vergunningen-regels",
    title: "Gids: vergunningen & regels voor schuttingen",
    slug: "vergunningen-regels",
    description: "Alles over gemeentelijke regels, maximale hoogtes, erfgrenzen en burenrecht in Nederland.",
    bulletPoints: [
      "Wanneer heb je een vergunning nodig?",
      "Maximale hoogtes per situatie",
      "Erfgrens & burenrecht uitgelegd",
      "Handige links naar gemeentewebsites",
    ],
    category: "gids",
    image: "/images/wpc/wpc-ogrodzenia-slider.webp",
    relatedLinks: [{ label: "Contact voor advies", href: "/contact" }],
    pdfPath: pdfUrl("vergunningen-regels"),
  },
  {
    id: "kleurengids",
    title: "Kleurengids: het perfecte composiet voor jouw tuin",
    slug: "kleurengids",
    description: "Kies de ideale kleur composiet die past bij jouw tuin, gevel en persoonlijke stijl.",
    bulletPoints: [
      "Warme vs. koele tinten uitgelegd",
      "Kleuren combineren met tuinelementen",
      "Kleurvastheid & UV-bestendigheid",
      "Stijlgids: modern, landelijk & stoer",
    ],
    category: "gids",
    image: "/images/wpc/galeria-3.webp",
    relatedLinks: [{ label: "Bekijk alle kleuren", href: "/assortiment" }],
    pdfPath: pdfUrl("kleurengids"),
  },

  // ─── TUINDEUREN ─────────────────────────────────────────────────────
  {
    id: "handleiding-composiet-tuindeur",
    title: "Montagehandleiding: composiet tuindeur plaatsen",
    slug: "montagehandleiding-composiet-tuindeur",
    description: "Stap-voor-stap montagehandleiding voor onze composiet tuindeuren (dicht of Rhombus). Inclusief scharnier- en slotset.",
    bulletPoints: [
      "Inhangen, uitlijnen en afhangen",
      "Scharnierset & slotset monteren",
      "Aansluiting op composiet schutting",
      "Onderhoud van bewegende delen",
    ],
    category: "handleiding",
    image: "/images/wpc/baner-ogrodzenia.webp",
    relatedLinks: [{ label: "Tuindeuren bekijken", href: "/categorie/tuindeuren" }],
    relatedCategory: "tuindeuren",
    pdfPath: pdfUrl("handleiding-composiet-tuindeur"),
  },
  {
    id: "checklist-tuindeur-op-maat",
    title: "Checklist: composiet tuindeur op maat bestellen",
    slug: "checklist-tuindeur-op-maat",
    description: "Wat moet u opmeten en bepalen voordat u een composiet tuindeur op maat bestelt?",
    bulletPoints: [
      "Dagmaat & sponningmaat correct opmeten",
      "Draairichting & scharnierzijde bepalen",
      "Slot- en greepkeuze",
      "Combinatie met bestaande schutting",
    ],
    category: "checklist",
    image: "/images/wpc/ogrodzenia-wizualizacja.webp",
    relatedLinks: [{ label: "Tuindeuren bekijken", href: "/categorie/tuindeuren" }],
    relatedCategory: "tuindeuren",
    pdfPath: pdfUrl("checklist-tuindeur-op-maat"),
  },

  // ─── GEVELBEKLEDING ─────────────────────────────────────────────────
  {
    id: "handleiding-composiet-gevelbekleding",
    title: "Montagehandleiding: composiet gevelbekleding (Rhombus)",
    slug: "montagehandleiding-composiet-gevelbekleding",
    description: "Complete handleiding voor het monteren van composiet Rhombus gevelbekleding op een aluminium regelwerk.",
    bulletPoints: [
      "Aluminium regelwerk hart-op-hart 50 cm",
      "Ventilatieruimte & dampopen folie",
      "Hoek- en eindprofielen plaatsen",
      "Combineren van Rhombus tinten",
    ],
    category: "handleiding",
    image: "/images/wpc/wpc-systemy-tarasowe-slider-1.webp",
    relatedLinks: [{ label: "Gevelbekleding bekijken", href: "/categorie/gevelbekleding" }],
    relatedCategory: "gevelbekleding",
    pdfPath: pdfUrl("handleiding-composiet-gevelbekleding"),
  },
  {
    id: "onderhoud-rhombus-profielen",
    title: "Onderhoudsgids: Rhombus profielen (schutting, deur & gevel)",
    slug: "onderhoud-rhombus-profielen",
    description: "Hoe houdt u Rhombus profielen jarenlang strak? Reiniging, controle en kleurherstel.",
    bulletPoints: [
      "Reinigen tussen de ribbels",
      "Kleurherstel met lakbus spray",
      "Controle van bevestiging & regelwerk",
      "Jaarlijks onderhoudsschema",
    ],
    category: "onderhoud",
    image: "/images/wpc/galeria-1.webp",
    relatedLinks: [
      { label: "Schuttingen bekijken", href: "/categorie/schuttingen" },
      { label: "Gevelbekleding bekijken", href: "/categorie/gevelbekleding" },
    ],
    relatedCategory: "gevelbekleding",
    pdfPath: pdfUrl("onderhoud-rhombus-profielen"),
  },
];

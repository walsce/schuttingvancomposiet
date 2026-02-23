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
  relatedCategory?: "vlonderplanken" | "schuttingen" | "gevelbekleding";
}

export const categoryLabels: Record<DownloadCategory, string> = {
  handleiding: "Montagehandleiding",
  onderhoud: "Onderhoud",
  video: "Video",
  checklist: "Checklist",
  gids: "Gids",
};

export const downloads: DownloadGuide[] = [
  // ─── MONTAGEHANDLEIDINGEN (Installation Guides) ────────────────────────
  {
    id: "handleiding-composiet-schutting",
    title: "Montagehandleiding: composiet schutting plaatsen",
    slug: "montagehandleiding-composiet-schutting",
    description:
      "Volledige stap-voor-stap montagehandleiding voor het plaatsen van composiet schuttingen. Inclusief onderdelenlijst, gereedschap en technische specificaties.",
    bulletPoints: [
      "Onderdelenlijst & technische specificaties",
      "Paalplaatsing met voetplaten of betonpoeren",
      "Planken stapelen & kliksysteem uitgelegd",
      "Windbelasting tot 100 km/u (max. 1815 mm hoogte)",
    ],
    category: "handleiding",
    image: "https://www.silvadec.com/sites/default/files/styles/max_1300x1300/public/2024-11/cloture-silvadec-bois-composite-atmosphere-chene-clair-ambiance-portillon.jpg",
    relatedLinks: [
      { label: "Composiet schuttingen bekijken", href: "/categorie/schuttingen" },
    ],
    pdfPath: "/downloads/montagehandleiding-composiet-schutting.pdf",
    relatedCategory: "schuttingen",
  },
  {
    id: "handleiding-aluminium-schutting",
    title: "Montagehandleiding: aluminium schutting plaatsen",
    slug: "montagehandleiding-aluminium-schutting",
    description:
      "Gedetailleerde installatiehandleiding voor aluminium schuttingen. Van voetplaatmontage tot afwerking met afdekkapjes.",
    bulletPoints: [
      "Enkele & dubbele schaalvoetplaten uitgelegd",
      "Palen zagen op maat & marges berekenen",
      "Hoekpalen verankeren voor windbestendigheid",
      "Glad & geschuurd afwerkingsopties",
    ],
    category: "handleiding",
    image: "https://www.silvadec.com/sites/default/files/styles/max_1300x1300/public/2024-11/cloture-silvadec-aluminium-anthracite-ambiance.jpg",
    relatedLinks: [
      { label: "Aluminium schuttingen bekijken", href: "/categorie/schuttingen" },
    ],
    pdfPath: "/downloads/montagehandleiding-aluminium-schutting.pdf",
    relatedCategory: "schuttingen",
  },
  {
    id: "handleiding-aluminium-poort",
    title: "Montagehandleiding: aluminium poort installeren",
    slug: "montagehandleiding-aluminium-poort",
    description:
      "Installatiehandleiding voor de aluminium poort. Inclusief afmetingen, scharnieren en slotmontage.",
    bulletPoints: [
      "Poortafmetingen: 1000 × 1682 × 40 mm",
      "Palen voor inbetonneren (100 × 100 mm)",
      "Scharnieren & slot monteren",
      "Integratie met 1,8 meter schuttingpanelen",
    ],
    category: "handleiding",
    image: "https://www.silvadec.com/sites/default/files/styles/max_1300x1300/public/2024-11/cloture-silvadec-bois-composite-atmosphere-chene-clair-ambiance-portillon.jpg",
    relatedLinks: [
      { label: "Schuttingen bekijken", href: "/categorie/schuttingen" },
    ],
    pdfPath: "/downloads/montagehandleiding-aluminium-poort.pdf",
    relatedCategory: "schuttingen",
  },
  {
    id: "handleiding-atmosphere-175-gevelbekleding",
    title: "Montagehandleiding: Atmosphere 175 gevelbekleding",
    slug: "montagehandleiding-atmosphere-175-gevelbekleding",
    description:
      "Volledige montagehandleiding voor Atmosphere 175 gevelbekledingsplanken. Van onderconstructie tot afwerking.",
    bulletPoints: [
      "Eurocode 1 & 5 normen uitgelegd",
      "Clips, start- & eindprofielen monteren",
      "Hoekprofielen & aansluitingen",
      "Opslag & behandelingsvoorschriften",
    ],
    category: "handleiding",
    image: "https://www.silvadec.com/sites/default/files/styles/max_1300x1300/public/2024-12/bardage-silvadec-bois-composite-atmosphere-175-brun-solaire-ambiance.jpg",
    relatedLinks: [
      { label: "Gevelbekleding bekijken", href: "/categorie/gevelbekleding" },
    ],
    pdfPath: "/downloads/montagehandleiding-atmosphere-175-gevelbekleding.pdf",
    relatedCategory: "gevelbekleding",
  },
  {
    id: "handleiding-open-rhombus-gevelbekleding",
    title: "Montagehandleiding: open rhombus gevelbekleding",
    slug: "montagehandleiding-open-rhombus-gevelbekleding",
    description:
      "Installatiehandleiding voor co-extrusie open rhombus gevelbekledingsprofielen. Inclusief lay-out berekeningen en clipmontage.",
    bulletPoints: [
      "Profielgewicht: 1,80 kg per strekkende meter",
      "Lay-out & materiaalbehoefte per m²",
      "Verborgen clipbevestiging (15 mm tussenruimte)",
      "Hoekafwerking & aansluitprofielen",
    ],
    category: "handleiding",
    image: "https://www.silvadec.com/sites/default/files/styles/max_1300x1300/public/2024-12/bardage-silvadec-bois-composite-atmosphere-claire-voie-brun-clair-ambiance.jpg",
    relatedLinks: [
      { label: "Open rhombus bekijken", href: "/categorie/gevelbekleding" },
    ],
    pdfPath: "/downloads/montagehandleiding-open-rhombus-gevelbekleding.pdf",
    relatedCategory: "gevelbekleding",
  },
  {
    id: "snelstartgids-open-rhombus",
    title: "Snelstartgids: open rhombus gevelbekleding",
    slug: "snelstartgids-open-rhombus",
    description:
      "Visuele snelstartgids met de belangrijkste montagestappen voor open rhombus gevelbekleding. Ideaal als naslagwerk op de bouwplaats.",
    bulletPoints: [
      "Overzichtelijke visuele stappen",
      "Latwerk & onderconstructie",
      "Plankmontage met clips",
      "Afwerkingsopties & details",
    ],
    category: "handleiding",
    image: "https://www.silvadec.com/sites/default/files/styles/max_1300x1300/public/2024-12/bardage-silvadec-bois-composite-atmosphere-claire-voie-anthracite-ambiance.jpg",
    relatedLinks: [
      { label: "Gevelbekleding bekijken", href: "/categorie/gevelbekleding" },
    ],
    pdfPath: "/downloads/snelstartgids-open-rhombus-gevelbekleding.pdf",
    relatedCategory: "gevelbekleding",
  },
  {
    id: "handleiding-aluminium-onderbalken",
    title: "Montagehandleiding: aluminium onderbalken voor vlonders",
    slug: "montagehandleiding-aluminium-onderbalken",
    description:
      "Gedetailleerde installatiehandleiding voor Reversil aluminium onderbalken. Voor toepassing op plots of rubberstroken.",
    bulletPoints: [
      "Reversibel profiel: 63 × 40 × 3600 mm",
      "Montage op plots & rubberstroken",
      "Verbindingsstukken & hoekbeugels",
      "Geluidsarm door diepere cliprail",
    ],
    category: "handleiding",
    image: "https://www.silvadec.com/sites/default/files/styles/max_1300x1300/public/2024-11/terrasse-silvadec-bois-composite-atmosphere-ushuaia-gris-ambiance.jpg",
    relatedLinks: [
      { label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" },
    ],
    pdfPath: "/downloads/montagehandleiding-aluminium-onderbalken-vlonder.pdf",
    relatedCategory: "vlonderplanken",
  },
  {
    id: "handleiding-demonteerbare-clip",
    title: "Montagehandleiding: demonteerbare vlonderclip",
    slug: "montagehandleiding-demonteerbare-clip",
    description:
      "Handleiding voor de demonteerbare clip. Maak delen van je vlonder eenvoudig verwijderbaar voor toegang tot onderliggende installaties.",
    bulletPoints: [
      "Toegang tot waterproofing & elektra",
      "Stap-voor-stap montage & demontage",
      "Compatibel met alle composiet vlonderplanken",
      "Niet compatibel met aluminium onderbalken",
    ],
    category: "handleiding",
    image: "https://www.silvadec.com/sites/default/files/styles/max_1300x1300/public/2024-11/terrasse-silvadec-bois-composite-atmosphere-rio-brun-ambiance.jpg",
    relatedLinks: [
      { label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" },
    ],
    pdfPath: "/downloads/montagehandleiding-demonteerbare-clip-vlonder.pdf",
    relatedCategory: "vlonderplanken",
  },

  {
    id: "handleiding-vlonderplanken",
    title: "Montagehandleiding: composiet vlonderplanken leggen",
    slug: "montagehandleiding-vlonderplanken",
    description:
      "De complete montagehandleiding voor composiet vlonderplanken. Van planning en lay-out tot de laatste afwerking.",
    bulletPoints: [
      "Lay-out berekenen: materiaal per m²",
      "Onderconstructie & balkafstanden (max. 40 cm)",
      "Clips plaatsen & planken monteren",
      "Elegance, Emotion & Atmosphere specificaties",
    ],
    category: "handleiding",
    image: "https://www.silvadec.com/sites/default/files/styles/max_1300x1300/public/2024-11/terrasse-silvadec-bois-composite-atmosphere-cayenne-gris-ambiance.jpg",
    relatedLinks: [
      { label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" },
    ],
    pdfPath: "/downloads/montagehandleiding-vlonderplanken.pdf",
    relatedCategory: "vlonderplanken",
  },
  {
    id: "handleiding-vlonder-accessoires",
    title: "Montagehandleiding: vlonder accessoires & afwerking",
    slug: "montagehandleiding-vlonder-accessoires",
    description:
      "Installatiehandleiding voor vlonder accessoires: aluminium balken, plots, rubberstroken, afwerkingsprofielen en randafwerking.",
    bulletPoints: [
      "Aluminium balken op plots of rubberstroken",
      "Plotafstanden: max. 90 cm privé / 60 cm openbaar",
      "Afwerkingsprofielen & plintplanken",
      "LED-verlichting & traptreden monteren",
    ],
    category: "handleiding",
    image: "https://www.silvadec.com/sites/default/files/styles/max_1300x1300/public/2024-11/terrasse-silvadec-bois-composite-atmosphere-belem-gris-ambiance.jpg",
    relatedLinks: [
      { label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" },
    ],
    pdfPath: "/downloads/montagehandleiding-vlonder-accessoires.pdf",
    relatedCategory: "vlonderplanken",
  },
  {
    id: "snelstartgids-vlonder",
    title: "Snelstartgids: vlonder monteren in 4 m²/uur",
    slug: "snelstartgids-vlonder-montage",
    description:
      "Visuele snelstartgids met de belangrijkste montagestappen voor composiet vlonders. Perfect als naslagwerk op de bouwplaats.",
    bulletPoints: [
      "Overzichtelijke visuele montagestappen",
      "Balkinstallatie & clipmontage",
      "Afwerkingsdetails & randprofielen",
      "Tempo: ca. 4 m² per uur",
    ],
    category: "handleiding",
    image: "https://www.silvadec.com/sites/default/files/styles/max_1300x1300/public/2024-11/terrasse-silvadec-bois-composite-atmosphere-lima-brun-ambiance-piscine.jpg",
    relatedLinks: [
      { label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" },
    ],
    pdfPath: "/downloads/snelstartgids-vlonder-montage.pdf",
    relatedCategory: "vlonderplanken",
  },

  // ─── ONDERHOUD (Maintenance) ───────────────────────────────────────────
  {
    id: "onderhoud-silvawash",
    title: "Onderhoudsgids: Silvawash reinigingsproduct",
    slug: "onderhoudsgids-silvawash",
    description:
      "Alles over Silvawash, het kleigebaseerde reinigingsproduct voor composiet planken. 100% minerale oorsprong, ideaal voor vettige vlekken.",
    bulletPoints: [
      "Kleigebaseerd, 100% minerale oorsprong",
      "Verwijdert vettige vlekken (BBQ, olie, ijs)",
      "Droog te gebruiken — geen water nodig",
      "Geschikt voor Elegance & Emotion Natural serie",
    ],
    category: "onderhoud",
    image: "https://en.silvadec.com/sites/default/files/2024-12/silvawash.png",
    relatedLinks: [
      { label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" },
    ],
    videoId: "vn3ramnJ4KI",
  },
  {
    id: "onderhoud-elegance-emotion",
    title: "Onderhoudsadvies: Elegance & Emotion vlonderplanken",
    slug: "onderhoudsadvies-elegance-emotion",
    description:
      "Officieel onderhoudsadvies voor Elegance en Emotion vlonderplanken. Inclusief reinigingsmethoden, aanbevolen apparatuur en seizoensschema.",
    bulletPoints: [
      "Jaarlijkse wasbeurt met warm zeepwater",
      "Kärcher schrobmachine aanbevelingen",
      "Reinigingstips per planktype (glad, gegroefd, embossed)",
      "Tussen de planken schoonmaken voor ventilatie",
    ],
    category: "onderhoud",
    image: "https://www.silvadec.com/sites/default/files/styles/max_1300x1300/public/2024-11/terrasse-silvadec-bois-composite-atmosphere-rio-brun-ambiance.jpg",
    relatedLinks: [
      { label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" },
    ],
    pdfPath: "https://jakqbjeukobtyxxxpzcr.supabase.co/storage/v1/object/public/product-images/branded-pdfs/onderhoud-elegance-emotion.pdf",
    relatedCategory: "vlonderplanken",
  },
  {
    id: "epd-vlonderplanken",
    title: "Milieuverklaring (EPD): composiet vlonderplanken",
    slug: "milieu-productverklaring-vlonderplanken",
    description:
      "Officiële Environmental Product Declaration (EPD) voor composiet vlonderplanken. Conform NF EN ISO 14025 en NF EN 15804+A2.",
    bulletPoints: [
      "Levenscyclusanalyse (LCA) conform Eurocode",
      "CO₂-voetafdruk & milieu-impactdata",
      "Recyclebaarheid & circulaire economie",
      "INIES geregistreerd (nr. 20240337404)",
    ],
    category: "gids",
    image: "https://www.silvadec.com/sites/default/files/styles/max_1300x1300/public/2024-11/terrasse-silvadec-bois-composite-nuances-chene-clair-ambiance.jpg",
    relatedLinks: [
      { label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" },
    ],
    pdfPath: "https://jakqbjeukobtyxxxpzcr.supabase.co/storage/v1/object/public/product-images/branded-pdfs/epd-vlonderplanken.pdf",
    relatedCategory: "vlonderplanken",
  },
  {
    id: "onderhoud-silvaction",
    title: "Onderhoudsgids: Silvaction anti-mos behandeling",
    slug: "onderhoudsgids-silvaction",
    description:
      "Silvaction verwijdert mos en korstmos van composiet planken. Zonder bleekmiddel, zonder naspoelen.",
    bulletPoints: [
      "Anti-mos behandeling zonder bleekmiddel",
      "Geen naspoelen nodig",
      "Test eerst op een klein oppervlak",
      "Speciaal ontwikkeld voor composiet oppervlakken",
    ],
    category: "onderhoud",
    image: "https://en.silvadec.com/sites/default/files/2022-09/sinet1801_silvaction_recto_0.jpg",
    relatedLinks: [
      { label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" },
    ],
    videoId: "yWfPy8XrW6c",
  },

  // ─── VIDEO'S ───────────────────────────────────────────────────────────
  {
    id: "video-vlonder-montage",
    title: "Video: composiet vlonder monteren",
    slug: "video-composiet-vlonder-montage",
    description:
      "Bekijk hoe een composiet vlonder van A tot Z wordt geïnstalleerd. Van onderconstructie tot de laatste plank.",
    bulletPoints: [
      "Onderconstructie & paalafstanden",
      "Clips plaatsen & planken leggen",
      "Afwerking & randprofielen",
      "Professionele tips & trucs",
    ],
    category: "video",
    image: "https://www.silvadec.com/sites/default/files/styles/max_1300x1300/public/2024-11/terrasse-silvadec-bois-composite-atmosphere-lima-brun-ambiance-piscine.jpg",
    relatedLinks: [
      { label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" },
    ],
    videoId: "6GFUeQrltcg",
    relatedCategory: "vlonderplanken",
  },
  {
    id: "video-schutting-montage",
    title: "Video: composiet schutting monteren",
    slug: "video-composiet-schutting-montage",
    description:
      "Stap-voor-stap videogids voor het plaatsen van een composiet schutting. Van paalplaatsing tot de laatste plank.",
    bulletPoints: [
      "Voetplaten positioneren & verankeren",
      "Palen plaatsen & uitlijnen",
      "Planken stapelen in het kliksysteem",
      "Afdekkapjes & afwerking monteren",
    ],
    category: "video",
    image: "https://www.silvadec.com/sites/default/files/styles/max_1300x1300/public/2024-11/cloture-silvadec-bois-composite-atmosphere-gris-sauvage-ambiance.jpg",
    relatedLinks: [
      { label: "Schuttingen bekijken", href: "/categorie/schuttingen" },
    ],
    videoId: "0inyKplzsR8",
    relatedCategory: "schuttingen",
  },
  {
    id: "video-gevelbekleding-montage",
    title: "Video: gevelbekleding monteren",
    slug: "video-gevelbekleding-montage",
    description:
      "Professionele installatievideo voor composiet gevelbekleding. Leer de juiste technieken voor een duurzaam en strak resultaat.",
    bulletPoints: [
      "Onderconstructie & latwerk voorbereiden",
      "Start- & eindprofielen plaatsen",
      "Planken clippen & uitlijnen",
      "Hoekafwerking & details",
    ],
    category: "video",
    image: "https://www.silvadec.com/sites/default/files/styles/max_1300x1300/public/2024-12/bardage-silvadec-bois-composite-atmosphere-175-brun-solaire-ambiance.jpg",
    relatedLinks: [
      { label: "Gevelbekleding bekijken", href: "/categorie/gevelbekleding" },
    ],
    videoId: "ms27m-E86Ug",
    relatedCategory: "gevelbekleding",
  },

  // ─── GIDSEN & CHECKLISTS ────────────────────────────────────────────────
  {
    id: "checklist-schutting-plaatsen",
    title: "Checklist: composiet schutting plaatsen",
    slug: "checklist-schutting-plaatsen",
    description:
      "Stap-voor-stap checklist voor het plaatsen van een composiet schutting. Van voorbereiding tot afwerking.",
    bulletPoints: [
      "Benodigd gereedschap & materialen",
      "Grondvoorbereiding & drainage",
      "Paalafstanden & montage-instructies",
      "Veelgemaakte fouten vermijden",
    ],
    category: "checklist",
    image: "https://www.silvadec.com/sites/default/files/styles/max_1300x1300/public/2024-11/cloture-silvadec-bois-composite-atmosphere-brun-solaire-ambiance.jpg",
    relatedLinks: [
      { label: "Schuttingen bekijken", href: "/categorie/schuttingen" },
    ],
    pdfPath: "https://jakqbjeukobtyxxxpzcr.supabase.co/storage/v1/object/public/product-images/branded-pdfs/checklist-schutting-plaatsen.pdf",
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
    image: "https://www.silvadec.com/sites/default/files/styles/max_1300x1300/public/2024-11/terrasse-silvadec-bois-composite-atmosphere-sao-paulo-brun-ambiance.jpg",
    relatedLinks: [
      { label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" },
    ],
    pdfPath: "https://jakqbjeukobtyxxxpzcr.supabase.co/storage/v1/object/public/product-images/branded-pdfs/grondvoorbereiding.pdf",
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
    image: "https://www.silvadec.com/sites/default/files/styles/max_1300x1300/public/2024-11/cloture-silvadec-bois-composite-atmosphere-gris-clair-ambiance.jpg",
    relatedLinks: [
      { label: "Contact voor advies", href: "/contact" },
    ],
    pdfPath: "https://jakqbjeukobtyxxxpzcr.supabase.co/storage/v1/object/public/product-images/branded-pdfs/vergunningen-regels.pdf",
  },
  {
    id: "kleurengids",
    title: "Kleurengids: het perfecte composiet voor jouw tuin",
    slug: "kleurengids",
    description:
      "Kies de ideale kleur composiet die past bij jouw tuin, gevel en persoonlijke stijl.",
    bulletPoints: [
      "Warme vs. koele tinten uitgelegd",
      "Kleuren combineren met tuinelementen",
      "Kleurvastheid & UV-bestendigheid",
      "Stijlgids: modern, landelijk & stoer",
    ],
    category: "gids",
    image: "https://www.silvadec.com/sites/default/files/styles/max_1300x1300/public/2024-11/terrasse-silvadec-bois-composite-nuances-ipe-ambiance.jpg",
    relatedLinks: [
      { label: "Bekijk alle kleuren", href: "/assortiment" },
    ],
    pdfPath: "https://jakqbjeukobtyxxxpzcr.supabase.co/storage/v1/object/public/product-images/branded-pdfs/kleurengids.pdf",
  },
];

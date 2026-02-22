export type DownloadCategory = "checklist" | "vergelijking" | "gids";

export interface DownloadGuide {
  id: string;
  title: string;
  slug: string;
  description: string;
  bulletPoints: string[];
  category: DownloadCategory;
  image: string;
  relatedLinks: { label: string; href: string }[];
}

export const categoryLabels: Record<DownloadCategory, string> = {
  checklist: "Checklist",
  vergelijking: "Vergelijking",
  gids: "Gids",
};

export const downloads: DownloadGuide[] = [
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
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop",
    relatedLinks: [
      { label: "Schuttingen bekijken", href: "/categorie/schuttingen" },
    ],
  },
  {
    id: "composiet-vs-hout",
    title: "Vergelijking: composiet vs. houten schuttingen",
    slug: "composiet-vs-hout",
    description:
      "Eerlijke vergelijking op prijs, levensduur, onderhoud, uitstraling en duurzaamheid.",
    bulletPoints: [
      "Kostenvergelijking over 20 jaar",
      "Onderhoud & levensduur naast elkaar",
      "Milieu-impact & recyclebaarheid",
      "Garantievoorwaarden vergeleken",
    ],
    category: "vergelijking",
    image: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=600&h=400&fit=crop",
    relatedLinks: [
      { label: "Lees: Composiet vs. Hout", href: "/blog/composiet-vs-hout-vergelijking" },
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
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    relatedLinks: [
      { label: "Contact voor advies", href: "/contact" },
    ],
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
    image: "https://images.unsplash.com/photo-1578496480157-697fc14d2e55?w=600&h=400&fit=crop",
    relatedLinks: [
      { label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" },
    ],
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
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
    relatedLinks: [
      { label: "Bekijk alle kleuren", href: "/assortiment" },
    ],
  },
  {
    id: "onderhoudsgids",
    title: "Onderhoudsgids: composiet jarenlang mooi houden",
    slug: "onderhoudsgids",
    description:
      "Seizoensgebonden onderhoudskalender en tips om jouw composiet er jarenlang als nieuw uit te laten zien.",
    bulletPoints: [
      "Seizoensgebonden onderhoudsschema",
      "Schoonmaakinstructies per vlektype",
      "Wat je absoluut moet vermijden",
      "Garantievoorwaarden behouden",
    ],
    category: "checklist",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&h=400&fit=crop",
    relatedLinks: [
      { label: "Bekijk producten", href: "/assortiment" },
    ],
  },
];

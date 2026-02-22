import { CheckSquare, GitCompareArrows, BookOpen, Layers, Palette, Sparkles } from "lucide-react";

export type DownloadCategory = "checklist" | "vergelijking" | "gids";

export interface DownloadGuide {
  id: string;
  title: string;
  slug: string;
  description: string;
  bulletPoints: string[];
  category: DownloadCategory;
  icon: typeof CheckSquare;
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
    title: "Checklist: Composiet Schutting Plaatsen",
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
    icon: CheckSquare,
    relatedLinks: [
      { label: "Schuttingen bekijken", href: "/categorie/schuttingen" },
    ],
  },
  {
    id: "composiet-vs-hout",
    title: "Vergelijking: Composiet vs. Houten Schuttingen",
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
    icon: GitCompareArrows,
    relatedLinks: [
      { label: "Lees: Composiet vs. Hout", href: "/blog/composiet-vs-hout-vergelijking" },
    ],
  },
  {
    id: "vergunningen-regels",
    title: "Gids: Vergunningen & Regels voor Schuttingen",
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
    icon: BookOpen,
    relatedLinks: [
      { label: "Contact voor advies", href: "/contact" },
    ],
  },
  {
    id: "grondvoorbereiding",
    title: "Checklist: Grondvoorbereiding voor Schuttingen & Vlonders",
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
    icon: Layers,
    relatedLinks: [
      { label: "Vlonderplanken bekijken", href: "/categorie/vlonderplanken" },
    ],
  },
  {
    id: "kleurengids",
    title: "Kleurengids: Het Perfecte Composiet voor Jouw Tuin",
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
    icon: Palette,
    relatedLinks: [
      { label: "Bekijk alle kleuren", href: "/assortiment" },
    ],
  },
  {
    id: "onderhoudsgids",
    title: "Onderhoudsgids: Composiet Jarenlang Mooi Houden",
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
    icon: Sparkles,
    relatedLinks: [
      { label: "Bekijk producten", href: "/assortiment" },
    ],
  },
];

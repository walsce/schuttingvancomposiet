import { PanelStyleId, PanelType } from "./types";

export const POST_WIDTH_CM = 7;
export const STANDARD_PANEL_WIDTH = 182;
export const PANEL_HEIGHT_CM = 180;

export const panelStyles: PanelType[] = [
  { id: "horizontal-planks", name: "Classic horizontaal", widthCm: STANDARD_PANEL_WIDTH, image: "/images/gamrat/ogrodzeniowa-classic-ciemny-braz.webp" },
  { id: "decorative", name: "Premium horizontaal", widthCm: STANDARD_PANEL_WIDTH, image: "/images/gamrat/ogrodzeniowa-premium-ciemny-braz.webp" },
  { id: "vertical-slats", name: "Verticale latten", widthCm: STANDARD_PANEL_WIDTH, image: "/images/gamrat/baner-ogrodzenia.webp" },
  { id: "louvers", name: "Lamellen", widthCm: STANDARD_PANEL_WIDTH, image: "/images/gamrat/gamrat-wpc-ogrodzenia-slider.webp" },
  { id: "aluminium", name: "Aluminium", widthCm: STANDARD_PANEL_WIDTH, image: "/images/gamrat/gamrat-wpc-ogrodzenia-slider.webp" },
  { id: "glass-panel", name: "Matglas paneel", widthCm: STANDARD_PANEL_WIDTH, image: "/images/gamrat/baner-ogrodzenia.webp" },
];

// Color hex mapping from product tones
export const toneColorMap: Record<string, string> = {
  bruin: "#8B5E3C",
  grijs: "#777777",
  zwart: "#1a1a1a",
  wit: "#E8E0D8",
  eiken: "#C4A56E",
};

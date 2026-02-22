import { PanelStyleId, PanelType } from "./types";

export const POST_WIDTH_CM = 7;
export const STANDARD_PANEL_WIDTH = 182;
export const PANEL_HEIGHT_CM = 180;

export const panelStyles: PanelType[] = [
  { id: "horizontal-planks", name: "Horizontale planken", widthCm: STANDARD_PANEL_WIDTH },
  { id: "decorative", name: "Decoratief", widthCm: STANDARD_PANEL_WIDTH },
  { id: "mosaic", name: "Mozaïek", widthCm: STANDARD_PANEL_WIDTH },
  { id: "louvers", name: "Lamellen", widthCm: STANDARD_PANEL_WIDTH },
  { id: "vertical-slats", name: "Verticale latten", widthCm: STANDARD_PANEL_WIDTH },
];

// Color hex mapping from product tones
export const toneColorMap: Record<string, string> = {
  teak: "#A0785A",
  zwart: "#1a1a1a",
  walnoot: "#6B3A2A",
  eiken: "#8B5E3C",
  grijs: "#777777",
};

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
  { id: "aluminium", name: "Aluminium", widthCm: STANDARD_PANEL_WIDTH },
  { id: "lamellen-45", name: "Lamellen 45mm", widthCm: STANDARD_PANEL_WIDTH },
  { id: "lamellen-100", name: "Lamellen 100mm", widthCm: STANDARD_PANEL_WIDTH },
  { id: "rhombus-lamellen", name: "Rhombus lamellen", widthCm: STANDARD_PANEL_WIDTH },
  { id: "glass-panel", name: "Matglas paneel", widthCm: STANDARD_PANEL_WIDTH },
  { id: "solar-panel", name: "Zonnepaneel", widthCm: STANDARD_PANEL_WIDTH },
];

// Color hex mapping from product tones
export const toneColorMap: Record<string, string> = {
  teak: "#A0785A",
  zwart: "#1a1a1a",
  walnoot: "#6B3A2A",
  eiken: "#8B5E3C",
  grijs: "#777777",
  antraciet: "#3C3C3C",
  "ral7016": "#293133",
  "ral9005": "#0A0A0A",
  "ral9006": "#A5A5A5",
  "ral7035": "#D7D7D7",
  corten: "#8B4513",
};

import { PanelStyleId, PanelType } from "./types";

export const POST_WIDTH_CM = 7;
export const STANDARD_PANEL_WIDTH = 182;
export const PANEL_HEIGHT_CM = 180;

export const panelStyles: PanelType[] = [
  { id: "horizontal-planks", name: "Horizontale planken", widthCm: STANDARD_PANEL_WIDTH, image: "https://felix-distribution.b-cdn.net/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/b/o/boston_-_houtcomposiet_fence_board_premium.png" },
  { id: "decorative", name: "Decoratief", widthCm: STANDARD_PANEL_WIDTH, image: "https://felix-distribution.b-cdn.net/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/b/o/boston_-_decopaneel_paxos_horizontaal.png" },
  { id: "mosaic", name: "Mozaïek", widthCm: STANDARD_PANEL_WIDTH, image: "https://felix-distribution.b-cdn.net/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/b/o/boston_-_decopaneel_crios_horizontaal.png" },
  { id: "louvers", name: "Lamellen", widthCm: STANDARD_PANEL_WIDTH, image: "https://felix-distribution.b-cdn.net/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/b/o/boston_-_decopaneel_hera_horizontaal.png" },
  { id: "vertical-slats", name: "Verticale latten", widthCm: STANDARD_PANEL_WIDTH, image: "https://felix-distribution.b-cdn.net/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/b/o/boston_-_houtcomposiet_fence_board_modern.png" },
  { id: "aluminium", name: "Aluminium", widthCm: STANDARD_PANEL_WIDTH, image: "https://felix-distribution.b-cdn.net/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/b/o/boston_-_fence_board_aluminium.png" },
  { id: "lamellen-45", name: "Lamellen 45mm", widthCm: STANDARD_PANEL_WIDTH, image: "https://felix-distribution.b-cdn.net/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/b/o/boston_-_aluminium_louver_45.png" },
  { id: "lamellen-100", name: "Lamellen 100mm", widthCm: STANDARD_PANEL_WIDTH, image: "https://felix-distribution.b-cdn.net/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/b/o/boston_-_aluminium_louver_100.png" },
  { id: "rhombus-lamellen", name: "Rhombus lamellen", widthCm: STANDARD_PANEL_WIDTH, image: "https://felix-distribution.b-cdn.net/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/b/o/boston_-_aluminium_rhombus_louver.png" },
  { id: "glass-panel", name: "Matglas paneel", widthCm: STANDARD_PANEL_WIDTH, image: "https://felix-distribution.b-cdn.net/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/b/o/boston_-_decopaneel_matglas_300mm.png" },
  { id: "solar-panel", name: "Zonnepaneel", widthCm: STANDARD_PANEL_WIDTH, image: "https://felix-distribution.b-cdn.net/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/e/helios_zonnepaneel.png" },
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

import { PanelStyleId, PanelType } from "./types";

export const POST_WIDTH_CM = 7;
export const STANDARD_PANEL_WIDTH = 182;
export const PANEL_HEIGHT_CM = 180;

export const panelStyles: PanelType[] = [
  { id: "horizontal-planks", name: "Horizontale planken", widthCm: STANDARD_PANEL_WIDTH, image: "https://cdn.forestia-group.com/storage/7d92b26c-0c0e-432b-91a7-front/m-boston-lame-premium-21x150mm_default-2.jpg?w=750&f=webp&q=85" },
  { id: "decorative", name: "Decoratief", widthCm: STANDARD_PANEL_WIDTH, image: "https://cdn.forestia-group.com/storage/f98efaab-f989-4711-b2b4-front/m-boston-decor-paxos-horizontal_default.jpg?w=750&f=webp&q=85" },
  { id: "mosaic", name: "Mozaïek", widthCm: STANDARD_PANEL_WIDTH, image: "https://cdn.forestia-group.com/storage/03a5d086-706c-4811-a70d-front/m-boston-decor-crios-horizontal_default.jpg?w=750&f=webp&q=85" },
  { id: "louvers", name: "Lamellen", widthCm: STANDARD_PANEL_WIDTH, image: "https://cdn.forestia-group.com/storage/609ba26b-d744-4936-a1d9-front/m-boston-decor-hera-horizontal_default.jpg?w=750&f=webp&q=85" },
  { id: "vertical-slats", name: "Verticale latten", widthCm: STANDARD_PANEL_WIDTH, image: "https://cdn.forestia-group.com/storage/1c509db2-515e-496d-b322-front/m-boston-modern-21x150mm_default-2.jpg?w=750&f=webp&q=85" },
  { id: "aluminium", name: "Aluminium", widthCm: STANDARD_PANEL_WIDTH, image: "https://cdn.forestia-group.com/storage/e96e85e1-98f9-4738-9c73-front/m-boston-lame-alu-opale_default.jpg?w=750&f=webp&q=85" },
  { id: "lamellen-45", name: "Lamellen 45mm", widthCm: STANDARD_PANEL_WIDTH, image: "https://cdn.forestia-group.com/storage/ad8d64ff-8bb0-4cff-9df8-front/m-boston-lame-alu-open45_default.jpg?w=750&f=webp&q=85" },
  { id: "lamellen-100", name: "Lamellen 100mm", widthCm: STANDARD_PANEL_WIDTH, image: "https://cdn.forestia-group.com/storage/edb1b2ad-9fb5-4b8e-9970-front/m-boston-lame-alu-open100_default.jpg?w=750&f=webp&q=85" },
  { id: "rhombus-lamellen", name: "Rhombus lamellen", widthCm: STANDARD_PANEL_WIDTH, image: "https://cdn.forestia-group.com/storage/551ccfd7-2335-44c9-ab57-front/m-boston-lame-alu-rhombus_default.jpg?w=750&f=webp&q=85" },
  { id: "glass-panel", name: "Matglas paneel", widthCm: STANDARD_PANEL_WIDTH, image: "https://cdn.forestia-group.com/storage/bbcb3fa5-16ae-4285-965a-front/m-boston-decor-verre300_default.jpg?w=750&f=webp&q=85" },
  { id: "solar-panel", name: "Zonnepaneel", widthCm: STANDARD_PANEL_WIDTH, image: "https://cdn.forestia-group.com/storage/6ada5f90-08a7-45e5-9a15-front/m-helios_default.jpg?w=750&f=webp&q=85" },
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

import { PanelStyleId, PanelType } from "./types";

export const POST_WIDTH_CM = 7;
export const STANDARD_PANEL_WIDTH = 182;
export const PANEL_HEIGHT_CM = 180;

const HL = (path: string) =>
  `https://jakqbjeukobtyxxxpzcr.supabase.co/storage/v1/object/public/product-images/mthekwerken/${path}`;

export const panelStyles: PanelType[] = [
  { id: "horizontal-planks", name: "Classic horizontaal", widthCm: STANDARD_PANEL_WIDTH, image: HL("5ddb2c2b-74e1-41c3-b5c5-3badd8d8b2aa/00-ef49c207-6341-4c8f-98c0-2035cfc3c87e.webp") },
  { id: "decorative", name: "Premium horizontaal", widthCm: STANDARD_PANEL_WIDTH, image: HL("a70d10e2-b8a6-4caa-8fe5-5cff76321523/00-7726568d-f4d4-4466-a56d-ec7d506bf154.webp") },
  { id: "vertical-slats", name: "Verticale latten", widthCm: STANDARD_PANEL_WIDTH, image: HL("2fd90d0c-64f6-4a93-aedd-fe44956543b0/00-cf4a2066-3a30-4ab4-b4be-258f699f2c06.webp") },
  { id: "louvers", name: "Lamellen", widthCm: STANDARD_PANEL_WIDTH, image: HL("3a126776-d70b-4c4c-bc08-671d2be0c418/00-a34f810c-f2a1-4b45-8a4b-796e3fef0654.webp") },
  { id: "aluminium", name: "Aluminium", widthCm: STANDARD_PANEL_WIDTH, image: HL("2ffe35e7-7aa6-40d7-ace1-4324f60a940e/00-c63797c9-25eb-4597-843e-7e3aa10bdb09.webp") },
  { id: "glass-panel", name: "Matglas paneel", widthCm: STANDARD_PANEL_WIDTH, image: HL("fd3b41fd-8637-495a-95f2-f5479fbf9412/00-a5073835-d590-47e6-9cf3-0a8df1217c2c.webp") },
];

// Color hex mapping from product tones
export const toneColorMap: Record<string, string> = {
  bruin: "#8B5E3C",
  grijs: "#777777",
  zwart: "#1a1a1a",
  wit: "#E8E0D8",
  eiken: "#C4A56E",
};

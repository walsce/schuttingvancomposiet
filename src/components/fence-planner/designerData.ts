import { PanelStyleId, PanelType, FenceSystem } from "./types";

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

export const modelOptions: { value: FenceSystem; label: string }[] = [
  { value: "decor", label: "Decor" },
  { value: "wpc", label: "WPC" },
  { value: "alu", label: "ALU" },
  { value: "combo", label: "Combo" },
];

export const productsByModel: Record<FenceSystem, { value: string; label: string }[]> = {
  decor: [
    { value: "paxos", label: "Paxos" },
    { value: "exotics", label: "Exotics" },
  ],
  wpc: [
    { value: "opale-premium", label: "Opale Premium" },
    { value: "opale-modern", label: "Opale Modern" },
  ],
  alu: [
    { value: "rhombus-premium", label: "Rhombus Premium" },
    { value: "rhombus-design", label: "Rhombus Design" },
  ],
  combo: [
    { value: "mix-classic", label: "Mix Classic" },
    { value: "mix-modern", label: "Mix Modern" },
  ],
};

export const colorsByModel: Record<FenceSystem, { hex: string; name: string }[]> = {
  wpc: [
    { hex: "#8B4513", name: "Cedar" },
    { hex: "#D2A679", name: "Teak" },
    { hex: "#6B3A2A", name: "Ipe" },
    { hex: "#B0B0B0", name: "Lichtgrijs" },
    { hex: "#555555", name: "Donkergrijs" },
    { hex: "#1A1A1A", name: "Ebony Black" },
  ],
  alu: [
    { hex: "#555555", name: "Donkergrijs" },
    { hex: "#1A1A1A", name: "Zwart" },
  ],
  decor: [
    { hex: "#8B4513", name: "Cedar" },
    { hex: "#D2A679", name: "Teak" },
    { hex: "#555555", name: "Donkergrijs" },
    { hex: "#1A1A1A", name: "Zwart" },
  ],
  combo: [
    { hex: "#8B4513", name: "Cedar" },
    { hex: "#555555", name: "Donkergrijs" },
    { hex: "#1A1A1A", name: "Zwart" },
  ],
};

export interface Point {
  x: number;
  y: number;
}

export interface DeckShape {
  points: Point[];
  closed: boolean;
}

export type PresetShape =
  | "rectangle"
  | "l-shape"
  | "l-shape-left"
  | "l-shape-bottom-right"
  | "l-shape-bottom-left"
  | "u-shape"
  | "t-shape"
  | "circle"
  | "custom";

export type LayingPattern = "horizontal" | "vertical" | "diagonal";

export type UsageType = "private" | "commercial";
export type GroundType = "verdicht" | "beton" | "tegels";

export interface SubstructureConfig {
  usage: UsageType;
  ground: GroundType;
  buildHeight: number; // cm
}

export interface EdgeConfig {
  wallSides: boolean[]; // per edge index
  addEdgeBoards: boolean;
}

export interface PlannerState {
  shape: DeckShape;
  preset: PresetShape;
  dimensions: {
    width: number;
    depth: number;
    cutWidth?: number;
    cutDepth?: number;
  };
  selectedProductSlug: string | null;
  areaM2: number;
}

export interface MaterialLine {
  name: string;
  unit: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
}

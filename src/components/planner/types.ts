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

export type LayingPattern = "horizontal" | "vertical" | "diagonal" | "diagonal-left" | "chevron" | "mixed";

export type LayingMethod = "staggered" | "brick" | "running";

export type UsageType = "private" | "commercial" | "intensive";
export type GroundType = "verdicht" | "beton" | "tegels" | "platdak" | "zand";
export type LevelingType = "stand" | "fundatie" | "none";
export type JointType = "dubbele-balken" | "stootbeugel" | "none";

export interface SubstructureConfig {
  usage: UsageType;
  ground: GroundType;
  buildHeight: number; // cm
  beam: string; // selected beam product id
  jointType: JointType;
  doubleBeam: boolean;
  leveling: LevelingType;
  slope: boolean;
}

export interface LayingConfig {
  pattern: LayingPattern;
  method: LayingMethod;
  startPoint: string; // corner letter e.g. "A"
  offsetX: number; // cm
  offsetY: number; // cm
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

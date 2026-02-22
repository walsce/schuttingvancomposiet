export interface Point {
  x: number;
  y: number;
}

export type FenceShape = "straight" | "l-shape" | "u-shape" | "custom" | "location";

export type GroundType = "flat" | "linear-change" | "wall";

export type PostType = "inground" | "bolt-down" | "base-plate";

export type PostColor = "black" | "grey";

export type FenceSystem = "wpc" | "alu" | "combo" | "decor";

export interface FencePanel {
  id: string;
  name: string;
  system: FenceSystem;
  image?: string;
}

export interface FenceColor {
  id: string;
  name: string;
  hex: string;
  system: FenceSystem;
}

export interface GroundSegmentConfig {
  segmentIndex: number;
  type: GroundType;
  diffLevel?: number; // cm, for linear-change
  wallHeight?: number; // cm, for wall
}

export interface PostConfig {
  type: PostType;
  color: PostColor;
}

export interface FencePlannerState {
  shape: FenceShape;
  points: Point[];
  groundConfigs: GroundSegmentConfig[];
  postConfig: PostConfig;
  selectedSystem: FenceSystem | null;
  selectedPanel: string | null;
  selectedColor: string | null;
  totalLengthCm: number;
}

export interface SegmentInfo {
  label: string;
  startLabel: string;
  endLabel: string;
  lengthCm: number;
  start: Point;
  end: Point;
}

export interface Point {
  x: number;
  y: number;
}

export type FenceShape = "straight" | "l-shape" | "u-shape" | "custom" | "location";

export type GroundType = "flat" | "linear-change" | "wall";

export type PostType = "inground" | "bolt-down" | "base-plate";

export type PostColor = "black" | "grey";

export interface GroundSegmentConfig {
  segmentIndex: number;
  type: GroundType;
  diffLevel?: number;
  wallHeight?: number;
}

export interface PostConfig {
  type: PostType;
  color: PostColor;
}

export interface SelectedProduct {
  slug: string;
  name: string;
  colorHex: string;
  image: string;
}

export interface FencePlannerState {
  shape: FenceShape;
  points: Point[];
  groundConfigs: GroundSegmentConfig[];
  postConfig: PostConfig;
  selectedProduct: SelectedProduct | null;
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

// Designer types (Step 2)
export type ViewMode = "plan" | "2d" | "3d";

export type PanelStyleId = "horizontal-planks" | "decorative" | "mosaic" | "louvers" | "vertical-slats" | "aluminium" | "lamellen-45" | "lamellen-100" | "rhombus-lamellen" | "glass-panel" | "solar-panel";

export interface PanelType {
  id: PanelStyleId;
  name: string;
  widthCm: number;
  image: string;
}

export interface PlacedPanel {
  id: string;
  panelStyleId: PanelStyleId;
  colorHex: string;
  widthCm: number;
  segmentIndex: number;
  position: number;
}

export interface DesignerState {
  placedPanels: PlacedPanel[];
  activeSegmentIndex: number;
  viewMode: ViewMode;
  selectedPanelStyle: PanelStyleId;
  selectedColorHex: string;
  zoom: number;
}

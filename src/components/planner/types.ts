export interface Point {
  x: number;
  y: number;
}

export interface DeckShape {
  points: Point[];
  closed: boolean;
}

export type PresetShape = 'rectangle' | 'l-shape' | 'u-shape' | 'custom';

export interface PlannerState {
  shape: DeckShape;
  preset: PresetShape;
  dimensions: {
    width: number;   // meters
    depth: number;   // meters
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

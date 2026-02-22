import { Point, PresetShape } from "./types";

// All presets return points in METERS – the canvas component scales them to pixels.
export function getPresetPoints(
  preset: PresetShape,
  w: number,
  d: number,
  cutW = 0,
  cutD = 0
): Point[] {
  switch (preset) {
    case "rectangle":
      return [
        { x: 0, y: 0 },
        { x: w, y: 0 },
        { x: w, y: d },
        { x: 0, y: d },
      ];

    case "l-shape": {
      const cw = cutW || w / 2;
      const cd = cutD || d / 2;
      return [
        { x: 0, y: 0 },
        { x: w, y: 0 },
        { x: w, y: d - cd },
        { x: w - cw, y: d - cd },
        { x: w - cw, y: d },
        { x: 0, y: d },
      ];
    }

    case "u-shape": {
      const cw = cutW || w / 3;
      const cd = cutD || d / 2;
      const indent = (w - cw) / 2;
      return [
        { x: 0, y: 0 },
        { x: w, y: 0 },
        { x: w, y: d },
        { x: indent + cw, y: d },
        { x: indent + cw, y: d - cd },
        { x: indent, y: d - cd },
        { x: indent, y: d },
        { x: 0, y: d },
      ];
    }

    default:
      return [
        { x: 0, y: 0 },
        { x: w, y: 0 },
        { x: w, y: d },
        { x: 0, y: d },
      ];
  }
}

/** Shoelace formula for polygon area in m² */
export function calcArea(points: Point[]): number {
  let area = 0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += points[i].x * points[j].y;
    area -= points[j].x * points[i].y;
  }
  return Math.abs(area / 2);
}

/** Distance between two points */
export function dist(a: Point, b: Point): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

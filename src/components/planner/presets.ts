import { Point, PresetShape } from "./types";

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

    case "l-shape-left": {
      const cw = cutW || w / 2;
      const cd = cutD || d / 2;
      return [
        { x: 0, y: 0 },
        { x: w, y: 0 },
        { x: w, y: d },
        { x: cw, y: d },
        { x: cw, y: d - cd },
        { x: 0, y: d - cd },
      ];
    }

    case "l-shape-bottom-right": {
      const cw = cutW || w / 2;
      const cd = cutD || d / 2;
      return [
        { x: 0, y: 0 },
        { x: w - cw, y: 0 },
        { x: w - cw, y: cd },
        { x: w, y: cd },
        { x: w, y: d },
        { x: 0, y: d },
      ];
    }

    case "l-shape-bottom-left": {
      const cw = cutW || w / 2;
      const cd = cutD || d / 2;
      return [
        { x: cw, y: 0 },
        { x: w, y: 0 },
        { x: w, y: d },
        { x: 0, y: d },
        { x: 0, y: cd },
        { x: cw, y: cd },
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

    case "t-shape": {
      const armW = cutW || w / 4;
      const armD = cutD || d / 2;
      return [
        { x: 0, y: 0 },
        { x: w, y: 0 },
        { x: w, y: armD },
        { x: (w + armW) / 2, y: armD },
        { x: (w + armW) / 2, y: d },
        { x: (w - armW) / 2, y: d },
        { x: (w - armW) / 2, y: armD },
        { x: 0, y: armD },
      ];
    }

    case "circle": {
      // Approximate circle as 12-gon inscribed in w x d ellipse
      const cx = w / 2;
      const cy = d / 2;
      const rx = w / 2;
      const ry = d / 2;
      const n = 12;
      const pts: Point[] = [];
      for (let i = 0; i < n; i++) {
        const angle = (2 * Math.PI * i) / n - Math.PI / 2;
        pts.push({
          x: Math.round((cx + rx * Math.cos(angle)) * 100) / 100,
          y: Math.round((cy + ry * Math.sin(angle)) * 100) / 100,
        });
      }
      return pts;
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

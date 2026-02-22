import { Point, FenceShape, SegmentInfo } from "./types";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function getFencePoints(shape: FenceShape, totalLengthCm = 600): Point[] {
  switch (shape) {
    case "straight":
      return [
        { x: 0, y: 0 },
        { x: totalLengthCm, y: 0 },
      ];
    case "l-shape":
      return [
        { x: 0, y: 0 },
        { x: totalLengthCm * 0.6, y: 0 },
        { x: totalLengthCm * 0.6, y: totalLengthCm * 0.4 },
      ];
    case "u-shape":
      return [
        { x: 0, y: 0 },
        { x: totalLengthCm * 0.4, y: 0 },
        { x: totalLengthCm * 0.4, y: totalLengthCm * 0.3 },
        { x: 0, y: totalLengthCm * 0.3 },
      ];
    case "custom":
    case "location":
    default:
      return [
        { x: 0, y: 0 },
        { x: totalLengthCm, y: 0 },
      ];
  }
}

export function calcSegmentLength(a: Point, b: Point): number {
  return Math.round(Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2));
}

export function getSegmentLabels(points: Point[]): SegmentInfo[] {
  const segments: SegmentInfo[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i];
    const end = points[i + 1];
    segments.push({
      label: `${LETTERS[i]} - ${LETTERS[i + 1]}`,
      startLabel: LETTERS[i],
      endLabel: LETTERS[i + 1],
      lengthCm: calcSegmentLength(start, end),
      start,
      end,
    });
  }
  return segments;
}

export function getTotalLength(points: Point[]): number {
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    total += calcSegmentLength(points[i], points[i + 1]);
  }
  return total;
}

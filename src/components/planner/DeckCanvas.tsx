import { useRef, useState, useCallback, useMemo } from "react";
import { Point, LayingPattern } from "./types";
import { dist } from "./presets";

interface FloorPlanBackground {
  imageUrl: string;
  opacity: number;
  scale: number;
  offsetX: number;
  offsetY: number;
}

interface DeckCanvasProps {
  points: Point[];
  onPointsChange: (points: Point[]) => void;
  editable: boolean;
  layingPattern?: LayingPattern;
  areaM2: number;
  floorPlan?: FloorPlanBackground | null;
  freehandMode?: boolean;
  onFreehandComplete?: (points: Point[]) => void;
}

const CANVAS_W = 600;
const CANVAS_H = 450;
const PADDING = 50;
const HANDLE_R = 7;
const MID_HANDLE_R = 5;
const GRID_STEP_PX = 40;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Simplify a polyline using Ramer-Douglas-Peucker
function rdpSimplify(pts: Point[], epsilon: number): Point[] {
  if (pts.length <= 2) return pts;
  let maxDist = 0;
  let maxIdx = 0;
  const start = pts[0], end = pts[pts.length - 1];
  for (let i = 1; i < pts.length - 1; i++) {
    const d = pointLineDistance(pts[i], start, end);
    if (d > maxDist) { maxDist = d; maxIdx = i; }
  }
  if (maxDist > epsilon) {
    const left = rdpSimplify(pts.slice(0, maxIdx + 1), epsilon);
    const right = rdpSimplify(pts.slice(maxIdx), epsilon);
    return [...left.slice(0, -1), ...right];
  }
  return [start, end];
}

function pointLineDistance(p: Point, a: Point, b: Point): number {
  const dx = b.x - a.x, dy = b.y - a.y;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return dist(p, a);
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / lenSq));
  return dist(p, { x: a.x + t * dx, y: a.y + t * dy });
}

const DeckCanvas = ({ points, onPointsChange, editable, layingPattern = "horizontal", areaM2, floorPlan, freehandMode = false, onFreehandComplete }: DeckCanvasProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState<number | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [drawPoints, setDrawPoints] = useState<Point[]>([]);

  // Fixed scale for freehand mode (10m x 7.5m canvas)
  const freehandScale = useMemo(() => {
    const worldW = 10;
    const worldH = 7.5;
    const s = Math.min((CANVAS_W - PADDING * 2) / worldW, (CANVAS_H - PADDING * 2) / worldH);
    return { scale: s, offsetX: PADDING, offsetY: PADDING };
  }, []);

  const { scale, offsetX, offsetY } = useMemo(() => {
    if (freehandMode && points.length < 2) return freehandScale;
    if (points.length < 2) return { scale: 50, offsetX: PADDING, offsetY: PADDING };
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;
    const s = Math.min((CANVAS_W - PADDING * 2) / rangeX, (CANVAS_H - PADDING * 2) / rangeY);
    const ox = PADDING + ((CANVAS_W - PADDING * 2) - rangeX * s) / 2 - minX * s;
    const oy = PADDING + ((CANVAS_H - PADDING * 2) - rangeY * s) / 2 - minY * s;
    return { scale: s, offsetX: ox, offsetY: oy };
  }, [points, freehandMode, freehandScale]);

  const toScreen = useCallback((p: Point) => ({
    x: p.x * scale + offsetX,
    y: p.y * scale + offsetY,
  }), [scale, offsetX, offsetY]);

  const toWorld = useCallback((sx: number, sy: number): Point => ({
    x: (sx - offsetX) / scale,
    y: (sy - offsetY) / scale,
  }), [scale, offsetX, offsetY]);

  const getSvgCoords = (e: React.MouseEvent): { x: number; y: number } => {
    const svg = svgRef.current!;
    const rect = svg.getBoundingClientRect();
    const scaleX = CANVAS_W / rect.width;
    const scaleY = CANVAS_H / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  // Freehand drawing handlers
  const handleFreehandDown = (e: React.MouseEvent) => {
    if (!freehandMode) return;
    e.preventDefault();
    const coords = getSvgCoords(e);
    const wp = toWorld(coords.x, coords.y);
    setDrawing(true);
    setDrawPoints([wp]);
  };

  const handleFreehandMove = (e: React.MouseEvent) => {
    if (!freehandMode || !drawing) return;
    const coords = getSvgCoords(e);
    const wp = toWorld(coords.x, coords.y);
    setDrawPoints((prev) => [...prev, wp]);
  };

  const handleFreehandUp = () => {
    if (!freehandMode || !drawing) return;
    setDrawing(false);
    if (drawPoints.length >= 3) {
      // Simplify the drawn path
      const simplified = rdpSimplify(drawPoints, 0.15);
      // Remove last point if it's too close to first (auto-close)
      const final = simplified.length > 3 && dist(simplified[0], simplified[simplified.length - 1]) < 0.3
        ? simplified.slice(0, -1)
        : simplified;
      const rounded = final.map((p) => ({ x: Math.round(p.x * 10) / 10, y: Math.round(p.y * 10) / 10 }));
      onFreehandComplete?.(rounded);
    }
    setDrawPoints([]);
  };

  const handleMouseDown = (i: number) => (e: React.MouseEvent) => {
    if (!editable || freehandMode) return;
    e.preventDefault();
    setDragging(i);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (freehandMode) {
      handleFreehandMove(e);
      return;
    }
    if (dragging === null || !editable) return;
    const { x, y } = getSvgCoords(e);
    const world = toWorld(x, y);
    world.x = Math.round(world.x * 10) / 10;
    world.y = Math.round(world.y * 10) / 10;
    const next = [...points];
    next[dragging] = world;
    onPointsChange(next);
  };

  const handleMouseUp = () => {
    if (freehandMode) {
      handleFreehandUp();
      return;
    }
    setDragging(null);
  };

  const screenPoints = points.map(toScreen);
  const pathD = screenPoints.length > 0
    ? `M ${screenPoints.map((p) => `${p.x},${p.y}`).join(" L ")} Z`
    : "";

  // Drawing path (live freehand)
  const drawScreenPoints = drawPoints.map(toScreen);
  const drawPathD = drawScreenPoints.length > 1
    ? `M ${drawScreenPoints.map((p) => `${p.x},${p.y}`).join(" L ")}`
    : "";

  // Edge labels in cm
  const edgeLabels = points.map((p, i) => {
    const next = points[(i + 1) % points.length];
    const d = dist(p, next);
    const sp = toScreen(p);
    const sn = toScreen(next);
    return {
      x: (sp.x + sn.x) / 2,
      y: (sp.y + sn.y) / 2,
      label: `${Math.round(d * 100)} cm`,
    };
  });

  // Corner labels offset outward from polygon centroid
  const centroid = useMemo(() => {
    if (screenPoints.length === 0) return { x: 0, y: 0 };
    const cx = screenPoints.reduce((s, p) => s + p.x, 0) / screenPoints.length;
    const cy = screenPoints.reduce((s, p) => s + p.y, 0) / screenPoints.length;
    return { x: cx, y: cy };
  }, [screenPoints]);

  const cornerLabels = screenPoints.map((sp, i) => {
    const dx = sp.x - centroid.x;
    const dy = sp.y - centroid.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    return {
      x: sp.x + (dx / len) * 16,
      y: sp.y + (dy / len) * 16,
      letter: LETTERS[i] || `P${i}`,
    };
  });

  // Plank pattern lines inside shape
  const patternLines = useMemo(() => {
    if (screenPoints.length < 3) return [];
    const xs = screenPoints.map((p) => p.x);
    const ys = screenPoints.map((p) => p.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const spacing = 8;
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];

    if (layingPattern === "horizontal") {
      for (let y = minY + spacing; y < maxY; y += spacing) {
        lines.push({ x1: minX, y1: y, x2: maxX, y2: y });
      }
    } else if (layingPattern === "vertical") {
      for (let x = minX + spacing; x < maxX; x += spacing) {
        lines.push({ x1: x, y1: minY, x2: x, y2: maxY });
      }
    } else {
      const range = maxX - minX + maxY - minY;
      for (let offset = -range; offset < range; offset += spacing * 1.4) {
        lines.push({
          x1: minX + offset,
          y1: minY,
          x2: minX + offset + (maxY - minY),
          y2: maxY,
        });
      }
    }
    return lines;
  }, [screenPoints, layingPattern]);

  return (
    <div className="space-y-2">
      {/* Area display above canvas */}
      <div className="text-center">
        <span className="inline-block bg-primary/10 text-primary font-bold text-sm px-4 py-1.5 rounded-lg">
          Oppervlakte: {areaM2.toFixed(2)} m²
        </span>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
        className={`w-full max-w-[600px] bg-card border border-border rounded-xl shadow-sm select-none ${
          freehandMode ? "cursor-crosshair" : ""
        }`}
        style={{ aspectRatio: `${CANVAS_W}/${CANVAS_H}` }}
        onMouseDown={freehandMode ? handleFreehandDown : undefined}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Grid */}
        <defs>
          <pattern id="grid" width={GRID_STEP_PX} height={GRID_STEP_PX} patternUnits="userSpaceOnUse">
            <path d={`M ${GRID_STEP_PX} 0 L 0 0 0 ${GRID_STEP_PX}`} fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" />
          </pattern>
          <clipPath id="shapeClip">
            <path d={pathD} />
          </clipPath>
        </defs>
        <rect width={CANVAS_W} height={CANVAS_H} fill="url(#grid)" rx="12" />

        {/* Floor plan background image */}
        {floorPlan?.imageUrl && (
          <image
            href={floorPlan.imageUrl}
            x={CANVAS_W / 2 + floorPlan.offsetX - (CANVAS_W * floorPlan.scale) / 2}
            y={CANVAS_H / 2 + floorPlan.offsetY - (CANVAS_H * floorPlan.scale) / 2}
            width={CANVAS_W * floorPlan.scale}
            height={CANVAS_H * floorPlan.scale}
            opacity={floorPlan.opacity}
            preserveAspectRatio="xMidYMid meet"
          />
        )}

        {/* Freehand drawing hint when no shape yet */}
        {freehandMode && points.length === 0 && !drawing && (
          <text
            x={CANVAS_W / 2}
            y={CANVAS_H / 2}
            textAnchor="middle"
            className="text-sm fill-muted-foreground select-none"
          >
            Teken je vorm op het canvas
          </text>
        )}

        {/* Shape fill */}
        {screenPoints.length >= 3 && (
          <path d={pathD} fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" />
        )}

        {/* Plank pattern lines clipped to shape */}
        {screenPoints.length >= 3 && (
          <g clipPath="url(#shapeClip)">
            {patternLines.map((l, i) => (
              <line
                key={`pl-${i}`}
                x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                stroke="hsl(var(--primary) / 0.25)"
                strokeWidth="1"
              />
            ))}
          </g>
        )}

        {/* Live freehand drawing path */}
        {drawing && drawPathD && (
          <path
            d={drawPathD}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 3"
          />
        )}

        {/* Edge length labels */}
        {!freehandMode && points.length >= 2 && edgeLabels.map((l, i) => (
          <g key={`label-${i}`}>
            <rect x={l.x - 24} y={l.y - 10} width="48" height="18" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.5" />
            <text x={l.x} y={l.y + 3} textAnchor="middle" className="text-[9px] fill-foreground font-medium select-none">{l.label}</text>
          </g>
        ))}

        {/* Corner labels */}
        {!freehandMode && cornerLabels.map((cl, i) => (
          <text
            key={`corner-${i}`}
            x={cl.x}
            y={cl.y + 4}
            textAnchor="middle"
            className="text-[11px] fill-primary font-bold select-none"
          >
            {cl.letter}
          </text>
        ))}

        {/* Draggable corner handles */}
        {editable && !freehandMode && screenPoints.map((sp, i) => (
          <circle
            key={`handle-${i}`}
            cx={sp.x}
            cy={sp.y}
            r={HANDLE_R}
            fill="hsl(var(--primary))"
            stroke="hsl(var(--background))"
            strokeWidth="2"
            className="cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown(i)}
          />
        ))}

        {/* Midpoint handles */}
        {editable && !freehandMode && screenPoints.map((sp, i) => {
          const next = screenPoints[(i + 1) % screenPoints.length];
          const mx = (sp.x + next.x) / 2;
          const my = (sp.y + next.y) / 2;
          return (
            <circle
              key={`mid-${i}`}
              cx={mx}
              cy={my}
              r={MID_HANDLE_R}
              fill="hsl(var(--background))"
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => {
                const wp = toWorld(mx, my);
                wp.x = Math.round(wp.x * 10) / 10;
                wp.y = Math.round(wp.y * 10) / 10;
                const newPts = [...points];
                newPts.splice(i + 1, 0, wp);
                onPointsChange(newPts);
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default DeckCanvas;

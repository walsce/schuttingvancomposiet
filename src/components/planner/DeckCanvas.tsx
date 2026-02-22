import { useRef, useState, useCallback, useMemo } from "react";
import { Point, LayingPattern, LayingMethod } from "./types";
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
  layingMethod?: LayingMethod;
  selectedProduct?: string | null;
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

const PRODUCT_COLORS: Record<string, string> = {
  "vlonder-donker-grijs": "#6B6B6B",
  "vlonder-teak": "#B08050",
  "vlonder-vergrijsd-eiken": "#9E9285",
  "vlonder-walnoot": "#7A5C3E",
  "vlonder-massief-grijs": "#808080",
  "vlonder-massief-teak": "#C4935A",
  "vlonder-massief-zwart": "#3A3A3A",
};
const DEFAULT_PLANK_COLOR = "#A08060";

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function varyColor(hex: string, rowIndex: number): string {
  const [h, s, l] = hexToHsl(hex);
  // Alternate lightness +/- 3-5%
  const variation = ((rowIndex * 7 + 3) % 11) - 5; // deterministic -5..+5
  const newL = Math.max(10, Math.min(90, l + variation));
  return `hsl(${h}, ${s}%, ${newL}%)`;
}

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

interface PlankRect {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
}

const DeckCanvas = ({ points, onPointsChange, editable, layingPattern = "horizontal", layingMethod = "staggered", selectedProduct, areaM2, floorPlan, freehandMode = false, onFreehandComplete }: DeckCanvasProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState<number | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [drawPoints, setDrawPoints] = useState<Point[]>([]);

  const baseColor = selectedProduct ? (PRODUCT_COLORS[selectedProduct] || DEFAULT_PLANK_COLOR) : DEFAULT_PLANK_COLOR;

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
      const simplified = rdpSimplify(drawPoints, 0.15);
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

  // Generate plank rectangles
  const patternPlanks = useMemo((): PlankRect[] => {
    if (screenPoints.length < 3) return [];
    const xs = screenPoints.map((p) => p.x);
    const ys = screenPoints.map((p) => p.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);

    const plankWidthPx = 0.138 * scale; // 13.8cm in world units -> pixels
    const plankGap = 3;
    const plankLengthPx = 3.0 * scale; // 3m plank length
    const plankEndGap = 2;
    const planks: PlankRect[] = [];

    const isVertical = layingPattern === "vertical";
    const isDiagonal = layingPattern === "diagonal" || layingPattern === "diagonal-left";
    const isChevron = layingPattern === "chevron";

    if (isVertical) {
      // Vertical: planks run top-to-bottom, iterate columns left-to-right
      let col = 0;
      for (let x = minX; x < maxX; x += plankWidthPx + plankGap) {
        const rowOffset = getOffset(col, plankLengthPx, layingMethod);
        for (let y = minY - plankLengthPx + rowOffset; y < maxY; y += plankLengthPx + plankEndGap) {
          planks.push({
            x,
            y,
            w: Math.min(plankWidthPx, maxX - x),
            h: plankLengthPx,
            fill: varyColor(baseColor, col),
          });
        }
        col++;
      }
    } else if (isDiagonal || isChevron) {
      // For diagonal, generate in a rotated frame, then we'll wrap in transform
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      const diag = Math.sqrt((maxX - minX) ** 2 + (maxY - minY) ** 2);
      const eMinX = cx - diag;
      const eMaxX = cx + diag;
      const eMinY = cy - diag;
      const eMaxY = cy + diag;

      let row = 0;
      for (let y = eMinY; y < eMaxY; y += plankWidthPx + plankGap) {
        const rowOffset = getOffset(row, plankLengthPx, layingMethod);
        for (let x = eMinX - plankLengthPx + rowOffset; x < eMaxX; x += plankLengthPx + plankEndGap) {
          planks.push({
            x,
            y,
            w: plankLengthPx,
            h: plankWidthPx,
            fill: varyColor(baseColor, row),
          });
        }
        row++;
      }
    } else {
      // Horizontal (default): planks run left-to-right
      let row = 0;
      for (let y = minY; y < maxY; y += plankWidthPx + plankGap) {
        const rowOffset = getOffset(row, plankLengthPx, layingMethod);
        for (let x = minX - plankLengthPx + rowOffset; x < maxX; x += plankLengthPx + plankEndGap) {
          planks.push({
            x,
            y,
            w: plankLengthPx,
            h: Math.min(plankWidthPx, maxY - y),
            fill: varyColor(baseColor, row),
          });
        }
        row++;
      }
    }

    return planks;
  }, [screenPoints, layingPattern, layingMethod, baseColor, scale]);

  // Diagonal transform params
  const diagonalTransform = useMemo(() => {
    if (screenPoints.length < 3) return "";
    const isDiagonal = layingPattern === "diagonal" || layingPattern === "diagonal-left";
    const isChevron = layingPattern === "chevron";
    if (!isDiagonal && !isChevron) return "";
    const xs = screenPoints.map((p) => p.x);
    const ys = screenPoints.map((p) => p.y);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
    const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    const angle = layingPattern === "diagonal-left" ? -45 : 45;
    return `rotate(${angle}, ${cx}, ${cy})`;
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
          {/* Subtle wood grain filter */}
          <filter id="woodGrain" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.4 0.02" numOctaves="3" seed="2" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="soft-light" />
          </filter>
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

        {/* Shape background fill with product color */}
        {screenPoints.length >= 3 && (
          <path
            d={pathD}
            fill={baseColor}
            fillOpacity={0.3}
            stroke="none"
          />
        )}

        {/* Plank rectangles clipped to shape */}
        {screenPoints.length >= 3 && patternPlanks.length > 0 && (
          <g clipPath="url(#shapeClip)">
            <g transform={diagonalTransform} filter="url(#woodGrain)">
              {patternPlanks.map((p, i) => (
                <rect
                  key={`plank-${i}`}
                  x={p.x}
                  y={p.y}
                  width={p.w}
                  height={p.h}
                  fill={p.fill}
                  rx={1}
                />
              ))}
            </g>
          </g>
        )}

        {/* Shape outline on top */}
        {screenPoints.length >= 3 && (
          <path
            d={pathD}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinejoin="round"
          />
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

function getOffset(rowIndex: number, plankLength: number, method: LayingMethod): number {
  switch (method) {
    case "brick":
      return (rowIndex % 2) * (plankLength / 2);
    case "running":
      return (rowIndex % 3) * (plankLength / 3);
    case "staggered":
    default:
      // Deterministic pseudo-random offset
      return ((rowIndex * 137 + 43) % 100) / 100 * (plankLength * 0.6);
  }
}

export default DeckCanvas;

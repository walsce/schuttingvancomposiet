import { useRef, useState, useCallback, useMemo } from "react";
import { Point, LayingPattern } from "./types";
import { dist } from "./presets";

interface DeckCanvasProps {
  points: Point[];
  onPointsChange: (points: Point[]) => void;
  editable: boolean;
  layingPattern?: LayingPattern;
  areaM2: number;
}

const CANVAS_W = 600;
const CANVAS_H = 450;
const PADDING = 50;
const HANDLE_R = 7;
const MID_HANDLE_R = 5;
const GRID_STEP_PX = 40;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const DeckCanvas = ({ points, onPointsChange, editable, layingPattern = "horizontal", areaM2 }: DeckCanvasProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState<number | null>(null);

  const { scale, offsetX, offsetY } = useMemo(() => {
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
  }, [points]);

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
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleMouseDown = (i: number) => (e: React.MouseEvent) => {
    if (!editable) return;
    e.preventDefault();
    setDragging(i);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging === null || !editable) return;
    const { x, y } = getSvgCoords(e);
    const world = toWorld(x, y);
    world.x = Math.round(world.x * 10) / 10;
    world.y = Math.round(world.y * 10) / 10;
    const next = [...points];
    next[dragging] = world;
    onPointsChange(next);
  };

  const handleMouseUp = () => setDragging(null);

  const screenPoints = points.map(toScreen);
  const pathD = screenPoints.length > 0
    ? `M ${screenPoints.map((p) => `${p.x},${p.y}`).join(" L ")} Z`
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
      // Diagonal
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
        className="w-full max-w-[600px] bg-card border border-border rounded-xl shadow-sm select-none"
        style={{ aspectRatio: `${CANVAS_W}/${CANVAS_H}` }}
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

        {/* Edge length labels */}
        {points.length >= 2 && edgeLabels.map((l, i) => (
          <g key={`label-${i}`}>
            <rect x={l.x - 24} y={l.y - 10} width="48" height="18" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.5" />
            <text x={l.x} y={l.y + 3} textAnchor="middle" className="text-[9px] fill-foreground font-medium select-none">{l.label}</text>
          </g>
        ))}

        {/* Corner labels */}
        {cornerLabels.map((cl, i) => (
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
        {editable && screenPoints.map((sp, i) => (
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
        {editable && screenPoints.map((sp, i) => {
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

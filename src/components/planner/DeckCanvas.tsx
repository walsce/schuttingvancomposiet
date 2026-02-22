import { useRef, useState, useCallback, useMemo } from "react";
import { Point } from "./types";
import { dist } from "./presets";

interface DeckCanvasProps {
  points: Point[];
  onPointsChange: (points: Point[]) => void;
  editable: boolean;
}

const CANVAS_W = 600;
const CANVAS_H = 450;
const PADDING = 40;
const HANDLE_R = 7;
const GRID_STEP_PX = 40;

const DeckCanvas = ({ points, onPointsChange, editable }: DeckCanvasProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState<number | null>(null);

  // Compute scale: fit all points into the canvas with padding
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
    // Snap to 0.1m grid
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

  // Edge labels (side lengths in meters)
  const edgeLabels = points.map((p, i) => {
    const next = points[(i + 1) % points.length];
    const d = dist(p, next);
    const sp = toScreen(p);
    const sn = toScreen(next);
    return {
      x: (sp.x + sn.x) / 2,
      y: (sp.y + sn.y) / 2,
      label: `${d.toFixed(2)}m`,
    };
  });

  return (
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
      </defs>
      <rect width={CANVAS_W} height={CANVAS_H} fill="url(#grid)" rx="12" />

      {/* Shape fill */}
      {screenPoints.length >= 3 && (
        <path d={pathD} fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" />
      )}

      {/* Edge length labels */}
      {points.length >= 2 && edgeLabels.map((l, i) => (
        <g key={`label-${i}`}>
          <rect x={l.x - 22} y={l.y - 10} width="44" height="18" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.5" />
          <text x={l.x} y={l.y + 3} textAnchor="middle" className="text-[10px] fill-foreground font-medium select-none">{l.label}</text>
        </g>
      ))}

      {/* Draggable handles */}
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
    </svg>
  );
};

export default DeckCanvas;

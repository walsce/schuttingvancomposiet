import { useMemo, useState, useCallback, useRef } from "react";
import { Point, SegmentInfo } from "./types";
import { getSegmentLabels } from "./fencePresets";

interface FenceCanvasProps {
  points: Point[];
  activeSegment?: number;
  onPointMove?: (index: number, newPos: Point) => void;
  onSelectSegment?: (index: number) => void;
}

const CANVAS_W = 800;
const CANVAS_H = 500;
const PAD = 60;
const HANDLE_R = 8;
const GRID_STEP = 40;

const FenceCanvas = ({ points, activeSegment, onPointMove, onSelectSegment }: FenceCanvasProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState<number | null>(null);

  // Calculate scale to fit all points
  const { screenPoints, segments } = useMemo(() => {
    if (points.length < 2) return { screenPoints: [], segments: [] };

    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;

    const drawW = CANVAS_W - PAD * 2;
    const drawH = CANVAS_H - PAD * 2;
    const scale = Math.min(drawW / rangeX, drawH / rangeY);

    const offsetX = PAD + (drawW - rangeX * scale) / 2;
    const offsetY = PAD + (drawH - rangeY * scale) / 2;

    const sp = points.map((p) => ({
      x: offsetX + (p.x - minX) * scale,
      y: offsetY + (p.y - minY) * scale,
    }));

    return { screenPoints: sp, segments: getSegmentLabels(points) };
  }, [points]);

  const getSvgPoint = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!svgRef.current) return { x: 0, y: 0 };
      const svg = svgRef.current;
      const rect = svg.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      return {
        x: ((clientX - rect.left) / rect.width) * CANVAS_W,
        y: ((clientY - rect.top) / rect.height) * CANVAS_H,
      };
    },
    []
  );

  const handlePointerDown = (index: number) => (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setDragging(index);
  };

  const handlePointerMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (dragging === null || !onPointMove) return;
      e.preventDefault();

      const svgPt = getSvgPoint(e);
      // Reverse the transform to get world coords
      const xs = points.map((p) => p.x);
      const ys = points.map((p) => p.y);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);
      const rangeX = maxX - minX || 1;
      const rangeY = maxY - minY || 1;
      const drawW = CANVAS_W - PAD * 2;
      const drawH = CANVAS_H - PAD * 2;
      const scale = Math.min(drawW / rangeX, drawH / rangeY);
      const offsetX = PAD + (drawW - rangeX * scale) / 2;
      const offsetY = PAD + (drawH - rangeY * scale) / 2;

      const worldX = (svgPt.x - offsetX) / scale + minX;
      const worldY = (svgPt.y - offsetY) / scale + minY;

      onPointMove(dragging, { x: Math.round(worldX), y: Math.round(worldY) });
    },
    [dragging, points, onPointMove, getSvgPoint]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return (
    <div className="w-full bg-white rounded-lg border border-border overflow-hidden">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
        className="w-full h-auto select-none"
        style={{ touchAction: "none" }}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        {/* Grid */}
        {Array.from({ length: Math.ceil(CANVAS_W / GRID_STEP) + 1 }).map((_, i) => (
          <line
            key={`gv${i}`}
            x1={i * GRID_STEP}
            y1={0}
            x2={i * GRID_STEP}
            y2={CANVAS_H}
            stroke="#e5e7eb"
            strokeWidth={0.5}
          />
        ))}
        {Array.from({ length: Math.ceil(CANVAS_H / GRID_STEP) + 1 }).map((_, i) => (
          <line
            key={`gh${i}`}
            x1={0}
            y1={i * GRID_STEP}
            x2={CANVAS_W}
            y2={i * GRID_STEP}
            stroke="#e5e7eb"
            strokeWidth={0.5}
          />
        ))}

        {/* Fence segments */}
        {screenPoints.length >= 2 &&
          segments.map((seg, i) => {
            const sp = screenPoints[i];
            const ep = screenPoints[i + 1];
            const isActive = activeSegment === i;
            return (
              <g key={i}>
                <line
                  x1={sp.x}
                  y1={sp.y}
                  x2={ep.x}
                  y2={ep.y}
                  stroke={isActive ? "hsl(var(--primary))" : "#374151"}
                  strokeWidth={isActive ? 6 : 4}
                  strokeLinecap="round"
                  className="cursor-pointer"
                  onClick={() => onSelectSegment?.(i)}
                />
                {/* Segment label */}
                <text
                  x={(sp.x + ep.x) / 2}
                  y={(sp.y + ep.y) / 2 - 14}
                  textAnchor="middle"
                  fill="#374151"
                  fontSize={11}
                  fontWeight={600}
                >
                  Segment {seg.label}
                </text>
                <text
                  x={(sp.x + ep.x) / 2}
                  y={(sp.y + ep.y) / 2 + 2}
                  textAnchor="middle"
                  fill="#6b7280"
                  fontSize={10}
                >
                  {seg.lengthCm} cm
                </text>
              </g>
            );
          })}

        {/* Handles */}
        {screenPoints.map((sp, i) => (
          <g key={`h${i}`}>
            <circle
              cx={sp.x}
              cy={sp.y}
              r={HANDLE_R}
              fill={dragging === i ? "hsl(var(--primary))" : "#1f2937"}
              stroke="white"
              strokeWidth={2}
              className="cursor-grab active:cursor-grabbing"
              onMouseDown={handlePointerDown(i)}
              onTouchStart={handlePointerDown(i)}
            />
            <text
              x={sp.x}
              y={sp.y - 16}
              textAnchor="middle"
              fill="#1f2937"
              fontSize={13}
              fontWeight={700}
            >
              {LETTERS[i]}
            </text>
          </g>
        ))}

        {/* Green diamond at bottom center */}
        <polygon
          points={`${CANVAS_W / 2},${CANVAS_H - 20} ${CANVAS_W / 2 + 8},${CANVAS_H - 12} ${CANVAS_W / 2},${CANVAS_H - 4} ${CANVAS_W / 2 - 8},${CANVAS_H - 12}`}
          fill="hsl(var(--primary))"
        />
      </svg>
    </div>
  );
};

export default FenceCanvas;

import { useMemo } from "react";
import { PlacedPanel } from "./types";
import { POST_WIDTH_CM } from "./designerData";

interface PlanViewCanvasProps {
  segmentLengthCm: number;
  segmentLabel: string;
  placedPanels: PlacedPanel[];
  zoom: number;
}

const CANVAS_W = 1100;
const CANVAS_H = 300;
const LINE_Y = 160;
const POST_SIZE = 14;

const PlanViewCanvas = ({ segmentLengthCm, segmentLabel, placedPanels, zoom }: PlanViewCanvasProps) => {
  const scale = useMemo(() => {
    const maxDrawW = CANVAS_W - 120;
    return maxDrawW / Math.max(segmentLengthCm, 200);
  }, [segmentLengthCm]);

  const startX = 60;

  const elements = useMemo(() => {
    const els: { type: "post" | "panel"; x: number; w: number; panel?: PlacedPanel }[] = [];
    let cursor = 0;

    els.push({ type: "post", x: cursor, w: POST_WIDTH_CM });
    cursor += POST_WIDTH_CM;

    for (const p of placedPanels) {
      els.push({ type: "panel", x: cursor, w: p.widthCm, panel: p });
      cursor += p.widthCm;
      els.push({ type: "post", x: cursor, w: POST_WIDTH_CM });
      cursor += POST_WIDTH_CM;
    }

    return els;
  }, [placedPanels]);

  const totalUsed = elements.reduce(
    (sum, el) => sum + el.w,
    0,
  );

  return (
    <svg
      viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
      className="w-full h-full max-h-[60vh]"
      preserveAspectRatio="xMidYMid meet"
      style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
    >
      {/* Background */}
      <rect x={0} y={0} width={CANVAS_W} height={CANVAS_H} fill="hsl(var(--background))" />

      {/* Title */}
      <text x={CANVAS_W / 2} y={30} textAnchor="middle" fontSize={15} fontWeight={700} fill="hsl(var(--foreground))">
        Segment {segmentLabel}
      </text>
      <text x={CANVAS_W / 2} y={48} textAnchor="middle" fontSize={12} fill="hsl(var(--muted-foreground))">
        {segmentLengthCm} cm
      </text>

      {/* Total dimension line */}
      <g>
        <line x1={startX} y1={80} x2={startX + segmentLengthCm * scale} y2={80} stroke="hsl(var(--primary))" strokeWidth={1.2} />
        <line x1={startX} y1={74} x2={startX} y2={86} stroke="hsl(var(--primary))" strokeWidth={1.2} />
        <line x1={startX + segmentLengthCm * scale} y1={74} x2={startX + segmentLengthCm * scale} y2={86} stroke="hsl(var(--primary))" strokeWidth={1.2} />
        {/* Arrows */}
        <polygon points={`${startX},80 ${startX + 6},77 ${startX + 6},83`} fill="hsl(var(--primary))" />
        <polygon
          points={`${startX + segmentLengthCm * scale},80 ${startX + segmentLengthCm * scale - 6},77 ${startX + segmentLengthCm * scale - 6},83`}
          fill="hsl(var(--primary))"
        />
        <text
          x={startX + (segmentLengthCm * scale) / 2}
          y={72}
          textAnchor="middle"
          fontSize={11}
          fontWeight={600}
          fill="hsl(var(--primary))"
        >
          {segmentLengthCm} cm
        </text>
      </g>

      {/* Guide lines: dashed from dim line to fence line */}
      <line x1={startX} y1={86} x2={startX} y2={LINE_Y - 12} stroke="hsl(var(--border))" strokeWidth={0.5} strokeDasharray="3 3" />
      <line
        x1={startX + segmentLengthCm * scale}
        y1={86}
        x2={startX + segmentLengthCm * scale}
        y2={LINE_Y - 12}
        stroke="hsl(var(--border))"
        strokeWidth={0.5}
        strokeDasharray="3 3"
      />

      {/* Fence base line (full segment) */}
      <line
        x1={startX}
        y1={LINE_Y}
        x2={startX + segmentLengthCm * scale}
        y2={LINE_Y}
        stroke="hsl(var(--border))"
        strokeWidth={4}
        strokeLinecap="round"
      />

      {/* Elements */}
      {elements.map((el, i) => {
        const sx = startX + el.x * scale;
        const sw = el.w * scale;

        if (el.type === "post") {
          const pw = Math.max(sw, POST_SIZE);
          return (
            <g key={`post-${i}`}>
              <rect
                x={sx}
                y={LINE_Y - POST_SIZE / 2}
                width={pw}
                height={POST_SIZE}
                fill="hsl(var(--foreground))"
                opacity={0.8}
                rx={2}
              />
              {/* Inner detail */}
              <rect
                x={sx + 2}
                y={LINE_Y - POST_SIZE / 2 + 2}
                width={Math.max(pw - 4, 2)}
                height={POST_SIZE - 4}
                fill="hsl(var(--foreground))"
                opacity={0.3}
                rx={1}
              />
            </g>
          );
        }

        const panel = el.panel!;
        return (
          <g key={`panel-${i}`}>
            {/* Panel fill */}
            <rect
              x={sx}
              y={LINE_Y - 8}
              width={sw}
              height={16}
              fill={panel.colorHex}
              opacity={0.5}
              rx={2}
            />
            {/* Hatching for visual interest */}
            {Array.from({ length: Math.floor(sw / 8) }, (_, j) => (
              <line
                key={j}
                x1={sx + j * 8}
                y1={LINE_Y - 7}
                x2={sx + j * 8 + 4}
                y2={LINE_Y + 7}
                stroke={panel.colorHex}
                strokeWidth={0.5}
                opacity={0.3}
              />
            ))}

            {/* Per-panel dimension below */}
            <line
              x1={sx}
              y1={LINE_Y + 22}
              x2={sx + sw}
              y2={LINE_Y + 22}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={0.7}
            />
            <line x1={sx} y1={LINE_Y + 18} x2={sx} y2={LINE_Y + 26} stroke="hsl(var(--muted-foreground))" strokeWidth={0.7} />
            <line x1={sx + sw} y1={LINE_Y + 18} x2={sx + sw} y2={LINE_Y + 26} stroke="hsl(var(--muted-foreground))" strokeWidth={0.7} />
            {/* Arrows */}
            <polygon
              points={`${sx},${LINE_Y + 22} ${sx + 4},${LINE_Y + 20} ${sx + 4},${LINE_Y + 24}`}
              fill="hsl(var(--muted-foreground))"
            />
            <polygon
              points={`${sx + sw},${LINE_Y + 22} ${sx + sw - 4},${LINE_Y + 20} ${sx + sw - 4},${LINE_Y + 24}`}
              fill="hsl(var(--muted-foreground))"
            />
            <text
              x={sx + sw / 2}
              y={LINE_Y + 38}
              textAnchor="middle"
              fontSize={10}
              fill="hsl(var(--muted-foreground))"
            >
              {panel.widthCm} cm
            </text>
          </g>
        );
      })}

      {/* Remaining area indicator */}
      {placedPanels.length > 0 && segmentLengthCm > totalUsed && (
        <g>
          <rect
            x={startX + totalUsed * scale}
            y={LINE_Y - 5}
            width={(segmentLengthCm - totalUsed) * scale}
            height={10}
            fill="hsl(var(--primary))"
            opacity={0.08}
            strokeDasharray="4 2"
            stroke="hsl(var(--primary))"
            strokeWidth={0.5}
            rx={2}
          />
          <text
            x={startX + totalUsed * scale + ((segmentLengthCm - totalUsed) * scale) / 2}
            y={LINE_Y + 52}
            textAnchor="middle"
            fontSize={9}
            fill="hsl(var(--primary))"
            opacity={0.7}
          >
            Rest: {segmentLengthCm - totalUsed} cm
          </text>
        </g>
      )}

      {/* Point labels */}
      <g>
        <circle cx={startX} cy={LINE_Y + 70} r={12} fill="hsl(var(--primary))" opacity={0.12} />
        <text x={startX} y={LINE_Y + 74} textAnchor="middle" fontSize={13} fontWeight={700} fill="hsl(var(--foreground))">
          {segmentLabel.split(" - ")[0]}
        </text>
      </g>
      <g>
        <circle cx={startX + segmentLengthCm * scale} cy={LINE_Y + 70} r={12} fill="hsl(var(--primary))" opacity={0.12} />
        <text
          x={startX + segmentLengthCm * scale}
          y={LINE_Y + 74}
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill="hsl(var(--foreground))"
        >
          {segmentLabel.split(" - ")[1]}
        </text>
      </g>
    </svg>
  );
};

export default PlanViewCanvas;

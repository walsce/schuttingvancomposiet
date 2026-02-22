import { useMemo } from "react";
import { PlacedPanel } from "./types";
import { POST_WIDTH_CM } from "./designerData";

interface PlanViewCanvasProps {
  segmentLengthCm: number;
  segmentLabel: string;
  placedPanels: PlacedPanel[];
  zoom: number;
}

const CANVAS_W = 900;
const CANVAS_H = 250;
const LINE_Y = 140;
const POST_SIZE = 12;

const PlanViewCanvas = ({ segmentLengthCm, segmentLabel, placedPanels, zoom }: PlanViewCanvasProps) => {
  const scale = useMemo(() => {
    const maxDrawW = CANVAS_W - 100;
    return maxDrawW / Math.max(segmentLengthCm, 200);
  }, [segmentLengthCm]);

  const startX = 50;

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

  return (
    <svg
      viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
      className="w-full h-full"
      style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
    >
      {/* Title */}
      <text x={CANVAS_W / 2} y={30} textAnchor="middle" className="text-sm font-semibold fill-foreground">
        Segment {segmentLabel}
      </text>
      <text x={CANVAS_W / 2} y={48} textAnchor="middle" className="text-xs fill-muted-foreground">
        {segmentLengthCm} cm
      </text>

      {/* Total dimension line */}
      <line x1={startX} y1={75} x2={startX + segmentLengthCm * scale} y2={75} stroke="hsl(var(--primary))" strokeWidth={1} />
      <line x1={startX} y1={70} x2={startX} y2={80} stroke="hsl(var(--primary))" strokeWidth={1} />
      <line x1={startX + segmentLengthCm * scale} y1={70} x2={startX + segmentLengthCm * scale} y2={80} stroke="hsl(var(--primary))" strokeWidth={1} />
      <text x={startX + (segmentLengthCm * scale) / 2} y={68} textAnchor="middle" className="text-[10px] fill-primary font-medium">
        {segmentLengthCm} cm
      </text>

      {/* Fence line */}
      <line x1={startX} y1={LINE_Y} x2={startX + segmentLengthCm * scale} y2={LINE_Y} stroke="hsl(var(--border))" strokeWidth={3} />

      {/* Elements */}
      {elements.map((el, i) => {
        const sx = startX + el.x * scale;
        const sw = el.w * scale;

        if (el.type === "post") {
          return (
            <rect key={i} x={sx - POST_SIZE / 2 + sw * scale / 2} y={LINE_Y - POST_SIZE / 2}
              width={Math.max(sw, POST_SIZE)} height={POST_SIZE}
              fill="hsl(var(--foreground))" opacity={0.7} rx={2}
            />
          );
        }

        const panel = el.panel!;
        return (
          <g key={i}>
            <rect x={sx} y={LINE_Y - 6} width={sw} height={12} fill={panel.colorHex} opacity={0.4} rx={1} />
            {/* Dimension */}
            <line x1={sx} y1={LINE_Y + 25} x2={sx + sw} y2={LINE_Y + 25} stroke="hsl(var(--muted-foreground))" strokeWidth={0.5} />
            <line x1={sx} y1={LINE_Y + 20} x2={sx} y2={LINE_Y + 30} stroke="hsl(var(--muted-foreground))" strokeWidth={0.5} />
            <line x1={sx + sw} y1={LINE_Y + 20} x2={sx + sw} y2={LINE_Y + 30} stroke="hsl(var(--muted-foreground))" strokeWidth={0.5} />
            <text x={sx + sw / 2} y={LINE_Y + 42} textAnchor="middle" className="text-[9px] fill-muted-foreground">
              {panel.widthCm} cm
            </text>
          </g>
        );
      })}

      {/* Point labels */}
      <text x={startX} y={LINE_Y + 60} textAnchor="middle" className="text-xs font-semibold fill-foreground">
        {segmentLabel.split(" - ")[0]}
      </text>
      <text x={startX + segmentLengthCm * scale} y={LINE_Y + 60} textAnchor="middle" className="text-xs font-semibold fill-foreground">
        {segmentLabel.split(" - ")[1]}
      </text>
    </svg>
  );
};

export default PlanViewCanvas;

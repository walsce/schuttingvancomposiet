import { useMemo } from "react";
import { PlacedPanel, PanelStyleId } from "./types";
import { POST_WIDTH_CM } from "./designerData";

interface PanelDesignerCanvasProps {
  segmentLengthCm: number;
  segmentLabel: string;
  placedPanels: PlacedPanel[];
  onAddPanel: () => void;
  zoom: number;
}

const CANVAS_W = 900;
const CANVAS_H = 400;
const GROUND_Y = 340;
const PANEL_TOP = 80;
const POST_VISUAL_W = 10;

const panelPattern = (styleId: PanelStyleId, x: number, y: number, w: number, h: number, color: string) => {
  switch (styleId) {
    case "horizontal-planks":
      return Array.from({ length: Math.floor(h / 14) }, (_, i) => (
        <rect key={i} x={x + 2} y={y + i * 14 + 2} width={w - 4} height={12} rx={1} fill={color} opacity={0.7 + (i % 2) * 0.15} />
      ));
    case "vertical-slats":
      return Array.from({ length: Math.floor(w / 14) }, (_, i) => (
        <rect key={i} x={x + i * 14 + 2} y={y + 2} width={10} height={h - 4} rx={1} fill={color} opacity={0.7 + (i % 2) * 0.15} />
      ));
    case "louvers":
      return Array.from({ length: Math.floor(h / 10) }, (_, i) => (
        <rect key={i} x={x + 2} y={y + i * 10 + 1} width={w - 4} height={7} rx={0.5} fill={color} opacity={0.65 + (i % 3) * 0.1} />
      ));
    case "mosaic":
      return Array.from({ length: Math.floor(h / 18) }, (_, row) =>
        Array.from({ length: Math.floor(w / 18) }, (_, col) => (
          <rect key={`${row}-${col}`} x={x + col * 18 + 2} y={y + row * 18 + 2} width={14} height={14} rx={2} fill={color} opacity={0.4 + ((row + col) % 3) * 0.15} />
        ))
      ).flat();
    default:
      return [<rect key="fill" x={x} y={y} width={w} height={h} fill={color} opacity={0.6} />];
  }
};

const PanelDesignerCanvas = ({ segmentLengthCm, segmentLabel, placedPanels, onAddPanel, zoom }: PanelDesignerCanvasProps) => {
  const scale = useMemo(() => {
    const maxDrawW = CANVAS_W - 80;
    return maxDrawW / Math.max(segmentLengthCm, 200);
  }, [segmentLengthCm]);

  const panelHeight = GROUND_Y - PANEL_TOP;
  const startX = 40;

  // Build visual elements
  const elements = useMemo(() => {
    const els: { type: "post" | "panel"; x: number; w: number; panel?: PlacedPanel }[] = [];
    let cursor = 0;

    // Leading post
    els.push({ type: "post", x: cursor, w: POST_WIDTH_CM });
    cursor += POST_WIDTH_CM;

    for (const p of placedPanels) {
      els.push({ type: "panel", x: cursor, w: p.widthCm, panel: p });
      cursor += p.widthCm;
      els.push({ type: "post", x: cursor, w: POST_WIDTH_CM });
      cursor += POST_WIDTH_CM;
    }

    return { els, usedLength: cursor };
  }, [placedPanels]);

  const remaining = segmentLengthCm - elements.usedLength;

  return (
    <svg
      viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
      className="w-full h-full"
      style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
    >
      {/* Ground line */}
      <line x1={0} y1={GROUND_Y} x2={CANVAS_W} y2={GROUND_Y} stroke="hsl(var(--border))" strokeWidth={2} />
      <rect x={0} y={GROUND_Y} width={CANVAS_W} height={CANVAS_H - GROUND_Y} fill="hsl(var(--muted))" opacity={0.5} />

      {/* Segment label */}
      <text x={CANVAS_W / 2} y={25} textAnchor="middle" className="text-sm font-semibold fill-foreground">
        Segment {segmentLabel}
      </text>
      <text x={CANVAS_W / 2} y={42} textAnchor="middle" className="text-xs fill-muted-foreground">
        {segmentLengthCm} cm
      </text>

      {/* Dimension line */}
      <line x1={startX} y1={60} x2={startX + segmentLengthCm * scale} y2={60} stroke="hsl(var(--primary))" strokeWidth={1} markerStart="url(#arrow)" markerEnd="url(#arrow)" />
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--primary))" />
        </marker>
      </defs>

      {/* Posts and panels */}
      {elements.els.map((el, i) => {
        const sx = startX + el.x * scale;
        const sw = el.w * scale;

        if (el.type === "post") {
          return (
            <rect key={`post-${i}`} x={sx} y={PANEL_TOP - 10} width={Math.max(sw, POST_VISUAL_W)} height={panelHeight + 10} rx={1} fill="hsl(var(--foreground))" opacity={0.7} />
          );
        }

        const panel = el.panel!;
        return (
          <g key={`panel-${i}`}>
            <rect x={sx} y={PANEL_TOP} width={sw} height={panelHeight} fill={panel.colorHex} opacity={0.15} stroke={panel.colorHex} strokeWidth={1} rx={2} />
            {panelPattern(panel.panelStyleId, sx, PANEL_TOP, sw, panelHeight, panel.colorHex)}
            {/* Width label */}
            <text x={sx + sw / 2} y={PANEL_TOP - 5} textAnchor="middle" className="text-[9px] fill-muted-foreground">
              {panel.widthCm} cm
            </text>
          </g>
        );
      })}

      {/* Add panel button */}
      {remaining > 0 && (
        <g
          onClick={onAddPanel}
          className="cursor-pointer"
          style={{ pointerEvents: "all" }}
          transform={`translate(${startX + elements.usedLength * scale + 15}, ${PANEL_TOP + panelHeight / 2 - 15})`}
        >
          <rect x={0} y={0} width={30} height={30} rx={6} fill="hsl(var(--primary))" opacity={0.15} stroke="hsl(var(--primary))" strokeWidth={1.5} strokeDasharray="4 2" />
          <line x1={9} y1={15} x2={21} y2={15} stroke="hsl(var(--primary))" strokeWidth={2} />
          <line x1={15} y1={9} x2={15} y2={21} stroke="hsl(var(--primary))" strokeWidth={2} />
        </g>
      )}
    </svg>
  );
};

export default PanelDesignerCanvas;

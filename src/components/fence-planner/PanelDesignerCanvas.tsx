import { useMemo } from "react";
import { PlacedPanel, PanelStyleId } from "./types";
import { POST_WIDTH_CM, PANEL_HEIGHT_CM } from "./designerData";

interface PanelDesignerCanvasProps {
  segmentLengthCm: number;
  segmentLabel: string;
  placedPanels: PlacedPanel[];
  onAddPanel: () => void;
  onRemovePanel: (id: string) => void;
  zoom: number;
}

const CANVAS_W = 1200;
const CANVAS_H = 520;
const GROUND_Y = 430;
const PANEL_TOP = 100;
const POST_VISUAL_W = 12;
const DIM_Y = 75;

/* ---- SVG patterns for panel face ---- */
const panelPattern = (
  styleId: PanelStyleId,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
  idx: number,
) => {
  const id = `pat-${idx}`;
  switch (styleId) {
    case "horizontal-planks": {
      const plankH = Math.max(8, h / 14);
      const gap = 2;
      const count = Math.floor(h / (plankH + gap));
      return (
        <g key={id}>
          {Array.from({ length: count }, (_, i) => {
            const py = y + i * (plankH + gap);
            const lightShift = (i % 2 === 0) ? 0 : 12;
            return (
              <rect
                key={i}
                x={x + 1}
                y={py}
                width={w - 2}
                height={plankH}
                rx={1}
                fill={color}
                opacity={0.75}
                filter={lightShift ? `brightness(${1.08})` : undefined}
              />
            );
          })}
        </g>
      );
    }
    case "vertical-slats": {
      const slatW = Math.max(6, w / 16);
      const gap = 3;
      const count = Math.floor(w / (slatW + gap));
      return (
        <g key={id}>
          {Array.from({ length: count }, (_, i) => (
            <rect
              key={i}
              x={x + i * (slatW + gap) + 2}
              y={y + 1}
              width={slatW}
              height={h - 2}
              rx={1}
              fill={color}
              opacity={0.7 + (i % 2) * 0.12}
            />
          ))}
        </g>
      );
    }
    case "louvers": {
      const louverH = Math.max(5, h / 20);
      const gap = 3;
      const count = Math.floor(h / (louverH + gap));
      return (
        <g key={id}>
          {Array.from({ length: count }, (_, i) => (
            <g key={i}>
              <rect
                x={x + 2}
                y={y + i * (louverH + gap)}
                width={w - 4}
                height={louverH}
                rx={0.5}
                fill={color}
                opacity={0.65 + (i % 3) * 0.1}
              />
              {/* shadow line under each louver */}
              <line
                x1={x + 3}
                y1={y + i * (louverH + gap) + louverH}
                x2={x + w - 3}
                y2={y + i * (louverH + gap) + louverH}
                stroke="#000"
                strokeWidth={0.5}
                opacity={0.08}
              />
            </g>
          ))}
        </g>
      );
    }
    case "mosaic": {
      const tileSize = Math.max(8, Math.min(w, h) / 12);
      const gap = 2;
      const cols = Math.floor(w / (tileSize + gap));
      const rows = Math.floor(h / (tileSize + gap));
      return (
        <g key={id}>
          {Array.from({ length: rows }, (_, row) =>
            Array.from({ length: cols }, (_, col) => (
              <rect
                key={`${row}-${col}`}
                x={x + col * (tileSize + gap) + gap}
                y={y + row * (tileSize + gap) + gap}
                width={tileSize}
                height={tileSize}
                rx={2}
                fill={color}
                opacity={0.4 + ((row + col) % 3) * 0.18}
              />
            )),
          ).flat()}
        </g>
      );
    }
    case "decorative":
      return (
        <g key={id}>
          <rect x={x} y={y} width={w} height={h} fill={color} opacity={0.5} rx={2} />
          {/* organic curves */}
          <ellipse cx={x + w / 2} cy={y + h * 0.3} rx={w * 0.35} ry={h * 0.18} fill={color} opacity={0.3} />
          <ellipse cx={x + w * 0.35} cy={y + h * 0.65} rx={w * 0.25} ry={h * 0.15} fill={color} opacity={0.25} />
          <ellipse cx={x + w * 0.7} cy={y + h * 0.7} rx={w * 0.2} ry={h * 0.12} fill={color} opacity={0.2} />
        </g>
      );
    default:
      return <rect key={id} x={x} y={y} width={w} height={h} fill={color} opacity={0.55} rx={2} />;
  }
};

/* ---- Dimension arrow helpers ---- */
const DimensionLine = ({
  x1,
  x2,
  y,
  label,
  primary = false,
}: {
  x1: number;
  x2: number;
  y: number;
  label: string;
  primary?: boolean;
}) => {
  const color = primary ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))";
  const tickH = primary ? 6 : 4;
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={color} strokeWidth={primary ? 1.2 : 0.8} />
      <line x1={x1} y1={y - tickH} x2={x1} y2={y + tickH} stroke={color} strokeWidth={primary ? 1.2 : 0.8} />
      <line x1={x2} y1={y - tickH} x2={x2} y2={y + tickH} stroke={color} strokeWidth={primary ? 1.2 : 0.8} />
      <text
        x={(x1 + x2) / 2}
        y={y - tickH - 3}
        textAnchor="middle"
        fontSize={primary ? 11 : 9}
        fill={color}
        fontWeight={primary ? 600 : 400}
      >
        {label}
      </text>
    </g>
  );
};

const PanelDesignerCanvas = ({
  segmentLengthCm,
  segmentLabel,
  placedPanels,
  onAddPanel,
  onRemovePanel,
  zoom,
}: PanelDesignerCanvasProps) => {
  const scale = useMemo(() => {
    const maxDrawW = CANVAS_W - 100;
    return maxDrawW / Math.max(segmentLengthCm, 200);
  }, [segmentLengthCm]);

  const panelHeight = GROUND_Y - PANEL_TOP;
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

    return { els, usedLength: cursor };
  }, [placedPanels]);

  const remaining = segmentLengthCm - elements.usedLength;

  return (
    <svg
      viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
      className="w-full h-full max-h-[70vh]"
      preserveAspectRatio="xMidYMid meet"
      style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
    >
      {/* Background & ground */}
      <rect x={0} y={0} width={CANVAS_W} height={GROUND_Y} fill="hsl(var(--background))" />
      <rect x={0} y={GROUND_Y} width={CANVAS_W} height={CANVAS_H - GROUND_Y} fill="hsl(var(--muted))" opacity={0.6} />
      {/* grass texture */}
      <line x1={0} y1={GROUND_Y} x2={CANVAS_W} y2={GROUND_Y} stroke="hsl(var(--primary))" strokeWidth={2} opacity={0.4} />
      {Array.from({ length: 30 }, (_, i) => {
        const gx = 20 + i * 40 + (i % 3) * 5;
        return (
          <g key={`grass-${i}`} opacity={0.15}>
            <line x1={gx} y1={GROUND_Y} x2={gx - 3} y2={GROUND_Y + 8} stroke="hsl(var(--primary))" strokeWidth={1.5} />
            <line x1={gx + 5} y1={GROUND_Y} x2={gx + 7} y2={GROUND_Y + 10} stroke="hsl(var(--primary))" strokeWidth={1} />
          </g>
        );
      })}

      {/* Segment title */}
      <text x={CANVAS_W / 2} y={28} textAnchor="middle" fontSize={15} fontWeight={700} fill="hsl(var(--foreground))">
        Segment {segmentLabel}
      </text>
      <text x={CANVAS_W / 2} y={46} textAnchor="middle" fontSize={12} fill="hsl(var(--muted-foreground))">
        Totaal: {segmentLengthCm} cm
      </text>

      {/* Total dimension line */}
      <DimensionLine
        x1={startX}
        x2={startX + segmentLengthCm * scale}
        y={DIM_Y}
        label={`${segmentLengthCm} cm`}
        primary
      />

      {/* Posts and panels */}
      {elements.els.map((el, i) => {
        const sx = startX + el.x * scale;
        const sw = el.w * scale;

        if (el.type === "post") {
          const postW = Math.max(sw, POST_VISUAL_W);
          return (
            <g key={`post-${i}`}>
              {/* Post shadow */}
              <rect
                x={sx + 2}
                y={PANEL_TOP - 8}
                width={postW}
                height={panelHeight + 12}
                rx={1}
                fill="#000"
                opacity={0.06}
              />
              {/* Post body */}
              <rect
                x={sx}
                y={PANEL_TOP - 10}
                width={postW}
                height={panelHeight + 14}
                rx={2}
                fill="hsl(var(--foreground))"
                opacity={0.75}
              />
              {/* Post cap */}
              <rect
                x={sx - 1}
                y={PANEL_TOP - 14}
                width={postW + 2}
                height={5}
                rx={1}
                fill="hsl(var(--foreground))"
                opacity={0.85}
              />
            </g>
          );
        }

        const panel = el.panel!;
        return (
          <g key={`panel-${i}`}>
            {/* Panel background */}
            <rect
              x={sx}
              y={PANEL_TOP}
              width={sw}
              height={panelHeight}
              fill={panel.colorHex}
              opacity={0.12}
              rx={2}
            />
            {/* Panel border */}
            <rect
              x={sx}
              y={PANEL_TOP}
              width={sw}
              height={panelHeight}
              fill="none"
              stroke={panel.colorHex}
              strokeWidth={1}
              opacity={0.35}
              rx={2}
            />
            {/* Pattern fill */}
            {panelPattern(panel.panelStyleId, sx, PANEL_TOP, sw, panelHeight, panel.colorHex, i)}

            {/* Per-panel dimension */}
            <DimensionLine
              x1={sx}
              x2={sx + sw}
              y={DIM_Y + 16}
              label={`${panel.widthCm} cm`}
            />

            {/* Height label (on first panel only) */}
            {i === 1 && (
              <g>
                <line
                  x1={sx + sw + 8}
                  y1={PANEL_TOP}
                  x2={sx + sw + 8}
                  y2={GROUND_Y}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={0.6}
                />
                <text
                  x={sx + sw + 14}
                  y={PANEL_TOP + panelHeight / 2}
                  fontSize={9}
                  fill="hsl(var(--muted-foreground))"
                  dominantBaseline="middle"
                  writingMode="vertical-rl"
                >
                  {PANEL_HEIGHT_CM} cm
                </text>
              </g>
            )}

            {/* Delete button on hover area */}
            <g
              className="cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
              onClick={() => onRemovePanel(panel.id)}
            >
              <circle cx={sx + sw - 8} cy={PANEL_TOP + 8} r={8} fill="hsl(var(--destructive))" opacity={0.85} />
              <line x1={sx + sw - 12} y1={PANEL_TOP + 4} x2={sx + sw - 4} y2={PANEL_TOP + 12} stroke="#fff" strokeWidth={1.5} />
              <line x1={sx + sw - 4} y1={PANEL_TOP + 4} x2={sx + sw - 12} y2={PANEL_TOP + 12} stroke="#fff" strokeWidth={1.5} />
            </g>
          </g>
        );
      })}

      {/* Add panel button */}
      {remaining >= POST_WIDTH_CM + 10 && (
        <g
          onClick={onAddPanel}
          className="cursor-pointer"
          style={{ pointerEvents: "all" }}
          transform={`translate(${startX + elements.usedLength * scale + 20}, ${PANEL_TOP + panelHeight / 2 - 22})`}
        >
          <rect
            x={0}
            y={0}
            width={44}
            height={44}
            rx={10}
            fill="hsl(var(--primary))"
            opacity={0.1}
            stroke="hsl(var(--primary))"
            strokeWidth={1.5}
            strokeDasharray="6 3"
          />
          <line x1={14} y1={22} x2={30} y2={22} stroke="hsl(var(--primary))" strokeWidth={2.5} strokeLinecap="round" />
          <line x1={22} y1={14} x2={22} y2={30} stroke="hsl(var(--primary))" strokeWidth={2.5} strokeLinecap="round" />
        </g>
      )}

      {/* Remaining length indicator */}
      {remaining > 0 && placedPanels.length > 0 && (
        <text
          x={startX + elements.usedLength * scale + 48}
          y={PANEL_TOP + panelHeight / 2 + 35}
          fontSize={10}
          fill="hsl(var(--muted-foreground))"
        >
          Rest: {remaining} cm
        </text>
      )}
    </svg>
  );
};

export default PanelDesignerCanvas;

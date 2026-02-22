import { useMemo, useState, useCallback, useRef } from "react";
import { PlacedPanel, PanelStyleId } from "./types";
import { POST_WIDTH_CM, PANEL_HEIGHT_CM } from "./designerData";
import { panelPattern } from "./panelPatterns";

interface PanelDesignerCanvasProps {
  segmentLengthCm: number;
  segmentLabel: string;
  placedPanels: PlacedPanel[];
  onAddPanel: () => void;
  onRemovePanel: (id: string) => void;
  onReorderPanels: (reordered: PlacedPanel[]) => void;
  onResizePanel: (id: string, newWidthCm: number) => void;
  zoom: number;
}

const CANVAS_W = 1200;
const CANVAS_H = 520;
const GROUND_Y = 430;
const PANEL_TOP = 100;
const POST_VISUAL_W = 12;
const DIM_Y = 75;
const SNAP_GRID_CM = 10; // snap to 10 cm increments

type DragType = "move" | "resize-left" | "resize-right";

interface DragState {
  panelId: string;
  type: DragType;
  startMouseX: number;
  originalIndex: number;
  originalWidthCm: number;
  currentOffsetPx: number;
  liveWidthCm: number;
}

/* ---- Dimension arrow ---- */
const DimensionLine = ({
  x1, x2, y, label, primary = false, highlight = false,
}: {
  x1: number; x2: number; y: number; label: string; primary?: boolean; highlight?: boolean;
}) => {
  const color = highlight
    ? "hsl(var(--accent-foreground))"
    : primary
      ? "hsl(var(--primary))"
      : "hsl(var(--muted-foreground))";
  const tickH = primary ? 6 : 4;
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={color} strokeWidth={primary ? 1.2 : 0.8} />
      <line x1={x1} y1={y - tickH} x2={x1} y2={y + tickH} stroke={color} strokeWidth={primary ? 1.2 : 0.8} />
      <line x1={x2} y1={y - tickH} x2={x2} y2={y + tickH} stroke={color} strokeWidth={primary ? 1.2 : 0.8} />
      {highlight && (
        <rect
          x={(x1 + x2) / 2 - 24}
          y={y - tickH - 16}
          width={48}
          height={14}
          rx={3}
          fill="hsl(var(--primary))"
          opacity={0.9}
        />
      )}
      <text
        x={(x1 + x2) / 2}
        y={y - tickH - 3}
        textAnchor="middle"
        fontSize={highlight ? 11 : primary ? 11 : 9}
        fill={highlight ? "hsl(var(--primary-foreground))" : color}
        fontWeight={highlight || primary ? 600 : 400}
      >
        {label}
      </text>
    </g>
  );
};

/* ---- Snap grid lines ---- */
const SnapGrid = ({ startX, scale, segmentLengthCm }: { startX: number; scale: number; segmentLengthCm: number }) => {
  const lines = [];
  for (let cm = 0; cm <= segmentLengthCm; cm += SNAP_GRID_CM) {
    const x = startX + cm * scale;
    const isMajor = cm % 50 === 0;
    lines.push(
      <line
        key={cm}
        x1={x}
        y1={PANEL_TOP - 5}
        x2={x}
        y2={GROUND_Y}
        stroke="hsl(var(--border))"
        strokeWidth={isMajor ? 0.6 : 0.3}
        opacity={isMajor ? 0.5 : 0.25}
        strokeDasharray={isMajor ? undefined : "2 4"}
      />,
    );
    if (isMajor) {
      lines.push(
        <text
          key={`lbl-${cm}`}
          x={x}
          y={GROUND_Y + 14}
          textAnchor="middle"
          fontSize={7}
          fill="hsl(var(--muted-foreground))"
          opacity={0.6}
        >
          {cm}
        </text>,
      );
    }
  }
  return <g>{lines}</g>;
};

/* ---- Resize handle ---- */
const ResizeHandle = ({
  x, yTop, height, side, onPointerDown,
}: {
  x: number; yTop: number; height: number; side: "left" | "right"; onPointerDown: (e: React.PointerEvent) => void;
}) => (
  <g
    className="cursor-col-resize"
    onPointerDown={onPointerDown}
    style={{ pointerEvents: "all" }}
  >
    {/* Invisible hit area */}
    <rect x={x - 6} y={yTop} width={12} height={height} fill="transparent" />
    {/* Visual grip */}
    <line x1={x} y1={yTop + 10} x2={x} y2={yTop + height - 10} stroke="hsl(var(--primary))" strokeWidth={2} opacity={0.5} />
    <circle cx={x} cy={yTop + height / 2 - 8} r={2} fill="hsl(var(--primary))" opacity={0.6} />
    <circle cx={x} cy={yTop + height / 2} r={2} fill="hsl(var(--primary))" opacity={0.6} />
    <circle cx={x} cy={yTop + height / 2 + 8} r={2} fill="hsl(var(--primary))" opacity={0.6} />
  </g>
);

/* ---- Live tooltip during drag ---- */
const LiveTooltip = ({ x, y, lines }: { x: number; y: number; lines: string[] }) => {
  const w = 100;
  const h = 14 * lines.length + 10;
  return (
    <g>
      <rect x={x - w / 2} y={y - h - 4} width={w} height={h} rx={4} fill="hsl(var(--popover))" stroke="hsl(var(--border))" strokeWidth={1} />
      {lines.map((line, i) => (
        <text
          key={i}
          x={x}
          y={y - h + 10 + i * 14}
          textAnchor="middle"
          fontSize={10}
          fill="hsl(var(--popover-foreground))"
          fontWeight={i === 0 ? 600 : 400}
        >
          {line}
        </text>
      ))}
    </g>
  );
};

const PanelDesignerCanvas = ({
  segmentLengthCm,
  segmentLabel,
  placedPanels,
  onAddPanel,
  onRemovePanel,
  onReorderPanels,
  onResizePanel,
  zoom,
}: PanelDesignerCanvasProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [hoveredPanel, setHoveredPanel] = useState<string | null>(null);

  const scale = useMemo(() => {
    const maxDrawW = CANVAS_W - 100;
    return maxDrawW / Math.max(segmentLengthCm, 200);
  }, [segmentLengthCm]);

  const panelHeight = GROUND_Y - PANEL_TOP;
  const startX = 50;

  const snapToCm = useCallback((cm: number) => {
    return Math.round(cm / SNAP_GRID_CM) * SNAP_GRID_CM;
  }, []);

  // Build element positions - taking drag state into account
  const elements = useMemo(() => {
    const panels = [...placedPanels];

    // If dragging a move, reorder panels for preview
    if (drag?.type === "move" && drag.currentOffsetPx !== 0) {
      const fromIdx = drag.originalIndex;
      const deltaCm = drag.currentOffsetPx / scale;
      // Determine target index based on offset
      let toIdx = fromIdx;
      if (deltaCm > 0) {
        let acc = 0;
        for (let i = fromIdx + 1; i < panels.length; i++) {
          acc += panels[i].widthCm + POST_WIDTH_CM;
          if (deltaCm > acc / 2) toIdx = i;
        }
      } else {
        let acc = 0;
        for (let i = fromIdx - 1; i >= 0; i--) {
          acc += panels[i].widthCm + POST_WIDTH_CM;
          if (-deltaCm > acc / 2) toIdx = i;
        }
      }
      if (toIdx !== fromIdx) {
        const [moved] = panels.splice(fromIdx, 1);
        panels.splice(toIdx, 0, moved);
      }
    }

    const els: { type: "post" | "panel"; x: number; w: number; panel?: PlacedPanel; panelIdx?: number }[] = [];
    let cursor = 0;

    els.push({ type: "post", x: cursor, w: POST_WIDTH_CM });
    cursor += POST_WIDTH_CM;

    for (let i = 0; i < panels.length; i++) {
      const p = panels[i];
      const w = drag?.type?.startsWith("resize") && drag.panelId === p.id ? drag.liveWidthCm : p.widthCm;
      els.push({ type: "panel", x: cursor, w, panel: p, panelIdx: i });
      cursor += w;
      els.push({ type: "post", x: cursor, w: POST_WIDTH_CM });
      cursor += POST_WIDTH_CM;
    }

    return { els, usedLength: cursor, orderedPanels: panels };
  }, [placedPanels, drag, scale]);

  const remaining = segmentLengthCm - elements.usedLength;

  const svgPoint = useCallback((clientX: number) => {
    const svg = svgRef.current;
    if (!svg) return 0;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = 0;
    const ctm = svg.getScreenCTM();
    if (!ctm) return 0;
    return pt.matrixTransform(ctm.inverse()).x;
  }, []);

  const handlePanelPointerDown = useCallback((e: React.PointerEvent, panelId: string, type: DragType) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as SVGElement).setPointerCapture?.(e.pointerId);
    const panel = placedPanels.find((p) => p.id === panelId);
    if (!panel) return;
    const idx = placedPanels.indexOf(panel);

    setDrag({
      panelId,
      type,
      startMouseX: svgPoint(e.clientX),
      originalIndex: idx,
      originalWidthCm: panel.widthCm,
      currentOffsetPx: 0,
      liveWidthCm: panel.widthCm,
    });
  }, [placedPanels, svgPoint]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!drag) return;
    const currentX = svgPoint(e.clientX);
    const deltaPx = currentX - drag.startMouseX;
    const deltaCm = deltaPx / scale;

    if (drag.type === "move") {
      setDrag((prev) => prev ? { ...prev, currentOffsetPx: deltaPx } : null);
    } else if (drag.type === "resize-right") {
      const rawWidth = drag.originalWidthCm + deltaCm;
      const snapped = snapToCm(Math.max(30, Math.min(rawWidth, drag.originalWidthCm + remaining)));
      setDrag((prev) => prev ? { ...prev, liveWidthCm: snapped, currentOffsetPx: deltaPx } : null);
    } else if (drag.type === "resize-left") {
      const rawWidth = drag.originalWidthCm - deltaCm;
      const snapped = snapToCm(Math.max(30, Math.min(rawWidth, drag.originalWidthCm + remaining)));
      setDrag((prev) => prev ? { ...prev, liveWidthCm: snapped, currentOffsetPx: deltaPx } : null);
    }
  }, [drag, scale, snapToCm, svgPoint, remaining]);

  const handlePointerUp = useCallback(() => {
    if (!drag) return;

    if (drag.type === "move") {
      // Commit the reordered list
      onReorderPanels(elements.orderedPanels);
    } else {
      // Commit resize
      if (drag.liveWidthCm !== drag.originalWidthCm) {
        onResizePanel(drag.panelId, drag.liveWidthCm);
      }
    }
    setDrag(null);
  }, [drag, elements.orderedPanels, onReorderPanels, onResizePanel]);

  const isDragging = drag !== null;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
      className="w-full h-full max-h-[70vh]"
      preserveAspectRatio="xMidYMid meet"
      style={{ transform: `scale(${zoom})`, transformOrigin: "center center", cursor: isDragging ? (drag.type === "move" ? "grabbing" : "col-resize") : undefined }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Background */}
      <rect x={0} y={0} width={CANVAS_W} height={GROUND_Y} fill="hsl(var(--background))" />
      <rect x={0} y={GROUND_Y} width={CANVAS_W} height={CANVAS_H - GROUND_Y} fill="hsl(var(--muted))" opacity={0.6} />
      <line x1={0} y1={GROUND_Y} x2={CANVAS_W} y2={GROUND_Y} stroke="hsl(var(--primary))" strokeWidth={2} opacity={0.4} />

      {/* Snap grid */}
      <SnapGrid startX={startX} scale={scale} segmentLengthCm={segmentLengthCm} />

      {/* Grass texture */}
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
        Totaal: {segmentLengthCm} cm • Rest: {Math.max(0, remaining)} cm
      </text>

      {/* Total dimension line */}
      <DimensionLine x1={startX} x2={startX + segmentLengthCm * scale} y={DIM_Y} label={`${segmentLengthCm} cm`} primary />

      {/* Posts and panels */}
      {elements.els.map((el, i) => {
        const sx = startX + el.x * scale;
        const sw = el.w * scale;

        if (el.type === "post") {
          const postW = Math.max(sw, POST_VISUAL_W);
          return (
            <g key={`post-${i}`}>
              <rect x={sx + 2} y={PANEL_TOP - 8} width={postW} height={panelHeight + 12} rx={1} fill="#000" opacity={0.06} />
              <rect x={sx} y={PANEL_TOP - 10} width={postW} height={panelHeight + 14} rx={2} fill="hsl(var(--foreground))" opacity={0.75} />
              <rect x={sx - 1} y={PANEL_TOP - 14} width={postW + 2} height={5} rx={1} fill="hsl(var(--foreground))" opacity={0.85} />
            </g>
          );
        }

        const panel = el.panel!;
        const isBeingDragged = drag?.panelId === panel.id;
        const isHovered = hoveredPanel === panel.id && !isDragging;
        const displayW = isBeingDragged && drag.type !== "move" ? drag.liveWidthCm : el.w;
        const displaySw = displayW * scale;

        return (
          <g
            key={`panel-${panel.id}`}
            opacity={isBeingDragged && drag.type === "move" ? 0.7 : 1}
            onPointerEnter={() => setHoveredPanel(panel.id)}
            onPointerLeave={() => setHoveredPanel(null)}
          >
            {/* Drop shadow when dragging */}
            {isBeingDragged && drag.type === "move" && (
              <rect x={sx + 3} y={PANEL_TOP + 3} width={displaySw} height={panelHeight} fill="#000" opacity={0.1} rx={3} />
            )}

            {/* Highlight border on hover */}
            {(isHovered || isBeingDragged) && (
              <rect
                x={sx - 2}
                y={PANEL_TOP - 2}
                width={displaySw + 4}
                height={panelHeight + 4}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                strokeDasharray={isBeingDragged ? "6 3" : undefined}
                rx={4}
                opacity={0.7}
              />
            )}

            {/* Panel background */}
            <rect x={sx} y={PANEL_TOP} width={displaySw} height={panelHeight} fill={panel.colorHex} opacity={0.12} rx={2} />
            {/* Panel border */}
            <rect x={sx} y={PANEL_TOP} width={displaySw} height={panelHeight} fill="none" stroke={panel.colorHex} strokeWidth={1} opacity={0.35} rx={2} />
            {/* Pattern fill */}
            {panelPattern(panel.panelStyleId, sx, PANEL_TOP, displaySw, panelHeight, panel.colorHex, i)}

            {/* Draggable move area */}
            <rect
              x={sx + 10}
              y={PANEL_TOP + 10}
              width={Math.max(0, displaySw - 20)}
              height={panelHeight - 20}
              fill="transparent"
              className="cursor-grab"
              style={{ pointerEvents: "all" }}
              onPointerDown={(e) => handlePanelPointerDown(e, panel.id, "move")}
            />

            {/* Per-panel dimension */}
            <DimensionLine
              x1={sx}
              x2={sx + displaySw}
              y={DIM_Y + 16}
              label={`${displayW} cm`}
              highlight={isBeingDragged && drag.type !== "move"}
            />

            {/* Height label on first panel */}
            {el.panelIdx === 0 && (
              <g>
                <line x1={sx + displaySw + 8} y1={PANEL_TOP} x2={sx + displaySw + 8} y2={GROUND_Y} stroke="hsl(var(--muted-foreground))" strokeWidth={0.6} />
                <text x={sx + displaySw + 14} y={PANEL_TOP + panelHeight / 2} fontSize={9} fill="hsl(var(--muted-foreground))" dominantBaseline="middle" writingMode="vertical-rl">
                  {PANEL_HEIGHT_CM} cm
                </text>
              </g>
            )}

            {/* Resize handles (visible on hover or when dragging) */}
            {(isHovered || isBeingDragged) && (
              <>
                <ResizeHandle
                  x={sx}
                  yTop={PANEL_TOP}
                  height={panelHeight}
                  side="left"
                  onPointerDown={(e) => handlePanelPointerDown(e, panel.id, "resize-left")}
                />
                <ResizeHandle
                  x={sx + displaySw}
                  yTop={PANEL_TOP}
                  height={panelHeight}
                  side="right"
                  onPointerDown={(e) => handlePanelPointerDown(e, panel.id, "resize-right")}
                />
              </>
            )}

            {/* Delete button */}
            <g
              className="cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
              onClick={() => onRemovePanel(panel.id)}
              style={{ pointerEvents: "all" }}
            >
              <circle cx={sx + displaySw - 8} cy={PANEL_TOP + 8} r={8} fill="hsl(var(--destructive))" opacity={0.85} />
              <line x1={sx + displaySw - 12} y1={PANEL_TOP + 4} x2={sx + displaySw - 4} y2={PANEL_TOP + 12} stroke="#fff" strokeWidth={1.5} />
              <line x1={sx + displaySw - 4} y1={PANEL_TOP + 4} x2={sx + displaySw - 12} y2={PANEL_TOP + 12} stroke="#fff" strokeWidth={1.5} />
            </g>

            {/* Live tooltip during drag */}
            {isBeingDragged && (
              <LiveTooltip
                x={sx + displaySw / 2}
                y={PANEL_TOP - 8}
                lines={
                  drag.type === "move"
                    ? [`Positie: ${el.panelIdx! + 1}`, `${displayW} cm`]
                    : [`${displayW} cm`, `Snap: ${SNAP_GRID_CM} cm`]
                }
              />
            )}
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
          <rect x={0} y={0} width={44} height={44} rx={10} fill="hsl(var(--primary))" opacity={0.1} stroke="hsl(var(--primary))" strokeWidth={1.5} strokeDasharray="6 3" />
          <line x1={14} y1={22} x2={30} y2={22} stroke="hsl(var(--primary))" strokeWidth={2.5} strokeLinecap="round" />
          <line x1={22} y1={14} x2={22} y2={30} stroke="hsl(var(--primary))" strokeWidth={2.5} strokeLinecap="round" />
          <text x={22} y={52} textAnchor="middle" fontSize={8} fill="hsl(var(--muted-foreground))">
            + Paneel
          </text>
        </g>
      )}

      {/* Remaining length indicator */}
      {remaining > 0 && placedPanels.length > 0 && (
        <g>
          <rect
            x={startX + elements.usedLength * scale}
            y={PANEL_TOP}
            width={remaining * scale}
            height={panelHeight}
            fill="hsl(var(--primary))"
            opacity={0.04}
            strokeDasharray="4 4"
            stroke="hsl(var(--primary))"
            strokeWidth={0.5}
          />
          <text
            x={startX + elements.usedLength * scale + (remaining * scale) / 2}
            y={PANEL_TOP + panelHeight / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={11}
            fill="hsl(var(--muted-foreground))"
            opacity={0.6}
          >
            {remaining} cm beschikbaar
          </text>
        </g>
      )}
    </svg>
  );
};

export default PanelDesignerCanvas;

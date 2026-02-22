import { PanelStyleId } from "./types";

/** SVG pattern fills for panel faces */
export const panelPattern = (
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
                style={{ filter: i % 2 !== 0 ? "brightness(1.08)" : undefined }}
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
          <ellipse cx={x + w / 2} cy={y + h * 0.3} rx={w * 0.35} ry={h * 0.18} fill={color} opacity={0.3} />
          <ellipse cx={x + w * 0.35} cy={y + h * 0.65} rx={w * 0.25} ry={h * 0.15} fill={color} opacity={0.25} />
          <ellipse cx={x + w * 0.7} cy={y + h * 0.7} rx={w * 0.2} ry={h * 0.12} fill={color} opacity={0.2} />
        </g>
      );
    default:
      return <rect key={id} x={x} y={y} width={w} height={h} fill={color} opacity={0.55} rx={2} />;
  }
};

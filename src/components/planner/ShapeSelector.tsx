import { PresetShape } from "./types";

interface ShapeSelectorProps {
  value: PresetShape;
  onChange: (shape: PresetShape) => void;
}

const shapes: { id: PresetShape; label: string; svg: string }[] = [
  { id: "rectangle", label: "Rechthoek", svg: "M2,2 L18,2 L18,14 L2,14 Z" },
  { id: "l-shape", label: "L rechts", svg: "M2,2 L18,2 L18,8 L10,8 L10,14 L2,14 Z" },
  { id: "l-shape-left", label: "L links", svg: "M2,2 L18,2 L18,14 L10,14 L10,8 L2,8 Z" },
  { id: "l-shape-bottom-right", label: "L onder-R", svg: "M2,2 L10,2 L10,8 L18,8 L18,14 L2,14 Z" },
  { id: "l-shape-bottom-left", label: "L onder-L", svg: "M10,2 L18,2 L18,14 L2,14 L2,8 L10,8 Z" },
  { id: "u-shape", label: "U-vorm", svg: "M2,2 L18,2 L18,14 L13,14 L13,8 L7,8 L7,14 L2,14 Z" },
  { id: "t-shape", label: "T-vorm", svg: "M2,2 L18,2 L18,7 L13,7 L13,14 L7,14 L7,7 L2,7 Z" },
  { id: "circle", label: "Cirkel", svg: "M10,2 L14,3 L17,6 L18,10 L17,13 L14,15 L10,16 L6,15 L3,13 L2,10 L3,6 L6,3 Z" },
  { id: "custom", label: "Vrije vorm", svg: "M3,4 L10,2 L17,5 L15,14 L5,13 Z" },
];

const ShapeSelector = ({ value, onChange }: ShapeSelectorProps) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
      {shapes.map((s) => (
        <button
          key={s.id}
          onClick={() => onChange(s.id)}
          className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all ${
            value === s.id
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-card text-muted-foreground hover:border-primary/40"
          }`}
        >
          <svg viewBox="0 0 20 18" className="w-8 h-6">
            <path
              d={s.svg}
              fill={value === s.id ? "hsl(var(--primary) / 0.2)" : "hsl(var(--muted))"}
              stroke={value === s.id ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
              strokeWidth="1"
            />
          </svg>
          <span className="text-[9px] font-medium leading-tight text-center">{s.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ShapeSelector;

import { PresetShape } from "./types";
import { Square, CornerDownRight, ArrowDownUp } from "lucide-react";

interface ShapeSelectorProps {
  value: PresetShape;
  onChange: (shape: PresetShape) => void;
}

const shapes: { id: PresetShape; label: string; icon: React.ReactNode; svg: string }[] = [
  {
    id: "rectangle",
    label: "Rechthoek",
    icon: <Square className="h-5 w-5" />,
    svg: "M2,2 L18,2 L18,14 L2,14 Z",
  },
  {
    id: "l-shape",
    label: "L-vorm",
    icon: <CornerDownRight className="h-5 w-5" />,
    svg: "M2,2 L18,2 L18,8 L10,8 L10,14 L2,14 Z",
  },
  {
    id: "u-shape",
    label: "U-vorm",
    icon: <ArrowDownUp className="h-5 w-5" />,
    svg: "M2,2 L18,2 L18,14 L13,14 L13,8 L7,8 L7,14 L2,14 Z",
  },
];

const ShapeSelector = ({ value, onChange }: ShapeSelectorProps) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {shapes.map((s) => (
        <button
          key={s.id}
          onClick={() => onChange(s.id)}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
            value === s.id
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-card text-muted-foreground hover:border-primary/40"
          }`}
        >
          <svg viewBox="0 0 20 16" className="w-12 h-9">
            <path d={s.svg} fill={value === s.id ? "hsl(var(--primary) / 0.2)" : "hsl(var(--muted))"} stroke={value === s.id ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"} strokeWidth="1" />
          </svg>
          <span className="text-xs font-medium">{s.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ShapeSelector;
